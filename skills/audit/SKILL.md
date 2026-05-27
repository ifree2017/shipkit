---
name: audit
description: ShipKit audit skill for moving software projects from requirements to shipped delivery.
---

# audit

Use this skill as part of the ShipKit delivery flow.

## Inputs

Read the relevant files from `protocol/stages.yaml`, `workflows/`, and `docs/`.

## Outputs

Create or update the stage artifacts defined in `protocol/stages.yaml`.

## Rules

- Keep project facts in files.
- Record open questions and risks.
- Do not expose internal assumptions in client-facing documents.
- End with a stage handoff when applicable.
