---
name: spec
description: Use when converting confirmed PRD, scope, architecture, API, data, permissions, acceptance, or release decisions into machine-checkable ShipKit spec files.
---

# Spec

Use this skill to create or update project specs.

## Outputs

- `spec/requirements.yaml`
- `spec/api.openapi.yaml`
- `spec/data-model.yaml`
- `spec/events.yaml`
- `spec/permissions.yaml`
- `spec/acceptance.yaml`
- `spec/release.yaml`

## Rules

- Specs must reference requirement IDs.
- Specs must distinguish confirmed, inferred, and unknown.
- Specs must not introduce new scope without a change record.
- API/data/permission changes require impact analysis.

## Handoff

Return:

1. Spec files updated
2. Source documents used
3. Drift or missing confirmations
4. Required gates
