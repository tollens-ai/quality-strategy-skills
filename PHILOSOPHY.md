# Philosophy

The skills in this repo are facilitators for a particular way of thinking about software quality. This document is the spine. Anyone — human or agent — using the skills should read this first.

The framework is **Edmund Pringle's**, drawing on the context-driven testing tradition (Bach, Bolton, Weinberg) — the school that holds there are no universal "best practices", only practices that fit a particular context.

## Quality is value to someone who matters

This is the foundational definition. Everything else flows from it.

It forces two questions every time:

1. **Who matters?** — Whose perspective on value counts for this project, this release, this decision?
2. **What do they value?** — Specifically, in this context, not abstractly.

Implications:

- Quality is not a property of the product. It's a relationship between the product and a person (or agent) who cares.
- The same product can be high quality and low quality at the same time, depending on whose perspective you take.
- If you don't know who matters and what they value, you cannot assess quality. The word is empty.
- A **quality dimension** is one named axis along which the product can be better or worse for someone who matters — reliability, usability, latency, data integrity, how easily an agent can orient in the code, and so on. Dimensions are the concrete handles the abstract word "value" breaks down into. Much of the work the skills facilitate is exactly this: find the dimensions that matter *here*, decide how good each one has to be, and see where you actually stand on each.
- "We have a quality problem" usually means the context shifted. The product hasn't changed; the stakeholders or what they value have. Plan for context shifts.

## Testing is investigation to find out what's actually true

Testing is not the act of running a test suite. It is the act of investigating to discover what the world (or the product) actually is — as distinct from what we want it to be, or believe it to be.

Two parts:

- **Checking** — confirming that specific things work the way we expect. Mechanical, repeatable, automatable. Cheap with agents.
- **Investigating** — discovering what's actually going on, especially in places we didn't expect. Creative, exploratory, judgment-heavy.

Most teams pour almost all their effort into checking and almost none into investigation. That's the imbalance to fix, and the imbalance the agent era makes more dramatic — checking gets cheaper still, so the leverage of investigation rises.

**Testing starts at the start.** It is not a phase at the end of a project. The first test is whether the architecture is sensible. The next is whether the requirements are coherent. By the time anyone's running code, much of the most valuable testing has already happened.

## Risk is danger to quality

Risk drives where to focus. Two forms:

- **Unknown risk** — we don't know enough about an area to know if its quality matches what we want. The response is investigation.
- **Known risk** — we know the quality is below what we want. The response is acceptance or improvement.

Both have costs. The economics of quality work is the trade-off between those costs and the value at stake.

The most dangerous quality gaps are the ones we have *low confidence* about. A known gap can be managed. An unknown gap ambushes you.

## The economics of quality work

You will never have enough time to test everything, fix everything, or know everything. The whole game is getting the most quality improvement for the time and effort invested.

The single most valuable skill is deciding what to work on — and you can only do that if you understand who matters, what they value, and where the danger is.

Three kinds of work follow naturally:

- **Testing work** removes uncertainty about *what is*. It investigates current quality on a dimension and upgrades confidence in where you actually are.
- **Stakeholder work** removes uncertainty about *what should be*. It involves talking to stakeholders, observing users, reviewing market expectations.
- **Fixing work** closes the gap between actual and required quality.

You cannot do fixing work efficiently until you have reasonable confidence on both sides of the gap. Don't fix to a target you're guessing at.

## Confidence is the through-line

The output of quality work is not perfection. It is **calibrated confidence** — knowing where you are, knowing where you need to be, and knowing how sure you are about both.

Three confidences a working strategy produces:

1. **Shared understanding** — everyone in the team has a consistent picture of what's going on and what the others think.
2. **Completeness** — there is a credible, written account of what needs to happen for each release to succeed, by your own definition of success.
3. **Situational awareness** — you may not know whether you'll hit a given bar by a given date, but you always know exactly where you are.

Two disciplines:

