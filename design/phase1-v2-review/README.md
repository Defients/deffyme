# Offline Phase 1 visual review package

**October 10, 2026 · America/New_York · Review candidates only**

Open `index.html` in a browser. No server, account or build is needed. Images, character reference and licensed fonts are local. This directory is outside Astro `public/` and owns no site route. Never copy it into release output.

- `arrival.html`, `alternative.html`, `domain-{idle,action,response,ack,settled}.html`, `transition.html`, `human.html`: nine responsive frozen compositions; no page scripts or executable signal behavior.
- `screenshots/`: desktop and mobile viewport/full-page captures, comparison sheets, source-preview G1 baseline and design QA evidence. Capture dimensions are in filenames and `evidence/render-checks.json`.
- `assets/canonical-defdef.png`: byte-identical canonical base reference; review use only. `assets/defdef-resting.webp` is the unchanged approved runtime derivative copied for review. Original masters/provenance/public files remain untouched.
- `assets/*.woff2` and their OFL license texts: copies of the project’s existing fonts.
- `evidence/`: original provenance copy, render/design checks, protected-file preservation, reference status and package integrity manifest.
- `generate.mjs`, `verify.mjs`: review-artifact generation/inspection utilities using already-installed Playwright/sharp/axe. They are not runtime code or new dependencies. Run from the work project with its pinned Node if regeneration is needed. Fresh G1 screenshots require an existing source preview on loopback port 4322; the utility does not start or publish a site.

Findings and independent review instructions live at `../../docs/PHASE1_DESIGN_REVIEW.md` and `../../docs/OPUS_REVIEW_HANDOFF.md` in the packaged layout. The original selected concept #3 is unavailable in the inspected inputs. Canonical reference is available and inspected; other ignored supplied poses remain in the local project but are unnecessary for these candidates.

The “Inspect the signal” surface is deliberately frozen. Gallery navigation selects separate states; it does not simulate the proposed interaction. Runtime implementation, asset promotion and publication each require later explicit authorization. Stop for owner and independent review.
