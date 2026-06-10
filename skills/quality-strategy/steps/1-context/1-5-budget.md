# Sub-step 1.5 — Budget and constraints

## Goal

Capture the resources available and the hard constraints the project operates under. This shapes what's realistic in Step 7 (Plan of Work) and affects every prioritisation decision in between.

## What you need from the previous sub-step

Read sub-steps 1.1–1.4 from `quality/strategy.md`. Read the **Docs and metadata** section of `quality/pre-read.md` for any roadmap or constraint mentions.

## What to cover

By the end of this sub-step the strategy doc must capture:

1. **People** — full-time, part-time, contracted, agent capacity. How much human attention is actually available per week?
2. **Time** — deadlines, runway, milestones. What's the time horizon for the next release? For the project as a whole?
3. **Money and infrastructure** — bootstrapped, funded, what's the runway? Existing tooling, CI minutes, cloud spend, paid-for services?
4. **Hard constraints** — anything non-negotiable: regulatory deadlines, contractual obligations, platform restrictions, founder availability.

## How to ask

Phrasing is yours. The pre-read won't tell you much about budget directly, so this is mostly cold interview.

A good prompt for concreteness: *"For the next 30 days, what do you actually have? People, time, money?"* — abstract budgets are useless; concrete near-term ones are actionable.

You have explicit permission and encouragement to:

- Push for numbers. Vague budgets ("we'll figure it out") are a finding.
- Ask about agent capacity in concrete terms — token budgets, model costs, daily runtime.
- Probe for the constraints that are *implicit* — the founder's availability, the cofounder's other commitments, regulatory deadlines that haven't been mentioned but exist.

What you must not do:

- Accept "we have whatever we need" — that's never true and the strategy needs the actual constraint.
- Skip agent costs if agents are part of the team. They cost money and attention.
- Treat "no hard deadline" as a complete answer without asking what would change that ("a competitor ships first," "investor patience runs out," "the design partner pulls out").

## Push back when

- Budget is given as "we'll figure it out." *"For the next month specifically, what do you have?"*
- Time is described as "we'll ship when it's ready." *"What would force a ship date — internal pressure, external commitment, runway?"*
- Money is hand-waved. *"Are you bootstrapped or funded? What's the rough monthly burn?"*
- Constraints are denied. *"Are there any deadlines or commitments that are non-negotiable, even if everything else slips?"*

## This sub-step is DONE when

- [ ] People resources are concrete (numbers and time allocation, including agents).
- [ ] Time horizon is specific (next release, next milestone, runway).
- [ ] Money and infrastructure constraints are captured.
- [ ] Hard constraints are captured, or absence has been actively confirmed.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The step-boundary `/contradiction-check` was dispatched on the doc so far (it is the first move of the checkpoint, per SKILL.md) and its scratch file exists at `quality/.scratch/1.5-contradiction-check.md`.
- [ ] The user has run the **step-boundary substantive checkpoint** (see SKILL.md), evaluating the whole step's output (not just this final sub-step), including any rethinks of earlier steps. Explicit, considered confirmation — not silence, not a non-committal response.

If any check fails, return to the questioning. Do not move to Step 2.

## Output

Append to `quality/strategy.md` under Part 1 (Context):

```markdown
### Budget and constraints

<people: concrete numbers and allocation, including agent capacity>

<time: horizons and deadlines>

<money and infrastructure>

<hard constraints, or "none identified" if actively confirmed>

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines, then **run the substantive checkpoint** (see SKILL.md): actively invite vague unease, smells, anything-feels-off. Only after explicit, considered confirmation, ask: *"Step 1 (Context) is complete. Ready to move on to Step 2 (Releases)?"*
