# Phase 1 V2.4 — Signal Loom visual refinement

**October 11, 2026 · America/New_York · Revised candidate for visual review. No production implementation, release or final acceptance.**

The owner supplied a **REFINE VISUALS AGAIN** verdict on V2.3, then delegated the next-step choice. This isolated follow-up addresses the silhouette/input blockers and fills the missing viewport evidence. [Supplied review and factual reconciliation](../design/phase1-v2-4-review/OWNER_SUPPLIED_REVIEW.md). Signal Loom remains selected; Crown Observatory remains rejected.

## Inspect the changes

| Evidence | Desktop | Mobile / tablet |
|---|---|---|
| V2.3 → V2.4 idle | [1440 comparison](../design/phase1-v2-4-review/screenshots/comparison-idle-1440.png) | [390 comparison](../design/phase1-v2-4-review/screenshots/comparison-idle-390.png) · [320 comparison](../design/phase1-v2-4-review/screenshots/comparison-idle-320.png) |
| V2.3 → V2.4 pointing | [1440 comparison](../design/phase1-v2-4-review/screenshots/comparison-ack-pointing-1440.png) | [390 comparison](../design/phase1-v2-4-review/screenshots/comparison-ack-pointing-390.png) |
| Newly required widths | [1920 idle](../design/phase1-v2-4-review/screenshots/idle-1920.png) | [768 idle](../design/phase1-v2-4-review/screenshots/idle-768.png) · [768 inspection full](../design/phase1-v2-4-review/screenshots/inspection-768-full.png) |
| Complete response | [State board](../design/phase1-v2-4-review/screenshots/state-board.png) | [390 pointing full](../design/phase1-v2-4-review/screenshots/ack-pointing-390-full.png) · [320 settled full](../design/phase1-v2-4-review/screenshots/settled-320-full.png) |

[Gallery](../design/phase1-v2-4-review/index.html) includes direct state links. Inspect idle without the operator caption before judging authority.

## Decisions and visible objectives

| Review finding | V2.4 change | Judgment still required |
|---|---|---|
| Violet transport swallows Defdef. | Near facets and platform reflections are quieter. Defdef moves within the same bay to a darker field, retaining the same scene-relative stature. Distant violet channels retain depth and energy. | Does the mane read first at 320/390, without flattening the monumental environment? The exact requested 30–40% brightness/saturation calibration is **not claimed**. |
| Crown competes with lit pipe. | Gold follows the outer-right run; the inner vertical stretch behind the crown stays dim bronze. | Inspect the crown edge against both idle and received art; avoid treating proximity alone as integration. |
| No visible idle input. | A tangible bronze receiver meets the existing long claw. Its pedestal and floor branch form a continuous mechanism to the red seam. Receiver artwork is layered in front of the canonical figure, using the same environment pixels. | Does this read as operation rather than standing behind a cup? The hardware deliberately occludes a small part of the lower figure; review that physical staging, not just bounding boxes. |
| Aqueduct arches and shard clutter. | Flat engineered spans and angular trusses replace the arches; smaller shard clutter is reduced. | Retain mystery and immense scale; some painterly floor texture remains. |
| Pointing gesture misses the mechanism. | A connected selector rises beside the canonical pointing hand. Pointing is provisional for acknowledgment and settled states; smug remains a comparison. | The selector is adjacent to the finger, not claimed as pixel-exact fingertip contact. Revisit smug only after unaided idle recognition passes. |
| Header/copy/shift issues. | Connect is restored; a subordinate “Static experience” label replaces ambiguous status wording. Intro proposes “A world beyond the screen. A creature at the controls.” Desktop reserves open-state height; tablet/mobile use normal-flow disclosure expansion. | Copy remains proposed. The static label is a review indicator, not a replacement for the existing runtime preferences control. |

Character source/display bytes are referenced unchanged from V2.3. No anatomy, crown, gemstones, mane, eyes, chest tuft, pose or hue is redrawn, recolored, mirrored or distorted. Position changes in the environment; uniform scale and floor anchor stay consistent across the five states. The receiver foreground is real scene artwork, not a pasted digital fracture or floating causal trace. Its crop is authored review-layer geometry and requires appropriate occlusion/delivery treatment in any later implementation.

