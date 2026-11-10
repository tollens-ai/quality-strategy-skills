# Changelog

This page is written for people. The skills carry their own instructions and do not depend on this page.

All notable changes to the `quality-strategy` plugin, oldest at the bottom. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions are the plugin manifest's. To
pick up a new version, run `claude plugin update quality-strategy@tollens` (or `/plugin update
quality-strategy@tollens` inside Claude Code).

## [0.5.0] — 2026-11-10

This release replaces the single stepwise strategy walk with steps, each a skill of its own. You
can also start from the part you need: project context, one stakeholder's perspective or release
priorities. `quality-strategy` says where your strategy stands and which step is next;
`connect-quality-strategy` writes the strategy up straight after the priorities, with a section for
each priority, and `priority-deepdive` works one priority further at a time. The open-ended
interview remains the candid front door for concerns. Reports and reviews work from whatever records
exist, including partial ones.

The pack now installs and runs in Codex as well as Claude Code. Two parts use a small helper
that needs Node.js: the interview's record and the strategy's progress file.

This release ships with known issues, listed at the end of this entry with how the release was
checked and what was not.

### Added

- **The strategy steps**, in this order:
  1. `establish-project-context`;
  2. `stakeholder-deepdive`, once for each stakeholder;
  3. `prioritise-release-quality`;
  4. `connect-quality-strategy`, which writes the strategy up straight after the priorities;
  5. then `priority-deepdive`, one priority at a time, as often as you like.

  Each states its goal and when the work is done. Each accepts existing notes, interviews, older
  strategies or direct answers as input. `priority-deepdive` works inside a strategy, once it is
  written up.

  In a whole strategy, the release priorities come after the stakeholders' deepdives. If a view is
  still missing, you hear what the priorities would lack and choose whether to go on without it.
- **The strategy is written up straight after the priorities,** and is true and usable from then on,
  so you can stop there and take it away. It has a section for each priority not rated None (None
  means you decided it does not matter for this release), in four parts: what good looks like, how
  we will know, where it stands now and what to do about it. What the records already answer is
  filled in; everything else is a question in the section it bears on, ending in its next action;
  where a priority stands says how far short of its bar the evidence puts it, or why it cannot be
  judged against the bar yet, and what that puts at risk. The opening names whose strategy it is,
  says in a sentence or two whether the document is for you, then gives a short bottom line, your
  rules for the work and what to do first. Then come the project, with who does the work and how it
  is checked, how a release reaches people and the limits; the release; who matters, with what good
  enough, "ugh" and unacceptable mean to each of them; what this release will not do; the
  priorities; and the sections. It ends with notes for later releases and which pack version wrote
  it. People are called by their names or job titles. This shape, every heading with what its part
  is for, is one shared page, `references/strategy-template.md`; it is a guide, and a strategy can
  be shaped differently where that serves its readers better. Where the records support no
  statement, it becomes an open question, and each change the write-up makes to earlier records is
  in the decision log. You can run it again when you want the whole document read and checked.
- **What people say about how good something must be is kept as they said it.** At whatever step
  it is said, it is recorded in the speaker's words, with whose it is and what it was about, beside
  what others said, because choosing between them is yours. A priority's row holds what has been
  said about it, or says that nothing has been said yet, with the question to ask.
- **The strategy is checked before you get it.** A small script checks the mechanical parts, the
  writer reads it once more for anything the records hold that was lost, and then a fresh agent that
  did not write it, such as a subagent, reviews the whole strategy against its records. The
  hand-back says what that review changed and what needs you, and asks only what needs you first. If
  your tool cannot start a fresh agent in that session, you get the strategy marked as not yet
  reviewed, with the command to run the review in a new session.
- **`priority-deepdive`** works one priority's section further with you, so that someone can act on
  it, for the priority you name, whatever its place in the release's order. It needs a written-up
  strategy. It opens with what the agent understands of the priority and why it matters, then takes
  the four questions in order: what good looks like, including what would be more than this release
  needs; how we know how good it is; where it stands now and how we know; and what to do about it,
  which may be to find something out and plan again. The agent gives its own best answer to each,
  with how sure it is and how big it thinks the question is, so you can put it right. The priority's
  section is kept current as it is worked, and at the close a fresh agent reviews it and what it
  changed elsewhere, as the write-up's review does. A rating or bar found wrong, or two priorities
  that are really one, goes back through the priorities step.
- **`quality-interview` as a candid front door.** Before any substantive question it explains
  what will be kept and lets you choose a private or shared home. It saves a verbatim transcript,
  one record per topic and a closing summary. When you stop after saying something about the
  project, it reads back what it heard, then writes everything up once, with your corrections. You
  can also pause and continue later; saying goodbye after a pause leaves the sitting paused. A
  reply worded like an earlier one is still saved when it answers a later question.
- **`quality-report` as the single reporting skill**, covering visual reports, a page a reader can
  explore, audience-facing versions and operational summaries. A visual to share is offered as the
  last step of every strategy; what it shows and how it looks is left to the agent to design for
  your project. The page to explore is written by the agent for your project in the same way, from
  what its reader needs to be able to find. Reports compress the records for a named reader
  without rewriting the candid strategy or strengthening its evidence.
- **`pre-read`** reads a project's own files without changing them and gives three readings: the
  major issues obvious from the code and architecture, what the tests cover and do not, and how
  friendly the codebase is to agents working on it. Behind them is a sourced factual digest, with
  where sources disagree and what was not read. Major issues that could lose work or data, or break
  what existing users have, are told to you one by one; the project context and drafting without
  you tell them the same way.
- **`quality-setup`** agrees once, for a project, where its quality documents are kept and who they
  are for, says what it can about who could read them there, and saves that for every later
  session. Inside a repository it also asks once whether the agent may commit the records after
  each step; it never pushes. No other step asks: where no answer is saved, nothing is committed,
  and `quality-strategy` asks it on an older arrangement. It is short and comes before the first
  step.
- **A decision log.** The records and the strategy hold only what is true and useful for decisions
  now, each item with whose view it is and whether you have seen it. When something saved changes,
  it is changed in place, and one append-only file, `decision-log.md` in the quality folder, says
  what changed, when, why and whose change it was. No earlier wording is kept beside a correction
  and no dated copies are made: the repository holds earlier versions where the records are
  committed.
