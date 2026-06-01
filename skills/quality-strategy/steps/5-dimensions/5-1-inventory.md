# Sub-step 5.1 — Dimension inventory (raw)

## Goal

Produce the **consolidated raw inventory** of dimensions to consider for the first release: the bottom-up list (from stakeholders, design, release purpose) reconciled against a top-down reference-list pass run by a subagent.

The inventory at the end of this sub-step is **raw**: composite dimensions ("performance" as a single label) may still be present, and trap dimensions ("readability") have not yet been checked for agent-vs-human framing. Those refinements happen in sub-steps 5.2 (Unpack) and 5.3 (Old/new-world). This sub-step focuses on coverage: did we get all the dimensions we should be considering?

## What you need from the previous sub-step

Read all of Parts 1–4 from `quality/strategy.md`. The release purpose (Part 2), stakeholders and three-lens (Part 3), and non-goals (Part 4) are direct inputs to which dimensions matter. Read the **Design observations and likely-relevant dimensions** section of `quality/pre-read.md` — subagent C already surfaced design-implied dimensions.

## The work, in order

### 1. Bottom-up candidates (silent)

Generate a candidate dimension list from what's already in the strategy doc and pre-read:

- For each stakeholder dealbreaker and good-enough in Part 3, ask: *"what dimension does this concern map to?"* Map to standard -ility names where one fits; use domain-specific names where they're clearer.
- For each design observation in the pre-read's design section, take the implied dimensions surfaced by subagent C.
- For the release purpose in Part 2, ask: *"what does this purpose require?"*

Build the bottom-up list internally. Don't surface to the user yet.

### 2. Top-down candidates (subagent)

Dispatch a subagent to walk a reference list of standard quality -ilities and check each against the project context.

Use the `Agent` tool with `subagent_type: general-purpose`. The brief:

> You are extending a quality-strategy dimension inventory by walking a reference list of quality -ilities and checking each one against the project context. The main agent has already produced a bottom-up dimension list from stakeholder concerns and design observations; your job is the top-down pass to spot dimensions the bottom-up missed.
>
> First, read `$PLUGIN_ROOT/PHILOSOPHY.md` and `$PLUGIN_ROOT/skills/quality-strategy/SKILL.md` to ground yourself in the framework.
>
> Then read `$PROJECT_DIR/quality/strategy.md` (Parts 1–4) and `$PROJECT_DIR/quality/pre-read.md` for full context on the project — what it is, who matters, what's been excluded, what the design looks like.
>
> Walk this reference list of quality -ilities. For each, decide whether it might matter for the **first release** of this project:
>
> - Functional correctness
> - Performance (and its sub-dimensions: scalability, resource consumption, elapsed time, UX responsiveness, jitter)
> - Reliability, resilience, recoverability, availability
> - Security, privacy
> - Usability, accessibility
> - Diagnosability, debuggability, observability
> - Maintainability, extensibility, testability
> - Deployability, operability, portability, interoperability
> - Data integrity, compliance, auditability
> - Documentation, ramp-up-ability
> - Reproducibility, forecastability
> - Cost efficiency
> - Internationalisation and localisation
> - Agent-friendliness, context-efficiency, human-attention-efficiency (new-world dimensions)
>
> For each, classify as one of:
> - **Clearly relevant** — the project context shows direct stakeholder concerns or design implications for this -ility.
> - **Probably relevant** — there's a plausible reason this matters but it's not directly evidenced.
> - **Borderline** — could matter, but only in a future release or for a stakeholder not currently being served.
> - **Not relevant** — actively excluded by non-goals or clearly outside the release purpose.
>
> For each Clearly or Probably relevant -ility, write one line on *why* it matters for this project's first release, citing what in the strategy or pre-read suggests it. Skip Borderline and Not-relevant ones in the output unless the borderline case looks especially worth flagging — don't pad.
>
> Output format: a markdown list of relevant -ilities with their classification and one-line reason.
>
> Do **not** consolidate against the main agent's bottom-up list — that's the main agent's job. Just produce the top-down check.

### 3. Consolidate

When the subagent returns, **first save its returned top-down list verbatim** to `quality/.scratch/5.1-dimension-scout.md` — the sealed-dispatch scratch file `/quality-strategy-review` audits (see SKILL.md → "Sealed-context dispatch and scratch files"). Then reconcile against the bottom-up list:

- **In both lists** — keep, take the better-reasoned justification from either.
- **Bottom-up only** — keep; these emerged from real project context.
- **Subagent only** — for each, surface to the user as a question: *"The reference-list pass flagged X as Clearly Relevant because [reason]. Should it be in the inventory?"* Don't include silently; don't drop silently.

The user resolves subagent-only candidates.

## How to interview through this

The pattern is: long stretches of agent work, short stretches of user input.

1. Generate bottom-up candidates (silent).
2. Dispatch subagent for top-down pass (silent until it returns).
3. Surface the consolidated list back to the user. Ask: *"From the bottom-up plus the reference-list pass, the candidate dimensions are X, Y, Z. Anything we should add? Anything that doesn't actually matter?"* Adjust based on user input.

You have explicit permission and encouragement to:

- Push back when the user wants to drop a Clearly-Relevant subagent candidate without reasoning.
- Add a dimension the user surfaces that neither bottom-up nor subagent caught.
- Note tensions or surprises in the inventory; they'll matter in subsequent sub-steps.

What you must not do:

- Treat the subagent's list as authoritative — it's a backstop, not a verdict. The user resolves subagent-only candidates.
- Use the reference list as a checklist with the user. The reference list belongs to the subagent's brief, not to the user-facing interview.
- Skip the consolidation step. Subagent-only candidates need explicit user input to add or drop.

## Push back when

- The user wants to drop a Clearly-Relevant subagent candidate without reasoning. *"The reference-list pass flagged X as clearly relevant — what makes it not?"*
- The candidate list is much shorter than the project warrants. *"This is a complex project; the inventory looks thin. What might we be missing?"*
- The user adds many dimensions without grounding any in stakeholder bars. *"What's driving this addition — a stakeholder bar, a design observation, something else?"*

## This sub-step is DONE when

- [ ] A bottom-up candidate list has been generated from Parts 1–4 and the pre-read.
- [ ] The dimension-scout subagent has been dispatched and returned a top-down candidate list, saved verbatim to `quality/.scratch/5.1-dimension-scout.md`.
- [ ] The two lists have been consolidated, with subagent-only candidates explicitly resolved (added or dropped) by the user.
- [ ] The raw inventory is captured with a one-line reason for each dimension.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field, naming actual files referenced (not blank, not placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 5.2 (Unpack pass).

## Output

Append to `quality/strategy.md`:

```markdown
## Part 5: Quality Dimensions

### Raw inventory (first release, pre-refinement)

| Dimension | One-line reason it matters | Source |
|---|---|---|
| <name> | <why this matters for this release> | <stakeholder bar / design observation / reference-list backstop> |

This inventory is **raw** — sub-step 5.2 will unpack composite dimensions; sub-step 5.3 will check trap dimensions for agent-vs-human framing. The inventory will be refined and replaced by the end of 5.3.

**Sources consulted from pre-read:** <bullet list>

**Subagent dispatched:** dimension-scout for top-down reference-list pass (scratch: `quality/.scratch/5.1-dimension-scout.md`).

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines (highlighting any subagent-flagged candidates the user added or dropped, and any tensions noted), and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 5.2 (Unpack pass)?"*
