---
name: spec-diff
description: Use when comparing old and new specs to detect drift, contract changes, acceptance changes, permission changes, or release-impacting changes.
---

# Spec Diff

Compare specs across revisions or between PRD and current implementation.

## Inputs

- `spec/`
- `trace/trace-map.md`
- changed files
- change request or PR description

## Outputs

- `evidence/spec/spec-diff.md`
- `evidence/spec/spec-drift.json`

## Drift Classes

- harmless-doc-update
- clarified-existing-scope
- scope-expansion
- breaking-api-change
- data-contract-change
- permission-change
- acceptance-change
- release-risk

## Rule

Scope expansion, API contract changes, data contract changes, permission changes, and acceptance changes require impact analysis and human review.
