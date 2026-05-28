#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const file = path.join(target, "reports", "status-report.md");
if (!fs.existsSync(file)) { console.log("Status report gate: SKIP (no reports/status-report.md)"); process.exit(0); }
const text = fs.readFileSync(file, "utf8");
const required = ["Summary"];
const missing = required.filter((marker) => !text.includes(marker));
if (missing.length) { console.error(`Status report gate failed. Missing: ${missing.join(", ")}`); process.exit(1); }
console.log("Status report gate: PASS");
