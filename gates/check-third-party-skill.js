#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const target = path.resolve(process.argv[2] || '.');
const root = fs.existsSync(path.join(target, 'integrations')) ? target : process.cwd();
const integrationsDir = path.join(root, 'integrations');
if (!fs.existsSync(integrationsDir)) {
  console.error('Missing integrations directory.');
  process.exit(1);
}
const redlinePatterns = [
  /AKIA[0-9A-Z]{16}/,
  /sk-[A-Za-z0-9_-]{20,}/,
  /xox[baprs]-[A-Za-z0-9-]+/,
  /-----BEGIN (RSA |OPENSSH |EC )?PRIVATE KEY-----/,
  /password\s*[:=]\s*['"][^'"]+['"]/i,
  /api[_-]?key\s*[:=]\s*['"][^'"]+['"]/i
];
const risky = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (/\.(md|yaml|yml|json|txt|js|ts)$/i.test(entry.name)) {
      const text = fs.readFileSync(p, 'utf8');
      for (const pattern of redlinePatterns) {
        if (pattern.test(text)) risky.push(path.relative(root, p));
      }
    }
  }
}
walk(integrationsDir);
if (risky.length) {
  console.error('Potential secrets or unsafe vendor content found:');
  for (const file of [...new Set(risky)]) console.error(`- ${file}`);
  process.exit(1);
}
console.log('Third-party integration review check passed.');
