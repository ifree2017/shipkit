---
name: toolmap
description: Use when mapping ShipKit actions to platform tools, evaluating tool permissions, reducing tool surface area, or creating adapter capability reports.
---

# Toolmap

Keep tool use small, explicit, and safe.

## Capability levels

- L1 read-only
- L2 write files
- L3 execute commands
- L4 spawn agents
- L5 network
- L6 external action

## Platform adapter must declare

- can read files
- can write files
- can execute shell
- can spawn subagents
- can access network
- can send external messages
- supports human approval
- supports hooks
- supports scheduled tasks

## Default rules

- Read before write.
- Dry-run before mutation.
- Approval before external action.
- Never commit secrets.
- Prefer generic actions over many specialized tools.

