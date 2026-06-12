# Roadmap

*Last updated 2026-06-11. This is the build order as we currently judge it — alpha feedback can and should reorder it. The reasoning behind the bigger calls, and what would change our minds, lives in [OPEN-QUESTIONS.md](OPEN-QUESTIONS.md).*

## Now — alpha

The pack is live with its first wave of testers. The current work is exercising every skill on real projects, fixing what misfires, and holding the bar described in the README. If you're testing: the most useful thing you can do is [open an issue](https://github.com/tollens-ai/quality-strategy-skills/issues) with what you ran, what it produced, and what you expected instead.

## Just shipped — `/quality-artefacts` (0.3.0)

The former headline "Next" item, now in the pack. A generative post-processing skill: describe the view you want ("a tweetable summary of where quality stands", "a dashboard of just the payment risks for my standup") and it designs a bespoke, self-contained SVG/HTML artefact from your strategy — honest about Unknowns (an unverifiable dimension is drawn as visibly uncharted, never painted green). The named presets — social card, multi-frame story, risk heatmap, interactive dashboard, quality radar — are worked examples, not a menu; re-run after a strategy revision and the views update with it. Worked examples live on the Fernly sample under [`examples/fernly/`](examples/fernly/). Everything stays self-contained SVG/HTML — no daemon, no service, nothing to install.

## Next — quality dimensions for AI / non-deterministic / agentic products

*(research — top priority).* The framework needs first-class dimensions for products whose "correctness" is a metric distribution that drifts over time: eval-oracle adequacy, drift-awareness, training/serving skew. Today you'd hand-craft this part (see Known limitations in the README).

## After that

In rough priority order:

- **`/tooling-strategy-review`** — the audit companion for the newest strategy skill, completing the strategy/review pairing the other two strategies have.
- **Lean-mode investigation** — whether a lighter *view* of the same rigour is possible for small jobs without quietly lowering the bar. We're probing this with validation runs before designing anything.
- **Per-stakeholder risk-map decomposition** — the dimension-rating step already works per-stakeholder and surfaces divergence; the risk map doesn't yet.
- **`/strategy-variants` field-hardening** — real client/team use will tell us whether the omit-never-lie discipline holds.
- **A "progress story" artefact preset** — the before/after artefact: `/quality-artefacts` already archives the prior version of every view it refreshes, so the natural next move is a preset that renders two versions side by side — the year-over-year move, showing the gaps that closed between strategy revisions.
- **Smaller planned skills** — `/priority-analysis` (multi-stakeholder prioritisation help), `/feedback-synthesis` (curate the `.skill-feedback.md` notes the skills jot as they run), `/pre-read` (standalone project digest).

## What we won't do

- Add a daemon, a database, or a binary. The pack stays markdown skills.
- Ship a "fast mode" that skips the thinking. Where we offer lighter ceremony it will be a lighter *view* of the same rigour, never a lower bar.
- Grow this pack into the full end-to-end workflow. The pack stays standalone skills that you fit into your own process. The end-to-end version — agents supporting every step of quality management, with feedback loops, evidence and reporting, and release-confidence assessment — is what the Tollens product itself is for.
