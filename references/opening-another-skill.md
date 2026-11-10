# Opening another skill

A step may open another skill to do one piece of its work. The step that opens it says what it
wants back and carries on with the result, because that step is still the one talking to the user.
The skill it opened does its piece of work, gives the result back and stops. It does not close the
conversation, name a next step, save a progress note or run a comms review of its own.

If the opened skill runs in the conversation, it asks the user its own questions. A subagent cannot
ask the user anything, so the step that opens one asks the user beforehand for what the work needs,
and afterwards asks the questions the subagent would have asked. Wait for a subagent as [the harness
page](harness.md) says, and before it starts tell the user what they will get and roughly when. If
they want to hear what is being read, tell them before it starts and again as each finding comes in.
Work that is made of the user's answers, such as setup, is never handed to a subagent.
