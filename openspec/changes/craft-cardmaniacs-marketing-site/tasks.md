## 1. Foundation and project setup

- [ ] 1.1 Replace the Astro starter scaffold with the route, layout, and component structure needed for Home, Features, Pricing, Blog, and changelog surfaces
- [ ] 1.2 Add and configure the required implementation dependencies for Tailwind CSS v4, Motion.dev, Sanity, and Cloudflare Workers deployment
- [ ] 1.3 Establish the base site configuration, environment contract, and shared layout shell for the marketing system
- [ ] 1.4 Define the platform download strategy and placeholder-safe content strategy needed before visual build-out

## 2. Design tokens and shared primitives

- [ ] 2.1 Create the token layer for typography, color, radius, spacing, elevation, blur, and motion timing based on the approved design language
- [ ] 2.2 Build reusable primitives for navigation chrome, section shells, proof strips, CTA bands, pricing cards, screenshot frames, and editorial listing cards
- [ ] 2.3 Prepare and optimize the Cardmaniacs icon and screenshot assets with the approved editorial cropping and framing rules
- [ ] 2.4 Implement the theme system, platform support indicators, and anti-pattern guardrails in the shared component layer

## 3. Marketing page implementation

- [ ] 3.1 Implement the homepage with the required hero, proof strip, workflow storytelling, reading-desk composition, trust section, and pricing teaser
- [ ] 3.2 Implement the Features page with workflow-based grouping and alternating editorial product sections
- [ ] 3.3 Implement the Pricing page with one primary plan, an optional secondary plan, FAQ content, trust band, and final download CTA
- [ ] 3.4 Implement the blog index, changelog index, and shared editorial listing treatments that match the site’s reading-object presentation
- [ ] 3.5 Implement platform-support messaging for macOS, iPhone, and iPad across the relevant page surfaces

## 4. CMS integration

- [ ] 4.1 Define Sanity schemas for blog posts, changelog entries, FAQs, proof items, and approved editable marketing content
- [ ] 4.2 Connect the Astro data layer to Sanity while preserving code-owned layout composition and static fallbacks where needed
- [ ] 4.3 Wire the blog, changelog, and selected marketing sections to live CMS content without breaking the shared component system
- [ ] 4.4 Restrict CMS-driven marketing edits to explicit content slots so layout composition cannot drift through authoring

## 5. Motion, accessibility, and delivery

- [ ] 5.1 Add purposeful Motion.dev interactions for hero reveals, layout transitions, and selected hover states with reduced-motion support
- [ ] 5.2 Validate theme behavior, contrast, focus states, mobile readability, and responsive collapse patterns across the supported pages
- [ ] 5.3 Optimize media loading and layout stability for screenshot-heavy sections and verify the site meets the agreed performance bar
- [ ] 5.4 Configure the production build and deployment workflow for Cloudflare Workers and verify the site can ship with the defined stack
- [ ] 5.5 Verify the finished site avoids the forbidden generic SaaS patterns during final visual QA
