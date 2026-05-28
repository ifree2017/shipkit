import fs from "node:fs";
import path from "node:path";
import { ensureDir, writeIfMissing } from "../lib/fsx.js";
import { resolvePath } from "../lib/paths.js";
import { PROFILE_DIRS, selectProjectProfile } from "../lib/profiles.js";
import { yamlList } from "../lib/yaml.js";

export function createProject(name, target, flags = {}) {
  if (!name) {
    console.error("Missing project name.");
    process.exit(1);
  }

  const out = resolvePath(target || name);
  ensureDir(out);
  let classification;
  try {
    classification = selectProjectProfile(flags);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

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
