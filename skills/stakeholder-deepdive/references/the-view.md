# Stakeholder deepdive: the view

How to draw out what the user understands of one stakeholder, and what they do not know, so that
the view says what this stakeholder needs in terms that later decisions can use. Save each answer
into the profile as it comes.

## What is already known

Before you ask anything, read what is already recorded, so that you do not ask again what they have
already said:

- the project context, including concerns saved in people's own words and any note left for this
  stakeholder under "Who matters";
- the interview's records;
- the other stakeholders' profiles, where someone spoke about this stakeholder, and the strategy,
  if there is one;
- what the pre-read found that bears on this stakeholder, treated as the pre-read's interpretation:
  for agents working on the code, what it says about how friendly the codebase is to agents, whose
  open questions you ask only where they are still unanswered; for users, the major issues;
- an existing profile, which the new view replaces.

## Who they are, and how they use it

A bar means something only for someone in a situation. Take what you can from what is known and ask
only for what is missing, because the points below are what the view needs to know, not a
questionnaire. Ask about the
stakeholder, or about the example person if that is how the user is building it:

- **Who they are.** A role is enough; don't invent a personal name. Use the user's grouping, not
  yours. [The quality model](../../../references/quality-model.md#what-is-judged-and-for-whom) says
  how groups, roles and relationships work, and what to keep apart when someone pays for, regulates
  or depends on a thing without using it, or when the thing is a tool.
- **What is in question:** which product, tool or other thing, and how they relate to it.
- **Which release or situation.** If the release is not decided, note the situation you are assuming
  and what to check once it is, without running the whole project context step.
- **How and when they use it,** because a device or setup you assume may not be theirs: for a
  person, the device, browser or app, their connection, and when and where; for an agent, its setup,
  such as where it runs and what it can reach.
- **For a group, who in it differs:** who is in a different situation or would judge the result
  differently, such as people who act on it daily and people who only review what it produces. An
  account of a group with two situations in it is an account of neither.

Then their situation: what they are trying to get done, what happens now, and what would make a
difference. Some stakeholders change what to ask:

- **An early internal release:** what the team needs to learn. A disappointing result they can make
  sense of may serve that purpose; not being able to tell whether the tool helped may defeat it.
- **A tool that supports other work:** both how they work with the tool and the result they depend
  on.
- **Someone who never uses it,** such as a regulator or an affected community: what they care about
  in what it leads to.

## How good it must be

Listen for four levels of each thing that matters, and ask about them where it helps, in plain
words, because together they say how good it must be for this stakeholder. Ask in turn, or side by
side when comparing them helps, and only as far as the user can answer.

- **Delight** is better than they expect. For an agent: what would let it do the work with no wasted
  effort and no rescue.
- **Good Enough** meets their need. It is their honest threshold, not a low bar. For an agent: what
  it needs in order to act correctly.
- **Ugh** is dislike or distrust, even if they carry on. Ask about it directly: what would make them
  unhappy without making them leave? For an agent: what makes it waste work, retry or need a person
  to rescue it.
- **Dealbreaker** is unacceptable, whatever else is good. For someone who cannot leave, tell strong
  dislike apart from what they would find unacceptable. For an agent: what would lead it to act on
  wrong or unclear input without noticing, because agents rarely complain, so the usual risk is a
  failure nobody notices.

This is how good it must be for them, as the user understands it. Where the user says what the
release itself should aim for, keep that in their words too, saying that it is about the release.
Delight is not automatically a requirement. A bar says what they need, not what
the project can afford: "we need this but can't afford it" is a need still unmet, not a lower bar.

Each bar should be something a later decision can use: something someone could see happen, with how
often or how much where that decides it. Where a level is hard to pin down:

- If Delight and Good Enough sound the same, asking what would make it better than just enough is
  one way to tell them apart.
- If a dealbreaker is a broad word such as "security", ask for the real, plausible event that would
  be unacceptable. It may be ordinary, such as failing to install or losing work for good.
- Ask for an example only where a level stays abstract. Asking for a story from someone who has just
  told you theirs feels like a test, and someone describing other people often has none to give.
  Examples about an example person are the user's own invention, and the profile says so.

Clear, distinct answers matter more than filling four boxes. What the user has seen themselves, such
as a complaint they read or someone they watched get stuck, is recorded as their observation,
because it is evidence and not a belief.

## Answers that need a second look

- An expectation that seems to pull against the project's stated purpose is a tension: raise it
  before going on, so they can think about it or park it.
- A familiar label such as "production-ready" can hide a bar the release does not need. Equally, a
  small budget does not by itself show that a stakeholder can put up with failure.
- Keep their hedges, because "about fifteen minutes" written as a threshold reads as something they
  decided. If nobody can say how much or how often, that is a question.
- If they change their mind, keep the reason with the new answer.
- Something they take as given about this stakeholder in passing is their assumption: keep it among
  this stakeholder's open questions before anything rests on it.
- Where the group differs, explore the subgroups or views that differ as deeply as the conversation
  needs, keep the exceptions, and say whose account a claim about the whole group rests on.
- An unresolved conflict with another stakeholder's view is an open question, linked to the other
  view; the release's trade-off is the user's, later.

Stay with this stakeholder: something that belongs elsewhere, such as what matters to someone
else, is written down as [each turn](../../../references/each-turn.md) says, and you carry on. Go on
while the replies are still adding something; stop when the user says that is all, or is tiring.

## When they do not know

Write the question and ask how they could find out, as [working on a
strategy](../../../references/strategy-workspace.md#when-they-do-not-know) says. Where that says to
offer a way, the ways of building up an understanding of a stakeholder are these, alone or together:
reasoning from what they know, recorded as their understanding with how sure they are; hearing from
the stakeholder and bringing back what they said; or describing an example person in the
stakeholder's situation, recorded as their example and not as a fact about anyone. If they ask to
reason a fuller view out, help them.

## What matters to them, thing by thing

The profile lists each thing that matters to this stakeholder, built from what the user said, the
interview, the project context and [the kinds of
quality](../../../references/quality-dimensions.md):

- **Each names the product or part and the kind of quality,** telling a tool apart from what it
  produces, so that the priorities step can put it together with another stakeholder's view of the
  same thing.
- **A broad label is split only where one answer would hide a difference that matters,** as
  [unpack where the answers
  differ](../../../references/quality-dimensions.md#unpack-where-the-answers-differ) shows. Parts
  that only need different fixes or checks stay one.
- **Each comes from what matters to them,** not from a list of work to do. A bug or an earlier
  incident can suggest one, but it belongs because of what it costs this stakeholder. Pose problems
  here, not fixes.
- **Look for what the user's account missed.** Use the kinds of quality to check, not as a list to
  go through or recite, and suggest the few possibilities this stakeholder's situation makes likely,
  each marked as yours, with the reason. Check [who it assumes, people or
  agents](../../../references/quality-dimensions.md#check-human-and-agent-assumptions), because you
  will tend to reason from how human teams have usually worked; and where trust changes what
  happens, keep how good something is apart from [how good they believe it
  is](../../../references/quality-dimensions.md#separate-actual-quality-from-what-people-believe).
- **Something the user says does not matter to this stakeholder stays in the profile,** with their
  reason.
- **A fact that brings an obligation** the project context does not record yet, as [obligations that
  come with the facts](../../../references/quality-model.md#obligations-that-come-with-the-facts)
  describes: tell the user the fact and the obligation that seems to follow, and record it in the
  context with their answer. The release priorities check these for the whole release.
- **A level they could not give** has its question where the level would be, never a guess.

## Asking the user about your additions

Show the user, once and together, everything you supplied, each with its reason, so that they can
weigh them as a set, because nothing you supplied counts as their understanding until they have
answered it. Each item is one of these: a single claim, named by its thing and level, such as
"recovery: the time limit, under an hour"; something you made by combining two things they said; or
a whole thing that matters which you added. A view that is mostly in their words may have three or
four. Show the open questions written so far alongside them, so that they can correct one or add
one; the open questions need no answer.

Their own words stand as they gave them. Don't read them back, because they know what they said and
reading it back costs their time while catching almost nothing; the profile is there for them to
open.

Their reply settles the items it answers, as [whose words are
whose](../../../references/templates/every-document.md#whose-words-are-whose) says, including a
general yes to the set: a correction is recorded in their words, and an item they cannot answer
becomes a question. An item their reply leaves unanswered stays marked as yours in the profile:
tell them so, and don't press for it now; they can answer it whenever they come back to it.

## What comes first for them

Ask once, as an open question over everything that matters to them: what matters most to this
stakeholder, as the user understands them, what less, and why. Prioritising is how you know what you
would do first. Don't ask for a High, Medium or Low on each thing, because ratings given one by one
tend to come back nearly all High and say less than the user's own words about what comes first.

- How bad something would be for them and what comes first for them are different questions.
- There is no right number of anything, at the top or at the bottom.
- Keep their reasons as they gave them, hedges included.
- If they cannot say, that is the answer: write it as a question with how they could find out.

Record their answer as they gave it, complete or not, with "not yet said" for what they did not
reach. Where they are unsure, a tentative order, marked as tentative and as their understanding, is
better than a gap, and they can revise it whenever they learn more or come back to it. The
release's order is made later, in the release priorities, from every view.
