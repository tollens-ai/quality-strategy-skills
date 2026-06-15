---
name: test-strategy
description: Produce or revise a test strategy for a project — an engineering-level companion to the quality strategy that defines what to investigate, in what order, and how human and agent effort should be allocated. Use after `/quality-strategy` has produced `quality/strategy.md`, when planning a release, or when test work is being decided ad hoc.
---

# Test Strategy

This skill produces `quality/test-strategy.md` — the engineering companion to the quality strategy. The quality strategy says *what matters*; the test strategy says *how to find out where you actually are*, so the team can close the gap as efficiently as possible.

The skill is short by design. /quality-strategy does the heavy lifting — it produces the stakeholder analysis, dimensions, and risk map. /test-strategy turns that into a plan of investigation. Most of the thinking is already in the strategy; this skill's job is to bring the right framings to that step.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). Every file this skill references — `PHILOSOPHY.md`, `skills/test-strategy/FRAMINGS.md`, `skills/test-strategy/INDICATORS.md`, and the sub-step files under `skills/test-strategy/steps/` — lives under it, as does `.claude-plugin/plugin.json`, whose `version` field stamps the generated test strategy (see sub-step 1).
- **PROJECT_DIR** — the absolute path of the project you're building the test strategy for (normally the current working directory; confirm with the user if it's ambiguous).

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them** — both when you Read a file yourself (including the sub-step files) and when you put a path into a subagent brief. The Read tool does not expand variables, and it resolves relative paths against the current working directory, not this skill's directory. A dispatched subagent inherits none of your context. So an unsubstituted placeholder or a bare relative path will fail — always pass fully resolved absolute paths.

## Before you start

Two prerequisites:

1. **`quality/strategy.md` must exist** at the project root, completed at least through Part 6 (Risk Map). If it does not, stop and direct the user to `/quality-strategy` first. You can't build a test strategy from nothing — without a risk map, you'd be guessing where to spend effort, which is the opposite of what this skill is for.

2. **Read `$PLUGIN_ROOT/PHILOSOPHY.md`, `$PLUGIN_ROOT/skills/test-strategy/FRAMINGS.md`, and `$PLUGIN_ROOT/skills/test-strategy/INDICATORS.md`.** PHILOSOPHY.md explains the thinking behind the framework. FRAMINGS.md holds eleven framings that counter agent defaults — without them, /test-strategy will drift toward producing a test plan rather than a test strategy. INDICATORS.md lists the five indicators (Direction / Priority / Sufficiency / Feasibility / Honesty) the finished strategy will be reviewed against; knowing them up front shapes the work. None of these are optional.

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
6. **Every sub-step wrap-up carries a progress line and a visible exit.** One line of where-we-are with relative sizes (*"that was learning needs — the longest part; allocation is about half that, then a short closing"*), and one line of what the user keeps if they stop here (the doc is useful part-done; resume is supported). The user should never feel the work is unbounded. This is also where the boundary commit lands if the user chose commit-as-we-go at session start.

## Session start — itinerary and commit cadence

Two moves at the start of every working session (first or resumed), before the next sub-step's work:

**Give the itinerary, in plain words.** The stops, by human name, with what each produces for the user and rough relative sizes. For example: *"A quick pre-read; a short purpose section; the principles that govern the testing (short); learning needs — the heart of it and the longest part: the questions worth answering, in priority order — closed by a check that we can actually answer them (and what we'd have to build where we can't); allocation — who does what, human or agent; and a short closing. Most of the thinking is already in your quality strategy, so this is one or two focused sessions."* On resumption the itinerary doubles as re-orientation: what's done, what remains.

**Ask the commit-cadence question (git-managed projects).** Where `$PROJECT_DIR` is git-managed, ask once: *"Want me to commit at each sub-step boundary, commit everything at the end, or leave the commits to you?"* Suggest commit-as-we-go as the default — rollback stays cheap and each boundary commit doubles as visible progress. Honour the answer at every boundary; don't drift. Record the choice in `quality/.scratch/commit-cadence.md` so it survives `/clear`: a resumed session reads it and restates the standing choice in one line instead of re-asking, and re-asks only if the note is missing.

