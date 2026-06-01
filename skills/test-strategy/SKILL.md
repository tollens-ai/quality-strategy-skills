---
name: test-strategy
description: Produce or revise a test strategy for a project — an engineering-level companion to the quality strategy that defines what to investigate, in what order, and how human and agent effort should be allocated. Use after `/quality-strategy` has produced `quality/strategy.md`, when planning a release, or when test work is being decided ad hoc.
---

# Test Strategy

This skill produces `quality/test-strategy.md` — an engineering-level document that operationalises the quality strategy. The quality strategy says *what matters*; the test strategy says *how to find out where you actually are*, so the team can close the gap as efficiently as possible.

The skill is short by design. /quality-strategy is the load-bearing piece — it produces the stakeholder analysis, dimensions, and risk map. /test-strategy transforms that into a plan of investigation. Most of the thinking is already in the strategy; the skill brings the right framings to the transformation.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). Every file this skill references — `PHILOSOPHY.md`, `skills/test-strategy/FRAMINGS.md`, `skills/test-strategy/INDICATORS.md`, and the sub-step files under `skills/test-strategy/steps/` — lives under it.
- **PROJECT_DIR** — the absolute path of the project you're building the test strategy for (normally the current working directory; confirm with the user if it's ambiguous).

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them** — both when you Read a file yourself (including the sub-step files) and when you put a path into a subagent brief. The Read tool does no variable expansion and resolves relative paths against the current working directory, not this skill's directory; a dispatched subagent inherits none of your context. So an unsubstituted placeholder or a bare relative path will fail — always pass fully-resolved absolute paths.

## Before you start

Two prerequisites:

1. **`quality/strategy.md` must exist** at the project root, completed at least through Part 6 (Risk Map). If it does not, stop and direct the user to `/quality-strategy` first. The test strategy cannot be derived from nothing — without a risk map, you'd be guessing where to invest effort, which is the opposite of what this skill is for.

2. **Read `$PLUGIN_ROOT/PHILOSOPHY.md`, `$PLUGIN_ROOT/skills/test-strategy/FRAMINGS.md`, and `$PLUGIN_ROOT/skills/test-strategy/INDICATORS.md`.** PHILOSOPHY.md grounds the framework. FRAMINGS.md captures ten framings that counter agent defaults — without these, /test-strategy will drift toward producing a test plan rather than a test strategy. INDICATORS.md captures the five outcome-oriented indicators (Direction / Priority / Sufficiency / Feasibility / Honesty) that the produced strategy will be reviewed against; knowing these up front shapes the work. None of these are optional.

## How this skill is structured

Six sub-steps, each in its own file under `steps/`. Run them strictly in order.

| Sub-step | File | Produces |
|---|---|---|
| 0 — Pre-read | `steps/0-pre-read.md` | A short digest at `quality/test-pre-read.md` covering the strategy's risk map and existing test infrastructure |
| 1 — Purpose | `steps/1-purpose.md` | The opening section of the test strategy — what we're investigating and why |
| 2 — Principles | `steps/2-principles.md` | Six governing principles, stated and confirmed (or deliberately tweaked) |
| 3 — Learning needs | `steps/3-learning-needs.md` | Impact-tiered list of information needs, each with question + methods + exit criterion |
| 3.5 — Tooling & oracle adequacy | invoke `/tooling-adequacy` (separate skill) | Per learning need: is the *instrument* (exercise/observe) and the *oracle* (judge correctness) adequate? Produces build items that gate sub-step 5 |
| 4 — Allocation | `steps/4-allocation.md` | Hypothesis allocation table with confidence column; two-voice exchange between agent and user |
| 5 — Closing | `steps/5-closing.md` | What we're not testing + update protocol (including allocation re-rating) |

## Execution rules

1. **Run sub-steps in order.** Each builds on the previous.
2. **Read one sub-step file at a time.** Don't read N+1 until N is complete.
3. **At the end of each sub-step**, run its DONE checklist. If a check fails, return to the work; do not proceed.
4. **Write output incrementally** to `quality/test-strategy.md`. If a session is interrupted, what's already written is durable.
5. **At the end of sub-step 5**, summarise the whole produced doc back to the user and check for unease before declaring complete. Same substantive-checkpoint pattern as /quality-strategy, but only at the very end — sub-step boundaries get light wrap-ups.

