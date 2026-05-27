#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const target = process.argv[2] || process.cwd();
const requiredPaths = [
  'shipkit.yaml',
  'docs',
  'handoff',
  'trace'
];

const missing = requiredPaths.filter((p) => !fs.existsSync(path.join(target, p)));

if (missing.length) {
  console.error(`Agent legibility check failed. Missing: ${missing.join(', ')}`);
  process.exit(1);
}

console.log('agent-legibility: ok');
