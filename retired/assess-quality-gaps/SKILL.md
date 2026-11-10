---
name: assess-quality-gaps
description: Find out where a release stands against its quality priorities, or where one quality question stands, by investigating on the user's behalf in the ways planned with them. Use once there is a way of checking, to learn how good things are now, how sure anyone can be, what falls short, and which questions still need answers.
---

> Retired 28 October 2026. Its job, finding out where things stand, is now `priority-deepdive`'s, one priority at a time, after the strategy is written up with `connect-quality-strategy`; this skill asked it of every priority at once. Its text is kept as it was, for reference: some pack files it links to no longer exist.

# Assess quality gaps

Quality is value to someone who matters. The approach to quality strategy in this pack derives from
the Context Driven Testing school: start by describing who matters, describe what matters to them,
then prioritise the work to achieve it. The approach is not dogmatic - coverage, checklists,
standards and established practice can all be part of the strategy, sometimes they are the exact
right thing for some stakeholder or some quality dimension. The key thing is the overall approach -
based on context, and understanding what this project needs to achieve.

This step answers one of the [four questions](../../references/quality-model.md#four-questions): how
good is it now.

By now the strategy holds the questions that matter most for the release, each with how much it
matters. For some it holds how good it must be and how that would be checked; for others, that the
bar is not settled or that nobody yet knows a way to check. None of that says how good things
actually are, or how much of it anyone has looked at.

Here the agent investigates those questions on the user's behalf. It finds out what it can from
where it is, and brings back what it found and what it could not. Without this, the plan of work
rests on what people believe, and the release call on hope. With it, the user knows where the
release stands: which faults are known, which unknowns matter, and what it would take to be sure.

It measures only by the ways planned with the user in [plan the
measurement](../plan-quality-measurement/SKILL.md), because one planned without them may answer a
question they did not ask.

It decides nothing about what to do, which is for [the plan of work](../plan-quality-work/SKILL.md)
once the user has answered the findings, because a plan is only as good as the findings it rests on.

## What good looks like

Check the work against these as it goes, and again before saving.

### A good result

A good result is an honest map of where the release stands: what is known, how well, and what is
not known and why. Someone who was not in the conversation could act on it, and the user can judge
the release by it.

For each question in scope it says:

- what was looked at, and what was found;
- whether that is above, at or below how good it must be, or unknown;
- how sure, and why;
- what a shortfall, or the not knowing, means for the person whose priority it is.

Put first what most changes the release call, whatever kind of thing it is: a fault, an unknown on
something the release waits for, or a bar nobody has settled, because that is what the user decides
from.

A finding judged against what the release waits for, rather than the full bar, says so.

Each unknown says why it is unknown and what would settle it, or that nobody yet knows a way, as [a
good record](references/while-investigating.md#a-good-record) lists, because what to do next
depends on the reason. Most rows unknown can be the true result, and is a good one when each says
why. "Probably fine" is not a finding.

Then the pattern: where risk gathers, and what one piece of finding out would settle together, as
[what a gap or an unknown puts at risk](references/what-to-bring.md#ideas-to-bring) shows. A
dependency names its evidence, because sharing a name is not one.

### A good investigation

A good investigation looks first at what the release waits for and the High rows, because their
answers change the release call. Before starting, the agent says what it will do; [what to
bring](references/what-to-bring.md#a-good-investigation) says what that covers, and what else
makes a good investigation.

### Done when

- every row in scope has its finding or its honest unknown;
- the user has seen the findings as a whole, with the bottom line, and answered;
- the notes and the strategy's part read as [a good
  record](references/while-investigating.md#a-good-record) says.

A pass in which nobody looked at anything is not an assessment, however it is marked. One in which
everything agreed was looked at, and every row is still Unknown, is.

## Every turn

Before your first message, open the page for the tool you are running in,
[Codex](../../references/codex.md) or [Claude Code](../../references/claude-code.md), because it
says how to ask there so that the answer is waited for. Another tool has no page.

These hold for every message in this step. [Each
turn](../../references/strategy-workspace.md#each-turn) gives the reasons and the rest: open it
when a turn will take over a minute, or they are short of time or tiring.

- **It is their strategy:** suggest freely, decide nothing, and give them an amount they can weigh.
- **One message a turn,** after the last tool call. Say what is new to them, not their answer back
  or that it is recorded, and ask **one question at most,** which ends the turn: one question put to
  a set of items is one; two different questions are two.
- **Open questions,** answered in their own words. A go-ahead, a plain fact, a High, Medium or
  Low rating, or whether a proposal shown in full stands can be asked directly.
- **Their project, not the agent's process.**
- **Do what the skill asks;** if something looks worth leaving out, say what the later work would
  lack and let them decide.
- **Thinking comes first:** explain an assumption, a tension or an insight that could change the
  work, and let them explore it or park it. Examine what you are given, and keep the rest of what
  you notice as [the Open guidance](../../references/open-section.md#what-you-notice) says.
- **Unknown is not unasked,** and **say only what happened.**

Open these when their moment comes, on any turn:

- [drafting steps without the user](../../skills/draft-strategy-steps/SKILL.md): they ask to leave steps,
  or the rest of this one, to the agent;
- [before a new step, a longer look or a
  check](../../references/look-and-check.md): before anything they have not
  asked for, such as another step or a long look at the repository, or when they ask for a change
  to the product;
- [help them think first](../../references/help-them-think-first.md): they park
  a question, or an unknown stops a choice.

## Where to start

Open [where to start](references/where-to-start.md) first and do its steps in order, because they
find the saved work, deal with one quality question asked on its own, and settle which rows are in
scope and what each is judged against.

## What to bring to the investigation

Ideas that have made assessments better, to use where they fit. Read [them](references/what-to-bring.md)
before investigating, because they shape what each finding can claim.

## While investigating

How it is done is for the agent and the user to work out, in one long turn or across sessions.
Before any investigating or drafting, open [while investigating](references/while-investigating.md):
a good record, which keeps observations that point the other way, saving as you go, and the rules
throughout.

## Put the findings to the user, then record and close

When the rows in scope have their findings, or the work stops early, open [put the findings
to the user](references/put-the-findings.md), because the findings go to the user whole before any
work is planned.
