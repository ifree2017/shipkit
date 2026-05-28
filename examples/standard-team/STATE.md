# Project State

## Current goal
Deliver a standard-team CRM intake automation demo that shows team ownership, task progress, integration evidence, and delivery readiness.

## Confirmed scope
- Lead intake form
- Lead API and storage
- Notification payload generation
- Internal review list
- Test evidence and delivery handoff

## Open questions
- Confirm final production notification destination.

## Open blockers
No hard blockers. Notification destination remains a release dependency warning.

## Key decisions
- Use `standard-team` profile because the project has multiple contributors and modules.
- Continue UAT with mocked notification delivery until production target is confirmed.

## Next actions
- Complete review-list UAT.
- Confirm notification target.
- Regenerate score report if scoring is installed.
