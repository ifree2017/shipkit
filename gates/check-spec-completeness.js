#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve(process.argv[2] || '.');
const specDir = path.join(target, 'spec');
if (!fs.existsSync(specDir)) {
  console.error('Missing spec/ directory. Run or create ShipKit spec layer before release/test gates.');
  process.exit(1);
}
const recommended = ['requirements.yaml', 'acceptance.yaml'];
const missing = recommended.filter((file) => !fs.existsSync(path.join(specDir, file)));
if (missing.length) {
  console.error('Missing recommended spec files:');
  for (const file of missing) console.error(`- spec/${file}`);
  process.exit(1);
}
console.log('Spec completeness check passed.');
