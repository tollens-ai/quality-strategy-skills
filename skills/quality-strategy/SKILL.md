---
name: quality-strategy
description: Produce or revise a quality strategy for a project — a business-level document defining who matters, what they value, where the gaps are, and what to do about it. Use when starting a project, planning a major release, or when "quality" is being talked about vaguely.
---

# Quality Strategy

This skill walks a structured interview to produce `quality/strategy.md` — a business-level document defining what success looks like for the project and how to get there. It is grounded in Edmund Pringle's quality framework.

The skill is intentionally long — a serious strategy takes a working day or two of cognitive effort spread across multiple sessions (see README for full context). The work is broken into 21 small sub-steps so progress is legible, the user can pause at any point, and the strategy doc accumulates incrementally — what's already been written is durable across interruptions. Taking longer than expected is signal that real thinking is happening; rushing produces a strategy that looks complete but skipped the substance.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). Every file this skill references — `PHILOSOPHY.md`, the sub-step files under `skills/quality-strategy/steps/`, etc. — lives under it.
- **PROJECT_DIR** — the absolute path of the project you're building the strategy for (normally the current working directory; confirm with the user if it's ambiguous).

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them** — both when you Read a file yourself (including the sub-step files) and when you put a path into a subagent brief. The Read tool does no variable expansion and resolves relative paths against the current working directory, not this skill's directory; a dispatched subagent inherits none of your context. So an unsubstituted placeholder or a bare relative path will fail — always pass fully-resolved absolute paths.

## Before you start

Read `$PLUGIN_ROOT/PHILOSOPHY.md` if you haven't already. The disciplines that recur in every step — interview don't infer; ask rather than guess; record assumptions; understand the why; make confidence visible; push back on vagueness; make non-goals explicit; stay sequential — are non-negotiable and applied throughout.

## Phrasing — adapt, don't recite

You are running a working session as a sharp facilitator would — a useful management consultant, not a robot reading a script. The sub-step files quote example prompts (the *italicised* lines) to show the **intent** of each question and the bar it has to clear. They are illustrations, not lines to read verbatim. Put them in your own words, fitted to *this* user, *this* project, and what they just told you: compress or expand, match the register to a precise expert versus a stuck novice, drop the preamble once rapport is established, follow up harder where an answer came back thin.

What is fixed is the *substance* — the question that must get answered, the check that must pass, the push-back that must happen, the assumption that must be recorded. What is free is the *wording*. So: never skip a substantive question, soften a real check, or drop a required push-back to sound friendlier — but equally, never recite a prompt word-for-word when a more natural phrasing does the same job better. When a sub-step says *"ask X"*, it means *get X answered*, not *utter this exact sentence*. A session that sounds like a person thinking with the user beats one that sounds like a form being read aloud — and the framework's rigour lives in the substance, which adapting the words does not touch.

## The four-question frame and the strategy's job

A quality strategy answers four questions, in order:

1. **What does good look like?** — stakeholder bars, dimensions, required levels (Steps 1–6.1).
2. **How do we know if what we have is good?** — the oracles and instruments by which we'd judge the actual state. This is its own question, not a free rider on Q3.
3. **Is what we have good?** — the actual-state assessment, using the oracles from Q2 (Steps 6.2–6.3).
4. **How do we make it good?** — the plan of work to close gaps (Step 7).

**Q2 is explicit on purpose.** The reliable failure mode is to collapse Q2 into Q3 — to assert an actual level by deferring to whatever signal happens to exist, never asking whether that signal can actually judge the dimension. So during the actual-state pass (sub-step 6.2) this skill invokes **`/oracle-adequacy`**, which interrogates, per dimension, whether the oracle behind its claimed actual is adequate — and turns "no oracle, so it's just Unknown" into a named oracle-build item that seeds the plan of work.

**The strategy's job.** Before the analysis, Step 1 (sub-step 1.1) asks what this strategy is *for, right now*, and records it as a `## Strategy job` paragraph at the top of the doc. The four jobs:

