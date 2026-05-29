#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const candidates = [
  "docs/07-test/acceptance-matrix.md",
  "docs/06-qa-uat/acceptance-matrix.md",
  "docs/02-scope/acceptance-criteria.md"
];
const file = candidates.map(p => path.join(target, p)).find(fs.existsSync);
if (!file) {
  console.error("Acceptance matrix check failed. Missing acceptance matrix or acceptance criteria document.");
  process.exit(1);
}
const text = fs.readFileSync(file, "utf8");
const required = [/module|模块/i, /feature|功能|requirement|需求/i, /acceptance|验收/i, /test|测试/i, /evidence|证据/i];
const missing = required.filter(rx => !rx.test(text));
if (missing.length) {
  console.error(`Acceptance matrix check failed. Missing ${missing.length} required dimensions.`);
  process.exit(1);
}
console.log("Acceptance matrix check passed");
