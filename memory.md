# AtlasMerge — Project Memory

> This is a **repository-local project memory file**, not model/session memory. Agents should read it from disk. Keep it concise enough to scan, but update it whenever a durable decision changes.

## Project identity

**Name:** AtlasMerge  
**Tagline:** A consensus merge layer for crowdsourced maps.  
**Core thesis:** AtlasMerge turns a noisy stream of public map observations into a canonical, versioned map-delta ledger. Reports are collected and clustered off-chain. GenLayer is invoked only when a cluster is ready to become an authoritative change: validators inspect public evidence, the existing feature record and semantically related prior deltas before agreeing on the canonical map mutation.

### What the system ultimately settles

a bounded canonical delta to a geographic feature: open/closed, name, access, direction, category, geometry-note or other supported attribute change

### Core actors

- mapper/reporter
- map steward
- local reviewer
- GenLayer validator
- map-data consumer

## Current status

**Phase:** StudioNet release candidate
**Code status:** Implemented; current source commit is `ad4a22e4723391bb5588fdfe74affe1199c1cf4b`.
**StudioNet contract:** `0x92c78D3fdc71d0DA10475638B250cb4df3aF75ec` (deployment `0x37e0b525db17bae63fdaf3e84a88c085205e3cc490a47fbd17b35225c9bb20b9`).
**Live frontend:** https://atlasmerge.vercel.app (Vercel deployment `dpl_8LTgkgg94DehZJpgAdegTb8g6Ugd`).
**Last durable update:** 2026-08-24

The current contract enforces `MATCH` + accessible + `SUPPORTED` for acceptance, hashes exactly the evidence shown to consensus, and exposes authoritative enumeration IDs. It is freshly deployed but unseeded because the contract now correctly requires a native object for feature registration; no accepted real-evidence mutation or browser-wallet signed write is claimed. Exact transaction evidence is in `handoff.md`.

## Non-negotiable product boundary

### Off-chain

High-volume reports, photos, GPS traces, duplicate clustering, geohash bucketing, tile rendering and map browsing. Sensitive/private location data is excluded.

### On-chain

Map layer registry; feature IDs and current canonical attributes; candidate delta clusters; evidence digests; semantic memory of accepted deltas; version history; decision receipts.

### Semantic memory

Embed accepted deltas from a normalized sentence: geohash, feature type, canonical feature name, changed attribute, old value, new value and bounded reason. Retrieval is first deterministically filtered by layer and coarse geohash, then semantic KNN finds similar past changes. This avoids nearest-vector matches from distant places becoming misleading context.

### Consensus question

Do the bounded public reports/evidence in this cluster support the proposed canonical delta for this exact feature? Validators return ACCEPT_DELTA, REJECT_DELTA, SPLIT_CLUSTER or INSUFFICIENT_EVIDENCE plus a normalized attribute/value pair. Geometry itself is not invented by LLM; only pre-bounded geometry references may be accepted.

## Frozen engineering defaults

- StudioNet chain ID: `61999`
- RPC: `https://studio.genlayer.com/api`
- Explorer: `https://explorer-studio.genlayer.com`
- `genlayer-js`: `1.1.8`
- Next.js: `16.3.2`
- React: `19.2.4`
- React DOM: `19.2.4`
- TypeScript: `^5`
- Tailwind: `^4`
- Writes: injected EIP-1193 wallet only
- Backend signer: forbidden
- Vector model baseline: `all-MiniLM-L6-v2` / 384 dimensions
- Similarity semantics: retrieval only
- Live data: no silent fixture fallback
- Finality: wait for FINALIZED, then inspect GenVM execution before success

## Contract invariants

- Every cluster targets one existing feature and one supported attribute.
- Accepted value is deterministically bounded to the submitted candidate set or explicit canonical enum.
- Geography filter occurs before semantic retrieval.
- REJECTED/SPLIT_REQUIRED/INSUFFICIENT never mutate feature version.
- Evidence bundle digest is immutable after submission.
- Accepted deltas append history; prior values are never deleted.

