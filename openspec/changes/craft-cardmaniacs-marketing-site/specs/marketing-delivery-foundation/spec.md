## ADDED Requirements

### Requirement: The marketing site uses the agreed implementation stack
The website SHALL be specified for Astro with Vite, Tailwind CSS v4, Motion.dev for meaningful animation, Sanity-backed editorial content, and deployment through Cloudflare Workers.

#### Scenario: Implementation foundation
- **WHEN** engineering begins implementing the site from this spec
- **THEN** the chosen framework, styling system, animation library, CMS, and deployment target align with the stack defined in the change

### Requirement: Shared primitives and tokens enforce consistency
The implementation SHALL define reusable tokens and primitives for sections, cards, proof strips, screenshot frames, pricing cards, CTA bands, and navigation chrome so new pages do not reinvent the system.

#### Scenario: Building a new marketing page
- **WHEN** a new page or section is added after the initial launch
- **THEN** it can be composed from existing tokens and primitives while preserving the same visual rhythm and interaction language

### Requirement: Tailwind tokens are semantic and reusable
The implementation SHALL use a semantic token layer for surfaces, text, radii, spacing, shadows, and motion timing instead of scattering raw one-off values throughout page components.

#### Scenario: Styling a new component
- **WHEN** an engineer implements a new marketing primitive or page section
- **THEN** the styling references semantic tokens and shared recipes rather than ad hoc hard-coded values

### Requirement: Motion is purposeful and tiered
The implementation SHALL reserve Motion.dev for hero reveals, layout choreography, and high-value transitions while keeping ordinary hover and focus feedback lightweight and fully compatible with reduced-motion preferences.

#### Scenario: Animating a page section
- **WHEN** a section or interaction is given motion treatment
- **THEN** the animation communicates hierarchy or continuity, avoids constant ambient distraction, and degrades cleanly under reduced-motion settings

### Requirement: Accessibility and responsiveness are part of the contract
The website SHALL meet contrast, focus visibility, reduced-motion, and mobile legibility requirements in both light and dark themes across the supported page set.

#### Scenario: Accessibility validation
- **WHEN** the site is reviewed on keyboard navigation, small screens, or reduced-motion settings
- **THEN** focus states remain obvious, content remains readable, motion is reduced appropriately, and no decorative form blocks comprehension

### Requirement: Performance discipline applies to imagery and motion
The implementation SHALL optimize app screenshots and visual media to avoid layout instability, excessive payload, or animation patterns that harm perceived performance.

#### Scenario: Loading a media-heavy landing section
- **WHEN** a visitor opens a section containing layered screenshots and motion
- **THEN** imagery reserves space predictably, the layout remains stable, and animations do not delay content comprehension or basic interaction

### Requirement: Delivery remains static-first
The marketing system SHALL keep top-level marketing pages and editorial routes compatible with a static-first deployment model on Workers, even when content is sourced from Sanity.

#### Scenario: Building for production
- **WHEN** the production build is generated for Workers deployment
- **THEN** the site can render the required marketing and editorial routes without depending on a client-heavy runtime to assemble core page content
