---
name: quality-strategy-review
description: Audit a quality strategy document. Applies seven indicators of a good strategy plus mechanical oracle checks, and asks "where is this strong, where is this weak?". Use after /quality-strategy completes, or to audit an existing quality/strategy.md cold.
---

# Quality Strategy Review

This skill audits a quality strategy document. It is the source of truth for *"is this strategy any good?"* — invoked both as the final step of `/quality-strategy` and standalone on any existing `quality/strategy.md`.

The skill uses an **expansion-and-collapse** pattern:

- **Expansion.** Three subagents run in parallel, each with a focused review lens. They are briefed to be aggressive — to flag liberally, to dig for specifics, to surface anything that feels off — knowing that the main agent will filter their output. False negatives are worse than false positives in review work.
- **Collapse.** The main agent reads all three subagent outputs, drops spurious or trivial findings, looks for compounding patterns, distinguishes blockers from flags, and produces a consolidated report.

This is review by brainstorm-then-curate, not by single-pass judgement. Single-pass review tends to either miss things or over-flag trivia; the two-stage structure avoids both failure modes.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). The grounding and framework files this skill reads live under it.
- **PROJECT_DIR** — the absolute path of the project whose strategy you're reviewing (normally the current working directory; confirm with the user if it's ambiguous). The strategy docs live under `$PROJECT_DIR/quality/`.

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them** — both when you Read a file yourself and when you put a path into a subagent brief. The Read tool does no variable expansion and resolves relative paths against the current working directory, not this skill's directory; a dispatched subagent inherits none of your context. So an unsubstituted placeholder or a bare relative path will fail — always pass fully-resolved absolute paths.

## Before you start

Read `$PLUGIN_ROOT/PHILOSOPHY.md`. The disciplines and the framework grounding are the foundation of the review.

## What you need

The strategy doc to review at `quality/strategy.md`. If `quality/pre-read.md` exists, also read its summary and discrepancies sections — pre-read findings the strategy didn't address are themselves review findings.

If `quality/strategy.md` doesn't exist, tell the user: *"There's no strategy doc to review. Run `/quality-strategy` first."*

## The work, in order

### 1. Read the strategy

Read `quality/strategy.md` end-to-end. Note which parts are present, which are missing, which look thin.

If `quality/pre-read.md` exists, read its summary and discrepancies sections.

### 2. Dispatch three review subagents in parallel

Use the `Agent` tool with three calls in a single message.

#### Subagent A — Mechanical oracle checks

