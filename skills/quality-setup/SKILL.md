---
name: quality-setup
description: Agree once, for a project, where its quality documents are kept and who they are for, and save that so every later session finds it. Use before the first step of a quality strategy or interview on a project, or to change where its documents live.
---

# Quality setup

**Goal.** Settle once where this project's quality documents live, who they are for and, inside a
repository, whether the agent may commit them after each step, so that no later session has to ask
again or guess, and so that the user chooses knowing who could read them.

**Done when.** The place, who the documents are for and the answer on committing are saved where
every skill looks for them, and the user has been told what was saved, by this skill or by the one
that opened it.

Before your first message, read your tool's section of [the harness page](../../references/harness.md),
and talk as [each turn](../../references/each-turn.md) says. Where the documents
live and who reads them is the user's to decide: recommend a place and say why.

## Who can read a place

Whenever a place is recommended or changed, say what applies from this list, because the user
chooses on the basis of what they are told here:

- Anyone with access to a repository can read what is in it.
- A folder outside the repository avoids that, but is not private just by being there.
- Copies already shared stay readable after the documents move.
- When the repository has many readers, recommend a first pass kept outside it, to move in once
  they are happy for it to be read.
- Outside a repository, nothing keeps earlier versions of the records, so the decision log is the
  only trail of what changed.

Never promise that only the user can read the documents, because the agent cannot check who has
access. Keep who the documents are for apart from who could read them: the first is what the user
wants, the second a fact about the place. If the place does not suit the readers they want, say so
and settle it before saving, because later sessions save there without asking again.

## Agree the place and save it

1. **Find the quality folder:** the place the user named, or else the one `node
   "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs" where` finds, or else a `quality/`
   folder in the project. If there are several likely places and they named none, ask which.
2. **Look for an arrangement already saved,** in `.scratch/session-config.md` inside that folder.
   - If there is none, go to step 4.
   - If it says the place is not agreed, or does not say who the documents are for, nobody settled
     that with the user. Tell them what it says and what was never settled, then go to step 4.
   - If the place and who the documents are for are settled, the folder is inside a repository, and
     `records.mjs where --quality-dir <the folder>` shows `Commits: not recorded`, only the answer
     on committing is missing. Name the folder in that command, because `where` without it does not
     find a folder that holds only interviews. When the arrangement's Commits line plainly gives the
     user's answer, to commit after each step or not to, record it with step 7's `commits yes` or
     `commits no` without asking, because they have already given it, and go to step 8. Otherwise go
     to step 6 for that one question.
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
     step 6.
   - If they have not named one, lead with a recommendation, so they can accept it in a word. Ask
     who the documents are for when the answer could change the place; otherwise say who the agent
     takes them to be for, so they can correct it. After each answer, ask only what is still
     missing.
5. **If documents are already saved and the place changes,** ask whether to move them. If yes, move
   the whole quality folder, so that later sessions find the documents and what is recorded as done.
   If no, the existing place stays the home until they are ready, because a strategy kept in two
   places is split and a later session finds only half; note in the arrangement where they want to
   move it, so a later session can offer the move again.
6. **Ask once about committing,** when the quality folder is inside a repository: may the agent
   commit the quality records after each step from now on? Ask it directly, as a go-ahead, because
   the repository then keeps every earlier version and no copies are needed, and say that nothing
   would be pushed or shared. Skip this when an answer is already chosen and they have not asked to
   change it; if they give an answer while changing something else, take it and don't ask again.
   Outside a repository, ask nothing.
7. **Save the arrangement** in `.scratch/session-config.md` inside the quality folder, leaving any
   interview settings in the file alone. Creating the folder does not give you permission to share or
   publish what goes in it.

   ```markdown
   # Standing quality-records arrangement

   - Home: <the quality folder> (<how the agent knows>)
   - Audience: <who the documents are for> (<how the agent knows>)
   - Commits: <commit the records after each step, or don't, or no repository> (<how the agent knows>)
   ```

   In each pair of brackets, write how the agent knows: "they chose it: <their words>", or "a
   default the agent described and they left", because later sessions read it to tell the user's
   choice from a default. If the user accepts that nobody knows who has access to the place, say so
   on the Audience line.

   Inside a repository, also record the answer on committing, because the commit script reads
   only this and never the arrangement's prose: `node
   "$PLUGIN_ROOT/skills/quality-strategy/scripts/steps.mjs" commits yes --quality-dir <the folder>`,
   or `commits no`. A later "stop committing" or "commit as you go" comes through this skill and
   changes both, as a change of place does.
8. **Hand back.**
   - If another skill opened this one, give it the folder, who the documents are for, the answer on
     committing and how each is known, and go back to it, as [opening another
     skill](../../references/opening-another-skill.md) says; it says what was saved in its next
     message.
   - Otherwise say where it was saved, who the documents are for, what is known about who can read
     the place and whether the records will be committed, in the arrangement's words; where access
     is not known, say so or say nothing about it. Then stop, naming no next step, because the user
     decides what follows.
