---
name: test-strategy-review
description: Audit a test strategy document. Asks "will carrying out these agreed moves move the quality strategy in the right direction with the right priority?" by forward-walking the moves as the primary lens, with mechanical checks as backstop. Use after /test-strategy completes, or to audit an existing quality/test-strategy.md cold.
---

# Test Strategy Review

This skill audits a test strategy — the light testing lane `/test-strategy` produces. The document under review is deliberately light (a filter table plus per-ility Have / Improve / Add discussions and agreed moves), so the review is proportionate: one sealed forward-walk, a set of mechanical checks, one consolidated report. What it does *not* relax is the bar — the five indicators in `$PLUGIN_ROOT/skills/test-strategy/INDICATORS.md` (Direction / Priority / Sufficiency / Feasibility / Honesty) are predictions about what happens when the team runs the doc, and the review judges against them.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). The grounding files this skill reads live under it.
- **PROJECT_DIR** — the absolute path of the project whose test strategy you're reviewing (normally the current working directory; confirm with the user if it's ambiguous). The strategy docs normally live under `$PROJECT_DIR/quality/` — but `/quality-strategy` asks at session start where the strategy should be saved, so they may live elsewhere. If `$PROJECT_DIR/quality/` is absent, get the docs home instead of assuming: from the orchestrator's brief when this skill was dispatched, else by asking the user; if the path you're given ends in `/quality`, its parent is the home. From then on treat `$PROJECT_DIR` as that docs home wherever a path below says `$PROJECT_DIR/quality/...` — one substitution, made once, before you act on any path.

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them** — both when you Read a file yourself and when you put a path into a subagent brief; a dispatched subagent inherits none of your context.

## Before you start

Read `$PLUGIN_ROOT/PHILOSOPHY.md`, `$PLUGIN_ROOT/skills/test-strategy/FRAMINGS.md`, and `$PLUGIN_ROOT/skills/test-strategy/INDICATORS.md`. If `$PROJECT_DIR/quality/test-strategy.md` doesn't exist, tell the user: *"There's no test strategy to review. Run `/test-strategy` first."* You also need `$PROJECT_DIR/quality/strategy.md` — the review is relative to the quality strategy the doc claims to serve; without it you can only check internal consistency, and you say so plainly.

## The work, in order

### 1. Read both docs

Read `$PROJECT_DIR/quality/test-strategy.md` and `$PROJECT_DIR/quality/strategy.md` (Parts 3–6 at minimum) end-to-end. Note the release each names — a test strategy stamped for a different release than the quality strategy it cites is a finding, not a detail. If `quality/archive/` holds prior `test-strategy-*` versions, the newest is the diff instrument for check 8.

### 2. The forward walk (sealed dispatch — the primary lens)

Dispatch one subagent (the `Agent` tool, general-purpose), sealed from your conclusions, with the resolved absolute paths of both docs and `$PLUGIN_ROOT`'s PHILOSOPHY / FRAMINGS / INDICATORS in its brief. Its job: **simulate carrying out the agreed moves exactly as written**, in order, and predict what comes back. After each move: what question got answered, what does Part 6's risk map look like now — which Unknowns became known, which confidences moved? Then judge the whole doc against the five indicators, aggressively (flag freely; the main agent filters): Direction (every kept ility and move traces to a risk-map row; nothing targets a None or non-goal), Priority (Dealbreaker-linked first; cheap-first within impact), Sufficiency (every H/M ility has a filter verdict; every Dealbreaker addressed by some lane or eyes-open declined; the fresh-eyes recon on the table or reason-recorded), Feasibility (each move concrete: question, answered-when state, who runs it, sane human/agent split), Honesty (guesses marked as guesses; "what the tests actually tell you" not proxy comfort). It returns findings with quotes and locations.

### 3. Mechanical checks (main agent)

Run these yourself against the doc on disk:

