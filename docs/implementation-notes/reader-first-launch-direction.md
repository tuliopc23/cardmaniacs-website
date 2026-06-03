# Reader-first launch — implementation direction

**OpenSpec:** `reader-first-launch-redesign`  
**Tracking:** `openspec/tracking/launch-roadmap.json` · Beads · [Linear project](https://linear.app/tulio-cunha-dev/project/cardmaniacs-marketing-website-fcfb1d7677e5/overview)

## Design sources

### Cardmaniacs app (primary)

Translate native surfaces into marketing components:

- **Reader:** editorial title, metadata row, body rhythm, highlight marks, rounded elevated article shell, floating toolbar pills, calm dark/light.
- **Triage:** card-based feed, source pills, unread/saved, quick actions.
- **Highlights:** excerpt cards, source/tags, “stored for later” library feel.
- **Command:** Quick Add, palette, search/actions, keyboard/Vim hints.
- **Media:** in-app YouTube/podcast — calm player chrome, not browser chrome.

### This website repo (current baseline)

| Area      | Path                                                                           | Notes                                                                  |
| --------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| Routes    | `frontend/src/pages/`                                                          | home, features, pricing, blog, changelog, releases, docs, press, legal |
| Tokens    | `frontend/src/styles/global.css`                                               | `--cm-blue` (#539AC6), glass surfaces, editorial type                  |
| Hero      | `frontend/src/components/site/Hero.astro`                                      | Mac ProductFrame OK; **iPhone/iPad “Coming soon”**                     |
| CTAs      | `AppStoreButton.astro`, `PricingSection.astro`, `FloatingHeader.astro`, footer | **`href="#download"`**                                                 |
| Features  | `features.astro`                                                               | 3 sections; needs 8-section encyclopedia                               |
| Editorial | `blog/`, `changelog/`, `Prose.astro`                                           | Generic prose, not Reader surfaces                                     |
| Content   | `content.config.ts`                                                            | Keystatic/Markdoc collections                                          |

### Personal site (adapt, don’t copy)

Repo: `~/Developer/tulio-personal-website` (`tuliopc23/tulio-personal-website`)

| Borrow                                                           | Keep Cardmaniacs-specific                            |
| ---------------------------------------------------------------- | ---------------------------------------------------- |
| Prose measure, heading rhythm (`styles/system/content.css`)      | Brand blue, app screenshot art direction             |
| MDX callouts: Callout, PullQuote, KeyTakeaway, Figure, CodeBlock | Native chrome, card-led staging                      |
| Article layout pacing (`pages/blog/[slug].astro`)                | Product marketing narrative, not personal essay tone |

## Adapt vs copy rules

1. **Surfaces over devices** — cropped product windows and Reader objects beat full hardware mockups.
2. **Workflow over features** — Collect → Triage → Read → Highlight → Revisit is the story spine.
3. **No generic SaaS** — avoid equal-weight grids, fake glass, dashboard density, productivity clichés.
4. **Honest platform** — Mac-first until iPhone/iPad screenshots exist; no “Coming soon” on hero.

## Token / surface mapping (app → web)

| App signal           | Web token / component                                     |
| -------------------- | --------------------------------------------------------- |
| Rounded article card | `--radius-hero`, `Surface`, `MarketingReaderSurface`      |
| Toolbar pills        | `--radius-pill`, `Pill`, hero chip rail                   |
| Brand accent         | `--cm-blue`, `--cm-blue-subtle`, `--cm-blue-ink`          |
| Glass chrome         | `--surface-glass`, `backdrop-blur`, restrained saturation |
| Highlight color      | New reader highlight tokens in `global.css`               |
| Feed cards           | `MarketingTriageSurface`, `ArticleCard` evolution         |

## Screenshot staging

- Directory: `frontend/public/images/marketing/` (see `docs/marketing-assets.md` when added in M6.13).
- Hero: Mac light/dark first; defer iPhone/iPad tabs until `iphone-*` / `ipad-*` slots filled.
- Crops: reader-focused, triage, highlights, command palette, media — not full-screen dumps.
- Alt text: describe workflow shown, not “screenshot of app”.

## CTA / pricing truth table

| Surface                  | Current                       | Launch target                                                          |
| ------------------------ | ----------------------------- | ---------------------------------------------------------------------- |
| AppStoreButton           | `#download` + App Store label | Real App Store URL **or** labeled waitlist/TestFlight (not fake store) |
| PricingSection           | `#download` on plans          | Same strategy; prices only if RevenueCat/App Store final               |
| Footer / header Download | `#download`                   | Same                                                                   |
| Pricing copy             | Hardcoded $ in PRD/memory     | **Placeholder-safe** until confirmed                                   |

**Decision (implemented M1):** `PUBLIC_APP_STORE_URL` in env. When set, CTAs use the real App Store link. When empty, App Store badge shows “Coming to the App Store” (non-link); header/footer use Explore features / honest labels. No `#download` anchors.

## Copy guardrails (no overclaim)

Mark as **supported**, **planned**, or **omit** before writing M7 copy:

| Topic                             | Status for website copy                        |
| --------------------------------- | ---------------------------------------------- |
| RSS / Atom / JSON Feed            | Supported (market confidently)                 |
| YouTube / podcasts in-app         | Supported                                      |
| Wikipedia / GitHub README parsers | Supported differentiators                      |
| PDF / EPUB / Markdown             | Supported                                      |
| Reddit / Mastodon / Bluesky / X   | Verify per build; say “planned” if not shipped |
| Share extension                   | Verify; omit if absent                         |
| Handoff / Spotlight / Shortcuts   | Only if implemented                            |
| iCloud sync / private/local       | Accurate to shipping build                     |
| Vim / command palette             | Supported power-user story                     |

## Homepage structure (target)

12 sections per OpenSpec `marketing-homepage-product-loop`: Hero → Problem → Core loop → Feeds → Read Later → Highlights → Native control → Organization → Extensions → Platform → Pricing teaser → Final CTA.

## Component deliverables (M2)

- `MarketingReaderSurface.astro`
- `MarketingHighlightSurface.astro`
- `MarketingTriageSurface.astro`
- `MarketingCommandSurface.astro`
- `MarketingMediaSurface.astro`
- `MarketingDeviceComposition.astro`

## Sign-off

- [x] Audits captured in this document (M0.0.1–M0.0.3)
- [x] Direction and guardrails written (M0.0.4–M0.0.5)
- [x] Explicit product owner review (M0.0.6) — engineering complete; marketing claims should be re-reviewed before public launch

**Supersedes:** OpenSpec change `craft-cardmaniacs-marketing-site` (Sanity/starter assumptions).
