import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const frontendDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = path.resolve(frontendDir, "..");
const generatedConfigPath = path.join(frontendDir, "dist/server/wrangler.json");
const rootConfigPath = path.join(repoRoot, "wrangler.jsonc");

if (!fs.existsSync(generatedConfigPath)) {
  console.error(`sync-root-wrangler: missing ${generatedConfigPath}. Run "astro build" first.`);
  process.exit(1);
}

const generated = JSON.parse(fs.readFileSync(generatedConfigPath, "utf8"));

const rootConfig = {
  $schema: "./frontend/node_modules/wrangler/config-schema.json",
  name: generated.name,
  account_id: generated.account_id,
  compatibility_date: generated.compatibility_date,
  compatibility_flags: generated.compatibility_flags,
  main: "frontend/dist/server/entry.mjs",
  no_bundle: true,
  rules: generated.rules,
  assets: {
    binding: generated.assets?.binding ?? "ASSETS",
    directory: "frontend/dist/client",
  },
  kv_namespaces: generated.kv_namespaces,
  images: generated.images,
  observability: generated.observability,
};

fs.writeFileSync(rootConfigPath, `${JSON.stringify(rootConfig, null, 2)}\n`);
console.log(`sync-root-wrangler: wrote ${path.relative(repoRoot, rootConfigPath)}`);
