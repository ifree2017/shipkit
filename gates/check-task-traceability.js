#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const board = path.join(target, "tasks", "board.yaml");
if (!fs.existsSync(board)) { console.log("Task traceability gate: SKIP (no tasks/board.yaml)"); process.exit(0); }
const text = fs.readFileSync(board, "utf8");
if (/id:\s*TASK-/i.test(text)) {
  const required = ["module:", "owner:", "status:"];
  const missing = required.filter((marker) => !text.includes(marker));
  if (missing.length) {
    console.error(`Task traceability gate failed. Missing markers: ${missing.join(", ")}`);
    process.exit(1);
  }
}
console.log("Task traceability gate: PASS");
