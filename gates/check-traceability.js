#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const target = process.argv[2] || process.cwd();
const tracePath = path.join(target, 'trace', 'trace-map.md');
const deliveryPath = path.join(target, 'docs', '09-delivery');

let ok = true;
const errors = [];

if (!fs.existsSync(tracePath)) {
  ok = false;
  errors.push('Missing trace/trace-map.md');
} else {
  const text = fs.readFileSync(tracePath, 'utf8');
  const redFlags = ['REQ-0001 | MOD-0001 |  |', 'draft |'];
  for (const flag of redFlags) {
    if (text.includes(flag)) {
      errors.push(`Trace map appears incomplete: ${flag}`);
      ok = false;
    }
  }
}

if (fs.existsSync(deliveryPath) && !fs.existsSync(tracePath)) {
  ok = false;
  errors.push('Delivery exists but trace map is missing.');
}

if (!ok) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('traceability: ok');