> 1. **Filter-table coverage.** Every H/M ility from the quality strategy's Part 5 appears in the filter table with a verdict (in this lane / named sibling lane / out, with reason). A silently absent H/M ility is a FAIL.
> 2. **Dealbreaker coverage.** Every Part 3 Dealbreaker is addressed by an agreed move here, explicitly handed to a named sibling lane, or explicitly declined eyes-open with a reason. FAIL only a Dealbreaker with none of the three — a dealbreaker ility may legitimately also carry deferred lower-priority ideas; that alone is not a violation.
> 3. **Fresh-eyes recon disposition.** The standing fresh-eyes defect recon is agreed, on the table, or dropped **with the user's recorded reason**. Silently absent is a FAIL; its briefs, if agreed, must be stated blind to the strategy.
> 4. **No proxy goals as targets.** No agreed move's "answered when" is a proxy (coverage %, test count, green CI) standing in for the ility itself. FLAG.
> 5. **Header stamps.** The header carries the release (matching the quality strategy's `*Release:*` line) and the version stamp with a resolved version (a literal `<version>` placeholder is a FLAG; the stamp itself is deliberate attribution — never strip it).
> 6. **Independence preserved.** Nothing in the doc suggests the strategy was derived from reading the product's source (FRAMINGS #3) — e.g. moves justified by source-file internals no conversation or strategy section carries. FLAG with the quote.
> 7. **Claimed audits have evidence.** `/test-strategy` no longer runs a mandatory tooling audit, but if the doc *claims* a `/tooling-adequacy` (or other) audit ran, its output must exist where claimed (`quality/.scratch/` or conversation record). A claimed-but-absent audit is a FAIL — fabrication signal.
> 8. **Update integrity (updated test strategies only).** Detect an update: the doc's own `## Since the last cycle` section, or a diff against the newest `quality/archive/test-strategy-*` showing substantial carried-over content (an archive alone is NOT the signal — fresh runs archive too). An update by diff with no `## Since the last cycle` section is a FAIL — a silent revision. If you cannot read the filesystem, report INCONCLUSIVE, never PASS on faith. For a detected update, **diff, don't trust**: (a) every prior agreed move carries a what-happened verdict, and every "answered/closed" cites the finding or is honestly *believed answered* at a stated confidence — an unevidenced closure is a FAIL; (b) the update contains genuinely new content not derivable from the prior doc — a closures-only diff is the **anchoring signature**, a FAIL ("the gaps have moved; verifying the past is not assessing the present"); a recorded note that nothing relevantly changed stands in as n/a. FLAG a `## Since the last cycle` section with no prior version in `quality/archive/` — the producer archives before revising, so a missing archive means history was silently rewritten.
> 9. **No process-note / scaffolding leak.** The port of `/quality-strategy-review`'s check 21. Run an actual grep-style scan over the **whole** doc, **including content inherited from a prior version** (exactly what earlier passes never re-saw). The body must be clean of process/provenance/lineage artifacts — they belong in `quality/.scratch/` or `.skill-feedback.md`. FLAG any that leaked (a doc peppered with individually-minor instances still FLAGs), and note the producer must **remove** them before the doc is done — a strip, not a note. Patterns: **(i)** first-person-about-the-skill commentary ("this step was awkward", "the skill asked me to…"); **(ii)** dispatch/scratch/sealed-pass narration ("[ran `/tooling-adequacy` inline]", "Subagent dispatched: …", "scratch would be `quality/.scratch/…`") — keep the decision, drop the mechanism; **(iii)** turn/step lineage refs ("corrected, turn-23", "folded in from the filter step") — cross-references to the doc's own named sections are fine, references to the process that built it are not; **(iv)** scratch-file path citations as sources — cite the real underlying source (the risk-map row, the named finding) or drop it. Two exemptions: a `## Since the last cycle` section is content, not machinery; the header version stamp is deliberate attribution — leave both.
> 10. **Effective Comms backstop.** The producer runs `/effective-comms` before finalizing; this catches the reader-facing modes the leak scan doesn't: **(i)** numbered references without meaning (a row/ility cited only by ID); **(ii)** coordinate-before-name (a path or label leading where a human-readable name should); **(iii)** buried recommendation — the doc's "do this next" hard to find when actionability is its job. FLAG with a one-line "name it / lead with the name / surface the action".

**Severity:** FAIL on checks 1–3, 7, and 8 is a blocker; the rest are flags.

### 4. Collapse and report

Merge the forward-walk findings with the mechanical results: drop false or trivial findings, group shared root causes, split **blockers** (the doc would steer the team wrong or claims things that didn't happen) from **flags** (worth fixing, not blocking). Produce one consolidated report: the forward-walk's headline prediction (*"run as written, here's where the risk map lands"*), then per-indicator verdicts with quotes, then the mechanical checklist with PASS/FLAG/FAIL and one-line fixes. End with the two or three changes that would most improve what running the strategy produces. Offer to walk the user through any finding.
