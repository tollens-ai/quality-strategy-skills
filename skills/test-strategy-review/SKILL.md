---
name: test-strategy-review
description: Audit a test strategy document. Asks "will executing this strategy move the quality strategy in the right direction with the right priority?" by walking forward execution as the primary lens, with mechanical oracle checks as backstop. Use after /test-strategy completes, or to audit an existing quality/test-strategy.md cold.
---

# Test Strategy Review

This skill audits a test strategy document. It is the source of truth for *"is this test strategy any good?"*. Run it as the final step of `/test-strategy`, or on its own against any existing `quality/test-strategy.md`.

The fundamental question is **outcome-shaped, not structure-shaped**: *"if the team executes this strategy exactly as written, does the quality strategy end up in a better place?"*

The skill works in two moves — **expand, then collapse**. It is a lighter version of `/quality-strategy-review`'s three-subagent pattern, because a test strategy is a much smaller document:

- **Expansion.** Two subagents run in parallel. Subagent A does the main review: a forward simulation — it walks through what would actually happen if the team executed the strategy as written. Subagent B runs mechanical oracle checks (pass/fail tests of the document's structure) as a backstop. Both are told to be aggressive — a missed problem (false negative) costs more than a false alarm (false positive).
- **Collapse.** The main agent reads both outputs, drops findings that don't hold up, looks for findings that share a root cause, separates blockers (must fix) from flags (judgement calls), and writes one consolidated report.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). The grounding and framework files this skill reads live under it.
- **PROJECT_DIR** — the absolute path of the project whose test strategy you're reviewing (normally the current working directory; confirm with the user if it's ambiguous). The strategy docs live under `$PROJECT_DIR/quality/`.

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them** — both when you Read a file yourself and when you put a path into a subagent brief. The Read tool does no variable expansion and resolves relative paths against the current working directory, not this skill's directory; a dispatched subagent inherits none of your context. So an unsubstituted placeholder or a bare relative path will fail — always pass fully-resolved absolute paths.

## Before you start

Read the following (all under `$PLUGIN_ROOT`):

- `$PLUGIN_ROOT/PHILOSOPHY.md` — the framework grounding.
- `$PLUGIN_ROOT/skills/test-strategy/FRAMINGS.md` — the ten anti-default framings that shape what a good test strategy looks like.
- `$PLUGIN_ROOT/skills/test-strategy/INDICATORS.md` — the five outcome-oriented indicators (Direction / Priority / Sufficiency / Feasibility / Honesty) plus the mechanical oracle list.

## What you need

Two docs:

- `quality/strategy.md` — the quality strategy. You review the test strategy *against* it; without it there is nothing to compare to.
- `quality/test-strategy.md` — the test strategy being reviewed.

If either is missing, stop:
- No strategy: *"There's no quality strategy to review the test strategy against. Run `/quality-strategy` first."*
- No test strategy: *"There's no test strategy to review. Run `/test-strategy` first."*

If `quality/test-pre-read.md` exists, read its inventory and discrepancies sections. If the pre-read found something the test strategy ignored, that is itself a review finding.

## The work, in order

### 1. Read both docs

Read `quality/strategy.md` (especially Parts 3, 4, 5, 6, 7) and `quality/test-strategy.md` end-to-end.

Note every place the test strategy claims to address the strategy: each learning need (a question the testing must answer) and its risk-map reference, each allocation row (who or what does each piece of work) and its reasoning, each "what we're not testing" entry and its source reference. The simulation subagent will walk these traces.

### 2. Dispatch two review subagents in parallel

Use the `Agent` tool with two calls in a single message.

#### Subagent A — Forward simulation

