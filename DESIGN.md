---
name: Cardmaniacs Marketing
description: Apple-native editorial marketing system for the Cardmaniacs reading desk app
colors:
  cm-blue: "#539AC6"
  cm-blue-hover: "#4B90BC"
  cm-blue-ink: "#1A5D7A"
  bg-liquid-base: "#F8FAFC"
  ink-primary: "#1D1D1F"
  ink-secondary: "#6E6E73"
  ink-tertiary: "#86868B"
  surface-elevated: "#FAFAFA"
  surface-glass: "#A3A3A8"
  border-subtle: "#0D0D0D"
typography:
  display:
    fontFamily: "Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.65rem, 6.2vw, 5rem)"
    fontWeight: 700
    lineHeight: 1.03
    letterSpacing: "-0.042em"
  headline:
    fontFamily: "Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.9rem, 3.6vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.034em"
  title:
    fontFamily: "Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, SF Pro Text, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    fontSize: "clamp(1.05rem, 1.2vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "-0.015em"
  label:
    fontFamily: "Satoshi, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  sm: "10px"
  md: "14px"
  lg: "22px"
  xl: "32px"
  pill: "9999px"
  card: "32px"
  hero: "40px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.cm-blue}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "10px 28px"
  button-primary-hover:
    backgroundColor: "{colors.cm-blue-hover}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "10px 28px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-secondary}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  surface-elevated:
    backgroundColor: "{colors.surface-elevated}"
    rounded: "{rounded.card}"
    padding: "24px"
  chip-pill:
    backgroundColor: "{colors.surface-glass}"
    textColor: "{colors.ink-primary}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: Cardmaniacs Marketing

## 1. Overview

**Creative North Star: "The Native Reading Desk"**

Cardmaniacs marketing translates the app's calm reading desk into web editorial surfaces: frosted ambient atmosphere, oversized rounded cards, pill controls, and real product imagery staged as reading objects. The system is premium and native without mimicking Apple.com or third-party reference apps. Design continuity with the iOS/macOS app is mandatory; the website extends the app, it does not invent a parallel brand.

Density stays low. Whitespace, asymmetry, and layered surfaces carry hierarchy. Motion is selective (Motion.dev for hero reveals, CSS for micro-interactions) and always degrades under `prefers-reduced-motion`. Site-wide ambience uses `SiteAmbient` frosted blur (haze, blooms, backdrop-filter), not paper grain, gradient mesh color blobs, or warm cream body backgrounds.

**Key Characteristics:**

- Cardmaniacs blue (`#539AC6`) as the sole accent; restrained use on CTAs, chips, and ambient washes
- Satoshi display + system body stack; tight negative tracking on headlines
- Multi-layer shadows with subtle blue glow; glass surfaces with purposeful blur
- Large radii (32px cards, pill controls, 40px hero frames)
- Real app screenshots and cropped reading surfaces as primary visual artifacts
- Dual light/dark theme via `data-theme`, neutral charcoal canvas in dark mode

## 2. Colors

A cool, near-neutral canvas with Cardmaniacs blue as the editorial accent. Light mode uses a frosted off-white base (`oklch(0.988 0.006 250)`), not warm cream or sand. Dark mode keeps a neutral charcoal canvas; blue tints appear only in accent UI and low-opacity ambient washes.

### Primary

- **Cardmaniacs Blue** (`#539AC6` / `oklch(0.68 0.09 230)`): Primary CTA fills, accent eyebrows, focus rings, ambient bloom tint. The app's brand anchor; do not substitute.
- **Blue Ink** (`#1A5D7A`): Text on light blue-tinted chips and secondary accent labels.
- **Blue Hover** (`#4B90BC` light / `#65B0DC` dark): Interactive accent state.

### Neutral

- **Liquid Base** (`oklch(0.988 0.006 250)` light / `oklch(0.12 0.008 260)` dark): Page canvas behind `SiteAmbient`.
- **Ink Primary** (`#1D1D1F` / `#F5F5F7`): Headlines, primary body, navigation labels.
- **Ink Secondary** (`#6E6E73` / `#A1A1A6`): Ledes, supporting copy, ghost button default.
- **Ink Tertiary** (`#86868B` / `#6E6E73`): Meta, captions, editorial eyebrows at rest.
- **Surface Elevated** (`rgba(255,255,255,0.98)` light / `rgba(255,255,255,0.085)` dark): Cards, panels, elevated marketing surfaces.
- **Surface Glass** (`rgba(255,255,255,0.64)` light / `rgba(255,255,255,0.055)` dark): Nav chrome, chip rails, floating headers.
- **Border Subtle** (`rgba(0,0,0,0.05)` light / `rgba(255,255,255,0.06)` dark): Card and panel edges.

