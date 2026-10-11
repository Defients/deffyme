> **GitHub review handoff — October 10, 2026 (America/New_York):** The owner has authorized publishing the complete Phase 1 review material to `main` for independent Opus review. Start with [the compact current review brief](docs/OPUS_REVIEW_BRIEF.md), [the Signal Loom refinement gallery](design/phase1-v2-refinement/index.html), and [clone verification / publication boundaries](docs/PHASE1_GITHUB_HANDOFF.md). Signal Loom is the strongest current review candidate; Signal Aperture and Crown Observatory remain challengers. Historical local/uncommitted descriptions below and in earlier reports predate this repository handoff. Runtime modification, production asset promotion and deployment remain unauthorized.

> **Creative Direction V2 review — October 10, 2026 (America/New_York):** [Active design specification](docs/CREATIVE_DIRECTION_V2.md), [roadmap](docs/V2_IMPLEMENTATION_ROADMAP.md) and [reconciliation](docs/V2_RECONCILIATION.md) govern future work. The latest owner brief makes THE CREATURE OF THE INTERNET Defdef's distinct territory; incompatible Gatehouse persona-only anomaly and older room/six-scene recommendations are superseded. Existing G1 Gatehouse code and historical evidence remain preserved; V2 execution and acceptance are pending explicit approval. This revision changes documentation only and authorizes no scene changes or deployment.

> **Phase 1 review update — October 10, 2026 (America/New_York):** V2 remains the active design authority. The owner now authorizes isolated visual-design review and narrowly scoped documentation maintenance; runtime modification and deployment remain prohibited. Start with [V2 direction](docs/CREATIVE_DIRECTION_V2.md), [V2 roadmap](docs/V2_IMPLEMENTATION_ROADMAP.md), [Phase 1 findings](docs/PHASE1_DESIGN_REVIEW.md) and [Opus review handoff](docs/OPUS_REVIEW_HANDOFF.md). Open [the offline visual gallery](design/phase1-v2-review/index.html) for review candidates. Earlier documentation-only notices describe their original phase.

# Deffy.me — V2 direction / preserved G1 runtime

**G1 static Gatehouse implemented · October 10, 2026 · America/New_York · Local preview**

The implemented baseline is **Defdef’s Gatehouse: Visitor → Defdef → Deffy’s world.** The following G1 description records that baseline, not final V2 visual approval. V2 assigns THE CREATURE OF THE INTERNET to Defdef’s distinct domain and requires review of the operator relationship before scene changes. The cozy-room opening, passive mascot role and prescribed six-scene/long-scroll homepage are superseded.

**Historical G1 handoff — October 10, 2026:** [Gatehouse specification](docs/GATEHOUSE_SPEC.md), [implementation handoff](docs/GATEHOUSE_ROADMAP.md), [repository audit](docs/REDIRECTION_AUDIT.md) and [art brief](design/gatehouse-prompt.md) explain the preserved implementation. Their incompatible future-design guidance is superseded by V2; they are not the next-work authority. [Gatehouse validation](docs/GATEHOUSE_VALIDATION.md) records historical evidence and remaining review limits.

The current implementation is a compact Gatehouse entrance with a purposeful Defdef station, six direct destinations, a localized static Creature disclosure, and a calmer human introduction on Story. TypeScript, compiled Tailwind, semantic static HTML, and one selective React island on The Forge supply a reusable foundation.

**Preview:** http://127.0.0.1:4321/ while the local preview process is running. This project has not been deployed. The existing publication tree and independent applications remain untouched.

## Run locally

Use Node 22.23.3 (see `.nvmrc`; minimum 22.19) and npm. The pinned local `node` development dependency also lets npm scripts use the tested runtime without changing the machine's global Node installation.

```powershell
Set-Location H:/myProjects/deffy-me-rebirth
npm ci
npm run check
npm test
npm run build
npm run preview
```

For editing with live reload, use `npm run dev` instead of `preview`. Both bind to the loopback interface. `preview` serves the current `dist` build; rebuild after editing source. Stop the server with Ctrl+C.

To repeat browser verification, install the pinned Playwright browser once, then keep preview running in another terminal:

```powershell
npx playwright install chromium
npm run test:browser
& './node_modules/node/bin/node.exe' scripts/measure-performance.mjs
& './node_modules/node/bin/node.exe' scripts/check-scene-contrast.mjs
npm run verify:legacy
```

The last command requires Python and the original publication tree at its recorded path. It is read-only with respect to that tree. It checks all file paths and bytes against the pre-implementation baseline.

## What is implemented today — G1 static Gatehouse

