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

const PROFILES = new Set([
  "simple-solo",
  "simple-team",
  "standard-solo",
  "standard-team",
  "complex-team",
  "complex-multi"
]);

const PROFILE_SUITES = {
  "simple-solo": ["smoke", "secrets", "profile"],
  "simple-team": ["smoke", "secrets", "profile", "team"],
  "standard-solo": ["core", "changes", "profile"],
  "standard-team": ["core", "changes", "team", "ops", "profile"],
  "complex-team": ["core", "team", "changes", "ops", "control", "harness", "delivery", "profile"],
  "complex-multi": ["core", "team", "changes", "ops", "control", "harness", "delivery", "integrations", "profile"]
};

const PROFILE_DIRS = {
  "simple-solo": [
    "docs", "tasks", "handoff", "audit", "delivery", "trace", "evidence",
    ".shipkit/runs", ".shipkit/events", ".shipkit/approvals", "spec"
  ],
  "simple-team": [
    "docs", "tasks", "handoff", "audit", "delivery", "trace", "evidence",
    "team", "modules", "sync", "reports", ".shipkit/runs", ".shipkit/events", ".shipkit/approvals", "spec"
  ],
  "standard-solo": [
    "docs", "tasks", "handoff", "audit", "quote", "delivery", "trace", "evidence",
    "changes", "defects", "refactors", "decisions", "dependencies", "blockers", "risks", "reports",
    ".shipkit/runs", ".shipkit/events", ".shipkit/approvals", "spec"
  ],
  "standard-team": [
    "docs", "tasks", "handoff", "audit", "quote", "delivery", "trace", "evidence",
    "changes", "defects", "refactors", "decisions", "dependencies", "blockers", "risks",
    "team", "modules", "sync", "reports", ".shipkit/runs", ".shipkit/events", ".shipkit/approvals", "spec"
  ],
  "complex-team": [
    "docs", "tasks", "handoff", "audit", "quote", "delivery", "trace", "evidence",
    "changes", "defects", "refactors", "decisions", "dependencies", "blockers", "risks",
    "team", "modules", "sync", "reports", "control", "review", "spec", "release", "security", "data",
    ".shipkit/runs", ".shipkit/events", ".shipkit/approvals"
  ],
  "complex-multi": [
    "docs", "tasks", "handoff", "audit", "quote", "delivery", "trace", "evidence",
    "changes", "defects", "refactors", "decisions", "dependencies", "blockers", "risks",
    "team", "modules", "sync", "reports", "control", "review", "spec", "release", "security", "data",
    "vendors", "approvals", ".shipkit/runs", ".shipkit/events", ".shipkit/approvals"
  ]
};

