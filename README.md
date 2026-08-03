# Cardmaniacs website

Marketing site and Keystatic CMS for Cardmaniacs (Astro, Cloudflare Workers, Tailwind v4).

**Cloudflare:** Workers Builds from Git on **your** account (`e328c1497ae7e9a61aea8ca119af439d`). Bindings are in `frontend/wrangler.jsonc`. See [`docs/deploy-cloudflare.md`](docs/deploy-cloudflare.md).

```sh
cd frontend && pnpm install && pnpm run dev
```

From repo root (with [Vite+](https://viteplus.dev/guide/) installed): `vp check` and `vp test`.

**Deploy:** Connect `tuliopc23/cardmaniacs-website` in [Workers Builds](https://dash.cloudflare.com/e328c1497ae7e9a61aea8ca119af439d/workers-and-pages/create) (see deploy doc). Optional local: `pnpm run build && pnpm run deploy` from repo root, or `cd frontend && pnpm run deploy`.

## Legacy starter notes (remove when docs are expanded)

The sections below still describe the default Astro starter layout and are not accurate for this repo’s `frontend/` tree.

```sh
pnpm create astro@latest -- --template basics
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you will see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
