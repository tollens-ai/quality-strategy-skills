# Quality Strategy Skills

A set of Claude Code skills for producing and using a software *quality strategy* — a business-level document that says who matters for your project, what they value, where you're exposed, and what to do about it. Plus the engineering-level *test strategy* that operationalises it.

The thinking is grounded in **Edmund Pringle's quality framework**: quality is value to someone who matters; testing is investigation to find out what's actually true; risk is danger to quality; the job is to maximise quality improvement for the time invested.

## Why this exists

Most teams don't have a quality strategy. The teams that do mostly have a test plan misnamed. We think a real quality strategy is load-bearing infrastructure for software in the age of AI agents — when most code is being written by agents who don't know what quality means for *your* project, an explicit strategy is what stops them shipping confidently in the wrong direction.

Writing a quality strategy is just the start. Delivering the right quality for your product over time is an ongoing process, and a much bigger one — involving testing, measurement, stakeholder conversations, and the cumulative judgment of everyone shipping the software. This skill pack covers the front end of that work: producing the strategy, operationalising it as a test strategy, and using it at decision points. It's intentionally minimal — markdown skills, no daemon, no database, no binary to install.

## Who it's for

- Solo developers and small teams who want a quality strategy but don't want to read a textbook to make one.
- Anyone running AI agents who needs the agents to make quality calls without escalating every decision.
- Engineering leaders who want a structured framework for what "good" looks like.

## The skills

Available now:

| Skill | Purpose |
|---|---|
| `/quality-strategy` | Walk a 7-step interview to produce `quality/strategy.md`. Use when starting a project, planning a major release, or when "quality" is being talked about vaguely. |
| `/quality-strategy-review` | Meta-audit. Applies seven indicators of a good quality strategy and surfaces failure modes. Used as the final step of `/quality-strategy` and standalone on existing strategies. |

Planned (not yet implemented):

| Skill | Purpose |
|---|---|
| `/test-strategy` | Produce the engineering-level companion document that operationalises the quality strategy. |
| `/quality-check` | On-the-fly decision support. "This bug arrived — what does the strategy say?" |
| `/risk-map-update` | Short pass to walk the risk map and re-rate after testing or stakeholder conversations. |

## Install

```bash
git clone https://github.com/tollens-ai/quality-strategy-skills
cp -r quality-strategy-skills/skills/* ~/.claude/skills/
```

Then in any project: `/quality-strategy` to start. Output goes to `quality/strategy.md` at the project root.

## What the skills will and won't do

**They interview you.** They do not infer your quality strategy from your code. The most important inputs — who matters, what they value, what's a non-goal, where you'll accept risk — cannot be guessed from a repo and would be guessed wrongly. The skills pre-read README, docs, and recent commits to bring informed questions to the conversation, but everything load-bearing is asked, not assumed.

**They are facilitators, not authors.** The skills walk a structured process and push back when something is missing or vague. They don't replace your judgment.

**They produce a living document.** `quality/strategy.md` is meant to be read, updated, and used at decision points — not written once and filed.

## How long does it take?

A serious quality strategy from `/quality-strategy` typically takes **1–2 hours** of focused interview. The skill is designed to be **paused and resumed** at natural break points — and is opinionated about which sub-steps belong tightly together and which are natural seams.

In practice most users do `/quality-strategy` over **2–3 sessions**, with `/clear` between. The skill suggests when to take a break and when to push on. The strategy doc is written incrementally so any partial run is durable.

## What's where

- `PHILOSOPHY.md` — the spine. Read this if you want to understand why the skills do what they do.
- `OPEN-QUESTIONS.md` — design decisions made under uncertainty, places we're not sure we got it right, things to test in real-world running.
- `skills/` — the skills themselves. Each is a directory with a `SKILL.md` orchestrator and, where the work warrants it, a `steps/` directory with one file per phase.

## Credits

The quality framework is by **Edmund Pringle**. His blog series at [epkconsulting.substack.com](https://epkconsulting.substack.com/) is the single best read on the subject. The framework draws on the context-driven testing tradition (Bach, Bolton, Weinberg).

Skills implementation by **Yanqing Cheng**. Built with Claude Code.

## License

Licensed under either of:

- MIT License ([LICENSE-MIT](LICENSE-MIT))
- Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE))

at your option.

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in this work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
