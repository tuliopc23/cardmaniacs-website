#!/usr/bin/env node
/**
 * Push beads without external_ref to Linear (parallel, resumable).
 * Usage: node scripts/push-beads-to-linear.mjs [--concurrency 8]
 */
import { execSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const concurrency = Number(
  process.argv.find((a) => a.startsWith("--concurrency="))?.split("=")[1] ?? 8,
);

function loadMissing() {
  const lines = readFileSync(join(root, ".beads/issues.jsonl"), "utf8").trim().split("\n");
  return lines
    .map((l) => JSON.parse(l))
    .filter((i) => !i.external_ref)
    .map((i) => ({ id: i.id, title: i.title }));
}

async function pushOne(id) {
  const r = spawnSync("bd", ["linear", "push", id, "-q"], { cwd: root, encoding: "utf8" });
  if (r.status !== 0) {
    throw new Error(r.stderr?.trim() || r.stdout?.trim() || `exit ${r.status}`);
  }
}

async function pool(items, fn, limit) {
  let i = 0;
  const workers = Array.from({ length: limit }, async () => {
    while (i < items.length) {
      const idx = i++;
      await fn(items[idx], idx);
    }
  });
  await Promise.all(workers);
}

const missing = loadMissing();
console.log(`Pushing ${missing.length} issues (concurrency ${concurrency})…`);

let ok = 0;
let fail = 0;
const failures = [];

await pool(
  missing,
  async ({ id, title }) => {
    try {
      await pushOne(id);
      ok++;
    } catch (e) {
      fail++;
      failures.push({ id, title, err: e.message });
    }
    if ((ok + fail) % 25 === 0 || ok + fail === missing.length) {
      console.log(`  ${ok + fail}/${missing.length} (ok=${ok} fail=${fail})`);
    }
  },
  concurrency,
);

if (failures.length) {
  console.log("\nFailures:");
  for (const f of failures.slice(0, 20)) {
    console.log(`  ${f.id}: ${f.err}`);
  }
  if (failures.length > 20) console.log(`  …and ${failures.length - 20} more`);
}

execSync("bd linear status", { cwd: root, stdio: "inherit" });
