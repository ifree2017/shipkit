#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

function expandHome(input) {
  if (!input) return input;
  if (input === "~") return os.homedir();
  if (input.startsWith("~/")) return path.join(os.homedir(), input.slice(2));
  return input;
}

function argValue(name, fallback = ".") {
  const index = process.argv.indexOf(`--${name}`);
  if (index >= 0 && process.argv[index + 1]) return process.argv[index + 1];
  return fallback;
}

const target = path.resolve(expandHome(argValue("to", argValue("workspace", "."))));
const required = [
  "AGENTS.md",
  "SOUL.md",
  "protocol/stages.yaml",
  "skills/intake/SKILL.md",
  "workflows/01-intake.md",
  "gates/registry.json",
  "projects.yaml"
];

const missing = required.filter((relative) => !fs.existsSync(path.join(target, relative)));

if (missing.length > 0) {
  console.error(`OpenClaw workspace check failed for ${target}`);
  console.error(`Missing: ${missing.join(", ")}`);
  process.exit(1);
}

console.log(`OpenClaw workspace check passed: ${target}`);
