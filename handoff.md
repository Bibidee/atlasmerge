# AtlasMerge — Handoff Log

## Current release state

- Current final contract source commit: `43bbc95b5413f080174824a8c53da28c2ffaef79`; contract SHA-256 `32ea5e612fc8fdc0cf5e319d21df4ab28868ae0bdc945bb554ab3cc8190c64e8`. Repository HEAD is `c2e8a11` (Vercel project alignment only; contract bytes unchanged).
- New deployment: `0xfBBe4AFA3F196634d7d17951914bFA0AF427a2E4`; deployment transaction `0x0fd9ba8e4126969f35f550b17f45e667072103582c059c0f93b9b021eca8d6e5`. The prior `0x56A9...` deployment is superseded historical state.
- Production frontend deployment `dpl_89aQtVSaNqJSDvA8LEtQM7sFVG41` (`https://atlasmerge-lmtfjgjko-bibidees-projects.vercel.app`) is ready and aliased at https://atlasmerge.vercel.app; its bundle contains `0xfBBe4AFA3F196634d7d17951914bFA0AF427a2E4`. GitHub’s Vercel status for the final commit is green.
- Truthful status: the earlier StudioNet `gen_getContractCode` PostgreSQL adapter error has cleared. Read-only RPC and the candidate adjudication now succeed; the fresh positive lifecycle is proven below. A fresh digest-mismatch write still requires a separate authorized wallet transaction.

> **Mandatory living log.** `AGENTS.md` requires an agent to append here immediately after every meaningful work unit, before starting the next one. This is the operational continuity file; it must describe what actually happened, not what was intended.

## Current checkpoint

- **Phase:** Final release-closure verification after the single convergence redeployment.
- **Last completed work:** Prompt safety, geographic identity binding, canonical verdict convergence, VecDB eligibility parity, authoritative feature IDs, Report submission locking, pinned CI tooling, deployment, Vercel update, and candidate positive lifecycle.
- **Next exact action:** Submit and adjudicate one fresh digest-mismatch cluster on the same contract from an authorized wallet, then record its no-mutation readback.

### 2026-08-25 — Final hosting/CI verification

- Added the root workspace `package-lock.json` so `npm ci` from `apps/web` resolves the declared workspace consistently. Pushed as `eadfd5e`.
- GitHub Actions run `32842395836` for `e084a4d` is **PASS**: frontend tests, typecheck, lint, production build, static validation, and Direct Mode behavioral checks all passed. Local frontend `39/39`, Direct Mode behavioral `16/16`, static/source `8/8` also pass.
- Vercel manual production deployment `dpl_btonCyJhysm47tKWpq37GjWM9JsD` completed successfully. Public alias returns HTTP 200 and deployed JavaScript embeds the candidate contract address. No claim is made that the GitHub-originating Vercel check is green.
- Historical note: an earlier candidate adjudication poll observed the transient backend error `gen_getContractCode: psycopg2.ProgrammingError: can't adapt type 'dict'`; it cleared without source changes and is not a current blocker.

### 2026-08-25 — Final GitHub → Vercel check repair

- Vercel logs for `dpl_38QNfYEvCTCS2sVfJfgwN2j18KEc` showed root-project Next detection failure (`No Next.js version detected`). After declaring the workspace layout in the project settings, the next logs showed root-output deployment failure. The project was then configured with Root Directory `apps/web`, Framework `nextjs`, Install `npm ci`, Build `npm run build`, Node `22.x`, and no output override.
- The GitHub-originating deployment for `c2e8a11` completed successfully as `dpl_JDqcBvkKGM9gea2gNWu4FezqBJGa`; after production env values were set, the verified production redeploy is `dpl_89aQtVSaNqJSDvA8LEtQM7sFVG41`. GitHub deployment status `Vercel=success`; the public alias returns HTTP 200 and its bundle contains only the final candidate address.

### 2026-08-25 — StudioNet diagnostic cleared and candidate lifecycle verified

