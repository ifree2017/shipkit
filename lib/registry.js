import fs from "node:fs";
import path from "node:path";
import { GATES_DIR, ROOT } from "./context.js";
import { readJson } from "./fsx.js";
import { PROFILE_SUITES } from "./profiles.js";

export function mergeRegistry(baseRegistry, addon) {
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

export function defaultRegistry() {
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

export function loadGateRegistry() {
  const registryPath = path.join(GATES_DIR, "registry.json");
  let registry = mergeRegistry(defaultRegistry(), readJson(registryPath, { aliases: {}, suites: {}, gates: {} }));

  if (fs.existsSync(GATES_DIR)) {
    for (const file of fs.readdirSync(GATES_DIR).sort()) {
      if (!/^registry\..+\.json$/.test(file)) continue;
      registry = mergeRegistry(registry, readJson(path.join(GATES_DIR, file), { aliases: {}, suites: {}, gates: {} }));
    }
  }
  return registry;
}

export function listGateFiles() {
  if (!fs.existsSync(GATES_DIR)) return [];
  return fs.readdirSync(GATES_DIR)
    .filter((file) => /^check.*\.js$/.test(file))
    .sort();
}

export function gateNameFromFile(file) {
  if (file === "check.js") return "smoke";
  return file.replace(/^check-?/, "").replace(/\.js$/, "").replace(/_/g, "-");
}

export function resolveGateScript(name, registry) {
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
    if (fs.existsSync(path.join(ROOT, "gates", candidate))) return candidate;
  }
  return null;
}

export function expandCheckItems(names, registry, seen = new Set()) {
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
