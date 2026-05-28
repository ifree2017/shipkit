#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const target = process.argv[2] || ".";
function exists(p){ return fs.existsSync(path.join(target,p)); }
function read(p){ try { return fs.readFileSync(path.join(target,p),"utf8"); } catch { return ""; } }
function fail(msg){ console.error(msg); process.exit(1); }
function pass(msg){ console.log(msg); process.exit(0); }

if (!exists("team/workload.yaml")) fail("Missing team/workload.yaml");
const text = read("team/workload.yaml");
if (/load:\s*(1[1-9][0-9]|[2-9][0-9]{2,})%/i.test(text) || /risk:\s*overloaded/i.test(text)) fail("Workload balance check failed: overloaded member detected");
pass("Workload balance check passed");
