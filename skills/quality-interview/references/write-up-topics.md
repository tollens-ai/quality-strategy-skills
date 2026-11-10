# Writing up topics

**Goal.** Turn the saved answers into a faithful, usable record of the user's concerns.

**Done when.** Every pending topic has a record that matches the conversation, including
corrections and changes in how the user describes it, with separate concerns kept apart and
unknowns left open. A later reader can see what the user meant and what is still open.

## 1. Find the pending topics

At the write-up, `next` lists the pending topics. Before a pause it does not, so find them in
`status`: they are the topics it shows with `record` as `none` or `behind`.

## 2. Say whose each claim is

**Goal.** Let a later reader tell what the user said or agreed from the agent's readings and
guesses.

**Done when.** Every claim, reading and framing in a record says whose it is. Each reading has the
turns behind it and how strongly they show it, so that later strategy work can check any claim the
user has not agreed to without rereading the transcript.

Read this before writing the first record. The pack's general guidance on showing whose words are
whose is in [every document](../../../references/templates/every-document.md#whose-words-are-whose).
Say whose each claim is in plain words in the claim itself, and also in the helper's `provenance`
field beside it. In the interview, the kinds of claim are:

- **What the user said**, when it restates their account.
- **What the user agreed**, only for the points they agreed to when the agent read them back. A
  bare "yeah" to the closing reflection agrees to nothing new, so leave every claim as it was; when
  a reply corrects, adds to or names a point, update only what it names. If a reply confirmed only
  part of a reading, keep the rest as a question.
- **The agent's own reading or framing**: a reading across several turns, or a link, cause or
  trade-off the agent raised that they didn't take up, with its turns. With nothing behind it, say
  it is the agent's guess. Add a question if it is worth asking. If they agreed, it is agreed,
  citing their reply.
- **How good or bad something would be.** Quote their words and any hedge, such as "those are the
  real dealbreakers I think" or "he'd be pretty annoyed". Don't sort it into Delight, Good Enough,
  Ugh or Dealbreaker unless they did.
- **Someone else's view.** Name that person in the claim and mark it as theirs (`proxy: true`). Say
  which kind: what that person told the user, what the user saw them do, or the user speaking for
  them. The user's own opinion about that person, such as "Priya is probably more tolerant of mental
  load than most people", is the user's view.
- **An idea or plan they offered**, in their words. Add none of the agent's own.
- **The project's files**: say whether it comes from the files or from what the agent ran or
  inspected itself, and in `basis` what was inspected and what that can't show.
- **What they said they do not know.** "I haven't looked", "we've only tried it ourselves", or
  they can't yet tell good from bad: a note in their words saying what is missing, rather than an
  invented answer. Say whose knowledge the gap covers (only them, their team, or only their own
  testing), because an interview hears one person's account and cannot say what nobody knows. A
  question they declined, or one never put to them, is not something they do not know.
- **A question they declined.** Quote their words, with any limit they gave such as "not tonight",
  and the turn, so the decline is on record as theirs. Don't put it in `questions`, because those
  are picked up again, or make it the topic's `on_hold` reason, which is for the whole topic.

## 3. Write each record

For each pending topic, read the turns where it came up (`status` lists them) and save its record
with `topic` (`--help` gives the fields). Put the person's exact words in double quotes, here and
in the summary, because the helper checks only those against the transcript. Quote only what was
said; paraphrase a project document and cite its path.

- **`label`**: the user's own name for the topic. Keep it unless they renamed the topic or
  changed how they see it; a phrase quoted from a later answer is not a new name.
- **`about`**: one sentence, in the user's words, saying what the topic is about now. Keep to what
  they said or confirmed, hedges included, and update it when their meaning changed. A cause or link
  the agent inferred that they haven't heard goes in `questions` or a note saying it is the agent's.
  Say whether it is what they said, the agent's reading or agreed, as section 2 describes. If the
  words read back to them differ from `about`, record the agreement as an agreed note in those
  words.
- **`status`**: `closed` when it needs no more questions this sitting; otherwise `open`. An open
  topic is left for later with what they said about it, starting with what they said they do not
  know. It may have `questions`, an `on_hold` reason, or neither. `questions` holds a question worth
  a later step's time; when there is none, leave it empty, because each question kept here goes
  into the summary as one still open.
- **`interviewer_read`**: the agent's estimate, in its own words, of how much the topic interests
  them, from what showed it: they called it important, came back to it, asked for more, or kept
  building on it. Cite those turns and say how often and how strongly; with nothing behind it, it
  is the agent's guess. It is the agent's reading, not their High, Medium, Low or None rating, and
  never becomes one.
- **`notes`**: anything else worth carrying forward, each saying whose it is.
- **`merged_into`**: the id of the topic this one is written up under, which is the one the user
  raised first. Say in a note who joined them, as for every claim: the user, citing the turn where
  they did, or the agent, when its own recording had split one worry from a reason, example or
  qualifier given for it. The agent joins only what its own recording split, never concerns the
  user kept apart, and doesn't ask the user about it, because how the agent keeps its records is
  not something on their mind.

Put each correction or addition from any reply into the topic it affects. That includes a change
in what the release is for: revise whatever in the topic that change affects. The topic record
holds the current account, taking in the corrections and additions in the reply to
the reflection; the transcript keeps the earlier turns.

## 4. Before finishing

Read the records again, and check them both ways: split a record that mixes concerns that would
be followed up with different questions, unless the user joined them, and join records that would
be followed up with the same questions, unless the user kept them apart. Drop any question to pick
up that has been answered.
