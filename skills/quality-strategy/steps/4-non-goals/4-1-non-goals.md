# Sub-step 4.1 — Non-goals

## Goal

Capture, for this release, the **quality bars this release is deliberately not reaching** — and why. Non-goals here are about the *quality* of what's being built, not about which features are being built: for the feature set already scoped into this release (Part 2's roadmap), which quality dimensions — reliability, performance, scalability, polish, compatibility, hardening, and the like — are deliberately left short of what they could be? Non-goals are decisions, not oversights — naming what you're deliberately not optimising is half of the strategy. A strategy without non-goals has no edges, so you can't act on it.

**This is not a restatement of the roadmap.** Features and capabilities deferred to later releases already live in Part 2 (the release roadmap) — that's their home. A deferred feature only belongs here if it implies a quality-bar decision for what IS being built this release (see category 4 below); a plain list of deferred features is not a non-goals list, however long.

If the user volunteers a real non-goal for a **different** release mid-conversation, route it per Part 2's negotiated document structure (its own section under "two releases in parallel," a light section, the release bank, or the separate document — SKILL.md → "Scope of this skill"), named in half a line, never folded into this release's Part 4 list. Under "two releases in parallel," the parallel release gets its own full non-goals pass here too, clearly separated from this one's.

## What you need from the previous sub-step

Read Parts 1, 2, and 3 from `quality/strategy.md`. The release roadmap (2.1) and stakeholder analysis (3.1, 3.2) are particularly important — non-goals often map straight onto stakeholders you're not serving, releases you're not targeting, or dimensions a stakeholder explicitly doesn't care about.

Read the **Discrepancies** and **Design observations** sections of `quality/pre-read.md`. The pre-read may surface things the project clearly is *not* doing despite docs hinting it could (e.g. a `docs/` mention of "enterprise SSO" with no code for it).

## What to cover

By the end of this sub-step the strategy doc must capture, **for this release**:

1. **A list of quality non-goals** — minimum 3. Concrete, specific statements of a quality bar deliberately not being reached for this release's in-scope work — not a feature or capability the roadmap already excludes.
2. **For each non-goal: a one-line reason.** Why this bar is not being reached — the intentional tradeoff, not laziness or "no time." (May cite a roadmap deferral as the reason; the entry itself still names the bar.)
3. **For each non-goal: optionally, a trigger.** What would cause us to revisit this decision? Prompt for it; accept "not sure" or "no specific trigger" without pushing.

## How to ask

Asked cold, the user will probably come up short. Walk through the standard non-goal categories one by one to surface non-goals they wouldn't think of on their own:

- **Stakeholder groups not being served in this release** — from Part 3, are there stakeholder groups the project chose not to serve this time?
- **Quality dimensions irrelevant given the release purpose** — given what this release is for (Part 2), what doesn't matter? Scalability for a closed alpha; accessibility for a backend-only milestone; etc.
- **Quality bars deliberately lower than people might expect** — "zero crashes" might not be a goal for the alpha; "no manual interventions during release" might not be a goal yet.
- **Deferred capabilities — a cross-check, not a source.** Don't restate Part 2's roadmap deferrals as non-goals here — that's the roadmap's job, and a plain deferral gets, at most, a one-line pointer back to it and never counts toward the minimum. Instead ask: *does this deferral have a quality consequence for what IS being built this release?* Dropping a full historical-import feature might mean the current release's import path only needs to handle small files gracefully, not gigabyte-scale ones — that quality-bar decision (scalability, here) about the in-scope work is the non-goal: name the bar, and the deferral can be cited as the reason. A deferral with no such consequence for the in-scope work isn't a non-goal at all — it's just the roadmap.
- **Things people will ask about and want a ready answer for** — common questions ("does this support Windows?" "is there an enterprise tier?") that you want a stock non-goal answer for.

Walk the categories in order. For each, ask: *"Anything in this category that we're explicitly not doing for this release?"* — and capture what comes back.