- Exact `gen_getContractCode` RPC now succeeds for both addresses. Candidate `0xfBBe4AFA3F196634d7d17951914bFA0AF427a2E4` returned 30,017 decoded bytes, SHA-256 `32ea5e612fc8fdc0cf5e319d21df4ab28868ae0bdc945bb554ab3cc8190c64e8`; historical `0x56A940a8622Cb6Ead25bff4Ac0B0dDe5a1D18ae4` returned 29,849 decoded bytes, SHA-256 `1c537aea90b15a7171d53849743e27ad7f78adff0082aa961a97ad284adf943a`. Both responses were base64 strings with the expected source prefix; neither currently reproduces the dict-adaptation error.
- Read-only candidate state is healthy: `get_layer(1)`, `get_feature(1)`, `get_cluster(1)`, `get_layers`, `get_layer_ids`, `get_cluster_ids`, `get_layer_features`, and `get_layer_clusters` all returned successfully. Feature 1 is version 2 with name `Wole Soyinka Centre for Culture and the Creative Arts`; Cluster 1 is status `3` / `ACCEPTED`.
- The previously observed adjudication hash `0x0d33f917cdcbb0c3a10b7b6f98ba70f7d1ae7d8cf33b49790ab9e5d2a3dadd8b` is now `FINALIZED`, status/result `SUCCESS`, consensus result `ACCEPT_DELTA`, with 3 agreeing validators and 2 idle after quorum. `get_feature_history(1,0,32)` contains Delta 1 (old `National Arts Theatre`, new `Wole Soyinka Centre for Culture and the Creative Arts`, digest `sha256:ff3e66d30cacf447f2a2be64b86508404d56ea6c98306e15c49df1e3a8cfc701`); `preview_related(1,8)` returns `delta_id=1` with distance `0.023114331`. Version/history/VecDB mutation is therefore proven on the candidate.
- Classification: the earlier error was a transient StudioNet backend incident (category A), not an AtlasMerge execution failure and not a deployment-record-specific defect. No source or contract change was made.
- **Historical incident:** StudioNet backend `gen_getContractCode` database adapter failure during adjudication; currently cleared.

### 2026-08-25 — Convergence deployment and final lifecycle proof

- Final source commit `98a88688b26b495a7fb33f60837f0b2ca97b1058`; contract SHA-256 `1c537aea90b15a7171d53849743e27ad7f78adff0082aa961a97ad284adf943a`.
- Final contract deployment: `0x56A940a8622Cb6Ead25bff4Ac0B0dDe5a1D18ae4`; deployment transaction `0x870c9d9dea7aa430057a456b2b61b1486d34345b19a38c4233e76f7741a89fd4`; finalized Accepted/SUCCESS.
- Positive lifecycle: create layer `0xafa889c0052b98447ecc25bd60372d9c60a9d98f5fc907c05e0262f798a0bf26`; register feature `0x9f534fdf4b85b2d184f6ec39547e36c2c0de31fc00079ad96f21498fdb5cc716`; submit cluster `0x2371f33222f117fb5bf6b0279565fff99649a352a28d3175fe1537f9bbf4d423`; adjudicate `0xd5bb3b301b0936e4a0b8b143b044abf842ff5f0dc097eca9f4e6c5374d7625f5` finalized Accepted/SUCCESS with `ACCEPT_DELTA`.
- Positive readback: Feature 1 name changed from `National Arts Theatre` to `Wole Soyinka Centre for Culture and the Creative Arts`, version `1 → 2`; history contains Delta 1; `preview_related(1,8)` returned precedent `delta_id=1`.
- Negative digest-mismatch lifecycle: submit cluster `0x82250edb658d3a762845e34992eb465c2e0df15241dabfaaca7614c5b86d925b`; adjudicate `0x1fa45335b88f777f0474ac54ebb3ef2ef46eef4a997ada7c64d9ea9903d6cc24` finalized Accepted/SUCCESS with `INSUFFICIENT_EVIDENCE`; Phase A equivalence was `DIGEST_MISMATCH`, Phase B was bypassed, and Feature 1 remained version 2 with no additional history/VecDB mutation.
- Vercel production deployment `dpl_8krjCDbDWZdCvQ22WD6CtzxNVJcd` is aliased at https://atlasmerge.vercel.app and embeds `0x56A940a8622Cb6Ead25bff4Ac0B0dDe5a1D18ae4.

### 2026-08-25 — Final hardening deployment and live seed

