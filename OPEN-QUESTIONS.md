# Open questions

Design decisions made arbitrarily, places we're uncertain, things to test in real-world running. This file is a register — add items as we make calls we're not 100% sure about, revisit after testing.

Each entry: what we did, why we did it, what would change our mind, and how we'd know we got it wrong.

---

## Substantive checkpoint location

**What we did.** Run substantive checkpoint at step boundaries only (end of sub-steps 1.5, 2.1, 3.2, 4.1, 5.5, 6.3, 7.3). Intermediate sub-steps get a light wrap-up.

**Why.** Per-sub-step checkpoint at all 21 sub-steps was creating ceremony fatigue (subagents B/C/D all flagged this in review). The user can't really evaluate intermediate sub-steps in isolation — full evaluation needs the whole step in view.

**What would change our mind.** If users miss real issues at intermediate sub-steps that don't get caught at the step boundary because too much context has accumulated. If users start gaming the step-boundary checkpoint because it's too long.

**How we'd know.** Watch for: post-strategy review surfacing issues that were introduced at sub-step 1.3 but only caught at 5.5; users asking to add their own checkpoint mid-step.

---

## Per-sub-step boilerplate

**What we did.** Kept boilerplate sections (Goal / What you need / What to cover / How to ask / Permissions / Must not do / Push back when / DONE / Output) in every sub-step file. Did not aggressively factor common scaffolding into SKILL.md.

**Why.** Belt-and-braces — repeating instructions in each sub-step makes them less likely to be missed by an agent that doesn't re-read the orchestrator. The cost is verbosity in the user-visible content.

**What would change our mind.** If real-world running shows agents are reliably reading SKILL.md at each sub-step transition, the per-sub-step repetition is wasted. If users complain about reading the same things repeatedly.

**How we'd know.** Watch agent behaviour during a real run — do they reference SKILL.md or do they only use the sub-step file? If the latter, repetition was justified.

---

## Bottom-up "silent" pass in 5.1

**What we did.** Sub-step 5.1's bottom-up candidate generation happens silently before dispatching the subagent. The user sees only the consolidated list.

**Why.** Surfacing the bottom-up list separately would add another user-facing exchange before the subagent's results, lengthening the sub-step. The bottom-up is grounded in already-confirmed material (Parts 1–4), not raw inference.

**What would change our mind.** If users systematically reject the consolidated list because the bottom-up portion was wrong, and they would have caught it earlier if shown separately. Subagent B flagged this as borderline-undermining "interview, don't infer."

**How we'd know.** During real runs, note how often the consolidated list gets significant correction. If high, the bottom-up should be surfaced first.

---

## Pre-read citation check

**What we did.** Required "Pre-read sources are cited in the section's evidence field, naming actual files referenced (not blank, not placeholder)" in every applicable sub-step's DONE checklist.

**Why.** Forces the agent to demonstrate it actually consulted the pre-read, not just claimed to.

**What would change our mind.** Subagent C flagged a fabrication risk — agents under cognitive load might cite plausible-but-fake filenames. If real-world running shows fabricated citations, the check creates false security.

**How we'd know.** Audit a few real strategies — do the cited files exist in the project, and were they actually relevant to the sub-step?

---

## Confidence ratings on Step 1 statements

**What we did.** Step 1 (Context) sub-steps don't ask for confidence ratings on purpose, team, workflows, release workflow, or budget statements. Only assessments (Step 5 ratings, Step 6 levels) carry confidence.

**Why.** Context is descriptive ground truth, not assessment. Confidence-rating descriptive content felt like ceremony.

**What would change our mind.** Subagent B flagged that Step 1 outputs could easily be wrong (stated workflow vs actual workflow; stated budget vs actual). If real-world strategies turn out to have shaky Step 1 foundations that go un-flagged, confidence ratings might earn their keep.

**How we'd know.** Post-strategy review on real projects — do users come back and say "actually our workflow isn't what I described in Step 1"?

---

## "Discussed" lens dropped

**What we did.** Three-lens (Delight / Good Enough / Dealbreaker) instead of Ed's four-lens (Delight / Discussed / Good Enough / Dealbreaker). The "Discussed" slot is captured implicitly via per-sub-step `OPEN QUESTION:` markers.

**Why.** Discussed is a different class of thing (process tracking, not value mapping). Forcing it into a stakeholder-attribute grid felt awkward. The OPEN QUESTION mechanism already captures active debates.

**What would change our mind.** If real strategies end up with no record of the actual debates the team is having about a stakeholder. Or if Ed's evidence elsewhere shows Discussed is genuinely first-class.

