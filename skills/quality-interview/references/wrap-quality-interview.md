# Wrap up the quality interview

**Goal.** Close the sitting with a faithful account of what the user meant, read back to them and
kept in the record.

**Done when.** The user's closing corrections are in and a useful summary is saved. If something
interrupts first, the record says accurately what was saved and where to pick up.

The interview opens this when `next` says `reflect`. The user has just said they want to stop, so
they hear the reflection, the agent reading back what it heard, before any write-up. Ask no more
questions about the project unless their reply to it asks to keep talking.

## 1. Read back what was heard

**Goal.** Let the user hear and correct the understanding that will go into the summary.

**Done when.** Their reply has clarified or corrected that understanding enough to write up this
sitting, or their choice to go on or stop has settled what happens next.

1. **Check whether they will take a question.** A request to stop, even "that's enough" or "wrap
   it up quickly", still gets the reflection and its question, as steps 2 to 5 say.

   The one exception is when they turned down the reflection before it was given, for example "no,
   just save it". They have declined one more question, but that is no reason to lose the summary,
   so in that case:
   - draw the reflection and make it as steps 2 and 3 say;
   - give it in one turn: a brief acknowledgement of the end, then the reflection as a statement
     with no question;
   - save it with `reflect`, passing that turn as `said`, and go on to the write-up in section 3.

   The summary then says at its head that the reflection was not answered, so nothing in it has
   been confirmed by the user. If the question about names would have been due (step 4), don't ask
   it: leave the names out of the summary, say at its head that they were left out because the user
   stopped before being asked, and pass the same to `finish` as its names choice.
2. **Draw the reflection** from the transcript and the topics saved with each reply (`status`
   lists them with what showed the user's interest and the user's names for them). Don't write
   topic records first, because the user's corrections come before the write-up.
3. **Make it one short, conversational reflection.** A **key point** is a concern or theme the
   user called important, came back to, or asked to keep exploring.
   - Lead with the key points, usually one to three, then name the other topics in a line.
   - If none qualifies, lead with up to three themes that took most of the conversation, as "the
     main things I heard", not the most important ones.
   - Include at least one point if the conversation held any concern or theme about the project,
     and anything they said they realised and treated as important.
   - Use the user's own words, keeping hedges such as "I guess" or "idk" with what they qualify.
4. **Choose the one question that follows it,** not one per topic.
   - If the conversation criticised named people, or included anything the user might not want
     under their name, ask about names in the same question and say who the summary is for:
     "Before I write the summary for the team, what, if anything, would you change, add or leave
     out, such as names?"
   - Otherwise ask what, if anything, they would change or add.
5. **Give it in one message and wait:** a brief acknowledgement of the end, the reflection, then
   the question.

## 2. Their reply

Decide which of these the reply is before saving it, because `record` needs the choice. Call
`record` with the reflection exactly as it was given as `asked`.

1. **A correction or addition.** Record each in the reply's topics, applying each correction only
   to the topics they raised it about. Pass `choice: "end"`, unless the reply also asks to keep
   talking; then pass `"continue"`, go back to the questions, and give a fresh reflection when they
   next want to stop.
2. **They want to keep talking, with no correction or addition.** Pass `"continue"` and go back to
   the questions.
3. **They ask what the agent means, or it's unclear what they want.** Pass `"unclear"`, answer or
   clarify, and record the next reply with its choice.
4. **None of these.** Pass `"end"`. A bare "yeah", or "mostly right" with nothing to change,
   belongs here; don't ask again what isn't right.

Two things follow from the reply:

- If they asked for something to be left out, tell them it stays in the transcript and the topic
  records.
- If the question asked about names and the reply doesn't settle it, ask once more, on its own, and
  record that exchange. If they leave without settling it, leave the names out and say so in the
  closing message and the summary, so they can change it, and give `finish` that as its names
  choice.

## 3. Write up

**Goal.** Leave a useful, faithful account of the concerns explored in this sitting.

**Done when.** The saved summary reflects the conversation as it now stands, including corrections
and open topics, well enough that the user or a later strategy session can pick it up without going
back through the interview.

1. **Write the topic records.** Read and follow [writing up topics](write-up-topics.md) for the
   topics `next` lists as pending. It says how to say whose each claim is; mark as agreed only the
   points their reply to the reflection names.
