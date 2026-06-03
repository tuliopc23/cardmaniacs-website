## Context

Launch code and bindings are in place. Deploy auth uses Cloudflare Workers Builds on account `e328c1497ae7e9a61aea8ca119af439d`, not GitHub Actions.

## Decisions

- **Deploy:** Dashboard Git connect → build `cd frontend && pnpm run build` → `cd frontend && npx wrangler deploy`.
- **App Store CTA:** `PUBLIC_APP_STORE_URL` set in Workers Builds **build** variables when listing exists; empty otherwise (honest waitlist copy via `site-cta.ts`).
- **Sign-off:** Human PO reviews `docs/implementation-notes/reader-first-launch-direction.md` guardrails before public announce.

## Non-Goals

- Sanity migration
- New marketing sections
