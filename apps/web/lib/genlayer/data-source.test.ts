import {beforeEach,describe,expect,it,vi} from "vitest";
const {read}=vi.hoisted(()=>({read:vi.fn()}));
vi.mock("./contract",()=>({contractRead:read}));
import {getCluster,getFeature,getHistory,getLayer,getLayerFeatureEntries,getLayerFeatures,related} from "./data-source";
describe("entity reads use numeric u256 calldata",()=>{
  beforeEach(()=>read.mockReset());
  it("/layers/1 reads Layer 1 with bigint calldata",async()=>{read.mockResolvedValue({name:"Lagos"});await getLayer("1");expect(read).toHaveBeenCalledWith("get_layer",[1n]);});
  it("empty layer features read successfully",async()=>{read.mockResolvedValueOnce([]).mockResolvedValueOnce([]);expect(await getLayerFeatures("1")).toEqual([]);read.mockReset();read.mockResolvedValueOnce([]).mockResolvedValueOnce([]);expect(await getLayerFeatureEntries("1")).toEqual([]);expect(read).toHaveBeenCalledWith("get_layer_feature_ids",[1n,0,32]);});
  it("feature, cluster, history, and related reads normalize IDs",async()=>{read.mockResolvedValue({});await getFeature("1");expect(read).toHaveBeenLastCalledWith("get_feature",[1n]);read.mockResolvedValue({});await getCluster("1");expect(read).toHaveBeenLastCalledWith("get_cluster",[1n]);read.mockResolvedValue([]);await getHistory("1");expect(read).toHaveBeenLastCalledWith("get_feature_history",[1n,0,32]);read.mockResolvedValue([]);await related("1");expect(read).toHaveBeenLastCalledWith("preview_related",[1n,8]);});
  it("invalid route IDs fail before RPC",async()=>{await expect(getLayer("1.0")).rejects.toThrow("INVALID_ENTITY_ID");await expect(getFeature("-1")).rejects.toThrow("INVALID_ENTITY_ID");expect(read).not.toHaveBeenCalled();});
});
