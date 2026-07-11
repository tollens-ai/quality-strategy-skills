# Sub-step 0 — Project pre-read (subagent dispatch)

## Goal

Produce a structured **what-is** snapshot of the project: a digest of the project as it actually is (not as anyone wants it to be), written as hypotheses for later sub-steps to confirm or refute. "The project" means **every repo in the recorded scope** (session-config note) — a product spanning five repos gets a pre-read of all five, not of whichever one the session opened in. The digest lives at `quality/pre-read.md` and lets the main agent ask informed questions in later sub-steps without loading the whole project into its own context window.

The pre-read describes **what-is**. The strategy doc that subsequent sub-steps produce describes **what-should-be**. The gap between them is what the strategy is for.

## What you need from the previous sub-step

Nothing. This is the first sub-step — and the first thing in the whole process that writes to disk, so the session-start choices (where the strategy lives, and so where `quality/pre-read.md` and the scratch files land — see SKILL.md → "Session start") must already be settled before you dispatch anything. If they aren't, go back and settle them first.

## How

Dispatch **three subagents in parallel per repo in scope** — use the `Agent` tool with the calls in a single message — each producing one part of that repo's digest. (An **empty scope** — a no-repo, idea-stage run — still dispatches the set once, with no target repo: the briefs say there is no codebase to scan and the honest-degradation rules below carry the digest; the scratch files use the plain unslugged names.) Each subagent gets framework grounding (read `PHILOSOPHY.md` and `SKILL.md` first) and a focused brief. In the briefs below, `$PROJECT_DIR` is **the repo that dispatch targets**: substitute its absolute path per dispatch, and in a multi-repo scope also tell each subagent, in one line, that its repo is part of a multi-repo product (name the others) so it reads cross-repo references as seams to note, not noise — while staying inside its own repo.

When all return, reconcile the outputs into a single `quality/pre-read.md`: a synthesis at the top, a discrepancies section, and the digests below — one set of digest sections for a single repo; one compressed section per repo for a multi-repo scope (see Reconciliation).

### Honest degradation when there's little or no code to read

A pre-read often runs against a project that has **no readable codebase yet** — a pre-implementation strategy job, a private/unavailable repo, or no filesystem access. This is normal, not a failure. When a subagent can't actually scan an area, it must say so plainly rather than invent findings that look like scan results:

- **Say it's limited.** State plainly — in the subagent's scratch output, and again in `quality/pre-read.md` — that the pre-read was LIMITED / interview-derived for that area: "no codebase to scan yet — this picture is to be confirmed in interview," not a result dressed up as a scan.
- **Don't phrase absence as a scan result.** Write "not yet established — confirm in interview" rather than "no `.github/workflows` detected" or "no audited dependency detected." An absence you inferred because you couldn't look is not an observed absence.
- **Tag every cited source SCANNED vs INFERRED.** Where the digest cites a source, distinguish SCANNED (you actually read a file or command output) from INFERRED (drawn from the project description or interview). Tag inferred items "inferred, not scanned" so an inferred fact can never later be cited as observed.

### Subagent A — Docs and metadata

What the project **claims** to be.

> You are subagent A in a three-subagent pre-read for `/quality-strategy`. Your job is to digest what the project's documentation claims, so the interview that follows knows what the project says it is.
>
> First, read `$PLUGIN_ROOT/PHILOSOPHY.md` and `$PLUGIN_ROOT/skills/quality-strategy/SKILL.md` to ground yourself in what the strategy is doing.
>
> Then digest the repo at `$PROJECT_DIR`. Read README, top-level markdown, `docs/`, `CONTRIBUTING.md`, package files (`package.json`, `Cargo.toml`, `pyproject.toml`, etc.), and recent commit messages (~30).
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
> Then map the repo at `$PROJECT_DIR`:
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
> Then read enough of the repo at `$PROJECT_DIR` to form architectural hypotheses. You don't need to understand every line — read for shape: layering, dependency direction, key abstractions, error-handling patterns, where the "interesting" or "load-bearing" code lives, which parts look mature vs scaffolded, which parts look unusually risky or unusually careful.
>
> This is deliberately a **light first touch**: at pre-read time nobody knows yet which areas the strategy will care about, so you cannot know what to look for — surface what stands out, and no more. A second, targeted design deep-dive happens later (risk-map sub-step 6.2), once the actuals scoring knows exactly which areas the evidence doesn't cover.
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
> **Also answer five plain factual predicates** (the dimension sweep uses these to decide which quality *floors* are unconditionally in scope — see sub-step 5.1). For each, answer yes / no / unknown with a one-line basis, as a fact about the system, not a judgement of how well it's handled: **(1)** does the system handle any secret, key, token, or password? **(2)** does it hold personal data (PII)? **(3)** does it hold anything a user would want back if it were lost (entrusted data — note if it's ephemeral by design)? **(4)** does the software ship to or run on other people's machines? **(5)** can it spend money on someone's behalf (paid APIs, metered compute, third-party usage)? These are predicates, not risks — *"yes, it stores user accounts"*, not *"auth looks weak"*.
>
> Where the architecture you find contradicts what looks like aspirational design docs (a `docs/architecture.md` describing a different system than the code), flag the contradiction explicitly. The pre-read describes **what-is**; "should-be" claims that don't match are themselves data.
>
> Format: markdown, max 300 lines. Hypotheses, not facts ("looks like," "appears to," "no evidence of").

### Reconciliation

