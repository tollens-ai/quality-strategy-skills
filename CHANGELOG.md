# Changelog

All notable changes to the `quality-strategy` plugin, oldest at the bottom. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions are the plugin manifest's. To pick up a new version, run `claude plugin update quality-strategy` (or `/plugin update quality-strategy@tollens` inside Claude Code).

**Release discipline (maintainers):** every version bump updates this file *in the same commit* — a bump without a changelog entry doesn't merge.

## [0.3.2] — 2026-06-11

### Added

- **Archive before revision** across the three strategy skills: entering `/quality-strategy` revision mode, or updating an existing doc via `/test-strategy` or `/tooling-strategy`, first snapshots the current doc to `quality/archive/<name>-<last-updated-date>.md`, named in the closing summary — revisions leave a before/after trail users can compare and share.
- `/quality-strategy`: **revision mode restructured as three movements** — *look back* (deliberately anchored: every prior H/M item, open question, and planned action gets a what-happened verdict; "fixed" needs evidence or is recorded as believed-fixed at honest confidence), *look forward* (deliberately blind: sealed fresh-eyes dispatches that never see the prior doc — a fresh defect recon and a what's-new context scan, writing `revision-defect-recon.md` and `revision-context-scan.md` to scratch), *reconcile* (contradictions with inherited content surfaced, never silently inherited). The movements' results land in a `## Since the last revision` section — content, not machinery — which is also how the review detects and scopes a revision. The guard: fixing all known problems is not the same as being good now — the gaps have moved.
- `/test-strategy`: the post-cycle update (revision path c) gains the same two disciplines, proportionately — evidence-backed what-happened verdicts on prior learning needs; a fresh scan for new learning needs, with the standing defect recon kept blind to the prior doc.
- `/quality-strategy-review` check 22 and `/test-strategy-review` check 14: **revision-anchoring checks** — the reviewer diffs the archived prior version against the revision instead of trusting its self-report; an unevidenced "fixed" fails like any high-confidence claim without an oracle; a closures-only diff is the anchoring signature, treated with the same suspicion as "everything at bar".

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
