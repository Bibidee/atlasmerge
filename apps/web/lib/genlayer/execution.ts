export type ExecutionClassification = "success" | "failure" | "unknown";

const token = (value: unknown) => typeof value === "string" ? value.trim().toUpperCase().replace(/[\s-]+/g, "_") : "";
const successTokens = new Set(["SUCCESS", "SUCCEEDED", "FINISHED_WITH_RETURN", "FINISHEDWITHRETURN"]);
const failureTokens = new Set(["FAILURE", "FAILED", "ERROR", "ROLLBACK", "REVERT", "REVERTED", "FINISHED_WITH_ERROR", "FINISHEDWITHERROR"]);

function classifyValue(value: unknown, key = ""): ExecutionClassification {
  if (typeof value === "number" || (typeof value === "string" && /^\d+$/.test(value.trim()))) {
    const numeric = Number(value);
    if (/result_code/i.test(key)) return numeric === 0 ? "success" : "failure";
    if (/tx.?execution.?result/i.test(key)) return numeric === 1 ? "success" : numeric === 2 ? "failure" : "unknown";
    return "unknown";
  }
  const normalized = token(value);
  if (successTokens.has(normalized)) return "success";
  if (failureTokens.has(normalized)) return "failure";
  return "unknown";
}

/** Interpret only authoritative execution fields; receipt finality alone is not execution success. */
export function classifyExecution(transaction: unknown): ExecutionClassification {
  if (!transaction || typeof transaction !== "object") return "unknown";
  const record = transaction as Record<string, unknown>;
  const direct: ExecutionClassification[] = [];
  for (const [key, value] of Object.entries(record)) {
    if (/^txExecutionResult(Name)?$/i.test(key) || /^execution(Result(Name)?|_result)$/i.test(key) || /^result_code$/i.test(key) || /leader.*execution|execution.*leader/i.test(key)) {
      direct.push(classifyValue(value, key));
    }
  }
  if (direct.includes("failure")) return "failure";
  if (direct.includes("success")) return "success";
  const nested: ExecutionClassification[] = [];
  for (const [key, value] of Object.entries(record)) {
    if (!value || typeof value !== "object") {
      if (key === "result") nested.push(classifyValue(value, key));
      continue;
    }
    if (/leader|receipt|trace|execution|result|data/i.test(key)) nested.push(classifyExecution(value));
  }
  if (nested.includes("failure")) return "failure";
  if (nested.includes("success")) return "success";
  return "unknown";
}

export function executionSucceeded(transaction: unknown): boolean { return classifyExecution(transaction) === "success"; }
export function executionFailure(transaction: unknown): string {
  return typeof transaction === "object" && transaction ? JSON.stringify(transaction).slice(0, 300) : "Execution details unavailable";
}
