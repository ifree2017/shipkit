#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
const target = process.argv[2] || process.cwd();
const dir = path.join(target, 'tasks');
if (!fs.existsSync(dir)) {
  console.log('OK: no tasks directory');
  process.exit(0);
}
let bad = 0;
for (const name of fs.readdirSync(dir)) {
  if (!name.endsWith('.json')) continue;
  const file = path.join(dir, name);
  let task;
  try { task = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { console.error(`Invalid JSON: ${file}`); bad++; continue; }
  for (const k of ['id','type','title','description','status','priority']) {
    if (!(k in task)) { console.error(`${file} missing ${k}`); bad++; }
  }
  if (task.status === 'completed') {
    if (!task.result) { console.error(`${file} completed without result`); bad++; }
    if (!Array.isArray(task.produced_artifacts) || task.produced_artifacts.length === 0) {
      console.error(`${file} completed without produced_artifacts`); bad++;
    }
    if (!Array.isArray(task.verification) || task.verification.length === 0) {
      console.error(`${file} completed without verification`); bad++;
    }
  }
}
if (bad) process.exit(1);
console.log('OK: task registry checks passed');
