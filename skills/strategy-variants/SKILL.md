---
name: strategy-variants
description: Derive audience-facing variants from a finished quality strategy — a distributable one-pager for the people the strategy names, and a client-safe ("polite") version that drops frank internal candor without lying. Use after /quality-strategy has produced and reviewed quality/strategy.md, when you need something to hand to engineers, a PM, contributors, or a named external audience — a client, or for a project with no client, its end users, funders, or a due-diligence reader — rather than the full internal artifact. Gates mechanically on strategy completeness before producing anything.
---

# Strategy Variants

`quality/strategy.md` is written to be *honest and complete* — for its author and auditor. That's the right shape for the working artifact, and the wrong shape for handing to the 40 engineers it talks about, the busy PM, the open-source contributors, or an external audience — a paying client, or a project's end users, funders, or due-diligence readers. Those readers need a *view pitched at them*: shorter, in their language, and — for an external audience — without the frank internal candor (self-criticism, internal economics, politics, pain-thresholds). That candor makes the working doc useful, but showing it to a client would be unwise or inappropriate.

This skill is a **post-processing step**. It runs *after* the honest strategy is finished and reviewed, and it never edits `quality/strategy.md` — it writes separate variant files, so the honest internal strategy stays the single source of truth. It produces, on request, either or both:

1. **A distributable one-pager (`quality/strategy-one-pager.md`)** — audience-facing, for the people the strategy names. What we're building, what "good" means *for you*, what we're deliberately not doing, and where the real risks are — in plain language, for someone who will not read the full strategy.
2. **A client-safe variant (`quality/strategy-client.md`)** — for a **named** external audience where the working doc's frank internal layer must come out. Often that's a paying client, a customer, or an exec sponsor — but many projects have no client anywhere in the picture, and the external reader is one the strategy's own Part 3 names: an OSS project's end users, funders or backers, a due-diligence reader evaluating the project. It keeps the honesty about scope, commitments, and non-goals; it removes or reframes internal self-criticism and internal-only economics and politics — **omitted, never contradicted**.

The honest one-pager and the client-safe variant are different jobs: the one-pager *compresses for an insider audience*; the client variant *re-pitches for an outsider* and changes tone. A project might want one, the other, or both.

## The load-bearing rule: a variant omits, it never lies

This is the discipline that keeps the skill from becoming a spin machine. Both variants are **faithful views** of the reviewed strategy — the body, meaning the full internal doc — exactly as `/operational-distillation`'s TL;DR is a faithful view of it:

- A variant may **omit** detail, **compress**, **reorder**, and **change tone** (plainer words for engineers; a professional tone for a client).
- A variant may **never assert quality the body doesn't support**, never upgrade an actual-state assessment, never hide a gap or Dealbreaker (a must-never-fail bar) that *affects the reader it's written for*, and never invent commitments the strategy didn't make.
- The client-safe variant specifically: it removes *internal* candor (e.g. "observability is at the floor", "we're guessing here", a contractor's internal pain-threshold, internal cost economics, team politics) and reframes it professionally. But if a gap is something the **client themselves would be affected by or would reasonably need to know**, it must survive into the client variant — reframed honestly, not buried. "Don't show the client our internal worry" is fine; "don't tell the client about a risk that lands on them" is not. When those two collide, the second wins, and you say so to the user.

If you cannot produce a client-safe variant without either lying or exposing something that should stay internal, **stop and surface the tension to the user** rather than resolving it silently in either direction.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). The grounding file this skill reads — `PHILOSOPHY.md` — lives under it.
- **PROJECT_DIR** — the absolute path of the project whose strategy you're transforming (normally the current working directory; confirm with the user if it's ambiguous). The strategy docs normally live under `$PROJECT_DIR/quality/` — but `/quality-strategy` asks at session start where the strategy should be saved, so they may live elsewhere. If `$PROJECT_DIR/quality/` is absent, get the docs home instead of assuming: from the orchestrator's brief when this skill was dispatched, else by asking the user; if the path you're given ends in `/quality`, its parent is the home. From then on treat `$PROJECT_DIR` as that docs home wherever a path below says `$PROJECT_DIR/quality/...` — one substitution, made once, before you act on any path.

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them.** The Read tool does no variable expansion and resolves relative paths against the current working directory, not this skill's directory — so an unsubstituted placeholder or a bare relative path will fail.

## When to use

