## Context

The marketing site in `frontend/` implements the Cardmaniacs app’s visual language, while the app already presents a distinct product identity: a native reading desk for feeds, read-later capture, bookmarks, and imported documents. The visible app references show a consistent visual language built around large rounded cards, soft glass-like chrome, thin floating toolbars, quiet sidebars, editorial article titles, and layered content surfaces rather than dashboard density.

This change defines the website before implementation so the build can translate that identity into a lean marketing system for Home, Features, Pricing, and editorial content surfaces. The site must feel Apple-native and premium-indie without becoming a direct clone of Apple.com, and it must preserve the product’s calm, reading-focused character described in the app metadata and welcome content.

The reference boundary is deliberate: adapt the editorial asymmetry and object-like staging seen in premium Apple-platform apps such as Bear, Things, and Craft, plus the restraint of Apple developer marketing, but keep Cardmaniacs’ own palette, iconography, screenshot language, and product framing. The strongest product-specific cues from the visible app imagery are the translucent sidebars, pill controls, floating bottom tools, soft contrast, and wide article cards that feel like reading objects on a desk.

Technical constraints are implemented: Astro with Vite, Tailwind CSS v4, Motion.dev for animation, Keystatic/Markdoc for blog/changelog and selective marketing edits, and Cloudflare Workers deployment (Workers Builds). The site also needs a durable token and component system because the current codebase has no established design primitives yet.

## Goals / Non-Goals

**Goals:**

- Define a cohesive marketing system that translates the Cardmaniacs app’s visual language into the web.
- Specify the information architecture and section rhythm for Home, Features, Pricing, and a blog-ready shell.
- Make the site sell Cardmaniacs as a premium native Apple-platform product for macOS, iPhone, and iPad rather than a generic web app.
- Limit CMS responsibility to editorial content and selected marketing surfaces instead of making layout composition fully CMS-driven.
- Encode accessibility, motion, performance, and responsive requirements early so quality is part of the contract.
- Create implementation-ready specs that future work can follow without re-deciding the site’s identity.

**Non-Goals:**

- Implementing the website in this change.
- Finalizing commercial pricing copy or App Store submission details.
- Creating exhaustive Keystatic schema field definitions for every content type.
- Building a docs portal, customer support center, or application dashboard.
- Reproducing Apple marketing pages literally or copying Bear/Craft aesthetics verbatim.
- Inventing pricing structure, social proof, or product claims that the app does not support.

## Decisions

### 1. Split the change into four capabilities instead of one monolithic marketing spec

- **Decision:** Model the work as `marketing-design-language`, `marketing-page-architecture`, `marketing-content-platform`, and `marketing-delivery-foundation`.
- **Rationale:** The site has four distinct concerns: visual identity, page behavior, editorial content ownership, and implementation constraints. Separating them keeps requirements readable and reduces future spec churn when only one area evolves.
- **Alternatives considered:**
  - **Single marketing-site capability:** Rejected because design, content, page behavior, and delivery rules would be too entangled.
  - **One spec per page only:** Rejected because design system and delivery constraints are cross-cutting and should not be duplicated.

### 2. Use an “Apple-native editorial desk” design direction rather than a SaaS landing page or a literal Apple clone

- **Decision:** The website will adapt the app’s layered cards, soft glass, floating controls, and calm asymmetry into editorial compositions that feel native to Cardmaniacs.
- **Rationale:** The app imagery already communicates the strongest brand signal. Leaning into that signal creates consistency between product and marketing while avoiding startup-template aesthetics.
- **Alternatives considered:**
  - **Generic conversion-first SaaS design:** Rejected because it conflicts with the product’s premium Apple-platform positioning.
  - **Direct Apple.com mimicry:** Rejected because it would weaken Cardmaniacs’ own identity and create awkward expectations.

### 2a. Keep the inspiration boundary explicit

- **Decision:** External references such as Bear, Things, Craft, and Apple developer marketing guide composition and quality level, but the site must keep Cardmaniacs’ own colors, iconography, copy, and screenshot art direction.
- **Rationale:** The requested direction is “adapt, not mimic.” Treating inspiration as a quality bar rather than a template preserves originality and reduces the risk of derivative output.
- **Alternatives considered:**
  - **Close visual quotation of reference sites:** Rejected because it weakens the brand and can conflict with the real product UI.
  - **Ignoring the references entirely:** Rejected because they establish the target level of craft, pacing, and restraint.

### 3. Keep the site multi-page but intentionally lean

- **Decision:** The primary architecture is Home, Features, Pricing, and blog/changelog editorial surfaces, with a thin global navigation and restrained CTA system.
- **Rationale:** This gives enough space to explain the product’s three-in-one model, premium Apple-platform fit, and future editorial content without introducing a sprawling sitemap.
- **Alternatives considered:**
  - **Single long-scrolling homepage only:** Rejected because pricing and editorial content would feel bolted on.
  - **Large docs-like site:** Rejected because the near-term goal is focused marketing and app download conversion.

### 4. Use real app imagery as the core art direction system

- **Decision:** Screenshot crops, layered windows, sidebar fragments, floating toolbar details, and the app icon become the main visual artifacts.
- **Rationale:** The product UI already contains the exact qualities the site needs to sell: sculpted cards, calm surface contrast, elegant chrome, and strong content framing.
- **Alternatives considered:**
  - **Device mockup-heavy storytelling:** Rejected because it looks more generic and less editorial.
  - **Abstract illustration-led storytelling:** Rejected because it hides the product’s strongest differentiator.

### 4a. Favor card-led staging over device-led staging

