#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const target = process.argv[2] || ".";
function exists(p){ return fs.existsSync(path.join(target,p)); }
function read(p){ try { return fs.readFileSync(path.join(target,p),"utf8"); } catch { return ""; } }
function fail(msg){ console.error(msg); process.exit(1); }
function pass(msg){ console.log(msg); process.exit(0); }

if (!exists("modules/module-map.yaml")) fail("Missing modules/module-map.yaml");
const text = read("modules/module-map.yaml");
if (/modules:\s*\[\]/.test(text)) { console.log("No modules defined yet"); process.exit(0); }
const missing=[];
if (!/owner:/i.test(text)) missing.push("owner");
if (!/status:/i.test(text)) missing.push("status");
if (!/progress:/i.test(text)) missing.push("progress");
if (missing.length) fail(`Module progress check failed. Missing: ${missing.join(", ")}`);
pass("Module progress check passed");
