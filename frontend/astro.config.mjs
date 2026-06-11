import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: "https://cardmaniacs.app",
  output: "server",
  adapter: cloudflare(),
  integrations: [react(), markdoc(), keystatic()],
  vite: {
    plugins: tailwindcss(),
    server: {
      allowedHosts: true,
    },
    // Keystatic injects `virtual:keystatic-config`; esbuild dep-prebundle cannot resolve it
    // for `@keystatic/astro/internal/keystatic-api.js`, which breaks `optimizeDeps`.
    //
    // Astro dev toolbar (audit / xray apps) is pre-bundled into hashed chunks under
    // `node_modules/.vite/deps/`. When `optimizeDeps` re-runs, old chunk URLs 404 briefly.
    // Serving the toolbar entry without dep-prebundle avoids those stale-hash warnings.
    optimizeDeps: {
      exclude: ["@keystatic/astro", "astro/runtime/client/dev-toolbar/entrypoint.js"],
    },
    ssr: {
      optimizeDeps: {
        exclude: ["@keystatic/astro"],
      },
    },
    // Keystatic CMS client bundle is ~2.7 MB minified; Vite’s default 500 kB warning is noise until the admin UI is lazy-islanded.
    build: {
      chunkSizeWarningLimit: 3200,
    },
  },
});
