# AtlasMerge — UI/UX Specification

## 1. Design thesis

**Archetype:** cartographer's field desk: map dominates, controls live in instrument strips rather than cards

**Signature:** Accepted changes appear as contour-like hatch marks around a feature; history opens as a physical-looking map legend strip. The review screen places before/after attributes along the bottom like surveying measurements.

The interface must visually belong to this domain. Remove the logo and a reviewer should still identify what kind of product it is.

## 2. Anti-generic-AI rules

Do not use:

- purple/blue gradient hero;
- glowing background orbs;
- centered “AI-powered” headline + 3 feature cards;
- glassmorphism;
- bento-grid filler;
- giant rounded rectangles everywhere;
- decorative metric cards without a workflow purpose;
- meaningless radar/donut charts;
- excessive icons;
- sparkle/brain/robot AI motifs;
- 3D tokens/network spheres;
- wallet-connect as primary visual identity;
- hover lift/drop-shadow on every surface.

Do not import a UI kit and accept its default look. If primitives are used, restyle them to this system.

## 3. Color system

| Token | Hex | Primary use |
| --- | --- | --- |
| field | `#24352C` | map chrome and land controls |
| paper | `#EEE7D6` | review sheets and legend surface |
| contour | `#D5792A` | candidate/accepted map-change mark |
| water | `#4C7C84` | map water + informational accent |
| ink | `#1D2521` | primary map/record text |

Use status text alongside color. Do not create gradients between these colors.

## 4. Typography

Public Sans for controls; Roboto Slab for place labels and change titles

### Type roles

- **Domain title:** strong display face defined above.
- **Primary prose/evidence:** readable text face with generous line height.
- **Identifiers/digests:** mono where specified.
- **Controls:** compact UI face.
- **Status:** uppercase or small-cap only when it matches this project's design language; never use every label as a pill.

## 5. Geometry and surfaces

map-first canvas, rectangular tool palettes, topographic line motifs, 4px corners, no floating glass panels

Borders/rules should do more work than shadows. Keep domain documents, maps, timelines, brackets or matrices visually primary.

## 6. Motion

map pan/zoom only plus restrained 150ms evidence drawer; accepted delta briefly stamps into the legend

All motion obeys `prefers-reduced-motion`.

## 7. Application chrome

### Header

- Project/domain context left.
- Live StudioNet/fixture/unavailable provenance visible but quiet.
- Actual wallet network + address utility right.
- No auto-connect.
- Wrong network blocks the write in-context.

### Navigation

Navigation should use the domain concepts from the route list below. Avoid generic “Dashboard / Analytics / Settings” unless a screen genuinely is settings.

## 8. Route-by-route specification

### `/` — Living map

**Desktop composition:** MapLibre canvas full screen; narrow top instrument bar and left layer ledger; accepted changes are contour hatches.

**Primary action:** Select feature/report

**State requirements:** explicit live provenance, loading, empty/not-found where applicable, unavailable read, wallet disconnected (read remains usable where possible), wrong network for writes, submitted transaction, consensus/finality pending, finalized-success + authoritative re-read, finalized rollback/error, and abstain/insufficient where the domain supports it.

**Mobile adaptation:** Preserve the main artifact and primary action. Move the secondary evidence/memory pane into a full-height sheet or dedicated route rather than shrinking text into unreadability.

### `/report` — Report capture

**Desktop composition:** Mobile-first field form over map with GPS optional, public photo/evidence and structured change type.

**Primary action:** Save off-chain report

**State requirements:** explicit live provenance, loading, empty/not-found where applicable, unavailable read, wallet disconnected (read remains usable where possible), wrong network for writes, submitted transaction, consensus/finality pending, finalized-success + authoritative re-read, finalized rollback/error, and abstain/insufficient where the domain supports it.

**Mobile adaptation:** Preserve the main artifact and primary action. Move the secondary evidence/memory pane into a full-height sheet or dedicated route rather than shrinking text into unreadability.

### `/clusters` — Cluster review board

**Desktop composition:** Map + bottom measurement table; each cluster shows report spread and proposed single delta.

**Primary action:** Open cluster

**State requirements:** explicit live provenance, loading, empty/not-found where applicable, unavailable read, wallet disconnected (read remains usable where possible), wrong network for writes, submitted transaction, consensus/finality pending, finalized-success + authoritative re-read, finalized rollback/error, and abstain/insufficient where the domain supports it.

**Mobile adaptation:** Preserve the main artifact and primary action. Move the secondary evidence/memory pane into a full-height sheet or dedicated route rather than shrinking text into unreadability.

### `/clusters/[id]` — Delta compare

**Desktop composition:** Before/after attribute ruler at bottom; report evidence drawer left; related historical deltas right.

**Primary action:** Submit/adjudicate cluster

**State requirements:** explicit live provenance, loading, empty/not-found where applicable, unavailable read, wallet disconnected (read remains usable where possible), wrong network for writes, submitted transaction, consensus/finality pending, finalized-success + authoritative re-read, finalized rollback/error, and abstain/insufficient where the domain supports it.

**Mobile adaptation:** Preserve the main artifact and primary action. Move the secondary evidence/memory pane into a full-height sheet or dedicated route rather than shrinking text into unreadability.

### `/features/[id]` — Feature history sheet

