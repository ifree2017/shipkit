#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const root = process.argv[2] || process.cwd();
const required = [
  'integrations/external-priority.yaml',
  'integrations/EXTERNAL_PRIORITY.md',
  'docs/EXTERNAL_INTEGRATION_DECISIONS.md',
  'protocol/source-vetting.yaml',
  'templates/source-vet-report.md'
];

const missing = required.filter((p) => !fs.existsSync(path.join(root, p)));

if (missing.length) {
  console.error('External priority check failed. Missing:');
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}

console.log('External priority check passed.');
