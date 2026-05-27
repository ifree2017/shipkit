---
name: plan
description: Use when preparing a ShipKit stage, SDLC task, runner execution, or agent work package. Produces a stage plan with inputs, outputs, constraints, gates, risks, and approval needs before execution.
---

# Plan

## Purpose

Create the plan section of a ShipKit Plan -> Execute -> Verify -> Handoff loop.

## Required Plan Fields

- stage
- objective
- inputs
- expected outputs
- constraints
- applicable skills
- applicable tools
- applicable gates
- evidence to collect
- risks
- approval requirements

## Rules

- Do not execute before defining expected outputs.
- Do not include unapproved scope.
- Identify missing inputs as blockers or clarifications.
- Identify human approval before risky actions.

## Output

Produce a stage plan suitable for saving to:

```text
handoff/<stage>.plan.md
```
