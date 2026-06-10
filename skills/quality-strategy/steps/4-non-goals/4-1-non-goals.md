# Sub-step 4.1 — Non-goals

## Goal

Capture, for the first release, what the project is **explicitly not doing** and why. Non-goals are decisions, not oversights — naming what you're deliberately not optimising is half of the strategy. A strategy without non-goals is unbounded and unactionable.

## What you need from the previous sub-step

Read Parts 1, 2, and 3 from `quality/strategy.md`. The release roadmap (2.1) and stakeholder analysis (3.1, 3.2) are particularly important — non-goals often correspond directly to stakeholders not being served, releases not being targeted, or dimensions a stakeholder explicitly doesn't care about.

Read the **Discrepancies** and **Design observations** sections of `quality/pre-read.md`. The pre-read may surface things the project clearly is *not* doing despite docs hinting it could (e.g. a `docs/` mention of "enterprise SSO" with no code for it).

## What to cover

By the end of this sub-step the strategy doc must capture, **for the first release**:

1. **A list of non-goals** — minimum 3. Concrete, specific statements of what is not being done.
2. **For each non-goal: a one-line reason.** Why this is not a goal — the intentional tradeoff, not laziness or "no time."
3. **For each non-goal: optionally, a trigger.** What would cause us to revisit this decision? Prompt for it; accept "not sure" or "no specific trigger" without pushing.

## How to ask

The user will probably under-deliver on this if asked openly. Walk the standard non-goal categories explicitly to help them surface non-goals they wouldn't think of unprompted:

- **Stakeholder groups not being served in this release** — from Part 3, are there stakeholder groups the project chose not to serve this time?
- **Quality dimensions irrelevant given the release purpose** — given what this release is for (Part 2), what doesn't matter? Scalability for a closed alpha; accessibility for a backend-only milestone; etc.
- **Quality bars deliberately lower than people might expect** — "zero crashes" might not be a goal for the alpha; "no manual interventions during release" might not be a goal yet.
- **Capabilities deferred to later releases** — features and concerns the roadmap implies are coming later.
- **Things people will ask about and want a ready answer for** — common questions ("does this support Windows?" "is there an enterprise tier?") that you want a stock non-goal answer for.

Walk the categories in order. For each, ask: *"Anything in this category that we're explicitly not doing for the first release?"* — and capture what comes back.

Then, for each non-goal captured, ask:

- **Reason** (required): *"Why is this not a goal? Intentional tradeoff, not laziness."*
- **Trigger** (optional, prompt but don't push): *"What would change this decision — what would make us revisit? It's fine to say 'not sure.'"*

You have explicit permission and encouragement to:

- Suggest non-goals from the pre-read or stakeholder analysis if the user is missing obvious ones. *"From what we covered earlier, it sounds like Windows support might be a non-goal — is that right?"*
- Push back when the user claims a category has no non-goals despite obvious candidates.
- Drop a category if the user genuinely confirms there's nothing there after consideration.

What you must not do:

- Accept an empty non-goals list. The strategy is incomplete.
- Accept "we'll figure it out" as a reason. *"Not knowing the reason is fine — but say so explicitly: 'reason TBD.' That itself becomes an open question."*
- Push hard for triggers. They're nice-to-have, not required.

## Push back when

- The list is shorter than 3 after walking all categories. *"We've covered five categories; only two non-goals came out. Was that genuine, or were we still being too generous?"*
- A reason is "no time" or "no resources." *"That's a constraint, not a reason. What would the choice be even with more time?"*
- "Everything is a priority" — direct or indirect. *"What would you cut if the timeline halved?"*
- Non-goals are written so generally they don't actually exclude anything. *"In concrete terms — what specific thing are we not doing?"*

## This sub-step is DONE when

- [ ] At least 3 non-goals are captured.
- [ ] Every non-goal has a one-line reason that names an intentional tradeoff, not a constraint.
- [ ] Every non-goal has a trigger captured OR an explicit "not sure" / "no specific trigger" recorded.
- [ ] The five standard categories have all been walked through (or actively skipped with a noted reason).
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The step-boundary `/contradiction-check` was dispatched on the doc so far (it is the first move of the checkpoint, per SKILL.md) and its scratch file exists at `quality/.scratch/4.1-contradiction-check.md`.
- [ ] The user has run the **step-boundary substantive checkpoint** (see SKILL.md), evaluating the whole step's output (not just this final sub-step), including any rethinks of earlier steps. Explicit, considered confirmation — not silence, not a non-committal response.

If any check fails, return to the questioning. Do not move to Step 5.

## Output

Append to `quality/strategy.md`:

```markdown
## Part 4: Non-goals (first release)

| # | Not doing | Reason | Trigger to revisit |
|---|---|---|---|
| 1 | <concrete non-goal> | <one-line reason — intentional tradeoff> | <trigger, or "not sure"> |
| 2 | <…> | <…> | <…> |
| 3 | <…> | <…> | <…> |

(continue if more)

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines then **run the step-boundary substantive checkpoint** (see SKILL.md): summarise the **whole step's output**, invite vague unease about this step, and invite cross-step rethinks of earlier sections in light of this step. Wait for explicit, considered confirmation. Then ask: *"Ready to move on to Step 5 (Quality Dimensions)?"*
