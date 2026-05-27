# ShipKit Control Layer Add-on

This add-on turns ShipKit from a linear delivery checklist into a controllable engineering system.

## Purpose

ShipKit must support more than forward progress:

- sense project state
- compare actual state with expected state
- detect deviation
- decide corrective action
- execute action
- verify result
- feed lessons back into docs, gates, skills, and templates

This is the control loop of ShipKit.

## Core Idea

Software delivery is a dynamic system. Requirements, architecture, code, tests, release, and delivery are not independent documents. They are coupled signals.

ShipKit should treat each project as a controlled system:

```text
input -> process -> output -> measurement -> feedback -> correction
```

Mapped to ShipKit:

```text
client need -> PRD/architecture/build -> release/delivery -> QA/UAT/metrics -> feedback -> change/bug/refactor/update
```

## What This Adds

- control-loop protocol
- traceability protocol
- quality model
- platform capability matrix
- autonomy and approval policies
- feedback-loop skills
- traceability gates
- agent-legibility review
- platform adapters for OpenClaw, Codex, Claude Code, Cursor, Hermes, and Wangyuyan

## Design Principles

1. Repository-local facts are the source of truth.
2. Chat history is not a source of truth.
3. Every deviation must become a structured issue, decision, or update.
4. Every stage must have input, output, gate, owner, and handoff.
5. Every requirement must trace to PRD, architecture, task, test, release, and delivery evidence.
6. Every rule repeated twice should become a gate, hook, linter, template, or skill.
7. Every agent failure is a signal about missing context, weak tools, weak boundaries, or weak verification.
8. Human judgment should focus on goals, tradeoffs, commitments, pricing, scope, and risk acceptance.
9. Agents should handle repeatable execution inside explicit boundaries.
10. Control is not command-and-control; control means measurable feedback and bounded correction.

## Recommended New Project Files

Inside each ShipKit project:

```text
control/
├── control-report.md
├── feedback-log.md
├── quality-scorecard.md
├── autonomy-level.md
└── agent-legibility-review.md

trace/
├── trace-map.md
├── requirement-map.md
├── test-map.md
└── release-map.md
```

## Recommended Stage Policy

- Intake, scope, quote, contract, release, and delivery require human approval.
- PRD, architecture, plan, build, test can be agent-assisted but must pass gates.
- Production changes require explicit release gate and rollback plan.
- Client-facing documents require audit gate.
- If a gate fails twice for the same reason, create a feedback item to improve ShipKit itself.
