# Testing

ShipKit testing has two layers:

1. testing ShipKit itself
2. checking a ShipKit project

## ShipKit Self Tests

The minimum self-test matrix is:

```bash
node --check bin/sk.js
sk check --to .
sk check list --to .
sk new demo --profile standard-team --to /tmp/shipkit-demo
sk check --project /tmp/shipkit-demo
sk init codex --to /tmp/shipkit-codex
sk init openclaw --to /tmp/shipkit-openclaw
npm pack --dry-run
```

If the validation layer is installed, also run:

```bash
sk test
sk score --project /tmp/shipkit-demo --write
sk check scoring --project /tmp/shipkit-demo
```

## Project Checks

Project checks depend on `shipkit.yaml` and the selected profile.

```bash
sk check --project ./client-project
```

For a standard team project, this should check core project health, team execution, changes, ops, and profile consistency.

## Gate Philosophy

Gates are not meant to replace human judgment. They provide structured signals that help a human or agent decide whether a project can move forward.

A gate should be:

- deterministic when possible
- explainable when it fails
- safe to run locally
- tied to project artifacts or evidence
- compatible with CI

## Test Roadmap

Planned test categories:

- CLI parser and command tests
- gate registry schema tests
- profile scaffolding tests
- adapter init tests
- package contents tests
- example project tests
- runner adapter tests
