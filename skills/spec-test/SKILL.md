---
name: spec-test
description: Use when deriving test cases, acceptance cases, contract tests, or release verification steps from ShipKit specs.
---

# Spec Test

Generate or review tests from machine-checkable specs.

## Inputs

- `spec/requirements.yaml`
- `spec/acceptance.yaml`
- `spec/api.openapi.yaml`
- `spec/permissions.yaml`
- `evidence/codegraph/test-map.json`

## Outputs

- `evidence/testing/spec-test-plan.md`
- `evidence/testing/contract-tests.md`
- `evidence/testing/regression-scope.md`

## Rules

- Each acceptance spec needs at least one test or manual verification step.
- Permission specs need positive and negative tests.
- Breaking API changes need contract tests.
- Changed codegraph impact needs regression coverage.
