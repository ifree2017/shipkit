# ShipKit

Portable SDLC agent harness for moving software projects from requirements to shipped delivery.

ShipKit provides protocols, skills, gates, evidence tracking, project profiles, team execution patterns, and platform adapters for agent-assisted software delivery.

```text
requirements -> PRD -> architecture -> planning -> development -> testing -> release -> delivery
```

ShipKit is designed for teams that want agents to help execute software projects while keeping project facts, decisions, evidence, and approvals visible in files.

---

## Current Status

**Alpha.** ShipKit is currently focused on stabilization, examples, tests, and the first public alpha release.

What exists today:

- Project scaffolding through `sk new`
- Project profiles from `simple-solo` to `complex-multi`
- A gate runner through `sk check`
- SDLC skills and workflows for requirements, PRD, architecture, planning, build, test, release, and delivery
- Team execution layer for tasks, modules, workload, progress, sync, and status reports
- Change / bug / refactor / risk / blocker / dependency flows
- Control, evidence, traceability, permission, and human-approval layers
- Integration mappings for external tools, skills, runners, and code intelligence systems
- Platform adapters for OpenClaw, Codex, Claude, Cursor, Hermes, and generic workspaces

What is still stabilizing:

- CLI modularization into `commands/` and `lib/`
- Test coverage for core CLI and gates
- Runner adapters for Hive, CodeGraph, OpenSpec, and other execution backends
- Deeper implementation of several stage skills and workflow files
- Real-world examples and case studies
- First npm / GitHub alpha release

See [Alpha Stabilization Roadmap](docs/ALPHA_STABILIZATION_ROADMAP.md).

---

## Core Model

ShipKit separates project delivery into five layers:

```text
protocols  -> define stage, artifact, profile, gate, handoff, and evidence contracts
skills     -> guide agents through specific delivery tasks
gates      -> verify whether artifacts are ready to move forward
evidence   -> records what happened and why it is trustworthy
adapters   -> map ShipKit into different agent runtimes and workspaces
```

Every meaningful stage should follow:

```text
Plan -> Execute -> Verify -> Handoff
```

Project facts live in repository files, not chat history. Gates decide progression, not agent confidence.

---

## Core Flow

```text
intake -> discover -> scope -> prd -> arch -> plan -> build -> test -> release -> delivery
```

ShipKit also models non-linear project work:

```text
change request -> impact analysis -> decision -> update affected artifacts -> verify
bug             -> triage -> root cause -> fix -> regression evidence
refactor        -> impact analysis -> approval -> implementation -> regression evidence
risk/blocker    -> owner -> action -> status report -> escalation when needed
```

---

## Install

```bash
npm install -g @ifree2017/shipkit
```

Or run directly:

```bash
npx @ifree2017/shipkit --help
```

For local development:

```bash
npm link
sk --help
```

---

## Quick Start

Create a lightweight solo project:

```bash
sk new landing-page --profile simple-solo --to ./landing-page
sk check --project ./landing-page
```

Create a standard team project:

```bash
sk new crm --profile standard-team --to ./crm
sk check --project ./crm
```

Classify a project before creating it:

```bash
sk classify --features 8 --modules 3 --contributors 4 --external --production
```

Install ShipKit into an agent platform workspace:

```bash
sk init codex --to .
sk init openclaw --to ~/.openclaw/workspaces/shipkit
sk init claude --to .
sk init cursor --to .
```

---

## Project Profiles

Profiles keep small projects lightweight and complex projects controlled.

| Profile | Best for | Typical checks |
|---|---|---|
| `simple-solo` | one-person small feature or script | smoke, secrets, profile |
| `simple-team` | small project with more than one contributor | simple + light team checks |
| `standard-solo` | standard single-owner delivery | core, changes, delivery |
| `standard-team` | normal client/internal team project | core, team, changes, ops-lite |
| `complex-team` | high-risk or multi-module team delivery | core, team, control, ops, delivery |
| `complex-multi` | multi-team/vendor/system delivery | complex + integrations and stronger handoffs |

Examples:

```bash
sk new landing-page --profile simple-solo
sk new crm --profile standard-team --to ~/Projects/crm
sk new migration --profile complex-team --to ~/Projects/migration
```

