import {describe,expect,it,vi} from "vitest";
import {loadClusterDetail} from "./cluster-detail";
import type {Cluster,Feature} from "./types";

const cluster={feature_id:"2"} as Cluster;
const feature={feature_key:"national-arts-theatre-iganmu"} as Feature;

describe("cluster detail reads",()=>{
  it("uses the cluster ID for preview_related when feature and cluster IDs differ",async()=>{
    const readers={getCluster:vi.fn().mockResolvedValue(cluster),getFeature:vi.fn().mockResolvedValue(feature),getHistory:vi.fn().mockResolvedValue([]),related:vi.fn().mockResolvedValue([])};
    await expect(loadClusterDetail("7",readers)).resolves.toMatchObject({cluster,feature,memories:[]});
    expect(readers.getCluster).toHaveBeenCalledWith("7");
    expect(readers.getFeature).toHaveBeenCalledWith("2");
    expect(readers.getHistory).toHaveBeenCalledWith("2");
    expect(readers.related).toHaveBeenCalledWith("7");
  });

  it("keeps the cluster usable when an optional related-memory read fails",async()=>{
    const readers={getCluster:vi.fn().mockResolvedValue(cluster),getFeature:vi.fn().mockResolvedValue(feature),getHistory:vi.fn().mockResolvedValue([]),related:vi.fn().mockRejectedValue(new Error("memory unavailable"))};
    await expect(loadClusterDetail("7",readers)).resolves.toMatchObject({cluster,feature,memories:[],relatedError:"memory unavailable"});
  });
});
