# Skill reference

Fourteen skills ship in the pack. You only ever *start* seven of them; the rest are sub-skills the strategies invoke for you as they run — though each also works standalone when you want one check on its own. The [README's diagram](../README.md#how-the-skills-fit-together) shows how they connect. A complete worked sample of the documents (and three generated artefacts) lives at [`examples/fernly/`](../examples/fernly/README.md) — one fictional project's answers, not a template.

## Skills you run directly

| Skill | Purpose |
|---|---|
| `/quality-strategy` | Walk a 7-step interview to produce `quality/strategy.md`. Use when starting a project, planning a major release, or when "quality" is being talked about vaguely. |
| `/test-strategy` | The **testing lane** — a deliberately light follow-up: ingest the release's quality strategy, filter for the ilities investigation can make a dent on, then per ility discuss what testing you have, what to improve, what to add. High-level ideas and questions, not another interview. |
| `/oracle-strategy` | The **judging lane** — same light shape: filter for the ilities where better oracles/instruments would make the project knowable (Unknowns nothing can judge yet, claims resting on sand), then have/improve/add per ility. Hands agreed builds to `/tooling-strategy`. |
| `/process-strategy` | The **rules & process lane** — same light shape: filter for the ilities where rules, invariants, standards docs, or repeatable processes would prevent whole defect classes, then have/improve/add per ility. Each agreed move names where the rule lives and who or what follows it. |
| `/tooling-strategy` | The build plan for "how do we know?". Gathers everything the lanes couldn't answer — risk-map Unknowns nothing can judge yet, `/oracle-strategy`'s agreed builds, `/test-strategy`'s blocked questions — into one prioritised oracle/instrument build plan. The most re-runnable doc in the pack. |
| `/strategy-variants` | Post-processing. From a finished, reviewed `quality/strategy.md`, derive audience-facing variants without touching the original: a distributable one-pager and a client-safe ("polite") version. Omits and re-pitches; never asserts quality the strategy doesn't support. |
| `/quality-artefacts` | Post-processing. Describe the view you want — "a tweetable summary of where quality stands", "a dashboard of the payment risks for my standup" — and it designs ONE bespoke, self-contained SVG/HTML artefact from the strategy, written to `quality/artefacts/`. Generative, not templated: the presets (social card, multi-frame story, risk heatmap, interactive dashboard, quality radar) are worked examples, not a menu. Honest sourcing carries into the picture — an Unknown is drawn as visibly uncharted, never painted green. Works offline from `file://`; re-run after a revision to refresh a view. |

## Sub-skills (invoked for you; each also runs standalone)

| Skill | Purpose |
|---|---|
| `/quality-strategy-review` | Meta-audit. Applies seven indicators of a good quality strategy — org-wide clarity, instrumentation from the start, a legible work plan, precision over comfort, decision support at the edges, quick re-orientation, and explicit non-goals — and surfaces failure modes. Final step of `/quality-strategy`; also standalone on existing strategies. |
| `/test-strategy-review` | Meta-audit of a test strategy: would executing it move the quality strategy in the right direction, with the right priority? |
| `/oracle-adequacy` | The "how do we know?" audit for actual-state claims — are the oracles behind a strategy's actuals trustworthy? Offered from `/oracle-strategy` when trust is contested, or standalone. Shares its oracle taxonomy with `/tooling-adequacy`. |
| `/tooling-adequacy` | The "how do we know?" check for the *test* lane. Audits whether a question the lane wants answered has an adequate *instrument* (to exercise/observe) and *oracle* (to judge), including cheap simulated/reference oracles worth building. Offered from `/test-strategy`, or standalone. |
| `/contradiction-check` | Cross-part contradiction detection for a strategy doc. Runs at `/quality-strategy` step boundaries, or standalone. Finds internal inconsistencies (not quality weaknesses). |
| `/operational-distillation` | TL;DR + triage rubric at the top of a strategy, so it's usable at a glance. Runs at the end of `/quality-strategy`, or standalone. |
| `/effective-comms` | The shared communication gate. In this v0 slice, `/quality-strategy`, the three lanes (`/test-strategy`, `/oracle-strategy`, `/process-strategy`), and `/tooling-strategy` run it before finalizing their user-facing documents; the review skills include narrower Effective Comms backstop checks. The pass prepares a communications brief (objective / audience / what they need and already know), then applies a rubric that catches audience mismatch, hidden scratch context, numbered references without meaning, names-before-coordinates, retained rejected ideas, leaked agent process-history, and a buried recommendation. Product-neutral, and shipped as its own plugin (`effective-comms`, [github.com/tollens-ai/effective-comms-skills](https://github.com/tollens-ai/effective-comms-skills)): `quality-strategy` declares it as a dependency, so it installs automatically with this pack — no manual second install. Runs standalone on any agent-written user-facing output; wiring `/strategy-variants` and `/quality-artefacts` is a roadmap follow-up. |

## Planned (not yet implemented)

| Skill | Purpose |
|---|---|
| `/tooling-strategy-review` | Meta-audit of a tooling strategy, completing the strategy/review pairing the other two strategies have. |
| `/priority-analysis` | Optional multi-stakeholder help prioritising the plan of work. |
| `/feedback-synthesis` | Curate the notes the skills jot down about their own rough edges as you run (a `.skill-feedback.md` file beside the `quality/` docs) into a maintainer-friendly summary. |
| `/pre-read` | Standalone project digest. |

Sequencing for all of these: [ROADMAP.md](../ROADMAP.md).
