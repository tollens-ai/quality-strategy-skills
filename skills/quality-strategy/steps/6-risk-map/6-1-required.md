# Sub-step 6.1 — Required levels

## Goal

For each H/M dimension from Step 5, describe what level it needs to reach for the first release to succeed — and say how confident we are that this is the right target. The required level is the *should-be* side of the gap; sub-step 6.2 captures the *what-is* side.

## What you need from the previous sub-step

Read Part 5 (Quality Dimensions) from `quality/strategy.md` for the H/M-rated dimensions. Read Part 3 (Stakeholders) for the three-lens analysis — Good Enough and Dealbreaker lenses are direct inputs to required levels. Read Part 4 (Non-goals) to confirm scope (Low and None dimensions are not in the risk map).

## What to cover

By the end of this sub-step the strategy doc must capture, **for each H/M dimension**:

1. **Required level** — a description, in words specific to this dimension, of what level it needs to reach for the first release to succeed. Concrete terms, not a generic shared scale.
2. **Confidence in the required level** — H/M/L. How sure are we that this is the right target? Often Low, especially in early-stage projects where no stakeholder has actually confirmed the bar.
3. **Grounded in** — which stakeholder dealbreakers and good-enoughs (from Part 3) and which release purpose (from Part 2) anchor this required level. Required levels with no grounding are floating.

## How to ask

For each H/M dimension, ask in turn:

- *"For [dimension], what does the release need to look like to succeed? Describe it in concrete terms — what would a stakeholder see, do, or experience?"*
- *"How confident are we that's the right target? High, Medium, or Low?"*
- *"What's it grounded in — which stakeholder bar, which release purpose?"*

Use the three-lens material from Part 3 as your starting position. Often the required level comes down to: avoid every relevant stakeholder's dealbreakers, and meet their good-enoughs. Say that out loud to the user: *"From Part 3, [stakeholder]'s Good Enough was X and their Dealbreaker was Y. Required level for [dimension] looks like: [synthesis]. Does that capture the bar, or is it missing something?"*

**The bar cuts both ways (anti-overshoot).** A required level is a ceiling as well as a floor: when the actual later meets the bar, "goal is met" is a **positive verdict** — even where the solution wouldn't survive the next order of magnitude — and the right response is to record a future-release change note (what would reopen this, and when), not to gold-plate now. Don't let a required level quietly absorb robustness no stakeholder bar asked for; if the team knows the solution is rough-but-sufficient, that is a tradeoff to write down (the rating step records these where stakeholder bars recombine), not a reason to raise the bar.

You have explicit permission and encouragement to:

- Ground every required level in a stakeholder dealbreaker, good-enough, or release purpose. Required levels with no grounding are vibes.
- Hold the bar **down** as firmly as up: when a proposed required level exceeds every stakeholder bar that grounds it, say so — the excess is gold-plating, and the future-release change note is the cheaper home for it.
- Note when confidence in the required level is Low. Often it is — the project hasn't yet seen if the proposed bar is actually what stakeholders need.
- Surface tensions: a required level that delights one stakeholder but breaks another's dealbreaker. Flag and ask the user to resolve.
- Keep required levels concrete. Numbers, observable behaviours, specific outcomes — not abstractions.

What you must not do:

- Rate the level itself on a generic scale (H/M/L). Required levels are descriptions in the dimension's own terms, not category labels.
- State a required level with no grounding. Anchor it to Part 3 or Part 2.
- Use percentages anywhere. Confidence is High / Medium / Low only.
- Skip dimensions because they're "obvious." Even obvious required levels benefit from being written down.

## Push back when

- A required level is described with no concrete content. *"In concrete terms, what does that look like? What would the stakeholder see or do?"*
- A required level is anchored to nothing in Parts 2 or 3. *"Which stakeholder needs this, and what specifically did they say?"*
- Confidence is High but no stakeholder has actually been asked. *"That's High confidence based on what evidence? If no one has been asked, isn't this Medium or Low?"*
- Two stakeholders' bars contradict and the user picks one without acknowledging the tension. *"That works for X, but Y said Z — how do you reconcile?"*
- The user pushes a required level above every grounding bar "to be safe." *"Which stakeholder bar asks for that extra? If none does, meeting the stated bar is success — let's record what would reopen it as a change note instead of raising the bar."*

## This sub-step is DONE when

- [ ] Every H/M dimension from Part 5 has a row in Part 6 with a required level described in the dimension's own concrete terms — checked against the H/M dimension list from sub-step 5.4: every dimension has a row, and every row has a dimension.
- [ ] Every required level has confidence (H/M/L) and grounding (stakeholder bar(s) and release purpose).
- [ ] Confidence ratings use only H/M/L — no percentages.
- [ ] Tensions between stakeholder bars are surfaced where they exist.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 6.2.

## Output

Append to `quality/strategy.md`:

```markdown
## Part 6: Risk Map (first release)

### Confidence vocabulary

- **High confidence**: thoroughly checked, evidenced by testing or data.
- **Medium confidence**: informed estimate from inspection or reasoning, not verified.
- **Low confidence**: guessing, or working from stale information.

### Required levels (first release)

#### <Dimension name>

- **Required:** <qualitative, dimension-specific description of the bar>
- **Confidence in required:** <H/M/L>
- **Grounded in:** <stakeholder bar(s) and release purpose>

#### <Next dimension>

- **Required:** <…>
- **Confidence in required:** <…>
- **Grounded in:** <…>

… (repeat per H/M dimension)

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 6.2 (Actual levels)?"*
