# Sub-step 3.1 — Identify stakeholders for the first release

## Goal

Identify who matters for the **first release** — the specific people, roles, and agents whose perspective on quality counts. Stakeholders drive everything that follows: dimensions are rated against what they value; risk is assessed relative to their needs; the plan of work serves their priorities.

This skill's depth analysis is for the first release only (see SKILL.md → "Scope of this skill"). Stakeholders for future releases are noted briefly so the strategy isn't blind to what's coming, but the three-lens depth analysis happens only for the immediate release.

## What you need from the previous sub-step

Read Parts 1 and 2 from `quality/strategy.md`. Read the **Docs and metadata** and **Discrepancies** sections of `quality/pre-read.md` for any stakeholder mentions.

## What to cover

By the end of this sub-step the strategy doc must capture:

1. **The stakeholders who matter for the first release** — not just job categories ("users") but specific groups ("vibecoders running side projects on Mac/Linux who write mostly AI-generated code").
2. **For each stakeholder, the sub-group split** — has the user actively considered whether there are meaningfully different sub-groups under this label? "Considered, no meaningful split" is a valid answer; "didn't think about it" is not.
3. **Agent stakeholders — mandatory by default.** This skill takes the new-world stance: agent stakeholders are the default, not the exception. Every project is assumed to have at least one agent stakeholder (agents using the product, agents working on the codebase, agents integrating with the API, or agents reading the docs) unless the user can articulate a specific reason why not. If they claim none, push back — see "Push back when" below.
4. **Internal stakeholders** — the team itself, especially in early releases when external feedback loops aren't established yet.
5. **Future-release stakeholder notes** — one line per future release on the roadmap, naming who will likely matter then who doesn't yet (e.g. "Beta will add design partners and small enterprise pilots"). Just enough so the first-release strategy doesn't accidentally close off paths to future stakeholders. Don't run the depth analysis for them.

## How to ask

The prompts below are examples of *intent*, not lines to recite — say them in your own words, fitted to the user (see SKILL.md → "Phrasing — adapt, don't recite"). What's fixed is what each question has to surface; the wording is yours.

Surface what the pre-read suggested first — e.g. *"From the docs the audience looks like X — is that close to right for the alpha?"*

For the first release:

- Ask cold: *"Who matters for this release? Don't filter — name everyone whose perspective counts, however indirectly."*
- Apply the sub-group heuristic: for each stakeholder named, *"Are there meaningfully different sub-groups here who care about different things or whom you serve to different levels?"*
- Apply the agent-stakeholder check: *"Are any of these agents, not humans? Do you have agents using the product or working in the codebase?"*
- Probe for internal stakeholders: *"What about the team itself? Different things matter when the team is the user."*

Then for future releases, briefly: *"Looking at the roadmap, who will likely matter for [release N+1] who doesn't already? One line per upcoming release is enough — we'll do the depth analysis when that release is closer."*

Use the standard reference categories as a backstop, in case the user is missing whole groups: end users, paying customers, the dev team, ops/support, product/business owners, partners and integrators, regulators, security stakeholders, leadership, investors, the market, society. **Don't read the list at the user.** Use it to spot omissions.

You have explicit permission and encouragement to:

- Dig into anything that sounds like a category rather than a specific group.
- Push back on absent sub-groups when the project clearly serves multiple audiences.
- Probe for stakeholders the user might forget — agents, internal team, design partners, regulators if relevant.

What you must not do:

- Accept "users" as a stakeholder. Push for specificity.
- Skip the sub-group check for any stakeholder. The check itself surfaces important distinctions.
- Skip the agent-stakeholder question if the project clearly involves agents.
- Move on without internal stakeholders considered. In early releases they often dominate.

## Push back when

- A stakeholder is named by job title alone. *"Who specifically? What do they care about that's different from someone else with that title?"*
- Sub-grouping is dismissed without examination. *"Even if you serve them similarly today, are there sub-groups who'd want different things?"*
- **Agents are absent from the stakeholder list (default state to push against).** This skill takes the new-world stance: agents are first-class stakeholders unless the user gives a specific reason. Walk through each agent-stakeholder category explicitly: *"Are agents using this product? Working in this codebase? Integrating with the API? Reading the docs? Likely to start doing any of these soon?"* Only accept a no-agent-stakeholders strategy if the user gives a concrete reason (e.g. an air-gapped scientific instrument with no programmatic interface). Record the reason explicitly and flag it as worth revisiting.
- Future-release stakeholders are absent and the roadmap has multiple releases. *"Looking at the next release on the roadmap, who's likely to matter then who isn't here?"*

## This sub-step is DONE when

- [ ] The first release has a stakeholder list with at least 3 named groups (named meaningfully, not by title alone).
- [ ] Each stakeholder has the sub-group check applied — either sub-grouped or with reasoning for why no split is meaningful.
- [ ] Agent stakeholders are documented (default), OR the no-agent-stakeholders case is actively confirmed with a specific concrete reason recorded — generic "we don't have any" is not sufficient.
- [ ] Internal stakeholders are documented (or actively excluded with reasoning).
- [ ] Future releases on the roadmap each have a one-line note about likely-new stakeholders, or "no notable change."
- [ ] Any deferred items are recorded as `OPEN QUESTION:`.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 3.2.

## Output

Append to `quality/strategy.md`:

```markdown
## Part 3: Who Matters

### Stakeholders for <first release name>

**<Stakeholder group>.** <description that's specific, not categorical>
- Sub-groups: <split, or "considered; no meaningful sub-grouping because …">

**<Next stakeholder>.** <…>

… (repeat per stakeholder)

### Future-release stakeholder notes

- **<release N+1>:** <one line on likely-new stakeholders, or "no notable change">
- **<release N+2>:** <…>

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back in 3–5 lines and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 3.2 (Three-lens analysis)?"*
