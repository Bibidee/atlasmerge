export type ReadbackOptions = { attempts?: number; delayMs?: number };

export class AuthoritativeReadbackTimeout extends Error {
  constructor(message = "Transaction finalized, but authoritative state is not yet available. Check the Explorer or retry refresh.", options?: { cause?: unknown }) {
    super(message, options);
    this.name = "AuthoritativeReadbackTimeout";
  }
}

const bounded = (value: number | undefined, fallback: number, max: number) =>
  Math.min(max, Math.max(1, Math.floor(value ?? fallback)));

/** Polls reads only, with a hard upper bound, until the authoritative predicate matches. */
export async function pollAuthoritativeState<T>(
  readFn: () => Promise<T>,
  predicate: (value: T) => boolean,
  options: ReadbackOptions = {},
): Promise<T> {
  const attempts = bounded(options.attempts, 6, 12);
  const delayMs = bounded(options.delayMs, 1_000, 5_000);
  let lastError: unknown;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const value = await readFn();
      if (predicate(value)) return value;
    } catch (error) {
      lastError = error;
    }
    if (attempt < attempts - 1) await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  throw new AuthoritativeReadbackTimeout(undefined, { cause: lastError });
}
