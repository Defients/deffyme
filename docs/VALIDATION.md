> **Creative Direction V2 review — October 10, 2026 (America/New_York):** [Active design specification](CREATIVE_DIRECTION_V2.md), [roadmap](V2_IMPLEMENTATION_ROADMAP.md) and [reconciliation](V2_RECONCILIATION.md) govern future work. The latest owner brief makes THE CREATURE OF THE INTERNET Defdef's distinct territory; incompatible Gatehouse persona-only anomaly and older room/six-scene recommendations are superseded. Existing G1 Gatehouse code and historical evidence remain preserved; V2 execution and acceptance are pending explicit approval. This revision changes documentation only and authorizes no scene changes or deployment.

# M0–M2 validation

> **Historical evidence only — October 10, 2026 redirection.** [New Gatehouse results](GATEHOUSE_VALIDATION.md) are recorded separately. These results describe the room/two-scene preview, not [Defdef’s Gatehouse](GATEHOUSE_SPEC.md). Gatehouse rendering, browser journeys, responsive layout, contrast, performance and owner acceptance are **NOT RUN**. Reuse applicable checks and budgets, replace obsolete scene/desk-note assertions and record new evidence after implementation. The mobile long-task limitation below remains unresolved. This documentation pass performed a diff/links review, not a runtime recertification.

**October 8, 2026 · America/New_York · local build, not production certification**

Test machine: Windows 11 Home 10.0.26300, Intel Core i7-13700F. Runtime Node 22.23.3; Playwright Chromium 156.0.8078.4. Source and preview are isolated from the preserved publication tree.

**Handoff checkpoint — October 9, 2026:** the local homepage still returns HTTP 200 with the expected identity. The output audit and complete legacy-tree preservation check were repeated and pass. Browser, contrast and cold-load measurements below were recorded on October 8; no application code changed after those checks.

## Checks

| Check | Result | Evidence / scope |
|---|---|---|
| Astro / TypeScript diagnostics | PASS | 0 errors, 0 warnings, 0 hints |
| Publication unit tests | PASS | 6/6: draft/withdrawal exclusion, exact revision binding, private metadata stripping, attachment path rejection, date precision, duplicate and changed-attachment rejection |
| Production build | PASS | 9 real HTML pages, 22 output files; no server runtime |
| Output ownership and privacy | PASS | `artifacts/output-audit.json`: no errors; synthetic draft and attachment canary absent; private source, raw masters and candidate archive material excluded |
| Browser integration | PASS | 17/17 in `artifacts/browser-validation.json` |
| Desktop and mobile layouts | PASS for tested emulation | 1920×1080, 1440×900, 768×844, 390×844 and 320×844; no horizontal overflow; screenshots reviewed |
| Text enlargement | PASS for tested method | 200% computed text sizes at 390px; no horizontal overflow or note/navigation overlap; not a claim of physical-device pinch-zoom testing |
| Keyboard | PASS for scripted journeys | Skip link; menu and settings via keyboard; native disclosures; Escape returns focus to triggering summary |
| Reduced motion | PASS | Stored Full mode overridden when system preference changes; Essential transitions are zero; content remains visible |
| No JavaScript | PASS | Reading, links, mobile native menu, note disclosure and all three Forge items remain usable |
| Failure handling | PASS | Denied localStorage, failed artwork and failed font requests preserve usable reading/navigation |
| Identity glyphs | PASS | Supplied local fonts render the tested accented names and punctuation; CDP reports custom-font glyphs without fallback |
| Automated accessibility | PASS for detected violations | Zero axe violations on desktop homepage, mobile homepage and Forge. Axe flags image-background contrast as incomplete, not passed automatically |
| Scene foreground contrast | PASS for sampled renderings | Separate rendered-background analysis checks 93 text runs across 1440px/390px with zero failures at applicable 3:1 or 4.5:1 thresholds; see `artifacts/scene-contrast.json` |
| Public route navigation | PASS locally | Fresh HTML requests and internal destinations return 200; private paths and protected app namespaces are absent from this isolated build |
| React island behavior | PASS | Category URL state, switching, browser back and static no-JS fallback |
| Unwanted runtime activity | PASS in tested journeys | No external homepage requests or JavaScript page errors; no audio/video elements or requests; no continuous animation loops |
| Production dependency advisory scan | PASS on this date | `npm audit --omit=dev --json`: 0 reported vulnerabilities; not a code security audit |
| Existing-site preservation | PASS | 2,074 files, 3,164,760,628 bytes and complete path/byte SHA-256 match the pre-implementation baseline; `artifacts/legacy-verification.json` |
| Deployment | NOT RUN / prohibited | No upload, redirect mutation, service worker migration, live form send, push or publish operation |

The contrast sampler suppresses text paint and measures the worst background pixel under each text rectangle, including the illustration. It covers the closed-state scene renderings, supplementing axe rather than certifying every control state or all future content.

## Size budgets

Measurements come from the final generated files; KiB = 1,024 bytes. Inline homepage JavaScript is counted separately for its code budget and is already included in HTML transfer, so do not add it twice to page totals.

