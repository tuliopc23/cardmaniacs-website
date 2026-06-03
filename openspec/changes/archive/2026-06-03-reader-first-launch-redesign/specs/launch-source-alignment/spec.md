## ADDED Requirements

### Requirement: Source audits complete before implementation

The team SHALL audit the Cardmaniacs app UI, the marketing website repo, and the personal-site Reader reference before M1+ code changes.

#### Scenario: M0 gate

- **WHEN** M1 or later work begins
- **THEN** `docs/implementation-notes/reader-first-launch-direction.md` exists with design sources, adapt rules, token mapping, screenshot staging, and CTA/pricing truth table

### Requirement: Copy guardrails documented

The direction note SHALL include a no-overclaim list for features that are planned, partial, or unverified (social sources, share extension, Handoff, etc.).

#### Scenario: M7 fact-check

- **WHEN** marketing copy is written for M7
- **THEN** claims can be checked against the M0 guardrails list
