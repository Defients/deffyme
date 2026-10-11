# Phase 1 V2.2 — Signal Loom fusion correction (static review study)

A static design-review study, **not** a prototype and not an approved design.
It tests one question: can Signal Loom (`design/phase1-v2-refinement/`) become
recognisably *digital* and show Defdef's *agency* using only localized SVG
overlays, with zero changes to the environment painting or character art?

## Provenance

All artwork is referenced unchanged by relative path from
`../phase1-v2-refinement/assets/` (signal-loom-{desktop,medium,mobile}.webp,
defdef-resting.webp, inter/space-grotesk woff2). Nothing is copied, re-encoded,
filtered, blended or recoloured. Plate HTML/CSS derives from the frozen Loom
plates by string transforms (`create-plates.mjs`); `style.css` is the Loom
stylesheet (font URLs rebased) plus a clearly delimited
`/* V2.2 fusion additions */` block.

## What changed vs Loom

1. **Digital anomaly** (`svg.anomaly`): a stepped/orthogonal polyline traces the
   painted red fracture (measured bbox x1481–1565, y88–256), stroke `#ff3b4e`
   2.5, plus 8 torn-scanline rects and 4 segmented dropout columns. Total red
   overlay area: **2,212 viewBox units²** (0.14% of the scene; budget 9,440).
   Idle/action = displaced; response = torn rects snapped on the line, columns
   ~1/3; ack/settled = aligned, columns removed.
2. **Signature-claw junction** (`svg.junction`): perspective-squashed ellipse
   node (26×9) inlaid on the floor at viewBox (1180,700), directly below the
   measured claw tip (1180,636); a stub rises to 8 units below the tip in the
   lit states. Dim `#5e4d6e`/`#17131e` in idle–response; lit `#ffe2a6` in
   ack/settled.
3. **Acknowledgment trace** replaces Loom's floating reaction path: it follows
   the same brass-conductor curve, descends to platform level and runs left
   along the floor (z-index below the character, so it passes behind the feet)
   to the claw node. `#ffe2a6` 2.5 dashed `14 6` + a width-7 under-glow at 25%.
   Response draws ~the first half; ack full; settled full at 45% opacity.
4. **Crown signature** drawn on the floor beside the node (scaleY ≈0.45),
   ack/settled only; the old floating `.signature` placement is removed.
5. **Grounding**: a radial contact-shadow ellipse (~200×26) under the feet in
   every state including arrival, layered between environment and character.
6. **Summary marker**: the `⌁` glyph is replaced by a tiny inline SVG of the
   stepped fragment — red in idle/action/response, `#ffe2a6` in ack/settled.
   The closed-state label reads "Inspect the broken signal +".
7. Character alt corrected to "standing at his signal station".
8. **Mobile** adopts the taller pre-opus framing (art panel 370px at ≤700px,
   315px at ≤340px); anomaly, trace, node, crown and the full character all sit
   inside the art panel at 390 and 320 in idle and ack (verified by DOM rect
   measurement and screenshots).
9. Arrival carries the idle anomaly + dim junction + contact shadow, no trace.
10. Human plate keeps the quiet desktop layout; on ≤700px the order is
    intro → first Story paragraph → remaining prose → links, the duplicate
    pull-quote is hidden, and the approved "The person and the worlds."
    section is added verbatim.

## Files

- `arrival.html`, `domain-{idle,action,response,ack,settled}.html`,
  `human.html`, `index.html` — static plates, zero scripts/handlers/animations.
- `compare-1440.html`, `storyboard-fusion.html` — comparison sheets.
- `create-plates.mjs` (authoring), `render.mjs` (capture/checks),
  `resources.mjs` (budget + overlay area), `analyze.mjs` (coordinate
  measurement), `manifest.mjs` (hashes) — offline tooling only.
- `screenshots/`, `evidence/` — captures, render-checks.json, resources.json,
  manifest.json, fracture-crop.png.
