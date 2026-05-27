#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
const target = process.argv[2] || process.cwd();
const required = ['shipkit.yaml', 'STATE.md'];
let bad = 0;
for (const f of required) {
  if (!fs.existsSync(path.join(target, f))) { console.error(`Missing ${f}`); bad++; }
}
const handoff = path.join(target, 'handoff');
if (!fs.existsSync(handoff)) { console.error('Missing handoff directory'); bad++; }
const trace = path.join(target, 'trace');
if (!fs.existsSync(trace)) { console.error('Missing trace directory'); bad++; }
if (bad) process.exit(1);
console.log('OK: context fabric exists');
