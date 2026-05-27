#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const target = process.argv[2] || process.cwd();
const file = path.join(target, 'control', 'quality-scorecard.md');
const required = [
  'Scope clarity',
  'Traceability',
  'Architecture integrity',
  'Correctness',
  'Security',
  'Client document safety',
  'Agent legibility'
];

if (!fs.existsSync(file)) {
  console.error('Missing control/quality-scorecard.md');
  process.exit(1);
}

const text = fs.readFileSync(file, 'utf8');
const missing = required.filter((item) => !text.includes(item));

if (missing.length) {
  console.error(`Quality scorecard missing dimensions: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('quality-scorecard: ok');
