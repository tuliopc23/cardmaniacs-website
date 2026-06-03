#!/usr/bin/env node
/**
 * Close open Beads issues for milestones M2–M8 (children before epics).
 * Usage: node scripts/close-milestone-beads.mjs 2 3 4
 */
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const jsonlPath = join(root, ".beads/issues.jsonl");
const milestones = process.argv.slice(2).map((m) => m.replace(/^M/i, ""));
if (milestones.length === 0) {
  console.error("Usage: node scripts/close-milestone-beads.mjs 2 3 4 …");
  process.exit(1);
}

const milestoneSet = new Set(milestones);
const lines = readFileSync(jsonlPath, "utf8").trim().split("\n");
const open = [];

for (const line of lines) {
  if (!line) continue;
  const issue = JSON.parse(line);
  if (issue.status === "closed") continue;
  const m = issue.title?.match(/\[M([0-8])/);
  if (!m || !milestoneSet.has(m[1])) continue;
  open.push(issue);
}

// Close deepest task IDs first (longer titles ≈ leaf tasks).
open.sort((a, b) => (b.title?.length ?? 0) - (a.title?.length ?? 0));

console.log(`Closing ${open.length} beads for M${[...milestoneSet].join(", M")}…`);

let closed = 0;
for (const { id, title } of open) {
  const r = spawnSync("bd", ["close", id, "--reason", "Reader-first launch workflow complete"], {
    cwd: root,
    encoding: "utf8",
  });
  if (r.status === 0) {
    closed++;
  } else {
    console.error(title, id, r.stderr?.trim() || r.stdout?.trim());
  }
}

console.log(`Closed ${closed}/${open.length}.`);
