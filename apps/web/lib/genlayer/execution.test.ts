import { describe, expect, it } from "vitest"; import { classifyExecution, executionSucceeded } from "./execution";
describe("execution result interpretation",()=>{
  it("accepts FINISHED_WITH_RETURN",()=>expect(classifyExecution({txExecutionResultName:"FINISHED_WITH_RETURN"})).toBe("success"));
  it("accepts the numeric SDK success equivalent",()=>expect(classifyExecution({txExecutionResult:1})).toBe("success"));
  it("accepts StudioNet leader SUCCESS",()=>expect(classifyExecution({leader:{execution_result:"SUCCESS"}})).toBe("success"));
  it("classifies explicit FINISHED_WITH_ERROR as rollback evidence",()=>expect(classifyExecution({txExecutionResultName:"FINISHED_WITH_ERROR"})).toBe("failure"));
  it("classifies explicit trace failure as rollback evidence",()=>expect(classifyExecution({result_code:3})).toBe("failure"));
  it("never treats missing execution data as rollback",()=>{expect(classifyExecution({status:"FINALIZED"})).toBe("unknown");expect(executionSucceeded({status:"FINALIZED"})).toBe(false);});
  it("does not call a finalized rollback successful",()=>expect(executionSucceeded({status:"FINALIZED",result:"ROLLBACK"})).toBe(false));
});
