# Plan -> Execute -> Verify -> Handoff

Every ShipKit stage must run as a PEVH loop.

```text
Input -> Plan -> Execute -> Evidence -> Verify -> Handoff
```

## Plan

The agent must identify:

- stage objective
- required inputs
- expected outputs
- applicable constraints
- required gates
- known risks
- human approval requirements

## Execute

The agent performs the stage work and writes artifacts to the expected paths. Execution must not silently modify scope, approvals, quote terms, production systems, or customer-facing commitments.

## Verify

The agent or gate runner checks the output against protocol, templates, traceability, and policy.

Verification must produce evidence:

- gate results
- test results
- review notes
- missing information
- approval requests

## Handoff

Every stage must create or update a handoff artifact with:

- inputs used
- outputs created
- confirmed facts
- assumptions
- open questions
- risks
- gate results
- next stage recommendation

## PEVH Stage Contract

A stage is incomplete unless it has:

1. A plan
2. Executed artifacts
3. Evidence
4. Gate result
5. Handoff
