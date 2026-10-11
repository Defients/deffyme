> **Creative Direction V2 review — October 10, 2026 (America/New_York):** [Active design specification](CREATIVE_DIRECTION_V2.md), [roadmap](V2_IMPLEMENTATION_ROADMAP.md) and [reconciliation](V2_RECONCILIATION.md) govern future work. The latest owner brief makes THE CREATURE OF THE INTERNET Defdef's distinct territory; incompatible Gatehouse persona-only anomaly and older room/six-scene recommendations are superseded. Existing G1 Gatehouse code and historical evidence remain preserved; V2 execution and acceptance are pending explicit approval. This revision changes documentation only and authorizes no scene changes or deployment.

# Defdef’s Gatehouse — creative and UX authority

> **G1 update — October 10, 2026:** the static Gatehouse slice is now implemented under the owner’s subsequent instruction. See [current implementation and validation](GATEHOUSE_VALIDATION.md). The original planning/NOT RUN statements below describe the earlier documentation pass; they do not describe the new evidence. Owner visual acceptance and publication remain separate.

**October 10, 2026 · America/New_York · Selected direction; implementation pending**

## North star and source precedence

**Visitor → Defdef → Deffy’s world.** Defdef runs the homepage domain: a gatekeeper, host and operator with a visible job. The entrance should feel like his gatehouse or passport desk. Behind it are the human Deffy, projects, Astrizda, play, listen and now. Deffy remains the real person and author; Defdef is his character. **THE CREATURE OF THE INTERNET** is Deffy’s persona, represented by a localized red glitch or root-layer rupture. These identities must remain legible and distinct.

Authority, in order:

1. The owner’s October 10, 2026 instruction selecting concept #3 and its stated relationships.
2. This specification and [Gatehouse roadmap](GATEHOUSE_ROADMAP.md), which turn that choice into practical defaults. Numerical limits and interaction examples below are design rules for future work, not measured results or newly supplied lore.
3. Existing owner-supplied identity, approved public content, canonical Defdef references, asset provenance, route ownership and publication boundaries, wherever compatible.
4. Historical M0–M2 records and external Phase 0 planning, as evidence of earlier work only.

The referenced conversation preview supplies the Gatehouse/passport-desk concept and “Request Access / Just Looking Around” suggestion. Image #3 and the complete ten-image set were not available in this audit. No exact image composition, material or pose is asserted from that unseen reference. The written owner instruction is sufficient to set this direction.

**Superseded:** Creature Headquarters as the opening cozy creator room; the prescribed six-scene homepage; human biography delivered through a mandatory long homepage scroll; Defdef as a passive miniature mascot or optional late cameo; return-to-the-desk narrative pacing; M5 as the first point at which Defdef acquires a functional role. Cinematic depth and optional discovery remain useful, within this Gatehouse hierarchy. A longer readable page remains appropriate for biography and archives.

In particular, the incompatible recommendations in `H:/myProjects/mySite-deffyme/docs/rebirth/CREATIVE_EXPERIENCE_BLUEPRINT.md`, `IMPLEMENTATION_ROADMAP.md`, `CONTENT_MIGRATION_MATRIX.md`, `DECISIONS_AND_UNKNOWNS.md` and `EXISTING_SITE_AUDIT.md` do not govern the new homepage. Those external files remain historical; their inventories, privacy boundaries, factual content and protected-route evidence still apply where compatible. Do not resume the old scene roadmap merely because a historical document calls itself authoritative.

## Homepage hierarchy

The home page is a compact entrance with a useful first view, rather than a compressed biography. At ordinary desktop sizes, aim to show identity, Defdef, the primary action and the six destinations in the first viewport. This is a composition goal, never a fixed-height, clipped-content or scroll-lock requirement.

| Order | Element | Contract |
|---|---|---|
| 1 | Domain identity | `deffy.me`, a short plain-language description of Deffy and a clear human destination. Visitors can tell whose site this is before understanding its fiction. |
| 2 | Defdef at his station | Main illustrated focal point, visibly attending the desk/threshold and directing access. Architecture, lighting and labels converge on his station. He must still read as host in a motionless screenshot. |
| 3 | Visitor invitation | A short authored host line and an immediate action such as “Request Access — Choose a destination”; secondary “Just Looking Around” exposes the same choices. No eligibility check, identity collection or waiting period. |
| 4 | Six destinations | Clearly labeled real links presented as Defdef’s directory or dispatch board. Each includes a short ordinary-language purpose. |
| 5 | Creature anomaly | A small, explicit `THE CREATURE OF THE INTERNET` label beside a localized red rupture beneath/behind the controlled surface. It is visibly abnormal and subordinate to navigation. |
| 6 | Utility/footer | Motion settings, Connect, Site Privacy and ordinary navigation. No duplicate long homepage chapters required. |

Suggested host copy is implementation copy to review, not quoted canon: “Defdef runs the front desk. Deffy made the place.” The host can be dry, territorial and mildly officious; the site should welcome the visitor. Avoid a barrage of system jargon, fake status counters, intimidating warnings and a generic chatbot greeting.

## Destination and route contract

