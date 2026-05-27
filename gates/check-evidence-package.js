#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
const target = process.argv.includes('--project') ? process.argv[process.argv.indexOf('--project') + 1] : (process.argv.includes('--to') ? process.argv[process.argv.indexOf('--to') + 1] : process.cwd());
const root = path.resolve(target.replace(/^~/, process.env.HOME || ''));
const evidence = path.join(root, 'evidence');
const failures = [];
if (!fs.existsSync(evidence)) failures.push('Missing evidence/ directory.');
else {
  const files = fs.readdirSync(evidence, { recursive: true });
  if (!files.length) failures.push('evidence/ directory is empty.');
}
if (failures.length) {
  console.error(JSON.stringify({ gate: 'evidence-package', status: 'fail', failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ gate: 'evidence-package', status: 'pass' }, null, 2));
