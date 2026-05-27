---
name: reverse-prd
description: Use for brownfield projects where existing source code, UI, or frontend routes must be reverse-engineered into PRD, gap analysis, and clarification questions before scope or development continues.
---

# Reverse PRD

Use this skill when the project starts from an existing codebase instead of a clean requirement brief.

## Inputs

Read when available:

- source code paths
- screenshots or UI routes
- existing API docs
- existing README or product docs
- `evidence/codegraph/`

## Outputs

Create or update:

- `evidence/reverse-prd/gap-analysis.md`
- `evidence/reverse-prd/interview-questions.md`
- `evidence/reverse-prd/reverse-prd.md`
- `evidence/reverse-prd/confidence-map.md`

## Rules

Classify every finding as:

- `code-confirmed`
- `inferred`
- `needs-confirmation`
- `unknown`

Never promote inferred behavior into confirmed scope without clarification.

## Handoff

Return:

1. Confirmed behavior from code
2. Inferred business logic
3. Missing backend/API/data logic
4. Questions for client or original developer
5. Recommended next stage: clarify, scope, prd, refactor, or bug
