# Sub-step 6.2 — Actual levels

## Goal

For each H/M dimension, capture where the project is *now* — qualitatively, in dimension-specific terms — and how confident that assessment is. Where the actual level isn't known, mark it explicitly as **Unknown**.

Unknowns are not a failure. For first-pass strategies on real projects, **most actuals start as Unknown**, and resolving them is what most of Step 7's plan of work will be about. The work that resolves Unknowns — asking specific questions, targeted review, targeted testing, building new test tools or testability — is the highest-priority work in early-stage strategies.

## What you need from the previous sub-step

Four things, before you start:

- **The dimension+scope row set.** Read sub-step 6.1's required levels from `quality/strategy.md` — **the same rows, keyed by dimension + scope**: 6.1 already resolved which same-named rows are actually separate (different stakeholder/surface), so 6.2 walks that identical row set rather than re-deriving it from a bare dimension list.
- **Design hypotheses, scoped.** Read the **Code structure** and **Design observations** sections of `quality/pre-read.md` — subagent C may have surfaced design hypotheses about specific dimensions ("error handling looks inconsistent → reliability is likely Low or Unknown") — treat these as scoped to whichever surface the observation was actually about, not automatically to every row sharing that dimension's name.
- **Parked observations.** Read Part 5's **"Deficiency observations parked for actual-state review"** table too — 5.1 parked deficiency observations there precisely so this sub-step could pick them up as a starting point for the actuals it now judges; they're prompts to investigate, not pre-made verdicts.
- **Release tags and routing.** Where 2.1 negotiated a multi-release doc structure, carry forward which release each row belongs to, same as 6.1. The universal routing rule applies here too — the live symptom this fix exists to close was actual-level talk drifting onto a different release mid-conversation and getting folded into this release's actuals: if that happens, route the material to that release's home (SKILL.md → "Scope of this skill") and name it in half a line; don't record it as an actual for this release's row just because the dimension name matches.

## Actuals come from evidence, in this order — not from reading the code

The actual level is a claim about *how the system really behaves*, and the strongest evidence for that is observation, not inspection. Reading the code tells you what it was *meant* to do; it is the **weakest** actuals oracle and the one that manufactures over-confident ratings — the exact failure this hierarchy exists to stop. So work the evidence hierarchy from the top, and only fall down it when the higher rungs are genuinely empty:

1. **Existing test results, CI runs, reports.** Green CI, a coverage report, a load-test result, a prior audit — observed behaviour someone already captured. Strongest. Look here first. (Work the hierarchy across **every repo in scope, and — the same rule one level finer — every scope a dimension row actually names** — a green CI in one repo says nothing about the repo with none, and by the identical logic, evidence gathered for one scope says nothing about a different scope even when the dimension name is the same: test coverage on the Studio UI's usability doesn't speak to the MCP API's usability, and evidence for one release under a multi-release structure doesn't speak to another.)
2. **The tests themselves.** Even unrun, what the suite *asserts* tells you what's actually being checked (and the gaps tell you what isn't).
3. **Ask the user what testing and lived evidence exists.** *"What have you actually seen this do — in production, in testing, in use? What broke, what held?"* The user's lived experience of the running system is real evidence the repo doesn't contain; in a no-repo strategy it is often the *only* evidence, and it is first-class, not a fallback.
4. **Code reading — last, and always labelled inference.** When nothing above answers it, reading the code is a starting hypothesis, never an observation: record it as **inference, not evidence**, and it **can never on its own support a confident "at bar"** — a code-derived actual caps at Medium confidence and usually lands at Unknown with a note to get real evidence. The design deep-dive below is this rung; its findings are inputs to confirm, not actuals.

Default to **Unknown** before you reach for the code: an honest Unknown that names what would resolve it beats a comfortable Medium read off the source.

## What to cover

By the end of this sub-step the strategy doc must capture, **for each H/M dimension row** (dimension + scope, the same row set 6.1 established — two same-named, differently-scoped rows get independent actuals, never one shared answer):

1. **Actual level** — one of:
   - A qualitative, dimension-specific description of where the project is now **for this row's scope** (when there's evidence to support it), OR
   - **Unknown** — explicitly noted, when the dimension hasn't been investigated enough to support a description.
