---
name: strategy-variants
description: Derive audience-facing variants from a finished quality strategy — a distributable one-pager for the people the strategy names, and a client-safe ("polite") version that drops frank internal candor without lying. Use after /quality-strategy has produced and reviewed quality/strategy.md, when you need something to hand to engineers, a PM, contributors, or an external client rather than the full internal artifact.
---

# Strategy Variants

`quality/strategy.md` is written to be *honest and complete* — for its author and auditor. That's the right shape for the working artifact, and the wrong shape for handing to the 40 engineers it talks about, the busy PM, the open-source contributors, or an external client. Those readers need a *view pitched at them*: shorter, in their language, and — for an external audience — without the frank internal candor (self-criticism, internal economics, politics, pain-thresholds) that makes the working doc useful but is inappropriate or unwise to show a client.

This skill is a **post-processing transformation**. It runs *after* the honest strategy is finished and reviewed, and it never edits `quality/strategy.md` — it emits separate variant files so the honest internal strategy stays the single source of truth. It produces, on request, either or both:

1. **A distributable one-pager (`quality/strategy-one-pager.md`)** — audience-facing, for the people the strategy names. What we're building, what "good" means *for you*, what we're deliberately not doing, and where the real risks are — in plain language, for someone who will not read the full strategy.
2. **A client-safe variant (`quality/strategy-client.md`)** — for an external audience (client, customer, exec sponsor) where the working doc's frank internal layer must come out. Honesty about scope, commitments, and non-goals is preserved; internal self-criticism and internal-only economics/politics are removed or reframed — **omitted, never contradicted**.

The honest one-pager and the client-safe variant are different jobs: the one-pager *compresses for an insider audience*; the client variant *re-pitches for an outsider* and changes register. A project might want one, the other, or both.

## The load-bearing rule: a variant omits, it never lies

This is the discipline that keeps the skill from becoming a spin machine. Both variants are **faithful views** of the reviewed strategy, exactly as `/operational-distillation`'s TL;DR is a faithful view of the body:

- A variant may **omit** detail, **compress**, **reorder**, and **change register** (plainer words for engineers; a professional register for a client).
- A variant may **never assert quality the body doesn't support**, never upgrade an actual-state assessment, never hide a gap or Dealbreaker that *affects the reader it's written for*, and never invent commitments the strategy didn't make.
- The client-safe variant specifically: it removes *internal* candor (e.g. "observability is at the floor", "we're guessing here", a contractor's internal pain-threshold, internal cost economics, team politics) and reframes it professionally — but if a gap is something the **client themselves would be affected by or would reasonably need to know**, it must survive into the client variant, reframed honestly, not buried. "Don't show the client our internal worry" is fine; "don't tell the client about a risk that lands on them" is not. When those two collide, the second wins, and you say so to the user.

If you cannot produce a client-safe variant without either lying or exposing something that should stay internal, **stop and surface the tension to the user** rather than resolving it silently in either direction.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). The grounding file this skill reads — `PHILOSOPHY.md` — lives under it.
- **PROJECT_DIR** — the absolute path of the project whose strategy you're transforming (normally the current working directory; confirm with the user if it's ambiguous). The strategy docs live under `$PROJECT_DIR/quality/`.

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them.** The Read tool does no variable expansion and resolves relative paths against the current working directory, not this skill's directory — so an unsubstituted placeholder or a bare relative path will fail.

## When to use

- **From `/quality-strategy`, after the review passes** — when the user says they need something to circulate (to the team, contributors, a PM) or to show a client. Offer it; don't force it.
- **Standalone** — to derive a one-pager or client-safe version from any existing, reviewed `quality/strategy.md`.

Do **not** run it on an unfinished or unreviewed strategy: a variant of a broken strategy is a confident-looking, misleading artifact. If the strategy isn't done, say so and point back to `/quality-strategy` / `/quality-strategy-review`.

## What you need

- **Grounding.** Read `$PLUGIN_ROOT/PHILOSOPHY.md` — in particular *quality is value to someone who matters* (the variant is pitched at a specific someone) and *make confidence visible* (the variant must not launder away honest uncertainty that the reader needs).
- **The strategy.** Read `$PROJECT_DIR/quality/strategy.md` end-to-end. You cannot pitch a faithful variant from the headings alone.
- **Which variant(s), and for whom.** Ask the user — *"one-pager for the team, a client-safe version, or both? And who exactly is the audience — name them, because the variant is pitched at them."* The named audience determines what's load-bearing to keep and what's internal noise to drop.

## The work, in order

### 1. Identify the target reader and what they need from this