- **`draft-strategy-steps`** drafts steps without you, when you ask to skip ahead or to have steps
  or stakeholders done for you. It first asks you once whether to do the project context together,
  because a wrong context spoils every draft built on it. Each step is drafted in full and recorded
  separately as the agent's draft, every claim labelled with what it rests on, and a question the
  sources cannot answer is left open rather than filled. When someone else picks up saved work,
  their views are recorded as theirs and your pending decisions wait for you.
- **Codex.** The pack installs as a Codex plugin from the same repository, with a Codex
  marketplace file beside the Claude one. The skills name each other without a `/` or `$`, and the
  agent gives you the command in the form your tool uses: `/quality-strategy:<skill>` in Claude
  Code, `$quality-strategy:<skill>` in Codex.
- **A section for each tool.** What differs between Claude Code and Codex, such as how to put a
  question, how to write a command and where the plugin's folder is, is in that tool's section of
  one page, `references/harness.md`, which the agent reads for the tool it is running in.
  In Codex the agent asks each question in its message and ends the turn there, because Codex's
  question tools treat a question as optional and go on without the answer.
- **A package for OpenAI's plugin directory**, with its own copy of the `comms-prep` and
  `comms-review` skills from `effective-comms`, so it needs nothing else installed.
- Shared guides for discovering and separating quality dimensions, and for judging whether a
  strategy enables useful understanding and decisions.

### Changed

- **Stakeholders** can be grouped, nested and overlapping, with relationships to products, tools,
  workflows and outputs recorded separately. There is no fixed customer/maintainer split, and
  grouping does not imply shared expectations or priority.
- **Four stakeholder levels:** Delight, Good Enough, Ugh and Dealbreaker. Ugh captures active
  dislike or distrust short of rejection.
- **Each stakeholder's view is your understanding of them.** One deepdive records what you
  understand of a stakeholder: who they are, what matters to them, how good each thing must be for
  them and what comes first for them, in your words, as far as you can say, with what you have seen
  yourself. What you don't know becomes your open question about them, with how it could be found
  out; a view of a group you barely know is mostly questions, and that is a good result. Nothing
  you would be guessing is recorded as theirs, and no question is addressed to the stakeholder or
  tells you to ask them: how you find out is yours. The profile is saved as you go.
- **The release's priorities are yours, and may be left open.** You order the priorities with every
  view side by side, and the ratings are read from your ordering for you to correct. You are asked
  once what this release does not aim at, and why. How much each priority matters can stay open with
  how you could find out or decide, and the step still closes; talking it through with your agent is
  one way. The step no longer asks for a bar on every High priority or a list of limits: how good
  each must be is taken further in its own section. Stakeholder levels, obligations that come with
  the facts, and resource limits inform a rating but never set or cap it. Low does not mean
  optional: a Low-ranked item can still block a release, and people, not the ranking, judge
  readiness.
- **Every agent-written claim says where it came from.** Records distinguish what you agreed,
  what you said but haven't confirmed, what an agent inferred from cited evidence, and what it
  guessed. Nothing becomes your view until you have answered it, and silence is not agreement. The
  interview's importance field becomes the interviewer's labelled read, on a scale that can't be
  mistaken for your rating.
- **Interview records are Markdown**: `transcript.md`, `progress.md` and one file per topic under
  `topics/`. Topic records drop their mapping tags (remit, area, dimension, audience), which no
  later step read. Sittings saved by earlier versions can be read but not resumed.
- **Open questions stay where they bear,** in the record they are about, with tensions between
  stakeholders, unreviewed proposals and risks you have explicitly accepted kept visible there,
  replacing the separate accepted-risks list.
- **Every open question is yours,** whatever it is about. The agent asks first how you could find
  out, and suggests a way of its own, marked as its suggestion, only when you have none or yours
  would not tell you what you need. Where nobody has a way yet, the question says so. Where your way
  of finding out is to hear from someone, the closing message names the question in your words and
  drafts nothing for that person.
- **The pre-read says how each major issue is known:** seen running or only read. If you want one
  seen running, the agent runs it in a scratch copy and keeps the evidence.
- **Knowing, not only measuring.** There are many ways of knowing where a priority stands:
  measuring, reading the code, asking someone, watching someone use it, a trial, a report that
  reaches you regularly, your own judgment. How sure anything is, is written as how it is known: seen by whom,
  when and how, and what is missing. "We don't have this" is a finding.
- **Every open question that matters ends in a next action:** the very next thing someone could do
  to move it, small enough to do without more planning, with who could take it. There are no dates.
  A next action written down is not leave for the agent to carry it out.
- **The pack's examples are invented** for the point each makes, and carry no detail from the
  projects it was tested on.
- **Thinking comes before finishing.** A consequential assumption or tension is explained, and you
  can explore it, pause to think, or park it and move on.
- **What is noticed is kept, and you see it.** Before a step relies on what it was given, the agent
  asks what in it is missing, out of date, contradictory or taken for granted, its own assumptions
  included. What that finds, and anything else it notices beside the step's question, is kept as a
  line in your open questions when it is noticed: an assumption with whose it is, two sources that
  disagree, or something odd, asked as "is this intended?". You see these in the findings and in the
  strategy's open questions, without extra questions on the way. When the strategy is written up,
  what it rests on that you have not answered is in its open questions, and a decision the strategy
  is blocked on is named in its bottom line. Where what you say and a record differ, you see both
  side by side and decide which stands.
- **How far each view went is visible.** The priorities say which stakeholder views you kept brief,
  and the strategy says how far each view went.
- **Lighter conversations.** `quality-strategy` opens by saying what a strategy is for and why its
  steps come in the order they do. It asks whether anything about quality is on your mind and offers
  the interview when there is, then offers a pre-read of the project's own files before the
  questions start. Context has a quick path that asks only what the next step needs. Each turn
  carries one question at most. Project context asks one question about how work gets done and
  checked.
