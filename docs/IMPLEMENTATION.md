> **Creative Direction V2 review — October 10, 2026 (America/New_York):** [Active design specification](CREATIVE_DIRECTION_V2.md), [roadmap](V2_IMPLEMENTATION_ROADMAP.md) and [reconciliation](V2_RECONCILIATION.md) govern future work. The latest owner brief makes THE CREATURE OF THE INTERNET Defdef's distinct territory; incompatible Gatehouse persona-only anomaly and older room/six-scene recommendations are superseded. Existing G1 Gatehouse code and historical evidence remain preserved; V2 execution and acceptance are pending explicit approval. This revision changes documentation only and authorizes no scene changes or deployment.

# M0–M2 implementation record

> **Historical record — superseded homepage direction, October 10, 2026.** The [Gatehouse specification](GATEHOUSE_SPEC.md) and [roadmap](GATEHOUSE_ROADMAP.md) now govern future design and implementation. Cozy-room staging, six-scene expansion, passive cameo and deferred M5 host authority are retired. The account below preserves what was actually implemented on October 8; architecture, protected-route ownership, content approval and provenance remain useful. References to then-current user authorization describe that earlier phase, not the scope of today’s documentation change.

**October 8, 2026 · America/New_York · local preview only**

## Authority and scope

The current user instruction explicitly authorizes M0–M2 implementation in a new sibling project and stops before deployment. This supersedes the older Phase 0 documents' planning-only language for this local scope. It does not authorize publication of candidate stories, modification of independent applications, or later milestones.

Authoritative design inputs are the revised documents under `H:/myProjects/mySite-deffyme/docs/rebirth/`, especially `CREATIVE_EXPERIENCE_BLUEPRINT.md`, `IMPLEMENTATION_ROADMAP.md`, and `CONTENT_MIGRATION_MATRIX.md`; Version 3.0 owner answers; and the canonical reference package in `reference-assets/`. The latest user instructions outrank older recommendations. Raw personal answers remain in their owner-controlled attachment location, outside this source project and all generated output.

Version 3.0 governs identity, human complexity, selected works, social accounts and media deferrals. The interface contains a concise first-person introduction. It does not turn difficult history into a fictional persona, publish pending archive narratives, or imply independent verification of owner-supplied project status.

## M0 — boundary and architecture lock

- The sibling target `H:/myProjects/deffy-me-rebirth/` was checked and did not exist before creation. All implementation and dependency installation occurred there.
- The old publication tree has no root reproducible build system in the Phase 0 evidence. It is a mixed source/publication snapshot, not the new source authority. Independent apps were neither copied nor rebuilt.
- A full path-and-byte SHA-256 baseline was recorded before implementation: **2,074 files; 3,164,760,628 bytes; `1c195c254cb63af63636b9e524f3b68ca246c15d80a2561260bc6ac324d55f99`**. The larger count than the original Phase 0 census includes the revised planning package and reference copies. Post-implementation verification matches exactly.
- This baseline is integrity evidence, **not a production backup or proven restore procedure**. The original remains in place; live backup/restore is a deployment gate.
- The earlier audit recorded differences between local and fetched production homepage bytes. That observation remains historical evidence; this phase did not treat the local snapshot as a verified current production backup or re-audit live apps.
- Static directory indexes are the chosen local routing model. Preview direct routes and fresh requests work without a client router. Unknown deployment routing is not silently assumed.
- A new local Git repository was initialized. No remote, push, deployment, or existing-site commit was performed.

**Pinned toolchain:** Astro 7.3.8; TypeScript 6.0.3; React/React DOM 19.3.0; `@astrojs/react` 7.0.1; Tailwind and its Vite integration 4.3.3; Node 22.23.3. Exact dependency versions and transitive resolution are in `package.json` and `package-lock.json`. TypeScript 6 is deliberately selected for the checker integration. The system's older Node 22.14 was not changed; npm scripts use the project-local pinned runtime. Fresh setups should start on supported Node to avoid bootstrap engine warnings.

The architecture follows Astro's documented static rendering and selective framework integration, with Tailwind compiled through Vite: [Astro setup](https://docs.astro.build/en/install-and-setup/), [styling](https://docs.astro.build/en/guides/styling/), [React integration](https://docs.astro.build/en/guides/integrations-guide/react/). Installed versions and local checks, not documentation examples, establish the tested toolchain here.

## Exact output ownership