> You are subagent A, running a forward-simulation review of a test strategy. **The fundamental question is outcome-shaped:** *"if the team executes this strategy exactly as written, does the quality strategy end up in a better place — moved in the right direction, with the right priority, with reasonable efficiency?"*
>
> You walk forward through execution. You don't audit document shape; you predict what would happen.
>
> Be aggressive. A missed problem (false negative) is worse than a false alarm (false positive) — the main agent will filter your output. If you can imagine a way execution would stall, produce wrong information, or finish without moving the strategy, surface it.
>
> First, read these files:
> - `$PLUGIN_ROOT/PHILOSOPHY.md`
> - `$PLUGIN_ROOT/skills/test-strategy/FRAMINGS.md`
> - `$PLUGIN_ROOT/skills/test-strategy/INDICATORS.md`
> - `$PLUGIN_ROOT/skills/test-strategy/SKILL.md`
>
> Then read both docs:
> - `$PROJECT_DIR/quality/strategy.md`
> - `$PROJECT_DIR/quality/test-strategy.md`
> - `$PROJECT_DIR/quality/test-pre-read.md` (if it exists)
>
> ### The simulation
>
> Walk forward as if the team executes the strategy exactly as written. Tier by tier:
>
> 1. **Tier 1.** What questions get answered? Apply the methods. What information would come back? After Tier 1 completes, what does the quality strategy's Part 6 (Risk Map) look like — which `?` entries become known, which confidences change? Does the team now have what it needs to make the next decision (Tier 2 vs pivot)?
>
> 2. **Tier 2.** Same walk. Does Tier 2's investigation depend on Tier 1's results? If so, does the strategy say so? If Tier 1's results would change Tier 2's plan, the strategy must leave room for that.
>
> 3. **Tier 3+.** Same walk. By the time this finishes, is the quality strategy meaningfully advanced? Are stakeholders' Dealbreakers either resolved or visibly progressed? Are H/M-rated dimensions either resolved or explicitly punted?
>
> 4. **Calibration cycle.** Walk what happens to the calibration items. After the first cycle, does the team have data to re-rate allocation? Are the calibration triggers in the update protocol actually triggered by what the strategy planned to do?
>
> ### Apply the five indicators during simulation
>
> For each indicator, decide **STRONG / MEDIUM / WEAK** based on what the simulation revealed. Quote specific learning needs, allocation rows, or update-protocol entries as evidence.
>
> 1. **Direction.** Does every investigation move the strategy? Quote any learning need that doesn't trace to a Part 6 row, or that targets something the strategy says doesn't matter.
>
> 2. **Priority.** Are first things first? Tier 1 should hold the highest-impact unknowns. Within tiers, cheap-first. If a Tier-1 item is genuinely lower-impact than a Tier-2 item, surface it.
>
> 3. **Sufficiency.** Does the strategy actually close what needs closing? List any H/M dimension or Dealbreaker that the strategy doesn't address — silent gaps especially.
>
> 4. **Feasibility.** Can the strategy be executed? Identify any method too vague to act on, exit criterion phrased as a goal not a state, or allocation that misuses the agent's strengths (e.g. agent on judgement-heavy work, human on exhaustive-checking work).
>
> 5. **Honesty.** Is uncertainty preserved? Flag all-high-confidence allocation, all-unknown allocation, vague calibration items, or theatrical non-targets.
>
> ### Cross-cutting consistency (folded in)
>
> While walking, also check: does the test strategy contradict the quality strategy anywhere? Examples:
> - Test strategy plans investigation in an area the strategy's Part 4 says is a non-goal.
> - Test strategy treats a dimension as priority that the strategy rated None, deferred as "aware, not investing this release", or listed as a non-goal.
> - Allocation honours principle 6 (automate repeatable, humanise judgmental) — judgement-heavy items don't go to agents alone, repeatable mechanical items don't go to humans alone.
> - Calibration triggers in update protocol match calibration items in allocation.
> - Voice consistent across sections (sign of a strategy not rushed).
>
> Surface contradictions as separate findings, tagged with which part of the strategy is in conflict.
>
> ### Output format
>
> ```
> ## Forward simulation
>
> ### Tier-by-tier walk
>
> **Tier 1.** [What gets answered. What the risk map looks like after. What the next decision is. Stalls / wrong-info / wasted-effort identified.]
>
> **Tier 2.** [Same.]
>
> ... (continue for each tier and the calibration cycle)
>
> ### Five indicators
>
> | Indicator | Strength | Evidence |
> |---|---|---|
> | Direction | Strong/Medium/Weak | [quoted evidence + one-line judgement] |
> | Priority | … | … |
> | Sufficiency | … | … |
> | Feasibility | … | … |
> | Honesty | … | … |
>
> ### Cross-cutting consistency findings
>
> - [list of contradictions, alignment issues, or coherence problems]
>
> ### Headline judgement
>
> [Two-three sentences: would executing this strategy move the quality strategy meaningfully forward? Where would it succeed, where would it fail?]
> ```

#### Subagent B — Mechanical oracle

