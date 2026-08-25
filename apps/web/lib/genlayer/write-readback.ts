import type {Cluster,Feature,Layer} from "./types";

export const matchesLayer=(layer:Layer,expected:{name:string;charterDigest:string;bboxJson:string})=>layer.name===expected.name&&layer.charter_digest===expected.charterDigest&&layer.bbox_json===expected.bboxJson;
export const matchesFeature=(feature:Feature,expected:{featureKey:string;geometryDigest:string;geohash:string})=>feature.feature_key===expected.featureKey&&feature.geometry_digest===expected.geometryDigest&&feature.coarse_geohash===expected.geohash;
export const matchesPendingCluster=(cluster:Cluster,expected:{layerId:string;featureId:string;attribute:string;value:string;url:string;digest:string;geohash:string})=>cluster.layer_id===expected.layerId&&cluster.feature_id===expected.featureId&&cluster.attribute===expected.attribute&&cluster.value===expected.value&&cluster.bundle_url===expected.url&&cluster.bundle_digest===expected.digest&&cluster.geohash===expected.geohash&&Number(cluster.status)===2;
export const isTerminalCluster=(cluster:Cluster)=>Number(cluster.status)!==2;
