#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");
const args = process.argv.slice(2);

const help = `
ShipKit

Usage:
  sk init <platform> --to <path>
  sk new <project-name> [--to <path>]
  sk check [gate|suite] [--to <path>] [--project <name|path>] [--json] [--strict]
  sk check list
  sk up

Platforms:
  openclaw
  codex
  claude
  cursor
  hermes
  generic

Check examples:
  sk check
  sk check secrets --to .
  sk check core --project acme-crm --to ~/.openclaw/workspaces/shipkit
  sk check all --project ~/Projects/acme-crm --json
`;

function expandHome(input) {
  if (!input) return input;
  if (input === "~") return os.homedir();
  if (input.startsWith("~/")) return path.join(os.homedir(), input.slice(2));
  return input;
}

function resolvePath(input, base = process.cwd()) {
  const expanded = expandHome(input || ".");
  return path.isAbsolute(expanded) ? path.resolve(expanded) : path.resolve(base, expanded);
}

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

function writeIfMissing(file, content) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, content);
}

function parseArgs(argv) {
  const positional = [];
  const flags = {};
  for (let i = 0; i < argv.length; i++) {
    const item = argv[i];
    if (item.startsWith("--")) {
      const key = item.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i += 1;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(item);
    }
  }
  return { positional, flags };
}

const parsed = parseArgs(args);

function getFlag(name, fallback = ".") {
  if (Object.prototype.hasOwnProperty.call(parsed.flags, name)) return parsed.flags[name];
  return fallback;
}

function init(platform, target) {
  const normalized = platform || "generic";
  const out = resolvePath(target || ".");
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

function createProject(name, target) {
  if (!name) {
    console.error("Missing project name.");
    process.exit(1);
  }
  const out = resolvePath(target || name);
  ensureDir(out);

  const docStages = [
    "00-intake",
    "01-discover",
    "02-scope",
    "03-prd",
    "04-arch",
    "05-plan",
    "06-build",
    "07-test",
    "08-release",
    "09-delivery",
    "10-retro"
  ];
  for (const stage of docStages) ensureDir(path.join(out, "docs", stage));
  for (const dir of [
    "handoff",
    "audit",
    "quote",
    "delivery",
    "trace",
    "tasks",
    "control",
    "review",
    "evidence",
    "changes",
    "defects",
    "refactors",
    "decisions",
    "dependencies",
    "blockers",
    "risks"
  ]) ensureDir(path.join(out, dir));

  writeIfMissing(path.join(out, "shipkit.yaml"), `project:\n  id: ${name}\n  name: ${name}\n  stage: intake\n\npolicy:\n  require_traceability: true\n  require_handoff: true\n  require_client_doc_audit: true\n`);
  writeIfMissing(path.join(out, "STATE.md"), `# STATE\n\n## Current goal\n\nTBD\n\n## Confirmed scope\n\nTBD\n\n## Open questions\n\n- TBD\n\n## Open blockers\n\n- None\n\n## Key decisions\n\n- TBD\n\n## Next actions\n\n- TBD\n`);
  writeIfMissing(path.join(out, "trace", "trace-map.md"), `# Trace Map\n\n| Requirement | Module | PRD | Architecture | Task | Test | Delivery Evidence | Status |\n|---|---|---|---|---|---|---|---|\n`);
  writeIfMissing(path.join(out, "README.md"), `# ${name}\n\nShipKit project workspace.\n`);

  console.log(JSON.stringify({ status: "ok", project: name, target: out }, null, 2));
}

function readJson(file, fallback) {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
}

function mergeRegistry(baseRegistry, addon) {
  const out = {
    aliases: { ...(baseRegistry.aliases || {}) },
    suites: { ...(baseRegistry.suites || {}) }
  };
  for (const [key, value] of Object.entries(addon.aliases || {})) out.aliases[key] = value;
  for (const [suite, gates] of Object.entries(addon.suites || {})) {
    const merged = [...(out.suites[suite] || []), ...(Array.isArray(gates) ? gates : [])];
    out.suites[suite] = [...new Set(merged)];
  }
  return out;
}

function loadGateRegistry() {
  const gatesDir = path.join(root, "gates");
  const registryPath = path.join(gatesDir, "registry.json");
  const fallback = {
    aliases: {},
    suites: {
      default: ["smoke", "secrets"],
      core: ["smoke", "secrets", "state", "tasks", "context"],
      all: []
    }
  };
  let registry = readJson(registryPath, fallback);
  if (!registry.aliases) registry.aliases = {};
  if (!registry.suites) registry.suites = fallback.suites;

  if (fs.existsSync(gatesDir)) {
    for (const file of fs.readdirSync(gatesDir).sort()) {
      if (!/^registry\..+\.json$/.test(file)) continue;
      registry = mergeRegistry(registry, readJson(path.join(gatesDir, file), { aliases: {}, suites: {} }));
    }
  }
  return registry;
}

function listGateFiles() {
  const gatesDir = path.join(root, "gates");
  if (!fs.existsSync(gatesDir)) return [];
  return fs.readdirSync(gatesDir)
    .filter((file) => /^check.*\.js$/.test(file))
    .sort();
}

function gateNameFromFile(file) {
  if (file === "check.js") return "smoke";
  return file.replace(/^check-?/, "").replace(/\.js$/, "").replace(/_/g, "-");
}

function resolveGateScript(name, registry) {
  if (!name || name === "default") return null;
  const aliases = registry.aliases || {};
  const mapped = aliases[name] || aliases[name.replace(/^check-/, "")];
  if (mapped) return mapped;

  const candidates = [];
  if (name.endsWith(".js")) candidates.push(name);
  candidates.push(`check-${name}.js`);
  candidates.push(`check${name}.js`);

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(root, "gates", candidate))) return candidate;
  }
  return null;
}

