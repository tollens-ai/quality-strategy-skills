---
name: tooling-strategy
description: Produce the strategy for the second quality question — "how do we know if what we have is good?" Gathers every place the quality and test strategies could NOT answer that (Unknown, Gated, and Over-confident actuals; learning needs blocked on instruments or oracles) and turns them into a prioritised oracle/instrument build plan at quality/tooling-strategy.md. Use after /quality-strategy (ideally also /test-strategy), when Unknowns are piling up in the risk map, or when deciding what measurement or test infrastructure to build next.
---

# Tooling Strategy

This skill produces the third strategy in the pack — the strategy for **Q2, "how do we know if what we have is good?"**

The other two strategies *depend* on Q2 being answerable but don't plan how to make it so. `/quality-strategy` judges the actual state (Q3) using whatever **oracles** exist — an oracle is anything that can judge whether an output is good — and honestly records where they don't: as Unknowns, Gated dimensions (unjudgeable until an oracle exists), and oracle-build items. `/test-strategy` plans the investigation, and honestly records which learning needs (questions the tests must answer) are blocked on missing **instruments** — things that exercise or observe the system — or oracles. Both strategies *name* these gaps; neither plans the build. That's this skill's job: collect every "we can't actually answer that yet" from both strategies and turn the pile into one prioritised, sequenced **oracle and instrument build plan**.

Building oracles is routinely the highest-value quality work an early-stage project can do. A weak oracle gives false confidence; a missing one leaves the most important dimensions permanently Unknown. Yet this work rarely gets planned, because each gap surfaces in a different place and none looks urgent alone. Gather them in one place, weigh each build by what it unblocks, and the priorities are usually obvious.

The demand arrives as **requirements** — "we must be able to judge X at this fidelity". This skill takes each requirement the rest of the way: into a spec, a source decision (build it, adopt something open-source, buy it, or extend what exists), and a place in a sequenced plan. Each piece of tooling is a mini-product. Its stakeholders are fixed and known — the team, the agents who will run it, the strategies that consume its verdicts — so it needs none of the interview machinery; but the same four questions apply in miniature, and each item needs real answers to them (see step 2).

## What this skill is not

It is **not an audit, and it does not re-audit.** The per-item adequacy verdicts come from the two Q2 audit skills, which run inside the parent strategies: `/oracle-adequacy` (inside `/quality-strategy`, on the risk map's actual-state claims) and `/tooling-adequacy` (inside `/test-strategy`, on the learning needs). This skill *consumes* their outputs. If the inputs lack those verdicts, send the user back to the audit (it runs standalone) rather than improvising adequacy judgments here.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). The grounding files this skill reads — `PHILOSOPHY.md`, `skills/tooling-adequacy/SKILL.md` — live under it.
- **PROJECT_DIR** — the absolute path of the project whose tooling you're planning (normally the current working directory; confirm with the user if it's ambiguous). The strategy docs live under `$PROJECT_DIR/quality/`.

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them.** The Read tool does no variable expansion and resolves relative paths against the current working directory, not this skill's directory — so an unsubstituted placeholder or a bare relative path will fail.

## When to use

