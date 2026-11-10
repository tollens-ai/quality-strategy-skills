# Drafting and the hand-back

Opened from [drafting steps without the user](../SKILL.md) once it has worked out what to draft.

## The pre-read and other sources

Without the user, the project's own files are the main source, so the drafts need a pre-read: the
technical stakeholders' drafts rest on its major issues and on what it found about the tests and
about how friendly the project is to agents.

- If none is saved and the user has not declined one, the first `draft` makes one, in full and
  including the code, because the code shows where the documents are out of date. If the subagent
  reports that it could not make one, stop and tell the user why.
- If one is saved but lacks what these drafts need, such as the code or one of those readings, run
  `draft pre-read --again` once: its assignment adds what is missing, marked as the agent's,
  and the hand-back names the addition.
- If they declined one earlier, ask once whether to make one now, and run it only if they agree,
  because it was their decision. Without one, the drafts name their sources and the hand-back says
  so.

Look also at sources the agent already has permission to read: pull requests, issues, earlier
conversations, notes left for agents and memory. Name in `--sources` those the drafts may use, so
that they can be cited. Keep private material out of the records unless their agreed readers were
clearly meant to see it, because the records may be read more widely than the conversation was. Use
memory to support a guess or to find a source, never as a quotation or as evidence the user agreed
to something, because a recollection can be wrong.

## One step at a time, each to a fresh subagent

First save anything the user has said that is not saved yet, so that each subagent reads one current
set of records. Then, until `draft` says nothing is left:

1. **Run `draft`:** `draft --to <step>` when they asked to skip ahead to a step, or `draft <step>`
   or `draft --stakeholder "<name>"` for one they named, with `--request` holding their request in
   their words, including any source or place they named, and `--sources` anything else they
   allowed. It writes the assignment for the next thing to draft to a file and prints where.
2. **Give that file to a fresh subagent as its whole assignment,** to read first and follow; don't
   give it the conversation so far, because the point of handing the step over is to leave that long
   context behind. Don't open the step's skill yourself: drafts written in the main conversation, at
   the end of a long context and from memory of the skill, are where steps have been cut short. Wait
   for its report in the same turn, as [one skill opening
   another](../../../references/opening-another-skill.md) says. Never run two at once, because steps
   write to the same records.
3. **Check the draft before the next `draft`,** because a subagent's saying it finished is not
   evidence that it followed the step. Read the draft against the step's **Done when**, which the
   assignment quotes at its end, judged as the Done when allows for a draft: it should do what the
   step exists to produce, and mark what it could not work out and what it guessed. If it does not,
   send it back with what is missing, and write nothing into its draft yourself, because the draft
   has to be what the subagent saved while following the step.

Without subagents, follow each assignment yourself, one step at a time, opening each file when its
part comes.

## The hand-back

Update the progress note, as [stopping and coming
back](../../../references/stopping-and-coming-back.md) says, with what changed along the way and
what could not be worked out; put each question that could not be worked out in the draft it bears
on as well. Where the user has given permission to commit, commit the drafts with `records.mjs
commit`, because a draft is a record too. Then tell the user what they need to take the drafts
up: each major issue in the pre-read they have not yet heard, told as the `pre-read` skill says,
because they may read nothing else and these are findings about their product; the guesses that
most need correcting, including, if the project context was drafted, whether the release and who
matters are guesses; where the drafts are, and that what the agent wrote is not their view until
they have looked at it; and anything they would not otherwise find out, such as a check not run
for want of permission, an addition to a record they had already reviewed, or drafts made without
the pre-read they declined.

Then return to the skill that opened this one. If the user opened it, run `status` and tell them
which step comes next.
