# The kinds of report

## Reading the records

Open the [quality model](../../../references/quality-model.md) first, because it says what the
records' terms mean, and the report uses the current terms. Use the records the user names, or
their own documents that do the same job. Otherwise read the strategy first, because it is written
for readers and gives the reason for each decision. Then read every other record for what bears on
the request: the stakeholder profiles, the project context, the notes in `notes/` and the
interview's records. Take whose each thing is from what the record says, not from the folder it is
in, because the folder does not tell you: the priorities table kept in `notes/` holds the owner's
decisions, and a profile says whose account it is. The decision log says how things changed; the
other records hold what is true now, which is what a report shows. Records from older versions of
the pack, with earlier names and layouts, are read for what they mean, as the model's [older
records](../../../references/quality-model.md#older-records) says.

Reading a record does not clear it for the report's readers. An interview's sitting, for example,
has its own agreed readers, so what someone said there reaches anyone else only as [a report for a
particular reader](#a-report-for-a-particular-reader) says.

A record whose parts are still mostly questions can still support a report on what it does cover.
Say what that is, and what is unknown or not yet looked at, because a thin record presented as a
full one claims more than it holds.

If the progress note holds a question waiting for the strategy owner, follow [coming
back](../../../references/stopping-and-coming-back.md) on whether to ask it first. A report can
include a part the owner has not answered, such as a provisional row, a view not yet heard, or the
item the note asks about, if it marks that part as a draft the owner has not answered. That way the
report can go ahead without waiting for the answer. A report that would present that item as the
owner's judgment, or rest on it, waits for their answer, because it would attribute to them
something they never said.

## What every report holds to

These apply to every format, from the first draft to the saved file.

- **Keep apart, for each claim,** what it is about (the part of the product, the kind of quality,
  whose view and which release, where those matter), how much it matters, how good it is now, how
  sure the records are, and the order of work, because a report that blends them says something
  nobody decided. A priority that holds several stakeholders' views keeps each one's bar visible.
- **Rank stakeholders only where the records do,** in the records' words. Never rank them by the
  order they are listed in, by their High ratings, or by which of them you chose for the report.
- **A grouping you make for the report is only a way of showing the priorities,** with no rating or
  state of its own: a heading over several priorities can show each one's rating, but never one
  rating for the group.
- **Low-rated work can still stop a release.** The ratings rank what matters; they do not say
  whether the release is ready, which is the owner's judgment.
- **Show an unknown as unknown,** never as poor or as fine, and say why it is unknown where that
  matters to the reader, because on a good-to-bad scale an unknown reads as one or the other.
- **Report the records' own judgments.** Never work out whether the release is ready from ratings,
  counts or how much is done, and add nothing that suggests it, such as a progress bar or a gauge.
  A finding or a good question does not need a next step invented for it.
- **A report for readers nobody has named,** such as the visual to share, is made from what the
  records hold for readers beyond the conversation: the strategy and the findings, stated as firmly
  as they state them, no more and no less, with unknowns, drafts and unanswered parts marked. Leave
  out what only the notes hold, such as who has not answered or whose view is the owner's guess,
  because nobody has said who will see the report. Keep the limits of the evidence with the claims
  they limit, such as a finding made on a disposable copy, so that the report looks no safer than
  the records show.

**Check the draft against the records.** How to present it is yours to choose. Read the finished
draft as its reader would, then compare each claim that matters with the records, because
shortening and restructuring drop things. Look for anything dropped or blurred: what the report
does not cover; unknowns, decisions only proposed, disagreements between stakeholders, open
questions and accepted risks; how sure the records are, and how evidence was gathered where that
changes what a claim means; what the ratings mean; and distinctions the records keep that the
report has merged. Fix anything misleading or unsupported.

## A visual to share

**Goal.** Something striking and true that they will want to show people: a picture of where their
project's quality stands, which a stranger understands in seconds. It is done when there is one
HTML or SVG file that someone who knows nothing of the project understands on its own, that could
belong to no other project, and that states every claim as strongly as the records do, and no more.

What it shows, its form and its look are yours to design. These are fixed:

- **Start from what they want to show.** What they asked for is the brief. Choose a tone for this
  project unless they gave one; any tone works when every claim is backed by the records, and a plain
  request should not get a dull picture.
- **Lead with what they found out.** If the strategy showed them something they had not realised
  mattered, that is the headline, not a caption.
- **Let the picture make the point:** shapes show it, and words say why it matters. One thing
  should be clear within three seconds, and the first view works on its own as a screenshot. Give
  the most important things the most room, rather than cards of equal size.
- **Make it theirs:** the project's own names, its voice and a look that suits it.
- **Make it readable by a stranger.** One plain sentence says what the project is and what the
  picture shows. Nothing a reader can reach, tooltips included, uses this pack's vocabulary, row
  numbers or codes.
- **Show gaps as part of knowing where the project stands,** easy to see, each with a first step
  where the records give one, neither hidden nor shown as a failed audit.
- **One file,** with its styles and images inside, so it can be shared as it is.

Large type does not make a hedged finding a fact, and a serious risk does not mean the release is
stopped unless the records show that decision. Keep on the picture any qualification that changes
what a claim means, said in its own voice, such as "on a test copy", "the founder expects" or "not
yet checked". Put the bookkeeping in the note beside the file that [saving and handing
back](#saving-and-handing-back) describes; a quiet line with the project's name and the date is fine
where the design wants one. If the picture they want needs something the records lack, show the gap
or choose a view the records support, and say in your closing message what is missing.

If a browser or other renderer is already installed, use it to view the file at its intended size.
Installing one means installing software they did not ask for, which [needs their agreement
first](../../../references/before-a-look-or-a-check.md). Look for clipped or overlapping text, weak
contrast, missing labels, broken controls, and whether the main point is easy to see. After
polishing, reread the visible claims, because dramatic wording can make the evidence sound stronger
than it is. If you cannot view it rendered, read its code, tell the user you could not view it, and
ask them to look at it before sharing it.

## The strategy explorer

**Goal.** A page for someone who wants to work from the strategy rather than take one picture from
it: the strategy owner coming back to it between sessions, a colleague who will act on part of it,
or an agent working on the project. They open one HTML file from disk and move around in it, instead
of reading the whole strategy from top to bottom each time. It is done when someone who was not in
the conversation can, from the page alone:

- understand the project and the release, including what the release will not do;
- find any stakeholder, see what matters to them, and get to the priorities that carry their view;
- open any priority and read its four answers in the strategy's order: what good looks like, how we
  would know how good it is, how good it is now, and what we will do about it, each with whose it is
  and how settled it is;
- read the plan of work in its order, with the reason for each piece;
- read the open questions, with whose each one is and why it is still open;
- from any item, get to what it rests on and what it affects, and come back.

You write the whole page, for this project's reader: its layout, its navigation, its look and every
word on it. These are fixed:

- **Open with what the reader needs first.** That is where the release stands and how finished the
  strategy is, so they know how far to rely on it, then how each priority stands against its bar,
  and what matters most, because those are what they act on; everything else is there to be found,
  not put first. Show these from the records' own judgments, with every unknown marked as one. An
  opening that looks like a dashboard is fine when every mark on it is a judgment the records make
  or a marked unknown. One way: the bottom line and how finished the strategy is at the top, a card
  for each High priority, and the rest in a list. Below the opening, keep the strategy's own order:
  the project and the release, then who matters, then the priorities, because each rests on the one
  before it.
- **Let the verdict lead, and keep the evidence within reach.** For how good a priority is now, the
  reader first sees how it stands against its bar, and can then get to what was observed, by whom,
  when and how it was seen, without the observation crowding out the verdict. Where both are short,
  side by side can be the clearest view; where the observations are long or several, opening them on
  a click keeps the verdict in front. Choose what suits this project's records.
- **Make the page a map of the records, not a summary of the session.** Every word on it comes from
  the records you read, never from the conversation or your own interpretation of them, so that the
  reader sees what was recorded. Where a record lacks something the page would show, say so in plain
  words at that place, such as "not recorded" or "no reason given", rather than leaving a blank or
  filling it in, because a blank reads as an oversight and a supplied answer reads as a decision.
  Keep that apart from an answer the owner gave, such as "not yet worked out", which is theirs.
  Where the records hold nothing at all of some kind, such as no next actions yet or no bottom line,
  say so in a sentence of its own. When the owner decided that they would release whatever
  the state of a priority, that is a decision, shown as theirs, not an absence.
- **Keep two things as two.** A page built of cards and short lines invites merging, and a merged
  entry hides what one of its parts leaves unknown. So two findings on one priority stay two items;
  so do a level the owner gave and a part beside it that is the agent's interpretation; and so do a
  question and a statement next to each other. A question is never written as a statement, or the
  other way round. A proposal of yours that the owner has not been shown is marked as proposed and
  not yet seen by them.
- **Write every word for this project.** The headings, labels, filter names and tooltips are what a
  reader meets first, so write them in plain English with the project's own names. Nothing a reader
  can reach uses this pack's vocabulary, row numbers or codes. Quote the records' sharpest sentences
  as they were said, adding only a note in brackets where a quote mentions a row number that needs
  explaining.
- **Show how far the strategy has got:** which parts exist, which were drafted without the owner,
  what is waited on, and whose views were heard only briefly and are to be heard more fully later,
  because a reader who cannot tell takes a draft for a decision. A strategy that is not finished
  still gets its page, and the page says where it is unfinished.
- **One file that reaches nothing outside itself.** Its styles and scripts go inside it, and it
  fetches nothing, links to nothing outside, loads no image or font from elsewhere and sends nothing,
  because it will be opened from disk and passed around as a file, and the records are candid.

It is easy from a finished strategy on the current template, where each priority's section already
answers the four questions in order. It is harder from an older strategy laid out differently, which
you read by meaning, and from one partway through, where being honest about what is missing matters
more than the navigation.

Things that often help, to choose from for this reader: filters by rating, by stakeholder, by kind
of quality and by what is still unsettled; a search; and, on each item, links to what it rests on
and what it touches, with a way back.

View it rendered, as for [a visual to share](#a-visual-to-share), and move around in it as its reader
would: open a priority, follow a link from it and come back, and try each filter, because a control
that does nothing leaves the reader stuck.

## A report for a particular reader

**Goal.** A named reader gets the quality information they need, in a form that can be shared. It
is done when the report helps them make their decision, keeps what is uncertain visible, and shares
only the detail that is right for them.

"The team" is enough of a name for a one-pager inside the project; a reader outside the project
needs to be named, and a request for a social card or a post counts as naming the public. Choose
what to include for this reader: the stakeholder expectations that matter to them, things
deliberately left out that they could take for oversights, the limits of the evidence, and the
actions that affect them. If the profiles have changed since a
release decision, report the decision with what it rested on at the time.

Write one page, or the length asked for, starting with the message that matters to their decision,
then the evidence, what follows from it, and any next step the records support. One finding or open
question can be the whole message. Say what it covers and explain any term they may not know. Leave
out private detail they do not need, without making things look safer than they are.

Where your reader needs a judgment the records do not hold, such as whether the release should go
ahead, or a rule to follow until an open question is settled, say on the page that nobody has
recorded it and whose decision it is, because this reader may act on a judgment they take to be
recorded. Put any suggestion of your own in your closing message, naming the step where the owner
makes that decision.

For a reader outside the records' agreed readers, before you make a version to share, tell the user
what from the records would reach them that was only ever meant for the agreed readers, such as who
has not answered, whose views are the owner's guesses, findings made on disposable copies, and
names. Ask once how they want it handled, because the readers were agreed when the records were made
and this one was not among them. Until they answer, a draft can still help: mark it as a
confidential draft not yet cleared for that reader, and say in your closing message what is still to
be decided.

## An operational report

**Goal.** Someone can make everyday quality decisions without rereading the whole strategy. It is
done when, with the short summary and the guide to new issues, a reader new to the strategy can place
a real issue on its priority, or see that it matches none, and knows what the strategy says to do
next about that priority, given where it stands.

The summary is a few short lines, covering only what the records cover: the project and release; the
stakeholders who matter; the clearest bar; the risk or unknown that matters most; the next step, if
one is recorded; the main exclusion. Copy each priority's name and its rating exactly, because a
paraphrase shifts what was decided, and name a biggest risk or a first action only where the records
do.

The guide is a set of questions, written for this project, that place a new issue on its priority:
which part of the product, which kind of quality, whose view and which release. The issue takes its
importance from that priority; keep how bad it is apart from how soon it needs attention. An issue
can belong to several priorities when it affects several groups or parts, and a tool's quality is
kept apart from the quality of its output. Then say where each kind of issue goes, giving only the
routes the records support: an unclear expectation goes back to the stakeholders or the priorities;
a question with no way to judge it, an unknown current state or a known gap goes to its priority's
section, as a question with its next action, to be worked further with `priority-deepdive`. A
question can stay open with no next step, and a disagreement between stakeholders may need them to
talk it through. Where a reader would need a judgment the records do not hold, say so as [a report
for a particular reader](#a-report-for-a-particular-reader) does. Add commands or a quick-reference
sheet only for decisions people make again and again.

It goes in the strategy only if they ask; otherwise it is a separate report. Either way it must not
become a second, competing version of the strategy: correct any rating, risk, ranking or
recommendation the records do not support.

## Saving and handing back

Save the report where the user agreed. If no place was agreed, use the quality folder: put an HTML
or SVG file in `artefacts/`, and a written report beside the strategy, named for its reader, such
as `team-report.md`.

A report saved as its own file carries a note of where it came from, because it will be read away
from the records: the records' paths, each with the date its heading gives or "date not recorded";
the pack version, from [where this came from](../../../references/strategy-template.md#the-end), or "not
recorded"; the date it was made; the readers it is for. For a picture made to be shared, save the
note as a file beside it rather than on the picture. Say a person reviewed it only if one did,
because a reader takes "reviewed" to mean someone checked it.

Where leave to commit stands, commit as [stopping and coming
back](../../../references/stopping-and-coming-back.md) says. In your closing message, as it says,
start with anything that still needs the user, such as a suggestion for a step or a question about
what may be shared; then give the path, anything that limits what a reader may conclude, and, for an
HTML or SVG file, whether you could view it rendered.