**How we'd know.** Compare real strategies to the Tollens alpha doc structure — are the "live debates" being captured equivalently, or are they getting lost?

---

## First-release-only scope

**What we did.** Depth analysis (stakeholders three-lens, dimensions, risk map, plan of work) is for the first release only. Future releases get one-line stakeholder notes in 3.1 and a roadmap entry in 2.1, but no depth.

**Why.** Future-release context is too speculative to do meaningfully upfront. The strategy is rerun in revision mode for each new release.

**What would change our mind.** If running this on multiple consecutive releases shows that revision mode produces strategies that don't hang together across releases — e.g. earlier-release decisions box in later releases in ways nobody anticipated.

**How we'd know.** Run on Tollens alpha now, beta when ready, GA later. See if the across-release coherence holds.

---

## Subagent dispatch from sub-step files

**What we did.** Some sub-steps (0-pre-read, 5.1, /quality-strategy-review) dispatch subagents from inside their instructions. The orchestrator doesn't dispatch them centrally.

**Why.** Each sub-step's subagent is part of the sub-step's work; centralising would split the work artificially.

**What would change our mind.** If agents struggle to dispatch subagents from within sub-step files — e.g. fail to substitute path placeholders, fail to ground subagents adequately, or skip the dispatch entirely.

**How we'd know.** Real run: do subagents actually get dispatched? Do they do the right work?

---

## Agent-stakeholder mandate

**What we did.** Made agent stakeholders the default in 3.1. The no-agent-stakeholders case requires a specific concrete reason; "we don't have any" is not sufficient.

**Why.** New-world default per PHILOSOPHY. The framework explicitly takes the opinionated stance that agents are first-class.

**What would change our mind.** If users with genuinely old-world projects (e.g. air-gapped scientific instruments) feel patronised by the push-back. If the mandate generates noise without signal.

**How we'd know.** Try running on a project with no real agent involvement — does the push-back feel useful or annoying?

---

## Onboarding example

**What we did.** No worked example yet. Plan to add one from a real run.

**Why.** Subagent D flagged this as a UX gap, but adding a synthetic example before we've run for real risks anchoring on something unrepresentative.

**What would change our mind.** If first-time users consistently bail before producing anything because they don't know what they're getting into. The fix is then: produce a worked example from the first real successful run.

---

# /test-strategy — design decisions (pre-implementation)

These are calls made during design discussion before the skill is built. They'll move into the post-implementation section above as we ship and learn.

---

## Six governing principles fixed by default

**What we did.** /test-strategy will state Ed's six governing principles (testing-is-information-acquisition, highest-impact-first, cheapest-resolution-first-within-tier, test-as-the-stakeholder, distinguish-testing-from-checking, automate-repeatable-humanise-judgmental) as the canonical default. The user can deviate, but it requires a deliberate choice with a reason.

**Why.** Same opinionated stance as agent-stakeholders-by-default in /quality-strategy. The principles are framework-derived (CDT lineage via Ed), not project-specific. Re-deriving them per project would just produce the same six with worse phrasing. Stating them up front with a deviation channel is faster and more honest about what the framework commits to.

**What would change our mind.** If real strategies consistently deviate from one or more of the six in ways that suggest the principle was wrong for their context (not just "we didn't think about it"). Or if users feel patronised by being handed principles rather than developing their own.

**How we'd know.** After several real runs, audit which of the six survived unchanged, which got tweaked, which got dropped. If a principle is consistently dropped or replaced, it's not as canonical as we thought.

---

## Tier count not prescribed; pattern is

**What we did.** /test-strategy doesn't fix the tier count of the learning-needs list. It prescribes the pattern (impact-ordered tiers, each item = question + methods + exit criterion, optional reference to risk-map row) and lets the count fall out of the project's risk map.

**Why.** Appendix B's four tiers (Existential / Dealbreaker / Quality-of-experience / Team confidence) emerged from the shape of Tollens' risk map, not from a framework rule. Other projects might naturally tier into 3 or 5. The load-bearing thing is the per-item format and the impact ordering, not the count.

**What would change our mind.** If real strategies converge on the same tier count anyway (in which case prescribing it would save time). Or if the lack of prescribed count produces inconsistent strategies that are hard to compare across projects.

**How we'd know.** After several real runs, look at tier counts. If they cluster around 3-4, prescribing the default is probably useful.

---

## Allocation as hypothesis, not confident table

**What we did.** Sub-step 4 (Allocation) produces a table with a confidence column per row and explicit "unknown — try and see" tags for items where the team genuinely doesn't know. The skill runs a two-voice exchange: agent proposes with reasoning (cost estimates, capability claims, where it expects to fail), user pushes back with evidence and judgment (prior pain, trust, smell), and they reconcile.

