---
name: impact
description: Use for change requests, bug fixes, refactors, API changes, data changes, or release planning when ShipKit needs blast-radius and regression-scope analysis.
---

# Impact Analysis

Impact analysis connects a proposed change to affected requirements, PRD sections, architecture decisions, files, APIs, tests, release risk, and delivery artifacts.

## Inputs

- `changes/CR-*.md`
- `defects/BUG-*.md`
- `refactors/RF-*.md`
- `spec/`
- `evidence/codegraph/`
- `trace/trace-map.md`

## Outputs

Create or update:

- `evidence/impact/impact-map.json`
- `evidence/impact/impact-report.md`

## Required Sections

1. Requested change or issue
2. Affected requirements
3. Affected PRD sections
4. Affected architecture components
5. Affected files/APIs/data
6. Required tests and regression scope
7. Scope, timeline, quote, and release impact
8. Recommendation

## Decision

Return one of:

- no-impact
- safe-with-tests
- requires-prd-update
- requires-architecture-update
- requires-quote-change
- requires-human-approval