When the subagents return, **first save each subagent's returned digest verbatim** to a scratch file — `quality/.scratch/0-pre-read-docs.md`, `quality/.scratch/0-pre-read-code.md`, `quality/.scratch/0-pre-read-design.md`; a multi-repo scope inserts a short repo slug — the repo directory's basename, lowercased, exactly as recorded beside each path in the session-config note — `quality/.scratch/0-pre-read-<repo>-{docs,code,design}.md`, one triple per repo — before reconciling. These are the sealed-dispatch scratch files `/quality-strategy-review` audits (see SKILL.md → "Sealed-context dispatch and scratch files"); they are the hard evidence the dispatches actually happened. They are working state, not part of the strategy.

Then write `quality/pre-read.md` with this structure:

```markdown
# Pre-read digest for <project>

*Generated <date>. This file is a what-is snapshot of the project; it informs the strategy interview but is not itself part of the strategy.*

## Summary
<5-line synthesis of the most important findings, including any cross-digest contradictions>

## Floor predicates (factual — for the dimension sweep)
<the five yes/no/unknown answers from subagent C, each with a one-line basis: handles secrets? holds PII? holds entrusted data a user would want back? ships to others' machines? can spend money? Tag any answer the pre-read could not actually scan as INFERRED. Sub-step 5.1 reads this section to decide which floors are unconditionally in scope.>

## Discrepancies and open questions
<things claimed in docs (A) but not visible in code (B) or design (C); aspirational claims that the architecture doesn't support; anything else worth confirming with the user>

## Design observations and likely-relevant dimensions
<subagent C's output, lightly edited or in full>

## Code structure
<subagent B's output, lightly edited or in full>

## Docs and metadata
<subagent A's output, lightly edited or in full>
```

Order within the file is **most-actionable first**: the synthesis and discrepancies, then the design hypotheses, then the mechanical maps (that's the single-repo layout; a multi-repo scope reshapes the digest sections — see below). Later sub-steps load only the sections they need.

**Multi-repo reconciliation.** The digest stays one file describing one system. The Summary, Floor predicates, and Discrepancies sections go system-level: the summary names the repos and how they fit together; a floor predicate holds for the product if it holds in **any** repo (say which — "holds PII: yes (api-repo)"); the discrepancies section is also where **cross-repo seams** go (one repo's client calling an API the other repo no longer serves, duplicated logic drifting apart, versions pinned differently). Then, instead of the three whole-digest sections above, write **one section per repo** (`## Repo: <name>`), each carrying the same three canonical subsections — `### Design observations and likely-relevant dimensions`, `### Code structure`, `### Docs and metadata` — compressed to what's load-bearing, target ~150 lines per repo; the verbatim scratch files remain the full record. (Keeping the canonical subsection names matters: later sub-steps say "read the Design observations section of the pre-read", and those pointers must resolve per repo.) Keep the SCANNED/INFERRED tags through the compression.

If any area was scanned only thinly or not at all (no/little code, no repo access), stay honest about that in `quality/pre-read.md` too: say in the summary that the picture for that area came from the interview and still needs confirming, phrase absences as "not yet established — confirm in interview" (never as scan results), and keep the SCANNED vs INFERRED tags so a later sub-step never mistakes an inferred absence for an observed one.

## Push back when

- A subagent returns assertions instead of hypotheses. Re-dispatch, stressing the hypothesis framing harder.
- A digest is empty for a clearly non-empty project. Investigate; the subagent may have misread the path.
- A digest exceeds its length budget. Re-dispatch asking for compression.
- Subagent C produced an -ility checklist instead of a design narrative. Re-dispatch and point at the example structure — design observations first, dimensions implied, never a checklist.

## This sub-step is DONE when

- [ ] The three-subagent set has been dispatched in parallel, with framework-grounding instructions, **for every repo in the recorded scope** — none analysed by assumption, none silently skipped.
- [ ] All digests have returned.
- [ ] Each returned digest has been saved verbatim to its scratch file (`quality/.scratch/0-pre-read-{docs,code,design}.md`; multi-repo: `0-pre-read-<repo>-{docs,code,design}.md` per repo).
- [ ] `quality/pre-read.md` has been written with the synthesis, discrepancies, and digest sections in the order above (multi-repo: system-level synthesis/floors/discrepancies incl. cross-repo seams, then one compressed section per repo).
- [ ] You have read the synthesis and discrepancies sections yourself and noted, in your working memory, the 3–5 most striking findings to confirm in upcoming sub-steps.

## Output

The digest at `quality/pre-read.md`. **No section is appended to `quality/strategy.md` from this sub-step** — the digest is a working artefact, not part of the strategy.

After the digest is in place, summarise back to the user in 5–7 lines: *"The pre-read found X, Y, Z in the docs; the code looks like A, B, C; the design suggests D, E, F may matter; and there are some discrepancies between docs and code, namely G and H. The few things I most want to confirm with you are P and Q."*

Then run a **correctness check** — *not* the substantive checkpoint (that runs at step boundaries, not here). The pre-read is a *what-is* snapshot of hypotheses; at this stage you only want to catch **factual errors** — not discuss implications, priorities, or "does this feel right":

> *"Skim this for anything factually wrong — a misread tech stack, a wrong test count, a component I mislabelled, a discrepancy I got backwards. I'm not asking yet whether it captures the right priorities — that's what the interview is for. Just: is anything here simply incorrect?"*

Fix any factual errors the user flags — re-dispatch the relevant subagent if a digest section is wrong in a way that matters. Do **not** pull the user into implications or vague unease here; that conversation belongs at the Step 1+ step boundaries, where the substantive checkpoint runs on a complete chunk of strategy.

Then ask: *"Ready to move into Step 1 (Context)?"* and proceed to sub-step 1.1.
