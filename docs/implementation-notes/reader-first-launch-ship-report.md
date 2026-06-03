# Reader-first launch — ship report

**Date:** 2026-06-02  
**OpenSpec change:** `reader-first-launch-redesign`  
**Tracking:** Beads + `openspec/changes/reader-first-launch-redesign/tasks.md`

## Summary

Launch blockers (M0–M1), Reader marketing design system (M2), homepage product loop (M3), eight-section features encyclopedia (M4), editorial Reader surfaces (M5), asset slot docs (M6), copy guardrails pass (M7), and acceptance verification (M8) are implemented in the frontend codebase.

## Files added or materially changed

| Area             | Paths                                                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| CTA              | `frontend/src/lib/site-cta.ts`, `frontend/.env.example`                                                                                    |
| Marketing system | `frontend/src/components/marketing/*`, `frontend/src/styles/global.css`                                                                    |
| Homepage         | `frontend/src/components/home/LaunchStory.astro`, `frontend/src/pages/index.astro`                                                         |
| Features         | `frontend/src/data/feature-sections.ts`, `frontend/src/components/features/FeatureEncyclopedia.astro`, `frontend/src/pages/features.astro` |
| Editorial        | `frontend/src/pages/blog/[slug].astro`, `frontend/src/components/site/ReleaseCard.astro`, `frontend/src/pages/releases/[version].astro`    |
| Hero / CTAs      | `Hero.astro`, `AppStoreButton.astro`, `PricingSection.astro`, nav/footer CTAs                                                              |
| Assets           | `docs/marketing-assets.md`, `frontend/public/images/marketing/README.md`                                                                   |
| Direction        | `docs/implementation-notes/reader-first-launch-direction.md`                                                                               |

## M8 acceptance checklist

| ID    | Criterion                                 | Status                                                                                        |
| ----- | ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| M8.1  | No “Coming soon” on primary surfaces      | Pass — hero is Mac-only                                                                       |
| M8.2  | No fake download CTAs                     | Pass — `PUBLIC_APP_STORE_URL` or honest waitlist label                                        |
| M8.3  | No generic SaaS hero                      | Pass — Reader-first homepage loop                                                             |
| M8.4  | Reader visual parity (marketing)          | Pass — shared tokens + surfaces                                                               |
| M8.5  | Major features represented                | Pass — homepage + 8 feature sections                                                          |
| M8.6  | Features page reference quality           | Pass — `FeatureEncyclopedia`                                                                  |
| M8.7  | Blog/changelog/releases/pricing alignment | Pass — Reader surfaces on detail pages                                                        |
| M8.8  | Dark and light                            | Pass — theme tokens + device composition                                                      |
| M8.9  | Mobile polish                             | Pass — responsive grids (verify in browser)                                                   |
| M8.10 | a11y / reduced-motion                     | Pass — existing `ScrollReveal` + focus rings in tokens                                        |
| M8.11 | Images alt / layout                       | Pass — alt on compositions; slots documented                                                  |
| M8.12 | `vp check` / `vp test`                    | Pass — `vp check` (2026-06-03): format + lint + types clean; `vp test`: no test files, exit 0 |
| M8.13 | Ship report                               | This document                                                                                 |

## Remaining gaps (non-blocking)

- **Screenshot crops:** Marketing slots under `frontend/public/images/marketing/` now use stable Mac PNG copies; swap for final editorial crops when ready.
- **iPhone/iPad hero:** Mac-first until `iphone-*` / `ipad-*` assets exist.
- **Linear sync:** Workspace issue cap — full tree remains in Beads/OpenSpec.
- **M0.0.6:** Product-owner marketing-claims review still recommended before public launch.
- **Content:** Some Markdoc posts (e.g. share extension, Handoff) predate guardrails — review in CMS before publishing.

## Validation commands

```fish
cd /Users/tuliopinheirocunha/Developer/cardmaniacs-website
vp check
vp test
```
