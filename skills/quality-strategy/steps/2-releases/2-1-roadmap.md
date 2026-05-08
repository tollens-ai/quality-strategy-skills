# Sub-step 2.1 — Release roadmap

## Goal

Establish the sequence of planned releases and what each release is *for*. Releases are the backbone of the rest of the strategy: stakeholders are mapped per release; dimensions are rated per release; the risk map and plan of work are organised against this roadmap.

A "release" is any point at which the project delivers value to a set of stakeholders. It might be a chunky milestone (alpha, beta, GA), a sprint, or every merge to main if you're continuously deploying. The scale doesn't matter — what matters is that each release has a purpose, an audience, and a quality profile.

## What you need from the previous sub-step

Read all of Part 1 from `quality/strategy.md` — context shapes what releases make sense. Read the **Docs and metadata** section of `quality/pre-read.md` for any roadmap mentions, milestones, or release-history hints.

## What to cover

By the end of this sub-step the strategy doc must capture:

1. **The sequence of upcoming releases**, not tied to specific dates but in rough order.
2. **For each release:**
   - A short name.
   - A one-sentence description.
   - Who it's for (a subset of stakeholders).
   - What it's meant to *achieve* — the purpose, not the feature list. What questions does this release answer? What does success look like?
   - Rough sequencing (what comes before, what comes after).
3. **Where the team is now** in the roadmap — last release shipped, current release in flight, what's after.

## How to ask

Phrasing is yours. The user may not have an explicit roadmap; help them surface one from how they're already thinking about the work.

A good prompt: *"What's the next thing you're trying to ship? After that?"* — chain forward until they run out, then ask about the longer-term shape.

You have explicit permission and encouragement to:

- Push past "we'll see" answers — there's always *some* sequencing, even if loose.
- Reframe sprints or continuous-delivery into release-equivalent groupings if useful ("the next four weeks of work serving the alpha audience" can be a single "release" for strategy purposes).
- Probe for the purpose of each release — *"What question does this release answer? What would tell you it succeeded?"*

What you must not do:

- Accept a feature list as a release definition. The purpose matters more than the features.
- Skip the "what does success look like" question for any release. Without it, downstream sub-steps can't rate dimensions.
- Treat the roadmap as immutable — note that it's a current best guess and will evolve.

## Push back when

- The release purpose is given as a feature list. *"What problem does shipping those features solve, for whom?"*
- Two adjacent releases sound identical. *"What's actually different about release N+1 from release N?"*
- The user can't articulate any audience for a release. *"Who's going to use it? Even if it's just the team."*

## This sub-step is DONE when

- [ ] The sequence of upcoming releases is documented (at least 2–3, ideally more if the user has thought further).
- [ ] Each release has a name, one-sentence description, audience, purpose, and rough sequencing.
- [ ] Where the team is currently in the sequence is captured.
- [ ] Any deferred items or unconfirmed releases are flagged as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field, naming actual files referenced (not blank, not placeholder).
- [ ] The user has run the **step-boundary substantive checkpoint** (see SKILL.md), evaluating the whole step's output (not just this final sub-step), including any rethinks of earlier steps. Explicit, considered confirmation — not silence, not a non-committal response.

If any check fails, return to the questioning. Do not move to Step 3.

## Output

Append to `quality/strategy.md`:

```markdown
## Part 2: Release Roadmap

*Current position: <release in flight or just shipped>.*

### Release: <name>

**One-line description.** <…>

**Audience.** <who it's for>

**Purpose.** <what question this release answers, what success looks like>

**Sequencing.** <what comes before; what comes after>

---

### Release: <name>

… (repeat per release)

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines then **run the step-boundary substantive checkpoint** (see SKILL.md): summarise the **whole step's output**, invite vague unease about this step, and invite cross-step rethinks of earlier sections in light of this step. Wait for explicit, considered confirmation. Then ask: *"Ready to move on to Step 3 (Stakeholders)?"*
