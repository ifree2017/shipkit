#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve(process.argv[2] || '.');
const evidence = path.join(target, 'evidence/spec/spec-diff.md');
const drift = path.join(target, 'evidence/spec/spec-drift.json');
const specDir = path.join(target, 'spec');
if (!fs.existsSync(specDir)) {
  console.error('Missing spec/ directory.');
  process.exit(1);
}
if (!fs.existsSync(evidence) && !fs.existsSync(drift)) {
  console.error('Missing spec drift evidence. Expected evidence/spec/spec-diff.md or evidence/spec/spec-drift.json');
  process.exit(1);
}
console.log('Spec drift evidence check passed.');
