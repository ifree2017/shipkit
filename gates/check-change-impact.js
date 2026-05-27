#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2] || process.cwd();
const changesDir = path.join(target, 'changes');
let failed = false;

function fail(message) {
  console.error(`FAIL: ${message}`);
  failed = true;
}

if (!fs.existsSync(changesDir)) {
  console.log('No changes directory found. Nothing to check.');
  process.exit(0);
}

const files = fs.readdirSync(changesDir).filter((file) => /^CR-.*\.md$/.test(file));

for (const file of files) {
  const full = path.join(changesDir, file);
  const text = fs.readFileSync(full, 'utf8');
  const required = [
    'Original Scope Reference',
    'Business Reason',
    'Scope Impact',
    'PRD Impact',
    'Architecture Impact',
    'Timeline / Plan Impact',
    'Test / Acceptance Impact',
    'Quote / Contract Impact',
    'Recommendation',
    'Decision'
  ];
  for (const heading of required) {
    if (!text.includes(heading)) fail(`${file} missing ${heading}`);
  }
}

if (failed) process.exit(1);
console.log(`Checked ${files.length} change request(s).`);