### Named Rules

**The App Continuity Rule.** Marketing colors, radii, shadow vocabulary, and surface treatments must trace directly to the Cardmaniacs app chrome. When the app is unavailable as reference, preserve existing site tokens in `global.css`; do not introduce new accent hues or layout families.

**The Frosted Ambient Rule.** Background depth comes from `SiteAmbient` (haze, bloom pools, frost veil, glint). Prohibited: full-page gradient meshes, paper-grain overlays, or warm neutral body backgrounds in the cream/sand band.

**The Accent Restraint Rule.** Cardmaniacs blue carries CTAs, focus, chips, and low-opacity washes. It must not flood large flat surfaces; rarity preserves premium tone.

## 3. Typography

**Display Font:** Satoshi Variable (with system sans fallback)
**Body Font:** SF Pro Text / system sans stack
**Label/Mono Font:** Satoshi for labels; SF Mono for code snippets in docs

**Character:** Confident editorial display with calm, readable body prose. Tight negative tracking on large headlines; generous line height on ledes. Feels native to Apple platforms without shouting.

### Hierarchy

- **Display** (700, `clamp(2.65rem, 6.2vw, 5rem)`, 1.03): Hero headlines (`.display-hero`). `text-wrap: balance`. Max effective size ~5rem.
- **Headline** (700, `clamp(1.9rem, 3.6vw, 3rem)`, 1.08): Section titles (`.type-section-title`).
- **Title** (600, `clamp(1.125rem, 1.5vw, 1.375rem)`, 1.2): Subheads, card titles (`.type-card-title` at 15px for dense UI).
- **Body** (400, `clamp(1.05rem, 1.2vw, 1.2rem)` lede / 1rem body, 1.55–1.62): Prose and descriptions. Cap at 62ch (`.measure`).
- **Label** (650, 11px, 0.12em tracking, uppercase): Sparse editorial eyebrows (`.editorial-eyebrow`). Not on every section.

### Named Rules

**The One Voice Rule.** Satoshi owns display, labels, and marketing emphasis; system sans owns long prose. Do not add a third competing family.

**The Eyebrow Sparingly Rule.** Uppercase tracked eyebrows are deliberate brand punctuation, not default section scaffolding. One named kicker per major page band at most.

## 4. Elevation

Hybrid system: tonal layering plus multi-layer shadows with inset highlights and Cardmaniacs blue glow. Depth signals reading objects on a desk, not dashboard panels. Glass blur (`--blur-glass: 18px`, `--sat-glass: 1.35`) is functional on nav and floating chrome, never decorative wallpaper.

### Shadow Vocabulary

- **Card** (`--shadow-card`): Default elevated surfaces; inset white highlight, soft depth, 1px hairline, blue glow at 7% opacity.
- **Card Hover** (`--shadow-card-hover`): Interactive cards; stronger lift and accent ring.
- **Float** (`--shadow-float`): Hero product frames, device compositions.
- **Pill** (`--shadow-pill`): Chip rails, segmented controls.
- **Button Liquid** (`--shadow-button-liquid`): Primary CTA stack with accent-colored diffusion.
- **Nav / Glass** (`--shadow-nav`, `--shadow-glass`): Floating header and glass panels.

### Named Rules

**The Sculpted Object Rule.** Shadows combine inset specular highlights, ambient depth, and accent glow. Flat drop shadows alone read as generic SaaS; the stack is part of the brand.

**The Mobile Lightening Rule.** Below 1024px, shadow stacks and blur radii reduce for performance. Do not ship desktop-weight glass on mobile without the mobile token overrides.

## 5. Components

### Buttons

