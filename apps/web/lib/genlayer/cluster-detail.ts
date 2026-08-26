import {getCluster,getFeature,getHistory,related} from "./data-source";
import type {Cluster,Feature,Related} from "./types";

type Readers={
  getCluster:(clusterId:string)=>Promise<Cluster>;
  getFeature:(featureId:string)=>Promise<Feature>;
  getHistory:(featureId:string)=>Promise<unknown[]>;
  related:(clusterId:string)=>Promise<Related[]>;
};

export type ClusterDetail={
  cluster:Cluster;
  feature?:Feature;
  history:unknown[];
  memories:Related[];
  featureError:string;
  relatedError:string;
};

const defaultReaders:Readers={getCluster,getFeature,getHistory,related};
const errorMessage=(value:unknown,fallback:string)=>value instanceof Error?value.message:fallback;

export async function loadClusterDetail(clusterId:string,readers:Readers=defaultReaders):Promise<ClusterDetail>{
  const cluster=await readers.getCluster(clusterId);
  const [featureResult,relatedResult]=await Promise.allSettled([
    Promise.all([readers.getFeature(cluster.feature_id),readers.getHistory(cluster.feature_id)]),
    readers.related(clusterId),
  ]);
  return {
    cluster,
    feature:featureResult.status==="fulfilled"?featureResult.value[0]:undefined,
    history:featureResult.status==="fulfilled"?featureResult.value[1]:[],
    memories:relatedResult.status==="fulfilled"?relatedResult.value:[],
    featureError:featureResult.status==="rejected"?errorMessage(featureResult.reason,"Feature data unavailable"):"",
    relatedError:relatedResult.status==="rejected"?errorMessage(relatedResult.reason,"Related memory unavailable"):"",
  };
}
