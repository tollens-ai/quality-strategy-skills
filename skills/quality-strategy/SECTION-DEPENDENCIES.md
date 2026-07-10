# Section dependency graph — the map correction mode consults

When a correction touches a section of `quality/strategy.md`, this map says what sits downstream: the sections whose content was derived, in part, from the corrected one. Correction mode (SKILL.md → "Revision mode", the correction path) re-applies the template to exactly the touched section plus its downstream tree — nothing else — and multiple corrections take the union of their trees. **This file is the authority for that computation: consult it, don't improvise the graph from memory.**

It mirrors each sub-step file's own "What you need from the previous sub-step" declaration. If a sub-step's inputs ever change, update this map in the same commit — a graph that drifts from the sub-steps silently mis-scopes every future correction.

## Direct dependents (a change to the left section re-opens the right ones)

| Section | Direct dependents |
|---|---|
| Pre-read (`quality/pre-read.md`) | 1.1–1.5, 2.1, 3.1, 3.2, 4.1, 5.1, 6.2 — *informative: the pre-read is a working artefact; correcting it is not a doc correction, but a materially-changed pre-read is context-change territory (see the triage)* |
| 1.1 Purpose + `## Strategy job` | 1.2, 1.3, 1.5, 2.1, 3.1, 4.1, 5.1 — *and the Strategy job paragraph steers `/quality-strategy-review` severity* |
| 1.2 Team | 1.3, 1.5, 2.1, 3.1, 4.1, 5.1 |
| 1.3 Workflows | 1.4, 1.5, 2.1, 3.1, 4.1, 5.1 |
| 1.4 Release workflow | 1.5, 2.1, 3.1, 4.1, 5.1 |
| 1.5 Budget | 2.1, 3.1, 4.1, 5.1, 7.3 (budget shapes sequencing) |
| 2.1 Roadmap + `Release:` header | 3.1, 4.1, 5.1 — *and every per-release section heading carries the release name* |
| 3.1 Stakeholder list (incl. agent-stakeholder status) | 3.2, 4.1, 5.1, 5.3 (audience reasoning reads who's an agent), 5.5 |
| 3.2 Three-lens bars (incl. recurrence/tolerance) | 4.1, 5.1, 5.2, 5.4, 5.5, 6.1 |
| 4.1 Non-goals | 5.1, 5.4, 5.5, 6.1 |
| 5.1 Inventory (raw) | 5.2 |
| 5.2 Unpack | 5.3 |
| 5.3 Final inventory | 5.4, 5.5 |
| 5.4 Ratings | 5.5, 6.1 |
| 5.5 Sanity checks | — (a checks pass; its findings land as corrections to the sections it checks) |
| 6.1 Required levels | 6.2 (the row set), 6.3 |
| 6.2 Actual levels | 6.3 |
| 6.3 Risk map | 7.1, 7.2, 7.3 (7.2 and 7.3 each read Part 6 directly, not only via 7.1) |
| 7.1 Derived actions | 7.2 |
| 7.2 Classification | 7.3 |
| 7.3 Sequencing | — |

**Always refreshed regardless of tree** (views and bookkeeping, not tree members): the Operational TL;DR + triage rubric (a regenerated view of the body — re-run `/operational-distillation` when the union touched anything it summarises), the `## Since the last revision` section, and the header's `Last updated` + version stamp.

**Outside the graph:** the release bank (`quality/releases/`) and the ideas ledger (`quality/ideas.md`) are captured inputs, not derived sections — a correction never re-opens them, though a correction *to* a banked claim is just an edit to the bank file.

## Computing a tree

The downstream tree of a corrected section is the **transitive closure** of the direct-dependents column: follow the table until nothing new is added, and order the result in template order. Two worked examples:

- **Correction to 6.2** (an actual was misdocumented): tree = 6.2 → 6.3 → 7.1 → 7.2 → 7.3. Tightly scoped — this is the common case for corrections found late.
- **Correction to 3.2** (a bar was misdocumented — e.g. a dealbreaker's tolerance recorded too strictly): tree = 3.2 → {4.1, 5.1…5.5, 6.1} → 6.2, 6.3 → 7.x — most of the document sits downstream of the bars.

A wide tree does **not** mean a heavy session. Re-applying the template to a dependent section means re-deriving what the corrected input implies *for that section* — and where the honest answer is "nothing changes", the move is a suggested keep-as-is the user confirms in a line (SKILL.md → the correction protocol's ratification rule), recorded as examined-unchanged. Most of a wide tree confirms in seconds; what the tree buys is that nothing downstream is *silently* assumed unaffected.

**When the tree is effectively the whole document** (a correction to 1.1 Purpose, or several corrections whose union covers most Parts), tell the user plainly that a full re-walk (revision path (c)) or — if what's true has changed rather than been misrecorded — new-release mode is the honest shape of the work, and let them choose. A "correction" that rewrites everything isn't a correction.
