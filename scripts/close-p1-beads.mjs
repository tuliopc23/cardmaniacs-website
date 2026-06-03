#!/usr/bin/env node
/**
 * Close P1 beads by roadmap id prefix.
 * Usage: node scripts/close-p1-beads.mjs P1.1.1 P1.1.2 ...
 */
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ids = process.argv.slice(2);
const lines = readFileSync(join(root, ".beads/issues.jsonl"), "utf8").trim().split("\n");

for (const line of lines) {
  if (!line) continue;
  const issue = JSON.parse(line);
  if (issue.status === "closed") continue;
  const m = issue.title?.match(/^\[([^\]]+)\]/);
  if (!m) continue;
  const rid = m[1];
  const hit =
    ids.length === 0
      ? rid.startsWith("P1")
      : ids.some((id) => rid === id || rid.startsWith(`${id}.`));
  if (!hit) continue;
  spawnSync("bd", ["close", issue.id, "--reason", "P1 Ship gate complete"], {
    cwd: root,
    stdio: "inherit",
  });
}
