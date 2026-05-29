# Workflow: Business Chain Closure

## Purpose

Close the gap between a customer feature request and the real business workflow it belongs to.

## Inputs

- `docs/00-intake/`
- customer clarification answers
- screenshots, meeting notes, tickets, existing workflow notes

## Outputs

- `docs/01-discover/business-chain.md`
- `docs/01-discover/data-flow.md`
- `docs/01-discover/exception-paths.md`
- `docs/01-discover/role-matrix.md`
- `handoff/discover.handoff.md`

## Required Skills

- `discover`
- `chain`
- `clarify`
- `dependency`

## Gates

- `business-chain`

## Failure Routing

- Missing business context → `clarify`
- External provider missing → `dependency`
- High uncertainty → `risk`
- Scope conflict → `change`
