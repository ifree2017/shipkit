# Release Notes: v0.2.0-alpha

`v0.2.0-alpha` is the first planned public alpha release of ShipKit.

## Release Goal

Make ShipKit installable, explainable, and runnable for early SDLC harness pilots.

## Included Capabilities

- project scaffolding
- project profiles
- `sk check`
- profile-aware gates
- platform workspace adapters
- team execution layer
- change / bug / refactor flows
- integrations mapping
- external candidate vetting
- examples
- alpha stabilization docs

## Not Included Yet

- production-grade autonomous delivery
- full Hive runner adapter
- CodeGraph execution adapter
- OpenSpec execution adapter
- deep vendor/license legal analysis
- complete workflow-specific implementation guidance

## Release Validation

Before tagging this release, run:

```bash
node --check bin/sk.js
node bin/sk.js check --to .
node bin/sk.js check release-check --to .
node bin/sk.js new demo --to /tmp/shipkit-demo --profile standard-team
node bin/sk.js check --project /tmp/shipkit-demo
npm pack --dry-run
```

## Release Tag

```bash
git tag v0.2.0-alpha.0
git push origin v0.2.0-alpha.0
```
