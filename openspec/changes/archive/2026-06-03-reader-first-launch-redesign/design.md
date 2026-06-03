## Context

Cardmaniacs is a premium native reading desk (macOS, iOS, iPadOS). The website must sell the **workflow**—collect, triage, read, highlight, revisit—not a feature pile. Visual language comes from the app’s Reader, card triage, highlights library, command palette, and native media surfaces.

**References:**

- App UI (Reader, cards, highlights, chrome) — source of truth for surfaces.
- This repo — [`frontend/`](../../../frontend/) Astro 6, Tailwind v4, Motion.dev, Keystatic/Markdoc, Cloudflare.
- Personal site — `~/Developer/tulio-personal-website` for prose rhythm and MDX editorial patterns; **adapt**, do not copy.

**Known launch blockers (code):**

- `Hero.astro` iPhone/iPad “Coming soon”
- `AppStoreButton.astro` and peers use `href="#download"`
- Features page: 3 sections vs full encyclopedia
- Blog/changelog: generic `Prose`, not Reader surfaces

## Goals / Non-Goals

**Goals:**

- Reader-surface-led marketing (screenshots staged as product objects, not hardware spam).
- Homepage 12-section product loop; Features as launch reference doc.
- Editorial pages feel like in-app reading surfaces.
- Asset system ready for final screenshots (light/dark, Mac/iPhone/iPad).
- Placeholder-safe CTAs and pricing until App Store truth is final.

**Non-Goals:**

- Sanity CMS migration (stay on Keystatic/Markdoc unless separately decided).
- Heavy client islands for static marketing sections.
- Literal Apple.com or Readwise clones.
- Implementing app features on the web.

## Decisions

### 1. Supersede `craft-cardmaniacs-marketing-site`

Old change assumed starter scaffold + Sanity. This change reflects the implemented repo and Reader-first roadmap.

### 2. Six marketing surface components

| Component                    | Role                                                 |
| ---------------------------- | ---------------------------------------------------- |
| `MarketingReaderSurface`     | Article/reader object — hero, blog, changelog detail |
| `MarketingHighlightSurface`  | Highlights killer section                            |
| `MarketingTriageSurface`     | Feed/card triage                                     |
| `MarketingCommandSurface`    | Palette, Quick Add, Vim hints                        |
| `MarketingMediaSurface`      | YouTube/podcast native player story                  |
| `MarketingDeviceComposition` | Disciplined screenshot framing                       |

### 3. Homepage narrative (12 beats)

Hero → Problem → Core loop → Feeds → Read Later/parsing → Highlights → Native control → Organization → Extensions → Platform craft → Pricing teaser → Final CTA.

### 4. CTA and pricing truth

Document strategy in `reader-first-launch-direction.md`. Until App Store URL is final: intentional waitlist/TestFlight copy—never fake “Download on the App Store” linking to `#download`.

### 5. Personal-site adaptation boundary

Import: measure, heading rhythm, callout taxonomy, reading progress patterns where useful. Keep: Cardmaniacs tokens (`#539AC6`), app chrome, screenshot art direction.

### 6. Tracking triple

OpenSpec `tasks.md` IDs (`Mx.y.z`) = Beads titles = Linear titles. Manifest: `openspec/tracking/launch-roadmap.json`.

## Risks / Trade-offs

- **Screenshot lag:** Structure slots + Mac-first hero; hide iPhone/iPad tabs until assets exist.
- **Overclaim:** M0.5 guardrails list required before M7 copy.
- **Scope:** ~147 tasks — milestone order M0→M1→M2→(M3|M4|M6)→M5→M7→M8.

## Migration Plan

1. M0 direction note
2. M1 blockers
3. M2 components
4. M3–M6 pages/assets (partial parallel)
5. M7 copy
6. M8 QA + ship report
