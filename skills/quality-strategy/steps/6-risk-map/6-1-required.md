# Sub-step 6.1 — Required levels

## Goal

For each H/M dimension from Step 5, describe what level it needs to reach for this release to succeed — and say how confident we are that this is the right target. The required level is the *should-be* side of the gap; sub-step 6.2 captures the *what-is* side.

## What you need from the previous sub-step

Read Part 5 (Quality Dimensions) from `quality/strategy.md` for the H/M-rated dimensions — and for each, its **Scope** (stakeholder(s)/capacity + surface) from 5.3's final inventory, the version 5.4 rated. A dimension name is not a unique key: two rows can share a name with different scopes (the classic dev-tool case — "usability" for the tool's own users vs. for agents calling its API), and each stays its own row all the way through Step 6, never merged back into one because the names match. Read Part 3 (Stakeholders) for the three-lens analysis — Good Enough and Dealbreaker lenses are direct inputs to required levels. Read Part 4 (Non-goals) to confirm scope (Low and None dimensions are not in the risk map). If 2.1 negotiated a multi-release doc structure (SKILL.md → "Scope of this skill"), note which release(s) this risk map covers — every row needs an explicit release tag below whenever more than one release is in play. **This is also where the live failure this fix exists to close was actually caught**: if the user starts talking through required levels for a release other than the one this pass covers, that's mid-step material for another release, and the universal routing rule applies — route it to that release's home (its own section under "two releases in parallel," its light section, its bank entry, or its separate document) and name it in half a line; do not create a row for it in this release's table just because the conversation was already open.

## What to cover

By the end of this sub-step the strategy doc must capture, **for each H/M dimension row** (dimension **and its scope** — two same-named, differently-scoped rows are two rows, rated and required independently):

1. **Required level** — a description, in words specific to this dimension **and this scope**, of what level it needs to reach for this release to succeed. Concrete terms, not a generic shared scale. A tool-side row and a produced-work-side row of the "same" -ility (the dev-tool double) routinely need different required levels — don't let one answer stand in for both.
2. **Confidence in the required level** — H/M/L. How sure are we that this is the right target? Often Low, especially in early-stage projects where no stakeholder has actually confirmed the bar.
3. **Grounded in** — which stakeholder dealbreakers and good-enoughs (from Part 3) and which release purpose (from Part 2) anchor this required level. Required levels with no grounding are floating.
4. **Release** — whenever this doc's negotiated structure (2.1 / SKILL.md → "Scope of this skill") covers more than one release, name which release this row belongs to, explicitly, on the row itself — don't rely on the section header alone once more than one release's rows could plausibly sit near each other.

## How to ask

Walk the H/M dimension rows **cluster by cluster** when they fall into natural clusters (SKILL.md → "Cluster-by-cluster, not one flat list") — sharing a stakeholder, a theme, or a parent composite from 5.2 — one cluster at a time, confirmed, before moving to the next; a flat row-by-row walk stays fine when nothing meaningfully clusters (record *"considered, no clustering"*). Within each row, ask in turn — naming the scope, not just the dimension, whenever more than one row shares a dimension name:

- *"For [dimension] (scope: [scope]), what does the release need to look like to succeed? Describe it in concrete terms — what would a stakeholder see, do, or experience?"*
- *"How confident are we that's the right target? High, Medium, or Low?"*
- *"What's it grounded in — which stakeholder bar, which release purpose?"*

Use the three-lens material from Part 3 as your starting position. Often the required level comes down to: avoid every relevant stakeholder's dealbreakers, and meet their good-enoughs. Say that out loud to the user: *"From Part 3, [stakeholder]'s Good Enough was X and their Dealbreaker was Y. Required level for [dimension] looks like: [synthesis]. Does that capture the bar, or is it missing something?"* Carry each bar's **recurrence/tolerance** recorded in Part 3 into the synthesis: *"no sustained breakage"* and *"no bugs ever"* are different bars demanding different required levels — don't silently tighten a tolerant bar or loosen a strict one; where a bar's tolerance wasn't recorded and the required level turns on it, ask now rather than pick a reading.