- **Gatehouse:** canonical Defdef behind a CSS-built counter/threshold; two native invitations focus a six-link directory. A single static Creature seam opens an ordinary disclosure. No homepage framework hydration.
- **Story:** consolidated supplied human introduction, interests and ordinary project/music/world links, with no repeated entrance ceremony.
- **Foundation:** shared document/navigation/footer, licensed local fonts, design tokens, SVG icons, page headings, 404, metadata, static routes, denial-safe experience preferences and system reduced-motion support.
- **The Forge:** the three owner-selected projects, rendered in static HTML, with a React category filter and URL/back-button state. Full catalog migration is a later milestone.
- **Public-content boundary:** revision-bound approval validation, excluded private authoring, an explicit M0–M2 archive-publication stop, output/asset allowlists, synthetic privacy canaries and build budgets.

Supporting routes (`/story/`, `/astrizda/`, `/forge/`, `/now/`, `/music/`, `/connect/`, `/site-privacy/`) provide useful introductions and real links. They remain bounded introductions, not the complete biography, archives, contact delivery, or a music player. Play uses the existing Forge Game filter; Listen and Now retain honest incomplete-media and link-only behavior.

## Where to edit

| Area | Source |
|---|---|
| Identity, project records, social destinations, optional media slots | `src/content/site.ts` |
| Route ownership / output contract | `src/content/routes.json` |
| Global document, nav, footer | `src/layouts/BaseLayout.astro` |
| Gatehouse entrance and human introduction | `src/scenes/GatehouseScene.astro`, `src/pages/story/index.astro` |
| Tokens, layout, responsive composition, motion | `src/styles/global.css` |
| Native preferences/navigation enhancements | `src/scripts/experience.ts` |
| Optional Forge filtering | `src/components/ProjectFilter.tsx` |
| Approved runtime media | `public/rebirth-assets/`, `design/asset-provenance.json` |
| Content export / output verification | `scripts/export-content.mjs`, `scripts/verify-output.mjs` |

The historical implementation records seven supplied Defdef files in ignored local `design/masters/`; these masters are not in a fresh clone. Base and resting are byte-identical in the recorded provenance. Only the optimized resting derivative ships. Other supplied poses can support later bounded behavior after review. The historical room derivatives remain preserved but are not requested by the Gatehouse. Its architectural scenery uses CSS; the only active image is canonical Defdef, also used for the summary share card. The old HeroScene/MeetScene files remain unused historical source. The existing room is an invented illustration. Its [historical generation prompt](design/room-prompt.md) and [asset provenance](design/asset-provenance.json) remain evidence of the current assets; [Gatehouse art guidance](design/gatehouse-prompt.md) is historical. V2 and the owner-reviewed Phase 1 candidates govern future art decisions. The Phase 1 package includes an unchanged canonical reference copy solely for design review, outside public output.

Committed runtime WebP derivatives are sufficient to build after cloning. `npm run assets` is only needed to regenerate artwork and requires the ignored masters retained on this workstation. Source PNGs, generated validation artifacts, private authoring, and raw user documents do not belong in public output.

## Handoff

- [Current compact Opus review brief](docs/OPUS_REVIEW_BRIEF.md)
- [Signal Loom refinement gallery](design/phase1-v2-refinement/index.html)
- [Pre-Opus refinement findings and limits](docs/PHASE1_REFINEMENT_RECORD.md)
- [GitHub publication handoff and clone verification](docs/PHASE1_GITHUB_HANDOFF.md)
- [Active V2 creative direction](docs/CREATIVE_DIRECTION_V2.md)
- [Active V2 roadmap](docs/V2_IMPLEMENTATION_ROADMAP.md)
- [Phase 1 findings, decision record and proposed slice](docs/PHASE1_DESIGN_REVIEW.md)
- [Opus independent review handoff](docs/OPUS_REVIEW_HANDOFF.md)
- [Offline visual review gallery](design/phase1-v2-review/index.html)
- [Historical Gatehouse creative and UX specification](docs/GATEHOUSE_SPEC.md)
- [Historical G1 implementation plan](docs/GATEHOUSE_ROADMAP.md)
- [Redirection audit and preservation decisions](docs/REDIRECTION_AUDIT.md)
- [G1 implementation and validation evidence](docs/GATEHOUSE_VALIDATION.md)
- [Historical implementation and boundary decisions](docs/IMPLEMENTATION.md)
- [Validation, measured budgets, screenshots, and limitations](docs/VALIDATION.md)
- [Deployment gates](docs/DEPLOYMENT_GATES.md)
- [Legacy baseline](docs/legacy-baseline.json)
- [Inter license](docs/licenses/Inter-OFL.txt) and [Space Grotesk license](docs/licenses/Space-Grotesk-OFL.txt)

**Current stop point: Phase 1 design candidates awaiting owner and independent Opus review; G1 runtime preserved.** No Phase 2/3 implementation may begin while review is pending. Owner visual acceptance, physical-device/screen-reader review and publication gates remain pending. G1/M2 measurements stay historical. No deployment command, publisher integration, backend or live messages are included. Do not copy the entire `dist` directory over the existing site or run a delete-sync: future publication must respect exact ownership and preserve unrelated application files.
