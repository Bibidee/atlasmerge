import {beforeEach,describe,expect,it,vi} from "vitest";
const {read}=vi.hoisted(()=>({read:vi.fn()}));
vi.mock("./contract",()=>({contractRead:read}));
import {getCluster,getClusterEntries,getFeature,getHistory,getLayer,getLayerFeatureEntries,getLayerFeatures,related} from "./data-source";

describe("entity reads use numeric u256 calldata",()=>{
  beforeEach(()=>read.mockReset());

  it("/layers/1 reads Layer 1 with bigint calldata",async()=>{
    read.mockResolvedValue({name:"Lagos"});
    await getLayer("1");
    expect(read).toHaveBeenCalledWith("get_layer",[1n]);
  });

  it("empty layer features read successfully",async()=>{
    read.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    expect(await getLayerFeatures("1")).toEqual([]);
    read.mockReset();
    read.mockResolvedValueOnce([]).mockResolvedValueOnce([]);
    expect(await getLayerFeatureEntries("1")).toEqual([]);
    expect(read).toHaveBeenCalledWith("get_layer_feature_ids",[1n,0,32]);
  });

  it("feature, cluster, history, and related reads normalize route IDs",async()=>{
    read.mockResolvedValue({});
    await getFeature("1");
    expect(read).toHaveBeenLastCalledWith("get_feature",[1n]);
    read.mockResolvedValue({});
    await getCluster("1");
    expect(read).toHaveBeenLastCalledWith("get_cluster",[1n]);
    read.mockResolvedValue([]);
    await getHistory("1");
    expect(read).toHaveBeenLastCalledWith("get_feature_history",[1n,0,32]);
    read.mockResolvedValue([]);
    await related("1");
    expect(read).toHaveBeenLastCalledWith("preview_related",[1n,8]);
  });

  it("normalizes bigint and numeric ABI fields at the data boundary",async()=>{
    read.mockResolvedValueOnce({layer_id:2n,feature_id:3n,base_version:1n,status:2n,attribute:"category",value:"Cultural Landmark",bundle_url:"https://example.com/evidence",bundle_digest:"sha256:"+"0".repeat(64),geohash:"s14kud"});
    const cluster=await getCluster("3");
    expect(cluster.layer_id).toBe("2");
    expect(cluster.feature_id).toBe("3");
    expect(cluster.base_version).toBe("1");
    expect(cluster.status).toBe(2);

    read.mockResolvedValueOnce({layer_id:2,version:7n,feature_key:"poi"});
    const feature=await getFeature("3");
    expect(feature.layer_id).toBe("2");
    expect(feature.version).toBe("7");

    read.mockResolvedValueOnce({version:4n,feature_count:9, name:"Layer"});
    const layer=await getLayer("2");
    expect(layer.version).toBe("4");
    expect(layer.feature_count).toBe("9");
  });

  it("normalizes entity and related IDs returned as bigint",async()=>{
    read.mockResolvedValueOnce([{layer_id:2n,feature_id:3n,base_version:1n,status:2n}]).mockResolvedValueOnce([3n]);
    const entries=await getClusterEntries();
    expect(entries[0].id).toBe("3");
    expect(entries[0].cluster.feature_id).toBe("3");

    read.mockResolvedValueOnce([{delta_id:5n,distance:0.125}]);
    const memories=await related("3");
    expect(memories).toEqual([{delta_id:"5",distance:"0.125"}]);
  });

  it("rejects malformed numeric ABI fields instead of throwing trim errors",async()=>{
    read.mockResolvedValue({layer_id:{bad:true},feature_id:3n,base_version:1n,status:2n});
    await expect(getCluster("3")).rejects.toThrow("MALFORMED_RESPONSE");
  });

  it("invalid route IDs fail before RPC",async()=>{
    await expect(getLayer("1.0")).rejects.toThrow("INVALID_ENTITY_ID");
    await expect(getFeature("-1")).rejects.toThrow("INVALID_ENTITY_ID");
    expect(read).not.toHaveBeenCalled();
  });
});
