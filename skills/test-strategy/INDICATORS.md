# Indicators of a good test strategy

Judge a test strategy by what running it produces, not by what the document looks like. The right test is forward-looking: *if the team runs this strategy exactly as written, will the quality strategy end up in a better place — moved in the right direction, with the right priority, with the right efficiency?*

The five indicators below all come down to that question. `/test-strategy-review` and `/test-strategy` sub-step 5's substantive checkpoint both refer to them.

These are not properties of the document. They are predictions about what happens when the team runs it.

---

## 1. Direction — every investigation moves the strategy

Every learning need traces to closing a gap, resolving an unknown, or validating a claim in `quality/strategy.md`. Nothing investigates what the strategy says doesn't matter (None-rated dimensions, items in the non-goals). The information the strategy will produce is the right shape to feed back into Part 6 (risk map): answering the question changes a `?` to a known value, updates a confidence rating, or revises a required level.

**Failure modes:**
- Learning needs that don't trace to the risk map. Drift toward "what we thought worth testing" rather than "what the strategy says matters."
- Investigation aimed at things rated None (or deprioritised in the plan of work as "aware, not investing this release"), or at items in the non-goals.
- Learning needs whose answer wouldn't update the risk map — purely informational with no decision attached.

---

## 2. Priority — first things first

Tier 1 addresses the highest-impact unknowns (existential to the release, dealbreakers in stakeholder analysis). Within tiers, items are ordered cheap-first — if two items have similar impact, the cheaper-to-resolve goes first. Calibration items resolve before allocation gets entrenched. The strategy does not burn early effort on lower-tier work that's only meaningful once existential unknowns resolve.

**Failure modes:**
- Tier 1 missing genuine existentials. (E.g. installability is unknown but lives in Tier 3.)
- All-Tier-1: everything-critical = nothing-critical.
- Within-tier ordering ignores cost. A 10-minute test sits behind a day-long test for no reason.
- Allocation entrenched before calibration items resolve — committing high confidence on items that should be "unknown — try and see."

---

## 3. Sufficiency — the strategy actually closes what needs closing

Every H/M dimension in the risk map is addressed by ≥1 learning need. Every Dealbreaker entry in stakeholder three-lens analysis is addressed by Tier 1 or 2. Untouched parts of the risk map are explicitly named as out-of-scope for this cycle, with a reason.

**Failure modes:**
- A dimension rated H or M with no learning need addressing it.
- A Dealbreaker that the strategy implicitly assumes is fine — no investigation planned.
- Silent gaps. Things not investigated and also not named as deliberately out-of-scope.

---

## 4. Feasibility — the strategy can actually be executed

Methods are concrete enough to act on (not "test the install" but "run install on Ubuntu, macOS, with and without prior Claude Code present"). Exit criteria are reachable — they describe a state the team could plausibly reach, not perfection. Allocation is honest about capability — agents aren't assigned work they'd plausibly fail at; humans aren't assigned work they can't realistically do as often as the plan needs. If the strategy can't be run as written, it doesn't move anything.

**Failure modes:**
- Methods phrased so vaguely the team would have to re-derive them.
- Exit criteria phrased as goals, not states. "We have high confidence" is a goal; "we have install data from three environments" is a state.
- Agent assignments on judgement-heavy work. (Agent will produce plausible-looking output that misses the point.)
- Human assignments on exhaustive-checking work where agents would do better. (Wasted attention.)
- Allocation that assumes capability the team doesn't have or hasn't validated.

---

## 5. Honesty — uncertainty is preserved, not papered over

Calibration items name what allocation depends on. Confidence ratings reflect real uncertainty — not flat high (over-confidence) and not flat low (decision-avoidance). What's not being tested is concrete with reasons. First-pass strategies should not look polished; if they do, that's a smell that calibration is missing or confidence has been smoothed.

**Failure modes:**
- All-high-confidence allocation. Nobody has calibrated intuition for the new economics yet; first-pass uniformity is unrealistic.
- All-unknown allocation. Decision-avoidance — tagging everything "try and see" to dodge commitment.
- Calibration items that are vague ("we need to learn about agent costs"). They have to be specific enough that the first cycle produces an answer.
- "What we're not testing" phrased as theatrical avoidance ("we're not testing things that don't matter") rather than concrete exclusions.
- Polished first-pass strategy with no `OPEN QUESTION:` items, flat confidence, no calibration triggers.

---

# Mechanical oracle checks (backstop)

These are cheap structural checks. They are not the main review — `/test-strategy-review` runs them in parallel with the forward simulation as a backstop. A failure here usually means a sub-step's DONE checklist was ticked without actually checking.

1. **Five-field learning needs.** Every learning need has all five: question, methods, exit criterion, risk-map reference, risk-type tag (known/unknown/mixed).
2. **Risk-map coverage.** Every H/M dimension in `quality/strategy.md` Part 6 has ≥1 corresponding learning need (or the strategy explicitly notes the gap).
3. **Dealbreaker prioritisation.** Every Dealbreaker entry in Part 3 of the strategy is addressed by a Tier 1 or Tier 2 learning need.
4. **Allocation confidence variation.** Allocation table has ≥1 row with confidence below high. (All-high is a flag for over-confidence; the skill takes the view that first-pass calibration is unreliable.)
5. **Agent rows have review patterns.** Every row allocated to an agent names who reviews the output and what the review pattern looks for.
6. **No proxy goals.** No coverage targets ("achieve 80% coverage"), bug-count goals, or test-count goals appear as goals in the strategy. Proxies are signals during testing, not targets.
7. **Update protocol concrete.** Update protocol section names ≥3 trigger types (per-tier, per-cycle, per-release or equivalent) and assigns responsibility.
8. **Non-targets explicit.** "What we're not testing" section has ≥1 non-target with explicit reason (referencing strategy Part 4, Part 5, or sub-step that surfaced it).
9. **Pre-read sources cited.** Each section's evidence field names the files referenced — not blank, not placeholder.
10. **Independence preserved.** Pre-read sources do not include source code files. (Grep for `.py`, `.ts`, `.tsx`, `.go`, `.rs`, `.js` etc. in pre-read citations.)
11. **Calibration ↔ update protocol alignment.** Every calibration trigger named in sub-step 4's allocation appears in sub-step 5's update protocol as an item expected to be re-rated.
12. **Open questions consolidated.** All `OPEN QUESTION:` items across sub-steps are listed in the strategy's final section.

Each check returns **PASS / FLAG / FAIL**. FAIL on any of 1–3 is a blocker (the strategy is structurally unable to do its job). The rest are flags — judgement calls about whether to fix before declaring done.
