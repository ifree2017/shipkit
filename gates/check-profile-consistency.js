#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const file = path.join(target, "shipkit.yaml");

const profiles = {
  "simple-solo": ["docs", "tasks", "handoff", "delivery", "trace", "evidence", ".shipkit/runs", "spec"],
  "simple-team": ["docs", "tasks", "team", "modules", "sync", "reports", "evidence", ".shipkit/runs", "spec"],
  "standard-solo": ["docs", "tasks", "changes", "defects", "refactors", "dependencies", "blockers", "risks", "handoff", "reports", "evidence", "spec", ".shipkit/runs"],
  "standard-team": ["docs", "tasks", "team", "modules", "sync", "reports", "changes", "defects", "refactors", "dependencies", "blockers", "risks", "evidence", "spec", ".shipkit/runs"],
  "complex-team": ["docs", "tasks", "team", "modules", "sync", "reports", "control", "review", "changes", "defects", "refactors", "dependencies", "blockers", "risks", "evidence", "spec", ".shipkit/runs", ".shipkit/approvals"],
  "complex-multi": ["docs", "tasks", "team", "modules", "sync", "reports", "vendors", "approvals", "control", "review", "evidence", "spec", ".shipkit/runs", ".shipkit/approvals"]
};

function readProfile(text) {
  const match = /^\s*profile:\s*([^\n#]+)/m.exec(text || "");
  return match ? match[1].trim().replace(/^['\"]|['\"]$/g, "") : null;
}

if (!fs.existsSync(file)) {
  console.error(`Profile consistency check failed. Missing ${file}`);
  process.exit(1);
}

const text = fs.readFileSync(file, "utf8");
const profile = readProfile(text);
if (!profile || !profiles[profile]) {
  console.error(`Profile consistency check failed. Unknown or missing profile: ${profile || "<missing>"}`);
  console.error(`Supported profiles: ${Object.keys(profiles).join(", ")}`);
  process.exit(1);
}

const missing = [];
for (const dir of profiles[profile]) {
  if (!fs.existsSync(path.join(target, dir))) missing.push(dir);
}

if (missing.length) {
  console.error(`Profile consistency check failed for ${profile}. Missing directories: ${missing.join(", ")}`);
  process.exit(1);
}

console.log(`Profile consistency check passed: ${profile}`);
