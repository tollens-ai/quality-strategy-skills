---
name: plan-quality-measurement
description: Agree how the release's priorities would be judged, before anything is measured, as checks that each answer one or more rows, or for one quality question. Use to work out what to observe and what result would show the bar is met, and to choose suitable ways of checking.
---

> Retired 28 October 2026. Its job, agreeing how we would know, is now `priority-deepdive`'s, one priority at a time, after the strategy is written up with `connect-quality-strategy`; this skill asked it of every priority at once. Its text is kept as it was, for reference: some pack files it links to no longer exist.

# Plan the measurement

Quality is value to someone who matters. The approach to quality strategy in this pack derives from
the Context Driven Testing school: start by describing who matters, describe what matters to them,
then prioritise the work to achieve it. The approach is not dogmatic - coverage, checklists,
standards and established practice can all be part of the strategy, sometimes they are the exact
right thing for some stakeholder or some quality dimension. The key thing is the overall approach -
based on context, and understanding what this project needs to achieve.

This step answers one of the [four questions](../../references/quality-model.md#four-questions): how
would we know, for the priorities that decide something.

Each priority is a quality question, with how much it matters and, where anyone could say, how
good it must be. This step works out the checks that would answer them: one run, one read, one
conversation or one trial with the release in people's hands, each with the rows it answers.
Several rows are often answered by one check, and a plan drawn a check at a time is one the user
can weigh and act on.

A row with no bar is still a question this step plans for, by a check that finds out how things
stand now.

[The assessment](../assess-quality-gaps/SKILL.md) then investigates on the user's behalf by the
checks planned here, and says where each priority stands now and how far that is from its goal.
This step measures nothing and reports nothing newly found. Measuring is the assessment's job, and
it starts once the user has seen this plan and answered it, because a measurement planned without
them may answer a question they did not ask.

## What good looks like

Check the work against these as it goes, and again before saving.

### A good plan

A good plan can be acted on by someone who was not in the conversation, such as a later agent. It
holds four kinds of content, in this order, and each is as much the plan as the others, not a
leftover:

- **What is already known:** what the user has seen, what the pre-read's runs showed, and what the
  records say, each as what someone observed, with who and when.
- **The checks.** Each is one thing someone would do, and says the rows it answers; what a pass and
  a fail would show, and what it cannot show; what it needs, and whether it can be done now; whose
  it is; and whether the user agreed it or it is still the agent's way.
- **The rows in scope that no check answers,** each unknown, with why and what would need finding
  out.
- **The rows out of scope,** named once together with their ratings and questions: on the map, and
  not checked before this release.

Which rows are in scope is settled by what each row carries, as [where to
start](references/where-to-start.md) says. Because each check lists its rows, the plan can still be
read row by row.

It is short enough that the user will read it. The next thing to do is plain from it: run this
check, get this access, decide this bar, find this out.

### A good conversation

A good conversation starts from what the user has seen for themselves, because that is evidence the
agent cannot get any other way.

The user sees the whole plan, and their turns go on what only they can give: what they have seen,
which check comes first, whether a check that touches a live service may run, and a bar that is
still unsettled. They don't go on approving drafts they have no view on, because a plan put in
pieces, each asked to stand, cost them turns and told the agent nothing. The user can correct a
check, hand it to the agent or park a row, and nothing is asked twice. Someone with an evening to
spare comes away with a plan they can use.

### A good record of agreement

The record shows whose each part is, as [the record of
agreement](references/making-the-plan-and-saving.md#the-record-of-agreement) describes; that file is
read before anything is saved.

### Done when

- the user has seen the whole plan: the checks with their rows, the rows in scope nobody yet knows
  how to judge, and the rows not checked before this release;
- they have answered what only they can give;
- the saved plan reads as above.

## Every turn

Before your first message, open the page for the tool you are running in,
[Codex](../../references/codex.md) or [Claude Code](../../references/claude-code.md), because it
says how to ask there so that the answer is waited for. Another tool has no page.

These hold for every message in this step. [Each
turn](../../references/strategy-workspace.md#each-turn) gives the reasons and the rest: open it
when a turn will take more than a minute, or they are short of time or tiring.

- **It is their strategy:** suggest freely, decide nothing, and give them an amount they can weigh.
- **One message a turn,** after the last tool call. Say what is new to them, not their answer back
  or that it is recorded, and ask **one question at most,** which ends the turn: one question put to
  a set of items is one; two different questions are two.
- **Open questions,** answered in their own words. A go-ahead, a plain fact or whether a proposal
  shown in full stands can be asked directly.
- **Their project, not the agent's process.**
- **Do what the skill asks;** if something looks worth leaving out, say what the later work would
  lack and let them decide.
- **Thinking comes first:** explain an assumption, a tension or an insight that could change the
  work, and let them explore it or park it. Examine what you are given, and keep the rest of what
  you notice as [the Open guidance](../../references/open-section.md#what-you-notice) says.
- **Unknown is not unasked,** and **say only what happened.**

Open these when their moment comes, because they can come up on any turn:

- [drafting steps without the user](../../skills/draft-strategy-steps/SKILL.md), when they ask to skip
  ahead and leave steps, or the rest of this one, to the agent;
- [before a new step, a longer look or a
  check](../../references/look-and-check.md), before starting something they
  have not asked for, such as another step or a long look at the repository, or when they ask for
  a change to the product;
- [help them think first](../../references/help-them-think-first.md), when they
  park a question, or an unknown blocks a choice.

## Where to start

Open [where to start](references/where-to-start.md) first and do its steps in order, because they
find the saved work, deal with one quality question asked on its own, and settle which rows this
plan covers and what each is judged against.

## Making the plan

How the discussion goes is for the agent and the user to work out. When it begins, open [making
the plan and saving](references/making-the-plan-and-saving.md) and read it to the end: it says what
to bring to the discussion, how to draw the checks, how to show the plan and what to do when the
user doesn't know, then how to save the plan, record `step measurement done` and close.
