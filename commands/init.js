import path from "node:path";
import { ROOT } from "../lib/context.js";
import { copyDir, ensureDir, writeIfMissing } from "../lib/fsx.js";
import { resolvePath } from "../lib/paths.js";

export function runInit(platform = "generic", target = ".") {
  const normalized = platform || "generic";
  const out = resolvePath(target || ".");
  ensureDir(out);

  copyDir(path.join(ROOT, "protocol"), path.join(out, "protocol"));
  copyDir(path.join(ROOT, "skills"), path.join(out, normalized === "codex" ? ".agents/skills" : "skills"));
  copyDir(path.join(ROOT, "workflows"), path.join(out, "workflows"));
  copyDir(path.join(ROOT, "templates"), path.join(out, "templates"));
  copyDir(path.join(ROOT, "gates"), path.join(out, "gates"));
  copyDir(path.join(ROOT, "agents"), path.join(out, "agents"));
  copyDir(path.join(ROOT, "docs"), path.join(out, "docs"));
  copyDir(path.join(ROOT, "integrations"), path.join(out, "integrations"));
  copyDir(path.join(ROOT, "tools"), path.join(out, "tools"));
  copyDir(path.join(ROOT, "spec"), path.join(out, "spec"));

  const adapter = path.join(ROOT, "adapters", normalized);
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
