import {createClient} from "genlayer-js";
import {studionet} from "genlayer-js/chains";
import {ExecutionResult,TransactionStatus,type TransactionHash} from "genlayer-js/types";
import {injectedProvider,normalizeWalletError,requireStudioNet,selectedWallet,connectStudioNet} from "./client";
import {config} from "./config";
import type {TxStage,WriteFailureCode,WriteResult} from "./types";
import {u256Id} from "./ids";

export class AtlasWriteError extends Error {
  constructor(message:string,public readonly stage:TxStage,public readonly code:WriteFailureCode,public readonly hash?:string,options?:{cause?:unknown}){super(message,options);this.name="AtlasWriteError";}
}
export const isAtlasWriteError=(error:unknown):error is AtlasWriteError=>error instanceof AtlasWriteError;
export const isTerminalWriteStage=(stage:TxStage)=>["success","timeout","undetermined","rollback","cancelled"].includes(stage);
type StageWriter=(stage:TxStage,hash?:string,message?:string)=>void;
function normalizeWriteArgs(method:string,args:unknown[]):unknown[]{const positions:Record<string,number[]>={register_feature:[0],submit_cluster:[0,1],cancel_cluster:[0],adjudicate_cluster:[0]};return args.map((value,index)=>positions[method]?.includes(index)&&typeof value==="string"?u256Id(value):value);}
const address=()=>{if(!config.isConfigured)throw new Error("UNAVAILABLE_READ: contract address is not configured");return config.contractAddress as `0x${string}`};
const readClient=()=>createClient({chain:studionet,endpoint:config.endpoint});
export async function contractRead(method:string,args:unknown[]=[]):Promise<unknown>{return readClient().readContract({address:address(),functionName:method,args:args as never[]})}

function codeFor(error:unknown,checkpoint:string):WriteFailureCode {const code=typeof error==="object"&&error?String((error as Record<string,unknown>).code??""):"";if(code==="4001"||code==="ACTION_REJECTED")return "USER_REJECTED";if(checkpoint==="provider selection")return "NO_PROVIDER";if(checkpoint==="account")return "NO_ACCOUNT";if(checkpoint==="chain validation"||checkpoint==="connect StudioNet")return "WRONG_NETWORK";if(checkpoint==="simulateWriteContract")return "SIMULATION_FAILED";return "WRITE_FAILED";}

export async function contractWrite(method:string,args:unknown[],setStage:StageWriter):Promise<WriteResult>{
  let checkpoint="provider selection";let submittedHash:string|undefined;
  const trace=(stage:TxStage,message:string,hash?:string)=>{console.info(`[AtlasMerge write] ${message}`);setStage(stage,hash,message)};
  try{
    const wallet=selectedWallet();const provider=injectedProvider();if(!provider||!wallet)throw {code:"NO_PROVIDER",message:"No injected EIP-1193 wallet was discovered"};trace("provider",`provider selection: ${wallet.name} (${wallet.rdns})`);
    checkpoint="account";trace("account",`account: requesting from ${wallet.name}`);const accounts=await provider.request({method:"eth_requestAccounts"}) as string[];const account=accounts?.[0] as `0x${string}`|undefined;if(!account)throw {code:"NO_ACCOUNT",message:"Wallet returned no account"};
    const writeClient=createClient({chain:studionet,endpoint:config.endpoint,account,provider});checkpoint="connect StudioNet";trace("connecting","connect StudioNet: requesting network switch");await connectStudioNet(provider);checkpoint="chain validation";trace("validating","chain validation: checking StudioNet chain 61999");await requireStudioNet(provider);
    const normalizedArgs=normalizeWriteArgs(method,args);checkpoint="simulateWriteContract";trace("simulating",`simulateWriteContract: ${method}`);await writeClient.simulateWriteContract({address:address(),functionName:method,args:normalizedArgs as never[]});checkpoint="wallet signature";trace("signing",`wallet signature: requesting ${method}`);const hash=await writeClient.writeContract({address:address(),functionName:method,args:normalizedArgs as never[],value:0n}) as TransactionHash;submittedHash=hash;
    checkpoint="writeContract";trace("submitted",`writeContract: submitted ${hash}`,hash);trace("pending","consensus pending: waiting for FINALIZED",hash);let receipt;
    try{receipt=await readClient().waitForTransactionReceipt({hash,status:TransactionStatus.FINALIZED,interval:5_000,retries:90});}catch{const current=await readClient().getTransaction({hash}).catch(()=>undefined);if(current?.statusName===TransactionStatus.UNDETERMINED){const message="Validators did not converge; the contract state was not changed.";trace("undetermined",message,hash);return {stage:"undetermined",hash,code:"UNDETERMINED"};}const message="The transaction remains pending after the polling window.";trace("timeout",message,hash);return {stage:"timeout",hash,code:"TIMEOUT"};}
    if(receipt.statusName===TransactionStatus.UNDETERMINED){const message="Validators did not converge; the contract state was not changed.";trace("undetermined",message,hash);return {stage:"undetermined",hash,code:"UNDETERMINED"};}
    if(receipt.txExecutionResultName!==ExecutionResult.FINISHED_WITH_RETURN){const message="The finalized GenVM execution rolled back; no state was changed.";trace("rollback",message,hash);return {stage:"rollback",hash,code:"GENVM_ROLLBACK"};}
    trace("success","Finalized; GenVM execution successful.",hash);return {stage:"success",hash};
  }catch(error){if(isAtlasWriteError(error))throw error;const message=normalizeWalletError(error,checkpoint);const code=codeFor(error,checkpoint);const stage:TxStage=code==="USER_REJECTED"?"cancelled":"error";console.error("[AtlasMerge write failure]",{checkpoint,error,submittedHash});setStage(stage,submittedHash,message);throw new AtlasWriteError(message,stage,code,submittedHash,{cause:error});}
}
