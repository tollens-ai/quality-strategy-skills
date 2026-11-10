# Working from the pre-read

A [pre-read](../../pre-read/SKILL.md) answers the factual questions that the project's own files can
answer, so that the questions here start from something and ask only what the files cannot.

**If `pre-read.md` is saved,** work from it.

- Don't tell them again about a major issue they have already heard, as the pre-read step, the
  progress note or the context's saved concerns show. Where you cannot tell whether they have heard
  one, tell it in a line, because hearing it twice costs them less than not hearing it.
- Tell them about any other major issue before your first question, as [telling the major
  issues](../../pre-read/references/telling-the-major-issues.md) says.
- If the digest is from an older pre-read and lacks the three readings (the major issues, what the
  tests cover, and how friendly the codebase is to agents), read the project further to write them,
  and add them under a dated heading, marked as your own reading, because otherwise the user never
  hears about the issues.

Then go on to the questions in the skill without presenting the digest again, because the rest of it
comes up with the questions it bears on, as the end of this page says.

**If none is saved** and `status` shows the pre-read skipped, go on to the questions, because they
have already said no. Otherwise offer one before going further: say what it is for, and what the later
steps would lack without it, namely any facts about the project to start from, so that more would
have to be found out as they go.

- **On a no,** record `step pre-read skipped` in a strategy, so that it is not offered again, and go
  on to the questions, because nothing has been found that they need to hear.
- **On a yes,** ask which repositories or folders belong to the project, unless that is plain. Settle
  who can read the quality folder before the first save, as [saving and closing](save-and-close.md)
  says. Then
  give the pre-read to a subagent, so that what it reads does not fill this conversation: tell it what
  to read, what the user has said worries them, and to save the digest as `pre-read.md` in the quality
  folder. Wait for it in this turn, as [opening another
  skill](../../../references/opening-another-skill.md) says, because the questions start from what it
  found. Where there are no subagents, run `pre-read` here first.

**When the new pre-read is saved, tell them what it found,** in one message:

- first, its major issues, as telling the major issues says; if they want one seen running, do it
  before the questions here;
- then the findings and gaps that bear on what they have said worries them, and none if they have
  said nothing yet;
- last, ask what it got wrong, and correct the digest wherever a correction matters.

Once they have answered that message, record `step pre-read done` in a strategy.

Whether the digest was saved before or is new, bring up the rest of it with the question each part
bears on, rather than reading out its summary: what it says about the tests comes up when you ask how
work is checked, and what it says about agents working on the codebase comes up when you ask who does
the work.
