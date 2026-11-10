---
name: quality-interview
description: Hear what matters to someone about a software project's quality, and what worries them, in their own words before any structured strategy work, so the strategy does not miss it. Keeps their account in a transcript, topic records and a summary that later steps check the strategy against. Use when someone has something on their mind about a project's quality, or to resume an unfinished sitting.
---

# Quality interview

Quality is value to someone who matters. The approach to quality strategy in this pack derives from
the Context Driven Testing school: start by describing who matters, describe what matters to them,
then prioritise the work to achieve it. The approach is not dogmatic - coverage, checklists,
standards and established practice can all be part of the strategy, sometimes they are the exact
right thing for some stakeholder or some quality dimension. The key thing is the overall approach -
based on context, and understanding what this project needs to achieve.

The interview is where the user says what is important to them about the project's quality and
what is on their mind: the known risks and the worries. They say it in their own words, before any
framework shapes it.

It comes before the strategy work because the project's files cannot show what someone is worried
about. Once the formal steps start, what they raised can get lost while the strategy is worked
through, so the later steps check the strategy against this record to make sure nothing was
dropped. When something is on the user's mind, the strategy usually starts here; when nothing is,
this step is skipped.

It is not the strategy. Nothing has to be covered, nothing needs a solution or a plan, and nothing
is sorted into the pack's model of quality here, because its value is that it is theirs. Use the
model only to notice a gap worth asking about, after they have described things their own way.

The user leads. They bring the experience and judgement and make the choices; the agent chooses the
questions and keeps what is said. A file can show a recorded fact or a past choice; only the user
can say what they think now.

## What good looks like

**A good sitting**, to the user: they were heard on what they came with; nothing they said was
turned into the agent's words; they could steer or stop at any point; nothing was asked twice.

**A good record** is a summary that a later step can check the strategy against. It has each thing
they raised, in their words, with why it matters to them and what they said they do not know about
it, and it calls out the known risks and worries as such. The transcript and the topic records keep
the full account the summary is drawn from; if the user left before a summary was written, later
steps use them instead.

**Done when** the topics the user wants to cover are understood well enough for this sitting and
written up faithfully, the important open questions are kept with why they matter, and the summary
reads as above. If they stop sooner, the record keeps what they said and says where to pick up.

## How the sitting goes

One conversation is a sitting. It has three parts, in this order: set up, the questions, and the
wrap-up. Choosing the next question and wrapping up each have their own guide, opened at the step
that names it.

Talk to the user as [each turn](../../references/each-turn.md) says, and with
two things the interview needs above all:

- **A wish to stop or leave comes first,** before anything planned. Don't end the questions
  because the agent thinks they should.
- **Keep their exact words,** and keep them separate from the agent's reading of them, above all
  when saying their words back: the agent gives anything it adds, such as a number, a link or a
  consequence, as its own reading, because a paraphrase they say yes to goes on record as theirs.

When the user asks a practical question about the interview or the pack, such as how long it takes
or what happens to their answers, answer it briefly and carry on. A worry they put as a question is
still their concern: keep it in their words like any other, rather than answer it, because nothing
here needs a solution or a plan.

## The helper that saves the sitting

A helper script saves every turn; set up already uses it. Run
`node "$PLUGIN_ROOT/skills/quality-interview/scripts/interview.mjs" <command>`, where
`$PLUGIN_ROOT` is the folder holding `PHILOSOPHY.md` and `skills/`. The step that uses a
command explains it; `--help` lists every field.

- Write each request with the file tool to `.scratch/request.json` in the quality folder,
  overwriting the last, and pass `--input <file>`; after `start`, also `--session <folder>` with
  the folder it returned.
- Each result's `next` says what to do now. If the user wants something else, do what they want
  rather than what its hint says.

In the sitting's folder, `quality/interviews/<date>/`, the helper writes `transcript.md`,
`progress.md`, `session-config.md` and `topics/`. The agent writes only
`quality-interview-summary.md`, at the wrap-up, and `notes.md`. The notes hold what a look at the
project's files was based on, a point or a question to come back to, and any mistake in the
transcript, because a turn can't be changed once it is saved.

## When the user wants to stop

Whenever they say they want to stop or leave, at any point from before `start` to the end of the
wrap-up, and also when they have to go and want to continue later, open [when the user wants to
stop](references/when-the-user-wants-to-stop.md) at once. It says how to record their reply, if at
all, and what happens next.

## Set up

**Goal.** Help the user start comfortably, knowing what the conversation is for and what will
happen to their words.

**Done when.** The choices needed to start are settled, by the user or by defaults the agent
explained and left open to correction.

Open [setting up](references/set-up.md) before the first message, because the opening depends on
what it finds: an earlier sitting, and a saved arrangement for the records.

## The questions

**Goal.** Understand more, while keeping what the user says and following how they want to go on.

**Done when.** The latest answer is understood and saved well enough to choose what comes next,
and any wish to stop has been followed.

Do these four steps for every reply, in this order:

1. **Hear whether they want to stop,** or want something different, in every reply. A wish to stop
   or leave goes [as above](#when-the-user-wants-to-stop), in place of steps 3 and 4.
2. **Record** every reply with `record` before responding to it, because a reply that is not saved
   is lost if the conversation breaks off. Open [recording a reply](references/record-a-reply.md)
   at the first reply and follow it: it says what to pass and what a topic is.
3. **Respond to what was said,** as that file says.
4. **Do what `next` says.** The same file lists its four values, where each sends you, and how to
   number a question.

## A quick look at named files

If the user asks for a look at something in the project, follow [a quick look at named
files](references/quick-look.md), which says when it can happen and when it needs permission; ask
which concern it should help with if that is unclear.
