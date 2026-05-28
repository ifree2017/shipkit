# ShipKit Roadmap

ShipKit is an alpha-stage portable SDLC agent harness. The goal is to make software delivery with agents controlled, traceable, and portable across runtimes.

## Current Alpha Capabilities

- project scaffolding
- project profiles and classifier
- gate runner
- SDLC skills and workflows
- team execution layer
- ops flows for change, bug, refactor, risk, dependency, blocker, and incident
- control and evidence layer
- integrations mapping
- OpenClaw, Codex, Claude, Cursor, Hermes, and generic adapters

## Phase 1: Stabilize the Core

Focus:

- keep `sk check` stable
- validate all gate registries
- improve README/HARNESS/docs entrypoints
- deepen core SDLC skills and workflows
- add skill and gate indexes
- keep small-project profiles lightweight

Target outcome:

```bash
sk new demo --profile standard-team --to ./demo
sk check --project ./demo
```

works reliably on a fresh install.

## Phase 2: Split the CLI

Current CLI implementation is still mostly in `bin/sk.js`. Split it into:

```text
bin/sk.js
commands/
lib/
```

Suggested command modules:

- `init`
- `new`
- `classify`
- `check`
- `project`
- `stage`
- `hive`
- `graph`
- `spec`
- `vet`

## Phase 3: Deepen Core SDLC Skills

Prioritize:

- `intake`
- `discover`
- `scope`
- `prd`
- `arch`
- `plan`
- `test`
- `delivery`

Each should include:

- trigger conditions
- required inputs
- required outputs
- questions to ask
- forbidden behaviors
- completion criteria
- handoff format

## Phase 4: Runner Adapters

Add execution runners without polluting ShipKit core:

- Hive runner adapter
- OpenClaw execution notes
- Codex execution notes
- Claude execution notes

Runner outputs must land in:

```text
.shipkit/runs/<run-id>/
├── state.json
├── events.ndjson
├── gate-results.json
├── artifacts.json
└── report.md
```

## Phase 5: Evidence Systems

Add deeper support for:

- CodeGraph
- OpenSpec
- reverse PRD
- impact maps
- spec drift checks
- release evidence packages

## Phase 6: Platformization

Future platform features:

- project registry
- dashboard
- status reports
- team workload UI
- gate results dashboard
- approval queue
- integration marketplace

## Non-Goals for Now

- do not bind ShipKit core to one runner
- do not vendor unreviewed third-party skills
- do not make all projects use complex governance
- do not allow agent confidence to replace gates or evidence
