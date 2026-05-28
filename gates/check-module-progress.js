#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
const target = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const file = path.join(target, "modules", "module-map.yaml");
if (!fs.existsSync(file)) { console.log("Module progress gate: SKIP (no modules/module-map.yaml)"); process.exit(0); }
const text = fs.readFileSync(file, "utf8");
if (/id:\s*MOD-/i.test(text)) {
  const required = ["owner:", "status:", "progress:"];
  const missing = required.filter((marker) => !text.includes(marker));
  if (missing.length) {
    console.error(`Module progress gate failed. Missing markers: ${missing.join(", ")}`);
    process.exit(1);
  }
}
console.log("Module progress gate: PASS");
