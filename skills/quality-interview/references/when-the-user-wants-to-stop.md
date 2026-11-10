# When the user wants to stop

Find the row for the point at which they asked to stop. It says how to record their reply, if at
all, and what happens next.

| When they stop | What follows |
|---|---|
| Before `start` | No interview files are saved. Tell the user that none were made and that anything they said is only in this conversation. The one exception is where the records go and who they are for, if `quality-setup` has already saved that. |
| Questions, nothing said about the project yet | Record the reply with `choice: "end"`; the sitting stays unfinished. Tell them there is nothing yet to carry forward, and that next time starts again from the first question. |
| Questions, something said about the project | Record the reply with `choice: "end"`, then read and follow [wrapping up](wrap-quality-interview.md). |
| They need to leave and want to continue later | Record the reply (`answered: false` if it leaves a numbered question unanswered; `choice: "unclear"` if a check-in or the reflection is waiting), then follow [pausing](return-sitting.md). |
| During the wrap-up | Follow wrapping up. Save anything unfinished with `pause`, and tell the user what is done and what is not. |
