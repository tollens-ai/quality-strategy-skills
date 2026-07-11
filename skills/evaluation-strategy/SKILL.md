---
name: evaluation-strategy
description: A deliberately light follow-up to /quality-strategy for the evaluation lane — ingest the release's quality strategy, filter for the ilities where better judging or better indication can make a dent (Unknowns nothing can judge yet, claims resting on signals that couldn't support them, "we wouldn't notice if it broke"), then per ility discuss what quality instruments — oracles and proxies — you have, what could be improved, and what could be added. High-level ideas and questions, not step-by-step hand-holding. Produces quality/evaluation-strategy.md. Use after /quality-strategy completes for a release. (Formerly /oracle-strategy.)
---

# Evaluation Strategy

One of the three light follow-ups to `/quality-strategy` — the **evaluation** lane, beside `/test-strategy` (testing) and `/process-strategy` (rules, invariants, and processes). This lane plans how the project will *know where it stands* — per prioritised ility — rather than trusting whatever signal happens to exist.

Its vocabulary is **quality instruments**, which differ in **authority** (the shared definitions live in `$PLUGIN_ROOT/skills/test-strategy/FRAMINGS.md` #8):

- An **oracle** is trusted to **judge** — it tells you whether what you observe is good.
- A **proxy** **indicates** — it correlates with quality, is usually cheap to check, and has known blind spots; satisfying it never proves the ility is met.

Both belong in this lane: a project knows where it stands through a mix of trusted judges and cheap indicators, and the craft is knowing which of your signals is which. (One nearby term to keep distinct: the pack also uses **instrument** in a narrower sense — the tool that lets you *observe* at all, a test rig or telemetry feed, per `/tooling-adequacy`. An observation instrument feeds both oracles and proxies; this lane's umbrella term for oracle-or-proxy is *quality instrument*.)

**This skill is deliberately much lighter than `/quality-strategy` — and that's a design decision, not a shortcut.** The quality strategy is the thorough one: a structured multi-session interview that walks you step by step and refuses to skip substance. This skill assumes that work is done and does something different: it gives you **high-level ideas and good questions**, per ility, and captures what you decide. It will not hold your hand through a step-by-step process, dispatch analysis fan-outs, or re-derive what the quality strategy already established. One or two focused conversations, one short document. When a discussion here needs real depth, the skill points at the deeper tools rather than becoming one: `/oracle-adequacy` to audit whether existing oracles can actually be trusted, `/tooling-strategy` to turn agreed build items into a prioritised build plan.

**Formerly `/oracle-strategy`.** Older strategy docs, deferral notes, and session records may point at `/oracle-strategy` or `quality/oracle-strategy.md` — treat those pointers as pointing here. If a `quality/oracle-strategy.md` exists from an earlier run, it is this lane's prior doc: read it as such, and on update archive it under its own name (`quality/archive/oracle-strategy-<date>.md`) before writing `quality/evaluation-strategy.md` with a one-line note that the lane was renamed.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Resolve two paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). Grounding files — `PHILOSOPHY.md`, `skills/test-strategy/FRAMINGS.md` (#8 — the shared oracle/proxy definitions), `skills/tooling-adequacy/SKILL.md` (the oracle taxonomy), `.claude-plugin/plugin.json` (whose `version` field stamps the output) — live under it.
- **DOCS_DIR** — where the `quality/` docs live; every `quality/...` path below resolves under it. Normally the current working directory — but `/quality-strategy` asks at session start where the strategy should be saved and records the choice in `quality/.scratch/session-config.md`; this doc joins that same family. If the working directory has no `quality/`, ask the user where the strategy was saved (a path ending in `/quality` means its parent is the home) — never scaffold a fresh `quality/` beside code whose strategy lives elsewhere.

Substitute resolved absolute paths before acting on them — in your own Reads and in any subagent brief; the Read tool does no variable expansion, and a dispatched subagent inherits none of your context.

## Before you start

1. **`$DOCS_DIR/quality/strategy.md` must exist for this release**, completed at least through Part 6 (Risk Map). If it doesn't, stop and direct the user to `/quality-strategy` — this skill filters and discusses that strategy's prioritised ilities; without it there is nothing to filter.
2. **Read `$PLUGIN_ROOT/PHILOSOPHY.md`** (make confidence visible; interview, don't infer; push back on vagueness), **FRAMINGS #8 in `$PLUGIN_ROOT/skills/test-strategy/FRAMINGS.md`** (the oracle/proxy authority distinction and the labelled-proxy-goal rule), and **step 3 of `$PLUGIN_ROOT/skills/tooling-adequacy/SKILL.md`** — the oracle kinds (Specified / Property-or-metamorphic / Differential-or-simulated / Golden-master / Human-or-agent-judge) and the "kill the old-world reflex" move. Those are the idea vocabulary for the whole discussion.
3. **Session choices.** Read `quality/.scratch/session-config.md` and restate the standing choices in one line — *including* where these answers will be recorded and who can read them: this lane's discussion is candid too (what's actually weak, what nobody really follows), and the candor is only safe while the user knows where their words go. Ask only what the note is missing; if there is no note at all, run the save-location ask exactly as `/quality-strategy` → "Session start" defines it before anything is written.

## The session — ingest, filter, then discuss per ility

**1. Ingest the release's quality strategy.** Read `quality/strategy.md`: the header's `Release:` line (this doc inherits it), Part 3's stakeholder bars, Part 5's H/M-rated ilities, Part 6's risk map — especially the actuals whose basis is thin: Unknowns, low-confidence claims, and anything with an honest "no investigation yet". Part 4's non-goals bound everything. Don't re-litigate the strategy; it's the input. Also read `quality/ideas.md` (the ideas ledger) if it exists: ideas the user volunteered spontaneously mid-strategy, in their words, with no role assigned. Consider each for this lane — could it serve as an oracle or a proxy for a dimension's state? — and raise the fits when their ility comes up; annotate an adopted entry in the ledger (*"→ taken up in evaluation-strategy, <date>"*) rather than deleting it, since the same idea may also serve a sibling lane; an idea whose ility this lane's filter drops simply isn't raised here — it stays unannotated in the ledger for whichever lane kept that ility.

**2. Filter — where can better evaluation make a dent?** From the H/M ilities, propose the subset where the *knowing* is the bottleneck: actuals sitting at Unknown because nothing can judge them; confident claims resting on signals that couldn't support them; dimensions where the honest answer to *"would we notice if this broke?"* is no; and ilities tracked **only by an unbounded proxy** — a coverage number or a green CI badge whose blind spots nobody has ever stated. For each kept ility, one line of why; name the left-out ones too, with why not (usually: the evaluation is fine — the gap is testing effort or process, so it belongs to a sibling lane). Confirm the filter with the user before drilling in — it's a proposal, not a verdict.

**3. Per kept ility, in priority order, discuss three questions.** High-level ideas and questions — offer candidates, ask, capture what the user decides. Keep each ility to a few minutes unless the user wants to go deep.

- **What do you have already?** What currently observes this ility (the observation instrument), and what evaluates what you see — and with what authority: which signals are **oracles** (trusted to judge) and which are **proxies** (indicate, with blind spots)? Name each plainly, and for each proxy, say what it misses: *"CI is green"* judges what the suite asserts — what does it assert about *this* ility, and what stays invisible? Authority and coverage are orthogonal: an oracle can be authoritative over only part of the surface (native-speaker review of three locales of twelve is an oracle for those three and nothing for the rest — not a proxy for all twelve); record both what a signal can judge and how much of the surface it sees. If whether an existing oracle can be *trusted* becomes the real question, that's an `/oracle-adequacy` audit — offer it rather than improvising one here, and dispatch it with the resolved absolute `$DOCS_DIR` doc path and a scratch destination (`quality/.scratch/oracle-adequacy-<YYYY-MM-DD>.md`) in the brief; a sealed dispatch can't ask where the docs live.
- **What could be improved?** Where an oracle judges the wrong thing or too coarsely — aggregate uptime standing in for tail latency, a smoke test standing in for data integrity, a dashboard nobody reads. And where a proxy is being *read as more than it is* — the fix there is often not replacing it but **bounding it**: state what it covers and what it misses, so it indicates honestly instead of comforting.
- **What could be added?** Two idea lists. **Oracles**, by kind: a stated property set ("no path loses user data"), a cheap simulated/reference implementation to diff against, a golden master, a defined SLO plus its measurement, a human or agent judge for taste/trust dimensions (name its limits). Under agent costs an oracle is usually cheap to build — *"there's no way to judge this"* is almost always *"we haven't decided how to judge this"*. **Proxies**: cheap leading indicators worth adopting *as labelled proxy goals* — full test coverage, a review run over every code change, clean architecture are all good quality proxies (FRAMINGS #8); adopting one is legitimate — state what it is a proxy *for* and what remains unknown about the ility when it's satisfied. (A proxy like review-per-change is often simultaneously a process rule — flag the overlap to `/process-strategy` rather than duplicating it.)

**Capture as you go**: per ility, a few lines under Have / Improve / Add, plus one to three **agreed next moves** — each naming whether the signal it creates is an oracle or a proxy, and for a proxy, what stays unknown when it's satisfied. An idea the user rejects is recorded as considered-and-set-aside if it sharpened anything; otherwise dropped, not padded.

## Push back when

- Every ility comes back "our current signals are fine" with no per-ility reason — that's the Q2 collapse this lane exists to catch. Ask, per ility: *"what exactly would have told us if this were below the bar last month?"*
- A proxy is treated as the thing itself — *"coverage is at 100%, so correctness is handled."* There is nothing wrong with the proxy goal; the failure is reading proxy satisfaction as quality achieved. Ask: *"when that's green, what do we still not know about this ility?"* — and record the answer on the proxy.
- An Unknown is treated as permanently unknowable. Propose the cheapest oracle kind that could judge it, and record it as a candidate build even if deferred.
- A taste/trust/feel dimension gets handed a purely automated oracle. The human is the oracle there; say so and record the human's role.
- The discussion starts re-deriving required levels or re-rating dimensions. That's the quality strategy's ground — revise it there (`/quality-strategy` revision mode), don't fork it here.

## Output

Write to `$DOCS_DIR/quality/evaluation-strategy.md`, incrementally as ilities are agreed. Shape:

```markdown
# Evaluation Strategy: <project> — <release>

*Last updated: <YYYY-MM-DD>*
*Release: <from the quality strategy's header>*
*Generated by the `evaluation-strategy` skill — quality-strategy-skills (tollens-ai) v<version, read from $PLUGIN_ROOT/.claude-plugin/plugin.json at generation time> · github.com/tollens-ai/quality-strategy-skills*

*A light companion to `quality/strategy.md` — high-level oracle and proxy ideas and decisions per ility, not a step-by-step plan. Depth lives in `/oracle-adequacy` (audit) and `/tooling-strategy` (build plan).*

## The filter — where better evaluation makes a dent

| Ility (from Part 5) | In this lane? | Why / why not |
|---|---|---|

## <Ility 1 — priority order>

**Have already.** <signals, plainly named, each tagged oracle (judges) or proxy (indicates — with what it misses)>
**Could improve.** <…>
**Could add.** <oracle-kind candidates; labelled proxy-goal candidates with what stays unknown when satisfied>
**Agreed next moves.** <1–3 bullets, or "none — deliberately deferred">

## Out of the evaluation lane this release

<the filtered-out ilities with their one-line why-nots>
```

On a later update, archive first (`quality/archive/evaluation-strategy-<date>.md` — never overwrite an archive; a prior-era `quality/oracle-strategy.md` archives under its own old name), refresh the header stamp, and record a short `## Since the last cycle` section: what each prior agreed move actually produced, and what's newly worth deciding.

Close with the standing gates the pack shares: **invoke `/effective-comms`** on the doc before calling it final, and offer the onward pointers — `/tooling-strategy` if agreed next moves include real builds, `/oracle-adequacy` standalone if trust in existing oracles stayed contested, and the sibling lanes (`/test-strategy`, `/process-strategy`) for the ilities this filter handed to them.

## Escalation points

- The quality strategy's risk map is missing or all-`?` — stop; this lane needs rated ilities and honest actuals to filter. Direct to `/quality-strategy`.
- The user wants this session to *build* the oracles or wire up the proxies. Building is downstream — capture the agreed moves and point at `/tooling-strategy` (plan) or just do the build after the doc is closed, outside this skill.
- The user asks for the full interview treatment. Offer honesty instead: this lane is deliberately light; if the release genuinely needs deep evaluation work planned end-to-end, that is `/tooling-strategy`'s job with this doc as its demand.
