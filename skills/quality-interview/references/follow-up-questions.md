# Quality interview: follow-up questions

Questions that follow up the user's answers, in the first round and when going deeper after it,
chosen as [choosing the next question](select-next-question.md) describes. The opening questions,
including the good and bad cases, have [their own file](opening-questions.md). Each example is one
question; reword it to fit what the user has said.

## Follow-up questions

### Repeat their own words

**Goal.** When the meaning of something the user said is not yet clear, echo a small piece of their
own wording and let them supply the meaning.

- "Brittle around the handoffs: in what way?"
- "What kind of 'expensive' is that?"
- "What else, if anything, is there to that handoff?"

### Ask for a real example

**Goal.** Understand the experience behind a general description. When the user calls something
"confusing" or "unreliable", ask what happened on one particular occasion, so you learn what those
words mean to them.

- "What happened the last time someone new tried it?"
- "What's an example of that?"
- "What happened next?"

### Ask which part they mean

**Goal.** Understand which part of an experience concerns the user. When "slow", "bad" or "hard"
could mean several things, let them explain where or when the difficulty comes up and what kind of
difficulty it is.

- "Which part of a change starts costing you first?"
- "Where does the delay show up?"
- "What happens just before it gets stuck?"
- "What makes that difficult in this situation?"

### Compare two cases

**Goal.** Understand what makes two experiences different for the user. Once they have described
both, invite them to compare them in their own terms.

- "What can stay rough internally that would break the public version?"
- "What is different between a change that feels safe and one that doesn't?"
- "What does 'good' mean to the maintainer, and to the person using it?"

### Tell apart two nearby concerns

**Goal.** When it would change your next question, find out whether two nearby things the user said
belong together or need separate follow-up. Let them make the connection.

- "If search stayed reliable but the grouping felt wrong, what would be lost?"
- "If the release delay went away, what would happen to the support load?"
- "Whose problem is the stale status?"

### Ask about a possible connection

**Goal.** Find out whether two things the user said are connected, when that would help you choose
what to explore next. Ask how they relate, if at all, so they can describe the link or say there is
none. "None" is useful too: it tells you to follow them separately.

- "How, if at all, does the fear of changing the schema relate to the stale status people see?"
- "You mentioned slow updates and rising support calls. What, if anything, links them?"
- "What part, if any, does the unclear ownership play in the handoff feeling brittle?"

### Ask why it matters

**Goal.** Understand why a particular fact matters to the user. When its importance is unclear, let
them explain its effect and what they care about in that situation.

- "What does that hand reconciliation put at risk for you?"
- "How does that affect you?"
- "Who does this matter to if it keeps happening?"

### Ask what leads to what

**Goal.** Learn the user's own picture of cause and effect: what they think produces a problem or a
result, and what they expect would change if one part stopped. Let them tell you the chain; don't
offer your own explanation as if it were theirs.

- "What do you think is behind that?"
- "If the handoff were fixed and nothing else changed, what would be different?"
- "When that goes wrong, what usually sets it off?"
- "What have you already tried?"

### Say back what you understood

**Goal.** When you are relying on a reading of yours that the user hasn't heard, especially near the
end of a topic, say it as your reading in one plain sentence, with how you think it connects to what
else they said. Then ask what they would change. Record what they confirm or correct; anything they
don't take up stays your reading.

- "My reading is that the slow updates matter mainly because support calls rise. What would you
  change in that?"
- "It sounds to me as if those two things go together for you. How would you put it?"
- "As I understand it, the schema fear came first and the stale status after it. What would you
  change in that?"

## Questions about quality

After the first round, use these briefly, and only within a topic the user has opened, to fill a
gap in what you understand about it.

### What good would look like

**Goal.** Understand what a good experience would be for the concern under discussion. Help the
user make it concrete while leaving them to say what would be good enough. Use this when what
"good" means for that concern is still unknown.

- "For the manifest handoff you described, what would good look like to the dispatcher?"
- "What does success look like for you here?"
- "Who matters here?"

### How they would know

**Goal.** Understand how the user would recognise the good experience they described. Use this when
that experience is clear but the signs of it are still missing. A description in their own words is
enough in an interview.

- "What would let you recognise that the handoff is working well?"
- "How would you know if it were good?"
- "What would you notice if this were working well?"

### How it is now

**Goal.** Find out how things are now, apart from what the user hopes or feels sure of. Use it when
they have said what good means but the current experience is still unclear. "We've never looked" is
a fine answer.

- "How is that handoff working today?"
- "What's actually happening right now?"
- "What has surprised you about it?"

### What would make them say "ugh"

**Goal.** Understand what would make the person actively dislike or distrust it, though they would
put up with it. Use this optional question when that kind of dislike is getting lost between good
enough and dealbreaker, including when something they called a dealbreaker might only annoy them.
Let their description show how bad it would be.

- "What would make you unhappy with it, even if you kept using it?"
- "What would you do if that happened?"

For someone who can't choose to leave, such as staff who must use it, ask what it would be like for
them: staying doesn't show they accept it.

### What would be a dealbreaker

**Goal.** Give the user room to name an outcome that would outweigh everything else going well. Use
this when they hint at a hard limit, a serious trade-off, or someone who could pay an unacceptable
price, or when a [second look at dealbreakers](select-next-question.md#3-coming-back-to-a-question)
would help. "None" is a complete answer.

An ugh is something they dislike but put up with; a dealbreaker is unacceptable, whether or not the
person can refuse it.

- "What would make this a failure even if everything else worked?"
- "How could this look good on paper and still fail the people relying on it?"
- "What, if anything, must this project not get wrong?"

### What to do about it

No questions here: what to do is for the user and their agents to decide, and "we'll work it out
later" is a fair answer this late on. Record any idea they offer, with who offered it.
