# Claude Code Adapter: ShipKit Control Layer

Recommended mapping:

- `CLAUDE.md` should stay concise and point to ShipKit protocols.
- ShipKit skills install to `.claude/skills/`.
- Role-specific workers install to `.claude/agents/` if using subagents.
- Hooks can enforce gates before dangerous actions.

Recommended hooks:

- block production release without release gate
- block client-facing document output without audit
- block destructive shell commands unless approved
- run formatting/lint/test after edits

Recommended subagents:

- pm
- architect
- developer
- qa
- devops
- delivery
- audit