- **State confidence explicitly.** Don't just state conclusions. State how confident you are. "Probably fine" is information; "fine" without qualification hides the uncertainty.
- **Don't use spurious precision.** "87% confident" implies a calibration you don't have. Use honest, coarse-grained levels: thoroughly checked / glanced / guessing. Or High / Medium / Low.

## We live in the new world

Agents are software's newest stakeholder *and* its newest team member. Both shifts matter, and both are now the default — not the exception.

This pack takes an opinionated stance: **the new world is the default world**. Every project covered by this skill is assumed to have agent stakeholders unless the user can articulate a specific reason why not. If you don't have agents using your product, agents working in your codebase, or agents reading your docs and integrating against your API today, you almost certainly will soon — and the strategy you produce now should anticipate that, not retrofit when it bites.

- **Agents as stakeholders.** An agent consuming your API doesn't care about UI usability. It cares intensely about consistency, predictability, and documentation quality. If your stakeholder list says "users" and stops there, you're missing the agents who use, integrate with, or maintain the product.
- **Agents as team members.** Agents have radically different cost and time profiles than humans. Things "not worth testing" under human cost constraints may be trivially worth it for agents. Things humans naturally do — record context, notice weirdness, ask clarifying questions — agents don't, unless explicitly designed to.
- **Old-world bias is real.** "Readability" historically means "can a new engineer follow this?" In a small team where everyone knows the codebase, that's low priority. In a team with an army of Claude instances reading and writing the codebase daily, readability becomes "can an agent orient in this code?" — and it goes from low to high without the dimension changing names. Many quality dimensions need this kind of re-reading when agents are first-class participants.

The skills in this repo treat agents as first-class throughout. When you're answering an interview question, the answer for human stakeholders may differ from the answer for agent stakeholders. Both matter, and both are required.

If you're convinced your project is genuinely an old-world exception (no agents using it, no agents working on it, none coming), the skill will ask you to articulate why — and push back. The default is the new world.

## Disciplines that recur in every skill

These rules apply throughout, not at any single point. Every skill in this repo enforces them.

- **Interview, don't infer.** Pre-read what's obvious in the project (README, recent commits, docs) and surface it as a hypothesis to confirm. Never assume the load-bearing inputs — who matters, what they value, what's a non-goal, where the team will accept risk. The most important inputs cannot be guessed from a repo and would be guessed wrongly.
- **Ask rather than guess.** Where a human would pause and ask, an agent fills in a plausible answer and proceeds. If you find yourself filling in an answer the user hasn't given, stop and ask. Asking is cheap; cascading wrong assumptions are expensive.
- **Record assumptions explicitly.** Whenever you proceed on something the user hasn't confirmed, write the assumption down alongside the conclusion that depends on it. Silent assumptions are invisible until something breaks; explicit ones can be challenged.
- **Understand the why before you act.** Knowing what a stakeholder wants is half the work. Knowing why they want it is the rest. The same stated requirement can lead to very different responses depending on the underlying motivation. Don't accept "we need 99.9% uptime" without asking why.
- **Make confidence visible.** Every assessment — every rating, every gap, every required level — carries an explicit confidence rating. Use coarse honest levels: High / Medium / Low, or *thoroughly checked* / *glanced* / *guessing*. Never percentages. Pseudo-precision implies investigation that wasn't done, and creates false comfort.
- **Push back when something is vague.** "Make it work" is not a stakeholder requirement. "Performance is high" is not a quality dimension rating. The skill's job is to keep digging until the answer is precise enough to be checked, challenged, and corrected.
- **Make non-goals explicit.** Everything cannot be a priority. Naming what you are deliberately not doing is half the job. A strategy with no non-goals hasn't been thought through.
- **Stay sequential.** The seven steps of a quality strategy are not optional, and not interchangeable. Later steps depend on earlier ones. Skipping ahead produces a strategy that looks complete but is built on sand.

## Further reading

- Edmund Pringle's blog series at [epkconsulting.substack.com](https://epkconsulting.substack.com/) — the source material.
