---
name: oracle-adequacy
description: Audit whether a quality strategy's actual-state assessment can be trusted — for each dimension, is there an adequate oracle to judge what level the project is actually at, and an adequate instrument to observe it? The explicit "how do we know?" (Q2) check that agents skip by deferring to whatever measurement exists and by treating hard-to-judge dimensions as permanently Unknown. Use from /quality-strategy during the risk-map actual-state pass, or standalone to audit the oracles behind an existing strategy's actuals.
---

# Oracle Adequacy

This skill answers the second of the four quality questions — **"How do we know if what we have is good?"** — for the *actual-state assessment* of a quality strategy. It checks whether you can trust how the strategy decided "this dimension is actually at level X".

It is the `/quality-strategy` counterpart to `/tooling-adequacy` (which does the same job for `/test-strategy`'s learning needs). The two share one oracle core; they differ in what they assess. `/tooling-adequacy` assesses a *learning need* (a question the strategy wants testing to answer); `/oracle-adequacy` assesses a *dimension's actual-state claim* — the entries Part 6 (Risk Map) records as the project's current level on each H/M dimension.

Judging where a project actually stands on a dimension takes **two distinct capabilities**, and both can fail independently:

- an **instrument** — to *observe* the current state on this dimension (run the thing, inspect the code, read the telemetry, ask the stakeholder);
- an **oracle** — to *judge* whether what you observed means the dimension is at the claimed level.

An actual-state claim is only trustworthy if **both** are adequate. A perfect instrument with no oracle means you can see plenty and still not know if "plenty" is good enough; a perfect oracle with no instrument means you know what "good" looks like but have nothing observed to compare it to.

This skill exists because of two reliable agent failure modes. **(1)** When "how do we know?" is collapsed into "is it good?", agents claim an actual level (often a comfortable Medium) by deferring to whatever signal happens to exist, never asking whether that signal can actually judge *this* dimension — so the risk map records confidence the evidence doesn't support. **(2)** When there's no obvious oracle, agents mark the dimension Unknown and move on as if Unknown were a dead end. But an oracle is usually cheap to build now, and building one turns the Unknown into a knowable actual.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). The grounding files this skill reads — `PHILOSOPHY.md`, and `skills/tooling-adequacy/SKILL.md` for the shared oracle taxonomy — live under it.
- **PROJECT_DIR** — the absolute path of the project whose actuals you're assessing (normally the current working directory; confirm with the user if it's ambiguous). The strategy docs normally live under `$PROJECT_DIR/quality/` — but `/quality-strategy` asks at session start where the strategy should be saved, so they may live elsewhere. If `$PROJECT_DIR/quality/` is absent, get the docs home instead of assuming: from the orchestrator's brief when this skill was dispatched, else by asking the user; if the path you're given ends in `/quality`, its parent is the home. From then on treat `$PROJECT_DIR` as that docs home wherever a path below says `$PROJECT_DIR/quality/...` — one substitution, made once, before you act on any path.

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them.** The Read tool does no variable expansion and resolves relative paths against the current working directory, not this skill's directory — so an unsubstituted placeholder or a bare relative path will fail.

## When to use

- **From `/quality-strategy`** — invoked during the risk-map actual-state pass (sub-step 6.2), after required levels (6.1) and before gap-and-confidence (6.3). Input: the H/M dimensions with their proposed actual levels (or Unknowns) and the evidence each is based on. Output: an oracle-adequacy assessment plus a list of **oracle-build items** that seed Step 7's plan of work and that 6.3 records against the affected dimensions.
- **Standalone** — to audit the oracles behind an existing strategy's actuals. Input: the dimensions and claimed actuals from `$PROJECT_DIR/quality/strategy.md` (Parts 5–6), plus what the team can observe about the codebase.

