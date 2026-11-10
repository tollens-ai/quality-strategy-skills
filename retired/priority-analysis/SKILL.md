---
name: priority-analysis
description: Compare and order an agreed set of options using the decision owner's criteria, stakeholders' views, evidence and constraints. Use for a careful comparison of options with the tradeoffs made explicit; to choose a priority's next actions within a strategy, use priority-deepdive instead.
---

> Retired 9 November 2026. Use `priority-deepdive` for what to do first on one priority, and `prioritise-release-quality` to weigh priorities against each other. No skill in 0.5.0 compares other options against criteria. This skill's text is kept as it was, for reference.

# Priority analysis

Quality is value to someone who matters. The approach to quality strategy in this pack derives from
the Context Driven Testing school: start by describing who matters, describe what matters to them,
then prioritise the work to achieve it. The approach is not dogmatic - coverage, checklists,
standards and established practice can all be part of the strategy, sometimes they are the exact
right thing for some stakeholder or some quality dimension. The key thing is the overall approach -
based on context, and understanding what this project needs to achieve.

This skill compares an agreed set of options on the criteria the decision owner adopted, with the
views, evidence and constraints set out and the tradeoffs explicit, so that they can see which
choice their priorities and the evidence support. To choose a priority's next actions within a
strategy, use `priority-deepdive`; when it opens this skill to rank options, rank them and give the
result back, as [opening another skill](../../references/opening-another-skill.md) says.  It is done
when the decision owner can see which choice the comparison supports, or, if none can be supported
yet, what is missing, and can see the ties and the tradeoffs still unresolved. The result rests on
criteria they adopted, or says it holds only if they adopt the criteria you proposed, and it says
whether it has been adopted. A later reader of the record can tell what was compared, why the result
follows, whether it was adopted and what could change it. The work is finished whether or not they
accept a proposal.

**Who decides.** Only the decision owner, or someone they named to decide for them, adopts the
criteria, the way of comparing, the constraints, weights and tie-breaks, and confirms the result.
Anyone else can propose these or bring evidence, and their agreement counts as evidence. Treat the
person asking as the decision owner only when the decision is theirs or was handed to them;
otherwise ask who owns it. This holds at every step, because a comparison on someone else's terms
answers a question the decision owner did not ask.

## What is being decided

You need the choice and the period or deadline it covers; the agreed options; who owns the decision
and who else may confirm it; the adopted criteria and how conflicts between them are settled; and
the evidence to apply them. Start from what the request and its sources say, and ask, as [each
turn](../../references/each-turn.md) says, only for what is missing or unclear
and could change the result, rather than going through this list as a questionnaire.

The options are the set agreed for this comparison, not every alternative; a clear list in the
request is agreed unless the user calls it tentative. If they cannot be compared as one set,
say why and ask how to handle it before comparing.

A strategy, plan or backlog the user gives is a source. In a quality strategy, the decision owner's
ratings, bars, where each priority stands and its open questions are evidence, or criteria they might
adopt; low-rated work can still include something that would stop the release. The stakeholder views a source
records are background until the decision owner adopts them as a criterion or part of the comparison.
When they say someone's view matters, record what that person said, whether quoted or paraphrased,
and where it came from.

## The criteria

By the end you can explain why the decision owner would prefer one option to another, or how an
unresolved choice holds up the comparison. Before ranking anything, list each criterion: what it
means in plain words, who proposed it and where, who adopted it, and any weight, order, threshold
or tie-break they gave.

**Criteria come from the decision owner,** never from the options, a stakeholder's job title, a
familiar prioritisation method or your own sense of what usually matters. If criteria are missing,
ask what matters to them in this choice. You can suggest criteria, but use one only once they adopt
it, as [whose words are whose](../../references/templates/every-document.md#whose-words-are-whose)
says. When they are not there, or the person asking wants something to show them, compare on
criteria you propose, framed as "if <their name> adopts these criteria".

**How criteria combine is theirs too.** Invent no weights, scoring scale or rule for conflicts. When
every adopted criterion points the same way, record that and you need nothing more. When they
conflict, ask how to weigh them; without a tie-break from them, a tie stays a tie. When a criterion
could be applied in ways that change the order, ask how they mean it, with a case where the ways
of applying it differ: "Offline sync has one High and the import fix has three Mediums. How would
you weigh those?" If they cannot say, show the order under each way and record their reply as given.

**Constraints are not criteria:** what is possible is kept apart from what is preferred. A technical
dependency, or a legal, contractual or regulatory constraint, limits the possible orders when
evidence from a named source shows it; record its source and whether it cannot be waived, does not
apply here, or can be waived by someone named. An outside constraint whose existence or effect is uncertain is marked
unconfirmed, even if adopted, and forces no order. Limits on the team's time, people or budget are
constraints the decision owner sets and can change; record their source apart.

## The evidence and the views

For each option, record the evidence on each criterion, keeping four things apart: a fact observed
in a named source; a judgment a stakeholder stated; your own reading or forecast from named facts,
marked as yours; and an unknown that still needs evidence or a decision. When evidence is missing,
say so; the decision owner may prefer the option they understand better, and when evidence that
could change the order is missing, ask for it. Ask
before reading beyond what the user allowed, as [before a look or a
check](../../references/before-a-look-or-a-check.md) says; meanwhile compare what you can and say
which conclusions wait on that reading. Stop gathering when every option is compared on every
criterion or the gaps are recorded, because research that cannot change the result only delays it.

Order the options only on the adopted criteria and the decision owner's rule for conflicts; in a
draft, order them on the proposed criteria and mark every result as depending on their adoption.
Show views the decision owner has not adopted separately, as background: say how each option serves
or works against them, without moving any option up or down for them or averaging them away.

A view you cannot get, or missing evidence, holds up the result only when the decision owner made it
a required input; then it is an unknown and any order depends on it. If they explicitly decide to go
ahead without it, record that they accepted the gap and take it out of what is required, and keep the
accepted gap visible in the result, so that it does not suggest the evidence existed.

Then point out where the views and criteria agree; where they favour different options; the
dependencies and constraints the evidence shows, kept apart from preferences; unknowns that could
change the result; and ties. Use numbers only on a scale the user gave or confirmed and the evidence
supports, because a comparison in words is better than invented numbers that look precise.

## The result

Open [the result and the record](references/the-result.md) to work out what the comparison supports,
write the record, check it and give it to the decision owner.
