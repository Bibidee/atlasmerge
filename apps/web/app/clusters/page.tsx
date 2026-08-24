"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Shell } from "../../components/shell";
import { Unavailable } from "../../components/live";
import { getClusters } from "../../lib/genlayer/data-source";
import type { Cluster } from "../../lib/genlayer/types";

export default function Clusters(){
  const [clusters,setClusters]=useState<Cluster[]>([]); const [error,setError]=useState("");
  useEffect(()=>{getClusters().then(setClusters).catch(e=>setError(e instanceof Error?e.message:"Unavailable"));},[]);
  return <Shell><section className="table-sheet"><p className="eyebrow">AUTHORITATIVE CLUSTER INDEX</p><h1>Cluster review board</h1>{error?<Unavailable message={error}/>:clusters.length?<div>{clusters.map((cluster,index)=><article key={`${cluster.feature_id}-${cluster.bundle_digest}`}><Link href={`/clusters/${index+1}`}>Cluster {index+1}</Link><p>{cluster.attribute} → {cluster.value} · status {cluster.status}</p><small>{cluster.bundle_url}</small></article>)}</div>:<p>No clusters have been created on this contract yet.</p>}</section></Shell>;
}
