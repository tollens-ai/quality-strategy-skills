# Sub-step 1.3 — Current workflows

## Goal

Capture how work *actually* flows in this project today — not how the user wants it to flow, not how a methodology textbook says it should, but what actually happens. Given this toolset's targeting of agentic-coding work, the agentic side of that flow is captured with the same seriousness as the human side, not as an afterthought.

## What you need from the previous sub-step

Read sub-steps 1.1 and 1.2 from `quality/strategy.md`. Read the **Docs and metadata** and **Code structure** sections of `quality/pre-read.md` — CI configuration, CONTRIBUTING.md, recent commit patterns may all hint at workflow.

## What to cover

By the end of this sub-step the strategy doc must capture:

1. **How a piece of work moves from idea to merged code** — the human-led flow: who proposes it, who reviews, what gates exist, where work waits.
2. **Branching and merging conventions** as they actually happen (not as a CONTRIBUTING.md might describe in the abstract).
3. **The agentic-process walk** — first-class, not a one-line note, given this toolset's agentic-coding targeting. As practised, not aspirational:
   - What work is delegated to agents vs kept human.
   - Which agents or models are used, and how they were chosen.
   - How agent work is dispatched, reviewed, and gated.
   - Where humans stay in the loop.
   - How agents get context — docs, skills, instructions.
   - Parallelism and hand-offs, between agents or between agents and humans.

   If agents are a meaningful part of the workflow (per 1.2), walk a concrete recent agent-led change the same way item 1 walks a human-led one — the "walk me through the last piece of work" device, run a second time. If no agents are involved, record that explicitly; the human walk then carries the full weight.
4. **Anticipated and actual user workflows, at context level** — how users are expected to work with the product (or, once shipped, how they actually do). A context-level sketch of the shape of use, not Part 3's stakeholder depth.
5. **A two-sided assessment per major process area** — for each area surfaced above (the human flow, the agentic flow if present, review, and release — release here is a top-level gut-check; sub-step 1.4 captures the release process itself in depth), the user's own judgment of what's working well and worth preserving, **and** what isn't (friction or risk). Neither side substitutes for the other: a strength list with nothing named wrong is as incomplete as a complaint list with nothing named right. Areas can genuinely merge — a solo founder who reviews their own agent's output has no separate review area, and that's a fine, real answer — but say so explicitly rather than letting "review" quietly go unmentioned; a merged area still gets its own two-sided assessment.

## How to ask

Surface what the pre-read suggested first: *"From the commit history it looks like work mostly goes feature-branch → review → merge. Is that how it actually goes, or is there more to it?"*

A good prompt for honesty: *"Walk me through the last piece of work that got merged. What actually happened, in order?"* You'll learn the real workflow from a recent concrete example, not from an abstract description. If agents are part of the team, ask for a second walk specifically: *"Now walk me through the last piece of work an agent handled — what did it do, what did you review, how did it get the context it needed, was anything running in parallel?"* — the same device, aimed at an agent-led change.

For anticipated user workflows: *"Setting stakeholders aside for a moment — at a high level, how do you expect people to actually use this, day to day? Not who they are, just the shape of the use."*

For the two-sided assessment, once the areas are on the table: *"For [area] — what's working well here, worth keeping as-is? And separately, what's the friction or risk?"* Ask both halves explicitly; don't let an answer to one stand in for the other.

You have explicit permission and encouragement to:

- Dig into anything that sounds aspirational rather than actual.
- Ask about exceptions (*"what happens when someone wants to push directly to main?"*).
- Push for the messy parts (*"where does work get stuck?"*) and, just as hard, for the parts worth keeping (*"what would you be upset to lose if we changed this?"*).

What you must not do:

- Accept "we follow standard git flow" without unpacking what that means in practice for this team.
- Reduce the agentic-process walk to a single line if agents are part of the team. This toolset targets agentic-coding work directly; a thin answer here is exactly the gap this sub-step exists to close.
- Skip the second "walk me through" device when agents are part of the team — a human-led example does not stand in for an agent-led one.
- Take "we have no pain points" at face value — every team has friction somewhere; if the user says there isn't any, push gently. Symmetrically, don't take "it's all friction, nothing works" at face value either — every team preserves something on purpose.
- Accept a single pain point as satisfying the assessment, or a list of frictions with nothing named as working well, or a list of strengths with nothing named as friction. Both sides are required, per area.

## Push back when

- The workflow is described in textbook terms ("we follow git-flow"). *"In practice, what does that look like for your last few merges?"*
- The user says there are no pain points, without pausing to think. *"What's the most annoying part of how work currently flows?"*
- Agent involvement is glossed over in one line. *"Which agents or models, doing what specifically? How is their work reviewed and gated? Walk me through the last thing one of them did."*
- Only a human-led example is walked when agents are part of the team. *"That covers a human-led change — walk me through the last agent-led one the same way."*
- Review is described abstractly. *"Who actually reviews what? How long does review usually take?"*
- Anticipated user workflows are skipped, or answered with a stakeholder list instead of a shape of use. *"Not who they are — just, day to day, how do you expect someone to actually use this?"*
- Only one side of the working-well/not-working assessment comes back for an area. *"That's the friction side — what's working well here that you'd want to keep?"* (or the reverse: *"That's what's working — what's the friction or risk alongside it?"*)

## This sub-step is DONE when

- [ ] The end-to-end human-led flow from idea to merged code is captured, walked from a concrete recent example.
- [ ] Branching/merging conventions are described as practised, not as written.
- [ ] If agents are part of the team (per 1.2): each agentic-walk element is individually captured, walked from a concrete recent agent-led example (the same "walk me through" device used for the human-led flow, run a second time) —
  - [ ] what's delegated to agents vs kept human;
  - [ ] which agents or models, and how they were chosen;
  - [ ] how agent work is dispatched, reviewed, and gated;
  - [ ] where humans stay in the loop;
  - [ ] how agents get context;
  - [ ] parallelism and hand-offs.

  If no agents are part of the team, that absence is actively confirmed and the human walk carries the full weight.
- [ ] Anticipated or actual user workflows are captured at context level (the shape of use, not Part 3's stakeholder depth) — or explicitly deferred with a noted reason.
- [ ] For every major process area surfaced (human flow, agentic flow if present, review, release), both what's working well (worth preserving) and what isn't (friction/risk) are captured — a single pain point does not satisfy this, and neither does an unbroken list of strengths or an unbroken list of frictions.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 1.4.

## Output

Append to `quality/strategy.md` under Part 1 (Context):

```markdown
### Current workflows

<how work actually flows from idea to merge — human-led, walked from a concrete example>

<branching and review conventions in practice>

### The agentic process

<the agentic-process walk, walked from a concrete recent agent-led example: what's delegated vs kept human; which agents/models and how chosen; dispatch/review/gating; where humans stay in the loop; how agents get context; parallelism and hand-offs — or "no agents are part of the team" if actively confirmed absent>

### Anticipated user workflows

<the shape of how users are expected to work with the product, at context level>

### What's working, what's friction

**<Area — e.g. human flow>.** Working well: <…>. Friction/risk: <…>.
**<Area — e.g. agentic flow>.** Working well: <…>. Friction/risk: <…>.
**<Area — e.g. review>.** Working well: <…>. Friction/risk: <…>.
**<Area — e.g. release>.** Working well: <…>. Friction/risk: <…>.

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 1.4 (Release workflow)?"*
