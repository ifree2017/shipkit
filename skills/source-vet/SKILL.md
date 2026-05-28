---
name: source-vet
description: Use when evaluating an external GitHub repository, skill pack, runner, design library, code intelligence tool, or capability pack before integrating it into ShipKit.
---

# Source Vet

Do not add external repositories directly to ShipKit core.

Evaluate the source as one of:

- runner
- tool / MCP
- code intelligence / evidence
- design spec reference
- PM or UX skill source
- capability pack
- reference-only
- reject

Produce:

1. Repository identity
2. Claimed purpose
3. License and redistribution implications
4. Maintenance signal
5. Required permissions
6. Scripts/install hooks/binaries risk
7. Secret or supply-chain risk
8. ShipKit layer fit
9. Recommended integration mode
10. Verdict

Allowed verdicts:

- accept-as-tool
- accept-as-reference
- rewrite-as-internal-skill
- adapter-only
- reject
- needs-human-review
