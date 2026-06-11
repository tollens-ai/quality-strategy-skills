# Sub-step 6.2 — Actual levels

## Goal

For each H/M dimension, capture where the project is *now* — qualitatively, in dimension-specific terms — and how confident that assessment is. Where the actual level isn't known, mark it explicitly as **Unknown**.

Unknowns are not a failure. For first-pass strategies on real projects, **most actuals start as Unknown**, and resolving them is what most of Step 7's plan of work will be about. The work that resolves Unknowns — asking specific questions, targeted review, targeted testing, building new test tools or testability — is the highest-priority work in early-stage strategies.

## What you need from the previous sub-step

Read sub-step 6.1's required levels from `quality/strategy.md`. Read the **Code structure** and **Design observations** sections of `quality/pre-read.md` — subagent C may have surfaced design hypotheses about specific dimensions ("error handling looks inconsistent → reliability is likely Low or Unknown").

## What to cover

By the end of this sub-step the strategy doc must capture, **for each H/M dimension**:

1. **Actual level** — one of:
   - A qualitative, dimension-specific description of where the project is now (when there's evidence to support it), OR
   - **Unknown** — explicitly noted, when the dimension hasn't been investigated enough to support a description.
2. **Confidence in the actual level** — H/M/L (or "—" for Unknown).
   - High = thoroughly checked, evidenced.
   - Medium = informed inspection, not verified.
   - Low = guessing or working from stale information.
   - For Unknown, confidence is implicitly "we don't know" — represent as "—" rather than claiming a confidence level.
3. **Evidence basis** — what is the actual based on? Pre-read observations? A specific test? Stakeholder feedback? Or nothing — "no investigation yet" is a valid (and very common) answer in first-pass strategies.
4. **What would resolve an Unknown** — for each Unknown, a one-line note on the type of activity that would establish a level. Pick from: targeted testing, asking specific stakeholders, code/design review of specific area, building observability/instrumentation, building test infrastructure or testability. Whichever is appropriate. This note seeds Step 7's plan of work.

## Q2 — interrogate the oracles (invoke `/oracle-adequacy`)

This sub-step is where the strategy answers **Q3 — "is what we have good?"** It can only answer that honestly if **Q2 — "how do we know?"** holds. Every actual you record rests on an oracle — something that judges whether what you observed really means the dimension is at the claimed level. If the oracle is weak, the actual is built on sand.

After you have a first pass of proposed actuals (or Unknowns) for the H/M dimensions, **invoke `/oracle-adequacy`** on them. For each dimension it checks whether the *instrument* (the way you observe the state) and the *oracle* (the way you judge the level) are good enough, and returns a verdict:

- **Trustworthy** — keep the actual and its confidence.
- **Over-confident** — a non-Unknown actual whose oracle is Inadequate/Missing. Downgrade its confidence (often to Unknown) unless you build the oracle. This catches the "comfortable Medium with no real basis" failure.
- **Gated** — the actual is Unknown and resolving it is blocked on an oracle that doesn't exist yet. `/oracle-adequacy` names the **oracle-build item** (state a property, write a simulated/reference oracle, define the SLO + measurement). Record that item against the dimension; it seeds Step 7's plan of work, and 6.3 marks the dimension as gated rather than papering over it.

Fold the verdicts back into the actuals below. The dispatch writes its scratch file at `quality/.scratch/6.2-oracle-adequacy.md` (see SKILL.md → "Sealed-context dispatch and scratch files"). Don't let "no oracle" quietly become a permanent Unknown with nothing to do. With agents doing the work, an oracle is usually cheap to build — and naming that build is often the most valuable thing this strategy produces.

## The second design touch — targeted deep-dive where the evidence is thin

The pre-read's design observations were deliberately a light first touch: at pre-read time nobody knew what to look for. Now you do. After the first pass of proposed actuals (and the oracle verdicts above), look at where the scoring is running on thin evidence — dimensions sitting at Unknown, Low confidence, or Over-confident whose subject is design-shaped (architecture, error handling, data flow, coupling, testability) rather than purely behavioural. **Dispatch a targeted design review on exactly those areas — not a general review of the codebase.**

Use the `Agent` tool with `subagent_type: general-purpose`. The brief, in outline: ground in `$PLUGIN_ROOT/PHILOSOPHY.md` first (the house pattern for every dispatch); name the specific areas and the specific dimensions whose actuals need evidence; have it read the relevant code and design for those areas only; require every finding to come back as **evidence with a confidence marking** (what was examined, what it shows about the named dimension, High/Medium/Low) — never a bare opinion; and **save its findings verbatim to `quality/.scratch/6.2-design-deep-dive.md`** before returning (the sealed-dispatch scratch file `/quality-strategy-review` audits — see SKILL.md → "Sealed-context dispatch and scratch files"). Include the **standing lens** in every dispatch: **test-coverage-vs-risk skew** — where the tests cluster versus where this risk map says the danger is; well-tested low-risk corners beside untested dealbreakers is exactly the finding this touch exists to surface.

Fold the findings back into the actuals as evidence: an Unknown may become a described actual at Medium confidence; an Over-confident actual may gain the basis it lacked, or lose its rating honestly. Findings are inputs to the actuals — the user confirms anything surprising before it lands. Skip the dispatch only when no thin-evidence dimension is design-shaped, and say so explicitly — the recorded skip note is what the review audit accepts in place of the scratch file.

## How to ask

For each H/M dimension, ask in turn:

- *"For [dimension], where is the project actually now? Describe it in dimension-specific terms — OR mark it Unknown if we haven't actually checked."*
- *"What's that based on? Evidence from a specific test or review? Estimate? Or genuinely don't know?"*
- *"If Unknown — what would tell us? Test what specifically, ask whom, review what?"*

Use the pre-read's design observations as starting hypothesis. *"Subagent C observed [observation], which suggests [dimension] is around [level]. Is that close, or do we have better information — or is it actually Unknown?"*

You have explicit permission and encouragement to:

- **Default to Unknown when there isn't evidence.** Strategies that pretend confidence about untested actuals are worse than strategies that admit uncertainty. Unknown is honest; Medium-without-evidence is a lie that hides work.
- **Note Unknowns as a feature, not a bug.** First-pass strategies often have a majority of Unknowns. That's normal. The strategy then drives investigation, and the next pass has fewer.
- **Push back gently** when the user claims an actual without evidence. *"How do we know that? What did we check?"*
- **Use design observations carefully** — subagent C's hypotheses are starting positions, not evidence. A design observation suggesting "diagnosability is likely weak" is a starting hypothesis the user can confirm, refine, or override; it's not a thoroughly-checked actual.

What you must not do:

- Conflate Unknown with Low. They are different findings and produce different Step 7 actions (testing/review work vs fixing work).
- Claim High confidence in an actual without specific evidence. *"What's the High confidence based on?"*
- Skip the "what would resolve this" note for Unknowns. That note is the seed of Step 7's testing and stakeholder work.
- Use percentages.

## Push back when

- An actual is stated with no evidence basis. *"What's that based on?"*
- High confidence is claimed without investigation. *"That's High based on what specifically?"*
- Unknown is dismissed too quickly ("we kind of know, it's probably Medium"). *"If we haven't actually checked, the honest answer is Unknown. Pretending otherwise hides the work to do."*
- The "what would resolve this" note is missing for any Unknown. *"How would we find out — test, ask, review, instrument?"*

## This sub-step is DONE when

- [ ] Every H/M dimension has either a qualitative actual level or an explicit "Unknown."
- [ ] Every actual has a confidence rating (H/M/L, or "—" for Unknown) and an evidence basis (or "no investigation yet").
- [ ] Every Unknown has a one-line note on what would resolve it (test / ask / review / instrument / build infrastructure).
- [ ] `/oracle-adequacy` has been invoked on the proposed actuals; each dimension has a verdict (Trustworthy / Over-confident / Gated), Over-confident actuals have had their confidence downgraded or an oracle-build item named, and Gated dimensions carry their oracle-build item. Its scratch file exists at `quality/.scratch/6.2-oracle-adequacy.md`.
- [ ] Thin-evidence, design-shaped dimensions got the targeted design deep-dive (or its explicit skip note): findings recorded as evidence with confidence markings, the test-coverage-vs-risk-skew lens applied, and the scratch file at `quality/.scratch/6.2-design-deep-dive.md` (or the skip note) in place.
- [ ] Confidence ratings use only H/M/L — no percentages.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 6.3.

## Output

Append to `quality/strategy.md` under Part 6:

```markdown
### Actual levels (first release)

#### <Dimension name>

- **Actual:** <qualitative dimension-specific description, OR "Unknown">
- **Confidence in actual:** <H/M/L, or "—" for Unknown>
- **Evidence:** <what this is based on, or "no investigation yet">
- **Oracle verdict:** <Trustworthy / Over-confident / Gated, from /oracle-adequacy>
- **To resolve (if Unknown / Gated):** <one line — test what / ask whom / review what / instrument; or the oracle-build item: state which property, write which reference oracle, define which SLO + measurement>

#### <Next dimension>

- **Actual:** <…>
- **Confidence in actual:** <…>
- **Evidence:** <…>
- **Oracle verdict:** <…>
- **To resolve (if Unknown / Gated):** <…>

… (repeat per H/M dimension)

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

**A first-pass strategy will often have a majority of Unknowns.** That is normal and correct — they are the highest-priority items for Step 7's plan of work, and resolving them is what the next iteration of the strategy will be built on.

Once written, summarise back in 3–5 lines (highlighting the count of Unknowns and the most striking known gaps) and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 6.3 (Gap and confidence)?"*
