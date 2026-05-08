# Sub-step 3.2 — Three-lens analysis (Delight / Good Enough / Dealbreaker)

## Goal

For each stakeholder identified in sub-step 3.1, capture what quality means to them in three lenses: what would delight them, what's good enough for them in this release, and what would be a dealbreaker. This converts the abstract "they matter" into specific, actionable bars that the rest of the strategy can be tested against.

## What you need from the previous sub-step

Read sub-step 3.1's stakeholder list for the first release from `quality/strategy.md`. Read the **Discrepancies** and **Design observations** sections of `quality/pre-read.md` — they may contain hypotheses about what specific stakeholders care about.

## What to cover

By the end of this sub-step the strategy doc must capture, **for each stakeholder of the first release**, all three of:

1. **Delight** — what would exceed expectations? What would make this stakeholder feel "this is exactly what I needed"? The upper bound the project might reach for.
2. **Good Enough** — what's the minimum for this release to succeed with this stakeholder? Not aspirational, not minimal — the threshold where they're satisfied enough that you've earned the right to keep going.
3. **Dealbreaker** — what would cause active rejection? If this happened, the stakeholder would walk away regardless of everything else. Often more practical and mundane than expected — not "data breach" but "couldn't install it."

The three lenses are required for every stakeholder. If the user genuinely cannot articulate one after pushing, mark as `OPEN QUESTION:` and continue.

## How to ask

For each stakeholder, ask **all three lenses together in one prompt**, not one at a time. Phrasing is yours; example shape:

> *"For [stakeholder], let's do the three lenses in one go: what would delight them, what's good enough for them in [first release], and what would be a dealbreaker? One or two lines each — concrete, not abstract."*

The user can batch-answer in one message; parse and capture all three.

You have explicit permission and encouragement to:

- **Prompt for more colour.** If an answer is one-word ("speed"), push: *"What does delight-level speed look like concretely? Two seconds? One? What's the experience when it's that fast?"*
- **Dig into anything that surprises you** — a dealbreaker that's much smaller than expected, a delight that's vaguer than expected, a good-enough that's notably lower than the user's actual emotional response suggests.
- **Reframe** if your first prompt didn't land. For internal stakeholders especially, "delight" may need translating ("what would feel like a win for the dev team this release?").
- **Use the pre-read.** If subagent C surfaced design observations that imply specific bars for a stakeholder ("error messages are inconsistent → diagnosability dealbreakers likely live here"), ground the question in that.

What you must not do:

- Move on without all three lenses for any stakeholder (or `OPEN QUESTION` recorded).
- Accept abstract answers ("good usability"). Push for concreteness — what would the stakeholder actually see, hear, do?
- Forget to do this for **internal** stakeholders. The team is also a stakeholder; their three lenses matter.
- Let the lenses blur into each other. Good Enough is a threshold; Delight is the upper bound; Dealbreaker is exit. They're distinct.

## Push back when

- An answer is abstract. *"In concrete terms, what does that look like for them?"*
- Delight and Good Enough are described identically. *"If those are the same, where's the upside? What would actually surprise them?"*
- A dealbreaker is grand-sounding ("a security breach"). *"What's the more practical version — what's the cheaper, more likely thing that would still drive them away?"*
- The user struggles with one lens for a stakeholder. Try reframing. If they still can't answer after one or two attempts, mark as `OPEN QUESTION` and move on.
- Internal stakeholders are skipped. *"What about the team? What would delight you about this release? What's good enough? What would be a dealbreaker for the team itself?"*

## This sub-step is DONE when

- [ ] Each first-release stakeholder has Delight, Good Enough, and Dealbreaker captured (or `OPEN QUESTION` recorded if pushed and still unable).
- [ ] Internal stakeholders are not skipped.
- [ ] Each lens is concrete enough to be checkable later — not abstract.
- [ ] Any deferred items are recorded as `OPEN QUESTION:` lines.
- [ ] Pre-read sources are cited in the section's evidence field, naming actual files referenced (not blank, not placeholder).
- [ ] The user has run the **step-boundary substantive checkpoint** (see SKILL.md), evaluating the whole step's output (not just this final sub-step), including any rethinks of earlier steps. Explicit, considered confirmation — not silence, not a non-committal response.

If any check fails, return to the questioning. Do not move to Step 4.

## Output

Append to `quality/strategy.md` under Part 3 (Who Matters), after the stakeholder list from sub-step 3.1:

```markdown
### Three-lens analysis (first release)

#### <Stakeholder name>

- **Delight:** <one or two concrete lines>
- **Good Enough:** <one or two concrete lines>
- **Dealbreaker:** <one or two concrete lines>

#### <Next stakeholder>

- **Delight:** <…>
- **Good Enough:** <…>
- **Dealbreaker:** <…>

… (repeat per stakeholder for the first release)

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 5–7 lines (highlighting the most striking dealbreakers and any cross-stakeholder tensions you noticed) then **run the step-boundary substantive checkpoint** (see SKILL.md): summarise the **whole step's output**, invite vague unease about this step, and invite cross-step rethinks of earlier sections in light of this step. Wait for explicit, considered confirmation. Then ask: *"Ready to move on to Step 4 (Non-goals)?"*
