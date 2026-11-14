# The quality model

These are the ideas every step of a strategy uses to think about quality. They are for you to think
with; talk to the person in their own words.

## What is judged, and for whom

- **A stakeholder** is any person, agent, organisation or group whose view of value matters here.
  "Customer" and "maintainer" describe someone; they are not fixed types.
- **Groups** are the user's to choose. They can nest and overlap, and they organise views without
  ranking them. Being in a group does not mean agreeing with it, and someone in several groups is
  still one stakeholder with no extra weight.
- **A relationship** is how a stakeholder relates to the thing: using it, depending on what it
  produces, paying for it, running it, regulating it or being affected by it, in the user's words.
  For a tool, using it directly, depending on its output and being affected in other ways are
  different: the person who runs a release tool, a regulator who cares how it handles data and the
  people who install what it produces can expect different things.
- **The thing being judged** can be a product, a tool, a workflow, a document, a generated output,
  or anything else whose quality is in question; one repository can hold several. A tool's quality
  and the quality of what it produces are separate even when their names are alike: a code
  generator being easy to use says nothing about whether the app it generates is. A tool is judged
  for the milestone or the ongoing use it supports.
- **A release** is a named delivery or milestone with a purpose, not necessarily a version number.
- **An area** is a part of the thing, such as a component or a journey through it. Keep the user's
  names and the way they divided things up, and suggest a rename or a merge rather than quietly
  replacing it, because the strategy is theirs. Nothing has to be divided up to be assessed.
- **A quality dimension** is a way the thing can be better or worse for someone: reliability, ease
  of use, recovering from failure, keeping data intact. A feature's name is usually an area, not a
  quality dimension. [Quality dimensions](quality-dimensions.md) helps find the ones that matter
  here.

Keep who matters apart from what is judged: one stakeholder can relate to many things, and one
thing can matter to many stakeholders.

Every claim about quality is about something: a part of the thing, a quality dimension, someone's
view of it, and the release or conditions where they matter. Say which, because two claims about
reliability can be about different things. A priority of the release can bring several stakeholders'
views of the same thing together, with their different bars side by side, because the strategy owner
is the one who decides between those bars. A different stakeholder or a different bar is not on its
own a reason to make a separate priority.

Split a quality question only where one answer would hide a difference that matters: in how good
each part of it must be, how much it matters, or what to decide, as when a long-running tool needs
immediate acknowledgement but can be slow to finish. Different fixes, ways of checking or conditions
are not reasons on their own; they are aspects of one question, each with its evidence. Split a
broad quality dimension such as performance, or split people from agents, when their answers
differ. List the questions that matter, not every combination of area and dimension.

Two priorities can be joined into one when they are almost the same thing, or overlap so much that
working on them separately would repeat the work. Whether to join them is the strategy owner's
decision. Sharing a check, data or a fix is not enough to join them, because the overlap has to be
in what each priority is about, not in how it would be found out. The joined priority keeps the
views, words and bars of both, and where each came from. Where joining them would change a rating
the owner gave, ask the owner what the joined priority's rating should be, rather than choosing one
or averaging the two, because the rating is theirs.

A group shares a bar only where there is reason to think its members agree. Keep the subgroups and
individuals who differ in a way that changes a choice. "They all get the same service, so they all
need the same thing" is the cue to ask who among them might want something different.

## Ratings and bars

**A bar** is what someone expects, in concrete terms. Four levels describe a stakeholder's bars:

- **Delight** goes beyond what they expect.
- **Good Enough** is what they need for the release, or their ongoing use, to succeed.
- **Ugh** is something they actively dislike or distrust, though not enough to reject it.
- **A Dealbreaker** is unacceptable to them, whether or not they can refuse it or stop it.

Record each bar in the words of whoever said it, at whatever step they said it, with whose it is
and what it was about, such as their own use, other people's, or the release as a whole. Keep them side by side as they were said, rather than sorting
them into one bar for the release and the rest, because they are what the owner decides and plans
from, and sorting them makes part of that decision for them. A row of the priorities holds what
has been said about how good it must be, each with whose; where nobody has said anything yet, it
says so, with the question. A limit someone gives, such as a response time beyond which more speed
is not needed, goes with what they said, because polishing past what the release needs is work
taken from elsewhere.

**How much a priority matters** is for the strategy owner to say. Each stakeholder's view records
what comes first for that stakeholder and why, as far as the user can tell; nobody gives every item
a rating on a scale for one stakeholder. The owner then puts the release's priorities in order. The
agent proposes ratings from that order and the owner corrects them, with a short reason for each. A
priority the owner cannot place yet stays unrated, with the question that stops them placing it.
The release's order is never written back into a stakeholder's account.

Rough meanings help people compare and question ratings; they do not decide them:

- **High:** central to this release's success, where attention and effort go.
- **Medium:** it matters and serious problems get fixed, but this release manages it rather than
  chasing excellence: "security is Medium: we care, but we're not doing a penetration test for the
  alpha."
- **Low:** on the radar and still worth doing, with less attention than the rest.
- **None:** the owner has decided it does not matter for this release. Missing information is not
  None.

The ratings rank the priorities against each other. What the release needs in absolute terms, such
as how good each priority must be, is recorded separately beside them. Low work is still worth
doing, and a Low priority can include something that stops the release even after all the High and
Medium work is done. The ranking helps people judge whether the release is ready; it does not decide
that.

How good it must be, how far short it falls, how strong the evidence is and how much to invest are
separate questions from the rating. No stakeholder's level, no obligation and no shortage of time,
people or money sets a rating or caps it, because a rating worked out from rules is the owner's
judgment made by someone else.

