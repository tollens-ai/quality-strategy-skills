# Alpha feedback log

What alpha testers reported, what changed in response, and where. Testers are anonymised; entries are newest at the top. This file is provenance — when a rule in the skills reads oddly specific, the report that earned it is probably here.

## Round 3 — answer visibility and the save location (encoded 2026-07-09)

**The feedback.** An alpha tester ran `/quality-strategy` in a repo several colleagues work in, and bounced off halfway. Verbatim: *"I found myself very self-conscious about who was going to see what for my answers... because things were being committed to the git repo, I was definitely concerned about everything I said being read later... through a lens of how Claude would frame it."* The skill wrote every candid answer into the shared repo and suggested commit-as-we-go as the unconditional default — a unilateral first draft, actively published to the whole team — and nothing ever told the user that before the candid questions began. The candor the interview depends on is only safe when the user knows, up front, where their words are going and who can read them.

**The change.** Session start now settles where the strategy lives **before anything is written to disk**: the skill says plainly that everything the user tells it persists into the `quality/` docs, and asks whether those docs should go in the repo (everyone's, immediately) or somewhere local as a private first pass (promoted later by copying the folder in). The entire output family — strategy, pre-read, scratch state, archive, feedback notes — follows the choice as one unit. The commit-cadence question now keys off the *save location* being git-managed (not the analysed project), and names the visibility consequence of commit-as-we-go when the docs sit in a shared repo. Choices are recorded in `quality/.scratch/session-config.md` so resumed sessions restate instead of re-ask, and resumption from a folder without `quality/` asks "fresh here, or resuming a strategy saved elsewhere?" rather than assuming fresh. Regression cases IU-21 / IU-22.

**Where.** `skills/quality-strategy/SKILL.md` (path resolution — new `DOCS_DIR`; "Session start — the itinerary, where the strategy lives, and the commit cadence"; "Initial pre-read"; "Resumption"; "Output"); `steps/0-pre-read/0-dispatch.md` (settled-before-writing gate); `steps/5-dimensions/5-1-inventory.md`, `5-4-rate.md`, `steps/6-risk-map/6-2-actual.md` (briefs point at the docs home); `skills/test-strategy/SKILL.md` (same resolution + cadence changes); every companion skill's path-resolution note (the docs live wherever the strategy was saved); `README.md`.

**Follow-up (encoded 2026-07-10).** The candidness rationale is now folded into the ask itself rather than left implicit: the ask *tells* the user it wants their true, honest opinions and that where the docs live decides who reads them, in the same breath. Where in-repo means a wide audience, the skill outright recommends the private copy first — tidy or redact later (the user's own editorial pass), with `/strategy-variants` named as the route to a shareable view: it derives separate audience-facing files after the strategy is reviewed, never editing the honest doc itself. And candidness is raised at this one moment only, never sprung mid-session: a user who turns guarded mid-interview gets the standing choice restated in a line, not a fresh disclosure ceremony. Regression case IU-24 (companion to IU-21/22). Where: `skills/quality-strategy/SKILL.md` (Session start — the settle-where-it-lives move); `README.md`.

## Round 2 — Qing, launch-gate run (2026-06-11)

A full cold `/quality-strategy` run on a real fixture (the king-and-pawn chess project, mid-launch), used as the launch gate for the pack. Ten findings, encoded in version 0.3.3. Several share a root cause Qing named outright — **status-quo bias and one-directional goal-tracing**: the skill treating the current state of the repo (what's built, what's absent) as evidence of user intent, and tracing risks in only the direction a stated goal pulls.

### 1. Non-goals are proposed, never assumed (IU-16 / IU-17)

**The feedback.** The skill declared a batch of scope cuts (non-goals) *without asking* — visible only as a one-liner. One cut ("no custom SMTP") was inferred purely because the code didn't have it; it never reasoned forward that the stated Twitter launch implies a signup spike, and default-SMTP confirmation emails are exactly what breaks under that spike. Root cause, Qing's diagnosis: **status-quo bias** — absence in the codebase treated as a preference of the user.

**The change.** Two disciplines at the non-goals step. **(a) Reason forward, never from absence:** a candidate non-goal derived from "it isn't built" must be tested forward against the stated goals and named events before it may even be *proposed*; an absence a stated goal demands is a gap, not a non-goal. **(b) Propose and confirm, one at a time:** each surviving candidate is named back with its one-line why and confirmed before it enters the doc — batching cuts behind a single one-liner is the named failure.

**Where.** `skills/quality-strategy/steps/4-non-goals/4-1-non-goals.md` (two disciplines + push-backs + DONE); `skills/quality-strategy-review/SKILL.md` (check 1a + subagent-C forward-reasoning lens); mirrored into `skills/test-strategy/steps/5-closing.md` and `skills/test-strategy-review/SKILL.md` check 8 for fresh test-side scope cuts.

### 2. Agent-driven workflow triggers the agent-facing cluster (SC-13)

**The feedback.** Qing said her workflow is autonomous-agent-driven ("I just tell Claude vaguely what I want") — yet the dimension sweep came out light on the agent-facing cluster (testability not pinned to agent-verifiable; agent-diagnosability and observability missing). The stated workflow *is* a goal statement; it implies these dimensions the same way "Twitter launch" implies signup scale. The pack had the concepts; the sweep lacked the trigger. Vibecoders — the launch audience — near-universally have this workflow.

**The change.** The 5.1 bottom-up pass now fires the agent-facing cluster (agent-diagnosability, agent-audience observability/debuggability, agent-verifiable testability, agent-readability/context-efficiency) directly from a stated agent-driven workflow, each goal-traced to that workflow statement.

**Where.** `skills/quality-strategy/steps/5-dimensions/5-1-inventory.md` (bottom-up pass + push-back).

### 3. Old/new-world pass is machinery, not a ceremony (IU-9)

**The feedback.** The old/new-world (agent-vs-human audience) pass read as "internal logic leaking out" — a dimension-by-dimension confirmation walk whose answer was usually "neutral". Qing's call (override, try tonight): it shouldn't be its own user-facing ceremony; it should run before the dimensions presentation and feed it. Constraint: the reasoning stays mandatory.

**The change.** 5.3 restructured — the audience reasoning is still mandatory and still recorded for every trap dimension, but it runs as silent machinery feeding the rated inventory; only the splits made and genuine audience tensions surface for the user to react to. Neutral decisions are recorded on disk, not recited.

**Where.** `skills/quality-strategy/steps/5-dimensions/5-3-old-new-world.md` (full reframe); `skills/quality-strategy/SKILL.md` (refusal lines clarify it's the reasoning that's non-skippable, not a sit-through pass).

### 4. Time-empathy is grounded in the actual session (IU-18)

**The feedback.** After step 4 the skill said "we've been at this a good while" — half an hour into a lightweight run. Empathy lines about elapsed effort must be true of *this* session, or they read as canned and undermine the progress-line trust.

**The change.** A one-line discipline at the progress-line pattern: elapsed-effort lines only when true of the actual run (time, weight, steps); a short/light run gets none.

**Where.** `skills/quality-strategy/SKILL.md` (progress-line / visible-exit pattern, item 1b).

### 5. Floors and default-in dimensions (SC-14)

**The feedback.** The sweep produced *no security dimension at all* — on the very project whose benchmark ground truth had an integrity/security hole (client-writable rating forgery) as the headline finding. Qing's design: two tiers. **Universal floors** (non-disprovable given a factual predicate) and **default-in dimensions** (present by default, removable only by an explicit recorded disproof) where the goal-trace runs in reverse — the skill *convinces* using the user's own goals, then offers the honest fork.

**The change.** A guaranteed-inclusion layer in the sweep. **Floors** (ratified: credential leakage, PII leakage, irrecoverable loss of entrusted data, legality, blast radius) enter unconditionally where their factual predicate holds — checked in the pre-read, never None, never a non-goal; only what they demand here is negotiable. **Default-ins** (security always; data-integrity where user data exists; unbounded spend — the flagship — where the system can spend) appear by default; the skill builds the reverse goal-trace to convince, then forks to convinced-or-recorded-accepted-risk. Silent inclusion is as wrong as silent exclusion.

**Where.** `skills/quality-strategy/steps/5-dimensions/5-1-inventory.md` (the layer); `steps/0-pre-read/0-dispatch.md` (floor-predicate detection); `steps/5-dimensions/5-4-rate.md` (floors never None, enforced in the sealed rating brief + merge); `steps/5-dimensions/5-5-checks.md` (Check 6); `skills/quality-strategy-review/SKILL.md` (check 4a).

### 6. Actuals come from evidence, not code-reading (SC-15)

**The feedback.** At the actuals pass the skill talked about "looking at the repo" as if it would assess actual-state by reading *code* — the weakest actuals oracle, the one that manufactures Over-confident ratings.

**The change.** 6.2 now works an evidence hierarchy: existing test results / CI / reports → the tests themselves → ask the user what testing and lived evidence exists → code reading last, labelled inference, capped at Medium, never a confident "at bar".

**Where.** `skills/quality-strategy/steps/6-risk-map/6-2-actual.md` (hierarchy + DONE + push-backs); `skills/oracle-adequacy/SKILL.md` (matching mismatch).

### 7. Counter-pressure before naming a behaviour a defect (SC-16)

**The feedback.** The skill named "clock doesn't pause on disconnect → flag unfairly → mad player" a defect-shaped risk. Qing's correction: that's the chess domain norm — sites keep the clock running on disconnect because pausing enables disconnect-to-think cheating. Same behaviour, two dimensions pulling opposite ways, presented as one-sided (goal-traced only to the stated "mad player" dealbreaker).

**The change.** Before a behaviour is booked as a defect, 6.3 asks what it protects (purpose / domain convention); where a genuine tension exists, both pulls are presented as a tradeoff for the user to arbitrate (citing domain norms), never one side as a bug. The upstream twin of the 5.4 tradeoffs-at-recombination discipline.

**Where.** `skills/quality-strategy/steps/6-risk-map/6-3-gap-and-confidence.md` (counter-pressure block + push-back + DONE).

### 8. Visuals offered at the payoff moment (IU-20)

**The feedback.** At the finished risk map the skill recommended `/test-strategy` and `/tooling-strategy` — never `/quality-artefacts`, which was discoverable only from the README. The moment the strategy completes is the natural delight payoff: "want to see this as a dashboard/card you can share?"

**The change.** `/quality-artefacts` is now offered alongside the analytical follow-ons at the final step and the review close, with a teaser planted at the risk-map completion (a forward-pointer — the artefact skill reads the finished, reviewed doc).

**Where.** `skills/quality-strategy/SKILL.md` (Final step); `skills/quality-strategy/steps/6-risk-map/6-3-gap-and-confidence.md` (teaser); `skills/quality-strategy-review/SKILL.md` (closing recommendation).

### 9. Resume after `/clear` is stated, never guessed (IU-10)

**The feedback.** Reproduced by two independent testers (Tom #1 + simulated-user Retest B): a seam that says "safe to `/clear`" must also say exactly *how* to resume, so the user doesn't gamble that re-running the skill works.

**The change.** Every break/clear seam in all three strategy skills now states the resume mechanism: run `/<skill>` again; it reads your `quality/` docs and resumes from where you left off.

**Where.** `skills/quality-strategy/SKILL.md`, `skills/test-strategy/SKILL.md`, `skills/tooling-strategy/SKILL.md` (the break-point seams).

### Positive specimens (keep-patterns, not changes)

Two things the run did *right* and that the pack should keep doing: the challenge-recovery on the first non-goal bug (when challenged, the skill found its own flaw, split the non-goal correctly, fixed the doc) — encoded as the honest-fork path that IU-16 now makes fire *without* needing a challenge; and the **dream-banking** moment (the user's "a dashboard with a big red PROBLEM sign, and I tell Claude to magic it away" articulated, mapped onto concrete dimensions, set as the Delight bar with an honest Good-Enough beneath, and recorded as the cluster's target operating model) — the delight north star working on a real project.

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
