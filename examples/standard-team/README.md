# Standard Team Example: CRM Intake Automation

This example demonstrates a standard multi-person ShipKit project with modules, owners, task tracking, integration notes, test evidence, risks, dependencies, and a delivery handoff.

## Scenario

A client wants an internal CRM intake workflow. A web form captures leads, validates fields, stores records, sends a notification, and exposes a simple operations review list.

## Why `standard-team`

- Multiple modules
- Multiple contributors
- Backend/frontend coordination
- External email dependency
- Formal test and delivery evidence
- Lightweight release and status reporting

## Try it

```bash
sk check --project examples/standard-team
# If scoring is installed:
sk score --project examples/standard-team --write
```

## What to inspect

- `team/members.yaml` — contributors and capacity
- `modules/module-map.yaml` — module ownership and progress
- `tasks/board.yaml` — task board
- `sync/integration-log.md` — integration trace
- `reports/status-report.md` — project status
- `trace/trace-map.md` — requirement-to-delivery trace
- `evidence/tests/sample-test-report.md` — validation evidence
