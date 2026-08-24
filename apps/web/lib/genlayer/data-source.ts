import { contractRead } from "./contract"; import type { Cluster, Feature, Related } from "./types";
function object(value:unknown):Record<string,unknown>{ if(!value||typeof value!=="object"||Array.isArray(value)) throw new Error("MALFORMED_RESPONSE"); return value as Record<string,unknown>; }
export async function getFeature(id:string):Promise<Feature>{ return object(await contractRead("get_feature",[id])) as unknown as Feature; }
export async function getCluster(id:string):Promise<Cluster>{ return object(await contractRead("get_cluster",[id])) as unknown as Cluster; }
export async function getHistory(id:string):Promise<unknown[]>{ const data=await contractRead("get_feature_history",[id,0,32]); if(!Array.isArray(data))throw new Error("MALFORMED_RESPONSE");return data; }
export async function related(id:string):Promise<Related[]>{ const data=await contractRead("preview_related",[id,8]); if(!Array.isArray(data))throw new Error("MALFORMED_RESPONSE");return data.map(item=>typeof item==="string"?JSON.parse(item):item) as Related[]; }
