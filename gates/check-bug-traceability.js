#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const target = process.argv[2] || process.cwd();
const defectsDir = path.join(target, 'defects');
let failed = false;

function fail(message) {
  console.error(`FAIL: ${message}`);
  failed = true;
}

if (!fs.existsSync(defectsDir)) {
  console.log('No defects directory found. Nothing to check.');
  process.exit(0);
}

const files = fs.readdirSync(defectsDir).filter((file) => /^BUG-.*\.md$/.test(file));

for (const file of files) {
  const full = path.join(defectsDir, file);
  const text = fs.readFileSync(full, 'utf8');
  const required = [
    'Related Requirement / Module',
    'Expected Result',
    'Actual Result',
    'Reproduction Steps',
    'Severity',
    'Root Cause Hypothesis',
    'Fix Plan',
    'Regression Test Scope',
    'Close Criteria'
  ];
  for (const heading of required) {
    if (!text.includes(heading)) fail(`${file} missing ${heading}`);
  }
}

if (failed) process.exit(1);
console.log(`Checked ${files.length} defect(s).`);