- Deployment finalized on StudioNet from source commit `1fcc22bd0589a4ad5e5a7947ea28ae235da5b993`; contract source SHA-256 is `f3842b2062a111170d40b88874531f140e45c2167eeb8bb99cc801ec22721c9d`.
- Contract `0x473b3ad60d22923aEC7f881f728641F22a4b9ED7`; deployment transaction `0x3542da877e0e882742b1886adec76f82f0b37a412fc348cf66d3c1efc25c663e`; StudioNet Explorer: https://explorer-studio.genlayer.com/address/0x473b3ad60d22923aEC7f881f728641F22a4b9ED7.
- Live seed transactions finalized Accepted/SUCCESS: create layer `0x9cecacf0c1beb3f1c4093e3689ee0adbe40500e706ec3a2abb6cdf9b3547eb8a` (layer 1), register feature `0xec03c30236470bbb3e9d88e9ec2198f1d11c2ab4d8c76487ac92689067078afd` (feature 1), submit cluster `0x092fce247e50aee4ed9f66c6f750fee880b0ba1dbb39b1c85b19964ddf460889` (cluster 1).
- Adjudication transaction `0x1a22f47f229210cab37580e259500f124ed5310647bd0cccaede3b368bec86a0` finalized but failed to reach validator consensus after leader rotation. It is recorded as an undetermined/fail-closed outcome; no feature, version, Delta/history, or VecDB mutation is claimed.
- Frontend production deployment `dpl_7bRfogyA8o8GhHiVcELhQ6RAuqqs` is aliased at https://atlasmerge.vercel.app and its bundle contains the new address.
- Verification: frontend 39/39, contract/direct 20/20, typecheck, lint, and production build passed locally. Hosted CI status for the newest commit remains to be checked before claiming green.

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
### 2026-08-24 22:48 +01:00 — Frontend u256 route-ID boundary fix

- All entity route IDs are now strictly validated as decimal strings and converted to `bigint` before GenLayer calldata: layer, feature, cluster, layer features/clusters, history, semantic-memory, and write methods.
- Regression coverage: 25 frontend tests passed across 5 files; TypeScript and production build passed. The Vercel production build passed.
- Frontend deployment: `dpl_C93zxF8aM3GsdsNoDbBma65vGQCU`; `https://atlasmerge.vercel.app` points to it. Contract was not redeployed.
- Live `get_layer(1)` result: steward `0x79b3ecbe6a65bee93b2fcda78e6909892671507f`, feature count 0, version 1, canonical E6 bbox persisted.
- Steward comparison: this does **not** match the currently supplied wallet `0xc94a…3761`; that wallet is not authorized to register features on Layer 1. Do not attempt feature registration from that account.

### 2026-08-24 — Receipt classification hardening in progress

- Production observation: a Rabby `register_feature` write on Layer 3 / Feature 1 finalized with StudioNet consensus **Accepted**, GenVM execution **SUCCESS**, and contract return value `1`, but the browser labeled it as a rollback because the SDK receipt omitted the expected `txExecutionResultName` representation.
- Scope: frontend-only. Do not alter or redeploy the Intelligent Contract or recreate the already-successfully-registered feature.
- Planned fix: classify success only from explicit SDK/StudioNet success evidence, classify rollback only from explicit failure evidence, preserve hashes, and use an unknown-finalized state plus authoritative readback when execution metadata is incomplete. Add regression coverage and redeploy the frontend.

### 2026-08-24 — Receipt classification fix implemented

- Frontend `contractWrite` now recognizes `FINISHED_WITH_RETURN`, numeric SDK execution result `1`, and nested StudioNet/leader `SUCCESS`; it recognizes rollback only from explicit `FINISHED_WITH_ERROR`, numeric error result `2`, nonzero debug `result_code`, or equivalent failure evidence.
- Finalized receipts without execution evidence now fetch the full transaction and debug trace; if still unknown they surface `finalized_unknown` while preserving the transaction hash and prompting authoritative state refresh, never falsely reporting rollback.
- Regression coverage now includes SDK success, StudioNet leader success, explicit error, nonzero trace failure, missing execution data, and terminal-state preservation. Frontend tests: 30 passed; typecheck and lint passed.
- Production build passed with Next.js 16.3.2. No contract source or deployment files were changed.

