#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const target = process.argv[2] || process.cwd();
const file = path.join(target, 'control', 'control-report.md');
const required = [
  'Current State',
  'Expected State',
  'Deviation',
  'Corrective Action',
  'Verification Evidence'
];

if (!fs.existsSync(file)) {
  console.error('Missing control/control-report.md');
  process.exit(1);
}

const text = fs.readFileSync(file, 'utf8');
const missing = required.filter((item) => !text.includes(item));

if (missing.length) {
  console.error(`Control report missing sections: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('control-loop: ok');
