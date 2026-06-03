## Why

Reader-first launch implementation (archived `reader-first-launch-redesign`) and umbrella `craft-cardmaniacs-marketing-site` are complete in code. Remaining work is operational: production deploy via Workers Builds, App Store URL when the listing is live, and product-owner sign-off on marketing claims.

## What Changes

- Mirror Beads **P2 Launch day** epic in OpenSpec tasks.
- Document Workers Builds as the sole CI deploy path (GitHub Actions deploy removed).
- Track `PUBLIC_APP_STORE_URL` in Workers Builds build environment.
- Track PO review of copy guardrails in `reader-first-launch-direction.md`.

## Capabilities

### New Capabilities

- `launch-day-ops`: Production deploy wiring, App Store CTA env, and launch sign-off.

### Modified Capabilities

None.

## Impact

- [`docs/deploy-cloudflare.md`](../../../docs/deploy-cloudflare.md)
- [`frontend/wrangler.jsonc`](../../../frontend/wrangler.jsonc)
- [`frontend/.env.example`](../../../frontend/.env.example)
- Beads: `cardmaniacs-website-119` (P2 epic) and children P2.1–P2.4
