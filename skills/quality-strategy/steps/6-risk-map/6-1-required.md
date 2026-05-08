# Sub-step 6.1 — Required levels

## Goal

For each H/M dimension identified in Step 5, capture qualitatively what level the dimension needs to reach for the first release to succeed — and how confident we are that this is the right target. The required level is the *should-be* side of the gap; sub-step 6.2 captures the *what-is* side.

## What you need from the previous sub-step

Read Part 5 (Quality Dimensions) from `quality/strategy.md` for the H/M-rated dimensions. Read Part 3 (Stakeholders) for the three-lens analysis — Good Enough and Dealbreaker lenses are direct inputs to required levels. Read Part 4 (Non-goals) to confirm scope (Low and None dimensions are not in the risk map).

## What to cover

By the end of this sub-step the strategy doc must capture, **for each H/M dimension**:

1. **Required level** — a qualitative, dimension-specific description of what level this dimension needs to reach for the first release to succeed. In concrete terms specific to the dimension; not a coarse common scale.
2. **Confidence in the required level** — H/M/L. How sure are we that this is the right target? Often Low, especially in early-stage projects where no stakeholder has actually confirmed the bar.
3. **Grounded in** — which stakeholder dealbreakers and good-enoughs (from Part 3) and which release purpose (from Part 2) anchor this required level. Required levels with no grounding are floating.

## How to ask

For each H/M dimension, ask in turn:

- *"For [dimension], what does the release need to look like to succeed? Describe it in concrete terms — what would a stakeholder see, do, or experience?"*
- *"How confident are we that's the right target? High, Medium, or Low?"*
- *"What's it grounded in — which stakeholder bar, which release purpose?"*

Use the three-lens material from Part 3 as your starting position. Often the required level is "the union of dealbreaker-avoidance plus good-enough across the stakeholders that matter for this dimension." Surface that synthesis to the user: *"From Part 3, [stakeholder]'s Good Enough was X and their Dealbreaker was Y. Required level for [dimension] looks like: [synthesis]. Does that capture the bar, or is it missing something?"*

You have explicit permission and encouragement to:

- Ground every required level in a stakeholder dealbreaker, good-enough, or release purpose. Required levels with no grounding are vibes.
- Note when confidence in the required level is Low. Often it is — the project hasn't yet seen if the proposed bar is actually what stakeholders need.
- Surface tensions: a required level that delights one stakeholder but breaks another's dealbreaker. Flag and ask the user to resolve.
- Keep required levels concrete. Numbers, observable behaviours, specific outcomes — not abstractions.

What you must not do:

- Use a coarse common scale (H/M/L for the level itself). Required levels are dimension-specific qualitative descriptions, not category labels.
- State a required level with no grounding. Anchor it to Part 3 or Part 2.
- Use percentages anywhere. Confidence is High / Medium / Low only.
- Skip dimensions because they're "obvious." Even obvious required levels benefit from being written down.

## Push back when

- A required level is described with no concrete content. *"In concrete terms, what does that look like? What would the stakeholder see or do?"*
- A required level is anchored to nothing in Parts 2 or 3. *"Which stakeholder needs this, and what specifically did they say?"*
- Confidence is High but no stakeholder has actually been asked. *"That's High confidence based on what evidence? If no one has been asked, isn't this Medium or Low?"*
- Two stakeholders' bars contradict and the user picks one without acknowledging the tension. *"That works for X, but Y said Z — how do you reconcile?"*

## This sub-step is DONE when

- [ ] Every H/M dimension from Part 5 has a row in Part 6 with a required level captured qualitatively, in dimension-specific concrete terms — verified by cross-referencing the H/M dimension list from sub-step 5.4; no orphans either way.
- [ ] Every required level has confidence (H/M/L) and grounding (stakeholder bar(s) and release purpose).
- [ ] Confidence ratings use only H/M/L — no percentages.
- [ ] Tensions between stakeholder bars are surfaced where they exist.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field, naming actual files referenced (not blank, not placeholder).
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
