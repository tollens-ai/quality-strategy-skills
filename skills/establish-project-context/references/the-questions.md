# The questions

What a skilled person asks in each part of the project context, and why. Follow the questions that
help rather than working through them as a questionnaire, and skip what the user has already
answered.

## The project

1. **What it is for.** If the repository or the pre-read says what the project does, say that first,
   as your interpretation, because a repository says what a project does, not what it is for. Then
   ask what the project is for and who it helps, including agents acting for people. If the purpose
   stays abstract, ask who would lose something if the project did not exist, and what.
2. **The ambition, now and later.** If it is vague, ask what it would let someone do, in the time
   that matters, that they cannot do today.
3. **What the next release must achieve,** asked separately from the ambition: a small pilot may
   help the team learn how to build a much larger service. The ambition can be a reason to keep an
   option open now, but it does not make every bar for later releases a requirement for this one. If
   nothing is built yet, ask what the first build should make possible or help the team learn.

   A good answer is one the release could be judged against: it says what would make the release a
   success or a failure. If their first answer already does that, record it as they gave it, without
   splitting it into parts nobody asked about. If it only lists what the release contains, or stays
   vague, ask once what must still happen if other work slips, because the answer is the least the
   release must do, and the priorities later start from it. Record what they say, or "not sure", as
   the answer to that question.
4. **Its edges.** Which repositories, services and work outside the code belong to it; which
   products, tools, services, workflows, documents or outputs are in scope; and how the user divides
   them into areas, in their names and meanings. For a tool, find out what it makes possible or
   produces, and who depends on that. When it is unclear what is being judged, or for whom, or how a
   tool differs from what it produces, use [what is judged, and for
   whom](../../../references/quality-model.md#what-is-judged-and-for-whom).
5. **Its limits.** The plan has to fit inside them, so ask once, as one open question, what limits
   this release: time, energy, money, people, a date or a promise to someone, or nothing. Record the
   answer in their words. A promise to someone is the limit people are least likely to think of as a
   limit, and "nothing" and "not sure" are answers.

   Then follow up, one at a time, anything in the answer that could change a plan, turning a vague
   limit into a fact that could: "one founder" says little until you know how much of their week
   this project gets, and "we ship when it's ready" may still be bounded by how long the money lasts
   or by a promise to a customer. Rough figures are enough.

   Where agents do much of the work, separate how much they can produce from the human attention
   there is to direct and review it, and where it matters, ask what limits the agents' work, such as
   a usage budget, how many can run at once, or access.
6. **If the ambition looks bigger than the resources,** say so as a concern. Start from how the
   project works now: a later strategy may propose changing the team, the organisation or the way
   work is done, and such proposals are kept apart from how things work today.

## How work gets done

1. If the project's documents describe the process, say that as your interpretation and ask how it
   goes in practice, including how work is checked. Otherwise ask how work gets done and how it is
   checked. Either way it is one question.
2. "Agents do it, I check the result" and "I don't know how they did it" are complete answers. Ask
   no more about how checking is done, because pressing on a process they may not have feels like an
   interrogation. If the answer says nothing about checking, ask about it once; "not sure" goes on
   record as unknown. Keep any detail they offer, such as work that falls between people or agents,
   for planning later.
3. If the answer has not said where this works well or badly, ask that in its own turn. "Not sure"
   is complete.
4. If the answer raises something that matters, such as nobody having used the product yet, say
   briefly why it matters. Being told that work is checked, without how, does not show that anyone
   has used the product.

## Releases

1. Start from what they said the next release must achieve, and ask what comes after it if they
   know. One release is enough, and later ones can stay rough.
2. Ask what each release lets the team learn or achieve, and why it comes before the next, because a
   roadmap of features does not explain why releases need different quality.
3. For the next release, ask one at a time how it gets from built to the people it is for, who uses
   it first, if anyone, and who decides it is ready. If nobody touches it between the developer and
   the people it is for, that is a risk; "not decided" is a bigger one, and a useful open question.

## Who matters

1. **Who matters for the release.** These are its stakeholders: people, agents, organisations or
   groups whose view matters. To catch someone missed, think beyond those who use or buy it. These
   are prompts, not categories to fill or a list to read out:
   - people or agents who run it, connect to it, maintain it, or read its outputs and documentation;
   - funders, regulators and affected communities;
   - customers' customers, and people who sell or explain it;
   - early adopters others listen to.

   Ask who, if anyone, this release is deliberately not for.
2. **Who does the work:** who builds, fixes and supports it, people and agents, what each brings and
   how the work is shared, including agents doing real work and responsibilities nobody has settled;
   one founder can hold several. Ask only for what their account of how work gets done left out,
   because the point is to find work nobody has thought about, not roles to fill or people to add.
   Where agents do real work on the codebase and the pre-read says how friendly the codebase is to
   agents, tell them in a line what it says, as your interpretation. It can help them decide how to
   group the agents, but it does not decide that grouping, whose view each group's will be, or the
   team's bars.
3. Where it is relevant, ask who decides what the product should be.
4. **The team is a stakeholder too.** Until there is feedback from outside, it is often the main
   source of what is known about how the product behaves, and it may need the release to show enough
   to tell whether the approach works: "we can learn whether this helps" is a different expectation
   from "the people using it like it".
5. **How each stakeholder relates to each thing.** For each stakeholder and each thing that matters,
   make the relationship explicit, in the user's words, including the user's own relationships:
   whether the stakeholder uses a tool, relies on what it produces, governs a workflow, pays for a
   service, or is affected without using it. Someone with several relationships is still one
   stakeholder: keep their different expectations apart without inventing extra people or counting
   them twice.
6. **Their situations.** For each named person, ask the missing facts about their situation that
   matter: the device, browser or app, their connection, and when and where they use it; for an
   agent, its setup, such as where it runs and what it can reach. Ask rather than assume a typical
   device or situation, here or in that stakeholder's deep dive, whichever needs the facts first.
7. **The order.** Put the whole list in front of them when you ask whose view to take first and in
   what order the rest follow, so that they decide on a list they can see and correct, because the
   steps after this one take each stakeholder in turn.
8. **Whose view it will be.** For each stakeholder, whether what the user tells you will be their
   own view (because they are that stakeholder, or one of them, as with their own team) or their
   understanding of someone else's, where it comes up or is easy to ask, because a deep dive that
   already knows it need not open by asking. Where nobody has said, record that; the deep dive asks.
9. Leave their detailed expectations for their deep dives. An expectation about quality they
   mention now is written down as [each turn](../../../references/each-turn.md) says, so that the
   deep dive finds it.
