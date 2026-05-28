# ShipKit Documentation

This directory contains ShipKit guides, concepts, and implementation notes.

## Start Here

- [README](../README.md) - project overview and quick start
- [Harness model](../HARNESS.md) - ShipKit's execution and control model
- [CLI reference](CLI_REFERENCE.md) - commands and examples
- [Roadmap](ROADMAP.md) - implementation priorities

## Core Concepts

- [Harness Engineering](HARNESS_ENGINEERING.md)
- [PEV Model](PEV_MODEL.md)
- [Defense Layers](DEFENSE_LAYERS.md)
- [SDLC Harness Blueprint](SDLC_HARNESS_BLUEPRINT.md)
- [Control Layer](CONTROL_LAYER_ADDON.md)

## Project Setup and Execution

- [Project Profiles](PROJECT_PROFILES.md)
- [Team Execution](TEAM_EXECUTION.md)
- [Project Structure Addon](PROJECT_STRUCTURE_ADDON.md)
- [Ops Flows](OPS_FLOWS_ADDON.md)

## Integrations and Adapters

- [Integrations Addon](INTEGRATIONS_ADDON.md)
- [Wangyuyan OpenClaw Findings](WANGYUYAN_OPENCLAW_FINDINGS.md)

## Stabilization Notes

- [Stabilization Notes](STABILIZATION_NOTES.md)

## Documentation Cleanup Plan

Some current documents still use `*_ADDON.md` names because they were added as incremental patches. Future cleanup should reorganize them into:

```text
docs/
├── concepts/
├── guides/
├── reference/
└── decisions/
```

Until then, this file acts as the documentation index.
