# OpenClaw Support

ShipKit supports OpenClaw as a workspace-based runner.

## Model

```text
ShipKit protocol / skills / gates
        ↓
OpenClaw workspace
        ↓
Project artifacts and evidence
        ↓
sk check / sk score
```

OpenClaw executes work. ShipKit remains the control layer.

## Quick start

```bash
sk openclaw init --workspace ~/.openclaw/workspaces/shipkit
sk openclaw doctor
```

Create a project anywhere:

```bash
sk new acme-crm --to ~/Projects/acme-crm --profile standard-team
```

Bind it to the OpenClaw workspace:

```bash
sk openclaw bind acme-crm --project ~/Projects/acme-crm --profile standard-team
```

Generate a prompt for a stage:

```bash
sk openclaw prompt intake --project acme-crm
```

Run checks:

```bash
sk check openclaw-runner --to ~/.openclaw/workspaces/shipkit
sk check --project ~/Projects/acme-crm
```

## Supported commands

```bash
sk openclaw init
sk openclaw doctor
sk openclaw bind
sk openclaw status
sk openclaw projects
sk openclaw prompt
```

## Current limitation

This is adapter-level support. It prepares the workspace, project binding, health checks, and stage prompts. It does not yet drive the OpenClaw runtime process directly. Direct process execution should be added only after the runner event/state contract is finalized.
