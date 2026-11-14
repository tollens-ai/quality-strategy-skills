# Changelog

All notable changes to the `quality-strategy` plugin, newest first. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/spec/v2.0.0.html); while the version is below 1.0, a minor
release can remove or replace skills. To pick up a new version in Claude Code,
run `claude plugin update quality-strategy@tollens` (or `/plugin update quality-strategy@tollens`
inside Claude Code).

## [0.5.3] - 2026-11-13

### Changed

- `quality-setup` says more exactly who can read your quality documents. Git shares them only once
  they are committed and pushed, and from then on anyone with access to where they were pushed can
  read every committed version. Anyone who can open the folder itself, for example on a shared
  machine or a synced drive, can read them as soon as they are saved.
- When your repository has many readers, `quality-setup` recommends keeping the documents, until
  you are happy for them to be read, in a `quality` folder in the project that git ignores, which
  means git never commits or pushes it. It used to recommend a folder outside the repository. The
  agent sets the ignore rule for you, in your own clone's exclude file, so no shared file changes.
- The agent asks whether it may commit the documents only where git can commit them. For a folder
  git ignores it does not ask, and tells you that nothing there keeps earlier versions.
- A new session finds the documents by itself only in a `quality` folder in the project, as
  before. If you keep them anywhere else, the agent now tells you this at setup, and tells you
  what to say when you come back so that it finds them. Documents you already keep elsewhere stay
  where they are and work as they did: name the folder when you start a session.
- When setup uses its own default for who the documents are for, the agent tells you it is a
  default, so that you can change it.
- When you go on without a stakeholder's view, the agent records which of three things you meant:
  nobody in the conversation can give the view, you have decided not to take it, or you will give
  it later. A view you decided not to take is no longer treated as missing or asked for again. The
  strategy says once that it was not taken, with your reason, and a priority that rests on that
  reason says so. You can change your mind at any time.
- When you say you would rather ask a stakeholder yourself, the questions stay yours. The agent no
  longer offers wording to send or a way of reaching them.
- The skills say "quality dimension", meaning a way the product can be better or worse for someone,
  such as reliability or ease of use, where they said "kind of quality".
- The README says what a whole strategy costs in time and tokens, and what the pack is designed to
  give you for it.
- In Claude Code, the agent asks an open question in its message. It shows a menu of options only
  for a question with a fixed set of answers, such as a rating.

### Fixed

- A rating you gave without a reason no longer gets "No reason given" written beside it in the
  strategy. The reason is left empty.
- A stakeholder's view that was left because nobody in the conversation could give it could be
  recorded as done. It is now recorded only as a view nobody here could give.
- `stakeholder-deepdive` settles where the documents are kept before it asks its questions. It
  could save your first answer before the place was agreed.
- At the end of the priorities step, the agent's check of the priorities table failed when run as
  the skill gave it, and reported every priority as lacking a section before any section had been
  written.
- When the agent suggests that the project owes something to people who are not yet stakeholders,
  it adds them to the project context only after it has put the suggestion to you. It could record
  them before you had seen it.
- The check of the written strategy no longer reports its version line as missing when the line
  wraps.
- The write-up and `priority-deepdive` no longer begin with a command that fails and is retried.
- The helper scripts print their usage for `--help`.
- The README said that `quality-strategy` offers to read your project's files. The project context
  step makes that offer.

## [0.5.2] - 2026-11-10

### Added

- A terms page, [TERMS.md](TERMS.md), and a link to it in the plugin manifest.

### Changed

- The plugin's icon is a PNG in place of an SVG.

## [0.5.1] - 2026-11-10

### Added

- A privacy page, [PRIVACY.md](PRIVACY.md). The plugin runs inside your own agent and collects
  nothing.
- A page for known issues, [KNOWN-ISSUES.md](KNOWN-ISSUES.md).
- Listing details in the plugin manifest for OpenAI's plugin directory: a name, a description,
  starter prompts, an icon, and links for support and privacy.

### Changed

