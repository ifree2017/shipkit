---
name: discover
description: Clarify requirements by reconstructing real business scenarios, users, data flow, normal/exception paths, dependencies, and acceptance evidence.
---

# Discover

Use this skill after intake, before scope, PRD, quote, or architecture. Discovery turns feature points into real business context.

## Inputs

Read when available:

- `docs/00-intake/`
- `docs/01-discover/`
- `handoff/intake.handoff.md`
- `protocol/business-chain.yaml`
- `shipkit.yaml`

## Discovery Questions

For every feature or request, answer or ask:

1. What business action starts this requirement?
2. Who uses it and what role do they have?
3. What happens before use?
4. What happens after use?
5. Where does data come from?
6. Where does data go?
7. Which systems, APIs, people, or third parties are involved?
8. What is the normal path?
9. What exception paths exist?
10. What should happen on failure, timeout, missing data, permission denial, or third-party failure?
11. Who confirms the result?
12. What evidence proves acceptance?

## Required Outputs

Create or update:

- `docs/01-discover/problem-statement.md`
- `docs/01-discover/business-chain.md`
- `docs/01-discover/data-flow.md`
- `docs/01-discover/role-matrix.md`
- `docs/01-discover/exception-paths.md`
- `docs/01-discover/assumptions.md`
- `docs/01-discover/open-questions.md`
- `handoff/discover.handoff.md`

## Business Chain Closure

Before moving to scope, confirm:

- complete business trigger is identified
- all user roles are identified
- input/output data is traced
- external dependencies are listed
- exception paths are documented
- acceptance evidence is defined
- unresolved assumptions are not written as facts

## Failure Routing

If discovery reveals unresolved ambiguity, route it to:

- `clarify` for missing requirements
- `dependency` for external blockers
- `risk` for high-impact uncertainty
- `change` if it modifies confirmed scope

## Red Lines

Do not:

- write implementation design before the business chain is closed
- treat a UI entry point as the whole requirement
- hide open questions inside a PRD
- imply that third-party capabilities are confirmed when they are not
