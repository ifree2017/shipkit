---
name: codegraph
description: Use when ShipKit needs code evidence, symbol maps, dependency maps, API maps, test maps, or repository impact analysis for architecture, planning, bug triage, refactor, or change requests.
---

# CodeGraph

Use this skill to request or interpret code graph evidence.

## Inputs

- source code path
- changed files
- requirement ID
- change request ID
- bug ID
- refactor proposal ID

## Outputs

Create or update:

- `evidence/codegraph/graph.json`
- `evidence/codegraph/symbols.json`
- `evidence/codegraph/dependencies.json`
- `evidence/codegraph/api-map.json`
- `evidence/codegraph/test-map.json`

## Rules

- Prefer read-only analysis.
- Record tool name, version, input paths, and limitations.
- Do not modify source code.
- Mark stale graphs when source files changed after graph generation.

## Handoff

Return:

1. Relevant modules
2. Relevant files
3. Relevant APIs and data objects
4. Relevant tests
5. Unknowns and confidence level
