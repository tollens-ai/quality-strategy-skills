# Alpha feedback log

What alpha testers reported, what changed in response, and where. Testers are anonymised; entries are newest at the top. This file is provenance — when a rule in the skills reads oddly specific, the report that earned it is probably here.

## Round 1 — alpha tester #1 (2026-06-11)

First end-to-end alpha run of `/quality-strategy`. Four items of feedback, plus a maintainer addition encoded in the same round.

### 1. Goal-traceability (the heaviness rule)

**The feedback.** The process *"feels heavy for vibecoders."* Heaviness is a feature only when the user can see it serving their own goals.

**The change.** The process may be heavy only where the weight traces to the user's own stated goals (stakeholder dealbreakers/delight bars, release purpose). Three standing rules: (a) every substantive ask frames its why in terms of what *this* user already said — "we're digging here because you said X is a dealbreaker"; (b) standing pruning rule — an item not traceable to any stated goal is spurious weight: cut it or challenge whether a goal is missing; (c) when a goal-justified item meets resistance, show the trace, then offer the honest fork — be convinced this matters for your goal, or revise the goal; both outcomes legitimate, recorded either way.

**Where.** `skills/quality-strategy/SKILL.md` → "Heavy only where it serves the user's goals"; `skills/test-strategy/SKILL.md` → "The weight traces to the user's goals".

### 2. Itinerary + progress + visible exits (the lost-and-scared fix)

**The feedback.** *"I just did section 5 but I don't know how many sections are left and I've taken so long and I'm scared."*

**The change.** (a) At session start, a plain-words itinerary — the steps by human name, what each produces for the user, rough relative size; (b) every step-boundary checkpoint carries one progress line — where we are, what remains, relative sizes ("the last two are shorter than what you've done"); (c) visible exits — at each boundary, what the user walks away with if they stop here (the docs are useful part-done; resume is supported). Standing rule: never let the process feel unbounded.

**Where.** `skills/quality-strategy/SKILL.md` → "Session start — the itinerary and the commit cadence" + checkpoint pattern step 1b + the resumption prompt; `skills/test-strategy/SKILL.md` → execution rule 6 + "Session start — itinerary and commit cadence"; `skills/tooling-strategy/SKILL.md` → "Session start — itinerary and commit cadence" + the boundary rule atop "The work, in order".

### 3. Commit cadence

**The feedback (distilled).** Strategy sessions touch a real repo for hours with no agreed commit rhythm.

**The change.** At session start, where the repo is git-managed, one question: commit as we go at each section boundary, all at the end, or leave commits to you? The answer is honoured at every boundary and recorded in `quality/.scratch/commit-cadence.md` so it survives `/clear`. Suggested default: commit-as-we-go (cheap rollback, visible progress — connects to item 2's progress feeling). In `/quality-strategy` the boundary commit lands after the checkpoint's explicit confirmation, so it snapshots the confirmed step.

**Where.** The same three "Session start" sections as item 2; `skills/quality-strategy/SKILL.md` checkpoint pattern step 5.

### 4. Recalibrate the Highs check

**The feedback (distilled).** The "too many Highs / everything-is-critical" pushbacks fire spuriously: by rating time the low-stakes material was already deliberately omitted, so High-dominated is the expected shape — the checks were testing distribution when they should test justification.

**The change.** Re-aimed at justification: every High must cite its stakeholder Dealbreaker bar; unjustified Highs are challenged individually; when all Highs are justified, the verdict is said plainly — "this is a genuinely high-stakes surface" — instead of doubting the count. The H/M distinction stays useful (check the Medium anchor was applied; per-dimension re-anchoring, never bulk demotion). Same re-aim for test-strategy Tier-1 tiering. Vocabulary fixed wherever it could be misread: High = IMPORTANT, not in-trouble — a High can be at bar (a success story) or cheap to close; importance and current state are orthogonal axes and prose must never conflate them. Anti-inflation guards stay for required *levels* (the bars), which is where inflation actually lives.

**Where.** `skills/quality-strategy/steps/5-dimensions/5-4-rate.md` (vocabulary + justification glance); `5-5-checks.md` Check 1 ("High justification"); `skills/quality-strategy-review/SKILL.md` check 10 + severity rules + subagent C's axes check; `skills/quality-strategy/steps/6-risk-map/6-3-gap-and-confidence.md` (impact-column note; uniformly-hot pushback); `skills/test-strategy/steps/3-learning-needs.md` (Tier-1 pushback); `skills/test-strategy/INDICATORS.md` (Priority failure mode). Untouched on purpose: `6-1-required.md`'s anti-overshoot and the non-goals "everything is critical" escalation.

### 5. The delight north star (maintainer addition, same round)

**The intent (verbatim-ish).** What makes the product land is when it makes the user realise something matters — or something is true — about their project that they never realised they cared about. The spark-joy full-body light-up moment.

**The change.** (a) PHILOSOPHY.md gets the thesis: the highest-value moment this framework produces is a revelation the user's own goals imply but the user never articulated. (b) The interview skills' delivery discipline: when a sealed pass (dimension scout, fresh-eyes recon, the pre-read behind three-lens) surfaces something the user never mentioned but their stated goals imply they care about, it is not buried in a consolidated list — it's named back as a moment: "you didn't mention X anywhere — but given what you said about Y, you'd care a lot if X failed. Does that land?" Land-or-not is recorded either way; a rejected revelation is data, not failure. (c) The artefact skill's revelation tier sharpened: above the half-knew truth sits the never-realised-you-cared truth — when the source doc contains one, it's hero material.

**Where.** `PHILOSOPHY.md` → "The revelation is the product"; `skills/quality-strategy/SKILL.md` → "Deliver revelations as moments"; `skills/quality-strategy/steps/5-dimensions/5-1-inventory.md` (scout consolidation); `skills/quality-strategy/steps/3-stakeholders/3-2-three-lens.md` (pre-read-implied bars); `skills/test-strategy/steps/3-learning-needs.md` Pass 3 + `skills/test-strategy/SKILL.md` revision look-forward. Part (c) lives on the `artefact-skill-2026-06` branch (PR #3): `skills/quality-artefacts/SKILL.md` principle 6, "Every frame is a story".
