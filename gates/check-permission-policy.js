#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
const target = process.argv.includes('--project') ? process.argv[process.argv.indexOf('--project') + 1] : (process.argv.includes('--to') ? process.argv[process.argv.indexOf('--to') + 1] : process.cwd());
const root = path.resolve(target.replace(/^~/, process.env.HOME || ''));
const candidates = [path.join(root, 'protocol', 'permissions.yaml'), path.join(root, 'tools', 'tool-policy.yaml'), path.join(root, 'protocol', 'toolmap.yaml')];
const exists = candidates.filter(fs.existsSync);
if (exists.length === 0) {
  console.error(JSON.stringify({ gate: 'permission-policy', status: 'fail', failures: ['No permission policy found in protocol/ or tools/.'] }, null, 2));
  process.exit(1);
}
console.log(JSON.stringify({ gate: 'permission-policy', status: 'pass', files: exists.map(f => path.relative(root, f)) }, null, 2));
