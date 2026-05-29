---
name: intake
description: Capture raw client/project input and turn vague requirements into structured context, missing information, clarification questions, pre-quote risks, and a stage handoff.
---

# Intake

Use this skill when a client, stakeholder, or internal requester provides raw requirements, screenshots, notes, feature ideas, meeting summaries, or incomplete project context.

Do **not** generate a solution immediately. Intake exists to prevent premature PRD, architecture, quote, or implementation work.

## Inputs

Read when available:

- `docs/00-intake/client-raw-input.md`
- meeting notes, screenshots, pasted messages, tickets, emails, or uploaded requirement docs
- `shipkit.yaml`
- `protocol/stages.yaml`
- `protocol/project-profiles.yaml`

## Extract First

Extract and label:

- original request
- stated feature points
- implied business goal
- user roles
- trigger event
- current workflow
- desired workflow or output
- data source
- data destination
- external dependencies
- acceptance owner
- acceptance evidence
- known timeline, budget, launch, or contract constraints

## Required Outputs

Create or update:

- `docs/00-intake/client-raw-input.md`
- `docs/00-intake/intake-summary.md`
- `docs/00-intake/missing-information.md`
- `docs/00-intake/clarification-questions.md`
- `docs/00-intake/pre-quote-risk.md`
- `docs/00-intake/open-questions.md`
- `handoff/intake.handoff.md`

## Pre-Quote Readiness

End with one of:

- `YES` - enough information to proceed to discovery/scope.
- `NO` - critical information is missing.
- `YES_WITH_ASSUMPTIONS` - can proceed only if assumptions are explicitly documented.

If the answer is `NO` or `YES_WITH_ASSUMPTIONS`, list:

- missing confirmations
- assumptions
- customer-provided prerequisites
- risks before quote
- whether human approval is required

## Red Lines

Do not:

- treat customer wording as final requirements
- invent missing business process details
- generate a client-facing quote
- estimate price, timeline, or team composition
- expose internal assumptions in client-facing documents
- treat unresolved questions as confirmed facts

## Completion Criteria

Intake is complete only when the project has:

- a captured raw input record
- a structured intake summary
- a missing information list
- client clarification questions
- pre-quote risk notes
- a handoff file
