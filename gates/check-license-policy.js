#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve(process.argv[2] || '.');
const root = fs.existsSync(path.join(target, 'protocol')) ? target : process.cwd();
const required = [
  'protocol/license-policy.yaml',
  'protocol/integration-policy.yaml',
  'integrations/README.md'
];
const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error('Missing license/integration policy files:');
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}
const integrationsDir = path.join(root, 'integrations');
const issues = [];
for (const name of fs.readdirSync(integrationsDir)) {
  const dir = path.join(integrationsDir, name);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const file of ['README.md', 'mapping.yaml', 'import-policy.md', 'trust-policy.md']) {
    if (!fs.existsSync(path.join(dir, file))) issues.push(`${name}/${file}`);
  }
}
if (issues.length) {
  console.error('Integration directories missing required review files:');
  for (const issue of issues) console.error(`- integrations/${issue}`);
  process.exit(1);
}
console.log('License policy check passed.');