### 2026-08-24 — Receipt classification frontend deployed

- Source commit: `d89b540cdd8fabafc837ffd165c1987e81bffb21` (pushed to `origin/main`).
- Vercel production deployment: `dpl_GS65WWvQGonDxzFuvEnG942LVAXa`, ready at `https://web-pwlhwz1vy-bibidees-projects.vercel.app`.
- Public alias `https://atlasmerge.vercel.app` now points to that deployment and returned HTTP 200 after promotion.
- This release changed frontend finality classification only. The Intelligent Contract was not changed or redeployed.
- Safe next user action: retry the Report transaction. The UI will preserve the transaction hash and will no longer label a finalized receipt as rollback unless explicit execution-failure evidence is present.

### 2026-08-25 — Live Cluster 1 unavailable-evidence proof verified

- Canonical contract readback: `get_cluster(1)` is terminal status `6` / `INSUFFICIENT_EVIDENCE`, with `reason_code=SOURCE_UNAVAILABLE`, rationale `Public evidence was unavailable`, and the supplied digest `sha256:ff3e66d30cacf447f2a2be64b86508404d56ea6c98306e15c49df1e3a8cfc701`.
- `get_feature(1)` remains `national-arts-theatre-iganmu`, name `National Arts Theatre`, version `1`; `get_feature_history(1,0,32)` and `preview_related(1,8)` both return `[]`. No Delta/history/VecDB entry was created. Cluster 1 will not be modified or retried.
- Next work unit: publish the exact evidence bytes as a frontend static asset, prove the deployed URL via GenVM web access, and harden terminal-cluster UI behavior without changing the contract.

### 2026-08-25 — Terminal cluster UI hardening and evidence asset staged

- Copied `evidence/national-theatre-rename.txt` byte-for-byte to `apps/web/public/evidence/national-theatre-rename.txt`; both are 1,099 bytes with digest `sha256:ff3e66d30cacf447f2a2be64b86508404d56ea6c98306e15c49df1e3a8cfc701`.
- Cluster detail now reads the target feature, displays the human-readable status and actual current attribute value in BEFORE, and renders no adjudication action once status is terminal; only status `PENDING` can call `adjudicate_cluster`.
- Added regression tests for status labels, terminal-button gating, and current-value rendering. Frontend tests: 37 passed; typecheck and lint completed successfully.

### 2026-08-25 — Evidence asset deployed and GenVM fetch proven

- Frontend source commit: `96f9642b15fa0b779e14a35e36772c52fa1b205a` (pushed to `origin/main`). Local production build and Vercel build passed.
- Vercel deployment: `dpl_4pDzPKEcYioHPde6XrbddfrCSK1K`, ready at `https://web-g7qfvmsx4-bibidees-projects.vercel.app`; `https://atlasmerge.vercel.app` was explicitly aliased to it.
- Deployed evidence URL returned HTTP `200`, exactly `1,099` UTF-8 bytes/characters, and digest `sha256:ff3e66d30cacf447f2a2be64b86508404d56ea6c98306e15c49df1e3a8cfc701`.
- Real StudioNet/GenVM proof used temporary probe contract `0x1Be1DF13f2282F0Ba8ED57331f106Db8C50d6396`, deployment tx `0x6cbd068e9341ce5fa0f8a9f4fb905694fd8c49b162370be62b2fb693a0c65b26`, with `gl.vm.run_nondet_unsafe` wrapping `gl.nondet.web.get`. Verify tx `0x5bb7bcf192bdb53ba157cbf5702d5a7cb37fd8de69713e3c5a6ca558598b5eea` finalized with consensus `Accepted`; leader and agreeing validators reported GenVM `SUCCESS` and returned: `{"body_length":1099,"digest_matches":true,"non_empty":true,"sha256":"sha256:ff3e66d30cacf447f2a2be64b86508404d56ea6c98306e15c49df1e3a8cfc701","status":200,"under_limit":true}`.
- The canonical AtlasMerge contract was not changed or redeployed. Cluster 1 was not modified or retried. Cluster 2 is now safe to submit.

### 2026-08-25 — Cluster 2 diagnostic root cause identified (source fix pending deployment)

