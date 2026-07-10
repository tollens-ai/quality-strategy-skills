---
name: oracle-strategy
description: A deliberately light follow-up to /quality-strategy for the oracle lane — ingest the release's quality strategy, filter for the ilities better judging can make a dent on (Unknowns nothing can judge yet, claims resting on oracles that couldn't support them, "we wouldn't notice if it broke"), then per ility discuss what oracles you have, what could be improved, and what could be added. High-level ideas and questions, not step-by-step hand-holding. Produces quality/oracle-strategy.md. Use after /quality-strategy completes for a release.
---

# Oracle Strategy

One of the three light follow-ups to `/quality-strategy` — the **oracle** lane, beside `/test-strategy` (testing) and `/process-strategy` (rules, invariants, and processes). An **oracle** is anything that judges whether what you observe is good; an **instrument** is what lets you observe it at all. This lane plans how the project will *know* — per prioritised ility — rather than trusting whatever signal happens to exist.

**This skill is deliberately much lighter than `/quality-strategy` — and that's a design decision, not a shortcut.** The quality strategy is the thorough one: a structured multi-session interview that walks you step by step and refuses to skip substance. This skill assumes that work is done and does something different: it gives you **high-level ideas and good questions**, per ility, and captures what you decide. It will not hold your hand through a step-by-step process, dispatch analysis fan-outs, or re-derive what the quality strategy already established. One or two focused conversations, one short document. When a discussion here needs real depth, the skill points at the deeper tools rather than becoming one: `/oracle-adequacy` to audit whether existing oracles can actually be trusted, `/tooling-strategy` to turn agreed build items into a prioritised build plan.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Resolve two paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). Grounding files — `PHILOSOPHY.md`, `skills/tooling-adequacy/SKILL.md` (the shared oracle taxonomy), `.claude-plugin/plugin.json` (whose `version` field stamps the output) — live under it.
- **DOCS_DIR** — where the `quality/` docs live; every `quality/...` path below resolves under it. Normally the current working directory — but `/quality-strategy` asks at session start where the strategy should be saved and records the choice in `quality/.scratch/session-config.md`; this doc joins that same family. If the working directory has no `quality/`, ask the user where the strategy was saved (a path ending in `/quality` means its parent is the home) — never scaffold a fresh `quality/` beside code whose strategy lives elsewhere.

Substitute resolved absolute paths before acting on them — in your own Reads and in any subagent brief; the Read tool does no variable expansion, and a dispatched subagent inherits none of your context.

## Before you start

1. **`$DOCS_DIR/quality/strategy.md` must exist for this release**, completed at least through Part 6 (Risk Map). If it doesn't, stop and direct the user to `/quality-strategy` — this skill filters and discusses that strategy's prioritised ilities; without it there is nothing to filter.
2. **Read `$PLUGIN_ROOT/PHILOSOPHY.md`** (make confidence visible; interview, don't infer; push back on vagueness) and **step 3 of `$PLUGIN_ROOT/skills/tooling-adequacy/SKILL.md`** — the oracle kinds (Specified / Property-or-metamorphic / Differential-or-simulated / Golden-master / Human-or-agent-judge) and the "kill the old-world reflex" move. Those kinds are the idea vocabulary for the whole discussion.
3. **Session choices.** Read `quality/.scratch/session-config.md` and restate the standing choices in one line — *including* where these answers will be recorded and who can read them: this lane's discussion is candid too (what's actually weak, what nobody really follows), and the candor is only safe while the user knows where their words go. Ask only what the note is missing; if there is no note at all, run the save-location ask exactly as `/quality-strategy` → "Session start" defines it before anything is written.

## The session — ingest, filter, then discuss per ility

**1. Ingest the release's quality strategy.** Read `quality/strategy.md`: the header's `Release:` line (this doc inherits it), Part 3's stakeholder bars, Part 5's H/M-rated ilities, Part 6's risk map — especially the actuals whose basis is thin: Unknowns, low-confidence claims, and anything with an honest "no investigation yet". Part 4's non-goals bound everything. Don't re-litigate the strategy; it's the input. Also read `quality/ideas.md` (the ideas ledger) if it exists: ideas the user volunteered spontaneously mid-strategy, in their words, with no role assigned. Consider each for this lane — could it serve as an oracle or a proxy for a dimension's state? — and raise the fits when their ility comes up; annotate an adopted entry in the ledger (*"→ taken up in oracle-strategy, <date>"*) rather than deleting it, since the same idea may also serve a sibling lane; an idea whose ility this lane's filter drops simply isn't raised here — it stays unannotated in the ledger for whichever lane kept that ility.

