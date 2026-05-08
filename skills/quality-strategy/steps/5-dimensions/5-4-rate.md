# Sub-step 5.4 — Rate dimensions

## Goal

For each dimension in the final inventory from 5.3, rate its importance for the first release using **H / M / L / None**, with a one- or two-sentence rationale per rating. The rating answers *"how much does this dimension weigh in our decisions for the first release?"* — not *"how high does the actual quality need to be"* (that's 6.1).

## What you need from the previous sub-step

Read sub-step 5.3's final inventory (post-unpack and post-old/new-world) from `quality/strategy.md`. Read Part 3 (Stakeholders) for the three-lens analysis — ratings should be grounded in stakeholder bars. Read Part 4 (Non-goals) — non-goals translate into None ratings or absence from the inventory.

## What to cover

By the end of this sub-step the strategy doc must capture, **for each dimension in the inventory**:

1. **Rating: H / M / L / None.**
   - **High** — critical to the release's success. Failure here is a dealbreaker or near-dealbreaker for at least one stakeholder.
   - **Medium** — matters and should be actively managed, but imperfection is tolerable.
   - **Low** — aware and won't deliberately make worse, but not investing.
   - **None** — explicitly not a concern for this release. A non-goal expressed in dimension form.
2. **Rationale** — one or two sentences naming the stakeholder bar(s) or release purpose this rating is grounded in. *Why* this rating, for *this* release, for *these* stakeholders.

## How to ask

Walk the dimension inventory in order. For each dimension:

- Surface the bottom-up grounding: *"From Part 3, [stakeholder]'s dealbreaker was X — that suggests this is High for the first release. Agree, or is it actually Medium?"*
- Capture the rating and rationale together; don't accept a rating without a reason.

If the user is uncertain about the rating system, briefly: *"H = critical, M = matters but tolerable, L = aware but not investing, None = explicitly not a concern."*

You have explicit permission and encouragement to:

- Push the rationale to be specific: *which* stakeholder, *which* lens, *which* release purpose.
- Surface tensions: a dimension that's High for stakeholder X but Low for stakeholder Y. Note the tension; it'll come back in 5.5 and 6.
- Use the inventory's "one-line reason it matters" from the inventory as a starting position for the rationale, refined by the user.

What you must not do:

- Accept a rating without a rationale.
- Use percentages anywhere. Rating vocabulary is **H / M / L / None** only.
- Rate every dimension High. If most things are critical, the rating is no longer information.
- Skip None ratings. None is an explicit decision, not an omission. A dimension in the inventory rated None means "we considered this and decided not to care, for now." Surface the reason.

## Push back when

- A rating has no rationale, or the rationale is generic ("important," "matters"). *"Important to whom, for what?"*
- The rating distribution is mostly High. *"If most dimensions are High, the rating loses information. Is everything actually critical, or has some inflation crept in?"*
- A None rating doesn't have a reason. *"None is an explicit decision — what's the reasoning, and what would change it?"*
- A dimension is rated H or M but no stakeholder bar is named. *"Which stakeholder does this matter for, and what specifically did they say?"*

## This sub-step is DONE when

- [ ] Every dimension in the inventory has a rating (H / M / L / None).
- [ ] Every rating has a rationale grounded in stakeholder bars or release purpose.
- [ ] No H or M rating exists without a named stakeholder bar.
- [ ] None ratings have explicit reasoning (not "we forgot about it").
- [ ] Confidence vocabulary is H / M / L / None — no percentages.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field, naming actual files referenced (not blank, not placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 5.5 (Sanity checks).

## Output

Append to `quality/strategy.md` under Part 5, after the inventory:

```markdown
### Dimension ratings (first release)

Grouped by rating for readability.

#### High (critical for this release)

| Dimension | Rationale (stakeholder bar / release purpose) |
|---|---|
| <name> | <one or two sentences> |

#### Medium

| Dimension | Rationale |
|---|---|
| <name> | <…> |

#### Low

| Dimension | Rationale |
|---|---|
| <name> | <…> |

#### None (explicitly not a concern for this release)

| Dimension | Rationale (why None, what would change it) |
|---|---|
| <name> | <…> |

**Distribution:** <count by rating, e.g. "5 H, 7 M, 3 L, 4 None">

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines (highlighting the count by rating and any contested ratings) and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 5.5 (Sanity checks)?"*
