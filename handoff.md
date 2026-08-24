# AtlasMerge — Handoff Log

## Current canonical deployment

- Contract: `0x874a677F561F14D4F9722275FA1f46D9D12c5590`.
- Deployment tx: `0xf1e27fe32a9165e70dbe4a26c9e082cb1b5df94f2ed4ad3798bc6f74a99f6665` (majority agreement; leader GenVM success).
- Contract source commit: `fddd0a94bcfe48eb5347aa79e2cb94d4ceadcd8f`; SHA-256 `A1D543883069465F2434DE084C3ACB2BB6BD40F9EC076628B8C998BA9EC84A7D`.
- Production app: `https://atlasmerge.vercel.app` is aliased to `dpl_4y7ArZ198k1LoECq3fGunmisRAab` and configured for that address.
- Truthful status: unseeded. Browser wallet lifecycle, positive acceptance, VecDB proof, and final negative proofs remain unproven.

> **Mandatory living log.** `AGENTS.md` requires an agent to append here immediately after every meaningful work unit, before starting the next one. This is the operational continuity file; it must describe what actually happened, not what was intended.

## Current checkpoint

- **Phase:** Blueprint complete, implementation not started.
- **Last completed work:** The full project documentation pack was created.
- **Next exact action:** Create the repository scaffold described in `trd.md`, pin the baseline dependencies, and implement the first deterministic contract storage/types without any consensus call.
- **Known blockers:** None yet. Runtime/API mismatches discovered later must be logged rather than guessed around.
- **StudioNet address:** Not deployed.
- **Deployment commit:** Not available.
- **Frontend URL:** Not deployed.

## Immediate implementation sequence

1. Read `memory.md`, `prd.md`, `architecture.md`, `trd.md`, `ui/ux.md`.
2. Scaffold repository folders and package manifests.
3. Add the contract dependency header and storage dataclasses.
4. Add deterministic input/state helpers and direct tests.
5. Add VecDB insertion/retrieval with bounded namespace filters.
6. Add the consensus path and decision envelope.
7. Build live chain client/wallet plumbing.
8. Build the distinct UI from `ui/ux.md`.
9. Add any off-chain service described in `architecture.md`.
10. Run direct/local checks, then real StudioNet integration.
11. Deploy and record exact proof here and in `memory.md`.
12. Only then create final README/submission material.

## Log entry template

Copy this block for every meaningful work unit:

```md
### YYYY-MM-DD HH:MM TZ — <short work-unit title>

**Goal**
- What this work unit was supposed to accomplish.

**Changed**
- Exact files/modules changed.
- Exact contract/API/schema/UI behavior changed.

**Verification**
- Commands/tests run.
- Real pass/fail counts or concise output.
- If not run, say `NOT RUN` and why.

**Reality check**
- What is proven.
- What is still assumed or unproven.
- Any discrepancy between docs and code corrected in the same work unit.

**Decisions**
- Durable decisions made. If any, also update `memory.md`.
- `None` if none.

**Blockers / risks**
- Concrete blocker, or `None`.

**Next exact action**
- One explicit next task, not a vague “continue building”.
```

## Initial log

### 2026-08-24 01:00 +01:00 — Two-layer scaffold, contract, and frontend implemented

**Goal**
- Build the required GenLayer Intelligent Contract and direct-live Next.js frontend while resolving the blueprint's off-chain-service contradiction.

**Changed**
- Added `contracts/atlasmerge.py`: bounded layer/feature/cluster/delta state, authorization, stale-version protection, immutable evidence binding, consensus envelope validation, deterministic acceptance gate, append-only history, and native VecDB insertion/retrieval scoped by layer and geohash.
- Added `apps/web`: Next.js app, injected-wallet provider, StudioNet gate, direct read/write modules, finality/GenVM interpretation, map-first routes and truthful unavailable states.
- Added root/package manifests, `.env.example`, `.gitignore`, and README.
- Updated `architecture.md` and `trd.md` to remove the contradictory Supabase/Hono/API requirement. The governing task demands exactly browser + Vercel + GenLayer and forbids an application database/backend; browser drafts are non-authoritative session state only.

**Verification**
- NOT RUN yet: dependencies have not been installed at this checkpoint.

**Reality check**
- No fabricated contract address, transaction, map records, or deployment claim exists. Contract source uses the documented dependency hashes, but StudioNet API compatibility and deployment remain unproven.

**Decisions**
- Two-layer architecture is authoritative over the lower-priority service blueprint conflict.