const help = `
ShipKit

Usage:
  sk init <platform> --to <path>
  sk new <project-name> [--to <path>] [--profile <profile>] [--mode <simple|standard|complex>] [--team <solo|team|multi>]
  sk classify --project <path> [--features <n>] [--modules <n>] [--contributors <n>]
  sk check [gate|suite] [--to <path>] [--project <name|path>] [--json] [--strict]
  sk check list
  sk test [suite]
  sk score [--project <path>] [--json] [--write]
  sk score stage <stage> [--project <path>] [--json] [--write]
  sk up

Profiles:
  simple-solo
  simple-team
  standard-solo
  standard-team
  complex-team
  complex-multi

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
  sk test
  sk score --project ~/Projects/crm
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
  copyDir(path.join(root, "docs"), path.join(out, "docs"));
  copyDir(path.join(root, "integrations"), path.join(out, "integrations"));
  copyDir(path.join(root, "tools"), path.join(out, "tools"));
  copyDir(path.join(root, "spec"), path.join(out, "spec"));

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

function numberFlag(flags, name, fallback = 0) {
  const raw = flags[name];
  if (raw === undefined || raw === true || raw === "") return fallback;
  const n = Number(raw);
  return Number.isFinite(n) ? n : fallback;
}

function boolFlag(flags, name) {
  return flags[name] === true || flags[name] === "true" || flags[name] === "yes" || flags[name] === "1";
}

function profileFromModeTeam(mode, team) {
  const normalizedMode = mode || "standard";
  let normalizedTeam = team || "solo";
  if (normalizedTeam === "multi-team") normalizedTeam = "multi";
  if (normalizedMode === "complex" && normalizedTeam === "multi") return "complex-multi";
  const candidate = `${normalizedMode}-${normalizedTeam}`;
  if (PROFILES.has(candidate)) return candidate;
  if (normalizedMode === "complex" && normalizedTeam === "solo") return "complex-team";
  return "standard-solo";
}

function classifyFromSignals(flags = {}) {
  const features = numberFlag(flags, "features", 0);
  const modules = numberFlag(flags, "modules", 0);
  const contributors = numberFlag(flags, "contributors", numberFlag(flags, "people", 1));
  const durationWeeks = numberFlag(flags, "weeks", numberFlag(flags, "duration", 0));
  const external = boolFlag(flags, "external") || boolFlag(flags, "api") || boolFlag(flags, "third-party");
  const data = boolFlag(flags, "data") || boolFlag(flags, "migration") || boolFlag(flags, "sync");
  const security = boolFlag(flags, "security") || boolFlag(flags, "sensitive") || boolFlag(flags, "permissions");
  const production = boolFlag(flags, "production") || boolFlag(flags, "release");
  const acceptance = boolFlag(flags, "acceptance") || boolFlag(flags, "client-acceptance") || boolFlag(flags, "contract");
  const multiSystem = boolFlag(flags, "multi-system") || boolFlag(flags, "integration");

  let score = 0;
  const reasons = [];
  const add = (points, reason) => { score += points; reasons.push(reason); };

  if (features > 10) add(18, `${features} feature points`);
  else if (features >= 4) add(10, `${features} feature points`);
  else if (features > 0) add(3, `${features} feature points`);

  if (modules > 5) add(18, `${modules} modules`);
  else if (modules >= 2) add(10, `${modules} modules`);
  else if (modules > 0) add(3, `${modules} module`);

  if (contributors >= 6) add(20, `${contributors} contributors`);
  else if (contributors >= 2) add(12, `${contributors} contributors`);
  else add(0, "solo contributor");

  if (external) add(10, "external API or third-party dependency");
  if (data) add(12, "data migration, import, export, or sync");
  if (security) add(12, "security, sensitive data, or permission model");
  if (production) add(10, "production release required");
  if (acceptance) add(8, "formal customer acceptance required");
  if (multiSystem) add(12, "multi-system integration");

  if (durationWeeks >= 6) add(12, `${durationWeeks} week duration`);
  else if (durationWeeks >= 2) add(6, `${durationWeeks} week duration`);

  let mode = "simple";
  if (score >= 50 || features > 10 || modules > 5 || contributors >= 6) mode = "complex";
  else if (score >= 18 || features >= 4 || modules >= 2 || contributors >= 2 || external || data || acceptance) mode = "standard";

  let team = "solo";
  if (contributors >= 6) team = "multi";
  else if (contributors >= 2) team = "team";

  const profile = profileFromModeTeam(mode, team);
  return { profile, mode, team, score, reasons };
}

function selectProjectProfile(flags) {
  if (flags.profile) {
    const profile = String(flags.profile);
    if (!PROFILES.has(profile)) {
      console.error(`Unknown profile: ${profile}`);
      console.error(`Supported profiles: ${[...PROFILES].join(", ")}`);
      process.exit(1);
    }
    const [mode, teamPart] = profile.split("-");
    return { profile, mode, team: teamPart === "multi" ? "multi" : teamPart, score: null, reasons: ["explicit profile"] };
  }

  if (flags.mode || flags.team) {
    const profile = profileFromModeTeam(flags.mode || "standard", flags.team || "solo");
    const [mode, teamPart] = profile.split("-");
    return { profile, mode, team: teamPart === "multi" ? "multi" : teamPart, score: null, reasons: ["explicit mode/team"] };
  }

  if (flags.auto || flags.features || flags.modules || flags.contributors || flags.people || flags.external || flags.data || flags.security || flags.production || flags.acceptance) {
    return classifyFromSignals(flags);
  }

  return { profile: "standard-solo", mode: "standard", team: "solo", score: null, reasons: ["default profile"] };
}

function yamlList(items, indent = 4) {
  return items.map((item) => `${" ".repeat(indent)}- ${item}`).join("\n");
}

function createProject(name, target, flags = {}) {
  if (!name) {
    console.error("Missing project name.");
    process.exit(1);
  }

  const out = resolvePath(target || name);
  ensureDir(out);
  const classification = selectProjectProfile(flags);

  const docStages = [
    "00-intake", "01-discover", "02-scope", "03-prd", "04-arch", "05-plan",
    "06-build", "07-test", "08-release", "09-delivery", "10-retro"
  ];
  for (const stage of docStages) ensureDir(path.join(out, "docs", stage));

  for (const dir of PROFILE_DIRS[classification.profile] || PROFILE_DIRS["standard-solo"]) {
    ensureDir(path.join(out, dir));
  }
  ensureDir(path.join(out, "evidence", "commits"));
  ensureDir(path.join(out, "evidence", "tests"));
  ensureDir(path.join(out, "evidence", "reviews"));
  ensureDir(path.join(out, "evidence", "integrations"));

  writeIfMissing(path.join(out, "shipkit.yaml"), `project:\n  id: ${name}\n  name: ${name}\n  stage: intake\n  mode: ${classification.mode}\n  team_mode: ${classification.team}\n  profile: ${classification.profile}\n\nclassification:\n  score: ${classification.score === null ? "null" : classification.score}\n  decided_by: ${flags.profile || flags.mode || flags.team ? "manual" : (flags.auto ? "auto" : "default")}\n  reasons:\n${yamlList(classification.reasons.length ? classification.reasons : ["not provided"], 4)}\n\npolicy:\n  require_traceability: true\n  require_handoff: true\n  require_client_doc_audit: true\n  profile_driven_checks: true\n`);
  writeIfMissing(path.join(out, "STATE.md"), `# STATE\n\n## Current goal\n\nTBD\n\n## Confirmed scope\n\nTBD\n\n## Open questions\n\n- TBD\n\n## Open blockers\n\n- None\n\n## Key decisions\n\n- TBD\n\n## Next actions\n\n- TBD\n`);
  writeIfMissing(path.join(out, "trace", "trace-map.md"), `# Trace Map\n\n| Requirement | Module | PRD | Architecture | Task | Test | Delivery Evidence | Status |\n|---|---|---|---|---|---|---|---|\n`);
  writeIfMissing(path.join(out, "spec", "requirements.yaml"), `requirements: []\n`);
  writeIfMissing(path.join(out, "spec", "acceptance.yaml"), `acceptance: []\n`);
  writeIfMissing(path.join(out, "README.md"), `# ${name}\n\nShipKit project workspace.\n\nProfile: ${classification.profile}\n`);

  if (fs.existsSync(path.join(out, "team"))) {
    writeIfMissing(path.join(out, "team", "members.yaml"), `members: []\n`);
    writeIfMissing(path.join(out, "team", "ownership.yaml"), `ownership: []\n`);
    writeIfMissing(path.join(out, "team", "workload.yaml"), `workload: []\n`);
  }
  if (fs.existsSync(path.join(out, "modules"))) {
    writeIfMissing(path.join(out, "modules", "module-map.yaml"), `modules: []\n`);
    writeIfMissing(path.join(out, "modules", "progress.md"), `# Module Progress\n\n| Module | Owner | Stage | Progress | Status | Blockers |\n|---|---|---|---:|---|---|\n`);
  }
  if (fs.existsSync(path.join(out, "tasks"))) {
    writeIfMissing(path.join(out, "tasks", "board.yaml"), `tasks: []\n`);
  }
  if (fs.existsSync(path.join(out, "sync"))) {
    writeIfMissing(path.join(out, "sync", "integration-plan.md"), `# Integration Plan\n\nTBD\n`);
    writeIfMissing(path.join(out, "sync", "integration-log.md"), `# Integration Log\n\n| Date | Module | Participants | Result | Issues | Next Action |\n|---|---|---|---|---|---|\n`);
    writeIfMissing(path.join(out, "sync", "daily-log.md"), `# Daily Log\n\n| Date | Done | In Progress | Blockers | Next |\n|---|---|---|---|---|\n`);
  }
  if (fs.existsSync(path.join(out, "reports"))) {
    writeIfMissing(path.join(out, "reports", "status-report.md"), `# Project Status Report\n\n## Summary\n\n- Overall status: TBD\n- Overall progress: TBD\n- Current stage: intake\n- Delivery risk: TBD\n`);
    writeIfMissing(path.join(out, "reports", "workload-report.md"), `# Workload Report\n\n| Member | Role | Capacity | Assigned | Load | Risk |\n|---|---|---:|---:|---:|---|\n`);
    writeIfMissing(path.join(out, "reports", "progress-report.md"), `# Progress Report\n\nTBD\n`);
  }

  console.log(JSON.stringify({ status: "ok", project: name, target: out, classification }, null, 2));
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
    suites: { ...(baseRegistry.suites || {}) },
    gates: { ...(baseRegistry.gates || {}) }
  };
  for (const [key, value] of Object.entries(addon.aliases || {})) out.aliases[key] = value;
  for (const [key, value] of Object.entries(addon.gates || {})) {
    out.gates[key] = value;
    if (value && value.script && !out.aliases[key]) out.aliases[key] = value.script.replace(/^gates\//, "");
  }
  for (const [suite, gates] of Object.entries(addon.suites || {})) {
    const merged = [...(out.suites[suite] || []), ...(Array.isArray(gates) ? gates : [])];
    out.suites[suite] = [...new Set(merged)];
  }
  return out;
}

