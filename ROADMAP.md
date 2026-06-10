# Roadmap

*Last updated 2026-06-10. This is the build order as we currently judge it — alpha feedback can and should reorder it. The reasoning behind the bigger calls, and what would change our minds, lives in [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md).*

## Now — alpha

The pack is live with its first wave of testers. The current work is exercising every skill on real projects, fixing what misfires, and holding the bar described in the README. If you're testing: the most useful thing you can do is [open an issue](https://github.com/tollens-ai/quality-strategy-skills/issues) with what you ran, what it produced, and what you expected instead.

## Next — shareable artefacts & quality dashboards

A finished `quality/strategy.md` is honest, but it's several hundred lines of markdown — built to be *used*, not to be *glanced at* or *shared*. The next major piece is a generative post-processing skill that turns the strategy into views people can take in at a glance:

- **Quality radar** — dimensions as axes, required level vs where you actually are, the gaps visible in one shape.
- **Risk heatmap** — dimensions × gap severity and confidence, colour-coded.
- **Social card** — the project, its one-line quality verdict, and the headline risks, sized to screenshot.
- **Interactive dashboard** — the whole strategy as a navigable HTML page: TL;DR, collapsible dimensions, sortable risk map.
- **Freeform — the headline capability**: describe the view you want ("a dashboard of just the payment risks for my standup") and the skill builds that bespoke view from your strategy.

Everything self-contained SVG/HTML — no daemon, no service, nothing to install — keeping the pack's "markdown skills, nothing else" promise. Re-run it after a strategy revision and the views update with it: the strategy as a living, visible map of where quality stands, not a document that goes stale in a drawer.

## After that

In rough priority order:

- **Quality dimensions for AI / non-deterministic / agentic products** *(research — top priority)*. The framework needs first-class dimensions for products whose "correctness" is a metric distribution that drifts over time: eval-oracle adequacy, drift-awareness, training/serving skew. Today you'd hand-craft this part (see Known limitations in the README).
- **`/tooling-strategy-review`** — the audit companion for the newest strategy skill, completing the strategy/review pairing the other two strategies have.
- **Lean-mode investigation** — whether a lighter *view* of the same rigour is possible for small jobs without quietly lowering the bar. We're probing this with validation runs before designing anything.
- **Per-stakeholder risk-map decomposition** — the dimension-rating step already works per-stakeholder and surfaces divergence; the risk map doesn't yet.
- **`/strategy-variants` field-hardening** — real client/team use will tell us whether the omit-never-lie discipline holds.
- **Smaller planned skills** — `/priority-analysis` (multi-stakeholder prioritisation help), `/feedback-synthesis` (curate the `.skill-feedback.md` notes the skills jot as they run), `/pre-read` (standalone project digest).

## What we won't do

- Add a daemon, a database, or a binary. The pack stays markdown skills.
- Ship a "fast mode" that skips the thinking. Where we offer lighter ceremony it will be a lighter *view* of the same rigour, never a lower bar.
- Grow this pack into the full end-to-end workflow. The pack stays standalone skills that you fit into your own process. The end-to-end version — agents supporting every step of quality management, with feedback loops, evidence and reporting, and release-confidence assessment — is what the Tollens product itself is for.
