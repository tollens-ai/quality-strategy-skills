# Known issues

These are the faults and limits we know of in the current release, with what to do about each.
They come from use of this version on a real project and from runs with an agent playing the user,
in Claude Code and in Codex. If you hit something that is not here, please
[tell us](https://github.com/tollens-ai/quality-strategy-skills/issues).

## Check before you rely on a strategy

- **An agent can state its own interpretation as if it were a fact.** This can happen when it
  writes the strategy up, and its checks and the second agent's review do not catch every case.
  Each section says what it rests on. Check anything a decision will rest on against those sources.
- **Something can be left out of date after you correct it:** a heading, or a note that still
  calls a question unanswered after you have answered it. If you rely on a document, check that it
  reflects your latest answer.
- **Your strongest words can go missing.** A worry, a reason or a limit you gave can be absent from
  the section it belongs to, though the write-up checks for exactly this. Read each section for
  what you said that matters most there.
- **The agent can tell you nothing is needed from you when something is.** After the strategy is
  written up, the second agent's review may have found decisions that are yours. Ask what the
  review found that needs you, and read the strategy's opening for anything you have not seen.
- **A condition can be written in several places that drift apart.** Something you require of the
  release, such as "no data is lost on upgrade", can appear in the summary at the top, in the
  table and in its priority's section, worded differently each time. Go by the priority's own
  section, and check the other places against it.
- **Which issues the agent tells you about after reading your files is its judgment.** In one
  case it told the user about a missing setting and not about a command that deletes a
  configuration file. Read the full list in the digest it saves, not only what it says in the
  conversation.
- **A priority can be marked "Unknown" when something is known.** Where nobody has said how good a
  priority must be, its section can sum up where it stands as "Unknown" even though the same
  section describes what was seen. Read the section, not only the word that sums it up.
- **"Do not ask again" can end up in your strategy.** The agent is told not to press you on
  something twice in one conversation, and can write that down as a rule. Delete the line if you
  see it. Nothing stops you or the agent coming back to any part.

## What it costs you

- **A whole strategy is a long conversation,** several hours for a real project, and some messages
  are long. The agent sometimes describes its own work, or names things by number or by a skill's
  name. Ask it to say what it means in plain words.
- **Reading your files and reviewing the strategy use a lot of tokens,** and the agent does not say
  how many beforehand. In one real use each took well over 100,000. Ask for a rough cost first if
  you are watching spend.
- **There are waits.** At the end of a priority deep dive the agent rewrites the section and has it
  reviewed, which can take several minutes. When you come back to a strategy, the agent re-reads
  the documents and may ask whether to carry on before it resumes.
- **The written strategy is long and repeats itself,** and an interview's summary can be longer
  than a short interview needs. No step yet rewrites either shorter. The
  [README](README.md#what-you-need-to-do-yourself) says how to ask for a shorter strategy.

## Where you may need to steer

- **The agent can skip asking how you could find something out.** When you say you do not know,
  it should ask how you could find out. Sometimes it writes "no way chosen yet" and leaves the
  thinking to you. Ask it to
  work out with you how you could find out, and for a concrete next step.
- **The agent can ask you something that is already answered,** by what you said earlier or by
  your project's own design documents, which it reads only in overview. Point it to the answer. If
  your project has a design document, tell the agent to check it before it asks you.
- **How finely the priorities are divided is up to you.** The agent splits a priority where one
  rating would hide a difference, but does not judge when they have become too fine. The
  [README](README.md#what-you-need-to-do-yourself) says what to aim for.
- **The agent suggests nothing itself about what the release will not aim at.** It asks you. Ask
  it for suggestions if you want them.
- **In the interview, the agent can read your answer back with a gloss of its own.** Correct it.
  Your exact words are in the transcript.
- **Asked to write the strategy before the priorities are set, the agent gives you a summary of
  what exists, not a strategy.** Set the priorities first.

## Not covered, or not yet tried

- **Quality for agents and for AI products.** The pack offers a list of kinds of quality to
  consider, such as readability. The list does not yet separate what a person needs from what an
  agent needs, for example code a person can follow and code an agent can follow. It also has
  nothing for products whose results vary from run to run, such as AI features. Add those
  yourself where they matter.
- **Security, keeping user data intact and runaway spending are not guaranteed a place.** The
  agent is told to consider them, but a strategy can miss them if the conversation goes
  elsewhere. Raise them yourself if they matter to your project.
- **Where the documents are kept.** `quality-setup` tells you that anyone with access to the
  repository can read them. In fact nothing is shared until you commit and push. If your
  repository has no remote, or you keep the folder out of git, the skill has no ready answer and
  the agent improvises, so say what you want. It also does not look for your project's own rules
  about what may be written down, so tell it those.
- **Four paths have never been run:** starting a new release where the folder already holds an
  earlier strategy, going back to a priority you have already worked through, changing the order
  of the priorities afterwards, and working on a priority you rated None. If you take one, check
  the result closely and tell us how it went. For a new release, tell your agent whether to keep
  the earlier strategy beside the new one, archive it, or build on it.
- **Other agents have not been tried.** The pack has been used in Claude Code and Codex only. It
  needs an agent that can read and write files on your machine, so we do not know whether it
  works in ChatGPT.

## With Codex

- **With `gpt-6.1-sol` the written strategy hedges almost every statement,** and in some runs it
  never quotes you. At the end of a priority deep dive it can write the plan into the strategy
  without showing it to you. Read the strategy against what you said, and ask to see the plan.
- **Drafting without you can start from the wrong place.** When you ask the agent to draft steps
  while you are away, it should first ask whether you want to do the project's context together,
  because every draft builds on that. With Codex it can skip the question. Say at the start which
  you want.
