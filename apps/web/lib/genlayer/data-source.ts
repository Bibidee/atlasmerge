import {contractRead} from "./contract";
import {u256Id} from "./ids";
import type {Cluster,Feature,Layer,Related} from "./types";

function object(value:unknown):Record<string,unknown>{
  if(!value||typeof value!=="object"||Array.isArray(value))throw new Error("MALFORMED_RESPONSE");
  return value as Record<string,unknown>;
}

function decimal(value:unknown):string{
  if(typeof value==="bigint"){
    if(value<0n)throw new Error("MALFORMED_RESPONSE");
    return value.toString();
  }
  if(typeof value==="number"){
    if(!Number.isSafeInteger(value)||value<0)throw new Error("MALFORMED_RESPONSE");
    return String(value);
  }
  if(typeof value==="string"){
    const clean=value.trim();
    if(!/^(0|[1-9]\d*)$/.test(clean))throw new Error("MALFORMED_RESPONSE");
    return clean;
  }
  throw new Error("MALFORMED_RESPONSE");
}

function numeric(value:unknown):number{
  const normalized=decimal(value);
  const parsed=Number(normalized);
  if(!Number.isSafeInteger(parsed))throw new Error("MALFORMED_RESPONSE");
  return parsed;
}

function scalarText(value:unknown):string{
  if(typeof value==="string")return value;
  if(typeof value==="number"||typeof value==="bigint"||typeof value==="boolean")return String(value);
  throw new Error("MALFORMED_RESPONSE");
}

function jsonText(value:unknown):string{
  if(typeof value==="string")return value;
  if(value&&typeof value==="object"){
    try{return JSON.stringify(value);}catch{throw new Error("MALFORMED_RESPONSE");}
  }
  throw new Error("MALFORMED_RESPONSE");
}

function normalizeLayer(value:unknown):Layer{
  const record=object(value);
  return {
    ...record,
    ...(record.steward!==undefined?{steward:scalarText(record.steward)}:{}),
    ...(record.name!==undefined?{name:scalarText(record.name)}:{}),
    ...(record.charter_url!==undefined?{charter_url:scalarText(record.charter_url)}:{}),
    ...(record.charter_digest!==undefined?{charter_digest:scalarText(record.charter_digest)}:{}),
    ...(record.bbox_json!==undefined?{bbox_json:jsonText(record.bbox_json)}:{}),
    ...(record.version!==undefined?{version:decimal(record.version)}:{}),
    ...(record.feature_count!==undefined?{feature_count:decimal(record.feature_count)}:{}),
  } as unknown as Layer;
}

function normalizeFeature(value:unknown):Feature{
  const record=object(value);
  return {
    ...record,
    ...(record.layer_id!==undefined?{layer_id:decimal(record.layer_id)}:{}),
    ...(record.feature_key!==undefined?{feature_key:scalarText(record.feature_key)}:{}),
    ...(record.attrs_json!==undefined?{attrs_json:jsonText(record.attrs_json)}:{}),
    ...(record.geometry_digest!==undefined?{geometry_digest:scalarText(record.geometry_digest)}:{}),
    ...(record.coarse_geohash!==undefined?{coarse_geohash:scalarText(record.coarse_geohash)}:{}),
    ...(record.version!==undefined?{version:decimal(record.version)}:{}),
    ...(record.active!==undefined?{active:Boolean(record.active)}:{}),
  } as unknown as Feature;
}

function normalizeCluster(value:unknown):Cluster{
  const record=object(value);
  return {
    ...record,
    ...(record.submitter!==undefined?{submitter:scalarText(record.submitter)}:{}),
    ...(record.layer_id!==undefined?{layer_id:decimal(record.layer_id)}:{}),
    ...(record.feature_id!==undefined?{feature_id:decimal(record.feature_id)}:{}),
    ...(record.attribute!==undefined?{attribute:scalarText(record.attribute)}:{}),
    ...(record.value!==undefined?{value:scalarText(record.value)}:{}),
    ...(record.bundle_url!==undefined?{bundle_url:scalarText(record.bundle_url)}:{}),
    ...(record.bundle_digest!==undefined?{bundle_digest:scalarText(record.bundle_digest)}:{}),
    ...(record.geohash!==undefined?{geohash:scalarText(record.geohash)}:{}),
    ...(record.base_version!==undefined?{base_version:decimal(record.base_version)}:{}),
    ...(record.status!==undefined?{status:numeric(record.status)}:{}),
    ...(record.related_json!==undefined?{related_json:jsonText(record.related_json)}:{}),
    ...(record.reason_code!==undefined?{reason_code:scalarText(record.reason_code)}:{}),
    ...(record.rationale!==undefined?{rationale:scalarText(record.rationale)}:{}),
  } as unknown as Cluster;
}

