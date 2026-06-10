# Sub-step 6.3 — Gap and confidence (the risk map)

## Goal

Synthesise required levels (sub-step 6.1) and actual levels (sub-step 6.2) into the risk map proper: a heat-mapped view of where the project is exposed, with confidence ratings on both sides of every gap. This is the headline output of Step 6 and the direct input to Step 7 (Plan of Work).

## What you need from the previous sub-step

Read sub-steps 6.1 (required levels with confidence) and 6.2 (actual levels with confidence) from `quality/strategy.md`. You should now have, for each H/M dimension for the first release: required level, confidence in required, actual level, confidence in actual.

## What to cover

By the end of this sub-step the strategy doc must capture:

1. **The risk map table** — for each H/M dimension in the first release: required, confidence-in-required, actual, confidence-in-actual, gap, impact-of-gap.
2. **The hottest items** flagged explicitly — large gap + high impact + low confidence on either side.
3. **Patterns** — clusters of unknowns that could be resolved together; dependencies (you can't assess A until B is in place).
4. **What confidence looks like by colour** — High = thoroughly checked or evidenced; Medium = informed estimate but not verified; Low = guessing or working from stale data.

## How to ask

This sub-step is mostly synthesis, not interview. The agent does the work; the user reviews and corrects.

Walk through each row systematically:

- For each dimension, take the required and actual from 6.1 and 6.2.
- Compute the gap qualitatively: matched / small gap / large gap / **Unknown** (when the actual is Unknown — the gap can't be measured).
- Compute the impact: from the dimension's H/M rating and the rationale, how dangerous is this gap?
- Mark the heat: hottest = large gap + high impact + low confidence on either side. **Unknowns on high-impact dimensions are also hot** — you don't know where you are, and it matters a lot. They typically generate the highest-priority items in Step 7.
- Coldest = small gap + lower impact + high confidence on both sides.

**Unknowns are normal, especially in first-pass strategies.** Resolving them is what Step 7's plan of work will mostly do. Don't pretend confidence about levels that haven't actually been investigated.

Then surface back to the user:
- The full risk map.
- The 3–5 hottest items, with reasoning.
- Patterns: where unknowns cluster, where dependencies exist.

You have explicit permission and encouragement to:

- Re-examine any row where the answer felt forced. The risk map is the single most reread part of a quality strategy; getting it right matters.
- Push back if the user wants to lower a heat rating without changing the underlying inputs. The map is the consequence of 6.1 and 6.2; if it's wrong, fix the inputs.

What you must not do:

- Use percentages anywhere. Confidence is High / Medium / Low (or *thoroughly checked / informed estimate / guessing*).
- Hide low confidence to make the map look better. Low confidence is the most actionable signal in the map; it's what Step 7 should resolve first.
- Compute the heat rating and not explain it. Every hot item gets a one-line reason.

## Push back when

- The map looks uniformly cold and the project is early-stage. *"This is a young project; some confidences should be Low. Where are we actually guessing?"*
- The map looks uniformly hot. *"Are all these really high-impact and large-gap, or has some inflation crept in?"*
- The user wants to override the heat rating without changing the inputs. *"Which input is wrong — required, actual, or confidence?"*

## This sub-step is DONE when

- [ ] Every H/M dimension × relevant release has a complete risk map row: required, confidence-in-required, actual, confidence-in-actual, gap, impact.
- [ ] Hottest items (large gap + high impact + low confidence) are flagged explicitly with one-line reasoning.
- [ ] Patterns and dependencies are noted.
- [ ] Confidence is expressed in coarse honest levels — no percentages anywhere.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The step-boundary `/contradiction-check` was dispatched on the doc so far (it is the first move of the checkpoint, per SKILL.md) and its scratch file exists at `quality/.scratch/6.3-contradiction-check.md`.
- [ ] The user has run the **step-boundary substantive checkpoint** (see SKILL.md), evaluating the whole step's output (not just this final sub-step), including any rethinks of earlier steps. Explicit, considered confirmation — not silence, not a non-committal response.

If any check fails, return to the questioning. Do not move to Step 7.

## Output

Append to `quality/strategy.md` under Part 6 (the Part 6 header and Confidence vocabulary block were written by sub-step 6.1 — do not re-emit them; just append the sections below):

```markdown
### Risk map for <first release name>

| Dimension | Required | Conf. (req) | Actual | Conf. (act) | Gap | Impact |
|---|---|---|---|---|---|---|
| <dimension> | <qualitative description> | H/M/L | <qualitative description, OR "Unknown"> | H/M/L (or "—" for Unknown) | <small / medium / large / Unknown> | <H/M/L with one-line reason> |

### Hottest items

1. **<dimension, release>.** <one-line reason — what makes this hot>
2. **<…>**
3. **<…>**

### Patterns and dependencies

<clusters of unknowns; dependencies between assessments>

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 5–7 lines highlighting the hottest items, then **run the step-boundary substantive checkpoint** (see SKILL.md): summarise the **whole step's output**, invite vague unease about this step, and invite cross-step rethinks of earlier sections in light of this step. Wait for explicit, considered confirmation. Then ask: *"Ready to move on to Step 7 (Plan of Work)?"*
