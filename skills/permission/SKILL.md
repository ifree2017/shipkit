---
name: permission
description: Use when classifying tool permissions, risky actions, production access, secret access, client-facing commitments, or human approval requirements in ShipKit.
---

# Permission

## Purpose

Classify actions by risk and required approval.

## Permission Levels

- read_only
- workspace_write
- tool_limited
- approval_required

## Always Require Human Approval

- production deployment
- schema migration
- deleting data
- changing quote or contract
- sending customer-facing documents
- accessing customer external systems
- changing authentication or authorization logic
- reading or rotating secrets

## Output

Return:

1. action
2. risk level
3. required permission
4. approval required: yes/no
5. reason
6. safe alternative