- **It is your strategy.** The agent can suggest as much as it likes and decides nothing for you.
  Something is part of the strategy only once you have seen it and answered; a "yes" to a long list
  settles none of it. Where you are unsure, a tentative answer marked as such is better than a gap,
  and you can come back to any part at any time. If you ask to skip ahead, `draft-strategy-steps`
  works out the skipped steps and records each one separately as the agent's draft. If you also say
  not to ask you, or that you will look later, the step you named is drafted too, for you to answer.
- **Four questions, one priority at a time.** What good looks like, how we would know, how good it
  is now, and what to do about it run across the steps. After the priorities they are asked of one
  priority at a time, in its section, never of every priority at once.
- **One step at a time.** Each step ends with your answer before the next begins. When things are
  simple the next step can go on in the same session; when a session has got big, the step
  recommends a fresh one, and the saved records carry everything forward. `quality-strategy` says
  where your strategy stands and names the next step. `connect-quality-strategy` writes the
  strategy up after the priorities. The skills and pack version that wrote a strategy are named at its end,
  leaving the opening to what the strategy says.
- **Coming back.** A question the last session left for you is never answered by assumption. If it
  blocks the work you came back for, or you have not said what that is, it is asked first, with the
  item it is about shown in full; otherwise it waits until that work is handed back. This holds
  whichever skill you come back to. A waiting question that its step no longer asks is taken out of
  the note, with a line in the decision log saying so. The strategy's status check now prints the
  progress note itself, under a line that sends the agent to the reference on coming back, which
  says whose question it is and how it is put, so the question is reached even when you ask for a
  report on records you name. What to do when someone comes back has a reference of its own.
- **Releases.** Context and stakeholder profiles are reused across releases, while each release
  keeps its own choices and their basis. Related releases can be developed together.
- **`quality-strategy-review` works on any quality record**, not only a whole strategy document. It
  reviews a strategy, or one context, stakeholder, priorities or priority-section document, on
  paper, against the understanding or decision it is meant for and at the scope it states. Of a
  whole strategy it asks whether it is useful, true, succinct and well communicated, checking it
  against its records and the strategy template.
- **Reviews and reports** accept focused and partial records without requiring proof of the
  workflow that produced them.
- **effective-comms 0.4.0 or newer is needed** when you install from the repository. Claude Code
  installs it as a dependency from its own marketplace (`tollens-ai/effective-comms-skills`), so an
  existing install is not duplicated; in Codex you add it yourself first, as the README shows. The
  skills use it before handing over what they write for people. Where your tool offers no
  `comms-prep` or `comms-review`, the agent says so once and does the checks the step itself names;
  it does not report a review that did not run.
- **Nothing raised before the priorities is lost.** Everything from the interview, the pre-read's
  major issues and the project context's concerns gets a home in the priorities: a row, an open
  question or something you said this release does not aim at. `connect-quality-strategy` follows
  each one to its home and checks it is still there.
- **Every skill says what it is for and what a good result looks like**, and the strategy works
  from that: what bears most on the release comes first. The whole pack is rewritten to read clearly.
- **What it took to run a check, and what it showed,** is kept beside the notes in
  `notes/evidence/`, so the check can be run again.
- **The interview's three parts are no longer listed as skills.** Choosing the next question,
  writing up topics and closing a sitting are now references inside the interview, so neither tool
  offers them as places to start.
- **Each step reads what it needs before it needs it.** Every way into the pack opens the page for
  the tool you are running in, Codex or Claude Code, before its first message, so a question is
  asked there in a way that waits for your answer. The startup reads that had become passing
  mentions are instructions again, and detail a step needs only at one point has moved, whole, to a
  file the step opens at that point. Rules a step acts on at one moment are each in a short file of
  their own, so the agent meets them at the top of what it opens: asking before a longer look or a
  check, helping you think first, one skill opening another, coming back, and writing a step's
  part of the strategy.
- **Fewer questions when the way on is clear.** If you want one answer saved in a file you named,
  that file is the place: nothing else is saved beside it except the evidence for any check the
  agent ran, and you hear in a line who could read it there. If you have named where a strategy's
  documents go, setup asks you nothing and you hear what was saved afterwards. When you don't know
  something in a deepdive, that line of questions ends and the question is written as yours, with
  how you could find out, or that no way has been chosen yet. A deepdive no longer asks at the start
  how far to go. The interview accepts a quotation whose words are in code formatting.
- **The interview suggests its questions and owes none.** What going badly or well would look like,
  and a second look at dealbreakers, are offered where they fit what you are talking about, not
  asked before you can stop. A question the agent wanted to ask and did not reach is kept in the
  summary as the agent's open question, not as one you left unanswered.
- **A question you decline is declined for that conversation.** It is not asked again in other
  words there, and the records keep it in your words, with any limit you gave such as "not
  tonight", rather than as a rule that later steps must not ask it. When you come back, the agent
  does not ask it again as its own question; a later step that has its own reason to ask it can. A
  question you decline in the interview now updates that topic's record, even one written before a
  pause. The interview's unknowns are what you said you do not know, not claims about what nobody
  knows.
- **The tool sections say only how to ask there.** The Claude Code and Codex sections no longer say what
  counts as one question or which questions wait; that is in the shared text, the same in both.
- **"We don't know" is a result at every step.** Each step now describes its result as a map of
  what is known and what is not, including "nobody has said what good looks like here". The bottom
  line of a strategy puts first what bears most on the release, whether a known fault or an
  unknown. A section can name a question nobody yet knows how to
  find out, with what rests on it, and a draft leaves a question open rather than filling it.

### Removed

- The stepwise Part 1–7 strategy flow, its per-step files and its required document layout.
  Strategies in that layout remain readable and need no conversion.
- Automatic High ratings, evidence classes, confidence ceilings, a separate confidence score for
  requirements, report scoring, and mandatory final review cycles.

### Retired skills

These skills are no longer available. Their source remains under `retired/` for reference.