- **After `/quality-strategy` — before *or* after `/test-strategy`.** This skill has two natural entry points, and the risk map — the strategy doc's table of quality dimensions, their actual state, and the confidence behind each claim — decides which (Q2 before Q3: you can only investigate what you can judge). When the risk map came out **dominated by Unknowns and Gated dimensions**, run this skill *immediately* — plan the builds that make the project knowable before planning the investigation. A test strategy written against dimensions nobody can judge is mostly "blocked". When the risk map is **mostly answerable**, let `/test-strategy` run first and sharpen the demand (its `/tooling-adequacy` check surfaces blocked learning needs), then run this skill on the combined pile.
- **When deciding what test or measurement infrastructure to build next** — this skill's output *is* that decision, made with the full demand visible instead of ad hoc.
- **Re-run freely.** This is the most re-runnable of the three strategies: re-run when build items land (they change what's answerable — see Update protocol in the output), when `/test-strategy` adds the test-side demand, or when either parent strategy is revised. **On any re-run over an existing `quality/tooling-strategy.md`, archive it first** — snapshot to `quality/archive/tooling-strategy-<last-updated-date>.md` (suffix `-2`, `-3`, … if the name is taken — never overwrite an archive) before changing a word, and mention the archive in the closing summary. Never silently rewrite history: the archive leaves a before/after trail the user can compare and share.

## What you need

- **Grounding.** Read `$PLUGIN_ROOT/PHILOSOPHY.md`. The disciplines that recur — make confidence visible; record assumptions; push back on vagueness — are load-bearing here. Read step 3 of `$PLUGIN_ROOT/skills/tooling-adequacy/SKILL.md` for the canonical oracle taxonomy (Specified / Property-or-metamorphic / Differential-or-simulated / Golden-master / Human-or-agent-judge) and the "kill the old-world reflex" move; every build item in the plan names its kind from that taxonomy.
- **The quality side.** From `$PROJECT_DIR/quality/strategy.md`: Part 6 (the risk map — oracle verdicts, Unknowns with their to-resolve notes, oracle-build items, confidence ratings) and Part 5 (the H/M impact ratings, which weight the value of each build). Part 7 for any build-shaped actions already enumerated (Part 7 may be a recorded deferral — fine; the risk map carries everything this skill needs).
- **The test side, if it exists.** From `$PROJECT_DIR/quality/test-strategy.md`: the "Blocked on tooling & oracles" section (blocked learning needs with their build items) and the learning-needs tiers (which weight value on this side). If `/test-strategy` hasn't run, proceed on the quality side alone and say so in the output — don't guess at learning needs that haven't been derived.
- **The user.** The value calls below are theirs to confirm, and they usually know pains neither strategy captured — the flaky suite nobody trusts, the metric nobody believes. Ask.

If `quality/strategy.md` doesn't exist, stop: this skill plans the build for gaps the other strategies have *found*, and has nothing to consume yet. Point the user at `/quality-strategy` first (or at `/oracle-adequacy` standalone, if they have an existing strategy doc from elsewhere that lacks oracle verdicts).

## Session start — itinerary and commit cadence

At the start of every working session (first or resumed), before the next move's work, two quick moves:

- **Give the itinerary, in plain words.** Five moves, by human name, with rough sizes: *"Gather everything the project can't answer about itself yet (quick — mostly collection); spec each build — what it must do, what it unblocks, build-or-adopt (the bulk of the work); weigh value against cost (short, mostly your calls to confirm); sequence it into phases (short); and close the loop — what each build triggers when it lands."* On resumption or a re-run, lead with what's done or changed since last time, then the remainder.
- **Ask the commit-cadence question (git-managed projects).** Where `$PROJECT_DIR` is git-managed, ask once: *"Want me to commit at each move's boundary, commit everything at the end, or leave the commits to you?"* Suggest commit-as-we-go as the default (cheap rollback, visible progress). Honour the answer at every boundary.

## The work, in order

Write the doc incrementally as each move completes, so what's done is durable; on re-entry, resume from the last completed move. At each move's boundary, give one progress line (where we are, what remains, relative sizes) and the visible exit — what the user already has if they stop here (the demand table alone is a useful artifact, and the doc picks up where it left off). At a boundary it's safe to `/clear`; say how to resume in the same breath, so resuming is stated, never guessed — *"safe to `/clear`; to pick up, run `/tooling-strategy` again and it reads `quality/tooling-strategy.md` (and the strategies it draws from) and continues from the last completed move."* The user should never feel the work is unbounded, or have to gamble that re-running the skill works. This is also where the boundary commit lands if the user chose commit-as-we-go.

### 1. Gather the demand

Collect every place the project currently *can't* answer "how good is it?":

- From the risk map: every **Gated** dimension (Unknown, blocked on a missing oracle) and every **Over-confident** dimension (a claimed actual whose oracle can't support it) with its oracle-build item; every **Unknown** with its to-resolve note.
- From the test strategy (if present): every **blocked learning need** with its build item.
- From the user: *"Anything else you already know you can't measure or judge, that neither doc captured?"* Record these honestly as user-reported, not strategy-derived.

**Deduplicate across the two sides.** The same underlying build often appears twice — the risk map can't establish an actual for the same reason a learning need is blocked. Merge them into one item that names both beneficiaries — being needed on both sides is exactly what makes it valuable.

### 2. Spec each item — every tool is a mini-product

The gathered demand is requirements; this step turns each into a spec and a decision. Per item:

- **What it must do** — instrument (exercise/observe) or oracle (judge), the kind from the taxonomy, and the question(s) it must answer at the fidelity they demand. *"Property set: intervals never shrink on a correct recall"*, not *"better testing for the scheduler."*
- **What it unblocks** — the dimension(s) and learning need(s), by name. An item that unblocks nothing doesn't belong in the plan.
- **What "good" means for this tool** — one line. The universal dealbreaker is **false confidence**: a tool that passes wrong things is worse than no tool, because the Unknown was at least visible. Good enough = answers its question at the required fidelity, and cheap enough to actually get run.
- **Source: build / adopt / buy / extend** — a concrete decision per item, not a default. The asymmetry to expect: *instruments* often already exist (fault injectors, load generators, fuzzers, coverage, monitors — adopting usually beats building); *oracles* more often need building, because they encode *this project's* definition of correct. "Extend" — bolting the missing oracle onto an existing harness — is frequently the cheapest real option. One line of reasoning either way.
- **Calibration — the recursive Q2** — how we'll know the tool *itself* judges correctly. Cheap standard moves: seed known-bad cases and confirm it catches them; diff it against the reference implementation; human-verify its first real verdicts. A tool with no calibration plan is a false-confidence machine waiting to happen.
- **Who does the work** — agent-buildable now (most reference oracles, property sets, harnesses are), needs human judgment or access (rubrics where a person is the oracle, production telemetry, real-user observation), or a pairing of the two.

### 3. Weigh value and cost

Propose a value/cost reading per item and confirm it with the user:

- **Value** comes from what it unblocks: the impact rating of the dimensions (H beats M), the tier of the learning needs, and **breadth** — one harness that unblocks five learning needs beats five one-shot builds. Converting an Unknown on one of the risk map's *hottest* rows is the single highest-value move available.
- **Cost** under agent economics: most oracle construction is now agent-cheap — don't price it at human cost. Flag the genuinely expensive items (infrastructure, production access, recruiting humans for judgment sessions) rather than letting them silently sink the plan.
- **Trustworthiness of the build itself**: would the built oracle actually be able to judge the question? A cheap oracle that can't is worse than no oracle — it converts a visible Unknown into invisible false confidence. If you doubt an item can work, say so on the item; building a small *probe* of it first can be the Phase-1 step.

### 4. Sequence into a build plan

Order the items into phases, with the reasoning stated:

- **Quick wins first** — agent-cheap, high-unlock items (typically property sets and simulated/reference oracles on hot dimensions).
- **Dependencies** — an oracle that judges observations needs its instrument to exist first; shared infrastructure that several items sit on comes before them.
- **Group shared work** — items that ride the same harness or the same telemetry build belong in one phase.
- **Defer with reasons** — low-value or speculative items are listed as deferred with a one-line reason, not silently dropped.

### 5. Close the loop

For each planned item, state what changes when it lands: which risk-map rows to re-assess (via the quality strategy's update protocol — a revision-mode pass over 6.2–6.3), and which blocked learning needs come unblocked (via the test strategy's after-tier update). The build plan only pays off because it turns Unknowns into questions we can answer — name that conversion per item, so landing a build triggers the re-assessment instead of leaving the new capability unused.

Then write the Update protocol section: re-run this skill when a phase of builds lands, or when either parent strategy is revised.

## Push back when

- **Every item is an instrument and none is an oracle** (or vice versa). "Build a dashboard" with no statement of how anyone judges what it shows is half a capability; answering a question takes both (see `/tooling-adequacy`).
- **The judgment-oracle items all got deferred because they're "not automatable."** Human-as-oracle is a build item too — defining the rubric, naming the person, scheduling the session. Deferring everything a machine can't judge silently drops the trust/feel dimensions, which are often the hottest.
- **The user wants to build measurement for its own sake** — an oracle for a None-rated dimension, an instrument no learning need asked for. Value comes from what an item unblocks; if it unblocks nothing, it's not in this plan.
- **An Over-confident actual is left standing with its build item deferred.** That's a strategy resting on sand, with the sand now documented. Either the oracle gets built or the confidence gets downgraded in the risk map — pick one, explicitly.
- **Everything is Phase 1.** Sequencing *is* the strategy; a plan where nothing is deferred and nothing is ordered hasn't made any decisions.
- **Every source decision comes back "build our own."** Under agent economics building is cheap — but maintaining isn't, and mature existing instruments usually beat bespoke ones. Ask per item: *"what existing tool was considered, and why was it rejected?"* Reflexive build-it-all is the new old-world bias.
- **An adopted or bought tool is assumed adequate because it's popular.** Adequacy is per-question (that's the whole point of the audits) — a famous load-testing tool can still be blind to *your* question. Adopted tools get the same calibration plan as built ones.

## This skill is DONE when

- [ ] Every Gated and Over-confident dimension from the risk map, and every blocked learning need from the test strategy (when present), appears in the plan — planned in a phase, or deferred with a stated reason. Nothing silently dropped.
- [ ] Cross-side duplicates are merged, with both beneficiaries named.
- [ ] Every build item names: instrument or oracle (and the oracle kind), what it unblocks, who does the work (agent / human / pair), and its value reasoning.
- [ ] Every build item carries a **source decision** — build / adopt / buy / extend — with one line of reasoning (and for adopt/buy, the candidate named).
- [ ] Every build item has a **calibration note** — how we'll know the tool itself judges correctly.
- [ ] The phases have stated sequencing reasons; deferred items have stated reasons.
- [ ] Every planned item states what to re-assess when it lands.
- [ ] The doc records which inputs it was derived from (and says so plainly if the test side was absent).
- [ ] The user has confirmed the priorities — explicit confirmation on the value calls, not silence.

## Output

Write to `$PROJECT_DIR/quality/tooling-strategy.md` (the third strategy doc, beside `strategy.md` and `test-strategy.md`). Shape:

```markdown
# Tooling strategy — how we'll know

*Derived from quality/strategy.md (<its last-updated date>) and quality/test-strategy.md (<date>, or "not yet written — quality side only").*

## What we can't answer today

| # | Question we can't answer | Side | Blocked on | Impact |
|---|---|---|---|---|
| 1 | <dimension actual or learning need, in plain words> | quality / test / both | instrument: <…> / oracle: <…> | <H/M dimension(s), tier(s) it carries> |

## Build plan

### Phase 1 — <name>

*Why first: <one line — e.g. agent-cheap, unblocks the hottest rows>*

1. **<Build item.>** <Instrument or oracle — kind; the question it must answer.> Unblocks: <dimensions / learning needs>. Source: <build / adopt <named tool> / buy <vendor> / extend <existing thing>> — <one-line why>. Work: <agent / human / pair>. Calibration: <how we'll know it judges correctly>. When it lands: <what to re-assess>.

### Phase 2 — <name>

…

### Deferred

- **<item>** — <one-line reason>.

## Update protocol

Re-run `/tooling-strategy` when a phase of builds lands or when `quality/strategy.md` / `quality/test-strategy.md` is revised. Landing a build item is not the end of its story: the re-assessment it unblocks (named per item above) is what converts the new capability into updated confidence in the risk map.

**Assumptions made:** <bullet list, or "none">

**Open questions:** <bullet list, or "none">
```

Summarise the plan back to the user in 5–7 lines — the phases, the headline quick wins, what got deferred, and (on a re-run) where the prior version was archived — and confirm the priorities before declaring it done.
