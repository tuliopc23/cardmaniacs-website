## ADDED Requirements

### Requirement: Sanity owns editorial content and bounded marketing edits
The website SHALL use Sanity as the content source for blog posts, changelog entries, and clearly bounded editable marketing sections without handing full layout composition to the CMS.

#### Scenario: CMS ownership boundaries
- **WHEN** content authors edit the marketing system
- **THEN** they can update sanctioned copy, posts, changelog entries, and selected section content while the underlying page structure and design primitives remain controlled in code

### Requirement: Editable marketing slots stay explicit
The content platform SHALL treat homepage hero copy, proof items, FAQ entries, comparison copy, CTA band copy, and similar bounded fields as explicit editable slots rather than arbitrary block-builder content.

#### Scenario: Editing a homepage marketing field
- **WHEN** a content editor changes homepage messaging
- **THEN** the edit occurs within a predefined field or group of fields and does not alter the page’s compositional system

### Requirement: The site includes a blog-ready editorial index
The marketing system SHALL include an editorial index surface for blog content that matches the site’s paper-like, card-based reading object treatment instead of generic CMS tiles.

#### Scenario: Blog listing presentation
- **WHEN** a visitor browses the blog index
- **THEN** article cards read as curated reading objects with framed imagery, editorial spacing, and quiet metadata rather than default content cards

### Requirement: The site includes a changelog publishing surface
The content platform SHALL support changelog entries as a first-class editorial surface so product updates can be published without reshaping the design system.

#### Scenario: Changelog update
- **WHEN** a new release note or product update is published
- **THEN** the site can render it through a dedicated changelog presentation that remains visually consistent with the rest of the editorial system

### Requirement: Blog and changelog content models remain compatible but distinct
The content platform SHALL allow blog posts and changelog entries to share an editorial foundation while preserving the lighter, release-oriented needs of changelog content.

#### Scenario: Publishing long-form and short-form editorial content
- **WHEN** the team publishes a blog post and a changelog entry
- **THEN** both entries can use a coherent editorial system while exposing only the metadata and body structure appropriate to each content type

### Requirement: Marketing content models support future iteration without layout drift
The content platform SHALL model reusable proof points, FAQs, and selected page copy in ways that allow iteration without forcing template-level redesign for every update.

#### Scenario: Updating controlled marketing content
- **WHEN** the team needs to change a proof item, FAQ answer, or selected marketing statement
- **THEN** the content can be updated through the agreed content model while preserving the same page composition and component behavior
