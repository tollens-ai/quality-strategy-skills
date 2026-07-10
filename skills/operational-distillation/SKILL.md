---
name: operational-distillation
description: Turn a complete-but-dense quality or test strategy into something operational — a 6–10 line TL;DR plus a one-page triage rubric (and an optional operator cheat sheet) placed at the top of the doc, so a returning reader re-orients in seconds instead of skimming hundreds of lines. Use from /quality-strategy at the end of the plan of work, or standalone to distill any existing strategy.
---

# Operational Distillation

A finished strategy is optimised for the moment it was written, not the moment it's read. Someone returning weeks later — or an agent picking it up cold to triage a new finding — has to skim the whole thing to get their bearings back. This skill adds what the finished doc lacks: a short distillation at the top, so a reader can re-orient fast and triage without reading end-to-end.

It produces, at the top of the strategy doc:

1. **An Operational TL;DR** (6–10 lines) — what this project is, who matters most, the hottest risks right now, and what the plan's first moves are.
2. **A one-page triage rubric** — how to map a new thing (a bug, a request, a complaint, an unexpected result) to this strategy and decide what to do, without escalation.
3. **(Optional) an operator cheat sheet** — only when the project has recurring operational decisions worth a quick-reference (common commands, "if X then Y" rules). Skip it when there's nothing real to put there; an empty cheat sheet is worse than none.

The distillation is a *view* of the strategy, not a second source of truth. It restates and points into the body; it never asserts anything the body doesn't.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). The grounding file this skill reads — `PHILOSOPHY.md` — lives under it.
- **PROJECT_DIR** — the absolute path of the project whose strategy you're distilling (normally the current working directory; confirm with the user if it's ambiguous). The strategy docs normally live under `$PROJECT_DIR/quality/` — but `/quality-strategy` asks at session start where the strategy should be saved, so they may live elsewhere. If `$PROJECT_DIR/quality/` is absent, get the docs home instead of assuming: from the orchestrator's brief when this skill was dispatched, else by asking the user; if the path you're given ends in `/quality`, its parent is the home. From then on treat `$PROJECT_DIR` as that docs home wherever a path below says `$PROJECT_DIR/quality/...` — one substitution, made once, before you act on any path.

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them.** The Read tool does no variable expansion and resolves relative paths against the current working directory, not this skill's directory — so an unsubstituted placeholder or a bare relative path will fail.

## When to use

- **From `/quality-strategy`** — invoked at the end of sub-step 7.3 (plan of work), once the strategy is content-complete and before / as part of the final review. Output: the TL;DR + triage rubric inserted at the top of `quality/strategy.md`.
- **Standalone** — to distill any existing `quality/strategy.md` (or `quality/test-strategy.md`) that lacks an operational layer, or to refresh one that's drifted from the body after revisions.

## What you need

- **Grounding.** Read `$PLUGIN_ROOT/PHILOSOPHY.md` — in particular the indicators this skill serves: *quick re-orientation* and *decision support at the edges*.
- **The strategy.** Read the target doc end-to-end. You cannot distill what you haven't read; a TL;DR written from the headings alone will be wrong.
- **Which doc.** By default this skill distills `$PROJECT_DIR/quality/strategy.md` (the quality strategy). When pointed at `$PROJECT_DIR/quality/test-strategy.md` — or when the user or orchestrator names it — distill that doc instead, and adapt what you extract and where you insert it (see the test-strategy variant in step 1; the Output template works for either doc). If it's unclear which doc to distill, ask.

## The work, in order

### 1. Read the whole strategy and extract the load-bearing few

From the full doc, pull only what a returning reader most needs:

- **What & for whom** — purpose (Part 1) and the one or two stakeholders who matter most (Part 3).
- **What good looks like, sharply** — the dimensions rated H and the Dealbreakers (Parts 3, 5).
- **Where we actually are** — the hottest risk-map rows: largest gaps in highest-impact dimensions, and the most consequential Unknowns (Part 6).
- **First moves** — the plan's earliest / blocking actions (Part 7, Phase 0–1). If Part 7 just records that the plan is deferred to the follow-on skills, point first moves at the risk map's hottest items and the named follow-ons (`/test-strategy`, `/tooling-strategy`) instead.
- **What's deliberately out** — the one or two non-goals most likely to be mistaken for gaps (Part 4).

