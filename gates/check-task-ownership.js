#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const board = path.join(target, "tasks", "board.yaml");
if (!fs.existsSync(board)) { console.log("Task ownership gate: SKIP (no tasks/board.yaml)"); process.exit(0); }
const text = fs.readFileSync(board, "utf8");
if (/status:\s*(in_progress|in_review|in_test|integration)/.test(text) && !/owner:\s*\S+/.test(text)) {
  console.error("Task ownership gate failed: active tasks must include owner.");
  process.exit(1);
}
console.log("Task ownership gate: PASS");
