# Preflight Delivery Boundaries

ShipKit now treats pre-sales and client-facing delivery control as part of the main SDLC harness, not as an external integration.

This layer strengthens the early project stages where most delivery risk is created:

- vague customer request
- incomplete business chain
- unclear module boundaries
- unsafe quote wording
- weak contract boundaries
- unverifiable acceptance criteria
- client-facing document leakage

## Fused Skills

The following capabilities are first-class ShipKit skills:

- `intake` - extract raw request, missing information, clarification questions, and pre-quote risk.
- `discover` - reconstruct business scenarios, roles, data flow, dependencies, and exception paths.
- `chain` - close the business chain before scope or PRD.
- `scope` - split business chains into quote-ready and acceptance-ready modules.
- `quote` - write client-facing quote structure without internal pricing leakage.
- `contract` - check contract/SOW boundaries before signing.
- `acceptance` - build acceptance matrices and UAT records.
- `audit` - audit client-facing documents before release.

## Core Principle

Client language is not final requirements. Every feature point must be traced to:

```text
business trigger → user role → workflow → data flow → dependency → exception path → acceptance evidence
```

Only then can it become:

```text
scope → quote → contract → PRD → build → test → delivery
```

## Preflight Gates

Use:

```bash
sk check preflight --project ./client-project
sk check presales --project ./client-project
sk check client-docs --project ./client-project
sk check signoff --project ./client-project
```

Gate suites:

- `preflight` - business chain, quote, contract, acceptance, and document redaction.
- `presales` - business chain, quote, contract, and document redaction.
- `client-docs` - quote redlines and document redaction.
- `signoff` - acceptance, contract boundary, and document redaction.

## Red Lines

Client-facing content must not contain:

- man-days
- daily rates
- salaries
- headcount cost
- internal cost structure
- internal margin
- buffer
- internal pricing logic
- unapproved platform/customer identifiers
- absolute uptime/security guarantees
- unconfirmed third-party capability promises
- informal promises such as “free”, “simple”, “just”, or “quick fix”

## Human Approval

The following always require human approval:

- quotes
- contract/SOW language
- client-facing delivery package
- scope assumptions
- legal-risk terms
- production commitments

## Relationship to SDLC

This layer does not replace the SDLC flow. It strengthens it:

```text
intake → discover/chain → scope → quote/contract → prd → arch → plan → build → test/acceptance → release → delivery/audit
```
