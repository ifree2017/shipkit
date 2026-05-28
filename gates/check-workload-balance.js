#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const file = path.join(target, "team", "workload.yaml");
if (!fs.existsSync(file)) { console.log("Workload balance gate: SKIP (no team/workload.yaml)"); process.exit(0); }
const text = fs.readFileSync(file, "utf8");
if (/load:\s*(1[2-9][0-9]|[2-9][0-9]{2,})%?/.test(text)) {
  console.error("Workload balance gate failed: one or more members appear overloaded.");
  process.exit(1);
}
console.log("Workload balance gate: PASS");
