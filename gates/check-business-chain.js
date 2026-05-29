#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const candidates = [
  "docs/01-discover/business-chain.md",
  "docs/01-discovery/business-chain.md"
];
const file = candidates.map(p => path.join(target, p)).find(fs.existsSync);

if (!file) {
  console.error("Business chain check failed. Missing docs/01-discover/business-chain.md");
  process.exit(1);
}

const text = fs.readFileSync(file, "utf8");
const required = [
  /trigger|触发|start/i,
  /role|角色|user/i,
  /data|数据|source|destination/i,
  /normal|正常|happy path/i,
  /exception|异常|failure|失败/i,
  /dependency|依赖|third[- ]party|第三方/i,
  /acceptance|验收|evidence|证据/i
];
const missing = required.filter(rx => !rx.test(text));

if (missing.length) {
  console.error(`Business chain check failed. Missing ${missing.length} required chain dimensions.`);
  process.exit(1);
}

console.log("Business chain check passed");
