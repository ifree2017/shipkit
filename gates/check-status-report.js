#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const target = process.argv[2] || ".";
function exists(p){ return fs.existsSync(path.join(target,p)); }
function read(p){ try { return fs.readFileSync(path.join(target,p),"utf8"); } catch { return ""; } }
function fail(msg){ console.error(msg); process.exit(1); }
function pass(msg){ console.log(msg); process.exit(0); }

if (!exists("reports/status-report.md")) fail("Missing reports/status-report.md");
const text = read("reports/status-report.md");
const required=["Summary","Module Progress","Workload","Open Risks","Blockers","Decisions Needed"];
const missing=required.filter(x=>!text.includes(x));
if (missing.length) fail(`Status report check failed. Missing sections: ${missing.join(", ")}`);
pass("Status report check passed");
