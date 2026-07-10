# Sub-step 7.1 — Derive actions

## Goal

Translate the risk map into a list of actions. This is the first of three sub-steps in Step 7 (Plan of Work); it just lists what needs doing, without yet classifying or sequencing.

The plan of work falls naturally out of the risk map. It is not a separate creative exercise; it follows directly from everything built so far.

## What you need from the previous sub-step

Read all of Part 6 (Risk Map) from `quality/strategy.md`, especially the "Hottest items" and "Patterns and dependencies" sections.

## What to cover

By the end of this sub-step the strategy doc must capture, for this release:

1. **A numbered list of actions** — one per row of the risk map that has a non-zero gap, plus actions to resolve high-impact unknowns (low-confidence rows).
2. **For each action:** what it is, what gap or unknown it addresses, and which dimension(s) it touches.
3. **Actions for resolving unknowns first** — for every **Unknown actual** and every **Low-confidence required or actual** on a high-impact dimension, an action that resolves the gap (testing or asking work for Unknowns; for Lows, testing work if the assessment is shaky, fixing work if the gap itself is the problem).
4. **"Aware, not investing this release" notes** — for any H/M-impact dimension the team knows about but is deliberately *not* investing in this release, an entry that records the decision: no action, and why. This is the job the old `L` rating used to do (5.4 no longer rates L): deferring is a plan-of-work decision, made here with the impact in full view. Record it the same way as a non-goal-confirming note (see "How to ask"). Don't confuse it with a **None** (no stakeholder bar mentions the dimension) or a **non-goal** (deliberately excluded): this is a dimension that matters, consciously put off.
5. **Don't classify yet** — that's sub-step 7.2. Just list.

## How to ask

Most of this sub-step is mechanical, but the user should review the list before it gets locked in.

Walk through the risk map systematically:

- For each row with a non-zero gap, propose an action that would close it (or part of it).
- For each **Unknown actual** on a high-impact dimension, propose a testing or stakeholder-asking action. For each **Low-confidence row** on a high-impact dimension, propose either a testing/asking action (if the issue is the assessment) or a fixing action (if the issue is the known gap).
- Group actions that resolve multiple risk-map entries efficiently — *"a single conversation with the founder might answer five questions; a single test session might assess three dimensions."*

Surface back to the user as a draft list. Ask: *"Did I miss anything? Anything here that doesn't actually need doing?"*

You have explicit permission and encouragement to:

- Combine actions where one piece of work resolves multiple risk-map entries.
- Drop actions where the user confirms the gap is acceptable as-is (these become non-goal-confirming notes in the strategy).
- Surface actions the user mentioned in earlier sub-steps that didn't make it into the risk map — late additions are fine. This includes **process-change candidates**: Part 1 names itself a revisable working basis, so if anywhere in the session it looked like changing the team, org, or workflow would reach the goals more efficiently than a product fix, that becomes an action here — never a silent edit back into Part 1.

What you must not do:

- Classify actions as testing / stakeholder / fixing / process-change yet. That's 7.2.
- Sequence actions yet. That's 7.3.
- Elaborate an action into a mini-plan. One or two lines per action — the plan of work is a strategy-level sketch, and the follow-on lanes own the depth (`/test-strategy` for testing work, `/evaluation-strategy` for evaluation work (oracles and proxies) — builds via `/tooling-strategy` — and `/process-strategy` for rules and process work; see SKILL.md → "The plan of work is a sketch").
- Skip Unknown actuals or Low-confidence rows on high-impact dimensions. They generate the most valuable actions in early-stage projects — testing/asking work for Unknowns, fixing or testing work for Lows depending on the gap.
- Propose an action for every dimension regardless of gap. None-rated and small-gap dimensions don't need actions.

## Push back when

- The user wants to drop an action on a high-impact, low-confidence dimension without justification. *"This is an unknown on a dimension we said matters. What would change your mind about needing to find out?"*
- The action list is short and the risk map has many gaps. *"There are X gaps in the map; we've only listed Y actions. What about Z?"*
- An action is described too vaguely to act on. *"What specifically would the work involve? Who, how long, what does done look like?"*

## This sub-step is DONE when

- [ ] Every non-zero-gap row in the risk map either has an action OR has been actively confirmed as acceptable as-is.
- [ ] Any H/M-impact dimension the team is aware of but deliberately not investing in this release is recorded as an "aware, not investing this release" note (no-action-with-reason) — not silently dropped, and not confused with a None or a non-goal.
- [ ] Every **Unknown actual** and every **Low-confidence row** on a high-impact dimension has at least one action — and the action type matches (testing/asking for Unknowns; testing or fixing for Lows depending on whether the assessment or the gap is the problem).
- [ ] Each action is specific enough to act on (who could do it, what done looks like).
- [ ] Each action notes which gap or unknown it addresses.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 7.2.

## Output

Append to `quality/strategy.md`:

```markdown
## Part 7: Plan of Work

### Action list (unsorted)

For this release:

1. **<Short title.>** <One- or two-line description.> Addresses: <gap or unknown from risk map>. Touches: <dimension(s)>.
2. **<…>**

…

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 7.2 (Classify actions)?"*