**Why.** Nobody — agents or humans — has calibrated intuition for the new cost economics. Treating allocation as a confident table overstates what the team knows. Two perspectives in dialogue surface more than either alone. Confidence column makes the uncertainty load-bearing in the doc.

**What would change our mind.** If the two-voice exchange is noisy or unhelpful (agent over-claims capability, user defers, output ends up wrong by overcommitting to agents). If the confidence column makes users non-committal — they tag everything "low confidence" and never act. If users find the structure confusing relative to a simple table.

**How we'd know.** Audit real strategies after one cycle. Was v1 allocation wrong? If yes, did the confidence column help (people revisit low-confidence rows) or did they ignore it? Did the two-voice exchange produce signal or noise?

---

## Calibration as first-class output

**What we did.** Update-protocol section explicitly includes allocation re-rating after each test cycle, not just risk-map updates. Calibration learnings (e.g. "we need to find out whether agents can do X cheaply on this codebase") are real entries in the learning-needs list when relevant, not a separate phase.

**Why.** The economics of testing is the unifying lens (Ed). Cost structure is project-specific and discoverable only by trying. The strategy must include provisions for its own refinement, especially around allocation. Without this, v1 strategies become frozen and stop reflecting the team's actual cost structure.

**What would change our mind.** If teams produce calibration items too vague to act on ("we need to learn about agent costs"). If the update cycle never happens because the trigger is unclear or feels like ceremony.

**How we'd know.** After one cycle on real projects, did allocation actually get re-rated? Did calibration items produce concrete learnings? Or did they sit unactioned?

---

## Pre-read excludes source code

**What we did.** /test-strategy's pre-read reads `quality/strategy.md` plus a quick inventory of test infrastructure (test/, spec/, .github/workflows/, existing test docs). It explicitly does not read source code.

**Why.** Ed's "testing without seeing the code" — reading source contaminates testing perspective with the builder's mental model. Agents will read source by reflex; the skill needs to actively prevent this. Independence-of-perspective is load-bearing for finding the gaps the builder didn't see.

**What would change our mind.** If real strategies miss obvious risks because the agent didn't have enough technical context (e.g. fails to spot that a learning need is moot because of an obvious code feature). If users push back wanting the agent to be technically grounded.

**How we'd know.** Watch for strategies that propose learning needs that are answerable by reading the code in 30 seconds. If common, the no-source-read rule is too strict.

---

## Output location: `quality/test-strategy.md`

**What we did.** /test-strategy writes to `quality/test-strategy.md` — sibling to `quality/strategy.md`, same directory.

**Why.** Filesystem proximity reflects conceptual coupling (test strategy operationalises quality strategy). Separate files keep them editable independently. Mirrors /quality-strategy's `quality/strategy.md` convention.

**What would change our mind.** If users frequently merge them into a single doc anyway, or treat the test strategy as an appendix to the quality strategy, the separation is fighting the grain.

**How we'd know.** Audit real projects — are people keeping the files separate, or merging?

---

## Single linear flow, no formal pause points

**What we did.** /test-strategy runs as a single linear flow through ~6 sub-steps with no formal stick-together sets or pause-resume protocol. The user can stop anywhere; no special handling.

**Why.** /test-strategy is much shorter than /quality-strategy (5-6 sub-steps vs 21). The pause-resume machinery in /quality-strategy is load-bearing because the work is genuinely exhausting and runs across days. /test-strategy is lighter cognitively — most of the heavy thinking is already in the strategy — so it probably fits in one or two focused sessions. Ceremony for pause/resume there would be wasted overhead.

**What would change our mind.** If real runs reveal /test-strategy actually takes long enough to need pause points (e.g. allocation discussion turns into a multi-day exchange). Or if users want explicit checkpoints for their own pacing.

**How we'd know.** Time real runs. If consistently >30 minutes per session, pause/resume probably earns its keep.

---

## Five indicators of a good test strategy (Direction / Priority / Sufficiency / Feasibility / Honesty)

**What we did.** /test-strategy-review uses five indicators framed around the question *"will executing this strategy move the quality strategy in the right direction with the right priority?"*: **Direction** (every learning need traces to closing a gap or unknown the strategy says matters), **Priority** (Tier 1 addresses highest-impact unknowns; cheap-first within tiers; calibration before entrenchment), **Sufficiency** (every H/M dimension and every Dealbreaker addressed; untouched parts named with reason), **Feasibility** (methods concrete, exit criteria reachable, allocation honest about capability), **Honesty** (uncertainty preserved — calibration items named, confidence varies, non-targets concrete).

