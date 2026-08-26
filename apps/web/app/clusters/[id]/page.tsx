"use client";
import {useEffect,useState} from "react";
import {Shell} from "../../../components/shell";
import {Unavailable} from "../../../components/live";
import {TransactionRail} from "../../../components/transaction-rail";
import {contractWrite} from "../../../lib/genlayer/contract";
import {getCluster} from "../../../lib/genlayer/data-source";
import {loadClusterDetail} from "../../../lib/genlayer/cluster-detail";
import {pollAuthoritativeState,AuthoritativeReadbackTimeout} from "../../../lib/genlayer/authoritative-readback";
import {canAdjudicate,clusterComparison,clusterStatusLabel} from "../../../lib/genlayer/cluster-ui";
import type {Cluster,Feature,Related,TxStage} from "../../../lib/genlayer/types";

export default function ClusterPage({params}:{params:Promise<{id:string}>}){
  const [id,setId]=useState(""),[cluster,setCluster]=useState<Cluster>(),[feature,setFeature]=useState<Feature>(),[history,setHistory]=useState<unknown[]>([]),[memories,setMemories]=useState<Related[]>([]),[error,setError]=useState(""),[featureError,setFeatureError]=useState(""),[relatedError,setRelatedError]=useState(""),[stage,setStage]=useState<TxStage>("idle"),[hash,setHash]=useState("");
  async function refresh(clusterId:string){const loaded=await loadClusterDetail(clusterId);setCluster(loaded.cluster);setFeature(loaded.feature);setHistory(loaded.history);setMemories(loaded.memories);setFeatureError(loaded.featureError);setRelatedError(loaded.relatedError);return loaded.cluster;}
  useEffect(()=>{params.then(async p=>{setId(p.id);try{await refresh(p.id)}catch(e){setError(e instanceof Error?e.message:"Unavailable")}})},[params]);
  async function adjudicate(){if(!cluster||!canAdjudicate(cluster))return;setError("");try{const result=await contractWrite("adjudicate_cluster",[id],(s,h,m)=>{setStage(s);setHash(h??"");if(m)setError(m)});if(result.stage!=="success"&&result.stage!=="finalized_unknown")return;await pollAuthoritativeState(()=>getCluster(id),value=>!canAdjudicate(value));await refresh(id);setError("")}catch(e){if(e instanceof AuthoritativeReadbackTimeout){setStage("timeout");setError(e.message)}else setError(e instanceof Error?e.message:"Write failed")}}
  const busy=["provider","account","connecting","validating","simulating","signing","submitted","pending","finalized_unknown"].includes(stage);
  const comparison=cluster?clusterComparison(cluster,feature,history,id):undefined;
  return <Shell><TransactionRail stage={stage} hash={hash} message={error}/>{error&&!cluster?<Unavailable message={error}/>:cluster?<section className="compare"><div className="evidence"><p className="eyebrow">IMMUTABLE EVIDENCE</p><a href={cluster.bundle_url}>{cluster.bundle_url}</a><code>{cluster.bundle_digest}</code><p>Bound to feature version {cluster.base_version} · {cluster.geohash}</p></div><div className="decision"><p className="eyebrow">CLUSTER {id}</p><h1>One feature, one attribute.</h1><p>Status: <strong>{clusterStatusLabel(cluster.status)}</strong></p><p>{cluster.rationale||"Awaiting semantic adjudication of bounded public evidence."}</p>{featureError&&<p className="notice">Feature data unavailable; cluster data is still shown.</p>}{canAdjudicate(cluster)?<button onClick={adjudicate} disabled={busy}>Adjudicate on StudioNet</button>:<p className="notice">This cluster is terminal and cannot be adjudicated again.</p>}</div><aside className="memory"><h2>Related records retrieved</h2>{relatedError?<p className="notice">Related memory unavailable.</p>:memories.length?memories.map(m=><div key={m.delta_id}><strong>Delta {m.delta_id}</strong><small>raw distance {m.distance}</small></div>):<p>No eligible semantic memory found.</p>}</aside>{comparison&&<footer><span>{comparison.leftLabel}</span><b>{comparison.left}</b><i>→</i><b>{comparison.right}</b><span>{comparison.rightLabel}</span></footer>}</section>:null}</Shell>;
}
