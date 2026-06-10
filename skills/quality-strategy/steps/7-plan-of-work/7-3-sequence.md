# Sub-step 7.3 — Sequence the work

## Goal

Order the classified actions into phases, applying the sequencing principles from the framework. The output is the final plan of work — what to do, in what order, and why.

This is the final content sub-step. After this, the strategy goes to `/quality-strategy-review` for the global audit.

## What you need from the previous sub-step

Read sub-step 7.2's classified action list from `quality/strategy.md`, plus Part 6 (Risk Map) for context on dependencies and impact.

## What to cover

By the end of this sub-step the strategy doc must capture:

1. **The plan of work organised into phases.** Each phase has a name, a one-line purpose, and a list of actions in priority order.
2. **Phase sequencing** following these principles (in this priority order):
   - **Resolve the highest-impact unknowns first.** If you don't know the current state of a critical dimension, find out before doing anything else.
   - **Unblock dependencies.** Some work gates other work. If nothing can be tested until the product is installable, installability is the first action regardless of its dimension rating.
   - **Close the largest gaps in the highest-impact areas.** Once you know where you are, fix the biggest problems in the most important areas.
   - **Group work that resolves multiple risk-map entries.** A single conversation may answer many questions; a single test session may assess multiple dimensions.
   - **Don't work on None-rated items.** By design.
3. **The natural phase shape** — this often falls into:
   - **Phase 0**: Remove blockers (things that prevent other work from happening).
   - **Phase 1**: Resolve critical unknowns (cheapest uncertainty resolution — often conversations and quick investigations).
   - **Phase 2**: Internal testing / first-party use (the team uses the product themselves before anyone external sees it).
   - **Phase 3**: External exposure (sequenced — friendlies before influential users before the public).
   - **Phase 4**: Learning loop (update the strategy with what was learned, feed into the next release).
   - Adapt these to the project; not every plan needs all five.
4. **What's not in this plan** — actions deliberately deferred or excluded, with reasoning.

## How to ask

This is mostly synthesis with user review.

Walk through the actions and propose a phasing. For each phase:

- Name and one-line purpose.
- The actions in the phase, in priority order.
- The reason for the order (which sequencing principle applies).

Ask the user: *"Is this the right phasing? Anything that should move earlier or later?"*

You have explicit permission and encouragement to:

- Push for "what would block everything else?" to surface Phase 0 items.
- Group actions that share a dependency or a single conversation.
- Surface a "don't forget internal testing" phase if the user's plan jumps straight from build to external users.

What you must not do:

- Sequence fixing work before testing or stakeholder work in areas with low confidence on either side. You might fix the wrong thing.
- Treat the plan as immutable. Note that it will evolve as the risk map updates.
- Skip the Phase 0 question — even projects with no obvious blockers benefit from the explicit check.

## Push back when

- Fixing work appears in Phase 1. *"We're still resolving unknowns here — what's the testing or stakeholder work that should come first?"*
- The plan jumps from "build it" to "external users" with no internal testing phase. *"Who tries it first, before users?"*
- The phasing has Phase 0 empty in a project with obvious blockers. *"Is anything actually blocking other work right now?"*
- Actions are sequenced without reference to the risk map's hottest items. *"The risk map flagged X as hottest — where does the action that addresses X sit in the phasing?"*

## This sub-step is DONE when

- [ ] Each action from 7.2 is placed in a phase.
- [ ] Each phase has a name, one-line purpose, and ordered actions.
- [ ] Sequencing follows the principles: unknowns before fixes; blockers before everything; multi-resolving work grouped; None items excluded.
- [ ] Internal testing / first-party use is present as a phase, or its absence is actively justified.
- [ ] What's not in the plan is documented (deferred items, exclusions with reasoning).
- [ ] Actions are at sketch depth (one or two lines each), and the "How this plan gets elaborated" pointer names the follow-on skills this plan actually feeds.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The step-boundary `/contradiction-check` was dispatched on the doc so far (it is the first move of the checkpoint, per SKILL.md) and its scratch file exists at `quality/.scratch/7.3-contradiction-check.md`.
- [ ] The user has run the **step-boundary substantive checkpoint** (see SKILL.md), evaluating the whole step's output (not just this final sub-step), including any rethinks of earlier steps. Explicit, considered confirmation — not silence, not a non-committal response.
- [ ] After confirmation, `/operational-distillation` has been invoked and the TL;DR + triage rubric sit at the top of the strategy, with its scratch file at `quality/.scratch/7.3-operational-distillation.md`.

If any check fails, return to the questioning. After this sub-step passes (and the strategy is distilled), it is feature-complete and goes to `/quality-strategy-review`.

## Output

Append to `quality/strategy.md`, replacing or extending the classified list from 7.2:

```markdown
### Plan of work (phased)

#### Phase 0 — <name>

*Purpose: <one-line>*

1. <action>
2. <action>

#### Phase 1 — <name>

*Purpose: <one-line>*

1. <action>
2. <action>

… (repeat per phase)

### What's not in this plan

<actions deliberately deferred or excluded, with reasoning>

### How this plan gets elaborated

This Part is the strategy-level sketch. <One or two lines pointing onward: testing work is elaborated by `/test-strategy` into `quality/test-strategy.md`; oracle/instrument build items by `/tooling-strategy` into `quality/tooling-strategy.md`. Name only the follow-ons this plan actually feeds — if there are no build items, don't advertise `/tooling-strategy`.>

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise the phased plan back to the user in 5–7 lines, then **run the substantive checkpoint** (see SKILL.md → Substantive checkpoint between sub-steps): this is the last chance to catch a smell while we're still writing, before the strategy is declared content-complete and goes to the review. Actively invite vague unease — anything that feels off, anything the user suspects they'd regret six months from now. Only after explicit, considered confirmation is the strategy content-complete.

### Then distill, then review

Two closing moves (see SKILL.md → "Final step: distill, then review"):

1. **Distill.** Invoke `/operational-distillation` on the completed strategy. It reads the whole doc and inserts an Operational TL;DR (6–10 lines) + a one-page triage rubric at the top (above the `## Strategy job` paragraph), so a returning reader re-orients fast. It writes its scratch file at `quality/.scratch/7.3-operational-distillation.md`. The distillation is a faithful view of the body — it adds nothing the body doesn't already say.

2. **Review.** Then tell the user:

   > The strategy is content-complete and distilled. The next step is `/quality-strategy-review`, which first runs a contextual-fit gate (adapting severity to the strategy's job), then runs mechanical checks as a backstop and applies the seven indicators with creative depth. Want to run the review now, or take a break and come back?
