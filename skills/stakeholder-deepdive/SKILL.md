---
name: stakeholder-deepdive
description: Record the user's understanding of one stakeholder or group for a release - who they are, what matters to them, how good it must be, what comes first for them - and the questions the user still has about them, saved as their profile. Use once for each stakeholder before the release priorities, or to revise a stakeholder's view.
---

# Stakeholder deepdive

Quality is value to someone who matters. The approach to quality strategy in this pack derives from
the Context Driven Testing school: start by describing who matters, describe what matters to them,
then prioritise the work to achieve it. The approach is not dogmatic - coverage, checklists,
standards and established practice can all be part of the strategy, sometimes they are the exact
right thing for some stakeholder or some quality dimension. The key thing is the overall approach -
based on context, and understanding what this project needs to achieve.

## What it is for

Draw out the user's understanding of one stakeholder for a release, and what they do not yet know
about them, because going deep into one stakeholder at a time keeps what matters to them from being
missed when the release priorities lay every view side by side.

A stakeholder is a person, agent, organisation or group whose view of the project matters. The user
is the one who comes to understand them, so every question goes to the user, and the user chooses
how to find out more: asking the stakeholder, watching them, reading issues or data, thinking it
through with you, or anything else. How much the user knows decides how much the view covers: a
group they work with every day comes out mostly as their understanding, one they barely know mostly
as questions, and both are good results. A quick pass, when that is what they chose, is a view too.

**Done when:**

- the profile holds what the user understands of this stakeholder, in their words, as [a
  stakeholder's profile](../../references/templates/stakeholder-profile.md) shows, and nothing in
  it is presented as the stakeholder's, or as the user's account of them, unless the user gave it;
- each thing you added, or made by combining two things they said, has been answered by them, or is
  still marked as yours;
- what they could not say is a question, with how they could find out or "no way chosen yet";
- where they chose the size of the view, they have been asked once whether to come back to it.

A good view made them think at least once - a difference inside the group, a tension with another
view, a bar they had not put into words - and took no longer than what the user knew called for.

## How to talk

Before your first message, read [working on a strategy](../../references/strategy-workspace.md), for
how each turn goes and what to do when they do not know, and your tool's section of [the harness
page](../../references/harness.md). Open these when their moment comes:

- [drafting steps without the user](../draft-strategy-steps/SKILL.md), when they ask for a step, or
  the rest of this one, done without them, such as "do the stakeholders yourself";
- [before a look or a check](../../references/before-a-look-or-a-check.md), before something they
  have not asked for, or a change to the product.

When the user says "next", "move on", "carry on" or "let's do mine", they are asking to go on
together, not for you to carry on without them. If the view is finished, close it. If part of it
remains and their words don't make clear which they want, ask in a line whether to finish it
together now or leave it, because a draft they did not ask for is one more thing they have to
review; "move on to me" already says to leave it.

## 1. Whose view this is

**Goal.** Know which stakeholder this is, for which release, and whether the view will be the
user's own or their understanding of someone else's.

Find the quality folder with `node "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs"
where`, and run `steps.mjs status --quality-dir <the quality folder>`, beside it. This conversation
is a step of a strategy unless `status` says no strategy is recorded, as [where things
stand](../../references/where-things-stand.md) explains; in a strategy, `status` lists the
stakeholders and whose views are done.

Take the stakeholder the user names. If they name none, take the one `status` names next and say
who; with no strategy, ask whose view this is about as your first question, because nothing below
can be done until that is known.

Because the user speaks for the stakeholder, whose view this is matters as much as what it says:
the user's own, because they are this stakeholder or one of them, or their understanding of other
people. It is usually noted beside the stakeholder in the project context, or clear from something
they have said, such as "I'm one of them" or "I only know them from the support inbox". Ask only if
neither tells you, because asking it again for every stakeholder costs time in every deep dive. Ask
"whose view is that?" again only when a reply changes whom it is about, as "good enough for me"
does in the middle of someone else's view, and record the answer beside the part it applies to.

If they would rather hear from the stakeholder themselves, want to leave the whole view because
nobody here can give it, or are coming back to a view left earlier, open [leaving a view and coming
back to it](references/leaving-and-coming-back.md) now, because each changes what follows.

## 2. What they understand, and what they do not

**Goal.** The user's understanding of this stakeholder in their words - who they are and how they
use it, what matters to them and how good it must be, what comes first for them and why - and what
they do not know, as questions with how they could find out.

The view is saved as it is given, so before the first save, follow the arrangement that
`records.mjs where` printed; if there is none, open `quality-setup`, then carry on here. If their
view is already recorded in another document, agree with them which document will hold the one
current account, because two copies drift apart. Outside a whole strategy, run `comms-prep`,
because they will read the profile.

Start the profile, `stakeholders/<slug>.md`, at the user's first answer about this stakeholder, and
update it after each answer, before your reply, because an answer kept only in the conversation is
lost if the window closes. Say each thing once: ten things that matter come to about a thousand
words, quotes included.

Open [the view](references/the-view.md) now.

## 3. Close

When the view is done, or they stop:

1. Update the profile, with each question they could not answer and how they could find out.
2. Check that what this conversation found that belongs to another part, such as someone else who
   matters or what was said about them, is recorded where [each
   turn](../../references/each-turn.md) says.
3. If they chose the size of the view, in any words ("five minutes", "a quick pass", "that'll do for
   now"), ask once whether they want to come back to this stakeholder in full, because neither answer
   can be assumed; don't ask if they have already said. Their answer goes at the head of the profile.
4. Outside a whole strategy, run `comms-review` on the profile and deal with what it finds.
5. In a strategy, record `part "<stakeholder>" view done`, or `started --note "<what is left and who
   has to act>"` if they stopped before the end; a view left because nobody here can give it gets
   neither, because no view was taken. On its own, with no strategy, record nothing.
6. Open [stopping and coming back](../../references/stopping-and-coming-back.md) and do what it
   says; in a strategy, the next step it offers is the one `status` names. Unless they have just
   said what to do next, wait for their answer, because no step starts before they choose it.
