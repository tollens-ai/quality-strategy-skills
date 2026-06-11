# Sub-step 4 — Allocation

## Goal

Decide who does what. Produce an allocation table that maps each learning need (and major method within it) to a responsible party — human, agent, or both — with a confidence column and explicit "unknown — try and see" tags where the team genuinely doesn't know yet.

This sub-step works differently from the others. In most of the skill, the agent helps the user think. Here, the agent is a **co-author with real input to give** — see OPEN-QUESTIONS.md ("Allocation as hypothesis, not confident table"). The agent knows its own cost structure, what it expects to do well, and where it expects to fail. The user has evidence, prior pain, and judgment about trust and smell. Both perspectives are needed.

## What you need from the previous sub-steps

- The Learning Needs list with its calibration items.
- The principles, especially principle 6 (automate repeatable, humanise judgmental).
- FRAMINGS.md #6 (economics shift), #7 (agent output review), #9 (smells), #11 (exploratory testing and testing in production).

## The two-voice exchange

This is the central pattern of the sub-step. Run it explicitly, in three turns.

### Turn 1: Agent proposes with reasoning

For each learning need (and major sub-method), the agent draft-proposes an allocation. The proposal must include reasoning, not just a column entry.

Format the proposal as:

> *"For [learning need]:*
> - *I'd propose [agent / human / both / unknown] for [methods].*
> - *Reasoning: [why — capability claim, cost estimate, where I expect to fail]*
> - *My confidence: [high / medium / low]"*

Examples of good proposal reasoning:

- *"Agent for install testing across OSes. I can run scripted installs in containers and record outcomes; the failure modes I expect are dependency mismatches and path issues, both of which I can detect. Confidence: high — this is repeatable mechanical work."*
- *"Human for first-run trust evaluation. I can't tell you whether something feels trustworthy — I'd produce plausible-sounding output that misses the point. This needs a human's gut reaction. Confidence: high in the recommendation, n/a on capability."*
- *"Unknown for signal-quality evaluation on unfamiliar code. Whether I can reliably evaluate plausibility without ground truth depends on the codebase. Worth trying once on a known-easy case to calibrate. Confidence: low."*

The agent must **be honest about its own limits**. See FRAMINGS.md #7 — "agents make consistent, plausible-looking mistakes." If a learning need requires catching subtle wrongness in agent output, an agent reviewing agent output is the wrong allocation.

### Turn 2: User pushes back

Surface the proposal to the user and ask:

> *"That's my draft. Where am I wrong? Where do you have evidence I don't — prior incidents, things you've tried, things that looked easy on paper and failed in practice? Where do you want a human in the loop for non-economic reasons — trust, smell, things you want eyes on regardless of cost?"*

Listen for:

- **Prior pain.** *"We tried agent install testing last year, the false-positive rate was 30%."* The agent's confidence drops; the row gets a calibration item or moves to human.
- **Trust constraints.** *"I want a human reviewing anything that touches user data, even if you say you can do it."* Honour without arguing — non-economic reasons are valid.
- **Smell territory.** *"I need to feel this myself, even if you produce a perfect report."* See FRAMINGS.md #9. If the user wants smell-presence, the row goes to human even if the agent says it could do the work.
- **Capability evidence.** *"You're underselling — we've had agents do this exact thing on three other projects."* The agent's confidence goes up; the row stays agent.

### Turn 3: Reconcile

For each row, write down:

- Final allocation (human / agent / both).
- Confidence: high / medium / low / **unknown — try and see**.
- One-line note explaining the allocation reasoning, especially where confidence is medium or below.

Items tagged "unknown — try and see" become calibration triggers — rows we expect to re-rate once the first cycle gives real data. They appear in sub-step 5's update protocol.

## Apply the framings

While running the exchange:

**FRAMINGS.md #6 — economics shift.** The reflex split is "agents do mechanical, humans do interesting." Push: in the new economics, agents do *exhaustive* (every variant, every input, every code path) and humans do *creative* (what's worth investigating, what failures mean). Don't waste human attention on what agents can check exhaustively.

**FRAMINGS.md #7 — agent output review.** When allocating to agents, name the review pattern. A human reviewing agent output can't be looking for typos and inconsistencies (agents don't make those) — they have to look for plausible-sounding-but-wrong. Add a "review by" column or note where this matters.

**FRAMINGS.md #9 — smells.** Ask explicitly: *"Where does the team need to feel the product, not just check it?"* Those rows go to human regardless of what the agent claims it can do.

**FRAMINGS.md #11 — the two named method classes.** Rows whose method is **exploratory testing** are allocated to an **exploratory tester** — a human by default; an AI exploratory tester is *unproven — calibrate before trusting*, so any agent allocation here is at most `unknown — try and see` with a human-baseline calibration item attached, never high confidence. Rows whose method is **testing in production** are only allocatable once the instrumentation covering the named risks and the recovery path exist (or are themselves rows); allocating "ship it and watch" without the watching is not an allocation.

