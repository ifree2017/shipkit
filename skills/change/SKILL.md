---
name: change
description: Use when a new requirement, changed expectation, scope adjustment, or customer request appears after scope, PRD, architecture, planning, build, test, release, or delivery has already started. It classifies the request, runs impact analysis, and prevents silent scope creep.
---

# Change Request

Do not treat new requests as normal tasks. First determine whether the request is:

- already included in confirmed scope
- clarification of existing scope
- defect against existing acceptance criteria
- new scope
- replacement of an existing requirement
- future enhancement

## Required Inputs

Use available project files, especially:

- `docs/02-scope/`
- `docs/03-prd/`
- `docs/04-arch/`
- `docs/05-plan/`
- `docs/07-test/`
- `quote/`
- `handoff/`
- `trace/`

## Required Output

Create or update a file under `changes/` using the next `CR-XXXX.md` id.

Each change request must include:

1. Change summary
2. Requester
3. Original scope reference
4. Business reason
5. Classification
6. Impact on scope
7. Impact on PRD
8. Impact on architecture
9. Impact on plan / timeline
10. Impact on test / acceptance
11. Impact on quote / contract
12. Recommendation
13. Decision status

## Recommendation Values

Use one of:

- accept in current scope
- accept as paid change
- defer to later phase
- reject
- convert to bug
- convert to clarification

## Rules

- Never silently add a change into the build plan.
- If it changes price, timeline, delivery scope, public behavior, data model, API contract, or acceptance criteria, mark it as requiring human approval.
- If the request is actually a failed existing acceptance criterion, convert it to a bug.
- If the expected behavior was never defined, treat it as a change request.