**The bar cuts both ways (anti-overshoot).** A required level is a ceiling as well as a floor: when the actual later meets the bar, "goal is met" is a **positive verdict** — even where the solution wouldn't survive the next order of magnitude — and the right response is to record a future-release change note (what would reopen this, and when), not to gold-plate now. Don't let a required level quietly absorb robustness no stakeholder bar asked for; if the team knows the solution is rough-but-sufficient, that is a tradeoff to write down, not a reason to raise the bar — append it to Part 5's "Tradeoffs knowingly made at the merge" list (the rating step's record of where stakeholder bars recombine), so it has a home in the doc rather than living only in conversation.

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
- Merge two rows that share a dimension name but carry different scopes into one required level. Same name, different scope, different row.
- Leave a row's release implicit when this doc's negotiated structure covers more than one release.

## Push back when

- A required level is described with no concrete content. *"In concrete terms, what does that look like? What would the stakeholder see or do?"*
- A required level is anchored to nothing in Parts 2 or 3. *"Which stakeholder needs this, and what specifically did they say?"*
- Confidence is High but no stakeholder has actually been asked. *"That's High confidence based on what evidence? If no one has been asked, isn't this Medium or Low?"*
- Two stakeholders' bars contradict and the user picks one without acknowledging the tension. *"That works for X, but Y said Z — how do you reconcile?"*
- The user pushes a required level above every grounding bar "to be safe." *"Which stakeholder bar asks for that extra? If none does, meeting the stated bar is success — let's record what would reopen it as a change note instead of raising the bar."*
- Two same-named rows with different scopes are getting talked through as if they were one dimension. *"[Dimension] for [scope A] and [dimension] for [scope B] are two different rows with two different bars — let's do them separately."*

## This sub-step is DONE when

- [ ] Every H/M dimension **row** (dimension + scope) from Part 5 has a row in Part 6 with a required level described in that row's own concrete terms — checked against the H/M dimension list from sub-step 5.4, cross-referenced against 5.3's Scope column: every row has a Part 6 row, and no two differently-scoped same-named rows were collapsed into one.
- [ ] Every required level has confidence (H/M/L) and grounding (stakeholder bar(s) and release purpose).
- [ ] Whenever this doc's negotiated structure covers more than one release, every row states which release it belongs to — never left to the section header alone.
- [ ] Any required-level detail volunteered mid-conversation for a different release was routed per Part 2's document structure and named to the user — none turned into a row in this release's table.
- [ ] Under "two releases in parallel," this sub-step ran its own full pass for the parallel release too, with its own `## Part 6` header — not blended into this release's.
- [ ] Where a grounding bar carries a recurrence/tolerance recorded in Part 3, the required level reflects it — not silently tightened or loosened; where the required level turned on a tolerance nobody recorded, the user was asked, or it is an `OPEN QUESTION:`.
- [ ] Confidence ratings use only H/M/L — no percentages.
- [ ] Tensions between stakeholder bars are surfaced where they exist.
- [ ] Where the dimensions fell into natural clusters, the walkthrough presented them cluster by cluster — or "considered, no clustering" is recorded.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 6.2.

## Output

Append to `quality/strategy.md`. Under the "two releases in parallel" doc structure (SKILL.md → "Scope of this skill"), each release gets its **own** complete `## Part 6` header, run through all of 6.1–6.3 once per release — never one shared header covering both, since the whole point of per-row release tags is moot if the header itself already disambiguates only one release at a time:

```markdown
## Part 6: Risk Map (<release>)

### Confidence vocabulary

- **High confidence**: thoroughly checked, evidenced by testing or data.
- **Medium confidence**: informed estimate from inspection or reasoning, not verified.
- **Low confidence**: guessing, or working from stale information.

### Required levels (<release>)

#### <Dimension name> — <scope>

- **Required:** <qualitative, dimension-specific description of the bar, for this scope>
- **Confidence in required:** <H/M/L>
- **Grounded in:** <stakeholder bar(s) and release purpose>
- **Release:** <only when this doc's negotiated structure covers more than one release — the release this row belongs to>

#### <Next dimension> — <scope>

- **Required:** <…>
- **Confidence in required:** <…>
- **Grounded in:** <…>
- **Release:** <…>

… (repeat per H/M dimension **row** — dimension + scope; two same-named, differently-scoped rows each get their own block, never merged)

**Sources consulted from pre-read:** <bullet list>

**Clustering:** <the groupings used to walk the dimensions, or "considered, no clustering">

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 6.2 (Actual levels)?"*