`src/content/routes.json` is the machine-readable authority. This preview emits nine HTML files: homepage, Story introduction, Astrizda gateway, Forge, Now, Music, Connect, Site Privacy, and 404. Supporting files are favicon, robots and sitemap, plus generated `_astro/` bundles/fonts and hash-verified approved `rebirth-assets/` derivatives.

Protected areas include `/projects/`, `/dm/`, `/codex/`, `/astril/`, product `/privacy/`, `/support/`, `/downloads/`, integration scripts, existing assets/media and unrelated root documents. `/music/index.html` is the only proposed exception within the preserved music directory. Absence of legacy paths on this isolated server is intentional; no app files were migrated into it.

The existing `/story` alias conflicts with future personal `/story/`. This preview emits no legacy redirect rules. A future publisher must retire only the conflicting alias while retaining the Story Time app at `/projects/story/` and the reviewed `/storytime` alias. The `/site-privacy/` route avoids the existing product privacy namespace.

## M1 — reusable foundation

`BaseLayout` owns landmarks, metadata, navigation, footer and experience controls. All reading, navigation and native disclosures work without JavaScript. Semantic HTML remains visible at first paint. A small native TypeScript module handles preferences, disclosure coordination and Escape/focus restoration. There is no homepage React hydration, global client router, third-party embed, analytics, backend or service worker.

Essential, Balanced and Full preserve the same reading path. OS reduced motion overrides the stored setting both at load and when changed. Essential disables transitions; Full adds only a bounded hover response. There are no particle fields, automatic cameo timers, continuous animation loops or polling. Storage is optional and failures are caught.

Inter and Space Grotesk are self-hosted in two licensed Latin WOFF2 files. Font licenses are retained in `docs/licenses/`. Chrome font inspection verified `Ðeffy`, `Klÿz`, `Klÿ(+)`, `Vælix`, `Astrizda` and the em dash use the supplied fonts without identity-glyph fallback. Standard interface symbols are SVG or browser-supported decorative characters.

Public typed records hold the selected projects and social destinations. Photo is null; one signature track and two featured-track slots are null. No fabricated personal portrait, sample favorite song, broken playback control, autoplay, or initial media download appears. Connect uses supplied public destinations; the requested contact form remains M7 work with real delivery configuration still unresolved.

### Publication boundary

Private authoring is ignored by Git and lies outside Astro route discovery and `public/`. A pure exporter constructs whitelisted public payloads, preserves evidence types and date precision, strips private source/approval metadata, and binds approval to the exact public revision and allowed attachment metadata. Meaningful public edits invalidate approval. Duplicate slugs and invalid attachment paths fail.

The M0–M2 build additionally rejects **all** approved archive entries, so publication cannot begin accidentally before M3. Draft and withdrawn records export nothing. No archive index, source excerpt, search result or story attachment is generated. Attachment byte verification/copying and full archive views will need M3 implementation; this foundation is not a claim that archive publication is already complete.

A synthetic draft and source attachment are present in ignored local `authoring/` fixtures. Their canary is absent from all 22 output files. Post-build verification checks exact HTML ownership, approved artwork hashes, forbidden private strings/paths, preview indexing protection, source/master/media exclusions and relevant asset/code budgets. `noindex` is preview hygiene; exclusion from output supplies the privacy boundary.

## M2 — the first two scenes

**Headquarters:** a warm lamp, desk, violet imaginary vista and readable real-HTML identity. The room is a generated illustration, not documentary photography. A native desk note supplies one optional interaction. The optimized canonical resting Defdef is a small static companion, not a new design or a chat interface.

**Meet Deffy:** a personal introduction grounded in Version 3.0, including gaming, self-taught making, curiosity, contradictions and fallibility. Three play/listen/make objects use small code-native decorative art, plain text, native disclosures and real destinations. Photography is unnecessary to make either scene complete.

The seven supplied PNG references were copied unchanged into ignored `design/masters/` with recorded hashes. Base/resting duplication is retained as provenance. The runtime resting derivative uses only resize, transparent padding and WebP encoding: 384×480, 54,176 bytes, approximately 0.70 MiB decoded. Other poses are ready as source inputs, not invented animation frames; their controller belongs to M5.

The selected Forge projects are available immediately as a complete three-item HTML list. Only this page hydrates React for category filtering, URL state and browser history. It does not silently claim completion of the later full-catalog migration.

## Stop point

Local M0/M1 foundation and the M2 implementation are ready for owner visual review. M2 acceptance is not owner-approved merely because automated checks pass. Later scenes, deep biography/archives, full Defdef behavior, full catalog, live status, music selection, contact delivery and deployment remain outside this completed preview scope. See the separate validation and deployment-gate records before expanding the work.
