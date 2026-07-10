# Framings — what /test-strategy must hold against agent defaults

Left to its defaults, an agent drifts toward writing a test plan: a list of cases, a coverage target, a sequence of build-then-verify. That isn't a test strategy. The framings below are non-negotiable defaults grounded in Edmund Pringle's quality framework, written down here so the lane's discussion can apply them without working them out from scratch.

When you see "FRAMINGS #N" cited in the skill, it means that framing is load-bearing at that point. Don't skip it.

---

## #1 — Investigation, not checking, is the dominant frame

**Checking** is confirming specific things work the way we expect. Mechanical, repeatable, automatable.
**Investigating** is discovering what's actually going on, especially in places nobody thought to look. Creative, exploratory.

Most teams pour almost all their effort into checking and almost none into investigation. **The test strategy must reverse that emphasis.** If the strategy reads as a list of test cases or coverage targets, it's wrong — that's a test plan masquerading as a strategy.

The test strategy answers: *what's actually true about this product, and where do we need to find out?* Not: *what cases verify the spec?*

Source: Ed's `core/Testing.md`, `quality-strategy/concept-testing-definition.md`.

---

## #2 — Test phase is a terrible idea

The test strategy is not "what we do at the end." It shapes the work from day one. Architecture choices, technology choices, assumptions about users — these have enormous quality implications, and testing thinking has to be present when they're made.

**The strategy should include testing thinking from the start of the project, not from the start of a "test phase."** A produced test strategy that sequences design → build → test is wrong.

Source: Ed's `quality-strategy/concept-testing-starts-at-the-start.md`.

---

## #3 — Independence of perspective: don't read the code first

If you study the code before testing, you test against the builder's mental model. You verify that the code does what the code was written to do. You don't discover whether the code does what the *stakeholders* need.

**The /test-strategy pre-read explicitly excludes source code.** Inputs are the quality strategy + an inventory of test infrastructure (test/, spec/, CI config, existing test docs). The agent works from this independent footing, not from assumptions picked up by reading the code.

This applies to AI agents doing testing too: their fresh-eyes perspective is valuable for the same reason a human tester's independence is valuable. If it gets contaminated by reading source first, that perspective is gone and can't be recovered.

Source: Ed's `quality-strategy/concept-testing-without-seeing-code.md`.

---

## #4 — Asking and testing are parallel, not substitutes

Both fill in the actual/confidence columns of the risk map. They answer different questions:

- **Asking the builder** tells you what was *intended* and what the builder *believes* is true.
- **Testing the product** tells you what *actually happens* when you use it.

The gap between intended and actual is where the most important bugs live.

The test strategy should plan for both. Don't collapse them — testing isn't a substitute for asking, and asking isn't a substitute for testing.

Source: Ed's `quality-strategy/concept-testing-without-seeing-code.md`.

---

## #5 — Don't import old-world costs

Many "we don't test that" decisions are inherited from the human-cost era. *Not worth writing tests for edge cases — a human would spend an hour on it.* *Not worth checking all variations — that's expensive manual testing.*

With agents, lots of "not worth it" becomes trivially cheap. Edge cases in seconds. Every variation in parallel. Every code path explored.

**The strategy must challenge inherited assumptions about scope.** During learning-needs derivation, prompt explicitly: *what would you have said "not worth testing" under human costs that's now cheap?*

