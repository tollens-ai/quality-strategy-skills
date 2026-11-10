---
name: pre-read
description: Read one or more software project repositories, without changing them, and write a digest with sources of what the files show - the major issues obvious from the code and architecture, what the tests cover and do not, a first reading of how friendly the codebase is to agents working on it, and what the project says about itself, how it is built and where sources disagree. Use before a quality strategy, planning, onboarding, due diligence or a handoff, when someone needs to understand a project as it is today.
---

# Pre-read

Read the project's own files before anyone is asked anything, and write down what they say, so
that the person is asked only what the files cannot answer and the later steps start from something.
In a strategy, the project context step runs this skill or at least offers it to the user. Used on
its own, it answers someone's question about a project as it is today.

## What a good pre-read gives

Above all, three readings, because they are what the person most needs from the files and
what they cannot easily see for themselves:

- **the major issues** obvious from the code and the architecture;
- **what the tests already cover,** and what they do not;
- **a first reading of how friendly the codebase is to agents** working on it.

Behind those: what the project says about itself, how it is built, where the sources disagree, and
what was not read.

All of it is your interpretation, with the source of each claim, so that the person can correct it
and a later step can check it, and it claims no more than what was read supports. It never answers
what only the person can: what the project is for, what the release must achieve, who matters and
what each of them needs, because a repository shows what a project does, not what it is for. The
digest does not rate or rank: saying something is an issue is your judgment, but how much it matters
is the person's to say, later, in the project context, the deep dives and the priorities. A
recommendation found in a source is reported as that source's. Change nothing in the project except
an output file the user agreed to.

**Done when:**

- the digest answers the agreed question as far as what was read allows, and says what was not read
  and how sure you are of each finding;
- when the code was in scope, the three readings are in it;
- when the user opened it themselves, they have been told the major issues, with which were only
  read and not seen running, and they have been asked what the pre-read got wrong.

## 1. Who opened it, and the question it answers

Work out first which of three ways the skill was opened, because where the digest goes and how the
skill ends depend on it.

- **Another skill opened it,** such as the project context or drafting without the user. Read what
  it asks, save where it says, and give it the digest, as [opening another
  skill](../../references/opening-another-skill.md) says.
- **The user opened it as a step of a strategy.** Find the quality folder with `node
  "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs" where`, then run `status` with
  `steps.mjs` beside it (`steps.mjs status --quality-dir <the folder>`). If it shows the pre-read as
  drafted, an agent made it without them: read the saved `pre-read.md`, not the project, and go
  straight to handing it over. Otherwise the digest goes in the quality folder as `pre-read.md`, so
  that the project context finds it. Before the first save, check who can read the folder in the
  arrangement that `quality-setup` saved; if there is no saved arrangement, open `quality-setup`
  first.
- **The user opened it on its own,** for a question of theirs. The digest goes in the conversation
  unless they name a file or folder for it.

When the user opened it, talk with them as [working on a
strategy](../../references/strategy-workspace.md) says. Start from what they have said: what they
want to understand, which repositories, and any documents or outside sources. State the scope you
will read and go ahead; ask only when something unclear could change the work.

## 2. Read the project

Open [reading the project](references/reading-the-project.md) before the first file. It says which
sources to list, how to read, what the three readings look for, and how to say how sure each finding
is.

## 3. Write the digest

Write it as [the pre-read](../../references/templates/pre-read.md) shows, with the three readings
first, so that they are not lost in the detail. When the user will read it directly, run
`comms-prep` before drafting and `comms-review` on the draft, because a digest its reader cannot
take in has not told them anything; when another skill opened it, that skill's step covers both.

Then read it as its reader would, and check it against the list of sources:

- it answers the question, or says what further evidence would;
- what is still unknown is said to be unknown; don't go back and read more only to fill those gaps;
- nothing claims more than was read, such as a source called read that was not opened, or a commit
  given as the version of a working tree with uncommitted changes.

## 4. Hand it over

When the user opened it, write one message:

- first, the major issues not yet told, as [telling the major
  issues](references/telling-the-major-issues.md) says;
- if the digest went to a file, the findings and gaps that bear on what they have said worries them;
  if it is in the conversation already, don't repeat its summary;
- last, ask what the reading got wrong, such as a part misread, an out-of-date document, a
  dependency the wrong way round, or a misleading count.

If they correct something that matters, correct the digest.

On its own, the skill is finished once that message is given. As a step of a strategy, wait for
their reply, because a step is done only once they have seen its result and answered; then record
`step pre-read done` and close as [stopping and coming
back](../../references/stopping-and-coming-back.md) says.
