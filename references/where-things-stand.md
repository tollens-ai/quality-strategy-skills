# Where things stand

A script keeps which steps are done and which comes next, so that every session tells the user the
same thing: `node "$PLUGIN_ROOT/skills/quality-strategy/scripts/steps.mjs" <command> --quality-dir
<the quality folder>`, where `help` lists the commands. Tell the user what is done and what comes
next, not about the script.

**Is there a strategy?** Find out once, when a skill opens, from `status`: there is one unless it
says no strategy is recorded (`"strategy": false` with `--json`). A saved answer about committing,
on its own, does not mean there is a strategy, because setup also saves that answer for an interview
run on its own. If the folder holds strategy documents that are not yet recorded, `status` says so:
tell the user which steps the documents show as finished and, once they agree, record those; if it
was one-off work, record nothing. If there is no strategy, the skill is running on its own and
records nothing, unless the user asks to go on and make it part of a strategy. A skill opened by
another skill uses the answer the opening skill found.

**When a step opens,** run `status` first, even when the user named the step, and go on from what it
says.

**Record what happened, when it happens,** because the script knows only what it is told. Record a
step as `done` once the user has seen its result and answered; as `started`, with a note of what it
waits on; as `skipped`, with the reason; and as `drafted` when it was made without them.
`part "<stakeholder>" view` takes the same four. Whether a change affects a step already done is a
judgment, not something the script can know: write it in the progress note when it matters.

**Who matters** is recorded in the order the user wants to take them.

**Going on without a stakeholder's view** is the user's choice, made now and in so many words, and
their reason for it decides what you record, because each record tells every later session
something different. A view is in one of these three states at a time, and the user can change
their mind whenever they like: record the new choice, and it replaces the earlier one. In the same
save, bring up to date each document already written that gives the earlier choice, such as the
strategy's account of who matters or a row that rests on it, as [what is true
now](templates/every-document.md#what-is-true-now) says.

- **Nobody in the conversation can give the view.** Record `stakeholder nobody-here "<name>"`, and
  as you record it, tell them that later steps keep open everything that view could change. Saying
  "I'd have to ask them" about one question is not that choice.
- **They do not want the view taken,** because another stakeholder's view covers it or this release
  does not need it. Record `part "<name>" view skipped --note "<their reason, in their words>"`.
  That settles the step: no later session asks for the view or counts it as missing. It does not
  settle what those people need. A reason such as "the administrators' view covers them" is what
  the user believes about those people, and nobody has checked it with them, so write it as the
  user's reason wherever you use it: the strategy says once that the view was not taken and why,
  and a row that rests on the reason says so.
- **They want the view, but later.** Leave it as a step to take, so that `status` goes on naming
  it. If nothing is recorded for it, record nothing. If it was recorded earlier as one of the other
  two, put it back: `stakeholder can-speak "<name>"` after `nobody-here`, or `part "<name>" view
  "not started"` after `skipped`. Write their choice in the progress note, so that the next session
  does not ask again. Until the view is taken, later steps keep open everything it could change.
  This is also the record when they go on without saying why.

**The quality folder,** its records, and whether permission to commit is recorded are printed by
`node "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs" where`. A place the user names takes
precedence; if work they need is not found there, ask where it is before starting afresh. If they
only want to talk, save nothing.

Before the first save, use the arrangement `quality-setup` saved, without asking again, unless who
can read that place has changed. When drafting without the user, use the arrangement saved as not
yet agreed, until the draft is handed back to them. If there is no saved arrangement, or who can read
the place has changed, open `quality-setup`, carry on from the same point afterwards, and then say
where the first save went and who it is for. When a result outside a strategy is saved to a file the
user named, save no arrangement for it, because a later session would read that as their choice for
a whole strategy; tell them instead who could read the file, as far as you can tell. Only
`quality-setup` changes the arrangement.

**An interview's sitting,** in `interviews/<sitting>/`: read its `progress.md` first. Start from a
finished sitting's summary, and from whatever an unfinished one has, saying that it is unfinished.
Leave its files as they were saved.

If the script refuses a command, it says why and saves nothing: correct the command. If the script
cannot run at all, tell the user that where they are cannot be saved, and keep it in the progress
note.
