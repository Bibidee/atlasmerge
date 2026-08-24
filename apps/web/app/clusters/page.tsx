"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Shell } from "../../components/shell";
import { Unavailable } from "../../components/live";
import { getClusterEntries } from "../../lib/genlayer/data-source";

export default function Clusters(){
  const [clusters,setClusters]=useState<{id:string;cluster:import("../../lib/genlayer/types").Cluster}[]>([]); const [error,setError]=useState("");
  useEffect(()=>{getClusterEntries().then(setClusters).catch(e=>setError(e instanceof Error?e.message:"Unavailable"));},[]);
  return <Shell><section className="table-sheet"><p className="eyebrow">AUTHORITATIVE CLUSTER INDEX</p><h1>Cluster review board</h1>{error?<Unavailable message={error}/>:clusters.length?<div>{clusters.map(({id,cluster})=><article key={id}><Link href={`/clusters/${id}`}>Cluster {id}</Link><p>{cluster.attribute} → {cluster.value} · status {cluster.status}</p><small>{cluster.bundle_url}</small></article>)}</div>:<p>No clusters have been created on this contract yet.</p>}</section></Shell>;
}
