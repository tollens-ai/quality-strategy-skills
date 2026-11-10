# Quality strategy skills

There is always more you could do to make a project better, and never the time to do all of it.
This pack helps you decide what matters most for your next release, how good it has to be, and what
to do first. It is for people who own or lead a software project and work on it with an AI agent,
whether the project is new or already running.

You work through it in conversation with your agent. The agent asks what the project is for and who
it matters to: your users, your customers, your team, the other agents that work on it. For each of
these stakeholders it asks you what matters to them and how good that has to be. You then weigh
those answers together and choose the priorities for one release. A priority is something the
release has to get right, such as "a saved file is never lost" or "a new user can finish setup
without help".

The agent then writes those priorities up as your quality strategy. Each priority gets a section
that says what good looks like, how you will know how good it is, where it stands now and what to
do about it. Anything still unanswered is written as an open question, with a next step that
someone can take. After that you can pick any one priority and work it through in more depth.

The agent records what you said in your own words and is told to keep its own interpretation
separate. Where nobody knows something yet, it writes that down as unknown rather than guessing.
What you get is a set of plain text documents in a folder you choose. It does not change your code.

The pack is a set of skills, installed as a plugin for
[Claude Code](https://docs.anthropic.com/en/docs/claude-code) or Codex.

## Install and run

The pack uses a companion plugin,
[`effective-comms`](https://github.com/tollens-ai/effective-comms-skills), to review what it writes
for you. Some skills also run small scripts to keep their records, so you need Node.js on the
machine your agent runs on.

In Claude Code, run:

```text
/plugin marketplace add tollens-ai/effective-comms-skills
/plugin marketplace add tollens-ai/quality-strategy-skills
/plugin install quality-strategy@tollens
```

Claude Code installs `effective-comms` by itself as a dependency, once its marketplace is added.
The pack does not load without it.

In Codex, run:

```text
codex plugin marketplace add tollens-ai/effective-comms-skills
codex plugin add effective-comms@tollens-effective-comms
codex plugin marketplace add tollens-ai/quality-strategy-skills
codex plugin add quality-strategy@tollens
```

The two marketplaces have different names, `tollens` and `tollens-effective-comms`.

Then start a new session and call the `quality-strategy` skill:

- in Claude Code, `/quality-strategy:quality-strategy`;
- in Codex, `$quality-strategy:quality-strategy`.

It asks whether anything about the project's quality is already on your mind, offers to read the
project's files first, and tells you which step to start with. The other skills are called the same
way, with their own name after the colon, and the agent gives you the command for each next step.
You can stop partway and come back later: call `quality-strategy` again and it finds your place.

Other agents can use the skills too. Give the agent a copy of this repository with its layout intact, and
the `effective-comms` skills beside it, and ask it to read the `SKILL.md` of the skill you want.

## The skills

A strategy runs through these in order. You can also go straight to the one you need, and bring
notes or answers you already have.

| Skill | What you get |
|---|---|
| [establish-project-context](skills/establish-project-context/SKILL.md) | What the project is for, its limits, its releases and who it matters to |
| [stakeholder-deepdive](skills/stakeholder-deepdive/SKILL.md) | One stakeholder's view: what matters to them, how good it must be, and what comes first for them |
| [prioritise-release-quality](skills/prioritise-release-quality/SKILL.md) | Every stakeholder's view weighed together into priorities for one release, with what the release is not aiming at |
| [connect-quality-strategy](skills/connect-quality-strategy/SKILL.md) | The written strategy, with a section for each priority, reviewed by a second agent before you get it |
| [priority-deepdive](skills/priority-deepdive/SKILL.md) | One priority of your choice worked further, ending in a plan for it |

These support the steps or work on their own:

| Skill | Use it for |
|---|---|
| [quality-strategy](skills/quality-strategy/SKILL.md) | Finding where your strategy stands and what comes next |
| [quality-setup](skills/quality-setup/SKILL.md) | Agreeing where the documents are saved, who they are for and whether the agent may commit them |
| [quality-interview](skills/quality-interview/SKILL.md) | An open interview about whatever worries you in the project |
| [pre-read](skills/pre-read/SKILL.md) | A reading of the project's files: the major issues, what the tests cover, and how easy the code is for agents to work on |
| [draft-strategy-steps](skills/draft-strategy-steps/SKILL.md) | Having the agent draft steps while you are away, marked as its drafts for you to correct |
| [quality-strategy-review](skills/quality-strategy-review/SKILL.md) | A review of quality documents you already have |
| [quality-report](skills/quality-report/SKILL.md) | A report or visual of where quality stands, made for a particular reader |

To see the shape of the written strategy, with every heading and what goes under it, read
[the strategy template](references/strategy-template.md).

## What to expect

- **It takes time.** A whole strategy for a real project is several hours of conversation, usually
  better spread over several sessions. A single skill, such as the interview or the reading of your
  files, is much shorter.
- **The written strategy is long.** It is built to be thorough and accurate before it is short. See
  below for how to ask for a shorter version.
- **The documents are yours.** They are saved as plain text in a folder you choose, by default
  `quality/` in your project. The agent agrees with you where they go and who they are for before
  it saves anything frank, and commits them only if you say it may.

The [known issues](KNOWN-ISSUES.md) say what can go wrong and what to do about it.

## What you need to do yourself

The skills do not yet prompt the agent to do these, or we have not tested how well it does them, so
for now they rest on you.

**Check what you act on.** When it writes the strategy up, an agent can state its own
interpretation, or an earlier agent's, as if it were a fact. Each section says what it rests on.
Before you act on a section, check anything a decision will rest on against those sources.

**If the project has an earlier strategy.** Starting a strategy for a new release when the folder
already holds one for a previous release has not been tested. Tell your agent what to do with the
earlier one: keep it beside the new one, archive it, or build on it.

**When you set the priorities.** You choose how finely they are divided. The agent splits a
priority where one rating would hide a difference that matters, but it does not judge when they
have become too fine. Each priority that matters can later be worked through on its own, so aim
for priorities that are each worth that, and ask the agent to merge two that are almost the same.
Two priorities that one piece of work would settle are not, for that reason, the same priority.

**When you want the strategy shorter.** No step yet rewrites the strategy shorter. Until one
does, ask your agent yourself, for example: "Rewrite quality/strategy.md with less hedging and
shorter descriptions. Keep every decision, condition, unknown and who said what, and save it beside
the original." Compare the rewrite with the original before you rely on it.

**Throughout.** If the agent names rows by number, or uses a skill's name where you expected plain
words, ask it to say what it means. Asked how much is left, it answers for the current step; call
`quality-strategy` for the steps still to come.

## The ideas behind it

Quality is value to someone who matters. The skills take four questions in order, because each
rests on the one before:

1. **What does good look like?** How good it needs to be, in concrete terms, and for whom.
2. **How would we know?** A way to observe the product and to judge what we see.
3. **How good is it now?** What the evidence supports, and how sure we are.
4. **What do we do about it?** The work worth doing, within the limits you have.

Four levels describe how a stakeholder would take a result:

- **Delight** exceeds what they expect.
- **Good Enough** meets the need: an honest threshold, not a low bar.
- **Ugh** is active dislike or distrust, short of rejection.
- **Dealbreaker** is unacceptable.

The agent lays out what could matter as rows of a table. You rate each High, Medium or Low for how
much it matters to this release, or None when you decide this release does not aim at it. The rating orders attention and nothing more.
How much a priority matters, how good it has to be, and how good it is now are three different
things: something rated High may need only a modest level, and may already meet it. People, not the
rating, judge whether a release is ready.

Where stakeholders want different things, the difference stays visible. Sometimes it needs a
conversation, not a compromise the agent proposes. And something nobody knows yet is written down
as unknown: it tells you neither that the product is good enough nor that it has failed.

[PHILOSOPHY.md](PHILOSOPHY.md) says more. The [roadmap](ROADMAP.md) says what is planned, and the
[open questions](OPEN-QUESTIONS.md) say what we are still unsure about.

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
