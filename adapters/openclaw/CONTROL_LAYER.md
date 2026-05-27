# OpenClaw Adapter: ShipKit Control Layer

Recommended mapping:

- `AGENTS.md` stays short and points to ShipKit protocols.
- `SOUL.md` contains role and style, not process details.
- `skills/` contains ShipKit skills.
- `protocol/` contains platform-neutral rules.
- Customer projects may live in any directory; register them in `projects.yaml`.

Recommended invocation:

```text
Use ShipKit control on project path: <path>. Run stage gate and produce control/control-report.md.
```

OpenClaw should treat ShipKit as a workspace-level harness, not a project-specific prompt dump.
