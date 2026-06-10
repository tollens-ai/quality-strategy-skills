# Sub-step 2 — Principles

## Goal

State the six governing principles that drive the test strategy's decisions. These are the canonical defaults from Edmund Pringle's quality framework. The user can deviate, but only deliberately and with a stated reason — see OPEN-QUESTIONS.md ("Six governing principles fixed by default").

By the end of this sub-step the strategy doc has a Principles section with the six (or the user's deliberate variant), each with a one-paragraph explanation in the team's voice.

## What you need from the previous sub-step

The Purpose section in `quality/test-strategy.md` and the test pre-read. Principles need to make sense in the context of the project — stated in the abstract, a principle is decoration; tied to the project's actual unknowns, it does work.

## The six canonical principles

These are the defaults. Present them to the user as such — not as a menu to pick from, but as the framework's commitments, with the explicit option to tweak any with a reason.

**1. Testing is information acquisition.** Every test session should answer a named question. *"I'm testing to find out whether X"* is a good session. *"I'm running through the test plan"* is a weak one — mechanical, not directed. (FRAMINGS.md #1, Ed's Economics of Testing.)

**2. Highest-impact unknowns first.** The risk map is ordered by impact for a reason. Test the things that, if they turn out to be bad, would change the most decisions. (Ed's Risk, Risk Map vs Register.)

**3. Cheapest resolution first within a tier.** When two unknowns have similar impact, resolve the one that's cheaper to test first. A 10-minute install test before a day-long signal-quality test — if install fails, you've saved a day. (Ed's Economics of Testing.)

**4. Test as the stakeholder, not as the builder.** Adopt the lens of the stakeholder whose value is at risk. When something confuses you in that lens, that confusion is data — don't resolve it by reading the source code, note it as a usability finding. (FRAMINGS.md #3, Ed's Testing Without Seeing the Code.)

**5. Distinguish testing from checking.** Checking confirms expected behaviour. Testing investigates: *"what does this actually do? what's surprising? what's missing? what would break?"* For most products in the new era, testing dominates — we're not verifying a spec, we're discovering reality. (FRAMINGS.md #1, Ed's Testing — What It Actually Is.)

**6. Automate what's repeatable, humanise what's judgmental.** Agents can run install scripts on different configurations, systematically trigger error paths, parse output formats, check for invariants. Humans evaluate whether output is genuinely insightful, whether the experience feels trustworthy, whether the "aha" moment happens. Don't waste human attention on what agents can check. Don't waste agent cycles on what requires taste. (FRAMINGS.md #6, #9, Ed's Heuristic 13.)

## How to ask

State all six up front, in the team's voice. Then ask:

> *"These are the framework's defaults. Each is load-bearing for how we'll derive learning needs and allocation in the next sub-steps. Do any of these not fit how you want to operate? If so, we tweak deliberately and record the reason. If they all land, we keep them as stated and move on."*

Then walk through the principles one at a time, briefly. For each:

- Re-state in the project's terms. (E.g. for principle 4: *"In your case, the stakeholders are alpha users running this on unfamiliar codebases plus the agents you've assigned testing work to.")
- Ask: *"Anything you want to change here?"*
- If the user says "looks fine," move on without ceremony. If they push back, dig in — the push-back may surface important context (e.g. *"we don't want to humanise judgment because we're trying to test whether agents can do that judgment too"*).

## What you must not do

- Re-derive the principles from scratch. They're framework defaults; the value is in stating them explicitly, not in pretending they're project-specific.
- Skip the user-facing presentation. Even if the user is sophisticated and these are obvious, stating them anchors the strategy. The principles are referenced from sub-step 3 (cheapest-first, tiering) and sub-step 4 (allocation).
- Add new principles unless the user proposes one and it's genuinely additional (not a rephrasing of one of the six). If a "new" principle is really a project-specific application of one of the six, fold it into that one's explanation.
- Drop a principle without a stated reason. The skill is opinionated — deviations are allowed but must be honest about why.

## Push back when

- The user wants to skip this section because "the principles are obvious." *"They're the load-bearing defaults for the next two sub-steps. Even if you'd state them yourself, putting them in the doc means future readers — including you in three months — don't have to work them out again."*
- The user wants to invert principle 4 (test as the builder). *"That's a major deviation — independence of perspective is one of the framework's core framings. What's the reason? If it's 'we want to verify the implementation is correct, specifically', that's checking — a part of the work, but not the main frame."*
- The user wants to drop principle 6 (the human/agent split). *"That's the principle that drives sub-step 4 (Allocation). Want to talk through what's prompting the discomfort before we drop it?"*
- The user proposes an additional principle that conflicts with one of the six. Surface the conflict explicitly — don't quietly stack contradictions.

## This sub-step is DONE when

- [ ] All six principles are stated in `quality/test-strategy.md`, each with a one-paragraph explanation in the team's voice (not verbatim from this file).
- [ ] If any principle was tweaked or replaced, the change is recorded with the user's stated reason in an "Adjustments to default principles" subsection.
- [ ] The user has explicitly confirmed each principle (or its replacement) — not by silence.
- [ ] Pre-read sources cited in the section's evidence field.

If any check fails, return to the work. Do not proceed to sub-step 3.

## Output

Append to `quality/test-strategy.md`:

```markdown
## Governing principles

The principles below drive the test strategy's decisions about *what* to investigate and *who* should do it. They're framework defaults from the quality strategy's lineage; deviations from them are recorded explicitly.

**1. Testing is information acquisition.** <project-voice paragraph>

**2. Highest-impact unknowns first.** <project-voice paragraph>

**3. Cheapest resolution first within a tier.** <project-voice paragraph>

**4. Test as the stakeholder, not as the builder.** <project-voice paragraph>

**5. Distinguish testing from checking.** <project-voice paragraph>

**6. Automate what's repeatable, humanise what's judgmental.** <project-voice paragraph>

**Adjustments to default principles:** <only if any — list each with the reason>

**Sources consulted from pre-read:** <files>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Summarise back in 2-3 lines: *"Six principles in place [with N adjustments]. Ready for sub-step 3 (Learning needs)?"*