Throughout the TL;DR and rubric, **use names, not coordinates** (PHILOSOPHY: *write for both readers*): the distillation is read cold, so refer to actions and dimensions by their short human names with any label trailing as a pointer — *"the payment-divergence simulation (Action F)"*, never a bare letter or number.

**Test-strategy variant.** When the target is `quality/test-strategy.md`, the doc has a different shape (the filter table, then per-ility Have / Improve / Add with agreed moves), so pull instead:

- **Purpose** — what this strategy investigates and which quality strategy it operationalises.
- **The top agreed moves** — the highest-priority investigations and the questions they answer.
- **Priority order** — which ilities were tackled first (Dealbreaker-linked ilities first, cheaper-to-learn within similar impact) and any agreed move worth flagging as especially high-priority or still uncertain.
- **Blocked items** — any agreed moves marked blocked on missing instruments or oracles.
- **Key non-targets** — the one or two things deliberately not being tested, most likely to be mistaken for gaps.

The quality-strategy extraction above is the default; use this variant only when distilling a test strategy.

### 2. Write the Operational TL;DR (6–10 lines)

Tight, plain, scannable. Every line earns its place. It answers, in order: what is this, who matters most, what's the sharpest quality bar, where's the biggest risk right now, what's the first move, what's deliberately out of scope. Don't narrate how the strategy was made, and don't hedge — this is a returning reader's fastest path back to context.

### 3. Write the one-page triage rubric

A reader hits a new thing — a bug report, a feature ask, a complaint, an odd result — and needs to decide *what bucket is this, does it matter, what do I do* without escalating. Give them a decision aid:

- **Map to a dimension / stakeholder** — "is this about a dimension we rated H/M, and whose bar does it touch?"
- **Severity from the strategy** — touches a Dealbreaker → urgent; touches an H gap → important; touches a None / non-goal → likely out of scope, say so and stop.
- **Route** — testing question → `/test-strategy`'s agreed moves; evaluation question (how would we judge or track this?) → `/evaluation-strategy`; process question → `/process-strategy`; stakeholder question → confirm the bar; fixing → the plan of work.
- **When in doubt** — the one or two questions that resolve most ambiguity for *this* project.

Before you insert the rubric, run a **rating-label cross-check** against the body:

1. Build a small table from Part 5: each dimension name → its exact merged rating (`H`, `M`, or `None`). **Part 5 is the source of truth for dimension ratings.** Do not infer ratings from Part 6 row headers, plan phases, risk language, or your own sense of urgency.
2. Cross-check every rating label in the Operational TL;DR and triage rubric against that table. If the distillation says a dimension is High/Medium/None-rated (or groups it with High/Medium/None dimensions), the label must match Part 5 exactly.
3. Keep separate concepts separate in wording: Part 5 rating = impact size; Part 6 confidence/actual state = evidence and current condition; Part 7 phase = work order. A Medium dimension can be Phase 0 if it blocks learning, and a High dimension can be already well-covered. Do not let those later sections silently relabel the dimension.
4. If a useful rubric rule depends on Part 6 or Part 7 rather than Part 5, name that basis explicitly — e.g. "Unknown actual-state confidence" or "Phase 0 gate" — instead of calling it a different dimension rating.

For a test strategy, the rubric maps a new finding to an **ility and its agreed moves** (rather than a quality dimension): which kept ility does it bear on, how high does that sit in the priority order, and does it change any agreed move or its answered-when state?

Keep it to a page. It's a rubric, not a runbook.

### 4. (Optional) operator cheat sheet

Only if the project has recurring operational decisions or commands worth a quick reference. If there's nothing real, omit the section entirely and say why in one line to the user. Do not manufacture filler.

### 5. Place it at the top and check it against the body

Insert the distillation immediately after the title block — the title, the `Last updated` line, the `Release:` line if present, and the producer's version stamp line if one is present (leave that stamp intact; it is deliberate attribution, not machinery) — above the first substantive section: the `## Strategy job` paragraph and Part 1 for a quality strategy, or the equivalent top section (purpose) for a test strategy. Then re-read it against the body: every claim in the TL;DR and rubric must have backing in the body, and the TL;DR must not miss anything load-bearing in the body (a Dealbreaker, the hottest risk). The distillation is a faithful view — if it and the body disagree, the body wins and the distillation is wrong.

