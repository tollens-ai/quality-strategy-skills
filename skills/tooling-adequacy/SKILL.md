---
name: tooling-adequacy
description: Audit whether a test strategy's learning needs can actually be answered — both the instrument to exercise and observe the system, and the oracle to judge whether the result is correct (including cheap simulated/reference oracles agents now make possible). The explicit "how do we know?" (Q2) check that agents skip by deferring to existing tooling and by assuming hard-to-judge things are untestable. Use from /test-strategy after learning needs, or standalone to audit a codebase's test tooling and oracles.
---

# Tooling Adequacy

This skill answers the second of the four quality questions — **"How do we know if what we have is good?"** — for *testing*. It interrogates whether the means a test strategy depends on can actually answer its learning needs.

Answering a learning need takes **two distinct capabilities**, and both can fail independently:

- an **instrument** — to *exercise* the system and *observe* a result (run it, drive it, capture output);
- an **oracle** — to *judge* whether that observed result is **correct**.

A learning need is only answerable if **both** are adequate. A perfect instrument with no oracle means you can run the thing a million times and still not know if it's right; a perfect oracle with no instrument means you know what "right" looks like but can't produce a result to check.

This skill exists because of two reliable agent failure modes. **(1)** When "how do we know?" is collapsed into "is it good?", agents defer to whatever tooling already exists, assume it's adequate, and build findings on an instrument that was blind to the question. **(2)** When there's no obvious oracle, agents inherit the old-world reflex — *"no oracle, so this isn't really testable"* — and silently drop the learning need, when in the agent era an oracle is usually cheap to construct.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). The grounding files this skill reads — `PHILOSOPHY.md`, `skills/test-strategy/FRAMINGS.md` — live under it.
- **PROJECT_DIR** — the absolute path of the project whose tooling and oracles you're assessing (normally the current working directory; confirm with the user if it's ambiguous). The strategy docs live under `$PROJECT_DIR/quality/`.

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them.** The Read tool does no variable expansion and resolves relative paths against the current working directory, not this skill's directory — so an unsubstituted placeholder or a bare relative path will fail.

## When to use

- **From `/test-strategy`** — invoked after learning needs are derived (sub-step 3) and before allocation (sub-step 4). Input: the learning-needs list with their proposed methods. Output: a tooling-and-oracle adequacy assessment plus a list of **build items** that `/test-strategy`'s closing step gates on.
- **Standalone** — to audit an existing codebase's test tooling and oracles against what the team wants to find out. Input: the questions the team wants answered (ask the user) plus the repo's test infrastructure.

