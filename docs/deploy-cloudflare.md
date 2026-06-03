# Deploy Cardmaniacs website to **your** Cloudflare account

The site is an Astro SSR app on Cloudflare Workers (`frontend/`, `@astrojs/cloudflare`).

## 1. Stop using the client token locally

Your shell may still export a client `CLOUDFLARE_API_TOKEN`. Before any deploy:

```fish
set -e CLOUDFLARE_API_TOKEN
set -e CF_API_TOKEN
```

Create a token on **your** account: [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens) with **Workers Scripts Edit** (and **Account Read**).

```fish
cd frontend
set -x CLOUDFLARE_API_TOKEN "your-token"
set -x CLOUDFLARE_ACCOUNT_ID "your-account-id"
pnpm exec wrangler whoami
```

Confirm the account name is **yours** (e.g. `Contact@tuliocunha.dev's Account`), not a client’s.

This repo pins account id `e328c1497ae7e9a61aea8ca119af439d` in `frontend/wrangler.jsonc`.

## 2. First manual deploy (recommended once)

```fish
cd /Users/tuliopinheirocunha/Developer/cardmaniacs-website
vp install
vp run frontend:build
cd frontend
pnpm exec wrangler deploy
```

Wrangler may provision a `SESSION` KV namespace on first deploy. Copy the namespace id into [`frontend/wrangler.jsonc`](../frontend/wrangler.jsonc) if you want it pinned:

```jsonc
"kv_namespaces": [{ "binding": "SESSION", "id": "xxxxxxxx" }]
```

Set production env vars in the dashboard (**Workers → cardmaniacs-website → Settings → Variables**) or:

```fish
pnpm exec wrangler secret put PUBLIC_APP_STORE_URL
```

## 3. Wire GitHub (CI deploy)

Repo: `tuliopc23/cardmaniacs-website`

Add **repository secrets** ([Settings → Secrets → Actions](https://github.com/tuliopc23/cardmaniacs-website/settings/secrets/actions)):

| Secret                  | Value                                                  |
| ----------------------- | ------------------------------------------------------ |
| `CLOUDFLARE_API_TOKEN`  | Your token (not the client’s)                          |
| `CLOUDFLARE_ACCOUNT_ID` | Dashboard → Workers → account id in the URL or sidebar |

Workflow: [`.github/workflows/deploy-cloudflare.yml`](../.github/workflows/deploy-cloudflare.yml)

- Runs on push to `main` and on **workflow_dispatch**
- `pnpm install` at repo root → `pnpm run build` in `frontend/` → `wrangler deploy`

After secrets are set, push to `main` or run the workflow manually from the Actions tab.

## 4. Alternative: Cloudflare “Connect Git” (dashboard)

If you prefer Cloudflare’s built-in Git integration instead of GitHub Actions:

1. **Workers & Pages → Create → Connect to Git**
2. Select `tuliopc23/cardmaniacs-website`
3. **Root directory:** `frontend`
4. **Build command:** `cd .. && pnpm install --frozen-lockfile && cd frontend && pnpm run build`
5. **Deploy command:** `npx wrangler deploy` (or use Workers Builds defaults for Astro if offered)

Use the same API token / account; do not reuse the client credentials.

## 5. Custom domain (later)

Workers → `cardmaniacs-website` → **Settings → Domains & Routes** → add your marketing hostname.
