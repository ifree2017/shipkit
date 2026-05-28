#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const target = process.argv[2] || ".";
function exists(p){ return fs.existsSync(path.join(target,p)); }
function read(p){ try { return fs.readFileSync(path.join(target,p),"utf8"); } catch { return ""; } }
function fail(msg){ console.error(msg); process.exit(1); }
function pass(msg){ console.log(msg); process.exit(0); }

const board = read("tasks/board.yaml");
const taskFiles = exists("tasks") ? fs.readdirSync(path.join(target,"tasks")).filter(f=>/^TASK-.*\.ya?ml$/i.test(f)) : [];
const text = [board, ...taskFiles.map(f=>read(path.join("tasks",f)))].join("\n");
if (!exists("tasks")) fail("Missing tasks/ directory");
if (/status:\s*in_progress/i.test(text) && !/owner:\s*[^\s]/i.test(text)) fail("In-progress task without owner");
pass("Task ownership check passed");