- **From `/quality-strategy`, after the review passes** — when the user says they need something to circulate (to the team, contributors, a PM) or to show a client. Offer it; don't force it.
- **Standalone** — to derive a one-pager or client-safe version from any existing, reviewed strategy doc: normally the live `quality/strategy.md`; when that is legitimately mid-rewrite (a new release's strategy being drafted), the step-1 gate can offer a complete archived release instead.

Do **not** run it on an unfinished or unreviewed strategy: a variant of a broken strategy is a confident-looking, misleading artifact. *Unfinished* is not a judgment call here — step 1 of the work is a mechanical gate (Parts 1, 3, 4, and 6 present, or stop and produce nothing). *Unreviewed* means: if the strategy hasn't been through `/quality-strategy-review`, say so and recommend the review first — leading with caveats is not a substitute for either check, because caveats stay behind when the page is forwarded.

## What you need

- **Grounding.** Read `$PLUGIN_ROOT/PHILOSOPHY.md` — in particular *quality is value to someone who matters* (the variant is pitched at a specific someone) and *make confidence visible* (the variant must not launder away honest uncertainty that the reader needs).
- **The strategy.** Read `$PROJECT_DIR/quality/strategy.md` end-to-end. You cannot pitch a faithful variant from the headings alone — and step 1 gates mechanically on what you find here, so read before asking anything else.
- **Which variant(s), and for whom — by name.** After the step-1 gate passes, ask the user — *"one-pager for the team, a client-safe version, or both? And who exactly is each for — name them, because the variant is pitched at them."* The named audience determines what's load-bearing to keep and what's internal noise to drop. For the one-pager a role is enough ("the team", "contributors"). For the client-safe variant the name is a hard requirement, not flavour: **never invent an audience**. If the user can't name one — common when there's no paying client anywhere in the picture — don't guess and don't default to an imaginary client: read the candidates out of the strategy's own Part 3 stakeholders (an OSS project's end users; funders or backers; a due-diligence reader) and ask the user to pick who this is actually for. If Part 3 offers no external reader and the user can't name one either, there is no one to pitch to — don't produce the client-safe variant (a still-requested one-pager is unaffected).

## The work, in order

### 1. Gate: check the strategy can support a faithful variant — mechanical, before any production

A faithful variant cannot be derived without four Parts: purpose and context (Part 1), the stakeholders a variant is pitched at (Part 3), the non-goals a reader would mistake for gaps (Part 4), and the risk map (Part 6). (Steps 2–4 also draw on Parts 5 and 7 where they exist — but step 2 states a fallback for a deferred Part 7, and Part 5's bars can be reconstructed from Part 3's lenses; these four have no substitute.) In the strategy doc you just read, check each of the four is **present with content** — a real section body (purpose/context in Part 1, stakeholders in Part 3, non-goals in Part 4, risk rows in Part 6), not a bare heading, an empty section, or a to-be-filled placeholder. This is a presence check, not a quality judgment — `/quality-strategy-review` owns quality.

If any of Parts 1, 3, 4, or 6 fails the check, **stop — produce no variant file**, however heavily you could caveat it. Before delivering the stop message, look in `$PROJECT_DIR/quality/archive/` — `/quality-strategy` snapshots there as `strategy-<release-name>-<YYYY-MM-DD>.md` when a new release's strategy starts, and as `strategy-<date>.md` before ordinary revisions (when the filename carries no release name, read the release from the archived doc's own `Release:` header). A thin live `strategy.md` often means a new release's strategy is mid-write and the *previous* release's complete doc sits there. Then:

