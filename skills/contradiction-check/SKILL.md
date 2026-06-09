---
name: contradiction-check
description: Detect cross-Part contradictions in a quality or test strategy document — places where one part of the doc asserts something another part denies or undercuts. The mechanical doc-internal-consistency check that the user-facing substantive checkpoint misses, because "this feels wrong" and "Part 3 contradicts Part 4" are different failure modes. Use from /quality-strategy at step boundaries, or standalone to audit any strategy doc for internal contradictions.
---

# Contradiction Check

This skill finds **internal contradictions** in a strategy document — two claims that cannot both be true, or one part that assumes something another part rules out. It is mechanical and doc-internal: it does not judge whether the strategy is *good*, only whether it is *consistent with itself*.

It exists because two different failure modes need two different catches. The substantive checkpoint in `/quality-strategy` catches *"something here feels wrong to me"* — a human reading the whole step and trusting their unease. That catch misses contradictions the reader doesn't happen to feel: a Part 3 stakeholder Dealbreaker that a Part 4 non-goal quietly excludes, a Part 1 workflow that the Part 7 plan assumes is different, a dimension rated None in Part 5 that Part 6 builds a risk-map row for. These are mechanical inconsistencies — findable by systematic cross-reference, easy to miss by feel. This skill is the systematic cross-reference.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). The grounding file this skill reads — `PHILOSOPHY.md` — lives under it.
- **PROJECT_DIR** — the absolute path of the project whose strategy you're checking (normally the current working directory; confirm with the user if it's ambiguous). The strategy docs live under `$PROJECT_DIR/quality/`.

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them** — both when you Read a file yourself and when you put a path into a subagent brief. The Read tool does no variable expansion and resolves relative paths against the current working directory, not this skill's directory; a dispatched subagent inherits none of your context. So an unsubstituted placeholder or a bare relative path will fail — always pass fully-resolved absolute paths.

## When to use