This skill judges adequacy and names the gaps; it does not plan the build. **`/tooling-strategy`** consumes its oracle-build items (together with `/tooling-adequacy`'s, from the test side) and turns them into a prioritised build plan.

## What you need

- **Grounding.** Read `$PLUGIN_ROOT/PHILOSOPHY.md`. The disciplines that recur — make confidence visible; push back on vagueness; record assumptions; understand the why — are load-bearing here.
- **The shared oracle taxonomy.** Read step 3 of `$PLUGIN_ROOT/skills/tooling-adequacy/SKILL.md`. The oracle *kinds* (Specified / Property-or-metamorphic / Differential-or-simulated / Golden-master / Human-or-agent-judge) and the "kill the old-world reflex" move are the canonical oracle core; this skill applies the same taxonomy to actual-state assessment rather than to test learning needs. The one-line gists are restated in step 3 below so this file is usable on its own, but the fuller treatment lives there.
- **The dimensions and their claimed actuals.** From `/quality-strategy`: the H/M dimensions from Part 5 with the proposed actuals and evidence from sub-step 6.2. Standalone: read Parts 5 and 6 of `$PROJECT_DIR/quality/strategy.md`, and ask the user what they can observe if the doc is thin.
- **The project, lightly.** Unlike `/tooling-adequacy`, reading source is *allowed* here — actual-state assessment is about the system as built, not about preserving an independent testing perspective. But read only enough to judge whether an oracle is feasible; this skill assesses the *means of knowing*, not the actual state itself (that's 6.2's job).

## The work, in order

### 1. For each dimension, name the instrument and the oracle behind its claimed actual

For each H/M dimension (standalone: each dimension with a claimed actual), state the two things the actual-state claim rests on:

- **Instrument** — how the current state on this dimension was (or would be) observed. Be specific: *"read the error-handling paths in module X"*, *"ran the app and timed cold start"*, *"asked the maintainer."*
- **Oracle** — how anyone decides the observation means the dimension is at the claimed level. Name it explicitly. A claim with an observation but no stated oracle — *"reliability is Medium because the code looks careful"* — has no oracle yet. That's a finding, not a detail.

For dimensions marked **Unknown** in 6.2, the instrument and oracle are what *would* be needed to resolve the Unknown. The "to resolve" note in 6.2 is the starting hypothesis; this skill pressure-tests whether that resolution path actually has an oracle.

### 2. Assess the instrument — Adequate / Inadequate / Missing

- **Adequate** — exists and can observe the current state on *this* dimension at the fidelity the required level demands.
- **Inadequate** — exists but can't reliably produce the needed observation (the only telemetry is aggregate uptime, but the dimension is tail-latency; a code skim can't judge concurrency-safety).
- **Missing** — nothing observes this dimension yet; it must be built, run, or asked for.

### 3. Assess the oracle — Adequate / Inadequate / Missing — and don't accept "there's no oracle, so it's Unknown"

Classify the oracle on the same scale. The oracle is *whatever lets you decide an observation means the claimed level*. The kinds, from cheapest signal to richest (the canonical treatment is in `$PLUGIN_ROOT/skills/tooling-adequacy/SKILL.md` step 3):

- **Specified** — a spec, contract, SLO, or known-correct target states the expected level (*"p99 < 200ms is the bar; we measured 180ms"*).
- **Property / metamorphic** — invariants that must hold even when you don't know the exact value (*"no data-loss path exists"*; *"every error is either handled or surfaced, never swallowed"*).
- **Differential / simulated** — an independent, deliberately-simple reference you compare the real system against; an agent can often build one cheaply. Also: a prior version, or a competitor product, as the reference.
- **Golden master / snapshot** — a captured known-good output or known-good behaviour, re-judged when it changes.
- **Human or agent-judge** — for trust, feel, taste, and quality dimensions a person is the oracle; agents lack smells, so humans stay the oracle there. An agent-judge can scale fuzzy assessment where appropriate, but name it as the oracle and note its limits.

**Kill the old-world reflex.** *"There's no oracle for this dimension, so its actual is just Unknown and there's nothing to do"* mixes up two different things: an Unknown that is **gated on an oracle that doesn't exist yet**, and an Unknown that is **cheap to resolve once you decide how to judge it**. When the oracle is Missing or Inadequate, the default move is to **propose building one** — most often a property statement or a simulated/reference oracle — as an oracle-build item, not to leave the dimension permanently Unknown.

### 4. Verdict and oracle-build items

For each dimension, give a verdict:

- **Trustworthy** — instrument and oracle both Adequate; the claimed actual and its confidence stand.
- **Over-confident** — the claim names an actual level (not Unknown), but the oracle behind it is Inadequate or Missing. The finding: the evidence does not support the confidence in 6.2; either downgrade it or build the oracle. Claiming an actual on an inadequate oracle is exactly the "strategy built on sand" failure.
- **Gated** — the actual is (or should be) Unknown, and resolving it is blocked on a Missing/Inadequate oracle. Name the **oracle-build item**: what oracle must be constructed, and which dimension(s) it unblocks. These seed Step 7's plan of work and are recorded against the dimension in 6.3.