- The README opens by saying what the plugin does and what you end up with, puts installing it
  next, and is shorter.
- This changelog is shortened to a list of changes for each version. The known issues that were
  in it moved to their own page, grouped by what to check, what it costs you and where to steer.
- The roadmap and the open questions are rewritten for someone new to the project.

## [0.5.0] - 2026-11-10

The strategy is now a set of steps, each a skill of its own, in place of one long interview, and
the plugin also runs in Codex. Most of the earlier skills are replaced; strategies they saved
remain readable.

### Added

- Three skills for the first steps of a strategy: `establish-project-context`,
  `stakeholder-deepdive` and `prioritise-release-quality`.
- `connect-quality-strategy` writes the strategy up straight after the priorities, with a section
  for each priority. A second agent reviews it before you get it.
- `priority-deepdive` works one priority further: what good looks like, how you will know, where
  it stands now and what to do about it.
- `quality-interview`, an open interview about what is on your mind. It saves a transcript, a
  record for each topic and a summary, and you can pause and resume it.
- `pre-read` reads a project's files and reports the major issues, what the tests cover and how
  friendly the code is to agents.
- `quality-setup` agrees once where the quality documents are kept, who they are for and whether
  the agent may commit them.
- `draft-strategy-steps` drafts steps without you and marks them as the agent's drafts.
- `quality-report` makes visual reports, a page to explore, and versions for a particular reader.
- A decision log, `decision-log.md`, records each change to the saved documents.
- A template for the written strategy, `references/strategy-template.md`.
- Codex support: it installs as a Codex plugin from the same repository.
- A package for OpenAI's plugin directory.

### Changed

- Node.js is now needed: `quality-interview` and the strategy steps use small scripts to keep
  their records.
- `quality-strategy` no longer runs the whole strategy itself. It says where your strategy stands
  and which step comes next.
- Stakeholders can be grouped, nested and overlapping.
- There is a fourth level for how a stakeholder would take a result: Ugh, meaning active dislike
  short of rejection, beside Delight, Good Enough and Dealbreaker.
- A stakeholder's view is recorded as your understanding of them, and what you do not know about
  them becomes an open question.
- You put the release's priorities in order yourself. The High, Medium, Low and None ratings are
  taken from your order, for you to correct.
- What anyone says about how good something must be is kept in their words.
- Records mark what you agreed, what you said, what the agent inferred and what it guessed.
- Open questions stay in the document they are about, each with a next action.
- When you do not know something, the agent asks how you could find out before it suggests a way.
- The agent asks one question at a time.
- `quality-strategy-review` reviews any quality document, not only a whole strategy.
- Reviews and reports work from partial records.
- The `effective-comms` plugin, 0.4.0 or newer, is needed alongside this one.

### Removed

- The single seven-part strategy flow and its required document layout. Strategies in that layout
  remain readable.
- Ratings and confidence levels that the skills assigned automatically, the scoring of reports,
  and the mandatory final review cycles.
- The separate list of accepted risks. An accepted risk is kept in the document it is about.
- The worked example, `examples/fernly/`.
- The skills in this table. Their source remains under `retired/` for reference.

| Removed skill | Use instead |
|---|---|
| `quality-artefacts`, `strategy-variants`, `operational-distillation` | `quality-report` |
| `test-strategy`, `evaluation-strategy`, `oracle-adequacy`, `tooling-strategy`, `tooling-adequacy`, `process-strategy` | `priority-deepdive`, one priority at a time. Detailed test planning and build plans are outside the plugin |
| `test-strategy-review`, `contradiction-check` | `quality-strategy-review` |

## [0.4.0] - 2026-07-10

### Added

- A choice of document structure when a session covers more than one release.
- `/quality-strategy` can recommend a change to how the team works as one of the actions in its
  plan.
- The context interview asks for a recent example of how human-led and agent-led work goes.

### Changed

- A non-goal names a level of quality the release is deliberately not reaching, not a feature
  that was deferred.
