---
name: acceptance
description: Build acceptance matrices and UAT records that map modules and requirements to measurable acceptance criteria, test methods, evidence, status, and sign-off.
---

# Acceptance

Use this skill during scope, test, UAT, delivery, or sign-off preparation.

## Inputs

Read when available:

- `docs/02-scope/acceptance-criteria.md`
- `docs/03-prd/prd.md`
- `docs/07-test/test-plan.md`
- `tasks/board.yaml`
- `trace/trace-map.md`

## Acceptance Matrix Columns

Use this structure:

| Module | Feature | Acceptance Criteria | Test Method | Evidence | Result | Status | Owner | Date |
|---|---|---|---|---|---|---|---|---|

## Acceptance Criteria Rules

Every criterion must be:

- measurable
- repeatable
- tied to a module or requirement
- tied to a test method
- pass/fail decidable
- associated with evidence

Rewrite vague criteria:

- Bad: `feature works`
- Better: `submitting valid form data creates one record and returns success within 3 seconds`

## Required Outputs

Create or update:

- `docs/07-test/acceptance-matrix.md`
- `docs/07-test/uat-plan.md`
- `docs/07-test/uat-results.md`
- `defects/defect-log.md` or `docs/07-test/defect-log.md`
- `handoff/test.handoff.md`

## Failure Routing

If acceptance fails, route to:

- `bug` when it violates agreed criteria
- `change` when it is a new expectation
- `clarify` when criteria are ambiguous
- `dependency`, `env`, or `data` when caused by external readiness
