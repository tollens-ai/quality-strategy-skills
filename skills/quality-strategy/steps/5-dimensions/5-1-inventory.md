# Sub-step 5.1 — Dimension inventory (raw)

## Goal

Produce the **consolidated raw inventory** — the full list of quality dimensions to consider for this release. It comes from two passes merged: a bottom-up list (from stakeholders, design, release purpose) and a top-down reference-list pass run by a subagent.

The inventory at the end of this sub-step is **raw**: composite dimensions (several things under one label, like "performance") may still be present, and trap dimensions (like "readability", whose meaning shifts by audience) haven't yet been checked for agent-vs-human framing. Those refinements happen in sub-steps 5.2 (Unpack) and 5.3 (Old/new-world). This sub-step focuses on coverage: did we get all the dimensions we should be considering?

### The Step-5 lane rule — importance only, never adequacy

Step 5 answers exactly one question: **how much does this axis matter, for whom, this release?** It does not answer, and must not even gesture at: how good the project currently is at it (6.2's job), how confident anyone is in that assessment (6.3's job), what level it needs to reach (6.1's job), or how much testing it deserves (the test lane's job). Adequacy verdicts — *"problem"*, *"well covered"*, *"poorly tested"*, *"probably fine"*, *"under-covered"* — are banned from this sub-step's prose **and from the conversation itself**, in **both directions**: prejudging something a problem is exactly as wrong as prejudging it fine, because both skip the actual-state investigation 6.2 exists to do properly. A candidate a deficiency observation *prompted* is legitimate; a candidate whose *reason* is the deficiency itself is not — see the prompt-vs-reason conversion below.

This is the same axis split 5.4 names from the other side: "High means important, not in-trouble" (5.4's doctrine) is what happens when importance and adequacy get tangled at *rating* time; this lane rule is what keeps them apart at *surfacing* time, one step earlier. Same distinction, enforced at both ends.

## What you need from the previous sub-step

Read all of Parts 1–4 from `quality/strategy.md`. The release purpose (Part 2), stakeholders and three-lens (Part 3), and non-goals (Part 4) feed directly into which dimensions matter. Read the **Design observations and likely-relevant dimensions** and **Floor predicates** sections of `quality/pre-read.md` — subagent C surfaced both the design-implied dimensions and the factual floor predicates the guaranteed-inclusion layer (step 4 below) reads. If 2.1 negotiated a multi-release doc structure, **re-read `quality/.scratch/session-config.md` now** — its recorded choice is what step 3 (Consolidate) routes future-release candidates by, and 2.1 may have happened sessions ago or across a `/clear`; don't rely on remembering it.

## The work, in order

### 1. Bottom-up candidates (silent)

Generate a candidate dimension list from what's already in the strategy doc and pre-read — scoped to **this release** (the header release named at 2.1), not a mixed pass across whatever the doc and pre-read happen to contain, and each candidate carrying the **scope** (which stakeholder(s)/capacity, which surface of the product) it came from:

- For each stakeholder dealbreaker and good-enough **for this release** in Part 3, ask: *"what dimension does this concern map to?"* Map to standard -ility names (the conventional names for non-functional quality attributes — reliability, usability, maintainability, observability, and the like) where one fits; use domain-specific names where they're clearer. The candidate's scope is free here — bars are already per-stakeholder, so carry that stakeholder forward as the row's scope.
- For each design observation in the pre-read's design section that bears on **this release**, take the implied dimensions surfaced by subagent C. A design observation that only implies a dimension for a *later* release is not a candidate here — it's material for whichever doc structure was negotiated at 2.1 for future-release content (see step 3, Consolidate).
- For **this release's purpose** — 2.1's roadmap entry for the header release, not the whole roadmap — ask: *"what does this purpose require?"*
- **Agent-driven workflow → the agent-facing cluster.** A stated workflow is a goal statement: if Part 1 records that the user works through an autonomous agent — *"I just tell Claude roughly what I want and it builds it"*, agents on the team (1.2), an agent-driven dev or release flow (1.3, 1.4) — then that workflow *implies* the agent-facing dimension cluster the same way a stated launch implies signup scale. Add as candidates, each traced back to the workflow statement: **agent-diagnosability** (can the agent tell what went wrong?), **observability / debuggability pinned to the agent audience** (the agent is the one reading the logs), **testability pinned to agent-verifiable** (the agent must be able to confirm its own work without a human), and **agent-readability / context-efficiency** (can the agent orient in the code, cheaply?). Don't wait for the reference-list pass to surface these — the workflow already entails them; the bottom-up pass owes the trace. (The pack already carries the observability→debuggability/fixability/recoverability web; what this trigger adds is firing it *from the user's own stated workflow* rather than hoping the top-down pass catches it. This audience question is then settled properly in 5.3.)

