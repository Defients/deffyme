> **Creative Direction V2 review — October 10, 2026 (America/New_York):** [Active design specification](CREATIVE_DIRECTION_V2.md), [roadmap](V2_IMPLEMENTATION_ROADMAP.md) and [reconciliation](V2_RECONCILIATION.md) govern future work. The latest owner brief makes THE CREATURE OF THE INTERNET Defdef's distinct territory; incompatible Gatehouse persona-only anomaly and older room/six-scene recommendations are superseded. Existing G1 Gatehouse code and historical evidence remain preserved; V2 execution and acceptance are pending explicit approval. This revision changes documentation only and authorizes no scene changes or deployment.

# Deployment gates — no deployment authorized

> **October 10, 2026 direction update:** [Defdef’s Gatehouse](GATEHOUSE_SPEC.md) supersedes the old room/six-scene creative acceptance target. Existing publication gates below remain in force. The current task is documentation redirection; Gatehouse implementation and visual acceptance are pending. Historical M0–M2 PASS results do not clear Gatehouse browser, contrast, performance or owner-review gates. Review future Gatehouse art/OG metadata through the existing provenance and output allowlists before publication.

**October 8, 2026 · America/New_York**

These are gates on future publication, not missing prerequisites for opening the completed local preview. Historical Neocities/Neographies and Cloudflare references do not establish the current authoritative publisher.

| Gate | Current evidence / unresolved detail | Required before publication |
|---|---|---|
| Authorization | User explicitly stopped at M0–M2 and prohibited deployment | Separate publication authorization after review |
| Publisher and origin | Current host account, source-of-truth uploader, authoritative directory and automated watchers unknown | Identify and inspect actual publishing flow, ownership and credentials without exposing secrets |
| Production drift | Earlier Phase 0 local/live mismatch; no fresh full production snapshot | Obtain a current production manifest/backup and reconcile drift with local source |
| Recovery | Local old-tree hash is unchanged; no live restore drill | Retain complete production backup and prove scoped rollback/restore procedure |
| Route behavior | Local directory indexes and fresh nested requests pass | Isolated hosting check for slash/index/case behavior, 404 status, redirects and preserved query/hash behavior |
| Story collision | Legacy `/story` alias belongs to another app; new biography uses `/story/` | Resolve only that alias; preserve `/projects/story/` and `/storytime`; test old and new links |
| Scoped release | Exact file ownership exists; no publisher/sync configured | Assemble reviewed per-file upload list and ensure it never deletes unrelated apps/assets/media |
| Music and product privacy | Proposed music index only; site privacy has its own route | Preserve every existing track and product privacy/support/download file |
| Hosting limits and headers | Capacity, types, maximum file size, compression and header controls unverified | Verify limits, MIME types, security headers, HTML revalidation and compressed transfer on target host |
| Asset cache lifecycle | Astro bundles hashed; human-named local art derivatives validated by manifest | Add release/hash namespace for runtime artwork before immutable caching; retain previous release assets for rollback |
| Existing client caches | Root service-worker registrations and scopes not verified live | Test fresh and returning clients; prevent stale homepage or interception of independent applications |
| SEO and previews | Local pages deliberately `noindex,nofollow`; robots disallows crawling; canonical/OG use intended future domain | Review indexing only for approved launch; verify public canonical and OG asset URLs after staged release |
| Browser/UX acceptance | Chromium emulation, keyboard and automated accessibility pass | Owner visual review, unfamiliar-visitor check, physical Android/iOS and screen-reader review |
| Performance completion | Lab paint/shift/transfer targets pass; throttled long tasks observed | Attribute remaining main-thread tasks, assess physical-device behavior and confirm production transfer/cache budgets |
| Public content | No candidate story or private original in output; short intro only | Exact public revision and derivative approvals before any archive publication; no blanket approval from source answers |
| Media and other services | Photos/final music deferred; public links supplied; no live delivery | Selected-media provenance, feature/status verification, and configured/tested contact provider before respective features launch |

Do not infer permission from passing tests. Do not deploy the source directory, planning documents, authoring, image masters, node_modules or validation artifacts. Do not use a delete-sync or wildcard SPA fallback against the existing site.
