# Wangyuyan Adapter Placeholder

This adapter is intentionally conservative because the repository structure was not available during add-on creation.

Use this adapter to map ShipKit into `wangyuyan` once the repository layout is inspected.

## Mapping Targets

Identify the closest Wangyuyan concepts for:

- instruction entry
- role/persona entry
- skill directory
- workflow/state machine
- tool policy
- project registry
- artifact directory
- gate/check mechanism

## Recommended Mapping

If Wangyuyan supports agent roles:

```text
ShipKit agents/       -> Wangyuyan roles/agents
ShipKit skills/       -> Wangyuyan skills/tools
ShipKit protocol/     -> Wangyuyan workflow/state definitions
ShipKit gates/        -> Wangyuyan validators/checkers
ShipKit templates/    -> Wangyuyan templates/prompts
ShipKit projects      -> Wangyuyan project workspace
```

If Wangyuyan is prompt-only:

```text
AGENTS.md or profile prompt -> point to ShipKit protocol and workflows
skills/                     -> keep as markdown references
sk CLI                      -> use for install/check/project operations
```

## Rule

Do not copy platform-specific assumptions from OpenClaw, Codex, or Claude into Wangyuyan. Keep ShipKit core neutral and build a thin adapter.