| Visitor label | Existing destination | Meaning / implementation requirement |
|---|---|---|
| Meet Deffy / The Human | `/story/` | The person behind the work. Move/reuse the useful `MeetScene` introduction here during implementation; retain truthful first-person voice and readable depth. |
| Projects / The Forge | `/forge/` | The three selected works, with existing category and URL/history behavior. Keep “Projects” visible. |
| Astrizda | `/astrizda/` | Fictional continuum gateway with its existing external links; no invented canon. |
| Play | `/forge/?category=Game` | Existing game-project filter. Describe it as games Deffy makes; it is not a claim that every project is playable or a new games portal. |
| Listen | `/music/` | Existing listening space. Retain its honest empty state until selected tracks are available. No mock player or autoplay. |
| Now | `/now/` | Current links/activity. The present foundation supplies streaming links, not verified live status. Dated updates can follow when supplied. |

Keep `/connect/` and `/site-privacy/` as utilities. Normal header/footer and direct deep links remain available. New routes are unnecessary for this slice. `src/content/routes.json` remains the machine-readable ownership authority; protected application namespaces and the music-index exception remain intact.

The current `/#meet` link appears in navigation and the Story page. When removing the old homepage chapter, preserve an equivalent `id="meet"` at the human gateway with a clear Story link; update active navigation to `/story/`. Retain the fragment target without restoring a long homepage section. Do not silently break old bookmarks. The legacy production `/story` alias collision still requires the separate publishing decision recorded in the route contract.

The rupture can use a native disclosure with a brief, approved explanation of the persona and an ordinary Story link. Do not invent a `/creature/` page, an archive entrance, lore, personal history or a new chat system solely to support the effect. Private stories never become a reward for “breaching” a layer.

## Defdef’s authority and interaction rules

Defdef controls presentation and dispatch within the homepage fiction. This is authored character behavior, with no claim of independent sentience, security authority or knowledge about visitors.

- He occupies the threshold, attends a console/desk or directory, and visibly introduces or acknowledges destinations. His artwork must have a compositional purpose beyond filling empty space.
- All six links exist in the initial HTML and remain available without JavaScript. Direct navigation takes one activation. Optional desk play must not add mandatory clicks.
- “Request Access” can focus/reveal the directory using a native link or disclosure. “Just Looking Around” gives immediate access to the same directory. Neither option asks for a name, account, reason for visiting, microphone, camera or permission.
- If enhancement acknowledges a destination, it must not delay its link, require a completed animation or intercept browser Back, open-in-new-tab, modifier-click or direct entry.
- Start with one canonical static pose. Add a deterministic controller only if it improves the selected slice. Explicit events may select attending, acknowledging, returning to idle or reacting to the deliberate anomaly disclosure. These are UI states, not new canonical pose names.
- Use supplied poses only where their expression fits. Preserve masters; normalize derivatives rather than inventing anatomy, costumes or animation frames. Resting can work at a purposeful desk even before richer behavior exists.
- Do not continuously track the pointer, infer mood or identity, simulate real live activity, poll services, generate speech or run an LLM. No persistent chat bubble, nagging, forced onboarding, unlock state or denial gag that conceals useful content.
- Keep one brief host line at a time. Hover and focus may share the same small response, with no hover-only information. Avoid announcing decorative pose changes through a live region.
- Escape closes an optional open panel and restores trigger focus. Only use dialog semantics if a true dialog is required; prefer native disclosure/inline content. Navigation links remain anchors, toggles remain buttons or summaries.

## Visual grammar and red rupture constraints

Use a gatehouse, reception threshold or passport-desk composition: quiet architectural depth, a deliberate counter/console, labeled destinations behind or around Defdef, and negative space for real text. Defdef owns the center of attention; readable identity and action retain equal practical priority. Borrow spectacle selectively; avoid sprawling game-menu architecture, a dense dashboard, a Windows-style desktop and six animated competing portals.

Carry forward compatible charcoal/ink, cream, amber/gold and violet, local Inter/Space Grotesk fonts, SVG icons and canonical character colors. Amber/gold expresses Defdef’s authority; violet suggests the larger domain. Cozy lighting can survive as a material detail, without making the creator’s study the homepage premise. Render every label, heading and action as HTML; art is scenery, not the UI. Keep text on quiet solid or near-opaque surfaces and reserve dimensions for artwork.

**Creature red belongs to one contained anomaly region.**

- Desktop: one rupture at the station’s lower edge or a small root-layer seam below it. Mobile: one compact strip/disclosure after the destination list. Red must not wrap every card or become a full-screen background.
- Target red effect coverage of at most 5% of the initial viewport in the default composition. This is an art-review constraint, not a claim that a color-area detector exists. An expanded panel may contain more neutral reading area while keeping its red effect localized.
- Allow fine displaced edges, one interrupted scanline or a thin fractured seam inside a clipped decorative region. No jittering body text, broken link hit areas, continuous flicker, full-screen distortion, simulated browser failures or red spill across ordinary navigation.
- Default rupture is static. Essential and system reduced motion are fully static. If Full adds an effect, use a single deliberate activation lasting at most 300 ms, with no repeating flashes or automatically replaying cycle. Returning to the page does not trigger a breach animation.
- Keep the explicit persona label and an ordinary accessible control/link. Red alone never conveys meaning. Effects must not obscure text or focus indicators and must not intercept clicks.
- Reserve saturated decorative red for this anomaly. Actual errors may use a separate semantic error treatment with explicit text/icon; do not disguise a real form failure as the Creature.
- The rupture suggests a deeper persona/root layer. It never leaks private drafts, treats human trauma as horror staging or becomes a hostile “forbidden archives” teaser.

