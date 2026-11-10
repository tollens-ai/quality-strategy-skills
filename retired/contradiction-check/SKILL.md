---
name: contradiction-check
description: Find claims in quality documents, or a section, that cannot both be true. Use for a focused consistency check that tells contradictions apart from missing information, uncertainty and stakeholder disagreements.
---

> Retired 9 November 2026. Use `quality-strategy-review`, which reads a document against its records and tells a contradiction apart from missing evidence. This skill's text is kept as it was, for reference.

# Contradiction check

This check finds claims in the quality documents you were given that cannot both be true in the
same situation, because a document whose claims contradict each other cannot be acted on.

Much that looks like a conflict is something else: information that is missing, a question still
open, or stakeholders who want different things. Report those too, but separately from the
contradictions, because each calls for a different response.

**Done when** each contradiction is named with the two claims that cannot both be true and why, so
the user can find both and see what would settle it; differences that can both stand, and questions
the documents leave open, are kept apart from contradictions; and the result says what was checked
and what this check cannot show.

How to talk with the user is in [working on a strategy](../../references/strategy-workspace.md).

## What is in scope

Work from what you were given: text, documents the user names, or a short list of facts about the
situation, each with its source, such as the release, who it is for, and their devices and
conditions of use. Otherwise find the strategy and the records beside it with `node
"$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs" where`, and read the project context and
the profiles its claims rely on. A single section is enough to check. If there is nothing to check,
say what is missing and stop.

A fair comparison compares claims about the same situation, so before comparing, know what each
claim is about:

- **Its source, and whose it is:** the owner's decision, what a stakeholder said, an agent's reading,
  a guess, or what a file says. This check does not test whether a claim is true of the product.
- **Its subject:** the product or part, the kind of quality, whose view it is and the release or
  conditions, because two claims about reliability can be about different things, as [what is
  judged, and for whom](../../references/quality-model.md#what-is-judged-and-for-whom) says. A tool
  and what it produces have separate quality, and two stakeholders with different bars for one
  priority are a difference to keep, not two claims that cannot both hold.
- **Its status:** whether it is current, historical, conditional or a draft, and who said it. A newer profile
  need not match what an earlier release's decisions rested on. The decision log, `decision-log.md`,
  is history: read it only to tell a correction from a contradiction, never as a current claim.

## Compare claims that bear on each other

Compare the claims that the documents tie together:

- stakeholders' goals and the release's bar;
- ratings and their reasons;
- the open questions and any risk the user accepted;
- the bar, what was observed and the gaps claimed;
- the next actions and their assumptions about time, people and budget;
- what the strategy states and the records it rests on. A statement is a finding if it drops what
  its source said about the claim, such as that it was an agent's reading, a guess or an assumption,
  its date, or "not seen by the owner". It is also a finding if it says more than its source does,
  such as calling something absent when the source says only that nobody has checked. This takes
  judgment, not a match of words, so report it and leave the decision about which version is right
  to whoever acts on the report.

When an obligation is involved, read [obligations that come with the
facts](../../references/quality-model.md#obligations-that-come-with-the-facts).

Contradictions look like this: an
observation recorded as below the bar is also said to meet it; a plan is called within budget while
its stated costs add up to more, with no changed assumption.

Sort what you find into four kinds, because each calls for a different response. Sort it even when
the only finding is a gap:

- **Contradiction:** two things said to hold at the same time in the same situation, which cannot.
- **Gap or weakness:** a claim with no evidence, a vague requirement, or a missing later step.
  Something missing contradicts nothing, though it may deserve a wider review, and findings that
  cover only some of the needs do not contradict the priorities.
- **Disagreement or tradeoff:** stakeholders want different things, or the team knowingly turns down
  what a stakeholder wants. Keep each side's account, with any risk
  the user accepted. A stakeholder's Dealbreaker and the owner's Low rating can both stand.
- **Possible contradiction:** scope, timing or wording might reconcile the claims. Say what is
  unclear rather than calling it a contradiction.

Some pairs are easy to sort wrongly. How much something matters, how good it is, how sure we are and
how urgent it is are separate: "High importance, quality unknown" makes sense. Confidence with no
evidence cited is a gap. A claim that something was checked, beside a statement that it never was,
is a possible contradiction. A planned change to how the team works does not contradict how it works
today. Where something a conclusion rests on has changed, a conclusion already said to be out of
date is not a contradiction; one still presented as current is.

## Report and stop

1. If you were also asked to correct the contradictions, do that first: update the claims involved
   and reread them against each other, without restarting the check.
2. Report each conflict once. For each contradiction: a short plain title; the two claims, quoted,
   with where each is; why both cannot be true; and the decision or correction needed. Also list
   each possible contradiction you could not settle, where it matters to the user.
3. Then, separately and briefly, report the disagreements and the important gaps, and say for each
   whether the documents already hold it as an open question. For a disagreement, say why it
   matters and whether the stakeholders may need to talk to each other. Where the documents hold no
   open question for one, suggest one, and add it to the documents only if you were asked to make
   changes.
4. If you found none, say "No contradictions found in the material reviewed" and name what you
   checked, never as a sign that the documents are complete, their claims true or the product good.

When another skill opened this one, give it the findings and go back to it, as [when one skill
opens another](../../references/opening-another-skill.md) says. Otherwise, before handing over a
report the user will read, run `comms-prep`, its brief saying what the report is for, and
`comms-review` on the draft where the harness offers them, and deal with what it finds. Give the
result in the conversation, save it only if asked, and stop. If a wider judgment of the quality work
is within what the user asked for, open `quality-strategy-review`.
