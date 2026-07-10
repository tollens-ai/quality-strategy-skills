---
name: test-strategy
description: A deliberately light follow-up to /quality-strategy for the testing lane — ingest the release's quality strategy, filter for the ilities testing can make a dent on (where you don't know where you stand and investigating would tell you), then per ility discuss what testing you have, what could be improved, and what could be added. High-level ideas and questions, not step-by-step hand-holding. Produces quality/test-strategy.md. Use after /quality-strategy completes for a release.
---

# Test Strategy

One of the three light follow-ups to `/quality-strategy` — the **testing** lane, beside `/evaluation-strategy` (how you judge and track what you see — oracles and proxies) and `/process-strategy` (rules, invariants, and processes). Testing is **investigation to find out what's actually true** — this lane plans where investigation will move the release's risk map, not a test plan of cases to execute.

**This skill is deliberately much lighter than `/quality-strategy` — a design decision, not a shortcut.** The quality strategy is the thorough one: a structured multi-session interview that walks you step by step and refuses to skip substance. This skill assumes that work is done and does something different: it gives you **high-level ideas and good questions**, per ility, and captures what you decide. It will not hold your hand through a step-by-step process, run analysis fan-outs, or re-derive what the quality strategy already established. One or two focused conversations, one short document.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Resolve two paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). Grounding files — `PHILOSOPHY.md`, `skills/test-strategy/FRAMINGS.md`, `skills/test-strategy/INDICATORS.md`, `.claude-plugin/plugin.json` (whose `version` field stamps the output) — live under it.
- **DOCS_DIR** — where the `quality/` docs live; every `quality/...` path below resolves under it. Normally the current working directory — but `/quality-strategy` asks at session start where the strategy should be saved and records the choice in `quality/.scratch/session-config.md`; this doc joins that same family. If the working directory has no `quality/`, ask the user where the strategy was saved (a path ending in `/quality` means its parent is the home) — never scaffold a fresh `quality/` beside code whose strategy lives elsewhere.

Substitute resolved absolute paths before acting on them — in your own Reads and in any subagent brief; the Read tool does no variable expansion, and a dispatched subagent inherits none of your context.

## Before you start

1. **`$DOCS_DIR/quality/strategy.md` must exist for this release**, completed at least through Part 6 (Risk Map). If it doesn't, stop and direct the user to `/quality-strategy` — without a risk map you'd be guessing where investigation pays, which is the opposite of this lane's job.
2. **Read `$PLUGIN_ROOT/PHILOSOPHY.md` and `$PLUGIN_ROOT/skills/test-strategy/FRAMINGS.md`.** The eleven framings counter agent defaults — without them this lane drifts into writing a test plan instead of an investigation strategy. `INDICATORS.md` names the five indicators (Direction / Priority / Sufficiency / Feasibility / Honesty) the finished doc is judged against; knowing them up front shapes the discussion. None of these are optional.
3. **Don't read the product's source code.** (FRAMINGS #3.) Investigation only pays if your perspective stays independent of the builder's; the strategy and the conversation are your context. If something is unclear, ask the user — don't load the source.
4. **Session choices.** Read `quality/.scratch/session-config.md` and restate the standing choices in one line — *including* where these answers will be recorded and who can read them: this lane's discussion is candid too (what the tests actually tell you, what's untested hope), and the candor is only safe while the user knows where their words go. Ask only what the note is missing; if there is no note at all, run the save-location ask exactly as `/quality-strategy` → "Session start" defines it before anything is written. The project may span several repos — the recorded scope, not the cwd, is what "the product" means below.

## The session — ingest, filter, then discuss per ility

**1. Ingest the release's quality strategy.** Read `quality/strategy.md`: the header's `Release:` line (this doc inherits it), Part 3's stakeholder bars (Dealbreakers especially), Part 5's H/M-rated ilities, Part 6's risk map — required vs actual, the Unknowns, the confidence on both sides — and Part 4's non-goals (what must *not* get investigated). Don't re-litigate the strategy; it's the input. Also read `quality/ideas.md` (the ideas ledger) if it exists: ideas the user volunteered spontaneously mid-strategy, in their words, with no role assigned. Consider each for this lane — does it suggest a test charter, a probe, an investigation? — and raise the fits when their ility comes up; annotate an adopted entry in the ledger (*"→ taken up in test-strategy, <date>"*) rather than deleting it, since the same idea may also serve a sibling lane; an idea whose ility this lane's filter drops simply isn't raised here — it stays unannotated in the ledger for whichever lane kept that ility.

**2. Filter — where can testing make a dent?** From the H/M ilities, propose the subset where *not knowing where you stand* is the problem and investigation would genuinely change the risk map: Unknown or low-confidence actuals on high-impact rows, claims that have never been exercised, Dealbreakers whose current evidence is hope. For each kept ility, one line of why; name the left-out ones with why not (usually: you already know where you stand — the gap is a build or a rule, so it belongs to a sibling lane; or nothing can judge the result yet — the evaluation lane first, since **you can only investigate what you can judge**). Confirm the filter with the user before drilling in.

