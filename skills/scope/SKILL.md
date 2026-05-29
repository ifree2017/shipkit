---
name: scope
description: Convert discovered business chains into modules with clear in-scope, out-of-scope, deliverables, prerequisites, dependencies, risks, and acceptance criteria.
---

# Scope

Use this skill after discovery to define project/module boundaries that can be quoted, signed, built, tested, and accepted.

## Inputs

Read when available:

- `docs/01-discover/business-chain.md`
- `docs/01-discover/data-flow.md`
- `docs/01-discover/exception-paths.md`
- `docs/01-discover/open-questions.md`
- `protocol/stages.yaml`
- `shipkit.yaml`

## Module Structure

Each module must include:

- module name
- business goal
- in scope
- out of scope
- deliverables
- acceptance criteria
- client prerequisites
- technical dependencies
- risk notes
- related open questions
- quote readiness status

## Required Outputs

Create or update:

- `docs/02-scope/module-list.md`
- `docs/02-scope/out-of-scope.md`
- `docs/02-scope/prerequisites.md`
- `docs/02-scope/dependencies.md`
- `docs/02-scope/acceptance-criteria.md`
- `docs/02-scope/quote-ready-matrix.md`
- `handoff/scope.handoff.md`

## Quote Readiness

For each module, mark one of:

- `READY` - can be quoted and contracted.
- `READY_WITH_ASSUMPTIONS` - can be quoted only with explicit assumptions.
- `NOT_READY` - missing information or dependencies block quote.

A module is not quote-ready unless:

- in-scope and out-of-scope are both clear
- deliverables are verifiable
- acceptance criteria are measurable
- customer prerequisites are explicit
- hidden dependencies are listed

## Red Lines

Do not include vague scope such as:

- “complete management”
- “smart automation”
- “optimize experience”
- “support all cases”
- “do what is needed”

Rewrite vague items into verifiable modules or route them to `clarify`.
