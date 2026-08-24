export type Status = "PENDING"|"ACCEPTED"|"REJECTED"|"SPLIT_REQUIRED"|"INSUFFICIENT_EVIDENCE";
export type Feature = { layer_id:string; feature_key:string; attrs_json:string; geometry_digest:string; version:string; active:boolean };
export type Layer = { steward:string; name:string; charter_url:string; charter_digest:string; bbox_json:string; version:string; feature_count:string };
export type Cluster = { submitter:string; layer_id:string; feature_id:string; attribute:string; value:string; bundle_url:string; bundle_digest:string; geohash:string; base_version:string; status:number; related_json:string; reason_code:string; rationale:string };
export type Related = { delta_id:string; distance:string; status?:string; summary?:string };
export type TxStage = "idle"|"provider"|"account"|"connecting"|"validating"|"simulating"|"signing"|"submitted"|"pending"|"success"|"timeout"|"undetermined"|"rollback"|"cancelled"|"error";
