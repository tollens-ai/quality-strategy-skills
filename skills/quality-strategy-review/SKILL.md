---
name: quality-strategy-review
description: Review whether a quality strategy, or one context, stakeholder, priorities or priority-section document, supports the understanding, question or decision it is meant for. Use to review existing quality work on paper, at the scope it states.
---

# Quality strategy review

Quality is value to someone who matters. The approach to quality strategy in this pack derives from
the Context Driven Testing school: start by describing who matters, describe what matters to them,
then prioritise the work to achieve it. The approach is not dogmatic - coverage, checklists,
standards and established practice can all be part of the strategy, sometimes they are the exact
right thing for some stakeholder or some quality dimension. The key thing is the overall approach -
based on context, and understanding what this project needs to achieve.

This skill reviews quality documents on paper, a whole strategy or one piece of it, and asks
whether they help their reader understand or decide what they exist for. You follow one reader
through them in a concrete situation, because a finding shown in use is one the user can act on,
while reading for themes finds only what looks wrong.

It is done when the user has your view, backed by what you read: whether the documents serve their
purpose and why, the weaknesses that matter and the strengths worth keeping, each with a concrete
suggestion within what they asked for. It can be done while the documents still need changes,
because judging them and fixing them are separate pieces of work.

## When another step opened it

A step, such as the write-up, may open this review over a document it has just written, as [opening
another skill](../../references/opening-another-skill.md) describes. Then its brief gives what you
would otherwise take from the user: which document or section, whom it is for and where the records
are. Run the checks on a whole strategy, `comms-review` over the strategy included, and the rest,
over the scope it gave. Give your findings back to that step, and leave to it what that page says an
opened skill leaves, and also `comms-prep` for your report and saving a review, because it owns the
document: the comms checks you leave are those on your own report.

## What the documents are for

Use the text given or the documents the user names; otherwise the strategy, which
`node "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs" where` finds. In a strategy, run
`steps.mjs status --quality-dir <folder>` from the same scripts folder, because it tells a draft from
what the user has seen and answered. Read strategies from older versions of the pack for what
they mean, as [older records](../../references/quality-model.md#older-records) says; they need no
converting.

Take the scope from the request and what the documents say they are for. Ask only when the answer
would change your judgment; otherwise say which scope you are assuming. If the reader's own account
of their needs is not in the records, say that your picture of their needs is your own. If there is
nothing to review, say what is missing and stop.

## Four questions

Ask four questions of what you review, in this order, because each is cheaper to answer once the
one before is known: a document that is not useful needs no polish, and a false one must not be made
persuasive.

1. **Is it useful?** Would it help its reader decide and act: what does it tell them they did not
   know, what would they do differently, what is there for nobody, and can they follow why one thing
   leads to another? For a whole strategy, [what a good strategy
   is](../../references/strategy-template.md#what-a-good-strategy-is) says what a reader should be
   able to decide from it, and the walk below tests that in use.
2. **Is it true?** Is it true to the records and to what the person said? It shows whose words
   are whose, writes no agent's interpretation as a fact, says where the user has not seen
   something, and states unknowns as unknowns. Find fault with a confident claim that has no
   evidence sooner than with an honest unknown, and never count an open question as a gap, because
   that teaches the user to fill unknowns with guesses.
3. **Is it succinct?** Each thing said once and linked elsewhere, the records not copied in, and
   nothing kept that changes no reader's understanding or action. This is about value, not length:
   a long part its reader needs is no fault.
4. **Is it well communicated?** Does it carry everything important from the records without
   losing, distorting or quietly settling it, in a structure that suits what it is for? For a
   strategy, the checks described under giving the judgment answer it.

## Walk the intended use

Pick a situation that fits the documents' job: a founder choosing what goes into a pilot, a
maintainer reading their own view, a team deciding what to look into next, someone coming back to an
important unanswered question. Follow that person through the documents: what can they learn, and
what can they decide?

Open [what to look at](references/what-to-look-at.md) for the kinds of document under review, because
it holds the questions that find where each kind fails its reader.

Throughout, keep how much something matters apart from how good it is, how sure we are and how
urgent it is: something important may already be good enough, and an uncertain finding is not poor
quality. Putting off an important requirement is not a contradiction. An unsupported claim that
the release meets it is a finding, and so is a consequence of putting it off that nobody has
acknowledged; report either with what it rests on.

## Give the judgment

For a whole strategy, or the parts of one you were asked to review, first run, once, the checks
that [what to look at](references/what-to-look-at.md) lists under a whole strategy. They compare the
strategy with its records and with its template. Report what they find, and change the strategy
only where the user asked for fixes.

For your own report, run `comms-prep` before drafting and `comms-review` on the draft, dealing with
what it finds: this run checks what you tell the user, while the earlier one checked the strategy.
If the user asked you to fix what you found, make the changes they authorised first, then reread
each changed section and every section referring to it, because a fix can contradict another part.
Record each change in the decision log, saying which finding it answers, so that a reader can tell
the text you reviewed from what you changed after.

Start with whether the documents serve their purpose, and the main reason. For each finding that
matters, name the part, quote or cite what it rests on, say what follows for the reader, and suggest
a specific change or question. Tell a contradiction apart from missing evidence, a vague requirement,
a recorded disagreement between stakeholders, or something deliberately put off, because each needs
a different response. Say when you are unsure, and mention strengths where they show what to keep.

Talk with the user as [each turn](../../references/each-turn.md) says, and
present your judgments as yours, as [whose words are
whose](../../references/templates/every-document.md#whose-words-are-whose) says: keep their
corrections, show a proposal they have not answered as still yours, and do not invent a way to
settle an open question just to finish.

Give the findings in the conversation, with what you reread and anything that no longer agrees.
Save a review only if the user asks for one or their way of working calls for it; date it, and save
it beside the strategy unless they say otherwise. Say what you read and what the review cannot
show: reading documents supports a judgment about them, not that the product was tested or used.
Suggest further work only where a finding calls for it, and hand back as [stopping and coming
back](../../references/stopping-and-coming-back.md) says.
