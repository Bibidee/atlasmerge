import { config } from "./config";
import { executionSucceeded } from "./execution";
import { injectedProvider, requireStudioNet } from "./client";
import type { TxStage } from "./types";
export async function contractRead(method:string, args:unknown[]=[]):Promise<unknown> {
  if (!config.isConfigured) throw new Error("UNAVAILABLE_READ: contract address is not configured");
  const response=await fetch(config.endpoint,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"gen_call",params:[{to:config.contractAddress,data:{method,args}}]})});
  if(!response.ok) throw new Error("UNAVAILABLE_READ: RPC request failed"); const body=await response.json(); if(body.error) throw new Error("UNAVAILABLE_READ: "+body.error.message); return body.result;
}
export async function contractWrite(method:string,args:unknown[],setStage:(stage:TxStage, hash?:string, message?:string)=>void) {
  const provider=injectedProvider(); if(!provider) throw new Error("No injected wallet found"); await requireStudioNet(provider); setStage("signing");
  const accounts=await provider.request({method:"eth_requestAccounts"}) as string[]; if(!accounts?.[0]) throw new Error("Wallet did not provide an account");
  const hash=await provider.request({method:"gen_sendTransaction",params:[{from:accounts[0],to:config.contractAddress,data:{method,args}}]}) as string; setStage("submitted",hash); setStage("pending",hash);
  for(let attempt=0;attempt<90;attempt++){ await new Promise(r=>setTimeout(r,5000)); const tx=await fetch(config.endpoint,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"gen_getTransaction",params:[hash]})}).then(r=>r.json()); if(JSON.stringify(tx).toLowerCase().includes("finalized")){ if(executionSucceeded(tx)){setStage("success",hash);return hash;} setStage("rollback",hash,"Finalized; GenVM execution rolled back or errored");throw new Error("GENVM_ROLLBACK"); }}
  setStage("error",hash,"Finality details unavailable"); throw new Error("Finality details unavailable");
}
