---
name: draft-strategy-steps
description: Draft steps of a quality strategy without the user, for them to review later. Use when the user asks to skip ahead to a later step, or asks the agent to draft steps or stakeholders itself. Asks for the project context to be done with the user first.
---

# Drafting steps without the user

## What it is for

Each step of a quality strategy is a conversation with the user, because what it produces is their
own considered answer. Sometimes they would rather the agent drafted steps for them to review later:
"skip to the write-up", "do the stakeholders yourself and I'll look". A step skill or
`quality-strategy` opens this skill when they ask, and they can open it directly.

A draft takes the place of that conversation but cannot do what it does. Be plain with the user
about that: a draft is a first version, likely to be wrong in places, and theirs to correct.

**A good draft** says what the sources support, and is made by following each step as written: at
each question the agent asks itself how best to answer it from what it has, because drafting is not
a shortcut through the steps. Each claim says whose it is and what it rests on, so that the user's
earlier answers stay theirs and the agent's reading is never passed off as theirs. Where the
sources support nothing, an honest draft says so: it gives the question, with what would settle it,
or, where a guess would help them review faster, a guess that says it is one.

Unless the project context is already done or drafted, ask the user once, before drafting anything,
whether to do it with them, because a wrong context wastes every draft built on it. Agents that
drafted the context alone have chosen the wrong release every time; asking first prevents that, and
if it is drafted anyway, marking the release as a guess at least shows the risk.

**Done when** the user knows:

- what was drafted and where it is;
- which guesses most need checking;
- the pre-read's major issues they had not been told before, told as the `pre-read` skill says;
- which step comes next.

## Before drafting

Before your first message, read your tool's section of [the harness
page](../../references/harness.md).

1. **Find the quality folder** and run `status`, as [where things
   stand](../../references/where-things-stand.md) says, because it shows whether the project context
   is done.
2. **If the project context is neither done nor drafted, ask once before drafting it,** even if the
   user has said not to ask, because what the project's files say about the release and who matters
   may not be what they mean now. Say that a context drafted without them is likely to be wrong,
   with every later draft resting on it, and ask whether to do it together first or have it drafted
   anyway. End the message there and wait.
   - Together: open `quality-strategy`, which leads to the project context. Remember the step they
     asked for, and come back to step 3 of this skill when the context is done. If they change their
     mind on the way and say to draft it, draft it without asking again.
   - Anyway: the context is drafted with the rest. What the agent inferred about the release and who
     matters is its guess wherever it is used, because they have not confirmed it; what they said
     about them stays theirs, with their words. Add `--anyway` to each `draft` until the context is
     drafted; it records the setup and interview steps, so record nothing about them by hand.
3. **Work out what to draft,** which is only what they asked the agent to do without them.
   - They asked to skip ahead to a step: draft, in order, the steps between the project context and
     that step that `status` does not show as done. If they also said not to ask them, or that they
     will look later, then once `draft --to` says nothing is left, draft the named step too, and say
     in the hand-back that it is a draft for them to answer, because a draft costs them one review,
     while a question they asked not to be asked costs them a turn. Otherwise do the named step with
     them; if no step comes before it, go straight to it.
   - They named particular steps or stakeholders: draft those.
   - A write-up already done is drafted again only when they ask, with `draft connect --again`; the
     assignment says what to keep of the version they reviewed.
   - Stopping for now, such as "later", "I'll stop here" or a fresh session: draft nothing, because
     that is not a request to draft. Go back to the current step's skill and close it as it says.
   - "Next" or "carry on" with part of the current step still left: say what remains and ask whether
     to finish it together or have it drafted, because those words could as well mean finishing it.
4. **Tell them what is about to happen,** in a line or two, before anything is drafted: what will be
   drafted, and, if no place for the documents is agreed, the folder the drafts will go in and what
   is known about who can reach it. Then carry on without waiting, because it is not a question.
5. **If the context is drafted anyway and no place is agreed,** use the folder you named in step 4
   without asking, and save `.scratch/session-config.md` in it with this line, because its wording
   makes the next session with the user agree on the place.

   `- Home: <the folder> (not agreed: a default the agent used because the user chose to have the
   strategy drafted without them)`
6. **If anything is left to draft,** open [drafting and the
   hand-back](references/drafting-and-hand-back.md) and follow it.

## When the user comes back to a draft

`status` offers each draft for them to review in turn, with the skill of the draft's step. That
skill shows them the draft, says what it rests on and asks for their answer. A draft is recorded
done only once they have seen it and answered.
