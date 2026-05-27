---
name: trace
description: Use to build, inspect, repair, or audit traceability from requirements to PRD, architecture, tasks, tests, release, delivery evidence, changes, bugs, and refactors.
---

# Trace

Maintain the requirement-to-delivery evidence chain.

## Inputs

Read when available:

- protocol/traceability.yaml
- docs/02-scope/
- docs/03-prd/
- docs/04-arch/
- docs/05-plan/
- docs/07-test/
- docs/08-release/
- docs/09-delivery/
- changes/
- defects/
- refactors/

## Outputs

Create or update:

- trace/trace-map.md
- trace/requirement-map.md
- trace/test-map.md
- trace/release-map.md

## Required Checks

For each requirement:

- linked module
- linked PRD section
- linked architecture component
- linked task
- linked acceptance criterion
- linked test case
- linked release evidence
- linked delivery item

For each bug:

- related requirement or acceptance criterion
- reproduction steps
- fix reference
- regression test

For each change:

- original scope reference
- impact analysis
- decision
- updated artifacts

## Output Decision

Return one of:

- TRACE_OK
- TRACE_GAPS_FOUND
- TRACE_BLOCKS_DELIVERY