**When the user comes up short: the "far enough / too good" generator.** There is always a quality bar beyond what this release needs — a session that finds none hasn't asked the question. Walk the quality-bar families as examples, not a fixed taxonomy — reliability, performance, scalability, polish/UX refinement, compatibility, hardening — and ask, for each that seems live: *"What would be beyond what this release needs here? What would 'too good, unnecessarily polished' look like?"* This is the primary generator when the standard categories come up short or return only feature exclusions — reach for it before accepting a thin or feature-only list.

### Two disciplines on every candidate non-goal

A non-goal is a decision about what the user *doesn't care about* — exactly the class of thing the standing goal-tracing rules (SKILL.md → "Heavy only where it serves the user's goals": frame every why in the user's words; the pruning rule) say must be framed against stated goals and confirmed, never inherited from the pre-read and inferred. Two rules apply to every candidate before it can enter the doc:

- **Reason forward, never from absence (no status-quo bias).** *"It isn't built"* is a fact about the repo, never evidence the user doesn't want it. A candidate non-goal you derived from current absence — no custom SMTP, no observability, no rate-limiting in the code — is not yet a non-goal; it is a thing the code happens not to do. Before you may even *propose* it, reason it forward against the user's stated goals and named events: *a stated Twitter launch implies a signup spike; the spike implies confirmation-email scale — so "no custom SMTP" is a launch risk, not a safe non-goal.* If the forward pass shows the absent thing is actually demanded by a stated goal or event, it is a gap, not a non-goal — surface it as one. Only an absence that survives the forward pass may be proposed.
- **Propose and confirm, one at a time (never batch behind a one-liner).** Each surviving candidate is named back to the user with its one-line why and confirmed *before* it enters the doc: *"I'm proposing we treat X as out of scope for this release — because you said Y. Right?"* Batching several cuts behind a single *"I'll scope these out…"* one-liner is the named failure: a user who doesn't read the one-liner ships scope cuts they never agreed to, and the recovery only triggers if they happen to challenge. The confirmation is the gate; an unconfirmed candidate is not a non-goal.

Then, for each non-goal captured, ask:

