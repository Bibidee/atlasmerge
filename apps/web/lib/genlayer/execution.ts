export function executionSucceeded(transaction: unknown): boolean {
  if (!transaction || typeof transaction !== "object") return false;
  const raw = JSON.stringify(transaction).toLowerCase();
  return (raw.includes("success") || raw.includes("succeeded")) && !raw.includes("rollback") && !raw.includes("revert");
}
export function executionFailure(transaction: unknown): string {
  return typeof transaction === "object" && transaction ? JSON.stringify(transaction).slice(0, 300) : "Execution details unavailable";
}
