import fs from "node:fs";
import path from "node:path";
import { runInit } from "./init.js";
import { getFlag } from "../lib/args.js";
import {
  bindProject,
  doctorWorkspace,
  readRegisteredProjects,
  resolveWorkspace,
  stagePrompt,
  statusReport
} from "../lib/openclaw.js";

function printJson(value) {
  console.log(JSON.stringify(value, null, 2));
}

function printHelp() {
  console.log(`ShipKit OpenClaw

Usage:
  sk openclaw init [--workspace <path>]
  sk openclaw doctor [--workspace <path>]
  sk openclaw bind <project-id> --project <path> [--profile <profile>] [--client <name>] [--workspace <path>]
  sk openclaw status [--workspace <path>]
  sk openclaw prompt <stage> --project <id|path> [--goal <text>] [--workspace <path>]

Examples:
  sk openclaw init --workspace ~/.openclaw/workspaces/shipkit
  sk openclaw bind acme-crm --project ~/Projects/acme-crm --profile standard-team
  sk openclaw prompt intake --project acme-crm
  sk openclaw doctor
`);
}

export function openclawCommand(parsed) {
  const subcommand = parsed.positional[1] || "help";
  const workspace = getFlag(parsed, "workspace", getFlag(parsed, "to", getFlag(parsed, "target", "~/.openclaw/workspaces/shipkit")));

  switch (subcommand) {
    case "help":
    case "--help":
    case "-h":
      printHelp();
      return;

    case "init": {
      runInit("openclaw", workspace);
      const root = resolveWorkspace(workspace);
      const projectsFile = path.join(root, "projects.yaml");
      if (!fs.existsSync(projectsFile)) fs.writeFileSync(projectsFile, "projects: []\n");
      printJson({ status: "ok", command: "openclaw init", workspace: root, projects_yaml: projectsFile });
      return;
    }

    case "doctor": {
      printJson(doctorWorkspace(workspace));
      return;
    }

    case "bind": {
      const id = parsed.positional[2] || getFlag(parsed, "id", null);
      const projectPath = getFlag(parsed, "project", getFlag(parsed, "path", null));
      const profile = parsed.flags.profile;
      const client = parsed.flags.client;
      printJson(bindProject({ workspace, id, projectPath, profile, client }));
      return;
    }

    case "status": {
      printJson(statusReport(workspace));
      return;
    }

    case "projects": {
      printJson({ workspace: resolveWorkspace(workspace), projects: readRegisteredProjects(workspace) });
      return;
    }

    case "prompt": {
      const stage = parsed.positional[2] || getFlag(parsed, "stage", "intake");
      const project = getFlag(parsed, "project", parsed.positional[3] || null);
      const goal = getFlag(parsed, "goal", "");
      console.log(stagePrompt({ workspace, project, stage, goal }));
      return;
    }

    default:
      console.error(`Unknown openclaw subcommand: ${subcommand}`);
      printHelp();
      process.exit(1);
  }
}
