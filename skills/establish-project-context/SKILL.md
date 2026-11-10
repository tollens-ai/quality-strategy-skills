---
name: establish-project-context
description: Find out or update the background that quality work needs, including the project's purpose, scope, how work gets done, releases, stakeholders, and how each stakeholder relates to the products, tools or other things involved. Use before other quality work needs that background, or when the purpose, releases or stakeholders change.
---

# Project context

Quality is value to someone who matters. The approach to quality strategy in this pack derives from
the Context Driven Testing school: start by describing who matters, describe what matters to them,
then prioritise the work to achieve it. The approach is not dogmatic - coverage, checklists,
standards and established practice can all be part of the strategy, sometimes they are the exact
right thing for some stakeholder or some quality dimension. The key thing is the overall approach -
based on context, and understanding what this project needs to achieve.

This step finds out the background every later step works from: what the project is for, how work
gets done, what the release must achieve, and who matters. The purpose comes first, because
everything after is judged against it. Ask it even when you think you know, because what a project
is for cannot be read from its files.

**Done when** someone reading the context could tell, for each of these, what the user knows and
what they do not know yet:

- what the project is for and who it helps, including agents acting for people;
- what the user wants from it now and later;
- what limits it, in their words;
- how work is done and checked;
- what each release is for, and what the next one must achieve, in terms it could be judged by;
- who matters, how, and in what order to take them.

Where the user does not know something, write it in the context as a question for them, with the
choices that depend on the answer. "I don't know what this release has to achieve" is a true answer,
and the later steps build on the question rather than on a guess. If the conversation stops before
every part has been discussed, the context says which parts were not reached, because a part nobody
asked about is not the same as a part the user does not know. By the end, the user has heard about
any major issues the pre-read found, and has answered each thing in the context that you inferred
rather than heard from them; "I don't know" is an answer, recorded as an open question.

Talk with them as [working on a strategy](../../references/strategy-workspace.md) says, and before a
longer look at the repository, another step, or a change to the product, read [before a look or a
check](../../references/before-a-look-or-a-check.md).

## 1. Start from what is already there

Find the quality folder and what it holds with `node
"$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs" where`. If it holds `strategy-steps.json`,
run `status` with `steps.mjs` beside it (`steps.mjs status --quality-dir <the folder>`): this
conversation is a step of a strategy unless `status` says no strategy is recorded, as [where things
stand](../../references/where-things-stand.md) explains. Otherwise the skill is running on its own
and records nothing.

Use what the user has already said, in this conversation or in a record they agreed such as the
interview, and, when you are updating the context, in the stakeholders' profiles and the strategy:
remind them of it briefly, and don't ask it again. Ask them about only three kinds of
thing, because only those are still theirs to answer:

- what the records do not cover;
- what you inferred from the repository, the pre-read or a note they have not reviewed, presented as
  your inference for them to confirm or correct;
- anything they said that a record contradicts, with the two side by side.

Then open [working from the pre-read](references/working-from-the-pre-read.md): it says how to use a
saved digest, or how to offer one, and how to tell them about its major issues before you ask your
first question.

If they want to move quickly, or the time they have will not cover everything, ask only what the
next step needs: usually what the project is for, the next release, who matters and what limits it.
Then record in the context what was not discussed, including how work gets done.

When the user says "next", "move on" or "carry on", they are asking to go on together, not for you to
carry on without them. If part of this step remains and their words don't make clear which they
want, ask in a line whether to finish it together now or leave it, because a draft they did not ask
for is one more thing they have to review. If they ask you to do this step
and the ones after without them, such as "skip to the plan", open `draft-strategy-steps`; it asks them
once whether to finish this step together first, so don't ask that here.

## 2. The project

Understand what is being built, for whom and why, what the next release must achieve, and what limits
the work. [The questions](references/the-questions.md) hold what a skilled person asks in this part
and the two after it.

**Done when** the purpose, scope and limits that matter can guide the quality work that follows, or
it is clear which unanswered questions stand in the way of that.

## 3. How work gets done

Hear how the user says work gets done and checked now, by people and agents, and where that goes well
or badly.

**Done when** their account is recorded faithfully, because the strategy later looks at how work is
checked and whether anyone has used the product, and it has to start from how things are, not how
they should be.

## 4. Releases and who matters

Understand what each planned release is for, how it gets from built to the people it is for, and
whose needs and experience should shape its quality choices.

**Done when** the user can say who matters for the release and in what order to take them, and each
of these is either known or recorded as open, with what would settle it: how each stakeholder
relates to the products, tools or other things involved; whose account each view will be, where that
is known; and which differences between their situations need a fuller conversation. Where the user
is one of the stakeholders, record them by their name or job title, not as "the user", because every
later step heads its records about them with that entry.

## 5. Save and close

Save the context so that it can be reused, and corrected as the project changes.

**Done when** someone can find what is understood now, the user has answered each of your inferences
in it ("I don't know" included, recorded as an open question), and the step is recorded in the
strategy or, when this skill runs on its own, the user knows where the context was saved.

Open [saving and closing](references/save-and-close.md) when the questions are done or they stop.
