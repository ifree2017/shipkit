#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const target = process.argv[2] || process.cwd();
const candidates = [
  'AGENTS.md',
  'CLAUDE.md',
  '.cursor/rules',
  'hermes.profile.md'
];

const found = candidates.filter((p) => fs.existsSync(path.join(target, p)));

if (!found.length) {
  console.error('No known platform instruction entry found. Expected AGENTS.md, CLAUDE.md, .cursor/rules, or hermes.profile.md');
  process.exit(1);
}

console.log(`platform-capabilities: ok (${found.join(', ')})`);
