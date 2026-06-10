# Sub-step 1.3 — Current workflows

## Goal

Capture how work *actually* flows in this project today — not how the user wants it to flow, not how a methodology textbook says it should, but what actually happens.

## What you need from the previous sub-step

Read sub-steps 1.1 and 1.2 from `quality/strategy.md`. Read the **Docs and metadata** and **Code structure** sections of `quality/pre-read.md` — CI configuration, CONTRIBUTING.md, recent commit patterns may all hint at workflow.

## What to cover

By the end of this sub-step the strategy doc must capture:

1. **How a piece of work moves from idea to merged code.** Who proposes it, who reviews, what gates exist, where work waits.
2. **Branching and merging conventions** as they actually happen (not as a CONTRIBUTING.md might describe in the abstract).
3. **Pain points** — places where work routinely gets stuck, takes longer than expected, or quality slips.
4. **How agents fit in**, if they do — what work is agent-driven, where the human stays in the loop, where review happens.

## How to ask

Surface what the pre-read suggested first: *"From the commit history it looks like work mostly goes feature-branch → review → merge. Is that how it actually goes, or is there more to it?"*

A good prompt for honesty: *"Walk me through the last piece of work that got merged. What actually happened, in order?"* You'll learn the real workflow from a recent concrete example, not from an abstract description.

You have explicit permission and encouragement to:

- Dig into anything that sounds aspirational rather than actual.
- Ask about exceptions ("what happens when someone wants to push directly to main?").
- Push for the messy parts ("where does work get stuck?").

What you must not do:

- Accept "we follow standard git flow" without unpacking what that means in practice for this team.
- Skip the agent integration question if agents are part of the team.
- Take "we have no pain points" at face value — every team has friction somewhere; if the user says there isn't any, push gently.

## Push back when

- The workflow is described in textbook terms ("we follow git-flow"). *"In practice, what does that look like for your last few merges?"*
- The user says there are no pain points, without pausing to think. *"What's the most annoying part of how work currently flows?"*
- Agent involvement is glossed over. *"At which points in this flow do the agents do work, and at which points do humans review?"*
- Review is described abstractly. *"Who actually reviews what? How long does review usually take?"*

## This sub-step is DONE when

- [ ] The end-to-end flow from idea to merged code is captured.
- [ ] Branching/merging conventions are described as practised, not as written.
- [ ] At least one pain point is named, or its absence has been actively confirmed.
- [ ] Agent involvement in the workflow is described, or absence explicitly noted.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 1.4.

## Output

Append to `quality/strategy.md` under Part 1 (Context):

```markdown
### Current workflows

<how work actually flows from idea to merge>

<branching and review conventions in practice>

<pain points and friction>

<agent involvement, if any>

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 1.4 (Release workflow)?"*
