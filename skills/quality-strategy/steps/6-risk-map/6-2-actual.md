# Sub-step 6.2 — Actual levels

## Goal

For each H/M dimension, capture where the project is *now* — qualitatively, in dimension-specific terms — and how confident that assessment is. Where the actual level isn't known, mark it explicitly as **Unknown**.

Unknowns are not a failure. For first-pass strategies on real projects, **most actuals start as Unknown**, and resolving them is what most of Step 7's plan of work will be about. The activities that resolve Unknowns — asking specific questions, targeted reviewing, targeted testing, building new test capabilities or testability — are the highest-priority work in early-stage strategies.

## What you need from the previous sub-step

Read sub-step 6.1's required levels from `quality/strategy.md`. Read the **Code structure** and **Design observations** sections of `quality/pre-read.md` — subagent C may have surfaced design hypotheses about specific dimensions ("error handling looks inconsistent → reliability is likely Low or Unknown").

## What to cover

By the end of this sub-step the strategy doc must capture, **for each H/M dimension**:

1. **Actual level** — one of:
   - A qualitative, dimension-specific description of where the project is now (when there's evidence to support it), OR
   - **Unknown** — explicitly noted, when the dimension hasn't been investigated enough to support a description.
2. **Confidence in the actual level** — H/M/L (or "—" for Unknown).
   - High = thoroughly checked, evidenced.
   - Medium = informed inspection, not verified.
   - Low = guessing or working from stale information.
   - For Unknown, confidence is implicitly "we don't know" — represent as "—" rather than claiming a confidence level.
3. **Evidence basis** — what is the actual based on? Pre-read observations? A specific test? Stakeholder feedback? Or nothing — "no investigation yet" is a valid (and very common) answer in first-pass strategies.
4. **What would resolve an Unknown** — for each Unknown, a one-line note on the type of activity that would establish a level. Pick from: targeted testing, asking specific stakeholders, code/design review of specific area, building observability/instrumentation, building test infrastructure or testability. Whichever is appropriate. This note seeds Step 7's plan of work.

## How to ask

For each H/M dimension, ask in turn:

- *"For [dimension], where is the project actually now? Describe it in dimension-specific terms — OR mark it Unknown if we haven't actually checked."*
- *"What's that based on? Evidence from a specific test or review? Estimate? Or genuinely don't know?"*
- *"If Unknown — what would tell us? Test what specifically, ask whom, review what?"*

Use the pre-read's design observations as starting hypothesis. *"Subagent C observed [observation], which suggests [dimension] is around [level]. Is that close, or do we have better information — or is it actually Unknown?"*

You have explicit permission and encouragement to:

- **Default to Unknown when there isn't evidence.** Strategies that pretend confidence about untested actuals are worse than strategies that admit uncertainty. Unknown is honest; Medium-without-evidence is a lie that hides work.
- **Note Unknowns as a feature, not a bug.** First-pass strategies often have a majority of Unknowns. That's normal. The strategy then drives investigation, and the next pass has fewer.
- **Push back gently** when the user claims an actual without evidence. *"How do we know that? What did we check?"*
- **Use design observations carefully** — subagent C's hypotheses are starting positions, not evidence. A design observation suggesting "diagnosability is likely weak" is a starting hypothesis the user can confirm, refine, or override; it's not a thoroughly-checked actual.

What you must not do:

- Conflate Unknown with Low. They are different findings and produce different Step 7 actions (testing/review work vs fixing work).
- Claim High confidence in an actual without specific evidence. *"What's the High confidence based on?"*
- Skip the "what would resolve this" note for Unknowns. That note is the seed of Step 7's testing and stakeholder work.
- Use percentages.

## Push back when

- An actual is stated with no evidence basis. *"What's that based on?"*
- High confidence is claimed without investigation. *"That's High based on what specifically?"*
- Unknown is dismissed too quickly ("we kind of know, it's probably Medium"). *"If we haven't actually checked, the honest answer is Unknown. Pretending otherwise hides the work to do."*
- The "what would resolve this" note is missing for any Unknown. *"How would we find out — test, ask, review, instrument?"*

## This sub-step is DONE when

- [ ] Every H/M dimension has either a qualitative actual level or an explicit "Unknown."
- [ ] Every actual has a confidence rating (H/M/L, or "—" for Unknown) and an evidence basis (or "no investigation yet").
- [ ] Every Unknown has a one-line note on what would resolve it (test / ask / review / instrument / build infrastructure).
- [ ] Confidence ratings use only H/M/L — no percentages.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field, naming actual files referenced (not blank, not placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 6.3.

## Output

Append to `quality/strategy.md` under Part 6:

```markdown
### Actual levels (first release)

#### <Dimension name>

- **Actual:** <qualitative dimension-specific description, OR "Unknown">
- **Confidence in actual:** <H/M/L, or "—" for Unknown>
- **Evidence:** <what this is based on, or "no investigation yet">
- **To resolve (if Unknown):** <one line — test what / ask whom / review what / instrument / build test infrastructure>

#### <Next dimension>

- **Actual:** <…>
- **Confidence in actual:** <…>
- **Evidence:** <…>
- **To resolve (if Unknown):** <…>

… (repeat per H/M dimension)

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

**A first-pass strategy will often have a majority of Unknowns.** That is normal and correct — they are the highest-priority items for Step 7's plan of work, and resolving them is what the next iteration of the strategy will be built on.

Once written, summarise back in 3–5 lines (highlighting the count of Unknowns and the most striking known gaps) and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 6.3 (Gap and confidence)?"*
