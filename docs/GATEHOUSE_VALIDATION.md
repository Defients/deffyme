> **Creative Direction V2 review — October 10, 2026 (America/New_York):** [Active design specification](CREATIVE_DIRECTION_V2.md), [roadmap](V2_IMPLEMENTATION_ROADMAP.md) and [reconciliation](V2_RECONCILIATION.md) govern future work. The latest owner brief makes THE CREATURE OF THE INTERNET Defdef's distinct territory; incompatible Gatehouse persona-only anomaly and older room/six-scene recommendations are superseded. Existing G1 Gatehouse code and historical evidence remain preserved; V2 execution and acceptance are pending explicit approval. This revision changes documentation only and authorizes no scene changes or deployment.

# G1 Gatehouse — implementation and local evidence

**October 10, 2026 · America/New_York · Local preview; no deployment**

## Result and scope

Implemented the [G1 roadmap](GATEHOUSE_ROADMAP.md) under the owner’s subsequent implementation instruction. Defdef visibly attends a CSS-built architectural station and counter, with canonical artwork and a host nameplate. The compact homepage includes plain identity, two native invitations, six direct destinations and one static Creature disclosure. Story consolidates the supplied human introduction into a calmer reading page. This slice does not add archive stories, new lore, a music player, live status, contact delivery or a character controller.

The existing local checkout `H:/myProjects/deffy-me-rebirth` remains on `docs/defdef-gatehouse`. Previous documentation changes were preserved. No push, deployment, live message, host mutation, dependency change, legacy-tree edit or artwork generation occurred. Existing room assets and provenance remain intact; the homepage now requests only the approved Defdef derivative. The share card uses that same image as a summary card. Historical HeroScene/MeetScene source remains unused; the homepage no longer imports it.

Three focused Shards assisted: one revised browser UX tests, one independently reviewed the contract/source, and one revised contrast/performance measurement. Root implemented the UI, corrected a shared-style ordering issue before final build, reviewed captures and assembled evidence. No separate persona/runtime is introduced by this collaboration.

## Implementation changes in this pass

| File | Change |
|---|---|
| `src/scenes/GatehouseScene.astro` | New static entrance, purposeful Defdef station, six-link directory and native Creature disclosure. |
| `src/pages/index.astro` | Replace old two-scene imports with Gatehouse and owner/host metadata. |
| `src/content/site.ts` | One typed directory source; human navigation now targets Story; existing identity/project/media records retained. |
| `src/pages/story/index.astro` | Consolidate useful human/interests copy, distinguish person/character/persona/fiction and add ordinary deeper links. |
| `src/layouts/BaseLayout.astro` | Use approved canonical Defdef image for summary share metadata, with meaningful image alt. |
| `src/scripts/experience.ts` | Include Creature in native disclosure dismissal/Escape focus behavior. |
| `src/styles/global.css` | Replace room/home-scene styles with responsive CSS Gatehouse architecture, counter, directory and contained seam; preserve shared/deeper styles and motion preferences. |
| `tests/browser.mjs` | Replace obsolete scene journeys with Gatehouse navigation, state, failure, accessibility and responsive checks; preserve historical evidence through new filenames. |
| `scripts/check-scene-contrast.mjs` | Sample real backgrounds across default/expanded/hover/focus/settings states, handling scrolled coordinates and opaque panel occlusion. |
| `scripts/measure-performance.mjs` | Measure Gatehouse interactions, enforce aggregate-art/memory and lab metric targets, and capture CDP traces for long-task inspection. |
| `scripts/verify-output.mjs` | Label the output audit G1 while explicitly retaining the earlier archive-publication boundary; validation rules retained. |
| `README.md` | Describe the implemented runtime, new source seams and current evidence. |
| `docs/GATEHOUSE_SPEC.md`, `docs/GATEHOUSE_ROADMAP.md` | Add dated implementation-status notices without rewriting earlier planning evidence. |
| `docs/VALIDATION.md` | Link current evidence while preserving October 8 measurements as historical. |
| `docs/GATEHOUSE_VALIDATION.md` | This implementation, verification and limitations record. |

## Verification

