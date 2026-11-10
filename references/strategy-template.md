# The strategy template

This page describes the usual structure of a quality strategy, `strategy.md`, and what goes in each
part. Every step that writes part of the strategy reads this page, so that each part fits with the
rest even when it is written in a different session.

A strategy is read by the strategy owner, by the people working on the project, and by agents
working on it. Often the reader is the owner's own agent, reading it for them. Each placeholder
below says what its part is for and what it needs to contain. Write the part for that purpose. Do
not write a paragraph for each thing the placeholder mentions, because a reader looking for what to
act on gets lost among them.

The parts come in the order a reader needs them. The opening comes first, with the bottom line,
because a reader with a decision to make today needs that before anything else. The project comes
next, so that nobody is left wondering what is being built, by whom and how, while they read about
the quality details. Then the release: what it is for and what it covers. Then who matters and what
matters to them. This is the core of quality, and the priorities rest on it. What this release will
not do comes before the priorities, because it sets their limits. Then the priorities, each with a
section of its own. Last come notes for later releases and where the document came from.

This structure is a guide, not a form to fill in. Use a different structure when it suits the
purpose of the document better. For example, the owner may want the project and the release in one
part, because the release is the whole project. [What a good strategy is](#what-a-good-strategy-is)
describes that purpose. The document itself needs no sentence explaining its structure. Keep the
order of dependence, though: the project and who matters come before the priorities that rest on
them, and in each priority's section, what good looks like comes before where it stands. A
structure that breaks that order rarely helps a reader.

[The quality model](quality-model.md) explains what a rating, a bar and a non-goal mean, and the
four questions each priority's section answers. [Every document](templates/every-document.md)
describes what all the pack's documents have in common.

## The usual structure

```markdown
# Quality strategy: <the product>, <the release>

<One or two sentences that tell a newcomer what this document is; whose strategy it is, by name,
with their role where it helps, such as "Priya, the shop's founder", and that they are its owner;
who it is written for, what date it describes, and how complete it is. After this, "the owner" may
stand where a sentence is about the role, because this is where the reader learns who that is.>

**Bottom line.** <One short paragraph saying whether the release can go, or how far it is from
ready, and what matters most to that, such as a decision only the owner can make that the strategy
is blocked on.>

**Rules <the owner's name or title> has given.** <The owner's limits on how the work is done, and
nothing else: what may or may not be run, contacted or changed, in their words. Every next action
has to fit within these rules.>

**What to do first.** <The few next actions that would unblock the most, each saying whose job it
is.>

## The project

<Everything about the project that affects the kinds of quality that matter here. This usually
needs some detail. Say what is being built and why. Say who does the work, people and agents, how
the work is done and checked now, and what goes well or badly about that. Say how a release reaches
the people who use it. Say what limits the project works within, such as time, people, money,
platforms and access, and any obligations it has to meet.>

## The release

<What this release is for and what it includes, in the owner's words. Where the records say what it
prepares for, say that too. List the features deliberately left for a later release.>

## Who matters, and what matters to them

<For each stakeholder, say who they are, how they relate to the product, and whose account of their
view this is. Then say, in their words, what would be good enough for them, what would make them say
"ugh", what would be unacceptable and, if they said, what would delight them. Keep to what bears on
this release. Include any concern of theirs that did not become a priority, and what the owner
decided about it. If nobody here speaks for a stakeholder, say so.>

## What this release will not do

<The kinds of quality this release deliberately does not aim for, each once with the owner's reason,
so a reader can tell a limit that was chosen from one that was overlooked. This includes every
priority rated None, and each level of quality the owner has said is more than this release needs.>

## The priorities

<A few lines on the pattern across the priorities: what the release is mostly about. If a
stakeholder is still to be heard from, or someone's view was kept brief, say so and say what that
leaves open.>

| Priority | How much it matters | The bar | Who it is for | Why |
|---|---|---|---|---|
| <the priority's name, as the records and the owner give it> | <High, Medium, Low or None> | <what has been said about how good it must be, in the words of whoever said it, with whose each is and what it was about, and any limit they set; a stakeholder's full levels stay under "Who matters", linked rather than copied; where nobody has said anything yet, "nothing said yet", with the question> | <the stakeholders it is for> | <the owner's reason, saying what would happen to someone if it is not met> |

<Only what a cell rests on, starting with the words behind it. Where people have said different
things about how good it must be, keep each side by side with whose it is and what it was about,
and say what the owner decided about the difference where they did. Where one row joins things
people asked for in different words, say so. Each stakeholder's own levels are under "Who matters";
link to them there rather than repeating them.>

### <the priority's name, exactly as in the table>

<Its rating and who it is for, in a few words.>

#### What does good look like

<How good it must be, described so that someone could see whether it is met. Say what sets the bar:
a stakeholder, the purpose of the release, or an obligation. Say what would be more than is needed.
Write what each person has said about it in their words, with whose it is and what it was about;
where nobody has said anything yet, say so, with the question.>

#### How do/will we know how good it is

<The ways of finding out how good it is that were chosen, and why each was chosen, because the
reason is what lets a reader keep a method or change it. For each one, say what it looks at and
what it compares that against, what it cannot show, and whether it exists now, needs building, or
nobody yet knows a way.>

#### Where it stands now, and how we know

<How far short of the bar the evidence puts it, or why it cannot be judged against the bar yet. Say
what the shortfall puts at risk, and for whom. Say what was seen, who saw it and when.>

#### What to do about it

<For each open question, the next concrete step and whose it is. Give a plan as far as one is
known; it may be "find out X, then plan again".>

### The release as a whole

<Anything that does not fit in one priority's section, such as questions and next actions that
several priorities share.>

## Notes for later releases

<Anything that came up about a later release, each saying which release it is about.>

## Where this came from

Written with the quality-strategy pack, version <version>, on <date>.
```

## What a good strategy is

### A compass, not finished thinking

A strategy is good when a reader can make decisions from it. They can tell whether the release is
ready, what is known to be wrong, where to stop, what to do first, and what is still open and how to
find it out. It is a compass, not finished thinking. It is true as far as it goes and useful before
it is finished. Anything that still needs thought or finding out is written as a question with its
next action.

### Clear provisional choices under uncertain facts

It treats choices and facts differently. A choice, such as a decision or a plan, made on a best
guess is better than no choice, as long as the strategy marks it as a best guess and the owner can
revise it. A fact the records do not hold is written as "we don't know", because made-up certainty
misleads whoever acts on it. The same unknown can support different honest choices: not knowing
whether performance is a problem, the owner may treat it as fine for now and plan a way to find out,
or act on a hunch that it is a problem and make clearing up the uncertainty a priority.

### Usable by someone who wasn't there

Ask of each part whether someone who was not in the conversation could read it and act on it. If
they could not, the part is not done. Write it from the records, for that reader, rather than
copying the records in. When the records lack something a part needs, say that it is missing and
what that means for the reader. Do not fill the gap with a fact the records do not hold or a
decision the owner has not made, because writing the strategy up adds no evidence and makes none of
the owner's decisions. A first move you suggest, marked as yours and not the owner's decision, is
neither.

### Test it against real situations

To judge a strategy, imagine specific situations in which someone uses it, and look for these:

- **Shared clarity:** readers can say what the release is for, who matters and what success means,
  and no two parts assume contradictory things.
- **Ways of knowing planned early:** for something not yet built, it says what the first build or
  first use must let someone see, instead of leaving the whole question until after delivery.
- **Next actions with their reasons:** a reader can explain why each one comes next.
- **Claims precise enough to challenge:** "a crash is tolerable if retry restores the saved work"
  can be disputed or checked; "good reliability" hides the decision.
- **Help with a surprise:** faced with a new request or a new failure, a reader can tell what it is
  about, who it affects, and whether it changes anything the strategy rests on.
- **Easy to pick up again:** someone coming back after a break finds what matters and why.
- **Deliberate limits:** a reader can tell an agreed limit from an oversight, a shortage, or a
  decision still to be made.

### Where it stands, not a promise

Knowing where a project stands is not the same as claiming it will succeed. The aim is shared
understanding, confidence that the important things were considered, and evidence anyone can see,
with its limits. Reviewing the document on paper can show whether it supports these things. Only
using it shows whether readers find their way with it. A project context or one stakeholder's view
does not need to do all of this: judge each document by the job it set out to do. Fix a real
inconsistency where it is, rather than turning this list into rounds of approval.

## Notes on the parts

### The opening

A reader deciding today reads the opening first, and often reads nothing else. So keep each item
after the bottom line short, and where a section works the item through, link to that section
instead of repeating its reasoning. The opening does not say how far to trust the document. Each
section cites its sources, and that is where a reader checks what a decision rests on.

Whichever step changes the bottom line rewrites it rather than adding to it, so that the strategy
reads correctly at any point. When the bottom line is a new judgement of the agent's, it says so
until the owner has seen it, because otherwise a reader will take it as the owner's decision.

### The project

The plan depends on how the project is built and shipped, so this part usually needs more than a few
lines. For example, how maintainable something must be depends on who changes it and how changes
are checked. Whether a fix reaches people depends on how releases reach them. Write what the
priorities rest on, for a reader who will not open the project context, and link to the context.
The project context remains the record, and it is the first thing a later step updates.

### Who matters

Someone deciding whether to ship, or working out what a new finding means, needs to know what it
means to the person it affects. The priorities table is arranged by priority, not by person, so it
does not tell them. So each stakeholder's own levels go here, in prose or a small table, whichever
suits them. Link to each stakeholder's profile, which keeps their full view, and never write the
release's priorities back into it. Other parts link here for a stakeholder's levels instead of
repeating them, because two copies drift apart and a reader cannot tell which is current.

The examples on this page come from another project, the quality strategy for the first alpha
release of Tollens, a tool that reviews code, and from the method that strategy followed. They show
what each part looked like there; they are not a layout to copy. Here is how that strategy set out
what mattered to one stakeholder, the agents that would install and use the tool. "Disgust" is the
level this pack calls "ugh".

| Dimension | Detail |
|-----------|--------|
| Delight | agent can install, run, and act on Tollens output autonomously with no human intervention. |
| Disgust | ambiguous instructions, unclear error states, output that requires human interpretation to be actionable. |
| Good enough | onboarding is unambiguous on the critical path. output format is parseable. error states give enough signal to recover or escalate correctly. |
| Dealbreaker | agents fall into rough edges that humans would tolerate. if a failure mode is silent or ambiguous, an agent can't "just ask" — it either fails quietly or loops. zero ambiguity on the critical path is the bar, not nice-to-have. |

The method gives the reason each stakeholder has levels of their own: "Fast performance might be
"delight" for a side project user but "good enough" for an enterprise customer and "dealbreaker"
for a real-time system operator."

### What this release will not do

Include this part only when there is something to put in it. It is mostly about quality: for what
the release does include, which kinds of quality it does not aim for, and what would be more than it
needs. A feature left for a later release belongs in the part on the release. It can be named here
as well when a reader would otherwise expect it, such as something people will ask about, because
then the answer is ready. A list of nothing but deferred features is a sign that nobody has yet
worked out what would be more than the release needs, and that is worth saying.

Two examples of a non-goal with its reason. From the method: "We are not pursuing scalability for
the alpha because our target users are working on small side projects". From that strategy, a level
of quality more than the release needed:

> **Zero-crash reliability.** It's an alpha. Things can crash as long as recovery is easy and retries work. We're optimising for recoverability and failure mode, not uptime.

### The priorities table

Above the table, give the date on which each profile and the project context were read, so a reader
can tell whether a source has changed since. Under the table, link from each cell to the words it
rests on.

Name each priority the way the records and the owner name it, so that the people who gave their
views recognise it. A name usually says the kind of quality and what it covers, as that strategy's
did: "Installability (gets running on their machine first time)", or "Security — actual (API keys
safe, data stays local)" beside a separate "Security — perceived".

