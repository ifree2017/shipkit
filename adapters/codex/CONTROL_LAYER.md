# Codex Adapter: ShipKit Control Layer

Recommended mapping:

- `AGENTS.md` is a table of contents, not a large manual.
- ShipKit skills install to `.agents/skills/`.
- Protocols and templates stay in repository-local folders.
- Gates run through `sk check` or direct node scripts.

Recommended layout:

```text
AGENTS.md
.agents/skills/
protocol/
templates/
gates/
docs/
trace/
control/
```

Codex works best when repository-local artifacts are the source of truth and gates encode repeated review feedback.
