---
timestamp: 2026-06-08T18-36-35Z
slug: frontend-src-pages
---

# Critique: All marketing pages (`frontend/src/pages`)

**Target:** Home, Features, Pricing, Blog, Changelog, Docs, Press, dynamic editorial/legal routes  
**Register:** Brand · **Date:** 2026-06-08

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                                   |
| --------- | ------------------------------- | --------- | --------------------------------------------------------------------------- |
| 1         | Visibility of System Status     | 3         | Honest App Store CTAs; `ScrollReveal` hides `[data-reveal]` until inView    |
| 2         | Match System / Real World       | 4         | "Reading desk" metaphor lands; workflow language fits product               |
| 3         | User Control and Freedom        | 3         | Mobile drawer has Escape + focus trap; homepage scroll is very long         |
| 4         | Consistency and Standards       | 3         | Tokens cohesive; motion policy inconsistent (home/features vs pricing)      |
| 5         | Error Prevention                | 4         | No fake download links; illustrative pricing disclaimer when URL unset      |
| 6         | Recognition Rather Than Recall  | 2         | Home repeats `/features` encyclopedia; unclear where to stop reading        |
| 7         | Flexibility and Efficiency      | 3         | Desktop nav solid; mobile dock lacks one-tap download                       |
| 8         | Aesthetic and Minimalist Design | 2         | Premium craft, but homepage density contradicts "calm" positioning          |
| 9         | Error Recovery                  | 3         | FAQ accordion helps on pricing; thin empty-state story on editorial indexes |
| 10        | Help and Documentation          | 4         | Docs, changelog, footer resources, deep feature encyclopedia                |
| **Total** |                                 | **31/40** | **Good**                                                                    |

**Cognitive load:** 6/8 checklist failures (eyebrow inflation, home/features redundancy, scroll-gated content, identical encyclopedia template).

## Anti-Patterns Verdict

**LLM assessment:** Not generic SaaS slop. Owned tokens, frosted ambient, and marketing surfaces feel Cardmaniacs-native. Drifting toward conversion-template rhythm via eyebrow inflation, numbered workflow cards (01–05), and home/features duplication. Passes cream-bg, gradient-text, hero-metrics bans.

**Deterministic scan:** `detect.mjs` on `frontend/src/pages` returned **0 findings** (clean).

**Browser visualization:** Injected `detect.js` on live homepage at `http://127.0.0.1:3456/`; script loaded, no `impeccable` console findings. No reliable user-visible overlay issues detected. Accessibility tree confirms numbered workflow list items (01–05) and long homepage IA.

## Overall Impression

The site looks crafted, not templated. The hero and ambient system sell premium native software. The biggest opportunity is information architecture: the homepage tries to be both elevator pitch and full product tour, which undermines the 60-second comprehension goal for a broad Apple audience.

## What's Working

1. **Owned visual language** — `SiteAmbient`, sculpted shadows, liquid CTAs, and `ProductFrame` staging deliver "native reading desk" without SaaS clichés.
2. **Product-specific proof surfaces** — `MarketingTriageSurface`, `MarketingCommandSurface`, and related mocks show app chrome instead of stock illustration.
3. **Honest conversion** — `site-cta.ts` / `AppStoreButton` avoid fake downloads; skip link, focus rings, and reduced-motion handling show a11y intent.

## Priority Issues

### [P0] Scroll reveal gates content visibility

- **What:** `ScrollReveal.astro` sets `opacity: 0` on `[data-reveal]` before Motion `inView` fires.
- **Why it matters:** Violates DESIGN.md and PRODUCT.md motion rules; content can stay hidden if JS fails or inView never triggers.
- **Fix:** Default visible in CSS; animate from an already-visible baseline.
- **Suggested command:** `/impeccable harden`

### [P0] Homepage duplicates the features encyclopedia

- **What:** `index.astro` renders full `LaunchStory.astro` (~12 bands) that mirrors `/features` (`FeatureEncyclopedia.astro`).
- **Why it matters:** Broad visitors cannot grasp the product in under a minute; comprehension and conversion both suffer.
- **Fix:** Home = hero + 2–3 proof bands + pricing teaser + CTA; deep tour lives on `/features` only.
- **Suggested command:** `/impeccable distill`

