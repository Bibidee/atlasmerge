# AtlasMerge — Project Plan

## Mission

Build **AtlasMerge** into a complete contract + frontend product, using the specifications in this folder as the source of truth.

AtlasMerge turns a noisy stream of public map observations into a canonical, versioned map-delta ledger. Reports are collected and clustered off-chain. GenLayer is invoked only when a cluster is ready to become an authoritative change: validators inspect public evidence, the existing feature record and semantically related prior deltas before agreeing on the canonical map mutation.

## MVP target

A bounded pilot layer (campus, district or synthetic city), point/POI features only, supported attribute changes (name/status/access/category), public evidence bundles, geohash filter + VecDB retrieval, live StudioNet decisions and version history.

## Planning principles

1. Do not build the UI first and retrofit a weak contract.
2. Do not build consensus before deterministic state/version/size guards.
3. Do not store high-frequency work on-chain simply because it is easy to model.
4. Do not turn VecDB into a classifier. It is context retrieval.
5. Do not call a deployment “done” until a real StudioNet lifecycle is exercised.
6. Do not create fake fallback data in live mode.
7. Every meaningful work unit updates `handoff.md` immediately.
8. When a durable decision changes, update `memory.md` in the same work unit.

## Reference demo the implementation must support

Seed a small map with five venues, collect multiple off-chain closure/name-change reports, cluster them, adjudicate two accepted deltas and one split-required cluster, then show the versioned feature history on the map.

## Phase 0 — Repository and truth scaffold

- Create the recommended repository tree.
- Copy these blueprint docs verbatim first; do not rewrite them from memory.
- Add package manifests with pinned baseline versions.
- Add `.env.example` with StudioNet variables and no secrets.
- Create a placeholder README that explicitly says not deployed yet.
- Initialize `handoff.md` workflow and commit.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 1 — Deterministic contract skeleton

- Add dependency header and imports.
- Implement storage dataclasses, enums and counters.
- Implement create/register deterministic methods and view methods.
- Implement all size, role, namespace and version guards.
- Write direct tests for creation, invalid inputs, ownership, pagination and forbidden transitions.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 2 — Semantic memory

- Add the project-specific `VectorPointer`.
- Implement normalized embedding text exactly around: Embed accepted deltas from a normalized sentence: geohash, feature type, canonical feature name, changed attribute, old value, new value and bounded reason. Retrieval is first deterministically filtered by layer and coarse geohash, then semantic KNN finds similar past changes. This avoids nearest-vector matches from distant places becoming misleading context.
- Insert only invariant-approved records.
- Implement bounded KNN + namespace/version filters.
- Expose a preview view for testing/audit.
- Add tests proving a semantically related but out-of-namespace record cannot authorize anything.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 3 — Consensus path

- Define strict decision envelope and allowed enums.
- Implement leader logic for: Do the bounded public reports/evidence in this cluster support the proposed canonical delta for this exact feature? Validators return ACCEPT_DELTA, REJECT_DELTA, SPLIT_CLUSTER or INSUFFICIENT_EVIDENCE plus a normalized attribute/value pair. Geometry itself is not invented by LLM; only pre-bounded geometry references may be accepted.
- Implement independent validator reasoning rather than format-only validation.
- Treat fetched evidence as hostile/untrusted data.
- Add deterministic post-consensus validation.
- Add explicit abstain/failure path.
- Forge incorrect leader outputs in tests and prove rejection.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 4 — Off-chain work plane

- Supabase Postgres with PostGIS for report points/feature geometry plus a small Hono API service. Object storage keeps public evidence images/bundles. The API performs deterministic geohash bucketing and duplicate candidate clustering; the browser signs all chain writes.
- Implement wallet challenge/verify if off-chain roles require identity.
- Implement immutable/public artifact bundle generation and digesting.
- Never add a server signer.
- Add upload/data bounds and content-type validation.
- Document retention/publicity policy.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 5 — GenLayer web client

- Implement config/client/read-client modules.
- Implement injected-wallet provider and network gate.
- Implement typed contract reads and schema verification.
- Implement write helper and FINALIZED + GenVM execution check.
- Implement one live/fixtures boundary; production live mode never silently falls back.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 6 — Distinct frontend

- Implement the visual archetype: cartographer's field desk: map dominates, controls live in instrument strips rather than cards.
- Build routes around domain records, not generic cards.
- Build the semantic-memory context view.
- Build the transaction rail and authoritative receipt.
- Implement responsive/mobile behavior.
- Implement all empty/error/abstain states from `ui/ux.md`.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 7 — Integration and adversarial testing

- Wire backend artifact bundle to contract submission.
- Verify every frontend-required contract method against schema.
- Run deterministic/direct suites.
- Run wallet-session regressions.
- Test malformed RPC/contract data.
- Test missing evidence, stale version and forged consensus output.
- Run production build/typecheck/lint.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 8 — StudioNet proof

