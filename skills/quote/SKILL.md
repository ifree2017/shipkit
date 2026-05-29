---
name: quote
description: Create client-facing quote structure from confirmed scope without exposing internal pricing logic, man-days, buffer, salaries, or cost structure.
---

# Quote

Use this skill after scope has produced quote-ready modules. This skill creates quote structure and redline-safe client-facing commercial documents.

## Inputs

Read when available:

- `docs/02-scope/module-list.md`
- `docs/02-scope/out-of-scope.md`
- `docs/02-scope/prerequisites.md`
- `docs/02-scope/dependencies.md`
- `docs/02-scope/quote-ready-matrix.md`
- `protocol/quote-boundary.yaml`

## Client-Facing Quote May Include

- project overview
- confirmed modules
- module descriptions
- deliverables
- acceptance criteria
- project timeline by phase
- total or module-level quote range
- payment milestones
- validity period
- client prerequisites
- exclusions
- change request rule
- items requiring confirmation

## Strictly Forbidden in Client-Facing Quote

Never include:

- man-days
- daily rate
- salary or headcount cost
- buffer percentage
- internal margin
- internal cost model
- internal pricing logic
- developer allocation
- technical-stack cost explanation
- “easy”, “simple”, “free”, “just”, “quick fix” promises

## Required Outputs

Create or update:

- `docs/03-quote-contract/client-facing-quote.md`
- `docs/03-quote-contract/preconditions.md`
- `docs/03-quote-contract/exclusions.md`
- `docs/03-quote-contract/change-request-rule.md`
- `docs/03-quote-contract/quote-notes-internal.md`
- `handoff/quote.handoff.md`

## Readiness Decision

End with:

- `READY_FOR_HUMAN_REVIEW`
- `BLOCKED_BY_SCOPE`
- `BLOCKED_BY_DEPENDENCY`
- `READY_WITH_ASSUMPTIONS`

Quotes always require human approval before being sent externally.
