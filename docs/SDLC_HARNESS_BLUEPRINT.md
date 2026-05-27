# SDLC Harness Blueprint

ShipKit supports the full software delivery lifecycle.

```text
intake -> discover -> scope -> prd -> arch -> plan -> build -> test -> release -> delivery -> retro
```

Every stage follows Plan -> Execute -> Verify -> Handoff.

## Stage Responsibilities

| Stage | Main Output | Key Gate |
|---|---|---|
| intake | raw input, intake summary, open questions | intake completeness |
| discover | scenario, problem, assumptions | discovery readiness |
| scope | modules, boundaries, acceptance | scope completeness |
| prd | PRD, user stories, criteria | traceability |
| arch | architecture, ADR, dependencies | architecture review |
| plan | tasks, milestones, risks | plan readiness |
| build | code, PR, implementation evidence | tests and review |
| test | test plan, UAT matrix, bug list | acceptance coverage |
| release | release plan, env readiness, rollback | release approval |
| delivery | delivery package, handover | client doc audit |
| retro | lessons, new gates, new skills | learning captured |

## Exception Flows

ShipKit also supports:

- change
- bug
- refactor
- dependency
- blocker
- risk
- incident
- debt
- security
- data
- performance

Every exception flow must produce impact analysis and either update affected artifacts or record a decision.
