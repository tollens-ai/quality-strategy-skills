# Sub-step 0 — Project pre-read (subagent dispatch)

## Goal

Produce a structured **what-is** snapshot of the project: a digest of the project as it actually is (not as anyone wants it to be), surfaced as hypotheses for downstream sub-steps to confirm or refute. The digest lives at `quality/pre-read.md` and lets the main agent ask informed questions in subsequent sub-steps without loading the whole project into its own context window.

The pre-read describes **what-is**. The strategy doc that subsequent sub-steps produce describes **what-should-be**. The gap between them is what the strategy is for.

## What you need from the previous sub-step

Nothing. This is the first sub-step.

## How

Dispatch **three subagents in parallel** — use the `Agent` tool with three calls in a single message — each producing one part of the digest. Each subagent gets framework grounding (read `PHILOSOPHY.md` and `SKILL.md` first) and a focused brief.

When all three return, reconcile their outputs into a single `quality/pre-read.md` file with a synthesis at the top, a discrepancies section, and the three digests as sections below.

### Subagent A — Docs and metadata

What the project **claims** to be.

> You are subagent A in a three-subagent pre-read for `/quality-strategy`. Your job is to digest what the project's documentation claims, so the downstream interview has a starting position for what the project says it is.
>
> First, read `$PLUGIN_ROOT/PHILOSOPHY.md` and `$PLUGIN_ROOT/skills/quality-strategy/SKILL.md` to ground yourself in what the strategy is doing.
>
> Then digest the project at `$PROJECT_DIR`. Read README, top-level markdown, `docs/`, `CONTRIBUTING.md`, package files (`package.json`, `Cargo.toml`, `pyproject.toml`, etc.), and recent commit messages (~30).
>
> Surface, as **hypotheses** (not facts):
> - Stated product purpose and scope.
> - Stated tech stack and dependencies.
> - Stated team and any agent-collaboration setup.
> - Doc structure and what looks load-bearing.
> - Recent activity from commit messages — what's been worked on, what's been argued about.
> - Any aspirational claims (vision docs, roadmap statements, design specs that may or may not match the code).
>
> Format: markdown, max 250 lines. Use phrases like "the README claims," "docs describe," "package files state." Do not assert beyond what the docs themselves say.
>
> Skip: vendored deps, lockfiles, generated content.

### Subagent B — Code structure

What's mechanically there.

> You are subagent B in a three-subagent pre-read for `/quality-strategy`. Your job is the mechanical structural map of the project — what files and modules exist, how they're organised, what infrastructure is in place. Subagent A is producing the docs digest separately; you are producing the structural one.
>
> First, read `$PLUGIN_ROOT/PHILOSOPHY.md` and `$PLUGIN_ROOT/skills/quality-strategy/SKILL.md` to ground yourself.
>
> Then map the project at `$PROJECT_DIR`:
> - Module / package / directory structure with sizes (LOC, file counts).
> - Languages and frameworks actually in use (concrete versions from lockfiles or imports).
> - Test infrastructure: test count, framework, types of tests (unit/integration/e2e), location.
> - CI configuration: what runs, on what triggers.
> - Linting, formatting, type-checking: configured? enforced?
> - Hot files: which files have changed most in the last ~50 commits (proxy for load-bearing or fragile code).
> - Dead-code signals: files untouched in months, dead exports, commented-out blocks.
> - TODO/FIXME density: where the code says it has known issues.
> - Agent-collaboration markers in the codebase itself: `CLAUDE.md`, `.claude/`, `AGENTS.md`, agent-style commit patterns.
>
> Format: markdown, max 250 lines. Use mechanical, concrete language ("there are," "located at," "configured to"). You don't need to *understand* the code — just map it.
>
> Skip: file-by-file content; vendored deps; lockfiles.

### Subagent C — Design and architecture

What shape the system has, and what dimensions that shape implies will matter downstream.

