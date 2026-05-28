# PRD: CRM Intake Automation

## Goal
Create a lightweight lead intake and review workflow for inbound sales leads.

## Requirements

| ID | Requirement | Module | Acceptance |
|---|---|---|---|
| REQ-001 | Visitor submits lead form | MOD-001 | Valid form creates API request |
| REQ-002 | System stores lead and notifies staff | MOD-002 | Lead record exists and notification payload is generated |
| REQ-003 | Operator reviews lead | MOD-003 | Operator can mark lead as reviewed |

## Non-goals

- Replacing existing CRM
- Importing historical records
- Building a full permissions administration system
