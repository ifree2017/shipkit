---
name: measure
description: Use to grade project quality, collect delivery signals, filter noise, build quality scorecards, or decide whether a stage is ready to advance.
---

# Measure

Convert project artifacts into measurable quality signals.

## Inputs

Read when available:

- protocol/quality-model.yaml
- control/quality-scorecard.md
- trace/trace-map.md
- gate results
- test reports
- release reports
- delivery reports

## Outputs

Create or update:

- control/quality-scorecard.md
- control/agent-legibility-review.md

## Quality Dimensions

Grade each dimension A-E:

- scope clarity
- traceability
- architecture integrity
- correctness
- reliability
- security
- performance
- maintainability
- operability
- client document safety
- agent legibility

## Rules

- A grade requires evidence.
- Unknown is not A or B.
- A project cannot pass delivery with missing traceability or client document redlines.
- Separate signal from noise; do not overreact to ambiguous feedback without classification.
