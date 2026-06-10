# Sub-step 1.4 — Release workflow

## Goal

Capture how work moves from "merged" to "shipped" — the release process. This is critical because Step 7 (Plan of Work) depends on it directly. If the user can't answer, that's a finding worth recording, not a failure.

## What you need from the previous sub-step

Read sub-step 1.3 from `quality/strategy.md`. Read the **Code structure** section of `quality/pre-read.md` — CI/CD configuration, deployment scripts, release notes, version files all hint at how releases happen.

## What to cover

By the end of this sub-step the strategy doc must capture:

1. **How a release gets from "merged to main" to "in users' hands."** Concrete steps, not abstract phases.
2. **Cadence** — continuous delivery, sprint releases, milestone releases? What triggers a release?
3. **Gates and go/no-go criteria**, if any. What has to be true before a release can ship?
4. **Internal testing or staging steps** between merge and ship.
5. **Anything missing or undefined** — flag explicitly. The strategy can document an unknown; it cannot recover from a quietly-assumed wrong answer.

## How to ask

Surface the pre-read's hypothesis: *"From the CI config it looks like X — does that match how you actually ship?"*

A good prompt for concreteness: *"Walk me through the last release. What actually happened, from merge to users having it?"*

You have explicit permission and encouragement to:

- Push for the steps that look glossed-over.
- Ask about staging, internal testing, beta — anything between merge and end-user.
- Probe for the gates: *"What would block a release from going out today?"*
- Flag undefined steps as `OPEN QUESTION` and continue — this is a sub-step where partial answers are common and that's fine.

What you must not do:

- Accept "we deploy continuously" or "we just push to main" without unpacking what that means concretely.
- Skip the gates question. Even projects with no formal gates have implicit ones; surface them.
- Paper over "we haven't done a release yet" — that's a critical finding; flag it loudly.

## Push back when

- Release is described in branding terms ("CI/CD") rather than in process terms. *"What actually has to happen between merge and a user seeing the change?"*
- Gates are denied. *"So a broken main goes straight to users? Or does something check first?"*
- Internal testing is skipped. *"Does anyone use the merged code before users do?"*
- The user says "we'll figure that out later." Note the gap explicitly as `OPEN QUESTION`; the strategy needs the gap visible in the doc.

## This sub-step is DONE when

- [ ] The merged-to-shipped path is documented step by step, OR explicitly flagged as undefined with a one-line description of what's not yet known.
- [ ] Cadence and triggers are captured.
- [ ] Gates and criteria are captured (or "none — anything in main goes out" is recorded as the explicit current state).
- [ ] Internal testing / staging steps are captured (or noted as absent).
- [ ] Any deferred or undefined elements are recorded as `OPEN QUESTION:` lines.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 1.5.

## Output

Append to `quality/strategy.md` under Part 1 (Context):

```markdown
### Release workflow

<step-by-step process from merge to shipped, or "OPEN QUESTION: <description>" if undefined>

<cadence and triggers>

<gates and go/no-go criteria>

<internal testing or staging, if any>

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 1.5 (Budget and constraints)?"*
