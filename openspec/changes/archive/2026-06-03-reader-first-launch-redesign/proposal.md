## Why

The Cardmaniacs marketing site has a working Astro/Tailwind/Cloudflare foundation, but it still reads as a polished generic landing page—not the public product surface for a Reader-first native Apple app. Primary surfaces expose launch blockers (`Coming soon` device panels, `#download` App Store pretense, shallow Features coverage, generic blog/changelog prose).

This change supersedes [`craft-cardmaniacs-marketing-site`](../craft-cardmaniacs-marketing-site/) (which assumed an Astro starter and Sanity CMS). Implementation follows the live stack: **Keystatic/Markdoc** content collections, existing screenshot library, and a **Reader-surface-led** visual system adapted from the Cardmaniacs app and the personal-site Reader reference.

## What Changes

- **M0–M1:** Source alignment and launch blockers (CTAs, hero placeholders, nav/footer/pricing truth).
- **M2:** Six marketing surface components (`MarketingReaderSurface`, `MarketingHighlightSurface`, `MarketingTriageSurface`, `MarketingCommandSurface`, `MarketingMediaSurface`, `MarketingDeviceComposition`).
- **M3:** Homepage rebuilt around Collect → Triage → Read → Highlight → Revisit (12 sections).
- **M4:** Features page as full product encyclopedia (8 major sections, each with visual + screenshot slot).
- **M5:** Blog, changelog, releases, pricing inherit Reader surfaces.
- **M6:** Screenshot/asset naming, slots, loading, and press/OG conventions.
- **M7:** Product-specific copy hardening (no SaaS clichés, no overclaim).
- **M8:** Launch acceptance criteria and ship report.

Tracking is mirrored in **OpenSpec tasks**, **Beads** (`openspec/tracking/launch-roadmap.json`), and **Linear** project Cardmaniacs Marketing Website.

## Capabilities

### New Capabilities

- `launch-source-alignment`: Audits and implementation direction before build.
- `marketing-reader-system`: Reader, highlight, triage, command, media, and device composition components.
- `marketing-launch-hardening`: CTA, hero, nav, footer, pricing truth.
- `marketing-homepage-product-loop`: 12-section homepage narrative.
- `marketing-features-encyclopedia`: Full Features page map.
- `marketing-editorial-surfaces`: Blog, changelog, releases, pricing Reader treatment.
- `marketing-asset-system`: Screenshot slots and conventions.
- `marketing-copy-contract`: Copy rules and guardrails.
- `marketing-qa-acceptance`: Launch QA checklist.

### Modified Capabilities

None (replaces prior marketing-site change scope).

### Superseded

- `craft-cardmaniacs-marketing-site` — reference only; do not implement against Sanity/starter assumptions.

## Impact

- `frontend/src/components/marketing/*` (new)
- `frontend/src/pages/index.astro`, `features.astro`, blog/changelog/releases/pricing routes
- `frontend/src/styles/global.css` (Reader tokens)
- `docs/implementation-notes/reader-first-launch-direction.md`, `docs/marketing-assets.md`
- `frontend/public/images/marketing/` (asset slots)
- Tracking: `openspec/tracking/launch-roadmap.json`, `.beads/`, Linear project
