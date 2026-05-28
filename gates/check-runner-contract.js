#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = process.argv[2] || process.cwd();
const required = [
  'protocol/runner-contract.yaml',
  'skills/runner-vet/SKILL.md',
  'templates/runner-vet-report.md'
];
const missing = required.filter((p) => !fs.existsSync(path.join(root, p)));
if (missing.length) {
  console.error('Runner contract check failed. Missing:');
  for (const p of missing) console.error(`- ${p}`);
  process.exit(1);
}
console.log('Runner contract check passed.');
