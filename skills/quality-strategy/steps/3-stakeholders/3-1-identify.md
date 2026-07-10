# Sub-step 3.1 — Identify stakeholders for this release

## Goal

Identify who matters for **this release** — the release this strategy covers — the specific people, roles, and agents whose perspective on quality counts. Stakeholders drive everything that follows: you rate dimensions against what they value, assess risk against their needs, and shape the plan of work around their priorities.

This skill's depth analysis covers one release at a time — the release this strategy is for (see SKILL.md → "Scope of this skill"). Note stakeholders for other releases briefly — and bank any real detail the user gives about them to that release's notes file (the release bank — SKILL.md → "Scope of this skill") — but run the three-lens depth analysis (Delight / Good Enough / Dealbreaker — sub-step 3.2) only for this release.

## What you need from the previous sub-step

Read Parts 1 and 2 from `quality/strategy.md`. Read the **Docs and metadata** and **Discrepancies** sections of `quality/pre-read.md` for any stakeholder mentions.

## What to cover

By the end of this sub-step the strategy doc must capture:

1. **The stakeholders who matter for this release** — not just job categories ("users") but specific groups ("vibecoders running side projects on Mac/Linux who write mostly AI-generated code").
2. **For each stakeholder, the sub-group split** — has the user actively considered whether there are meaningfully different sub-groups under this label? "Considered, no meaningful split" is a valid answer; "didn't think about it" is not.
3. **Agent stakeholders — mandatory by default.** This skill takes the new-world stance: agent stakeholders are the default, not the exception. Assume every project has at least one agent stakeholder (agents using the product, agents working on the codebase, agents integrating with the API, or agents reading the docs) unless the user can give a specific reason why not. If they claim none, push back — see "Push back when" below. Each of the four categories is checked independently and unconditionally — an agent stakeholder already found in one category (most often "using the product") does not complete this item on its own; see "How to ask" for the required per-category walk.
4. **Capacity rule.** The same person can be a stakeholder in more than one capacity — a user, a founder, a developer, a product owner — and each capacity the user actually names is its own stakeholder entry with its own sub-step 3.2 pass; a person's presence in one capacity never discharges the check for another. Name the case explicitly when it comes up: a solo founder already listed as a user still needs the developer and product-owner hats examined separately, not assumed covered by the user entry. This applies to agents the same way — an agent already listed as a user doesn't answer for whether an agent is also developing, fixing bugs, or supporting users.
5. **Internal stakeholders — considered via four who-does questions, not required entries.** In early releases especially, ask who's doing the product ownership, who's doing the development, who's doing the bug fixing, and who's doing the user support — for humans and agents both. None of the four requires a dedicated stakeholder entry: "same person, already covered" and "nobody yet — noted" are complete, valid answers. What's required is that each of the four is actively considered — the same considered-is-valid / didn't-think-about-it-is-not idiom as the sub-group check (item 2). A capacity entry existing elsewhere (e.g. this person is already listed as a user) is not itself an answer to any of the four — the question still has to be asked and the answer recorded, even when the honest answer turns out to be "same person."
6. **Future-release stakeholder notes** — one line per future release on the roadmap, naming who will likely matter then who doesn't yet (e.g. "Beta will add design partners and small enterprise pilots"). Just enough so this release's strategy doesn't accidentally close off paths to future stakeholders. Don't run the depth analysis for them.

## How to ask

The prompts below are examples of *intent*, not lines to recite — say them in your own words, fitted to the user (see SKILL.md → "Phrasing — adapt, don't recite"). What's fixed is what each question has to surface; the wording is yours.

Surface what the pre-read suggested first — e.g. *"From the docs the audience looks like X — is that close to right for the alpha?"*

For this release:

