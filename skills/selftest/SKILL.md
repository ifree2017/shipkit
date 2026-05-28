---
name: selftest
description: Use this ShipKit skill when validating harness behavior, scoring project readiness, or generating verification reports for SDLC delivery workspaces.
---

# selftest

## Purpose

Use this skill to keep ShipKit verification measurable and repeatable.

## Rules

- Prefer repository artifacts over chat history.
- Produce evidence under reports/ or .shipkit/ when possible.
- A score below 70 requires human review before advancing stages.
- A score below 60 blocks delivery progression.
- Validation failures should include the command, target, expected result, actual result, and suggested fix.

## Expected Outputs

- reports/score-report.md
- reports/validation-report.md
- .shipkit/score.json
- .shipkit/test-results.json
