#!/usr/bin/env node

import { parseArgs, getFlag } from "../lib/args.js";
import { PROFILES } from "../lib/profiles.js";
import { runInit } from "../commands/init.js";
import { createProject } from "../commands/new.js";
import { classifyCommand } from "../commands/classify.js";
import { checkCommand } from "../commands/check.js";
import { upCommand } from "../commands/up.js";

const args = process.argv.slice(2);
const parsed = parseArgs(args);

const help = `
ShipKit

Usage:
  sk init <platform> --to <path>
  sk new <project-name> [--to <path>] [--profile <profile>] [--mode <simple|standard|complex>] [--team <solo|team|multi>]
  sk classify --project <path> [--features <n>] [--modules <n>] [--contributors <n>]
  sk check [gate|suite] [--to <path>] [--project <name|path>] [--json] [--strict]
  sk check list
  sk up

Profiles:
  ${[...PROFILES].join("\n  ")}

Platforms:
  openclaw
  codex
  claude
  cursor
  hermes
  generic

Examples:
  sk new landing-page --profile simple-solo
  sk new crm --profile standard-team --to ~/Projects/crm
  sk new erp --auto --features 18 --modules 8 --contributors 6 --external --data --production
  sk classify --project ~/Projects/crm
  sk check --project ~/Projects/crm
`;

function printHelpAndExit(code = 0) {
  console.log(help.trim());
  process.exit(code);
}

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  printHelpAndExit(0);
}

const command = parsed.positional[0];

switch (command) {
  case "init": {
    const platform = parsed.positional[1] || "generic";
    const target = getFlag(parsed, "to", getFlag(parsed, "target", "."));
    runInit(platform, target);
    break;
  }
  case "new": {
    const name = parsed.positional[1];
    const target = parsed.flags.to || parsed.flags.target;
    createProject(name, target, parsed.flags);
    break;
  }
  case "classify": {
    classifyCommand(parsed.flags);
    break;
  }
  case "check": {
    const requested = parsed.positional[1] || "default";
    checkCommand(requested, parsed.flags);
    break;
  }
  case "up": {
    upCommand();
    break;
  }
  default:
    console.error(`Unknown command: ${command}`);
    printHelpAndExit(1);
}