- Each quality dimension is scoped to a release, a stakeholder and a part of the product.
- How much a dimension matters is asked separately from how good it is now.
- Findings are grouped by theme when there are enough to group.
- When a stakeholder's bar could mean "once" or "every time", the skill asks which.
- The first question, where the document should live, says why it matters and recommends a
  private first pass.
- When you correct something, the skill re-reads the passage before changing it.
- Ideas you volunteer are tracked through the session.
- `/strategy-variants` no longer makes a variant from an unfinished strategy, and asks who a
  client-safe version is for.

### Fixed

- Internal and agent stakeholders are no longer skipped because they already appear in another
  role.

## 0.3.7 - 2026-06-26

### Added

- The strategy skills run `/effective-comms` on their documents before finishing.
- The review skills flag communication failures such as buried recommendations.
- The `effective-comms` plugin is a declared dependency.

## 0.3.6 - 2026-06-15

### Added

- Strategy documents name the version of the skill that produced them.

## 0.3.5 - 2026-06-12

### Changed

- `/quality-artefacts` describes its slideshow format in its own words, without another product's
  branding. No change in behaviour.

## 0.3.4 - 2026-06-11

### Changed

- `/quality-artefacts`, asked without a brief, opens a gallery of starting points.
- `/quality-artefacts` asks what tone you want when you have not said.
- `/quality-artefacts` puts the strategy's most striking finding in the title.

## 0.3.3 - 2026-06-11

### Added

- `/quality-artefacts` is offered when the strategy is complete.

### Changed

- `/quality-strategy` proposes each cut in scope and asks you to confirm it, instead of assuming
  it.
- `/quality-strategy` includes security, data integrity and runaway spending in the strategy by
  default. You can take one out only by accepting the risk explicitly.
- When agents do the work, `/quality-strategy` adds quality dimensions that matter to agents.
- Before calling a behaviour a defect, `/quality-strategy` asks what purpose it serves.
- Human and agent perspectives are considered for each dimension, and only meaningful differences
  are shown.
- The current state comes from results, tests and your own evidence before code reading.
- Each strategy skill says how to resume after a break.
- `/test-strategy-review` checks a strategy for notes about how it was produced that do not
  belong in it.

## 0.3.2 - 2026-06-11

### Added

- Revising a document archives the current version first.
- A revision revisits earlier concerns with evidence and looks for new gaps.
- A revision review asks for evidence behind each "fixed".
- The strategy skills say how far along you are, and offer a place to stop at the end of each
  part.

### Changed

- A strategy with many High ratings is no longer challenged for their number. Each High must be
  justified.

## 0.3.1 - 2026-06-11

### Added

- `/test-strategy`: exploratory testing and testing in production as named methods.
- `/quality-strategy`: a targeted design review where evidence is thin.
- Observability, fixability and recoverability in the list of quality dimensions.
- This changelog.

### Changed

- `/quality-strategy` treats a goal that is met as met, and no longer asks for more than the
  release needs.

## 0.3.0 - 2026-06-11

### Added

- `/quality-artefacts`, which designs a shareable SVG or HTML view of your strategy.
- `examples/fernly/`, a worked sample on a fictional plant-care app.

## 0.2.9 - 2026-06-11

### Added

- Interactions between features, in the list of quality dimensions.
- A standing search for defects by fresh agents, in `/test-strategy`.

## 0.2.8 - 2026-06-10

### Added

- First public alpha release: `/quality-strategy`, `/test-strategy`, `/tooling-strategy`,
  `/strategy-variants`, and their review and adequacy skills.

[0.5.3]: https://github.com/tollens-ai/quality-strategy-skills/compare/v0.5.2...v0.5.3
[0.5.2]: https://github.com/tollens-ai/quality-strategy-skills/compare/v0.5.1...v0.5.2
[0.5.1]: https://github.com/tollens-ai/quality-strategy-skills/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/tollens-ai/quality-strategy-skills/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/tollens-ai/quality-strategy-skills/releases/tag/v0.4.0
