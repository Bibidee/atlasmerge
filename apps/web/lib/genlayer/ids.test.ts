import {describe,expect,it} from "vitest";
import {u256Id} from "./ids";
describe("u256 route boundary",()=>{it("converts canonical decimal IDs to bigint",()=>expect(u256Id("1")).toBe(1n));it.each(["","-1","+1","1.0","01","abc","1e2"])("rejects invalid route ID %s",value=>expect(()=>u256Id(value)).toThrow("INVALID_ENTITY_ID"));});