- Ask cold: *"Who matters for this release? Don't filter — name everyone whose perspective counts, however indirectly."*
- Apply the sub-group heuristic: for each stakeholder named, *"Are there meaningfully different sub-groups here — people who want different things, or who you'd serve to different standards?"*
- Walk the agent-stakeholder categories explicitly, every time — this runs unconditionally, whether or not agents are already on the list, not only when they're absent: *"Are agents using this product? Working in this codebase? Integrating with the API? Reading the docs? Likely to start doing any of these soon?"* An agent already named in one category doesn't answer for the others — each gets its own answer.
- Walk the internal-team questions explicitly, every time, for humans and agents both — this isn't gated on whether someone's already on the list in a different capacity (a founder listed as a user hasn't answered it): *"Who's doing the product ownership? Who's doing the development? Who's doing the bug fixing? Who's doing the user support?"* None of the four requires a new stakeholder entry — "that's me, already listed as a user" or "nobody yet" are complete, valid answers to record. What's not valid is skipping the question because someone's already on the list in a different capacity.

Then for future releases, briefly: *"Looking at the roadmap, who will likely matter for [release N+1] who doesn't already? One line per upcoming release is enough — we'll do the depth analysis when that release is closer."*

Use the standard reference categories as a backstop, in case the user is missing whole groups: end users, paying customers, the dev team, ops/support, product/business owners, partners and integrators, regulators, security stakeholders, leadership, investors, the market, society. **Don't read the list at the user.** Use it to spot omissions.

You have explicit permission and encouragement to:

- Dig into anything that sounds like a category rather than a specific group.
- Push back on absent sub-groups when the project clearly serves multiple audiences.
- Probe for stakeholders the user might forget — agents, internal team, design partners, regulators if relevant.

What you must not do:

- Accept "users" as a stakeholder. Push for specificity.
- Skip the sub-group check for any stakeholder. The check itself surfaces important distinctions.
- Skip any agent-stakeholder category (using the product / working in the codebase / integrating / reading the docs) because a different category already has entries. The walk runs unconditionally, every time — each category gets its own answer.
- Accept a person's (or agent's) presence in one capacity as covering another. A founder already listed as a user still needs the developer and product-owner capacities considered separately — see the capacity rule.
- Move on without the four who-does questions (product ownership, development, bug fixing, user support) actively considered for both humans and agents. In early releases they often dominate. Considering is the requirement; a new stakeholder entry is not — but an existing capacity entry elsewhere doesn't substitute for asking either.

## Push back when

- A stakeholder is named by job title alone. *"Who specifically? What do they care about that's different from someone else with that title?"*
- Sub-grouping is dismissed without examination. *"Even if you serve them similarly today, are there sub-groups who'd want different things?"*
- **The category walk (above) comes back genuinely empty across every category — not just one (escalate).** This skill takes the new-world stance: agents are first-class stakeholders unless the user gives a specific reason. Only escalate here once the unconditional per-category walk in "How to ask" has actually been run and every category — using, working in the codebase, integrating, reading the docs — has turned up nothing; only then push harder: accept a no-agent-stakeholders strategy only if the user gives a concrete reason (e.g. an air-gapped scientific instrument with no programmatic interface). Record the reason explicitly and flag it as worth revisiting.
- Future-release stakeholders are absent and the roadmap has multiple releases. *"Looking at the next release on the roadmap, who's likely to matter then who isn't here?"*

## This sub-step is DONE when

- [ ] This release has a stakeholder list with at least 3 named groups (named meaningfully, not by title alone).
- [ ] Each stakeholder has the sub-group check applied — either sub-grouped or with reasoning for why no split is meaningful.
- [ ] Agent stakeholders are documented (default) — with each category (using the product / working in the codebase / integrating / reading the docs) actively walked, not just the first one that turned up an entry — OR the no-agent-stakeholders case is actively confirmed with a specific concrete reason recorded — generic "we don't have any" is not sufficient.
- [ ] Internal stakeholders are documented (or actively excluded with reasoning), **and** the four who-does questions — product ownership, development, bug fixing, user support — have been actively considered for both humans and agents. No new stakeholder entry is required to satisfy this: a recorded "same person, already covered" or "nobody yet — noted" per question is a complete answer. A person's or agent's presence in another capacity (most often *user*) does not by itself satisfy this — see the capacity rule.
- [ ] Future releases on the roadmap each have a one-line note about likely-new stakeholders, or "no notable change."
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 3.2.

## Output

Append to `quality/strategy.md`:

```markdown
## Part 3: Who Matters

### Stakeholders for <release name>

**<Stakeholder group>.** <description that's specific, not categorical>
- Sub-groups: <split, or "considered; no meaningful sub-grouping because …">

**<Next stakeholder>.** <…>

… (repeat per stakeholder)

### Internal-team coverage (who-does questions)

- Product ownership: <a name/capacity, "same person, already covered — see <stakeholder entry>", or "nobody yet — noted">
- Development: <…>
- Bug fixing: <…>
- User support: <…>

(Each answer covers both humans and agents where relevant. No new stakeholder entry is required here — this records that the question was asked, not a forced answer.)

### Future-release stakeholder notes

- **<release N+1>:** <one line on likely-new stakeholders, or "no notable change">
- **<release N+2>:** <…>

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 3.2 (Three-lens analysis)?"*