**Blockers / risks**
- StudioNet CLI/account availability and funds still need investigation.

**Next exact action**
- Install the pinned web dependencies and run frontend tests, typecheck, lint and production build.

### 2026-08-24 01:12 +01:00 — Verification dependency check

**Goal**
- Install frontend dependencies and execute the web verification gate.

**Changed**
- No source changes.

**Verification**
- `npm run test`, `npm run typecheck`, `npm run lint`, and `npm run build` were attempted. All were blocked because `node_modules` is absent (`vitest`, `tsc`, `eslint`, and `next` are not recognized).
- A normal `npm install` produced no usable install. An approved elevated `npm install --verbose` was initiated to permit package download, then interrupted before completion.
- No `genlayer` CLI command is present in PATH; the `gl` command exists but is not assumed to be the GenLayer CLI.

**Reality check**
- No frontend check, contract deployment, StudioNet account inspection, or live lifecycle is proven. The implementation remains source-complete but requires dependency installation and official GenLayer tooling for these gates.

**Decisions**
- None.

**Blockers / risks**
- Package download approval/install was interrupted; local GenLayer CLI is not discoverable under the expected command.

**Next exact action**
- Allow `npm install` to finish, run all frontend gates, then obtain/install the official GenLayer CLI before StudioNet deployment.

### 2026-08-24 10:30 +01:00 — Verification and StudioNet deployment recovery

**Goal**
- Resolve dependency/CLI blockers, prove a real deployment, and inspect real execution rather than trusting CLI success text.

**Changed**
- Installed pinned frontend dependencies and project-local `genlayer` CLI `0.39.2`.
- Updated the contract for the current GenLayer API: `@gl.public`, `gl.message.sender_address`, and `gl.vm.run_nondet_unsafe` with an independent critical-field validator comparison.
- Added local live frontend configuration pointing at the successful deployment.

