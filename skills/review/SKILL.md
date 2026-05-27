---
name: review
description: Use when output must be independently evaluated against spec, acceptance criteria, quality scorecards, evidence, or delivery gates. Supports planner-builder-evaluator review loops.
---

# Review

Do not review against the builder claims. Review against the spec.

## Review inputs

- requirement or source reference
- PRD or SPEC
- changed files
- tests or evidence
- acceptance criteria
- known risks

## Scorecard

Score:

- Spec compliance
- Code or document quality
- Test coverage or validation evidence
- Functionality
- Maintainability
- Security redlines
- Client-facing safety

## Required output

- pass / fail / pass with risks
- evidence read
- mismatches
- required fixes
- whether another review cycle is needed

## Route failures

- unclear expectation -> `clarify`
- new expectation -> `change`
- failed expected behavior -> `bug`
- structural problem -> `refactor`
- process gap -> `pvt` or harness gap

