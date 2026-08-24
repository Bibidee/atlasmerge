import {describe,expect,it} from "vitest";
import {bboxToE6,canonicalBboxJson,coordinateToE6} from "./coordinates";

describe("fixed-point coordinates",()=>{
  it("converts the Lagos regression values exactly",()=>{
    expect(bboxToE6({min_lat:"6.45",max_lat:"6.65",min_lng:"3.25",max_lng:"3.55"})).toEqual({
      min_lat_e6:6_450_000n,max_lat_e6:6_650_000n,min_lng_e6:3_250_000n,max_lng_e6:3_550_000n,
    });
  });
  it("supports negative, zero, and six-decimal values",()=>{
    expect(coordinateToE6("-3.123456","longitude")).toBe(-3_123_456n);
    expect(coordinateToE6("0","latitude")).toBe(0n);
    expect(coordinateToE6("+6.000001","latitude")).toBe(6_000_001n);
  });
  it("rejects precision loss, bounds errors, and reversed boxes",()=>{
    expect(()=>coordinateToE6("6.1234567","latitude")).toThrow("at most 6");
    expect(()=>coordinateToE6("90.000001","latitude")).toThrow("outside");
    expect(()=>coordinateToE6("-180.000001","longitude")).toThrow("outside");
    expect(()=>bboxToE6({min_lat:"7",max_lat:"6",min_lng:"3",max_lng:"4"})).toThrow("minimums");
  });
  it("matches the contract's canonical persisted JSON",()=>{
    expect(canonicalBboxJson(bboxToE6({min_lat:"6.45",max_lat:"6.65",min_lng:"3.25",max_lng:"3.55"}))).toBe('{"max_lat_e6":6650000,"max_lng_e6":3550000,"min_lat_e6":6450000,"min_lng_e6":3250000}');
  });
});
