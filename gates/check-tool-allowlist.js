#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve(process.argv[2] || '.');
const root = fs.existsSync(path.join(target, 'tools')) ? target : process.cwd();
const file = path.join(root, 'tools/tool-policy.yaml');
if (!fs.existsSync(file)) {
  console.error('Missing tools/tool-policy.yaml');
  process.exit(1);
}
const text = fs.readFileSync(file, 'utf8');
const required = ['allowlist_required', 'redlines', 'human_approval', 'evidence'];
const missing = required.filter((needle) => !text.includes(needle));
if (missing.length) {
  console.error('Tool policy missing required concepts:');
  for (const item of missing) console.error(`- ${item}`);
  process.exit(1);
}
console.log('Tool allowlist policy check passed.');