2. **Confidence in the actual level** — H/M/L (or "—" for Unknown).
   - High = thoroughly checked, evidenced.
   - Medium = informed inspection, not verified.
   - Low = guessing or working from stale information.
   - For Unknown, confidence is implicitly "we don't know" — represent as "—" rather than claiming a confidence level.
3. **Evidence basis** — what is the actual based on, **and which scope did that evidence actually observe**? Pre-read observations? A specific test? Stakeholder feedback? Name the scope the same way the evidence hierarchy names the repo — evidence gathered against one scope is not evidence for a different scope that happens to share the dimension's name. Or nothing — "no investigation yet" is a valid (and very common) answer in first-pass strategies.
4. **What would resolve an Unknown** — for each Unknown, a one-line note on the type of activity that would establish a level. Pick from: targeted testing, asking specific stakeholders, code/design review of specific area, building observability/instrumentation, building test infrastructure or testability — or, when nothing could currently judge the result, say exactly that: "nothing can judge this yet" (the phrase `/evaluation-strategy`'s filter keys on). Whichever is appropriate. This note seeds Step 7's plan of work.
5. **Release** — whenever this doc's negotiated structure covers more than one release, name which release this row belongs to, on the row itself, matching 6.1.

## Q2 is answered honestly here — and planned properly afterwards

This sub-step is where the strategy answers **Q3 — "is what we have good?"** It can only do that honestly if **Q2 — "how do we know?"** holds: every actual rests on something that judges whether what was observed really means the claimed level. What this sub-step owes Q2 is **honesty about the basis**: for each non-Unknown actual, the Evidence line must let a reader see both what was observed and what judges it — and an actual whose basis you can't name in a line is recorded as **Unknown**, never a comfortable Medium.

What this sub-step deliberately does **not** do is run an oracle sweep. The quality strategy stays the pure what-matters-and-where-are-we document; auditing each dimension's oracle and planning better judging is the follow-on **`/evaluation-strategy`** — a lighter lane that ingests this Part, filters for the dimensions where judging is the bottleneck, and works have/improve/add through them with the user (with `/oracle-adequacy` as its audit when trust in an existing oracle is contested, and `/tooling-strategy` for the build plan). Don't attempt that sweep mid-strategy — the earlier design that did produced a sweep the strategy wasn't equipped to carry. Where an Unknown is clearly blocked on "nothing can judge this yet", say so in its to-resolve note; that phrase is exactly what the evaluation lane's filter looks for.

## The second design touch — targeted deep-dive where the evidence is thin

The pre-read's design observations were deliberately a light first touch: at pre-read time nobody knew what to look for. Now you do. After the first pass of proposed actuals, look at where the scoring is running on thin evidence — dimensions sitting at Unknown, at Low confidence, or on a basis too thin to support their claim, whose subject is design-shaped (architecture, error handling, data flow, coupling, testability) rather than purely behavioural. **Dispatch a targeted design review on exactly those areas — not a general review of the codebase.**

Use the `Agent` tool with `subagent_type: general-purpose`. The brief, in outline: ground in `$PLUGIN_ROOT/PHILOSOPHY.md` first (the house pattern for every dispatch); name the specific areas and the specific dimensions whose actuals need evidence — and, in a multi-repo scope, which repo (absolute path) each area lives in, since the subagent can't guess the scope; have it read the relevant code and design for those areas only; require every finding to come back as **evidence with a confidence marking** (what was examined, what it shows about the named dimension, High/Medium/Low) — never a bare opinion; and **save its findings verbatim to `$DOCS_DIR/quality/.scratch/6.2-design-deep-dive.md`** (absolute path substituted into the brief) before returning (the sealed-dispatch scratch file `/quality-strategy-review` audits — see SKILL.md → "Sealed-context dispatch and scratch files"). Include the **standing lens** in every dispatch: **test-coverage-vs-risk skew** — where the tests cluster versus where this risk map says the danger is; well-tested low-risk corners beside untested dealbreakers is exactly the finding this touch exists to surface.

Fold the findings back into the actuals as evidence: an Unknown may become a described actual at Medium confidence; an actual whose basis was too thin may gain the evidence it lacked, or lose its rating honestly. Findings are inputs to the actuals — the user confirms anything surprising before it lands. Skip the dispatch only when no thin-evidence dimension is design-shaped, and say so explicitly — the recorded skip note is what the review audit accepts in place of the scratch file.

## How to ask

Walk the H/M dimensions **cluster by cluster** when they fall into natural clusters (SKILL.md → "Cluster-by-cluster, not one flat list") — one cluster at a time, confirmed, before moving to the next; a flat walk stays fine when nothing meaningfully clusters (record *"considered, no clustering"*). Within each dimension, ask in turn:

- *"For [dimension] (scope: [scope]), where is the project actually now? Describe it in dimension-specific terms — OR mark it Unknown if we haven't actually checked."*
- *"What's that based on — and does that evidence actually cover this scope, or a different one?"* Evidence from a specific test or review? Estimate? Or genuinely don't know?
- *"If Unknown — what would tell us? Test what specifically, ask whom, review what?"*

Use the pre-read's design observations as starting hypothesis. *"The pre-read noticed [observation], which suggests [dimension] is around [level]. Is that close, or do we have better information — or is it actually Unknown?"*

**When a dimension has a matching "Deficiency observations parked for actual-state review" row, raise it at that dimension** — not just once at intake. *"Part 5 parked an observation here: [what was observed]. Does that hold up as the actual, or has it changed / do we have better evidence?"* Treat it exactly like a design hypothesis: a starting point to confirm, refine, or override, never a pre-made verdict.

You have explicit permission and encouragement to:

- **Default to Unknown when there isn't evidence.** Strategies that pretend confidence about untested actuals are worse than strategies that admit uncertainty. Unknown is honest; Medium-without-evidence is a lie that hides work.
- **Note Unknowns as a feature, not a bug.** First-pass strategies often have a majority of Unknowns. That's normal. The strategy then drives investigation, and the next pass has fewer.
- **Push back gently** when the user claims an actual without evidence. *"How do we know that? What did we check?"*
- **Use design observations carefully** — subagent C's hypotheses are starting positions, not evidence. A design observation suggesting "diagnosability is likely weak" is a starting hypothesis the user can confirm, refine, or override; it's not a thoroughly-checked actual.

What you must not do:

- **Assess actuals by reading the code when higher-rung evidence wasn't sought.** Before any code-derived actual, you must have looked for test results / CI / reports, looked at the tests, and asked the user what they've actually seen. A code read that skipped those rungs is the wrong-oracle failure this sub-step exists to prevent.
- **Present a code-derived actual as an observation, or let it claim a confident "at bar".** Label it inference; cap its confidence at Medium; prefer Unknown-with-a-resolution-note over a comfortable read off the source.
- Conflate Unknown with Low. They are different findings and produce different Step 7 actions (testing/review work vs fixing work).
- **Average a compound actual into one confidence letter.** When the real state is two claims (part confidently known, part genuinely Unknown), don't flatten them into a single "Medium" or a single "Low" — record the compound shape honestly now, so 6.3 doesn't inherit a misleading number (see 6.3's "compound-confidence trap").
- Claim High confidence in an actual without specific evidence. *"What's the High confidence based on?"*
- Skip the "what would resolve this" note for Unknowns. That note is the seed of Step 7's testing and stakeholder work.
- **Let evidence for one scope stand in for a different scope of the same-named dimension.** Evidence names the scope it actually observed, the same discipline as naming which repo it came from; a test suite covering the Studio UI says nothing about the actual for the MCP API's "usability" row.
- Merge two rows that share a dimension name but carry different scopes into one actual. Same name, different scope, different row — same rule as 6.1.
- Use percentages.

## Push back when

- An actual is stated with no evidence basis. *"What's that based on?"*
- High confidence is claimed without investigation. *"That's High based on what specifically?"*
- Unknown is dismissed too quickly ("we kind of know, it's probably Medium"). *"If we haven't actually checked, the honest answer is Unknown. Pretending otherwise hides the work to do."*
- The "what would resolve this" note is missing for any Unknown. *"How would we find out — test, ask, review, instrument?"*
- Evidence is offered for a dimension without saying which scope it covers, or is being generalised from one scope to another sharing the same dimension name. *"That evidence is about [scope A] — does it actually tell us anything about [scope B], or is [scope B] still Unknown?"*

## This sub-step is DONE when

- [ ] Every H/M dimension **row** (dimension + scope, matching 6.1's row set) has either a qualitative actual level or an explicit "Unknown" — no two differently-scoped same-named rows collapsed into one.
- [ ] Every non-Unknown actual's Evidence line names which scope the evidence actually covers; no evidence from one scope was generalised to a different scope of the same-named dimension.
- [ ] Whenever this doc's negotiated structure covers more than one release, every row states which release it belongs to, matching 6.1.
- [ ] Any actual-level detail volunteered mid-conversation for a different release was routed per Part 2's document structure and named to the user — none folded into this release's actuals.
- [ ] Under "two releases in parallel," this sub-step ran its own full pass for the parallel release too, under its own `## Part 6` header — not blended into this release's.
- [ ] Actuals were sought down the **evidence hierarchy** — test results / CI / reports, then the tests, then what the user has actually seen — before any code reading; every code-derived actual is **labelled inference**, capped at Medium confidence, and none claims a confident "at bar" off the source alone.
- [ ] Every actual has a confidence rating (H/M/L, or "—" for Unknown) and an evidence basis (or "no investigation yet").
- [ ] Every Unknown has a one-line note on what would resolve it (test / ask / review / instrument / build infrastructure).
- [ ] Every non-Unknown actual's Evidence line names both what was observed and what judges it; any actual whose basis couldn't be named in a line has been honestly recorded as Unknown. (No oracle sweep runs here — that is `/evaluation-strategy`'s job after the strategy closes; Unknowns blocked on "nothing can judge this yet" say so in their to-resolve note.)
- [ ] Thin-evidence, design-shaped dimensions got the targeted design deep-dive (or its explicit skip note): findings recorded as evidence with confidence markings, the test-coverage-vs-risk-skew lens applied, and the scratch file at `quality/.scratch/6.2-design-deep-dive.md` (or the skip note) in place.
- [ ] Every row in Part 5's "Deficiency observations parked for actual-state review" table was raised against its matching dimension and reconciled into that dimension's actual (confirmed, refined, or overridden) — none left unaddressed because the walkthrough moved past that dimension before checking the table.
- [ ] Confidence ratings use only H/M/L — no percentages.
- [ ] Where the dimensions fell into natural clusters, the walkthrough presented them cluster by cluster — or "considered, no clustering" is recorded.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 6.3.

## Output

Append to `quality/strategy.md` under Part 6. Under "two releases in parallel," each release has its own `## Part 6` header from its own pass through 6.1 — append under the matching one, not the other release's:

```markdown
### Actual levels (<release>)

#### <Dimension name> — <scope>

- **Actual:** <qualitative dimension-specific description for this scope, OR "Unknown">
- **Confidence in actual:** <H/M/L, or "—" for Unknown>
- **Evidence:** <what this is based on and which scope it actually covers, or "no investigation yet">
- **To resolve (if Unknown):** <one line — test what / ask whom / review what / instrument / build the means of judging ("nothing can judge this yet" is a valid, load-bearing note — the evaluation lane reads it)>
- **Release:** <only when this doc's negotiated structure covers more than one release>

#### <Next dimension> — <scope>

- **Actual:** <…>
- **Confidence in actual:** <…>
- **Evidence:** <…>
- **To resolve (if Unknown):** <…>
- **Release:** <…>

… (repeat per H/M dimension **row** — dimension + scope, matching 6.1's row set exactly)

**Sources consulted from pre-read:** <bullet list>

**Clustering:** <the groupings used to walk the dimensions, or "considered, no clustering">

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

**A first-pass strategy will often have a majority of Unknowns.** That is normal and correct — they are the highest-priority items for Step 7's plan of work, and resolving them is what the next iteration of the strategy will be built on.

Once written, summarise back in 3–5 lines (highlighting the count of Unknowns and the most striking known gaps) and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 6.3 (Gap and confidence)?"*