- Live readback on canonical contract `0x874a677F561F14D4F9722275FA1f46D9D12c5590`: Cluster 1 and Cluster 2 are both terminal status `6` / `INSUFFICIENT_EVIDENCE`; Feature 1 remains `national-arts-theatre-iganmu`, `name=National Arts Theatre`, `version=1`; `get_feature_history(1,0,32)` and `preview_related(1,8)` remain empty. No accepted Delta, history entry, or VecDB insertion exists from either cluster. Neither cluster was mutated.
- Exact source comparison found the defect: `contracts/atlasmerge.py` accessed `response.status_code`, but GenLayer's `gl.nondet.web.Response` exposes `status`. The resulting attribute exception was caught by the broad fail-closed boundary and converted to `SOURCE_UNAVAILABLE`, even when the URL was HTTP 200 and the digest was correct. This explains both Cluster 1 and Cluster 2 without guessing about evidence hosting.
- The contract source is now patched to `response.status` and adjudication is split into Phase A (multi-validator fetch/digest consensus) followed by Phase B (semantic judgment over the agreed evidence). Direct source regression coverage asserts the API field and phase boundary. Frontend Cluster detail now isolates semantic-memory read failures so a successful Feature read still supplies the actual BEFORE value.
- Frontend verification after this work unit: 37 Vitest tests passed, TypeScript passed, and the production build passed. The exact multi-validator diagnostic contract source was prepared but could not be deployed in this environment because the GenLayer CLI account keystore is locked and its password is unavailable; no new contract deployment or wallet transaction was attempted. The prior temporary probe proved `status`-based GenVM access only, not the old AtlasMerge path.

### 2026-08-25 — Final source published; deployment awaiting authorized StudioNet signature

- Final contract source commit: `0709510b5f4a7578575699d34870868ed21ff861`.
- Final `contracts/atlasmerge.py` SHA-256: `390bbf728580e0f38c6f861ce1db9be79b0d0c1c7a5093ef3ef9de5d09d1c973`.
- The commit is now pushed to `origin/main` (`https://github.com/Bibidee/atlasmerge`).
- Frontend production deployment `dpl_446K4hvL1W6dzSeTba7cxxNUrN2L` is Ready at `https://web-n88xoya93-bibidees-projects.vercel.app`; `https://atlasmerge.vercel.app` now aliases it and returns HTTP 200. The existing contract address remains in the bundle until the new contract is authorized and deployed.
- StudioNet editor has the exact committed source loaded and is at the `Deploy atlasmerge.py` action. No deployment transaction has been submitted; the existing `0x874a…c5590` contract remains canonical until the connected wallet approves this first deployment transaction. Clusters 1 and 2 remain historical fail-closed evidence and are not mutated.
- Full Direct Mode suite was rerun with the authorized bundled runtime: **14 passed**. Frontend verification remains **37 Vitest tests passed**, TypeScript, ESLint, and production build passed. The source-level matrix covers `.status`, HTTP/error and size guards, UTF-8/digest handling, evidence consensus ordering, all four verdicts, and no-mutation requirements for non-ACCEPT branches.

### 2026-08-25 — New canonical contract deployed; lifecycle pending seed

