# Set up

From the first message on, keep the user's exact words, because `start` saves the set-up exchanges
as they were said.

1. **Look for an earlier sitting.** Don't look into the project's quality yet. Look in the place the user
   named, or in the current repository's `quality/` folder. If they mean a sitting that cannot be
   found, ask where it is. If a quality folder exists, list its sittings with `status
   --quality-dir`.

   Find out here, once, whether this interview is part of a quality strategy, because the wrap-up
   records the interview as a step of the strategy only if it is. If another skill opened this one,
   it says so. Otherwise run `node "$PLUGIN_ROOT/skills/quality-strategy/scripts/steps.mjs" status
   --quality-dir <the folder>`: the interview is part of a strategy unless that reports that no
   strategy is recorded. Keep this answer until the wrap-up, also when a sitting is resumed. Nothing
   `quality-setup` saves along the way, such as the answer on whether the records may be committed,
   changes it.
2. **If an earlier sitting is unfinished,** name it briefly and ask whether to resume it or start
   a new one, unless the request already says.
   - To resume, follow [returning to a sitting](return-sitting.md) in place
     of the rest of set up.
   - Leave a completed sitting as it is.
3. **Read the saved arrangement,** if there is one: `.scratch/session-config.md` in the quality
   folder, which says where the project's quality documents go and who they are for. Only this
   file counts, because a folder existing doesn't say who should read the records.
4. **Decide how the opening message will end.** It has to settle where the records go and who they
   are for.
   - **The saved arrangement stands** when it records both where the records go and who they are
     for as agreed with the user, and, as far as the agent knows, who can read that place has not
     changed since it was saved. The opening message then says in one line where the records go
     and who they are for, as the saved arrangement has it, and ends with the first question. The
     user agreed to the arrangement when it was saved, and asking again would cost them a turn;
     they can still correct it, as step 6 says.

     An older arrangement may not yet hold a separate answer on whether the records may be
     committed, so check: if the folder is inside a repository and `node
     "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs" where --quality-dir <the folder>`
     shows `Commits: not recorded`, open `quality-setup` for that answer alone before the opening
     message. Pass the folder by name, because `where` on its own does not find a folder that holds
     only interviews. If the arrangement already gives the answer, `quality-setup` records it
     without asking, and the arrangement still stands; if it has to ask the user, the opening
     message ends as the next point says.
   - **Otherwise** it ends with what [`quality-setup`](../../quality-setup/SKILL.md) says first,
     because that skill agrees both with the user and saves them.
5. **Send the opening message:** about three sentences, then the ending just chosen. The sentences
   say:
   - that this is a conversation about what matters to them in the project's quality, which they
     lead and can steer or stop at any time;
   - that the agent keeps their exact words in a transcript and writes a summary to work from
     later;
   - that how long it goes on is up to them: a handful of questions or twenty, and they stop when
     they are done. Give a rough guide to the length all the same, because the check-ins refer back
     to it.

   If the saved arrangement stands, call `start` before sending it, as step 7 says, and end it with
   the first question, as step 8 says. Otherwise open `quality-setup` for the ending, follow it,
   and bring the arrangement back here.
6. **If they correct the place or who the records are for,** open `quality-setup` for the change,
   because it is the one skill that saves the arrangement, and come back here.
7. **Call `start`** once the place, who the records are for and the rough length are known
   (`--help` gives each field):
   - `audience.reason`: who the records are for and why, in the arrangement's words, with anything
     not known about who has access.
   - `pacing`: the length as the agent stated it, and whether the user accepted it or let it stand
     without comment.
   - `turns`: the set-up exchanges in order, as actually said, those from `quality-setup`
     included, ending with the user's reply that settled set up. When the saved arrangement
     settled set up and the opening ends with Question 1, there are none, and `record` saves
     Question 1 with the first reply. If they mentioned a concern during set up, give it a topic
     on that turn.

   If it refuses because a fact is really missing, ask that set-up question again rather than
   inventing a default.
8. **Ask the first question** when `next` marks it; when the saved arrangement settled set up, that
   is at the end of the opening message. Show its label, `Question 1`, and ask one question only.

   If `quality-setup` was opened in this conversation, begin the message with one line saying
   where the records will go, who they are for and what is known about who can reach them.
   `quality-setup` leaves this line to the skill that opened it. Saying it here, in the message that
   asks Question 1, rather than in a set-up turn of its own, keeps `turns` ending with the user's
   reply.

   - If they have already said what is on their mind, earlier in this conversation or as the
     strategy's `steps.mjs status` shows, give their words back to them and ask them to say more
     about that. Do this in place of the fixed words, even though the helper's hint
     says to ask them word for word.
   - Otherwise ask:

     > When you think about this project right now, what’s on your mind?

     It leaves them free to start anywhere (a worry, something they are proud of, a relationship,
     a half-formed feeling, something the agent did not know to ask about), so they get the
     widest first chance to be heard.
