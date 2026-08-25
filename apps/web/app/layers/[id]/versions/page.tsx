"use client";
import {useEffect,useState} from "react";
import {Shell} from "../../../../components/shell";
import {Unavailable} from "../../../../components/live";
import {getLayerFeatureEntries} from "../../../../lib/genlayer/data-source";
import type {Feature} from "../../../../lib/genlayer/types";
export default function Versions({params}:{params:Promise<{id:string}>}){const [id,setId]=useState(""),[features,setFeatures]=useState<{id:string;feature:Feature}[]>([]),[error,setError]=useState("");useEffect(()=>{params.then(async p=>{setId(p.id);try{setFeatures(await getLayerFeatureEntries(p.id))}catch(e){setError(e instanceof Error?e.message:"Unavailable")}})},[params]);return <Shell><section className="table-sheet versions"><p className="eyebrow">AUTHORITATIVE LAYER LEDGER</p><h1>Layer {id||"…"}</h1>{error?<Unavailable message={error}/>:features.length?<div>{features.map(({id:featureId,feature})=><article key={featureId}><a href={`/features/${featureId}`}>{feature.feature_key}</a><p>Chain version {feature.version} · {feature.active?"active":"inactive"}</p><code>{feature.attrs_json}</code></article>)}</div>:<p>No registered features for this layer.</p>}</section></Shell>}
