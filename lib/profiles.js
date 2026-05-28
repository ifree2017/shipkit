import { boolFlag, numberFlag } from "./args.js";

export const PROFILES = new Set([
  "simple-solo",
  "simple-team",
  "standard-solo",
  "standard-team",
  "complex-team",
  "complex-multi"
]);

export const PROFILE_SUITES = {
  "simple-solo": ["smoke", "secrets", "profile"],
  "simple-team": ["smoke", "secrets", "profile", "team"],
  "standard-solo": ["core", "changes", "profile"],
  "standard-team": ["core", "changes", "team", "ops", "profile"],
  "complex-team": ["core", "team", "changes", "ops", "control", "harness", "delivery", "profile"],
  "complex-multi": ["core", "team", "changes", "ops", "control", "harness", "delivery", "integrations", "profile"]
};

export const PROFILE_DIRS = {
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

export function profileFromModeTeam(mode, team) {
  const normalizedMode = mode || "standard";
  let normalizedTeam = team || "solo";
  if (normalizedTeam === "multi-team") normalizedTeam = "multi";
  if (normalizedMode === "complex" && normalizedTeam === "multi") return "complex-multi";
  const candidate = `${normalizedMode}-${normalizedTeam}`;
  if (PROFILES.has(candidate)) return candidate;
  if (normalizedMode === "complex" && normalizedTeam === "solo") return "complex-team";
  return "standard-solo";
}

export function classifyFromSignals(flags = {}) {
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

export function selectProjectProfile(flags) {
  if (flags.profile) {
    const profile = String(flags.profile);
    if (!PROFILES.has(profile)) {
      throw new Error(`Unknown profile: ${profile}. Supported profiles: ${[...PROFILES].join(", ")}`);
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