function defaultRegistry() {
  return {
    aliases: {
      smoke: "check.js",
      secrets: "check-secret-redlines.js",
      "secret-redlines": "check-secret-redlines.js",
      state: "check-state-file.js",
      tasks: "check-task-registry.js",
      context: "check-context-fabric.js",
      trace: "check-traceability.js",
      handoff: "check-handoff-completeness.js",
      approval: "check-human-approval.js",
      delivery: "check-delivery-redlines.js",
      control: "check-control-loop.js",
      quality: "check-quality-scorecard.js",
      legibility: "check-agent-legibility.js",
      platform: "check-platform-capabilities.js",
      review: "check-review-artifacts.js",
      change: "check-change-impact.js",
      bug: "check-bug-traceability.js",
      refactor: "check-refactor-approval.js",
      dependency: "check-dependency-readiness.js",
      drift: "check-scope-drift.js",
      env: "check-env-readiness.js",
      security: "check-security-baseline.js",
      data: "check-data-readiness.js",
      incident: "check-incident-postmortem.js",
      profile: "check-profile-consistency.js",
      "profile-consistency": "check-profile-consistency.js"
    },
    suites: {
      default: ["smoke", "secrets"],
      core: ["smoke", "secrets", "state", "tasks", "context"],
      project: ["state", "tasks", "context", "trace", "handoff"],
      delivery: ["trace", "handoff", "delivery", "approval"],
      control: ["control", "quality", "trace", "legibility", "approval"],
      ops: ["dependency", "drift", "env", "security", "delivery", "data", "incident", "handoff"],
      changes: ["change", "bug", "refactor"],
      openclaw: ["platform", "secrets", "state", "tasks", "context", "review"],
      profiles: ["profile"],
      ...PROFILE_SUITES,
      all: []
    }
  };
}

