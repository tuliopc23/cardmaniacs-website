#!/usr/bin/env node
/**
 * Seed P2 Launch day beads.
 * Run: node scripts/seed-p2-launch-day.mjs
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const idToBead = new Map();

function sh(cmd) {
  return execSync(cmd, { cwd: root, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim();
}

function loadExisting() {
  const lines = readFileSync(join(root, ".beads/issues.jsonl"), "utf8").trim().split("\n");
  for (const line of lines) {
    if (!line) continue;
    const issue = JSON.parse(line);
    const m = issue.title?.match(/^\[([^\]]+)\]/);
    if (m) idToBead.set(m[1], issue.id);
  }
}

function createIssue({ id, title, parentId, acceptance = "" }) {
  if (idToBead.has(id)) {
    console.log(`skip: [${id}]`);
    return idToBead.get(id);
  }
  const parentStr = parentId ? `--parent ${parentId}` : "";
  const descArg = acceptance ? `-d ${JSON.stringify(`**Acceptance:** ${acceptance}`)}` : "";
  const cmd =
    `bd create ${JSON.stringify(`[${id}] ${title}`)} -t task -l "milestone:P2" ${parentStr} ${descArg}`.replace(
      /\s+/g,
      " ",
    );
  const out = sh(cmd);
  const match = out.match(/(cardmaniacs-website-[a-z0-9.]+)/);
  if (!match) throw new Error(out);
  idToBead.set(id, match[1]);
  return match[1];
}

function dep(child, blocker) {
  try {
    sh(`bd dep add ${idToBead.get(child)} ${idToBead.get(blocker)} --type blocks`);
  } catch (e) {
    const msg = e.stderr?.toString() || "";
    if (!msg.includes("already")) console.error(msg);
  }
}

loadExisting();

const p2 =
  idToBead.get("P2") ||
  sh(`bd create "[P2] Launch day" -t epic -l "milestone:P2","area:launch"`).match(
    /(cardmaniacs-website-[a-z0-9.]+)/,
  )?.[1];
if (p2) idToBead.set("P2", p2);

createIssue({
  id: "P2.1",
  title: "Wire marketing image paths sitewide",
  parentId: p2,
  acceptance: "Hero and launch surfaces use /images/marketing/* slots.",
});
createIssue({
  id: "P2.2",
  title: "Production build verification",
  parentId: p2,
  acceptance: "vp run frontend:build succeeds.",
});
createIssue({
  id: "P2.3",
  title: "Set PUBLIC_APP_STORE_URL in production",
  parentId: p2,
  acceptance: "Wrangler/production env has real App Store URL when listing is live.",
});
createIssue({
  id: "P2.4",
  title: "Product-owner marketing claims sign-off",
  parentId: p2,
  acceptance: "Direction note guardrails reviewed before public announce.",
});

dep("P2.2", "P2.1");
dep("P2.3", "P2.2");
dep("P2.4", "P2.3");

console.log("P2 seeded. bd ready:");
