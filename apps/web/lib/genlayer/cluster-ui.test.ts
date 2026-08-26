import {describe,expect,it} from "vitest";
import {canAdjudicate,clusterComparison,clusterStatusLabel,currentFeatureValue} from "./cluster-ui";

describe("terminal cluster UI",()=>{
  it.each([[2,"PENDING"],[3,"ACCEPTED"],[4,"REJECTED"],[5,"SPLIT REQUIRED"],[6,"INSUFFICIENT EVIDENCE"]] as const)("renders status %s as %s",(status,label)=>expect(clusterStatusLabel(status)).toBe(label));

  it("only enables adjudication for pending clusters",()=>{
    expect(canAdjudicate({status:2})).toBe(true);
    for(const status of [3,4,5,6])expect(canAdjudicate({status})).toBe(false);
  });

  it("reads the current feature value",()=>{
    const feature={attrs_json:'{"name":"National Arts Theatre","status":"OPEN"}'} as never;
    expect(currentFeatureValue(feature,"name")).toBe("National Arts Theatre");
    expect(currentFeatureValue(feature,"category")).toBe("Not recorded");
  });

  it("uses immutable history for an accepted cluster",()=>{
    const cluster={status:3,attribute:"category",value:"Cultural Landmark"} as never;
    const feature={attrs_json:'{"category":"Cultural Landmark"}'} as never;
    const history=[{cluster_id:"3",attribute:"category",old_value:"Performing Arts Venue",new_value:"Cultural Landmark"}];
    expect(clusterComparison(cluster,feature,history,"3")).toEqual({leftLabel:"BEFORE",left:"Performing Arts Venue",rightLabel:"ACCEPTED",right:"Cultural Landmark"});
  });

  it("does not call a live current value BEFORE when no immutable accepted delta is available",()=>{
    const cluster={status:3,attribute:"category",value:"Cultural Landmark"} as never;
    const feature={attrs_json:'{"category":"Cultural Landmark"}'} as never;
    expect(clusterComparison(cluster,feature,[],"3")).toEqual({leftLabel:"CURRENT",left:"Cultural Landmark",rightLabel:"ACCEPTED",right:"Cultural Landmark"});
  });
});
