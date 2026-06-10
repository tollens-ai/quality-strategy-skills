# Sub-step 5.5 — Sanity checks (post-rating review)

## Goal

Final review of the dimension list and ratings before moving to Step 6. Catches the failure modes an agent and user deep in the flow often miss: skewed distributions, stakeholder-coverage gaps, cross-stakeholder tensions, and missing rationale.

This sub-step is mostly the agent doing checks and surfacing findings; the user resolves any flagged issues.

(Note: the unpack pass lives in 5.2 and the old/new-world pass in 5.3, not here — an inventory that skipped those passes isn't valid and would have produced wrong ratings in 5.4. By the time you reach 5.5, the inventory and ratings should already be at the right grain.)

## What you need from the previous sub-step

Read all of Part 5 (5.3's final inventory + 5.4's ratings) from `quality/strategy.md`. Read Part 3 (stakeholders + three-lens) and Part 4 (non-goals) for cross-checking.

## The checks (run in order)

### Check 1 — Distribution

Count the ratings by category (H / M / None). Push back on:

- **More than 50% rated High.** *"X of Y dimensions are High — meaning more than half have a stakeholder Dealbreaker behind them. Is everything truly a dealbreaker, or do some only have a Good Enough / Delight bar (Medium)? A distribution where most things are High loses information."*
- **No None ratings at all in an early-stage project.** *"None is an explicit decision; in an alpha or early release there are usually things actively excluded. Are we sure no dimension is unreferenced by any stakeholder bar?"*

Because 5.4's **H** now requires a real Dealbreaker bar, rating inflation is structurally limited — you can't push something to High without a stakeholder who demands it. Note too that "aware of it but not investing right now" is **not** a rating here (there is no L): it's a Step 7 plan-of-work decision. Its absence from the ratings is expected, not a gap — don't flag it.

### Check 2 — Stakeholder coverage

For each first-release stakeholder in Part 3:

- Scan Part 5's H and M dimensions.
- For each stakeholder, ask: *"is there at least one H or M dimension that touches this stakeholder's bars (Delight, Good Enough, Dealbreaker)?"*
- If no dimension connects to a stakeholder, surface: *"[Stakeholder] is in Part 3 but no H or M dimension in Part 5 maps to their concerns. Either we're missing a dimension, or this stakeholder isn't actually being served — which is it?"*

### Check 3 — Cross-stakeholder tensions

Walk Part 5's H dimensions. For each, scan Part 3's stakeholders to see if any have bars that contradict the dimension's rationale. Examples:

- A dimension rated H because it serves stakeholder X's Delight, but stakeholder Y's Dealbreaker would be triggered if it's pursued aggressively.
- Two H dimensions that pull in opposite directions (e.g. observability requires verbose logging; performance requires minimal overhead).

Flag tensions explicitly. You don't have to resolve them here — the risk map and plan of work will surface them again — but they must be visible.

### Check 4 — Non-goal alignment

Walk Part 4's non-goals. For each:

- Check Part 5 for a corresponding None rating, or absence from the inventory.
- If a non-goal contradicts an H or M rating ("performance is a non-goal" but "scalability" is rated High), surface the inconsistency: *"Part 4 says X is a non-goal, but Part 5 rates Y High, which depends on X. How do we reconcile?"*

### Check 5 — Rationale coverage

Walk Part 5's ratings:

- Every H rating should cite a named stakeholder **Dealbreaker** bar in its rationale.
- Every None rating means **no stakeholder bar at any lens references the dimension** — that confirmation *is* the reasoning. Check it's a confirmed None, not a "we forgot about it" gap.

Surface any missing.

## How to interview through this

This sub-step is mostly mechanical agent work. Run the checks in order, surface findings as a short list, and let the user resolve each. Don't grind through resolved items.

You have explicit permission and encouragement to:

- Push back hard on skewed distributions. A strategy where 80% of dimensions are H isn't focused.
- Surface tensions even when uncertain — flagged tensions are better than hidden ones.
- Treat the checks as the agent's responsibility. The user shouldn't have to remember to ask "did you check distribution?"

What you must not do:

- Skip checks because "the user already thought about this."
- Resolve flagged issues silently. Every finding goes to the user.
- Move on if the distribution is wildly skewed and the user hasn't actively confirmed.

## Push back when

- More than 50% of dimensions are High and the user dismisses the check. *"That's a lot of critical things — what would you cut if half had to be Medium?"*
- A stakeholder has no H/M dimension touching their bars. *"[Stakeholder]'s dealbreaker was X. Where does that map to in our dimensions?"*
- A non-goal contradicts an H-rated dimension. *"Part 4 said X is a non-goal, but Part 5 has Y rated High, which depends on X. How do we reconcile?"*
- An H rating has no stakeholder bar named in its rationale. *"What stakeholder is this critical for, and what specifically did they say?"*

## This sub-step is DONE when

- [ ] Distribution check has been run; if skewed, the user has actively confirmed or adjusted.
- [ ] Stakeholder coverage check has been run; each first-release stakeholder has at least one H or M dimension touching their bars (or a coverage gap is flagged as `OPEN QUESTION`).
- [ ] Cross-stakeholder tensions have been flagged where they exist.
- [ ] Non-goal alignment has been verified; any mismatches surfaced and resolved.
- [ ] Every H rating cites a named stakeholder Dealbreaker bar; every None rating is a confirmed "no stakeholder bar references it" (not a forgotten gap).
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] The step-boundary `/contradiction-check` was dispatched on the doc so far (it is the first move of the checkpoint, per SKILL.md) and its scratch file exists at `quality/.scratch/5.5-contradiction-check.md`.
- [ ] The user has run the **step-boundary substantive checkpoint** (see SKILL.md), evaluating the whole step's output (not just this final sub-step), including any rethinks of earlier steps. Explicit, considered confirmation — not silence, not a non-committal response.

If any check fails, return to the questioning. Do not move to Step 6.

## Output

Append to `quality/strategy.md` under Part 5:

```markdown
### Sanity-check findings

- **Distribution check:** <findings — was the spread reasonable, or did we adjust?>
- **Stakeholder coverage:** <each first-release stakeholder confirmed covered, or coverage gaps flagged>
- **Cross-stakeholder tensions:** <flagged tensions with one-line description; or "none identified">
- **Non-goal alignment:** <verified clean; or "mismatches resolved as <X, Y>">
- **Rationale coverage:** <verified; or any gaps flagged>

**Sources consulted from pre-read:** <typically empty for this sub-step>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines then **run the step-boundary substantive checkpoint** (see SKILL.md): summarise the **whole step's output**, invite vague unease about this step, and invite cross-step rethinks of earlier sections in light of this step. Wait for explicit, considered confirmation. Then ask: *"Ready to move on to Step 6 (Risk Map)?"*