## What you must not do

- Skip the two-voice exchange and let the agent fill in the table alone. The whole point of this sub-step is reconciliation between two perspectives.
- Skip the two-voice exchange and let the user fill in the table alone. The agent has real input — its honest assessment of its own capability is data the user doesn't have.
- Tag everything "unknown — try and see" to avoid commitment. The skill is honest about uncertainty, not a way to dodge it. If a row is genuinely unknown, tag it; if not, commit.
- Ignore non-economic reasons. *"I want a human looking at this for trust reasons"* is a valid allocation reason. Don't argue; record it.
- Allocate before the learning need is well-formed. If a learning need's question or methods are vague, allocation is meaningless. Push back to sub-step 3 if needed.
- Firmly allocate a learning need the tooling check marked **blocked**. You can't honestly assign an investigation whose instrument or oracle doesn't exist yet — give it a `blocked — allocation deferred` row (or at most a provisional allocation at low confidence, with a note that it depends on the build landing). And don't allocate the *build items themselves* here: who builds a missing instrument or oracle is `/tooling-strategy`'s call — its build plan names a builder for each item.

## Push back when

- The user defers all decisions to the agent ("you decide"). *"I have a perspective but I don't have your evidence about prior pain or trust constraints. The exchange is the point — without your input the allocation is half-blind."* If the user has truly no view, surface it: *"that itself is a calibration finding — we don't have evidence about what's been tried. Tag and revisit."*
- The agent over-claims capability. (You should catch yourself doing this.) When you find yourself proposing "agent" with high confidence on a judgment-heavy item, downgrade to medium and add a calibration trigger. See FRAMINGS.md #7 — your blind spot is producing plausible-looking allocation that misses the point.
- The user wants to allocate everything to agents because of cost. *"Cost is real but isn't the only frame. Smell-presence (FRAMINGS.md #9), trust, and review pattern (FRAMINGS.md #7) all constrain allocation. Let's make sure those are covered."*
- The user wants to allocate everything to humans because of trust. *"Some things agents can do exhaustively that humans would sample — and missing exhaustively is its own failure mode. Where would you accept agent work if review was tight?"*
- A row has no review pattern named when allocated to an agent. *"If [agent] does this, who reviews the output and what are they looking for? Agent output has different failure modes than human output."*

## This sub-step is DONE when

- [ ] Every learning need (and major sub-method) has an allocation row — blocked-on-tooling needs as `blocked — allocation deferred` (or provisional low-confidence), never a firm allocation.
- [ ] Every row has: allocation, confidence, one-line reasoning.
- [ ] The two-voice exchange has been run for every row — i.e. agent proposed and user pushed back, both perspectives are reflected. (This may be quick on rows where both agree immediately; the requirement is that both have spoken.)
- [ ] At least one row has a confidence below high. If all rows are high-confidence on first pass, push back: that's likely over-confidence given nobody has calibrated intuition for the new economics yet.
- [ ] Items tagged "unknown — try and see" are explicitly listed as calibration triggers for sub-step 5's update protocol.
- [ ] Agent-allocated rows have a named review pattern (who reviews, what they're looking for).
- [ ] Smell-presence question (FRAMINGS.md #9) was asked at least once.
- [ ] Exploratory-testing rows are allocated to an exploratory tester (human by default; any agent allocation is `unknown — try and see` with a human-baseline calibration item), and testing-in-production rows have their instrumentation and recovery path named or rowed (FRAMINGS.md #11).
- [ ] Pre-read sources cited.

If any check fails, return to the exchange. Do not proceed to sub-step 5.

## Output

Append to `quality/test-strategy.md`:

```markdown
## Allocation

This is a hypothesis. Nobody — agents or humans — has fully calibrated intuition for the new cost economics, so first-pass allocation will have low-confidence rows that need real-world data to refine. The update protocol (next section) re-rates allocation after each test cycle.

| Learning need / method | Allocation | Confidence | Review by | Reasoning |
|---|---|---|---|---|
| <learning need> — <method> | human / agent / both | high / medium / low / **unknown** | (if agent: who reviews and for what) | <one-line> |
| ... | ... | ... | ... | ... |

### Calibration triggers

Rows tagged "unknown — try and see" or "low" confidence — these are expected to be re-rated after the first cycle. The first cycle's data on these rows is itself a learning output of the test strategy.

- <row reference> — <what we'd expect to learn that would resolve the confidence>
- ...

### Smell-presence rows

These are rows where humans need to feel the product, not just check it. Agent allocation here would lose the smell layer.

- <row reference> — <what the human is feeling for>
- ...

**Sources consulted from pre-read:** <files>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Summarise back: total rows, count by confidence, count of calibration triggers, count of smell-presence rows. Then: *"Last sub-step is closing — what we're not testing, plus the update protocol that triggers allocation re-rating. Ready?"*
