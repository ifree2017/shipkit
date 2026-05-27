# ShipKit Harness Engineering

ShipKit is a portable SDLC harness for agent-driven software delivery. It provides protocol, skills, gates, evidence, and runner adapters for moving software projects from requirements to shipped delivery with controlled multi-agent execution.

## Core Formula

```text
Agent Capability = Model x Harness x Environment x Verification
```

The model determines what may be possible. The harness determines whether the work can be executed safely, repeatably, observably, and with evidence.

## ShipKit Harness Principles

1. ShipKit core must stay platform-neutral.
2. Every stage must follow Plan -> Execute -> Verify -> Handoff.
3. Every agent action must produce evidence or update a known artifact.
4. Chat history is not a source of truth; repository artifacts are.
5. Gates decide progression, not agent confidence.
6. High-risk actions require human approval.
7. Third-party tools write evidence first; they do not directly change delivery status.
8. Runner adapters execute; ShipKit controls.
9. Every change must be traceable from requirement to delivery.
10. Every failed run must produce failure attribution.

## Architecture Layers

```text
Protocol Layer      stages, artifacts, gates, handoff, issue types
Skill Layer         plan, execute, verify, observe, audit
Evidence Layer      logs, reports, codegraph, specs, scans, review outputs
Gate Layer          sk check, CI, human approval
Control Layer       state, memory, registry, trace, feedback, review loop
Runner Adapters     OpenClaw, Hive, Codex, Claude, Cursor, Hermes, LangGraph
Integration Layer   external tools, PM methods, codegraph, spec systems, CI/CD
```

## What ShipKit Controls

ShipKit controls the project contract: what stage the project is in, which artifacts are authoritative, which gates have passed, what evidence exists, and which actions require human approval.

## What Runners Control

Runners such as OpenClaw, Hive, Codex, Claude, Cursor, and Hermes execute tasks. They may spawn agents, call tools, run tests, and produce artifacts. They do not decide final project progression unless ShipKit gates pass.

## Source of Truth

The source of truth is the project repository and ShipKit artifacts, not the chat transcript.

Required artifact families:

- `docs/` for stage outputs
- `handoff/` for stage transfer records
- `evidence/` for tool and runner outputs
- `.shipkit/runs/` for execution traces
- `protocol/` for process definitions
- `gates/` for enforceable checks