## Calmer deeper pages

The Gatehouse supplies the memorable arrival. After selecting a destination, readers get a clear heading, ordinary navigation, a comfortable text measure (about 60–75 characters), quiet surfaces and useful content. Keep small shared marks, typography and color continuity; avoid reproducing the large desk or a second gatekeeping ceremony on every page.

Reuse Story’s human introduction and expand only with approved material. Personal archives retain the distinction between memory, documentation, attributed claims and present commentary; exact revision/attachment approval still governs publication. Astrizda can carry more world imagery within its own scope. Forge prioritizes project facts and working destinations. Music stays complete without tracks. Now avoids fabricated schedules and Live labels. Defdef may appear as a small wayfinding signature with a return-home link; he must not interrupt long reading or block deep links. The red rupture does not become a global page texture.

## Responsive, accessibility and performance contract

- Desktop reference views: 1920×1080 and 1440×900. Prefer a broad gatehouse composition, with at least roughly one-third quiet area for identity/directory text. Exact art layout is reviewable, not locked to unseen image #3 pixels.
- At 768px, simplify the station and directory into a clear grid/list. At 390px and 320px, use a compact host/identity block followed by large labeled destination links. Do not shrink a desktop panorama or place tiny hotspots over it. Permit natural vertical scrolling and enlarged text.
- Identity and one primary useful action should appear early on a typical phone. Every destination stays easy to find; fitting all six above a phone fold is not a requirement. Place the anomaly after the main choices.
- Preserve landmarks, skip link, logical heading/DOM order, visible focus and native keyboard behavior. Aim for at least 44×44px targets; test 200% text enlargement and narrow reflow. Never encode labels inside art or depend on drag, hover, sound or color alone.
- Validate actual composited contrast in default, hover, focus, expanded and error states: 4.5:1 normal text, 3:1 large text and required non-text UI boundaries. Decorative layers must remain outside the accessibility tree when equivalent real text exists; meaningful Defdef art gets concise alt text.
- Essential/Balanced/Full remain available; system reduced motion overrides stored preferences both on load and change. Balanced adds only small non-looping control feedback. Failure of storage, JavaScript, images or fonts leaves reading and navigation usable. No flash effects.
- Retain Astro static output, TypeScript and compiled Tailwind. Selective React remains justified for the existing Forge filter; do not hydrate the homepage solely for atmosphere. No all-site router, WebGL, mandatory chatbot or first-view media embed is required.
- Preserve current ceilings: homepage HTML ≤35 KiB gzip; homepage JS ≤45 KiB gzip; shared CSS ≤25 KiB gzip; fonts ≤100 KiB total / two files; Forge JS ≤150 KiB gzip. Keep hero + active Defdef art ≤300 KiB mobile / ≤500 KiB desktop; each active Defdef derivative ≤140 KiB encoded and ≤4 MiB decoded; decorative decoded image memory ≤40 MiB. Existing output checks enforce only part of this set; explicitly measure aggregate art and memory in the next slice.
- Target LCP ≤2.5 s and CLS ≤0.1 under documented cold-load profiles; assess interactions against a ≤200 ms target without calling lab event durations measured field INP. Attribute decorative long tasks above 50 ms; the earlier mobile long-task concern remains unresolved. Prefer simplification to expanding budgets.
- No automatic audio/video requests before opt-in, background polling, continuous animation loop or third-party homepage request. Cancel optional effects on hidden-tab, offscreen and preference changes. Load only active artwork; additional pose prefetch must be bounded and counted.
- Future art enters the existing provenance/allowlist pipeline with approved derivatives, byte/hash records, responsive crops and revised metadata/OG imagery. Do not relabel or replace historical room hashes to imply Gatehouse art already exists.

## Acceptance for the next implementation slice

Review a static desktop and mobile composition first: Defdef visibly hosts the threshold; Deffy’s identity is clear; all six destinations are readable; red is localized. Then verify every link directly and without JS, `/#meet` compatibility, keyboard/focus, reduced motion, image/font/storage failure, 320/390/768/1440/1920 layouts and text enlargement. Repeat output/privacy tests, rendered contrast, transfer and interaction measurements after source changes. Existing browser checks that assert two scenes or a desk note must be revised to test the new journeys, not discarded wholesale.

Ask unfamiliar visitors who owns the site, what Defdef does, where Projects and the human story are, and what the red region represents. Confusion between the human, host and persona indicates a hierarchy problem. Record owner visual acceptance separately from automated results. Gatehouse implementation, screenshots, browser acceptance and performance are **NOT RUN** in this documentation pass; deployment remains outside this scope.