Sort the rows by how much they matter. Keep unrated rows in view, and make the rows rated None easy
to find. The reason in Why names a consequence for someone: who is affected and what happens if the
priority is not met, what depends on it, or what would be lost by doing it later. A reason that
would fit any row, such as "central to the release", only repeats the rating. If the owner gave no
reason, the rating stands as theirs and no reason is invented. If the owner set a limit on how good
a priority needs to be, put it in that row's bar, so the reader sees one bar rather than two
statements that seem to disagree. A rating that has not been decided yet says so in its cell, with
the question that would decide it.

### The sections

Write a section for each priority not rated None, with its four parts in order, because each part
rests on the one before. Head it with the priority's name exactly as it is in the table, so that a
reader can go from a row to its section. Someone may take a single section away to work on, so each
section says enough to act on without the rest.

Put the sections in the order the owner last gave the priorities. If they gave none, keep the
table's order. For a priority with no rating, the open question is how much it matters, unless the
owner kept it as a constraint on the work: a constraint is never rated, and nobody is asked to rate
it.

Where it stands says how each thing is known: what was seen, by whom and when. It can also say how
confident we are about where it stands, in a word such as "known", "low" or "very low", and what
good looks like can say in the same way how sure we are that the bar is the right one. The word goes
beside the account of how it is known and never replaces it, because a reader can weigh what was
seen, and the word only sums it up. This row from that strategy's risk map shows both:

