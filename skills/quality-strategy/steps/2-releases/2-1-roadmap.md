# Sub-step 2.1 — Release roadmap

## Goal

Pin down the order of planned releases and what each release is *for*. Releases are the backbone of the rest of the strategy: you map stakeholders per release, rate dimensions per release, and organise the risk map and plan of work against this roadmap.

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
4. **Which release THIS strategy covers** — the strategy is per-release (SKILL.md → "Scope of this skill"); normally it's the release in flight or next to ship. Confirm it with the user and stamp it into the doc header's `*Release:*` line (replacing the Step-1 placeholder if one is there). Every "(\<release\>)" heading later sub-steps write uses this name.

## How to ask

Phrasing is yours. The user may not have an explicit roadmap; help them surface one from how they're already thinking about the work.

A good prompt: *"What's the next thing you're trying to ship? After that?"* — chain forward until they run out, then ask about the longer-term shape.

You have explicit permission and encouragement to:

- Push past "we'll see" answers — there's always *some* sequencing, even if loose.
- Treat sprints or continuous delivery as releases when that helps ("the next four weeks of work serving the alpha audience" can be a single "release" for strategy purposes).
- Probe for the purpose of each release — *"What question does this release answer? What would tell you it succeeded?"*

**When the user gives more than purpose-level detail for another release, negotiate the doc structure — then route it.** This step often unlocks a flood — the user starts dictating bars, risks, non-goals, or dimensions for releases beyond the one this strategy covers. The first time that happens this session, offer the structural choice (SKILL.md → "Scope of this skill" names the four options: per-release doc + bank, light sections in this doc, two releases in parallel, or fully separate documents) rather than assuming banking — ask, get an answer, and record it in `quality/.scratch/session-config.md` before routing anything. Then route what the user just gave you per that choice — faithfully, close to their words, to the release bank, a light section, the parallel release's own depth pass, or the separate document, whichever was chosen. Acknowledge in half a line and move on — don't flatten it into this release's analysis, don't discard it, and don't detour into deep analysis of a release that isn't this one (unless "two releases in parallel" was the negotiated choice, in which case both get their depth pass by design).

What you must not do:

- Accept a feature list as a release definition. The purpose matters more than the features.
- Skip the "what does success look like" question for any release. Without it, later sub-steps can't rate dimensions.
- Treat the roadmap as fixed — note that it's a best guess and will change.

## Push back when

- The release purpose is given as a feature list. *"What problem does shipping those features solve, for whom?"*
- Two adjacent releases sound identical. *"What's actually different about release N+1 from release N?"*
- The user can't articulate any audience for a release. *"Who's going to use it? Even if it's just the team."*

## This sub-step is DONE when

- [ ] The sequence of upcoming releases is documented (at least 2–3, ideally more if the user has thought further).
- [ ] Each release has a name, one-sentence description, audience, purpose, and rough sequencing.
- [ ] Where the team is currently in the sequence is captured.
- [ ] The doc header's `*Release:*` line names the release this strategy covers, confirmed with the user.
- [ ] If the session surfaced more than one release with real content, the doc-structure choice (SKILL.md → "Scope of this skill") was offered and the negotiated answer recorded in `quality/.scratch/session-config.md`.
- [ ] Any beyond-purpose detail the user gave for other releases has been routed per that choice — faithfully, per release — not flattened into this release's sections and not dropped.
- [ ] Any deferred items or unconfirmed releases are flagged as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The step-boundary `/contradiction-check` was dispatched on the doc so far (it is the first move of the checkpoint, per SKILL.md) and its scratch file exists at `quality/.scratch/2.1-contradiction-check.md`.
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