| Check | Result | Evidence / practical scope |
|---|---|---|
| Astro / TypeScript | PASS | 0 errors, warnings or hints. |
| Publication unit tests | PASS | 6/6; exclusion, exact public revision, metadata stripping, attachment boundaries, precision and invalid edits retained. |
| Static build / output audit | PASS | Nine owned HTML pages, 22 files; no private-data/output-ownership errors or homepage framework hydration. `artifacts/output-audit.json`. |
| Browser UX | PASS | 24/24 scripted checks, Chromium; `artifacts/gatehouse-browser-validation.json`. |
| Destinations | PASS locally | All six exact links navigate with and without JS. Play filter hydrates to Intrilex; no-JS Forge retains complete three-project fallback. Modified click opens a normal new tab. |
| Compatibility / keyboard | PASS for scripts | Native invitations focus directory; `/#meet` reaches Story gateway; skip link, visible focus, menu/settings and Creature Escape/focus restoration. |
| Responsive / enlarged text | PASS for emulation | 320, 390, 768, 1440 and 1920 widths; 44px destination targets; 200% computed text at 390px with geometry checks. Narrow Story/Forge checked. |
| Accessibility scans | PASS for detected violations | Axe checks default/expanded Creature/settings/menu, destinations, mobile Story, enlarged text and narrow Forge. Native no-JS journeys are asserted separately because axe requires script injection. |
| Rendered text contrast | PASS in sampled states | 387 samples, zero failures; `artifacts/gatehouse-contrast.json`. Supplementary pixel analysis is not full WCAG or non-text certification. |
| Motion / failures | PASS for scripts | Stored preference/system override; no running Gatehouse animation under reduced motion; blocked storage, artwork and font scenarios remain navigable. |
| Runtime activity | PASS for tested journeys | No external homepage requests, JS errors, automatic audio/video, homepage React island or animation loop. |
| Performance targets | PASS for six cold lab runs | LCP, CLS, observed interactions, aggregate art and decoded-image targets pass; detailed limits below. |
| Mobile long-task budget | NOT CLEARED | Layout work above 50 ms remains in 4× CPU traces; see attribution limits below. |
| Owner / unfamiliar visitor review | NOT RUN | Captures reviewed by agents; owner acceptance and human comprehension study are separate. |
| Physical devices / screen reader / production | NOT RUN | No real iOS/Android, screen-reader session, field p75/INP, hosting/cache recertification or deployment. |

## Measured budgets and performance

| Resource | Current measurement | Ceiling |
|---|---:|---:|
| Homepage HTML, gzip | 3.61 KiB | 35 KiB |
| Homepage inline JS, gzip equivalent | 0.70 KiB | 45 KiB |
| Shared CSS, gzip | 6.24 KiB | 25 KiB |
| Local fonts | 68.89 KiB / two files | 100 KiB / two files |
| Forge external JS, gzip | 68.07 KiB | 150 KiB |
| Active homepage art, mobile and desktop | 52.91 KiB | 300 / 500 KiB |
| Decoded active image memory | 0.703 MiB | 40 MiB total decoration; 4 MiB per Defdef pose |

Image memory is dimensions × four bytes, not total process/compositor memory. Inline JS is already included in HTML bytes and should not be added twice to transfer totals. Historical room derivatives may still exist in the build but are not initial Gatehouse requests.

Three fresh, cache-disabled contexts per profile: mobile 390×844 DPR1, 4× CPU slowdown, 1.6 Mbps down / 750 Kbps up / 150 ms latency; desktop 1440×900 DPR1 on unthrottled localhost. Journey: Request Access, Creature disclosure open/close, first-link hover/focus, settings Essential/Balanced and Escape.

| Profile | LCP range | CLS | Largest observed interaction |
|---|---:|---:|---:|
| Mobile | 0.812–0.844 s | 0.003674 | 40 ms |
| Desktop | 0.064–0.068 s | 0.002383 | 24 ms |

These are local lab measurements, not field p75 or real-user INP. Event Timing omits durations below its 16 ms threshold. Raw resources, image measurements, event records and checks are in `artifacts/gatehouse-performance.json`; six `gatehouse-trace-{profile}-{run}.json` files preserve trace evidence.

**Long-task limitation:** the mobile observer records 51–57 ms tasks. CDP traces show roughly 47.5–53.5 ms document Layout work in the corresponding later tasks, near completion of the Inter font request, without application FunctionCall work in those tasks. A font-related relayout is a plausible inference, not a proven single cause. Traces also contain initial renderer Layout work of approximately 167–177 ms under 4× CPU. The observer and renderer trace have different coverage; report both. This does not demonstrate that the decorative-task budget is cleared. Historical October 8 tasks cannot be retrospectively attributed from their old observer-only data.

## Visual evidence and next boundary

New evidence uses `gatehouse-*` names, preserving old screenshots/reports. Representative captures under ignored `artifacts/screenshots/`: desktop 1440 and 1920, full mobile 390 and narrow 320, tablet 768, expanded Creature, keyboard focus, reduced motion, 200% text, Story desktop/mobile, Forge narrow and font failure. Desktop 1440×900 shows all six destinations in the initial viewport; the mobile page uses natural scrolling and large explicit links. CSS-built scenery needs no new asset approval or byte manifest entry.

Review the station, hierarchy, host copy and contained seam with the owner; retain the remaining performance attribution limit. The next optional G3 enhancement should only add bounded acknowledgments after that review. Publication still requires [deployment gates](DEPLOYMENT_GATES.md), including exact ownership, the `/story` alias collision, production backup, cache/worker behavior and separate publication authorization.
