# Sub-step 1.2 — Team

## Goal

Capture who is working on this project, what they bring, and what their roles are. Includes agent team members where relevant.

## What you need from the previous sub-step

Read the **Docs and metadata** and **Code structure** sections of `quality/pre-read.md`. The digest may have surfaced a team hypothesis from commit history, AUTHORS files, README mentions, or agent-collaboration markers. Read sub-step 1.1's output in `quality/strategy.md` for context on what the project is.

## What to cover

By the end of this sub-step the strategy doc must capture:

1. **Who is on the team** — names if small, structure if larger.
2. **Roles and what each person or group brings** — not just titles; what they actually do day-to-day.
3. **Whether roles are settled or in flux.**
4. **Agent team members** — any AI agents that are a meaningful part of how work gets done. What they do; what they're known to be good or bad at on this project.
5. **How they work together** — collaboration texture, distinct from roles: who decides, who reviews whom, how the working relationship actually runs day to day, between the humans and between humans and agents. Roles say what each person or agent brings; this says how they actually operate together. Both are required — one doesn't substitute for the other.

## How to ask

Phrasing is yours. Surface the pre-read's team hypothesis first if there is one: *"From the commit history this looks like X is the main contributor — is that right?"*

For how they work together, ask it as its own question, separate from roles: *"Beyond what each person or agent brings — how do you actually work together day to day? Who decides, who reviews whom, how does the relationship run?"* A description of what's delegated (e.g. "Claude helps me code") answers a different question — push past it to who decides and who reviews whom.

You have explicit permission and encouragement to:

- Dig into anything interesting or under-specified.
- Ask "what does that person actually do?" if a role is given as a title.
- Skip ahead briefly if the user volunteers something useful for later, then circle back.

What you must not do:

- Move on until all five items are captured (or flagged as `OPEN QUESTION`).
- Accept a list of titles without responsibilities. The role *as practised* matters.
- Forget to ask about agents if the pre-read showed agent-collaboration markers (`CLAUDE.md`, `.claude/`, `AGENTS.md`, agent-style commits) and the user hasn't mentioned them.
- Accept a description of what work is delegated (e.g. "Claude helps me code") as satisfying how-they-work-together. Delegation says what; this item needs who decides, who reviews whom, how the relationship runs day to day.

## Push back when

- Roles are described in terms of seniority alone. *"What does this person actually do day-to-day?"*
- The team is described as static when the pre-read shows recent contributor changes. *"Has the team changed recently?"*
- Agents are present in the project but not mentioned in the team description. *"I see signs of AI agents in the project. Are they part of how this gets built? If so, what do they do?"*
- "We're a small team" without naming people in a project that clearly has named contributors. Push for names.
- How-they-work-together is answered with what's delegated, not how the relationship runs. *"That's what gets handed off — who actually decides, and who reviews whose work?"*

## This sub-step is DONE when

- [ ] Team members are documented (named if small, structured if larger).
- [ ] Roles include what each person actually does, not just job titles.
- [ ] Whether roles are settled or in flux is captured.
- [ ] Agent team members are documented or explicitly noted as not present.
- [ ] How they work together is captured — who decides, who reviews whom, how the relationship runs day to day, between the humans and between humans and agents — distinct from and in addition to roles; a description of delegated work alone does not satisfy this.
- [ ] Any deferred items are recorded as `OPEN QUESTION:` lines.
- [ ] Pre-read sources are cited in the section's evidence field — naming actual files referenced, or, for an interview-derived / no-repo pre-read, citing the interview honestly (never blank, never a placeholder).
- [ ] The user has been given a 2–4 line wrap-up, asked if any quick concerns, and confirmed ready to continue. (Substantive checkpoint runs at step boundaries — see SKILL.md.)

If any check fails, return to the questioning. Do not move to sub-step 1.3.

## Output

Append to `quality/strategy.md` under Part 1 (Context):

```markdown
### The team

<list of people, named or structured, with roles-as-practised>

<agent team members, if any, with what they do and known strengths/weaknesses>

<note on whether roles are settled or in flux>

<how they work together — who decides, who reviews whom, how the relationship runs day to day, between the humans and between humans and agents>

**Sources consulted from pre-read:** <bullet list>

**Assumptions made:** <bullet list, or "none">

**Open questions from this sub-step:** <bullet list, or "none">
```

Once written, summarise back to the user in 3–5 lines and ask the user (light wrap-up only — the substantive checkpoint runs at the step boundary, see SKILL.md): *"Ready to move on to sub-step 1.3 (Workflows)?"*
