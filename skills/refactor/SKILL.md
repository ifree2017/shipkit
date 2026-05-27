---
name: refactor
description: Use when implementation, review, testing, or architecture work reveals technical debt, maintainability problems, code structure issues, architecture risk, or the need for internal redesign. It requires impact analysis before refactoring.
---

# Refactor Proposal

Do not start refactoring without impact analysis.

## Required Inputs

Use available project files, especially:

- `docs/04-arch/`
- `docs/05-plan/`
- `docs/06-build/`
- `docs/07-test/`
- `decisions/`
- `trace/`

## Required Output

Create or update a file under `refactors/` using the next `RF-XXXX.md` id.

Each refactor proposal must include:

1. Refactor summary
2. Affected modules
3. Reason
4. Risk if not done
5. Risk if done
6. Scope impact
7. Timeline impact
8. Public behavior impact
9. API contract impact
10. Data migration impact
11. Test impact
12. Rollback plan
13. Approval recommendation

## Approval Rules

Human approval is required if the refactor affects:

- delivery timeline
- public behavior
- data structure
- API contract
- deployment
- acceptance criteria
- customer-visible behavior

## Rules

- If the refactor changes observable behavior, it is not only a refactor; evaluate it as a change request too.
- Update architecture docs or ADRs when the refactor changes system structure.
- Always define regression test scope.