- **From `/quality-strategy`, at each step boundary** — dispatched as a sealed-context subagent at the close of a step (after the step's sub-steps are written, before the substantive checkpoint is surfaced). It checks the Parts written *so far* for contradictions, so a contradiction introduced in this step against an earlier step is caught at the boundary rather than at final review. The orchestrator folds any findings into the substantive checkpoint it then surfaces.
- **From `/test-strategy`** — the same, on `quality/test-strategy.md` against `quality/strategy.md` (a test strategy can contradict the quality strategy it operationalises).
- **Standalone** — to audit any existing strategy doc for internal contradictions, cold.

## What you need

- **Grounding.** Read `$PLUGIN_ROOT/PHILOSOPHY.md` — enough to know what the Parts mean and what kinds of claim each carries.
- **The doc(s).** The strategy at `$PROJECT_DIR/quality/strategy.md` (and, for a test strategy, `$PROJECT_DIR/quality/test-strategy.md`). When dispatched mid-build at a step boundary, only the Parts written so far exist — that's expected; check what's present.
- **Nothing else.** This skill reads only the strategy doc(s). It does not read source code, the pre-read, or the framework framings — it is a consistency check on the text as written, not a correctness check against the world.

## How to navigate the doc

Locate Part boundaries by their headings (`## Part 1: Context`, `## Part 3: Stakeholders`, etc.) and the sub-section headings within them. Read the whole present doc once, building a short index of the load-bearing claims per Part: stakeholder bars (Part 3), non-goals (Part 4), dimension ratings (Part 5), risk-map required/actual/gap (Part 6), plan-of-work actions (Part 7), and the context/workflow/release facts (Part 1–2).

## The contradiction classes to check

Walk these systematically. For each, a contradiction is a *specific pair of claims*, cited by Part and quote — not a vague "these feel in tension."

1. **Stakeholder bar ↔ non-goal.** A Dealbreaker or Good-Enough bar in Part 3 that a Part 4 non-goal excludes from scope. (*"Family's Dealbreaker is 'never lose my data', but Part 4 lists 'durable backup' as a non-goal."*)
2. **Dimension rating ↔ stakeholder bars.** A dimension rated H/M in Part 5 whose rationale names no Part 3 bar; or a dimension rated None that a Part 3 bar plainly references.
3. **Rating ↔ risk map.** A dimension rated None/absent in Part 5 that has a Part 6 risk-map row; or an H/M dimension in Part 5 with no Part 6 row.
4. **Required ↔ actual ↔ gap.** A Part 6 row whose stated gap doesn't follow from its required and actual (gap says "none" but actual is below required; gap says "large" but actual meets required).
5. **Context/workflow ↔ plan of work.** A Part 1–2 fact (team shape, release workflow, budget) that a Part 7 action contradicts or silently assumes is different.
6. **Non-goal ↔ plan of work.** A Part 7 action that does work Part 4 declared a non-goal.
7. **Confidence ↔ evidence.** A high-confidence actual in Part 6 whose evidence basis is "no investigation yet" or absent — an internal contradiction between the confidence claimed and the evidence cited.
8. **Strategy job ↔ content.** The Strategy-job paragraph at the top says one thing about scope (e.g. "pre-implementation; production observability is out of scope") that a later Part contradicts (e.g. a production-observability Dealbreaker treated as in-scope).
9. **(Test strategy only) test strategy ↔ quality strategy.** A learning need or allocation row that targets something the quality strategy rated None or listed as a non-goal; a tier that contradicts the risk map's impact ordering.

These classes overlap deliberately — a single contradiction may show up under two of them. Report it once, under the clearest class.

## Distinguish contradiction from gap and from disagreement

This skill reports **contradictions only**. Do not report:

- **Gaps** — something missing (no non-goals yet, a dimension not rated). Missing ≠ contradictory. The review skills and DONE checklists own gaps.
- **Weaknesses** — something present but thin or vague. That's the qualitative review's job, not this skill's.
- **Surfaced disagreements** — a divergence the doc *explicitly records* (e.g. an `OPEN QUESTION:` noting two stakeholders disagree) is not a contradiction; it's honest. A contradiction is an *unacknowledged* clash the doc presents as if both sides were settled truth.

If you're unsure whether something is a contradiction or a gap, state the specific claim pair and let the orchestrator judge — but lean toward not reporting, to keep this check low-noise.

## Push back when (standalone)

- The user wants this skill to also judge quality. *"Contradiction-check only finds internal inconsistencies. For 'is this strategy good?', run `/quality-strategy-review`."*

## This skill is DONE when

- [ ] Every contradiction class above has been walked against the Parts present in the doc.
- [ ] Each reported finding is a specific pair of claims, cited by Part and quote, with a one-line statement of why they can't both hold.
- [ ] Gaps, weaknesses, and explicitly-surfaced disagreements have been excluded (not reported as contradictions).
- [ ] (When dispatched from an orchestrator at a step boundary) the findings are returned to the orchestrator, and a scratch file is written (see Output).

## Output

When dispatched from `/quality-strategy` (or `/test-strategy`) at a step boundary, return the findings to the orchestrator **and** write them to `$PROJECT_DIR/quality/.scratch/<step-boundary>-contradiction-check.md` (e.g. `3.2-contradiction-check.md` — the sealed-dispatch scratch file the review skill audits; see `/quality-strategy` SKILL.md, "Sealed-context dispatch and scratch files"). The orchestrator folds the findings into the substantive checkpoint it surfaces next.

Standalone, surface the findings in the conversation. Shape:

```markdown
# Contradiction check — <doc name>

*Internal consistency only. Not a quality judgement.*

## Contradictions found

- **<class> — <Part X> vs <Part Y>.** "<quote A>" (Part X) cannot hold with "<quote B>" (Part Y), because <one line>. Suggested resolution: <re-do which sub-step, or which claim to change>.

(Or: "None found across the Parts present.")
```

If no contradictions are found, say so plainly — a clean check is a real and useful result, not a failure to look hard enough.
