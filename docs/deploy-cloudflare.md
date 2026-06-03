# Deploy with Cloudflare Workers Builds

Marketing site: Astro SSR on Workers (`frontend/`, `@astrojs/cloudflare`).

**Account:** `e328c1497ae7e9a61aea8ca119af439d` (Contact@tuliocunha.dev)

Deploy is **Workers Builds** (Git → build → `wrangler deploy`). There is no GitHub Actions deploy workflow in this repo.

The Worker script **`cardmaniacs-website`** is created on the **first successful deploy** (local `wrangler deploy` or Workers Builds). There is no separate “create Worker” API in the Cloudflare MCP tools—use deploy or the dashboard import flow below.

## Cloudflare MCP (Cursor)

Connect the **Cloudflare** plugin to **Contact@tuliocunha.dev's Account** (`e328c1497ae7e9a61aea8ca119af439d`). In Cursor: **Settings → MCP → Cloudflare → authenticate**, and set header `cf-account-id` to `e328c1497ae7e9a61aea8ca119af439d` if you use multiple accounts.

Useful MCP tools after auth:

| Tool                                         | Purpose                                  |
| -------------------------------------------- | ---------------------------------------- |
| `kv_namespaces_list` / `kv_namespace_create` | Verify or create `SESSION` KV            |
| `workers_list` / `workers_get_worker`        | Confirm Worker exists after first deploy |
| `workers_builds_list_builds`                 | CI build history (Workers Builds)        |

If MCP returns `Authentication error [10000]`, the plugin is not logged in or is scoped to the wrong account—fix auth before retrying.

## Bindings (already in repo)

[`frontend/wrangler.jsonc`](../frontend/wrangler.jsonc) pins what Astro needs in production:

| Binding   | Type              | ID / config                                                        |
| --------- | ----------------- | ------------------------------------------------------------------ |
| `SESSION` | KV                | `3a8c1f24c1b54398bee2691c46eb1f09` (`cardmaniacs-website-session`) |
| `IMAGES`  | Cloudflare Images | `binding: "IMAGES"` (adapter uses at build)                        |

`ASSETS` and the Worker entrypoint come from the Astro build output (`dist/`); Wrangler picks them up on deploy.

KV was created on your account via Cloudflare bindings MCP. Do **not** deploy to the client account (`73b8e225…`).

## Connect the Git repo (dashboard)

Workers Builds MCP can **list builds and logs** after the Worker exists; it cannot attach a repository. Use the dashboard once:

1. [Workers & Pages → Create → Import a repository](https://dash.cloudflare.com/e328c1497ae7e9a61aea8ca119af439d/workers-and-pages/create)
2. GitHub: `tuliopc23/cardmaniacs-website`
3. Worker name must be **`cardmaniacs-website`** (same as `name` in `wrangler.jsonc`)
4. **Production branch:** `main`

### Build settings (monorepo)

Use the **repository root** as the project path so the root `pnpm-lock.yaml` is used:

| Setting         | Value                                |
| --------------- | ------------------------------------ |
| Root directory  | `/` (repo root)                      |
| Install command | `pnpm install --frozen-lockfile`     |
| Build command   | `cd frontend && pnpm run build`      |
| Deploy command  | `cd frontend && npx wrangler deploy` |

If the UI only allows a subdirectory root, set **Root directory** to `frontend` and **Install command** to `cd .. && pnpm install --frozen-lockfile`.

Use the default deploy command `npx wrangler deploy` only when the root directory is `frontend` (so Wrangler runs inside `frontend/`).

### Build-time env (App Store CTA)

`PUBLIC_APP_STORE_URL` is baked in at **build** time. In the Worker **Build** settings, add variable:

- `PUBLIC_APP_STORE_URL` = your App Store URL, or leave empty for “Coming to the App Store” CTAs.

### Runtime secrets (Keystatic CMS)

Keystatic uses GitHub storage (`keystatic.config.ts`). For `/keystatic` in production, add **Worker secrets** (or encrypted env) on the same Worker—see [`frontend/.dev.vars.example`](../frontend/.dev.vars.example):

- `KEYSTATIC_GITHUB_CLIENT_ID`
- `KEYSTATIC_GITHUB_CLIENT_SECRET`
- `KEYSTATIC_SECRET`
- `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`

Dashboard: **Workers → cardmaniacs-website → Settings → Variables and Secrets**. Local dev uses `frontend/.dev.vars` (gitignored).

## After the first deploy

- Preview URL: `https://cardmaniacs-website.<account-subdomain>.workers.dev`
- Monitor builds: Cloudflare dashboard **Workers → cardmaniacs-website → Builds**, or Workers Builds MCP (`workers_builds_list_builds` with `account_id` above)
- Custom domain: **Settings → Domains & Routes**

## Local deploy (optional)

Unset any client token before using Wrangler locally:

```fish
set -e CLOUDFLARE_API_TOKEN
set -e CF_API_TOKEN
cd frontend
pnpm exec wrangler whoami --json
pnpm run deploy
```

OAuth must list account `e328c149…`, or use an **Edit Cloudflare Workers** [API token](https://dash.cloudflare.com/e328c1497ae7e9a61aea8ca119af439d/api-tokens) on that account only.

**Wrong account:** If `wrangler whoami` shows **Gabs.villela@gmail.com's Account** (`73b8e225…`) while `wrangler.jsonc` has `account_id` `e328c149…`, deploy will fail with `Authentication error`. Unset `CLOUDFLARE_API_TOKEN` / `CF_API_TOKEN` (they may be set in your shell profile for the client) and re-auth to your account, or export a token created only on `e328c149…`.
