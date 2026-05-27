#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2] || process.cwd();
const refactorsDir = path.join(target, 'refactors');
let failed = false;

function fail(message) {
  console.error(`FAIL: ${message}`);
  failed = true;
}

if (!fs.existsSync(refactorsDir)) {
  console.log('No refactors directory found. Nothing to check.');
  process.exit(0);
}

const files = fs.readdirSync(refactorsDir).filter((file) => /^RF-.*\.md$/.test(file));

for (const file of files) {
  const full = path.join(refactorsDir, file);
  const text = fs.readFileSync(full, 'utf8');
  const required = [
    'Affected Modules',
    'Reason',
    'Risk If Not Done',
    'Risk If Done',
    'Scope Impact',
    'Timeline Impact',
    'Public Behavior Impact',
    'API Contract Impact',
    'Data Migration Impact',
    'Test Impact',
    'Rollback Plan',
    'Approval Required'
  ];
  for (const heading of required) {
    if (!text.includes(heading)) fail(`${file} missing ${heading}`);
  }
}

if (failed) process.exit(1);
console.log(`Checked ${files.length} refactor proposal(s).`);