Source: Ed's `heuristics/Heuristic 9 - Don't Import Old-World Costs.md`.

---

## #6 — Economics shift: checking is nearly free, investigation is the bottleneck

In the human-centric era, you sampled because you couldn't check everything. With agents, checking everything is feasible. What's expensive is *deciding what to check* — generating good hypotheses, understanding what failures mean, thinking creatively about edge cases.

**Allocation should reflect this rebalance.** Use agents for exhaustive checking. Reserve human time for investigation, judgment, and the questions agents can't ask themselves. Don't spend human time on what agents can check.

Source: Ed's `heuristics/Heuristic 13 - Economics of Checking vs Investigating Shift with Agents.md`.

---

## #7 — Agent output needs different review

Humans make inconsistent, visible mistakes. Agents make consistent, plausible-looking mistakes. They follow instructions precisely but misunderstand intent. They produce output that satisfies the literal request but misses the point.

**Review processes designed for human error patterns will miss agent error patterns.** When agents do testing, the review pattern has to look for: *Does this actually solve the problem? Are the assumptions correct? Is this internally self-consistent in a way that hides a misunderstanding?*

Say so explicitly whenever an agreed move assigns testing work to agents.

Source: Ed's `heuristics/Heuristic 14 - Agent Output Needs Different Review.md`.

---

## #8 — Proxies are not quality — but proxy goals are legitimate when labelled

The shared definitions for the whole pack: an **oracle** and a **proxy** are both **quality instruments** — signals you consult to evaluate an ility — differing in **authority**. An **oracle** is trusted to **judge**: it tells you whether what you observe is good. A **proxy** **indicates**: it correlates with quality, is usually cheap to check, and has known blind spots — satisfying it never proves the ility is met. (Distinct from the pack's narrower use of *instrument* for the tool that lets you observe at all — a test rig, a telemetry feed; see `/tooling-adequacy`.) The `/evaluation-strategy` lane plans both.

A bug count is not quality. Test coverage is not quality. They're proxies — indirect signals that correlate with what you actually care about, and correlation is not identity. The failure mode is **treating proxy satisfaction as quality achieved**: the moment "coverage is green" is read as "correctness is handled", you've lost sight of quality and started optimising the proxy.

But **there is nothing wrong with a proxy as a goal — when it's labelled as one.** You should have 100% test coverage. You should have a review run over every code change. You should have clean architecture. These are all good quality proxies: cheap, leading, worth committing to. You just have to know — and say — that satisfying the proxy doesn't mean you got the thing right. (Mind the level: a reviewer judging one diff is an oracle *for that diff*; "a review ran over every change" is a proxy *for the ility*.)

**So the strategy calls out which proxies it uses, what each measures, and what it might miss — and a proxy target may stand as a goal when it does that.** An agreed move's "answered when" may cite a proxy milestone *if the move states what remains unknown about the ility when the proxy is satisfied*. The guard at the closing step: if you're tempted to write "achieve 80% coverage" as a goal, keep it — labelled as a proxy — and say what you still won't know about the ility when you hit it. (Many good proxies are simultaneously process rules — review-per-change is both; capture once, classify later.)

Source: Ed's `heuristics/Heuristic 4 - Proxies Are Not Quality.md`; Qing design ruling 2026-07-10 (TOL-174).

---

## #9 — Smells matter, and agents don't have them

A smell is the intuitive feeling that something's off, before you can articulate why. Years of pattern recognition compressed into instant reaction. Smells fire before evidence, before data confirms a problem.

**Agents don't have smells.** They process inputs and produce outputs without the pattern-matched discomfort that would make a human pause. This is one of their most significant blind spots.

If the strategy fully delegates investigation to agents, it loses the smell layer. **Allocation should include a deliberate question: where do humans need to *feel* the product, not just check it?**

Source: Ed's `smells/Smells.md`.

---

## #10 — Known risk and unknown risk are different problems

**Known risk** = we know enough to know quality is below where we want. The cost is fixing.
**Unknown risk** = we don't know enough to assess quality. The cost is testing to find out.

Teams often mix the two up. A strategy that says "test more" in response to known risk is wrong — known risk needs fixing, not investigating. A strategy that says "fix it" in response to unknown risk is wrong — you don't know what to fix yet.

**Keep the two apart in the discussion.** Each agreed move should be honest about which kind of risk it's addressing. Items addressing unknown risk produce information; items addressing known risk produce fixes (and may not belong in a test strategy at all — they belong in the quality strategy's plan of work).

Source: Ed's `core/Risk.md`, `quality-strategy/concept-risk.md`.

---

## #11 — Two named method classes agents forget: exploratory testing, and testing in production

Agents derive methods that look like scripts: run X, assert Y. Two method classes that don't fit that shape keep falling out of strategies, and both are first-class here.

**Exploratory testing** is skilled investigation — simultaneous learning, test design, and execution by an **exploratory tester** (that is the practitioner's title; never "explorer"). It is the standing oracle for experience bars — delight, feel, "hardened against real user intentions" — where spec-level checks are insufficient *by design*: a flow can pass every scripted check and still fight its user. Plan it with charters drawn from real intentions, time-boxed sessions, and debriefs whose findings feed the risk map's actual/confidence columns.

**Testing in production** means letting real users have at it **with adequate observability instrumentation covering the risks and downsides** — the instrumentation is what makes it testing rather than hoping. A testing-in-production method is only well-formed when it names: what the real usage will exercise, what instrumentation observes each named risk, and the recovery path when the downside fires. Without those three, it is not a method; it's exposure.

**AI exploratory testing is unproven — calibrate before trusting.** An agent can run charters and write convincing debriefs, but whether it notices what a skilled exploratory tester notices is an open question with no track record. Treat any move that assigns exploratory testing to an agent as a calibration experiment (try one charter against a human baseline), never as a settled capability.

Source: design session with Qing, 2026-06-11; Ed's `core/Testing.md` (investigation framing).
