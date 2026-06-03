## ADDED Requirements

### Requirement: No primary Coming soon placeholders

Primary marketing surfaces SHALL NOT display “Coming soon” device previews (notably hero iPhone/iPad panels).

#### Scenario: Homepage hero

- **WHEN** a visitor loads the homepage hero
- **THEN** Mac/Reader-led composition is shown; mobile tabs are hidden or use honest asset slots without Coming soon copy

### Requirement: Download CTAs are real or intentionally placeholder-safe

No control SHALL present as “Download on the App Store” while linking to `#download` unless that anchor is a deliberate interim landing with clear copy.

#### Scenario: App store button

- **WHEN** the primary download CTA is shown
- **THEN** it uses the documented strategy (store URL, TestFlight, or waitlist) from the direction note

### Requirement: Nav and footer links are launch-grade or hidden

Linked destinations (Privacy, Terms, Press, Docs, Blog, Changelog, Releases, Support) SHALL have useful content or be removed from navigation.

#### Scenario: Footer audit

- **WHEN** footer links are audited in M1.3
- **THEN** every visible link passes launch-grade or is hidden