**Verification**
- `npm run test`: 1 file, 3 tests passed.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run build`: passed; all seven product routes were compiled.
- CLI account `faultline-dev` was confirmed unlocked on StudioNet with 998.99499999999999999 GEN.
- First deployment `0xd402be98e83d317611df334849a083f2bcaec48ed9d111f13a2abc795f5ba14d` was finalized with GenVM ERROR (`public` name missing) and is explicitly rejected as a deployment proof.
- Corrected deployment `0xf6c56a415ca5508dace176852ad1020c51d5679463f2c9cfee71b3360a08ee37` has explicit leader and agreeing-validator GenVM SUCCESS. Contract address: `0xcd7336f3A06E9606C4FEf2923DA75cFCb75BFF71`.
- Initial `create_layer` attempts (`0x1148…c55d8`, `0x8cb3…cc6e`) were finalized execution errors caused by CLI JSON argument serialization; no state was accepted. The contract's bbox preflight was relaxed to retain a bounded object-shape requirement compatible with CLI serialization. The corrected source still requires redeployment before any lifecycle transaction can be claimed.

**Reality check**
- Contract deployment is proven, but no successful state-transition/lifecycle transaction has yet been proven against the latest source. The frontend is configured locally but not hosted on Vercel.

**Decisions**
- The first failed deployment and failed writes remain documented as failures; only the second deployment is an actual successful GenVM deployment.

**Blockers / risks**
- Vercel authorization has not been provided. Latest source requires a new deployment due to the bounded bbox parsing compatibility patch.

**Next exact action**
- Deploy the latest source, create the pilot layer with a real successful transaction, then update the local frontend address.

### 2026-08-24 10:38 +01:00 — Native object ABI deployment

**Changed**
- `create_layer` and `register_feature` now accept native ABI objects and deterministically canonicalize them to bounded JSON storage strings.
- Added direct source-invariant tests in `tests/direct/test_contract_source.py`.
- Updated `apps/web/.env.local` to the latest live contract.

**Verification**
- Latest deployment tx `0x21478a5c410017ec3b86ac1f649837ad494b54dfe5aa391c72704345258c5746` executed successfully in leader GenVM and deployed `0xc0752BA1966f299eC6C75cA1AB37671123D1192c`.
- Earlier layer creation transaction is not proof; it ran against a prior source and failed execution.

**Next exact action**
- Use a native ABI client/deploy script (rather than CLI string coercion) to write the layer, feature and cluster lifecycle; then inspect the resulting receipts and views.

### 2026-08-24 11:20 +01:00 — Schema, lifecycle, abstention, and empty-state hardening

**Changed**
- Added explicit contract constructor so StudioNet schema generation succeeds.
- `register_feature` retains a native `$dict` ABI and adds a bounded flat-object compatibility decoder for GenLayer CLI 0.39.x.
- Fixed empty feature history and empty VecDB views to return `[]` without instantiating storage-only collections.
- Updated live frontend configuration to final deployment `0x43e6D8121F6900373dBe34c94ff6b96f20Ceef9e`.

**Verification**
- Direct source checks: 2 passed.
- Frontend unit tests: 3 passed; typecheck and lint passed.
- Schema-valid lifecycle deployment `0x62c2C65De7647991005A2eB1075DCaa250E22b04` proved: layer tx `0xcae4f89ca386e08c342460ac986821baca480a2834a1959365ce12051303e887`; feature tx `0x5447c8a2f2776716ba9fb5f4546fa08dfac15a631a73f58bbd063e944a818370`; cluster tx `0xf196e01d055b8c1ba47781ae5156d8671e36b4e2bf8d34166d03af31ae08b097`; adjudication tx `0xef400189f73227a4ac7e562ea5628492523991bc9f57fdad49e34054f7dc6287`.
- Adjudication finalized as status 6 / INSUFFICIENT_EVIDENCE because the public URL was a placeholder; rationale was persisted, feature remained version 1, and no positive precedent was inserted.
- Final hardened source deployed successfully: tx `0x02e86836f2ebe16d062c57464056b00e8eb388666374358f49bf59d39273a62e`, address `0x43e6D8121F6900373dBe34c94ff6b96f20Ceef9e`.

**Reality check**
- The full abstention lifecycle is proven on the immediately preceding schema-compatible deployment. The final deployment contains only the two read-empty-state fixes and is configured in the frontend; it is not seeded.

**Next exact action**
- Deploy the production frontend through the authenticated Vercel account, if available.

### 2026-08-24 11:24 +01:00 — Production frontend deployed

**Changed**
- Restored `apps/web/.env.local` after Vercel's environment pull replaced the local public configuration.
- Configured the Vercel production project with the StudioNet chain, Studio API endpoint, final contract address, and live-data mode.

**Verification**
- Vercel production build completed successfully with Next.js 16.3.2, including TypeScript and all static/dynamic routes.
- Deployment `dpl_7rut5pm9guVzFyws1LRc64Rf4Reu` reached READY.
- Production URL: `https://web-orpin-gamma-91.vercel.app`.
- Immutable deployment URL: `https://web-b766d1hkb-bibidees-projects.vercel.app`.

**Reality check**
- The final contract deployment is intentionally unseeded; the verified lifecycle and transaction hashes above belong to the immediately preceding schema-compatible deployment.
- The completed adjudication is a truthful abstention / insufficient-evidence result, not an accepted merge.

**Next exact action**
- No required implementation or deployment work remains. Use the production UI with an injected wallet to create real data on the final contract.

### 2026-08-24 11:36 +01:00 — Canonical domain and final-contract lifecycle proof

**Changed**
- Assigned the canonical production alias `https://atlasmerge.vercel.app` to deployment `dpl_7rut5pm9guVzFyws1LRc64Rf4Reu`.
- Seeded the final contract `0x43e6D8121F6900373dBe34c94ff6b96f20Ceef9e` with layer `1`, feature `1`, and two evidence clusters.

**Verified transactions**
- Create layer: `0xdbda1db610b342c2546d79e15c19f2ac6590dd180ad9c5c9d500b402119963c3` — accepted, returned layer `1`.
- Register feature: `0x371e582d42ebe17d0beb681ae817fe246c205a868c26884e8d767f1862470a2c` — accepted, returned feature `1` with native object attributes.
- Submit real public-evidence cluster: `0xdaec078491fb5d7433c6c2854617e5924362e83f37c6f0184b1eb8ffe0910cd5` — accepted, returned cluster `1`.
- Cluster `1` adjudication attempts `0x9c7d6979c9496d12268b0b598875e98743e31864307fb32d917daf0bcb6c0a03` and `0xb3d8c1b7f309e78baa53ec59db186c152fead797edb2c74a83ac057a22156b5a` were undetermined consensus rounds; state rolled back and cluster `1` remains pending.
- Submit controlled unavailable-evidence cluster: `0x9a30b862448a24da03b2e72fd69dffd21742e54604c252c42fe6d76952d4df22` — accepted, returned cluster `2`.
- Adjudicate cluster `2`: `0x5326d62577204b10b07faaf0a0f9081436e7b6deac1d64105363c250ed61e87d` — majority agreed and finalized as status `6` / `INSUFFICIENT_EVIDENCE`.

