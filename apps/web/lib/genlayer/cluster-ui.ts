import type {Cluster,Feature} from "./types";
const STATUS_LABELS:Record<number,string>={2:"PENDING",3:"ACCEPTED",4:"REJECTED",5:"SPLIT REQUIRED",6:"INSUFFICIENT EVIDENCE"};
export function clusterStatusLabel(status:number):string{return STATUS_LABELS[Number(status)]??"UNKNOWN";}
export function canAdjudicate(cluster:Pick<Cluster,"status">):boolean{return Number(cluster.status)===2;}
export function currentFeatureValue(feature:Feature|undefined,attribute:string):string{if(!feature)return "Unavailable";try{const attrs=typeof feature.attrs_json==="string"?JSON.parse(feature.attrs_json):feature.attrs_json;const value=attrs&&typeof attrs==="object"?(attrs as Record<string,unknown>)[attribute]:undefined;return value===undefined||value===null||value===""?"Not recorded":String(value);}catch{return "Unavailable";}}
