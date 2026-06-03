## ADDED Requirements

### Requirement: Marketing assets are wired to stable paths

The site SHALL reference marketing screenshots through `frontend/src/lib/marketing-images.ts` and documented slots in `docs/marketing-assets.md`.

#### Scenario: Homepage and features load imagery

- **WHEN** production pages render hero and feature sections
- **THEN** image `src` values resolve to files under `frontend/public/images/marketing/` without broken paths

### Requirement: Production build succeeds

The frontend production build SHALL pass via `vp run frontend:build` (or equivalent `cd frontend && pnpm run build` in Workers Builds).

#### Scenario: CI build

- **WHEN** Workers Builds runs after install
- **THEN** the Astro build completes without errors

### Requirement: App Store URL in production build env

When the App Store listing is live, Workers Builds SHALL set `PUBLIC_APP_STORE_URL` at build time so CTAs resolve to the real product URL.

#### Scenario: Live listing

- **WHEN** the listing URL is available
- **THEN** build env includes `PUBLIC_APP_STORE_URL` and deployed HTML uses App Store CTAs

#### Scenario: Pre-listing

- **WHEN** the URL is not set
- **THEN** CTAs use honest non-fake labels per `site-cta.ts`

### Requirement: Product-owner marketing claims sign-off

Before public launch announce, the product owner SHALL review copy guardrails in `docs/implementation-notes/reader-first-launch-direction.md` and outstanding Markdoc posts flagged in the ship report.

#### Scenario: Launch approval

- **WHEN** PO completes review
- **THEN** no overclaim remains on primary surfaces and guardrail list is acknowledged