## The weight traces to the user's goals

Same heaviness rule as `/quality-strategy` → "Heavy only where it serves the user's goals": the process may be demanding only where the user can see the weight serving their own stated goals. Structurally most of this skill already traces — every learning need cites a risk-map row (the Direction indicator) — but the trace must be **user-visible**, not just documented:

- **Frame every why in the user's own words.** *"We're investigating X because your risk map says the actual is unknown and [stakeholder]'s dealbreaker sits on it"* — not *"the framework requires an exit criterion."*
- **Pruning rule.** A learning need, method, or check that traces to no stated goal or risk-map row is spurious weight — cut it, or challenge whether the risk map is missing a goal. (The standing fresh-eyes defect recon is not prunable under this rule: its trace is every stated dealbreaker at once — unnamed defects threaten all of them. Sub-step 3 records the user's reason if they drop it.)
- **The honest fork on resistance.** When the user pushes back on a goal-justified item, show the trace, then offer the fork: be convinced it matters for the goal, or revise the goal (re-rate the row it traces to). Both outcomes are legitimate; record whichever happens.

This sharpens the skill's substantive refusals rather than softening them: the things it refuses to skip — the principles, the two-voice allocation exchange — are what keep the learning needs traceable to the user's goals at all. When a user balks at one of those, that is the trace to show.

## The four-question frame, and where Q2 runs

This skill works through the four quality questions (introduced in sub-step 1). It is how the team answers **"is what we have actually good?"** (Q3) — by planning the investigation. To do that honestly, you must settle **Q2 — "how do we know?"** first: the instrument (the thing that exercises and observes the product) and the oracle (the thing that judges whether output is correct) behind a finding must themselves be adequate, or the finding is built on sand.

So after sub-step 3 (learning needs) and before sub-step 4 (allocation), **invoke `/tooling-adequacy`** on the learning-needs list. For each learning need, it checks whether the *instrument* (to exercise/observe) and the *oracle* (to judge correctness) are adequate, and returns any **build items** — instrument or oracle gaps, including simulated/reference oracles worth building. Carry those build items forward to sub-step 5, which marks the affected learning needs as blocked-on-tooling rather than papering over them. If the build items dominate the top tier, sub-step 3's closing offers pausing for `/tooling-strategy` before allocation (see `steps/3-learning-needs.md`) — Q2 before Q3.

This is a **sealed-context dispatch**: it writes its assessment to `quality/.scratch/3.5-tooling-adequacy.md` as hard evidence the Q2 check ran. `/test-strategy-review` audits for that scratch file — a claimed-but-missing dispatch is a fabrication signal. `quality/.scratch/` is working state, not part of the strategy.

## Pause and resume

This skill is shorter and lighter than /quality-strategy — most of the heavy thinking lives in the strategy itself. You can usually finish it in **one or two focused sessions** rather than spreading it across days. There are no formal stick-together sets. The user can stop anywhere; the doc builds up as you go.

If the user asks to take a break, point at the natural seams:

- After sub-step 0 (pre-read complete)
- After sub-step 2 (purpose + principles set)
- After sub-step 3 (learning needs derived)

At any of these it's safe to `/clear` — and say how to resume in the same breath, so resuming is stated, never guessed: *"safe to `/clear` here; to pick up, just run `/test-strategy` again — it reads `quality/test-strategy.md` (and the quality strategy it builds on) and resumes from the next sub-step."* The user shouldn't have to gamble that re-running the skill works.

Sub-steps 3 → 4 are more tightly coupled (allocation depends on the learning-needs list being fresh in working memory), so flag a break between them with: *"Allocation depends on the learning-needs list being fresh — want to push through to the end of sub-step 4, or break here and re-orient from the doc on resume?"*

On resumption, detect the state of `quality/test-strategy.md` and resume from the next sub-step.

## Revision mode

If `quality/test-strategy.md` already exists, ask the user:

> I see an existing test strategy. Are we:
> (a) starting fresh and replacing it;
> (b) revisiting specific sub-steps;
> (c) **updating after a test cycle** — re-rating allocation based on what we've learned about costs, updating the risk-map references, refining learning needs in light of findings;
> (d) **starting a new release** — in which case I'll archive to `quality/archive/test-strategy-<release-name>-<YYYY-MM-DD>.md` and produce fresh.

**Archive first — whatever the answer.** Before changing a word, snapshot the current doc to `quality/archive/test-strategy-<last-updated-date>.md` (path (d) uses its release-name form above). If that filename is already taken, suffix `-2`, `-3`, … — never overwrite an archive. Never silently rewrite history: the archive leaves a before/after trail the user can compare and share, and `/test-strategy-review` diffs against it when it reviews the update. Mention the archive in your closing summary. One exception: re-entering the skill to fix blockers from a `/test-strategy-review` of this same, not-yet-done strategy is the tail of the same writing session, not a revision — don't archive again.

**Refresh the header stamp on any update.** An update is generated by *this* version of the skill, so update the header's `Last updated` date **and** re-resolve the version stamp from `$PLUGIN_ROOT/.claude-plugin/plugin.json` (the prior version's stamp is preserved in the archived snapshot). The live doc always names the version that last touched it, so a bug report traces to the right code.

