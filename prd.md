# AtlasMerge — Product Requirements Document (PRD)

## 1. Product summary

**A consensus merge layer for crowdsourced maps.**

AtlasMerge turns a noisy stream of public map observations into a canonical, versioned map-delta ledger. Reports are collected and clustered off-chain. GenLayer is invoked only when a cluster is ready to become an authoritative change: validators inspect public evidence, the existing feature record and semantically related prior deltas before agreeing on the canonical map mutation.

The product uses a deliberate operating model:

1. high-frequency domain work happens off-chain;
2. a bounded, immutable/public artifact or case is frozen;
3. the Intelligent Contract retrieves only relevant semantic memory;
4. validators judge the semantic question independently;
5. deterministic contract code decides whether/how authoritative state changes.

## 2. Problem

The product must settle:

> **a bounded canonical delta to a geographic feature: open/closed, name, access, direction, category, geometry-note or other supported attribute change**

The problem is not that a backend cannot produce an answer. A backend can. The problem is that when multiple parties care about the final result, letting one operator/model author the authoritative state reintroduces the trust assumption GenLayer is meant to remove.

## 3. Why GenLayer is load-bearing

Delete GenLayer and the system loses at least one of:

- independent access to public evidence;
- independent semantic judgment;
- agreement on decision-critical meaning;
- a shared immutable result other contracts can consume.

VecDB alone does not fix this. Similarity only identifies relevant history.

## 4. Goals

- Fast normal workflow off-chain.
- Explicit escalation to shared judgment.
- Project-owned semantic institutional memory.
- Version-bound rules/evidence.
- Deterministic, inspectable state changes.
- Composable final receipts.
- Distinct domain-specific user experience.
- Honest failure/abstain states.
- Real StudioNet deployment proof before release claims.

## 5. Non-goals

- global OpenStreetMap replacement
- precise road geometry editing in MVP
- private home/location reports
- using LLM to invent coordinates
- automatic acceptance based on report count

## 6. Actors

| Actor | Role |
| --- | --- |
| mapper/reporter | Participates in the domain workflow; exact authorization is defined in TRD/contract state. |
| map steward | Participates in the domain workflow; exact authorization is defined in TRD/contract state. |
| local reviewer | Participates in the domain workflow; exact authorization is defined in TRD/contract state. |
| GenLayer validator | Participates in the domain workflow; exact authorization is defined in TRD/contract state. |
| map-data consumer | Participates in the domain workflow; exact authorization is defined in TRD/contract state. |

## 7. Scope split

### Off-chain

High-volume reports, photos, GPS traces, duplicate clustering, geohash bucketing, tile rendering and map browsing. Sensitive/private location data is excluded.

### On-chain

Map layer registry; feature IDs and current canonical attributes; candidate delta clusters; evidence digests; semantic memory of accepted deltas; version history; decision receipts.

### Semantic memory

Embed accepted deltas from a normalized sentence: geohash, feature type, canonical feature name, changed attribute, old value, new value and bounded reason. Retrieval is first deterministically filtered by layer and coarse geohash, then semantic KNN finds similar past changes. This avoids nearest-vector matches from distant places becoming misleading context.

### Consensus question

Do the bounded public reports/evidence in this cluster support the proposed canonical delta for this exact feature? Validators return ACCEPT_DELTA, REJECT_DELTA, SPLIT_CLUSTER or INSUFFICIENT_EVIDENCE plus a normalized attribute/value pair. Geometry itself is not invented by LLM; only pre-bounded geometry references may be accepted.

## 8. MVP

A bounded pilot layer (campus, district or synthetic city), point/POI features only, supported attribute changes (name/status/access/category), public evidence bundles, geohash filter + VecDB retrieval, live StudioNet decisions and version history.

The MVP is not considered complete until a hosted frontend performs the critical path against a real StudioNet deployment.

## 9. User stories

- As a **mapper/reporter**, I can configure the authoritative rules/charter and see exactly which version every case uses.
- As a **map steward**, I can perform normal work off-chain and escalate only the bounded cases that need shared judgment.
- As a **local reviewer**, I can inspect the public evidence and related semantic history without treating similarity as truth.
- As a **GenLayer validator**, I receive bounded, versioned inputs and can reject a semantically wrong leader decision.
- As an external integrator, I can read a typed final receipt without trusting the backend or scraping rationale prose.

## 10. Lifecycle

Product statuses:

- COLLECTING_OFFCHAIN
- CLUSTER_READY
- PENDING
- ACCEPTED
- REJECTED
- SPLIT_REQUIRED
- INSUFFICIENT_EVIDENCE

Generic lifecycle:

```text
normal off-chain work
 -> freeze bounded public artifact/case
 -> on-chain submit
 -> deterministic preflight
 -> bounded semantic retrieval
 -> consensus
 -> deterministic validation/state transition
 -> finalized receipt
 -> frontend authoritative re-read
```

## 11. Product surfaces

| Route | Product surface | Primary action |
| --- | --- | --- |
| / | Living map | Select feature/report |
| /report | Report capture | Save off-chain report |
| /clusters | Cluster review board | Open cluster |
| /clusters/[id] | Delta compare | Submit/adjudicate cluster |
| /features/[id] | Feature history sheet | Inspect source evidence |
| /layers/[id]/versions | Layer/version explorer | Select version |
| /contributors | Contributor trail | Inspect reports |

The visual composition for each route is specified in `ui/ux.md`.

## 12. Functional requirements

### FR-1 — Public browsing

Where a record is public, the user can inspect it without connecting a wallet.

### FR-2 — Explicit wallet identity

Wallet connection occurs only after user action. Production writes are injected-wallet only and network-gated.

### FR-3 — Versioned top-level configuration

