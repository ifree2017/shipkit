import fs from "node:fs";
import path from "node:path";
import { resolvePath } from "../lib/paths.js";
import { classifyFromSignals } from "../lib/profiles.js";
import { parseSimpleYamlValue } from "../lib/yaml.js";

export function classifyCommand(flags) {
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
