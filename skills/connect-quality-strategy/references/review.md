# Check it against its sources

Step 4 of [write the strategy up](../SKILL.md#4-check-it-against-its-sources).

Deal with whatever the checks find in one way: where the records settle the point, change the
strategy and record the change in the decision log; where it needs a choice that only the owner can
make, it goes to them.

1. **The mechanical parts.** Run `node "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs"
   check <strategy.md> --quality-dir <folder>`. It reports rows without a section and sections
   without a row, a section's four parts missing or out of order, links that do not resolve in the
   strategy or in any other record in the folder, the version line, and a quote from the interview
   that its transcript does not hold. Fix what it reports in what you wrote, including a link you
   added to another record.
2. **Nothing lost.** Read the strategy once more for this, as a judgment rather than a mechanical
   check. Can a reader find every open question, once, with its next action? Then read the
   interview's summary and topics, the profiles and the project context against the strategy, for
   what the person said inside each topic, not only whether the topic has a place: the case they
   gave, the reason, the limit, the words of their strongest worry, and what they said they would
   do. Each either carries their meaning in the part it bears on, in their own words where those
   are the strongest form of it, or is written as a question there. A section that names the topic
   without what they said about it has lost it, because the reader decides from what was said, and
   a topic's name decides nothing.
3. **The strategy review, by a reader who did not write it.** You are the reader least able to see
   what the draft says, because you read what you meant. So the last check is [the strategy
   review](../../quality-strategy-review/SKILL.md), run by a fresh agent your harness offers, opened
   as [when one skill opens another](../../../references/opening-another-skill.md) says. Fresh means
   it starts from the written brief and the records, with none of this conversation and nothing you
   drafted on the way, because a reader that carries your reasoning reads past what you do; [the
   harness page](../../../references/harness.md) says what that is in your tool. Give it the review
   skill to follow, the quality folder, and a brief, and nothing of your own, such as a brief you
   wrote for another check: review the whole of `strategy.md` against the records it was written
   from, for the readers it is for, and send the findings back to you rather than to the user. Ask
   for findings, each with what it rests on in the records or in what the person said, because a
   finding you cannot trace is one you cannot act on. An approval with nothing it rests on is not a
   review: treat the strategy as not reviewed, as below.

   Deal with its findings as this page says at its head. Where you disagree with a finding, leave
   the text and record the finding in the decision log with your reason, so that every finding stays
   on record. Then reread each part you changed and every part that refers to it, because a fix can
   contradict another part. The review runs once: act on what it finds, and do not have the strategy
   reviewed again, because the owner needs it.

   Where your harness offers no fresh agent in this turn, do not run the review yourself and call it
   one, because a writer checking its own document is what this check exists to replace. Record the
   step done all the same, because the owner needs the document, and put in the progress note that
   the review is waiting, with the line below, so that the next session knows the strategy is
   unreviewed. Give the user that line to run in a fresh session: the command for
   `quality-strategy-review` as [the harness page](../../../references/harness.md) writes it, then
   "review <the strategy's path> against its records and fix what the records settle; put to me
   what only I can decide", with the path as `records.mjs where` prints it and, after a deep dive,
   the section named. Following that line gets the same handling as a review run here.
