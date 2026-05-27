#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const args = process.argv.slice(2);

const help = `
ShipKit

Usage:
  sk init <platform> --to <path>
  sk new <project-name>
  sk check
  sk up

Platforms:
  openclaw
  codex
  claude
  cursor
  hermes
  generic
`;

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else if (!fs.existsSync(to)) fs.copyFileSync(from, to);
  }
}

function getFlag(name, fallback = ".") {
  const index = args.indexOf(name);
  if (index >= 0 && args[index + 1]) return args[index + 1];
  return fallback;
}

function writeIfMissing(file, content) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, content);
}

function init(platform, target) {
  const normalized = platform || "generic";
  const out = path.resolve(process.cwd(), target || ".");
  ensureDir(out);

  copyDir(path.join(root, "protocol"), path.join(out, "protocol"));
  copyDir(path.join(root, "skills"), path.join(out, normalized === "codex" ? ".agents/skills" : "skills"));
  copyDir(path.join(root, "workflows"), path.join(out, "workflows"));
  copyDir(path.join(root, "templates"), path.join(out, "templates"));
  copyDir(path.join(root, "gates"), path.join(out, "gates"));
  copyDir(path.join(root, "agents"), path.join(out, "agents"));
  ensureDir(path.join(out, "docs"));

  const adapter = path.join(root, "adapters", normalized);
  copyDir(adapter, out);

  if (normalized === "codex" || normalized === "openclaw" || normalized === "generic") {
    writeIfMissing(path.join(out, "AGENTS.md"), `# ShipKit\n\nUse ShipKit to move software projects from requirements to shipped delivery.\n\nFollow stages in protocol/stages.yaml.\n`);
  }
  if (normalized === "claude") {
    writeIfMissing(path.join(out, "CLAUDE.md"), `# ShipKit\n\nFollow ShipKit stages in protocol/stages.yaml.\n`);
  }
  if (normalized === "cursor") {
    ensureDir(path.join(out, ".cursor/rules"));
    writeIfMissing(path.join(out, ".cursor/rules/shipkit.mdc"), `# ShipKit\n\nFollow ShipKit stages in protocol/stages.yaml.\n`);
  }

  console.log(JSON.stringify({ status: "ok", platform: normalized, target: out }, null, 2));
}

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(help.trim());
  process.exit(0);
}

const command = args[0];

switch (command) {
  case "init": {
    const platform = args[1] || "generic";
    const target = getFlag("--to", getFlag("--target", "."));
    init(platform, target);
    break;
  }
  case "new": {
    const name = args[1];
    if (!name) {
      console.error("Missing project name.");
      process.exit(1);
    }
    const out = path.resolve(process.cwd(), name);
    init("generic", out);
    break;
  }
  case "check": {
    console.log("ShipKit check: scaffold OK");
    break;
  }
  case "up": {
    console.log("ShipKit up: upgrade is not implemented yet");
    break;
  }
  default:
    console.error(`Unknown command: ${command}`);
    console.log(help.trim());
    process.exit(1);
}
