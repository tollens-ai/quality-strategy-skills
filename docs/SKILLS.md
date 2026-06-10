# Skill reference

Ten skills ship in the pack. You only ever *start* four of them; the rest are sub-skills the strategies invoke for you as they run — though each also works standalone when you want one check on its own. The [README's diagram](../README.md#how-the-skills-fit-together) shows how they connect.

## Skills you run directly

| Skill | Purpose |
|---|---|
| `/quality-strategy` | Walk a 7-step interview to produce `quality/strategy.md`. Use when starting a project, planning a major release, or when "quality" is being talked about vaguely. |
| `/test-strategy` | Produce the engineering-level companion that operationalises the quality strategy — what to investigate, in what order, and how to split human vs agent effort. |
| `/tooling-strategy` | The strategy for "how do we know?". Gathers everything the quality and test strategies couldn't answer — Unknown/Gated/over-confident actuals, learning needs blocked on missing instruments or oracles — into one prioritised oracle/instrument build plan. Run it as soon as unanswerables exist: directly after `/quality-strategy` when the risk map is mostly blind, after `/test-strategy` when it's mostly answerable. The most re-runnable of the three. |
| `/strategy-variants` | Post-processing. From a finished, reviewed `quality/strategy.md`, derive audience-facing variants without touching the original: a distributable one-pager and a client-safe ("polite") version. Omits and re-pitches; never asserts quality the strategy doesn't support. |

## Sub-skills (invoked for you; each also runs standalone)

| Skill | Purpose |
|---|---|
| `/quality-strategy-review` | Meta-audit. Applies seven indicators of a good quality strategy — org-wide clarity, instrumentation from the start, a legible work plan, precision over comfort, decision support at the edges, quick re-orientation, and explicit non-goals — and surfaces failure modes. Final step of `/quality-strategy`; also standalone on existing strategies. |
| `/test-strategy-review` | Meta-audit of a test strategy: would executing it move the quality strategy in the right direction, with the right priority? |
| `/oracle-adequacy` | The "how do we know?" check for the *quality* strategy — audits the oracles behind its actual-state assessments. Invoked during the risk-map pass, or standalone. Shares its oracle taxonomy with `/tooling-adequacy`. |
| `/tooling-adequacy` | The "how do we know?" check for the *test* strategy. Audits whether each learning need has an adequate *instrument* (to exercise/observe) and *oracle* (to judge), including cheap simulated/reference oracles worth building. |
| `/contradiction-check` | Cross-part contradiction detection for a strategy doc. Runs at `/quality-strategy` step boundaries, or standalone. Finds internal inconsistencies (not quality weaknesses). |
| `/operational-distillation` | TL;DR + triage rubric at the top of a strategy, so it's usable at a glance. Runs at the end of `/quality-strategy`, or standalone. |

## Planned (not yet implemented)

| Skill | Purpose |
|---|---|
| `/tooling-strategy-review` | Meta-audit of a tooling strategy, completing the strategy/review pairing the other two strategies have. |
| `/priority-analysis` | Optional multi-stakeholder help prioritising the plan of work. |
| `/feedback-synthesis` | Curate the notes the skills jot down about their own rough edges as you run (a `.skill-feedback.md` file at the project root) into a maintainer-friendly summary. |
| `/pre-read` | Standalone project digest. |

Sequencing for all of these: [ROADMAP.md](../ROADMAP.md).
