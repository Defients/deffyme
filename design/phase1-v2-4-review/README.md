# V2.4 visual refinement — isolated review package

Start with [the report](../../docs/PHASE1_VISUAL_REFINEMENT_V2_4.md) and [gallery](index.html). The supplied V2.3 review is preserved in `OWNER_SUPPLIED_REVIEW.md`; its historical repo observations are reconciled separately.

Selected Signal Loom, digital signal language and canonical anatomy remain fixed. Environment-only built-in imagegen edits quiet the near field, replace aqueduct spans with trusses, add a connected receiver and provide gold response/pointing-selector art. Exact prompts and retained edit iterations are in `assets/`. Canonical image/display/pose sources are referenced unchanged from V2.3.

The new receiver must sit in front of the figure. Plates duplicate the same environment image through a scoped CSS clip to show that physical occlusion; no character pixel or digital fracture is redrawn or recolored. Desktop and mobile clips use the same authored hardware bounds. Character position shifts in the environment but native scene-relative stature is unchanged. Environment source width is normalized by one pixel where needed; canonical sources are unaffected.

25 state/viewport conditions cover 1920/1440/768/390/320, with JS disabled and OS reduced motion. Pose and anchor measurements, intentional responsive-flow decisions and resource/field statistics are in `evidence/`. Frozen plates are not an interactive prototype. Viewer recognition, chroma fine-tuning, foreground occlusion and final owner acceptance remain open.

Offline assembly/capture/measurement scripts use existing repository Sharp and Playwright. None ships to the production site. Review figures and masters are not delivery assets. No runtime, route, dependency, publisher, commit or deployment change is part of this package.

Run preservation/package verification from the repository root:

```powershell
node design/phase1-v2-4-review/verify-v2-4.mjs
```

The V2.4 baseline contains every one of the 428 files tracked at task start, including V2.3. It allows only this additive directory and `docs/PHASE1_VISUAL_REFINEMENT_V2_4.md`. The historical and V2.3 verifiers/manifests stay byte-identical. Their allowlists are not extended retroactively.

The new handoff manifest excludes itself and its generated verification report to avoid self-hashing. It includes all other source/evidence/report bytes. Regeneration invalidates hashes; the verifier never silently refreshes them.
