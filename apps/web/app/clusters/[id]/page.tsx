"use client";
import {useEffect,useState} from "react";
import {Shell} from "../../../components/shell";
import {Unavailable} from "../../../components/live";
import {TransactionRail} from "../../../components/transaction-rail";
import {contractWrite} from "../../../lib/genlayer/contract";
import {getCluster,getFeature,related} from "../../../lib/genlayer/data-source";
import {canAdjudicate,clusterStatusLabel,currentFeatureValue} from "../../../lib/genlayer/cluster-ui";
import type {Cluster,Feature,Related,TxStage} from "../../../lib/genlayer/types";

export default function ClusterPage({params}:{params:Promise<{id:string}>}){
  const [id,setId]=useState(""),[cluster,setCluster]=useState<Cluster>(),[feature,setFeature]=useState<Feature>(),[memories,setMemories]=useState<Related[]>([]),[error,setError]=useState(""),[stage,setStage]=useState<TxStage>("idle"),[hash,setHash]=useState("");
  useEffect(()=>{params.then(async p=>{setId(p.id);try{const loaded=await getCluster(p.id);setCluster(loaded);const [memory,featureRead]=await Promise.all([related(p.id).catch(()=>[]),getFeature(loaded.feature_id)]);setMemories(memory);setFeature(featureRead);}catch(e){setError(e instanceof Error?e.message:"Unavailable")}})},[params]);
  async function adjudicate(){if(!cluster||!canAdjudicate(cluster))return;try{await contractWrite("adjudicate_cluster",[id],(s,h,m)=>{setStage(s);setHash(h??"");if(m)setError(m)});setCluster(await getCluster(id));}catch(e){setError(e instanceof Error?e.message:"Write failed")}}
  return <Shell><TransactionRail stage={stage} hash={hash} message={error}/>{error&&!cluster?<Unavailable message={error}/>:cluster?<section className="compare"><div className="evidence"><p className="eyebrow">IMMUTABLE EVIDENCE</p><a href={cluster.bundle_url}>{cluster.bundle_url}</a><code>{cluster.bundle_digest}</code><p>Bound to feature version {cluster.base_version} · {cluster.geohash}</p></div><div className="decision"><p className="eyebrow">CLUSTER {id}</p><h1>One feature, one attribute.</h1><p>Status: <strong>{clusterStatusLabel(cluster.status)}</strong></p><p>{cluster.rationale||"Awaiting semantic adjudication of bounded public evidence."}</p>{canAdjudicate(cluster)?<button onClick={adjudicate} disabled={stage!=="idle"}>Adjudicate on StudioNet</button>:<p className="notice">This cluster is terminal and cannot be adjudicated again.</p>}</div><aside className="memory"><h2>Related records retrieved</h2>{memories.length?memories.map(m=><div key={m.delta_id}><strong>Delta {m.delta_id}</strong><small>raw distance {m.distance}</small></div>):<p>No eligible semantic memory found.</p>}</aside><footer><span>BEFORE</span><b>{currentFeatureValue(feature,cluster.attribute)}</b><i>→</i><b>{cluster.value}</b><span>PROPOSED</span></footer></section>:null}</Shell>;
}