function loadGateRegistry() {
  const gatesDir = path.join(root, "gates");
  const registryPath = path.join(gatesDir, "registry.json");
  let registry = mergeRegistry(defaultRegistry(), readJson(registryPath, { aliases: {}, suites: {}, gates: {} }));

  if (fs.existsSync(gatesDir)) {
    for (const file of fs.readdirSync(gatesDir).sort()) {
      if (!/^registry\..+\.json$/.test(file)) continue;
      registry = mergeRegistry(registry, readJson(path.join(gatesDir, file), { aliases: {}, suites: {}, gates: {} }));
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
  const gates = registry.gates || {};
  const gateMeta = gates[name];
  if (gateMeta && gateMeta.script) return gateMeta.script.replace(/^gates\//, "");
  const mapped = aliases[name] || aliases[name.replace(/^check-/, "")];
  if (mapped) return mapped.replace(/^gates\//, "");

  const candidates = [];
  if (name.endsWith(".js")) candidates.push(name);
  candidates.push(`check-${name}.js`);
  candidates.push(`check${name}.js`);

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(root, "gates", candidate))) return candidate;
  }
  return null;
}

function parseSimpleYamlValue(text, key) {
  const re = new RegExp(`^\\s*${key}:\\s*([^\\n#]+)`, "m");
  const match = re.exec(text || "");
  return match ? match[1].trim().replace(/^['\"]|['\"]$/g, "") : null;
}

function readProjectProfile(projectPath) {
  const file = path.join(projectPath, "shipkit.yaml");
  if (!fs.existsSync(file)) return null;
  const text = fs.readFileSync(file, "utf8");
  return parseSimpleYamlValue(text, "profile");
}

function expandCheckItems(names, registry, seen = new Set()) {
  const suites = registry.suites || {};
  const out = [];
  for (const rawName of names) {
    const name = String(rawName || "").trim();
    if (!name || seen.has(name)) continue;
    seen.add(name);
    if (registry.aliases?.[name] || registry.gates?.[name]) {
      out.push(name.replace(/^check-/, "").replace(/\.js$/, ""));
    } else if (suites[name]) {
      out.push(...expandCheckItems(suites[name], registry, seen));
    } else {
      out.push(name.replace(/^check-/, "").replace(/\.js$/, ""));
    }
  }
  return [...new Set(out)];
}

function collectCheckItems(requested, registry, flags, target) {
  const requestedName = requested || "default";

  if (requestedName === "list" || requestedName === "ls") return { list: true, items: [] };
  if (requestedName === "suites") return { suites: true, items: [] };

  let effective = requestedName;
  if ((requestedName === "default" || requestedName === undefined) && flags.project) {
    const profile = readProjectProfile(target);
    if (profile && registry.suites?.[profile]) effective = profile;
  }

  let items = registry.suites?.[effective] ? registry.suites[effective] : [effective];
  if (effective === "all" && (!items || items.length === 0)) {
    items = listGateFiles().map(gateNameFromFile).filter((name) => name !== "spawn-brief");
  }
  return { items: expandCheckItems(items, registry), effective };
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
  const target = resolveCheckTarget(flags);
  const collection = collectCheckItems(requested, registry, flags, target);

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
    effective: collection.effective || requested || "default",
    target,
    missing,
    results
  };

  if (flags.json) {
    console.log(JSON.stringify(payload, null, 2));
  } else {
    console.log(`ShipKit check: ${requested || "default"}`);
    if (payload.effective && payload.effective !== (requested || "default")) console.log(`Effective suite: ${payload.effective}`);
    console.log(`Target: ${target}`);
    if (missing.length) console.error(`Missing gates: ${missing.join(", ")}`);
    for (const result of results) printGateResult(result);
    const passed = results.filter((result) => result.ok).length;
    console.log(`Summary: ${passed}/${results.length} passed`);
  }

  const strict = flags.strict || (!flags.soft && !flags["no-strict"]);
  if (!ok && strict) process.exit(1);
}

function classifyCommand(flags) {
  const project = flags.project ? resolvePath(flags.project) : resolvePath(flags.to || ".");
  let classification;
  if (fs.existsSync(path.join(project, "shipkit.yaml"))) {
    const text = fs.readFileSync(path.join(project, "shipkit.yaml"), "utf8");
    const profile = parseSimpleYamlValue(text, "profile") || "standard-solo";
    const [mode, teamPart] = profile.split("-");
    classification = { profile, mode, team: teamPart === "multi" ? "multi" : teamPart, score: null, reasons: ["read from shipkit.yaml"] };
  } else {
    classification = classifyFromSignals(flags);
  }
  const payload = { status: "ok", project, classification };
  if (flags.json) console.log(JSON.stringify(payload, null, 2));
  else {
    console.log(`Project: ${project}`);
    console.log(`Recommended profile: ${classification.profile}`);
    console.log(`Mode: ${classification.mode}`);
    console.log(`Team: ${classification.team}`);
    if (classification.score !== null) console.log(`Score: ${classification.score}`);
    console.log("Reasons:");
    for (const reason of classification.reasons || []) console.log(`  - ${reason}`);
  }
}


function existsAny(target, rels) {
  return rels.some((rel) => fs.existsSync(path.join(target, rel)));
}

function scoreDimension(target, name, weight, checks) {
  const items = checks.map((check) => {
    const ok = check.paths ? existsAny(target, check.paths) : false;
    return { id: check.id, label: check.label, ok, points: check.points || 1 };
  });
  const totalPoints = items.reduce((sum, item) => sum + item.points, 0) || 1;
  const earnedPoints = items.filter((item) => item.ok).reduce((sum, item) => sum + item.points, 0);
  const score = Math.round((earnedPoints / totalPoints) * weight);
  return { name, weight, score, checks: items };
}

function gradeFromScore(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

function decisionFromScore(score) {
  if (score >= 80) return "continue";
  if (score >= 70) return "continue_with_human_review";
  if (score >= 60) return "risky_do_not_advance_without_fix";
  return "blocked";
}

function buildScore(target, scope = "project") {
  const dimensions = [
    scoreDimension(target, "scope_clarity", 15, [
      { id: "scope_docs", label: "scope documents exist", paths: ["docs/02-scope", "docs/02-scope/module-list.md"] },
      { id: "acceptance_spec", label: "acceptance spec exists", paths: ["spec/acceptance.yaml", "docs/02-scope/acceptance-criteria.md"] },
      { id: "open_questions", label: "open questions can be tracked", paths: ["docs/00-intake/open-questions.md", "STATE.md"] }
    ]),
    scoreDimension(target, "traceability", 15, [
      { id: "trace_map", label: "trace map exists", paths: ["trace/trace-map.md"] },
      { id: "tasks", label: "task board exists", paths: ["tasks/board.yaml", "tasks"] },
      { id: "handoff", label: "handoff directory exists", paths: ["handoff"] }
    ]),
    scoreDimension(target, "execution_readiness", 10, [
      { id: "shipkit_yaml", label: "shipkit.yaml exists", paths: ["shipkit.yaml"] },
      { id: "state", label: "STATE.md exists", paths: ["STATE.md"] },
      { id: "plan_docs", label: "plan documents exist", paths: ["docs/05-plan"] }
    ]),
    scoreDimension(target, "team_execution", 15, [
      { id: "team", label: "team directory exists", paths: ["team"] },
      { id: "modules", label: "module map exists", paths: ["modules/module-map.yaml", "modules"] },
      { id: "reports", label: "status reports exist", paths: ["reports/status-report.md", "reports"] }
    ]),
    scoreDimension(target, "evidence_quality", 15, [
      { id: "evidence", label: "evidence directory exists", paths: ["evidence"] },
      { id: "test_evidence", label: "test evidence directory exists", paths: ["evidence/tests", "docs/07-test"] },
      { id: "review_evidence", label: "review evidence directory exists", paths: ["evidence/reviews", "review"] }
    ]),
    scoreDimension(target, "risk_control", 10, [
      { id: "risks", label: "risk directory exists", paths: ["risks"] },
      { id: "blockers", label: "blocker directory exists", paths: ["blockers"] },
      { id: "dependencies", label: "dependency directory exists", paths: ["dependencies"] }
    ]),
    scoreDimension(target, "delivery_readiness", 10, [
      { id: "delivery", label: "delivery directory exists", paths: ["delivery", "docs/09-delivery"] },
      { id: "release", label: "release documents exist", paths: ["release", "docs/08-release"] },
      { id: "audit", label: "audit directory exists", paths: ["audit"] }
    ]),
    scoreDimension(target, "document_safety", 10, [
      { id: "audit", label: "audit directory exists", paths: ["audit"] },
      { id: "approval", label: "approval directory exists", paths: [".shipkit/approvals", "approvals"] },
      { id: "client_doc_safety", label: "client-facing docs can be reviewed", paths: ["delivery", "audit", "reports"] }
    ])
  ];
  const total = dimensions.reduce((sum, dim) => sum + dim.score, 0);
  return {
    status: "ok",
    scope,
    target,
    score: total,
    grade: gradeFromScore(total),
    decision: decisionFromScore(total),
    dimensions,
    generated_at: new Date().toISOString()
  };
}

function formatScoreReport(payload) {
  const lines = [];
  lines.push("# ShipKit Score Report");
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push(`- Target: ${payload.target}`);
  lines.push(`- Scope: ${payload.scope}`);
  lines.push(`- Score: ${payload.score} / 100`);
  lines.push(`- Grade: ${payload.grade}`);
  lines.push(`- Decision: ${payload.decision}`);
  lines.push(`- Generated at: ${payload.generated_at}`);
  lines.push("");
  lines.push("## Dimension Scores");
  lines.push("");
  lines.push("| Dimension | Score | Weight | Status |");
  lines.push("|---|---:|---:|---|");
  for (const dim of payload.dimensions) {
    const status = dim.score >= Math.ceil(dim.weight * 0.8) ? "PASS" : (dim.score >= Math.ceil(dim.weight * 0.6) ? "WARN" : "FAIL");
    lines.push(`| ${dim.name} | ${dim.score} | ${dim.weight} | ${status} |`);
  }
  lines.push("");
  lines.push("## Missing or Weak Signals");
  lines.push("");
  let missing = 0;
  for (const dim of payload.dimensions) {
    for (const check of dim.checks) {
      if (!check.ok) {
        missing += 1;
        lines.push(`- ${dim.name}: ${check.label}`);
      }
    }
  }
  if (!missing) lines.push("- None");
  lines.push("");
  return lines.join("\n");
}

function scoreCommand(positional, flags) {
  let scope = "project";
  if (positional[1] === "stage") scope = positional[2] || "stage";
  else if (positional[1]) scope = positional[1];
  const target = resolveCheckTarget(flags);
  const payload = buildScore(target, scope);
  const markdown = formatScoreReport(payload);
  if (flags.write) {
    ensureDir(path.join(target, "reports"));
    fs.writeFileSync(path.join(target, "reports", "score-report.md"), markdown);
    ensureDir(path.join(target, ".shipkit"));
    fs.writeFileSync(path.join(target, ".shipkit", "score.json"), JSON.stringify(payload, null, 2));
  }
  if (flags.json) console.log(JSON.stringify(payload, null, 2));
  else console.log(markdown);
  if (flags.strict && payload.score < 70) process.exit(1);
}

function testCommand(suite = "all", flags = {}) {
  const script = path.join(root, "tests", "run-tests.js");
  if (!fs.existsSync(script)) {
    console.error("Missing tests/run-tests.js");
    process.exit(1);
  }
  const childArgs = [script, suite];
  if (flags.json) childArgs.push("--json");
  const result = spawnSync(process.execPath, childArgs, { cwd: root, stdio: "inherit" });
  process.exit(result.status ?? 1);
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
    createProject(name, target, parsed.flags);
    break;
  }
  case "classify": {
    classifyCommand(parsed.flags);
    break;
  }
  case "check": {
    const requested = parsed.positional[1] || "default";
    check(requested, parsed.flags);
    break;
  }
  case "test": {
    const suite = parsed.positional[1] || "all";
    testCommand(suite, parsed.flags);
    break;
  }
  case "score": {
    scoreCommand(parsed.positional, parsed.flags);
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