**The dev-tool double.** Where the project is itself a tool that produces or hosts other people's work — an IDE, a CI product, a framework, this pack itself — a candidate's scope must also say which side of that double it's about: the tool's own quality, or the quality of the work the tool helps its users produce (see SKILL.md → "Name the scope"). A dev tool's reliability is not the reliability of the projects it builds; name the side explicitly, the same way a stakeholder is named. (5.3's trap-dimension framing gestures at the same split for agent audiences — this is its general form, named here at first surfacing.)

**Prompt-vs-reason: a deficiency observation may prompt a candidate, but it can never *be* the reason.** The pre-read's design observations are frequently deficiency-shaped (*"X is lightly tested"*, *"no retries on Y"*) — that's a fine prompt, but the recorded reason must be an importance-ground: a stakeholder bar, a release-purpose trace, or a workflow trace, never the deficiency itself. Park the deficiency instead — explicitly and visibly, as a *"noted for 6.2"* line (see Output below), not lost and not judged now, just handed forward to the sub-step whose job is to judge it. Worked correction: a pre-read note that *"remoting is lightly tested"* does not become a dimension called *"remote operability — a problem"*; it becomes **reliability** (scope: the Windows→Linux remoting path) — *matters because that path is how Windows users reach the product at all* — plus a parked note for 6.2 that current test evidence there is thin.

**Feature-vs-ility check.** A Dimension cell is never a feature or component name. "Remote operability," meaning "how well the Windows→Linux remoting feature works," is a feature wearing an -ility suffix, not an axis of goodness — the test: is this a thing the product *has*, or an axis of goodness *of* something it has? A feature name belongs in the **scope** column (the surface a dimension is about, already required above) — the Dimension cell holds the actual -ility (reliability, operability, correctness, …) that axis names.

Build the bottom-up list internally, each candidate carrying its scope alongside its dimension name and source. Don't show it to the user yet.

### 2. Top-down candidates (subagent)

Dispatch a subagent to walk a reference list of standard quality -ilities and check each against the project context.

Use the `Agent` tool with `subagent_type: general-purpose`. The brief:

> You are extending a quality-strategy dimension inventory by walking a reference list of quality -ilities and checking each one against the project context. The main agent has already produced a bottom-up dimension list from stakeholder concerns and design observations; your job is the top-down pass to spot dimensions the bottom-up missed.
>
> First, read `$PLUGIN_ROOT/PHILOSOPHY.md` and `$PLUGIN_ROOT/skills/quality-strategy/SKILL.md` to ground yourself in the framework.
>
> Then read `$DOCS_DIR/quality/strategy.md` (Parts 1–4) and `$DOCS_DIR/quality/pre-read.md` for full context on the project — what it is, who matters, what's been excluded, what the design looks like.
>
> Walk this reference list of quality -ilities. For each, decide whether it might matter for **the release this strategy covers** (named in the doc header and Part 2):
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
> - **Clearly relevant** — the project context shows direct stakeholder concerns or design implications for this -ility, for **this release**.
> - **Probably relevant** — there's a plausible reason this matters for this release, but nothing in the strategy or pre-read directly shows it.
> - **Borderline — future release.** Could matter, but only in a release beyond this one — name which, if the context suggests it.
> - **Borderline — stakeholder not yet served.** Could matter, but only for a stakeholder this release doesn't serve.
> - **Not relevant** — actively excluded by non-goals or clearly outside the release purpose.
>
> For each Clearly or Probably relevant -ility, write one line on *why* it matters for the strategy's release, citing what in the strategy or pre-read suggests it, **and its scope** — which stakeholder(s)/capacity and which surface of the product (and, where the project is itself a tool producing or hosting other people's work, which side of that double). Not-relevant ones are skipped in the output — don't pad. **Future-release Borderline ones are not skipped**: list them separately, under their own heading, each with its dimension, why it looks future-relevant, and which release it likely belongs to if guessable. Stakeholder-not-yet-served Borderline ones stay skipped in the output unless especially worth flagging.
>
> Output format: a markdown list of relevant -ilities (with classification, one-line reason, and scope) for this release, followed by a separate short list of future-release candidates.
>
> Do **not** consolidate against the main agent's bottom-up list — that's the main agent's job. Just produce the top-down check.

