#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
const target = process.argv[2] || process.cwd();
const file = path.join(target, 'STATE.md');
if (!fs.existsSync(file)) {
  console.error('Missing STATE.md');
  process.exit(1);
}
const text = fs.readFileSync(file, 'utf8');
const required = ['Current goal','Confirmed scope','Open questions','Open blockers','Key decisions','Next actions'];
const missing = required.filter(x => !text.toLowerCase().includes(x.toLowerCase()));
if (missing.length) {
  console.error('STATE.md missing sections: ' + missing.join(', '));
  process.exit(1);
}
console.log('OK: STATE.md has required sections');