| Dimension | Required | Actual | Confidence | Gap | Impact |
|---|---|---|---|---|---|
| Usability | non-expert vibecoder can understand and act on output | ? | **Low** — output has only been evaluated by the team, who are experts | unknown, possibly large | warm. the curse of knowledge is real — what's obvious to us may be opaque to users. |

When something is unknown, say why, because what would settle it depends on the reason: nobody has
looked, someone looked and could not tell, nobody knows a way to find out, or the bar itself is not
settled. Compare what was seen with the bar yourself, rather than leaving the reader to do it. Low
confidence about where a priority stands is itself a risk, in proportion to what the unknown puts
at stake. What the shortfall risks is the cost of
the gap the evidence shows, which is not the same as what falling short would cost in general. If
the bar changed after the findings were made, say so, because they were judged against the earlier
bar.

What to do about it says whose each idea is, because a reader treats the owner's plan differently
from the agent's suggestion.

Quote someone only where the quote
carries a decision, not for colour; link to an issue's history rather than retelling it; and do not
list every fact a record holds, because that copies the record out again.

### The end

Include notes for later releases only when there are some. Each note says which release it is
about, because the next release gets a strategy of its own and its pre-read looks here. Take the
version from the installed pack's `plugin.json`, in the folder that holds `PHILOSOPHY.md`, and never
invent one. Keep skill names out of that line, because they are the pack's words, not the reader's.