**2. Filter — where can better judging make a dent?** From the H/M ilities, propose the subset where the *oracle* is the bottleneck: actuals sitting at Unknown because nothing can judge them; confident claims resting on oracles that couldn't support them; dimensions where the honest answer to *"would we notice if this broke?"* is no. For each kept ility, one line of why; name the left-out ones too, with why not (usually: the oracle is fine — the gap is testing effort or process, so it belongs to a sibling lane). Confirm the filter with the user before drilling in — it's a proposal, not a verdict.

**3. Per kept ility, in priority order, discuss three questions.** High-level ideas and questions — offer candidates, ask, capture what the user decides. Keep each ility to a few minutes unless the user wants to go deep.

- **What do you have already?** What currently observes this ility (instrument) and judges it (oracle)? Name both plainly. *"CI is green"* is an oracle for what the suite asserts — what does it assert about *this* ility? If whether the existing oracles can be *trusted* becomes the real question, that's an `/oracle-adequacy` audit — offer it rather than improvising one here, and dispatch it with the resolved absolute `$DOCS_DIR` doc path and a scratch destination (`quality/.scratch/oracle-adequacy-<YYYY-MM-DD>.md`) in the brief; a sealed dispatch can't ask where the docs live.
- **What could be improved?** Where an oracle exists but judges the wrong thing or too coarsely — aggregate uptime standing in for tail latency, a smoke test standing in for data integrity, a dashboard nobody reads. What one change would make the existing signal actually judge the bar the stakeholders set?
- **What could be added?** Walk the oracle kinds as an idea list: a stated property set ("no path loses user data"), a cheap simulated/reference implementation to diff against, a golden master, a defined SLO plus its measurement, a human or agent judge for taste/trust dimensions (name its limits). Under agent costs an oracle is usually cheap to build — *"there's no way to judge this"* is almost always *"we haven't decided how to judge this"*.

**Capture as you go**: per ility, a few lines under Have / Improve / Add, plus one to three **agreed next moves**. An idea the user rejects is recorded as considered-and-set-aside if it sharpened anything; otherwise dropped, not padded.

## Push back when

- Every ility comes back "our current signals are fine" with no per-ility reason — that's the Q2 collapse this lane exists to catch. Ask, per ility: *"what exactly would have told us if this were below the bar last month?"*
- An Unknown is treated as permanently unknowable. Propose the cheapest oracle kind that could judge it, and record it as a candidate build even if deferred.
- A taste/trust/feel dimension gets handed a purely automated oracle. The human is the oracle there; say so and record the human's role.
- The discussion starts re-deriving required levels or re-rating dimensions. That's the quality strategy's ground — revise it there (`/quality-strategy` revision mode), don't fork it here.

## Output

Write to `$DOCS_DIR/quality/oracle-strategy.md`, incrementally as ilities are agreed. Shape:

```markdown
# Oracle Strategy: <project> — <release>

*Last updated: <YYYY-MM-DD>*
*Release: <from the quality strategy's header>*
*Generated by the `oracle-strategy` skill — quality-strategy-skills (tollens-ai) v<version, read from $PLUGIN_ROOT/.claude-plugin/plugin.json at generation time> · github.com/tollens-ai/quality-strategy-skills*

*A light companion to `quality/strategy.md` — high-level oracle ideas and decisions per ility, not a step-by-step plan. Depth lives in `/oracle-adequacy` (audit) and `/tooling-strategy` (build plan).*

## The filter — where better judging makes a dent

| Ility (from Part 5) | In this lane? | Why / why not |
|---|---|---|

## <Ility 1 — priority order>

**Have already.** <instruments + oracles, plainly named>
**Could improve.** <…>
**Could add.** <oracle-kind candidates>
**Agreed next moves.** <1–3 bullets, or "none — deliberately deferred">

## Out of the oracle lane this release

<the filtered-out ilities with their one-line why-nots>
```

On a later update, archive first (`quality/archive/oracle-strategy-<date>.md` — never overwrite an archive), refresh the header stamp, and record a short `## Since the last cycle` section: what each prior agreed move actually produced, and what's newly worth deciding.

Close with the standing gates the pack shares: **invoke `/effective-comms`** on the doc before calling it final, and offer the onward pointers — `/tooling-strategy` if agreed next moves include real builds, `/oracle-adequacy` standalone if trust in existing oracles stayed contested, and the sibling lanes (`/test-strategy`, `/process-strategy`) for the ilities this filter handed to them.

## Escalation points

- The quality strategy's risk map is missing or all-`?` — stop; this lane needs rated ilities and honest actuals to filter. Direct to `/quality-strategy`.
- The user wants this session to *build* the oracles. Building is downstream — capture the agreed moves and point at `/tooling-strategy` (plan) or just do the build after the doc is closed, outside this skill.
- The user asks for the full interview treatment. Offer honesty instead: this lane is deliberately light; if the release genuinely needs deep oracle work planned end-to-end, that is `/tooling-strategy`'s job with this doc as its demand.
