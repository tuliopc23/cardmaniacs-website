## ADDED Requirements

### Requirement: Marketing Reader surface components exist

The website SHALL provide six reusable marketing components under `frontend/src/components/marketing/`: Reader, Highlight, Triage, Command, Media, and DeviceComposition surfaces aligned with the Cardmaniacs app.

#### Scenario: Homepage and editorial reuse

- **WHEN** homepage, blog detail, or changelog detail renders product storytelling
- **THEN** it uses these components (or composes them) rather than generic cards or device-mockup-only layouts

### Requirement: Reader surface supports editorial content

`MarketingReaderSurface` SHALL support title hierarchy, metadata row, body typography, optional preview, highlight marks, Markdoc callouts, elevated rounded shell, chrome hints, and dark/light responsive layout.

#### Scenario: Blog article

- **WHEN** a visitor opens a blog post
- **THEN** the article layout matches Cardmaniacs Reader rhythm, not generic `Prose` alone
