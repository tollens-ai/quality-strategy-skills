# Roadmap

This page is written for people. The skills carry their own instructions and do not depend on this page.

## Current release — modular strategy

The full quality strategy is split into steps, each a skill: project context, a deepdive for each
stakeholder, release priorities, and the strategy written up straight after the priorities with a
section for each priority. Each priority can then be worked further, one at a time, with
`priority-deepdive`.
`quality-strategy` explains what a strategy is for and why its steps come in the order they do,
and says which step is next. A simple strategy can go on in one session; a big one is better split
across fresh ones.

The pack installs and runs as a plugin in both Claude Code and Codex.

The release incorporates corrections from the authors' own use on real projects:

- a short workflow question;
- four stakeholder levels, including Ugh;
- High, Medium, Low or None ratings for the release, given by the strategy owner after each
  stakeholder's view of what comes first for them, in their own words;
- visible open questions and tensions;
- provisional work, with correction on return.

Low-ranked work remains worthwhile and can still block a release; rankings inform human judgment.

The most recent work is about whose strategy it is. An agent can suggest a great deal, but the
strategy has to be its owner's. The agent decides nothing for them, and follows the steps even when
it thinks it can guess the answers. It keeps four activities apart: what good looks like, how we
would know, how good it is now, and what to do about it.

Earlier versions of the instructions were reviewed on paper step by step and rehearsed in parts
with simulated users. The text as it ships was trimmed after those runs: it has been read on paper
and its fixes walked step by step, and one simulated user has been taken through it, but it has not
yet been used by a real person. Agents differ in
how closely they keep to the instructions; [the release notes](CHANGELOG.md#how-this-release-was-checked)
say which agents the pack was tried with and what was checked.

Known limits: a whole strategy is a long conversation, and the pack has been used by few people
besides its authors.

## Next release — an explicit default strategy

Provide a provisional software quality strategy so useful actions can be proposed before full
discovery. Pre-read, interview findings, and strategy discussion refine its assumptions, with
their sources and how well established they are kept visible. Interview discovery remains
independent of the defaults. The current modules can already work provisionally from supplied
context; they do not yet supply that default strategy.

## Later

Real use will guide further changes, including shorter conversations, support for nondeterministic
products, report refresh, and larger projects. The pack remains skills people fit into their own
working practices.
