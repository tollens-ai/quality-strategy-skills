---
name: priority-deepdive
description: Work one release priority further with the strategy owner, once the strategy is written up, so that someone can act on its section. Use for any priority they name or choose.
---

# Priority deepdive
Deep dive a quality priority from the quality strategy, so that we understand where we stand against
the quality framework, and there is a clear plan for what to do next. The pack describes the
framework, the thinking is yours.

It is done when:
- There is clarity on the current status of this priority against the framework described in steps 3
  to 6 (clarity on degree of unknowns is a kind of clarity)
- There is a plan or next step that makes progress on this priority
- You are in agreement with the strategy owner on the above

When you talk to the strategy owner, say what we're doing, what we're trying to achieve and what
we're going to do, as a colleague or consultant who understands the framework. The goals, questions
and references here are for you to think with: use the strategy owner's terminology rather than
reciting these names. Leave out commentary on tools, skills, saving, committing and reviewing,
except to say what they will get and when at the start of a long turn, to tell them if that
changes, and to say where the records are at the close.

Read the last section now: it holds at every step. Then work through the steps in order,
because each rests on the one before. If the strategy owner goes past a question, follow them and
then return to the unanswered question.

## 1. Find the strategy and the priority

Before your first message, find the quality folder with `node
"$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs" where` and run `steps.mjs status
--quality-dir <folder>` beside it. If they are coming back, start as [stopping and coming
back](../../references/stopping-and-coming-back.md) says, because a question may be waiting for
them.

This work needs the priority's section, which the write-up makes. If `status` does not show the
write-up done, say that `connect-quality-strategy` comes first, and stop.

The priority is the one they name, whatever its rating or place in the release's order. If they name
none, suggest the High ones and let them choose. A priority rated None has no section, so working it
starts with changing that rating: put that to them.

Before the opening, gather what the records hold on this priority: its section and what it cites,
the profiles of those it is for, the project context, the interview, the pre-read's findings, other
sections that share a question with it, and what an older strategy kept, read as [older
records](../../references/quality-model.md#older-records) says. The section may have missed
something they already said, which they should hear in your opening, not be asked again. Tell them
any pre-read finding they have not yet heard before they decide anything it bears on, as [the
pre-read](../../references/templates/pre-read.md) says.

## How hard each question is

Each of the four questions in steps 3 to 6 may be hard. Sometimes one has an easy answer, or a way
to 80:20 it. Sometimes it can't be answered on the fly, sometimes there is no easy solution, and
sometimes the obvious solution is not the best. Whether it's hard might be more obvious to the
strategy owner than to you. Be constructive and humble - give your own best answer, how sure you
are, and how big you think the question is, so they can put you right.

## 2. Open with what you think

**Goal.** They understand the quality priority under discussion and why it matters.

From the write-up in the quality strategy, explain to the strategy owner what the quality priority
is, why it matters to the stakeholders and this release, and any previous analysis, concerns,
anecdotes etc. that may be useful for anchoring the discussion. If anything is unclear to you, say
it's unclear. This is a great time for clarifications (and you may amend the existing strategy doc
with clarifications if needed) before diving deep.

## 3. What does good look like?

**Goal.** Understand what "good" looks like for this priority for this release, from the strategy
owner's perspective.

A good description may be qualitative or quantitative. It may involve direct information from the
stakeholders, metrics, concrete states of the world or a gut feel "I know it when I see it." The key
is to get the picture clear in the strategy owner's head - what would "not good enough" look like?
what would "good enough" or "great" look like? What would be "too much" is also an important
question to ask, to avoid agents polishing unnecessarily.

## 4. How do/will we know how good it is?

**Goal.** Understand how we're currently measuring this quality priority, and whether and how to
change this.

Measurement is the matter of what proxies to use for how good a quality dimension is.

Measurements don't have to be quantitative, though when quantitative measurements are available it's
good to use them. Direct evidence from the stakeholders can be ideal if you can get it. But even
"the strategy owner's gut feel" is a valid measurement - it's certainly better than nothing.
Metrics, anecdotes, asking questions, getting an agent to investigate and report back - all could be
useful proxies.

There's usually a multitude of ways one could measure a quality dimension - so to choose between
them you may wish to consider accuracy, cost, bias, convenience.

If there is already some measurement of this dimension (whether it's from existing metrics or just
somebody's word of mouth), it's worth asking the question of "is it good enough?"

"What makes the measurement good enough" is its own interesting question.

If you need further guidance, consult [how would we
know](../../references/quality-model.md#four-questions) and "How we will know" in [finding
out](references/finding-out.md#how-we-will-know).

## 5. Where it stands now, and how we know

**Goal.** What's the current status of this quality priority, what is known (with what evidence),
and what is unknown.

Open [finding out](references/finding-out.md).

If there is a current measurement method (whether it's existing metrics from the project or the
strategy owner's opinion), check them first.

Tell them what you found, what it changes, and whether there's more you want to find out.

If you don't have enough information, "find out more (thus)" is a valid next action: ask how first,
then offer a way as working on a strategy says.

## 6. What to do about it

**Goal.** Map out (some of) the plan of how to get from where we are now to where we want to be.

In rare cases of simple quality strategies it may be possible to do the whole plan in one go, based
on obvious actions. For complex priorities with a lot of unknowns, the plan may be "gather X, Y and
Z information, then replan".

This is left open-ended for you to discuss with the strategy owner.

Each open question ends in the next concrete thing someone could do, with who could take it where
that is known. Before your first proposal, open [next actions](references/next-actions.md).

## 7. Close

When the work on this priority is done, or they stop, open [the close](references/close.md).

## Throughout

- How to talk with them, and what to do when they do not know or park a question, is in [working on
  a strategy](../../references/strategy-workspace.md): read it before your first message.
- Before a longer look, anything outside the project, or the project's own checks, do as
  [before a look or a check](../../references/before-a-look-or-a-check.md) says.
- Keep the priority's section, and whatever else a change affects, current as you go, as [what is
  true now](../../references/templates/every-document.md#what-is-true-now) says, because a worker
  may take it away at any point.
- A rating that turns out wrong, or two priorities that are really one, goes through
  `prioritise-release-quality`, because there the priorities are weighed against each other.
