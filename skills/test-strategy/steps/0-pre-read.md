# Sub-step 0 — Pre-read

## Goal

Produce a short working digest at `quality/test-pre-read.md` covering two things:

1. The risk map and plan of work from `quality/strategy.md`. This is the spine of the test strategy — every learning need traces back to it.
2. An inventory of existing test infrastructure in the project (what's there, what shape is it in, what gaps are obvious).

The digest is a working artefact. It informs the rest of the skill but does not appear in the produced test strategy.

## What you must not read

**Do not read source code.** This is non-negotiable. See FRAMINGS.md #3 — independence of perspective is load-bearing for testing. If you read source before producing the strategy, you'll test against the builder's mental model rather than against what stakeholders need.

The temptation is real. The agent's reflex is to load context. Resist it. The strategy is your context.

If you find yourself unable to make sense of the strategy without code grounding, stop and ask the user: *"I don't fully follow [specific point] from the strategy. Can you clarify in conversation?"* The user clarifying is fine. You reading the source is not.

## What to read

1. **`quality/strategy.md`** — focus on:
   - **Part 5 (Quality Dimensions)** — what dimensions matter, with H/M/L/None ratings.
   - **Part 6 (Risk Map)** — required vs actual levels, confidence on both, per dimension. This is the most important input to the whole skill.
   - **Part 7 (Plan of Work)** — what actions the strategy already proposes. Some will be testing; some will be fixing; some stakeholder. The test strategy operationalises the testing actions and may surface new ones.
   - **Part 3 (Stakeholders)** — three-lens analysis, especially Dealbreaker entries. Tier-1 learning needs often come from here.
   - **Part 4 (Non-goals)** — what we're explicitly *not* doing, so the test strategy doesn't accidentally test it.

2. **Test infrastructure inventory** — a quick filesystem pass, no code reading:
   - `test/`, `tests/`, `spec/`, `__tests__/` — does this directory exist? How many files? What's the apparent shape (unit / integration / e2e)?
   - `.github/workflows/`, `.gitlab-ci.yml`, `circleci/` — does CI exist? What does it run?
   - `Makefile`, `package.json` scripts, `justfile`, `pyproject.toml` — are there test commands defined? What are they called?
   - Any `TESTING.md`, `CONTRIBUTING.md`, `docs/testing*` — existing test documentation?
   - Test-related config files: `jest.config.*`, `playwright.config.*`, `pytest.ini`, etc. — what's configured?

   For the inventory, look at filenames, directory structure, and config — not source. You're answering "what testing apparatus exists?", not "what is being tested?".

## How to ask

This sub-step is mostly a read-and-record operation, with one user-facing question.

After producing the digest, ask the user: *"Anything missing from this picture? Test infrastructure I wouldn't have spotted, or context about why it's the way it is — e.g. 'we deleted the test suite last quarter because it was slowing us down'?"*

You're hunting for the off-paper context: prior decisions about testing that shaped the current state but aren't in the repo.

## What you must not do

- Read source code (see above).
- Re-derive the risk map from scratch. The strategy is the source of truth for risk; if it seems wrong, that's a `/quality-strategy` revision, not a /test-strategy patch.
- Treat existing test infrastructure as a starting point that must be preserved. Sometimes the right test strategy says "the existing tests don't address what matters — start over." Inventory tells us what's there; it doesn't dictate what should be.
- Skip the inventory because the strategy is enough. Existing infrastructure is real signal — what tests have been written reflects what the team has previously thought worth testing, which may or may not align with the risk map.

## Push back when

- The user wants you to dig into the codebase to "understand it better." *"For test strategy, code-reading contaminates perspective. The strategy is the input. If something there is unclear, let's clarify in conversation."*
- `quality/strategy.md` is missing Part 5 or Part 6. Stop. Direct to `/quality-strategy`. The test strategy can't be produced without a risk map.
- The strategy has a risk map but every entry is `?`. The test strategy needs at least *some* prioritisable entries. If everything is unknown, the answer is to start with sub-step 0 of /quality-strategy's Part 6 work — not /test-strategy.

## This sub-step is DONE when

- [ ] `quality/test-pre-read.md` exists with two sections: **Risk map summary** (one paragraph per H/M dimension, naming required/actual/confidence/gap) and **Test infrastructure inventory** (filesystem pass, no source).
- [ ] Plan of work items are listed with classification noted (testing / fixing / stakeholder), so sub-step 3 knows which to operationalise.
- [ ] Non-goals from Part 4 are listed verbatim — they bound the test strategy and feed sub-step 5.
- [ ] The user has been asked about off-paper context (deleted suites, abandoned approaches, "we tried that and it didn't work") and any answers are captured.
- [ ] No source code has been read.

If any check fails, return to the work. Do not move to sub-step 1.

## Output

Write to `quality/test-pre-read.md`:

```markdown
# Test strategy pre-read

*Working digest produced by sub-step 0 of /test-strategy. Informs the rest of the skill but is not part of the strategy itself.*

## Risk map summary (from quality/strategy.md Part 6)

For each H or M dimension:

**<dimension name>** — Required: <level + confidence>. Actual: <level + confidence>. Gap: <description>. Notes: <anything that hints at testing approach>.

## Plan of work — testing-classified items (from Part 7)

- <action>: <one line, with reference to the dimension(s) it serves>
- ...

## Non-goals (verbatim from Part 4)

- ...

## Test infrastructure inventory

**Existing test directories:** <list with file counts and apparent type>
**CI:** <what's configured, what it runs>
**Test commands:** <from Makefile / package.json / etc.>
**Testing docs:** <any found>
**Test config:** <key config files spotted>

## Off-paper context (from user)

- <prior decisions, abandoned approaches, anything that wouldn't be visible from the repo>
```

After writing, summarise back to the user in 3-4 lines (what's there, what's notably absent, anything surprising). Then run a **correctness check** — at this stage you only want factual errors, not implications or priorities:

> *"Skim this for anything factually wrong — a risk-map row I summarised incorrectly, test infrastructure I misread or missed, a non-goal I copied wrong. I'm not asking whether the priorities are right yet — just whether anything here is simply inaccurate."*

Fix any factual errors (re-read the relevant strategy section if a risk-map summary is off). Then ask: *"Ready to move to sub-step 1 (Purpose)?"*
