---
name: audit
description: Audit client-facing documents for internal pricing exposure, sensitive data, platform names, overcommitment, legal-risk wording, and delivery redlines before release.
---

# Audit

Use this skill before any quote, proposal, contract note, delivery package, status report, UAT report, or client-facing document is sent externally.

## Inputs

Read the document being audited and relevant context:

- `docs/03-quote-contract/`
- `docs/09-delivery/`
- `delivery/`
- `reports/`
- `protocol/permissions.yaml`
- `protocol/quote-boundary.yaml`

## Redline Categories

### Internal Pricing Exposure

Block if client-facing docs include:

- man-days
- daily rates
- salary or headcount cost
- internal cost structure
- margin
- buffer
- internal pricing model
- internal delivery debate

### Sensitive Information

Check that these are redacted or intentionally approved:

- real customer names when aliases are required
- real platform/system names when sensitive
- personal names
- internal project codenames
- sensitive business module names
- API keys, tokens, secrets, account IDs

### Overcommitment

Flag:

- 100% uptime/no-failure claims
- unlimited maintenance
- absolute data security promises
- unconfirmed third-party capabilities
- absolute delivery date guarantees without assumptions
- “free”, “simple”, “just”, “quick fix” language

### Legal-Risk Wording

Flag:

- unlimited liability
- unclear IP ownership
- unreasonable penalties
- unsupported compliance guarantees
- final interpretation clauses

## Required Outputs

Create or update:

- `audit/document-redaction-audit.md`
- `docs/09-delivery/audit-[doc-name].md` when auditing delivery docs
- `handoff/audit.handoff.md` when part of a stage transition

## Decision

Return one of:

- `CLEAN`
- `NEEDS_REVISION`
- `BLOCKED`

A `BLOCKED` document must not be sent externally.
