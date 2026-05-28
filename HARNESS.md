# ShipKit Harness

ShipKit is a portable SDLC agent harness for moving software projects from requirements to shipped delivery.

It is not a single prompt and not a single runner. ShipKit is the control layer around agent-assisted delivery:

```text
ShipKit = Protocol + Skills + Gates + Evidence + Runner Adapters
```

## Core Model

```text
requirements -> PRD -> architecture -> planning -> development -> testing -> release -> delivery
```

Every stage follows the same execution contract:

```text
Plan -> Execute -> Verify -> Handoff
```

- **Plan**: define inputs, target artifacts, assumptions, and risks.
- **Execute**: create or update the required project artifacts.
- **Verify**: run gates and collect evidence.
- **Handoff**: write the stage summary, open questions, blockers, and next actions.

## Layers

ShipKit is organized into seven layers:

1. **Protocol Layer**
   - stages, artifacts, gates, handoff, issue types, project profiles
2. **Skill Layer**
   - SDLC, ops, control, team execution, and integration skills
3. **Evidence Layer**
   - test reports, review reports, codegraph output, spec checks, run logs
4. **Gate Layer**
   - executable checks, CI checks, and human approval rules
5. **Control Layer**
   - state, memory, traceability, feedback, review loops, task registry
6. **Runner Adapter Layer**
   - OpenClaw, Codex, Claude, Cursor, Hermes, Hive, and other runners
7. **Integration Layer**
   - third-party tools, plugin catalogs, PM skill sources, code/spec systems

## Defense Model

ShipKit uses three defense layers:

```text
Constraints -> Feedback -> Gates
```

### Constraints

Constraints reduce the solution space before the agent acts.

Examples:

- `AGENTS.md`
- `SOUL.md`
- architecture rules
- coding standards
- tool policy
- project profiles
- stage protocols

### Feedback

Feedback turns failures into structured signals an agent can use.

Examples:

- lint/test output
- gate reports
- review scorecards
- bug reports
- incident postmortems
- feedback logs

### Gates

Gates prevent unsafe or incomplete outputs from advancing.

Examples:

- secret scanning
- task ownership checks
- traceability checks
- profile consistency checks
- client document redline checks
- security and release checks
- human approval checks

## Facts Live in Files

Chat history is not a source of truth.

Durable project facts must live in files such as:

```text
shipkit.yaml
STATE.md
docs/
tasks/
team/
modules/
handoff/
trace/
evidence/
reports/
```

Agents may reason in chat, but project state must be persisted as artifacts.

## Runner Adapters Execute; ShipKit Controls

A runner adapter can execute agent work, spawn subagents, call tools, or stream events.

ShipKit still controls:

- project protocol
- artifact locations
- gate results
- evidence requirements
- approval policy
- delivery readiness

External tools and third-party plugins should write evidence first. ShipKit gates decide whether the result can advance the project.

## Human Approval

High-risk actions require human approval, including:

- final quote or contract commitments
- production deployment
- destructive data changes
- schema migrations
- credential or secret access
- customer-facing delivery packages
- scope expansion or delivery-date changes

## Project Profiles

Profiles keep ShipKit appropriately sized for the project.

- `simple-solo`: lightweight single-person projects
- `simple-team`: small projects with more than one contributor
- `standard-solo`: normal single-owner delivery
- `standard-team`: normal team delivery
- `complex-team`: high-risk or multi-module delivery
- `complex-multi`: multi-team/vendor/system delivery

Profiles decide which layers, directories, skills, and gates are enabled by default.

## Core Principles

1. ShipKit core must stay platform-neutral.
2. Every stage must follow Plan -> Execute -> Verify -> Handoff.
3. Every meaningful action must update an artifact or evidence file.
4. Gates decide progression, not agent confidence.
5. Third-party tools write evidence first.
6. High-risk actions require human approval.
7. Client-facing documents must be audited before delivery.
8. Every change must be traceable from requirement to delivery.
9. Every failed run should produce failure attribution.
10. Small projects should stay lightweight; complex projects should not skip governance.

## More Documentation

- [docs/README.md](docs/README.md)
- [docs/HARNESS_ENGINEERING.md](docs/HARNESS_ENGINEERING.md)
- [docs/PEV_MODEL.md](docs/PEV_MODEL.md)
- [docs/DEFENSE_LAYERS.md](docs/DEFENSE_LAYERS.md)
- [docs/PROJECT_PROFILES.md](docs/PROJECT_PROFILES.md)
- [docs/TEAM_EXECUTION.md](docs/TEAM_EXECUTION.md)