- **Durable production strategy** — active product/release; ongoing quality management; full machinery applies.
- **Pre-implementation strategy** — actuals are mostly unknown; the job is to focus the build and name what evidence the first implementation must produce.
- **Agentic one-shot experiment** — the primary question is whether the docs can steer an agent to a correct, usable artifact with minimal human steering.
- **Lightweight slice / prototype** — many production dimensions should be explicitly **None**, not treated as gaps.

The same framework and the same rigour apply to all four; what differs is the right *output* and the right *severity of review*. `/quality-strategy-review` reads this paragraph first (its contextual-fit gate) and adapts what counts as a blocker accordingly. Project *shape* (solo / team / org; shipped / not-yet / dormant; agent-driven or not) is a separate axis that shapes how questions are *phrased*, not how deep the analysis goes — full project-shape branching is a later phase, but capture shape in Step 1 where it helps phrasing.

**Running without a repo is first-class.** Two of the four jobs — pre-implementation and agentic one-shot — are *normally* run with little or no code to hand, and even a durable-production strategy can be built by a founder or lead who has the project in their head but no repo open. This is a supported, sensible way to use the skill, not a degraded fallback: a quality strategy is most valuable *before* the build, when it can still steer it. When there's no codebase to scan, the pre-read degrades honestly (it says so, and tags what it inferred vs scanned — see sub-step 0), the interview carries the load it always carries, and the closing review judges the strategy against its no-repo job rather than docking it for unknown actuals. Don't apologise for the absence of a repo or treat it as a problem to route around — interview the user as the authority on their own project, record assumptions, and produce the strategy. The only thing a missing repo costs is the pre-read's scan-derived hypotheses; everything load-bearing was always going to be asked, not read.

## Sealed-context dispatch and scratch files

Wherever this skill does substantive analytical work via a subagent — the pre-read (sub-step 0), the dimension scout (5.1), the dimension rating (5.4), the Q2 oracle check (`/oracle-adequacy` at 6.2), the boundary contradiction check (`/contradiction-check`), and the distillation (`/operational-distillation` at 7.3) — the dispatch is **sealed-context**: the subagent sees only what it needs for its piece, not the parent's DONE criteria, not the rubric it will be judged against, not the destination doc's success conditions. The orchestrator's role is **dispatch / collect / reconcile / present**, not to do the analysis itself with the answer key in view. (This is the central v2 principle; full decomposition of the remaining sub-steps into sealed dispatches is tracked as later-phase work — see OPEN-QUESTIONS.)

**Every such dispatch writes a scratch file** at `$PROJECT_DIR/quality/.scratch/<sub-step>-<purpose>.md` recording the real intermediate work it did (e.g. `0-pre-read-*.md`, `5.1-dimension-scout.md`, `5.4-dimension-rating.md`, `6.2-oracle-adequacy.md`, `<boundary>-contradiction-check.md`, `7.3-operational-distillation.md`). This converts "did the orchestrator actually do the work?" from invisible to auditable: `/quality-strategy-review` mechanically checks that every claimed dispatch has its scratch file. A missing scratch file is hard evidence the dispatch didn't happen. `quality/.scratch/` is working state, not part of the strategy — do not treat it as authoritative output, and don't leak its contents into `quality/strategy.md`.

