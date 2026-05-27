# Refactor Flow

Use this workflow when technical debt, architecture risk, or maintainability issues require code restructuring.

## Flow

1. Capture refactor proposal
2. Analyze risk if done and if not done
3. Identify affected modules and contracts
4. Determine approval requirement
5. Update architecture or ADRs if approved
6. Implement refactor
7. Run regression tests
8. Close with evidence

## Required Artifacts

- `refactors/RF-XXXX.md`
- updated `docs/04-arch/` or `decisions/ADR-XXXX.md` if architecture changes
- updated `docs/07-test/` if regression coverage changes

## Gate

Run `check_refactor_approval` before implementation.
