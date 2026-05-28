# Alpha Stabilization Roadmap

ShipKit is in alpha. The goal of stabilization is to make it installable, testable, understandable, and safe for internal pilots.

## Phase A: Release Readiness

- [ ] README clearly states alpha status
- [ ] not-production-ready note exists
- [ ] package version set to alpha
- [ ] `sk check` passes on the package root
- [ ] release readiness gate passes
- [ ] examples exist and can be checked
- [ ] npm package dry run passes

## Phase B: CLI Stabilization

- [ ] split CLI into `commands/` and `lib/`
- [ ] keep `bin/sk.js` as a small dispatcher
- [ ] add tests for init/new/check/classify
- [ ] avoid adding runners directly into the CLI entrypoint

## Phase C: Real Examples

- [ ] expand `examples/simple-solo`
- [ ] expand `examples/standard-team`
- [ ] add one brownfield/reverse-PRD example
- [ ] add example score reports and gate outputs

## Phase D: First Runner

- [ ] choose Hive or OpenClaw as first long-running runner
- [ ] define events/state/artifacts contract
- [ ] write `.shipkit/runs/<run-id>/events.ndjson`
- [ ] write gate results and artifacts registry

## Phase E: Engineering Evidence

- [ ] CodeGraph evidence adapter
- [ ] OpenSpec/spec layer adapter
- [ ] impact analysis for change/bug/refactor
