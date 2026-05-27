---
name: observe
description: Use when recording ShipKit run events, evidence, failure attribution, feedback logs, or observability reports for runner executions and gates.
---

# Observe

## Purpose

Turn runner activity into structured ShipKit evidence.

## Required Run Evidence

- state.json
- events.ndjson
- artifacts.json
- gate-results.json
- report.md

## Failure Attribution Categories

- missing_context
- bad_instruction
- tool_failure
- permission_denied
- gate_failure
- external_dependency
- model_error
- human_blocker
- unknown

## Rules

- Every claim should point to an artifact, event, or report.
- Failed runs must produce failure attribution.
- Runner logs are evidence, not final decisions.
