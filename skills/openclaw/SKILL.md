---
name: openclaw
description: Use this when setting up, validating, binding, or operating ShipKit inside an OpenClaw workspace. Supports OpenClaw workspace initialization, project registry binding, stage prompts, and adapter health checks.
---

# OpenClaw Adapter Skill

Use OpenClaw as a ShipKit runner, not as the source of truth.

## Rules

- ShipKit protocols, project artifacts, gates, and handoffs remain authoritative.
- OpenClaw may execute work, but all meaningful output must be written to project files.
- Customer projects may live outside the OpenClaw workspace; bind them through `projects.yaml`.
- Do not rely on chat history as project memory.
- Do not let OpenClaw plugins bypass ShipKit gates for quote, contract, release, or client-facing delivery.

## Common actions

Initialize a workspace:

```bash
sk openclaw init --workspace ~/.openclaw/workspaces/shipkit
```

Bind a project:

```bash
sk openclaw bind acme-crm --project ~/Projects/acme-crm --profile standard-team
```

Generate a stage prompt:

```bash
sk openclaw prompt intake --project acme-crm
```

Check adapter health:

```bash
sk openclaw doctor
```

## Stage prompt contract

When OpenClaw runs a stage, it must:

1. Read `shipkit.yaml`, `STATE.md`, relevant protocol, and workflow files.
2. Confirm inputs, expected outputs, and gate requirements.
3. Write artifacts to the project directory.
4. Update handoff notes.
5. Report open questions, blockers, and risks as structured files.
