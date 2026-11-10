# Stopping and coming back

**The progress note,** `.scratch/strategy-progress.md` in the quality folder, says where things
stand now. It holds the last question put to the user and whether they answered it, what needs the
user now, and anything else the next session should tell them, such as a change that later work
depends on. It does not hold their answers, which are in the records. A skill run on its own for one
question adds only the question still waiting for an answer; an interview keeps its own note.

**Going on, or a fresh session.** If the user has said which they want, do that; "carry on" says what
to continue, not whether to do it in this session. Otherwise judge by how much has been said in this
conversation: once it has got long, recommend a fresh session, because a session holding too much
mixes one step's reasoning with the next, and the records carry everything forward. When you offer a
fresh session, give the whole line for them to type: the command as [the harness page](harness.md)
writes it, words saying that it continues the strategy, and the stakeholder or the folder where that
matters. Before they leave, get the answer to any question you have already asked.

**The closing message** is written from the records, not from memory. If the user's permission to
commit still stands and the records have changed, run
`records.mjs commit "<step>" --quality-dir <folder>` and mention it in a few words. It never pushes;
if the commit fails, say so once and do not retry it.

- If they are going on now, close this step in one line at the top of the next step's first message.
- Otherwise start with **what needs them now:** a High priority or a Dealbreaker that is still unknown
  and waits on them, a question put off until this step, anything for them to review, and anything an
  agreed step needs from them. Say what waits on what, and what can start without them, because a
  list of needs read as a gate stops work that could go on. Leave out what they chose to set aside.
  Say that nothing needs them only when that is true. If the list is unchanged from an earlier close,
  do not give it in full again.
- Then what they need to pick up later: what was learned, where the records are, and whether they
  have been committed or shared, when that is news to them.
- When a saved view or finding could help with a choice they face, say which choice and how far they
  can rely on it. Until then, offer nothing as guidance, because your own interpretation is not a
  stakeholder's view.
- If the user means to settle a question by asking someone else, mention that question once. Draft
  nothing for that person, and if that person does not read the records, say that the user can ask
  the question without showing them the records.
- End with the offer to go on or the line for a fresh session, and wait. If they go on when you
  recommended a fresh session, say once what may be lost, do as they ask, and recommend a fresh
  session again only when this one has grown a good deal longer.

**Coming back.** Run `status`, read the progress note and the records, and work out whether the
person is the strategy owner; if that is unclear, ask before showing anything.

- Before asking a question waiting in the note, check that the step it belongs to still asks
  anything like it, judging by what the question means rather than its words. If the step no longer
  does, take it out of the note yourself and add a line to the decision log saying so, because the
  question was the pack's, not theirs; then carry on as the step now says.
- A question waiting in the note is never answered by assuming the answer. If it blocks what they
  came for, or they have not said what they came for, ask it first and on its own, showing in full
  the item it is about. A question they declined or set aside is not a waiting one.
- Unless they said what they came for, list the open questions and ask which they want to take
  first. Ask for any facts still needed before explaining what depends on them.
- Tell them what someone else decided on their behalf while they were away, from the decision log.
- If the person is someone else, say so, and offer only what they can help with. Show them only what
  they themselves may see under the saved arrangement: being able to open the records does not make
  them one of the records' agreed readers. Record what they say as their account. Log any decision
  the owner handed to them, and leave the owner's other decisions to the owner. Put a view that
  differs from the owner's beside it as a tension, and where it would change a choice, write a
  question that waits for the owner.