## Evidence, measurements and limits

All five states are captured at **1920×1080, 1440×900, 768×1024, 390×844 and 320×800** with JS disabled and OS reduced motion: **25 captures, zero load/layout/anchor/target-size failures**. At 768 the first trial exposed wasted desktop space; the final study uses a compact centered station and normal-flow text. These are frozen frames, not an implemented native disclosure.

[Recorded measurements](../design/phase1-v2-4-review/evidence/render-checks.json): maximum pose-height spread **0.015625 px**, floor-anchor spread **0 px**. Desktop route-top spread is **0 px**, clearing the earlier 16.1875 px movement in the review plates. At 768/390/320, opened transmission text intentionally expands below fixed art; route movement is recorded rather than hidden. Authored anomaly and receiver bounds remain inside every art frame. Bounds do not prove semantic recognition.

[Environment-field analysis](../design/phase1-v2-4-review/evidence/resources-and-field.json) samples the environment behind the head/mane region at each composition’s actual character position. Mean linear luminance is about **71% lower**; normalized HSV saturation is nearly unchanged. This reflects combined material and placement changes, **not** a same-location 35% desaturation pass or a foreground/background contrast certification. The visual hierarchy improves through separation and darker values; further chroma tuning remains a legitimate review correction.

Offline single-environment plus largest existing pose trials total about **180.17 KiB mobile / 246.92 KiB desktop** in idle. They fit the documented art ceilings, but no runtime transfer, cold-load or interaction performance was measured. Review plates still use canonical PNG display references, not optimized delivery art. Generated environment dimensions are normalized to 1672×941 before derivatives; one source is 1671 px wide. No character source is resampled by that operation. [Built-in imagegen prompts and edit sequence](../design/phase1-v2-4-review/assets/imagegen-prompts.json) are retained with source images.

## Remaining acceptance and preservation

The **4-of-5 unfamiliar-viewer criterion is untested**. [Prepared worksheet](../design/phase1-v2-4-review/VIEWER_TEST.md) collects unaided idle role/input interpretation and opened-transmission understanding. No results or participant identities are invented. Owner visual acceptance, canonical rendering review and actual composited contrast remain pending.

The [V2.3 handoff](OPUS_5_5_VISUAL_DIRECTION_HANDOFF_V2_3.md) still supplies runtime, accessibility, performance and preservation constraints: native details/summary with a distinct static open mechanism; meaningful Astril Continuum transmission and real `/astrizda/` link; existing motion preferences and dismiss/focus behavior; 44 px controls, 200% text, failure modes and composited contrast; HTML/JS/CSS/font/Forge budgets, art 300/500 KiB, pose 140 KiB/4 MiB, decoded decorations 40 MiB, LCP/CLS targets and unresolved long-task attribution. The smaller prompt budgets remain optimization goals. Count all simultaneously resident or prefetched states/poses in a future slice.

Human remains prose-first on mobile; Human / Projects / Worlds are provisional. Runtime, route ownership, aliases, publication scripts, dependencies, legacy tree, canonical masters, prior review packages and deployment gates remain unchanged. No new route, production asset promotion, commit, push or deployment was performed.

Task-start baseline was clean `main` at `8a24117d4e06818a48a09840a70db3a7de74e0d1`. [Separately versioned V2.4 verification](../design/phase1-v2-4-review/verify-v2-4.mjs) checks **all 428 tracked files**, including the committed V2.3 package, plus new-package hashes and authorized additive scope. [Result](../design/phase1-v2-4-review/evidence/verification-v2-4.json). The original frozen verifier and V2.3 verifier/manifest are preserved byte-for-byte; their scope is not expanded retroactively.

**Next decision:** review whether the visible receiver and darker silhouette field earn unaided operator recognition. This package is ready for that review, not final design acceptance or production work.
