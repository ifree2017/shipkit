# ShipKit Defense Layers

ShipKit uses three layers of control.

## Layer 1: Constraints

Constraints reduce the solution space before work begins.

Examples:

- `AGENTS.md`
- `SOUL.md`
- `ARCHITECTURE.md`
- `CODING_STANDARDS.md`
- `protocol/*.yaml`
- `tool-policy.yaml`
- `project-policy.yaml`
- templates and artifact contracts

Constraints answer: What is allowed? What is expected? What is forbidden?

## Layer 2: Feedback

Feedback turns failures into structured signals that agents can use.

Examples:

- lint output
- test output
- security scan reports
- review scorecards
- gate failures
- incident reports
- failure attribution
- feedback logs

Feedback answers: What went wrong? What should be changed? Where is the evidence?

## Layer 3: Gates

Gates enforce progression rules.

Examples:

- `sk check core`
- `sk check delivery`
- `sk check harness`
- CI workflow gates
- human approval gates
- production release gates

Gates answer: Can this project move forward?

## Rule

Agent confidence is not a gate result. Only evidence-backed gates and human approvals can move high-risk stages forward.
