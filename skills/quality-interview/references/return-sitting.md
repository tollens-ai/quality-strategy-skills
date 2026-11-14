# Pausing and returning to a sitting

## When the user leaves before the end

1. If there is time and no reflection is waiting for its reply, write the pending topic records
   first, as [writing up topics](write-up-topics.md) says.
2. Save with `pause`, saying in plain words what is left, for example "I haven't written up today's
   answers", "I still need your reply to what I read back to you" or "the summary isn't written
   yet".
3. Tell the user where the records are, that the sitting isn't finished, and what is left, in the
   same words.

## Returning

`status --session <folder>` shows the stage, what is left, the topics so far and `next`. An earlier
record tells you what was known or chosen then, not what has changed since. Read your `notes.md`
too, because a look at the files may have started or finished after the last saved reply.

Set up checks for an answer on whether the records may be committed, and that check applies here
too, because a return skips the rest of set up: if the quality folder is inside a repository, git
does not ignore it and `node "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs" where
--quality-dir <the folder>` shows `Commits: not recorded`, open `quality-setup` for that answer
alone before anything else. If the saved arrangement already gives the answer, `quality-setup`
records it without asking the user. If it has to ask, ask that question on its own first, and
record the exchange the same way as the catch-up answers below.

If the reflection is waiting, see [returning to a pending
reflection](#returning-to-a-pending-reflection) instead. If `next` is `write-up`, the reflection has
had its reply, so ask no question: say in one line where things stand and carry on with [wrapping
up](wrap-quality-interview.md#3-write-up). Otherwise:

1. Say in one line where things stand and which earlier material you mean to use, and ask one
   question: the one `next` points to, under the number `next` gives it. Ask what has changed since
   the last sitting only when the time that has passed makes it worth a turn of its own, and don't
   number that catch-up question.
2. If you asked a catch-up question, record the answer with topics for anything changed or new,
   with `choice: "unclear"` if a check-in was waiting. Revisit the open items it affects, and
   offer the waiting check-in again.
3. Carry on where `next` points, numbering from where the sitting left off. Don't give the
   introduction again, and ask the first question only when `next` marks it.

If what the release is for has changed, the record holds the new account and the transcript keeps
the earlier turns; use the new one for this sitting. Go back only to the conclusions whose meaning
or relevance changes, and ask if you can't tell. Don't drop old concerns because the release
changed.

Old topics keep the user's names for them: if a name may be out of date, ask rather than rename
it. If an old unknown has been answered, record the answer and how the
understanding changed.

## Returning to a pending reflection

When `next` resumes at `reflect`, or at `clarify` about the reflection, the user is owed the
reflection, not more questions.

- **If they turned down the reflection before leaving** (the saved `remaining` says so), don't give
  it again. Say the summary isn't written yet, and ask what, if anything, has changed before you
  write it.
- **Otherwise** give it as [wrapping up](wrap-quality-interview.md) describes, briefly if you gave
  it before. Fold the catch-up into its one invitation: "What, if anything, would you change or
  add, including anything that has changed since?", with the choice about names when it applies.

Either way, record the reply with its `choice` and carry on with the wrap-up.
