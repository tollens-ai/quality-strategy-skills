---
name: process-strategy
description: A deliberately light follow-up to /quality-strategy for the rules-and-processes lane — ingest the release's quality strategy, filter for the ilities that rules, invariants, standards, or repeatable processes can make a dent on, then per ility discuss what you have, what could be improved, and what could be added. High-level ideas and questions, not step-by-step hand-holding. Produces quality/process-strategy.md. Use after /quality-strategy completes for a release.
---

# Process Strategy

One of the three light follow-ups to `/quality-strategy` — the **rules and processes** lane, beside `/test-strategy` (testing) and `/oracle-strategy` (oracles). Testing finds out where you are; oracles let you judge what you see; **rules, invariants, and processes change what gets produced in the first place** — they prevent classes of defect instead of detecting instances of them.

Two shapes of thing live in this lane, and it pays to keep them distinct:

- **Rules and invariants** — standing statements of what must (never) be true, written where the people and agents doing the work will actually meet them: standards and context docs (`CLAUDE.md`, style guides, architecture decision records), and mechanical enforcement (lint rules, type checks, CI gates, branch protections). A rule an agent reads *before* writing code is worth ten review comments after.
- **Processes** — repeatable ways of working that carry judgment: review gates, release checklists, runbooks, incident drills, and agent-runnable skills. A process is a rule with steps and an owner.

This matters doubly for agent-heavy teams: rules in context docs and processes as runnable skills are exactly the surfaces agents consume directly, so this lane's output links straight into how the work is done — often ahead of any test infrastructure existing at all.

**This skill is deliberately much lighter than `/quality-strategy` — a design decision, not a shortcut.** The quality strategy is the thorough one: a structured multi-session interview that refuses to skip substance. This skill assumes that work is done and does something different: **high-level ideas and good questions** per ility, capturing what you decide. No step-by-step machinery, no analysis fan-outs, no re-derivation of what the strategy already established. One or two focused conversations, one short document.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Resolve two paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). Grounding files — `PHILOSOPHY.md`, `.claude-plugin/plugin.json` (whose `version` field stamps the output) — live under it.
- **DOCS_DIR** — where the `quality/` docs live; every `quality/...` path below resolves under it. Normally the current working directory — but `/quality-strategy` asks at session start where the strategy should be saved and records the choice in `quality/.scratch/session-config.md`; this doc joins that same family. If the working directory has no `quality/`, ask the user where the strategy was saved (a path ending in `/quality` means its parent is the home) — never scaffold a fresh `quality/` beside code whose strategy lives elsewhere.

Substitute resolved absolute paths before acting on them — in your own Reads and in any subagent brief; the Read tool does no variable expansion, and a dispatched subagent inherits none of your context.

## Before you start

1. **`$DOCS_DIR/quality/strategy.md` must exist for this release**, completed at least through Part 6 (Risk Map). If it doesn't, stop and direct the user to `/quality-strategy` — this skill filters that strategy's prioritised ilities; without it there is nothing to filter.
2. **Read `$PLUGIN_ROOT/PHILOSOPHY.md`** — interview, don't infer; push back on vagueness; record assumptions. They apply at this lane's lighter weight too.
3. **Session choices.** Read `quality/.scratch/session-config.md` and restate the standing choices in one line — *including* where these answers will be recorded and who can read them: this lane's discussion is candid too (what's actually weak, what nobody really follows), and the candor is only safe while the user knows where their words go. Ask only what the note is missing; if there is no note at all, run the save-location ask exactly as `/quality-strategy` → "Session start" defines it before anything is written.

## The session — ingest, filter, then discuss per ility

**1. Ingest the release's quality strategy.** Read `quality/strategy.md`: the header's `Release:` line (this doc inherits it), Part 3's stakeholder bars, Part 5's H/M-rated ilities, Part 6's risk map, Part 1's team and workflows (who and what — humans, agents — would actually follow a rule or run a process), and Part 4's non-goals. Don't re-litigate the strategy; it's the input. Also read `quality/ideas.md` (the ideas ledger) if it exists: ideas the user volunteered spontaneously mid-strategy, in their words, with no role assigned. Consider each for this lane — is it a rule worth pinning, a process worth owning? — and raise the fits when their ility comes up; annotate an adopted entry in the ledger (*"→ taken up in process-strategy, <date>"*) rather than deleting it, since the same idea may also serve a sibling lane; an idea whose ility this lane's filter drops simply isn't raised here — it stays unannotated in the ledger for whichever lane kept that ility.

