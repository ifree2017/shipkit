#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const root = process.argv[2] || process.cwd();
const required = [
  'protocol/source-vetting.yaml',
  'templates/source-vet-report.md',
  'skills/source-vet/SKILL.md',
  'integrations'
];
const missing = required.filter((p) => !fs.existsSync(path.join(root, p)));
if (missing.length) {
  console.error('Source vet check failed. Missing:');
  for (const p of missing) console.error(`- ${p}`);
  process.exit(1);
}
console.log('Source vet check passed.');