> You are subagent B, running mechanical oracle checks against a test strategy. **You are a backstop**, not the primary line of defence — the writing process should already have enforced these via per-sub-step DONE checklists. Your job is to verify nothing slipped through.
>
> Be aggressive. A missed problem (false negative) is worse than a false alarm (false positive) — the main agent will filter your output.
>
> **Meta-flag.** If you find an oracle check failing, that's also evidence the per-sub-step DONE checklist for the relevant sub-step was not enforced. When you flag a failure, note: *"this should have been caught in sub-step N's DONE, but wasn't."*
>
> First, read these files:
> - `$PLUGIN_ROOT/PHILOSOPHY.md`
> - `$PLUGIN_ROOT/skills/test-strategy/INDICATORS.md`
> - `$PLUGIN_ROOT/skills/test-strategy/SKILL.md`
>
> Then read:
> - `$PROJECT_DIR/quality/strategy.md`
> - `$PROJECT_DIR/quality/test-strategy.md`
> - `$PROJECT_DIR/quality/test-pre-read.md` (if it exists)
>
> Run the twelve oracle checks defined in INDICATORS.md (the "Mechanical oracle checks" section), plus check 13 below. For each, classify as **PASS / FLAG / FAIL** and write one line of explanation. For FLAGs and FAILs, include a one-line "what to fix" plus the meta-note about which sub-step's DONE should have caught this.
>
> The twelve checks (see INDICATORS.md for full text):
>
> 1. Five-field learning needs.
> 2. Risk-map coverage (every H/M dimension addressed).
> 3. Dealbreaker prioritisation (every Dealbreaker in Tier 1 or 2).
> 4. Allocation confidence variation (≥1 row below high, or explicit reasoning for all-high).
> 5. Agent rows have review patterns.
> 6. No proxy goals as targets.
> 7. Update protocol concrete (≥3 trigger types, owners assigned).
> 8. Non-targets explicit (≥1 with reason).
> 9. Pre-read sources cited.
> 10. Independence preserved (no source code files in pre-read).
> 11. Calibration ↔ update protocol alignment.
> 12. Open questions consolidated.
> 13. **Scratch-file audit.** The Q2 tooling-and-oracle check is a sealed-context dispatch (`/tooling-adequacy`, invoked after learning needs). **Audit the required dispatch, not merely a claimed one** — derive the requirement from the strategy's *structure*, not from whether the doc narrates the check: if the test strategy HAS learning needs, the Q2 `/tooling-adequacy` dispatch was REQUIRED, so verify its scratch file exists at `$PROJECT_DIR/quality/.scratch/3.5-tooling-adequacy.md`. A missing scratch file is a FAIL whether or not the doc claims the check ran — hard evidence the Q2 dispatch was fabricated or silently skipped. An empty/stub scratch file is a FLAG (audit theatre). (The test strategy is a single linear flow with no step-boundary contradiction dispatches, so there is no boundary-check requirement to audit here.)
>
> **Severity:** FAIL on checks 1–3 and 13 is a blocker. The rest are flags.
>
> Output format: a markdown list of the thirteen checks with PASS/FLAG/FAIL, one-line explanation, suggested fix where applicable, and meta-note for FAIL/FLAG cases.

### 3. Collapse and filter (main agent)

When both subagents return, run the collapse pass.

For each finding from each subagent:

- **Real and important** → surface as a review finding.
- **Real but minor** → surface, marked low-priority.
- **Spurious / off-base** → drop. **Note dropped findings briefly** so the user can spot if you over-filtered.

Three guidelines:

1. **Trust subagents but verify.** A simulation finding that says *"Tier 1 won't actually answer the existential question because methods are too vague"* is worth surfacing; one that says *"section is a bit dry"* probably isn't.

2. **Look for compounding patterns.** A WEAK on Direction + a WEAK on Sufficiency + multiple oracle FAILs on risk-map coverage all point at the same root cause — the strategy isn't grounded in the risk map. Surface the pattern, not just the individual findings.

3. **Distinguish blockers from flags.** Some findings should block declaring the strategy done. Others are judgement calls.

#### Severity rules

**Blockers** (must fix before declaring strategy done):

- Oracle FAIL on checks 1–3 (five-field learning needs / risk-map coverage / Dealbreaker prioritisation) or check 13 (missing scratch file for the required Q2 dispatch when the strategy has learning needs — a fabrication or silent-skip signal, whether or not the doc claims the check ran).
- Forward simulation reveals execution would *not* meaningfully advance the strategy.
- Hard contradiction between test strategy and quality strategy (e.g. Tier-1 investigation of something the strategy says is a non-goal).
- Any indicator rated WEAK with concrete evidence the team would not be able to act on the strategy as written.

**Flags** (judgement — review and decide):

- Oracle FLAGs (borderline structural results).
- Indicators rated MEDIUM or borderline-WEAK.
- Cross-cutting consistency findings that aren't outright contradictions.
- Compounding patterns across multiple medium findings.

### 4. Produce the report

