# marketing-page-architecture Specification

## Purpose

TBD - created by archiving change craft-cardmaniacs-marketing-site. Update Purpose after archive.

## Requirements

### Requirement: The site presents Cardmaniacs as one unified reading desk

The marketing website SHALL describe Cardmaniacs as a single native workflow for feeds, read-later capture, bookmarks, and imported documents instead of treating those areas as unrelated features.

#### Scenario: Product framing on landing surfaces

- **WHEN** a visitor encounters the hero, intro copy, or primary proof content
- **THEN** the messaging explains that Cardmaniacs combines feed following, read later, bookmarks, and document import into one calm Apple-platform experience

### Requirement: Global navigation stays thin and download-focused

The website SHALL provide a thin global header with logo, Features, Pricing, Blog, and a download CTA, without megamenu behavior or a heavy product-navigation bar.

#### Scenario: Top-level navigation

- **WHEN** a visitor lands on any top-level page
- **THEN** the header exposes the logo, the three primary destinations, and a prominent download action in a calm editorial chrome

### Requirement: The hero combines editorial copy and layered product staging

The homepage hero SHALL include a large editorial headline, concise supporting copy, a primary download CTA, a secondary feature CTA, and a layered screenshot composition with organic support forms.

#### Scenario: Homepage hero rendering

- **WHEN** a visitor first lands on the homepage
- **THEN** the hero pairs the primary value proposition with two clearly separated actions and a product composition built from real Cardmaniacs imagery rather than a generic illustration

### Requirement: The homepage follows the defined narrative sequence

The homepage SHALL include a large editorial hero, a proof strip, feature storytelling, a reading-desk composition section, an editorial trust/comparison section, and a pricing teaser.

#### Scenario: Homepage pacing

- **WHEN** a visitor scrolls through the homepage
- **THEN** the page moves from product identity to proof, to workflow explanation, to premium differentiation, and ends with a download-oriented CTA path

### Requirement: The homepage proof content reflects real product strengths

The homepage SHALL surface proof items for Apple platform support, offline reading, feeds/read later/bookmarks, PDF-EPUB-Markdown import, and system integrations such as widgets, Shortcuts, and Handoff.

#### Scenario: Proof strip content

- **WHEN** the proof strip or equivalent confidence band is rendered
- **THEN** it communicates the actual platform and workflow strengths of the product rather than generic trust badges

### Requirement: Apple-platform positioning is explicit

The marketing system SHALL make clear that Cardmaniacs is a native Apple-platform product with dedicated experiences for macOS, iPhone, and iPad.

#### Scenario: Platform support communication

- **WHEN** a visitor scans the homepage, features page, or proof content
- **THEN** the site explicitly signals support for macOS, iPhone, and iPad as first-class product surfaces

### Requirement: Features and pricing pages use editorial pacing

The Features page SHALL group functionality by workflow, and the Pricing page SHALL support one primary plan plus at most one secondary plan, a FAQ block, a trust band, and a final CTA.

#### Scenario: Secondary page structure

- **WHEN** a visitor opens the Features or Pricing page
- **THEN** the Features page alternates large editorial product sections by workflow, and the Pricing page avoids a dense SaaS pricing matrix while preserving room for future updates

### Requirement: The Features page prioritizes core workflow over secondary proof

The Features page SHALL foreground feeds, read later, bookmarks, document import, keyboard-forward reading, and organization before placing secondary capabilities such as AI Digest, widgets, Spotlight, and integrations lower in the page.

#### Scenario: Features page information hierarchy

- **WHEN** the Features page is ordered for publication
- **THEN** the product’s primary reading workflow appears before secondary proof and platform integrations

### Requirement: Pricing supports placeholder-safe launch behavior

The Pricing page SHALL preserve a valid layout even if pricing copy is not finalized, and it SHALL not invent commercial details that have not been confirmed.

#### Scenario: Unfinalized pricing

- **WHEN** the product team has not locked final pricing details
- **THEN** the pricing page can still render with placeholder-safe structure, FAQ content, and CTA framing without fabricating unsupported plan terms
