# Examples

The examples directory is intentionally small. Examples should demonstrate how ShipKit projects are structured, not contain full application source code.

## Included examples

### `examples/simple-solo`

A lightweight one-person project profile.

Use this when the work is a small feature, script, landing page, or automation task.

Suggested checks:

```bash
sk check --project examples/simple-solo --soft
```

### `examples/standard-team`

A normal team delivery project profile with modules, tasks, ownership, progress, and status reports.

Suggested checks:

```bash
sk check --project examples/standard-team --soft
sk check team --project examples/standard-team --soft
```

## Example rules

Examples should:

- stay small
- avoid secrets
- include `shipkit.yaml`
- include a README
- show the intended profile
- show where artifacts should live
- demonstrate evidence and reports without requiring real customer data

Examples should not:

- include production credentials
- include large application source trees
- depend on private external services
- imply that agent-generated content is automatically trusted

## Roadmap for examples

Planned examples:

```text
examples/simple-solo/
examples/standard-team/
examples/brownfield-reverse-prd/
examples/ui-delivery-dashboard/
examples/complex-multi-integration/
```
