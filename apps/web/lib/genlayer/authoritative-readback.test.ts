import {describe,expect,it,vi} from "vitest";
import {AuthoritativeReadbackTimeout,pollAuthoritativeState} from "./authoritative-readback";

describe("bounded authoritative readback",()=>{
  it("waits for a later authoritative value",async()=>{
    const read=vi.fn<()=>Promise<{ready:boolean}>>().mockResolvedValueOnce({ready:false}).mockResolvedValueOnce({ready:true});
    await expect(pollAuthoritativeState(read,value=>value.ready,{attempts:3,delayMs:1})).resolves.toEqual({ready:true});
    expect(read).toHaveBeenCalledTimes(2);
  });
  it("stops at the configured bound and preserves a truthful timeout",async()=>{
    const read=vi.fn<()=>Promise<{ready:boolean}>>().mockResolvedValue({ready:false});
    await expect(pollAuthoritativeState(read,value=>value.ready,{attempts:2,delayMs:1})).rejects.toBeInstanceOf(AuthoritativeReadbackTimeout);
    expect(read).toHaveBeenCalledTimes(2);
  });
  it("does not hide a read error as success",async()=>{
    const read=vi.fn().mockRejectedValue(new Error("RPC unavailable"));
    const error=await pollAuthoritativeState(read,()=>false,{attempts:1,delayMs:1}).catch(value=>value);
    expect(error).toBeInstanceOf(AuthoritativeReadbackTimeout);
    expect((error as Error).cause).toEqual(new Error("RPC unavailable"));
  });
});
