---
name: quality-setup
description: Agree once, for a project, where its quality documents are kept and who they are for, and save that for every later session. Use before the first step of a quality strategy or interview on a project, or to change where its documents live.
---

# Quality setup

**Goal.** Settle once where this project's quality documents live, who they are for and, where git
can keep them, whether the agent may commit them after each step, so that no later session has to
settle it again or guess, and so that the user chooses knowing who could read them.

**Done when.** The place, who the documents are for and the answer on committing are saved where
every skill looks for them, and the user has been told what was saved, by this skill or by the one
that opened it.

Before your first message, read your tool's section of [the harness
page](../../references/harness.md), and talk as [each turn](../../references/each-turn.md) says.
Where the documents live and who reads them is the user's to decide: recommend a place and say why.

## Who can read a place

Whichever way a place comes to be settled, say what applies from this list while the user can
still act on it, because they choose, or keep their choice, on the basis of what they are told
here:

- Git shares the records in a repository only when they are committed and pushed. From then on,
  anyone with access to the place they were pushed to can read every version that was committed.
  If a repository with no remote is pushed or published later, everything committed until then
  goes with it.
- A folder outside the repository, or one git ignores, is never pushed, but nothing there keeps
  earlier versions of the records, so the decision log is the only trail of what changed.
- Whoever can open the folder itself, for example on a shared machine or a shared or synced drive,
  can read the records as soon as they are saved, whether or not it is in a repository.
- Copies already shared stay readable after the documents move.
- A new session finds the documents by itself only in a `quality` folder in the project. When they
  are kept anywhere else, the user has to name the folder each time they come back, so tell them
  what to say.
- When the repository has many readers, recommend a first pass in a `quality` folder in the project
  that git ignores, because a new session finds it there. Once they are happy for it to be read,
  the ignore rule comes out and the records stay where they are.

Never promise that only the user can read the documents, because the agent cannot check who has
access. Keep who the documents are for apart from who could read them: the first is what the user
wants, the second a fact about the place. If the place does not suit the readers they want, say so
and settle it before saving, because later sessions save there without asking again.

## Agree the place and save it

Open [the arrangement](references/the-arrangement.md) first: it says how to lay out what is saved,
record the answer on committing and make git ignore a folder.

1. **Find the quality folder:** the place the user named, or else the one `node
   "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs" where` finds, or else a `quality/`
   folder in the project. If there are several likely places and they named none, ask which.
2. **Look for an arrangement already saved,** in `.scratch/session-config.md` inside that folder.
   - If there is none, go to step 4.
   - If it says the place is not agreed, or does not say who the documents are for, nobody settled
     that with the user. Tell them what it says and what was never settled, then go to step 4.
   - If the place and who the documents are for are settled, the folder is inside a repository,
     git does not ignore it, and `records.mjs where --quality-dir <the folder>` shows `Commits: not
     recorded`, only the answer on committing is missing. Name the folder in that command, because
     `where` without it does not find a folder that holds only interviews. When the arrangement's
     Commits line plainly gives the user's answer, record it with the arrangement page's command
     without asking, because they have already given it, and go to step 8. Otherwise go to step 6
     for that one question.
   - Otherwise go to step 3.

   If `where` shows an answer on committing as recorded, that answer stands even if the Commits
   line says otherwise, because the line may be older; only the user changes it, through step 6.
3. **Check the saved arrangement with them,** unless the skill that opened this one has already
   told them what it says and they have said what to change. Tell them what it says and where it came
   from, and ask what they would change. If nothing, go to step 7 only to record the answer on
   committing if it is not recorded yet, then to step 8. If only committing, go to step 6. If the
   place or who the documents are for, go to step 5.
4. **Recommend a place and say who could read it there.**
   - If they have named the place, there is nothing to ask about it. Ask who the documents are for
     only when the answer could change the place; otherwise use the agent's default and go on to
     step 5. The message that says what was saved tells them what applies to the place and that
     who the documents are for is the agent's default, so that they can change either.
   - If they have not named one, lead with a recommendation, so they can accept it in a word. Ask
     who the documents are for when the answer could change the place; otherwise say who the agent
     takes them to be for, so they can correct it.
5. **If they chose a folder for git to ignore,** make git ignore it now, as the arrangement page
   says, before anything below. **If documents are already saved and the place changes,** ask
   whether to move them. If yes, move the whole quality folder, so that later sessions find the
   documents and what is recorded as done. If no, the existing place stays the home until they are
   ready, because a strategy kept in two places is split and a later session finds only half; note
   in the arrangement where they want to move it, so a later session can offer the move again.
6. **Ask once about committing,** when the quality folder is inside a repository and git does not
   ignore it: may the agent commit the quality records after each step from now on? Ask it
   directly, as a go-ahead, because the repository then keeps every earlier version and no copies
   are needed, and say that nothing would be pushed. Skip this when an answer is already chosen and
   they have not asked to change it; if they give an answer while changing something else, take it
   and don't ask again. Anywhere else, ask nothing, because git would commit nothing there. When
   they want git to keep a folder it ignores, take the ignore rule out first, then ask.
7. **Save the arrangement** in `.scratch/session-config.md` inside the quality folder. Lay it out as
   the arrangement page says, leaving any interview settings alone, and record the answer on
   committing, when there is one, with its command. A later "stop committing" or "commit as you go"
   comes through this skill and changes both, as a change of place does.
8. **Hand back.**
   - If another skill opened this one, give it the folder, who the documents are for, the answer on
     committing, how each is known and anything from the list they have yet to hear, and go back
     to it, as [opening another skill](../../references/opening-another-skill.md) says; in its
     next message it says what was saved and what they have yet to hear.
   - Otherwise say where it was saved, who the documents are for, what is known about who can read
     the place and whether the records will be committed, in the arrangement's words, and anything
     from the list they have yet to hear. Then stop, naming no next step, because the user decides
     what follows.
