# OpenClaw Adapter Notes from Wangyuyan Practice

These patterns are useful for ShipKit's OpenClaw adapter.

## Workspace structure

Use one OpenClaw workspace for ShipKit runtime assets, but allow project directories to live anywhere.

Runtime workspace:

```text
~/.openclaw/workspaces/shipkit/
  AGENTS.md
  SOUL.md
  protocol/
  skills/
  workflows/
  templates/
  gates/
  projects.yaml
```

External project:

```text
/path/to/client-project/
  shipkit.yaml
  STATE.md
  docs/
  handoff/
  trace/
  memory/
  tasks/
```

## Startup order

1. Read `SOUL.md` for role.
2. Read `AGENTS.md` for operating rules.
3. Read project `shipkit.yaml` and `STATE.md`.
4. Read relevant stage skill.
5. Work only after success criteria are clear.

## Subagent policy

- One subagent per self-contained task.
- Subagent outputs are disposable unless written to artifacts.
- Lead synthesizes outputs before reporting.
- Do not spawn when context is too high or requirements are unclear.

## Memory policy

- `STATE.md` is current state.
- `MEMORY.md` is an index.
- `memory/YYYY-MM-DD.md` is daily log.
- `handoff/*.handoff.md` captures transitions.

## Security note

The sample workspace contained hard-coded integration credentials in a script. ShipKit must never import or publish those values. Use secret gates and environment variables.
