---
target: all pages
total_score: 35
p0_count: 0
p1_count: 2
timestamp: 2026-06-08T19-05-09Z
slug: frontend-src-pages
---

# Critique: All marketing pages (`frontend/src/pages`)

**Target:** Home, Features, Pricing, Blog, Changelog, Docs, Press, dynamic editorial/legal routes  
**Register:** Brand · **Date:** 2026-06-08 (post-remediation)

## Design Health Score

| #         | Heuristic                       | Score     | Key Issue                                                                                         |
| --------- | ------------------------------- | --------- | ------------------------------------------------------------------------------------------------- |
| 1         | Visibility of System Status     | 4         | Honest App Store CTAs; `[data-reveal]` defaults visible; device tabs expose Mac/iPhone/iPad state |
| 2         | Match System / Real World       | 4         | "Reading desk" metaphor and workflow language remain strong                                       |
| 3         | User Control and Freedom        | 3         | Homepage IA is shorter; duplicate platform showcase forces redundant tab switching                |
| 4         | Consistency and Standards       | 4         | Tokens cohesive; motion policy aligned (y-only reveal, reduced-motion safe)                       |
| 5         | Error Prevention                | 4         | No fake download links; pricing disclaimer when URL unset                                         |
| 6         | Recognition Rather Than Recall  | 3         | Home defers deep tour to `/features`; triage mock still echoes features opener                    |
| 7         | Flexibility and Efficiency      | 3         | Desktop nav solid; mobile dock still lacks one-tap App Store                                      |
| 8         | Aesthetic and Minimalist Design | 3         | Calmer home, but marketing-surface eyebrows and icon-card bullets persist on `/features`          |
| 9         | Error Recovery                  | 3         | FAQ accordion on pricing; editorial indexes still thin on empty states                            |
| 10        | Help and Documentation          | 4         | Docs, changelog, footer resources, deep feature encyclopedia                                      |
| **Total** |                                 | **35/40** | **Very Good**                                                                                     |

**Cognitive load:** 3/8 checklist failures (duplicate platform bands on home, marketing-surface eyebrows, long `/features` scroll).

## Anti-Patterns Verdict

**LLM assessment:** Does not read as AI slop. Owned frosted ambient, liquid CTAs, and product-specific mocks feel Cardmaniacs-native. Prior conversion-template drift (numbered 01–05 cards, home/features duplication, opacity-gated reveals) is largely resolved. Remaining tells: icon-card `FeatureCard` grids in several encyclopedia bands and uppercase eyebrows inside marketing mocks ("Inbox preview", "Command palette").

**Deterministic scan:** `detect.mjs` on `frontend/src/pages` returned **0 findings** (clean).

**Browser visualization:** Injected `detect.js` on `http://127.0.0.1:3456/` (home), `/features`, and `/pricing`. Preflight mutation succeeded; `window.__impeccableFindings` returned `[]`. No reliable user-visible overlay issues. Accessibility trees confirm slim homepage IA (~6 bands), dual Mac/iPhone/iPad tab groups on home, and layout-varied features page.

## Overall Impression

The remediation landed. The homepage now reads as an elevator pitch with proof, not a second features tour. Motion and eyebrows follow DESIGN.md much more closely. The single biggest remaining opportunity is **deduplicating platform proof on home** and **shipping real iPhone/iPad screenshot art** so mobile evaluators trust the cross-device story.

## What's Working

1. **Distilled homepage IA** — `LaunchStory` is problem → workflow prose → one triage proof → platform → pricing teaser → CTA. Comprehension goal is achievable in under a minute.
2. **Motion hardening** — `ScrollReveal` animates `y` only; CSS defaults keep `[data-reveal]` visible without JS.
3. **Platform frames** — `MarketingPlatformShowcase` + `DevicePicker` on hero and features platform section; placeholder slots wired for drop-in assets.

## Priority Issues

### [P1] Duplicate platform showcase on homepage

- **What:** Hero and `LaunchStory` platform band each render full `MarketingPlatformShowcase` with Mac/iPhone/iPad tabs.
- **Why it matters:** Visitors switch the same control twice for the same proof; breaks minimalist positioning and adds scroll weight.
- **Fix:** Keep device picker in hero only; make the lower band a single headline + one-line proof or a static three-device still row without a second tab control.
- **Suggested command:** `/impeccable distill`

### [P1] Eyebrows inside marketing mocks

- **What:** `MarketingTriageSurface`, `MarketingCommandSurface`, `MarketingMediaSurface`, and `MarketingHighlightSurface` still render `EyebrowLabel` ("Inbox preview", "Command palette", etc.).
- **Why it matters:** Re-introduces label noise the section-level cleanup removed; trains users to ignore uppercase kickers.
- **Fix:** Replace mock eyebrows with in-app chrome labels (source line, meta row) or remove when the surface context is obvious.
- **Suggested command:** `/impeccable quieter`

### [P2] Placeholder iPhone/iPad imagery

- **What:** `marketing-images.ts` slots exist but PNGs are mac-derived stand-ins until M6.7–M6.9 ship.
- **Why it matters:** Mobile-first evaluators may notice reused Mac UI in phone frames, weakening cross-device trust.
- **Fix:** Drop real assets per `docs/marketing-assets.md` (no code change required).
- **Suggested command:** `/impeccable polish`

### [P2] Icon-card bullet grids on `/features`

- **What:** Several `FeatureEncyclopedia` layouts still end with 2–3 `FeatureCard` icon+title+description tiles.
- **Why it matters:** Adjacent to banned identical-card-grid rhythm; less severe now that layouts vary, but bullets still feel template-like.
- **Fix:** Convert remaining grids to inline prose lists or asymmetric pull-quotes on 2–3 sections only.
- **Suggested command:** `/impeccable shape`

### [P3] Workflow headline arrow chain

- **What:** Home workflow section title uses `Collect → Triage → Read → Highlight → Revisit` plus chip rail.
- **Why it matters:** Slight conversion-template echo; chips partially duplicate the headline.
- **Fix:** Pick one device: either a single prose sentence or chips without the arrow headline.
- **Suggested command:** `/impeccable adapt`

## Persona Red Flags

**Jordan (First-Timer):** Homepage is scannable now, but two identical device tab bars on `/` create "didn't I already see this?" friction before reaching pricing. Triage mock eyebrow "Inbox preview" adds jargon before the headline context lands.

**Alex (Power User):** `/features` encyclopedia with layout variants satisfies depth; command-palette mock with keyboard hints reads authentic. Red flag: TTS section reuses "Sample article" reader mock — feels copy-pasted, not capability-specific.

**Sam (Mobile-first):** iPhone/iPad tabs are discoverable in hero; placeholder phone crops may read as Mac UI resized. Mobile dock still routes to pages, not direct App Store — extra taps at decision moment.

## Minor Observations

- `CtaBanner` eyebrow + "Your reading desk is ready." is appropriately distinct from hero — keep.
- `PageHero` eyebrows on Features/Pricing are acceptable (one kicker per page).
- Pricing trust row correctly became prose `Surface`; FAQ icons are functional, not decorative grid.
- Press and docs pages retain section eyebrows — fine for utility surfaces, not marketing bands.

## Questions to Consider

- What if the homepage had **one** platform moment and the lower band focused purely on pricing value?
- Does every marketing mock need an uppercase kicker, or can app chrome carry context?
- What would `/features` feel like if **half** the sections dropped icon-card bullets entirely?
