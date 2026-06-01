# Sub-step 5 — Closing

## Goal

Close the test strategy with two sections:

1. **What we're not testing** — explicit non-targets for testing effort, drawn from the quality strategy's non-goals plus anything surfaced during sub-steps 3 and 4.
2. **Update protocol** — when and how the strategy gets refreshed. Includes risk-map updates (after each tier of testing), allocation re-rating (after each cycle), and full-revision triggers.

After this sub-step, the test strategy is complete. Run a substantive checkpoint on the whole produced doc before declaring done.

## What you need from the previous sub-steps

- Non-goals from `quality/strategy.md` Part 4 (already in `quality/test-pre-read.md`).
- Calibration triggers from sub-step 4's allocation table.
- Anything surfaced during sub-step 3 as "we're not investigating X because [reason]."

## What to cover

### What we're not testing

This section makes the testing scope explicit by saying what's *out*. Three sources of non-targets:

1. **Inherited from quality strategy non-goals.** If the strategy says feature X is a non-goal for this release, we don't test feature X. Pull these in verbatim with a back-reference to Part 4.

2. **Dimensions rated None or Low.** Quality dimensions the strategy decided don't matter at this level — we don't invest test effort here either. Reference the dimension rating, not just the dimension name.

3. **Surfaced during learning-needs derivation.** Things that came up in sub-step 3 as "we considered investigating this but it's not in scope because..." Capture explicitly so it's recorded for future reviewers.

Each non-target needs a one-line reason. *"We're not testing scalability"* is incomplete; *"We're not testing scalability — strategy Part 5 rates it None for this release; revisit at GA"* is right.

### Blocked on tooling & oracles

The `/tooling-adequacy` check (run after sub-step 3) may have found learning needs whose *instrument* or *oracle* isn't adequate yet — a harness to build, a reference/simulated oracle to write, a property set to define. **Don't paper over these.** List each blocked learning need with the build item it's waiting on, and state plainly that the strategy can't say what to test there until that lands:

> *"The 'does sync survive flaky connectivity' investigation is **blocked** on building network-fault injection. We can't tell you what to test there until it exists. Rerun this strategy after it lands."*

This is honesty about the strategy's own limits, not a refusal — the blocked area stays visible in the doc rather than being silently dropped or filled with investigation the tooling and oracles can't actually support. Distinguish it from *"what we're not testing"*: a non-target is a deliberate choice not to look; a blocked area is something we *do* want to know but can't yet. If `/tooling-adequacy` returned no build items, say so — every learning need has an adequate instrument and oracle.

### Update protocol

The update protocol is what stops the test strategy becoming frozen. Three triggers:

1. **After each tier of testing.** Update the risk map references — if Tier-1 testing resolved an unknown to a known, that changes the strategy's Part 6. Note that this update belongs in `quality/strategy.md` Part 6, not here; the test strategy is the trigger, the risk map is the source of truth.

2. **After each cycle of testing (one full pass through the tiers).** Re-rate allocation. Items tagged "unknown — try and see" should now have data. Items where confidence was low should be reassessed. Items that were high-confidence but turned out to be wrong move toward "unknown — re-calibrate." See FRAMINGS.md #6 and OPEN-QUESTIONS.md ("Calibration as first-class output").

3. **At release boundaries.** Full revision via `/test-strategy` with revision mode (d) — archive current, produce fresh for the new release.

The protocol section should be specific about *who* runs each update. If the team has a cadence (e.g. weekly review), name it. If not, the protocol becomes "after each Tier-N testing block, [responsible party] runs the update."

## Apply the framings

**FRAMINGS.md #8 — proxies are not quality.** The closing section is the place to add a guard: *do not write proxy targets as goals.* If the team is tempted to add "achieve 80% coverage" or "fewer than 5 bugs in production" as goals, that's a proxy creep — surface it. Coverage is a proxy for thoroughness; thoroughness is a proxy for quality; the proxy of a proxy is not a goal.

If the strategy doesn't currently include any proxy goals, no need to add the guard prophylactically. If proxies have been creeping in throughout the doc, this is the spot to call it out.

## Run the substantive checkpoint at the end

Once the closing section is written, run the substantive checkpoint on the **whole produced test strategy**. This is the only substantive checkpoint in the skill — sub-step boundaries got light wrap-ups.

The pattern (mirrored from /quality-strategy SKILL.md):

