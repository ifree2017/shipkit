# ShipKit OpenClaw Runner Adapter

OpenClaw is a ShipKit runner: it executes work inside a workspace while ShipKit controls project state, artifacts, gates, and handoffs.

## Initialize

```bash
sk openclaw init --workspace ~/.openclaw/workspaces/shipkit
```

This creates a ShipKit OpenClaw workspace containing:

```text
AGENTS.md
SOUL.md
protocol/
skills/
workflows/
templates/
gates/
projects.yaml
```

## Bind a project

Customer projects can live anywhere:

```bash
sk new acme-crm --to ~/Projects/acme-crm --profile standard-team
sk openclaw bind acme-crm --project ~/Projects/acme-crm --profile standard-team
```

The binding is stored in workspace `projects.yaml`.

## Generate a stage prompt

```bash
sk openclaw prompt intake --project acme-crm
```

Paste the generated prompt into OpenClaw or use it as the message body for the OpenClaw agent runner.

## Health check

```bash
sk openclaw doctor
sk check openclaw-runner --to ~/.openclaw/workspaces/shipkit
```

## Rule

OpenClaw may execute, but ShipKit controls. All important outputs must become project artifacts or evidence files.
