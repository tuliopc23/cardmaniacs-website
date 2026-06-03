## Why

Cardmaniacs already has a strong product identity as a native reading desk for feeds, read later, bookmarks, and imported documents. The marketing site reflects that identity through a Reader-first visual system, honest launch CTAs, and editorial surfaces—not a generic SaaS template.

## What Changes

- Define a lean multi-page marketing website for Cardmaniacs covering Home, Features, Pricing, and a blog-ready editorial shell.
- Position Cardmaniacs explicitly as a premium native Apple-platform app for macOS, iPhone, and iPad rather than a generic web software product.
- Establish a Cardmaniacs-specific visual system based on calm asymmetry, rounded card-led composition, restrained liquid-glass surfaces, and Apple-style typography hierarchy.
- Specify the inspiration boundary so Apple developer marketing, Bear-like asymmetry, and premium indie app craft are adapted for quality and rhythm, not copied literally.
- Define how real Cardmaniacs screenshots, cropped windows, toolbar fragments, and icon assets are staged as editorial artifacts across the site.
- Specify page-level narrative structure for the homepage hero, proof strip, feature storytelling, reading-desk section, comparison/trust section, pricing teaser, Features page, Pricing page, and editorial surfaces.
- Define the technical and content foundations for Astro, Tailwind CSS v4, Motion.dev, Keystatic/Markdoc editorial content, and Cloudflare Workers deployment.
- Define accessibility, motion, responsive behavior, theming, and performance rules so implementation preserves quality across Apple-platform audiences.

## Capabilities

### New Capabilities

- `marketing-design-language`: Defines the visual grammar, typography hierarchy, composition rules, anti-patterns, screenshot staging, motion style, and Apple-native quality bar for the Cardmaniacs website.
- `marketing-page-architecture`: Defines the required pages, global navigation, section sequencing, CTA placement, platform messaging, and editorial layout rules for the marketing experience.
- `marketing-content-platform`: Defines the Keystatic/Markdoc blog and changelog shell plus the bounded editable marketing content that should live in CMS.
- `marketing-delivery-foundation`: Defines the implementation constraints and non-functional requirements for Astro, Tailwind CSS v4, Motion.dev, responsive behavior, accessibility, performance, and Workers deployment.

### Modified Capabilities

None.

## Impact

- Affects the marketing site in `frontend/` (routes, layouts, components, tokens, Keystatic config).
- Creates the source-of-truth artifacts that implementation follows for layout, styling, animation, page structure, and CMS integration.
- Grounds the marketing system in the existing Cardmaniacs app identity, product copy, and screenshot library from `Cardmaniacs-images/` and the app repository’s product metadata.
- Encodes the approved inspiration boundary so implementation stays Apple-native and premium-indie without becoming derivative.
- Launch implementation detail is recorded in archived change `reader-first-launch-redesign`; post-launch ops in `launch-day-operations`.
