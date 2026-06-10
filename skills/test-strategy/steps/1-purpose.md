# Sub-step 1 — Purpose

## Goal

Open the test strategy with a short purpose statement: what we're investigating, why, and how this differs from "writing tests." This section is short — typically 4-8 lines — but it sets the frame for everything that follows.

## What you need from the previous sub-step

`quality/test-pre-read.md`. Specifically:

- The risk map summary tells you what kinds of unknowns dominate (existential? user-facing? agent-handling?).
- The plan-of-work testing items tell you what the strategy already expected investigation to produce.
- The test infrastructure inventory tells you whether you're working in a context with established test culture or building from scratch.

## What to cover

By the end of this sub-step the strategy doc captures:

1. **What this test strategy is for** — to investigate the unknowns in the risk map and surface information that lets the team close the gaps efficiently. One to three sentences, in the team's voice.

2. **What it is not** — explicitly *not* a test plan, *not* a coverage target, *not* a quality strategy. A short anti-list helps prevent drift.

3. **The relationship to the quality strategy** — one sentence stating that this doc operationalises `quality/strategy.md` (turns its risk map into investigation work) and feeds back into it via the update protocol.

4. **Where this sits in the four-question frame** — orient the reader with the four quality questions: (1) what does good look like? (2) how do we know if what we have is good? (3) is what we have good? (4) how do we make it good? The *quality* strategy answers Q1; this *test* strategy is how the team answers Q3. But Q3 can only be answered honestly once **Q2** is settled — that's why the tooling & oracle adequacy check (sub-step 3.5, `/tooling-adequacy`) is part of the flow. One or two sentences, not a lecture.

5. **What this strategy is for, right now (its job)** — one line naming the job: steering a durable production effort, a pre-implementation build, a one-shot agentic attempt, or a deliberately thin slice. This shapes how much investigation the project deserves (a thin slice legitimately gets fewer, lighter learning needs). Keep it light here — just ask *"what is this test strategy mainly for right now?"* and record the answer; the fuller treatment lives in the quality strategy.

## How to ask

In this sub-step you mostly draft and confirm rather than interview. Draft the purpose section from the pre-read, then read it back and ask the user *"does this name what we're trying to accomplish in your language?"*

Two framings that must show up — see FRAMINGS.md #1 and #2.

**Framing #1 (investigation, not checking).** Most teams under-invest in investigation. The purpose statement should make clear this strategy is about *finding out what's actually true*, not verifying a spec. Example phrasings:

- *"...to investigate the gaps between what the team intends and what the product actually does..."*
- *"...to surface what we don't yet know about whether [risk map item] holds..."*
- Avoid: *"...to verify that all features work correctly..."* — that's a test plan, not a test strategy.

**Framing #2 (no test phase).** The strategy applies from now, not from "when we get to test." If the team is mid-build, testing thinking applies to design and architecture decisions happening *now*. Example phrasings:

- *"This strategy applies from today and runs throughout — there is no test phase."*
- *"Investigation happens alongside building, not after it."*

You don't need to use these exact words, but the produced section should not read as "what we'll do at the end of the project."

## What you must not do

- Write a list of test types we'll do. (That's sub-step 3.)
- State coverage targets or bug-rate goals. Those are proxies — stand-ins for quality, not quality itself (FRAMINGS.md #8).
- Frame the strategy as serving the build process. The strategy serves stakeholders — the same ones the quality strategy identified — by closing the gap between what's needed and what's actually true.
- Pad. If the purpose is one sentence, leave it one sentence. Don't write three to feel substantive.

## Push back when

- The user phrases the purpose as "make sure features work." *"That's a test plan framing — it assumes you already know what 'work' means and just need to verify. The test strategy is for finding out what's actually true, including in places no one's specified yet."*
- The user wants to defer the purpose statement until after learning needs are derived. *"The purpose framing affects what counts as a learning need. Worth pinning down, even roughly, first — we can refine after sub-step 3 if needed."*
- The user proposes a coverage target as the purpose. *"Coverage is a proxy. The purpose is the thing the proxy is approximating — what are we actually trying to find out?"*
- The user resists the "no test phase" framing because their team currently operates with one. *"That's a real tension. The strategy can record how your team sequences work today while still naming the testing thinking that should happen before the test phase."* Don't ignore the tension; surface it as an `OPEN QUESTION:` if needed.

## This sub-step is DONE when

- [ ] The purpose section exists in `quality/test-strategy.md`, 4-8 lines, written in the team's voice.
- [ ] The investigation-not-checking framing is present (not necessarily verbatim, but the section reads as "find out what's true," not "verify the spec").
- [ ] The relationship to the quality strategy is stated in one sentence.
- [ ] The four-question frame is present (the section locates the test strategy as answering Q3, with Q2 checked via `/tooling-adequacy`).
- [ ] A one-line **Strategy job** is recorded (durable / pre-implementation / one-shot / thin slice).
- [ ] Anti-list is present: at minimum two items the strategy is *not*.
- [ ] Pre-read sources cited in the section's evidence field, naming actual files (not blank, not placeholder).
- [ ] User has confirmed the section reads in their voice.

If any check fails, return to the work. Do not proceed to sub-step 2.

## Output

Append to `quality/test-strategy.md`. If the file does not exist, create it with the header below.

```markdown
# Test Strategy: <project name>

*Last updated: <YYYY-MM-DD>*

*Companion to `quality/strategy.md`. Read that first if you haven't.*

## Purpose

<one to three sentences naming what this strategy is for, written in the team's voice. Investigation-not-checking framing must be present.>

**Strategy job (right now).** <one line: durable production / pre-implementation / one-shot agentic / thin slice — and what that means for how much we investigate.>

**Where this sits.** This test strategy answers *"is what we have actually good?"* (Q3 of the four quality questions); the quality strategy answered *"what does good look like?"* (Q1). Before any finding is trusted, Q2 — *"how do we know?"* — is checked via `/tooling-adequacy` (sub-step 3.5).

**This strategy is not:**
- A test plan (a list of cases to run).
- A coverage target.
- The quality strategy itself — it operationalises that strategy.

**Relationship to the quality strategy.** <one sentence>

**Sources consulted from pre-read:** <bullet list of files referenced — `quality/strategy.md`, `quality/test-pre-read.md`>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list of `OPEN QUESTION:` items, or "none">
```

Once written, summarise the purpose back in 2-3 lines and ask: *"Ready to move to sub-step 2 (Principles)?"*
