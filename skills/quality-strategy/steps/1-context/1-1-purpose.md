# Sub-step 1.1 — Product purpose

## Goal

Capture the product's purpose in language the user recognises. By the end of this sub-step, anyone reading the strategy can understand what this project is for, what this version of it does, and where it is heading longer-term.

## What you need from the previous sub-step

Read `quality/pre-read.md`. The digest will likely contain a hypothesis about the product's purpose; that is your starting position for the interview, but it is not the answer until the user has confirmed (or corrected) it.

If `quality/pre-read.md` does not exist, return to sub-step 0 and run the pre-read first.

## What to cover

By the end of this sub-step the strategy doc must capture:

1. **The product's purpose** — the problem it solves, expressed not as a feature list but as a "what would the world look different if this product existed" statement. One to three sentences.
2. **The immediate goal of this version** — what scope is in vs out for the version being built right now.
3. **The longer-term ambition** — where this is heading, if different from the immediate goal. (If the user says it is the same, capture that and move on.)

## How to ask

Phrasing is yours. Match the user's conversational register — terse if they are, conversational if they are. Don't read off a script.

Start by surfacing what the pre-read inferred: *"From the README, this looks like X — is that close to right?"* Refine based on the user's answer. Don't accept their first framing if it is a feature list — reframe toward the problem being solved.

You have explicit permission and encouragement to:

- Dig into anything the user says that seems interesting or under-specified.
- Reframe questions if your first attempt didn't land.
- Skip ahead briefly if the user volunteers something you would have asked later (e.g. naming a stakeholder while describing purpose), then circle back.
- Ask "why does that matter?" follow-ups when the answer is too abstract.

What you must not do:

- Move on to the next sub-step until all three items above are clearly captured (or explicitly flagged as `OPEN QUESTION` with a one-line description).
- Fill in answers the user has not given. If the longer-term ambition is unclear, ask. Do not guess based on the immediate goal.
- Accept a feature list as the product's purpose. The purpose is the problem being solved; features are how. Push back.

## Push back when

- The product purpose is given as a feature list. *"What problem are those features solving?"*
- The purpose is so abstract it could describe any project ("we want to make great software"). *"Specifically, who would be unhappy if this didn't exist?"*
- The user describes the immediate goal and longer-term ambition as identical without examining the question. *"Is the longer-term goal really the same, or is this version a stepping stone?"*
- The user describes the longer-term ambition in marketing language. *"In concrete terms — what does the product do for someone in two years that it doesn't do today?"*

## This sub-step is DONE when

- [ ] The product's purpose is captured as a problem-solved statement, not a feature list.
- [ ] The immediate goal is concrete enough that you could decide whether a candidate feature is in or out of scope.
- [ ] The longer-term ambition is captured (or explicitly noted as identical to the immediate goal, with the user having confirmed they considered the question).
- [ ] Any items where the user said "come back to that" are recorded as `OPEN QUESTION:` lines in the strategy doc.
- [ ] Pre-read sources are cited in the section's evidence field, naming actual files referenced (not blank, not placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 1.2.

## Output

Append the following to `quality/strategy.md`. If the file does not exist, create it with the header below before this section.

```markdown
# Quality Strategy: <project name>

*Last updated: <YYYY-MM-DD>*

## Part 1: Context

### What we're building and why

**Purpose.** <one to three sentences expressing the problem solved>

**This version.** <what's in scope for the immediate version>

**Longer-term ambition.** <where this is heading, or "as above" if identical>

**Sources consulted from pre-read:** <bullet list of files the agent or subagent referenced for this sub-step>

**Assumptions made:** <bullet list of any assumptions the agent had to make to proceed; "none" if there were none>

**Open questions from this sub-step:** <bullet list of `OPEN QUESTION:` items, or "none">
```

The `Sources consulted`, `Assumptions made`, and `Open questions` lines are evidence of how the work was done. They are checked by `/quality-strategy-review` at the end. Do not omit them.

Once the section is written, summarise back to the user in 3–5 lines and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 1.2 (Team)?"* Do not proceed without that confirmation.