## Scope lock

### MVP

A bounded pilot layer (campus, district or synthetic city), point/POI features only, supported attribute changes (name/status/access/category), public evidence bundles, geohash filter + VecDB retrieval, live StudioNet decisions and version history.

### Explicit non-goals

- global OpenStreetMap replacement
- precise road geometry editing in MVP
- private home/location reports
- using LLM to invent coordinates
- automatic acceptance based on report count

## Known edge cases to preserve during implementation

- Many reports are copies of one social post; bundle records source provenance and report count is not independence.
- Two nearby businesses have same name; feature_key is authoritative, not semantic similarity.
- Cluster actually contains closure of one place and relocation of another; SPLIT_REQUIRED.
- Map feature already changed after cluster was assembled; adjudication checks base feature version and rejects stale cluster.
- Evidence photos reveal private information; uploader must strip metadata and public-only policy applies.

## UI identity

- Archetype: **cartographer's field desk: map dominates, controls live in instrument strips rather than cards**
- Signature: Accepted changes appear as contour-like hatch marks around a feature; history opens as a physical-looking map legend strip. The review screen places before/after attributes along the bottom like surveying measurements.
- Fonts: Public Sans for controls; Roboto Slab for place labels and change titles
- Geometry: map-first canvas, rectangular tool palettes, topographic line motifs, 4px corners, no floating glass panels
- Motion: map pan/zoom only plus restrained 150ms evidence drawer; accepted delta briefly stamps into the legend

Do not let implementation drift into a generic centered hero + three cards + gradient dashboard. `ui/ux.md` is authoritative.

## Decision log

| Date | Decision | Reason | Supersedes |
|---|---|---|---|
| 2026-08-23 | Keep high-volume activity off-chain and settle bounded authoritative state on GenLayer. | Mirrors the project's central off-chain-work/on-chain-settlement thesis and keeps consensus purposeful. | — |
| 2026-08-23 | Use contract-owned VecDB as semantic recall, never as an automatic verdict. | Similarity is relatedness, not truth. | — |
| 2026-08-23 | Injected wallet is the only write identity. | Matches existing hardened repository behavior and avoids hidden custody. | — |
| 2026-08-23 | Fail closed on missing public evidence or malformed consensus output. | A weak answer must not silently become authoritative state. | — |
| 2026-08-23 | UI follows the project-specific design language in `ui/ux.md`. | The ten projects must be visually and structurally distinct. | — |

## Source conventions inherited from existing repositories

The implementation plan intentionally follows proven patterns from these owner repositories:

- `ometere123/intent-guard/package.json` — `genlayer-js` 1.1.8, Next.js 16.3.2, React 19.2.4.
- `ometere123/intent-guard/src/components/wallet-provider.tsx` — explicit injected wallet flow, network gating and wallet event handling.
- `ometere123/intent-guard/src/lib/genlayer/contract.ts` — wait for FINALIZED, re-read transaction and inspect GenVM execution.
- `ometere123/scopelock/contracts/scopelock.py` — native `genlayer_embeddings.VecDB`, 384-dimensional `all-MiniLM-L6-v2`, bounded KNN precedent retrieval.
- Owner research, *GenLayer VectorDB + Vector Embeddings* (Aug 2026) — embeddings provide semantic representation, VecDB persistent semantic memory/search, consensus judges meaning; embeddings are not truth or encryption.

## Open decisions

These are allowed to be decided during implementation, but must be recorded here when settled:

- Exact deployed contract address and deployment source commit.
- Exact public hosting URL.
- Final object-store/database provider if the selected default in `architecture.md` proves unsuitable.
- Whether a second network besides StudioNet is supported after the StudioNet proof is complete.
- Performance limits discovered for the project's actual VecDB population and KNN size.

## Agent continuity rule

At the end of every work session:

1. Ensure `handoff.md` has the most recent factual state.
2. Update this file only for durable decisions/status changes.
3. Do not paste long implementation logs here; keep those in `handoff.md`.
4. Never record secrets, private keys, seed phrases or private source material.