1. Summarise the whole strategy back in 6-10 lines, hitting consequential decisions across all five sections (purpose, principles, learning needs by tier, allocation by confidence distribution, what's-not-tested + update protocol).

2. Run the checkpoint:

   > *"Take a real moment to read this back. Is anything off — even if you can't articulate why? Does the doc actually operationalise the quality strategy, or has it drifted into a test plan? Does the allocation feel honest about what we don't know? Anything in the learning needs that, in light of the allocation we worked out, you now think is mis-tiered? Even vague unease is worth surfacing. Catching it now is cheap."*

3. **Wait for the user's response.** Treat any of the following as signals to dig in, *not* as confirmation:
   - "I think so."
   - "Looks fine I guess."
   - Silence.
   - "Yeah, sure."
   - Any hesitation.

4. **If the user surfaces something**, treat it as a finding:
   - **Drift toward test plan.** Re-read the produced doc. If sub-step 3's learning needs read as test cases, re-do that section. See FRAMINGS.md #1.
   - **Allocation over-confidence.** Re-run the two-voice exchange in sub-step 4 with explicit prompting on calibration items. See OPEN-QUESTIONS.md ("Allocation as hypothesis").
   - **Mis-tiered learning needs.** Often surfaces here because the allocation showed an item is much cheaper or much more expensive than tier 3 implied. Re-rank.
   - **Proxy creep.** Remove proxy goals; restate the actual quality concern they were standing in for.
   - **Vague unease.** Investigate together. Either it resolves or it gets recorded as `OPEN QUESTION:` with explicit acknowledgement that we're shipping the strategy with that risk visible.

5. **Only declare complete after explicit, considered confirmation** — not silence, not "yes" with hesitation.

## What you must not do

- Skip the substantive checkpoint because the user seems satisfied. The whole point is to catch drift before the doc gets used.
- Add proxy goals as a "metrics" section. Proxies have a place in the doc as signals during testing, not as targets.
- Make the update protocol generic ("review periodically"). It needs concrete triggers: after Tier 1, after first cycle, at release boundary. Vague update protocols don't get followed.
- Treat completion as the end. The strategy is the start of the testing work; the update protocol is the loop that keeps it honest.

## Push back when

- The user wants to merge "what we're not testing" into the quality strategy's non-goals section. *"There's overlap, but the test strategy's not-testing list is broader — it includes dimensions rated Low and items surfaced during learning-needs derivation. Worth keeping here even if it cross-references Part 4."*
- The user wants to drop the update protocol because "we'll just update it as needed." *"In practice, ad-hoc updates don't happen — the strategy goes stale. The protocol's job is to name specific triggers. Even rough is better than absent."*
- The user wants to add a coverage target. *"That's a proxy. What quality concern is the coverage standing in for? Let's name that directly."* See FRAMINGS.md #8.
- The user accepts the substantive checkpoint with "looks good." Run the smell-detection follow-up: *"What's making it 'looks good' rather than 'yes'? Even a vague feeling is worth a minute."*
- The user surfaces a real concern but wants to ship anyway. Honour the choice but make the unease visible in the doc as `OPEN QUESTION:` — not silently dropped.

## This sub-step is DONE when

- [ ] "What we're not testing" section exists with explicit reasons for each non-target.
- [ ] Blocked-on-tooling section reflects `/tooling-adequacy`'s build items (each blocked learning need named with its build item), or states none.
- [ ] Update protocol section exists with three named triggers (after-tier, after-cycle, at-release).
- [ ] Calibration triggers from sub-step 4 are referenced in the after-cycle update.
- [ ] Proxy guard applied if proxy creep was spotted; not added prophylactically if not.
- [ ] Substantive checkpoint has been run on the whole strategy with a 6-10 line summary back to the user.
- [ ] User has confirmed explicitly — no silence, no non-committal — or surfaced findings have been folded back into the relevant sub-step.
- [ ] All `OPEN QUESTION:` items across all sub-steps are listed at the end of the strategy.
- [ ] `/test-strategy-review` has been invoked and passed (no unresolved blockers; flags reviewed).
- [ ] Pre-read sources cited.

If any check fails, return to the work. Don't declare the strategy complete.

## Output

Append to `quality/test-strategy.md`:

```markdown
## What we're not testing

Testing effort is finite. These are explicit non-targets so they don't quietly creep in.

- **<non-target>** — <one-line reason, with reference to strategy Part 4 / Part 5 / sub-step that surfaced it>
- ...

## Blocked on tooling & oracles

These learning needs can't be answered yet — the instrument or oracle they need (per `/tooling-adequacy`) must be built first. Recorded here so they're not silently dropped, and distinct from non-targets above: we *do* want to know these.

- **<learning need>** — blocked on <build item>. Rerun this strategy once it lands.

(Or "None — every learning need has an adequate instrument and oracle.")

## Update protocol

The strategy is a hypothesis. It refreshes on three triggers:

**After each tier of testing.** When Tier-N investigation completes, update the risk-map references in `quality/strategy.md` Part 6 — unknowns become knowns; confidence ratings change. The strategy's Part 6 is the source of truth for risk; the test strategy points at it.

**After each cycle (full pass through tiers).** Re-rate allocation. Calibration triggers from the allocation section get resolved. Items tagged "unknown — try and see" should now have data. Items where confidence was high but turned out to be wrong move to "unknown — re-calibrate." Run via `/test-strategy` revision mode (c).

Calibration triggers to watch for first-cycle resolution:
- <list from sub-step 4>

**At release boundaries.** Full revision via `/test-strategy` revision mode (d). Archive current; produce fresh for the new release.

**Responsibility.** <named — who runs each kind of update, or pattern by which it gets triggered>

## Open questions across the strategy

<consolidated list of all OPEN QUESTION items from all sub-steps, with sub-step reference>

---

*Strategy complete. Last updated: <date>. Next scheduled review: <e.g. after Tier 1 testing>.*
```

After the section is written and the substantive checkpoint passes, **invoke `/test-strategy-review`** to run the formal audit. The substantive checkpoint above is the user's smell-pass; the review skill is the structured audit (forward simulation + mechanical oracle).

If the review surfaces blockers, return to the relevant sub-step and re-do. The strategy is not done until the review passes.

Once the review passes, declare complete:

> *"Test strategy is complete and review-passed. Doc lives at `quality/test-strategy.md`. The first thing to do is start Tier 1 — the cheapest unknown in there is [reference]. After Tier 1 completes, run me again in revision mode (c) to update allocation and risk-map references."*
