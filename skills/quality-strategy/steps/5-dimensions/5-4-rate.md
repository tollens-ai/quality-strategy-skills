# Sub-step 5.4 — Rate dimensions

## Goal

For each dimension in the final inventory from 5.3, rate its **impact for this release** using mechanical anchors, **per stakeholder**, then **merge** to one rating per dimension. The vocabulary is **H / M / None** — there is deliberately **no L** at this step.

The rating captures **impact size only** — *how much does failure on this dimension cost, for the stakeholders who care?* It does **not** capture likelihood, and it does **not** capture "how high does the actual quality need to be" (that's 6.1). Likelihood lives downstream in the risk map: risk = impact × likelihood gets combined there, later — not collapsed into a single 5.4 score now.

**High means important, not in-trouble.** A High rating says failure here would cost a stakeholder dearly — it says nothing about where the project currently stands. A High dimension can be comfortably at bar (a success story), or cheap to close; importance and current state are different axes, and the current state is Part 6's question, not this one's. Keep that distinction in the prose you write and the words you say: never use "High" to mean "at risk" or "in trouble".

There is no L on purpose. "Aware of it but not investing right now" is a **plan-of-work decision (Step 7)**, not a rating. Dropping L kills the state-vs-priority drift at its source — ratings quietly sliding to match what the team plans to work on, rather than what failure costs. Rate each dimension by what the stakeholders' bars say its impact is; decide separately, in Step 7, whether to defer work on it — with that impact in full view.

## What you need from the previous sub-step

Read sub-step 5.3's **final inventory** (post-unpack and post-old/new-world) from `quality/strategy.md`. Read Part 3 (Stakeholders) — specifically each stakeholder's three-lens bars (Delight / Good Enough / Dealbreaker), because the anchors are applied against those bars. Read Part 4 (Non-goals) — in dimension terms, a non-goal is a dimension no stakeholder bar references (None), or one dropped from the inventory entirely.

## What to cover

By the end of this sub-step the strategy doc must capture, **for each dimension in the inventory**, one **merged** rating of **H / M / None** plus a short pointer rationale citing the stakeholder bar it rests on. Where stakeholders diverged, the doc records the divergence and the merge decision.

**The mechanical anchors**, applied **per stakeholder** against that stakeholder's Part 3 three-lens bars:

1. **H** — if and only if this dimension's failure mode is a **Dealbreaker** for at least one stakeholder, at any lens. Failure here costs a stakeholder something they will not accept.
2. **M** — if and only if some bar (Good Enough or Delight) references the dimension and **no** stakeholder has it as a Dealbreaker. It matters and should be actively managed; failure is unwelcome but survivable.
3. **None** — if and only if **no** stakeholder bar at any lens references the dimension. Explicitly not a concern for this release.

**Floors are never None.** A dimension that entered as a *floor* (5.1's guaranteed-inclusion layer — its factual predicate held) carries an always-on bar by definition, so it cannot be rated None however quiet the stakeholders were about it; rate it H or M on what the floor demands here (often M, sometimes H), never None. A *default-in* the user explicitly accepted the risk on in 5.1 (the eyes-open recorded fork) is the one case where a security/data-integrity/spend dimension may be None — and only with that recorded accepted-risk as its rationale, never silently.

The rating yields a short **pointer** rationale, not a paragraph of judgement — e.g. *"H — Family Dealbreaker on data loss, Part 3.2"*. The pointer names the stakeholder and the specific bar (by lens: Delight / Good Enough / Dealbreaker); that's the whole rationale.

## How to ask

The flow is **a long stretch of sealed subagent work, then a short user dialogue only where stakeholders diverge.** The orchestrator (you, the main agent) does **not** grade the dimensions itself.

### 1. Dispatch the sealed-context rating subagent

The mechanical-anchor work runs in a **sealed-context** subagent that sees only what it needs: the final dimension inventory from 5.3 and the Part 3 stakeholder three-lens bars. It must **not** see this file's DONE checklist, any desired or target distribution, or the destination doc's success conditions — seeing the destination is exactly what tempts an orchestrator to drift toward middle ratings.

Use the `Agent` tool with `subagent_type: general-purpose`. The brief:

> You are rating quality dimensions for a quality strategy by applying mechanical anchors against stakeholder bars. Your output is a **per-stakeholder** rating table. You do **not** merge across stakeholders — that's the orchestrator's job.
>
> First, read `$PLUGIN_ROOT/PHILOSOPHY.md` to ground yourself in the framework (quality is value to someone who matters; impact is about cost to a stakeholder who cares).
>
> Then read `$DOCS_DIR/quality/strategy.md` — specifically the **final dimension inventory** in Part 5 (the post-old/new-world inventory) and the **Part 3 stakeholder three-lens bars** (each stakeholder's Delight / Good Enough / Dealbreaker entries).
>
> For **each dimension × each stakeholder**, apply this anchor mechanically against that stakeholder's bars:
>
> - **H** — if this dimension's failure mode is a **Dealbreaker** for this stakeholder (at any lens).
> - **M** — if some bar of this stakeholder (Good Enough or Delight) references this dimension and it is **not** a Dealbreaker for them.
> - **None** — if **no** bar of this stakeholder at any lens references this dimension.
>
> Do **not** invent bars. If no bar of a stakeholder references a dimension, it is **None** for that stakeholder — do not reach for a plausible-sounding rating. Each cell must point at a specific bar (or record "no bar references it").
>
> **One exception — floors are never None.** A dimension whose inventory **Source** marks it a *floor* (the guaranteed-inclusion layer, e.g. "floor: holds PII", "floor: ships to others' machines") carries an always-on bar by definition — its factual predicate is the bar. Never rate a floor None for any stakeholder, even when no named bar references it: rate it on what the floor demands (H where a stakeholder treats its violation as a Dealbreaker, otherwise **M** as the floor minimum), and point the cell at the floor predicate as its bar.
>
> Return a per-stakeholder rating table: rows are dimensions, columns are stakeholders, each cell is `{H / M / None, pointer to the specific bar}` (e.g. *"H — Dealbreaker bar: 'never lose my data'"*).
>
> **Before returning, save this table verbatim** to `$DOCS_DIR/quality/.scratch/5.4-dimension-rating.md` — the sealed-dispatch scratch file `/quality-strategy-review` audits (see SKILL.md → "Sealed-context dispatch and scratch files").
>
> Do **not** merge across stakeholders, do **not** produce a single rating per dimension, and do **not** comment on the overall distribution. Just the per-stakeholder table, grounded cell by cell in the bars.

### 2. Merge (orchestrator + user dialogue)

When the subagent returns, merge **per dimension**. This is real dialogue where stakeholders disagree — not a mechanical take-the-max dressed up as discussion.

- **Convergence** — all stakeholders agree, or the anchor clearly aggregates. Take the aggregate as a **high-confidence merged rating, silently**: any stakeholder Dealbreaker → **H**; else any other bar → **M**; else **None** — *except a floor dimension, which never merges to None* (a floor with no Dealbreaker → **M**, its floor minimum). If the sealed table ever returns None for a floor, override it to M before writing; that's the one rating you correct rather than take as-is.
- **Divergence** — stakeholders genuinely disagree (e.g. Stakeholder A: H Dealbreaker; Stakeholder B: None). **Surface it to the user explicitly:**

  > *"Stakeholder A treats [dimension] as a Dealbreaker (H); Stakeholder B doesn't reference it at all (None). You have one team — what does it commit to for this release?"*

  The user decides. Record the merged rating **plus a one-line note** of the divergence and the decision.

  Where the merge decision **knowingly accepts rough** — the team commits below some stakeholder's bar, or accepts that the bar will be met by a solution everyone knows isn't long-term robust — record it as a **tradeoff**: what was traded, which bar it still satisfies, and the trigger that would reopen it. This is where good-enough-on-purpose gets written down; it falls out of reconciling the lenses, not out of a separate list.

Talk exactly where stakeholders disagree — that contested call is where the user's input is worth most. Don't manufacture dialogue where the anchor converges, and don't collapse a real divergence into a silent max.

### 3. Backstop — light justification glance

After the merge, glance over the Highs: each one must cite the Dealbreaker bar it rests on. This is **light** — the thorough justification and coverage checks live in 5.5. Don't be alarmed by a High-dominated table: by this point the low-stakes material has already left the list (dropped at the inventory, excluded as a non-goal, or rated None), so Highs dominating what remains is the expected shape, not inflation. Because H requires a real Dealbreaker, inflation is structurally limited anyway — the thing to verify is the citation behind each High, not the count of them.

You have explicit permission and encouragement to:

- Surface a divergence even when the aggregate is "obvious" by max — the point of the merge is the team's commitment, not the arithmetic.
- Quote the specific bar back to the user when confirming a divergence, so the decision is grounded.
- Note tensions where a dimension is a Dealbreaker for one stakeholder and absent for another; they'll come back in 5.5 and Part 6.

What you must not do:

- Grade the dimensions yourself. The per-stakeholder ratings come from the sealed subagent, against the bars.
- Let the rating subagent see the DONE checklist, any target distribution, or the destination doc's success conditions.
- Use **L** anywhere, or use percentages. The vocabulary is **H / M / None** only.
- Collapse a genuine divergence into a silent aggregate. Divergence is a user decision.
- Accept an H without a stakeholder Dealbreaker, an M without a non-Dealbreaker bar, or a None where some bar actually references the dimension.

## Push back when

- An H has no stakeholder Dealbreaker behind it. *"H requires a Dealbreaker — which stakeholder, which bar? If there's no Dealbreaker, this is M."*
- An M has no bar at all. *"M requires a Good Enough or Delight bar that references this — which one? If no bar references it, it's None."*
- A None is asserted for a dimension a bar clearly references. *"This stakeholder's [lens] bar mentions this — so it's at least M, not None."*
- A divergence is being merged silently. *"Stakeholder A and B disagree here — that's a team commitment decision, not arithmetic. What does the team commit to?"*

## This sub-step is DONE when

- [ ] Every dimension in the inventory has a single **merged** rating (H / M / None).
- [ ] Every **H** cites a stakeholder **Dealbreaker** bar.
- [ ] Every **M** cites a non-Dealbreaker (Good Enough or Delight) bar.
- [ ] Every **None** has been confirmed: no stakeholder bar at any lens references it.
- [ ] Per-stakeholder ratings were produced by the **sealed-context subagent** and saved verbatim to `quality/.scratch/5.4-dimension-rating.md`.
- [ ] Every **divergence** was surfaced to the user, and the merge decision is recorded with a one-line note.
- [ ] Tradeoffs knowingly made at the merge are recorded (what was traded, the bar it still satisfies, the reopen trigger) — or the section records "none recorded this pass".
- [ ] Rating vocabulary is **H / M / None** — no L, no percentages.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the dispatch or the merge. Do not move to sub-step 5.5 (Sanity checks).

## Output

Append to `quality/strategy.md` under Part 5, after the inventory:

```markdown
### Dimension ratings (<release>)

Merged ratings, grouped by rating for readability. Impact size only — likelihood lives in the risk map (Part 6).

#### High (Dealbreaker for at least one stakeholder)

| Dimension | Rationale (stakeholder bar pointer) |
|---|---|
| <name> | <e.g. "H — Family Dealbreaker on data loss, Part 3.2"> |

#### Medium (referenced by a Good Enough / Delight bar, no Dealbreaker)

| Dimension | Rationale (stakeholder bar pointer) |
|---|---|
| <name> | <e.g. "M — Power-user Delight on export speed, Part 3.2"> |

#### None (no stakeholder bar references it)

| Dimension | Rationale (confirmed no bar references it) |
|---|---|
| <name> | <e.g. "None — no stakeholder bar at any lens references it"> |

**Stakeholder divergences and merge decisions:**

- **<dimension>** — Stakeholder A: H (Dealbreaker bar, Part 3.2); Stakeholder B: None. Merged to <rating> because <the user's decision>.
- <or "none — all dimensions converged">

**Tradeoffs knowingly made at the merge** (good-enough-on-purpose — each with the bar it still satisfies and its reopen trigger):

- **<dimension>** — <what was traded and why it's enough> — *reopen when: <trigger>*.
- <or "none recorded this pass">

**Rating counts:** <e.g. "6 H, 9 M, 4 None">

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines (highlighting the count by rating and any contested ratings the merge resolved) and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 5.5 (Sanity checks)?"*
