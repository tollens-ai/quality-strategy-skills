# Hand back

Step 5 of [write the strategy up](../SKILL.md#5-hand-back).

The reply gives the strategy owner the strategy and asks them only what is needed before anyone
works from it. What they have to decide is already in the strategy, as open questions in its
sections, where it stays true tomorrow and where their own agent often reads it for them. So this
reply replaces the closing message that [stopping and coming
back](../../../references/stopping-and-coming-back.md) describes: it does not list what they have to
decide, and `comms-review` is not run on it.

1. **Before you reply, record `step connect done` and run `status`,** because a later session must
   find the step recorded even if the owner never answers.
2. **Ask only what you need from them** before anyone works from the document, such as a finding of
   the review that only they can settle; otherwise ask nothing.
3. **Update the progress note** as stopping and coming back says. If you asked something, record it
   there as waiting for an answer, because if they leave before answering, the next session asks it
   when they come back. Then commit with `records.mjs commit "write-up"`, which commits only where
   the user has given leave to commit.
4. **Write one reply.** Say where the strategy is, as the path of the file they would open, and
   whether the records are committed. If this run rewrote a strategy that was already saved, say
   whether the earlier version is kept or whether the decision log is the only record of what
   changed. Say in a line or two what the review found that you changed, and what it found that
   needs them. If no other reader reviewed it, say so and give the line [the review](review.md)
   gives for that case. Then ask what you need, or make the offer: to work further on one priority,
   the one they choose, with `priority-deepdive`, and after that to make a picture of where the
   project's quality stands with `quality-report`, which they can show other people. Whether you
   offer to go on now or in a fresh session is decided as stopping and coming back says; for a fresh
   session, give the whole line to type.

Save whatever they reply. A rule they give, such as that nothing is to be run, goes in the rules the
owner has given, in the opening. If their reply changes something, make the change in the strategy
and the records together, with a decision log entry saying that it came after the review, so that a
reader can tell the reviewed text from what changed since. Take an answered question out of the
progress note and commit again. If they choose a priority, open `priority-deepdive`; if they want
the picture, open `quality-report`.
