# Sub-step 6.3 — Gap and confidence (the risk map)

## Goal

Combine the required levels (sub-step 6.1) and actual levels (sub-step 6.2) into the risk map itself: a heat-mapped view of where the project is exposed, with confidence ratings on both sides of every gap. This is the headline output of Step 6 and the direct input to Step 7 (Plan of Work).

## What you need from the previous sub-step

Read sub-steps 6.1 (required levels with confidence) and 6.2 (actual levels with confidence) from `quality/strategy.md`. You should now have, for each H/M dimension for this release: required level, confidence in required, actual level, confidence in actual.

## What to cover

By the end of this sub-step the strategy doc must capture:

1. **The risk map table** — for each H/M dimension in this release: required, confidence-in-required, actual, confidence-in-actual, gap, impact-of-gap.
2. **The hottest items** flagged explicitly — large gap + high impact + low confidence on either side.
3. **Patterns** — clusters of unknowns that could be resolved together; dependencies (you can't assess A until B is in place).
4. **What confidence looks like by colour** — High = thoroughly checked or evidenced; Medium = informed estimate but not verified; Low = guessing or working from stale data.

## How to ask

This sub-step is mostly synthesis, not interview. The agent does the work; the user reviews and corrects.

Walk through each row systematically:

- For each dimension, take the required and actual from 6.1 and 6.2.
- Work out the gap: matched / small gap / large gap / **Unknown** (when the actual is Unknown — the gap can't be measured).
- Work out the impact: from the dimension's H/M rating and the rationale, how dangerous is this gap? (Impact is the importance carried over from Part 5 — High means *important*, not *in trouble*. A High-impact dimension with no gap is a cold row and a success story; importance and current state combine in the heat calculation, but they never blur.) Respect the bar's recorded **recurrence/tolerance** (Part 3) when judging how dangerous the gap is: a Dealbreaker that fires on sustained breakage but tolerates one-offs makes a gap producing occasional, self-correcting failures less dangerous than one producing persistent failure — read the tolerance off the bar rather than treating every threat to a Dealbreaker as instantly fatal, and say which failure shape the gap actually produces. The Impact *letter* itself is still the Part 5 carry-over, unchanged by gap shape; the tolerance reasoning lands in the one-line reason and in whether the row makes the hottest-items list — never in the H/M value.
- Mark the heat: hottest = large gap + high impact + low confidence on either side. **Unknowns on high-impact dimensions are also hot** — you don't know where you are, and it matters a lot. They typically generate the highest-priority items in Step 7.
- Coldest = small gap + lower impact + high confidence on both sides.

**Unknowns are normal, especially in first-pass strategies.** Resolving them is what Step 7's plan of work will mostly do. Don't pretend confidence about levels that haven't actually been investigated.

### Counter-pressure before you name a behaviour a defect

A gap, a hot item, a below-bar actual — each says *this behaviour is wrong*. Before you let it stand as a defect, ask the upstream question: **what does this behaviour protect?** Behaviour exists for reasons, and a thing that looks like a bug through one dimension is often a deliberate choice serving another. The kp3136 case: *"the clock doesn't pause on disconnect → players get flagged unfairly → angry players"* was named a defect — but a running-on-disconnect clock is the **domain norm** for chess sites, because pausing it lets a player disconnect to think for free. Same behaviour, two dimensions pulling opposite ways: fairness-to-the-disconnected vs anti-cheat integrity. Goal-tracing it to the stated *"angry players"* dealbreaker and stopping there names one side as a bug and never sees the other.

So when a behaviour is heading for the risk map as a defect:

- **Ask what it protects first** — the purpose, the domain convention, the other dimension it serves. Cite the domain norm where one exists (*"chess servers keep the clock running on disconnect on purpose"*).
- **Where a genuine tension exists, present BOTH pulls as a tradeoff for the user to arbitrate** — not one side as a defect. *"This behaviour hurts disconnected players but defends against disconnect-to-think cheating. Which way does this release lean?"* The user decides; record the decision as a tradeoff (the same home as 5.4's *"Tradeoffs knowingly made at the merge"* — this is its **upstream twin**, firing at risk identification rather than at recombination), with the dimension it still satisfies and what would reopen it.
- **Only name it a defect when no countervailing purpose survives the question.** A behaviour that protects nothing, once you've genuinely asked, is a clean defect — name it.

This is one-directional goal-tracing's antidote: a stated dealbreaker pulls hard toward calling everything that threatens it a bug, and the counter-pressure is what keeps a domain-correct behaviour from being mis-filed as one.

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
- The map looks uniformly hot. Check the inputs row by row rather than doubting the count: a hot row needs a real gap (or Unknown) *and* a real impact rating behind it. Where both hold for every row, say so plainly — *"this is a genuinely exposed surface right now"* — a uniformly hot map of a young, high-stakes project is honest, not inflated.
- The user wants to override the heat rating without changing the inputs. *"Which input is wrong — required, actual, or confidence?"*
- A behaviour is being named a defect purely because it threatens a stated dealbreaker, with no one having asked what it protects. *"Before we call this a bug — what's it there for? Is it a domain convention pulling the other way?"* If a genuine tension exists, present both pulls as a tradeoff for the user to arbitrate, not one side as a defect.

## This sub-step is DONE when

- [ ] Every H/M dimension × relevant release has a complete risk map row: required, confidence-in-required, actual, confidence-in-actual, gap, impact.
- [ ] Hottest items (large gap + high impact + low confidence) are flagged explicitly with one-line reasoning.
- [ ] Each row's Impact letter matches its Part 5 rating (H/M — never downgraded per-gap); where the threatened bar carries a recorded recurrence/tolerance, the row's reason names the failure shape the gap produces (one-off vs sustained) and the tolerance reasoning lives there and in the heat, not in a changed letter.
- [ ] Each behaviour named as a defect/risk survived the **counter-pressure question** (what does it protect?); any genuine two-dimension tension was presented as a tradeoff for the user to arbitrate — citing the domain norm where one exists — and recorded as such, not booked as a one-sided bug.
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
### Risk map for <release name>

| Dimension | Required | Conf. (req) | Actual | Conf. (act) | Gap | Impact |
|---|---|---|---|---|---|---|
| <dimension> | <qualitative description> | H/M/L | <qualitative description, OR "Unknown"> | H/M/L (or "—" for Unknown) | <small / medium / large / Unknown> | <H/M — the Part 5 rating carried over, with one-line reason> |

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

Once written, summarise back in 5–7 lines highlighting the hottest items, then **run the step-boundary substantive checkpoint** (see SKILL.md): summarise the **whole step's output**, invite vague unease about this step, and invite cross-step rethinks of earlier sections in light of this step. Wait for explicit, considered confirmation.

The risk map is the headline of the whole strategy — so this is the natural moment to **plant the share-it payoff**: once the strategy is finished and reviewed, this map is exactly the kind of thing `/quality-artefacts` turns into a glanceable dashboard or a card you can screenshot and share. A one-line teaser is enough here — *"once we close this out, you'll be able to turn this risk map into a shareable dashboard with `/quality-artefacts`"* — the real offer lands at the end (see SKILL.md → "Final step"); don't derail the checkpoint into artefact-building now.

Then offer the Step 7 choice — it is optional (see SKILL.md → "The plan of work is a sketch"): *"Step 7 sketches the plan of work — what to do about these gaps, classified and sequenced, at one or two lines per action. It's optional: if you're going straight into the follow-on lanes — `/test-strategy`, `/evaluation-strategy`, `/process-strategy` (builds via `/tooling-strategy`) — we can record the plan as deferred to those instead and close the strategy out now. Sketch it, or defer?"* If the user defers, follow the deferral path in SKILL.md (write the Part 7 deferral note, then the closing moves). If they sketch, proceed to sub-step 7.1.