> You are subagent C in a three-subagent pre-read for `/quality-strategy`. Subagent A is digesting docs; subagent B is mapping structure. Your job is interpretive: read the project for **design and architecture**, and surface what's likely to matter for downstream quality-strategy decisions.
>
> The pre-read is a **what-is** snapshot — describing the project as it actually is, not as anyone wants it to be.
>
> First, read `$PLUGIN_ROOT/PHILOSOPHY.md` and `$PLUGIN_ROOT/skills/quality-strategy/SKILL.md` to ground yourself.
>
> Then read enough of the project to form architectural hypotheses. You don't need to understand every line — read for shape: layering, dependency direction, key abstractions, error-handling patterns, where the "interesting" or "load-bearing" code lives, which parts look mature vs scaffolded, which parts look unusually risky or unusually careful.
>
> Your output is a **narrative of design observations**. For each observation: a one-line title (what you observed), one-to-three lines describing it, and one-to-two lines connecting it to which quality dimensions are likely to matter downstream and why. Do **not** work through a checklist of dimensions. Work through what the design tells you, and let the dimensions fall out.
>
> Example shape:
>
> > **Plugin architecture with versioned ABI between `core/` and modules.**
> > Modules load dynamically against a versioned core ABI. Mature; appears load-bearing.
> > → Suggests extensibility and backwards-compatibility will be central. Diagnosability across the boundary is a likely concern (errors may lose context when crossing the ABI).
> >
> > **Errors propagate as exceptions, caught inconsistently at service entry points.**
> > Some entry points wrap calls in try/catch; others don't. Pattern is not uniform.
> > → Reliability and diagnosability look vulnerable. Likely a focus area if the project cares about uptime or actionable errors.
> >
> > **No metrics, no tracing, scattered logging.**
> > Logging is per-module, format varies, no central collection visible.
> > → Observability is at the floor. If the operating context requires it, this is a known gap.
>
> Cover at minimum: overall shape, dependency direction, abstraction layers, error-handling pattern, observability posture, extensibility approach, security boundaries, data and state model. Anything else load-bearing is fair game.
>
> Where the architecture you find contradicts what looks like aspirational design docs (a `docs/architecture.md` describing a different system than the code), flag the contradiction explicitly. The pre-read describes **what-is**; "should-be" claims that don't match are themselves data.
>
> Format: markdown, max 300 lines. Hypotheses, not facts ("looks like," "appears to," "no evidence of").

### Reconciliation

When all three subagents return, write `quality/pre-read.md` with this structure:

```markdown
# Pre-read digest for <project>

*Generated <date>. This file is a what-is snapshot of the project; it informs the strategy interview but is not itself part of the strategy.*

## Summary
<5-line synthesis of the most important findings, including any cross-digest contradictions>

## Discrepancies and open questions
<things claimed in docs (A) but not visible in code (B) or design (C); aspirational claims that the architecture doesn't support; anything else worth confirming with the user>

## Design observations and likely-relevant dimensions
<subagent C's output, lightly edited or in full>

## Code structure
<subagent B's output, lightly edited or in full>

## Docs and metadata
<subagent A's output, lightly edited or in full>
```

Order within the file is **most-actionable first**: the synthesis and discrepancies, then the interpretive layer (design hypotheses), then the mechanical maps. Downstream sub-steps load only the sections they need.

## Push back when

- A subagent returns assertions instead of hypotheses. Re-dispatch with stronger emphasis on the hypothesis framing.
- A digest is empty for a clearly non-empty project. Investigate; the subagent may have misread the path.
- A digest exceeds its length budget. Re-dispatch asking for compression.
- Subagent C produced an -ility checklist instead of a design narrative. Re-dispatch with the example structure emphasised — design observations first, dimensions implied, never a checklist.

## This sub-step is DONE when

- [ ] Three subagents have been dispatched in parallel with framework-grounding instructions.
- [ ] All three digests have returned.
- [ ] `quality/pre-read.md` has been written with the synthesis, discrepancies, and three digest sections in the order above.
- [ ] You have read the synthesis and discrepancies sections yourself and noted, in your working memory, the 3–5 most striking findings to confirm in upcoming sub-steps.

## Output

The digest at `quality/pre-read.md`. **No section is appended to `quality/strategy.md` from this sub-step** — the digest is a working artefact, not part of the strategy.

After the digest is in place, summarise back to the user in 5–7 lines: *"The pre-read found X, Y, Z in the docs; the code looks like A, B, C; the design suggests D, E, F may matter; and there are some discrepancies between docs and code, namely G and H. The few things I most want to confirm with you are P and Q."*

Then **run the substantive checkpoint** (see SKILL.md → Substantive checkpoint between sub-steps). Even at this early stage, the user may have a smell about whether the digest captured the right things. Don't accept a quick "looks fine" — actively invite vague unease.

Only after explicit, considered confirmation, ask: *"Ready to move into Step 1 (Context)?"* Do not proceed to sub-step 1.1 without that confirmation.
