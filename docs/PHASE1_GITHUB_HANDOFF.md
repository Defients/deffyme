# Phase 1 — GitHub handoff for independent review

**October 10, 2026 · America/New_York · Owner-authorized repository publication**

The owner explicitly requested that the complete Phase 1 review material be updated to GitHub `main` for Opus. This authorization covers the isolated design packages, review evidence, documentation and review-only Git metadata. Runtime redesign, scene implementation, asset promotion into `public/`, deployment and Phases 2–5 remain unauthorized.

## Start here

1. Read [the compact current Opus brief](OPUS_REVIEW_BRIEF.md).
2. Open [the Signal Loom refinement gallery](../design/phase1-v2-refinement/index.html) locally after cloning. GitHub's HTML source viewer is not the rendered composition.
3. Compare [the four directions](../design/phase1-v2-refinement/screenshots/directions-compared.png), [experience overview](../design/phase1-v2-refinement/screenshots/experience-overview.png), and [five frozen states](../design/phase1-v2-refinement/screenshots/storyboard.png).
4. Inspect the requested desktop/mobile captures linked from the gallery, then [the refinement evidence and limits](PHASE1_REFINEMENT_RECORD.md).

The original [Phase 1 gallery](../design/phase1-v2-review/index.html), [design findings](PHASE1_DESIGN_REVIEW.md) and [earlier Opus handoff](OPUS_REVIEW_HANDOFF.md) remain historical records. Their local/uncommitted status described preparation before this publication. The current compact brief updates the author's preferred candidate to **Signal Loom**, without declaring design approval or prejudging the independent review.

## Repository truth

The publication is based on GitHub main merge `23607891d543f8a495ac1b20c965be5ecc0ab0c3`, tree `045631d22925ed5566cb563c4f4b26ce235c8a7c`. The original local G1/V2 commit `c0daffd1e21eb856d1f2a7273293ae2671ab6818` has the same tree. These remain historical baseline identifiers; inspect the latest GitHub commit for the review-publication revision. No self-referential commit hash is embedded here.

Both `design/phase1-v2-review/` and `design/phase1-v2-refinement/` are now repository review material outside Astro's public output. They include rendered screenshots, static responsive plates, canonical reference copies, licensed fonts, provenance, generation prompt/source and evidence. The original 95-file package is unchanged. Scoped `.gitattributes` rules preserve design evidence bytes across Windows/Linux checkouts; runtime text behavior is unaffected.

The ignored portable ZIP remains a local convenience duplicate. A fresh GitHub clone contains the review payload directly and does not require that ZIP. Private authoring, generated private-content exports, other ignored character masters, build output, dependencies, credentials and legacy application folders are excluded.

## Verify without repeating the investigation

Run `node design/phase1-v2-refinement/verify-github-handoff.mjs` from the cloned repository. It needs only Node built-ins and Git. It checks SHA-256 of the published original/candidate material, canonical identity, protected baseline Git blobs and the allowed publication paths. It does not regenerate visual evidence or write a report into the worktree. Its [manifest](../design/phase1-v2-refinement/evidence/github-handoff-manifest.json) records relative paths, so no local Windows drive is required.

Earlier preservation/browser scripts and JSON reports retain their original workstation paths and historical measurements. The source PNG in the refinement assets makes environmental rendering independent of the generator's original output location. Do not run the original generator/package scripts over the frozen evidence. The independent reviewer should inspect selected images first rather than ingest every report by default.

## Publication boundaries

No runtime source, public asset, dependency, route ownership, application configuration or test is changed by this publication. GitHub reported zero Actions workflows and Pages disabled before the update. No publisher, upload-to-host or deployment command is invoked. External host watchers remain unverified; this repository update is not a deployment certification.

The independent review has not occurred. Concept #3 remains unavailable in the inspected inputs. Automated/pixel checks do not establish complete accessibility, production timing, visitor understanding or physical-device acceptance. Preserve the `/story` versus `/story/` host concern and all privacy/release gates.

Return a challenged ranking and a concrete recommendation to refine, recommend a named candidate for owner approval, or reject the current directions. Independent static challengers belong in a new `design/opus-review-v2-1/` directory. Do not modify the preserved packages or begin runtime work.
