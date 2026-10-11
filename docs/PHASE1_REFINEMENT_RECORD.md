# Phase 1 — pre-Opus refinement record

**October 10, 2026 · America/New_York · Additive review preparation**

> **Subsequent repository-publication authorization:** The owner requested that all Phase 1 review material be updated to GitHub `main`. [The publication handoff](PHASE1_GITHUB_HANDOFF.md) and [current compact brief](OPUS_REVIEW_BRIEF.md) describe clone access and current scope. The measurements and original-package preservation below remain historical evidence of this refinement pass. Repository publication does not approve implementation or deployment.

The owner's request to use the available runway authorizes further Phase 1 preparation. This work creates a separate static candidate and tests the review material. It does not implement the redesign or run an independent Opus review. The prior [Phase 1 findings](PHASE1_DESIGN_REVIEW.md) and [handoff](OPUS_REVIEW_HANDOFF.md) remain frozen historical records; use the [compact current brief](OPUS_REVIEW_BRIEF.md) for the next review.

## What changed and why

New material lives in `design/phase1-v2-refinement/`: seven static HTML plates, responsive CSS, a generated Signal Loom environment, unchanged canonical-art copies, five-state storyboard, comparison sheets and browser evidence. No document scripts, signal event handlers or executable discovery control exist. The visual control is a frozen storyboard representation. Ordinary links and skip navigation are real native anchors; external destination availability has not been checked.

**Signal Loom is the strongest current review candidate:** asymmetric conductors, depth through material/occlusion, a physically grounded station, and a single small red fracture. Real HTML typography and three opaque destination cards remain readable over the environment. The creature is a separate, unchanged WebP layer, with no filter, redraw or pose replacement. The gold response passes behind him; a crown stamp appears beside the station in acknowledgment/settled frames.

On mobile, arrival becomes title → station → destination rows. Domain becomes introduction → full station → optional artifact → destination rows. The header makes Human/Projects/Worlds available immediately. This is a deliberate crop of environmental art; the complete creature remains inside the art panel. Desktop and mobile storyboard states reserve text space so the station and navigation do not shift between states. Enlarged text may grow naturally; no fixed text clipping is used.

Arrival includes a short quieter boundary into the Human plate, rather than a mandatory extra scene. The five human paragraphs/intro/pull quote come from the existing public Story source. New display headings and domain language are proposals. No unpublished biography or archive content is introduced.

## Original weaknesses found, not silently repaired

[Original supplementary audit](../design/phase1-v2-refinement/evidence/original-audit.json) found five conservative pixel-background contrast flags among 414 sampled text cases: arrival host caption at 1440 (1.43:1), Observatory caption at 1440 (2.32:1), domain station label at 390 in idle and settled (1.11:1), and a settled domain Human link at 1440 (2.51:1). These are minimum ratios across text rectangles, not full WCAG findings; neighboring graphics/overlap require visual interpretation. Original axe scans could not fully resolve gradient contrast.

A separate fresh center-point hit test confirms the Observatory discovery link at 1440 is intercepted by an SVG after scrolling it into view. Its 390/320 centers work. This is a defect in that original plate, not evidence of broken production navigation. The original files remain unchanged; the new candidate places passive art behind controls with pointer events disabled and uses opaque text/control surfaces. Original enlarged text also had awkward word breaks; new text enlargement wraps without horizontal overflow.

G1's visual insufficiency remains: front desk/counter/nameplate, receptionist language, thin architecture and six equal cards make an orderly directory without convincing environmental agency. Its engineering seams remain valuable.

## Fresh focused evidence

| Check | Result and limit |
|---|---|
| No-JS / OS-reduce renders | 35 configurations: seven plates at 1920×1080, 1440×900, 768×1024, 390×844, 320×844. Zero horizontal overflow, scripts or running animations; visible link centers hit. |
| 200% text | Arrival, settled Domain and Human at 320. All text elements with direct text nodes doubled; zero horizontal overflow. This is text enlargement, not a full browser-zoom matrix. |
| Supplementary contrast | 331 sampled cases across arrival/idle/settled/Human at 1440/390/320; no conservative minimum-ratio flags or center-point occlusion flags. Coverage is supplementary, not certification. |
| Axe | Eight scans, zero reported violations. Six retain incomplete gradient contrast; two Human scans have no incomplete items. Pixel-backed sampling supplements, not erases, this limitation. |
| Keyboard | Nine views, 117 native-anchor focus visits, visible outlines and in-viewport focused targets. No manual screen-reader or native-disclosure behavior claim. |
| Storyboard stability | Five states at 1440/390/320 have matching station/control geometry; complete creature bounds stay inside the art panel. |
| Art/font failure | 390 arrival retains heading and 15 anchors without horizontal overflow after WebP/font blocking. Visual completeness depends on artwork loading. |
| Preservation | 54 protected source/art/config files and all 95 frozen original-package files match pre-refinement SHA-256 snapshots. Original archive checksum also matches. |