| Former skill | Use instead |
|---|---|
| `quality-artefacts` | `quality-report` (visual report) |
| `strategy-variants` | `quality-report` (audience-facing version) |
| `operational-distillation` | `quality-report` (operational summary) |
| `test-strategy` | `priority-deepdive`; detailed test planning is outside this pack |
| `test-strategy-review` | `quality-strategy-review` |
| `evaluation-strategy` | `priority-deepdive`, which works out how we would know, one priority at a time |
| `oracle-adequacy` | `priority-deepdive`, which works out how we would know, one priority at a time |
| `tooling-strategy` | `priority-deepdive`, which works out how we would know, one priority at a time; build plans are outside this pack |
| `process-strategy` | `priority-deepdive`, whose next actions can change how the team works |
| `progress-story` | Ask your agent to compare two saved strategies; no skill does this in 0.5.0 |
| `plan-quality-measurement`, `assess-quality-gaps`, `plan-quality-work` | `priority-deepdive`, one priority at a time, after the write-up. These three asked their question of every priority at once. Their use on one quality question with no strategy goes with them: for a focused need, `quality-interview` puts a concern on record |
| `contradiction-check` | `quality-strategy-review`, which reads a document against its records and tells a contradiction apart from missing evidence |
| `tooling-adequacy` | `priority-deepdive`, whose step on how we will know asks whether the way a priority is measured is good enough, one priority at a time. For one question outside a strategy, no skill does this in 0.5.0 |
| `priority-analysis` | `priority-deepdive` for what to do first on one priority, and `prioritise-release-quality` to weigh priorities against each other. No skill in 0.5.0 compares other options against criteria |

### Known issues

These are known and not yet fixed. They are named here so that you know to look for them.

In the conversation:

- A whole strategy is a long conversation. Project context can ask again for a few answers you
  have already given, several tables in a row can go over the same items, some messages are long
  (one asked for 23 rows to be put in order at once), and rows are sometimes named to you by number
  rather than by what they say. Asked how much is left, the agent gives a rough time for the
  current step, not the steps still to come.
- The agent can tell you what it is doing rather than talk about your project, sometimes says the
  pack's own skill names, and can speak of you to you by name, as if of someone else.
- When you say you don't know something, the agent should ask how you could find out. Sometimes it
  skips that and records "no way chosen yet". If the answer matters, ask it to work out with you
  how you could find out.
- How finely the priorities are divided rests on your guidance. Any kind of quality can be broken
  into smaller kinds, and you do not want a deep dive for every one. The agent is prompted to split
  a row where one rating would hide a difference, but not to judge when rows have become too fine or
  are almost the same as each other, and we have not tested how well the models do this. See [what
  you need to do yourself](README.md#what-you-need-to-do-yourself).
- At the priorities step the agent asks you what this release will not aim at and suggests nothing
  itself. Ask it for suggestions if you want them.
- Outside the interview and the priority deep dive, nothing tells the agent that a side remark or a
  request to clarify is not your answer. We have not seen this go wrong, but check that what is
  recorded as your answer is one you gave.
- Some instructions still tell the agent how to do a step rather than what the step is for and a
  suggested way to do it, so an agent can follow a rule too literally. A pass over the whole pack
  is planned after this release.
- Starting a strategy for a new release when the folder already holds one for a previous release,
  especially one saved by an earlier version of the pack, has not been tested. You'll need to be
  clear and directive with your agent about what to do with the previous release's strategy.
- When the strategy is written up, the agent can tell you nothing is needed from you, though its
  own review found decisions that are yours, such as a correction to a bottom line you approved.
  Ask what the review found that needs you, and read the opening for anything you have not seen.
- The write-up can ask you something your own earlier words already answer, put as whether
  something is "part of the bar". Point it to what you said.
- A step can ask you something, or record it as open, that your project's own design documents
  already settle, because the pre-read reads them only in overview. In the one real sitting where
  this happened, the write-up's reviewer caught it before the owner read the strategy. If your
  project has a design document, tell the agent to check it before it asks you.
- The pre-read and the fresh-agent reviews are not cheap, and the agent does not say what they will
  cost: in one real sitting a pre-read offered as "modest" used about 160,000 tokens and the
  write-up's review about 180,000, by the agent's own count. Ask for a rough cost first if you are
  watching spend.
- At the close of a priority deep dive you can wait several minutes while the agent rewrites the
  priority's section, which it has kept as a running record of the conversation, updates the parts
  it changes elsewhere and has them reviewed.
- Coming back to a strategy costs some reading and a turn. The agent reads several pages before its
  first message; "continue" stops to ask whether to go on in this session; and the status lists the
  pre-read, which is optional, as "not started" above the step it names next.
- If an interview breaks off after the interviewer has asked something you have not answered, that
  question is not saved. When you come back, the interview asks about the same thing again from its
  record of the topic.
- The interviewer can read your reply back with a gloss of its own, said as if it were yours.
  Correct it; your exact words are in the transcript.

In what is saved:

- With context and stakeholder profiles but no release priorities, you get a report or a review,
  not a strategy document.
- Agents sometimes slip against plain instructions: a label left stale after you correct it, a
  record that still calls a question unanswered after you have answered it, a summary that states
  a cause its own saved evidence contradicts, or two entries merged so that an unknown is hidden in
  a report page. Check what you rely on against the records.
- An agent writing the strategy up can carry an earlier agent's reading, or its own assumption,
  into a section as a fact, such as how much of the owner's time the work has, or how often. The
  write-up's checks and its fresh reviewer catch some of these, but not every case. The notes hold
  each statement's source: check against them anything a decision will rest on. Review the output
  carefully before you act on it.
- The strategy can lose your strongest words inside a topic: a worry, a reason or a limit you gave
  can be missing from the section it belongs to, though the write-up checks for exactly this. Read
  each section for what you said that matters most there.
- Next actions can leave the thinking to you ("no way is chosen yet"), or say more must wait than
  really does. Ask the agent for a concrete next step for each.
- A rule the agent follows in the conversation, such as not pressing you on something again, can
  end up in your strategy as "do not ask again". Nothing stops you or the agent coming back to any
  part.
- Where nobody has said how good a priority must be, its assessment can stay "Unknown", even when
  what has been seen tells you something. Read what was seen, not only the word that sums it up.
- The written strategy is long and repeats itself, and can carry notes on how it was made that no
  reader needs. With Claude it can state your conditions for the release in several places, and
  the copies can drift apart: each belongs to a priority, so check the others against that
  priority's own section. No step yet rewrites the strategy shorter; [What you need to do
  yourself](README.md#what-you-need-to-do-yourself) says how to ask for that.
- An interview summary can be heavier than a short sitting needs: each worry given twice, and lines
  about record-keeping that serve no reader.
- If the interviewer reads its closing reflection back before the helper expects it, the saved
  state labels it a check-in. The transcript has the words.
- The helper scripts have rough edges. Two stakeholders cannot be merged by command, so the agent
  edits the list and the profile by hand; and the check on the written strategy can report a row as
  having no section when the row's name carries a tag in brackets, or miss the version line when it
  wraps. The agent works round these; they cost it a retry, not your records.

What the pack does not cover yet:

- The kinds of quality are not yet thought about as they are when agents do the work: readability,
  for example, treats code a person can follow and code an agent can follow as one thing. Split
  them yourself where it matters.
- The pack has no kinds of quality of its own for AI or other non-deterministic products, such as
  how results vary from run to run, drift over time, or how good an evaluation is. Name them
  yourself if your product needs them.

Safety and privacy:

- Security, keeping user data intact, and runaway spending are prompts in the strategy steps, not
  a checklist of safeguards. A strategy may not consider them if the conversation goes elsewhere;
  raise them yourself if they matter to your project.
- The pre-read tells you the major issues it finds, but which it leads with is the agent's
  judgment: in one run it told a missing value and not that a command deletes a configuration
  file. Read its full list.
- `quality-setup` tells you that anyone with access to the repository can read the records,
  though nothing is shared until they are committed and pushed. It has no case for a repository
  with no remote, or for a quality folder kept inside a repository but out of git, and nothing
  prompts the agent to look for your project's own rules on what may be written into quality
  records, or to keep private details out of them. Tell it your rules.
- Before handing over what it writes for you, the agent has it reviewed with `comms-review`. That
  review can pass a claim the evidence does not carry. Read each claim at the strength its label
  gives.

With Codex:

- With `gpt-6.1-sol`, the written strategy hedges almost every statement and uses process words of
  its own, and in some runs it never names or quotes you. The agent can take a weak way of finding
  something out as yours without saying why it would show little, its fresh reviewer can find
  nothing wrong, and at the end of a priority deep dive it can leave the saved plan unshown. Ask to
  see the plan, and read the strategy against what you said.
- The agent's progress lines can reach you twice, as it works and again in its final message.
- Asked to draft without you, the agent can skip the one question about doing the project context
  together first.

### How this release was checked

The text changed several times in the days before release, each time to fix what the runs below
showed, so each line says which text it was checked on. The strategy steps were last changed on
6 November, apart from the shared page on how the agent talks with you at each turn, which was
split out on 9 November. The interview was last changed on 9 November, after the sitting described
first below.

- **With a real person, on the text that ships.** From 7 to 10 November one of the authors took a
  project of her own through the route with Claude Code running Claude Opus 5.5: setup, the
  interview, the pre-read, the project context, six stakeholders' views (one first named partway
  through, and two merged), the release priorities, the write-up with its fresh-agent review, one
  priority deep dive and the start of a second. She found it worked well enough to release. We
  read the whole written strategy, both sides of every session and the agents' own notes, and found
  nothing that lost her words, blocked the route or put a wrong fact in front of her as settled;
  what we did find is among the known issues above. The interview she sat was the
  text of 7 November, which was then changed. No real person has used the pack with Codex, made a
  report, or gone back to a priority already worked.