**Desktop composition:** Map centered on feature with vertical survey ledger of versioned deltas.

**Primary action:** Inspect source evidence

**State requirements:** explicit live provenance, loading, empty/not-found where applicable, unavailable read, wallet disconnected (read remains usable where possible), wrong network for writes, submitted transaction, consensus/finality pending, finalized-success + authoritative re-read, finalized rollback/error, and abstain/insufficient where the domain supports it.

**Mobile adaptation:** Preserve the main artifact and primary action. Move the secondary evidence/memory pane into a full-height sheet or dedicated route rather than shrinking text into unreadability.

### `/layers/[id]/versions` — Layer/version explorer

**Desktop composition:** Version strip and accepted delta table, filterable by geohash/attribute.

**Primary action:** Select version

**State requirements:** explicit live provenance, loading, empty/not-found where applicable, unavailable read, wallet disconnected (read remains usable where possible), wrong network for writes, submitted transaction, consensus/finality pending, finalized-success + authoritative re-read, finalized rollback/error, and abstain/insufficient where the domain supports it.

**Mobile adaptation:** Preserve the main artifact and primary action. Move the secondary evidence/memory pane into a full-height sheet or dedicated route rather than shrinking text into unreadability.

### `/contributors` — Contributor trail

**Desktop composition:** Public report activity without universal score; provenance counts and accepted links.

**Primary action:** Inspect reports

**State requirements:** explicit live provenance, loading, empty/not-found where applicable, unavailable read, wallet disconnected (read remains usable where possible), wrong network for writes, submitted transaction, consensus/finality pending, finalized-success + authoritative re-read, finalized rollback/error, and abstain/insufficient where the domain supports it.

**Mobile adaptation:** Preserve the main artifact and primary action. Move the secondary evidence/memory pane into a full-height sheet or dedicated route rather than shrinking text into unreadability.


## 9. Signature components

The component library should be named around the domain. Core cross-project primitives may exist internally, but visible components should reflect this product.

- **Primary domain surface:** implement the `cartographer's field desk: map dominates, controls live in instrument strips rather than cards` rather than a card grid.
- **Decision strip/rail:** fixed place for on-chain status and tx lifecycle.
- **Semantic context:** related records with ID/version/raw distance.
- **Immutable reference block:** URL + digest + copy + provenance.
- **History/version object:** append-only past decisions.
- **Network gate:** exact expected/actual chain.
- **Receipt:** printable/copyable authoritative outcome.

Project pages to support:

- Living map
- Report capture drawer
- Cluster review board
- Feature history sheet
- Delta compare view
- Layer/version explorer
- Contributor trail

## 10. Transaction experience

Never show “success” after only receiving a transaction hash.

```text
Awaiting signature
  -> submitted (hash)
  -> consensus/finality pending
  -> FINALIZED
  -> inspect GenVM execution
     -> SUCCESS: re-read record
     -> ROLLBACK/ERROR: show failure, do not fake state
```

Do not show a fake percentage while consensus is pending.

## 11. Semantic-memory presentation

Semantic memory is related context, not truth.

### Show

- record title/ID;
- namespace/version;
- raw vector distance;
- one bounded authoritative excerpt/summary;
- final status of that prior record;
- why it is eligible.

### Never show

- “92% true”;
- “AI confidence based on similarity”;
- “validator certainty” derived from KNN;
- a green check merely because distance is small.

## 12. Density and information design

This product should be usefully dense.

- Repeated records use ruled lists/tables.
- Identifiers are selectable/copyable.
- Evidence and result are visually distinguishable.
- Digests/versions sit beside the object they bind.
- Do not hide critical details behind hover.
- Avoid excessive whitespace that turns an operational app into a landing page.

## 13. Responsive system

### Desktop

Use the full signature composition.

### Tablet

Primary domain object + one context pane; other nav/context becomes a drawer.

### Mobile

- one main column;
- 44px touch targets;
- dedicated full-screen mode for map/graph/bracket/complex matrix;
- hashes wrap and have copy controls;
- evidence/context becomes a sheet;
- primary write can use a bottom action bar only when contextually valid.

## 14. Accessibility

- WCAG AA text contrast.
- Text labels for all status colors.
- Full keyboard access.
- Visible focus state.
- Table headers/semantic HTML.
- List alternative to visual graph/map.
- Evidence selectable as text.
- Reduced motion.
- Minimum practical text size 12px for dense metadata, larger for critical text.

## 15. Content language

Use domain language and precise transaction language.

Good:

- “Related records retrieved”
- “Bound to version 3”
- “Finalized; GenVM execution rolled back”
- “Insufficient public evidence”
- “No eligible semantic memory found”

Avoid:

- “AI magic”
- “Trustless revolution”
- “Intelligence score”
- “Smart insights”
- “Powered by next-gen AI”

## 16. Screenshot quality bar

- [ ] Logo can be removed and the product is still visually identifiable.
- [ ] No generic AI-template motifs.
- [ ] Main domain artifact occupies more attention than metrics.
- [ ] Wallet is utility chrome.
- [ ] Provenance is visible.
- [ ] Transaction truth is inspectable.
- [ ] VecDB distance is not mislabeled.
- [ ] Empty/error/abstain states look intentional.
- [ ] Mobile primary workflow is viable.
- [ ] Color, type, geometry and composition differ materially from the other nine packs.
