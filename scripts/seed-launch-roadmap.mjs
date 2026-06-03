#!/usr/bin/env node
/**
 * Seed beads issues for Reader-first launch roadmap (M0–M8).
 * Run: node scripts/seed-launch-roadmap.mjs
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = join(root, "openspec/tracking/launch-roadmap.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const idToBead = new Map();

function sh(cmd) {
  const out = execSync(cmd, { cwd: root, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
  return out.trim();
}

function createIssue({
  id,
  title,
  type = "task",
  parentId,
  labels = [],
  description = "",
  acceptance = "",
  blockedBy = [],
}) {
  const labelStr = labels.length ? `-l ${labels.map((l) => `"${l}"`).join(",")}` : "";
  const parentStr = parentId ? `--parent ${parentId}` : "";
  const desc = [description, acceptance ? `**Acceptance:** ${acceptance}` : ""]
    .filter(Boolean)
    .join("\n\n");
  const descArg = desc ? `-d ${JSON.stringify(desc)}` : "";
  const blockedStr = blockedBy.length
    ? `--deps ${blockedBy.map((b) => `blocks:${b}`).join(",")}`
    : "";
  const cmd =
    `bd create ${JSON.stringify(`[${id}] ${title}`)} -t ${type} ${labelStr} ${parentStr} ${descArg} ${blockedStr}`.replace(
      /\s+/g,
      " ",
    );
  const out = sh(cmd);
  const match = out.match(/(cardmaniacs-website-[a-z0-9]+)/);
  if (!match) throw new Error(`Failed to parse bead id from: ${out}`);
  idToBead.set(id, match[1]);
  return match[1];
}

console.log("Seeding launch roadmap into beads…\n");

for (const milestone of manifest.milestones) {
  const milestoneBead = createIssue({
    id: milestone.id,
    title: milestone.title,
    type: "epic",
    labels: [`milestone:${milestone.id}`, ...(milestone.labels ?? [])],
    description: milestone.description ?? "",
  });

  for (const section of milestone.sections ?? []) {
    const sectionBead = section.epic
      ? createIssue({
          id: section.id,
          title: section.title,
          type: "epic",
          parentId: milestoneBead,
          labels: [`milestone:${milestone.id}`, ...(section.labels ?? [])],
          description: section.description ?? "",
        })
      : null;

    const parentForLeaves = sectionBead ?? milestoneBead;

    for (const task of section.tasks ?? []) {
      createIssue({
        id: task.id,
        title: task.title,
        parentId: parentForLeaves,
        labels: [`milestone:${milestone.id}`, ...(task.labels ?? [])],
        description: task.description ?? "",
        acceptance: task.acceptance ?? "",
        blockedBy: (task.blockedBy ?? []).map((bid) => idToBead.get(bid)).filter(Boolean),
      });
    }
  }
}

console.log(`\nDone. Created ${idToBead.size} tracked ids.`);
console.log("Next: bd linear sync --push --team 958598e9-96b9-43d2-8cdd-98a81cd47bb5");