**Readback**
- Feature `1` remains active at version `1` with `name=Tour Eiffel` and `status=OPEN`, proving abstention made no unsupported mutation.
- `get_feature_history(1, 0, 32)` returned `[]`.
- `preview_related(2, 8)` returned `[]`.
- Cluster `2` persisted a rationale that the evidence was unreachable and could not support the proposed status change.

**Reality check**
- The final deployed contract now has a complete, verified fail-closed lifecycle.
- A separate real-evidence acceptance attempt remains pending after two undetermined consensus transactions; these are recorded rather than misreported as accepted.

**Next exact action**
- No required work remains. Optionally retry adjudication of pending cluster `1` later when validator model decisions converge.

### 2026-08-24 13:25 +01:00 — Final hardening redeployment and lifecycle

**Canonical source**
- Commit: `8e738018779d30c1060c413494c835351229b3d0`.
- Contract SHA-256: `063B4047DA113B4CF01FA089C706398C77DA615CB6BAD469E72E944CFD926EE5`.
- StudioNet deployment: `0x6dCc3BA35dA29E7ffc79DDD4f37581294EBE29FC`.
- Deployment transaction: `0xe83fef80e33b1c93a4b01eedb78122152dead5141138d5d7c3ccd865b1b65f89` — GenVM success and majority agreement.

**Hardening implemented**
- Validators fetch bounded HTTPS evidence with `gl.nondet.web.get`, verify exact UTF-8 text against `sha256:<64 lowercase hex>`, and frame public content as untrusted data.
- Empty, unavailable, oversized, malformed, or digest-mismatched evidence is fail-closed and non-mutating.
- Precedent retrieval is bounded and layer/geohash scoped before consensus; returned memory IDs must be actual eligible candidates.
- Attribute values use deterministic normalization and supported vocabularies.
- Bounded contract enumeration and the official `genlayer-js` client now drive frontend reads/writes.

**Final-contract lifecycle proof**
- Create layer: `0xe76eee72d1cb5097cfe7f40bf7540ada89f41e0cb14286c4ee07322bd6002787`.
- Register feature: `0x58133d6957ea58f82f651cc962b2ebe15141f3eef74147a5ab8e5871cd0505cc`.
- Submit cluster: `0x6d5b2a1a0f621b3f91763b7b68f42e20c0cf577139de1f8da9e1228704444e3a`.
- Adjudicate: `0x7425c3dbe660b5265efeb2173f5db8c71a62a898ee58bf6f8e9f5d97fdd8548f` — majority agreed, GenVM success, persisted status `6` / `INSUFFICIENT_EVIDENCE` and rationale `Evidence UNAVAILABLE or digest verification failed`.
- Re-reads verified the feature stayed `status=OPEN`, version `1`; history `[]`; semantic memory `[]`; cluster enumeration returned the authoritative record.

**Verification and frontend**
- Direct Python 3.12 suite: 4 passed. Frontend Vitest: 3 passed. Typecheck, lint, and production build passed.
- Final frontend deployment: `dpl_Bm2woRMubjGRwaDJryrDtVCNFCe6`, immutable URL `https://web-cfheu2dau-bibidees-projects.vercel.app`.
- Canonical URL `https://atlasmerge.vercel.app` now points to that deployment and is configured with the final contract address.

**Known limitation**
- No accepted real-evidence delta is claimed for this final deployment. A prior deployment had undetermined real-evidence attempts; the final deployment proves the stricter evidence-fetch/digest fail-closed path without fabricating an acceptance result.

### 2026-08-24 14:29 +01:00 — Canonical final enumeration release

**Canonical source and deployment**
- Commit `04fc29512d3a4edf13c24e3764087cf3a8592be1` added bounded `get_layer_clusters` and removed the fabricated layer-version strip in favor of chain-derived feature versions.
- StudioNet contract: `0x303f9cBee77a1C84B4A8EF39399E793202FbcEe6`.
- Deployment transaction: `0x576525d6d6e923359b3400faac5f98b7994e707f93759df126bb6e49b92a4f1d` — accepted with GenVM success.
- Source SHA-256: `F0EF7D56DA8D600DDCB388CFCC913F53F865D61EC68F014B9B866767D65F6D3D`.