- **Shape:** Full pill (`--radius-pill` / 9999px)
- **Primary:** `.cm-btn-liquid` gradient fill on `--accent`, white text, liquid glass border and shadow stack. Hover: translateY(-1px), accent hover gradient, stronger glow. Active: scale 0.985.
- **Secondary:** `.cm-btn-liquid--soft` lighter accent gradient for secondary CTAs.
- **Ghost:** Ink secondary text, hover to ink primary with `--accent-subtle` wash.
- **Quiet:** Transparent with `--border-subtle` border; hover to `--surface-overlay`.
- **Focus:** 2px `--ring-focus` ring with offset on `--surface-base`.

### Chips

- **Style:** Pill rail with glass background, `--border-subtle`, `--shadow-pill`, backdrop blur. Individual chips use `--cm-blue-subtle` tints for accent variants.
- **State:** Hero chip rail wraps feature names (Feeds, Read Later, etc.); filter chips in docs use tertiary ink at rest, accent when selected.

### Cards / Containers

- **Component:** `Surface.astro` with variants `paper`, `elevated`, `glass`, `inset`.
- **Corner Style:** `--radius-card` (32px) default; `--radius-hero` (40px) for product frames; `--radius-panel` for wide bands.
- **Background:** Elevated uses `--surface-elevated` + `--shadow-card`; glass uses `--surface-glass` + blur + saturate.
- **Internal sheen:** Radial `--accent-atmo-sheen` overlay at 70% opacity inside surfaces.
- **Interactive:** Optional hover lift (-0.5px) and `--shadow-card-hover`; disabled under reduced motion.

### Inputs / Fields

- **Style:** Tailwind forms plugin defaults tinted to `--border-subtle` and `--surface-inset`.
- **Focus:** `--ring-focus` accent ring; no neon glow.
- **Error / Disabled:** Muted ink tertiary; no red accent stripes.

### Navigation

- **Component:** `FloatingHeader` + `SiteNav` + `MobileNavDock`.
- **Style:** Glass pill bar, `--shadow-nav`, backdrop blur `--blur-nav` (22px). Logo mark uses `--shadow-logo-mark` stack.
- **Typography:** Display semibold 14–15px links; ink secondary default, ink primary on hover/active.
- **Mobile:** Bottom dock with icon tiles; drawer links preserve touch targets ≥44px.

### Site Ambient (signature)

- **Role:** Fixed full-viewport frosted backdrop behind all pages.
- **Layers:** Base fill, haze wash, two bloom pools, frost veil (`backdrop-filter`), glint inset, optical film grain at 2.2% opacity.
- **Motion:** Slow breathe animation on haze (88s); respects reduced motion via opacity-only fallback.

### Product Frame (signature)

- **Role:** Stages real app screenshots as editorial reading objects.
- **Treatment:** `--shadow-device`, large hero radius, optional `MarketingDeviceComposition` layering.
- **Rule:** Card-led staging over full hardware mockups.

## 6. Do's and Don'ts

### Do:

- **Do** preserve Cardmaniacs blue `#539AC6` and existing `global.css` tokens when extending the site.
- **Do** use `SiteAmbient` for site-wide atmosphere and real app imagery for proof.
- **Do** apply `text-wrap: balance` on h1–h3 and `text-wrap: pretty` on long prose.
- **Do** honor `prefers-reduced-motion` and `prefers-reduced-transparency` (disable backdrop-filter on liquid buttons when transparency is reduced).
- **Do** keep App Store CTAs honest when `PUBLIC_APP_STORE_URL` is unset.
- **Do** use Motion.dev for high-value reveals; keep CSS transitions at 200–300ms ease for state changes.

### Don't:

- **Don't** ship generic SaaS landing patterns: hero metrics, identical icon-card grids, cream or sand body backgrounds, buzzword copy.
- **Don't** clone Apple.com, Bear, Craft, or reference apps verbatim.
- **Don't** add dashboard density, playful startup illustration stacks, or dark terminal aesthetics to marketing pages.
- **Don't** use gradient text (`background-clip: text`), side-stripe borders, or decorative glassmorphism without function.
- **Don't** put an uppercase tracked eyebrow above every section or numbered section markers (01/02/03) as default scaffolding.
- **Don't** invent new accent colors or diverge from the app's visual language when adding pages or components.
- **Don't** gate content visibility on scroll-reveal animations; defaults must be visible without JS.
