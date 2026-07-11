# Changelog

All notable changes to the `quality-strategy` plugin, oldest at the bottom. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions are the plugin manifest's. To pick up a new version, run `claude plugin update quality-strategy@tollens` (or `/plugin update quality-strategy@tollens` inside Claude Code).

**Release discipline (maintainers):** every version bump updates this file *in the same commit* — a bump without a changelog entry doesn't merge.

## [0.4.0] — 2026-07-10

A live-run release: every change here traces back to someone actually running `/quality-strategy` end-to-end and hitting the gap, then a fix, an audience-review pass, and a differential regression test before it landed. Headline theme — **precision that survives the whole document, not just the moment it's said**: releases, stakeholders, and quality axes now stay correctly scoped from first mention all the way through the risk map, instead of blurring together the deeper into the interview you get.

### Added

- **Multi-release document structure, chosen once and honoured everywhere.** When a session covers more than one release with real detail, you're offered a choice up front — one document per release, light sections for the others in this same document, two releases worked in parallel at matched depth, or fully separate documents — recorded once where releases are laid out, and every later part of the interview reads that choice and organises itself around it. Content for a release other than the one in depth always goes to that release's own home and gets named back to you in half a line; it's never silently mixed into the release you're actively working on. This closes a real live-run miss where later-release material got folded into the current release's risk map.
- **A named "process-change" action.** The plan of work can now recommend changing how the team works — not just what gets built or tested — as its own first-class action type, with Part 1 kept as an explicitly revisable working basis rather than something silently rewritten after the fact.
- **Deeper capture of how the team actually works.** The context-setting interview now walks a concrete recent example of both human-led and agent-led work (who's delegated what, which agents and why, how work gets reviewed and gated, where a human stays in the loop) and asks, for each part of the process, both what's working well and what's friction — not just one pain point.

### Changed

- **Non-goals are quality bars, not restated roadmap deferrals.** A non-goal now has to name a quality bar this release is deliberately not reaching, not just repeat a feature that was already deferred elsewhere. A generator ("what would be beyond what this release needs?") is offered whenever the usual categories run dry, so a session doesn't close with a non-goals list that's really just a feature list in disguise.
- **The dimension inventory is release-scoped and stakeholder-scoped from the first pass.** Candidate quality dimensions are generated for the release in depth only — material that only matters for a later release gets routed to that release's own home instead of blurring into this release's list. Every dimension also now names who it's for and which part of the product it's about, so the same word ("usability," "reliability") can correctly mean different things for different audiences instead of collapsing into one vague row — the classic case being a developer tool where "usability" means something different for the tool's own users than for another program calling its API. That same scoping now survives all the way through the risk map: required levels, actual levels, and the final gap table all key on dimension *and* scope, evidence gathered for one surface is never treated as evidence for a different one, and every row carries its release explicitly whenever more than one is in play.
- **A clean separation between "how much this matters" and "how good it currently is."** Surfacing a quality dimension and judging its current state are different questions asked at different points in the interview, and the skill now actively guards against blending them — catching cases where a candidate axis is really a feature name in disguise, or where its stated importance quietly bakes in a verdict about whether it's currently good or bad. A related check makes sure findings noted for later investigation actually get picked up and resolved rather than mentioned once and dropped.
- **Findings are grouped by theme when there's a natural theme to group by**, instead of being read back as one long flat list — across the dimension and risk-map portions of the interview, once there are enough related items that grouping actually helps.
- **More precise handling of ambiguous stakeholder bars.** When it's unclear whether a stated bar means "just once" or "every time," the skill now asks rather than guessing — and that answer carries through into how strictly the required level is set and how the eventual gap is judged, rather than getting silently tightened or loosened along the way.
- **Session-start privacy handling.** The very first question — where should this document live — now states plainly, in the same breath, why it matters (so you can answer honestly) and proactively recommends a private first pass whenever the alternative would put a candid early draft in front of a wide audience, rather than mentioning the option neutrally and waiting for you to choose it yourself.
- **Corrections check whether the document was actually wrong before rewriting anything.** Revising an existing strategy now starts by re-reading the passage you're pointing at — sometimes the document already said the right thing and the mismatch was a misreading, in which case nothing gets edited, the relevant passages are simply shown side by side. A two-part actual state (confidently known on one part, genuinely unknown on the rest) is now recorded as the compound claim it is, instead of being flattened into one misleadingly average confidence level. New-release sessions can reuse a still-accurate pre-read scan instead of re-scanning from scratch when nothing in the repo's scope has changed, and always re-open a prior release's accepted risk for a fresh look when the facts behind it have moved on.
- **Ideas volunteered mid-interview are tracked all the way through, including when you act on your own idea later in the same session** — not just when a later, separate pass formally adopts it.
- **`/strategy-variants` won't produce a variant from an unfinished strategy.** Before generating a one-pager or a client-safe version, the skill now checks that the source strategy actually has real content in the sections that matter, rather than quietly generating a caveated document from a mostly-empty draft. Asking for a client-safe version now asks who it's actually for by name, rather than guessing an audience — and if the strategy's own stakeholder list can't supply a plausible outside reader, the skill says so instead of inventing one.

### Fixed

- **Internal and agent stakeholders no longer disappear because they already appear in a different role.** The same person or agent showing up as, say, a user doesn't excuse the interview from separately asking whether they're also the developer, the product owner, or on support — each capacity is checked independently, for humans and agents alike.
- **Non-goals stopped being just a restated feature-deferral list** — see "Non-goals are quality bars" above; this was the live-run bug that motivated it.
- **The dimension inventory stopped mixing releases together and losing scope precision** — see "The dimension inventory is release-scoped" above; this was the live-run bug that motivated it, extended (once a further live-run session hit the same gap one step downstream) to keep that precision intact through the entire risk map.
- **Surfacing a dimension's importance stopped quietly prejudging whether it's currently good or bad** — see "A clean separation" above; this was the live-run bug that motivated it. The fix catches the mistake in both directions: assuming something is broken is exactly as wrong as assuming it's fine.

## [0.3.7] — 2026-06-26

Ships the Effective Comms integration that landed on `main` after `0.3.6` was tagged. The `0.3.6` release stamped strategy docs with the skill version; this release wires the communication gate into the strategy producers and reviewers, and declares the ECS plugin dependency — so the released `0.3.7` content matches `main` again.

### Added

- **Effective Comms gate for QSS outputs.** `/quality-strategy`, `/test-strategy`, and `/tooling-strategy` now run `/effective-comms` before finalizing their user-facing documents. The gate checks whether the output works for its reader: no unexplained numbered references, no hidden author/scratch context, no retained rejected ideas unless provenance is the point, no leaked process history, no buried recommendation, and clear uncertainty.
- **Review backstops for communication failures.** `/quality-strategy-review` (new check 23) and `/test-strategy-review` (new check 16) now flag reader-facing failures their existing process-leak scans do not catch, including coordinate-before-name wording, retained rejected ideas, and buried recommendations.
- **Install-time dependency on the public ECS plugin.** QSS now declares `effective-comms ~0.1.0` as a Claude Code plugin dependency and resolves it from the public [`tollens-ai/effective-comms-skills`](https://github.com/tollens-ai/effective-comms-skills) repo. QSS does **not** vendor a copy of the ECS skill; there is one canonical ECS implementation. The `tollens` marketplace pins the dependency to `effective-comms--v0.1.0`.

### Validation

- ECS feedback regressions EC-1/EC-2/EC-3 passed in the private validation suite.
- Claude Code install smoke passed locally: installing `quality-strategy@tollens` installed `effective-comms` automatically as a dependency.

## [0.3.6] — 2026-06-15

### Added

- **Version-stamped strategy documents.** Every generated strategy doc now carries a header stamp naming the skill version that produced it — e.g. `*Generated by the quality-strategy skill — quality-strategy-skills (tollens-ai) v0.3.6 · github.com/tollens-ai/quality-strategy-skills*`. This lets an alpha bug report filed against a strategy trace straight back to the exact skill version that generated it. The stamp covers all three durable strategy producers: `/quality-strategy` (`strategy.md`, sub-step 1.1), `/test-strategy` (`test-strategy.md`, sub-step 1), and `/tooling-strategy` (`tooling-strategy.md`). The version is **read from `.claude-plugin/plugin.json`'s `version` field at generation time** — the same single source of truth used for releases (and already used by `/quality-artefacts`' watermark) — so there is no second number to maintain and the stamp can never drift from the code: the skill prose carries an *instruction to read the field*, never a literal version. On a revision/update run the stamp is refreshed to the current version (the prior version's stamp is preserved in the archived snapshot). `/operational-distillation` inserts its TL;DR below the stamp and leaves it intact; `/quality-strategy-review` (check 21) and `/test-strategy-review` (check 15) exempt the stamp from the process-note leak strip as deliberate provenance attribution — but flag an unresolved literal `<version>` placeholder. Deferred (noted, not done this release): stamping the derived `/strategy-variants` one-pager / client docs and the review reports, which are derived/ephemeral rather than the primary kept artefact.

## [0.3.5] — 2026-06-12

### Changed

- Dropped the overt Spotify-Wrapped references from all user-facing surfaces (skill description, principle 7, the no-brief gallery, the multi-frame story preset, ROADMAP, the Fernly sample README). The preset is described on its own terms — a full-viewport frame-by-frame slideshow telling the strategy's arc — with no behaviour change. Generated artefacts inherit the skill's vocabulary, so this also stops "Wrapped" appearing on rendered story frames.

## [0.3.4] — 2026-06-11

### Changed

- `/quality-artefacts`, **the gallery** (live-testing items 13 / AU-1): a bare invocation or "what can you make?" no longer guesses a default view — it opens a gallery with the **freeform describe-your-own path headlined above** the worked examples, which become **pickable starting points** (social card / risk heatmap / multi-frame roast-with-receipts story / interactive dashboard / radar). The presets stay starting points, never a menu: when the user **did** bring a brief, they are still never routing keys — the "worked examples, not a menu" doctrine is untouched for that path.
- `/quality-artefacts`, **register is elicited, never assumed** (items 14 / AU-3): when the ask carries no tone/register signal, the skill asks ("straight for stakeholders, or shall I roast you? — receipts either way") or folds register into the gallery moment, instead of defaulting to austere. Permission to want something fun, silly, or savage is granted **explicitly** — bland-in must not become austere-out; a roast cashes out to principle 1's evidence-backed-savagery licence.
- `/quality-artefacts`, **revelation-led titles** (Retest C / AVo-7 carry-forward): principle 6 sharpened — when the source doc carries a never-realised-you-cared truth, the **title leads with it** (revelation as the hero line, the stat a supporting band). A generic framing title sitting above a revelation demoted to a caption or left to inference is now the **named failure**, with a FAIL/PASS instance; the step-4 owner-read checks it.

## [0.3.3] — 2026-06-11

Encodes ten findings from the maintainer's launch-gate run of `/quality-strategy` (a full cold run on a real mid-launch fixture — see `docs/ALPHA-FEEDBACK.md`, Round 2). The through-line the maintainer named: **kill status-quo bias and one-directional goal-tracing** — stop treating the current state of the repo as evidence of user intent, and stop tracing risks in only the direction a stated goal pulls.

### Added

- **The non-goal protocol** (`/quality-strategy` sub-step 4.1): scope cuts are now *proposed, never assumed*. Two disciplines on every candidate non-goal — (a) **reason forward, never from absence**: a cut derived from "it isn't built" must be tested forward against the stated goals and named events before it may be proposed (a stated Twitter launch implies a signup spike implies confirmation-email scale); an absence a stated goal demands is a gap, not a non-goal; (b) **propose and confirm, one at a time**: each candidate is named back with its one-line why and confirmed before it enters the doc — batching cuts behind a single one-liner is the named failure. Mirrored into `/test-strategy`'s not-testing list, and audited by `/quality-strategy-review` (check 1a + two subagent-C lenses) and `/test-strategy-review` (check 8).
- **Floors and default-in dimensions** (sub-step 5.1, the guaranteed-inclusion layer) — the fix for a sweep that produced *no security dimension* on a project whose headline risk was forgeable client-writable ratings. **Floors** (credential leakage, PII leakage, irrecoverable loss of entrusted data, legality, blast radius) enter unconditionally where their factual predicate holds — checked in the pre-read, never rated None, never a non-goal; only what they demand here is negotiable. **Default-ins** (security always; data integrity where user data exists; unbounded spend — the flagship — where the system can spend) appear by default, removable only by an explicit recorded eyes-open accepted-risk; their goal-trace runs **in reverse** — the skill builds the trace from the user's own goals to convince, then offers the honest fork. Silent inclusion is as wrong as silent exclusion. Wired through the pre-read (floor predicates), the sealed rating brief and merge (floors never None), sub-step 5.5 (Check 6), and `/quality-strategy-review` (check 4a).
- **Agent-driven workflow triggers the agent-facing cluster** (sub-step 5.1): a stated autonomous-agent workflow ("I just tell Claude what I want") is a goal statement, so the bottom-up pass now fires agent-diagnosability, agent-audience observability/debuggability, agent-verifiable testability, and agent-readability/context-efficiency directly from it — rather than hoping the top-down reference pass catches them.
- **Counter-pressure before naming a behaviour a defect** (sub-step 6.3): before a behaviour is booked as a defect, ask what it protects (purpose / domain convention); where two dimensions pull opposite ways, present both as a tradeoff for the user to arbitrate (citing domain norms), never one side as a bug. The upstream twin of the 5.4 tradeoffs-at-recombination discipline. (The launch case: a chess clock that runs on disconnect is the domain norm — pausing it enables disconnect-to-think cheating.)
- `/quality-artefacts` is now **offered at the payoff moment** — alongside `/test-strategy` and `/tooling-strategy` at the final step and the review close, with a teaser at the risk-map completion. The moment the strategy completes is the natural delight payoff ("see it as a dashboard/card you can share"); previously the artefact skill was discoverable only from the README.

### Changed

- **The old/new-world pass is now machinery, not a ceremony** (sub-step 5.3): the agent-vs-human audience reasoning stays mandatory and recorded for every trap dimension, but it runs as silent machinery feeding the rated inventory; only the splits made and genuine audience tensions surface for the user to react to. The dimension-by-dimension confirmation walk that read as "internal logic leaking out" is gone; neutral decisions are recorded on disk, not recited.
- **Actuals come from evidence, not code-reading** (sub-step 6.2): the actual-state pass now works an explicit evidence hierarchy — existing test results / CI / reports → the tests themselves → ask the user what testing and lived evidence exists → code reading last, labelled inference, capped at Medium confidence, never a confident "at bar". `/oracle-adequacy` gains the matching mismatch.
- **Resume after `/clear` is stated, never guessed** (all three strategy skills): every break/clear seam now states the resume mechanism — run `/<skill>` again; it reads your `quality/` docs and resumes from where you left off. (Reproduced independently by two testers.)
- **Time-empathy is grounded in the actual session** (`/quality-strategy` progress-line pattern): lines acknowledging elapsed effort appear only when true of *this* run — a half-hour lightweight session gets no weariness theatre.

- `/test-strategy-review` gains the **scaffolding-leak backstop** the quality-strategy leg already had: subagent B's new check 15 ports `/quality-strategy-review`'s check 21 — a whole-doc scan (inherited content included) for process-note commentary, dispatch/scratch narration, turn/sub-step lineage refs, and `.scratch/` path citations in "Sources consulted" lines (FLAG-severity, matching the quality-strategy leg). Previously such a leak in a *test* strategy survived the skill's own audit. The same skill's Dealbreaker-prioritisation check (check 3) is reworded to match what it actually verifies — every Dealbreaker is *addressed by* a Tier-1/2 learning need, which does not forbid a dealbreaker dimension also carrying lower-tier needs.

## [0.3.2] — 2026-06-11

### Added

- **Archive before revision** across the three strategy skills: entering `/quality-strategy` revision mode, or updating an existing doc via `/test-strategy` or `/tooling-strategy`, first snapshots the current doc to `quality/archive/<name>-<last-updated-date>.md`, named in the closing summary — revisions leave a before/after trail users can compare and share.
- `/quality-strategy`: **revision mode restructured as three movements** — *look back* (deliberately anchored: every prior H/M item, open question, and planned action gets a what-happened verdict; "fixed" needs evidence or is recorded as believed-fixed at honest confidence), *look forward* (deliberately blind: sealed fresh-eyes dispatches that never see the prior doc — a fresh defect recon and a what's-new context scan, writing `revision-defect-recon.md` and `revision-context-scan.md` to scratch), *reconcile* (contradictions with inherited content surfaced, never silently inherited). The movements' results land in a `## Since the last revision` section — content, not machinery — which is also how the review detects and scopes a revision. The guard: fixing all known problems is not the same as being good now — the gaps have moved.
- `/test-strategy`: the post-cycle update (revision path c) gains the same two disciplines, proportionately — evidence-backed what-happened verdicts on prior learning needs; a fresh scan for new learning needs, with the standing defect recon kept blind to the prior doc.
- `/quality-strategy-review` check 22 and `/test-strategy-review` check 14: **revision-anchoring checks** — the reviewer diffs the archived prior version against the revision instead of trusting its self-report; an unevidenced "fixed" fails like any high-confidence claim without an oracle; a closures-only diff is the anchoring signature, treated with the same suspicion as "everything at bar".
- **Alpha-feedback round 1** (alpha tester #1, 2026-06-11 — see `docs/ALPHA-FEEDBACK.md` for item → change → where): the three strategy skills may be heavy **only where the weight traces to the user's own stated goals** (every ask's why framed in the user's words; a standing pruning rule for untraceable items; the honest fork on resistance — be convinced or revise the goal, both recorded); a **plain-words itinerary at session start**, a **progress line and visible exit at every boundary** (never let the process feel unbounded), and the **commit-cadence question** (commit-as-we-go / all at the end / leave it to you — honoured at every boundary, recorded so it survives `/clear`).
- **The delight north star**: `PHILOSOPHY.md` gains *The revelation is the product* — the highest-value moment the framework produces is a revelation the user's own goals imply but they never articulated. The interview skills deliver never-mentioned-but-implied finds as named moments (*"you didn't mention X — but given what you said about Y, you'd care a lot if X failed. Does that land?"*), recorded land-or-not either way; the artefact skill's revelation tier is sharpened on its own branch.

### Changed

- **The Highs check re-aimed at justification** (alpha feedback): the rating-step, tiering, and review checks no longer push back on High-dominated distributions by count — by rating time the low-stakes material was already deliberately cut, so High-dominated is the expected shape. Every High must cite its stakeholder Dealbreaker bar; unjustified Highs are challenged individually; an all-justified result is stated plainly ("a genuinely high-stakes surface"). Vocabulary fixed throughout: **High = important, not in-trouble** — importance and current state are orthogonal axes. Anti-inflation guards remain for required *levels*, where inflation actually lives.

## [0.3.1] — 2026-06-11

### Added

- `/test-strategy`: **exploratory testing** and **testing in production** as named method classes (FRAMINGS #11) — run by an *exploratory tester*; testing in production means real users plus observability instrumentation covering the named risks and downsides; AI exploratory testing labelled *unproven — calibrate before trusting*.
- `/quality-strategy`: a **targeted design deep-dive** during risk-map actuals scoring (6.2) — the second touch of a two-touch design review, dispatched on exactly the thin-evidence areas, with test-coverage-vs-risk skew as a standing lens.
- `/quality-strategy`: **anti-overshoot** in required levels (6.1) — "goal is met" is a positive verdict even when the solution isn't long-term robust; record a future-release change note instead of gold-plating. Good-enough-on-purpose tradeoffs are recorded where stakeholder bars recombine (the 5.4 merge).
- Observability-web cross-links in the dimension reference list: observability serves debuggability; fixability (new entry) includes robustness against regressions; recoverability includes safe rollback.
- This changelog.

## [0.3.0] — 2026-06-11

### Added

- `/quality-artefacts`: generative shareable-artefact skill — describe the view you want and it designs a bespoke, self-contained SVG/HTML file from your strategy, poster-first, then scores itself against seven principles (three hard gates) before presenting.
- `examples/fernly/`: a complete worked sample on a fictional plant-care app — full strategy, test strategy, and three generated artefacts. One project's answers, not a template; doubles as the regression fixture for downstream skills.

## [0.2.9] — 2026-06-11

### Added

- Cross-feature interaction / flow completeness in the dimension reference list — the signature gap of systems built feature-at-a-time by agents.
- A standing fresh-eyes defect-recon learning need in `/test-strategy` — independent blind agent passes over the source, loop-until-dry.

## [0.2.8] — 2026-06-10

### Added

- First public alpha release: `/quality-strategy`, `/test-strategy`, `/tooling-strategy`, `/strategy-variants`, and their review and adequacy sub-skills.
