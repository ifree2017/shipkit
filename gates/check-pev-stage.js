#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const target = process.argv.includes('--project') ? process.argv[process.argv.indexOf('--project') + 1] : (process.argv.includes('--to') ? process.argv[process.argv.indexOf('--to') + 1] : process.cwd());
const root = path.resolve(target.replace(/^~/, process.env.HOME || ''));
const handoffDir = path.join(root, 'handoff');
const required = ['Plan', 'Execute', 'Verify', 'Handoff'];
let failures = [];
if (!fs.existsSync(handoffDir)) failures.push('Missing handoff/ directory.');
else {
  const files = fs.readdirSync(handoffDir).filter(f => f.endsWith('.md'));
  if (files.length === 0) failures.push('No handoff markdown files found.');
  for (const file of files) {
    const text = fs.readFileSync(path.join(handoffDir, file), 'utf8');
    for (const section of required) {
      if (!new RegExp(`^#+\\s*${section}\\b`, 'mi').test(text)) failures.push(`${file} missing ${section} section.`);
    }
  }
}
if (failures.length) {
  console.error(JSON.stringify({ gate: 'pev-stage', status: 'fail', failures }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ gate: 'pev-stage', status: 'pass' }, null, 2));
