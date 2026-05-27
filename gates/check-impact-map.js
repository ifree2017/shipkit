#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve(process.argv[2] || '.');
const jsonFile = path.join(target, 'evidence/impact/impact-map.json');
const mdFile = path.join(target, 'evidence/impact/impact-report.md');
if (!fs.existsSync(jsonFile) && !fs.existsSync(mdFile)) {
  console.error('Missing impact evidence. Expected evidence/impact/impact-map.json or evidence/impact/impact-report.md');
  process.exit(1);
}
if (fs.existsSync(jsonFile)) {
  try {
    const parsed = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
    const required = ['trigger', 'affected', 'tests', 'recommendation'];
    const missing = required.filter((key) => !(key in parsed));
    if (missing.length) {
      console.error('Impact map missing required keys: ' + missing.join(', '));
      process.exit(1);
    }
  } catch (err) {
    console.error('Invalid evidence/impact/impact-map.json');
    console.error(err.message);
    process.exit(1);
  }
}
console.log('Impact map check passed.');
