import { STUDIO_CHAIN_ID } from "./config";
export type EthereumProvider = { request(args:{method:string;params?:unknown[]}): Promise<unknown>; on?(event:string, fn:(value: unknown)=>void):void; removeListener?(event:string,fn:(value:unknown)=>void):void };
export function injectedProvider(): EthereumProvider | null { return typeof window !== "undefined" && window.ethereum ? window.ethereum as EthereumProvider : null; }
export async function walletChain(provider: EthereumProvider) { const id=await provider.request({method:"eth_chainId"}); return typeof id === "string" ? Number.parseInt(id,16) : 0; }
export async function requireStudioNet(provider: EthereumProvider) { if (await walletChain(provider)!==STUDIO_CHAIN_ID) throw new Error("WRONG_NETWORK: switch wallet to GenLayer StudioNet (61999)"); }
declare global { interface Window { ethereum?: EthereumProvider; } }
