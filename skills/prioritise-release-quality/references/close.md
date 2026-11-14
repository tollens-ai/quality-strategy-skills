# Prioritise release quality: the close

At the close you write what the strategy owner answered into the strategy's priorities, for a
reader who was not there, and offer the next step.

If the strategy owner has already said that what they have given is enough, for example "isn't that
enough for now?", take that as their answer: don't put your reading from step 1 to them. Record it
as yours, not yet answered, and go on with step 2.

1. Put to the user, as one clearly named item, your reading of what the table adds up to for the
   release, so that the opening's bottom line is either theirs or a reading of yours that they have
   seen. The reading is that bottom line, as [the
   template](../../../references/strategy-template.md) describes it: one short paragraph saying
   whether the release can go, or how far it is from ready, and what matters most to that. Don't
   show the finished table again, because they made each decision on it; show only what in it they
   have not answered, such as an addition of yours. Record what they saw and what they answered,
   because saying they saw more would record a review that did not happen. Where they let a proposal
   of yours stand, record the proposal's own text, because "let it stand" means nothing once the
   conversation is gone.
2. Write what this release will not do, the priorities and the opening, in the places [the
   template](../../../references/strategy-template.md) gives them. Write them new at this close, or,
   when the user has come back to change the priorities, change them in place wherever a rating or
   bar changed. In those parts, say which decisions are still open and what each needs before the
   owner can make it; who is still to be heard from, and which rows their view could change; and
   which views were kept brief, with the rows a fuller view could change. A view that was kept
   brief is not a missing one, even when the user wants to come back to it in full. Where they
   declined to give limits, say so once, with their reason, because a reader would otherwise look
   for them. Write the bottom line from their answer to step 1.
3. Run `records.mjs table <the quality folder>/strategy.md --quality-dir <the quality folder>`,
   which lists each row and each stakeholder with anything it lacks. Make sure each thing it lists
   as lacking is an open question with a way of finding it out, or say why it is not.
4. Outside a whole strategy, run `comms-review` on what the strategy now says and deal with what it
   finds; in a strategy the write-up does this.
5. In a strategy, record `step priorities done`, with any decisions left open named in its note,
   because an open decision is an open question and no later step needs it settled. If instead they
   asked to stop and finish this step together later, record it `started`, with what is left and
   whose answer it needs, because they chose to come back to it rather than leave the decision open.
   Run `status`. When the skill runs on its own, with no strategy, record nothing.
6. Open [stopping and coming back](../../../references/stopping-and-coming-back.md) and do what it
   says, adding to the closing message which decisions are open and what each needs before the owner
   can make it, and who is still missing, with the rows that stay open for them.
7. In a strategy, the next step is writing the strategy up, with a section for each priority, so
   that what has been decided can be taken away and worked from. Unless they have just said what to
   do next, wait for their answer to the offer, because no step starts before they choose it.
