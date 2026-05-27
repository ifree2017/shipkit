---
name: gate
description: Use when deciding whether a ShipKit stage can advance, when running stage checks, when a gate fails, or when the user asks if a project is ready for quote, PRD, release, or delivery.
---

# Gate

A gate is a formal decision point.

## Inputs

Read:

- protocol/stages.yaml
- protocol/gates.yaml
- protocol/quality-model.yaml
- protocol/control-policies.yaml
- current stage artifacts
- trace/trace-map.md
- control/quality-scorecard.md

## Output

Create or update:

- control/gate-result.md
- handoff/<stage>.handoff.md

## Decision Values

- PASS
- PASS_WITH_ASSUMPTIONS
- FAIL
- NEEDS_HUMAN_APPROVAL

## Required Sections

1. Stage
2. Inputs Checked
3. Outputs Checked
4. Missing Artifacts
5. Failed Rules
6. Risk
7. Required Human Approval
8. Decision
9. Next Action

## Rules

- PASS requires evidence.
- PASS_WITH_ASSUMPTIONS must list every assumption.
- FAIL must produce a corrective action.
- NEEDS_HUMAN_APPROVAL must explain exactly what decision is needed.