- **The interview's changes of 9 November** answer what that sitting showed: a worry put as a
  question is kept and not answered, topics are not split into near-duplicates, a return after a
  break asks the one question owed, and the summary's writing review is offered, not run. They were
  reviewed as a design, as a script and as text, then run with simulated people on Claude Code
  (Claude Opus 5.5) and Codex (`gpt-6.1-sol`), with a priority deep dive on each, and read by two
  other agents; the last small reruns were read by one. They held. One case was not reached in a
  run and rests on the helper's tests: answering "nothing else" when nothing is left to ask.
  Three skills that no step of the route used were retired the same day.

- **On paper, the final text.** The last change keeps what anyone says about how good something
  must be in their words, with whose it is, wherever they say it, and has the write-up and the
  priority deep dive gather it from every record. It was reviewed three times as a design, and then
  as text: for whether it would help, whether each line can be carried out, how what one step saves
  reaches the steps that need it, duplication, faithfulness to the original sources and whether the
  meaning was kept, with its flows walked step by step with a hypothetical person. These reviews
  read the parts that changed, not every skill afresh. The two small problems they found were
  fixed. Two changes earlier that day, which make each condition on the release a priority's bar
  and leave "The release as a whole" only for what fits no one priority, were read on paper for
  whether they would help, with no material finding; the runs on the final text include them. The
  mechanical checks pass, as do the regression tests for the helpers.
- **The helper that checks the priorities' records** was changed late on 6 November, after the
  runs: it no longer tries to match stakeholders to profile files, and instead lists each
  stakeholder's status and the profile files with their headings for the agent to match. Three
  script reviews settled it; the last found no fault of consequence, and its two small points were
  fixed with tests. No simulated person has run it; it ran in the real sitting above.
- **With a simulated person, on the strategy steps as they ship.** On 6 November Claude Code running Claude Opus
  5.5, with Claude Sonnet 5.5 playing the owner of a fictional app, finished one stakeholder's view
  and set the release priorities, then, in a new session from where that left off, wrote the
  strategy up. Two other agents read both conversations and the saved records. They found the
  priorities useful and true to what the owner said, and the write-up honest and useful for most of
  its length; the faults they found are among the known issues above.
- **With simulated people, on the text earlier on 6 November.** Before the last changes, each
  tool took the same fictional app through the whole route from a clean start: Claude Code running
  Claude Opus 5.5, with Claude Sonnet 5.5 as the owner, in 117 exchanges over ten sessions; and Codex running
  `gpt-6.1-sol`, with `gpt-6.1-terra` as the owner, over eight sessions. Each went from the
  interview and the pre-read through the project context, the stakeholders, the priorities and
  the write-up to one priority deep dive and a page for another reader. Two agents read each run.
  The changes made later that day answer what these runs showed, mostly about how people's words
  on how good something must be were kept.
