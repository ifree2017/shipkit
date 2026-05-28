#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const target = process.argv[2] || ".";
function exists(p){ return fs.existsSync(path.join(target,p)); }
function read(p){ try { return fs.readFileSync(path.join(target,p),"utf8"); } catch { return ""; } }
function fail(msg){ console.error(msg); process.exit(1); }
function pass(msg){ console.log(msg); process.exit(0); }

if (!exists("tasks")) fail("Missing tasks/ directory");
const taskFiles = fs.readdirSync(path.join(target,"tasks")).filter(f=>/^TASK-.*\.ya?ml$/i.test(f));
const board = read("tasks/board.yaml");
const text = [board, ...taskFiles.map(f=>read(path.join("tasks",f)))].join("\n");
if (!text.trim() || /tasks:\s*\[\]/.test(board)) { console.log("No tasks defined yet"); process.exit(0); }
const missing = [];
if (!/module:\s*[^\s]/i.test(text) && !/module:/i.test(board)) missing.push("module");
if (!/related_requirement:\s*[^\s]/i.test(text) && !/requirement/i.test(board)) missing.push("requirement");
if (!/acceptance:\s*[^\n]/i.test(text) && !/acceptance/i.test(board)) missing.push("acceptance");
if (missing.length) fail(`Task traceability check failed. Missing hints: ${missing.join(", ")}`);
pass("Task traceability check passed");