Oracle-build items (state the property set; write a reference/simulated oracle; capture the golden master; define the SLO and its measurement) are first-class outputs — often the highest-value work an early-stage strategy can name, because they turn permanently-Unknown dimensions into knowable ones.

### 5. Catch the mismatches

- **Comfortable Medium with no oracle.** A dimension sitting at Medium confidence whose only basis is "the code looks fine" or "it's probably okay." The honest reading is usually Unknown-with-an-oracle-to-build, not Medium.
- **Code-reading standing in for observation.** A behavioural actual (reliability, performance, data-integrity, security) whose *instrument* is "read the source" while real observation evidence — test results, CI, the tests themselves, the user's lived experience of the running system — was never sought is the wrong-oracle posture sub-step 6.2 ranks last. Reading the code shows intent, not behaviour: mark such an instrument **Inadequate** for a behavioural claim, treat the actual as **inference** (capped at Medium, usually Unknown), and name the observation that would actually judge it. The evidence hierarchy — results/CI → tests → ask the user → code last — is the order; a claim that jumped to the bottom rung is Over-confident until the higher rungs are checked.
- **Automation aimed at judgement.** A trust/feel/taste dimension assigned a purely automated oracle. The human is the oracle there; say so.
- **Repo-level adequacy claims.** "We have monitoring / a test suite / types, so our actuals are solid." Adequacy is per-dimension, not per-repo — a signal can judge some dimensions well and be blind to others.

## Push back when

- Every oracle comes back "Adequate" with no per-dimension reason. That's the Q2-collapse failure mode — re-run, and demand a specific reason per dimension for *this* level claim.
- A Missing oracle is treated as a permanent Unknown with no build item. Challenge it: *"under agent costs, could we state a property, or write a simple reference, that judges this dimension?"*
- A non-Unknown actual rests on an oracle you can't name. *"What would have told us this is Medium rather than Low? If we can't say, the honest actual is Unknown."*
- A trust/feel/quality dimension is handed a purely automated oracle. The human is the oracle; pretending a tool covers it is the inadequacy.

## This skill is DONE when

- [ ] Every assessed dimension names both the instrument behind its actual and the oracle that would judge the level.
- [ ] Each is classified Adequate / Inadequate / Missing, and every "Adequate" carries a specific reason for *this* dimension (not "we have tooling").
- [ ] Every Missing/Inadequate oracle has either a proposed constructed oracle (property / simulated-reference / golden-master / human-or-agent-judge) or an explicit, defended statement that none is feasible.
- [ ] Each dimension has a verdict: Trustworthy / Over-confident / Gated.
- [ ] An oracle-build item is named for every Over-confident and Gated dimension, tied to the dimension(s) it unblocks.
- [ ] Comfortable-Medium-without-oracle and automation-aimed-at-judgement mismatches are flagged.
- [ ] (When run from `/quality-strategy`) the verdicts and oracle-build items are returned to the orchestrator so sub-step 6.2/6.3 can adjust confidences and Step 7 can absorb the build items, and a scratch file is written (see Output).

## Output

When run from `/quality-strategy`, return the assessment to the orchestrator **and** write it to `$PROJECT_DIR/quality/.scratch/6.2-oracle-adequacy.md` (the sealed-dispatch scratch file the review skill audits — see `/quality-strategy` SKILL.md, "Sealed-context dispatch and scratch files"). The orchestrator's brief carries the absolute docs-home path — a sealed dispatch can't ask where the docs live, so write where the brief says, never a path derived from your own working directory. Standalone, surface it in the conversation and offer to write it to `$PROJECT_DIR/quality/oracle-adequacy-<YYYY-MM-DD>.md`. Shape:

```markdown
# Oracle adequacy — actual-state assessment

*Do we actually know where we stand on each dimension — and would we know if a claim were wrong?*

| Dimension | Instrument (observe state) | Oracle (judge level) | Verdict | Oracle-build items |
|---|---|---|---|---|
| … | … — Adequate/Inadequate/Missing | … — Adequate/Inadequate/Missing | Trustworthy / Over-confident / Gated | … |

## Oracle-build items (seed plan of work)

- **<oracle to build>** — unblocks the actual-state assessment of <dimension(s)>. <Note if it's a property set, a simulated/reference oracle, a golden master, or a defined SLO + measurement.>

(Or: "None — every assessed dimension has an adequate instrument and oracle, with the per-dimension reasons above.")
```
