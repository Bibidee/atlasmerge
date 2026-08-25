"use client";
import {useEffect} from "react";

export default function ClusterDetailError({reset}:{error:Error&{digest?:string};reset:()=>void}){
  useEffect(()=>{console.error("[AtlasMerge] cluster detail render failure")},[]);
  return <section className="sheet"><p className="eyebrow">CLUSTER DETAIL</p><h1>Cluster detail could not be rendered.</h1><p>Authoritative data could not be displayed. Retry the read without submitting a new transaction.</p><button onClick={reset}>Retry</button></section>;
}
