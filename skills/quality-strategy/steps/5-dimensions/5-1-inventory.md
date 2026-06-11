# Sub-step 5.1 — Dimension inventory (raw)

## Goal

Produce the **consolidated raw inventory** — the full list of quality dimensions to consider for the first release. It comes from two passes merged: a bottom-up list (from stakeholders, design, release purpose) and a top-down reference-list pass run by a subagent.

The inventory at the end of this sub-step is **raw**: composite dimensions (several things under one label, like "performance") may still be present, and trap dimensions (like "readability", whose meaning shifts by audience) haven't yet been checked for agent-vs-human framing. Those refinements happen in sub-steps 5.2 (Unpack) and 5.3 (Old/new-world). This sub-step focuses on coverage: did we get all the dimensions we should be considering?

## What you need from the previous sub-step

Read all of Parts 1–4 from `quality/strategy.md`. The release purpose (Part 2), stakeholders and three-lens (Part 3), and non-goals (Part 4) feed directly into which dimensions matter. Read the **Design observations and likely-relevant dimensions** section of `quality/pre-read.md` — subagent C already surfaced design-implied dimensions.

## The work, in order

### 1. Bottom-up candidates (silent)

Generate a candidate dimension list from what's already in the strategy doc and pre-read:

- For each stakeholder dealbreaker and good-enough in Part 3, ask: *"what dimension does this concern map to?"* Map to standard -ility names (the conventional names for non-functional quality attributes — reliability, usability, maintainability, observability, and the like) where one fits; use domain-specific names where they're clearer.
- For each design observation in the pre-read's design section, take the implied dimensions surfaced by subagent C.
- For the release purpose in Part 2, ask: *"what does this purpose require?"*
- **Agent-driven workflow → the agent-facing cluster.** A stated workflow is a goal statement: if Part 1 records that the user works through an autonomous agent — *"I just tell Claude roughly what I want and it builds it"*, agents on the team (1.2), an agent-driven dev or release flow (1.3, 1.4) — then that workflow *implies* the agent-facing dimension cluster the same way a stated launch implies signup scale. Add as candidates, each traced back to the workflow statement: **agent-diagnosability** (can the agent tell what went wrong?), **observability / debuggability pinned to the agent audience** (the agent is the one reading the logs), **testability pinned to agent-verifiable** (the agent must be able to confirm its own work without a human), and **agent-readability / context-efficiency** (can the agent orient in the code, cheaply?). Don't wait for the reference-list pass to surface these — the workflow already entails them; the bottom-up pass owes the trace. (The pack already carries the observability→debuggability/fixability/recoverability web; what this trigger adds is firing it *from the user's own stated workflow* rather than hoping the top-down pass catches it. This audience question is then settled properly in 5.3.)

Build the bottom-up list internally. Don't show it to the user yet.

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
> - Functional correctness (and its sub-dimensions: feature-level correctness; **cross-feature interaction / flow completeness** — features that are right in isolation but wrong in combination, or journeys that fall in the gap between features; a signature gap of systems built feature-at-a-time by agents)
> - Performance (and its sub-dimensions: scalability, resource consumption, elapsed time, UX responsiveness, jitter)
> - Reliability, resilience, recoverability, availability (recoverability includes safe rollback — which leans on observability again: knowing when, and what, to roll back)
> - Security, privacy
> - Usability, accessibility
> - Diagnosability, debuggability, observability (observability serves debuggability: wherever you find bugs, you must be able to debug and fix them)
> - Maintainability, extensibility, testability, fixability (fixability includes robustness against regressions — a fix that stays fixed)
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
> - **Probably relevant** — there's a plausible reason this matters, but nothing in the strategy or pre-read directly shows it.
> - **Borderline** — could matter, but only in a future release or for a stakeholder not currently being served.
> - **Not relevant** — actively excluded by non-goals or clearly outside the release purpose.
>
> For each Clearly or Probably relevant -ility, write one line on *why* it matters for this project's first release, citing what in the strategy or pre-read suggests it. Skip Borderline and Not-relevant ones in the output unless the borderline case looks especially worth flagging — don't pad.
>
> Output format: a markdown list of relevant -ilities with their classification and one-line reason.
>
> Do **not** consolidate against the main agent's bottom-up list — that's the main agent's job. Just produce the top-down check.

### 3. Consolidate

When the subagent returns, **first save its returned top-down list verbatim** to `quality/.scratch/5.1-dimension-scout.md` — the sealed-dispatch scratch file `/quality-strategy-review` audits (see SKILL.md → "Sealed-context dispatch and scratch files"). Then merge it with the bottom-up list:

- **In both lists** — keep, take the better-reasoned justification from either.
- **Bottom-up only** — keep; these came from real project context.
- **Subagent only** — for each, surface to the user as a question: *"The reference-list pass flagged X as Clearly Relevant because [reason]. Should it be in the inventory?"* Don't include silently; don't drop silently.

The user resolves subagent-only candidates. And when one of them is something the user never mentioned but their **stated goals imply they'd care about**, don't deliver it as a list row — deliver it as a moment, with the trace: *"you didn't mention X anywhere — but given what you said about Y, you'd care a lot if X failed. Does that land?"* Record the answer either way; a rejected revelation is data, not failure (see SKILL.md → "Deliver revelations as moments").

### 4. The guaranteed-inclusion layer — floors and default-ins

The bottom-up and top-down passes both surface dimensions *because a bar or a design observation pointed at them*. Some dimensions can't wait for that — the cost of their silent absence is too high, and the kp3136 launch-gate run proved it: the sweep produced **no security dimension at all** on a project whose headline risk was rating forgery through client-writable data. So two classes of dimension enter the inventory by a different door — not surfaced *if* something references them, but present *unless* explicitly handled. The difference between them is whether the user is even allowed to remove them.