**Final lifecycle readback**
- Layer `1`, feature `1`, and cluster `1` were created on the final address.
- Cluster `1` finalized status `6` / `INSUFFICIENT_EVIDENCE` with `Evidence UNAVAILABLE or digest verification failed`.
- Feature `1` remained `status=OPEN`, version `1`; history returned `[]`; `get_layer_clusters(1,0,32)` returned the authoritative cluster.

**Frontend**
- Vercel deployment `dpl_AuyPYX3ouMKijYKn3R871cQi8Ho2` is Ready at `https://web-azglr9omk-bibidees-projects.vercel.app` and is configured with the final address.

### 2026-08-24 — Release-blocking enumeration defect found

- A direct `genlayer-js` read against `0x303f9cBee77a1C84B4A8EF39399E793202FbcEe6` established that the deployed `get_clusters` view raises `NameError: layer_id is not defined`.
- The public cluster index therefore showed an empty state; this was a real contract defect, not missing data or a frontend rendering issue.
- The source now corrects `get_clusters` to enumerate `cluster_count`, and makes `get_layer_clusters` use its layer-scoped count. It has passed the available source-invariant suite (4 tests), Vitest (3 tests), TypeScript, lint, and production build locally. Redeployment and a fresh live lifecycle remain required before this source can be called canonical.

### 2026-08-24 16:04 +01:00 — Corrected canonical deployment and public release

**Source association**
- Committed source: `93f6215068a768921901d329d53356ae00593657` (`fix cluster enumeration views`).
- Contract source SHA-256: `6CFCC936E4C237472AE90E7E5151450922A76DE6AAE64DBB5053A5CA9AA9486B`.
- StudioNet deployment: `0xee63b52fD12899498BaC313b7c3Be9Ba0d8d435f`.
- Deployment transaction: `0x46e367496ba837cbcae31f5d2ebec15d048c85068a7421bc405f2fd27f51bdf7` — accepted, leader GenVM success, majority agreement.

**Lifecycle proof**
- Create layer: `0x43260c7075641ca1054ad294448fceed4ece29e55d08e0d4ce6229a293b44312` — returned layer `1`.
- Register feature: `0x3a2f3ec79cd9f6e825f29ce505f121dcac87386e3865289aa43c85a9bca00a92` — returned feature `1`.
- Submit cluster: `0xe85a9e9ff92dfd55a521605458fde64137595252acc1114938afb52784dd44c1` — returned cluster `1`.
- Adjudicate: `0xd81fcb00af7019e1cc27330747264dc994014de8eb187204ad246567e38719d7` — majority agreed, GenVM success, and finalized as status `6` / `INSUFFICIENT_EVIDENCE`; the feature remains unchanged.
- `get_clusters(0,32)` and `get_layer_clusters(1,0,32)` both return the same authoritative cluster; `get_feature_history(1,0,32)` and `preview_related(1,8)` return `[]`.

**Public frontend**
- Production deployment `dpl_D4aN3BtEtu4Y4YsMW5opCLGxD749` is Ready at `https://web-i0qyhgn6i-bibidees-projects.vercel.app`.
- `https://atlasmerge.vercel.app` was repointed to that deployment. Its compiled bundle contains the corrected address, and the SDK read of `get_clusters` returns the expected record.
- Vercel SSO protection is disabled at the project level so the public URL is reachable.

**Remaining truthful limits**
- The CLI serializes its dict argument as pseudo-JSON, so this lifecycle proves contract behavior but does not prove a browser-native object write. The frontend itself sends objects through `genlayer-js`; injected-wallet signing still needs an available user wallet session.
- No accepted, evidence-backed mutation is claimed. The verified outcome is deliberately fail-closed.

**Browser verification**
- The public `/clusters` page was rendered after the alias change and displayed `Cluster 1`, `status → CLOSED`, status `6`, and the authoritative evidence URL.
- Clicking `Connect wallet` produced `No injected wallet is available`; no account request or transaction could occur in this browser session. This is a wallet-session prerequisite, not an application failure.

### 2026-08-24 16:47 +01:00 — Submission-hardening deployment

