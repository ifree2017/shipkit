#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const target = process.argv[2] || process.cwd();
const file = path.join(target, 'control', 'gate-result.md');

if (!fs.existsSync(file)) {
  console.error('Missing control/gate-result.md');
  process.exit(1);
}

const text = fs.readFileSync(file, 'utf8');
const risky = [
  'final_quote',
  'contract_boundary',
  'production_release',
  'data_migration',
  'client_facing_documents'
];

const requiresApproval = risky.some((word) => text.includes(word));
const hasApproval = text.includes('Human Approval') || text.includes('Required Human Approval');

if (requiresApproval && !hasApproval) {
  console.error('Gate references high-risk action but does not include human approval section.');
  process.exit(1);
}

console.log('human-approval: ok');