function collectCheckItems(requested, registry) {
  const suites = registry.suites || {};
  const aliases = registry.aliases || {};
  const requestedName = requested || "default";

  if (requestedName === "list" || requestedName === "ls") return { list: true, items: [] };
  if (requestedName === "suites") return { suites: true, items: [] };

  let items;
  if (suites[requestedName]) {
    items = suites[requestedName];
  } else {
    items = [requestedName];
  }

  if (requestedName === "all" && (!items || items.length === 0)) {
    items = listGateFiles().map(gateNameFromFile).filter((name) => name !== "spawn-brief");
  }

  const seen = new Set();
  const out = [];
  for (const item of items) {
    const normalized = aliases[item] ? item : item.replace(/^check-/, "").replace(/\.js$/, "");
    if (!seen.has(normalized)) {
      seen.add(normalized);
      out.push(normalized);
    }
  }
  return { items: out };
}

function parseProjectRegistry(workspace, projectName) {
  const files = [
    path.join(workspace, "projects.yaml"),
    path.join(workspace, "shipkit.workspace.yaml")
  ];
  for (const file of files) {
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    const escaped = projectName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const block = new RegExp(`(^|\\n)\\s*${escaped}:\\s*\\n([\\s\\S]*?)(\\n\\s{0,2}[A-Za-z0-9_-]+:\\s*\\n|$)`, "m").exec(text);
    if (block) {
      const pathMatch = /path:\s*['"]?([^'"\n]+)['"]?/m.exec(block[2]);
      if (pathMatch) return resolvePath(pathMatch[1].trim(), workspace);
    }
  }
  return null;
}

function resolveCheckTarget(flags) {
  const workspace = resolvePath(flags.to || flags.target || ".");
  const project = flags.project;
  if (!project) return workspace;

  const direct = resolvePath(project);
  if (fs.existsSync(direct)) return direct;

  const inWorkspace = path.join(workspace, "projects", project);
  if (fs.existsSync(inWorkspace)) return inWorkspace;

  const fromRegistry = parseProjectRegistry(workspace, project);
  if (fromRegistry) return fromRegistry;

  return inWorkspace;
}

function runGate(name, script, target, flags) {
  const scriptPath = path.join(root, "gates", script);
  const targetArg = name === "spawn" || name === "spawn-brief"
    ? resolvePath(flags.file || target)
    : target;
  const result = spawnSync(process.execPath, [scriptPath, targetArg], {
    cwd: target,
    encoding: "utf8"
  });

  return {
    name,
    script,
    target: targetArg,
    ok: result.status === 0,
    status: result.status ?? 1,
    stdout: (result.stdout || "").trim(),
    stderr: (result.stderr || "").trim(),
    error: result.error ? result.error.message : null
  };
}

function printGateResult(result) {
  const icon = result.ok ? "PASS" : "FAIL";
  console.log(`${icon} ${result.name} (${result.script})`);
  if (result.stdout) console.log(result.stdout);
  if (result.stderr) console.error(result.stderr);
}

function check(requested, flags) {
  const registry = loadGateRegistry();
  const collection = collectCheckItems(requested, registry);

  if (collection.list || flags.list) {
    const gateFiles = listGateFiles();
    console.log("Available gates:");
    for (const file of gateFiles) console.log(`  ${gateNameFromFile(file)} -> ${file}`);
    console.log("\nAliases:");
    for (const [alias, file] of Object.entries(registry.aliases || {})) console.log(`  ${alias} -> ${file}`);
    console.log("\nSuites:");
    for (const [suite, gates] of Object.entries(registry.suites || {})) console.log(`  ${suite}: ${gates.join(", ")}`);
    return;
  }

  if (collection.suites) {
    for (const [suite, gates] of Object.entries(registry.suites || {})) console.log(`${suite}: ${gates.join(", ")}`);
    return;
  }

  const target = resolveCheckTarget(flags);
  const results = [];
  const missing = [];

  for (const item of collection.items) {
    const script = resolveGateScript(item, registry);
    if (!script) {
      missing.push(item);
      continue;
    }
    results.push(runGate(item, script, target, flags));
  }

  const ok = missing.length === 0 && results.every((result) => result.ok);
  const payload = {
    status: ok ? "ok" : "failed",
    requested: requested || "default",
    target,
    missing,
    results
  };

  if (flags.json) {
    console.log(JSON.stringify(payload, null, 2));
  } else {
    console.log(`ShipKit check: ${requested || "default"}`);
    console.log(`Target: ${target}`);
    if (missing.length) console.error(`Missing gates: ${missing.join(", ")}`);
    for (const result of results) printGateResult(result);
    const passed = results.filter((result) => result.ok).length;
    console.log(`Summary: ${passed}/${results.length} passed`);
  }

  const strict = flags.strict || (!flags.soft && !flags["no-strict"]);
  if (!ok && strict) process.exit(1);
}

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  console.log(help.trim());
  process.exit(0);
}

const command = parsed.positional[0];

switch (command) {
  case "init": {
    const platform = parsed.positional[1] || "generic";
    const target = getFlag("to", getFlag("target", "."));
    init(platform, target);
    break;
  }
  case "new": {
    const name = parsed.positional[1];
    const target = parsed.flags.to || parsed.flags.target;
    createProject(name, target);
    break;
  }
  case "check": {
    const requested = parsed.positional[1] || "default";
    check(requested, parsed.flags);
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
