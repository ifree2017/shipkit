---
name: contract
description: Check contract boundaries before signing by verifying deliverables, timing, change rules, risk allocation, acceptance, termination, and legal review items.
---

# Contract

Use this skill when quote/scope is about to become a contract, statement of work, order form, or delivery agreement.

## Inputs

Read when available:

- `docs/02-scope/`
- `docs/03-quote-contract/client-facing-quote.md`
- `docs/03-quote-contract/preconditions.md`
- `docs/03-quote-contract/exclusions.md`
- `protocol/contract-boundary.yaml`

## Boundary Checks

Check:

- deliverable boundaries
- acceptance criteria
- timeline and milestone boundaries
- customer cooperation deadlines
- external dependency responsibility
- change request process
- price/timeline impact process
- data and security responsibility
- maintenance/warranty boundaries
- termination conditions
- legal review items

## Legal Review Required

Flag these as `REQUIRES_LEGAL_REVIEW`:

- intellectual property ownership
- data security liability
- confidentiality clauses
- non-compete or exclusivity
- unlimited liability
- indemnification
- unreasonable penalties

## Required Outputs

Create or update:

- `docs/03-quote-contract/contract-checklist.md`
- `docs/03-quote-contract/risk-terms.md`
- `docs/03-quote-contract/pending-legal.md`
- `docs/03-quote-contract/client-confirmation-list.md`
- `handoff/contract.handoff.md`

## Decision

End with one of:

- `READY_FOR_HUMAN_REVIEW`
- `NEEDS_CLIENT_CONFIRMATION`
- `NEEDS_LEGAL_REVIEW`
- `BLOCKED`

Do not say a contract is ready to sign unless all blockers are resolved or explicitly accepted by a human.
