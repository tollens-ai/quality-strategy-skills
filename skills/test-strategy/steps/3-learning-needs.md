# Sub-step 3 — Learning needs

## Goal

Produce the heart of the test strategy: an impact-ordered list of information needs, each phrased as a question, each grounded in the risk map. By the end of this sub-step the strategy doc has a Learning Needs section organised into impact tiers, where every entry has the same structure: question + methods + exit criterion + reference back to the risk map.

This is the longest sub-step. It is also the one where /test-strategy adds the most value — taking the risk map and transforming it into investigation-shaped work.

## What you need from the previous sub-steps

- The risk map summary in `quality/test-pre-read.md`.
- The principles in `quality/test-strategy.md`. Principles 2 (highest-impact-first) and 3 (cheapest-resolution-first-within-tier) drive the tiering and ordering.
- The plan-of-work testing items from the strategy's Part 7 (when Part 7 was sketched; if it's a recorded deferral, this input is simply empty — the risk map carries the load).

## What to cover

The Learning Needs section must contain:

1. **Impact tiers.** How many tiers depends on the project — see OPEN-QUESTIONS.md ("Tier count not prescribed; pattern is"). The pattern is: tiers are ordered by impact (Tier 1 = if-this-fails-nothing-else-matters), and items within a tier are ordered by cheapest-to-resolve. Most projects converge to 3-4 tiers; let it fall out.