- **Decision:** Website compositions should privilege article cards, layered reading surfaces, and cropped product windows over full hardware silhouettes.
- **Rationale:** Cardmaniacs’ strongest visual differentiator is its content-as-cards reading interface, not the existence of a device shell.
- **Alternatives considered:**
  - **Large phone or laptop mock-device hero compositions:** Rejected because they over-index on hardware presence and underplay the reading-desk metaphor.

### 5. Keep Keystatic selective and editorial, not all-powerful

- **Decision:** Keystatic/Markdoc owns blog posts, changelog entries, and selected editable marketing sections, while page layout, component structure, and token logic remain in code.
- **Rationale:** This balances content flexibility with the need to preserve visual quality and motion behavior in a highly art-directed site.
- **Alternatives considered:**
  - **All-content in code:** Rejected because changelog and blog workflows would become too rigid.
  - **Fully composable CMS pages:** Rejected because it would dilute the design system and increase implementation overhead.

### 5a. Separate structured editorial content from composed marketing layout

- **Decision:** Blog posts and changelog entries may be fully content-driven, but top-level marketing pages keep authored slots inside code-owned layouts rather than schema-defined page builders.
- **Rationale:** A page-builder CMS would undermine the asymmetrical composition and art-directed screenshot system this project depends on.
- **Alternatives considered:**
  - **Universal page-builder model:** Rejected because it optimizes flexibility at the expense of quality and consistency.

### 6. Use Tailwind v4 tokens and shared primitives, with Motion.dev reserved for high-value moments

- **Decision:** The implementation should define a tokenized design layer in Tailwind v4 and reusable primitives for sections, cards, CTAs, screenshot frames, proof chips, page bands, and navigation chrome. Motion.dev should power hero reveals, layout transitions, and selected hover/scroll moments, while simpler micro-interactions stay in CSS.
- **Rationale:** The site needs both polish and restraint. Shared primitives prevent drift, and selective motion keeps the site premium rather than noisy.
- **Alternatives considered:**
  - **Page-by-page custom styling:** Rejected because it risks inconsistent rhythm and hard-to-maintain code.
  - **Motion on every element:** Rejected because it would undermine clarity and reduced-motion support.

### 6a. Encode anti-patterns in the system, not only in review comments

- **Decision:** The design system and specs explicitly forbid generic SaaS hero patterns, loud startup gradients, dense dashboard grids, center-aligned-everything layouts, excessive glassmorphism, and default corporate font choices.
- **Rationale:** The requested design direction is defined as much by what it avoids as by what it includes. Making anti-patterns explicit reduces regression during implementation.
- **Alternatives considered:**
  - **Relying on taste alone during implementation:** Rejected because the repo currently has no established visual baseline.

### 7. Default to static-first delivery on Workers with strong media discipline

- **Decision:** The site should be designed as a static-first marketing surface that can pull editorial content from Keystatic/Markdoc while keeping image handling, loading, and animation budgets controlled.
- **Rationale:** Cardmaniacs is a download-focused product site, so fast first paint and stable layouts matter more than heavy interactivity.
- **Alternatives considered:**
  - **Client-heavy runtime rendering:** Rejected because it adds cost and performance risk without clear product benefit.
  - **Purely static content with no CMS integration:** Rejected because it limits changelog and blog workflows.

## Risks / Trade-offs

- **[Risk]** Liquid-glass and layered-surface styling can reduce text contrast or create visual haze.  
  **Mitigation:** Require semantic surface tokens, clear elevation hierarchy, and contrast validation in both themes.

- **[Risk]** Real app screenshots may overpower the page or become inconsistent across sections.  
  **Mitigation:** Define screenshot staging rules, approved crop styles, and section roles for imagery.

- **[Risk]** Editorial asymmetry can become unstable on smaller viewports.  
  **Mitigation:** Specify one focal moment per viewport, mobile-first stacking rules, and predictable collapse behavior.

- **[Risk]** Keystatic can expand scope if too much of the marketing surface becomes editable.  
  **Mitigation:** Keep layout, tokens, and composition primitives in code; expose only clearly bounded content slots in CMS.

- **[Risk]** Premium motion may introduce performance or accessibility regressions.  
  **Mitigation:** Reserve Motion.dev for high-value transitions, respect reduced-motion preferences, and avoid heavy continuous animation.

- **[Risk]** The site could drift toward “Apple fan-site” styling instead of Cardmaniacs’ own brand.  
  **Mitigation:** Keep Cardmaniacs iconography, screenshots, copy, and semantic tokens as the primary identity anchors in every major page.

## Migration Plan

1. Approve this OpenSpec change as the source of truth before code implementation begins.
2. During implementation, establish tokens, page shells, screenshot staging rules, and art-direction primitives before building individual pages.
3. Build the homepage first, then Features, Pricing, and editorial surfaces using the same primitives.
4. Keystatic collections map to stable content contracts; layout and tokens remain in code.
5. Validate accessibility, responsive behavior, anti-pattern compliance, and performance before any production deployment to Workers.

**Rollback:** If implementation drifts or proves too ambitious, revert to the last stable branch and retain these artifacts as the design contract while reducing scope page-by-page rather than abandoning the whole system.

## Open Questions

- Is pricing intended to launch as a live commercial offer immediately, or should the first release keep placeholder-friendly structure with limited transactional detail?
- Should the download CTA always resolve to the Mac App Store first, or should platform-specific destinations be selectable for macOS, iPhone, and iPad?
- Which marketing sections beyond blog/changelog need Keystatic editability in v1: homepage hero, proof strip, comparison copy, pricing FAQ, CTA band, or all of them?
- Should changelog entries and blog posts share a mostly common editorial schema, or does the changelog need a lighter structured model?
- Should the first release include platform-specific download badges or a simpler unified download CTA with platform support shown nearby?
