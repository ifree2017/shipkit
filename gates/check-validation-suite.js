#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const target = path.resolve(process.argv[2] || ".");
const required = [
  "tests/run-tests.js",
  "tests/smoke.test.js",
  "tests/profiles.test.js",
  "tests/gates.test.js",
  "tests/adapters.test.js",
  "tests/package.test.js"
];
const missing = required.filter((rel) => !fs.existsSync(path.join(target, rel)));
if (missing.length) {
  console.error("Missing validation test files:");
  for (const rel of missing) console.error(`- ${rel}`);
  process.exit(1);
}
console.log("Validation suite files exist.");
