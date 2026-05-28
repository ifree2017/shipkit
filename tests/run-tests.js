#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const requested = process.argv[2] || "all";
const json = process.argv.includes("--json");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "shipkit-test-"));

function run(name, command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || root,
    encoding: "utf8",
    shell: false
  });
  return {
    name,
    ok: result.status === 0,
    status: result.status,
    command: [command, ...args].join(" "),
    stdout: (result.stdout || "").trim(),
    stderr: (result.stderr || "").trim()
  };
}

function sk(name, args, options = {}) {
  return run(name, process.execPath, [path.join(root, "bin/sk.js"), ...args], options);
}

const suites = {
  cli: () => [
    run("syntax", process.execPath, ["--check", path.join(root, "bin/sk.js")]),
    sk("check-default", ["check", "--to", root, "--soft"]),
    sk("check-list", ["check", "list", "--to", root])
  ],
  profiles: () => {
    const simple = path.join(tmp, "simple");
    const team = path.join(tmp, "team");
    return [
      sk("new-simple-solo", ["new", "simple", "--to", simple, "--profile", "simple-solo"]),
      sk("check-simple-solo", ["check", "--project", simple, "--soft"]),
      sk("new-standard-team", ["new", "team", "--to", team, "--profile", "standard-team"]),
      sk("check-standard-team", ["check", "--project", team, "--soft"]),
      sk("score-standard-team", ["score", "--project", team, "--write"])
    ];
  },
  gates: () => [
    sk("check-validation", ["check", "validation", "--to", root, "--soft"]),
    sk("check-scoring", ["check", "scoring", "--to", root, "--soft"])
  ],
  adapters: () => {
    const codex = path.join(tmp, "codex");
    const openclaw = path.join(tmp, "openclaw");
    return [
      sk("init-codex", ["init", "codex", "--to", codex]),
      sk("init-openclaw", ["init", "openclaw", "--to", openclaw])
    ];
  },
  package: () => [
    run("npm-pack-dry-run", "npm", ["pack", "--dry-run"], { cwd: root })
  ]
};

const selected = requested === "all" ? Object.keys(suites) : [requested];
let results = [];
for (const suite of selected) {
  if (!suites[suite]) {
    results.push({ name: `unknown-suite:${suite}`, ok: false, status: 1, command: suite, stdout: "", stderr: "Unknown test suite" });
    continue;
  }
  results = results.concat(suites[suite]());
}
const ok = results.every((result) => result.ok);
const payload = { status: ok ? "ok" : "failed", suite: requested, tmp, results };
if (json) {
  console.log(JSON.stringify(payload, null, 2));
} else {
  console.log(`ShipKit selftest: ${requested}`);
  for (const result of results) {
    console.log(`${result.ok ? "PASS" : "FAIL"} ${result.name}`);
    if (!result.ok) {
      if (result.stdout) console.log(result.stdout);
      if (result.stderr) console.error(result.stderr);
    }
  }
  const passed = results.filter((result) => result.ok).length;
  console.log(`Summary: ${passed}/${results.length} passed`);
}
process.exit(ok ? 0 : 1);
