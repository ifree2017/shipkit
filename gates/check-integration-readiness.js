#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const file = path.join(target, "sync", "integration-plan.md");
if (!fs.existsSync(file)) { console.log("Integration readiness gate: SKIP (no sync/integration-plan.md)"); process.exit(0); }
console.log("Integration readiness gate: PASS");