- **With simulated people, on earlier text.** From 4 to 6 November, the same fictional app went
  through the whole route on Codex (`gpt-6.1-sol`, with `gpt-6.1-terra` as the owner) and on Claude
  Code (Claude Opus 5.5, with Claude Sonnet 5.5), and its strategy was written up again and made
  into a social card and a slide deck. After each change in those days, the priorities, the
  write-up, a priority deep dive and its ideas, and a card were run again on both tools. Before
  that, Claude Sonnet 5.5 played the person through parts of a strategy with Claude Code running
  Claude Opus 5.5, and with Codex running `gpt-6-sol`, on text that was later rewritten. Runs show
  what an agent does with the text, not how the conversation feels to a person. No other agents or
  models have been tried.
- **On paper, earlier text.** In early November the pack was trimmed of repetition and other
  cruft, meant to keep each step's behaviour. Each of the fifteen skills was then read on paper for
  whether it still does its job, the owner reviewed the text by hand and edited it, and all fifteen
  skills and their references were read afresh for whether they would help and line by line for
  whether each line can be carried out. A bounded review traced whether the trim lost reasoning,
  against selected original sources. Before the trim, each changed skill was walked step by step
  with a hypothetical person, with separate reviews of faithfulness to the sources, whether each
  line can be carried out, readability and duplication. Each change since the trim was reviewed on
  paper before it was run.
- **Not run on the final text:** a report, card or deck, whose step now reads every record for
  what bears on the request; and, on Codex, anything but the interview and a priority deep dive.
- **Never run on any text:** a return to a priority already worked, a re-order, a priority rated
  None, or a new release started over an old strategy; the runs did not reach every branch of the
  route. `quality-strategy-review` has run only as the write-up's and the deep dive's fresh-agent
  review, never asked for by a person. The review of the trim traced
  selected reasoning and sources, not every removed line, and duplication across the pack and
  faithfulness to all the original sources have not been checked completely.
- **With a real person, earlier text:** the authors used earlier versions on a few of their own
  projects.

## [0.4.0] — 2026-07-10

This release keeps quality decisions scoped from the first question through the risk map. Releases,
stakeholders, and quality dimensions no longer blur together as the interview progresses.

### Added

- **Multi-release document structure, chosen once and honoured everywhere.** When a session covers
  more than one release with real detail, you're offered a choice up front — one document per
  release, light sections for the others in this same document, two releases worked in parallel at
  matched depth, or fully separate documents — recorded once where releases are laid out, and every
  later part of the interview reads that choice and organises itself around it. Content for a
  release other than the one in depth always goes to that release's own home and gets named back to
  you in half a line; it's never silently mixed into the release you're actively working on. This
  closes a real live-run miss where later-release material got folded into the current release's
  risk map.
- **A named "process-change" action.** The plan of work can now recommend changing how the team
  works — not just what gets built or tested — as its own first-class action type, with Part 1 kept
  as an explicitly revisable working basis rather than something silently rewritten after the fact.
- **Deeper capture of how the team actually works.** The context-setting interview now walks a
  concrete recent example of both human-led and agent-led work (who's delegated what, which agents
  and why, how work gets reviewed and gated, where a human stays in the loop) and asks, for each
  part of the process, both what's working well and what's friction — not just one pain point.

### Changed

- **Non-goals are quality bars, not restated roadmap deferrals.** A non-goal now has to name a
  quality bar this release is deliberately not reaching, not just repeat a feature that was already
  deferred elsewhere. A generator ("what would be beyond what this release needs?") is offered
  whenever the usual categories run dry, so a session doesn't close with a non-goals list that's
  really just a feature list in disguise.
- **The dimension inventory is release-scoped and stakeholder-scoped from the first pass.**
  Candidate quality dimensions are generated for the release in depth only — material that only
  matters for a later release gets routed to that release's own home instead of blurring into this
  release's list. Every dimension also now names who it's for and which part of the product it's
  about, so the same word ("usability," "reliability") can correctly mean different things for
  different audiences instead of collapsing into one vague row — the classic case being a developer
  tool where "usability" means something different for the tool's own users than for another program
  calling its API. That same scoping now survives all the way through the risk map: required levels,
  actual levels, and the final gap table all key on dimension *and* scope, evidence gathered for one
  surface is never treated as evidence for a different one, and every row carries its release
  explicitly whenever more than one is in play.
- **A clean separation between "how much this matters" and "how good it currently is."** Surfacing a
  quality dimension and judging its current state are different questions asked at different points
  in the interview, and the skill now actively guards against blending them — catching cases where a
  candidate axis is really a feature name in disguise, or where its stated importance quietly bakes
  in a verdict about whether it's currently good or bad. A related check makes sure findings noted
  for later investigation actually get picked up and resolved rather than mentioned once and
  dropped.
- **Findings are grouped by theme when there's a natural theme to group by**, instead of being read
  back as one long flat list — across the dimension and risk-map portions of the interview, once
  there are enough related items that grouping actually helps.
- **More precise handling of ambiguous stakeholder bars.** When it's unclear whether a stated bar
  means "just once" or "every time," the skill now asks rather than guessing — and that answer
  carries through into how strictly the required level is set and how the eventual gap is judged,
  rather than getting silently tightened or loosened along the way.
- **Session-start privacy handling.** The very first question — where should this document live —
  now states plainly, in the same breath, why it matters (so you can answer honestly) and
  proactively recommends a private first pass whenever the alternative would put a candid early
  draft in front of a wide audience, rather than mentioning the option neutrally and waiting for you
  to choose it yourself.
