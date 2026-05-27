# Bug Flow

Use this workflow when a defect, failed acceptance case, regression, or unexpected behavior is discovered.

## Flow

1. Capture defect
2. Triage severity and category
3. Link to requirement / module / acceptance item
4. Confirm expected vs actual behavior
5. Determine if this is a real defect or a change request
6. Define fix plan
7. Implement fix
8. Run regression tests
9. Close with evidence

## Required Artifacts

- `defects/BUG-XXXX.md`
- updated `docs/07-test/` when regression coverage changes
- updated `trace/acceptance-map.md` when acceptance coverage changes

## Gate

Run `check_bug_traceability` before closing.
