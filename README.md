# ShipKit

Portable SDLC agent harness for moving software projects from requirements to shipped delivery.

ShipKit provides protocols, skills, gates, evidence tracking, project profiles, and platform adapters for agent-assisted software delivery. It is designed for workflows such as:

```text
requirements -> PRD -> architecture -> planning -> development -> testing -> release -> delivery
```

## Status

**Alpha.**

ShipKit currently provides:

- project profiles and project scaffolding
- a gate runner (`sk check`) with profile-aware checks
- SDLC skills and workflows
- team execution, workload, progress, and sync tracking
- change / bug / refactor / risk / blocker / dependency flows
- control, evidence, traceability, and permission layers
- integration mappings for external tools and skill sources
- adapters for OpenClaw, Codex, Claude, Cursor, Hermes, and generic workspaces

Runner integrations such as Hive, CodeGraph, OpenSpec, and deeper platform execution loops are evolving.

## Core Flow

```text
intake -> discover -> scope -> prd -> arch -> plan -> build -> test -> release -> delivery
```

Every stage should follow:

```text
Plan -> Execute -> Verify -> Handoff
```

Project facts live in repository files, not chat history. Gates decide progression, not agent confidence.

## Install

```bash
npm install -g @ifree2017/shipkit
```

Or run directly:

```bash
npx @ifree2017/shipkit --help
```

## Quick Start

Create a project:

```bash
sk new crm --profile standard-team --to ./crm
```

Run checks for that project:

```bash
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

## CLI

```bash
sk init <platform> --to <path>
sk new <project-name> [--to <path>] [--profile <profile>]
sk classify [--project <path>] [--features <n>] [--modules <n>] [--contributors <n>]
sk check [gate|suite] [--to <path>] [--project <name|path>] [--json] [--strict]
sk check list
```

`sk up` exists as a placeholder for future upgrade behavior and should be treated as experimental.

See [docs/CLI_REFERENCE.md](docs/CLI_REFERENCE.md).

## Supported Platform Adapters

- `openclaw`
- `codex`
- `claude`
- `cursor`
- `hermes`
- `generic`

Adapters install the same ShipKit core into different agent workspaces. ShipKit core stays platform-neutral.

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

## Documentation

Start here:

- [Harness model](HARNESS.md)
- [Documentation index](docs/README.md)
- [CLI reference](docs/CLI_REFERENCE.md)
- [Project profiles](docs/PROJECT_PROFILES.md)
- [Team execution](docs/TEAM_EXECUTION.md)
- [Integrations](docs/INTEGRATIONS_ADDON.md)
- [Roadmap](docs/ROADMAP.md)

## Design Principles

- ShipKit core must stay platform-neutral.
- Runner adapters execute; ShipKit controls.
- Every meaningful action should update an artifact or evidence file.
- Every stage should produce a handoff.
- Third-party tools write evidence first; gates decide whether it can advance.
- High-risk actions require human approval.
- Client-facing artifacts must be audited before delivery.

## Current Limitations

- The CLI is still a single-file implementation and will be split into `commands/` and `lib/`.
- Some skills and workflows are scaffold-level and need deeper stage-specific guidance.
- Runner adapters are mostly file/workspace adapters; long-running execution adapters are planned.
- License and vendor checks currently validate structure, not full legal/compliance policy.

## Roadmap

Near-term focus:

1. stabilize `sk check` and registry validation
2. split the CLI implementation
3. deepen core SDLC skills and workflows
4. add Hive runner adapter
5. add CodeGraph and OpenSpec execution adapters
6. improve evidence and traceability automation

See [docs/ROADMAP.md](docs/ROADMAP.md).

## Validation and scoring

```bash
sk test
sk score --project ./client-project --write
```

`sk test` checks ShipKit's own CLI, profiles, gates, adapters, and package build. `sk score` creates an advisory readiness score for a project workspace.
