---
name: verify
description: Use when checking whether ShipKit stage outputs, artifacts, tools, or runner results satisfy the protocol, gates, traceability, and approval policy.
---

# Verify

## Purpose

Verify that a stage output is ready to move forward.

## Verification Checklist

- Required artifacts exist.
- Artifact paths match protocol.
- Open questions are marked.
- Evidence exists.
- Gate results are recorded.
- Required approvals are captured.
- Handoff is complete.
- Customer-facing content has been audited.

## Result Format

Return one of:

- PASS
- FAIL
- PASS_WITH_WARNINGS
- NEEDS_HUMAN_APPROVAL

Always include evidence paths and required remediation.
