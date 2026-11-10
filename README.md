# Quality strategy skills

This page is written for people. The skills carry their own instructions and do not depend on this page.

This pack helps you make a project's quality choices explicit: who matters, what they need,
what the evidence supports, and what needs work or further conversation.

Call the `quality-strategy` skill to find where to start and what comes next, or go straight to the
part you need. A simple strategy can go on in one session; a big one is better split across fresh
ones. The tables here name each skill; [Install and run](#install-and-run) shows how to call one in
your tool.

| Skill | What you get |
|---|---|
| [establish-project-context](skills/establish-project-context/SKILL.md) | Purpose, constraints, releases, product areas, and stakeholders |
| [stakeholder-deepdive](skills/stakeholder-deepdive/SKILL.md) | One stakeholder or group's view: what matters to them, how good it must be for them, and what comes first for them |
| [prioritise-release-quality](skills/prioritise-release-quality/SKILL.md) | Every stakeholder's view combined: how much each priority matters, what is not a priority for this release, and tensions |
| [connect-quality-strategy](skills/connect-quality-strategy/SKILL.md) | The strategy written up straight after the priorities: an opening with its bottom line, and a section for each priority (what good looks like, how we will know, where it stands, and what to do about it, with its open questions), reviewed by a reader who did not write it |
| [priority-deepdive](skills/priority-deepdive/SKILL.md) | One priority worked further, the one you choose: what was found and what to do next |

To see what the written strategy will look like, every heading with a note on what goes under it,
read [the strategy template](references/strategy-template.md).

Each skill explains its purpose and how to judge when the work is done. Bring existing notes or
answers; you do not have to complete every earlier skill. A stakeholder conversation can
finish with useful open questions, and a strategy is useful from the moment it is written up.

## Start where you are

For a new project, start with the project's context and the people and agents whose views matter.
For an existing project, reuse that knowledge and revisit what changed.

`quality-strategy` first asks whether anything about quality is on your mind. If so, it recommends
`quality-interview` to give those concerns room before the strategy steps; otherwise it offers a
pre-read of your project's files and names the first step. Straight after the priorities,
`connect-quality-strategy` writes the strategy up, true as far as it goes, with each open question
ending in a next action. It then offers `priority-deepdive`, one priority at a time, and
`quality-report`, a picture of where your project's quality stands that you can share. You can also ask for the interview or a single
step directly.

Stakeholder groups can nest and overlap. Their relationships to products, tools, workflows, and
outputs are recorded separately. Use the groups that matter to your project rather than a fixed
customer/maintainer split.

Project context and stakeholder profiles can be reused across releases. Each release keeps its
own choices and what they rest on. The default documents live under a chosen `quality/` directory;
existing documents can keep their own homes. Before saving candid answers, the skill agrees
with you where they will live and who they are for, and that choice carries across the steps.

The other skills support the route or work on their own:

| Skill | Use it for |
|---|---|
| [quality-strategy](skills/quality-strategy/SKILL.md) | Find where the strategy stands and what comes next |
| [quality-setup](skills/quality-setup/SKILL.md) | Agree where records live, who they are for and permission to commit them |
| [quality-interview](skills/quality-interview/SKILL.md) | Explore what is on your mind in your own words |
| [pre-read](skills/pre-read/SKILL.md) | Read a project's files and give a sourced account of major issues, tests and agent-friendliness |
| [draft-strategy-steps](skills/draft-strategy-steps/SKILL.md) | Draft requested steps without you, keeping proposals and unknowns visible |
| [quality-strategy-review](skills/quality-strategy-review/SKILL.md) | Review whether quality documents support their reader's purpose |
| [quality-report](skills/quality-report/SKILL.md) | Make a faithful visual, explorable page or report for a particular reader |

## Install and run

The pack is a plugin for [Claude Code](https://docs.anthropic.com/en/docs/claude-code) and for
Codex. It depends on the companion
**[`effective-comms`](https://github.com/tollens-ai/effective-comms-skills)** plugin, whose
`comms-prep` and `comms-review` skills it uses to prepare and review what it writes for people,
such as interview summaries, strategies and reports. Add its marketplace too when you install from
this repository.

In Claude Code, run:

```text
/plugin marketplace add tollens-ai/effective-comms-skills
/plugin marketplace add tollens-ai/quality-strategy-skills
/plugin install quality-strategy@tollens
```

Claude Code installs `effective-comms` as a dependency, which is why both marketplaces are added
first. Without `effective-comms` the pack does not load in Claude Code at all, so don't skip its
marketplace. A machine that already has it keeps its single copy.

In Codex, run:

```text
codex plugin marketplace add tollens-ai/effective-comms-skills
codex plugin add effective-comms@tollens-effective-comms
codex plugin marketplace add tollens-ai/quality-strategy-skills
codex plugin add quality-strategy@tollens
```

Then start a new session and call a skill by its plugin name and skill name. To find where a
strategy stands:

- in Claude Code, `/quality-strategy:quality-strategy`;
- in Codex, `$quality-strategy:quality-strategy`.

The other skills are called the same way, with their own name after the colon. The agent gives you
the command for the next step in the form your tool uses.

The pack's package for OpenAI's plugin directory carries its own copy of `comms-prep` and
`comms-review`, so it needs nothing else installed.

For another agent, make the pack available to it and ask it to read the selected
`skills/<name>/SKILL.md`. Keep the whole pack layout together: skills rely on `references/` and
`plugin.json` at run time, and find the pack's folder as the one holding `PHILOSOPHY.md` and
`skills/`. `PHILOSOPHY.md` itself is background for people; no skill needs it read. Make the
`effective-comms` skills available too, because the pack's skills call `comms-prep` and
`comms-review` before handing over what they write (the interview offers them for its summary, and
runs them only if the user says yes).

Two parts of the pack use a small helper that needs Node.js: the interview's record and the
strategy's progress file. The rest of the pack needs no local tools.

You can stop partway through and return later. The skills keep a short progress note beside your
quality documents; a question you want to think about, or choose to park, stays an open question
in the record it bears on until you come back to it.

A pack version records which instructions produced an output. It is separate from a strategy's
release and revision date. [CHANGELOG.md](CHANGELOG.md) records changes by version.

## The quality questions

Quality is value to someone who matters. The skills connect four questions:

1. **What does good look like?** How good it needs to be, in concrete terms, and for whom.
2. **How would we know?** Identify how to observe the product and judge the result.
3. **How good is it now?** Say what the evidence supports, with confidence and limits.
4. **What do we do about it?** Choose useful action within the constraints.

Passing tests show what the tests check; whether that is what someone needs is a separate question.
Importance (how much a need matters compared with the rest), the required level (how good it has to
be), current quality, confidence, and urgency are different things. A High concern may need only a
modest level, and may already meet it. What anyone says about how good a priority must be is kept
in their words, with whose it is, beside what others said; where nobody has said anything yet, the
strategy says so, with the question. An unknown
tells you neither that the product is good enough nor that it has failed. A report preserves those
distinctions when adapting the information for a reader.

Four levels explore stakeholder expectations:

- **Delight** exceeds them.
- **Good Enough** meets the need: an honest threshold, not a low bar.
- **Ugh** is active dislike or distrust short of rejection.
- **Dealbreaker** is unacceptable.

High, Medium and Low rank importance; None records an explicit exclusion. Low does not mean
optional: the ranking orders attention, and a Low-ranked item can still block a release after every
High and Medium item is finished. Humans judge readiness to release.

Tensions between stakeholders remain visible; sometimes they need a conversation rather than an
agent’s proposed compromise.

## What to expect

The skills ask for the values and tradeoffs that project files cannot supply. They preserve
unknowns, distinguish user statements from agent proposals, and make deliberate exclusions visible.
They can work without a repository or before the product exists. While you are away, the agent can
draft the work you asked for, showing its assumptions and expecting corrections when you return.
Open questions remain useful even when no way to settle them is known. When you don't know
something, the agent first asks how you could find out, and suggests a way only when you have none
or yours would not tell you what you need. Where you are unsure, a tentative answer marked as such
is recorded rather than a gap, and you can come back to any part later. Documents call people by
their names or job titles.

Before handing the strategy over, the write-up checks its mechanical parts with a small script,
reads it once more for anything the records hold that was lost, and then has a fresh agent that
did not write it, such as a subagent, review it against the records, and acts on what it finds. If
your tool cannot start a fresh agent in that session, you get the strategy marked as not yet
reviewed, with the command to run the review in a new session.

Review what you act on. An agent writing the strategy up can carry an earlier agent's reading, or
its own assumption, into a section as if it were a fact. Each section cites what it rests on: check
against those sources anything a decision will rest on. This is a [known
issue](CHANGELOG.md#known-issues) of this release.

Expect rough edges. Earlier versions of the steps were reviewed on paper step by step, rehearsed in
parts with simulated people, and tried by the authors on a few of their own projects; those trials
found plenty. The text was then trimmed and changed several times in the days before release, and
each change was reviewed on paper. Simulated people have taken the whole route on Claude Code and
on Codex, from the interview to a first deep dive and a page to share, on the text as it stood
earlier on the last day of changes. One of the authors has since taken a project of her own
through the route on Claude Code, as far as a first priority deep dive; nobody else has used it
yet, and no real person has used it with Codex. Review on paper does not establish how well the
conversations work. The
[changelog](CHANGELOG.md#how-this-release-was-checked) says what was checked. The existing
interview has its own longer recording flow. Support for nondeterministic products remains a
developing area. See the [roadmap](ROADMAP.md) and [open questions](OPEN-QUESTIONS.md).

## What you need to do yourself

The skills do not yet prompt the agent to do these, or we have not tested how well it does them, so
for now they rest on you.

**Before you start, if the project has an earlier strategy.** Starting a strategy for a new release
when the folder already holds one for a previous release has not been tested, especially if an
earlier version of the pack saved it. Tell your agent what to do with the previous release's
strategy: keep it beside the new one, archive it, or build on it.

**When you lay out the priorities (`prioritise-release-quality`).** Choose how finely the priorities
are divided. Any kind of quality can be broken into smaller kinds: performance into how quickly
something responds, how long a long job takes and how it shows progress, and each of those further.
The agent is prompted to split a row where one rating would hide a difference that matters. It is
not prompted to judge when rows have become too fine, and we have not tested how well the models do
this. Each priority that matters gets its own deep dive later, so aim for rows that are each worth
one. Where two rows are almost the same thing, or one is only a part of another, tell the agent they
should be one row. That one check or one piece of work would answer two rows is not by itself a
reason to make them one.

**When the strategy is written up (`connect-quality-strategy`).** Before you act on a section, check
anything a decision will rest on against the notes beside the strategy, because the write-up can
carry an earlier agent's reading as if it were a fact.

**When you want the strategy to read well.** The pack is built for thoroughness and accuracy rather
than for being short and easy to read, so the written strategy is long and hedges a great deal. It
does not yet have a last step that rewrites the strategy with less hedging and shorter descriptions
while keeping everything it says; that step will come in a future version. Until then, ask your agent
for the rewrite yourself, for example: "Rewrite quality/strategy.md with less hedging and shorter
descriptions. Keep every decision, condition, unknown and who said what, and save it beside the
original." Compare the rewrite with the original before you rely on it.

**Throughout.** If the agent names rows by number, or uses the pack's own skill names, ask it to say
what it means. Asked how much is left, it answers for the current step; ask `quality-strategy` for
the steps still to come.

## Try it and tell us what happened

Try the pack on a project you know and [tell us how it went](https://github.com/tollens-ai/quality-strategy-skills/issues).
Concrete examples help most: what you asked, which skill and model you used, what it produced, and
what you expected instead. We would particularly like to hear about important concerns it missed,
assumptions it should have asked you about, and places where the conversation got in the way of
thinking. Share only material suitable for a public issue.

## Background

This open-source pack is from Tollens, which is building a tool to action the quality strategy comprehensively.
This pack can be viewed as a taster of the product-in-progress. Edmund Pringle
developed the quality framework. It takes a lot from the context-driven testing tradition and is not
only that; [PHILOSOPHY.md](PHILOSOPHY.md) explains the approach for people who want the
background. Yanqing Cheng implemented the skills.

## License

Licensed under either [MIT](LICENSE-MIT) or [Apache-2.0](LICENSE-APACHE), at your option.
Unless explicitly stated otherwise, contributions are dual licensed under those terms.