- **If an archived doc passes the same four-Part check**, say so in the stop message: the live strategy is unfinished (name what's missing), and name the archived file and the release it covers — the user may derive variants **of that release** instead. Proceed against the archive only on their explicit say-so, and each variant's derived-view header (step 5) then names the archived release as its source.
- **Otherwise**, stop and point at `/quality-strategy` to finish the strategy (and `/quality-strategy-review` before variants, per "When to use").

### 2. Identify the target reader and what they need from this

A variant is *for someone*. Pin down who (an engineer who'll build against it? a PM deciding scope? contributors? a paying client — or, with no client in the picture, the end users, funders, or due-diligence readers the strategy's Part 3 names?) and what decision or understanding they need it for. Pull from the strategy the few things that reader most needs:

- **What this is and why it matters to them** — purpose (Part 1) and the stakeholder(s) that *is* this reader, or that this reader cares about (Part 3).
- **What "good" means, sharply** — the dimensions rated H and the Dealbreakers that matter to this reader (Parts 3, 5).
- **What's deliberately out** — the non-goals most likely to be mistaken for gaps (Part 4) — especially the ones this reader might otherwise expect.
- **Where the real risk is** — the hottest risk-map rows that this reader needs to know about (Part 6), at the candor level appropriate to them (see step 4 for the client case).
- **What happens next** — the first moves from the plan of work that involve or affect this reader (Part 7; if Part 7 just records a deferral to the follow-on skills, use the risk map's hottest items instead, plus the follow-on strategy docs where they exist).

### 3. Distributable one-pager, if requested

Write a single page, audience-facing, in the reader's language. It is **not** the operational TL;DR — that one is a triage aid for the author and operator, placed *inside* the strategy by `/operational-distillation`. This is a standalone document someone reads *instead of* the strategy. Cover, plainly:

- **What we're building and who it's for.**
- **What "good" means here** — the sharp bars, stated as commitments, not jargon ("checkout never double-charges", not "transactional-integrity is a Dealbreaker").
- **What we're deliberately not doing (and why)** — so the reader doesn't mistake a non-goal for an oversight.
- **Where we know we're exposed** — the honest top risks, at a level a peer/insider audience can act on.
- **First moves** — what's happening next.

Keep it to a page. Plain sentences over tables where it helps the reader. Include nothing internal-only.

### 4. Client-safe variant, if requested

Same backbone, re-pitched for the external reader the user **named** (never one you supplied — the "What you need" ask settles this before any writing). "Client" below is shorthand for that named reader: a paying client when one exists, or the external readers Part 3 itself names — OSS end users, funders/backers, a due-diligence reader — when none does. Everything below reads the same with that reader substituted, and who they are changes what's load-bearing: a funder needs the sustainability and delivery risks, an end user the data-loss and breakage risks, a due-diligence reader the honest confidence statements. Apply the omit-never-lie rule:

- **Strip internal candor.** Remove or reframe self-critical internal language ("at the floor", "we're guessing", "Unknown until we test"), internal cost economics, team/politics notes, and any internal pain-thresholds. "Observability is at the floor and nobody owns it" becomes, if the client needs to know it at all, "operational observability is an explicit area of investment for the next phase."
- **Keep client-affecting honesty.** A gap, risk, or non-goal that *lands on the client* (something they'd experience, depend on, or reasonably need to know to make their own decisions) stays — reframed into a professional tone, never deleted. Keep, honestly, any confidence statement the client needs (e.g. "this is not yet load-tested"); fake precision is still banned.
- **Professional tone.** State commitments as commitments, scope boundaries as deliberate decisions, and risks as managed work — not confessions.
- **No upgrades.** Never present an actual-state level higher than the body supports. The client variant is allowed to be *quieter* about internal worry, never *louder* about quality than the truth.

Where keeping client-affecting honesty and removing internal candor pull against each other, surface the specific line to the user and let them decide how to phrase it — don't silently pick.

### 5. Emit as separate files and check against the body

Write each requested variant to its own file — `quality/strategy-one-pager.md` and/or `quality/strategy-client.md` — leaving `quality/strategy.md` untouched. If a variant file already exists from a prior run (e.g. after a strategy revision), rewrite it in place from the current body rather than appending — the same way `/operational-distillation` refreshes a distillation that has drifted. Add a one-line header to each marking it a derived view and naming the release the strategy covers (e.g. *"Audience view derived from quality/strategy.md (<release>) on <YYYY-MM-DD>; the strategy is the source of truth."*). If the user chose an archived release at the step-1 gate, the header names that archived file and release instead — a reader must never mistake a past release's view for the current one.

Then re-read each variant against the body. Check that the strategy supports every claim, and that nothing this reader depends on is missing. For the client variant specifically, confirm you have not (a) asserted any quality the body doesn't support, or (b) buried a client-affecting risk. If the body and a variant disagree, the body wins and the variant is wrong.

## Push back when

- The user wants the client variant to claim or imply quality the strategy doesn't support. *"I can make it client-appropriate — quieter about our internal worries — but I can't make it say we're in better shape than the strategy says we are. That's the line between professional and misleading."*
- The user wants to drop a risk from the client variant that actually affects the client. *"This one lands on them — if it surfaces later, hiding it now reads as concealment. We can reframe how we say it, but it should stay."*
- The strategy is unfinished or unreviewed. *"A variant of an incomplete strategy looks authoritative but isn't. Worth finishing / reviewing the strategy first."* For unfinished, this is not just push-back — the step-1 gate stops production outright.
- The user wants the client-safe variant without saying who it's for ("just make it client-safe"). *"Client-safe for whom? What stays in depends on who's reading — a client, your end users, a funder. Name them and I'll pitch it at them; your strategy's Part 3 already lists the candidates."* Producing for a reader you invented is a faithfulness failure even if every sentence is true.
- The user wants the one-pager to add nuance the body doesn't contain. *"A variant is a view, not a place to add to the strategy. If that nuance matters, it belongs in the body first."*

## This skill is DONE when

- [ ] The doc the variants derive from — the reviewed `quality/strategy.md`, or the archived release the user explicitly chose — has been read end-to-end (not just headings).
- [ ] The step-1 gate passed: Parts 1, 3, 4, and 6 present with content in the doc the variants derive from — the live strategy, or an archived release the user explicitly chose (named in each variant's header). If it didn't pass, this skill stopped and produced nothing.
- [ ] The target reader(s) and which variant(s) to produce were confirmed with the user; for the client-safe variant the audience was named by the user (or picked by the user from Part 3's own stakeholders) — never invented.
- [ ] Each requested variant is written to its own file (`quality/strategy-one-pager.md` and/or `quality/strategy-client.md`), with `quality/strategy.md` left unchanged.
- [ ] Each variant is a faithful view: every claim supported by the body, nothing its reader depends on missing.
- [ ] For the client variant: confirmed it asserts no quality the body doesn't support and buries no client-affecting risk; any internal-vs-client tensions were surfaced to the user, not resolved silently.
- [ ] Each variant carries a header marking it a derived view of the strategy.

## Output

- `quality/strategy-one-pager.md` — the distributable one-pager (when requested).
- `quality/strategy-client.md` — the client-safe variant (when requested).
- `quality/strategy.md` is **not modified** by this skill.

Confirm to the user what was produced and, for the client variant, name explicitly anything you reframed or any internal-vs-client tension you surfaced, so the user can sanity-check the omissions before circulating it.
