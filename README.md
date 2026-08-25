# AtlasMerge

AtlasMerge is a user-facing GenLayer consensus layer for bounded changes to crowdsourced-map features. A submitted cluster proposes exactly one attribute change for one versioned feature; GenLayer validators fetch its public evidence and decide whether the delta is canonical.

## Live project

- App: https://atlasmerge.vercel.app
- Network: GenLayer StudioNet (chain ID 61999)
- Final contract: `0xfBBe4AFA3F196634d7d17951914bFA0AF427a2E4` ([StudioNet Explorer](https://explorer-studio.genlayer.com/address/0xfBBe4AFA3F196634d7d17951914bFA0AF427a2E4))
- Final contract source commit: `43bbc95b5413f080174824a8c53da28c2ffaef79`
- Final contract SHA-256: `32ea5e612fc8fdc0cf5e319d21df4ab28868ae0bdc945bb554ab3cc8190c64e8`

The prior `0x56A9...` deployment is historical and superseded because the memory-ordering hardening changed contract source.

## Evidence and consensus

Evidence must be a direct HTTPS URL. The submitter supplies `sha256:<64 lowercase hex>` over one bounded exact UTF-8 text artifact (6,000 characters maximum). During adjudication every validator fetches that same bounded artifact, verifies the digest, and sends the identical text to the consensus prompt as untrusted data. An unavailable, malformed, oversized, or digest-mismatched source resolves fail-closed as `INSUFFICIENT_EVIDENCE`; it never mutates the feature.

The Report page computes that digest automatically when the source permits browser CORS reads. If CORS prevents that read, a mapper may paste a manually computed digest; AtlasMerge has no backend bypass and validators still independently fetch and verify the URL.

Validators only settle the submitted attribute and value. `ACCEPT_DELTA` additionally requires accessible evidence, `feature_match == MATCH`, and `support == SUPPORTED`. Feature versions prevent stale writes. Accepted deltas append immutable history; rejection, split, insufficient evidence, cancellation, and undetermined consensus do not change feature attributes.

VecDB stores accepted-delta precedent as semantic context only; it is never authorization or an automatic verdict. The current contract retrieves the available KNN candidate set, then deterministically filters by accepted Delta, layer, exact geohash cell, and attribute before capping eligible semantic context at 8 records. Only eligible canonical precedent IDs may be persisted. Whole-store candidate retrieval is therefore a known scalability limitation, not a correctness or authorization mechanism.

## Proven StudioNet lifecycle

The final deployed contract has been exercised end-to-end on StudioNet.

### Positive ACCEPT proof

- Production smoke cluster: https://atlasmerge.vercel.app/clusters/3
- Result: `ACCEPTED`
- Feature: `wole-soyinka-centre-iganmu-test`
- Attribute mutation: `Performing Arts Venue` → `Cultural Landmark`
- Feature version: `1` → `2`
- Append-only history contains exactly the accepted Delta and its evidence digest.

Feature history: https://atlasmerge.vercel.app/features/2

### Negative digest-mismatch proof

- Production smoke cluster: https://atlasmerge.vercel.app/clusters/4
- Result: `INSUFFICIENT_EVIDENCE`
- Reason: `DIGEST_MISMATCH`
- Deliberately invalid digest was rejected fail-closed.
- Feature remained `Cultural Landmark`, version remained `2`, and no additional accepted history entry was created.

The earlier transient StudioNet `gen_getContractCode` PostgreSQL adapter incident cleared without a contract change. Final contract reads and adjudication subsequently completed normally.

## User workflow

1. Create a bounded layer and become its steward.
2. Register a feature with canonical attributes, geometry digest, and coarse geohash.
3. Submit one proposed attribute change with HTTPS evidence, SHA-256 digest, and the exact feature geohash.
4. Any wallet may trigger adjudication.
5. Inspect the terminal cluster, immutable evidence, feature version/history, and eligible precedent from live contract views.

The frontend performs bounded authoritative readback after finalized writes so the UI confirms chain state instead of assuming finality alone means success.

## Verification

The release workflow covers:

- frontend tests
- TypeScript typecheck
- lint
- production Next.js build
- static/source contract checks
- GenLayer Direct Mode behavioral tests

The final release path was validated through GitHub Actions and Vercel before the manual StudioNet smoke tests above. See the repository Actions history for exact run evidence.

## Development

```powershell
Copy-Item .env.example apps/web/.env.local
npm install --prefix apps/web
npm run test
npm run typecheck
npm run lint
npm run build
```

`NEXT_PUBLIC_ATLASMERGE_CONTRACT` must be set to the final StudioNet deployment. The frontend pre-simulates deterministic writes, then uses `genlayer-js` clients for injected-wallet writes, StudioNet switching, finalized receipt checks, and authoritative post-write readback. Finality alone is never treated as success.

## Structure

- `contracts/atlasmerge.py` — intelligent contract and authoritative state.
- `apps/web` — Next.js injected-wallet application.
- `tests/direct` — GenLayer Direct Mode behavioral coverage.
- `handoff.md` — deployment, CI, lifecycle, and historical incident evidence.

## Known limitations

- Public webpages can change or vary between validators; AtlasMerge fails closed when evidence cannot be verified or semantic consensus does not converge.
- VecDB currently performs whole-store candidate retrieval before deterministic eligibility filtering; eligible semantic context is capped at 8 records.
- StudioNet writes use the injected EIP-1193 wallet selected in the browser, including Rabby and other compatible wallets; no MetaMask Snap is required by the current browser path.

Resolved development incidents and historical superseded deployments remain documented in `handoff.md` rather than being hidden from the release record.
