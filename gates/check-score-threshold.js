#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const target = path.resolve(process.argv[2] || ".");
function has(rel) { return fs.existsSync(path.join(target, rel)); }
let score = 0;
if (has("shipkit.yaml")) score += 15;
if (has("STATE.md")) score += 10;
if (has("trace/trace-map.md")) score += 15;
if (has("tasks/board.yaml") || has("tasks")) score += 10;
if (has("evidence")) score += 10;
if (has("handoff")) score += 10;
if (has("delivery") || has("docs/09-delivery")) score += 10;
if (has("audit")) score += 10;
if (has("spec/acceptance.yaml")) score += 10;
console.log(`ShipKit score-threshold estimate: ${score}/100`);
if (score < 60) {
  console.error("Score threshold failed: project appears too incomplete.");
  process.exit(1);
}