**Process-note leak prevention.** Orchestrator meta-observations about *the skill itself* (an awkward step, a suspected bug, phrasing that didn't land) go to `$PROJECT_DIR/.skill-feedback.md` only — never into `quality/strategy.md`. The strategy doc reads as an authored artifact, not a transcript of the skill running.

The *machinery* of running the skill — dispatch/scratch narration ("Subagent dispatched: …", "[ran 5.4 inline]", "scratch would be `quality/.scratch/…`"), append bookkeeping, sub-step/turn lineage refs ("corrected, turn-23", "split out at 5.2") — likewise has no place in `quality/strategy.md`. **This is cleaned up at review time, not by loading the writing pass with a list of don'ts.** Write the finding or the question; the step-boundary review and the final `/quality-strategy-review` strip any machinery that slipped through (see "Presentation cleanup at review points" below). The reasoning: a producing pass already carrying the real analytical work shouldn't also be juggling a prohibition list — that taxes the work without reliably catching the leak. Catching it where the doc is reviewed is both lighter on the producer and more thorough.

## Scope of this skill — first release only

The depth analysis in this skill (stakeholders, three-lens, non-goals, dimensions, risk map, plan of work) focuses on **one release at a time** — typically the next release the team is about to ship. Future releases are noted briefly during sub-step 2.1 (Roadmap) so the strategy isn't blind to what's coming, but the analysis depth is for the immediate release.

This is deliberate: the context of a release shapes the strategy heavily, and pre-running the deep analysis for releases that haven't yet had their context resolved produces speculation, not strategy. When the team is ready to start a future release, re-invoke the skill in new-release mode (see Revision mode below) to produce a fresh strategy for it. Some sections (team, workflows, roadmap) carry over with incremental updates; others (stakeholders, dimensions, risk map, plan of work) are largely rewritten because the release context has changed.

## How this skill is structured

The work is divided into 7 steps, each with one or more sub-steps. Each sub-step lives in its own file under `steps/`. The full sequence:

| Sub-step | File | Produces |
|---|---|---|
| 0 — Pre-read | `steps/0-pre-read/0-dispatch.md` | Project digest at `quality/pre-read.md` |
| 1.1 Purpose | `steps/1-context/1-1-purpose.md` | Product purpose, immediate goal, longer-term ambition |
| 1.2 Team | `steps/1-context/1-2-team.md` | Roles including agent team members |
| 1.3 Workflows | `steps/1-context/1-3-workflows.md` | How work actually flows |
| 1.4 Release workflow | `steps/1-context/1-4-release-workflow.md` | How releases ship |
| 1.5 Budget | `steps/1-context/1-5-budget.md` | Resources and constraints |
| 2.1 Roadmap | `steps/2-releases/2-1-roadmap.md` | Per-release purposes |
| 3.1 Identify stakeholders | `steps/3-stakeholders/3-1-identify.md` | Who matters per release |
| 3.2 Three-lens analysis | `steps/3-stakeholders/3-2-three-lens.md` | Delight / Good Enough / Dealbreaker per stakeholder |
| 4.1 Non-goals | `steps/4-non-goals/4-1-non-goals.md` | Explicit exclusions per release |
| 5.1 Dimension inventory (raw) | `steps/5-dimensions/5-1-inventory.md` | Bottom-up + top-down (subagent) + reconcile → raw consolidated inventory |
| 5.2 Unpack pass | `steps/5-dimensions/5-2-unpack.md` | Split composite dimensions into sub-dimensions where priorities differ |
| 5.3 Old/new-world pass | `steps/5-dimensions/5-3-old-new-world.md` | Split trap dimensions where the audience (human vs agent) changes the rating |
| 5.4 Rate dimensions | `steps/5-dimensions/5-4-rate.md` | Mechanical-anchor impact rating (H/M/None) per dimension — per-stakeholder via a sealed dispatch, then merged; no L (L-style aware-but-not-investing is a Step 7 decision) |
| 5.5 Sanity checks | `steps/5-dimensions/5-5-checks.md` | Distribution, stakeholder coverage, tensions, non-goal alignment |
| 6.1 Required levels | `steps/6-risk-map/6-1-required.md` | What level is needed for each H/M dimension |
| 6.2 Actual levels | `steps/6-risk-map/6-2-actual.md` | Where we are on each H/M dimension |
| 6.2 — Oracle adequacy (Q2) | invoke `/oracle-adequacy` (separate skill) | Per dimension: is the *oracle* that judges its actual level adequate? Produces oracle-build items that seed Step 7 |
| 6.3 Gap and confidence | `steps/6-risk-map/6-3-gap-and-confidence.md` | The risk map combining required + actual + confidence on both sides |
| 7.1 Derive actions | `steps/7-plan-of-work/7-1-derive.md` | What needs doing, drawn from the risk map |
| 7.2 Classify | `steps/7-plan-of-work/7-2-classify.md` | Each action as testing / stakeholder / fixing |
| 7.3 Sequence | `steps/7-plan-of-work/7-3-sequence.md` | Phasing and dependencies |
| 7.3 — Operational distillation | invoke `/operational-distillation` (separate skill) | TL;DR + triage rubric placed at the top of the strategy |

## Execution rules — non-negotiable

1. **Execute the sub-steps strictly in order.** Later sub-steps depend on earlier ones.

2. **Read one sub-step file at a time.** Do not read sub-step *N+1* until you have completed sub-step *N*. Reading multiple sub-step files at once leads to racing through the work and producing a strategy that looks complete but skipped the substance.

3. **For each sub-step:**
   - Read its file.
   - Execute the pre-read, interview, and section-writing as the file directs.
   - Run the **"This sub-step is DONE when"** checklist at the end of the file.
   - If any check fails, return to questioning. Do not proceed.
   - When all checks pass:
     - **At intermediate sub-steps** (1.1–1.4, 3.1, 5.1–5.4, 6.1–6.2, 7.1–7.2), do a light wrap-up: summarise in 2–4 lines and ask *"any quick concerns, or ready to continue?"* Move on at yes.
     - **At step boundaries** (end of sub-steps 1.5, 2.1, 3.2, 4.1, 5.5, 6.3, 7.3), run the **substantive checkpoint** (see below) on the whole step's output. Only proceed after explicit, considered confirmation.
   - Only then read the next sub-step file.

4. **Write output incrementally.** As each sub-step completes, append the relevant section to `quality/strategy.md`. If a session is interrupted, what's already written is durable.

## Substantive checkpoint at step boundaries

This is the single most important user-facing pattern in the skill. The strategy is waterfall — mistakes caught early cost minutes; mistakes caught late cost hours of rework. We need a real engagement gate at each major step transition.

**Where it runs.** At the end of each of the 7 steps — the close of sub-steps **1.5, 2.1, 3.2, 4.1, 5.5, 6.3, 7.3** — not at every sub-step. Per-sub-step transitions get a light wrap-up. The substantive checkpoint runs at step boundaries because that's when:

- The user has a complete chunk of strategy to evaluate (a whole Part of the doc, not a fragment).
- The user can read back the whole step and ask *"does this hang together?"* rather than evaluating a single piece in isolation. Smells about priorities or completeness usually only become visible when you can see the whole step at once — you can't tell if a stakeholder's three lenses are right by looking at one stakeholder; you tell by looking at all of them together.
- Cross-step revisions become tractable. Doing later steps often surfaces things that change earlier steps' answers (e.g. while doing dimensions in Step 5, you realise a stakeholder's bar from Step 3 was wrong). The step-boundary checkpoint is when that gets acted on.