function normalizeRelated(value:unknown):Related{
  const record=object(value);
  return {
    ...record,
    ...(record.delta_id!==undefined?{delta_id:decimal(record.delta_id)}:{}),
    ...(record.distance!==undefined?{distance:scalarText(record.distance)}:{}),
    ...(record.status!==undefined?{status:scalarText(record.status)}:{}),
    ...(record.summary!==undefined?{summary:scalarText(record.summary)}:{}),
  } as unknown as Related;
}

export async function getFeature(id:string):Promise<Feature>{return normalizeFeature(await contractRead("get_feature",[u256Id(id)]));}
export async function getLayer(id:string):Promise<Layer>{return normalizeLayer(await contractRead("get_layer",[u256Id(id)]));}
export async function getCluster(id:string):Promise<Cluster>{return normalizeCluster(await contractRead("get_cluster",[u256Id(id)]));}

async function ids(method:string,args:unknown[]):Promise<string[]>{
  const data=await contractRead(method,args);
  if(!Array.isArray(data))throw new Error("MALFORMED_RESPONSE");
  return data.map(decimal);
}

export async function getClusters(offset=0,limit=32):Promise<Cluster[]>{
  const data=await contractRead("get_clusters",[offset,limit]);
  if(!Array.isArray(data))throw new Error("MALFORMED_RESPONSE");
  return data.map(normalizeCluster);
}

export async function getClusterEntries(offset=0,limit=32):Promise<{id:string;cluster:Cluster}[]>{
  const [entries,entityIds]=await Promise.all([getClusters(offset,limit),ids("get_cluster_ids",[offset,limit])]);
  if(entries.length!==entityIds.length)throw new Error("MALFORMED_RESPONSE");
  return entries.map((cluster,index)=>({id:entityIds[index],cluster}));
}

export async function getLayerClusters(id:string,offset=0,limit=32):Promise<Cluster[]>{
  const data=await contractRead("get_layer_clusters",[u256Id(id),offset,limit]);
  if(!Array.isArray(data))throw new Error("MALFORMED_RESPONSE");
  return data.map(normalizeCluster);
}

export async function getLayers(offset=0,limit=32):Promise<Layer[]>{
  const data=await contractRead("get_layers",[offset,limit]);
  if(!Array.isArray(data))throw new Error("MALFORMED_RESPONSE");
  return data.map(normalizeLayer);
}

export async function getLayerEntries(offset=0,limit=32):Promise<{id:string;layer:Layer}[]>{
  const [entries,entityIds]=await Promise.all([getLayers(offset,limit),ids("get_layer_ids",[offset,limit])]);
  if(entries.length!==entityIds.length)throw new Error("MALFORMED_RESPONSE");
  return entries.map((layer,index)=>({id:entityIds[index],layer}));
}

export async function getLayerFeatures(id:string,offset=0,limit=32):Promise<Feature[]>{
  const data=await contractRead("get_layer_features",[u256Id(id),offset,limit]);
  if(!Array.isArray(data))throw new Error("MALFORMED_RESPONSE");
  return data.map(normalizeFeature);
}

export async function getLayerFeatureEntries(id:string,offset=0,limit=32):Promise<{id:string;feature:Feature}[]>{
  const [entries,entityIds]=await Promise.all([getLayerFeatures(id,offset,limit),ids("get_layer_feature_ids",[u256Id(id),offset,limit])]);
  if(entries.length!==entityIds.length)throw new Error("MALFORMED_RESPONSE");
  return entries.map((feature,index)=>({id:entityIds[index],feature}));
}

export async function getHistory(id:string):Promise<unknown[]>{
  const data=await contractRead("get_feature_history",[u256Id(id),0,32]);
  if(!Array.isArray(data))throw new Error("MALFORMED_RESPONSE");
  return data;
}

export async function related(id:string):Promise<Related[]>{
  const data=await contractRead("preview_related",[u256Id(id),8]);
  if(!Array.isArray(data))throw new Error("MALFORMED_RESPONSE");
  return data.map(item=>normalizeRelated(typeof item==="string"?JSON.parse(item):item));
}
