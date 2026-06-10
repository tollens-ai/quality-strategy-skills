# Sub-step 5.3 — Old/new-world pass

## Goal

For each dimension in the post-unpack inventory from 5.2, decide whether the dimension means the same thing for agent stakeholders as it does for human ones — or whether the meaning shifts. Where it shifts meaningfully and the stakeholder mix includes both, split the dimension into audience-specific versions.

Skip this check where it was needed and the 5.4 rating will mislead: what's High for an agent may be Low for a human (and vice versa), and a single rating hides that.

## What you need from the previous sub-step

Read the post-unpack inventory from sub-step 5.2's output in `quality/strategy.md`. Read Part 3 (stakeholders) — specifically, note which stakeholders are agents.

This skill takes the new-world stance (see PHILOSOPHY): agent stakeholders are the default. Sub-step 3.1 should have surfaced them unless the user gave a specific concrete reason. **Run the audience question on trap dimensions regardless of what 3.1 recorded** — because:

- Future-release agent stakeholders may matter (the strategy covers one release, but the architecture outlives it).
- Maintenance agents working in the codebase are stakeholders for maintainability / diagnosability / readability dimensions even if they're not product stakeholders.
- "No agents now" rarely means "no agents ever."

If after running the audience question on each trap dimension the user concludes none need splitting, record that decision per dimension with reasoning — not as a blanket "no agents, skipped."

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

## How to ask

For each dimension in the inventory, ask:

> *"Is this dimension's meaning the same for agent stakeholders as for human ones — or does it shift?"*

For dimensions that obviously don't shift by audience (e.g. "Spanish localisation," "PCI compliance"), don't manufacture splits — record as audience-neutral and move on.

For potential trap dimensions, propose the split concretely:

> *"For [dimension], do agents and humans care about the same thing here? For example, readability for humans is about can-a-new-engineer-follow-this; readability for agents is about can-the-agent-orient-quickly-in-this-code. If those are meaningfully different here, we should split — they may rate differently in 5.4."*

The user confirms which to split. Replace the dimension with audience-specific versions in the inventory (e.g. "Readability for humans" and "Readability for agents").

You have explicit permission and encouragement to:

- Skip the audience question for dimensions where audience clearly doesn't matter. Don't ceremony-grind.
- Surface tensions where one audience's needs trade off against the other (e.g. terse error messages are good for agents but poor for humans).
- Note that when there are no agent stakeholders, this sub-step is mostly a walk of confirmations — still walk it; the act of confirming matters.

What you must not do:

- Skip the audience question on trap dimensions (the ones listed above) without explicit confirmation.
- Manufacture audience splits for dimensions that don't warrant them.
- Forget to confirm the no-agent-stakeholders case explicitly — silent skipping looks identical to "considered and confirmed."

## Push back when

- A trap dimension is dismissed as audience-neutral without examination. *"Readability for whom — humans only, or also agents working in this codebase? If different audiences, the rating may differ; let's check."*
- The audience question is skipped on a dimension whose natural language clearly references one audience. *"You've called this 'documentation' — is that human-readable docs, or also machine-parseable context for agents? Both?"*
- The stakeholder list in Part 3 includes agents but no dimensions are getting audience-split. *"You have agent stakeholders in Part 3 — are none of these dimensions actually different for agents? That'd be unusual."*

## This sub-step is DONE when

- [ ] Every dimension in the post-unpack inventory has been examined for the audience question.
- [ ] Every dimension that was audience-split has been replaced with audience-specific versions in the inventory.
- [ ] Every trap dimension that was *not* audience-split has been actively confirmed as audience-neutral, with reasoning recorded.
- [ ] If there are no agent stakeholders, that has been actively confirmed (not silently skipped).
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 5.4 (Rate dimensions).

## Output

Update the inventory section in `quality/strategy.md`. Replace the post-unpack inventory from 5.2 with the post-old/new-world inventory — this is the **final** inventory that 5.4 will rate:

```markdown
### Final inventory (first release)

| Dimension | One-line reason it matters | Source | Unpacked from | Audience |
|---|---|---|---|---|
| <name (atomic / sub-dimension / audience-split)> | <why this matters> | <stakeholder bar / design observation / reference-list backstop> | <"atomic", or parent composite> | <"any" / "humans" / "agents" / "both — split"> |

The "Audience" column shows the old/new-world decision: dimensions where humans and agents care about the same thing show *"any"*; trap dimensions confirmed as audience-neutral show *"any — confirmed"*; audience-split dimensions appear as separate rows with *"humans"* and *"agents"* respectively.

**Old/new-world decisions recorded:**

- **<dimension>** — split into "X for humans" and "X for agents" because <reason>.
- **<dimension>** — kept audience-neutral, because <reason>.

**Stakeholder mix:** <"includes agent stakeholders" / "human-only — confirmed">

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines (naming the audience splits made and any trap dimensions kept neutral with reasoning), and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 5.4 (Rate dimensions)?"*
