import { spawnSync } from "node:child_process";
import path from "node:path";
import { ROOT } from "./context.js";
import { resolvePath } from "./paths.js";
import { readProjectProfile, resolveCheckTarget } from "./project.js";
import { expandCheckItems, gateNameFromFile, listGateFiles, loadGateRegistry, resolveGateScript } from "./registry.js";

export function collectCheckItems(requested, registry, flags, target) {
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

export function runGate(name, script, target, flags) {
  const scriptPath = path.join(ROOT, "gates", script);
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

export function printGateResult(result) {
  const icon = result.ok ? "PASS" : "FAIL";
  console.log(`${icon} ${result.name} (${result.script})`);
  if (result.stdout) console.log(result.stdout);
  if (result.stderr) console.error(result.stderr);
}

export function executeCheck(requested, flags) {
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
