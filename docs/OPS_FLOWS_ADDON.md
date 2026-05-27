# ShipKit Ops Flows Add-on

This add-on extends ShipKit beyond the main delivery flow and the existing change/bug/refactor flows.

## Added flows

- clarify: unclear requirements and acceptance gaps
- dependency: customer or third-party dependencies
- blocker: active progress blockers
- decision: ADR and project decisions
- debt: technical and product debt
- env: environment readiness and issues
- data: data contracts and data issues
- security: security baseline and findings
- incident: production or delivery incidents
- scope-drift: unplanned scope expansion signals
- risk: future uncertainty that may affect delivery
- perf: measurable performance concerns
- handoff: stage transfer and context preservation

## Core rule

All unexpected project events must enter a structured flow before they affect scope, PRD, architecture, build, test, release, or delivery.

## Recommended project folders

```text
client-project/
├── clarifications/
├── dependencies/
├── blockers/
├── decisions/
├── debt/
├── env/
├── data/
├── security/
├── incidents/
├── scope-drift/
├── risks/
├── perf/
└── handoff/
```

## Best practices

1. Project files are the source of truth, not chat history.
2. Unclear requirements become clarification items.
3. External conditions become dependencies.
4. Active stop signs become blockers.
5. Key choices become decisions or ADRs.
6. Shortcuts become debt.
7. Environment readiness is required before release.
8. Data flows require a data contract.
9. Security is checked at PRD, architecture, and release stages.
10. Incidents prioritize containment, recovery, communication, root cause, and prevention.
