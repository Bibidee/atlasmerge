import { createClient } from "genlayer-js";
import { studionet } from "genlayer-js/chains";
import { ExecutionResult, TransactionStatus, type TransactionHash } from "genlayer-js/types";
import { config } from "./config";
import { injectedProvider } from "./client";
import type { TxStage } from "./types";

const address = () => {
  if (!config.isConfigured) throw new Error("UNAVAILABLE_READ: contract address is not configured");
  return config.contractAddress as `0x${string}`;
};
const readClient = () => createClient({ chain: studionet, endpoint: config.endpoint });

export async function contractRead(method: string, args: unknown[] = []): Promise<unknown> {
  return readClient().readContract({ address: address(), functionName: method, args: args as never[] });
}

export async function contractWrite(method: string, args: unknown[], setStage: (stage: TxStage, hash?: string, message?: string) => void) {
  const provider = injectedProvider();
  if (!provider) throw new Error("No injected wallet found");
  setStage("signing");
  const accounts = await provider.request({ method: "eth_requestAccounts" }) as string[];
  const account = accounts?.[0] as `0x${string}` | undefined;
  if (!account) throw new Error("Wallet did not provide an account");
  const writeClient = createClient({ chain: studionet, endpoint: config.endpoint, account, provider });
  await writeClient.connect("studionet");
  const hash = await writeClient.writeContract({ address: address(), functionName: method, args: args as never[], value: 0n }) as TransactionHash;
  setStage("submitted", hash); setStage("pending", hash);
  const receipt = await readClient().waitForTransactionReceipt({ hash, status: TransactionStatus.FINALIZED, interval: 5_000, retries: 90 });
  if (receipt.statusName === TransactionStatus.UNDETERMINED) { setStage("rollback", hash, "Consensus was undetermined; no state changed"); throw new Error("UNDETERMINED"); }
  if (receipt.txExecutionResultName !== ExecutionResult.FINISHED_WITH_RETURN) { setStage("rollback", hash, "Finalized without a successful GenVM return"); throw new Error("GENVM_ROLLBACK"); }
  setStage("success", hash); return hash;
}