2. **Per-item structure** — each learning-need entry must have:
   - **Question** — what we're trying to find out, phrased as a question. *"Can anyone install and run this?"* not *"installation testing."*
   - **Methods** — what we'd do to answer it. Bulleted, concrete. Can include human and agent methods.
   - **Exit criterion** — when we've learned enough. Not "it works perfectly" — typically "we know roughly how well it works and can decide what to do next."
   - **Risk-map reference** — which row(s) in `quality/strategy.md` Part 6 this addresses.
   - **Risk type tag** — known risk (we know quality is below where we want; this learning need is about *how* to fix or *whether* a fix worked) or unknown risk (we don't know the state; this learning need is about discovering it). See FRAMINGS.md #10. Most learning needs in a test strategy are unknown-risk; known-risk items often belong in the quality strategy's plan of work as fixes, not here.

3. **Calibration items** where relevant. If allocation depends on knowing what's cheap vs expensive on this project ("can agents reliably install this on different OSes?"), that's itself a learning need. Tag it as a calibration item — it informs sub-step 4. See OPEN-QUESTIONS.md ("Calibration as first-class output").

## How to derive

Two passes, both single-pass (no subagent — see OPEN-QUESTIONS.md "Single-pass vs subagent for learning-needs derivation"; the derivation is a transformation, not exploration).

**Pass 1: One-to-one from the risk map.**

For each H or M dimension in the risk map:

- If `actual` is `?` or low-confidence, that's an unknown-risk learning need. Frame the question.
- If `actual` is known and the gap is named, ask: is closing this gap a testing problem, a fixing problem, or both? If testing (e.g. "we need to know whether the fix actually closed the gap"), it belongs here. If pure fixing, it belongs in the plan of work, not the test strategy.
- If `required` is itself low-confidence, that's a stakeholder problem and lives in the quality strategy, not here. Note it but don't add as a learning need.

For each Dealbreaker entry in stakeholder three-lens analysis (Part 3): ensure there's a learning need that addresses *whether the dealbreaker condition is being avoided*. Often these become Tier-1 items.

**Pass 2: Apply principles 5 and 6 — investigation vs checking, human vs agent capability.**

For each candidate learning need:

- Is this *checking* (verify a known expected behaviour) or *investigating* (find out what's actually happening)? If checking, it's a smaller part — phrase the question accordingly: *"do these specific behaviours match spec?"* — but ensure the strategy isn't dominated by them. See FRAMINGS.md #1. If checking dominates, push back: investigation should be the larger share.
- Does the question include human-judgment dimensions (smell, trust, "does it feel right")? Mark those — they constrain allocation in sub-step 4. See FRAMINGS.md #9.
- Does this include something we'd previously have said "not worth testing"? See FRAMINGS.md #5. Surface explicitly: *"Under human costs, would you have skipped this? Is it cheaper now with agents?"* If yes, it stays in.

## Tiering

After candidate learning needs are listed:

1. Sort by impact. Tier 1 = existential. Tier 2 = dealbreakers (would kill the release if hit). Tier 3 = quality-of-experience (affects retention but not survival). Tier 4 (where applicable) = team confidence — things about the team's ability to iterate, not the product itself.

2. Within each tier, order by cheapest resolution. The 10-minute test goes before the day-long test, even if both are in Tier 1 — a Tier-1 failure cuts off lower-tier work, so resolving the cheap Tier-1 unknowns first is highest expected value per hour.

3. The tier count is the user's call. If only Tiers 1 and 2 emerge, that's fine. If five tiers fall out naturally, that's fine too. Default to 3-4.

## How to ask

Walk the user through the derivation, not the result. For each H/M dimension, surface the candidate learning need and ask:

> *"From [dimension] — required [level], actual [confidence]. The unknown here is whether [paraphrased question]. Methods I'd propose: [bulleted]. Exit criterion: [draft]. Tier: [draft, with reason]. Sound right? Anything missing?"*

The user will often see things you don't — *"actually we already know X from a Slack thread three weeks ago"* (so confidence on actual is higher than the strategy says, learning need is lower priority than drafted) or *"we'd want to specifically rule out Y"* (so methods need to be more specific).

After the per-dimension walk, present the consolidated tier list and ask:

> *"Here's the full list, tiered. Look at the impact ordering — Tier 1 first. Anything that should move up or down? Anything missing?"*

This is the place to apply principle 5 (don't import old-world costs) explicitly. Ask: *"Looking at this list, is there anything you'd previously have said wasn't worth testing because it'd take too long? Worth checking if agents make it cheap now."*

## What you must not do

- Skip the per-item structure. A tier-list of vague entries is a test plan, not a test strategy.
- Phrase items as test cases. *"Run install on Ubuntu 22.04"* is a method, not a learning need. The learning need is *"Can the install work across the OSes our users have?"*
- Include known-risk items as if they were learning needs. If the gap is "we know X is broken, we need to fix it," that's not a learning need — it's a fix. Surface the conflation if you spot it.
- Inflate the list. If only six learning needs fall out of a small project, six is right. Don't pad to look thorough.
- Allow Tier 1 to be empty. If no unknowns are existential, either the risk map is wrong (push back to /quality-strategy) or the project genuinely has no existential unknowns at this stage (rare — surface as `OPEN QUESTION:` for sanity).

## Push back when

- The user proposes a learning need with no exit criterion. *"What would tell us we've learned enough? Without that, we don't know when to stop."*
- The user wants to merge investigation and fixing into the same item. *"Those are different costs and different decisions. Let's split: the learning need is whether the gap exists; the fix goes in the plan of work."*
- The user defers tiering. *"Tiering is the principle 2 + 3 application — without it, we don't know what to do first. Even rough is better than none — we can re-rate."*
- The user has all-Tier-1 entries. *"Everything-is-critical means nothing is. What would you cut if you only had time for half?"*
- The user wants to drop calibration items because they "feel like meta-work." *"Calibration is what stops the strategy being wrong forever. The cost of doing it once is small; the cost of skipping it is repeated mis-allocation."*

## This sub-step is DONE when

- [ ] Every H/M dimension in the risk map is represented by at least one learning need or has a stated reason for not being addressed.
- [ ] Every Dealbreaker entry in the three-lens analysis is addressed by a Tier-1 or Tier-2 learning need.
- [ ] Every learning need has all five fields: question, methods, exit criterion, risk-map reference, risk-type tag.
- [ ] Items within each tier are ordered by cheapest-resolution-first.
- [ ] At least one calibration item is included if the project has unknowns about human-vs-agent costs (most do; if not, the user has explicitly said why not).
- [ ] Old-world-costs check has been done (FRAMINGS.md #5) — user was prompted at least once on whether previously-skipped items are now cheap.
- [ ] Pre-read sources cited.

If any check fails, return to the work. Do not proceed to sub-step 4.

## Output

Append to `quality/test-strategy.md`:

```markdown
## Learning needs (impact-tiered)

Each item is an information need — a question we want to answer — not a test case. Items within a tier are ordered by cheapest resolution first.

### Tier 1 — <name, e.g. "Existential">

**<Question>?**
- *Why this matters:* <one line, refers to risk-map row(s)>
- *Risk type:* <unknown / known / mixed>
- *Methods:*
  - <method, with human/agent indicator>
  - ...
- *Exit criterion:* <when we've learned enough>
- *Risk-map reference:* <Part 6 row(s)>

**<next question>?**
- ...

### Tier 2 — <name>

...

### Tier 3 — <name>

...

### Calibration items (if any)

Items here address what we need to learn about our own cost structure to allocate confidently. Allocation in sub-step 4 will treat the relevant rows as low-confidence until these resolve.

- **<calibration question>?** — methods, exit criterion, what allocation rows depend on the answer.

**Sources consulted from pre-read:** <files>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Summarise back: tier count, total item count, calibration count.

Then, before allocation, run the **tooling & oracle adequacy** check: invoke `/tooling-adequacy` on this learning-needs list. For each learning need it asks whether you have an adequate *instrument* (to exercise and observe it) and an adequate *oracle* (to judge whether the result is correct) — and where either is missing it names a build item, including simulated/reference oracles worth constructing rather than declaring something untestable. Its build items feed sub-step 5's gating. Don't skip this: a learning need whose answer you couldn't actually judge isn't a learning need yet.

**The check's result is a fork in the road.** A handful of blocked items among answerable tiers is the normal case: carry them forward, allocate around them, and sub-step 5's blocked-on-tooling section records them (with `/tooling-strategy` as the onward pointer). But if the build items **dominate the top tier** — the highest-impact learning needs are mostly unanswerable — surface a real choice before allocation: *"Most of what matters most can't be answered with what exists today. We can finish this strategy with those needs marked blocked and allocate around them, or pause here and run `/tooling-strategy` to plan the builds first — then finish allocation knowing what's coming and when. Which?"* Pausing is not a failure of the test strategy; it's the Q2-before-Q3 principle applied honestly.

Then (when continuing): *"Tooling and oracle check done. Allocation comes next — the two-voice exchange about who does what. Ready, or want a break first? Note: 3 → 4 is tighter coupled, so if you break here, plan to re-orient from this list on resume."*
