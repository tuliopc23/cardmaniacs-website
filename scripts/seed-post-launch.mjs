#!/usr/bin/env node
/**
 * Seed P1 Ship gate beads (post M0–M8 launch).
 * Run: node scripts/seed-post-launch.mjs
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

function createIssue({ id, title, type = "task", parentId, labels = [], acceptance = "" }) {
  if (idToBead.has(id)) {
    console.log(`skip exists: [${id}]`);
    return idToBead.get(id);
  }
  const labelStr = labels.length ? `-l ${labels.map((l) => `"${l}"`).join(",")}` : "";
  const parentStr = parentId ? `--parent ${parentId}` : "";
  const descArg = acceptance ? `-d ${JSON.stringify(`**Acceptance:** ${acceptance}`)}` : "";
  const cmd =
    `bd create ${JSON.stringify(`[${id}] ${title}`)} -t ${type} ${labelStr} ${parentStr} ${descArg}`.replace(
      /\s+/g,
      " ",
    );
  const out = sh(cmd);
  const match = out.match(/(cardmaniacs-website-[a-z0-9.]+)/);
  if (!match) throw new Error(`Failed to parse bead id from: ${out}`);
  idToBead.set(id, match[1]);
  return match[1];
}

function dep(childRoadmapId, blockerRoadmapId) {
  const child = idToBead.get(childRoadmapId);
  const blocker = idToBead.get(blockerRoadmapId);
  if (!child || !blocker) return;
  try {
    sh(`bd dep add ${child} ${blocker} --type blocks`);
    console.log(`blocks: ${blockerRoadmapId} → ${childRoadmapId}`);
  } catch (e) {
    const msg = e.stderr?.toString() || e.message;
    if (!msg.includes("already") && !msg.includes("exists")) console.error(msg);
  }
}

console.log("Seeding P1 Ship gate into beads…\n");
loadExisting();

const p1 = createIssue({
  id: "P1",
  title: "Ship gate & hardening",
  type: "epic",
  labels: ["milestone:P1", "area:ship-gate"],
  acceptance: "CI green, committed launch work, guardrails, visual QA, OpenSpec archived.",
});

createIssue({
  id: "P1.1.1",
  title: "ThemeToggle window.cmSyncThemeColor typing",
  parentId: p1,
  labels: ["milestone:P1"],
  acceptance: "astro check clean in frontend/.",
});

createIssue({
  id: "P1.1.2",
  title: "Root script lint fixes",
  parentId: p1,
  labels: ["milestone:P1"],
  acceptance: "No eslint no-unused-vars in scripts/linear-sync and push-beads.",
});

createIssue({
  id: "P1.1.3",
  title: "Run vp test and document in ship report",
  parentId: p1,
  labels: ["milestone:P1"],
  acceptance: "vp check and vp test pass; M8.12 row updated in ship report.",
});

createIssue({
  id: "P1.2",
  title: "Commit launch implementation",
  parentId: p1,
  labels: ["milestone:P1"],
  acceptance: "Launch work committed; PR open or merged.",
});

createIssue({
  id: "P1.3",
  title: "CMS copy guardrail pass",
  parentId: p1,
  labels: ["milestone:P1"],
  acceptance: "Markdoc aligned with reader-first-launch-direction guardrails.",
});

createIssue({
  id: "P1.3.1",
  title: "getting-started share extension copy",
  parentId: idToBead.get("P1.3"),
  labels: ["milestone:P1"],
  acceptance: "Safari web extension only if shipped; else planned wording.",
});

createIssue({
  id: "P1.3.2",
  title: "initial-release changelog share extension",
  parentId: idToBead.get("P1.3"),
  labels: ["milestone:P1"],
  acceptance: "Same guardrail as getting-started.",
});

createIssue({
  id: "P1.3.3",
  title: "why-native-over-electron Handoff line",
  parentId: idToBead.get("P1.3"),
  labels: ["milestone:P1"],
  acceptance: "Qualify or remove unverified Handoff/Spotlight claims.",
});

createIssue({
  id: "P1.4",
  title: "Visual QA pass",
  parentId: p1,
  labels: ["milestone:P1"],
  acceptance: "Home, features, blog, pricing checked; feeds uses triage surface.",
});

createIssue({
  id: "P1.4.1",
  title: "Homepage feeds MarketingTriageSurface",
  parentId: idToBead.get("P1.4"),
  labels: ["milestone:P1"],
  acceptance: "LaunchStory feeds section uses MarketingTriageSurface.",
});

createIssue({
  id: "P1.5",
  title: "Archive OpenSpec change",
  parentId: p1,
  labels: ["milestone:P1"],
  acceptance: "openspec verify + archive reader-first-launch-redesign.",
});

createIssue({
  id: "P1.6",
  title: "Marketing asset wire-up",
  parentId: p1,
  labels: ["milestone:P1"],
  acceptance: "Named slots populated with stable Mac PNG paths.",
});

// Task-only blocks deps
dep("P1.2", "P1.1.1");
dep("P1.2", "P1.1.2");
dep("P1.2", "P1.1.3");
dep("P1.3", "P1.2");
dep("P1.4", "P1.2");
dep("P1.6", "P1.2");
dep("P1.5", "P1.3");
dep("P1.5", "P1.4");

console.log(`\nDone. P1 ids: ${[...idToBead.keys()].filter((k) => k.startsWith("P1")).length}`);
console.log("Run: bd ready");
