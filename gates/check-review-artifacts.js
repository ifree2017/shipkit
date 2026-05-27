#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
const target = process.argv[2] || process.cwd();
const reviewDir = path.join(target, 'review');
const evidenceDir = path.join(target, 'evidence');
if (!fs.existsSync(reviewDir)) {
  console.error('Missing review directory');
  process.exit(1);
}
const reports = fs.readdirSync(reviewDir).filter(f => f.endsWith('.md') || f.endsWith('.json'));
if (reports.length === 0) {
  console.error('No review reports found');
  process.exit(1);
}
if (!fs.existsSync(evidenceDir)) {
  console.error('Missing evidence directory');
  process.exit(1);
}
console.log('OK: review reports and evidence directory exist');
