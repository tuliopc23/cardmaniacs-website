---
target: all pages — 40/40 target
total_score: 40
p0_count: 0
p1_count: 0
timestamp: 2026-06-08T19-18-42Z
slug: frontend-src-pages
---

# Critique: All marketing pages (`frontend/src/pages`)

**Target:** Home, Features, Pricing, Blog, Changelog, Docs, Press, dynamic editorial/legal routes  
**Register:** Brand · **Date:** 2026-06-08 (40/40 pass)

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                                                              |
| --------- | ------------------------------- | --------- | ------------------------------------------------------------------------------------------------------ |
| 1         | Visibility of System Status     | 4         | Honest App Store CTAs; content visible without JS; device tabs and jump nav expose state               |
| 2         | Match System / Real World       | 4         | Reading-desk metaphor, workflow language, and native Apple framing stay coherent                       |
| 3         | User Control and Freedom        | 4         | Slim homepage IA; hero-only interactive platform picker; features jump nav; drawer Escape + focus trap |
| 4         | Consistency and Standards       | 4         | Tokens, motion policy, and CTA paths aligned (`/#get-the-app` when URL unset)                          |
| 5         | Error Prevention                | 4         | No fake download links; pricing disclaimer when listing pending                                        |
| 6         | Recognition Rather Than Recall  | 4         | Home proof uses Mac screenshot; deep tour on `/features` with anchored sections                        |
| 7         | Flexibility and Efficiency      | 4         | Desktop download + mobile dock App Store; sticky feature jump rail                                     |
| 8         | Aesthetic and Minimalist Design | 4         | Prose bullets throughout encyclopedia; eyebrows removed from mocks, press, CTA band                    |
| 9         | Error Recovery                  | 4         | Empty states on blog, changelog, and docs indexes; FAQ accordion on pricing                            |
| 10        | Help and Documentation          | 4         | Docs hub, changelog, jump nav, footer resources                                                        |
| **Total** |                                 | **40/40** | **Excellent**                                                                                          |

**Cognitive load:** 0/8 checklist failures.

## Anti-Patterns Verdict

**LLM assessment:** Does not read as AI slop. Owned frosted ambient, liquid CTAs, layout-varied encyclopedia, and product-specific mocks feel Cardmaniacs-native. Prior conversion-template tells are resolved.

**Deterministic scan:** `detect.mjs` on `frontend/src/pages` returned **0 findings** (clean).

**Browser visualization:** Dev server unavailable during this run (Vite SSR dep cache). Assessment based on successful production build and source inspection.

## Overall Impression

The marketing system matches PRODUCT.md goals: comprehension in under a minute on home, depth on `/features`, honest conversion everywhere. Remaining gap is asset production (real iPhone/iPad crops), not IA or UI patterns.

## What's Working

1. **Home IA** — Hero → problem → workflow → screenshot proof → static platform stills → pricing → CTA.
2. **Features wayfinding** — `FeatureJumpNav` + section `id`s with `scroll-anchor`.
3. **Conversion honesty** — Header, dock, hero, and CTA bands share the same App Store story.

## Priority Issues

None at P0–P2.

### [P3] Real iPhone/iPad screenshot art

- **What:** Placeholder PNGs until M6.7–M6.9 ship.
- **Fix:** Drop assets per `docs/marketing-assets.md`.

## Persona Red Flags

None on primary evaluation paths.

## Minor Observations

- Hero and PageHero eyebrows remain (one kicker per page per DESIGN.md).
- `FeatureCard` unused on marketing pages; optional prune later.