### The pattern at each step boundary

0. **Run the contradiction check first (sealed dispatch).** Before summarising, dispatch **`/contradiction-check`** as a sealed-context subagent on the doc *as written so far*. It mechanically cross-references the Parts for internal contradictions — a Part-3 dealbreaker a Part-4 non-goal excludes, an H/M dimension with no risk-map row, a high-confidence actual whose evidence is "none yet". This is a *different* failure mode from the substantive checkpoint below: the checkpoint catches "this feels wrong to me" (human, by feel); the contradiction check catches "Part X denies what Part Y asserts" (mechanical, by cross-reference). Fold any contradictions it returns into the summary so the user sees them at the checkpoint. The dispatch writes its scratch file (see "Sealed-context dispatch and scratch files"). A clean result is a real result — say so and move on.

0b. **Strip presentation leakage from this step's Part(s).** Re-read the section(s) this step just appended to `quality/strategy.md` and remove machinery that isn't strategy — see "Presentation cleanup at review points" below for the patterns. This is review-time cleanup of the freshly-written Part, the per-subsection counterpart to the final whole-doc review.

1. Summarise the *whole step's* output back to the user in 5–8 lines, hitting the consequential decisions across all sub-steps in the step — plus any contradictions the check surfaced. Not a recap of process — a recap of decisions.