- **Corrections check whether the document was actually wrong before rewriting anything.** Revising
  an existing strategy now starts by re-reading the passage you're pointing at — sometimes the
  document already said the right thing and the mismatch was a misreading, in which case nothing
  gets edited, the relevant passages are simply shown side by side. A two-part actual state
  (confidently known on one part, genuinely unknown on the rest) is now recorded as the compound
  claim it is, instead of being flattened into one misleadingly average confidence level.
  New-release sessions can reuse a still-accurate pre-read scan instead of re-scanning from scratch
  when nothing in the repo's scope has changed, and always re-open a prior release's accepted risk
  for a fresh look when the facts behind it have moved on.
- **Ideas volunteered mid-interview are tracked all the way through, including when you act on your
  own idea later in the same session** — not just when a later, separate pass formally adopts it.
- **`/strategy-variants` won't produce a variant from an unfinished strategy.** Before generating a
  one-pager or a client-safe version, the skill now checks that the source strategy actually has
  real content in the sections that matter, rather than quietly generating a caveated document from
  a mostly-empty draft. Asking for a client-safe version now asks who it's actually for by name,
  rather than guessing an audience — and if the strategy's own stakeholder list can't supply a
  plausible outside reader, the skill says so instead of inventing one.

### Fixed

- **Internal and agent stakeholders no longer disappear because they already appear in a different
  role.** The same person or agent showing up as, say, a user doesn't excuse the interview from
  separately asking whether they're also the developer, the product owner, or on support — each
  capacity is checked independently, for humans and agents alike.
- **Non-goals stopped being just a restated feature-deferral list** — see "Non-goals are quality
  bars" above; this was the live-run bug that motivated it.
- **The dimension inventory stopped mixing releases together and losing scope precision** — see "The
  dimension inventory is release-scoped" above; this was the live-run bug that motivated it,
  extended (once a further live-run session hit the same gap one step downstream) to keep that
  precision intact through the entire risk map.
- **Surfacing a dimension's importance stopped quietly prejudging whether it's currently good or
  bad** — see "A clean separation" above; this was the live-run bug that motivated it. The fix
  catches the mistake in both directions: assuming something is broken is exactly as wrong as
  assuming it's fine.

## [0.3.7] — 2026-06-26

The communication gate now keeps QSS outputs usable for their readers. The previous release stamped
strategy docs with the skill version; this release wires the gate into the strategy producers and
reviewers and declares the ECS plugin dependency.

### Added

- **Effective Comms gate for QSS outputs.** `/quality-strategy`, `/test-strategy`, and
  `/tooling-strategy` now run `/effective-comms` before finalizing their user-facing documents. The
  gate checks whether the output works for its reader: no unexplained numbered references, no hidden
  author or scratch context, no retained rejected ideas unless provenance is the point, no leaked
  process history, no buried recommendation, and clear uncertainty.
- **Review backstops for communication failures.** `/quality-strategy-review` and
  `/test-strategy-review` now flag reader-facing failures their existing process-leak scans do not
  catch, including coordinate-before-name wording, retained rejected ideas, and buried
  recommendations.
