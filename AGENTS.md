<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

## Learned User Preferences

- Aim for premium, app-caliber marketing visuals (Apple-native / Liquid Glass–inspired editorial feel); site-wide ambience uses `SiteAmbient` frosted blur (haze, blooms, backdrop-filter)—not paper grain or gradient-mesh color blobs. Avoid generic SaaS landing pages, default Tailwind templates, and flat-only polish.
- Use brand accent blue `#539AC6` for primary blue accents unless design tokens specify otherwise.
- When building or refactoring UI, prefer modular Astro components and Tailwind or design tokens over scattered inline CSS (`style` attributes and ad-hoc one-off rules).
- Prefer SVGs and other static assets already in the repository (for example root-level icons or files under `public/`) instead of substituting unrelated third-party artwork.
- Run agent shell commands in **fish** syntax; avoid bash-only constructs that hang in the user's shell.
- Marketing motion and micro-interactions must be perceptible on index pages (scroll reveals, hero entrance, drawers, hovers)—wired-but-invisible animation fails the bar.

## Learned Workspace Facts

- Primary Astro site lives under `frontend/` with SSR via `@astrojs/cloudflare`; CMS is **Keystatic** with Markdoc-backed collections (not Sanity). Production deploy uses **Cloudflare Workers Builds** (git push); there is no GitHub Actions deploy workflow in this repo.
- `frontend/wrangler.jsonc` binds `SESSION` (KV) and `IMAGES` for the Astro Cloudflare adapter; from `frontend/`, `pnpm run deploy` runs build plus `wrangler deploy`. Before deploy, ensure Wrangler auth matches `account_id` in that file—unset `CLOUDFLARE_API_TOKEN` / `CF_API_TOKEN` when they target a different Cloudflare account.
- For Tailwind v4 with Astro, use `@tailwindcss/vite` in the Astro/Vite config; do not use `@astrojs/tailwind` for Tailwind v4.
- `Surface` wraps slot children in an inner `relative` container, so flex/grid on the `Surface` root does not arrange slot siblings—apply layout on an explicit wrapper inside the slot.
- In `frontend/astro.config.mjs`, exclude `@keystatic/astro` from Vite `optimizeDeps` and `ssr.optimizeDeps` so dependency pre-bundling does not try to resolve `virtual:keystatic-config` without Keystatic’s plugin.
- Routes that use `getStaticPaths` while `output` is `"server"` need `export const prerender = true` when those URLs should be generated as static HTML at build time.
- Vite+ walks upward to resolve `vite.config.ts` (a home-directory config can shadow the project); run `vp check` from repo root with `fmt` in root config, and keep frontend `vite` aligned with the installed Astro release (e.g. Astro 6 → Vite 7).
- Site motion uses the `motion` package via `MotionBootstrap.astro` in `Layout.astro` and `frontend/src/lib/motion/*` (`data-reveal`, `data-reveal-stagger`); reach for this stack rather than introducing a parallel animation stack.
- Brand and product design context for marketing work lives in root `PRODUCT.md` and `DESIGN.md`.
- `pnpm-workspace.yaml` `allowBuilds` must include `esbuild`, `sharp`, and `workerd` for Astro/Cloudflare; after a pnpm major bump, remove stale `node_modules` and rerun `vp install` if you hit `ERR_PNPM_UNEXPECTED_STORE`.
- Marketing images: slots in `frontend/src/lib/marketing-images.ts` (`/images/marketing/*`); production specs in `docs/marketing-assets.md`.
- App Store CTAs use `PUBLIC_APP_STORE_URL` via `frontend/src/lib/site-cta.ts`; when unset, keep honest “Coming to the App Store” labels—never fake download links.

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:7510c1e2 -->

## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**

- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->
