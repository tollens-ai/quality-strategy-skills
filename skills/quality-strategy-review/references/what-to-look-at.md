# What to look at

Judge what is there against what the reader needs, not against a complete strategy: a context note
need not hold an assessment, one stakeholder's view need not rank the release, and a later step of
the strategy outside what you were asked to review is not a gap. Keep each stakeholder's view apart
from the others, because a merged view hides whose need it was. Judge a single document only on
what bears on its own job, and say whether your judgment covers a whole strategy or a piece of it.
The [quality basics](../../../references/quality-model.md#what-is-judged-and-for-whom) give the
terms; read the context and profiles where a conclusion depends on them.

Read the parts for the kinds of document under review. Each question here is one that a reader in
the situation you chose would need answered.

**The context and the stakeholders.** Can the reader tell who matters; what each needs from this
release, as concrete levels, or that nobody has said yet and why; and whose account each claim is?
Are the important uncertainties and disagreements visible? Do nested or overlapping groups keep each
member's own view, and is a tool's quality kept apart from the quality of what it produces? The part
on the project should hold whatever about the project, its people and how they work bears on
which quality dimensions matter here, and that usually takes some detail: how maintainable something
must be depends on how work is done and checked, and whether a fix reaches people depends on how a
release reaches them. Judge that part by whether the reasoning behind each priority can be seen to
rest on something it says. Checking whose method is not described does not show that a person used
the product.

**The priorities.** Can the reader tell how good each must be, for whom and why, or that nobody has
said? Does each rating keep the reason that was given for it, and whose it is? A rating given
without a reason has none written, and that is not a gap to report, because a reason supplied
afterwards, or a line saying none was given, says more than the person did. Is the rating kept
apart from what people said about how good it must be, and does each thing said keep whose it is
and what it was about, side by side where they differ, with a risk called accepted only where the
user accepted it? Work back from the parts of the product and from each person's expectations, as
well as forward from the rows, because a need is most easily lost when needs are grouped together,
or when it is set aside as one of the release's non-goals (what the release deliberately does not
aim for). Where it matters, check what the reasoning assumes about people and agents; check that how
good something is is kept apart from how far it is trusted; and check the obligations that come with
the facts (the [quality
model](../../../references/quality-model.md#obligations-that-come-with-the-facts)).

**A priority's section,** read through [the four
questions](../../../references/quality-model.md#four-questions). Do the observations support what
is claimed, for this release and its conditions of use, and does each say how it is known? A way of
finding out that is described has not necessarily been used. A section still mostly questions is
fine if each question that matters ends in a next action, or says plainly that no way of finding
out is chosen yet.

**Open questions,** in the sections or an older strategy's Open section. Can someone coming back find
each one, with why it matters and what would settle it? "Not known" is a fair answer to what would
settle it. Does each accepted risk name who accepted it and what would reopen it? Are conclusions
that rest on a question set aside for now still written as depending on it?

**The next actions.** Can someone see them, why they matter, what they depend on and what would count
as enough? A missing name or missing evidence may be an honest open question; it is a problem only
when it gets in the way of what the actions are for.

**A whole strategy.** Can a reader place a plausible new finding it does not mention, such as a bug
report, and decide what to do? Do the next actions find out what the product does before more people
see it? A polished strategy can leave that out. Then run these checks once, for a whole strategy or
the parts of one you were asked to review:

1. `node "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs" check <strategy.md>
   --quality-dir <folder>`, for what a script can find, such as rows without a section, a section's
   parts missing or out of order, or a link in any record in the folder that does not resolve.
2. `comms-prep` for the strategy itself. Its brief names what the strategy is for and whom it is
   for. As the meaning that must survive, it lists everything in the project context, the profiles
   and the notes that bears on this release, including each stakeholder's own levels.
3. `comms-review` over the strategy, once. Check the meaning first: is anything important from
   those records lost, distorted, reordered or quietly settled? Then check the structure, part by
   part and in order, against [the strategy template](../../../references/strategy-template.md). The
   template is a guide, not a form. A part that is missing, out of order or holds less than the
   template asks for is a finding only where that leaves the strategy's readers worse off, and the
   finding says what they lose. A different structure that serves them as well needs no sentence in
   the document justifying it.

These checks make one round of reporting, even where `comms-review` asks for another after a fail:
what they find goes into your judgment, not into a loop of revising the strategy and checking it
again.

**A revised strategy.** Are conclusions still presented as current after what they rested on
changed? Compare with an earlier version where there is one, matching up priorities by the part of
the product, the quality dimension and the release. Compare conclusions and sources, and judge the
structure against the template, not the earlier layout, because a part the template no longer has is
not a loss. A priority whose stakeholders' accounts were added or changed can still be the same
priority with changed sources: check its conclusions against those sources rather than treating it
as new.