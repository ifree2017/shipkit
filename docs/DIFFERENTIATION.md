# Differentiation

ShipKit should not position itself as another general-purpose skills bundle or coding agent. Its strongest position is narrower and clearer:

> ShipKit is a portable SDLC delivery harness for agent-assisted software projects.

## What ShipKit is

ShipKit focuses on moving software work from requirements to verified delivery:

```text
requirements -> PRD -> architecture -> plan -> build -> test -> release -> delivery
```

It provides:

- project profiles
- stage protocols
- delivery workflows
- reusable skills
- executable gates
- evidence tracking
- team execution records
- runner adapters
- integration policy
- scoring and release-readiness checks

## What ShipKit is not

ShipKit is not:

- a general skills marketplace
- a replacement for an IDE coding agent
- a replacement for CI/CD
- a model routing platform
- a universal autonomous agent runtime
- a clone of ECC, Superpowers, OpenCode, OpenClaw, or Hive

## Compared with skill frameworks

Skill frameworks such as Superpowers or ECC are useful references for agent capability design. ShipKit differs by focusing on SDLC control and delivery evidence.

ShipKit cares less about how many skills exist and more about whether every artifact is traceable, checked, scored, and ready for the next delivery stage.

## Compared with coding agents

Coding agents such as OpenCode or Codex-style runners can be execution backends. ShipKit does not replace them. It wraps them with:

- stage intent
- context rules
- evidence requirements
- gates
- approval boundaries
- handoff records

## Compared with multi-agent runners

Hive, OpenClaw, Ruflo, and similar systems can execute agent loops. ShipKit controls the workflow contract around them:

```text
runner executes
ShipKit records evidence
ShipKit gates decide progression
```

## Practical positioning

Use this sentence in public docs:

> ShipKit is a portable SDLC harness that gives coding agents project structure, delivery stages, quality gates, evidence tracking, and profile-based governance.