- Commit `ad4a22e4723391bb5588fdfe74affe1199c1cf4b` hardens the `ACCEPT_DELTA` envelope (`source_accessible`, `MATCH`, `SUPPORTED`, exact submitted attribute/value), makes the digest-bound and adjudicated artifact identical at 6,000 characters, removes string attribute coercion, adds authoritative ID enumeration, adds layer/feature workflow UI and manual-digest UX, behavioral Direct Mode tests, and GitHub Actions CI.
- Contract SHA-256: `BA92EE9ED62FD6595C09DC00E62DC8565649656699F2D3758ABD095E487EF6DA`.
- StudioNet deployment `0x92c78D3fdc71d0DA10475638B250cb4df3aF75ec`; deployment tx `0x37e0b525db17bae63fdaf3e84a88c085205e3cc490a47fbd17b35225c9bb20b9`; accepted with majority agreement and leader GenVM success.
- Vercel deployment `dpl_8LTgkgg94DehZJpgAdegTb8g6Ugd` is Ready at `https://web-lzg1i3py2-bibidees-projects.vercel.app`; `https://atlasmerge.vercel.app` is aliased to it.
- Local checks: static contract suite 4 passed; four behavioral Direct Mode tests are Windows-skipped because the upstream loader cannot unlink its active stdin temp file. Frontend Vitest 3 passed; typecheck, lint and build passed. Linux CI runs the behavioral suite.
- This source is live but **not submission-ready yet**: it is unseeded and no native-wallet ACCEPT lifecycle, VecDB retrieval proof, fail-closed proof, stale-version proof, or CI run URL has been verified for this new address.

### 2026-08-24 16:44 +01:00 — CI status corrected

- GitHub Actions run `32752454573` completed successfully: https://github.com/Bibidee/atlasmerge/actions/runs/32752454573
- The suite executes static contract validation, frontend tests, typecheck, lint, and build. The behavioral Direct Mode job remains visible but non-blocking because `genlayer-test` 0.29.2 currently requests a deleted upstream GenVM asset and fails before test execution; this is documented rather than treated as contract coverage.

### 2026-08-23 19:10 +01:00 — Blueprint pack created

**Goal**
- Produce enough durable specification that a capable coding agent can build AtlasMerge with a minimal prompt and without relying on hidden conversation context.

**Changed**
- Added `AGENTS.md`.
- Added `project-plan.md`.
- Added `prd.md`.
- Added `trd.md`.
- Added `ui/ux.md`.
- Added `handoff.md`.
- Added `memory.md`.
- Added `architecture.md`.

**Verification**
- Documentation-only work; no source code, tests, deployment or live endpoint exists yet.
- Cross-document invariants were generated from one project specification to reduce contradictory APIs.

**Reality check**
- Product, architecture and UX are specified.
- Nothing is yet proven on StudioNet.
- No transaction hash, address, URL or test result should be claimed.

**Decisions**
- Use StudioNet / chain 61999 and `genlayer-js` 1.1.8.
- Injected-wallet-only writes.
- VecDB is retrieval, never verdict.
- Distinct UI language is mandatory.

**Blockers / risks**
- Exact GenVM/SDK runtime compatibility must be verified during implementation; do not assume documentation alone proves deployment.

**Next exact action**
- Scaffold the repo and implement deterministic contract types/state plus direct tests.

### 2026-08-24 19:10 +01:00 — Finalisation workflow and consensus hardening

**Changed**
- Removed the controlled acceptance-evidence fixture from the production tree.
- Replaced Report's hard-coded layer/feature IDs with authoritative live selectors and truthful empty-contract gating.
- Added a real Create Layer form; registration now validates the native attribute object and a strict geometry digest.
- Enforced exact geohash-cell validation (standard alphabet, precision 5–12), strict geometry SHA-256 digests, structured consensus reason codes, canonical memory-ID order, and validator equivalence over every persisted consensus-derived field.
- Added GenLayer write preflight, accurate pending/undetermined/timeout states, explorer links, retryable terminal states, and an explicit MetaMask Snap capability error for wallets that cannot use GenLayer writes.

**Verification**
- Web TypeScript and ESLint passed. Vitest passed: 3 tests in 1 file.
- Direct source and behavioral tests need re-run after the contract-envelope update; Direct Mode remains blocked on Windows and its Linux upstream artifact issue is unresolved.

**Reality check**
- These contract changes are not deployed. `0x92c78D3fdc71d0DA10475638B250cb4df3aF75ec` is no longer a source match once this work is committed; no live lifecycle claim transfers to this source.
- The screenshot's Brave Wallet cannot complete this SDK's MetaMask-Snap write path. No user transaction was sent.

**Next exact action**
- Run the remaining local checks, commit the source, then deploy a fresh StudioNet contract before configuring Vercel.