**Tier 1 — Floors (non-negotiable given a factual predicate).** A floor is unconditional once a plain factual predicate about the system holds — checked in the pre-read, never negotiated as a preference. There is no coherent project where, shown the trace, a user accepts violating one. For each floor whose predicate holds (read them from the pre-read's floor-predicate line — sub-step 0), the corresponding dimension enters the inventory, full stop. The only conversation is **what the floor demands *here*** — which may be very little — never **whether it applies.** The ratified catalogue:

| Floor | Factual predicate (checked in pre-read) |
|---|---|
| **No credential / secret leakage** | the system handles any secret, key, token, or password |
| **No PII leakage** | the system holds personal data |
| **No irrecoverable loss of entrusted data** | the system holds anything a user would want back (ephemeral-by-design flips the *predicate*, not the floor) |
| **Legality** | always for shipped-code licensing; data-protection law additionally where the PII predicate holds |
| **Blast radius** | the software ships to other people's machines (don't damage the host beyond the app's remit) |

A floor whose predicate holds **cannot be rated None and cannot become a non-goal.** What 5.4 and 6.1 decide for it is *how much it demands on this project*, not whether it's in. Where a predicate came back **unknown or inferred** (a no-repo or interview-derived pre-read), it is a one-line factual question to settle with the user — *"does this store anything you'd be upset to lose?"* — not a thing to guess; confirm it, then apply the floor. (Note: **unbounded spend is *not* a floor** — an eyes-open "I accept the bill risk" is a coherent position — so it lives in Tier 2 as the flagship default-in.)

**Tier 2 — Default-ins (present by default; removable only by an explicit, recorded disproof).** **Security** is default-in on every project; **data integrity / loss-of-data** is default-in wherever the system holds user data; **unbounded spend** is the flagship default-in wherever the system can spend money (API calls, compute, third-party usage). These appear in every sweep whether or not a stated bar referenced them — but unlike floors, the user *may* decide one is genuinely out of scope. The catch: **silent inclusion is as wrong as silent exclusion**, so the skill must *earn* the inclusion, with the goal-trace run **in reverse**:

- Normal direction (the heaviness rule): an item must trace to a stated goal or get cut.
- **Default-in (reverse) direction:** the skill is obligated to **build the trace from the user's own stated goals to the dimension** and present it to convince — *"you said you're launching on Twitter → that brings in strangers → strangers can forge ratings if the data's client-writable → that's a security concern you didn't name but your own goal implies."* Then offer the honest fork: be convinced and it's in, **or** record an explicit, eyes-open **accepted-risk** in the doc (*"considered security, accepted the risk for this release because …"*). What you may **not** do is drop it silently, or add it silently — the persuasion *is* the feature.

Run this layer **before** you present the consolidated inventory, so floors and earned default-ins are already in the list the user reacts to. Floors and default-ins added here carry their grounding in the source column the same as any dimension — a floor cites its predicate; a default-in cites the reverse-trace (or its recorded accepted-risk).

## How to interview through this

The pattern is: long stretches of agent work, short stretches of user input.

1. Generate bottom-up candidates (silent).
2. Dispatch subagent for top-down pass (silent until it returns).
3. Surface the consolidated list back to the user. Ask: *"From the bottom-up plus the reference-list pass, the candidate dimensions are X, Y, Z. Anything we should add? Anything that doesn't actually matter?"* Adjust based on user input.

You have explicit permission and encouragement to:

- Push back when the user wants to drop a Clearly-Relevant subagent candidate without reasoning.
- Add a dimension the user surfaces that neither bottom-up nor subagent caught.
- Note tensions or surprises in the inventory; they'll matter in later sub-steps.

What you must not do:

- Treat the subagent's list as authoritative — it's a backstop, not a verdict. The user resolves subagent-only candidates.
- Use the reference list as a checklist with the user. The reference list belongs to the subagent's brief, not to the user-facing interview.
- Skip the consolidation step. Subagent-only candidates need explicit user input to add or drop.

## Push back when

- The user wants to drop a Clearly-Relevant subagent candidate without reasoning. *"The reference-list pass flagged X as clearly relevant — what makes it not?"*
- The candidate list is much shorter than the project warrants. *"This is a complex project; the inventory looks thin. What might we be missing?"*
- Part 1 records an agent-driven workflow but no agent-facing dimensions came through. *"You said you work mostly through Claude — so an agent is your main reader and your main verifier. Shouldn't diagnosability-for-the-agent, agent-verifiable testability, and context-efficiency be on the list?"*
- The user adds many dimensions without grounding any in stakeholder bars. *"What's driving this addition — a stakeholder bar, a design observation, something else?"*

## This sub-step is DONE when

- [ ] A bottom-up candidate list has been generated from Parts 1–4 and the pre-read.
- [ ] The dimension-scout subagent has been dispatched and returned a top-down candidate list, saved verbatim to `quality/.scratch/5.1-dimension-scout.md`.
- [ ] The two lists have been consolidated, with subagent-only candidates explicitly resolved (added or dropped) by the user.
- [ ] The **floors-and-default-ins layer** has been applied: every floor whose pre-read predicate holds (or was confirmed in interview) is in the inventory and not droppable; each default-in (security always; data-integrity where user data exists; unbounded spend where the system can spend) is either in via a presented reverse-trace **or** carries an explicit, recorded eyes-open accepted-risk — none silently included, none silently dropped.
- [ ] The raw inventory is captured with a one-line reason for each dimension.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
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

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines (highlighting any subagent-flagged candidates the user added or dropped, and any tensions noted), and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 5.2 (Unpack pass)?"*