**Why.** Earlier draft had seven structural-properties indicators (investigation-shaped / risk-map traceable / honestly tiered / etc.). That framing checks the *shape* of the doc. The right test is forward-looking: does executing it actually move the quality strategy? The five indicators reframe around that outcome — they're about what running the strategy produces, not what the doc reads like.

**What would change our mind.** If five proves too few in practice — e.g. real reviews keep surfacing a pattern of failure that doesn't fit any of the five (suggesting a sixth is hiding in collapsed material). If the indicators turn out to be redundant — e.g. Direction and Sufficiency catch the same things every time. If the forward-simulation lens doesn't actually use the indicators distinctly and reviewers default to a single judgement.

**How we'd know.** After several real reviews, audit which indicator triggered each finding. If one indicator never fires, it's redundant. If most findings cluster outside the five, we're missing one. If reviewers can't tell which indicator a finding belongs to, the categories aren't crisp.

---

## Forward simulation as primary review lens

**What we did.** /test-strategy-review's primary review pass is a forward simulation: *"imagine the team executes this strategy exactly as written; walk what would happen tier by tier; identify points where execution would stall, produce wrong info, finish without moving the strategy, or waste effort on lower-tier work prematurely."* Mechanical oracle checks (every learning need has all 5 fields, allocation has confidence variation, etc.) are run in parallel as a backstop, not the main line.

**Why.** Structural checks alone catch shape problems but miss whether the strategy actually does its job. The strategy can be perfectly-shaped and still misallocated, mistargeted, or impossible to execute. Forward simulation tests the *use* of the strategy, not its appearance. Oracle checks remain valuable as cheap pre-filters that catch obvious gaps before the simulation pass.

**What would change our mind.** If forward simulation produces too much speculative noise (reviewers imagining failures that wouldn't happen). If structural checks consistently catch everything the simulation does, making the simulation redundant. If real reviewers struggle to do a meaningful simulation without too much project context, making the lens unworkable.

**How we'd know.** Audit several real reviews. For each finding, which lens produced it? If forward simulation produces unique findings that the oracle wouldn't catch, it earns its keep. If it just rephrases oracle findings, drop it. If the simulation pass is consistently shorter or thinner than the oracle pass, it's not doing real work.

---

## Sibling reviewer skill, mirroring /quality-strategy-review

**What we did.** Built `/test-strategy-review` as a separate skill, parallel to `/quality-strategy-review`. Located at `skills/test-strategy-review/`. Invoked at the end of `/test-strategy` sub-step 5 and runnable standalone on existing test strategies.

**Why.** Same shape as /quality-strategy keeps the pattern teachable. The reviewer can be invoked cold on someone else's test strategy or an old version. Separation also means the reviewer can evolve independently of the producer skill — review criteria might tighten as we learn what real strategies miss.

**What would change our mind.** If maintenance burden of two skills isn't worth the separability — i.e. the reviewer is only ever invoked from /test-strategy and never standalone, the separation is overhead. If the review criteria turn out to be deeply intertwined with the producer skill's structure such that they can't evolve separately.

**How we'd know.** Track how /test-strategy-review gets invoked over time. If it's never run standalone, fold it into /test-strategy's sub-step 5 substantive checkpoint. If review criteria changes always require parallel changes to /test-strategy itself, the separation isn't real.

---

## Two review subagents (simulation + oracle), not three

**What we did.** /test-strategy-review uses two subagents instead of /quality-strategy-review's three. Subagent A: forward simulation. Subagent B: mechanical oracle. Cross-cutting consistency (strategy ↔ test-strategy alignment) is folded into the simulation pass — checking whether execution moves the strategy *includes* checking that the test strategy and strategy don't contradict each other.

**Why.** /test-strategy is much shorter than /quality-strategy (~900 lines vs ~2800). The expansion-and-collapse pattern still applies, but three subagents is overkill for the smaller surface area. Two distinct lenses (simulation vs oracle) are genuinely different; folding consistency into simulation works because consistency is a precondition for execution producing the right outcome.

**What would change our mind.** If consistency findings are systematically missed by the simulation subagent because it's busy walking the execution. If two subagents produce findings that overlap heavily — suggests the lenses aren't distinct enough. If three would have been the right call all along (e.g. simulation gets too long and benefits from a second perspective).

**How we'd know.** Audit real reviews — does the simulation subagent actually surface consistency issues, or does it skip them? Are the two subagents producing distinct kinds of findings, or duplicating?

---

*Add new items to this file when we make calls under uncertainty. Revisit after each real-world run.*
