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

**How we'd know.** Compare real strategies to an early real-project strategy's structure — are the "live debates" being captured equivalently, or are they getting lost?

---

## First-release-only scope

**What we did.** Depth analysis (stakeholders three-lens, dimensions, risk map, plan of work) is for the first release only. Future releases get one-line stakeholder notes in 3.1 and a roadmap entry in 2.1, but no depth.

**Why.** Future-release context is too speculative to do meaningfully upfront. The strategy is rerun in revision mode for each new release.

**What would change our mind.** If running this on multiple consecutive releases shows that revision mode produces strategies that don't hang together across releases — e.g. earlier-release decisions box in later releases in ways nobody anticipated.

**How we'd know.** Run on a real project's alpha now, beta when ready, GA later. See if the across-release coherence holds.

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

**Why.** Appendix B's four tiers (Existential / Dealbreaker / Quality-of-experience / Team confidence) emerged from the shape of one real project's risk map, not from a framework rule. Other projects might naturally tier into 3 or 5. The load-bearing thing is the per-item format and the impact ordering, not the count.

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

## Single source of truth for user-facing copy; pointer-style for framework concepts

**What we did.** Established two patterns to control duplication and prevent drift:

- **User-facing copy** (timing expectations, audience description, what skills will/won't do, install instructions) lives canonically in `README.md`. Other files trim to operational essentials and reference README for full context. Example: agent-facing context-setting in `quality-strategy/SKILL.md` says "see README for full context" rather than restating the timing prose.
- **Framework concepts** (framings, principles, indicators) live canonically in `FRAMINGS.md` / `INDICATORS.md` / `PHILOSOPHY.md`. Sub-step files name them inline with a one-line gist (`"FRAMINGS.md #6 — economics shift. [application context for this sub-step]"`) and apply them in the sub-step's specific context. No re-explanation from scratch.
- **Per-sub-step boilerplate** (`## Goal`, `## Output`, `## Push back when` etc.) remains duplicated by intent — see the "Per-sub-step boilerplate" entry above. That decision still stands until real-world testing tells us whether agents reliably re-read SKILL.md at every sub-step boundary.

**Why.** Duplication of agent-facing operational reminders is justified — agents are unreliable at following "open this other file" pointers, and a sub-step file that re-states the relevant framing inline is more robust. Duplication of user-facing copy is just maintenance burden — when the timing claim was 5 places, updating one was easy to forget. The bug was caught in audit, not by users; better to prevent it. The pointer-with-application pattern for framings is already followed in practice (sub-step files name framings rather than re-explaining); this entry just makes the rule explicit.

**What would change our mind.** If real-world running shows agents miss framing references when the sub-step file just points at FRAMINGS.md (i.e. they don't internalise the framing without inline restatement). If we accumulate user-facing copy that genuinely needs to differ across audiences in ways the "single canonical source + pointers" rule can't accommodate. If the pointer-with-application pattern produces sub-step files that are too terse for agents to act on without re-reading FRAMINGS.md.

**How we'd know.** Audit drift after a few iterations. If the same fact appears in 3+ places with diverging wording, the rule isn't being applied. If agents visibly miss framings the sub-step file pointed at (output drifts from the framing's intent), the discipline needs to swing back toward inline restatement. If we never need to update user-facing copy in more than one place, the rule is doing its job.

---

## Two review subagents (simulation + oracle), not three

**What we did.** /test-strategy-review uses two subagents instead of /quality-strategy-review's three. Subagent A: forward simulation. Subagent B: mechanical oracle. Cross-cutting consistency (strategy ↔ test-strategy alignment) is folded into the simulation pass — checking whether execution moves the strategy *includes* checking that the test strategy and strategy don't contradict each other.

**Why.** /test-strategy is much shorter than /quality-strategy (~900 lines vs ~2800). The expansion-and-collapse pattern still applies, but three subagents is overkill for the smaller surface area. Two distinct lenses (simulation vs oracle) are genuinely different; folding consistency into simulation works because consistency is a precondition for execution producing the right outcome.

**What would change our mind.** If consistency findings are systematically missed by the simulation subagent because it's busy walking the execution. If two subagents produce findings that overlap heavily — suggests the lenses aren't distinct enough. If three would have been the right call all along (e.g. simulation gets too long and benefits from a second perspective).

**How we'd know.** Audit real reviews — does the simulation subagent actually surface consistency issues, or does it skip them? Are the two subagents producing distinct kinds of findings, or duplicating?

---

# v2 design decisions (pre-implementation)

These are the design decisions worked out across the May–June 2026 design sessions. They're recorded here so the calls — and their falsification conditions — are visible as v2 ships. Most are locked; the genuinely-open sub-questions are referenced inline below. As each ships and gets real-world tested, it graduates into the post-implementation register at the top of this file.

---

## Modularity reframe — sealed-context subagent dispatches

**What we did.** Decompose the orchestrator's analytical work into sealed-context subagent dispatches. Each subagent sees only what it needs for its piece — not the parent's DONE criteria, not the assessment rubric, not the destination doc, not other subagents' work. The orchestrator's role becomes dispatch / collect / reconcile / present, not analysis. Applies wherever the orchestrator does substantive analysis (dimension rating, evidence audit, contradiction check, etc.).

**Why.** v1's central failure: the orchestrator had the whole context loaded — DONE checklist, the strategy doc, what the next sub-step expected — and that visible destination was the temptation. It produced docs that looked complete while the underlying work (evidence-gathering, real rating) was skipped or confabulated. Removing the destination from the worker's view removes the shortcut. This is *the* governing principle of v2.

**What would change our mind.** If sealed dispatches produce worse analysis because the subagent lacked context it genuinely needed (over-sealing). If dispatch overhead (latency, reconciliation cost) outweighs the integrity gain. If orchestrators confabulate the *reconciliation* step instead — just moving the shortcut up a level.

**How we'd know.** Compare v2 strategies against the four v1 test runs: did the fabricated-dispatch and middle-rating-under-uncertainty patterns actually drop? The scratch-file audit (below) makes the work auditable — check whether dispatched work is real.

---

## Process-note leak prevention

**What we did.** Orchestrator meta-observations about the skill itself (awkward phrasing, a step that didn't fit, a suspected bug) go to `.skill-feedback.md` only — never into the strategy doc. SKILL.md states the rule.

**Why.** v1 runs leaked process commentary into the strategy output, making the doc read as a transcript of the skill running rather than a clean artifact for the team. The strategy should read as if authored, not narrated.

**What would change our mind.** If real strategies still leak meta despite the rule (agents ignore the instruction), suggesting it needs a mechanical catch rather than an honour-system instruction. If separating meta loses in-context signal the user actually wanted in the doc.

**How we'd know.** Audit produced docs for first-person-about-the-skill sentences. If they persist, the instruction isn't enough and a review-side catch is needed.

---

## Sentinel markers at sub-step output boundaries

**What we did.** Every sub-step appends an HTML-comment sentinel at the end of its output (e.g. `<!-- end-of-sub-step-5.4 -->`); the strategy ends with `<!-- end-of-strategy -->`.

**Why.** Two jobs: (a) Edit-tool anchor uniqueness — sub-steps append to a growing doc, and unique end-markers give a reliable insertion point instead of fragile heading matches; (b) mechanical navigability — review skills and the contradiction-check can locate Part boundaries deterministically.

**What would change our mind.** If some renderers surface the comments to users. If a simpler convention (stable, unique headings) proves sufficient for the review skills, making the markers redundant.

**How we'd know.** Check whether the review/contradiction skills actually use the sentinels to navigate, and whether any user reports stray comments in their rendered doc.

---

## Scratch-file audit in reviews

**What we did.** Every claimed subagent dispatch writes a scratch file at `quality/.scratch/<sub-step>-<purpose>.md`. `/quality-strategy-review` and `/test-strategy-review` mechanically check that each claimed dispatch has its scratch file.

**Why.** Converts "did the orchestrator actually do the work?" from invisible to auditable. Directly targets v1's fabricated-dispatch failure — a missing scratch file is hard evidence the dispatch didn't happen.

**What would change our mind.** If orchestrators learn to write empty or fake scratch files to satisfy the check (audit theatre). If `.scratch/` creates confusion about what's authoritative (it's working state, not the strategy).

**How we'd know.** Spot-check scratch files against the strategy content — do they contain real intermediate work, or stubs written to pass the audit?

---

## Silent-drop catch at dimension-inventory consolidation

**What we did.** `/dimension-inventory` consolidation explicitly walks each stakeholder's three-lens entries and confirms every named concern maps to a dimension. A dropped concern is caught at consolidation, not three sub-steps later.

**Why.** v1 lost stakeholder concerns silently during the bottom-up → top-down → reconcile merge; they surfaced (if at all) only in late review. Catching at the moment of consolidation is cheap; catching in review is expensive rework.

**What would change our mind.** If the walk is too mechanical and forces spurious dimensions for concerns that legitimately don't map to one. If drops still happen downstream despite the catch.

**How we'd know.** Audit: does every Part-3 concern trace to a Part-5 dimension in produced strategies? Count drops caught at consolidation vs surfaced in review.

---

## Path resolution + plugin-root grounding

**What we did.** Ship the whole pack as a single Claude Code plugin (`.claude-plugin/plugin.json` names it `quality-strategy`; `.claude-plugin/marketplace.json` lists it with `source: "."`, so the entire repo is the plugin, not the `skills/*` subtree alone). Inside SKILL.md bodies, `${CLAUDE_PLUGIN_ROOT}` expands to the plugin root — i.e. the repo root — so a skill reads shared grounding via `$PLUGIN_ROOT/PHILOSOPHY.md` (one repo-root copy, not duplicated into each skill dir) and cross-skill files via `$PLUGIN_ROOT/skills/<skill>/...` (`FRAMINGS.md`/`INDICATORS.md` live once inside `skills/test-strategy/` and are shared by pointer — the review skills and `/oracle-adequacy` point at them). There is still no `$SKILL_DIR` runtime variable: the design doc's "resolve `$SKILL_DIR`/`$PROJECT_DIR`" is implemented as the orchestrator resolving its own absolute plugin-root path (off `${CLAUDE_PLUGIN_ROOT}`) and the project path once at start, then substituting the literal absolute paths into every subagent brief before dispatch (a sealed subagent can't expand a token it's handed). This resolved to option (b) the earlier text anticipated — a single shared plugin-root grounding copy — rather than per-skill duplication.

**Why.** v1 briefs referenced `<repo>/PHILOSOPHY.md`; `<repo>` never resolved when installed at `~/.claude/skills/`, and PHILOSOPHY.md wasn't even present there. Two failure modes compounded: an unresolved token *and* an absent file. Shipping the repo as one plugin fixes both — `${CLAUDE_PLUGIN_ROOT}` is expanded by Claude Code at load time to a real absolute path, and the grounding files travel with the plugin at known relative locations under that root, so one canonical copy serves every skill.

**What would change our mind.** If a real install fails to expand `${CLAUDE_PLUGIN_ROOT}` in some SKILL.md bodies (so the orchestrator can't read off a usable plugin-root path and substitution breaks). If the shared-grounding-by-pointer model breaks because an install copies only part of the repo (e.g. just `skills/*`), leaving `$PLUGIN_ROOT/PHILOSOPHY.md` or a cross-skill `$PLUGIN_ROOT/skills/<skill>/...` target absent — which would push back toward per-skill duplication.

**How we'd know.** A real plugin install + run of `/quality-strategy` and `/test-strategy` on a workshop repo: confirm `${CLAUDE_PLUGIN_ROOT}` expands, briefs resolve to absolute paths, and every `$PLUGIN_ROOT/...` grounding and cross-skill target is found at its expected location.

---

## Per-stakeholder analysis with an explicit merge step

**What we did.** Dimension rating, required/actual levels, and risk run per-stakeholder first; an explicit merge step then reconciles into one merged strategy. The merge is dialogue, not max-aggregation: convergence → high-confidence aggregate; divergence → surfaced to the user (*"Stakeholder A: H Dealbreaker; Stakeholder B: None — you have one team, what does it commit to?"*).

**Why.** v1 merged across stakeholders too early, producing a single team-voice that hid genuine disagreement. The contested judgement is exactly where user input is most valuable, so it should be explicit, not pre-collapsed.

**What would change our mind.** If stakeholders converge nearly everywhere so the per-stakeholder pass is mostly redundant overhead. If the divergence dialogue is too heavy on real projects (design OQ1: 5 stakeholders × 30 dims could be 30 dialogue points; may need thematic batching).

**How we'd know.** Count divergence points per real run and how often the merge dialogue changed an outcome. If divergence is rare and dialogue rarely changes anything, simplify back toward early merge.

---

## Mechanical anchors at dimension rating; no L at this step

**What we did.** Replace fuzzy ordinal judgement with mechanical anchors, per stakeholder: **H** iff ≥1 stakeholder has this dimension's failure mode as a Dealbreaker (any lens); **M** iff any other bar (Good Enough/Delight) references it and no Dealbreaker; **None** iff no bar at any lens references it. **No L** at rating — "aware but not investing" is a plan-of-work (7.x) decision, not a rating. Rating yields a short pointer rationale (*"H because Family Dealbreaker on data loss, Part 3.2 row 4"*), not a paragraph.

**Why.** v1 drifted to middle ratings under uncertainty and produced three recurring pathologies (state-vs-priority conflation, all-or-no Highs, no Nones). Anchoring rating to stakeholder bars makes it mechanical and auditable. The anchor captures *impact size*; likelihood lives downstream in the risk map, so risk = impact × likelihood emerges from the combination rather than a pre-collapsed single score. Dropping L kills the state-vs-priority drift at its source.

**What would change our mind.** If real projects have dimensions that genuinely need an "aware, not investing now" rating at this step, and pushing it to 7.x loses it. If the Dealbreaker→H rule over-produces Highs on projects with many dealbreakers.

**How we'd know.** Audit rating distributions, and whether 7.x actually captures the de-prioritised-but-known dimensions that L used to hold.

---

## Plan of work is classified-but-unordered

**What we did.** The plan-of-work output is an action list classified by Pringle work-type (testing/stakeholder/fixing), who-drives (human/agent/hybrid/passive), and dependencies (what blocks / what unblocks) — but with **no priority order**. The user prioritises with their own context. `/priority-analysis` exists as an optional standalone for those who want structured help.

**Why.** v1's phased plan looked complete but wasn't operationally useful, and prioritising for the user overstepped — the user has context the skill doesn't (politics, energy, org reasons). A clean classified list is more honest and forecloses an over-engineering temptation (a multi-subagent prioritisation expansion-collapse at this layer).

**What would change our mind.** If users consistently want a default ordering and find the unordered list unhelpful. If the who-drives / dependency tags don't actually change how users sequence.

**How we'd know.** Do users ask for ordering, or prioritise fine from the classified list? Is `/priority-analysis` invoked often (signal the core flow under-serves) or rarely?

---

## Four-question frame; Q2 made explicit

**What we did.** Frame quality strategy as four questions — (1) What is good? (2) How do we know if what we have is good? (3) Is what we have good? (4) How do we make it good? — with **Q2 given its own slot**. `/oracle-adequacy` (for `/quality-strategy`'s actual-state assessment) and `/tooling-adequacy` (for `/test-strategy`'s investigation methods) are the standalone skills that address Q2.

**Why.** Ed's framework collapses Q2 into Q3. In the new world that's dangerous: agents reliably defer to whatever tooling/oracles exist rather than challenge adequacy, so strategies get built on un-interrogated measurement and nobody notices. Making Q2 explicit forces the "is our way of knowing actually adequate?" check.

**What would change our mind.** If Q2 work is almost always trivially "tooling is fine," so the separate slot is ceremony. If users find the four-question framing more confusing than clarifying.

**How we'd know.** On real runs, does Q2 ever flip a dimension to gated/blocked because the oracle was inadequate? If it never bites, it's not earning its slot.

---

## Strategy-job dimension

**What we did.** Each strategy states its job *right now* — durable production / pre-implementation / agentic one-shot / lightweight slice — in a "Strategy job" paragraph at the top. `/quality-strategy` Step 1 asks it; `/quality-strategy-review` adds a contextual-fit gate (Pass 0) that classifies the job and adapts severity (a missing production-observability section is a blocker for a durable strategy, deliberate scope control for a one-shot).

**Why.** The anti-clickbait run showed the review mechanically applying the full production-grade scale to a pre-implementation one-shot — the wrong emphasis. Same framework, different right-output and right-severity per job. Over-enforcing turns quality strategy into ceremony; the framework's spirit is contextual quality.

**What would change our mind.** If the four job categories don't cover real projects (a fifth keeps appearing), or classification is ambiguous so people can't pick. Design OQ2: whether job affects which indicators apply, their severities, or both — current lean is severities only.

**How we'd know.** Classify each real run; check whether the job label actually changed the review's blocker/flag calls in a way that matched user intent.

---

## Project-shape dimension (orthogonal to strategy job)

**What we did.** Capture project shape at Step 1 — solo / small-team / org; released-regularly / continuous-deploy / not-yet-shipped / returning-from-dormant; agent-driven-build / agent-driven-runtime / no-agents — and let it shape how questions are *phrased* and what defaults make sense. Strip enterprise-specific phrasings ("investor patience", "monthly burn", "release cadence") from sub-step files. **Same rigour applied regardless**; depth-of-quality-*work* is project-dependent, quality-first *thinking* is universal.

**Why.** v1 assumed a multi-person-team / scheduled-release / production-product mental model; solo, hobby, agent-driven, dormant and pre-implementation projects all needed orchestrator translation with variable success. Shape is about phrasing and defaults, not lowering the bar — it's legitimate for rigorous analysis to conclude "thin MVP, lots of Nones, correct."

**What would change our mind.** If shape ends up changing analysis *depth* (not just phrasing) in practice. If the enumerated shapes miss common cases. If stripping enterprise phrasing loses useful prompts for the projects that genuinely are enterprise.

**How we'd know.** Run across the shape spectrum (solo hobby → agent-driven → team). Does phrasing adapt without the analysis getting thinner where it shouldn't?

---

## Honest-about-unknowns gating

**What we did.** When `/test-strategy` detects that `/quality-strategy` left tooling/oracle-build items unresolved, it neither refuses, nor warns-and-proceeds, nor writes a separate gating file. It marks the affected section visibly as *blocked* (*"Section X is gated on the oracle for Y being built; rerun after that lands"*), keeping it in the doc as visible content.

**Why.** Refusing is unhelpful; silently proceeding builds on sand; a separate gating file gets lost. Marking-as-blocked keeps the gap visible and assumes user competence. The strategy is honest about its own limits.

**What would change our mind.** If "blocked" sections get ignored and never resolved (so the honesty doesn't drive action), or if users find the markers alarming/confusing rather than clarifying.

**How we'd know.** Track whether blocked sections actually get unblocked on a later run, or just sit. If they sit, the gating needs more teeth.

---

## Named top-level sub-skills require a real standalone use case

**What we did.** A piece of work becomes a top-level discoverable skill only if it is distinct, nameable, extractable, **and** has a real standalone use (someone would invoke it without a full strategy run). Passing: `/oracle-adequacy`, `/tooling-adequacy`, `/operational-distillation`, `/contradiction-check`, `/priority-analysis`, `/feedback-synthesis`, `/pre-read`. Not passing — stay as internal sealed dispatches: stakeholder analysis, dimension inventory/rating, risk map, plan of work, project context, non-goals.

**Why.** Decomposition isn't intrinsically good — it carries discoverability and maintenance cost. The standalone-use test is the discipline that stops over-fragmenting the skill surface while still getting the modularity (sealed-dispatch) benefit internally.

**What would change our mind.** If a "not-passing" internal dispatch turns out to be invoked standalone a lot (promote it), or a promoted skill is never run standalone (demote it to internal).

**How we'd know.** Track standalone invocation counts per extracted skill over time.

---

## /oracle-adequacy and /tooling-adequacy as the Q2 skills

**What we did.** Two standalone top-level skills implement Q2: `/oracle-adequacy` interrogates whether the oracles used for `/quality-strategy`'s actual-state assessment are adequate; `/tooling-adequacy` interrogates whether the investigation methods/tooling for `/test-strategy` are adequate. `/quality-strategy` invokes the former during risk-map actual assessment; `/test-strategy` invokes the latter after learning-needs.

**Why.** See the four-question entry — Q2 needs an explicit owner or it collapses into Q3. Splitting into two matches the two parents (oracles for quality assessment vs tooling for test investigation) and gives each a real standalone use (audit oracles/tooling for an existing codebase).

**What would change our mind.** If the two overlap so heavily they should be one skill, or if Q2 is better handled inline in each parent than as a separate invocation.

**How we'd know.** Do the two produce distinct kinds of findings? Is either run standalone? Does invoking them mid-flow feel like a detour or a genuine gate?

---

## /operational-distillation

**What we did.** A standalone skill (also run at the end of `/quality-strategy`'s plan-of-work) that produces a TL;DR (6–10 lines) + a one-page triage rubric + an optional operator cheat sheet at the top of the strategy.

**Why.** v1 docs were optimised for production-time, not consumption-time — a reader returning had to skim hundreds of lines to re-orient. Distillation turns complete-and-dense into complete-and-operational, serving the "quick re-orientation" and "decision support at the edges" indicators directly.

**What would change our mind.** If the TL;DR drifts from the body and becomes a stale second source of truth. If users ignore it and read the body anyway. Design OQ3: should distillation also run after each major Part as a rolling at-a-glance, not just at the end?

**How we'd know.** Do returning users triage from the TL;DR/rubric, or skip to the body? Does the distillation stay in sync across revisions?

---

## /contradiction-check at step boundaries + standalone

**What we did.** A sealed-dispatch contradiction check runs at each step boundary (before the substantive checkpoint) to catch cross-Part contradictions; it is also a standalone skill for auditing any strategy doc.

**Why.** The substantive checkpoint catches user-feeling-wrong; it misses mechanical doc-internal contradictions (a Part-3 dealbreaker that contradicts a Part-4 non-goal). Different failure modes need different catches. Running at boundaries keeps it cheap and incremental.

**What would change our mind.** If the per-boundary check is noisy (flags non-contradictions) or redundant with the review skill's consistency pass. If contradictions are rare enough that an end-only check suffices.

**How we'd know.** Count real contradictions caught at boundaries vs at final review. If boundaries rarely catch anything, move it to end-only.

---

## /priority-analysis as optional standalone, not core flow

**What we did.** `/priority-analysis` is an optional standalone for structured priority help (per-stakeholder prioritisation lenses, surfacing convergences/divergences). It is deliberately **not** in the core `/quality-strategy` flow, which ends with an unordered classified plan.

**Why.** Follows from "plan of work is classified-but-unordered" — prioritising is the user's call, but some users want help, so the capability exists without forcing it on everyone. Keeping it out of core avoids baking a heavy prioritisation expansion into every run.

**What would change our mind.** If most users want prioritisation help (then it belongs in core, perhaps as an offered step). If nobody discovers it — design OQ4: should `/plan-of-work` mention it at the end?

**How we'd know.** Invocation rate, and whether users who skip it end up mis-prioritising.

---

## /feedback-synthesis as a standalone post-run skill

**What we did.** A standalone skill that curates the run's `.skill-feedback.md` into a design-organised summary for the skill maintainer. Design OQ5: output to the user, to a maintainer file, or both — current lean is both (a short version to the user, a fuller one for the maintainer).

**Why.** The skill pack improves from real-run feedback, but raw `.skill-feedback.md` files are unstructured. A synthesis step makes the maintainer signal usable — and closes the very loop that produced this v2 batch.

**What would change our mind.** If synthesis adds little over reading the raw feedback, or if it's never run because feedback is sporadic.

**How we'd know.** Does synthesised feedback drive skill changes more efficiently than raw files did?

---

## Backwards compatibility is not a concern

**What we did.** v2 is allowed to be a clean break from v1. No migration path is provided for v1-produced strategies. Design OQ6: existing workshop-run strategies were learning runs — let them sit; v2 produces fresh strategies for new projects.

**Why.** v1 was fresh — only the maintainer has used it, and the workshop runs were learning exercises, not durable artifacts a team depends on. Carrying compatibility constraints would tax the redesign for no real beneficiary.

**What would change our mind.** If a v1 strategy turns out to be in active use and worth migrating, or if external users adopted v1 before v2 ships (breaks the "only the maintainer has used it" assumption).

**How we'd know.** Check whether any v1 strategy is being actively maintained or depended on before deleting or breaking anything.

---

## Oracles folded into /tooling-adequacy (vs the planned /oracle-adequacy)

**What we did.** Made oracle adequacy a first-class axis *inside* `/tooling-adequacy` (the Q2 skill for `/test-strategy`): each learning need is assessed for both an adequate instrument (exercise/observe) and an adequate oracle (judge correctness), including constructing simulated/reference oracles. The design doc separately plans `/oracle-adequacy` as the Q2 skill for `/quality-strategy`'s actual-state assessment (Phase 2).

**Why.** For testing you cannot judge tooling adequacy without judging oracle adequacy — a perfect instrument with no oracle answers nothing. Splitting "tooling" and "oracle" into separate skills for the *same* (test) context would fragment one question. Keeping them together also lets the skill kill the old-world "no oracle ⇒ untestable" reflex (FRAMINGS #5) by proposing cheap simulated/reference oracles.

**What would change our mind.** If `/oracle-adequacy` (Phase 2) and `/tooling-adequacy` end up duplicating so much oracle-assessment logic that a single shared skill (parameterised by context) is cleaner. If the name `tooling-adequacy` misleads users into thinking it ignores oracles — a rename might be warranted.

**How we'd know.** When Phase 2 builds `/oracle-adequacy`, check how much of `/tooling-adequacy`'s oracle core it reuses; if near-total, factor a shared core or merge. Watch standalone invocations — do users reach for `/tooling-adequacy` expecting oracle help, or are they surprised it covers oracles?

---

# Phase 2 implementation notes (architectural decomposition + contextual-fit gate)

These record the calls made while shipping Phase 2 (the standalone-skill extractions, the contextual-fit gate, and the scratch-file auditability groundwork). They supplement the pre-implementation entries above with what was actually built and where it diverged or stopped short.

---

## /oracle-adequacy built; oracle taxonomy shared with /tooling-adequacy by pointer + inline gist (not yet a factored shared file)

**What we did.** Built `/oracle-adequacy` as a standalone skill, modelled on `/tooling-adequacy` but with the unit of analysis being a *dimension's actual-state claim* (in `/quality-strategy`'s risk-map pass) rather than a *learning need*. It reuses the same oracle taxonomy (Specified / Property-or-metamorphic / Differential-or-simulated / Golden-master / Human-or-agent-judge) and the same "kill the old-world reflex" move. Rather than copy the full taxonomy or factor it into a shared file, `/oracle-adequacy` points at `skills/tooling-adequacy/SKILL.md` step 3 as the canonical treatment and restates one-line gists inline (the "name the framework concept inline with a gist" pattern already endorsed in the duplication-rule entry). Wired into `/quality-strategy` sub-step 6.2.

**Why.** Splitting "tooling" and "oracle" for the same context fragments one question (that's why `/tooling-adequacy` keeps both); but `/oracle-adequacy` and `/tooling-adequacy` serve *different* parents and *different* units (actual-state claim vs learning need), so two skills is right. The shared piece is only the oracle *kinds*. A pointer-plus-gist avoids a second full copy that would drift, without the churn/coupling of introducing a new shared grounding file mid-Phase-2.

**What would change our mind.** If the two skills' oracle sections drift apart despite the pointer (the gist in one updated, the canonical not), or if a third consumer of the taxonomy appears — either would justify factoring a single `oracle-kinds.md` grounding file both skills read. The current cross-reference also creates a mild coupling (a `/quality-strategy` skill depending on a `/test-strategy` skill's file); if that proves awkward, the factor-out resolves it too.

**How we'd know.** On the next edit to either oracle section, check whether both stayed in sync. Track whether users invoking `/oracle-adequacy` standalone are confused by the pointer into `/tooling-adequacy`.

---

## Contextual-fit gate adapts severity, not which indicators apply (OQ2 resolved: lean (b))

**What we did.** `/quality-strategy-review` now runs a **Pass 0 contextual-fit gate** before the three subagents: it reads the `## Strategy job` paragraph (or infers + flags it if missing), classifies the job (durable production / pre-implementation / agentic one-shot / lightweight slice), and sets a severity lens. The seven indicators and all oracle checks run **universally**; what adapts is the blocker-vs-deferral threshold. Findings are sorted into three buckets — current blockers / now-refinements / later-lifecycle deferrals — and the report gained a "Strategy job & contextual fit" header and a "Deferrals" section. The job classification is threaded into all three subagent briefs so they judge against the job. For the agentic-one-shot job specifically, absence of one-shot success/failure criteria, final-report evidence requirements, agent-failure-mode decision rules, and scope-control Nones is itself blocking.

**Why.** This is design OQ2. The anti-clickbait feedback showed the review mis-applying the production-grade scale to a pre-implementation one-shot. The cleanest fix keeps the indicators stable (so the review stays teachable and consistent) and moves only the severity threshold — a missing section blocks only if its absence stops the strategy doing *its* job. Switching indicators on/off per job would make reviews incomparable and invite gaming.

**What would change our mind.** If severity-only adaptation proves too blunt — e.g. an indicator that is genuinely meaningless for a one-shot still fires noise that the severity lens can't silence — we'd revisit (a)/(c): suppressing specific indicators per job. If the four job categories don't cover real strategies (a fifth recurs), the classifier needs extending.

**How we'd know.** Run the review on strategies of each job type. Check: did any indicator fire a finding that was pure noise for that job (suggesting it should be suppressed, not just down-graded)? Did the blocker/deferral split match what the user thought was actually load-bearing?

---

## Scratch-file audit shipped; producer-side convention introduced ahead of full decomposition

**What we did.** Established the **sealed-context dispatch + scratch-file convention** in `/quality-strategy` SKILL.md: every subagent dispatch writes `quality/.scratch/<sub-step>-<purpose>.md` recording its real intermediate work. Applied it to the dispatches that exist today — pre-read (0), dimension scout (5.1), `/oracle-adequacy` (6.2), `/contradiction-check` (boundaries), `/operational-distillation` (7.3) — and on the test side to `/tooling-adequacy` (3.5). Both review skills gained a scratch-file audit check (a claimed dispatch with no scratch file = FAIL/fabrication signal; a stub = FLAG/audit theatre). Added a process-note-leak check to `/quality-strategy-review` too.

**Why.** The scratch-file audit (a Phase 2 bullet) is only coherent if the producer side actually writes scratch files, so the writing convention had to land with it. This is also the auditability groundwork the full sealed-context decomposition will build on. Introducing it now, on the dispatches that already exist, gets the integrity benefit immediately and de-risks the larger decomposition.

**What would change our mind.** If orchestrators write empty/stub scratch files to pass the audit (audit theatre) — then the check needs to inspect content, not just existence. If `.scratch/` confuses users about what's authoritative.

**How we'd know.** Spot-check scratch files on real runs against the strategy content — real intermediate work, or stubs? Count fabrication catches.

---

## Full sealed-context decomposition of /quality-strategy deferred to a later phase (Phase 2 stopped at a coherent slice)

**What we did.** Phase 2 shipped the standalone-skill extractions (`/oracle-adequacy`, `/contradiction-check`, `/operational-distillation`), the contextual-fit gate + strategy-job question, and the scratch-file auditability convention — but **not** the full decomposition of all 21 `/quality-strategy` sub-steps into sealed-context subagent dispatches. The orchestrator still performs the per-sub-step interview and analysis itself for the dispatches not yet extracted (e.g. dimension rating in 5.4, the per-sub-step writing). The central v2 principle (§2.1) is stated in SKILL.md and applied to every dispatch that exists, but the remaining analytical sub-steps are not yet sealed.

**Why.** Design sized Phase 2 at 3–5 days and named decomposition the largest single piece. Half-doing the 21-sub-step decomposition in one overnight run risked leaving `/quality-strategy` internally incoherent (some sub-steps sealed, some not, inconsistent scratch conventions) — worse than a clean, smaller slice. The extractions + gate + auditability convention are a complete, shippable, self-consistent unit and lay the groundwork (scratch convention, sealed-dispatch language) the remaining decomposition will reuse.

**What would change our mind.** Nothing about the call; this is a deliberate scope boundary, not an uncertain design choice. The open *work* is: decompose the remaining substantive sub-steps (dimension rating especially — it's where v1 drifted to middle ratings) into sealed dispatches that each write a scratch file, and have the orchestrator only dispatch/collect/reconcile/present. Mechanical anchors at dimension-rating (Phase 4) and per-stakeholder + merge (Phase 3) interact with this and may be done together.

**How we'd know it's needed.** The fabricated-dispatch and middle-rating-under-uncertainty patterns from the four v1 runs will still appear in the un-decomposed sub-steps until they're sealed; the scratch-file audit will show "no dispatch claimed" for those steps because they're still orchestrator-inline.

---

## /contradiction-check navigates by Part headings until sentinels land (Phase 5 dependency)

**What we did.** `/contradiction-check` locates Part boundaries by their `## Part N:` headings. The design's sentinel markers (`<!-- end-of-sub-step-X -->`, `<!-- end-of-strategy -->`) are Phase 5 work and not yet present; the skill carries a forward note to switch to sentinels for deterministic navigation once they land.

**Why.** Headings are stable and present today; sentinels are a later-phase robustness improvement, not a blocker for a working contradiction check. Keeping the dependency explicit (in the skill and here) prevents the two phases drifting apart.

**What would change our mind.** If heading-based navigation proves unreliable on real docs (duplicate or reworded headings) before Phase 5 lands, sentinels get pulled earlier.

**How we'd know.** Watch whether `/contradiction-check` mis-locates Part boundaries on real strategies during the gap before Phase 5.

---

# Phase 3/4 implementation notes (qss-v3-overnight run)

These record what the overnight run actually landed for the per-stakeholder + mechanical-anchor redesign, and where it deliberately stopped short.

---

## R1 decomposition: dimension-rating sealed + mechanical anchors landed; per-stakeholder risk-map deferred

**What we did.** Landed Phase 4 — the mechanical anchors at sub-step 5.4: **H** iff the dimension's failure mode is a Dealbreaker for ≥1 stakeholder; **M** iff a non-Dealbreaker Good Enough/Delight bar references it (and no Dealbreaker does); **None** iff no bar at any lens references it; deliberately **no L** at this step. And landed the Phase-3 merge step: per-stakeholder rating runs in a **sealed-context subagent** that writes `quality/.scratch/5.4-dimension-rating.md`; the orchestrator dispatches / collects / merges / presents and does not grade; divergence between stakeholders is surfaced to the user as a one-team commitment decision (*"Stakeholder A: H Dealbreaker; Stakeholder B: None — you have one team, what does it commit to?"*) and the resolution is recorded. We propagated the no-L ripple across the rest of the skill: 5.5 (distribution check reframed for H/M/None), SKILL.md (the sub-step table and the sealed-dispatch / scratch-file list now include 5.4), Step 7 (the former-L "aware-but-not-investing" items are recorded as plan-of-work decisions, not ratings), and `/quality-strategy-review` (distribution check re-scoped to the H/M/None rating axis, the H-requires-Dealbreaker rule tightened, and `5.4-dimension-rating.md` added to the required scratch-file audit). **Deferred:** the full per-stakeholder decomposition of the **risk map** (sub-steps 6.1/6.2/6.3) — required level, actual level, and gap are still assessed at the merged-dimension level, not per-stakeholder-then-merged.

**Why.** 5.4 is the exact place v1 drifted to middle ratings (the v1 review finding named it), so it was the highest-value, most self-contained piece to seal first. The risk map operates coherently on the merged H/M/None ratings exactly as it did before, so doing 5.4 alone leaves the skill internally consistent rather than half-converted. Decomposing the risk map per-stakeholder hastily overnight risked an incoherent half-sealed skill — the design sized that work as multi-day — and honesty about a clean boundary beats a broken skill.

**What would change our mind.** If real runs show the merged-level risk map hides the same cross-stakeholder divergence at the required/actual stage that the 5.4 merge now surfaces at the impact stage — i.e. the divergence that matters most reappears in 6.x and is lost to early merging there too.

**How we'd know.** On real runs, count how often a single merged required/actual level in Part 6 papers over a genuine stakeholder disagreement the user would have decided differently had it been surfaced — as 5.4 now surfaces it for impact. If that's common, the risk map needs the same per-stakeholder-then-merge treatment.

---

# Stage 3 — deferrals from the qss-v3-overnight persona test

Findings from a 10-persona conversational test of `/quality-strategy` that we decided **not** to act on now — either too large/design-sensitive for that run, or genuinely uncertain. Recorded with the standard structure so the calls are visible. (The test itself — transcripts and per-persona critiques — was an internal evaluation run; the durable decisions it produced live here in this register.)

---

## Cadence / "velocity" + "lean" mode (the headline finding — deferred, not rejected)

**What we did.** Deferred. 8–9 of 10 personas found the per-sub-step ritual + boundary checkpoints heavier than their job needed (the expert resented the turn count; the new lead *ran out of turns before reaching the plan of work she most needed*; the portfolio/fixed-bid jobs wanted far less ceremony). The ask is consistent: a way to **compress cadence and document volume without lowering analytical rigor** — e.g. an expert/velocity mode that batches sub-steps when the user front-runs answers, and a lean mode for small/portfolio/fixed-bid jobs, plus time-boxing so Step 7 (plan of work) is always reached. We applied only the small, safe slices now (suppressing scaffolding narration; a precise-user checkpoint register) and deferred the mode itself.

**Why.** This is the most-supported finding *and* the most design-sensitive: it sits in direct tension with the deliberate "same rigour regardless of job" stance (project-shape changes phrasing, not depth). Done badly it becomes the corner-cutting the framework is built to resist — and several critics explicitly credited the skill for *holding its ground* on rigor. Designing "compress ceremony but not rigor" well (trigger conditions, what batches safely, how the step-boundary checkpoint survives, how Step 7 is guaranteed) is a multi-step design effort with its own testing, not an overnight edit. Out of scope for this run per the brief ("do not start work beyond these three stages; resist bloating").

**What would change our mind.** It already has, on priority: this should be the next design focus. The open question is *how*, not *whether*. The risk to watch: a velocity/lean mode that quietly lowers the bar rather than the ceremony.

**How we'd know.** Prototype a cadence-adaptive variant; on real runs, check whether it reaches Step 7 faster while producing a strategy a `/quality-strategy-review` still passes at full rigor, and whether expert users stop resenting the turn count.

---

## Audience-facing one-page deliverable (vs. author-facing artifact)

**What we did.** Deferred. 6 personas (EM, OSS, QA-lead, agency, bootcamp, platform) said the produced doc is written for its author/auditor, not the named audience (40 engineers / 20 contributors / a busy PM / a non-technical client). They want a distinct distributable one-pager beyond the TL;DR, and P6 specifically lost the **degrade-to-one-move fallback** she asked for between collection and the final TL;DR.

**Why.** This is an output-shape redesign of `/operational-distillation` (and possibly a second emitted artifact), interacting with the cadence work above. Too large to do safely overnight without risking the distillation's "view-not-second-source-of-truth" property. One concrete sub-piece is small and worth doing in a focused pass: *make the degrade-to-one-move fallback a required distillation element whenever the strategy job is funding/communication-constrained* (the skill collected the requirement and dropped it).

**What would change our mind / How we'd know.** If returning readers consistently bounce off the body and only ever read the TL;DR, the one-pager should become a first-class output. Track whether the TL;DR alone is enough to triage, or whether people need the distributable spine.

---

## Non-deterministic / ML systems + time-awareness (drift)

**What we did.** Deferred. The ML/data-engineer persona (fit 2, the lone would-not-recommend) surfaced that the framework has no worked example for **metric-distribution "correctness"** as a quality dimension (a tolerance + confidence, not a green test), no mechanism for **non-stationary** quality that drifts weekly despite PHILOSOPHY's "plan for context shifts," and a **code-shaped pre-read** blind to feature stores / eval harnesses / drift monitors. (Caveat: this cell is partly a harness artifact — the simulated project had "no stakeholder to interview," so the run stalled at Step 0.)

**Why.** Genuine gaps, but each is real design work (a worked non-deterministic-oracle example; a stationary-vs-drifting prompt + re-evaluation cadence/owner; broadening the pre-read's notion of "what holds this system's quality"). n=1 in this test and entangled with a harness limitation, so not overnight-actionable — but the **time-awareness gap is real beyond ML** (any strategy is a snapshot; PHILOSOPHY promises context-shift planning the skill doesn't yet operationalise).

**What would change our mind / How we'd know.** Run the skill on a real recsys/ML project (with a real owner answering). If quality genuinely won't map to a point-in-time dimension+level, add the drift/time-awareness mechanism and the data/ML pre-read.

---

## Full no-repo mode for the review + solo-owner vs fabricated-stakeholder

**What we did.** Applied the producer-side honesty fix now (pre-read declares itself interview-derived and tags inferred-vs-scanned sources). Deferred the review-side piece: in the test, the closing `/quality-strategy-review` *green-checked phantom scratch files* ("all 13 required dispatch files present") in sessions with no repo. Also deferred a related conceptual fix the ML persona raised: the "no stakeholder → refuse" path conflates a *fabricated* persona (rightly refuse) with a *real solo owner answering for themselves* (should proceed, recording assumptions).

**Why.** The R8 scratch-audit already FAILs on missing required scratch files; making the review correctly handle a genuine no-repo run (vs treating absence as fabrication, or vice versa) needs careful interaction with R8 and the pre-read honesty change, and the solo-owner distinction touches the escalation logic — both want their own focused pass rather than an overnight bolt-on.

**What would change our mind / How we'd know.** Run the review on a real no-repo / pre-implementation strategy and on a real solo-owner project; check it neither fabricates a pass nor wrongly refuses.

---

## Client two-artifact split (frank-internal vs client-showable)

**What we did.** Deferred (n=1, the agency contractor). He needed the output to split cleanly into a client-showable spine and a frank internal layer (the single file literally contained his pain-threshold line), via two artifacts or mechanical tagging/export.

**Why.** A real, specific need but a single-persona, niche output-shaping feature; lower weight than the cross-cutting items above, and it overlaps the audience-one-pager work. Resist bloating the core flow for one use case.

**What would change our mind / How we'd know.** If contractor/agency use turns out common (client deliverable is a stated use case), build the spine/frank split — likely as an option on `/operational-distillation`.

---

# Stage 4 — ship-prep decisions (qss-v3-shipprep)

Calls made while preparing the pack for public alpha.

---

## Leak-cleanup is a review-time job, not a producer prohibition (A1 rework)

**What we did.** The first cut of the leak fix (a `d58caa1` SKILL.md block) loaded the *producing* pass with a list of don'ts — "do not narrate dispatches / turn refs / scratch in either channel." We reverted that approach. The producing pass is now told only to write the finding, not narrate the machinery; the actual stripping of any leaked dispatch/scratch narration, append bookkeeping, turn-lineage refs, and inferred-as-scanned lines happens **at review time** on text already written. Three review surfaces share it: a light scan at intermediate sub-step wrap-ups, a thorough scan of the just-written Part at each step boundary (pattern item 0b), and the final `/quality-strategy-review` check 21 as the whole-doc backstop. The template-line removal (A1b, `499f394`) and the strengthened review check 21 (A1c, `99fed70`) are kept — neither is a producer prohibition.

**Why.** Per the adjudication: giving the producing agent a prohibition list is stressful and likely degrades the real analytical work ("two more non-task things to worry about"), and it didn't reliably catch the leak anyway (the original leak was found by the critic, not the skill's self-review). Cleaning at review — where the doc is being read back Part-by-Part and then whole — is both lighter on the producer and more thorough, and it matches how the skill already works (it reviews each subsection at its boundary as well as the whole doc at the end).

**What would change our mind.** If review-time cleanup misses leaks that a producer-side rule would have caught — i.e. the orchestrator strips its *own* narration unreliably at the boundary, so leaks survive to the final review or past it. Or if the step-boundary scan adds enough overhead that boundaries start getting skipped.

**How we'd know.** On real runs, grep produced `strategy.md` files for the leak patterns (dispatch/scratch narration, `turn-NN`, "scratch would be") after the strategy is declared done. If they persist, the review-time-only model is too weak and a light producer-side nudge (not a prohibition list) may be needed after all. The qss-v3-shipprep V2 validation run is the first such check.

---

## De-robotising phrasing via a global directive, not 21 rewrites (A3)

**What we did.** Generalised the A3 checkpoint-register change into a standing direction: a "Phrasing — adapt, don't recite" section near the top of `/quality-strategy` SKILL.md establishes that every quoted prompt in the sub-step files is an *example of intent*, to be said in the facilitator's own words, fitted to the user — "a useful management consultant, not a robot reading a script." The substance (the question that must be answered, the check that must pass, the push-back that must happen) is fixed; the wording is free. We added one representative reinforcement in the most-scripted sub-step (3.1) rather than rewriting the quoted prompts in all 21 files, which would risk dropping substance for little gain over the global rule.

**Why.** The project owner's verdict: "Be flexible with phrasing everywhere; don't hard-script." A single global directive reframes all 21 sub-steps' prompts as illustrations at once, is maintainable, and can't accidentally delete a load-bearing question — whereas surgically rewording every quoted prompt across the tree is high-effort and high-risk. The orchestrator reads SKILL.md as its entry point, so the directive is in context whenever it executes a sub-step.

**What would change our mind.** If agents only read the sub-step file and skip SKILL.md at a given sub-step (the "Per-sub-step boilerplate" entry above flags exactly this uncertainty), the global directive could be missed and prompts get recited verbatim anyway. Then the fix is to push a one-line "these are examples, adapt them" reminder into each sub-step file's interview section.

**How we'd know.** On real runs, watch whether the facilitator's wording visibly adapts to the user or reads like a recited form — especially in sub-steps far from SKILL.md in the agent's context. If recitation persists, reinforce per-sub-step.

---

## Labelled-strawman affordance for genuinely-stuck users (R-skip)

**What we did.** Added a "When the user is genuinely stuck — offer a labelled strawman" section to `/quality-strategy` SKILL.md. When a user genuinely can't generate an answer (not when they're dodging the work), the skill may offer a concrete, *loudly-labelled* starting guess to react to — "probably wrong, tear into it" — then interview as normal; an un-reacted-to strawman is discarded, never banked as fact. Kept two bright lines: never present fabricated content as established fact (a strawman is labelled as a guess every time), and it never softens the framework's substantive refusals (non-goals, 5.2/5.3, "just give me ratings", lowering rigour for small jobs). Explicitly scoped to the blank-page user, not the impatient one.

**Why.** Adjudication OVERRODE (partial) the blanket "don't invent" stance: when users have no idea, bouncing off a wrong suggestion beats inventing from nothing, and people critique far better than they generate. The risk is obvious — a strawman that quietly becomes "fact", or that's used to cut corners — so the affordance is fenced by the labelling rule and the explicit "does not soften refusals" clause.

**What would change our mind.** If, in real runs, strawmen leak into strategies as unlabelled fact (the user reacts weakly and the guess survives), or if the skill starts offering strawmen to unstuck users as a speed move — either would mean the fence isn't holding and the affordance needs tightening or removal.

**How we'd know.** Audit produced strategies for content that traces to a strawman the user never actively confirmed; watch whether the strawman fires for stuck users (good) or impatient ones (bad). The qss-v3-shipprep V1 validation run (a deliberately stuck/lightweight user) is the first probe.

---

## Phantom-scratch fix + solo-owner-vs-fabricated-stakeholder (D4)

**What we did.** Two fixes the qss-v3-overnight test surfaced. (1) **Phantom-scratch:** the closing `/quality-strategy-review` once green-checked "all 13 required dispatch files present" in a no-repo session where none were on disk. Check 20 now requires the auditor to verify on disk (actually list `quality/.scratch/` and read the files), forbids reporting a file present from the doc's narration alone, and reports **INCONCLUSIVE** (never PASS) when it can't access the directory — with the collapse step told to surface INCONCLUSIVE as "audit could not be run", never as a clean pass. It also states no-repo sessions still write scratch files (the pre-read writes its LIMITED/interview-derived note rather than skipping the file), so absence is still a real FAIL. (2) **Solo owner vs fabricated stakeholder:** the "no stakeholder → refuse" escalation now distinguishes a user who'd have us invent a persona from nothing (refuse) from a real solo owner answering for themselves (proceed, record they're answering in that capacity), and cross-references the labelled-strawman path for the real-but-stuck case.

**Why.** The phantom green-check is a real correctness bug — a review that fabricates a pass is worse than no review. Verifying on disk and degrading to INCONCLUSIVE rather than PASS closes it. The solo-owner distinction fixes an over-broad refusal: a one-person project has a real stakeholder (the owner), and refusing to proceed there conflates "fabricate a stakeholder" (bad) with "the stakeholder is one real person" (fine). Connects to A2 (no-repo first-class).

**What would change our mind.** If real runs show the on-disk audit still passing on fabricated/stub files (then check content harder), or the INCONCLUSIVE path firing so often on legitimate runs that it becomes noise. If the solo-owner branch is read as a licence to skip stakeholder analysis entirely (then tighten what "answering for themselves" must still produce).

**How we'd know.** Run the review on a real no-repo / pre-implementation strategy and on a real solo-owner project: confirm it neither fabricates a pass nor wrongly refuses, and that a genuine missing-scratch case still FAILs. The qss-v3-shipprep V1 (no-repo) validation is the first probe of the closing review's honesty.

---

## Tracked-not-built this pass: D3 (research priority), D1 (reframed), R1 (definite TODO)

**What we did.** Re-prioritised three deferred items per the adjudication, and tracked them in the README roadmap — but did **not** build any of them this pass (out of scope per the ship-prep brief).

- **D3 — quality dimensions for new-world (AI / non-deterministic / agentic) products. Upgraded from minor defer to the #1 research priority.** The "ilities" list has nothing for products whose correctness is a metric distribution with a tolerance rather than a green test, no mechanism for non-stationary quality that drifts, and a code-shaped pre-read blind to feature stores / eval harnesses / drift monitors. Many users build exactly these products. **Documented as a named known gap** in the README ("Known limitations") and as the top roadmap item. The research itself (go back to the research stage / the original wiki: "what quality dimensions exist now for new-world products?") is explicitly future work and was **not** done this pass. The time-awareness/drift gap is real beyond ML — any strategy is a point-in-time snapshot while PHILOSOPHY promises context-shift planning the skill doesn't yet operationalise. See the Stage-3 entry "Non-deterministic / ML systems + time-awareness" above for the fuller analysis.
- **D1 — cadence / lean mode. Reframed, still deferred, still not built.** The adjudication challenged the premise: a persona "running out of turns" was a too-low eval turn cap, not the skill being too long (a too-low cap can manufacture a false "too long" finding). The real open question is whether the 21 sub-steps surface dimensions that *genuinely matter* or some are spurious "ilities" — if all matter, the answer is a lighter *way to view* the detail, not "do less." We probe this only as an observation in the validation runs (the critic's spurious-vs-load-bearing-dimension note); we do **not** design a lean mode. Tracked in the README roadmap. The risk to hold against: a velocity/lean mode that quietly lowers the bar rather than the ceremony.
- **R1 — per-stakeholder risk-map (6.x) decomposition. Promoted from vague deferral to a definite TODO.** Adjudication: "We totally need to do this. Doesn't matter when, as long as we track it." The dimension-rating step (5.4) already runs per-stakeholder and surfaces divergence; the risk map (6.1/6.2/6.3) still operates at the merged-dimension level. Bringing the same per-stakeholder-then-merge treatment to the risk map is now a tracked definite to-do (named in the README roadmap), sequenced after the cadence work because they interact. See the Phase-3/4 entry "R1 decomposition" above for the boundary that was landed vs deferred.

**Why not built this pass.** The ship-prep brief scoped this pass to landing the adjudicated edits + public-readiness + validation, and explicitly excluded the D3 research, the D1 lean-mode design, and the R1 decomposition (each is multi-day design work with its own testing). Honesty over completeness: they're named as gaps/roadmap, not quietly shipped half-done.

**How we'd know it's time.** D3: a real ML/non-deterministic project where quality genuinely won't map to a point-in-time dimension+level. D1: validation/real runs showing surfaced dimensions are reliably load-bearing (→ build a lighter view) or some are spurious (→ prune them). R1: real runs where a single merged required/actual level papers over a stakeholder disagreement the user would have decided differently — as 5.4 now surfaces for impact.

---

*Add new items to this file when we make calls under uncertainty. Revisit after each real-world run.*
