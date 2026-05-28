#!/usr/bin/env node
import fs from "fs";
import path from "path";

const target = process.argv[2] || ".";
const root = path.resolve(target);

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function isPackageRoot() {
  return exists("package.json") && exists("bin/sk.js");
}

const packageRequired = [
  "package.json",
  "README.md",
  "HARNESS.md",
  "bin/sk.js",
  "gates/registry.json",
  "docs/README.md",
  "docs/PUBLISHING.md"
];

const packageRecommended = [
  "docs/ALPHA_STABILIZATION_PLAN.md",
  "docs/DIFFERENTIATION.md",
  "docs/EXAMPLES.md",
  "examples/simple-solo/README.md",
  "examples/standard-team/README.md"
];

const projectRequired = [
  "shipkit.yaml",
  "README.md"
];

const projectRecommended = [
  "reports/status-report.md",
  "handoff",
  "evidence"
];

const required = isPackageRoot() ? packageRequired : projectRequired;
const recommended = isPackageRoot() ? packageRecommended : projectRecommended;

const missingRequired = required.filter((rel) => !exists(rel));
const missingRecommended = recommended.filter((rel) => !exists(rel));

if (missingRequired.length) {
  console.error("Release readiness failed. Missing required files:");
  for (const rel of missingRequired) console.error(`- ${rel}`);
  process.exit(1);
}

if (missingRecommended.length) {
  console.log("Release readiness passed with warnings. Missing recommended files:");
  for (const rel of missingRecommended) console.log(`- ${rel}`);
  process.exit(0);
}

console.log("Release readiness passed.");
