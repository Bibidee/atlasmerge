"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {Shell} from "../../components/shell";
import {Unavailable} from "../../components/live";
import {getLayerEntries} from "../../lib/genlayer/data-source";
import type {Layer} from "../../lib/genlayer/types";
export default function Layers(){const [layers,setLayers]=useState<{id:string;layer:Layer}[]>([]);const [error,setError]=useState("");useEffect(()=>{getLayerEntries().then(setLayers).catch(e=>setError(e instanceof Error?e.message:"Unavailable"));},[]);return <Shell><section className="table-sheet"><p className="eyebrow">AUTHORITATIVE LAYERS</p><h1>Layer registry</h1>{error?<Unavailable message={error}/>:layers.length?layers.map(({id,layer})=><article key={id}><Link href={`/layers/${id}`}>{layer.name}</Link><p>Layer {id} · {layer.feature_count} registered features</p><small>Steward {layer.steward}</small></article>):<p>No layers have been created on this contract yet.</p>}</section></Shell>}
