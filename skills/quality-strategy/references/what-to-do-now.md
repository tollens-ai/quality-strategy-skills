# What to do now

The procedure the [quality strategy skill](../SKILL.md) follows on every run. When you explain the
route to the user, explain it from the skill's map of the steps.

## Find where things stand

1. **Before your first message,** read your tool's section of [the harness
   page](../../../references/harness.md), because it says how to ask a question there so that you
   wait for the answer.
2. **Find the quality folder** with `records.mjs where`, as [where things
   stand](../../../references/where-things-stand.md) says. If it finds none and their words suggest
   they have been here before, such as "where are we" or "carry on", ask where the documents are
   kept, because they may be outside the project, and otherwise a second strategy would be started
   beside the first. Otherwise use `quality` in the project.
3. **Run `status`** on that folder. It prints the progress note. If the note holds a question
   waiting for the user, or a change that later work depends on, deal with it as [coming
   back](../../../references/stopping-and-coming-back.md) says.
4. **If `status` says the folder holds strategy documents not yet recorded,** an older
   version of these skills made them. Read them, tell the user which steps look finished, record
   those once they agree, and run `status` again.
5. **If the folder is inside a repository, git does not ignore it, `status` shows `Commits: not
   recorded` and Setup is done,** open `quality-setup` for the answer on committing alone and come
   back, because the commit script reads only that record, and otherwise nobody would ever ask
   about committing in a strategy already under way. If Setup is not done yet, the Setup item below
   opens it instead.
6. **If what the user said on opening shows something has changed** since last time, such as a
   stakeholder who can now be spoken for, someone new who matters, or a step they no longer want,
   open [where things stand](../../../references/where-things-stand.md) and record it as it says,
   because it also says which documents already written to bring up to date. Then run `status`
   again, because it knows only what has been recorded.

## Go by the line that starts `Next:`

- **Setup.** The user is new to the strategy, even if they have had an interview.
  1. Tell them briefly, in their preferred style, what they will have at the end, as the skill's
     opening says, that the steps come in an order, and that a simple strategy fits one session
     while a big one is better split across fresh ones. Explain what a strategy is for, and why the
     steps come in that order, when they ask, because a long explanation before they have said
     anything goes unread.
  2. If there is no saved arrangement, or it says the place is not agreed or does not say who the
     documents are for, or the folder is inside a repository, git does not ignore it and `status`
     shows `Commits: not recorded`, open `quality-setup`, follow it, and come back with the folder
     it agreed. Otherwise don't open it or read the arrangement back, because the arrangement is
     already settled.
  3. Record what they asked for, in their words, with `asked "<their words>"`, because `status`
     shows it to every later session; and if they have already said what is on their mind about
     quality, record it with `mind`, so that nobody asks them again.
  4. Record `step setup done`, because `quality-setup` does not record it, since it is also opened
     outside a strategy. Run `status` again and go by its `Next:` line.
- **Ask "anything on your mind about this project's quality before we start?"** First look at the
  Interview line of `status`.
  - A sitting saved and complete: don't ask, because they have said what is on their mind. Record
    `step interview done` with the sitting's date and run `status` again.
  - A sitting saved and unfinished: don't ask. Name `quality-interview` to pick it up, and record
    nothing, even if a summary is saved.
  - Otherwise ask. Record their words with `mind`, or `mind --nothing`, and run `status` again. If
    something is on their mind it names `quality-interview`: recommend it. If they would rather not
    have an interview, record `step interview skipped` and run `status` again.
- **A step, with its stakeholder if it has one.** That is the next step: name it with the command
  that starts it, as the harness page writes it. If `status` adds what they may do until it is
  finished, offer that too. If it says to show them the agent's draft of a step, that step's skill
  does that: name the step, and say the draft is there for them to correct.
- **Something to put right,** such as a missing record or a file to repair: do it, from the
  documents where they hold the answer, and run `status` again.
- **No step is left.** Say so. If the strategy is written up, its sections' next actions are where
  the work goes now: offer `priority-deepdive` for the priority they choose. If it stops at the
  priorities, offer the write-up, `connect-quality-strategy`. If `status` says to offer
  `quality-report`, offer it as well; if they do not want one, record `step report skipped`. A later
  release gets a strategy of its own, in a folder of its own agreed through `quality-setup`.

## Tell them

Say which steps are done, as `status` lists them, and anything the progress note says this session
should tell them. If `quality-setup` was opened in this conversation, begin with where the documents
will live, who they are for, what is known about who can reach the place, and whether the records
will be committed after each step, in the arrangement's words, and with anything setup handed back
for them still to hear about the place, because setup handed back without a word to them. Then name
the next step, and offer it as [going on, or a fresh
session](../../../references/stopping-and-coming-back.md) says. Unless they have just said what to
do next, wait for the answer before starting it.