2. **Write `quality-interview-summary.md`** in the sitting folder, from the transcript and topic
   records, under the saved title and the headings of [the interview
   summary](../../../references/templates/interview-summary.md).
   - Lead with what they raised that seemed to matter most to them, saying this is the agent's
     estimate and what it rests on (they called it important, came back to it, or wanted to
     explore it). Don't present it as their rating of importance. If none stood out, say so.
   - Then every topic, closed and parked ones too, each joined topic under the one it was joined
     into. Give each what the sitting gave of it: its id and what it is about, in their words, and
     why it matters to them, what they said they do not know and where to pick it up, where they
     said something about those. A thought with nothing beyond its quote is one line, because
     more lines would only repeat it. Give why it matters in their words where they said why.
     Where they didn't, give the question they were answering when it came up, or, where a reader
     would otherwise supply a reason of their own, write "not said", because a reason the agent
     supplies would read as theirs. For a topic the user asked to keep out, give only the id.
     Describe an open topic as left for later; use "parked" only for a topic the user chose to
     park.
   - Mark the known risks and worries as such, in their words. Don't sort them into levels they
     did not use themselves.
   - Say whose each claim is, and keep the user's hedges, as the topic records do. This applies
     to the opening lines too. Where the agent drew a tension, trade-off or connection, mark it as
     the agent's until the user takes it up, among the open questions as everywhere else.
   - Include any action someone suggested, saying whose idea it was. Don't turn a suggestion into
     an agreed plan.
   - Keep the important open questions, each with why it matters (in the user's words, or marked
     as the agent's reading) and what they said they do not know. Say which were put to the user,
     because only those were theirs to answer:
     - one asked and left unanswered is shown as asked and unanswered;
     - one they declined is shown as declined, in their words and with any limit they gave, such as
       "not tonight";
     - one the agent wanted to ask and did not reach is marked as the agent's open question. List
       one only when it is a real question worth a later step's time, not one for every open
       topic.

     A useful question needs no agreed way to look into it or fix it; don't invent one.
3. **Run `check`.** Fix every quotation it reports as missing, and make sure each phrase in
   `interviewer_words` is credited to the interviewer.
4. **Read the summary against the transcript and topic records,** and correct:
   - anything left out, and dropped hedges;
   - claims nothing supports about what mattered to the user or why;
   - a wrong speaker, or a claim marked as the wrong person's;
   - corrections not yet recorded.

   If a mistake during the conversation affects how the record should be read, explain the
   correction plainly in the summary.

`check` and this reading always run, because a later step checks the strategy against the summary
and can trust it only if it is faithful to what the user said.

## 4. Finish, or save where to pick up

Call `finish`, with the names choice when there was one, and fix anything it refuses.

If something interrupts before the sitting can be finished, call `pause`, saying in plain words
what is missing: the reply to the reflection, the topic records or the summary. A partial summary
helps, but the sitting stays unfinished.

## 5. Close truthfully

1. **If the sitting is finished,** and set up found it part of a strategy or the user has asked to
   go on to one, record it with `node "$PLUGIN_ROOT/skills/quality-strategy/scripts/steps.mjs" step
   interview done --quality-dir <the quality folder>`, so the strategy's next step is the one
   after the interview. An unfinished sitting, or one on its own, records nothing there.
2. **Give one short closing message** based on what was actually saved. Ask no more interview
   questions: the sitting is closed, and anything still open belongs in the summary's open
   questions. Before it, run `node "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs"
   commit "interview" --quality-dir <the quality folder>`. It commits the records only if the
   user's permission to commit them is recorded, and otherwise says why it did not; the closing
   message can pass that on in a few words.
   - **Finished:** where the summary is and whether it is committed, and any useful open topics. In
     a strategy, say that `quality-strategy` names the step that comes next, and offer going on or
     a fresh session as [stopping and coming
     back](../../../references/stopping-and-coming-back.md) says, because a long interview is when
     a fresh session is worth recommending. Offer the writing review once: it looks over how the
     summary is written for the mistakes agents commonly make when they write for people, and does
     not check it against the transcript, which the write-up has already done. Say that it takes a
     few minutes and a worker's tokens, and that if they say no the summary stays as it is. It is
     offered here, after the summary is saved, so a user who does not want it loses no turn.
   - **Unfinished:** where the records are, what was saved, what remains, and that a return
     sitting picks up from there.
3. **If they say yes to the writing review,** call `comms-prep` for the summary. Its readers are
   the people the records are for, as settled at set up, and a later strategy session. In the
   brief, say what the summary is for: a later step checks the strategy against it, so each thing the user raised must be found
   in it, in their words, because the review works from the brief. Then call `comms-review` on the
   summary and deal with what it finds. Run `check` again, because an edit can break a quotation,
   save the summary, and run the same `records.mjs commit` again so the reviewed summary is kept
   where the first one was.