- Final source commit `0709510b5f4a7578575699d34870868ed21ff861` (documentation-only successors `6760058` and `1c1d1db` do not alter contract source) matches the deployed source byte-for-byte: SHA-256 `390bbf728580e0f38c6f861ce1db9be79b0d0c1c7a5093ef3ef9de5d09d1c973`.
- New canonical contract: `0x52CCC1E45D07694f433473f4ADbeA7730076E285`; deployment transaction: `0x618110e64e8a86d2bc557b7a2ad091baf1884118cd5602b6087d65cd3d2771f5` ([Explorer](https://explorer-studio.genlayer.com/address/0x52CCC1E45D07694f433473f4ADbeA7730076E285)). The prior `0x874a677F561F14D4F9722275FA1f46D9D12c5590` is **SUPERSEDED**; Clusters 1 and 2 remain documented historical evidence from that address and were not migrated or mutated.
- `.env.local` and Vercel Production now use the new address. Frontend deployment `dpl_EWxWpRaroHDzR4KFpPb1836JAezo` is Ready, and `https://atlasmerge.vercel.app` aliases it. The public bundle contains the new address and not the superseded address.
- The new contract is intentionally unseeded. No new layer, feature, cluster, or adjudication transaction has been submitted yet; the next required action is the first authorized seed transaction.

### 2026-08-25 — Final-contract Phase A proof and Phase B semantic finding

- Final contract `0x52CCC1E45D07694f433473f4ADbeA7730076E285` was seeded with Layer 1, Feature 1, and Cluster 1. Layer creation tx `0x7cf170d8d4b668f4ca5a862bda211d0fea23c48dc4c415a2769c454f1ba2864d`; feature registration tx `0xad796e982c8e56028c7b1c33a81375d5ede71fa4a7e10168b0e6f8e0220a1d95`; cluster submission tx `0x3cd4daf8086d02bd12acc36bebae944f7b46431ed668fe862d8a53c4ff676cb6`.
- Adjudication tx `0xe058bea56e8aea056622e76b4dc78d4676f43055fec5df24ad69a39038c9084e` finalized with consensus Accepted and GenVM SUCCESS, but returned `INSUFFICIENT_EVIDENCE`. The authoritative equivalence output proves Phase A returned `{kind: OK, ok: true, status: 200, byte_length: 1099, text_length: 1099}` with the exact expected digest across validators. Phase B alone returned `source_accessible=false`, `feature_match=UNCLEAR`, `support=INSUFFICIENT`; no mutation occurred. This is not a fetch failure.
- The source is now hardened so Phase B treats successful Phase A accessibility as authoritative (`source_accessible=true`) and only performs semantic feature/support judgment without refetching. Direct Mode suite after this change: **14 passed**. A fresh contract deployment is required before retrying a positive cluster; the failed final-contract Cluster 1 remains historical and will not be retried.

### 2026-08-25 — Canonical final lifecycle and negative proof complete

- Final source commit: `b167752cf76c6e10378d763ee7bf0816218f9466`; deployed source SHA-256: `5b7d17d2d103d90f5d2b5a3618fef1997b1de6e5950208d6502c61122fc6bc57`.
- Final canonical contract: `0x9D15E405F3aE2A9166866131b1EEC73cd45C8C42`; deployment tx `0x831fe5a918fe469135613edf8e9a1c0506826170df962518a9bb0d0b4de81cc9`.
- Production Vercel now uses this address and `https://atlasmerge.vercel.app` points to deployment `dpl_HgUDx85AyzYTK1693ngwus8oSpTo`; public bundle verification found the new address and no superseded address.
- Positive lifecycle receipts: create layer `0xbcd9d23edfafecfa4a064614e96a08a016fa5f0214f3f8ab0955c1036fc59afa`; register Feature 1 `0x1e7b99008a77e53fb2113b334e80925e4aa7f8e27e5ec89137cd0ec461701b8d`; submit Cluster 1 `0x2f9926910aae62d318847b913506d5f3cd07681c521f039ca757cc64213c23ad`; adjudicate `0xddc659caebcee4b61f174fa6a07efce33118da35865e74305ea9c69489e62433`. All finalized with consensus Accepted and GenVM SUCCESS.
- Final authoritative readback: Feature 1 is version `2`; name is `Wole Soyinka Centre for Culture and the Creative Arts`; history contains one `DIRECT_SUPPORT` Delta from `National Arts Theatre`; `preview_related(1,8)` returns Delta 1 with distance `0.036313582`.
- Final negative proof: Cluster 2 submission `0x5e9dff5bb7a802435688bffa53cbe0f94beef8d9220b512aa73d6b3b3dc17454`; adjudication `0xb1410cafa6a743216981691cdc6119bf1fb7926571155408d6d019005983adb5` finalized with GenVM SUCCESS / Accepted and returned `INSUFFICIENT_EVIDENCE`; reason `DIGEST_MISMATCH`. Feature remains version 2 and history/VecDB contain no additional mutation.
- The superseded contracts `0x52CCC1E45D07694f433473f4ADbeA7730076E285` and `0x874a677F561F14D4F9722275FA1f46D9D12c5590` remain historical only. Their Cluster 1/2 unavailable-evidence records were not mutated.

### 2026-08-25 — Final polish verification (current HEAD)

- Final HEAD before this documentation-only record: `462c692cc0f2cd56ff91b0b21614ce3c718052c4`; working tree was clean. The canonical contract remains `0x9D15E405F3aE2A9166866131b1EEC73cd45C8C42`; no contract source or deployment was changed.
- Local final verification: Frontend **37/37 Vitest tests passed**. Contract behavioral/Direct Mode **14/14 passed**. Static contract validation **8/8 passed**. Typecheck **passed**. Lint **passed**. Production build **passed**. Local failed: **0**. Local skipped: **0**; the Direct Mode runner emitted only the informational warning that no `gltest.config.yaml` was present and therefore used its default localnet configuration.
- GitHub Actions run for this HEAD: [run 32823007639](https://github.com/Bibidee/atlasmerge/actions/runs/32823007639) completed **failure** in the `Contract behavioral Direct Mode` step; all preceding install, frontend, typecheck, lint, build, and static-validation steps passed. No test was intentionally skipped. The hosted job's detailed log was not available to the repository token, while the same 14-test suite passes with the authorized bundled GenLayer runtime locally; this is recorded rather than presented as a green CI result.
- Final positive proof remains: Create Layer `0xbcd9d23edfafecfa4a064614e96a08a016fa5f0214f3f8ab0955c1036fc59afa` → Register Feature `0x1e7b99008a77e53fb2113b334e80925e4aa7f8e27e5ec89137cd0ec461701b8d` → Submit Cluster `0x2f9926910aae62d318847b913506d5f3cd07681c521f039ca757cc64213c23ad` → ACCEPT_DELTA adjudication `0xddc659caebcee4b61f174fa6a07efce33118da35865e74305ea9c69489e62433` → Feature version 2 → Delta 1/history → VecDB precedent `Delta 1`, distance `0.036313582`.
- Final live negative proof remains: digest-mismatch Cluster 2 submission `0x5e9dff5bb7a802435688bffa53cbe0f94beef8d9220b512aa73d6b3b3dc17454`, adjudication `0xb1410cafa6a743216981691cdc6119bf1fb7926571155408d6d019005983adb5`; it finalized Accepted/GenVM SUCCESS with `INSUFFICIENT_EVIDENCE` / `DIGEST_MISMATCH`, and caused no feature, history, or VecDB mutation.
- Additional live negative proofs (stale-version, unauthorized feature registration, cross-layer proposal, unauthorized cancellation) were **not submitted** in this polish pass: each requires a new wallet-signed transaction, and no such mutation was authorized. The reproducible Direct Mode suite covers the corresponding authorization, version, geometry, and no-mutation behavior without manufacturing production state.
- The earlier `response.status_code` incident is preserved as a fail-closed engineering note: the fetch exception became `INSUFFICIENT_EVIDENCE` rather than mutating state; the implementation now uses `response.status`.
- Production smoke checks: `https://atlasmerge.vercel.app` returned HTTP 200 and the public bundle points to the canonical address. The app URL and canonical contract above are the final production pair.

### 2026-08-25 — Final closure audit after hardening source changes

- Hardening source commit: `0818326f7dc33144e1d8ea9371ef2c62b01c22e6`; contract source SHA-256 `61889e59e64a59d1c5d1929bb2f36cb5e4720b497758701656b88e52681eddf3`. CI-only pin successors are `9c62ae1` and `c38f0e8`.
- Local verification on the hardening source: frontend **39/39 passed**, Direct Mode **16/16 passed**, static validation **8/8 passed**, typecheck passed, lint passed, production build passed; local failed `0`, skipped `0`.
- Direct Mode toolchain is pinned to official testing-suite commit `75a5bcde75582734caaf210b9ebadab358fd45cb` with the official GenVM `v0.3.0-rc7` runners archive cached by CI. The latest hosted run [32828791984](https://github.com/Bibidee/atlasmerge/actions/runs/32828791984) still fails in the blocking behavioral step; all setup, artifact, frontend, typecheck, lint, build, and static steps pass. The hosted failure is not hidden or marked non-blocking.
- The hardening source has **not** been deployed. The prior `0x9D15...` positive/negative lifecycle remains historical proof for the previous source, not proof of this changed source. A wallet-authorized StudioNet deployment and complete lifecycle replay are still required before READY can be claimed.