> You are subagent A, running mechanical oracle checks against a quality strategy document. **You are a backstop**, not the primary line of defence — the writing process should already have enforced these checks via per-sub-step DONE checklists. Your job is to verify nothing slipped through.
>
> Be aggressive about flagging — false negatives (missing real issues) are much worse than false positives (the main agent will filter what you flag).
>
> **Meta-flag.** If you find an oracle check failing, that is also evidence the per-sub-step DONE checklist for the relevant sub-step was not actually enforced — the agent ticked a box without doing the verification. When you flag a failure, also note in your explanation: *"this should have been caught in sub-step X.Y's DONE checklist, but wasn't."* That meta-information is useful to the user.
>
> First, read `$PLUGIN_ROOT/PHILOSOPHY.md` and `$PLUGIN_ROOT/skills/quality-strategy/SKILL.md` to ground yourself.
>
> Then read `$PROJECT_DIR/quality/strategy.md`.
>
> Run the following oracle checks. For each, classify as **PASS / FLAG / FAIL** and write one line of explanation. For FLAGs and FAILs, also include a one-line "what to fix" suggestion plus the meta-note about which sub-step's DONE should have caught this.
>
> 1. **Non-goals not empty.** Part 4 has at least 3 non-goals, each with a reason.
> 2. **No percentages in confidence ratings.** Grep for "%" in confidence contexts (Parts 5 and 6). Confidences should be H/M/L only.
> 3. **H ratings grounded.** Every H rating in Part 5 has a rationale that names a stakeholder bar from Part 3 or a release purpose from Part 2.
> 4. **None ratings reasoned.** Every None rating in Part 5 has explicit reasoning, not blank.
> 5. **Three lenses populated.** Every stakeholder in Part 3 has Delight, Good Enough, and Dealbreaker captured for the first release.
> 6. **Risk map covers all H/M dimensions.** Every dimension rated H or M in Part 5 has a row in Part 6.
> 7. **Risk map confidence on both sides.** Every Part 6 row has confidence-in-required and confidence-in-actual (or "—" for Unknown).
> 8. **Confidence vocabulary correct.** All confidences are H/M/L (or "—" for Unknown actuals).
> 9. **Unknowns have resolution notes.** Every Unknown actual in Part 6 has a "to resolve" note (test / ask / review / instrument / build).
> 10. **Distribution sanity.** Flag if more than 50% of dimensions are H, or if 100% are H/M with zero L/None entries. (Aligned with sub-step 5.5's threshold.)
> 11. **Actions classified.** Every Part 7 action is classified as testing / stakeholder / fixing.
> 12. **Plan has phases.** Plan of work in Part 7 has distinct phases; Phase 0 (blockers) is either populated or explicitly empty with reasoning.
> 13. **Pre-read sources cited.** Sub-step output sections cite pre-read sources where the agent did pre-read work.
> 14. **Stakeholder coverage.** Every Part 3 stakeholder has at least one H or M dimension whose rationale connects to their bars.
> 15. **Sub-group heuristic applied.** Each Part 3 stakeholder either has sub-groups, or a "considered, no meaningful split" note.
> 16. **Old/new-world evidence.** Where trap dimensions (readability, maintainability, documentation, diagnosability, observability, ramp-up-ability) are present in the inventory — either by their original name or as sub-dimensions from unpacking — evidence the audience question was considered (split into human/agent versions, or rationale notes the choice).
> 17. **Unpack evidence.** Where commonly-composite dimensions (performance, reliability, security, maintainability, usability, observability) are present, evidence of unpacking (sub-dimensions present) or a note that they were considered atomic for this project.
>
> Output format: a markdown list of checks 1–17 with PASS/FLAG/FAIL classification and explanation. For FLAGs and FAILs, include a one-line "what to fix."

#### Subagent B — Qualitative indicator assessment

> You are subagent B, applying the seven indicators of a good quality strategy with creative depth. Your output will be filtered by the main agent — don't be polite. If a section feels weak, say why. If something is off but you can't fully articulate why, say that too. The main agent has a second pass to filter out anything spurious.
>
> First, read `$PLUGIN_ROOT/PHILOSOPHY.md` and `$PLUGIN_ROOT/skills/quality-strategy/SKILL.md` to ground yourself.
>
> Then read `$PROJECT_DIR/quality/strategy.md` end-to-end.
>
> Apply the seven indicators of a good quality strategy. For each, decide **STRONG / MEDIUM / WEAK** and write 2–4 sentences explaining your judgement. Quote specific sentences from the strategy that exemplify strength or weakness — concrete is better than abstract.
>
> 1. **Org-wide clarity.** Could a new engineer or agent read this and quickly understand what's going on, what matters, what success looks like? Or is it dense, jargon-heavy, missing the through-line?
> 2. **Instrumentation from the start.** Are quality proxies chosen, and is there evidence they'll be measurable from day one rather than retrofitted? Or has measurement been deferred?
> 3. **Legible work plan.** Is the plan of work ordered by *why*, not just *what*? Can you tell from reading it why each item is sequenced where it is? Are dependencies visible?
> 4. **Precision over comfort.** Is the strategy specific enough to be wrong-able? Vague claims that nobody could disagree with are useless. A sharp claim that turns out to be wrong is valuable. Where is the strategy hiding behind generality?
> 5. **Decision support at the edges.** Could an engineer or agent encountering a new finding (a bug, a feature request, a complaint, an unexpected result) quickly map it to this strategy and triage it without escalation? Or would the strategy fail the "is this in scope?" question?
> 6. **Quick re-orientation.** Could someone lost in the weeds re-read this and rapidly re-anchor to what matters and for whom? Or does it require reading end-to-end every time?
> 7. **Explicit non-goals.** Is it clear what's deliberately not being done? Is the reasoning visible? Are the non-goals real (concrete things excluded) or theatrical (vague avoidances)?
>
> For each WEAK indicator, suggest one or two concrete improvements.
>
> Output format: a structured assessment, one section per indicator, with STRONG/MEDIUM/WEAK classification, explanation with quoted evidence, and improvement suggestions for any WEAK ones.

#### Subagent C — Cross-cutting consistency checks

> You are subagent C, checking the genuinely **end-to-end** consistency of a quality strategy — the things that can only be checked once the whole document exists. The per-section consistency checks (each H rating grounded; non-goals aligned with ratings; risk map covers H/M dimensions; risk map → action list) are enforced at write time by per-sub-step DONE checklists; you don't need to re-run those.
>
> Your output will be filtered by the main agent. Be aggressive about flagging misalignments — false negatives are worse than false positives.
>
> First, read `$PLUGIN_ROOT/PHILOSOPHY.md` and `$PLUGIN_ROOT/skills/quality-strategy/SKILL.md` to ground yourself.
>
> Then read `$PROJECT_DIR/quality/strategy.md` and (if it exists) `$PROJECT_DIR/quality/pre-read.md`.
>
> Check the following end-to-end consistencies:
>
> - **Pre-read discrepancies addressed.** If `pre-read.md` flagged docs/code discrepancies or load-bearing design observations, has the strategy addressed them — either by acknowledging them in some part of the doc, or by including them in the action list? An unaddressed pre-read finding is a gap worth surfacing.
> - **Release purpose ↔ rating distribution.** Does the rating distribution actually reflect what the release is for? An alpha release for "test the core technique" should have very different ratings from a GA release. If the release purpose says "test the technique" but accessibility is rated High, something is off.
> - **Internal contradictions across the doc.** Anywhere in the strategy where two claims appear to contradict each other, or where one part assumes something another part denies. Examples: a stakeholder dealbreaker in Part 3 that contradicts a non-goal in Part 4; a workflow described in Part 1 that the plan of work in Part 7 implicitly assumes is different.
> - **Coherence across releases.** If sub-steps mention future releases (Part 2's roadmap, future-release stakeholder notes in 3.1), do those mentions hang together — or do different parts assume different futures?
> - **Voice and confidence consistency.** Are confidence levels expressed consistently across the doc, or does Part 5 use H/M/L while Part 6 quietly uses different vocabulary? Does the doc speak with a coherent voice, or do the writing patterns shift in ways that suggest the strategy was rushed in some sections?
>
> If you spot something the per-sub-step DONE checklists *should* have caught (e.g. a Part 5 H rating with no stakeholder bar in its rationale), flag it as a "backstop catch" — it indicates the writing process didn't enforce its own gates, which is itself useful information.
>
> For each finding, write a one-line description of the misalignment plus a suggestion for resolving it.
>
> Output format: a markdown list of consistency findings.

### 3. Collapse and filter (main agent)

When all three subagents return, run the collapse pass.

For each finding from each subagent, decide:

- **Real and important** → surface as a review finding.
- **Real but minor** → surface, marked low-priority.
- **Spurious / off-base** → drop. **Note dropped findings briefly** so the user can spot if you over-filtered.

Three guidelines:

1. **Trust subagents but verify.** A finding that says *"non-goals look thin"* is worth surfacing; one that says *"the wording in section 3.2 is clunky"* probably isn't.
2. **Look for compounding patterns.** Three weak indicators that all point at the same root cause (e.g. *"rationale is generally vague throughout"*) are stronger together than apart. Surface the pattern.
3. **Distinguish blockers from flags.** Some findings should block declaring the strategy done. Others are judgement calls.

#### Severity rules

**Blockers** (must fix before declaring strategy done):

- Part 4 (Non-goals) empty or fewer than 3 entries with reasons.
- Part 6 (Risk Map) missing any H or M dimension from Part 5.
- Any oracle FAIL in subagent A.
- Any hard contradiction surfaced by subagent C (e.g. a non-goal that contradicts an H rating).
- Three lenses missing for any stakeholder.

**Flags** (judgement — review and decide):

- Distribution skewed (>60% H).
- Stakeholder coverage gap (a stakeholder with no H/M dimension touching their bars).
- Subagent A FLAGs (borderline oracle results).
- Subagent B WEAK indicators.
- Subagent C consistency findings that aren't outright contradictions.

### 4. Produce the report

Write the consolidated report and surface it in the conversation. Format:

```markdown
# Quality Strategy Review for $PROJECT_DIR

*Reviewed <YYYY-MM-DD>*

## Headline

<2–3 sentences: is this strategy in good shape, mixed, or weak? Where is it strong and where is it weak?>

## Blockers (must fix before declaring strategy done)

- **<blocker title>** — <one or two lines describing the issue>. Suggested fix: <…>.

(Or "None.")

## Flags (judgement — review and decide)

- **<flag title>** — <one or two lines>. Why it matters: <…>. Suggested action: <…>.

## The seven indicators

| Indicator | Strength | Note |
|---|---|---|
| Org-wide clarity | Strong/Medium/Weak | <one-line> |
| Instrumentation from start | … | … |
| Legible work plan | … | … |
| Precision over comfort | … | … |
| Decision support at edges | … | … |
| Quick re-orientation | … | … |
| Explicit non-goals | … | … |

## What's strong

- <3–5 concrete things this strategy does well>

## What's weak

- <3–5 concrete things to improve, prioritised>

## Filtered out

<bullets of subagent findings the main agent dropped as spurious or trivial, with brief reasoning. Lets the user spot over-filtering.>

---

*If you want the full unfiltered subagent outputs for reference, they are available below.*

<details>
<summary>Subagent A (oracle) full output</summary>
…
</details>

<details>
<summary>Subagent B (indicators) full output</summary>
…
</details>

<details>
<summary>Subagent C (consistency) full output</summary>
…
</details>
```

### 5. Offer walkthrough

After the report, ask the user:

> *"Want to walk through the blockers and flags one at a time, or are you good to take it from here?"*

If walkthrough: go through each blocker and flag in order. For each, dig in if needed, suggest concrete fixes, and capture the user's decision. The user resolves each.

For blockers, the resolution should typically be re-running the relevant `/quality-strategy` sub-step in revision mode. Surface that as the suggested action.

## Push back when

- The user wants to skip fixing a blocker. *"That blocker is one of the things that makes this strategy actually load-bearing. Skipping produces a strategy that looks complete but isn't."*
- The user dismisses all flags without examining them. *"There were N flags — let's at least walk through them before closing out."*
- The user wants to mark a clearly-weak indicator as resolved without changes. *"What specifically is going to be different now that you've thought about it?"*

## This skill is DONE when

- [ ] Three subagents have been dispatched in parallel and returned findings.
- [ ] The main agent has run the collapse pass and produced a consolidated report.
- [ ] The report has been shared with the user.
- [ ] All blockers have been resolved (typically by re-running the relevant `/quality-strategy` sub-step).
- [ ] The user has reviewed flags and either resolved them or actively confirmed they're acceptable as-is.

## Output

The consolidated review report is shared in the conversation. By default it's not written to a file. If the user wants the report persisted, write it to `quality/review-<YYYY-MM-DD>.md`.

If the strategy passes (no unresolved blockers, flags reviewed), confirm to the user:

> *"Strategy review passed. The strategy is feature-complete and ready to use. Decision support, plan execution, and updates can now happen against it."*

If the strategy was reviewed in the context of running `/quality-strategy` itself, return control to the orchestrator with a status indicating pass or remaining work.