Write the owner's reason where they gave one and invent none. Say any uncertainty about a rating in
its reason, and a rating unanswered or disputed stays an open question.
How interested someone sounded in an interview is the interviewer's read: it feeds the rating
conversation and is not the rating.

When a rating seems at odds with a stakeholder's level or with what they said comes first, say what
you notice and ask what lies behind it. If someone corrects the stakeholder's account, record the
correction and who made it; otherwise keep both the stakeholder's words and the owner's view.

**What the release will not do** is its non-goals: the priorities rated None, and the bars beyond
what this release needs, each with the owner's reason where they gave one. They are mostly about
quality. A feature left for later belongs in the release's scope and can be named as a non-goal
as well, but a list of nothing but features says nothing about how good is good enough.

## Obligations that come with the facts

Some facts about the thing bring obligations whatever its rating. For example:

| If it | It must |
|---|---|
| Handles secrets or credentials | Keep them from leaking |
| Holds personal information | Keep it from being disclosed |
| Holds data people entrust to it and would want back | Not lose that data beyond recovery |
| Ships to or runs on other people's machines | Allow for failures there that the team cannot control |
| Has an established licensing, data-protection or other legal obligation | Meet that obligation |

Find out which facts hold from what you already know and the project's files, and bring the user
what you found rather than a factual question they may not easily answer; ask where it stays
unclear. When a fact holds, say what obligation you think follows and why, as what the thing must
actually do, because "keep them from leaking" names a concern and not something anyone can check.

The user still decides how much it matters. Calling it a non-goal or rating it Low does not remove
the obligation or show that it is met. If they dispute that a fact holds or an obligation applies,
record their reason. A legal obligation that is disputed, one that nobody yet knows applies, and a
check of one that is left for later all stay open questions, and you offer the check.

Think too about security, keeping user data intact, and runaway spending where the thing can spend
money, and say what it must do about each that applies.

## Four questions

Each priority is worked through four questions, in this order, because each rests on the one
before: you cannot say how you would know until you know what good is, or what to do until you know
where things stand. Keep them apart, and call them by their names.

**What does good look like?** How good it must be, in terms someone could observe, and where that
comes from: a stakeholder's bar, the release's purpose or an obligation. Say how often or how much
where that changes the meaning. Where it is unknown or not yet agreed, it is an open question with
why it is unsettled, and a proposal stays the agent's until the owner has answered it.

**How would we know?** Measuring is one way of knowing among many: running something and reading a
result against the bar, checking by hand, reading the code or the records, asking someone, watching
someone use it, a trial with the release in people's hands, a report that reaches the owner
regularly, or the owner's own judgment on seeing it. Qualitative knowledge counts.

- **An instrument** is how something is observed. **An oracle** is what the observation is judged
  against: a reference, a known-good example, a property that must always hold, consistency with
  something else, a person's judgment or real use, or a stated bar such as the response time the
  release needs under a named load. A person can be either. An oracle is not the requirement said
  again: "it should be fast" judges nothing.
- **A proxy** points to the quality without showing it, and is reported with that limit: test
  coverage shows which code ran, not whether the tests check what users need. Two observations that
  share a blind spot add nothing to each other.
- Say whether each way is available now, needs building or acquiring, or is not yet established
  because nobody knows a suitable one, and why.
- Evidence judged against a sound oracle answers the question even if an earlier list of ways of
  knowing did not include it, because the list was a plan, not the limit of what counts.

**How good is it now?** What is known and how: what was observed, by whom, when and how, under what
conditions or version where they matter, how it was judged, and what is missing. Above bar, At bar,
Below bar or Unknown can sum it up.

- It stays Unknown while the bar or the oracle is unknown, though observations can still help.
- Show how sure the answer is by saying how it is known. You can also sum that up in a confidence
  word such as "known", "low" or "very low", about where things stand or about whether the bar is
  the right one, but the word goes beside the account and never replaces it, because a reader can
  judge a record of how something was found out and not a word on its own. "We don't have this",
  "nobody has looked" and "it cannot be checked yet because ..." are findings, often the most
  important ones.
- Having or planning a way of knowing is not having used it.
- Where a priority has several aspects that must each meet the bar, keep the evidence for each, and
  do not call the whole a success while any aspect is unknown or below its bar. A known failure
  stays visible in the summary: either Unknown with the failure named, or Below bar worded so that
  it does not suggest every aspect was checked. Never average results from different conditions, or
  resting on evidence of different strength (how direct, independent or reliable it is, not only how
  much), into a reassuring overall answer.

**What do we do about it?** Each open question ends in a next action: the very next thing someone
could do to move it forward. Where nobody has a way of finding out yet, the question says so
plainly, which is a true record and not a fault. An idea from the user or from an agent is recorded with who suggested
it, and an idea is not a decision.

Not knowing is a true answer to any of the four. Each has an answer at two levels, what the answer
is and how well it is known, so "we don't know yet what good looks like here" answers the first,
and an accurate picture of what is unknown is part of what the user gets.

A gap is how far what the evidence shows falls short of the bar. A risk is what that gap, or not
knowing, puts in danger for someone; low confidence in where we stand is itself a risk, in
proportion to what the unknown puts at stake. Explain risk in words with reasons. Heat scores and
tables worked out from the records are optional views that add no facts.

## Older records

Strategies saved by earlier versions of this pack are read for what they mean, as they stand,
without converting them to the current layout. They may have records written into the strategy
itself, seven numbered parts, notes files beside the strategy (for priorities, measurement,
assessment or plans), sections of accepted risks, or older names for the same ideas. Where older
notes and a newer section differ, the later dated account stands. When a step writes to such a
strategy, the current template sets the structure, and whatever an older part holds that is still
true goes where the template now puts it. A question waiting in the progress note that the current
steps no longer ask is handled as [coming back](stopping-and-coming-back.md) says.
