# Plan the measurement: what to bring to the discussion

Opened from [the skill](../SKILL.md) before the discussion. These are ideas that have made
measurement plans better; use them where they fit.

- **Finding out can be cheap.** Look for the cheapest, quickest way to see the gap. Asking the
  person who built it finds out where things stand just as a test does, and reading something
  through or checking it by hand may be enough; a missing automated tool doesn't by itself call
  for building one.
- **Start from how work is checked now,** as the project context records it, because that says
  which ways of observing already exist. If it doesn't say, ask once and record the answer there.
  "I check the result" doesn't show that a person used the product or that this quality was tested.
- **What kind of thing the row is about shapes the method:** something people meet often, a rare
  event, or something that should always hold. For a rare loss of progress, for example, a session
  where nothing went wrong shows little; a check that progress survives the interruptions that
  matter, and records full enough to show a loss afterwards, show more. If it is unclear what kind
  of thing it is, mark the method as a draft and keep the question in the [Open
  section](../../../references/open-section.md).
- **A check is a question asked because of a risk to someone,** so aim checks where failure is
  likely as well as where a bar is. Judge where it is likely as [choose the
  work](../../plan-quality-work/references/choose-the-work.md) says for a fix's effects, and add
  what has broken before.
- **Say what a pass and a fail would each show,** because a check too weak to reassure can still
  reveal a real failure. A pass supports only the conditions it tried; a fail shows a miss only if
  it was judged against the bar itself and not a stand-in for it.
- **An oracle is a source of judgement,** not the requirement said again, and the checker has to be
  able to reach it. Suggest one for each row. It might be:
  - a reference, or a stated claim;
  - a concrete expected example, or a known-good snapshot;
  - a simple independent reference;
  - how a result should change when the input changes;
  - a property that must always hold, as in property-based and metamorphic testing;
  - consistency, as in Bach and Bolton's FEW HICCUPPS heuristics;
  - a person's judgement, or what happens in real use.

  Passing tests that miss what the stakeholder cares about are checking the wrong thing. Where a
  bar is set, an oracle has exactly the outcomes the bar names. Any other way to pass, such as the
  product saying it cannot tell or a result accepted however late it comes, is a second bar the
  user did not set. Where no bar is set, the oracle is what needs no bar, as "How good it must be"
  in [when the user doesn't
  know](making-the-plan-and-saving.md#when-the-user-doesnt-know) says, and the finding is against
  no bar.
- **An instrument doesn't supply an oracle.** Check that the oracle answers this bar and not a proxy
  with a similar name, that the instrument can see the failure that matters, and that the oracle can
  tell acceptable from unacceptable. Where no bar is set, check instead that the oracle shows what
  actually happens, because that is what the user needs in order to set one.
- **A person in the stakeholder's situation is the oracle when the bar is about how using it
  feels.** Who that is and how they are reached is the user's to work out, as the how of that
  question. An agent playing a person must be a separate agent from the one that built the thing,
  and it is not that person.
- **Observe under the conditions that matter:** the stakeholder's device, browser or app,
  connection, workload, and when and where they use it, because these can change both the bar and
  what an observation shows. Where only a stand-in for those conditions can be observed, say what
  it can't show.
- **A proxy points to the quality without showing it.** Say what it can't show and add an
  observation for the blind spots that matter; proxies that rise and fall together don't make the
  conclusion stronger. Where someone, or an agent, will be working to raise its number, name an
  observation of the outcome that would show the two drifting apart, because a blind spot matters
  more when the work rewards exploiting it. Say who or what will measure the proxy, and when.
- **Keep a tool apart from what it produces, and how good something is apart from how good people
  believe it is** ([quality basics](../../../references/quality-model.md#quality-basics)). Include a
  tool's output if it is within what was asked; otherwise name it as a separate question.
- **A rejected method is information, not a finding.** Record the user's reason and think again
  about what could answer the question; a method they reject as inadequate is not evidence that the
  quality falls short. If it is unclear whether a method is good enough and looking into it would
  help, follow [tooling-adequacy](../../../skills/tooling-adequacy/SKILL.md) for that one question, as [when one
  skill opens another](../../../references/opening-another-skill.md) says.
