# Simple Solo Example: Contact Form Automation

This example shows the lightest useful ShipKit project shape: one developer, one small feature, basic traceability, a task board, test evidence, and a delivery handoff.

## Scenario

A client wants a small website contact form to send validated inquiries to an internal email address and store a local CSV backup.

## Why `simple-solo`

- One owner
- One module
- Low-risk delivery
- No production database migration
- No multi-person integration plan
- Requires basic acceptance and delivery evidence

## Try it

```bash
sk check --project examples/simple-solo
# If scoring is installed:
sk score --project examples/simple-solo --write
```

## What to inspect

- `docs/00-intake/client-raw-input.md` — raw client request
- `docs/02-scope/module-list.md` — scoped module and exclusions
- `docs/03-prd/prd.md` — lightweight PRD
- `tasks/board.yaml` — task tracking
- `evidence/tests/sample-test-report.md` — test evidence
- `handoff/delivery.handoff.md` — final handoff
- `reports/score-report.md` — sample readiness score
