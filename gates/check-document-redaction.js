#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const roots = ["docs/03-quote-contract", "docs/09-delivery", "docs/07-delivery", "delivery", "quote", "reports"].map(p => path.join(target, p)).filter(fs.existsSync);
const mdFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile() && entry.name.endsWith(".md")) mdFiles.push(full);
  }
}
roots.forEach(walk);
const forbidden = [
  /man[-\s]?days?|人天/i,
  /daily\s*rate|日薪/i,
  /buffer|缓冲|预留/i,
  /internal\s+cost|内部成本|成本结构/i,
  /profit\s*margin|利润率/i,
  /100%\s*(uptime|safe|secure|guarantee)|100%|绝对|无限期|永远/i,
  /api[_-]?key\s*=|secret\s*=|token\s*=|AKIA[0-9A-Z]{16}/i
];
const findings = [];
for (const file of mdFiles) {
  const rel = path.relative(target, file);
  if (/audit|internal|quote-notes-internal/i.test(rel)) continue;
  const text = fs.readFileSync(file, "utf8");
  for (const rx of forbidden) if (rx.test(text)) findings.push(`${rel} matches ${rx}`);
}
if (findings.length) {
  console.error("Document redaction check failed:");
  for (const f of findings.slice(0, 30)) console.error(`- ${f}`);
  if (findings.length > 30) console.error(`... ${findings.length - 30} more`);
  process.exit(1);
}
console.log("Document redaction check passed");
