# Indicators of a good test strategy

Judge a test strategy by what running it produces, not by what the document looks like. The right test is forward-looking: *if the team carries out the agreed moves exactly as written, will the quality strategy end up in a better place — moved in the right direction, with the right priority, with the right efficiency?*

The five indicators below all come down to that question. `/test-strategy-review` and `/test-strategy`'s closing check both refer to them. They are not properties of the document; they are predictions about what happens when the team runs it.

## 1. Direction — every investigation moves the strategy

Every kept ility and every agreed move traces to the release's quality strategy: closing a gap, resolving an Unknown, or validating a claim in Part 6's risk map. Nothing investigates what the strategy says doesn't matter (None-rated dimensions, non-goals). Answering a move's question would visibly change the risk map — a `?` becomes known, a confidence moves, a required level gets revised. **Failure modes:** a move with no risk-map trace ("what we felt like testing"); investigation aimed at a None or a non-goal; a question whose answer would change nothing.

## 2. Priority — first things first

Dealbreaker-linked ilities come first; within similar impact, cheaper-to-learn first. Early moves are the ones whose answers could change everything after them. **Failure modes:** an existential unknown sitting behind routine work; ordering that ignores cost for no stated reason.

## 3. Sufficiency — what needs closing is closed or visibly declined

Every H/M ility in the risk map appears in the filter table with a verdict — in this lane, handed to a named sibling lane, or explicitly out with a reason. Every stakeholder Dealbreaker is either addressed by an agreed move (here or in a named lane) or explicitly, eyes-open, not — never silently assumed fine. The fresh-eyes defect recon is on the table or carries the user's recorded drop reason. **Failure modes:** an H/M ility absent from the filter table; a Dealbreaker no lane touches; the recon silently gone.

## 4. Feasibility — the moves can actually be run

Each agreed move names a question concrete enough to act on, what would count as answered (a state, not a goal), and who runs it — with the human/agent split respecting what each is for (agents for near-free checking and breadth; humans for judgment, smells, and taste). **Failure modes:** a move too vague to start; "answered" defined as an aspiration; an agent assigned judgment-heavy work or a human assigned exhaustive mechanical checking.

## 5. Honesty — uncertainty is preserved, not decorated

Cost and confidence guesses are marked as guesses ("unknown — try and see" is a valid entry); what the existing tests *actually* tell you is stated, not what they feel like they cover (proxies are not quality); filtered-out ilities carry real reasons, not theatre; an update's `## Since the last cycle` closes prior moves only with the finding that closed them. **Failure modes:** all-confident cost claims on the first cycle; green CI cited as evidence for an ility the suite never touches; closures without findings.
