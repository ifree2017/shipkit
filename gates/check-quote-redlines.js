#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const files = [
  "docs/03-quote-contract/client-facing-quote.md",
  "quote/client-facing-quote.md"
].map(p => path.join(target, p)).filter(fs.existsSync);

if (!files.length) {
  console.error("Quote redlines check failed. Missing client-facing quote document.");
  process.exit(1);
}

const forbidden = [
  /man[-\s]?days?|人天/i,
  /daily\s*rate|日薪|人头成本/i,
  /buffer|缓冲|预留/i,
  /margin|利润率|毛利/i,
  /internal\s+cost|内部成本|成本结构/i,
  /salary|工资|薪资/i,
  /developer\s+allocation|人员配比|开发人员配比/i,
  /free|免费|顺手|很简单|小改一下|quick\s*fix/i
];

const findings = [];
for (const file of files) {
  const text = fs.readFileSync(file, "utf8");
  for (const rx of forbidden) {
    if (rx.test(text)) findings.push(`${path.relative(target, file)} matches ${rx}`);
  }
}

if (findings.length) {
  console.error("Quote redlines check failed:");
  for (const f of findings) console.error(`- ${f}`);
  process.exit(1);
}

console.log("Quote redlines check passed");
