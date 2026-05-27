# Wangyuyan OpenClaw Findings for ShipKit

This note distills reusable ShipKit patterns from a prior OpenClaw workspace snapshot named `wangyuyan`.

Do not import that workspace verbatim. Treat it as an experience record. ShipKit should absorb the patterns while removing private data, hard-coded secrets, machine-specific paths, and one-off project history.

## Useful patterns

### 1. Lead does not execute every task

The workspace used an RD Lead role with this operating pattern:

```text
judge -> dispatch -> synthesize -> report
```

For ShipKit, this becomes the `lead` skill and role policy:

- The lead decides whether work is simple enough to execute directly.
- Complex work is decomposed and delegated.
- The lead must synthesize subagent outputs instead of blindly forwarding them.
- Final report must update project state, task registry, handoff, and evidence.

### 2. Files are the durable memory

The prior workspace used daily logs, memory files, project state files, and session flush scripts.

For ShipKit:

- Conversation is temporary.
- `shipkit.yaml`, `STATE.md`, `handoff/`, `trace/`, and `memory/` are durable facts.
- Every major phase should leave a durable handoff artifact.
- Context flush is not optional for long-running work.

### 3. Project state must be authoritative

The prior workflow repeatedly referenced project state, progress logs, and milestones.

For ShipKit:

- Each project should have `STATE.md`.
- State must include current stage, open blockers, current decisions, active changes, active bugs, and next actions.
- Agents must read `STATE.md` before doing stage work.

### 4. Task registry improves agent coordination

The prior workspace had a task schema and task manager shell script.

For ShipKit:

- Add a platform-neutral task registry protocol.
- Track task id, type, status, priority, assigned agent, artifacts, and result.
- Every build/test/release task should map to a requirement, change, bug, or refactor item.

### 5. Subagents are disposable; artifacts persist

The prior workspace treated subagents as temporary processes.

For ShipKit:

- Spawned agents are disposable.
- Their outputs must be captured as handoff artifacts.
- A task is not complete until artifacts are recorded and checked.

### 6. Review should be adversarial and evidence-based

The prior workspace used a planner-generator-evaluator review loop with scorecards and Playwright evidence.

For ShipKit:

- Use planner -> builder -> evaluator pattern for high-risk changes.
- Evaluator must compare output to spec, not the builder's claims.
- UI changes should produce evidence screenshots where possible.
- A review without evidence is only an opinion.

### 7. Process validation testing is needed

The prior workspace had a PVT concept: run the whole process against a small sample project to ensure the harness itself works.

For ShipKit:

- Add `pvt` skill and protocol.
- Periodically run a tiny sample project through intake -> PRD -> arch -> plan -> build -> test -> delivery.
- Failures become harness improvements.

### 8. Secrets must be treated as red lines

The uploaded workspace contained hard-coded integration credentials in a script. ShipKit must explicitly prevent this pattern.

For ShipKit:

- Add `check-secret-redlines` gate.
- Do not package or publish secrets.
- Prefer environment variables and local `.env` files excluded from git.
- Any discovered credential should trigger rotation and incident handling.

## ShipKit additions derived from this snapshot

- `protocol/context-fabric.yaml`
- `protocol/task-registry.yaml`
- `protocol/subagent-policy.yaml`
- `protocol/review-loop.yaml`
- `protocol/pvt.yaml`
- `protocol/tool-policy.yaml`
- `skills/lead/`
- `skills/coord/`
- `skills/registry/`
- `skills/memory/`
- `skills/pvt/`
- `skills/review/`
- `skills/spawn/`
- `skills/toolmap/`
- `skills/secrets/`
- OpenClaw and Wangyuyan adapter notes

## Non-goals

ShipKit should not inherit:

- personal identity files
- hard-coded user preferences
- private paths
- production credentials
- one-off project lists
- personal memory logs
- unverified agent output