**Write every finding for both readers — names before coordinates** (PHILOSOPHY: *write for both readers*). A review is read by people who don't have the test strategy open and may not have written it. Every blocker and flag must be self-contained: at first mention of any doc element, give its human name and a few words of what it is, with the label as a trailing pointer — *"the sync-under-flaky-connectivity learning need (T1-3)"*, not *"T1-3"*. A bare coordinate or tier number is never the subject of a sentence. Gloss framework vocabulary (*"blocked on tooling"*, *"calibration trigger"*) in plain English on first use. The test for each finding: could a teammate who never wrote this strategy act on it without opening the doc to decode references? And keep the prose **plain** (PHILOSOPHY: *say it plainly*): short words, active verbs, one idea per sentence; framework terms glossed, everything else everyday English.

Write the consolidated report and surface it in the conversation. Format:

```markdown
# Test Strategy Review for <project>

*Reviewed <YYYY-MM-DD>*

## Headline

<2-3 sentences: would executing this strategy move the quality strategy in the right direction with the right priority? Where would it succeed, where would it fail?>

## Blockers (must fix before declaring strategy done)

- **<blocker title>** — <one or two lines describing the issue>. Suggested fix: <…>.

(Or "None.")

## Flags (judgement — review and decide)

- **<flag title>** — <one or two lines>. Why it matters: <…>. Suggested action: <…>.

## The five indicators

| Indicator | Strength | Note |
|---|---|---|
| Direction | Strong/Medium/Weak | <one-line> |
| Priority | … | … |
| Sufficiency | … | … |
| Feasibility | … | … |
| Honesty | … | … |

## Forward simulation summary

<3-5 lines: what would happen tier by tier if the team executes this. Where would it succeed; where would it stall.>

## What's strong

- <3-5 concrete things this strategy does well>

## What's weak

- <3-5 concrete things to improve, prioritised>

## Filtered out

<bullets of subagent findings the main agent dropped as spurious or trivial, with brief reasoning. Lets the user spot over-filtering.>

---

*If you want the full unfiltered subagent outputs for reference, they are available below.*

<details>
<summary>Subagent A (forward simulation) full output</summary>
…
</details>

<details>
<summary>Subagent B (oracle) full output</summary>
…
</details>
```

### 5. Offer walkthrough

After the report, ask the user:

> *"Want to walk through the blockers and flags one at a time, or are you good to take it from here?"*

If walkthrough: go through each blocker and flag in order. For each, dig in if needed, suggest concrete fixes, and capture the user's decision.

For blockers, the usual fix is to re-run the relevant `/test-strategy` sub-step in revision mode (b — revisit specific sub-steps).

## Push back when

- The user wants to skip fixing a blocker. *"That blocker is one of the things that makes this strategy actually load-bearing. Skip it and you get a strategy that looks complete but won't move the quality strategy when the team executes it."*
- The user dismisses all flags without examining them. *"There were N flags — let's at least walk through them before closing out."*
- The user wants to mark a clearly-WEAK indicator as resolved without changes. *"What specifically is going to be different now that you've thought about it? Without a change to the doc, the next person reading it will hit the same problem."*
- The user resists the forward-simulation framing ("can't really know what would happen"). *"The simulation isn't a prediction with confidence — it's a structured way to find places where execution would stall. Surfacing those places now is cheap; finding them mid-execution costs cycles."*

## This skill is DONE when

- [ ] Two subagents have been dispatched in parallel and returned findings.
- [ ] The main agent has run the collapse pass and produced a consolidated report.
- [ ] The report has been shared with the user.
- [ ] All blockers have been resolved (typically by re-running the relevant `/test-strategy` sub-step).
- [ ] The user has reviewed flags and either resolved them or actively confirmed they're acceptable as-is.

## Output

Share the consolidated review report in the conversation. By default, don't write it to a file. If the user wants it saved, write to `quality/test-strategy-review-<YYYY-MM-DD>.md`.

If the strategy passes (no unresolved blockers, flags reviewed), confirm:

> *"Test strategy review passed. The strategy is ready to execute. Start with Tier 1 — the cheapest unknown is [reference]. After Tier 1 completes, run `/test-strategy` revision mode (c) to update allocation and risk-map references."*

If the strategy's blocked-on-tooling section is non-empty, also point at **`/tooling-strategy`** (run it now if it hasn't run yet; re-run it if it ran before this test strategy, so the build plan picks up what the test strategy now asks for) — execution can start on the tiers that are already answerable while the builds land.

If `/test-strategy` itself invoked this review, hand control back with a clear status: passed, or what work remains.
