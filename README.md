# ShipKit

Portable SDLC agent harness for moving software projects from requirements to shipped delivery.

ShipKit provides protocols, skills, gates, evidence tracking, project profiles, and platform adapters for agent-assisted software delivery. It is designed for workflows such as:

```text
requirements -> PRD -> architecture -> planning -> development -> testing -> release -> delivery
```

## Current Status

**Alpha. Not production-ready.**

ShipKit is intended for internal pilots, harness design research, and early agent-assisted SDLC experiments. It is not yet recommended for production-critical delivery automation.

Current stabilization focus:

- publish the first alpha release (`v0.2.0-alpha`)
- keep `sk check`, profiles, and examples stable
- expand realistic examples
- split the CLI into `commands/` and `lib/`
- add the first real runner adapter

> Name note: this repository is `ifree2017/shipkit`, a portable SDLC agent harness. It is unrelated to other projects named ShipKit in Maven publishing, SaaS scaffolding, app store automation, or package release tooling.

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

## Why ShipKit

ShipKit is not a general agent framework, not a coding agent, and not a prompt collection. It is an SDLC delivery control layer.

```text
Runner executes. ShipKit controls.
```

Use OpenClaw, Codex, Claude Code, Cursor, Hive, OpenCode, or another runner to execute work. Use ShipKit to define project stages, artifacts, evidence, gates, scores, approvals, and handoffs.

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
- [Alpha stabilization roadmap](docs/ALPHA_STABILIZATION_ROADMAP.md)
- [Release notes for v0.2.0-alpha](docs/RELEASE_NOTES_V0_2_ALPHA.md)
- [Not production-ready note](docs/NOT_PRODUCTION_READY.md)
- [Examples](docs/EXAMPLES.md)

## Design Principles

- ShipKit core must stay platform-neutral.
- Runner adapters execute; ShipKit controls.
- Every meaningful action should update an artifact or evidence file.
- Every stage should produce a handoff.
- Third-party tools write evidence first; gates decide whether it can advance.
- High-risk actions require human approval.
- Client-facing artifacts must be audited before delivery.

## Current Limitations

- ShipKit is alpha-stage software and not production-ready.
- The CLI is still being modularized; avoid adding large runner implementations directly into `bin/sk.js`.
- Some skills and workflows are scaffold-level and need deeper stage-specific guidance.
- Runner adapters are mostly file/workspace adapters; long-running execution adapters are planned.
- License and vendor checks currently validate structure, not full legal/compliance policy.
- Examples are illustrative and should not be treated as production delivery records.

## Roadmap

Near-term focus:

1. ship `v0.2.0-alpha` with release-readiness checks
2. stabilize `sk check`, examples, and npm packaging
3. split the CLI implementation
4. deepen core SDLC skills and workflows
5. add Hive runner adapter
6. add CodeGraph and OpenSpec execution adapters
7. improve evidence and traceability automation

See [docs/ROADMAP.md](docs/ROADMAP.md).
