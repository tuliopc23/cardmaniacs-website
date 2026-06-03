## ADDED Requirements

### Requirement: Marketing asset slots are defined and documented

The site SHALL define screenshot slots (Mac hero light/dark, reader, triage, highlights, command palette, media, iPhone, iPad, feature crops, press kit, OG) in `docs/marketing-assets.md` and `frontend/public/images/marketing/`.

#### Scenario: Asset drop-in

- **WHEN** final screenshots are exported from the app
- **THEN** filenames, aspect ratios, and alt text conventions allow drop-in without layout reflow

### Requirement: Device composition handles loading and fallback

`MarketingDeviceComposition` SHALL provide stable aspect ratios, responsive images, light/dark variants, and fallbacks without “Coming soon” on public hero surfaces.

#### Scenario: Missing mobile asset

- **WHEN** iPhone screenshots are not yet available
- **THEN** the homepage does not show dashed Coming soon panels in the primary hero