**One standing candidate survives every filter: the fresh-eyes defect recon.** Sealed agents reading the product blind to this strategy, hunting defects nobody has named — its trace is every stated Dealbreaker at once, because unnamed defects threaten all of them, and its briefs must stay blind (agents who've read the strategy reliably plan *around* the gaps it names). Offer it every time; if the user drops it, record their reason in the doc rather than letting it vanish.

**3. Per kept ility, in priority order, discuss three questions.** High-level ideas and questions — offer candidates, ask, capture what the user decides. Dealbreaker-linked ilities first; within similar impact, cheaper-to-learn first.

- **What do you have already?** What testing exercises this ility today — suites, CI, manual habits, production incidents already teaching you? What does it *actually* tell you about this ility (not what it feels like it covers)? If whether the existing means can answer the question at all becomes the real issue — the instrument can't exercise it, or nothing can judge the output — that's a `/tooling-adequacy` audit; offer it rather than improvising one here, and dispatch it with the resolved absolute `$DOCS_DIR` doc path and a scratch destination (`quality/.scratch/tooling-adequacy-<YYYY-MM-DD>.md`) in the brief — a sealed dispatch can't ask where the docs live.
- **What could be improved?** Where tests cluster away from the risk (well-tested low-risk corners beside untested dealbreakers), where a suite asserts the wrong thing, where green CI is read as more than what it checks (FRAMINGS #8 — proxies are not quality).
- **What could be added?** Ideas by kind, not a plan: targeted probes that would flip a specific Unknown; **exploratory testing** by a person or agent where the dimension is experiential (a spec-check is never the only oracle for feel — FRAMINGS #11); **testing in production** where observability can carry it (also #11); asking a stakeholder, which is often the cheapest investigation of all (FRAMINGS #4); the standing fresh-eyes recon above. For each idea worth keeping: what question it answers, and what would count as answered.

**Capture as you go**: per ility, a few lines under Have / Improve / Add, plus one to three **agreed next moves** — each naming the question it answers, **what would count as answered** (a state, not a goal — a proxy milestone may stand as the answered-when if the move states what remains unknown about the ility when it's satisfied; FRAMINGS #8), who or what runs it (human or agent — agents make checking nearly free, humans carry judgment and smells; FRAMINGS #6, #9 — and any cost guess is honestly low-confidence until tried), and roughly when. Mark a move **blocked on <instrument/oracle>** when a `/tooling-adequacy` audit (or the discussion itself) shows its question can't yet be answered — `/tooling-strategy` collects exactly those markings. An idea the user rejects is recorded as considered-and-set-aside only if it sharpened something; otherwise dropped, not padded.

## Push back when

- The discussion drifts into enumerating test cases or building a test plan. That's execution; this lane decides *what's worth finding out*. Capture the question, not the case list.
- The user wants investigation aimed at a None-rated dimension or a non-goal. Show the trace; the strategy says it doesn't matter — either honour that or revise the strategy (`/quality-strategy` revision mode), not this doc.
- Every "have already" comes back "our tests cover it" with no per-ility answer to *"what did they last actually tell you about this?"*
- The user drops the fresh-eyes recon casually. It's droppable — but only with a recorded reason; its trace is every Dealbreaker at once.

## Output

Write to `$DOCS_DIR/quality/test-strategy.md`, incrementally as ilities are agreed. Shape:

```markdown
# Test Strategy: <project> — <release>

*Last updated: <YYYY-MM-DD>*
*Release: <from the quality strategy's header>*
*Generated by the `test-strategy` skill — quality-strategy-skills (tollens-ai) v<version, read from $PLUGIN_ROOT/.claude-plugin/plugin.json at generation time> · github.com/tollens-ai/quality-strategy-skills*

*A light companion to `quality/strategy.md` — high-level investigation ideas and decisions per ility, not a test plan. The five indicators in the plugin's INDICATORS.md are the bar.*

## The filter — where testing makes a dent

| Ility (from Part 5) | In this lane? | Why / why not |
|---|---|---|

**Fresh-eyes defect recon:** <on the table / agreed / dropped — with the user's reason if dropped>

## <Ility 1 — priority order>

**Have already.** <what exercises this today and what it actually tells you>
**Could improve.** <…>
**Could add.** <idea candidates with the question each answers>
**Agreed next moves.** <1–3 bullets: question · who (human/agent) · when; or "none — deliberately deferred">

## Out of the testing lane this release

<the filtered-out ilities with their one-line why-nots>
```

On an update after a test cycle, archive first (`quality/archive/test-strategy-<date>.md`, never overwrite an archive), refresh the header stamp, and record a short `## Since the last cycle` section: what each prior agreed move actually taught (with the finding, or honestly *believed answered* at a confidence), and what's newly worth investigating — an update that only closes prior items has verified the past, not assessed the present.

Close with the standing gates the pack shares: **invoke `/effective-comms`** on the doc before calling it final, then offer `/test-strategy-review` (the closing audit — it forward-walks the agreed moves against the five indicators), and point at the sibling lanes (`/evaluation-strategy`, `/process-strategy`) for the ilities this filter handed to them, and `/tooling-strategy` if blocked-on-tooling items accumulated.

## Escalation points

- The strategy's risk map is missing or every entry is `?` — stop; direct to `/quality-strategy` (or, if nothing can judge the dimensions at all, `/evaluation-strategy` first: you can only investigate what you can judge).
- The user wants this session to write or run the tests. Capture the agreed moves, close the doc, do the work outside this skill.
- The user asks for the full interview treatment — tiered learning needs, allocation tables, calibration cycles. Say plainly: this lane is deliberately light — high-level ideas and questions; the thoroughness lives in `/quality-strategy`, which already did the heavy work this lane stands on. If the release genuinely needs a deep investigation programme, build it *from* this doc's agreed moves, outside this skill.
