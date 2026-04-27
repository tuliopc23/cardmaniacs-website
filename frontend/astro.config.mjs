import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [react(), markdoc(), keystatic()],
  vite: {
    plugins: tailwindcss(),
    server: {
      allowedHosts: true,
    },
  },
});