### [P1] Eyebrow inflation across marketing bands

- **What:** `EyebrowLabel` on nearly every `LaunchStory` section, each `FeatureEncyclopedia` block, footer columns, and marketing surfaces.
- **Why it matters:** Trains users to ignore labels; violates DESIGN.md "Eyebrow Sparingly Rule."
- **Fix:** Keep hero kicker; replace section eyebrows with headline-led hierarchy; footer uses plain `h3`.
- **Suggested command:** `/impeccable quieter`

### [P1] Numbered workflow scaffolding (01–05)

- **What:** `LaunchStory.astro` workflow grid uses `padStart(2, "0")` markers on five cards.
- **Why it matters:** Banned numbered-section trope; reads corporate for beginners.
- **Fix:** Single prose workflow line or timeline without numbered cards.
- **Suggested command:** `/impeccable adapt`

### [P2] Identical FeatureEncyclopedia template (8×)

- **What:** `FeatureEncyclopedia.astro` repeats `lg:col-span-4` bullets + `lg:col-span-8` surface on `/features`.
- **Why it matters:** Identical card-grid rhythm is an absolute-ban adjacent pattern.
- **Fix:** Vary composition: full-bleed screenshot band, asymmetric story, inline reader excerpt.
- **Suggested command:** `/impeccable shape`

### [P2] Platform proof gap on home

- **What:** Hero caption says "iPhone & iPad previews coming"; macOS imagery dominates `marketing-images.ts`.
- **Why it matters:** Mobile-first evaluators lose trust in "every Apple device" claim.
- **Fix:** Ship iPhone/iPad frames or soften platform copy until assets exist.
- **Suggested command:** `/impeccable craft`

## Page-by-page notes

| Page         | Verdict              | Main note                                                      |
| ------------ | -------------------- | -------------------------------------------------------------- |
| `/`          | Needs IA cut         | Strong hero; `LaunchStory` overload                            |
| `/features`  | Right home for depth | Template repetition acceptable if home is shortened            |
| `/pricing`   | Solid                | FAQ good; trust row is mini icon grid (P3)                     |
| `/blog`      | Clean editorial      | 3-col `PostCard` grid is fine for index                        |
| `/changelog` | Clean                | Release journal pattern works                                  |
| `/docs`      | Functional           | Section + card grid; lower polish priority                     |
| `/press`     | Clean                | Asset-focused; minor asset path drift vs `marketing-images.ts` |

## Persona Red Flags

**Jordan (first-timer):** Hero assumes RSS/read-later literacy; 12+ homepage bands before differentiation; Vim/palette mid-page before basics shown.

**Casey (mobile):** Bottom dock + long scroll; no one-tap download in dock; macOS-only hero proof with "previews coming" caption.

**Sam (a11y):** ScrollReveal opacity gate; hero chip rail decorative list is `aria-hidden` while sr-only duplicate exists (OK but redundant); glass density high with limited `prefers-reduced-transparency` coverage beyond buttons.

**Curious broad Apple reader:** Jargon in FAQ (OPML, JSON Feed); pricing on homepage before App Store live may confuse; home vs features redundancy.

## Minor Observations

- `pricing.astro` omits `ScrollReveal` while `features.astro` includes it.
- `CtaBanner` repeats "stop tab-hoarding" from hero lede.
- `press/index.astro` uses ad-hoc image paths, not `marketing-images.ts`.
- Footer `EyebrowLabel` on Product/Resources/Legal columns adds noise.
- `FloatingHeader` uses logo-only home link (acceptable).

## Questions to Consider

1. If comprehension in 60 seconds is the goal, what does scrolling past homepage band 6 accomplish that `/features` does not?
2. Are marketing mock surfaces proof, or a stand-in until real screenshots ship everywhere?
3. Should pricing on the homepage wait until the App Store listing is live?
4. What happens to scroll-to-CTA if half the eyebrows disappear?
