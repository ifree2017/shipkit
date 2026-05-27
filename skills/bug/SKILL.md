---
name: bug
description: Use when testing, QA, UAT, release, delivery, or customer review finds a defect, failed acceptance case, regression, or unexpected behavior. It triages the issue, checks scope traceability, and decides whether it is a real defect or a new requirement.
---

# Bug / Defect Triage

First classify the issue as one of:

- requirement defect
- implementation defect
- regression
- test data issue
- environment issue
- integration issue
- unclear acceptance criteria
- new requirement disguised as a bug

## Required Inputs

Use available project files, especially:

- `docs/02-scope/`
- `docs/03-prd/`
- `docs/07-test/`
- `handoff/`
- `trace/acceptance-map.md`

## Required Output

Create or update a file under `defects/` using the next `BUG-XXXX.md` id.

Each defect must include:

1. Defect summary
2. Found in stage
3. Related requirement / module
4. Expected result
5. Actual result
6. Reproduction steps
7. Severity
8. Root cause hypothesis
9. Fix plan
10. Regression test scope
11. Whether this is actually a change request
12. Close criteria

## Severity Values

Use one of:

- blocker
- critical
- major
- minor
- trivial

## Rules

- If the expected behavior is not defined in scope, PRD, or acceptance criteria, recommend converting to a change request.
- Do not close a defect without regression test notes.
- Do not treat customer preference changes as defects unless they contradict confirmed acceptance criteria.
