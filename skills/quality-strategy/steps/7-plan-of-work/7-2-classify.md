# Sub-step 7.2 — Classify actions

## Goal

Classify each action from sub-step 7.1 as one of four types: **testing work**, **stakeholder work**, **fixing work**, or **process-change work**. This classification matters because the four types address different uncertainties (or, for process-change, a different target entirely), and you cannot do them efficiently in the wrong order.

## The four types

- **Testing work** removes uncertainty about *what is*. It investigates current quality on a dimension and upgrades confidence in the "actual" column of the risk map. (Test sessions, exploratory testing, audits, measurement.)
- **Stakeholder work** removes uncertainty about *what should be*. It involves talking to stakeholders, observing users, reviewing market expectations — anything that upgrades confidence in the "required" column. (Interviews, user research, design partner conversations, regulatory consultation.)
- **Fixing work** improves *what is* until it matches *what should be*. It closes the gap between actual and required quality **on a product dimension**. (Code changes, infrastructure work, documentation.)
- **Process-change work** changes the team, organisation, or workflow **itself — not the product**. It's the lever Part 1 already names as possible: the strategy's own working basis (team shape, roles, how work flows) may turn out to be the more efficient path to the goals than any product fix. (Restructuring review load, changing how agents get context, splitting a role, changing release cadence, adding or removing a process gate.) An action here doesn't close a gap on any single risk-map row — that's the tell that separates it from fixing work.

You cannot do fixing work efficiently until you have reasonable confidence on both sides. If you don't know where you are, you might fix the wrong thing. If you don't know where you need to be, you might fix to the wrong bar. Testing and stakeholder work come first; fixing follows. Process-change work can surface at any point — it isn't gated on risk-map confidence the way fixing is, since it targets the mechanism producing the product rather than the product itself.

## What you need from the previous sub-step

Read sub-step 7.1's action list from `quality/strategy.md`. Read Part 6 (Risk Map) for context on which side of which gap each action addresses.

## What to cover

By the end of this sub-step the strategy doc must capture, for each of this release's actions from sub-step 7.1:

1. **Its classification** — testing, stakeholder, fixing, or process-change.
2. **Brief justification** if not obvious — one line saying why this is the type it is.
3. **Any actions that don't fit cleanly** — flagged as such and discussed. An action that's "really both testing and fixing" usually means it should be split.
4. **Process-change candidates from earlier in the session.** Part 1 names itself a revisable working basis — any point across Steps 1–6 where changing the team, org, or workflow looked like it would reach the goals more efficiently than a product fix lands here as a process-change action, never as a silent edit back into Part 1.

## How to ask

For each action from 7.1, propose a classification:

- Does it answer "what is" (the actual side of the gap)? → testing work.
- Does it answer "what should be" (the required side)? → stakeholder work.
- Does it move what-is toward what-should-be, on a specific product dimension? → fixing work.
- Does it change the team, org, or workflow itself, with no single risk-map row it closes? → process-change work.

Surface the classification list and ask the user to confirm or correct. Also ask directly: *"Anywhere in this session did it seem like changing how the team works — not the product — would get you to the goal faster? That's a process-change action, not a silent rewrite of Part 1."*

You have explicit permission and encouragement to:

- Split actions that span types ("write tests and fix the bugs they find" → split into testing work and fixing work).
- Reclassify if the user pushes back with reasoning.
- Note actions that are mostly one type but have a side effect of another — pick the dominant type.

What you must not do:

- Classify a fixing action as testing work because it sounds more disciplined. The label matters because it determines sequencing in 7.3.
- Skip the justification on non-obvious actions. The classification is most useful when the reasoning is visible.
- Allow an action to be unclassified. If it doesn't fit *any* of the four, that's a finding that the action needs splitting or rewording — but "has no risk-map row to close" is not itself a sign of a bad fit; that absence is exactly what process-change looks like (see above), not a reason to reword the action until one appears.
- Force a process-change action into fixing work because it "closes a gap" loosely construed — fixing work closes a gap on a named product dimension; process-change doesn't have one to point at, and that's the discriminator, not a defect in the action.
- Quietly revise Part 1's context to reflect a realised process change instead of recording it here as an action. Part 1 stays what was true when it was written; the change belongs in Part 7.

## Push back when

- An action is labelled fixing when it would actually upgrade confidence about what-is. *"Is this closing the gap or finding out where the gap is?"*
- An action is labelled testing when it's actually a stakeholder conversation. *"Are you investigating the product, or asking what people want?"*
- The classification list is dominated by fixing work in an early-stage project. *"Most of an early-stage plan should be testing and stakeholder work — we're still figuring out what is and what should be."*
- An action changes the team/org/workflow but got filed as fixing work. *"Which product dimension does this close the gap on? If none — this is process-change, not fixing."*
- Part 1 was edited mid-session to reflect a process realisation instead of it landing here. *"That's a process-change action for Part 7, not a rewrite of Part 1 — Part 1 records what was true when we wrote it."*

## This sub-step is DONE when

- [ ] Every action from 7.1 has a classification (testing / stakeholder / fixing / process-change).
- [ ] Non-obvious classifications have a one-line justification.
- [ ] Actions that span types have been split or noted explicitly.
- [ ] Any process-change candidates surfaced earlier in the session (per Part 1's revisable-basis note) are captured here as actions, not silently folded back into Part 1.
- [ ] The balance of types fits the project stage (early-stage projects skew toward testing and stakeholder work; mature ones can have more fixing; process-change appears whenever it appears — it has no expected baseline rate).
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
| 1 | <short title> | testing / stakeholder / fixing / process-change | <one-line reason if not obvious> |
| 2 | <…> | <…> | <…> |

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines (highlighting the rough balance of the four types) and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 7.3 (Sequence the work)?"*
