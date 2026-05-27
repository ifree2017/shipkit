#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
const target = process.argv[2] || process.cwd();
const denyDirs = new Set(['.git', 'node_modules', 'dist', 'build', '.next', 'coverage']);
const patterns = [
  { name: 'generic_api_key', re: /api[_-]?key\s*[:=]\s*['\"][A-Za-z0-9_\-]{16,}['\"]/i },
  { name: 'generic_secret', re: /(app|client|tenant|api)?[_-]?secret\s*[:=]\s*['\"][^'\"]{12,}['\"]/i },
  { name: 'access_token', re: /(access|refresh|tenant)?[_-]?token\s*[:=]\s*['\"][^'\"]{16,}['\"]/i },
  { name: 'private_key', re: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
  { name: 'password_assignment', re: /password\s*[:=]\s*['\"][^'\"]{8,}['\"]/i },
  { name: 'webhook_secret', re: /webhook[_-]?secret\s*[:=]\s*['\"][^'\"]{12,}['\"]/i }
];
const findings = [];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (denyDirs.has(ent.name)) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (ent.isFile()) scan(p);
  }
}
function scan(file) {
  const ext = path.extname(file).toLowerCase();
  const allowed = new Set(['.js','.ts','.py','.sh','.md','.json','.yaml','.yml','.env','.txt','.toml','.ini']);
  if (!allowed.has(ext) && !path.basename(file).startsWith('.env')) return;
  let text;
  try { text = fs.readFileSync(file, 'utf8'); } catch { return; }
  const lines = text.split(/\r?\n/);
  lines.forEach((line, idx) => {
    for (const pat of patterns) {
      if (pat.re.test(line)) findings.push({ file, line: idx + 1, type: pat.name });
    }
  });
}
walk(path.resolve(target));
if (findings.length) {
  console.error('Secret redline findings:');
  for (const f of findings) console.error(`- ${f.file}:${f.line} ${f.type}`);
  process.exit(1);
}
console.log('OK: no secret redlines found');
