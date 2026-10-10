# Deffy.me — Creature Headquarters

**M0–M2 local preview · October 8, 2026 · America/New_York**

A separate Astro source project for the first two scenes of Deffy.me's rebirth: an imagined creator's room and the human introduction behind the username. TypeScript, compiled Tailwind, semantic static HTML, and one selective React island on The Forge.

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

## What is here

- **Scene 1:** illustrated Headquarters, clear identity, Meet and Forge links, native desk-note disclosure, a small canonical Defdef cameo.
- **Scene 2:** Version 3.0 human introduction, play/listen/make interests, optional native disclosures, ordinary navigation into deeper destinations.
- **Foundation:** shared document/navigation/footer, licensed local fonts, design tokens, SVG icons, page headings, 404, metadata, static routes, denial-safe experience preferences and system reduced-motion support.
- **The Forge:** the three owner-selected projects, rendered in static HTML, with a React category filter and URL/back-button state. Full catalog migration is a later milestone.
- **Public-content boundary:** revision-bound approval validation, excluded private authoring, an explicit M0–M2 archive-publication stop, output/asset allowlists, synthetic privacy canaries and build budgets.

Supporting routes (`/story/`, `/astrizda/`, `/forge/`, `/now/`, `/music/`, `/connect/`, `/site-privacy/`) provide useful introductions and real links. They are foundation pages, not implementations of later homepage scenes, the complete biography, archives, contact delivery, or a music player.

## Where to edit

| Area | Source |
|---|---|
| Identity, project records, social destinations, optional media slots | `src/content/site.ts` |
| Route ownership / output contract | `src/content/routes.json` |
| Global document, nav, footer | `src/layouts/BaseLayout.astro` |
| First two scenes | `src/scenes/HeroScene.astro`, `src/scenes/MeetScene.astro` |
| Tokens, layout, responsive composition, motion | `src/styles/global.css` |
| Native preferences/navigation enhancements | `src/scripts/experience.ts` |
| Optional Forge filtering | `src/components/ProjectFilter.tsx` |
| Approved runtime media | `public/rebirth-assets/`, `design/asset-provenance.json` |
| Content export / output verification | `scripts/export-content.mjs`, `scripts/verify-output.mjs` |

All seven supplied Defdef files are preserved locally in ignored `design/masters/`; the base and resting files are byte-identical. Only the optimized resting derivative ships. The remaining poses are available for the later M5 behavior system. The room is an invented illustration, explicitly described that way on the page. Its [generation prompt](design/room-prompt.md) and [asset provenance](design/asset-provenance.json) are recorded.

Committed runtime WebP derivatives are sufficient to build after cloning. `npm run assets` is only needed to regenerate artwork and requires the ignored masters retained on this workstation. Source PNGs, generated validation artifacts, private authoring, and raw user documents do not belong in public output.

## Handoff

- [Implementation and boundary decisions](docs/IMPLEMENTATION.md)
- [Validation, measured budgets, screenshots, and limitations](docs/VALIDATION.md)
- [Deployment gates](docs/DEPLOYMENT_GATES.md)
- [Legacy baseline](docs/legacy-baseline.json)
- [Inter license](docs/licenses/Inter-OFL.txt) and [Space Grotesk license](docs/licenses/Space-Grotesk-OFL.txt)

**Stop point: M2 visual review.** No deployment command, publisher integration, backend, live messages, or future-scene work is included. Do not copy the entire `dist` directory over the existing site or run a delete-sync: future publication must respect exact ownership and preserve unrelated application files.
