import type {Cluster,Feature} from "./types";

const STATUS_LABELS:Record<number,string>={2:"PENDING",3:"ACCEPTED",4:"REJECTED",5:"SPLIT REQUIRED",6:"INSUFFICIENT EVIDENCE"};

export function clusterStatusLabel(status:number):string{return STATUS_LABELS[Number(status)]??"UNKNOWN";}
export function canAdjudicate(cluster:Pick<Cluster,"status">):boolean{return Number(cluster.status)===2;}

export function currentFeatureValue(feature:Feature|undefined,attribute:string):string{
  if(!feature)return "Unavailable";
  try{
    const attrs=typeof feature.attrs_json==="string"?JSON.parse(feature.attrs_json):feature.attrs_json;
    const value=attrs&&typeof attrs==="object"?(attrs as Record<string,unknown>)[attribute]:undefined;
    return value===undefined||value===null||value===""?"Not recorded":String(value);
  }catch{return "Unavailable";}
}

export type ClusterComparison={leftLabel:string;left:string;rightLabel:string;right:string};

export function clusterComparison(cluster:Pick<Cluster,"status"|"attribute"|"value">,feature:Feature|undefined,history:unknown[],clusterId:string):ClusterComparison{
  if(Number(cluster.status)===3){
    const accepted=history.find(item=>{
      if(!item||typeof item!=="object"||Array.isArray(item))return false;
      const record=item as Record<string,unknown>;
      return String(record.cluster_id??"")===clusterId&&String(record.attribute??"")===cluster.attribute;
    }) as Record<string,unknown>|undefined;
    if(accepted){
      const oldValue=accepted.old_value===undefined||accepted.old_value===null?"Not recorded":String(accepted.old_value);
      const newValue=accepted.new_value===undefined||accepted.new_value===null?cluster.value:String(accepted.new_value);
      return {leftLabel:"BEFORE",left:oldValue,rightLabel:"ACCEPTED",right:newValue};
    }
    return {leftLabel:"CURRENT",left:currentFeatureValue(feature,cluster.attribute),rightLabel:"ACCEPTED",right:cluster.value};
  }
  return {leftLabel:"CURRENT",left:currentFeatureValue(feature,cluster.attribute),rightLabel:"PROPOSED",right:cluster.value};
}