## The four-question frame, and where Q2 runs

This skill works through the four quality questions (introduced in sub-step 1). It is how the team answers **"is what we have actually good?"** (Q3) — by planning the investigation. Doing that honestly requires **Q2 — "how do we know?"** to be settled first: the instruments and oracles that produce a finding must themselves be adequate, or the finding is built on sand.

So after sub-step 3 (learning needs) and before sub-step 4 (allocation), **invoke `/tooling-adequacy`** on the learning-needs list. It assesses, per learning need, whether the *instrument* (to exercise/observe) and the *oracle* (to judge correctness) are adequate, and returns any **build items** — instrument or oracle gaps, including simulated/reference oracles worth constructing. Carry those build items forward to sub-step 5, which marks the affected learning needs as blocked-on-tooling rather than papering over them.

This is a **sealed-context dispatch**: it writes its assessment to `quality/.scratch/3.5-tooling-adequacy.md` as hard evidence the Q2 check ran. `/test-strategy-review` audits for that scratch file — a claimed-but-missing dispatch is a fabrication signal. `quality/.scratch/` is working state, not part of the strategy.

## Pause and resume

This skill is shorter and lighter cognitively than /quality-strategy — most of the heavy thinking lives in the strategy itself. Typically completable in **one or two focused sessions** rather than spread across days. There are no formal stick-together sets. The user can stop anywhere; the doc accumulates incrementally.

If the user asks to take a break, point at the natural seams:

- After sub-step 0 (pre-read complete)
- After sub-step 2 (purpose + principles set)
- After sub-step 3 (learning needs derived)

Sub-steps 3 → 4 are tighter coupled (allocation depends on the learning-needs list being fresh in working memory), so flag a break between them with: *"Allocation depends on the learning-needs list being fresh — want to push through to the end of sub-step 4, or break here and re-orient from the doc on resume?"*

On resumption, detect the state of `quality/test-strategy.md` and resume from the next sub-step.

## Revision mode

If `quality/test-strategy.md` already exists, ask the user:

> I see an existing test strategy. Are we:
> (a) starting fresh and replacing it;
> (b) revisiting specific sub-steps;
> (c) **updating after a test cycle** — re-rating allocation based on what we've learned about costs, updating the risk-map references, refining learning needs in light of findings;
> (d) **starting a new release** — in which case I'll archive to `quality/archive/test-strategy-<release-name>-<YYYY-MM-DD>.md` and produce fresh.

For (c), the most common mode after the first cycle: skip to sub-step 4 (Allocation re-rating) and sub-step 5 (Update protocol). The earlier sub-steps usually carry over with minor edits.

## Honest about uncertainty

This skill's output is a hypothesis, not a final answer. Two areas in particular are expected to be wrong on first pass and to refine over cycles:

- **Allocation.** Nobody — agents or humans — has calibrated intuition for the new cost economics. The first allocation table will have low-confidence rows that need real-world data to refine.
- **Learning-needs prioritisation.** The risk map's confidence ratings are themselves uncertain. If a Tier-1 unknown turns out to be already-known after one quick test, the tiering was wrong. That's fine — that's what the update protocol is for.

The skill makes this uncertainty load-bearing in the doc (confidence columns, "unknown — try and see" tags, explicit re-rating triggers) rather than papering over it.

## Output

- `quality/test-strategy.md` at the project root — the test strategy itself.
- `quality/test-pre-read.md` — the working digest from sub-step 0. Informs but does not become part of the strategy.

## Escalation points — stop and ask the user

- `quality/strategy.md` is missing or incomplete (no risk map). Stop. Direct to `/quality-strategy` first.
- The user wants to skip sub-step 2 (Principles) because "they're obvious." Push back — the principles are load-bearing for sub-steps 3 and 4. They can be tweaked, not skipped.
- The user defers all allocation decisions to the agent ("you decide"). Push back — the two-voice exchange in sub-step 4 needs the user's evidence and judgment, not just the agent's cost estimates. If the user genuinely has no view, surface that as itself a learning need: *"we don't have evidence about what's cheap for humans vs agents on this codebase — that's a calibration item."*
- The user wants to merge the test strategy into `quality/strategy.md` as an appendix. Honour the request, but flag the trade-off: separability supports independent revision (allocation re-rating happens more often than full strategy revision).
