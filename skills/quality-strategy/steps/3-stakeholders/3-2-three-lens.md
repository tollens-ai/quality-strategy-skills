# Sub-step 3.2 — Three-lens analysis (Delight / Good Enough / Dealbreaker)

## Goal

For each stakeholder identified in sub-step 3.1, capture what quality means to them in three lenses: what would delight them, what's good enough for them in this release, and what would be a dealbreaker. This turns the vague "they matter" into specific bars you can test the rest of the strategy against.

## What you need from the previous sub-step

Read sub-step 3.1's stakeholder list for this release from `quality/strategy.md`. Read the **Discrepancies** and **Design observations** sections of `quality/pre-read.md` — they may contain hypotheses about what specific stakeholders care about.

## What to cover

By the end of this sub-step the strategy doc must capture, **for each stakeholder of this release**, all three of:

1. **Delight** — what would exceed expectations? What would make this stakeholder feel "this is exactly what I needed"? The upper bound the project might reach for.
2. **Good Enough** — what's the minimum for this release to succeed with this stakeholder? Not aspirational, not minimal — the threshold where they're satisfied enough that you've earned the right to keep going.
3. **Dealbreaker** — what would make them reject it outright? If this happened, the stakeholder would walk away no matter what else is good. Often more practical and mundane than expected — not "data breach" but "couldn't install it."

The three lenses are required for every stakeholder. If the user genuinely can't give one after you push, mark it as `OPEN QUESTION:` and continue.

### Bars carry a recurrence/tolerance dimension — ask for it, never invent it

A bar is rarely just *what* would delight or break a stakeholder — it's also *when, how often, and to what extent*. This matters most for Dealbreakers: "bugs would be a dealbreaker for Tom" can mean *one bug and he's gone* or *he shrugs off one-off bugs but walks away at sustained breakage* — and those are wildly different bars. When the user's phrasing leaves the reading open, **ask** — *"is that one occurrence and they're gone, or is it the pattern that kills it? How many, how often, before they walk?"* — and record the answer on the bar itself. Never resolve the ambiguity by picking a reading: inventing the strict version inflates every required level and impact rating downstream; inventing the lenient version quietly waves a real dealbreaker through. If the user genuinely doesn't know the tolerance, that's an `OPEN QUESTION:` on the bar, not a guess. (PHILOSOPHY: *push back when something is vague — ask for precision, never invent it.*)

## How to ask

For each stakeholder, ask **all three lenses together in one prompt**, not one at a time. Phrasing is yours; example shape:

> *"For [stakeholder], let's do the three lenses in one go: what would delight them, what's good enough for them in [this release], and what would be a dealbreaker? One or two lines each — concrete, not abstract."*

The user can batch-answer in one message; parse and capture all three.

You have explicit permission and encouragement to:

- **Prompt for more colour.** If an answer is one-word ("speed"), push: *"What does delight-level speed look like concretely? Two seconds? One? What's the experience when it's that fast?"*
- **Dig into anything that surprises you** — a dealbreaker that's much smaller than expected, a delight that's vaguer than expected, a Good Enough that's noticeably lower than the user's actual emotional reaction suggests.
- **Reframe** if your first prompt didn't land. For internal stakeholders especially, "delight" may need translating ("what would feel like a win for the dev team this release?").
- **Use the pre-read.** If subagent C surfaced design observations that imply specific bars for a stakeholder ("error messages are inconsistent → diagnosability dealbreakers likely live here"), ground the question in that. And when the pre-read implies a bar the user hasn't named at all, deliver it as a moment with its trace — *"you haven't mentioned restore anywhere, but given what you said about never losing a user's data, a backup that's never been rehearsed would matter a lot to you. Does that land?"* — and record the answer either way; a rejected revelation is data, not failure (see SKILL.md → "Deliver revelations as moments").

What you must not do:

- Move on without all three lenses for any stakeholder (or `OPEN QUESTION` recorded).
- Accept abstract answers ("good usability"). Push for concreteness — what would the stakeholder actually see, hear, do?
- Forget to do this for **internal** stakeholders. The team is also a stakeholder; their three lenses matter.
- Let the lenses blur into each other. Good Enough is a threshold; Delight is the upper bound; Dealbreaker is exit. They're distinct.

## Push back when

- An answer is abstract. *"In concrete terms, what does that look like for them?"*
- Delight and Good Enough are described identically. *"If those are the same, where's the upside? What would actually surprise them?"*
- A dealbreaker is grand-sounding ("a security breach"). *"What's the more practical version — what's the cheaper, more likely thing that would still drive them away?"*
- A bar is stated without its tolerance and you can't tell whether it means once or every time. *"Is that one occurrence and they're gone, or is it the pattern that kills it?"* Ask; don't pick a reading.
- The user struggles with one lens for a stakeholder. Try reframing. If they still can't answer after one or two attempts, mark as `OPEN QUESTION` and move on.
- Internal stakeholders are skipped. *"What about the team? What would delight you about this release? What's good enough? What would be a dealbreaker for the team itself?"*

## This sub-step is DONE when

- [ ] Each of this release's stakeholders has Delight, Good Enough, and Dealbreaker captured (or `OPEN QUESTION` recorded if pushed and still unable).
- [ ] Internal stakeholders are not skipped.
- [ ] Each lens is concrete enough to be checkable later — not abstract.
- [ ] Each bar (any lens — Dealbreakers above all) whose phrasing left it open carries its recurrence/tolerance (one-off vs sustained; how much before they walk), recorded inline on the lens line it belongs to — elicited by asking, never invented; a genuinely-unknown tolerance is recorded as `OPEN QUESTION:`, not guessed.
- [ ] Any deferred items are recorded as `OPEN QUESTION:` lines.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The step-boundary `/contradiction-check` was dispatched on the doc so far (it is the first move of the checkpoint, per SKILL.md) and its scratch file exists at `quality/.scratch/3.2-contradiction-check.md`.
- [ ] The user has run the **step-boundary substantive checkpoint** (see SKILL.md), evaluating the whole step's output (not just this final sub-step), including any rethinks of earlier steps. Explicit, considered confirmation — not silence, not a non-committal response.

If any check fails, return to the questioning. Do not move to Step 4.

## Output

Append to `quality/strategy.md` under Part 3 (Who Matters), after the stakeholder list from sub-step 3.1:

```markdown
### Three-lens analysis (<release>)

#### <Stakeholder name>

- **Delight:** <one or two concrete lines>
- **Good Enough:** <one or two concrete lines>
- **Dealbreaker:** <one or two concrete lines>

… (an elicited recurrence/tolerance — one-off vs sustained, how much before they walk — is recorded inline on whichever lens line it belongs to, most often the Dealbreaker's)

#### <Next stakeholder>

- **Delight:** <…>
- **Good Enough:** <…>
- **Dealbreaker:** <…>

… (repeat per stakeholder for this release)

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 5–7 lines (highlighting the most striking dealbreakers and any cross-stakeholder tensions you noticed) then **run the step-boundary substantive checkpoint** (see SKILL.md): summarise the **whole step's output**, invite vague unease about this step, and invite cross-step rethinks of earlier sections in light of this step. Wait for explicit, considered confirmation. Then ask: *"Ready to move on to Step 4 (Non-goals)?"*
