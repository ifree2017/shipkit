import fs from "node:fs";
import path from "node:path";
import { resolvePath } from "./paths.js";
import { parseSimpleYamlValue } from "./yaml.js";

export function readProjectProfile(projectPath) {
  const file = path.join(projectPath, "shipkit.yaml");
  if (!fs.existsSync(file)) return null;
  const text = fs.readFileSync(file, "utf8");
  return parseSimpleYamlValue(text, "profile");
}

export function parseProjectRegistry(workspace, projectName) {
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

export function resolveCheckTarget(flags) {
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
