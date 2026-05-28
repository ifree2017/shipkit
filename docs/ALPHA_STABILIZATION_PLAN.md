# Alpha Stabilization Plan

ShipKit is now an alpha-stage portable SDLC agent harness. The next goal is not to add more concepts, but to make the core installable, testable, explainable, and demonstrable.

## Stabilization goals

A release candidate is acceptable when the following commands work from a clean checkout:

```bash
node --check bin/sk.js
node bin/sk.js check --to .
node bin/sk.js check list --to .
node bin/sk.js new demo --to /tmp/shipkit-demo --profile standard-team
node bin/sk.js check --project /tmp/shipkit-demo
npm pack --dry-run
```

If the validation/scoring layer is installed, these should also pass:

```bash
node bin/sk.js test
node bin/sk.js score --project /tmp/shipkit-demo --write
node bin/sk.js check scoring --project /tmp/shipkit-demo
```

## Alpha priorities

### P0: Keep the package healthy

- Keep `sk check` working by default.
- Keep all registry files parseable and consistent.
- Keep npm packaging complete.
- Keep CI limited to package-safe checks and smoke project checks.
- Do not run project-only gates against the ShipKit package root unless they are explicitly soft checks.

### P1: Make the project understandable

- Keep `README.md` as the public entrypoint.
- Keep `HARNESS.md` as the doctrine and operating model.
- Keep `docs/README.md` as the documentation index.
- Keep examples small and copyable.
- Avoid internal-only addon naming in public docs over time.

### P2: Make execution real

- Add one real runner adapter first: Hive or OpenClaw.
- Runner outputs must be written to `.shipkit/runs/<run-id>/`.
- Runner text is not trusted until converted into evidence and checked by gates.

### P3: Make integration safe

- External projects must stay in `integrations/` until vetted.
- Third-party tools must write to `evidence/` first.
- Gates decide whether external output can affect delivery state.

## Definition of alpha-ready

ShipKit is alpha-ready when:

- A user can install it locally.
- A user can create a simple or standard project.
- A user can run checks and understand failures.
- A user can read one example and reproduce the workflow.
- A contributor can run a smoke test before opening a PR.

## Not alpha goals

Do not block alpha on:

- Fully autonomous multi-agent execution.
- Complete Hive/OpenClaw/Codex runtime parity.
- Full community marketplace support.
- Deep license scanning of every third-party integration.
- Production deployment automation.

Those belong to beta or later.
