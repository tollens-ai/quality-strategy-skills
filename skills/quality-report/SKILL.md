---
name: quality-report
description: Make something to show from quality strategy records, such as a striking, faithful visual to share, a page a reader can explore, a report for a particular reader, or an operational summary. It is the last step of a strategy, and can also be used on a focused or partial one whenever someone wants to understand, share, present or work from it.
---

# Quality report

Quality is value to someone who matters. The approach to quality strategy in this pack derives from
the Context Driven Testing school: start by describing who matters, describe what matters to them,
then prioritise the work to achieve it. The approach is not dogmatic - coverage, checklists,
standards and established practice can all be part of the strategy, sometimes they are the exact
right thing for some stakeholder or some quality dimension. The key thing is the overall approach -
based on context, and understanding what this project needs to achieve.

A report shows what the records already hold and decides nothing new, because the decisions were
made with the user in the steps responsible for them. Make it for a reader who comes with something
to understand or decide, because a report made with no reader in mind turns into a form.

A good report does two things at once:

- **It is worth showing.** Someone who was not in the conversation understands it without having
  been there; it reads as this project's own, not as a form; and the first thing they see is what
  matters most for their decision.
- **It is true to the records.** Each claim is stated as firmly as its record states it, no more and
  no less, with any qualification that changes what it means, such as whose belief it is or that it
  was seen only on a test copy, because a reader cannot see the record behind it. Something unknown
  is shown as unknown, never as poor and never as reassurance. A rating shows how much something
  matters, not how good it is or whether the release is ready. What the strategy owner agreed is
  kept apart from what the agent proposed, and what the records keep apart stays apart. The report
  says what it covers, so that nobody takes a focused or partial record for the whole strategy. It
  gives the bookkeeping behind it, which record said each thing and when, what it was made from and
  that the strategy owner judges whether the release is ready, on the face of a report someone
  decides from, and in the note beside a picture made to be shared, because a stranger reads a
  picture for what it says and bookkeeping on its face makes it read as a record.

It is done when the named reader can use the report to understand, decide or place a new issue
without having been in the conversation behind it; every claim that matters can be traced to a
record and is stated as firmly as that record states it; the report is saved with its note of where
it came from; and the user knows what limits it and whether you could view it as it will be
displayed.

All the detail is in [the kinds of report](references/kinds-of-report.md), one file with a section
for each moment named below: read each section at that moment. Of its guides to the kinds of
report, read only the one for the kind asked for, because the others would pull the report towards
a kind it is not.

## 1. The records and the reader

Before your first message, read [working on a strategy](../../references/strategy-workspace.md) and
the section of [the harness page](../../references/harness.md) for your tool, because they say how
each turn goes and how to ask a question there so that the answer is waited for.

Find the quality folder and its records with `node
"$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs" where`. When it finds them, also run
`steps.mjs status --quality-dir <folder>` from the same scripts folder, because it says
whether they belong to a strategy and, if they do, which parts the user has seen and answered, and
it prints the progress note. Then read the records as [reading the
records](references/kinds-of-report.md#reading-the-records) says. If nothing usable exists, tell the
user what is missing and which step would give it, and stop.

Use the reader and the purpose the request gives. Ask about them only when something missing would
change the report, because a question whose answer changes nothing is just a form to fill in.

When the request asks for nothing in particular, as when a strategy's last step asks for a picture
or they want "something to show people", say in a line or two what could be made from these records,
such as a card with one number for a post, a picture of where the gaps are, or a page to explore,
and ask what they would like to show. Make nothing until they answer, because what you make depends
on their answer. Add that it can be plain or pointed, and that you will choose a tone for this
project unless they say, because most people do not know a pointed version is on offer. If they
leave the choice to you, make the visual to share. Leaving it to you settles which of your offers
to make, not who may read it.

Keep to the readers that the saved arrangement agrees for each record: that you can read candid
material does not mean a new reader may. A reader outside those can be named, or implied by what is
asked for: a social card, a post, or anything else for social media or the public is read by the
public, who are never among the agreed readers, even when nobody is named. For a reader outside
them, named or implied, and whatever the format, first follow [a report for a particular
reader](references/kinds-of-report.md#a-report-for-a-particular-reader) on what from the records
would reach them, because that section says how a version for them is cleared, or kept as a
confidential draft until it is.

## 2. Make it

Run `comms-prep` before drafting, its brief saying what the report is for and whom, and
`comms-review` on the finished draft before you hand it over, because a report is read away from the
conversation that would explain it.

Read [what every report holds to](references/kinds-of-report.md#what-every-report-holds-to): its
rules on claims, and its check of the draft against the records, apply to every format. Then read
the guide for the kind asked for:

- [a visual to share](references/kinds-of-report.md#a-visual-to-share): one HTML or SVG file that
  shows where the project's quality stands, made to be shared;
- [the strategy explorer](references/kinds-of-report.md#the-strategy-explorer): one HTML file a
  reader can move around in, for someone who wants to work from the strategy rather than take one
  picture from it;
- [a report for a particular reader](references/kinds-of-report.md#a-report-for-a-particular-reader):
  a one-pager, or a version for a reader outside the project;
- [an operational report](references/kinds-of-report.md#an-operational-report): a short summary and
  a guide to placing new issues, in the strategy or as a separate report.

## 3. Save and hand back

Save and hand back as [saving and handing
back](references/kinds-of-report.md#saving-and-handing-back) says. In a strategy, record the step
with `steps.mjs step report done` whichever format was made, because the strategy's route counts
the report as done once the user has it; a report outside a strategy records nothing. Then stop,
without sending or publishing it or treating it as approval of the strategy, because the user
decides who sees it and whether the strategy is ready.
