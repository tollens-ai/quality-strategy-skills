# Recording a reply, responding and following `next`

## 2. Record

Every reply is saved with `record` before responding to it, as the interview says. Set-up,
catch-up, permission and closing replies are saved too, with what they say about the project. Pass:

- **`asked`**: the agent's turn exactly as it was given.
- **`reply`**: the user's reply, word for word.
- **`topics`**: one entry per topic the reply touched, as below.
- **`question`**: when the turn asked a numbered question, the number it showed.
- **`answered`**: with `question`, `true` or `false`. It is `false` when the reply leaves the
  question unanswered: they asked what the agent meant, said something related that would have to
  be interpreted as an answer, or answered only part. A refusal or "skip that" is `true`.
- **`also_answered`**: the numbers of any earlier open questions this reply answers.
- **`offer`**: when the turn was a check-in, which kind: `checkin`, `seam` or `exhaustion`
  ([check-ins](check-ins.md) says which is which).
- **`choice`**: when they answered a check-in or the reflection: `end`, `continue`, or `unclear`
  when they asked something or didn't decide. `end` also marks the user ending the questions on
  their own, because that end is theirs: a stop they ask for, or "nothing more" in reply to a
  question that invited anything else on their mind about the project, when no open topic still
  has a question their interest supports. `next` then gives the reflection, and its own question
  lets them carry on, so no check-in comes first. "Nothing more" to a follow-up about one concern
  finishes only that concern, not the interview. When an open topic does still have such a
  question, "nothing more" means they had nothing new to add, and the questions go on.

A topic is one thing the agent would follow up with its own questions. So six sentences about one
thing are one topic, a reason, example, qualifier or setting given for a concern belongs to that
concern's topic, and the same concern said again in other words is the same topic. A reply with
nothing in it gets no topics.

When the user refuses a question about a topic, still include that topic in the reply's
`topics`, because the write-up updates a topic's record only when a reply has touched that topic.
Give the topic its status as it now stands: either keep it open, with a `next` saying the question
was declined for this sitting and what on the topic is still waiting, or close it if nothing is.
The decline itself is written up later, at the write-up, as [a question they
declined](write-up-topics.md#2-say-whose-each-claim-is) says. When they refuse a question that was
not about any topic, such as a general invitation to say more, give the reply no topics.

For every other reply:

1. Add what they offered about the project to the topic it belongs to. Start a new topic only for
   what would be followed up with different questions.
2. Keep the user's own names for things and what they mean by them, not the pack's terms for
   quality, which are for the agent to think with.
3. Give each new topic:
   - a fixed kebab-case id that holds no one's name;
   - the user's name for it;
   - whether it is open or closed;
   - what showed their interest, if anything: they called it important, came back to it, asked
     for more, or kept building on it;
   - the next question, or why it waits.

   When more than one release is in play, note which one the topic is about.
4. Include an older topic when this answer changes how much it interests them, what it covers, or
   whether it is open.
5. If the user corrects a link the agent drew, update that topic's next question. Record a link
   not yet checked with them as a possible follow-up, not as their view.

## 3. Respond to what was said

- Tell apart what the user said from the agent's reading of it. When a link, cause or consequence
  the agent drew matters, check it with them before treating it as their view. An answer can
  confirm one part and correct or leave open another; carry that into the next question and the
  record.
- If the reply left a numbered question unanswered, respond to what they said, then go back to
  that question when it fits, asking only for what is still missing.
- If the user declines several questions, ask how they would like to go on: some things may be off
  limits, or they may want to pause.
- Use earlier answers and choices as context; don't ask them again. Come back to one when the user
  corrects it or something new changes what it means.

## 4. Do what `next` says

The result of `record` carries `next`:

- **`ask`**: read [choosing the next question](select-next-question.md), which covers
  every question after the first. Choose one with it and ask it, numbered as below.
- **`checkin`**: read [check-ins](check-ins.md) and offer one.
- **`clarify`**: a check-in or the reflection still has no clear answer. Answer or clarify, and
  record the next reply with its `choice`.
- **`reflect`**: read and follow [wrapping up](wrap-quality-interview.md), which gives
  the reflection and closes the sitting.

Number a question about the project like this, because the helper tracks each one until it is
answered:

- Put its label, `Question N`, just before it.
- A new question takes the number `next` gives.
- A question keeps its number until it is answered, so go back to one under its own number: "Back
  to Question 9: …".
- A follow-up about the project, even to clarify, is a new, numbered question.
- Give no number to set-up questions, check-ins, requests for permission, the reflection, or
  catch-up questions on a return.