- **Install-time dependency on the public ECS plugin.** QSS now declares `effective-comms ~0.1.0` as
  a Claude Code plugin dependency and resolves it from the public
  [`tollens-ai/effective-comms-skills`](https://github.com/tollens-ai/effective-comms-skills) repo.
  QSS does **not** vendor a copy of the ECS skill; there is one canonical ECS implementation. The
  `tollens` marketplace pins the dependency to `effective-comms--v0.1.0`.

## [0.3.6] — 2026-06-15

### Added

- **Version-stamped strategy documents.** Every generated strategy document now carries a header
  stamp naming the skill version that produced it — for example, `*Generated by the quality-strategy
  skill — quality-strategy-skills (tollens-ai) v0.3.6 ·
  github.com/tollens-ai/quality-strategy-skills*`. The stamp covers the durable strategy documents
  produced by `/quality-strategy`, `/test-strategy`, and `/tooling-strategy`, and follows the
  installed plugin version automatically. When a document is revised, its stamp is refreshed while
  the previous version remains visible in the archived copy. Derived one-pagers, client documents,
  and review reports remain unstamped because they are temporary views rather than the primary
  strategy record.

## [0.3.5] — 2026-06-12

### Changed

- Dropped the overt branded-story references from all user-facing surfaces (skill description,
  principle 7, the no-brief gallery, the multi-frame story preset, ROADMAP, the Fernly sample
  README). The preset is described on its own terms — a full-viewport frame-by-frame slideshow
  telling the strategy's arc — with no behaviour change. Generated artefacts inherit the skill's
  vocabulary, so this also stops the old branding appearing on rendered story frames.

## [0.3.4] — 2026-06-11

### Changed

- `/quality-artefacts`, **the gallery**: a bare invocation or "what can you make?" no longer guesses
  a default view — it opens a gallery with the **freeform describe-your-own path headlined above**
  the worked examples, which become **pickable starting points** (social card / risk heatmap /
  multi-frame roast-with-receipts story / interactive dashboard / radar). The presets stay starting
  points, never a menu: when the user **did** bring a brief, they are still never routing keys — the
  "worked examples, not a menu" doctrine is untouched for that path.
- `/quality-artefacts`, **register is elicited, never assumed**: when the ask carries no tone or
  register signal, the skill asks ("straight for stakeholders, or shall I roast you? — receipts
  either way") or folds register into the gallery moment, instead of defaulting to austere.
  Permission to want something fun, silly, or savage is granted **explicitly** — bland-in must not
  become austere-out; a roast stays grounded in evidence.
- `/quality-artefacts`, **revelation-led titles**: when the source document carries a
  never-realised-you-cared truth, the **title leads with it** (the revelation as the hero line, with
  the supporting stat beneath it). A generic framing title must not leave the revelation buried in a
  caption or implied by nearby facts.

## [0.3.3] — 2026-06-11

This release reduces status-quo bias and one-directional goal-tracing: the strategy no longer treats
the current state of the repository as evidence of user intent, and it traces risks in both
directions from the user's goals.

### Added

- **The non-goal protocol.** Scope cuts are now *proposed, never assumed*. A cut derived from
  "it isn't built" is tested forward against the stated goals and named events before it is
  proposed; an absence a stated goal demands is a gap, not a non-goal. Each candidate is named
  back with its one-line reason and confirmed before it enters the document. Batching cuts behind
  a single unexplained sentence is not enough.
- **Floors and default-in dimensions.** Safety-critical dimensions such as credential leakage,
  personal-data leakage, irrecoverable loss of entrusted data, legality, and blast radius enter
  whenever their factual predicate holds. Security, data integrity where user data exists, and
  unbounded spend where the system can spend appear by default and can be removed only through an
  explicit, eyes-open accepted risk. Silent inclusion is as wrong as silent exclusion.
- **Agent-driven workflows surface agent-facing quality dimensions.** A stated autonomous-agent
  workflow ("I just tell Claude what I want") now brings forward concerns such as diagnosability,
  observability, verifiable testability, and agent-readable context.
- **Counter-pressure before naming a behaviour a defect.** Before calling a behaviour a defect, ask
  what it protects. Where two dimensions pull in opposite directions, present both as a tradeoff
  for the user to arbitrate rather than naming one side a bug. A disconnected chess clock, for
  example, may protect the domain's fairness rule against disconnect-to-think cheating.
- `/quality-artefacts` is now **offered at the payoff moment** — alongside the other planning and
  reporting options when the strategy is complete, with a teaser when the risk map is complete.

### Changed

- **Audience reasoning stays useful and quiet.** Human and agent perspectives are considered for
  each relevant dimension, while only meaningful splits and genuine audience tensions are surfaced
  for the user. Neutral decisions no longer make the internal reasoning feel like a second
  interview.
- **Actuals come from evidence, not code-reading.** The actual-state pass starts with existing
  results and reports, then the tests, then the user's lived evidence, and uses code reading last as
  labelled inference with capped confidence. The tooling audit applies the same distinction.
- **Resume after a break is stated, never guessed.** Each strategy skill tells the user how to
  resume: run it again, and it reads the quality documents to continue from where the work stopped.
- **Time-empathy is grounded in the actual session.** Progress language acknowledges elapsed effort
  only when it is true of the current run.

- `/test-strategy-review` gains a **scaffolding-leak backstop**: it scans the whole strategy,
  including inherited content, for process-note commentary, dispatch or scratch narration,
  turn/sub-step lineage, and scratch-path citations in source notes. Its Dealbreaker prioritisation
  wording now matches the rule it applies: every Dealbreaker is addressed by a Tier-1 or Tier-2
  learning need, while a Dealbreaker dimension may also carry lower-tier needs.

## [0.3.2] — 2026-06-11

### Added

- **Archive before revision** across the strategy skills: updating an existing document first saves
  the current version to an archive named with its date, so revisions leave a before-and-after trail
  to compare and share.
- **Revisions look backward and forward.** They revisit prior concerns with evidence, look for new
  gaps without being anchored to the previous document, surface contradictions, and record the
  result in a section describing what changed. Fixing all known problems is not the same as being
  good now — the gaps may have moved.
- **Test-strategy revisions use the same disciplines**: they revisit prior learning needs with
  evidence and look for new learning needs rather than treating a closed list as complete.
- **Revision review checks the evidence for closure.** An unevidenced "fixed" claim is not accepted,
  and a revision that only closes old items without looking for new gaps is treated with suspicion.
- **Lighter, clearer sessions.** The strategy skills keep their depth tied to the user's stated
  goals, explain the route in plain words, show progress and an exit at each boundary, and ask how
  the user wants changes committed as work proceeds.
- **The delight north star.** The framework looks for revelations implied by the user's goals but
  not yet stated. The interview skills name those moments, and the artefact skill leads with them
  when a source document contains one.

### Changed

- **The Highs check re-aimed at justification** (alpha feedback): the rating-step, tiering, and
  review checks no longer push back on High-dominated distributions by count — by rating time the
  low-stakes material was already deliberately cut, so High-dominated is the expected shape. Every
  High must cite its stakeholder Dealbreaker bar; unjustified Highs are challenged individually; an
  all-justified result is stated plainly ("a genuinely high-stakes surface"). Vocabulary fixed
  throughout: **High = important, not in-trouble** — importance and current state are orthogonal
  axes. Anti-inflation guards remain for required *levels*, where inflation actually lives.

## [0.3.1] — 2026-06-11

### Added

- `/test-strategy`: **exploratory testing** and **testing in production** as named method classes
  (FRAMINGS #11) — run by an *exploratory tester*; testing in production means real users plus
  observability instrumentation covering the named risks and downsides; AI exploratory testing
  labelled *unproven — calibrate before trusting*.
- `/quality-strategy`: a **targeted design deep-dive** during risk-map actuals scoring (6.2) — the
  second touch of a two-touch design review, dispatched on exactly the thin-evidence areas, with
  test-coverage-vs-risk skew as a standing lens.
- `/quality-strategy`: **anti-overshoot** in required levels (6.1) — "goal is met" is a positive
  verdict even when the solution isn't long-term robust; record a future-release change note instead
  of gold-plating. Good-enough-on-purpose tradeoffs are recorded where stakeholder bars recombine
  (the 5.4 merge).
- Observability-web cross-links in the dimension reference list: observability serves debuggability;
  fixability (new entry) includes robustness against regressions; recoverability includes safe
  rollback.
- This changelog.

## [0.3.0] — 2026-06-11

### Added

- `/quality-artefacts`: generative shareable-artefact skill — describe the view you want and it
  designs a bespoke, self-contained SVG/HTML file from your strategy, poster-first, then scores
  itself against seven principles (three hard gates) before presenting.
- `examples/fernly/`: a complete worked sample on a fictional plant-care app — full strategy, test
  strategy, and three generated artefacts. One project's answers, not a template; doubles as the
  regression fixture for downstream skills.

## [0.2.9] — 2026-06-11

### Added

- Cross-feature interaction / flow completeness in the dimension reference list — the signature gap
  of systems built feature-at-a-time by agents.
- A standing fresh-eyes defect-recon learning need in `/test-strategy` — independent blind agent
  passes over the source, loop-until-dry.

## [0.2.8] — 2026-06-10

### Added

- First public alpha release: `/quality-strategy`, `/test-strategy`, `/tooling-strategy`,
  `/strategy-variants`, and their review and adequacy sub-skills.