A variant is *for someone*. Pin down who (an engineer who'll build against it? a PM deciding scope? contributors? a paying client?) and what decision or understanding they need it for. Pull from the strategy the few things that reader most needs:

- **What this is and why it matters to them** — purpose (Part 1) and the stakeholder(s) that *is* this reader, or that this reader cares about (Part 3).
- **What "good" means, sharply** — the dimensions rated H and the Dealbreakers that bear on this reader (Parts 3, 5).
- **What's deliberately out** — the non-goals most likely to be mistaken for gaps (Part 4) — especially the ones this reader might otherwise expect.
- **Where the real risk is** — the hottest risk-map rows that this reader needs to know about (Part 6), at the candor level appropriate to them (see step 3 for the client case).
- **What happens next** — the first moves from the plan of work that involve or affect this reader (Part 7; if Part 7 is a recorded deferral to the follow-on skills, use the risk map's hottest items — and the follow-on strategy docs, where they exist — instead).

### 2. Distributable one-pager, if requested

Write a single page, audience-facing, in the reader's language. It is **not** the operational TL;DR (that's an author/operator triage aid placed *inside* the strategy by `/operational-distillation`); this is a standalone document someone reads *instead of* the strategy. Cover, plainly:

- **What we're building and who it's for.**
- **What "good" means here** — the sharp bars, stated as commitments, not jargon ("checkout never double-charges", not "transactional-integrity is a Dealbreaker").
- **What we're deliberately not doing (and why)** — so the reader doesn't mistake a non-goal for an oversight.
- **Where we know we're exposed** — the honest top risks, at a level a peer/insider audience can act on.
- **First moves** — what's happening next.

Keep it to a page. Plain sentences over tables where it helps the reader. Cite nothing internal-only.

### 3. Client-safe variant, if requested

Same backbone, re-pitched for an external reader, applying the omit-never-lie rule:

- **Strip internal candor.** Remove or reframe self-critical internal language ("at the floor", "we're guessing", "Unknown until we test"), internal cost economics, team/politics notes, and any internal pain-thresholds. "Observability is at the floor and nobody owns it" becomes, if the client needs to know it at all, "operational observability is an explicit area of investment for the next phase."
- **Keep client-affecting honesty.** A gap, risk, or non-goal that *lands on the client* (something they'd experience, depend on, or reasonably need to know to make their own decisions) stays — reframed into a professional register, never deleted. Confidence the client needs (e.g. "this is not yet load-tested") is preserved honestly; spurious precision is still banned.
- **Professional register.** Commitments stated as commitments; scope boundaries stated as deliberate decisions; risks stated as managed work, not confessions.
- **No upgrades.** Never present an actual-state level higher than the body supports. The client variant is allowed to be *quieter* about internal worry, never *louder* about quality than the truth.

Where keeping client-affecting honesty and removing internal candor pull against each other, surface the specific line to the user and let them decide how to phrase it — don't silently pick.

### 4. Emit as separate files and check against the body

Write each requested variant to its own file — `quality/strategy-one-pager.md` and/or `quality/strategy-client.md` — leaving `quality/strategy.md` untouched. If a variant file already exists from a prior run (e.g. after a strategy revision), refresh it in place from the current body rather than appending — like `/operational-distillation` refreshing a drifted distillation. Add a one-line header to each marking it a derived view (e.g. *"Audience view derived from quality/strategy.md on <YYYY-MM-DD>; the strategy is the source of truth."*).

Then re-read each variant against the body: every claim supported by the strategy; nothing load-bearing for that reader missing; for the client variant specifically, confirm you have not (a) asserted any quality the body doesn't support, or (b) buried a client-affecting risk. If the body and a variant disagree, the body wins and the variant is wrong.

## Push back when

- The user wants the client variant to claim or imply quality the strategy doesn't support. *"I can make it client-appropriate — quieter about our internal worries — but I can't make it say we're in better shape than the strategy says we are. That's the line between professional and misleading."*
- The user wants to drop a risk from the client variant that actually affects the client. *"This one lands on them — if it surfaces later, hiding it now reads as concealment. We can reframe how we say it, but it should stay."*
- The strategy is unfinished or unreviewed. *"A variant of an incomplete strategy looks authoritative but isn't. Worth finishing / reviewing the strategy first."*
- The user wants the one-pager to add nuance the body doesn't contain. *"A variant is a view, not a place to add to the strategy. If that nuance matters, it belongs in the body first."*

## This skill is DONE when

- [ ] The reviewed `quality/strategy.md` has been read end-to-end (not just headings).
- [ ] The target reader(s) and which variant(s) to produce were confirmed with the user.
- [ ] Each requested variant is written to its own file (`quality/strategy-one-pager.md` and/or `quality/strategy-client.md`), with `quality/strategy.md` left unchanged.
- [ ] Each variant is a faithful view: every claim supported by the body, nothing load-bearing for its reader missing.
- [ ] For the client variant: confirmed it asserts no quality the body doesn't support and buries no client-affecting risk; any internal-vs-client tensions were surfaced to the user, not resolved silently.
- [ ] Each variant carries a header marking it a derived view of the strategy.

## Output

- `quality/strategy-one-pager.md` — the distributable one-pager (when requested).
- `quality/strategy-client.md` — the client-safe variant (when requested).
- `quality/strategy.md` is **not modified** by this skill.

Confirm to the user what was produced and, for the client variant, name explicitly anything you reframed or any internal-vs-client tension you surfaced, so the user can sanity-check the omissions before circulating it.
