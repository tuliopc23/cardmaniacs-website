#!/usr/bin/env node
/**
 * Create Linear issues from launch-roadmap.json + link beads external_ref.
 * Requires LINEAR_API_KEY. Resumable (skips titles already in project).
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const API_KEY = process.env.LINEAR_API_KEY;
const TEAM_ID = "958598e9-96b9-43d2-8cdd-98a81cd47bb5";
const PROJECT_ID = "2e2fbc83-93d3-4b0d-81b0-8212667ef20c";
const MILESTONES = {
  M0: "M0: Source-of-truth alignment",
  M1: "M1: Remove launch-grade embarrassment",
  M2: "M2: Reader design system (web)",
  M3: "M3: Homepage product loop",
  M4: "M4: Features product encyclopedia",
  M5: "M5: Editorial Reader surfaces",
  M6: "M6: Screenshot asset system",
  M7: "M7: Content hardening",
  M8: "M8: QA and acceptance",
};

if (!API_KEY) {
  console.error("LINEAR_API_KEY required");
  process.exit(1);
}

async function gql(query, variables) {
  const res = await fetch("https://api.linear.app/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

const CREATE = `
mutation($input: IssueCreateInput!) {
  issueCreate(input: $input) {
    success
    issue { id identifier url }
  }
}`;

const PROJECT_ISSUES = `
query($id: String!, $after: String) {
  project(id: $id) {
    issues(first: 100, after: $after) {
      nodes { id title identifier url }
      pageInfo { hasNextPage endCursor }
    }
  }
}`;

async function loadExistingTitles() {
  const titles = new Map();
  let after = null;
  do {
    const data = await gql(PROJECT_ISSUES, { id: PROJECT_ID, after });
    const conn = data.project.issues;
    for (const n of conn.nodes) titles.set(n.title, n);
    after = conn.pageInfo.hasNextPage ? conn.pageInfo.endCursor : null;
  } while (after);
  return titles;
}

function loadBeads() {
  const lines = readFileSync(join(root, ".beads/issues.jsonl"), "utf8").trim().split("\n");
  return lines.map((l) => JSON.parse(l));
}

function saveBeads(issues) {
  writeFileSync(
    join(root, ".beads/issues.jsonl"),
    issues.map((i) => JSON.stringify(i)).join("\n") + "\n",
  );
}

function findBead(beads, roadmapId) {
  return beads.find((b) => b.title.startsWith(`[${roadmapId}]`));
}

async function createIssue({ title, description, parentId, milestoneName: _milestoneName }) {
  const input = {
    teamId: TEAM_ID,
    projectId: PROJECT_ID,
    title,
    description: description || "",
  };
  if (parentId) input.parentId = parentId;
  const data = await gql(CREATE, { input });
  if (!data.issueCreate.success) throw new Error(`create failed: ${title}`);
  return data.issueCreate.issue;
}

async function main() {
  const manifest = JSON.parse(
    readFileSync(join(root, "openspec/tracking/launch-roadmap.json"), "utf8"),
  );
  const existing = await loadExistingTitles();
  let beads = loadBeads();
  const linearIdByRoadmap = new Map();

  console.log(`Existing Linear issues in project: ${existing.size}`);

  for (const ms of manifest.milestones) {
    const msTitle = `[${ms.id}] ${ms.title}`;
    let msIssue = existing.get(msTitle);
    if (!msIssue) {
      msIssue = await createIssue({
        title: msTitle,
        description: `${ms.description || ""}\n\n**Milestone:** ${MILESTONES[ms.id] || ms.id}\n**OpenSpec ID:** ${ms.id}`,
      });
      existing.set(msTitle, msIssue);
      console.log(`+ epic ${msIssue.identifier} ${msTitle}`);
      await new Promise((r) => setTimeout(r, 200));
    }
    linearIdByRoadmap.set(ms.id, msIssue.id);

    const beadMs = findBead(beads, ms.id);
    if (beadMs && !beadMs.external_ref) {
      beadMs.external_ref = msIssue.url;
    }

    for (const sec of ms.sections ?? []) {
      const secTitle = `[${sec.id}] ${sec.title}`;
      let secIssue = existing.get(secTitle);
      if (!secIssue && sec.epic) {
        secIssue = await createIssue({
          title: secTitle,
          description: `**OpenSpec ID:** ${sec.id}\n${sec.description || ""}`,
          parentId: msIssue.id,
        });
        existing.set(secTitle, secIssue);
        console.log(`  + ${secIssue.identifier} ${secTitle}`);
        await new Promise((r) => setTimeout(r, 150));
      }
      if (secIssue) linearIdByRoadmap.set(sec.id, secIssue.id);

      const secBead = findBead(beads, sec.id);
      if (secBead && secIssue && !secBead.external_ref) secBead.external_ref = secIssue.url;

      const parentLinear = secIssue?.id ?? msIssue.id;
      for (const task of sec.tasks ?? []) {
        const taskTitle = `[${task.id}] ${task.title}`;
        if (existing.has(taskTitle)) continue;
        const desc = [
          `**OpenSpec ID:** ${task.id}`,
          task.description || "",
          task.acceptance ? `**Acceptance:** ${task.acceptance}` : "",
        ]
          .filter(Boolean)
          .join("\n\n");
        const taskIssue = await createIssue({
          title: taskTitle,
          description: desc,
          parentId: parentLinear,
        });
        existing.set(taskTitle, taskIssue);
        const bead = findBead(beads, task.id);
        if (bead) bead.external_ref = taskIssue.url;
        if (existing.size % 20 === 0) console.log(`  … ${taskIssue.identifier}`);
        await new Promise((r) => setTimeout(r, 120));
      }
    }
  }

  saveBeads(beads);
  console.log(`\nDone. Project issues: ${existing.size}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
