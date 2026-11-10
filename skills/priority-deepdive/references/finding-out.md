# Finding out

For the steps "How do/will we know how good it is?" and "Where it stands now" in
[priority-deepdive](../SKILL.md): what a skilled tester knows about those two questions.

Another agent, given only the section and the priority's row, may think of places to look that you
would not, because two agents on one priority often find different things. Asking one what it would
look at is a cheap way to widen your own list.

## How we will know

There are two kinds of way of knowing, and neither is better than the other:

- **Observe the product.** Name the instrument, which has to be able to see the failure that
  matters, and the oracle that what it sees is judged against. [How would we
  know](../../../references/quality-model.md#four-questions) describes both, and the kinds of
  oracle. A person can be either.
- **Build the quality into how the work is done, and check lightly that the agreed way of working
  was followed.** This is the natural way for a priority about how the work is done, and for any
  priority where checking the product each time would cost more than it finds. Say what the light
  check cannot show: the way of working can be followed and the product still be wrong, so name
  what would catch that, if anything, and whether catching it is worth the cost here.

The strategy owner's own judgment is a proxy too, and can be the first one used. A check adjusted
until it agrees with their marks on a few examples will reproduce those marks; whether it tells you
anything about other cases is unknown until it is tried on some. Their judgment also stands in for
the people the priority is about, with its own bias, so say whose judgment the check follows and
whom it does not speak for.

- **A proxy points to the quality without showing it.** Say what it cannot show, including where
  only a stand-in for the real conditions can be observed. Observations that share a blind spot add
  nothing to each other, so where that blind spot matters, look for one that does not share it.
  Where someone, or an agent, will work to raise the proxy, watch the outcome itself too, because
  the proxy can rise while the outcome does not, and agents do this faster than people.
- **For a rare failure,** such as "never lost", a clean run shows little, because a check exercises
  some ways of failing and not others. What that is worth is the strategy owner's call.
- **Finding out can be cheap.** Asking the person who built it, reading something through or
  checking by hand may be enough; a missing tool does not by itself call for building one.

## Where it stands, and how we know

- **What a finding can claim depends on the evidence for each claim:** what was observed, by whom,
  under what conditions and when, not the kind of record it is in. A test report can record a named
  person's real use; a run can be an agent's scratch copy under conditions nobody uses. Reading the
  code can show that something has not been built; it cannot show how the product behaves for people
  under real conditions. What shows that is an observation of people using it, whoever recorded it.
- **How sure you can be depends on the exact claim and its evidence.** Who checked it is part of
  the evidence: saying that only an agent checked a claim shows the claim's limit; it does not make
  the claim more certain. Polished code and a
  confident author are not evidence. "If I'm wrong, would I be surprised?" is a fair test.
- **"The tests pass" is not "it was tested".** The project's own tests show what they check and no
  more. Something odd is worth chasing, and once a fault is found, so is what is near it, because
  faults cluster.
- **Who investigates.** Another perspective than the builder's helps, because whoever built the
  thing shares the frame that made the fault. Some testing needs a person, and it helps to say which
  part. A separate agent can investigate; what it reports is its own observation, to check against
  the records before the strategy owner sees it. The gap between what the builder says and what
  testing shows is often where the most important faults are.
- **When the uncertainty matters to a decision,** say what could overturn the conclusion, and which
  observation, often a cheap one, would most settle it.
- **Why something is unknown decides the next action:** nobody has looked; what was seen could not
  settle it; nobody knows a way to judge it; nobody has said what good looks like; or it waits on
  something named, such as someone's answer or the release in people's hands.
- **A bar they stated is judged in their words:** quoted, with your reading of a word in it said to
  be yours, because a bar put in other words is no longer the one they set.
- **A conclusion claims no more than its observations support,** and observations that point the
  other way stay on the record.
- **"We haven't measured" is a complete answer.** A report, whether from someone doing the work or
  just someone's word, is a measurement of some accuracy and bias, judged like any other by what was
  seen, by whom and how. A list of findings presented as the state of things looks more thoroughly
  measured than it is, so say how each was found.