- **Reason** (required): *"Why is this not a goal? Intentional tradeoff, not laziness."*
- **Trigger** (optional, prompt but don't push): *"What would change this decision — what would make us revisit? It's fine to say 'not sure.'"*

You have explicit permission and encouragement to:

- Suggest non-goals from the pre-read or stakeholder analysis if the user is missing obvious ones — but a pre-read suggestion is a *candidate*, subject to both disciplines above: run it forward against the stated goals first, then propose-and-confirm. *"From what we covered earlier, it sounds like Windows support might be a non-goal — is that right?"* (never *"the code has no Windows build, so I've scoped it out"*).
- Push back when the user claims a category has no non-goals despite obvious candidates.
- Drop a category if the user genuinely confirms there's nothing there after consideration.

What you must not do:

- Accept an empty non-goals list. The strategy is incomplete.
- **Let a candidate enter the doc without explicit confirmation**, or batch several cuts behind a single one-liner. Silent scope cuts are the failure this sub-step exists to prevent.
- **Treat an absence in the code as a non-goal without the forward pass.** Reason it against the stated goals and named events first; an absence a stated goal demands is a gap, not a non-goal.
- Accept "we'll figure it out" as a reason. *"Not knowing the reason is fine — but say so explicitly: 'reason TBD.' That itself becomes an open question."*
- Push hard for triggers. They're nice-to-have, not required.
- **Propose a roadmap deferral, unmodified, as a non-goal.** It doesn't count toward the minimum and isn't itself a quality decision — see the deferred-capabilities cross-check above. If it has a real quality consequence for the in-scope work, that consequence — named as a bar — is the non-goal, not the deferral itself.
- Accept a non-goals list that is entirely feature exclusions, with no quality-bar decision among them. That reads as "not really thought about it" — reach for the too-good/far-enough generator.

## Push back when

- The list is shorter than 3 **quality** non-goals after walking all categories. *"We've covered five categories; only two quality non-goals came out. Was that genuine, or were we still being too generous?"*
- The non-goals list is entirely feature exclusions, with no quality-bar decision among them — check this as soon as it's evident, not only once all categories are walked. *"This reads as a list of things we're not building — that's the roadmap's job. What quality bar are we deliberately not reaching for what IS being built? Let's walk the too-good question."*
- A roadmap deferral is proposed unmodified as a non-goal. *"That's already in the roadmap — restating it here doesn't add a quality decision. Does dropping it change what quality bar the in-scope work needs to hit? If not, it doesn't belong here; if so, that's the non-goal — name the bar."*
- A reason is "no time" or "no resources." *"That's a constraint, not a reason. What would the choice be even with more time?"*
- A candidate's only justification is that the code doesn't do it today. *"That's the current state, not a decision. If you go through with the Twitter launch, does this stay out of scope — or does the launch pull it in?"*
- "Everything is a priority" — direct or indirect. *"What would you cut if the timeline halved?"*
- Non-goals are written so generally they don't actually exclude anything. *"In concrete terms — what specific thing are we not doing?"*

## This sub-step is DONE when

- [ ] At least 3 **quality** non-goals are captured — a list consisting only of feature exclusions or unmodified roadmap deferrals does not satisfy this; each entry names a quality bar deliberately not being reached, however lightly (the far-enough/too-good generator is the fallback when the standard categories return only features).
- [ ] Every non-goal in the doc was **proposed with its one-line why and explicitly confirmed** by the user — none batched behind a single one-liner, none silently inherited from the pre-read.
- [ ] Every non-goal derived from current absence survived a **forward pass** against the stated goals and named events (it isn't actually demanded by a stated goal or event); anything the forward pass showed is demanded was surfaced as a gap, not recorded as a non-goal.
- [ ] Every non-goal has a one-line reason that names an intentional tradeoff, not a constraint.
- [ ] Every non-goal has a trigger captured OR an explicit "not sure" / "no specific trigger" recorded.
- [ ] The five standard categories have all been walked through (or actively skipped with a noted reason).
- [ ] Any real non-goal volunteered for a different release was routed per Part 2's document structure and named to the user — none folded into this release's Part 4 list.
- [ ] Under "two releases in parallel," this sub-step ran its own full pass for the parallel release too, clearly separated (its own non-goals list, not blended into this release's) — not just noted in passing.
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The step-boundary `/contradiction-check` was dispatched on the doc so far (it is the first move of the checkpoint, per SKILL.md) and its scratch file exists at `quality/.scratch/4.1-contradiction-check.md`.
- [ ] The user has run the **step-boundary substantive checkpoint** (see SKILL.md), evaluating the whole step's output (not just this final sub-step), including any rethinks of earlier steps. Explicit, considered confirmation — not silence, not a non-committal response.

If any check fails, return to the questioning. Do not move to Step 5.

## Output

Append to `quality/strategy.md`. Under "two releases in parallel" (SKILL.md → "Scope of this skill"), each release gets its own complete `## Part 4: Non-goals (<release>)` section — run this sub-step once per release, clearly separated, never one blended list:

```markdown
## Part 4: Non-goals (<release>)

Each entry is a quality bar this release deliberately isn't reaching — not a feature exclusion (those live in Part 2's roadmap). Where a roadmap deferral motivates one, the entry still names the bar; the deferral is cited in the reason, not restated as the non-goal.

| # | Quality bar not being reached | Reason | Trigger to revisit |
|---|---|---|---|
| 1 | <e.g. "Scalability beyond small files (historical import handles files up to ~10MB gracefully, not gigabyte-scale)"> | <one-line reason — intentional tradeoff, may cite a roadmap deferral this follows from> | <trigger, or "not sure"> |
| 2 | <…> | <…> | <…> |
| 3 | <…> | <…> | <…> |

(continue if more)

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines then **run the step-boundary substantive checkpoint** (see SKILL.md): summarise the **whole step's output**, invite vague unease about this step, and invite cross-step rethinks of earlier sections in light of this step. Wait for explicit, considered confirmation. Then ask: *"Ready to move on to Step 5 (Quality Dimensions)?"*