Raw reports: [render checks](../design/phase1-v2-refinement/evidence/render-checks.json), [contrast](../design/phase1-v2-refinement/evidence/refinement-contrast.json), [boundaries/provenance](../design/phase1-v2-refinement/evidence/boundaries.json), [resources](../design/phase1-v2-refinement/evidence/resources.json). No new runtime build/test certification, throttled LCP/CLS, physical-device, field INP, visitor-understanding or release-host result is asserted. Historical mobile long tasks remain unresolved.

## Assets, cost and feasibility

Built-in image generation produced the environment only. [Exact prompt](../design/phase1-v2-refinement/image-prompt.txt) and [1672×941 source](../design/phase1-v2-refinement/assets/signal-loom-source.png) are retained. Source SHA-256: `ecdb29159239e92d2fbf9aa3a69f7ae3ccd80d6e67610d983c82a615efe02dc4`. Encoding derivatives does not redraw the environment or character. Production art approval remains deferred.

Measured offline files: arrival 1.59 KiB gzip; shared candidate CSS 3.20 KiB gzip; two fonts 68.89 KiB raw. Environment + creature are 159.01 KiB desktop, 123.16 KiB medium, 93.27 KiB mobile, below existing 500/300 KiB art ceilings. Decoded RGBA arithmetic is approximately 6.705 MiB desktop / 2.681 MiB mobile, below the 40 MiB decorative ceiling; creature remains 0.703 MiB, below 4 MiB per pose. These numbers exclude compositor/process memory and do not prove load/render timing. High-DPR sharpness of the 384px canonical derivative and 1672px environment needs independent visual judgment.

The environment's saturated-red pixel proxy is 0.122% of source pixels under the recorded HSV threshold, excluding character artwork. It describes color coverage, not anomaly legibility or geography. The generated fracture reads more like cracked energy than corrupted digital signal; its placement also differs from the requested prompt. The image is not a concept-#3 reconstruction.

Native HTML/scoped CSS/one responsive image plus canonical layer and a tiny static SVG response are feasible. Later, a native `details/summary` could expose the complete settled artifact without JS. Essential/OS reduce/no JS use that complete state; Balanced gets control feedback; Full may add one ≤300 ms measured transform/opacity sequence. No loop, cursor tracking, compulsory dialogue or state framework. Responsive domain/arrival should share one station, not require duplicated full-page panoramas. Estimated implementation: a bounded scene/disclosure slice, with art alignment and motion cancellation the main risks; no engineering schedule is measured.

## Decisions and next boundary

| Status | Decision |
|---|---|
| Confirmed | Phase 1 only; original runtime/canonical source and evidence preserved; public Story copy only; original concept #3 unavailable in inspected locations. |
| Recommended | Challenge Signal Loom first, retaining Signal Aperture as the compact credible alternative and Observatory as an elevation challenge. Reuse one operating station; retain direct navigation and short settling boundary. |
| Open | Internet specificity versus fantasy; still-image ownership; red fracture legibility; first-action value; Human warmth; high-DPR sharpness; owner copy/art preference. |
| Deferred | Executable prototype, scene integration, new public assets, host routing, archive publication, production measurements and deployment. |

Independent review must decide whether to refine again or recommend a named candidate. Owner approval is still required. A subsequent authorized first slice would likely touch `src/scenes/GatehouseScene.astro` and narrowly scoped `src/styles/global.css`, with any optional response in `src/scripts/experience.ts` only after static ownership is accepted. Do not infer approval to alter these files now. Preserve Hero/Meet, route ownership and page structure unless a later exact scope says otherwise. Require no-JS/static completeness, 320/390/768/1440/1920 reflow, keyboard/manual accessibility, actual transfer/render budgets and public-output checks. Roll back through an isolated reviewed commit, preserving G1 assets/history; no release is part of this preparation.
