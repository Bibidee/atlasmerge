import {describe,expect,it,vi} from "vitest";
import {matchesFeature,matchesLayer,matchesPendingCluster,isTerminalCluster} from "./write-readback";
import {pollAuthoritativeState} from "./authoritative-readback";
import type {Cluster,Feature,Layer} from "./types";

const layer={name:"Lagos",charter_digest:"sha256:x",bbox_json:"{}"} as Layer;
const feature={feature_key:"venue",geometry_digest:"sha256:y",coarse_geohash:"u09tun"} as Feature;
const cluster={layer_id:"2",feature_id:"3",attribute:"name",value:"New name",bundle_url:"https://e.test",bundle_digest:"sha256:z",geohash:"u09tun",status:2} as Cluster;

describe("write readback identity and lifecycle predicates",()=>{
  it("locates a delayed layer without writing twice",async()=>{const read=vi.fn<()=>Promise<{layer:typeof layer}[]>>().mockResolvedValueOnce([]).mockResolvedValueOnce([{layer}]);await expect(pollAuthoritativeState(read,entries=>entries.some(entry=>matchesLayer(entry.layer,{name:"Lagos",charterDigest:"sha256:x",bboxJson:"{}"})),{attempts:2,delayMs:1})).resolves.toHaveLength(1);expect(read).toHaveBeenCalledTimes(2)});
  it("locates a delayed feature by authoritative identity",async()=>{const read=vi.fn<()=>Promise<{feature:typeof feature}[]>>().mockResolvedValueOnce([]).mockResolvedValueOnce([{feature}]);await expect(pollAuthoritativeState(read,entries=>entries.some(entry=>matchesFeature(entry.feature,{featureKey:"venue",geometryDigest:"sha256:y",geohash:"u09tun"})),{attempts:2,delayMs:1})).resolves.toHaveLength(1)});
  it("locates only the pending submitted cluster",()=>{expect(matchesPendingCluster(cluster,{layerId:"2",featureId:"3",attribute:"name",value:"New name",url:"https://e.test",digest:"sha256:z",geohash:"u09tun"})).toBe(true);expect(matchesPendingCluster({...cluster,status:3},{layerId:"2",featureId:"3",attribute:"name",value:"New name",url:"https://e.test",digest:"sha256:z",geohash:"u09tun"})).toBe(false)});
  it("waits for a terminal adjudication state",async()=>{const read=vi.fn<()=>Promise<Cluster>>().mockResolvedValueOnce(cluster).mockResolvedValueOnce({...cluster,status:3});await expect(pollAuthoritativeState(read,isTerminalCluster,{attempts:2,delayMs:1})).resolves.toMatchObject({status:3});expect(read).toHaveBeenCalledTimes(2)});
});