## Things that should go in a quality strategy that we know are not yet covered by the strategy discussion skills

The steps that talk the strategy through with the owner do not yet ask about the things below, so
the records may hold a little on them or nothing. A strategy should still cover them. When you
write the strategy, include what the records hold on each, in the part it bears on. Name the items
the records say nothing about together, in one short line in "The release as a whole", such as "Not
yet considered: rules of thumb for deciding on the fly, reporting", so that a reader sees the gap
rather than assuming it was considered, without a separate line for each. Leave out an item that
plainly does not apply to this project. Each item says where it comes from.

- **Rules of thumb for deciding on the fly:** simple rules that let anyone, a person or an agent,
  see quickly how something new fits and what to do about it, such as which issues are fixed at once
  and which are noted and watched. This comes from the conversation in which the method was first
  worked through, and from that strategy's decision rules.
- **A plan of work across the priorities,** ordered by what depends on what and by impact, as far as
  it is known. This comes from the method's last step, "a prioritised list of actions, ordered by
  dependency and impact".
- **Where the gaps and the uncertainty are worst:** which items are hottest, in the method's words
  "large gap + high impact + low confidence"; which unknowns could be settled together, such as by
  one conversation; and what has to happen before something else can be assessed. This comes from
  the method's risk map and from that strategy's summary of its own.
- **Whether what we know is enough,** about the target as well as about where things are now: "How
  sure are we that this is the right target?" and "How sure are we about where we actually are?"
  This comes from the method's risk map.
- **What success looks like for the release, and its dependencies:** what questions the release
  answers, and what has to come before and after it. This comes from the method's step on releases.
- **That the starting assumptions can change:** the work on quality may show that the team, the way
  it works or the way it releases should change, because the project as first described is a basis
  to work from, not something fixed. This comes from the method's note on keeping a strategy alive,
  and from that strategy's notes on what might change.
- **Whether reporting is needed, or deliberately left out:** who will need to hear how quality
  stands, and whether the chosen ways of knowing can be tracked and shown to them; or, where
  reporting is left out for now, that it is and why. This comes from the method's note on reporting,
  and from that strategy, which recorded leaving it out as a known omission.
- **Keeping distinct kinds of quality apart when priorities are put together,** including actual
  quality and how it is perceived, wherever they could be rated differently, stand in different
  places now or need different work. They often matter just as much as each other and still differ
  in the rest: a product can be secure while its users do not trust it, and that needs different
  work from making it secure. This comes from the method's step on quality dimensions and its note
  on actual and perceived quality.