2. Run the substantive checkpoint:

   > *"Take a real moment to read this back. We've completed [Step name]. Is anything off — even if you can't articulate why? Anything that gives you a weird feeling? Anything in earlier steps that, in light of this work, you now think is wrong? Even vague unease is worth surfacing. Catching it now is cheap; catching it later costs hours of rework."*

   **Adapt the register to the user.** When the user has been giving precise, articulate, complete answers — an expert who knows their domain — the open "any vague unease even if you can't name it?" prompt reads as a tic. Prefer the *targeted* form as the default: name the one place you most expect to be wrong and why, and ask them to test it — e.g. *"Here's the one place I'd bet this is most likely wrong, and why: <…> — does that hold?"* Reserve the open-unease phrasing above for users who are visibly uncertain or inarticulate. This is a change of phrasing only — the checkpoint itself still runs at every step boundary and still does the same work.

3. **Wait for the user's response.** Treat any of the following as signals to dig in, *not* as confirmation:
   - "I think so."
   - "Looks fine I guess."
   - Silence.
   - "Yeah, sure."
   - Any hesitation or non-committal response.

   Honest follow-up: *"What's making it 'I guess' rather than 'yes'? Even a vague feeling is worth investigating — that's a smell, and smells are signal."*

4. **If the user surfaces something**, treat it as a finding:
   - **Articulable concern about this step** — address it now. Re-do the relevant sub-step.
   - **Articulable concern about an earlier step** — surface explicitly: *"That's about [earlier step]. Want to revisit that section before continuing? Or note as `OPEN QUESTION` and keep going?"* Cross-step revision is first-class, not a failure.
   - **Vague unease, can't articulate** — investigate together. Probing questions: *"What part of the section draws your eye?" "If you imagine this strategy in six months, where would the regret most likely come from?" "What's the closest you can get to naming it?"* Either it resolves and the section is corrected, or it remains as `OPEN QUESTION:` with the user's explicit acknowledgement that we're proceeding with that risk visible.

5. **Only move on after explicit, considered confirmation** — not silence, not a non-committal response, not a polite "yes" with hesitation behind it.

### Per-sub-step (intermediate) wrap-up

At the end of intermediate sub-steps (1.1–1.4, 3.1, 5.1–5.4, 6.1–6.2, 7.1–7.2), do a **light wrap-up only**: summarise back in 2–4 lines, ask *"Any quick concerns, or ready to continue?"* — get a yes, move on. Save the deep engagement for the step boundary. The user can't really evaluate intermediate sub-steps in isolation anyway — full evaluation needs the whole step in view.

While you're here, give the sub-section you just appended a quick presentation-leakage scan (see below) — it's cheaper to strip a stray "scratch would be…" line now than to find a Part full of them at the step boundary. Keep this light; the thorough pass is the step-boundary one.

## Presentation cleanup at review points

The strategy doc should read as an authored artifact — the *findings and decisions*, not a transcript of the skill's machinery producing them. Rather than burden the writing pass with a prohibition list (which taxes the real analytical work and still misses leaks), the cleanup happens **at review time**, on text already written, where it's both lighter and more reliable. Three review surfaces share the job:

- **Intermediate sub-step wrap-ups** — a light scan of the one sub-section just written.
- **Step boundaries** — a thorough scan of the whole Part this step produced (item 0b in the pattern above), before you summarise it back.
- **The final `/quality-strategy-review`** — its check 21 is the whole-doc backstop for anything the per-Part passes missed.

At each, re-read the target text and strip these machinery patterns — keep the finding, drop the narration:

- **Dispatch / scratch narration** — "Subagent dispatched: …", "[ran 5.4 dimension-rating inline]", "scratch would be `quality/.scratch/…`". The reader sees the dimension rating, not that a subagent produced it.
- **Append / orchestration bookkeeping** — "I'll hold off appending Part 4 until the user confirms", "now writing this to the doc". Do it silently.
- **Sub-step / turn lineage references** — "corrected, turn-23", "split out at 5.2", "(pulled out of non-goals at turn 16)", "the turn-22 binding test". The strategy carries no turn refs or provenance; it reads as settled content.
- **Inferred-as-scanned pre-read lines** — a "no audited gem detected" / "no `.github/workflows` found" written as if a scan ran when no code was actually read. Rephrase to the honest form the pre-read uses ("not yet established — confirm in interview") or cite the interview honestly. (This is the review-side companion to sub-step 0's honest-degradation rule.)

This is *presentation* cleanup only. It changes nothing about what work runs or which scratch files get written — every sealed dispatch still executes and still writes its scratch file, which `/quality-strategy-review`'s scratch-file audit reads on disk. What changes is only what lands in the doc.

## Initial pre-read

Before reading sub-step 1.1, run sub-step 0 (`steps/0-pre-read/0-dispatch.md`). It dispatches a subagent that reads the project and produces a structured digest at `quality/pre-read.md`. Subsequent sub-steps reference the digest as starting hypothesis material so the main agent does not have to load the whole project into its own context window.

## Pause and resume

The work is cognitively demanding — the user will need breaks, not just want them. Be **opinionated** about where to take them: some sub-steps belong tightly together and breaking between them costs working memory; others are natural seams. If a user is trying to push through past 90 minutes of intense thinking, surface that the work degrades when fatigued and recommend a break — better to resume fresh tomorrow than ship a sloppy step today.

### Stick-together sets — keep going, do not suggest `/clear`

These sub-step sequences depend heavily on the user's live working memory from the previous sub-step. The strategy doc captures the artefact, but not the live discussion (which stakeholder felt thin, which trade-off was surfaced, which dimension nearly got dropped). Breaking in the middle forces the next sub-step to re-orient from cold doc — losing real signal.

- **3.1 → 3.2** — stakeholder identification flows into three-lens. The discussion about who matters and why is the working memory for the lens analysis.
- **5.1 → 5.2 → 5.3** — the inventory evolves through unpack and old/new-world. The user's mental model of the dimensions accumulates across all three.
- **6.1 → 6.2 → 6.3** — required, actual, gap. Each H/M dimension should stay fresh across all three; jumping between dimensions while context is cold loses precision.

When the user is partway through a stick-together set, do not suggest `/clear`. If they ask to take a break, tell them: *"This sub-step is part of a tight sequence with the next — we'd lose some working memory if we broke here. Want to push through to [end of set], or take a longer break before starting fresh?"* Let them choose; just be explicit about the cost.

### Natural break points — recommend `/clear` here

After any of these, the conversation is at a natural seam and `/clear` loses nothing important (the strategy doc + pre-read digest are the source of truth):

- After sub-step 0 (pre-read)
- After Step 1 (after 1.5)
- After Step 2 (after 2.1)
- After Step 3 (after 3.2)
- After Step 4 (after 4.1)
- After 5.3 (inventory complete)
- After 5.5 (Step 5 complete)
- After Step 6 (after 6.3)
- After Step 7 (before review)

At each of these natural break points, **proactively suggest `/clear`** rather than waiting for the user to notice the conversation is long: *"That's a natural break point. The strategy doc captures everything we've agreed; if you'd like to take a break or do this in another session, this is a good place to `/clear` and resume."* Don't make the user notice and ask.

### Step 5 specifically

Step 5 is the longest single step (five sub-steps, with 5.1–5.3 stick-together). Before starting 5.1, check in: *"Step 5 (Quality Dimensions) is the longest step — five sub-steps, three of which (5.1–5.3) work best done in one session. If you're tight on time, this is a good place to take a break first."*

### Resumption

On re-invocation, detect the state of `quality/strategy.md`. If a partial strategy exists:

- Read the existing doc to determine the last completed sub-step.
- Tell the user: *"I see a partial strategy. Last completed: sub-step X.Y. Want to resume from X.Y+1, or revisit something earlier first?"*
- If the user is resuming into the middle of a stick-together set (e.g. they completed 5.1 in the prior session and are now resuming at 5.2), name it: *"Note that 5.2 is part of a stick-together set with 5.1 and 5.3 — re-orient from the inventory in `quality/strategy.md` before we start to recover the working memory."*
- Resume from the user's chosen sub-step.

### Within a sub-step

"Let me come back to that" is allowed. Record the deferred item as `OPEN QUESTION: <one-line description>` in the relevant section of the strategy doc. The sub-step's DONE checklist tolerates flagged-as-deferred items, as long as they are explicitly recorded. The final review skill will surface all open questions across the strategy.

## Revision mode

If `quality/strategy.md` already exists at full length (i.e. all sub-steps were completed in a prior session), ask the user before doing anything else:

> I see a complete strategy. Are we:
> (a) starting fresh and replacing it;
> (b) revisiting specific sections of the current strategy;
> (c) doing a full re-walk of the current strategy, using the existing content as starting hypothesis;
> (d) **starting a new release** — in which case I'll archive the current strategy to `quality/archive/strategy-<release-name>-<YYYY-MM-DD>.md` and produce a fresh one for the new release?

- For (a), proceed normally; the existing file will be overwritten as you go.
- For (b), ask which sub-steps; jump to those, skip the rest.
- For (c), proceed through all sub-steps but reference the existing content as starting hypothesis rather than starting from scratch.
- For (d) — **new-release mode** — archive the current strategy first, then walk all sub-steps. Sub-steps that change less between releases (1.1 Purpose, 1.2 Team, 1.3 Workflows, 1.4 Release workflow, 1.5 Budget, 2.1 Roadmap) should pre-load the archived prior version's section as starting hypothesis and ask "what's changed?". Sub-steps that change more (3.1, 3.2, 4.1, 5.x, 6.x, 7.x) start more or less from scratch because the release context is fundamentally different.

## Final step: distill, then review

After sub-step 7.3 is complete and the content is confirmed, two closing moves:

1. **Distill.** Invoke `/operational-distillation` on the produced doc. It reads the whole strategy and inserts an Operational TL;DR (6–10 lines) plus a one-page triage rubric at the top, so a returning reader re-orients in seconds. The distillation is a *view* of the body, not a second source of truth — if they disagree, the body wins. (Sub-step 7.3 prompts this.)

2. **Review.** Invoke `/quality-strategy-review` on the produced doc. The review skill is the source of truth for "is this strategy any good" — it first runs a **contextual-fit gate** (reading the `## Strategy job` paragraph and adapting severity to the strategy's job), then applies the seven indicators and runs mechanical oracle checks (missing non-goals; all-High dimension ratings; percentage confidences; missing three-lens entries; missing scratch files for claimed dispatches; etc.).

If the review surfaces failures, return to the relevant sub-step(s) and re-do. The strategy is not done until the review passes.

Once it passes, point the user to **`/test-strategy`** as the explicit next step — the engineering-level companion that operationalises this strategy, defining what to investigate, in what order, and how human and agent effort should be allocated. The risk map and plan of work you just produced are its direct inputs. Name it and offer it so the user knows where to go next.

## Escalation points — stop and ask the user

Pause the skill and surface a question (rather than push through) when:

- The user cannot identify any clear stakeholders. Strategy is impossible without this.
- The user gives contradictory answers across sub-steps. Surface the contradiction; do not paper over it.
- The budget or timeline does not match the ambition. Make the mismatch explicit; let the user decide.
- "Everything is critical" — the user resists naming non-goals. Push: *"What would you cut if you had half the time?"*
- You catch yourself filling in an answer the user has not given. Stop. Ask. Record the assumption explicitly if you must proceed.

## Output

- `quality/strategy.md` at the project root — the strategy itself. Visible, top-level, meant to be read. Opens with the Operational TL;DR + triage rubric (from `/operational-distillation`) and the `## Strategy job` paragraph.
- `quality/pre-read.md` — the project digest produced by sub-step 0. Working artefact; informs but does not become part of the strategy.
- `quality/.scratch/<sub-step>-<purpose>.md` — sealed-dispatch scratch files (one per subagent dispatch). Working state, audited by `/quality-strategy-review`; not part of the strategy.