| Resource | Measured | Blueprint limit | Result |
|---|---:|---:|---|
| Homepage HTML, gzip | 4.46 KiB | 35 KiB | PASS |
| Homepage inline JS, gzip equivalent | 0.70 KiB | 45 KiB | PASS |
| Compiled shared CSS, gzip | 7.73 KiB | 25 KiB | PASS |
| Local fonts | 68.89 KiB / 2 files | 100 KiB / 2 files | PASS |
| Forge external JavaScript, gzip | 68.07 KiB | 150 KiB total | PASS, with ample room for small inline bootstrap |
| Mobile hero + Defdef art | 117.76 KiB | 300 KiB | PASS |
| Desktop hero + Defdef art | 165.72 KiB | 500 KiB | PASS |
| Single Defdef derivative | 52.91 KiB / 0.70 MiB decoded | 140 KiB / 4 MiB | PASS |
| Largest active desktop image set, decoded | Approximately 8.62 MiB | 40 MiB decoration | PASS for image buffers; excludes unmeasured compositor/process overhead |
| Automatic audio/video transfer | 0 | 0 before opt-in | PASS |

The preview server actually served compressed HTML/CSS in the recorded network samples: encoded and decoded sizes are retained separately. Production encoding and cache behavior remain unverified hosting gates. No CDN runtime, React runtime or third-party embeds are fetched by the homepage.

## Cold-load performance

`artifacts/performance.json` contains three fresh mobile contexts and three fresh desktop contexts, cache disabled. Mobile uses 390×844, DPR 1, 4× CPU slowdown, 1.6 Mbps down / 750 Kbps up / 150 ms latency. Desktop uses 1440×900 and unthrottled localhost, not an actual broadband deployment. The interaction journey opens/closes the desk note, scrolls to Scene 2 and opens an interest disclosure.

See the measured sample table appended below. These are local lab observations, **not field p75 or measured real-user INP**. The reported interaction durations cover a small scripted journey. The approximately 9.5 MiB `performance.memory` figure is quantized/coarse and is not process working set.

**Unresolved performance limit:** mobile traces include main-thread tasks above 50 ms. The simple observer does not attribute those tasks to a specific decoration, browser layout or automation. The decorative-task budget therefore remains **NOT CLEARED**, even though observed LCP, CLS and transfer measurements meet the lab targets. Desktop samples show no observed long tasks. No continuous animation remains active after the journey. Process working set and the Full-mode 95%-frame target were not measured.

## Screenshots

All screenshots are in ignored `artifacts/screenshots/`, outside public output. Capture waits for font readiness, image decoding and two paint frames; the initial pre-decode diagnostic is not the deliverable.

- [Desktop hero, 1440px](../artifacts/screenshots/home-desktop-1440.png)
- [Both scenes, desktop](../artifacts/screenshots/home-desktop-full.png)
- [Mobile first viewport, 390px](../artifacts/screenshots/home-mobile-390.png)
- [Both scenes, mobile](../artifacts/screenshots/home-390.png)
- [1920px composition](../artifacts/screenshots/home-1920.png)
- [768px composition](../artifacts/screenshots/home-768.png)
- [320px composition](../artifacts/screenshots/home-320.png)
- [200% text reflow](../artifacts/screenshots/home-text-200.png)
- [Reduced motion](../artifacts/screenshots/home-reduced-motion.png)
- [Font fallback](../artifacts/screenshots/font-fallback.png)
- [Identity glyph inspection](../artifacts/screenshots/identity-glyphs.png)
- [Forge](../artifacts/screenshots/forge-desktop.png)

## Remaining limits and acceptance

Physical Android/iPhone, Safari/Firefox, actual screen-reader use and an unfamiliar-visitor study were not run. Automated checks and emulator screenshots do not replace them. Independent applications were preserved, not functionally recertified. External account destinations and owner-supplied project statuses were not freshly verified as live service claims.

The owner still needs to review the visual direction. Future publication needs the gates in `DEPLOYMENT_GATES.md`, including current origin/publisher identification, production backup and restore, route collision resolution, cache/service-worker review, asset versioning and scoped release ownership. No deployment is authorized.

M0–M2 stops here. The later four homepage scenes, public archive stories, full catalog migration, animated Defdef behavior, personal photography, final music and real contact delivery are intentionally outside this preview.

## Final measured samples

| Profile / run | LCP | CLS | Initial transferred | Long tasks | Largest observed interaction |
|---|---:|---:|---:|---:|---:|
| mobile 1 | 1.360 s | 0.0413 | 200.60 KiB | 79 ms | 32 ms |
| mobile 2 | 1.348 s | 0.0413 | 200.60 KiB | 78 ms | 24 ms |
| mobile 3 | 1.352 s | 0.0413 | 200.60 KiB | 89 ms | 24 ms |
| desktop 1 | 0.080 s | 0.0033 | 248.56 KiB | None | 24 ms |
| desktop 2 | 0.096 s | 0.0033 | 248.56 KiB | None | 24 ms |
| desktop 3 | 0.100 s | 0.0033 | 248.56 KiB | None | 24 ms |