Rules/charter/rubric/manifests that affect a decision are versioned and visible in the resulting receipt.

### FR-4 — Off-chain work plane

Routine/high-volume work does not require one transaction per action.

### FR-5 — Immutable escalation

Before chain submission, the user can inspect the exact bounded artifact/reference/digest being committed. Editing afterward produces a new digest/version.

### FR-6 — Related-memory preview

The product can show relevant semantic memories, clearly labeled as related context.

### FR-7 — Consensus trigger

The eligible actor can trigger the project-specific review. Long-running consensus is represented as stages, not fake percentage progress.

### FR-8 — Fail closed

Unavailable evidence, malformed outputs, stale state or validator disagreement cannot silently become a positive decision.

### FR-9 — Authoritative receipt

A final receipt includes record ID, contract/network, input version/digests, memory IDs, decision-critical output, tx/finality and resulting state.

### FR-10 — Append-only history

Historical decisions remain inspectable after later versions/corrections.

### FR-11 — Integrator surface

Stable view methods expose machine-readable final status.

## 13. Product-specific contract capabilities

- create_layer(name, charter_url, charter_digest, min_lat_e6, max_lat_e6, min_lng_e6, max_lng_e6) -> layer_id
- register_feature(layer_id, feature_key, initial_attrs_object, geometry_digest, coarse_geohash) -> feature_id
- submit_cluster(layer_id, feature_id, proposed_attribute, proposed_value, report_bundle_url, bundle_digest, coarse_geohash) -> cluster_id
- adjudicate_cluster(cluster_id) -> decision
- cancel_cluster(cluster_id)
- get_feature(feature_id)
- get_cluster(cluster_id)
- get_feature_history(feature_id, offset, limit)
- preview_related(cluster_id, k)

## 14. Product-specific rules

- Every cluster targets one existing feature and one supported attribute.
- Accepted value is deterministically bounded to the submitted candidate set or explicit canonical enum.
- Geography filter occurs before semantic retrieval.
- REJECTED/SPLIT_REQUIRED/INSUFFICIENT never mutate feature version.
- Evidence bundle digest is immutable after submission.
- Accepted deltas append history; prior values are never deleted.

## 15. Public evidence requirements

- HTTPS/content-addressed and validator-accessible.
- Digest/version bound.
- Bounded before prompt construction.
- Treated as untrusted data.
- No private secrets in chain/VecDB.
- Unavailable source produces no invented positive result.

## 16. Primary demo fixture

Feature 'Harbor Pharmacy' current status OPEN, reports from three mappers say permanently closed; a fourth report is a duplicated repost. Another nearby 'Harbor Chemist' must not be merged.

The fixture should seed local UI/direct tests. It is not proof until a corresponding live StudioNet path is executed.

## 17. Required edge behavior

- Many reports are copies of one social post; bundle records source provenance and report count is not independence.
- Two nearby businesses have same name; feature_key is authoritative, not semantic similarity.
- Cluster actually contains closure of one place and relocation of another; SPLIT_REQUIRED.
- Map feature already changed after cluster was assembled; adjudication checks base feature version and rejects stale cluster.
- Evidence photos reveal private information; uploader must strip metadata and public-only policy applies.

## 18. UX requirements

UI identity:

- **Archetype:** cartographer's field desk: map dominates, controls live in instrument strips rather than cards
- **Signature:** Accepted changes appear as contour-like hatch marks around a feature; history opens as a physical-looking map legend strip. The review screen places before/after attributes along the bottom like surveying measurements.
- **Fonts:** Public Sans for controls; Roboto Slab for place labels and change titles
- **Geometry:** map-first canvas, rectangular tool palettes, topographic line motifs, 4px corners, no floating glass panels
- **Motion:** map pan/zoom only plus restrained 150ms evidence drawer; accepted delta briefly stamps into the legend

The wallet must remain utility chrome. The main artifact/work object dominates.

## 19. Security requirements

1. Backend never signs GenLayer writes.
2. Wrong-chain writes are blocked both in UI and client helper.
3. Finalized rollback/error is not success.
4. Unknown RPC/contract shape fails closed.
5. Prompt-injection-like fetched content cannot alter governing rules.
6. Similarity cannot directly authorize state.
7. Stale versions cannot mutate newer state.
8. Decision enums/IDs are deterministically bounded.
9. Public storage contains no secrets/private source material.
10. No live-mode fabricated fallback.

## 20. Success metrics

- 100% of writes injected-wallet signed.
- 100% final successes verified through GenVM execution + authoritative re-read.
- 0 silent fixture fallback in live mode.
- 0 VecDB distance displayed as truth/confidence.
- 100% final decisions expose input versions/digests.
- One happy-path and one fail-closed/abstain path demonstrated before release.
- Fresh agent can implement from this pack + repository files without prior chat context.

## 21. Acceptance criteria

- [ ] Contract state/API implements the intended domain lifecycle.
- [ ] Direct tests cover every invariant.
- [ ] VecDB insert/retrieval rules are tested.
- [ ] Validator rejects a well-formed wrong leader payload in direct mode where tooling permits.
- [ ] Off-chain service cannot author chain truth.
- [ ] Hosted UI follows `ui/ux.md`.
- [ ] Hosted UI reads deployed StudioNet state.
- [ ] Contract schema verified.
- [ ] StudioNet consensus path proven.
- [ ] Wallet/network regressions tested.
- [ ] Deployment facts recorded in `handoff.md`/`memory.md`.
- [ ] README/submission copy distinguishes live proof from direct-test coverage.

## 22. Reference end-to-end demo

Seed a small map with five venues, collect multiple off-chain closure/name-change reports, cluster them, adjudicate two accepted deltas and one split-required cluster, then show the versioned feature history on the map.
