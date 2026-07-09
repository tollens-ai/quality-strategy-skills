# Sub-step 7.2 — Classify actions

## Goal

Classify each action from sub-step 7.1 as one of three types: **testing work**, **stakeholder work**, or **fixing work**. This classification matters because the three types address different uncertainties, and you cannot do them efficiently in the wrong order.

## The three types

- **Testing work** removes uncertainty about *what is*. It investigates current quality on a dimension and upgrades confidence in the "actual" column of the risk map. (Test sessions, exploratory testing, audits, measurement.)
- **Stakeholder work** removes uncertainty about *what should be*. It involves talking to stakeholders, observing users, reviewing market expectations — anything that upgrades confidence in the "required" column. (Interviews, user research, design partner conversations, regulatory consultation.)
- **Fixing work** improves *what is* until it matches *what should be*. It closes the gap between actual and required quality on a dimension. (Code changes, infrastructure work, documentation, process changes.)

You cannot do fixing work efficiently until you have reasonable confidence on both sides. If you don't know where you are, you might fix the wrong thing. If you don't know where you need to be, you might fix to the wrong bar. Testing and stakeholder work come first; fixing follows.

## What you need from the previous sub-step

Read sub-step 7.1's action list from `quality/strategy.md`. Read Part 6 (Risk Map) for context on which side of which gap each action addresses.

## What to cover

By the end of this sub-step the strategy doc must capture, for each of this release's actions from sub-step 7.1:

1. **Its classification** — testing, stakeholder, or fixing.
2. **Brief justification** if not obvious — one line saying why this is the type it is.
3. **Any actions that don't fit cleanly** — flagged as such and discussed. An action that's "really both testing and fixing" usually means it should be split.

## How to ask

For each action from 7.1, propose a classification:

- Does it answer "what is" (the actual side of the gap)? → testing work.
- Does it answer "what should be" (the required side)? → stakeholder work.
- Does it move what-is toward what-should-be? → fixing work.

Surface the classification list and ask the user to confirm or correct.

You have explicit permission and encouragement to:

- Split actions that span types ("write tests and fix the bugs they find" → split into testing work and fixing work).
- Reclassify if the user pushes back with reasoning.
- Note actions that are mostly one type but have a side effect of another — pick the dominant type.

What you must not do:

- Classify a fixing action as testing work because it sounds more disciplined. The label matters because it determines sequencing in 7.3.
- Skip the justification on non-obvious actions. The classification is most useful when the reasoning is visible.
- Allow an action to be unclassified. If it doesn't fit, that's a finding that the action needs splitting or rewording.

## Push back when

- An action is labelled fixing when it would actually upgrade confidence about what-is. *"Is this closing the gap or finding out where the gap is?"*
- An action is labelled testing when it's actually a stakeholder conversation. *"Are you investigating the product, or asking what people want?"*
- The classification list is dominated by fixing work in an early-stage project. *"Most of an early-stage plan should be testing and stakeholder work — we're still figuring out what is and what should be."*

## This sub-step is DONE when

- [ ] Every action from 7.1 has a classification.
- [ ] Non-obvious classifications have a one-line justification.
- [ ] Actions that span types have been split or noted explicitly.
- [ ] The balance of types fits the project stage (early-stage projects skew toward testing and stakeholder work; mature ones can have more fixing).
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 7.3.

## Output

Append to `quality/strategy.md`, replacing or extending the action list from 7.1:

```markdown
### Action list (classified)

For this release:

| # | Action | Type | Justification |
|---|---|---|---|
| 1 | <short title> | testing / stakeholder / fixing | <one-line reason if not obvious> |
| 2 | <…> | <…> | <…> |

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines (highlighting the rough balance of the three types) and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 7.3 (Sequence the work)?"*
