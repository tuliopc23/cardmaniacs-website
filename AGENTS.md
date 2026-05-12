<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.

<!--VITE PLUS END-->

## Learned User Preferences

- Aim for premium, app-caliber marketing visuals (Apple-native / Liquid Glass–inspired editorial feel); avoid generic SaaS landing pages, default Tailwind templates, and flat-only polish.
- Use brand accent blue `#539AC6` for primary blue accents unless design tokens specify otherwise.

## Learned Workspace Facts

- Primary Astro site lives under `frontend/` with SSR via `@astrojs/cloudflare`; Keystatic is integrated with Markdoc-backed collections; deployment targets Cloudflare Workers (Wrangler).
- For Tailwind v4 with Astro, use `@tailwindcss/vite` in the Astro/Vite config; do not use `@astrojs/tailwind` for Tailwind v4.
- `Surface` wraps slot children in an inner `relative` container, so flex/grid on the `Surface` root does not arrange slot siblings—apply layout on an explicit wrapper inside the slot.
- In `frontend/astro.config.mjs`, exclude `@keystatic/astro` from Vite `optimizeDeps` and `ssr.optimizeDeps` so dependency pre-bundling does not try to resolve `virtual:keystatic-config` without Keystatic’s plugin.
- Routes that use `getStaticPaths` while `output` is `"server"` need `export const prerender = true` when those URLs should be generated as static HTML at build time.
- Keep the frontend `vite` major version aligned with what the installed Astro release supports (e.g. Astro 6 expects Vite 7) to avoid adapter and build-tooling mismatches.
- Vite+ walks upward to resolve `vite.config.ts`; a config file outside the repo (such as in the home directory) can shadow the project. Run `vp check` from the repo root, and ensure the root `vite.config.ts` defines `fmt` (and related Vite+ fields) so `vp check` can load project config reliably.
