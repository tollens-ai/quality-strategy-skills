---
name: prioritise-release-quality
description: Combine every stakeholder's view into one set of quality priorities for a release, with how much each matters and what is not a priority for it. Use once each stakeholder who matters has had their deepdive or been left for now, or to revise or re-order the release's priorities.
---

# Prioritise release quality

Quality is value to someone who matters. The approach to quality strategy in this pack derives from
the Context Driven Testing school: start by describing who matters, describe what matters to them,
then prioritise the work to achieve it. The approach is not dogmatic - coverage, checklists,
standards and established practice can all be part of the strategy, sometimes they are the exact
right thing for some stakeholder or some quality dimension. The key thing is the overall approach -
based on context, and understanding what this project needs to achieve.

## What it is for

A release can't serve every stakeholder's priorities equally. By now the user has set down what they
understand of each stakeholder, and their questions about them. This step lays those views side by
side in one list, and the strategy owner decides, as far as they can, how much each priority
matters for the release, with their reasons, including what the release deliberately does not aim
at.

If they cannot decide yet, record it as their open question, with how they could decide it,
or "no way chosen yet". An open question is as good a result of this step as a decision. This step
begins to answer the first of the [four questions](../../references/quality-model.md#four-questions),
what good looks like, for one release; the strategy's section on each priority takes it further.

**Done when:**

- each decision is made, or recorded as an open question with how it could be found out or decided,
  or "no way chosen yet"; the step can close with decisions still open;
- from the strategy's opening, its parts on the project, the release and who matters, what the
  release will not do, the priorities and its end parts, a reader who was not there can tell what
  the release is for and whom it serves; what matters most and least, and why; and which
  judgments are provisional and on whose answer, and which are open;
- what the release needs is kept apart from evidence of how good it is now;
- everything raised before, in the interview, the pre-read and the project context, is covered
  somewhere in the strategy or the project context.

A good conversation starts from the user's own ordering of what matters, in their words, because the
priorities are theirs and do not exist until they say them. They see the whole list when they order
it. Don't show it again unchanged; ask again only about a judgment they have not given, a tension
between views, a row they set aside, or a row their reply left unclear. Someone with an evening
and six stakeholders, one of whom has no view yet, should still come away with a table.

## What a skilled person knows here

- **How much it matters and how good it must be are different questions.** A strict bar does not
  make a row High, and a High row may need only a modest bar. No level, obligation or limit on time
  or money decides a rating or caps it, as [the quality
  model](../../references/quality-model.md#ratings-and-bars) says.
- **Don't ask anyone to rank a list they cannot weigh.** A list that is incomplete or makes no sense
  cannot be ranked well, so this step first brings in every view or marks it missing, then shows
  the whole list.
- **A missing view becomes a question beside each row it could change,** not something to go and
  find out now, because finding it out is for the user to do.
- **Only what they have answered is theirs.** A row you added, or a rating you inferred from their
  order, stays yours until they answer it, as [whose words are
  whose](../../references/templates/every-document.md#whose-words-are-whose) says. A rating they gave
  on a row that a missing view could change is theirs, marked provisional, which is not the same as
  yours. A decision they left open is written as open, with nothing of yours in its place.

## How to talk

Before your first message, read [working on a strategy](../../references/strategy-workspace.md), for
how each turn goes and what to do when they do not know, and your tool's section of [the harness
page](../../references/harness.md). Open [drafting steps without the
user](../draft-strategy-steps/SKILL.md) when they ask for a step, or the rest of this one, to be done
without them. Open [before a look or a check](../../references/before-a-look-or-a-check.md) before
any look or check they have not asked for. "Next", "carry on" or "let's do mine" ask to go on
together, not for a draft: if part of this step remains and their words don't say whether to finish
it, ask in a line whether to finish it together now or leave it, because a draft they did not ask
for costs them a review.

To re-order priorities already agreed, open [re-ordering later](references/re-ordering-later.md);
it has everything a re-order needs.

## 1. Choose the release and check every view is in

**Goal.** Base the priorities on what the release is for and on every stakeholder's own view.

1. Find the quality folder with `node "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs"
   where`, and run `steps.mjs status --quality-dir <the quality folder>`, beside it. This
   conversation is a step of a strategy unless `status` says no strategy is recorded, as [where
   things stand](../../references/where-things-stand.md) explains. In a strategy, read what it
   prints: the stakeholders, whose views are done, and the progress note. With no strategy, this
   skill works on its own: ask who matters for this release; anyone they name who has no profile
   counts as a missing view.
2. Find out what the release is meant to achieve, which areas it covers and who decides, from the
   records and from what the user says. If the release isn't decided, the priorities are a draft:
   say so.
3. If they want only part of the priorities revisited, work on that part and what depends on it,
   and don't imply the rest was looked at.
4. Read every stakeholder's profile, because this step compares their views row by row. If a view
   was drafted without the user, for example from documents, read it back to them and get their
   answer before anything rests on it. A stakeholder already recorded as having nobody here to speak
   for them counts as a missing view; don't press about them now, and take them up whenever the user
   does. A view recorded as skipped is one the user decided not to take, so it is not missing.
5. If any other stakeholder who matters has no view, say who, recommend their `stakeholder-deepdive`
   first, and ask which they want: that first, or the priorities without it. Wait for their choice,
   because it is theirs. If they choose to go on without it, tell them what the priorities will
   lack, and in a strategy record the choice at once, because a choice kept only until the close is
   lost if they stop first. Their reason decides which record is true, as "Going on without a
   stakeholder's view" in [where things stand](../../references/where-things-stand.md) says.

## 2. The table and the order

**Goal.** One list of the release's quality priorities, ordered and rated by the strategy owner with their
reasons, with what the release will not aim at.

Open [the table](references/the-table.md) now, and work through it in order.

## 3. Close

When the table's last part is done, or they stop, open [the close](references/close.md), which
writes what the strategy owner answered into the strategy and offers the next step.
