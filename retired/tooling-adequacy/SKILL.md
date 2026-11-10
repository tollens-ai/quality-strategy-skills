---
name: tooling-adequacy
description: Find out whether a quality question has a suitable way to observe the product (an instrument) and to judge what is seen (an oracle). Use when a proposed way of knowing needs a closer look, or on its own to examine test tooling and oracles.
---

> Retired 9 November 2026. Use `priority-deepdive`, whose step on how we will know asks whether the way a priority is measured is good enough, one priority at a time. For one question outside a strategy, no skill does this in 0.5.0. This skill's text is kept as it was, for reference.

# Can the team answer the quality question?

Quality is value to someone who matters. The approach to quality strategy in this pack derives from
the Context Driven Testing school: start by describing who matters, describe what matters to them,
then prioritise the work to achieve it. The approach is not dogmatic - coverage, checklists,
standards and established practice can all be part of the strategy, sometimes they are the exact
right thing for some stakeholder or some quality dimension. The key thing is the overall approach -
based on context, and understanding what this project needs to achieve.

This skill finds out whether the methods to hand can answer the quality questions asked. A method
has two parts. An **instrument** is a way to observe the thing being judged, such as running it or
watching someone use it. An **oracle** is what the observation is judged against. A question can be
answered today only when both are adequate. This is all about how we would know: a method being
available says nothing yet about how good the product is.

It is done when the user, or the step that asked, can tell which questions can be answered now and
by what; what limits the rest, and whether that is the instrument, the oracle or both; and what is
still open, with any useful next step. Each question has a verdict for its instrument and one for its
oracle, with a reason that fits that question: whether the method could answer it as accurately and
realistically as its use needs. An unanswered question still says why it matters, and where nobody
knows how to settle it the result says so rather than inventing an action. Observations already made
are kept apart from methods that exist but have not been used.

## What we need to find out

Use what you are given: the questions, what to assess and in what setting, the methods in use, and
why earlier ones were rejected. Before proposing a rejected method again, say what now deals with
the limitation recorded against it, or why that judgment deserves another look. In a strategy, read
the priority's section of the strategy, and an older strategy's notes on it, for the ways of knowing
it names, their limits and who each came from, and what was tried and observed. Ask only for what
would change a verdict.

Keep each quality question as the records state it; the [quality
basics](../../references/quality-model.md#what-is-judged-and-for-whom) say what a quality question
is. A tool and what it produces are separate things with separate quality, and a group depending on
a tool does not by itself decide how good the tool must be for them or how much it matters.

An oracle is judged against the bar. With no bar there is nothing to judge it against: give the
oracle no verdict, say it waits on its bar, and ask the user for the bar. Where they do not know the
bar, or anything else a verdict waits on, or would be guessing, go on as [when they do not
know](../../references/strategy-workspace.md#when-they-do-not-know) says, and put what came of it in
the result's open question. If there is a bar the user has not agreed yet, give the verdict and call
it a draft, which stands once they agree the bar.

Look at documentation, configuration, tools and code as needed, and claim only what you actually
looked at. Ask the user before a longer look, as [before a look or a
check](../../references/before-a-look-or-a-check.md) says. A conversation, a walk-through on paper or
another manual method needs no repository.

## Judge the instrument and the oracle

For the instrument, name the action, the conditions that matter and what it captures. For the oracle,
name the expected value, property, comparison or person's judgment; the kinds are in [the four
questions](../../references/quality-model.md#four-questions). Manual use, a review on paper and an
informed conversation can each be adequate.

What a method cannot show matters as much as what it can:

- A proxy, indirect evidence such as test coverage, points at the quality without showing it; say
  its limit, and that of any reference you judge against.
- When trust, feel or everyday ease sets the bar, include the people whose experience matters,
  because an agent cannot show that experience alone. When the question is about a stakeholder's
  view, those people are the source, including agents doing the work, and the user chooses how to
  hear from them. Say whose answer it is: a simulated stakeholder's answer remains a proxy.
- A test suite, even a passing one, checks what you already expected, and an open question may need
  investigating instead. If the proposed method misses what we need to find out, look for a better
  fit and give it its own verdicts; if none is known, keep the limitation and the question.

Give the instrument and the oracle each one verdict:

- **Adequate:** available, and suitable for the accuracy and realism the question needs.
- **Inadequate:** exists, but cannot reliably give the observation or judgment needed.
- **Needs building or acquiring:** a suitable one is known but is not available yet.
- **Missing:** nobody has found a suitable one yet.
- **Uncertain:** the evidence so far cannot settle whether a candidate is suitable.

Where the method cannot answer the question today, say which part falls short, how and why, and give
both verdicts when one is uncertain and the other inadequate. For a gap, consider trying it by hand,
a worked example on paper, a person's review, an existing alternative, a rule the result must obey or
a simple reference before new tooling, and propose building or acquiring something only with a
reason. For an uncertain verdict, say what evidence would settle it, if you know. If you know neither
a workable method nor how to find one, say so, without calling the question untestable.

## Agree and return the verdicts

Talk with the user as [each turn](../../references/each-turn.md) says. Explain
the verdicts as your view, with their evidence, their limits and what would change them, and ask how
they see them, because a verdict they have not weighed is yours, not theirs. Record the verdicts
they agree, each still with the evidence it rests on. If they do not answer, return your
best-supported verdicts as a draft for them to go through later.

For each question, give in a short table or prose: the instrument, its verdict and why; the oracle,
its verdict and why; whether it can be answered now; and a useful next step, or the open question
and why it matters.

An unanswered question belongs with that section's open questions, as [open stays
open](../../references/templates/every-document.md#open-stays-open) says; write it into the section
yourself only if you were asked to edit the records.

When another step opened this skill, give the findings back to it for its records, as [opening
another skill](../../references/opening-another-skill.md) says. On its own, run `comms-prep` before
drafting and `comms-review` on the draft, then answer in the conversation, or save where the user
agreed, and hand back as [stopping and coming
back](../../references/stopping-and-coming-back.md) says.

Stop once the verdicts are given. Building tools and investigating the product are separate work,
unless the user already asked for them.
