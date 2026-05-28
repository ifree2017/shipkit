#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const target = process.argv[2] || ".";
function exists(p){ return fs.existsSync(path.join(target,p)); }
function read(p){ try { return fs.readFileSync(path.join(target,p),"utf8"); } catch { return ""; } }
function fail(msg){ console.error(msg); process.exit(1); }
function pass(msg){ console.log(msg); process.exit(0); }

const required=["sync/integration-plan.md","sync/integration-log.md","modules/module-map.yaml"];
const missing=required.filter(p=>!exists(p));
if (missing.length) fail(`Integration readiness check failed. Missing: ${missing.join(", ")}`);
const plan=read("sync/integration-plan.md");
if (/TBD/i.test(plan)) { console.log("Integration readiness warning: plan still contains TBD"); process.exit(0); }
pass("Integration readiness check passed");
