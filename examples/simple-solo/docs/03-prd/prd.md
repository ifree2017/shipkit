# Lightweight PRD: Contact Form Automation

## Problem
The marketing site receives inquiries manually by email. The client wants a reliable lightweight form that captures the same inquiry data and keeps a backup record.

## User
Website visitor submitting a sales inquiry.

## Workflow
1. Visitor opens contact page.
2. Visitor fills required fields.
3. System validates the form.
4. System sends email notification.
5. System writes CSV backup.
6. Visitor sees success confirmation.

## Functional Requirements

| ID | Requirement | Acceptance |
|---|---|---|
| REQ-001 | Validate required fields | Empty name, email, or message is rejected |
| REQ-002 | Send notification email | Sales inbox receives formatted inquiry |
| REQ-003 | Write CSV backup | Submission is appended with timestamp |
| REQ-004 | Show result message | Visitor sees success or retry message |

## Open Questions

- Confirm final sales inbox address before deployment.
- Confirm CSV retention location.