### 3. Consolidate

When the subagent returns, **first save its returned top-down list verbatim** to `quality/.scratch/5.1-dimension-scout.md` — the sealed-dispatch scratch file `/quality-strategy-review` audits (see SKILL.md → "Sealed-context dispatch and scratch files"). Then merge it with the bottom-up list, **this release's candidates only**:

- **In both lists** — keep, take the better-reasoned justification from either; if the two disagree on scope, ask rather than pick one.
- **Bottom-up only** — keep; these came from real project context.
- **Subagent only** — for each, surface to the user as a question: *"The reference-list pass flagged X as Clearly Relevant for [scope] because [reason]. Should it be in the inventory?"* Don't include silently; don't drop silently.
- **Future-release candidates (either pass)** — never included in this release's inventory and never silently dropped: route per the doc structure negotiated at 2.1 (SKILL.md → "Scope of this skill") — to the release bank, a light section, the parallel release's own depth pass, or the separate document, whichever applies. Name the release and, in one line, why it looks relevant there. Tell the user in half a line (*"scalability came up but it's a beta concern — banked for the beta"*, or *"added as a light section for the beta"* if that's the negotiated structure) and move on; don't pre-rate it or dig deeper — that depth belongs to that release's own pass.
- **Same -ility, different stakeholders, different meaning or priority** — never collapse into one unscoped row. When the same dimension name means different things, or carries different priority, for different stakeholders (a dev tool's classic shape: "usability" for the product's own user vs. "usability" for an agent calling its API), it enters as **separate scoped rows** by default. Only fold it into one row with a deferred-to-5.2 flag when the split is genuinely more than a scope label — some real unpacking judgment 5.2 is better placed to make — and even then the row must say so visibly in the table (e.g. *"Source: … — scope split deferred to 5.2, see note"*), not merely be considered so in the agent's head. One unscoped row with no flag standing in for several stakeholders' different concerns is exactly the imprecision this step exists to catch.

The user resolves subagent-only candidates. And when one of them is something the user never mentioned but their **stated goals imply they'd care about**, don't deliver it as a list row — deliver it as a moment, with the trace: *"you didn't mention X anywhere — but given what you said about Y, you'd care a lot if X failed. Does that land?"* Record the answer either way; a rejected revelation is data, not failure (see SKILL.md → "Deliver revelations as moments").

### 4. The guaranteed-inclusion layer — floors and default-ins

The bottom-up and top-down passes both surface dimensions *because a bar or a design observation pointed at them*. Some dimensions can't wait for that — the cost of their silent absence is too high, and the kp3136 launch-gate run proved it: the sweep produced **no security dimension at all** on a project whose headline risk was rating forgery through client-writable data. So two classes of dimension enter the inventory by a different door — not surfaced *if* something references them, but present *unless* explicitly handled. The difference between them is whether the user is even allowed to remove them.

**Tier 1 — Floors (non-negotiable given a factual predicate).** A floor is unconditional once a plain factual predicate about the system holds — checked in the pre-read, never negotiated as a preference. There is no coherent project where, shown the trace, a user accepts violating one. For each floor whose predicate holds (read them from the **Floor predicates** section of `quality/pre-read.md`), the corresponding dimension enters the inventory, full stop. The only conversation is **what the floor demands *here*** — which may be very little — never **whether it applies.** The ratified catalogue:

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

**An accepted-risk is only valid for the facts it was accepted against.** In new-release mode (SKILL.md → "Revision mode"), don't silently carry a prior release's Tier-2 accepted-risk forward as still current — the facts that earned it may have changed. Re-open it explicitly: name what the accepted-risk was, name what's changed about the technical surface (a new credential dependency, a new place the system spends money, user data the prior release never held), and run the reverse-trace fresh against *this* release's facts. It may land in the same place — a re-confirmed accepted-risk is a fine outcome — but it's re-examined, not inherited. A default-in whose prior accepted-risk goes silently unexamined in a new release is the same silent-inclusion/silent-exclusion failure this layer exists to prevent, just arriving a release late.

Run this layer **before** you present the consolidated inventory, so floors and earned default-ins are already in the list the user reacts to. Floors and default-ins added here carry their grounding in the source column the same as any dimension — a floor cites its predicate; a default-in cites the reverse-trace (or its recorded accepted-risk).

## How to interview through this

The pattern is: long stretches of agent work, short stretches of user input.

1. Generate bottom-up candidates (silent), each scoped to this release and carrying its stakeholder/surface.
2. Dispatch subagent for top-down pass (silent until it returns).
3. Surface the consolidated list back to the user, **this release's candidates with their scope**. Ask: *"From the bottom-up plus the reference-list pass, the candidate dimensions for this release are X (for [scope]), Y (for [scope]), Z. Anything we should add? Anything that doesn't actually matter?"* If either pass turned up future-release candidates, surface those separately in the same breath — *"and these came up but only for the beta — banked there"* (or however the negotiated structure routes them) — not mixed into the this-release list. Adjust based on user input.

You have explicit permission and encouragement to:

- Push back when the user wants to drop a Clearly-Relevant subagent candidate without reasoning.
- Add a dimension the user surfaces that neither bottom-up nor subagent caught.
- Note tensions or surprises in the inventory; they'll matter in later sub-steps.

What you must not do:

- Treat the subagent's list as authoritative — it's a backstop, not a verdict. The user resolves subagent-only candidates.
- Use the reference list as a checklist with the user. The reference list belongs to the subagent's brief, not to the user-facing interview.
- Skip the consolidation step. Subagent-only candidates need explicit user input to add or drop.
- Leave a dimension's scope unstated, or let a future-release candidate sit unrouted in this release's list.
- Treat a dimension's presence in a prior release's inventory as, by itself, grounds for including it in this one — inclusion and priority are decided fresh, per release.
- **Record or voice an adequacy verdict at this sub-step** — "problem", "well covered", "probably fine", "under-tested" — in either direction. A deficiency observation may prompt a candidate; it is parked for 6.2, never written as the reason.
- **Record a feature or component name as a Dimension.** Re-express as scope (the feature) + the actual -ility (the axis of goodness).

## Push back when

- The user wants to drop a Clearly-Relevant subagent candidate without reasoning. *"The reference-list pass flagged X as clearly relevant — what makes it not?"*
- The candidate list is much shorter than the project warrants. *"This is a complex project; the inventory looks thin. What might we be missing?"*
- Part 1 records an agent-driven workflow but no agent-facing dimensions came through. *"You said you work mostly through Claude — so an agent is your main reader and your main verifier. Shouldn't diagnosability-for-the-agent, agent-verifiable testability, and context-efficiency be on the list?"*
- The user adds many dimensions without grounding any in stakeholder bars. *"What's driving this addition — a stakeholder bar, a design observation, something else?"*
- A dimension is named without its scope, or the same -ility name is used for what are clearly different stakeholders' different concerns without a split. *"Whose usability, specifically — and on which surface? That might be two different rows."*
- A candidate is proposed on the strength of "it mattered for the last release." *"Does it matter for THIS release, on its own terms? A prior release's inventory doesn't carry over automatically."*
- A row's reason cites coverage, testedness, or bugginess instead of an importance-ground. *"That's telling me the current state, not why it matters — which stakeholder bar or release purpose makes this important? The coverage note belongs parked for 6.2, not in the reason."*
- Adequacy language slips into the conversation itself, not just the doc — *"this is probably fine"*, *"that's under-tested"*, *"that's a problem"*. *"Let's hold off on whether it's good or bad — that's 6.2's question. Right now: does it matter, and how much?"*
- A Dimension cell names a feature or component rather than an axis of goodness. *"Is [name] a thing the product has, or an axis of how good something is? If it's the former, that's the scope — what's the -ility?"*

## This sub-step is DONE when

- [ ] A bottom-up candidate list has been generated from Parts 1–4 and the pre-read, scoped to this release.
- [ ] The dimension-scout subagent has been dispatched and returned a top-down candidate list, saved verbatim to `quality/.scratch/5.1-dimension-scout.md`.
- [ ] The two lists have been consolidated, with subagent-only candidates explicitly resolved (added or dropped) by the user.
- [ ] The **floors-and-default-ins layer** has been applied: every floor whose pre-read predicate holds (or was confirmed in interview) is in the inventory and not droppable; each default-in (security always; data-integrity where user data exists; unbounded spend where the system can spend) is either in via a presented reverse-trace **or** carries an explicit, recorded eyes-open accepted-risk — none silently included, none silently dropped.
- [ ] The raw inventory is captured with a one-line reason for each dimension, and that reason says why it matters for **this release** specifically — not "it mattered before."
- [ ] Every row carries its **scope** — stakeholder(s)/capacity and product surface (including the dev-tool side, where the project produces or hosts other people's work) — from first surfacing.
- [ ] Where the same -ility means different things or carries different priority for different stakeholders, it appears as separate scoped rows (or is flagged for the split to happen at 5.2) — never one unscoped row standing in for several concerns.
- [ ] Future-release candidates from either pass are routed per the doc structure negotiated at 2.1 (bank / light section / parallel pass / separate doc), named to the user in half a line — none silently dropped, none flattened into this release's inventory.
- [ ] No row's reason cites current adequacy (coverage, testedness, bugginess) instead of importance; every deficiency observation that prompted a candidate is parked as a "noted for 6.2" line, not folded into the reason.
- [ ] No Dimension cell names a feature or component — each holds an axis of goodness, with the feature (if one prompted it) named in the scope column instead.
- [ ] The wrap-up self-check confirms: no adequacy verdicts — pessimistic or reassuring — were made this sub-step, in the doc or in conversation.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 5.2 (Unpack pass).

## Output

Append to `quality/strategy.md`:

```markdown
## Part 5: Quality Dimensions

### Raw inventory (<release>, pre-refinement)

| Dimension | Scope (stakeholder/capacity + surface) | One-line reason it matters for THIS release | Source |
|---|---|---|---|
| <name> | <who it's about + which surface — and which side of the tool/produced-work double, where the project is itself a tool> | <why this matters for this release specifically — not "it mattered before"> | <stakeholder bar / design observation / reference-list backstop> |

This inventory is **raw** — sub-step 5.2 will unpack composite dimensions; sub-step 5.3 will check trap dimensions for agent-vs-human framing. The inventory will be refined and replaced by the end of 5.3.

### Noted for 6.2 (parked deficiency observations)

| Dimension (this row) | What was observed | Source |
|---|---|---|
| <name, matching a row above> | <the deficiency that prompted this candidate — e.g. "lightly tested", "no retries observed" — parked as evidence, not judged here> | <pre-read design observation / user aside> |

(Or "none this pass" — a candidate whose prompt was purely a stakeholder bar or release purpose has nothing to park here.) These rows are pointers for sub-step 6.2's actual-state pass, not adequacy verdicts — nothing here says whether the observation is good or bad, only that it exists and where to look.

### Future-release candidates (routed per the negotiated doc structure)

| Dimension | Likely release | Why it looks relevant there | Routed to |
|---|---|---|---|
| <name> | <release> | <one-line> | <bank file `quality/releases/<slug>.md` / light section in this doc / the parallel release's own pass / the separate document> |

(Or "none this pass" — most sessions won't surface any.)

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines (highlighting any subagent-flagged candidates the user added or dropped, and any tensions noted), and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 5.2 (Unpack pass)?"*
