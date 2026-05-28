import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { ensureDir, writeIfMissing } from "./fsx.js";
import { resolvePath, expandHome } from "./paths.js";

export const DEFAULT_OPENCLAW_WORKSPACE = "~/.openclaw/workspaces/shipkit";

export function defaultWorkspace() {
  return resolvePath(DEFAULT_OPENCLAW_WORKSPACE);
}

export function resolveWorkspace(input) {
  return resolvePath(input || DEFAULT_OPENCLAW_WORKSPACE);
}

export function detectOpenClawCli() {
  const result = spawnSync("openclaw", ["--help"], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  return {
    available: result.status === 0 || Boolean((result.stdout || result.stderr || "").trim()),
    status: result.status,
    output: (result.stdout || result.stderr || "").trim().slice(0, 2000)
  };
}

export function requiredWorkspaceFiles() {
  return [
    "AGENTS.md",
    "SOUL.md",
    "protocol/stages.yaml",
    "skills/intake/SKILL.md",
    "workflows/01-intake.md",
    "gates/registry.json"
  ];
}

export function doctorWorkspace(workspace) {
  const root = resolveWorkspace(workspace);
  const required = requiredWorkspaceFiles();
  const missing = required.filter((relative) => !fs.existsSync(path.join(root, relative)));
  const cli = detectOpenClawCli();
  const projectsFile = path.join(root, "projects.yaml");

  return {
    status: missing.length === 0 ? "ok" : "warning",
    workspace: root,
    openclaw_cli: cli.available ? "available" : "not_detected",
    projects_yaml: fs.existsSync(projectsFile) ? "present" : "missing",
    missing,
    next: missing.length === 0
      ? ["Run: sk openclaw status --workspace " + root]
      : ["Run: sk init openclaw --to " + root]
  };
}

export function ensureProjectsFile(workspace) {
  const root = resolveWorkspace(workspace);
  ensureDir(root);
  const file = path.join(root, "projects.yaml");
  writeIfMissing(file, "projects: []\n");
  return file;
}

function parseProjectEntries(text) {
  const entries = [];
  let current = null;
  for (const line of (text || "").split(/\r?\n/)) {
    const item = /^\s*-\s+id:\s*(.+?)\s*$/.exec(line);
    if (item) {
      if (current) entries.push(current);
      current = { id: stripQuotes(item[1]) };
      continue;
    }
    const field = /^\s+(path|profile|status|client|updated_at):\s*(.*?)\s*$/.exec(line);
    if (field && current) current[field[1]] = stripQuotes(field[2]);
  }
  if (current) entries.push(current);
  return entries;
}

function stripQuotes(value) {
  return String(value || "").trim().replace(/^['\"]|['\"]$/g, "");
}

function toProjectsYaml(entries) {
  const lines = ["projects:"];
  for (const entry of entries) {
    lines.push(`  - id: ${entry.id}`);
    lines.push(`    path: ${entry.path}`);
    if (entry.profile) lines.push(`    profile: ${entry.profile}`);
    if (entry.status) lines.push(`    status: ${entry.status}`);
    if (entry.client) lines.push(`    client: ${entry.client}`);
    lines.push(`    updated_at: ${new Date().toISOString()}`);
  }
  return lines.join("\n") + "\n";
}

export function readRegisteredProjects(workspace) {
  const file = ensureProjectsFile(workspace);
  return parseProjectEntries(fs.readFileSync(file, "utf8"));
}

export function bindProject({ workspace, id, projectPath, profile, status = "active", client }) {
  if (!id) throw new Error("Missing project id. Use --id <project-id> or pass a project name.");
  if (!projectPath) throw new Error("Missing project path. Use --project <path>.");

  const root = resolveWorkspace(workspace);
  const file = ensureProjectsFile(root);
  const existing = parseProjectEntries(fs.readFileSync(file, "utf8"));
  const resolvedProject = resolvePath(projectPath);
  const next = existing.filter((entry) => entry.id !== id);
  next.push({ id, path: resolvedProject, profile, status, client });
  fs.writeFileSync(file, toProjectsYaml(next));

  return { status: "ok", workspace: root, project_id: id, project_path: resolvedProject, projects_yaml: file };
}

export function resolveRegisteredProject(workspace, idOrPath) {
  if (!idOrPath) return null;
  const expanded = expandHome(idOrPath);
  if (expanded.includes("/") || expanded.startsWith(".")) return resolvePath(expanded);
  const found = readRegisteredProjects(workspace).find((entry) => entry.id === idOrPath);
  return found ? resolvePath(found.path) : null;
}

export function stagePrompt({ workspace, project, stage = "intake", goal }) {
  const root = resolveWorkspace(workspace);
  const resolvedProject = resolveRegisteredProject(root, project) || (project ? resolvePath(project) : "<project-path>");
  const stageName = stage || "intake";
  return [
    `Use ShipKit on project path: ${resolvedProject}`,
    `Run stage: ${stageName}`,
    "",
    "Required operating rules:",
    "1. Read the project shipkit.yaml, STATE.md, and the relevant protocol/workflow files first.",
    "2. Treat repository artifacts as the source of truth, not chat history.",
    "3. Produce or update stage artifacts under the project directory.",
    "4. Write handoff notes under handoff/ when the stage completes.",
    "5. Run or request the relevant ShipKit gates before recommending progression.",
    goal ? `\nGoal/context:\n${goal}` : ""
  ].filter(Boolean).join("\n");
}

export function statusReport(workspace) {
  const root = resolveWorkspace(workspace);
  const doctor = doctorWorkspace(root);
  const projects = fs.existsSync(path.join(root, "projects.yaml")) ? readRegisteredProjects(root) : [];
  return { ...doctor, projects };
}
