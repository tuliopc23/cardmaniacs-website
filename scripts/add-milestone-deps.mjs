#!/usr/bin/env node
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const epics = {
  M0: "cardmaniacs-website-qx6",
  M1: "cardmaniacs-website-2yp",
  M2: "cardmaniacs-website-cmn",
  M3: "cardmaniacs-website-jpt",
  M4: "cardmaniacs-website-tjw",
  M5: "cardmaniacs-website-tcz",
  M6: "cardmaniacs-website-xn3",
  M7: "cardmaniacs-website-xj9",
  M8: "cardmaniacs-website-4sq",
};

/** child is blocked until blocker completes */
function block(child, blocker) {
  try {
    execSync(`bd dep add ${child} ${blocker} --type blocks`, { cwd: root, stdio: "pipe" });
    console.log(`blocks: ${blocker} → ${child}`);
  } catch (e) {
    const msg = e.stderr?.toString() || e.message;
    if (msg.includes("already") || msg.includes("exists"))
      console.log(`skip (exists): ${blocker} → ${child}`);
    else console.error(`fail: ${blocker} → ${child}`, msg);
  }
}

block(epics.M1, epics.M0);
block(epics.M2, epics.M1);
block(epics.M3, epics.M2);
block(epics.M4, epics.M2);
block(epics.M5, epics.M2);
block(epics.M6, epics.M1);
block(epics.M7, epics.M3);
block(epics.M7, epics.M4);
block(epics.M8, epics.M7);
block(epics.M8, epics.M2);