For (c), the most common mode after the first cycle: skip to sub-step 4 (Allocation re-rating) and sub-step 5 (Update protocol). The earlier sub-steps usually carry over with minor edits. Two disciplines keep the update honest — fixing all known problems is not the same as being good now; the gaps have moved since the last cycle:

- **Look back with evidence.** Each Tier-1/2 learning need and low-confidence allocation row from the prior version gets a what-happened verdict: answered (cite the finding), still open, or overtaken by events. "Answered" without the evidence is recorded as *believed answered* at an honest confidence, not closed.
- **Look forward fresh.** Scan what's new since the last cycle — features shipped, stakeholders added, context changed — for learning needs the prior doc could not have known about. New items go through sub-step 3's derivation and tiering before allocation is re-rated; (c) is "skip to sub-step 4" only when the scan comes back empty, and the doc says so when it does. And keep the standing fresh-eyes defect recon (sub-step 3's Pass 3) blind: its agents still must not read this document, prior version included. An update whose only change is closing prior items has verified the past, not assessed the present. When the fresh scan finds something the user never mentioned but their stated bars imply they care about, deliver it as a moment with its trace, not a buried list row (same delivery discipline as `/quality-strategy` → "Deliver revelations as moments").

Record both — the verdicts, and what the scan newly found (or that it credibly found nothing) — in a short `## Since the last cycle` section, so the reader and `/test-strategy-review` can see what the cycle taught without re-deriving it.

## Honest about uncertainty

This skill's output is a hypothesis, not a final answer. Two areas in particular will probably be wrong on the first pass and will improve over cycles:

- **Allocation.** Nobody — agents or humans — has calibrated intuition for the new cost economics. The first allocation table will have low-confidence rows that need real-world data to refine.
- **Learning-needs prioritisation.** The risk map's confidence ratings are themselves uncertain. If a Tier-1 unknown turns out to be already-known after one quick test, the tiering was wrong. That's fine — that's what the update protocol is for.

The doc shows this uncertainty openly (confidence columns, "unknown — try and see" tags, explicit re-rating triggers) rather than papering over it.

## Output

- `quality/test-strategy.md` at the project root — the test strategy itself.
- `quality/test-pre-read.md` — the working digest from sub-step 0. Informs but does not become part of the strategy.

## Escalation points — stop and ask the user

- `quality/strategy.md` is missing or incomplete (no risk map). Stop. Direct to `/quality-strategy` first.
- The user wants to skip sub-step 2 (Principles) because "they're obvious." Push back — the principles are load-bearing for sub-steps 3 and 4. They can be tweaked, not skipped.
- The user defers all allocation decisions to the agent ("you decide"). Push back — the two-voice exchange in sub-step 4 needs the user's evidence and judgment, not just the agent's cost estimates. If the user genuinely has no view, record that as a learning need in its own right: *"we don't have evidence about what's cheap for humans vs agents on this codebase — that's a calibration item."*
- The user wants to merge the test strategy into `quality/strategy.md` as an appendix. Honour the request, but flag the trade-off: a separate file is easier to revise on its own, and allocation re-rating happens far more often than full strategy revision.
