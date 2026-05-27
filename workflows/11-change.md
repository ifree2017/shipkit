# Change Flow

Use this workflow when a new requirement, modified expectation, or scope change appears after scope has already been confirmed.

## Flow

1. Capture request
2. Classify request
3. Link to original scope / PRD / acceptance item
4. Analyze impact
5. Recommend decision
6. Update affected artifacts if approved
7. Add regression and acceptance coverage
8. Record handoff

## Decision Values

- accept in current scope
- accept as paid change
- defer to later phase
- reject
- convert to bug
- convert to clarification

## Required Artifacts

- `changes/CR-XXXX.md`
- updated `docs/02-scope/` if scope changes
- updated `docs/03-prd/` if product behavior changes
- updated `docs/04-arch/` if architecture changes
- updated `docs/05-plan/` if timeline or tasks change
- updated `docs/07-test/` if test or acceptance changes
- updated `trace/change-log.md`

## Gate

Run `check_change_impact` before implementation.