## Push back when

- The user wants the TL;DR to add detail or nuance the body doesn't contain. *"The distillation is a view of the strategy, not a place to add to it. If that nuance matters, it belongs in the body first."*
- The body is thin or contradictory. *"A distillation can't fix a strategy that isn't there. This reads as incomplete in Part X — worth finishing or reviewing before we distill."* (Distilling a broken strategy produces a confident-looking but misleading TL;DR.)
- The cheat sheet would be filler. Omit it.

## This skill is DONE when

- [ ] The full strategy has been read end-to-end (not just headings).
- [ ] An Operational TL;DR of 6–10 lines sits at the top, covering what / who / sharpest bar / hottest risk / first move / key non-goal.
- [ ] A one-page triage rubric is present and usable to triage a new finding without escalation.
- [ ] The operator cheat sheet is either present with real content or deliberately omitted.
- [ ] Every distillation claim is supported by the body, and no load-bearing body item is missing from the TL;DR.
- [ ] Every rating label in the TL;DR / triage rubric has been mechanically cross-checked against Part 5's merged H / M / None rating table; no Part 6 confidence, risk, or Part 7 phase language has been mistaken for a dimension rating.
- [ ] The distillation is placed above the first substantive section (`## Strategy job` and Part 1 for a quality strategy, or the top section for a test strategy), not buried.
- [ ] (When run from `/quality-strategy` against the quality strategy) a scratch file is written recording what was extracted (see Output). A standalone test-strategy run needs no scratch file.

## Output

The TL;DR + triage rubric (+ optional cheat sheet) inserted at the top of the target doc (`$PROJECT_DIR/quality/strategy.md` by default, or `$PROJECT_DIR/quality/test-strategy.md` when distilling a test strategy):

```markdown
# <Quality | Test> Strategy: <project name>

*Last updated: <YYYY-MM-DD>*
*Generated by the `…` skill — quality-strategy-skills (tollens-ai) v<version> · …*   <!-- the producer's version stamp, if present — leave it intact -->

## Operational TL;DR

- **What:** <one line>
- **Who matters most:** <stakeholder(s)>
- **Sharpest bar:** <the Dealbreaker / top H dimension>
- **Hottest risk now:** <largest gap or most consequential Unknown> → see Part 6
- **First move:** <Phase 0–1 action> → see Part 7
- **Deliberately out:** <key non-goal> → see Part 4
  <6–10 lines total>

## Triage rubric

*New bug / request / complaint / odd result → how to place it:*

1. **Which dimension & stakeholder?** …
2. **How severe (from the strategy)?** Dealbreaker → urgent; H gap → important; None / non-goal → out of scope, stop.
3. **Route:** testing → … ; stakeholder → … ; fixing → … .
4. **When in doubt:** <the one or two clarifying questions for this project>.

<!-- optional -->
## Operator cheat sheet

<recurring decisions / commands / if-X-then-Y, or omitted>

<!-- first substantive section of the existing doc, unchanged -->
## Strategy job   <!-- quality strategy; for a test strategy this is the Purpose section instead -->

<existing top section>
…
```

The insertion point is the same for either doc: place the distillation immediately after the title block (title, `Last updated`, the `Release:` line if present, and the producer's version stamp line if present — leave the stamp intact), above the first substantive section — the `## Strategy job` paragraph (then Part 1) for a quality strategy, or the equivalent top section (purpose) for a test strategy.

When run from `/quality-strategy` against the quality strategy, also write a scratch file at `$PROJECT_DIR/quality/.scratch/7.3-operational-distillation.md` recording which Parts the distillation drew from (the sealed-dispatch scratch file the review skill audits — see `/quality-strategy` SKILL.md, "Sealed-context dispatch and scratch files"). The orchestrator's brief carries the absolute docs-home path — a sealed dispatch can't ask where the docs live, so write where the brief says, never a path derived from your own working directory. A standalone run — whether against the quality or the test strategy — needs no orchestrator scratch file: insert the distillation into the doc as above and tell the user what you added.