See [Project Profiles](docs/PROJECT_PROFILES.md).

---

## CLI

```bash
sk init <platform> --to <path>
sk new <project-name> [--to <path>] [--profile <profile>]
sk classify [--project <path>] [--features <n>] [--modules <n>] [--contributors <n>]
sk check [gate|suite] [--to <path>] [--project <name|path>] [--json] [--strict]
sk check list
```

`sk up` exists as a placeholder for future upgrade behavior and should be treated as experimental.

See [CLI Reference](docs/CLI_REFERENCE.md).

---

## Testing and Validation

The alpha stabilization target is that these commands should stay healthy:

```bash
node --check bin/sk.js
sk check --to .
sk new demo --profile standard-team --to /tmp/shipkit-demo
sk check --project /tmp/shipkit-demo
npm pack --dry-run
```

Upcoming or optional validation commands may include:

```bash
sk test
sk score --project ./client-project
sk check release-readiness --to .
```

See [Testing](docs/TESTING.md).

---

## Examples

Initial examples are provided under `examples/`:

- [Simple solo project](examples/simple-solo/README.md)
- [Standard team project](examples/standard-team/README.md)
- [Change / bug / refactor flow](examples/change-bug-refactor/README.md)

The next milestone is to expand these into complete example projects with `shipkit.yaml`, docs, tasks, evidence, reports, and score outputs.

See [Examples](docs/EXAMPLES.md).

---

## Supported Platform Adapters

- `openclaw`
- `codex`
- `claude`
- `cursor`
- `hermes`
- `generic`

Adapters install the same ShipKit core into different agent workspaces. ShipKit core stays platform-neutral.

---

## Repository Layout

```text
shipkit/
├── bin/              # CLI entrypoint
├── protocol/         # stage, gate, profile, evidence, and control specs
├── skills/           # reusable ShipKit skills
├── workflows/        # stage and issue-flow workflows
├── gates/            # executable checks used by sk check
├── templates/        # artifact templates
├── adapters/         # platform workspace mappings
├── integrations/     # external tool/skill integration notes
├── tools/            # tool and MCP maps
├── docs/             # guides and reference docs
└── examples/         # example project materials
```

---

## Documentation

Start here:

- [Harness model](HARNESS.md)
- [Documentation index](docs/README.md)
- [Alpha Stabilization Roadmap](docs/ALPHA_STABILIZATION_ROADMAP.md)
- [Roadmap](docs/ROADMAP.md)
- [CLI Reference](docs/CLI_REFERENCE.md)
- [Project Profiles](docs/PROJECT_PROFILES.md)
- [Team Execution](docs/TEAM_EXECUTION.md)
- [Validation and Scoring](docs/VALIDATION_AND_SCORING.md)
- [Publishing](docs/PUBLISHING.md)
- [Examples](docs/EXAMPLES.md)

---

## Design Principles

- ShipKit core must stay platform-neutral.
- Runner adapters execute; ShipKit controls.
- Every meaningful action should update an artifact or evidence file.
- Every stage should produce a handoff.
- Third-party tools write evidence first; gates decide whether it can advance.
- High-risk actions require human approval.
- Client-facing artifacts must be audited before delivery.
- Small projects should stay light; complex projects should not skip governance.

---

## Roadmap

Near-term focus for `v0.2.0-alpha`:

1. stabilize `sk check`, project profiles, examples, and package checks
2. expand tests for CLI and gate registry behavior
3. split the CLI implementation into `commands/` and `lib/`
4. publish the first GitHub/npm alpha release
5. add one runnable agent runner adapter, starting with Hive or OpenClaw
6. expand example projects into complete case studies
7. connect CodeGraph and OpenSpec through evidence-first adapters

See [Roadmap](docs/ROADMAP.md) and [Release v0.2.0 Alpha](docs/RELEASE_V0_2_ALPHA.md).

---

## Current Limitations

- Some skills and workflows are still scaffold-level and need deeper stage-specific guidance.
- Runner adapters are mostly file/workspace adapters; long-running execution adapters are planned.
- License and vendor checks currently validate structure, not full legal/compliance policy.
- Real-world case studies are still being built.
- `sk up` is experimental and not implemented yet.
