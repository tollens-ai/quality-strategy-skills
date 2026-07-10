# Sub-step 5.2 — Unpack pass

## Goal

For each composite dimension in the raw inventory from 5.1, decide whether it's actually one thing or several things wearing a trenchcoat. Where it's several things, split it into sub-dimensions that can be rated independently.

Skip an unpack that was needed and you get a misleading rating in 5.4 and a misleading risk-map row in Step 6: the sub-dimensions have meaningfully different priorities, so the single composite rating is wrong for most of them — including where the priorities differ **by stakeholder**, not just by sub-concept (see below and SKILL.md → "Name the scope").

## What you need from the previous sub-step

Read the raw inventory from sub-step 5.1's output in `quality/strategy.md`. Read Part 3 (stakeholders) — sub-dimensions often correspond directly to specific stakeholder bars (one stakeholder cares about one sub-dimension; another cares about a different one).

## What to cover

By the end of this sub-step:

1. **Every composite dimension has been examined** — the unpack question asked, the answer recorded.
2. **Where unpacking is warranted, the composite is replaced by its sub-dimensions** in the inventory.
3. **Where the dimension is genuinely atomic for this project**, that's been recorded as an explicit decision ("considered, not split because…"), not a silent skip.

Composite labels to look at hardest:

- **Performance** — almost always unpacks: scalability, resource consumption, elapsed time, UX responsiveness, jitter.
- **Maintainability** — diagnosability, fixability, enhanceability, readability, understandability.
- **Reliability** — recoverability, retry success, failure shape, failure mode (loud vs silent).
- **Security** — actual security, perceived security, plus specific attack surfaces.
- **Usability** — discoverability, learnability, efficiency, error tolerance, satisfaction.
- **Observability** — metrics, tracing, logging, alerting, post-hoc reconstruction.

**Actual vs. perceived isn't Security-specific — it's a general unpack move.** Wherever a dimension's reality and a stakeholder's perception of it can diverge, the same actual-X / perceived-X split applies: actually-reliable vs. feels-reliable, actually-fast vs. feels-fast, and for AI/agentic products, the output is actually correct vs. users trust the output. Same trigger as everywhere else on this page — split when the two would carry meaningfully different priorities or evidence (an actual can be strong while a stakeholder's trust in it is weak, or vice versa); don't reach for it reflexively on every dimension, but don't leave it parked under Security either.

These are the labels that almost always have meaningfully different priorities for sub-dimensions. Other dimensions in the inventory may also be composite; the labels above are not exhaustive.

## How to ask

For each dimension in the inventory, ask:

> *"Is this one thing, or several things wearing a trenchcoat?"*

For obviously-atomic dimensions (e.g. "compliance with HIPAA," "Spanish localisation"), don't manufacture splits — record as atomic and move on. The unpack pass is about catching genuine composites, not turning every label into a tree.

For each composite, propose unpacking concretely:

> *"Performance is several distinct things — scalability (handling large inputs), elapsed time (how long runs take), UX responsiveness (does it feel responsive), jitter (predictable timing). For this release, do these have meaningfully different priorities — including for different stakeholders? If so, treat them as separate dimensions."*

**Splitting by stakeholder, not just by sub-concept.** A dimension can also need splitting when the *name* is one thing but the *meaning or priority* differs by who it's for — this comes up from 5.1's scope column: if the raw inventory carries "usability" scoped to two different stakeholders with genuinely different bars (a dev tool's own UI vs. the workflows it produces, or a human user vs. an agent caller), that's a split here even when nothing about the sub-concept itself is composite. Ask directly when 5.1 flagged this: *"Usability showed up for both [stakeholder A] and [stakeholder B] — do they actually want different things, or is one bar enough for both?"*

The user confirms which to split. Replace the composite with the split sub-dimensions in the inventory, each carrying its own scope forward from 5.1. The "one-line reason" for each sub-dimension should anchor in a specific stakeholder bar where possible — the bar is often what surfaces the sub-dimension as relevant.

You have explicit permission and encouragement to:

- Skip the unpack question for obviously-atomic dimensions. Don't ceremony-grind.
- Surface tensions when sub-dimensions imply contradictory priorities (one stakeholder cares about elapsed time, another about jitter; the trade-offs may differ).
- Walk the unpack question per composite without rushing — this is one of the foundational moves in the framework.

What you must not do:

- Skip the unpack question on composite labels (the ones listed above) without explicit confirmation that they're atomic for this project.
- Manufacture splits for dimensions that don't warrant them.
- Replace a composite with sub-dimensions in the inventory without surfacing the change to the user — every split is an explicit decision.

## Push back when

- A composite dimension is dismissed as atomic without examination. *"Performance for this project — is responsiveness really the same as scalability? They look different to me; what makes them one thing here?"*
- The unpacking is half-hearted (one composite gets split into two sub-dimensions when it clearly has more). *"That covers two; what about [third sub-dimension]?"*
- Sub-dimensions are added but with no stakeholder bar grounding. *"Which stakeholder cares about [sub-dimension] specifically? Where in Part 3 does that show up?"*

## This sub-step is DONE when

- [ ] Every dimension in the raw inventory has been examined for the unpack question — including whether it needs splitting **by stakeholder**, not only by sub-concept.
- [ ] Every composite that was unpacked has been replaced with its sub-dimensions in the inventory, each with a one-line reason, its scope carried forward (or refined, for a stakeholder-driven split) from 5.1, and (where possible) a stakeholder-bar anchor.
- [ ] Every composite that was *not* unpacked has been actively confirmed as atomic for this project, with reasoning recorded.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 5.3 (Old/new-world pass).

## Output

Update the inventory section in `quality/strategy.md`. Replace the raw inventory table from 5.1 with the post-unpack inventory:

```markdown
### Inventory after unpack pass (<release>)

| Dimension | Scope (stakeholder/capacity + surface) | One-line reason it matters for THIS release | Source | Unpacked from |
|---|---|---|---|---|
| <name (atomic, or sub-dimension)> | <carried forward from 5.1, refined if the split was stakeholder-driven> | <why this matters for this release> | <stakeholder bar / design observation / reference-list backstop> | <"atomic — considered and confirmed", or "Performance" / "Maintainability" / etc.> |

The "Unpacked from" column shows which dimensions were split: atomic dimensions show *"atomic — confirmed"*; sub-dimensions show their parent composite. This makes the unpack pass evidence visible in the doc.

**Unpack decisions recorded:**

- **<composite name>** — split into <sub-dimensions>, because <reason>.
- **<composite name>** — kept atomic, because <reason>.

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines (naming the splits made and any composites kept atomic with reasoning), and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 5.3 (Old/new-world pass)?"*
