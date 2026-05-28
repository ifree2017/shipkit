# ShipKit Examples

ShipKit examples are small, file-based projects that demonstrate how a profile changes the amount of governance required for delivery.

## Available Examples

| Example | Profile | Use case | What it shows |
|---|---|---|---|
| `examples/simple-solo` | `simple-solo` | One-person small feature | Lightweight scope, task board, test evidence, delivery handoff |
| `examples/standard-team` | `standard-team` | Multi-person project | Team ownership, modules, workload, integration log, status report, trace map |

## Try the examples

```bash
sk check --project examples/simple-solo
sk check --project examples/standard-team
```

If validation/scoring is installed:

```bash
sk score --project examples/simple-solo --write
sk score --project examples/standard-team --write
```

## What a good example should include

Each example should include enough evidence to explain the project without reading chat history:

- `shipkit.yaml`
- intake/scope/PRD or equivalent docs
- task board
- trace map
- test evidence
- handoff
- status or score report

## Adding a new example

Create a new directory under `examples/` and include a README that answers:

1. What project is being demonstrated?
2. Which profile is used and why?
3. Which ShipKit commands should users run?
4. Which artifacts should users inspect first?