- Deploy a frozen source commit to StudioNet.
- Record address and deployment tx.
- Verify deployed source/schema.
- Execute the reference demo with real transactions.
- Capture at least one live consensus success.
- Capture at least one fail-closed/abstain path where feasible.
- Re-read all final state from chain.
- Update handoff/memory with exact facts only.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.
## Phase 9 — Release hardening

- Deploy hosted frontend in live mode.
- Exercise one write from hosted UI.
- Audit all copy for fabricated/unproven claims.
- Confirm no generated/local private-key path exists.
- Confirm backend has no signer secret.
- Run accessibility/responsive pass.
- Freeze release tag/commit and create reviewer-oriented deployment evidence.

**Exit gate:** All work is logged in `handoff.md`; relevant tests for this phase pass or the blocker is explicitly recorded.


## Workstreams and ownership

| Workstream | Primary outputs | Release blocker? |
|---|---|---|
| Intelligent Contract | State machine, VecDB, consensus, views | Yes |
| Direct/testing | Invariants, forged leader rejection, ABI/schema | Yes |
| Off-chain plane | High-volume workflow + immutable bundles | Yes where architecture uses service |
| Web3 client | Injected wallet, reads/writes/finality | Yes |
| UI/UX | Domain-specific routes and states | Yes |
| StudioNet proof | Deployment + live transaction evidence | Yes |
| Documentation | Handoff, memory, deployment truth | Yes |

## Contract milestone checklist

- Implement and test `create_layer(name, charter_url, charter_digest, min_lat_e6, max_lat_e6, min_lng_e6, max_lng_e6) -> layer_id`.
- Implement and test `register_feature(layer_id, feature_key, initial_attrs_object, geometry_digest, coarse_geohash) -> feature_id`.
- Implement and test `submit_cluster(layer_id, feature_id, proposed_attribute, proposed_value, report_bundle_url, bundle_digest, coarse_geohash) -> cluster_id`.
- Implement and test `adjudicate_cluster(cluster_id) -> decision`.
- Implement and test `cancel_cluster(cluster_id)`.
- Implement and test `get_feature(feature_id)`.
- Implement and test `get_cluster(cluster_id)`.
- Implement and test `get_feature_history(feature_id, offset, limit)`.
- Implement and test `preview_related(cluster_id, k)`.

## Invariant checklist

- Test: Every cluster targets one existing feature and one supported attribute.
- Test: Accepted value is deterministically bounded to the submitted candidate set or explicit canonical enum.
- Test: Geography filter occurs before semantic retrieval.
- Test: REJECTED/SPLIT_REQUIRED/INSUFFICIENT never mutate feature version.
- Test: Evidence bundle digest is immutable after submission.
- Test: Accepted deltas append history; prior values are never deleted.

## UX milestone checklist

- Build and verify: Living map.
- Build and verify: Report capture drawer.
- Build and verify: Cluster review board.
- Build and verify: Feature history sheet.
- Build and verify: Delta compare view.
- Build and verify: Layer/version explorer.
- Build and verify: Contributor trail.

## Risk register

| Risk | Early signal | Mitigation |
|---|---|---|
| Consensus prompts too large | timeouts/rotation spikes | lower KNN/evidence bounds; split cases |
| VecDB namespace contamination | irrelevant candidates | deterministic namespace/version filters |
| Backend becomes de facto authority | UI trusts DB status | chain re-read is authoritative after every final action |
| Wrong-chain wallet writes | user wallet not 61999 | write gate in UI and client helper |
| Finalized rollback shown as success | receipt-only logic | inspect GenVM execution |
| UI drifts generic | component-kit/default template | enforce `ui/ux.md` screenshot review |
| Public evidence disappears | validator fetch failures | immutable/content-addressed refs + abstain |
| Runtime API differs from plan | compile/lint/integration failure | verify current SDK, log exact change, do not invent API |
| Overclaim in README | branch only unit-tested | proof table distinguishes direct vs live |

## Project-specific edge-case backlog

- Many reports are copies of one social post; bundle records source provenance and report count is not independence.
- Two nearby businesses have same name; feature_key is authoritative, not semantic similarity.
- Cluster actually contains closure of one place and relocation of another; SPLIT_REQUIRED.
- Map feature already changed after cluster was assembled; adjudication checks base feature version and rejects stale cluster.
- Evidence photos reveal private information; uploader must strip metadata and public-only policy applies.

## Definition of complete

The project is complete only when:

- the MVP flow works end to end;
- the contract is deployed on StudioNet;
- at least one real consensus path is proven;
- the frontend is wired to that contract;
- injected wallet is the only write mechanism;
- contract reads are authoritative;
- direct and frontend checks pass;
- UI is recognizably distinct;
- evidence and VecDB behavior are bounded;
- `memory.md` and `handoff.md` contain the exact final state.
