# Alpha Stabilization Roadmap

ShipKit is in alpha. The goal of the stabilization phase is to make ShipKit installable, testable, understandable, and safe to try on real but low-risk projects.

This roadmap turns the current architecture into a usable foundation before adding more runner integrations or advanced automation.

## Stabilization Goals

ShipKit should be able to reliably do the following:

```bash
sk --help
sk new demo --profile standard-team --to ./demo
sk check --project ./demo
sk init codex --to ./codex-workspace
sk init openclaw --to ~/.openclaw/workspaces/shipkit
npm pack --dry-run
```

## Phase A: Core Reliability

Status: in progress.

Focus:

- Keep `sk check` stable.
- Keep profile-driven project scaffolding stable.
- Keep adapter initialization stable.
- Keep package creation stable.
- Avoid adding new concepts unless they support release readiness.

Acceptance criteria:

- `sk check --to .` passes.
- `sk new demo --profile standard-team` creates a valid sample project.
- `sk check --project demo` passes for the sample project.
- `sk init codex` and `sk init openclaw` generate expected workspace files.
- `npm pack --dry-run` passes.

## Phase B: Test Coverage

Status: next.

Focus:

- Add CLI smoke tests.
- Add gate registry tests.
- Add project profile tests.
- Add adapter init tests.
- Add package dry-run test.

Initial test matrix:

| Area | Expected coverage |
|---|---|
| CLI syntax | `node --check bin/sk.js` |
| Check runner | `sk check --to .` |
| Profiles | create and check `simple-solo`, `standard-team` |
| Adapters | init `codex`, `openclaw` |
| Package | `npm pack --dry-run` |

## Phase C: Documentation Clarity

Status: in progress.

Focus:

- README explains current alpha status.
- README links to examples, roadmap, publishing, and CLI reference.
- `docs/README.md` acts as a documentation index.
- `skills/INDEX.md` acts as a human-readable skill index.
- Examples show the difference between simple and team projects.

## Phase D: Release Readiness

Status: planned.

Focus:

- Create `v0.2.0-alpha` release checklist.
- Add a release readiness gate.
- Verify npm package contents.
- Publish only after examples and tests are stable.

Minimum release criteria:

- README is current.
- `npm test` or equivalent selftest passes.
- At least two example projects exist.
- `npm pack --dry-run` passes.
- The release notes clearly state alpha limitations.

## Phase E: Runner Integration

Status: planned.

ShipKit should not rush runner integration before the core is stable.

Candidate runners:

- Hive
- OpenClaw
- CodeGraph
- OpenSpec
- OpenCode

Rule:

Runner adapters execute. ShipKit controls state, gates, evidence, and handoff.

## Current Priority Order

1. Keep `sk check` stable.
2. Add and maintain tests.
3. Keep README and docs aligned with actual behavior.
4. Publish `v0.2.0-alpha` only after release readiness checks pass.
5. Add one runnable runner adapter.
6. Expand examples into complete case studies.
