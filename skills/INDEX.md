# ShipKit Skills Index

ShipKit skills are reusable instructions for agent platforms. They are directories with `SKILL.md` so they can be loaded by OpenClaw, Codex, Claude, Cursor, Hermes-compatible runners, or generic markdown-based agents.

## Core SDLC

- `intake` - capture raw project input, missing information, clarification questions, and pre-quote risks
- `discover` - clarify requirements, business scenarios, roles, data flow, exception paths, and acceptance evidence
- `chain` - close a business chain before scope, quote, PRD, or build
- `scope` - define module boundaries, deliverables, exclusions, prerequisites, dependencies, and quote readiness
- `quote` - create client-facing quote structure without internal pricing leakage
- `contract` - check contract/SOW boundaries before signing
- `prd` - create product requirements and user stories
- `arch` - architecture and technical design
- `plan` - implementation planning and task breakdown
- `build` - implementation guidance
- `test` - test planning and verification
- `acceptance` - acceptance matrix and UAT records
- `release` - release readiness and deployment planning
- `delivery` - delivery package and handoff
- `audit` - client-facing document, redline, and leakage checks

## Change and Ops Flows

- `change` - change request impact analysis
- `bug` - defect triage and regression planning
- `refactor` - refactor proposal and approval analysis
- `clarify` - unresolved requirement clarification
- `dependency` - external dependency tracking
- `blocker` - blocker escalation and resolution
- `risk` - project risk tracking
- `decision` - ADR and decision logging
- `debt` - product or technical debt tracking
- `env` - environment readiness and issues
- `data` - data contract and data issue handling
- `security` - security baseline review
- `incident` - incident handling and postmortem
- `scope-drift` - scope drift detection and routing
- `perf` - performance issue and readiness handling
- `handoff` - stage or team handoff

## Team Execution

- `team` - members, roles, and capacity
- `task` - task creation and state movement
- `progress` - module and project progress reporting
- `workload` - workload and capacity balancing
- `sync` - integration and coordination logs
- `status` - status reports and project updates

## Control and Verification

- `control` - control loop and correction flow
- `trace` - requirement-to-delivery traceability
- `measure` - quality and delivery measurement
- `gate` - gate result handling
- `feedback` - feedback logs and corrections
- `verify` - verification report generation
- `observe` - observability and run signals
- `permission` - permission request and approval flow
- `hook` - lifecycle hook handling
- `lead` - lead/supervisor coordination
- `coord` - coordination between tasks or agents
- `registry` - task/project registry handling
- `memory` - durable state and memory guidance
- `review` - review artifacts and scorecards
- `pvt` - process verification testing
- `spawn` - subagent spawn briefs
- `secrets` - secret redline handling

## Integrations and Evidence

- `toolmap` - map external tools to allowed ShipKit use
- `vendor-review` - review third-party skills/tools before use
- `reverse-prd` - infer PRD from existing code with confirmation boundaries
- `codegraph` - code graph evidence and query guidance
- `impact` - impact analysis from change to affected modules/tests
- `spec` - spec layer creation and review
- `spec-diff` - detect changes between spec versions
- `spec-test` - test/spec consistency guidance
- `source-vet` - vet external repositories before adoption
- `runner-vet` - vet external agent runners before adapter use

## Platform Setup

- `shipkit-init` - install or bootstrap ShipKit into a supported platform workspace
- `classify` - classify project complexity and recommend a profile
- `openclaw` - guide OpenClaw workspace/project usage where installed

## Skill Quality Expectations

A production-grade skill should include:

- when to use it
- required inputs
- required outputs
- files it should read or write
- rules and forbidden behaviors
- completion criteria
- handoff or evidence expectations

The most critical skills for client delivery are `intake`, `discover`, `chain`, `scope`, `quote`, `contract`, `acceptance`, and `audit`.