This skill judges adequacy and names the gaps; it does not plan the build. **`/tooling-strategy`** consumes its build items (together with `/oracle-adequacy`'s, from the quality side) and turns them into a prioritised build plan.

## What you need

- **Grounding.** Read `$PLUGIN_ROOT/PHILOSOPHY.md` and `$PLUGIN_ROOT/skills/test-strategy/FRAMINGS.md`. Framings #1 (investigation, not checking), #4 (asking and testing are parallel), #5 (don't import old-world costs — central to the oracle reframe below), #6 (economics: checking is cheap, investigation is the bottleneck) and #9 (smells — humans are the oracle for some questions) are load-bearing here.
- **The learning needs and their methods.** From `/test-strategy`: the Learning Needs section of `$PROJECT_DIR/quality/test-strategy.md`. Standalone: ask the user what they want to find out, and capture it as a short list of questions.
- **The test infrastructure inventory.** From `$PROJECT_DIR/quality/test-pre-read.md` if it exists; otherwise a quick filesystem pass (test dirs, CI config, test commands, config files). **Do not read source code** — judge the means of finding out from the strategy, the infrastructure inventory, and conversation, to keep the independence of perspective testing relies on (FRAMINGS #3).

## The work, in order

### 1. Map each learning need to its instrument and its oracle

For each learning need (standalone: each thing the team wants to learn), state the two things its proposed method depends on:

- **Instrument** — how you'll exercise the system and observe a result. Be specific: *"run Y under condition Z, capturing W."*
- **Oracle** — how you'll decide the observed result is correct. Name it explicitly. A method that observes a result but can't say what "correct" looks like has no oracle yet — that's a finding, not a detail.

### 2. Assess the instrument — Adequate / Inadequate / Missing

- **Adequate** — exists and can exercise/observe *this* question at the fidelity required.
- **Inadequate** — exists but can't reliably produce the needed observation (the integration suite only runs on a perfect network; unit tests can't drive real concurrency).
- **Missing** — nothing exists; it must be built or acquired.

### 3. Assess the oracle — Adequate / Inadequate / Missing — and don't accept "there's no oracle"

Classify the oracle on the same scale. The oracle is *whatever lets you decide a result is correct*; the kinds, cheapest-signal to richest:

- **Specified** — a spec, contract, or known-correct value states the expected answer.
- **Property / metamorphic** — invariants that must hold even when you don't know the exact answer (*"intervals never shrink on a correct recall"*; *"encode∘decode = identity"*; *"A→B→A round-trips"*).
- **Differential / simulated** — an independent, deliberately-simple, obviously-correct (if slow) **reference implementation** that the real system is diffed against. In the agent era an agent can often write this cheaply — the classic *simulated oracle*. Also: a prior version, or a competitor, as the reference.
- **Golden master / snapshot** — a captured known-good output, re-judged whenever it changes.
- **Human or agent-judge** — for trust, feel, and quality questions a person is the oracle; agents lack smells, so humans stay the oracle there (FRAMINGS #9). An agent-judge panel can scale fuzzy judgements where that's appropriate, but name it as the oracle and note its limits.

**Kill the old-world reflex (FRAMINGS #5).** *"There's no oracle for this, so we can't test it"* was often true under human costs and is usually false now. When the oracle is Missing or Inadequate, the default move is to **propose constructing one** — most often a property or a simulated/reference oracle — as a build item, not to drop the learning need.

### 4. Verdict and build items

A learning need is **answerable** only if both instrument and oracle are Adequate. For every Inadequate/Missing axis, name the **build item**: what must be built or acquired, and which learning need(s) it unblocks. Oracle-build items (write a reference implementation; define the properties; author the expected outputs) are first-class here alongside instrument-build items. These are what `/test-strategy`'s closing step marks as gating.

### 5. Catch the mismatches (FRAMINGS #1, #6, #9)

- **Checking aimed at investigation** — tooling/oracles that only verify known expected behaviour where the learning need actually calls for finding out what's true.
- **Automation aimed at judgement** — a learning need about trust/feel/quality assigned a purely automated oracle. The human is the oracle there; say so.

## Push back when

- Every instrument or oracle comes back "Adequate" with no reasons. That's the Q2-collapse failure mode — re-run, demanding a specific justification per item for *this* question.
- A Missing oracle is treated as "untestable." Challenge it: *"under agent costs, could we write a simple reference implementation, or state a property, that judges this?"* (FRAMINGS #5).
- A trust/feel/quality learning need is handed a purely automated oracle (FRAMINGS #9). The human is the instrument and the oracle; pretending a tool covers it is the inadequacy.
- The user wants to treat "we have a test suite / CI" as evidence of adequacy. Adequacy is per-question, not per-repo — a suite can be excellent for some learning needs and blind to others, and a green suite says nothing about questions it has no oracle for.

## This skill is DONE when

- [ ] Every learning need names both its instrument and its oracle.
- [ ] Each is classified Adequate / Inadequate / Missing, and every "Adequate" carries a specific reason for *this* question (not "tests exist").
- [ ] Every Missing/Inadequate oracle has either a proposed constructed oracle (property / simulated-reference / golden-master / human-or-agent-judge) or an explicit, defended statement that none is feasible.
- [ ] A build item is named for every Inadequate/Missing axis (instrument *and* oracle), each tied to the learning need(s) it unblocks.
- [ ] Checking-vs-investigation and automation-vs-judgement mismatches are flagged.
- [ ] No source code was read.
- [ ] (When run from `/test-strategy`) the build items are returned to the orchestrator so the closing step can gate on them, and the assessment is written to `$PROJECT_DIR/quality/.scratch/3.5-tooling-adequacy.md`.

## Output

When run from `/test-strategy`, return the assessment to the orchestrator **and** write it to `$PROJECT_DIR/quality/.scratch/3.5-tooling-adequacy.md` (the sealed-dispatch scratch file `/test-strategy-review` audits — hard evidence this Q2 check actually ran). Standalone, surface it in the conversation and offer to write it to `$PROJECT_DIR/quality/tooling-adequacy-<YYYY-MM-DD>.md`. Shape:

```markdown
# Tooling & oracle adequacy

*Can we actually find these things out — and would we know if the answer were wrong?*

| Learning need | Instrument (exercise/observe) | Oracle (judge correctness) | Answerable? | Build items |
|---|---|---|---|---|
| … | … — Adequate/Inadequate/Missing | … — Adequate/Inadequate/Missing | Yes / Blocked | … |

## Build items (gating)

- **<instrument or oracle to build>** — unblocks <learning need(s)>. <Note if it's a simulated/reference oracle or a property set.>

(Or: "None — every learning need has an adequate instrument and oracle, with the per-item reasons above.")
```
