# Check-ins

A check-in offers a real choice, in the agent's own words, between wrapping up now and keeping
going. If they leave the choice to the agent, keep going, keep the topics as they are, and say
they can stop at any time. There are three kinds.

- **At about the length mentioned at the start** (`offer: "checkin"`), when `next` says
  `checkin`. If `notes.md` says they asked for no more check-ins, don't offer it, even when `next`
  says so: carry on asking. Otherwise say the conversation is at about the length mentioned at the
  start. If they then ask for no more check-ins, write that in `notes.md` and carry on asking.
- **At a natural pause** (`offer: "seam"`), such as a move to a new topic. There is always one at
  the end of the first round of broad questions, and later there can be one where it fits.

  At the end of the first round, don't sum up: list the topics so far, one short line each in the
  user's words, and ask which they would like to go into. If they choose none, that is a choice
  to wrap up. If they say some topics are one, carry on under the id of the one they named first,
  and include each joined topic in that reply as `closed`, with `next: "joined into <id>"`.
- **When the conversation has run out of steam** (`offer: "exhaustion"`), as choosing the next
  question describes. Say that it seems so to the agent, which may be wrong, and that carrying on
  loses nothing recorded so far. If they carry on without naming a topic, ask what feels
  unfinished.
