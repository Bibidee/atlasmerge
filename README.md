# AtlasMerge

AtlasMerge is a user-facing GenLayer consensus layer for bounded changes to crowdsourced-map features. A submitted cluster proposes exactly one attribute change for one versioned feature; GenLayer validators fetch its public evidence and decide whether the delta is canonical.

## Live project

- App: https://atlasmerge.vercel.app
- Network: GenLayer StudioNet (chain ID 61999)
- Current production contract: `0x473b3ad60d22923aEC7f881f728641F22a4b9ED7` ([StudioNet Explorer](https://explorer-studio.genlayer.com/address/0x473b3ad60d22923aEC7f881f728641F22a4b9ED7)). Earlier deployments are superseded and retained only as historical evidence.

## Evidence and consensus

Evidence must be a direct HTTPS URL. The submitter supplies `sha256:<64 lowercase hex>` over one bounded exact UTF-8 text artifact (6,000 characters maximum). During adjudication every validator fetches that same bounded artifact, verifies the digest, and sends the identical text to the consensus prompt as untrusted data. An unavailable, malformed, oversized, or digest-mismatched source resolves fail-closed as `INSUFFICIENT_EVIDENCE`; it never mutates the feature.

The Report page computes that digest automatically when the source permits browser CORS reads. If CORS prevents that read, a mapper may paste a manually computed digest; AtlasMerge has no backend bypass and validators still independently fetch and verify the URL.

Validators only settle the submitted attribute and value. `ACCEPT_DELTA` additionally requires accessible evidence, `feature_match == MATCH`, and `support == SUPPORTED`. Feature versions prevent stale writes. Accepted deltas append immutable history; rejection, split, insufficient evidence, cancellation, and undetermined consensus do not change feature attributes.

VecDB stores accepted-delta precedent. It is bounded retrieval context filtered by layer and exact geohash cell (precision 5–12), never authorization or an automatic verdict. Only retrieved, eligible, ascending canonical precedent IDs may be persisted. Consensus persists a bounded `reason_code`, not free-form model rationale.

## User workflow

1. Create a layer from the authoritative Layer Registry, then open it and register its first feature as the steward.
2. A user submits a one-attribute cluster with HTTPS evidence, digest, and geohash.
3. Any wallet may trigger adjudication.
4. Browse authoritative clusters, feature history, evidence, rationale, and eligible precedent from contract views.

## Development

```powershell
Copy-Item .env.example apps/web/.env.local
npm install --prefix apps/web
npm run test
npm run typecheck
npm run lint
npm run build
```

`NEXT_PUBLIC_ATLASMERGE_CONTRACT` must be set to a successful StudioNet deployment. The frontend pre-simulates deterministic writes, then uses `genlayer-js` clients for injected-wallet writes, StudioNet switching, and finalized receipt checks; finality alone is never treated as success.

## Structure

- `contracts/atlasmerge.py` — intelligent contract and authoritative state.
- `apps/web` — Next.js injected-wallet application.
- `tests/direct` — direct contract source invariants; use the GenLayer test suite/Direct Mode for runtime contract behavior.
- `handoff.md` — exact deployment and lifecycle evidence.

## Known limitation

Public webpages can change or vary between validators. AtlasMerge compares stable structured decision fields and fails closed where evidence or consensus is unavailable. StudioNet writes use the injected EIP-1193 wallet selected in the browser (including Rabby and other compatible wallets); no MetaMask Snap is required by the current browser path. Production deployment evidence and any observed undetermined transactions are documented rather than hidden in `handoff.md`.
