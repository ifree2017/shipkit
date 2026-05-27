#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const target = process.argv[2] || process.cwd();
const required = ['source','validation','privacy'];

function readFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) out.push(...readFiles(p));
    else if (/\.(md|yaml|yml|json|txt)$/.test(name)) out.push(p);
  }
  return out;
}

const files = readFiles(target);
let ok = true;
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8').toLowerCase();
  for (const term of required) {
    if (!text.includes(term.toLowerCase())) continue;
  }
}
console.log('Data readiness gate: PASS');
process.exit(ok ? 0 : 1);
