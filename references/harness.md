# Running in Codex or Claude Code

Read the section for the tool you are running in. It says how to do, in that tool, what the rest of
the pack asks for; what is asked, decided and recorded is the same in every tool. Other tools have
no section here, and in them [each turn](each-turn.md) says all you need. In every tool, nothing
runs between turns, so wait for a subagent within the turn that started it.

## Codex

**Questions.** A question ends the turn and waits for the answer, which in Codex's terms makes it a
required question: put it in your final message and end the turn there. Do not ask through
`request_user_input` or `request_user_input_async`, because Codex treats both as optional: it goes
on after a short wait with an assumption of its own, and turns the question into choices to pick
from, so the work goes on without the person's answer in their own words.

**The line before a tool call.** Codex shows the person the line you write before a tool call. On a
turn that will take more than a minute, make it the sentence saying what they will get and roughly
when, because it is the first thing they read. Otherwise write no such line, because the person
has to read past it every time.

**The command for a step** is `$`, the plugin's name, a colon and the skill's name, such as
`$quality-strategy:establish-project-context`.

**A fresh agent** for a review is a worker started fresh, not a fork that carries this
conversation's turns, because a fork reads with the writer's reasoning.

**The plugin's folder.** When Codex puts one of this pack's skills into the turn, it shows that
skill's path; `$PLUGIN_ROOT` is the part before `skills/`.

## Claude Code

**Questions.** `AskUserQuestion` shows each item with a few options and room for an answer in the
person's own words, takes up to four items in one call, and waits for the answer, so it ends the
turn as a question should. The options are answers to pick from, so use it only for a question that
[each turn](each-turn.md) says can be asked directly, such as a rating, or for the same such
question about each of a set of items. Ask an open question in your message, because options under
it would put your words on record as the person's. Ask about a set of more than four items as each
turn says.

**When Claude Code asks what you are doing,** mid-turn, answer about their project: what they will
get next, or how much longer it will be if you have said that already.

**The command for a step** is `/`, the plugin's name, a colon and the skill's name, such as
`/quality-strategy:establish-project-context`.

**A fresh agent** for a review is a subagent, which starts from the brief you give it.

**The plugin's folder.** `$PLUGIN_ROOT` is `${CLAUDE_PLUGIN_ROOT}`; if that is not set, Claude Code
shows a base directory with each skill of this pack, and `$PLUGIN_ROOT` is the part before
`skills/`.
