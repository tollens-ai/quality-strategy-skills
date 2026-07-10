# Sub-step 5.3 — Old/new-world pass

## Goal

For each dimension in the post-unpack inventory from 5.2, decide whether the dimension means the same thing for agent stakeholders as it does for human ones — or whether the meaning shifts. Where it shifts meaningfully and the stakeholder mix includes both, split the dimension into audience-specific versions.

The reasoning here is **mandatory** — every trap dimension gets the audience question, every decision gets recorded — but it runs as **machinery, not ceremony.** This pass is the agent's work that *feeds* the dimension list 5.4 will rate; it is not a walk the user sits through dimension by dimension. Do the audience analysis silently across the inventory, then surface only what actually changed — the splits you made and any genuine audience tension — for the user to react to. The user reacts to *outcomes* (a split, a tension), never to the procedure of asking "same or shifts?" twenty times. *Why this distinction matters:* in live runs the dimension-by-dimension confirmation walk read as internal logic leaking out — the user experiences a string of audience questions whose answer is usually "neutral", which is the machine showing its working rather than presenting a result. What's load-bearing is that the reasoning happened and the splits are right; that the user watched it happen adds nothing.

Get the reasoning wrong and the 5.4 rating misleads: what's High for an agent may be Low for a human (and vice versa), and a single un-split rating hides that. So the pass cannot be skipped — but it is run, not performed.

## What you need from the previous sub-step

Read the post-unpack inventory from sub-step 5.2's output in `quality/strategy.md`. Read Part 3 (stakeholders) — specifically, note which stakeholders are agents.

This skill takes the new-world stance (see PHILOSOPHY): agent stakeholders are the default. Sub-step 3.1 should have surfaced them unless the user gave a specific concrete reason. **Run the audience question on trap dimensions regardless of what 3.1 recorded** — because:

- Future-release agent stakeholders may matter (the strategy covers one release, but the architecture outlives it).
- Maintenance agents working in the codebase are stakeholders for maintainability / diagnosability / readability dimensions even if they're not product stakeholders.
- "No agents now" rarely means "no agents ever."

If after running the audience question on each trap dimension you conclude none need splitting, record that decision per dimension with reasoning — not as a blanket "no agents, skipped."

## What to cover

By the end of this sub-step:

1. **Every trap dimension has been examined** — the audience question asked, the answer recorded.
2. **Where audience-splitting is warranted, the dimension is split into audience-specific versions** in the inventory (e.g. "Readability for humans" and "Readability for agents").
3. **Where the dimension means the same to both audiences** (or there are no agent stakeholders), that's been recorded as an explicit decision, not a silent skip.

The trap dimensions, where old/new-world reframing changes the rating most often:

- **Readability** — "can a new engineer follow this?" vs "can an agent orient in this code?"
- **Maintainability** (or its sub-dimensions if unpacked in 5.2) — what humans care about vs what agents care about often differ.
- **Documentation** — "human-readable docs" vs "machine-parseable context for agents."
- **Diagnosability / Debuggability / error messages** — "human-debuggable" vs "agent-actionable."
- **Ramp-up-ability** — humans onboarding to a codebase vs agents orienting to a task in it.
- **Observability** — what a human watching dashboards needs vs what an agent processing logs needs.

These are the labels almost always worth checking. Other dimensions may also shift by audience; the list above is not exhaustive. If a dimension's name ("usability," "ramp-up") makes you picture a specific human audience, that's a hint to check whether agents have a different version.

## How to run it

Run the audience analysis yourself, across the whole inventory, before you bring anything to the user. For each dimension, settle the audience question internally:

> *Is this dimension's meaning the same for agent stakeholders as for human ones — or does it shift?*

- **Audience-neutral dimensions** (e.g. "Spanish localisation," "PCI compliance") — record as neutral and move on. Don't manufacture splits, and don't ask the user about them.
- **Trap dimensions that genuinely shift** — make the split in the inventory (e.g. "Readability for humans" and "Readability for agents"), with the reasoning recorded against it.
- **Trap dimensions you judge neutral** — record the neutral decision *with its reason*, so the no-split is a considered call on disk, not a silent skip. (This recorded reasoning is what review check 16 and the contradiction check read; it does not need to be narrated to the user.)

Then **surface only what changed** — and surface it as a finding, not a procedure:

