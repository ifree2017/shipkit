---
name: control
description: Use when a ShipKit project deviates from plan, a stage gate fails, feedback arrives, quality drifts, or the user asks to analyze project control, stability, feedback, or corrective action.
---

# Control

Treat the project as a controlled engineering system.

## Inputs

Read when available:

- protocol/control-loop.yaml
- protocol/control-policies.yaml
- shipkit.yaml
- control/control-report.md
- control/quality-scorecard.md
- trace/trace-map.md
- handoff/
- changes/
- defects/
- refactors/
- risks/
- blockers/

## Process

1. Sense current project state.
2. Compare actual state with expected state.
3. Identify deviation type.
4. Select corrective action.
5. Check whether human approval is required.
6. Define verification evidence.
7. Record learning for ShipKit improvement if failure repeats.

## Output

Create or update:

- control/control-report.md
- control/feedback-log.md
- handoff/control.handoff.md

## Required Sections

1. Current State
2. Expected State
3. Deviation
4. Root Cause Hypothesis
5. Corrective Action
6. Human Approval Required
7. Verification Evidence
8. Follow-up Gate
9. ShipKit Improvement Candidate

## Rules

- Do not silently continue after a gate failure.
- Do not treat missing information as known fact.
- Do not convert client commitment into action without approval.
- If the same failure appears twice, propose a gate, template, skill, or workflow improvement.