### 2026-08-24 19:20 +01:00 — Canonical finalisation deployment

**Source association**
- Contract source commit: `0f0829daff01114f5f4531bcaa9c020f1cf1de34` (`finalize live workflow and consensus metadata`), pushed to `origin/main`.
- Contract source SHA-256: `114891D248BF599EFC7DCE38FA543FFE232F142356F729B2D9461B660821F266`.
- StudioNet contract: `0xd0C073A97D80087439920D2bEe6D5580707E38e2`.
- Deployment transaction: `0x9c1ce43a92e901fab58e0eaa29794c0d7bd80e9ccf3f93fab457296588f72186` — `MAJORITY_AGREE`; leader GenVM execution `SUCCESS`.

**Frontend**
- Local public configuration and Vercel production were updated to the new contract address.
- Vercel deployment `dpl_8vgBkeMgrxJraFQ9MsyaNGksc2zY` is Ready at `https://web-7a880q4v2-bibidees-projects.vercel.app`.
- `https://atlasmerge.vercel.app` was explicitly aliased to that deployment; the fetched compiled JavaScript contains the new contract address.

**Verification**
- Frontend TypeScript and ESLint passed; Vitest: 3 passed in 1 file; production build passed.
- Direct Python tests were not run locally because this Windows shell exposes no Python interpreter. The existing Direct Mode behavioral environment also has the documented upstream GenVM artifact blocker; no behavioral pass is claimed.

**Reality check**
- The fresh contract is truthfully empty. No create/register/submit/adjudicate browser-wallet lifecycle, accepted delta, history increment, VecDB insertion, or new negative lifecycle is proven on `0xd0…38e2`.
- The production write path now reports that a Brave-only wallet is unsupported by the current GenLayer SDK: MetaMask with the GenLayer Snap is required. No transaction was sent from the screenshot session.

**Next exact action**
- Use a MetaMask browser profile with the GenLayer Snap to create the first layer and feature through the production UI, then record actual transaction hashes and re-read state.

### 2026-08-24 19:35 +01:00 — Layer form layout correction

**Changed**
- Corrected shared sheet/table form styles so each Create Layer and registration field is a stacked full-width control instead of an inline row with colliding labels.

**Verification**
- ESLint and production build passed.

**Reality check**
- This is a presentation-only correction; it does not change the contract or the wallet capability requirement.

**Next exact action**
- Deploy the layout correction to Vercel and retest the Create Layer screen with MetaMask plus the GenLayer Snap.

### 2026-08-24 20:05 +01:00 — Frontend-only wallet write diagnostics

**Changed**
- No contract files were changed.
- Added EIP-6963 wallet discovery, MetaMask preference/selection, and explicit provider selection in the application header when multiple wallets announce themselves.
- Instrumented `contractWrite` stages: provider selection, account, StudioNet/Snap connect, chain validation, simulation, wallet signature, write submission, and finality.
- Replaced lossy `instanceof Error` handling with an error normalizer that serializes nested `message`, `code`, `data`, `cause`, and own properties for the transaction rail and console.

**Verification**
- TypeScript, ESLint, Vitest (3 passed), and production build passed.

**Reality check**
- No browser Create Layer attempt has occurred after this change, so its exact underlying provider/SDK error is not yet known.
- The canonical contract remains `0xd0C073A97D80087439920D2bEe6D5580707E38e2`; it was not redeployed.

**Next exact action**
- Deploy the frontend-only diagnostics release and have the user select MetaMask then retry Create Layer; record the complete displayed error verbatim.

### 2026-08-24 20:15 +01:00 — Generic injected-wallet write path

**Changed**
- No contract files were changed.
- Removed the SDK `connect("studionet")` call from the browser write path. That helper requests a MetaMask Snap, but is not required for StudioNet's standard EIP-1193 `eth_sendTransaction` path.
- Added generic EIP-1193 StudioNet add/switch handling for the selected provider, preserving the existing diagnostic checkpoints and error serialization.

**Verification**
- TypeScript and ESLint passed; Vitest: 3 passed. Production build completed through TypeScript and static-page generation locally.

**Reality check**
- Rabby has not yet performed a real browser write after this source change, so wallet compatibility is implementation-supported but not live-proven.
- The canonical contract remains `0xd0C073A97D80087439920D2bEe6D5580707E38e2`; it was not redeployed.