- For each split you made, present it concretely as a moment the user can react to: *"I've split readability into a human version and an agent version — for humans it's can-a-new-engineer-follow-this; for agents it's can-the-agent-orient-quickly-in-this-code, and those will rate differently. Does that match how you see it?"* The user keeps, adjusts, or collapses the split.
- For any genuine audience **tension**, name it: terse error messages help agents but hurt humans; verbose context helps agents but bloats human-facing docs. A tension the user should arbitrate is worth a sentence; a routine split is worth a line.
- Do **not** walk the user through the dimensions you judged neutral. "I checked these eleven and they're audience-neutral" is the machine showing its working — the recorded decisions carry that; the user doesn't need the recital.

When there are **no agent stakeholders**, this is almost entirely silent machinery: run the audience question over the trap dimensions anyway (future-release and maintenance agents still make it live — see above), record the neutral decisions with reasons, and tell the user the *outcome* in one line — *"none of these split by audience for this release; here's why in the doc"* — not a walk of confirmations.

What you must not do:

- Skip the audience question on any trap dimension — the reasoning is mandatory even when its answer is "neutral". What's optional is *narrating* it to the user, not *doing* it.
- Turn the pass back into a ceremony: a dimension-by-dimension "same or shifts?" walk is exactly the internal-logic-leaking-out the machinery framing exists to kill.
- Manufacture audience splits for dimensions that don't warrant them.
- Let a neutral decision go unrecorded — a silent skip and a considered "neutral, because…" look identical to the user but not to the review. The reason on disk is what distinguishes them.

## Catch yourself when (internal checks)

These are checks on your own analysis, not user push-backs — the pass is machinery now, so most of these fire silently and you correct them before anything reaches the user:

- You're about to mark a trap dimension audience-neutral without actually examining it. *Readability for whom — humans only, or also agents working in this codebase?* Examine, then record the reason; don't default to neutral.
- A dimension whose natural language clearly references one audience ("documentation", "error messages") is heading for a single rating. Check whether the agent version is a distinct thing before you let it rate as one.
- Part 3 includes agent stakeholders but your analysis produced no splits at all. That's unusual — re-examine before accepting it. If it genuinely holds, that itself is worth one line to the user: *"you have agent stakeholders, but none of these dimensions actually split by audience this release — here's why."*

## This sub-step is DONE when

- [ ] Every dimension in the post-unpack inventory has been examined for the audience question (the reasoning is mandatory — run, even where its answer is "neutral").
- [ ] Every dimension that was audience-split has been replaced with audience-specific versions in the inventory.
- [ ] Every trap dimension that was *not* audience-split has its audience-neutral decision **recorded with reasoning** in the doc (a reason on disk, not a silent skip — the splits and the no-splits both leave a trace review check 16 can read).
- [ ] The splits made, and any genuine audience tensions, were surfaced to the user as findings to react to — and the neutral decisions were *not* walked through dimension by dimension (machinery, not ceremony).
- [ ] If there are no agent stakeholders, the audience question still ran over the trap dimensions and the neutral decisions are recorded with reasons; the user heard the outcome in one line, not a walk of confirmations.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 5.4 (Rate dimensions).

## Output

Update the inventory section in `quality/strategy.md`. Replace the post-unpack inventory from 5.2 with the post-old/new-world inventory — this is the **final** inventory that 5.4 will rate:

```markdown
### Final inventory (<release>)

| Dimension | Scope (stakeholder/capacity + surface) | One-line reason it matters for THIS release | Source | Unpacked from | Audience |
|---|---|---|---|---|---|
| <name (atomic / sub-dimension / audience-split)> | <carried forward from 5.1/5.2, refined if the audience split changed it> | <why this matters> | <stakeholder bar / design observation / reference-list backstop> | <"atomic", or parent composite> | <"any" / "humans" / "agents" / "both — split"> |

The "Audience" column shows the old/new-world decision: dimensions where humans and agents care about the same thing show *"any"*; trap dimensions confirmed as audience-neutral show *"any — confirmed"*; audience-split dimensions appear as separate rows with *"humans"* and *"agents"* respectively.

**Old/new-world decisions recorded:**

- **<dimension>** — split into "X for humans" and "X for agents" because <reason>.
- **<dimension>** — kept audience-neutral, because <reason>.

**Stakeholder mix:** <"includes agent stakeholders" / "human-only — confirmed">

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines — but make it a summary of *outcomes*, not a recap of the procedure: name the splits you made (and any tension worth arbitrating), state in one line that the rest came out audience-neutral with reasons recorded, and don't walk the neutral dimensions one by one. Then ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 5.4 (Rate dimensions)?"*