**2. Filter — where can rules or processes make a dent?** From the H/M ilities, propose the subset where failures come from *how work is done* — repeatable behaviour a rule could forbid, an invariant could pin, or a process could catch: consistency and convention ilities, security hygiene, data-handling discipline, release safety, regression discipline ("a fix that stays fixed"), documentation quality, agent-readability. For each kept ility, one line of why; name the left-out ones with why not (usually: the gap is not knowing where you stand — that's the testing or oracle lane, not a rule). Confirm the filter with the user before drilling in.

**3. Per kept ility, in priority order, discuss three questions.** High-level ideas and questions — offer candidates, ask, capture decisions. A few minutes per ility unless the user wants depth.

- **What do you have already?** Which standards docs, context rules (`CLAUDE.md` and kin), lint/type/CI enforcement, review practices, checklists, runbooks, or agent skills already serve this ility? Where do they live, and does anything actually read or run them?
- **What could be improved?** The classic gap is **stated but unenforced**: a convention in a doc nobody loads, a checklist that quietly stopped being used, a runbook that rotted. What one change moves a rule from prose to enforcement (a lint rule, a CI gate, a context doc agents actually load) — or gives a process an owner and a trigger?
- **What could be added?** New invariants worth pinning (*"no migration without a rollback note"*, *"every error is handled or surfaced, never swallowed"*), new process where judgment repeats (a review gate for the risk map's hottest area, a pre-release checklist derived from the dealbreakers, an incident drill for the failure the strategy fears most), and — for agent-heavy teams — which of these belong in context docs or as runnable skills so agents follow them without being told.

**Capture as you go**: per ility, a few lines under Have / Improve / Add, plus one to three **agreed next moves** — each naming *where the rule or process will live* (which doc, which gate, which skill) and *who or what follows it*. A rule with no home and no follower is a wish, not a move.

## Push back when

- Every proposal is "write it in a doc". Ask what enforces it, or who reads it and when — prefer the enforceable form of the same rule.
- A rule is proposed with no trace to a stakeholder bar or risk-map row. Untraceable weight gets cut here exactly as in the quality strategy — or challenge whether a bar is missing.
- Process is proposed as a substitute for knowing (*"we'll add a review step"* for a dimension whose actual is Unknown). A process can't dent what nobody can judge — that's the oracle lane; hand it over rather than stacking ceremony.
- The rules pile up faster than anyone could follow. Ask the halving question: *"if the team would actually follow only half of these, which half?"* — record the rest as deliberately not adopted.

## Output

Write to `$DOCS_DIR/quality/process-strategy.md`, incrementally as ilities are agreed. Shape:

```markdown
# Process Strategy: <project> — <release>

*Last updated: <YYYY-MM-DD>*
*Release: <from the quality strategy's header>*
*Generated by the `process-strategy` skill — quality-strategy-skills (tollens-ai) v<version, read from $PLUGIN_ROOT/.claude-plugin/plugin.json at generation time> · github.com/tollens-ai/quality-strategy-skills*

*A light companion to `quality/strategy.md` — high-level rules/invariants/process ideas and decisions per ility, not a step-by-step plan.*

## The filter — where rules and processes make a dent

| Ility (from Part 5) | In this lane? | Why / why not |
|---|---|---|

## <Ility 1 — priority order>

**Have already.** <standards, context rules, enforcement, processes — and whether they're actually followed>
**Could improve.** <stated→enforced moves, owners, triggers>
**Could add.** <new invariants, gates, checklists, runbooks, agent skills>
**Agreed next moves.** <1–3 bullets, each with where it lives + who/what follows it; or "none — deliberately deferred">

## Out of the process lane this release

<the filtered-out ilities with their one-line why-nots>
```

On a later update, archive first (`quality/archive/process-strategy-<date>.md` — never overwrite an archive), refresh the header stamp, and record a short `## Since the last cycle` section: which agreed rules and processes actually took hold (and which were quietly dropped — that's data), and what's newly worth pinning.

Close with the standing gate the pack shares: **invoke `/effective-comms`** on the doc before calling it final, and point at the sibling lanes (`/test-strategy`, `/oracle-strategy`) for the ilities this filter handed to them.

## Escalation points

- The quality strategy's risk map is missing or all-`?` — stop; direct to `/quality-strategy` first.
- The user wants this session to write the actual standards docs, lint rules, or skills. Capture the agreed moves here, close the doc, then do that work outside this skill — the moves name where each rule lives, so the follow-through is mechanical.
- The user asks for the full interview treatment. Say plainly: this lane is deliberately light — high-level ideas and questions; the thoroughness lives in `/quality-strategy`, which already did the heavy work this lane stands on.