**Next exact action**
- Deploy this frontend-only generic-provider change, then retry Create Layer with Rabby and capture the transaction rail result.

### 2026-08-24 20:30 +01:00 — Final contract invariant pass staged

**Changed**
- Added authoritative exact bounding-box validation and deterministic canonical storage.
- Added persistent-reason consistency checks, numeric canonical memory-ID ordering, and same-attribute precedent filtering.
- Replaced Create Layer raw JSON input with four bounded numeric coordinate fields and removed the wallet picker from ordinary UI.

**Verification**
- Frontend TypeScript, lint, and Vitest were invoked successfully before the production build. Direct contract tests remain unavailable locally because this shell has no Python interpreter.

**Reality check**
- These changes require a new StudioNet deployment and Vercel update before they can be considered production behavior.

**Next exact action**
- Commit the frozen changes, deploy the new contract once, then update Vercel to its address.
### 2026-08-24 21:21 +01:00 — Fixed-point ABI release

- Replaced floating-point/object bounding-box calldata with four signed E6 integer arguments: `min_lat_e6`, `max_lat_e6`, `min_lng_e6`, and `max_lng_e6`.
- Browser conversion is decimal-string based and rejects precision beyond six places, reversed boxes, and geographic range violations before simulation.
- Added typed terminal write results that preserve transaction hashes for success, timeout, undetermined consensus, and finalized GenVM rollback.
- Frontend verification: 13 Vitest assertions passed; TypeScript, ESLint, and the production Next.js build passed.
- Contract verification: 10 source/Direct Mode tests executed and passed locally; the Windows-only loader workaround is scoped to its premature temp-file unlink. CI remains blocking on Linux.
- Source commit: `d968383639d8ecf87e260a0c8f5665344ecf2ab1`.
- Contract source SHA-256: `ADEB7B1DF93AA6C1592D8734A2A8DD14D7DD9677F597AC694F3B55D438BAD51B`.
- Deployment transaction: `0x11b39028660af8f39123221562409d2d1235976052acfdf4556f7f87754383ce`.
- Canonical contract: `0x874a677F561F14D4F9722275FA1f46D9D12c5590`.
- Vercel production deployment: `dpl_GJntFukky5pbeQfEkn3cXycyWkMV` (`https://web-hz0jw15y0-bibidees-projects.vercel.app`).
- `https://atlasmerge.vercel.app` was explicitly aliased to that deployment. The public production JavaScript contains `0x874a677F561F14D4F9722275FA1f46D9D12c5590` and does not contain the superseded `0x93F35446B739874E2cf154E58Bae4fC803E3017D` address.
### 2026-08-24 21:52 +01:00 — Wallet reset persistence fix

- Wallet selection is persisted in session storage and restored after application reset/reload.
- The provider rehydrates the existing account with `eth_accounts` and restores the current chain without requesting a new signature.
- Transient injected-provider `disconnect` events now trigger rediscovery instead of clearing the connected wallet UI state.
- Frontend tests (13), typecheck, local production build, and Vercel production build passed.
- Git commit: `4e2581b`; Vercel deployment: `dpl_FV6krVjh2ciC1GQtuojaRJgTVEhu`; `https://atlasmerge.vercel.app` points to this deployment.
- Live seeding: `create_layer` succeeded on canonical contract with tx `0x83ec22599554a81d1f14140e250b56a7648f69a297fc87a5ba1f4dbd92f8c84f`, returning layer 1. CLI feature writes were intentionally rejected by the contract because the CLI serialized the dictionary as text (`attribute object required`); no feature/cluster was falsely claimed.
### 2026-08-24 22:02 +01:00 — Verdict matrix and live-state verification

- Expanded Direct Mode coverage to all four consensus envelope verdicts: `ACCEPT_DELTA`, `REJECT_DELTA`, `SPLIT_CLUSTER`, and `INSUFFICIENT_EVIDENCE`, plus invalid acceptance gates and existing authorization/version/geometry checks.
- Contract/source suite result: **11 passed**.
- Live canonical contract readback: layer 1 exists with bbox `{"max_lat_e6":6650000,"max_lng_e6":3550000,"min_lat_e6":6450000,"min_lng_e6":3250000}`; `get_layer_features(1,0,32)` returns `[]`.
- CLI feature attempts `0x6773cb…d6cb4` and `0x4cbeca…a3d5c8` finalized with contract errors because the CLI sent the attribute dictionary as text. They changed no state. Native injected-wallet signing remains required for feature → cluster → adjudication live population.
