# V2.3 — Opus 5.5 visual-direction handoff

Selected: Signal Loom with Signal Aperture’s digital signal vocabulary. Crown Observatory is rejected. Studies only; no production changes, deployment or final approval.

Start with [the concise handoff](../../docs/OPUS_5_5_VISUAL_DIRECTION_HANDOFF_V2_3.md), then [the visual gallery](index.html). Comparisons at 1440, 390 and 320 retain untouched V2.2 originals beside new studies. Canonical default/smug/pointing source PNGs are exact copies; display trims are lossless, uniformly scaled, never redrawn or filtered. Environment generation prompts and masters are under `assets/`.

Five frozen state plates × three viewports are captured with JS disabled and reduced motion. These are not interaction prototypes. Idle agency, shared material hierarchy and pose selection remain art-review decisions. The review PNGs are not delivery assets; separately measured WebP trials support feasibility only.

Run from repository root:

```powershell
node design/phase1-v2-3-handoff/verify-v2-3.mjs
```

The separately versioned verifier checks all 361 task-start tracked files and additive V2.3 scope, then package hashes. The original frozen verifier and its manifest remain unchanged; its known later-package scope failure is preserved under `evidence/`.

Offline `prepare.mjs`, `render.mjs` and `measure.mjs` require the already installed repository Sharp/Playwright dependencies. They are review tooling, never emitted into the site. Regenerating review files invalidates their handoff hashes and requires a separately reviewed manifest update; verification never blesses new bytes automatically.

The handoff manifest excludes itself and its generated verification report to avoid self-hashing. It includes the task-start baseline, historical verifier reports, prompts, sources, plates, captures and measurements. Hash validation proves preservation, not art quality or release readiness.
