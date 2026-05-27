---
name: pvt
description: Use when validating that ShipKit own process works end-to-end on a sample project. Triggers before major releases, adapter changes, gate changes, or workflow changes.
---

# Process Validation Test

PVT verifies the harness, not just the product.

## Run when

- releasing a new ShipKit version
- changing stage protocol
- changing adapters
- adding new gates
- after a process failure or incident

## Required path

Run a small sample through:

```text
intake -> discover -> scope -> prd -> arch -> plan -> build -> test -> release -> delivery
```

## Required report

Create `audit/pvt-report.md` with:

- sample project
- phases executed
- artifacts created
- gates run
- failures
- harness gaps
- changes required
- final result

## Failure handling

Every PVT failure becomes a harness gap:

- missing template
- unclear skill
- broken adapter
- weak gate
- missing trace link
- unsafe default

