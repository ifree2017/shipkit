#!/usr/bin/env node
import fs from "fs";
import path from "path";

const target = process.argv[2] || ".";
const root = path.resolve(target);
const required = [
  "README.md",
  "HARNESS.md",
  "CHANGELOG.md",
  "package.json",
  "docs/NOT_PRODUCTION_READY.md",
  "docs/RELEASE_NOTES_V0_2_ALPHA.md",
  "docs/ALPHA_STABILIZATION_ROADMAP.md",
  "docs/DIFFERENTIATION.md",
  "examples/simple-solo/README.md",
  "examples/standard-team/README.md"
];
const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  console.error("Release readiness failed. Missing:");
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}
const pkg = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
if (!String(pkg.version || "").includes("alpha")) {
  console.error(`Release readiness failed. Expected alpha version, got ${pkg.version || "<missing>"}.`);
  process.exit(1);
}
console.log("Release readiness passed.");
