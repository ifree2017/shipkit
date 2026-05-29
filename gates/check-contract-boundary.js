#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const file = path.join(target, "docs/03-quote-contract/contract-checklist.md");
if (!fs.existsSync(file)) {
  console.error("Contract boundary check failed. Missing docs/03-quote-contract/contract-checklist.md");
  process.exit(1);
}
const text = fs.readFileSync(file, "utf8");
const required = [
  /deliverable|交付物/i,
  /acceptance|验收/i,
  /timeline|milestone|时间|里程碑/i,
  /change|变更/i,
  /risk|风险/i,
  /dependency|third[- ]party|依赖|第三方/i,
  /termination|终止/i,
  /legal|法务|法律/i
];
const missing = required.filter(rx => !rx.test(text));
if (missing.length) {
  console.error(`Contract boundary check failed. Missing ${missing.length} boundary dimensions.`);
  process.exit(1);
}
console.log("Contract boundary check passed");
