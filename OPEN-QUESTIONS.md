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

*Add new items to this file when we make calls under uncertainty. Revisit after each real-world run.*
