---
name: progress-story
description: Create a self-contained before-and-after visual from two identified versions of quality strategy records. Use when someone wants to see what changed and what the evidence supports, without mistaking changed wording, requirements, confidence or scope for a better product.
---

> Retired: no longer part of the pack. To see what changed between two saved strategies, ask your agent to compare them; no skill does this in 0.5.0. Its text is kept as it was, for reference: some pack files it links to no longer exist.

# Progress story

**Goal.** Help the reader see what changed between two versions of the strategy, and the evidence
for each change.

**Done when.** The story names both versions, compares like with like, and tells a change in the
product apart from changes in knowledge, requirements and presentation.

## 1. Pin down the two versions

**Goal.** Identify the two versions, and the context each rests on, so the reader can trust the
comparison.

**Done when.** The two versions can fairly be compared. The reader can tell progress from a change
in scope, and can see where missing history limits the comparison.

Prepare as the [shared guidance](../../references/strategy-workspace.md) describes, using
the records the user names; the current version defaults to `QUALITY_DIR/strategy.md`, with its
notes ([where the documents live](../../references/document-home.md)). When they name no earlier
version, look for a dated copy under `QUALITY_DIR/archive/` or an earlier commit of the strategy,
where [revisions](../../references/revisions.md) keeps them, and tell the user which you mean to
use. For each
version, note a readable label and an exact identity: repository path and commit or blob, or file
path and content hash. Read exactly those contents. If a version can't be found, tell the user which
and ask where it is; don't make up a "before".

Check that both versions belong to the same project and line of strategy work. A comparison across
releases is fine when the story says the scope changed. Identical versions show that nothing
recorded changed; that alone doesn't show the product stayed the same.

Use the records each version rested on at the time. For a claim that matters from a linked profile
or context document, find its version from then, or say it isn't available; today's profile can't
quietly stand in for the earlier one.

## 2. Compare the claims

**Goal.** Sort what changed in the product from what changed in what the team knows or requires, and
from what was only written differently.

**Done when.** Each comparison shown rests on the two versions. Where one version has no matching
claim, or the evidence is uncertain, the comparison says so.

Match priorities rows by what they are, not by position or kind of quality alone: the same reference
where there is one, and the same part of the product, kind of quality, stakeholder and release. A
change in how stakeholders are grouped, or in how they relate to the product, doesn't by itself
change their goals or the product's quality. For each comparison that matters, note the earlier and
later passages, their evidence and how sure each is, the kind of change, and why it matters.

Keep apart how good the product is, its importance, the evidence, how sure we are, what is required,
the order of work, the wording and the scope, as the
[quality model](../../references/quality-model.md) describes:

- A changed bar or profile changes what is required, not the product.
- Added or removed rows change the scope, unless evidence shows otherwise.
- A new way to check something changes how we'd know, without showing the product got better.
- When both the bar and the evidence changed on one row, judge each version against its own bar,
  and compare the observations directly only when they were made the same way under the same
  conditions; otherwise say they can't be compared.
- An Unknown that later has evidence is something learned, not proof the product changed.
- Keep questions still open or not yet assessed.

For something added or removed, say which records it comes from and that the other version records
nothing matching; a claim missing from one version says nothing about the product.

Older versions may use earlier names and layouts, which the quality model lists, or rate High,
Medium and None with no Low. Describe them in today's words, and report such a difference as a
change in how the records are written, not a new rating or a changed risk, unless the records say
the strategy owner re-rated it.

## 3. Build the visual story

**Goal.** Help the reader understand the most important change, or lack of change, that the two
versions support.

**Done when.** The reader can see the earlier state, the later state, and why the difference, or the
lack of one, matters. The limits of the evidence stay visible.

Run `/comms-prep` before you draft the story, and `/comms-review` on the finished draft before you
hand it over.

The comparison has already settled what to show, so ask nothing about that, and on the first
screen name both versions and what the comparison covers. With that
settled, design it with the [visual report guide](../../skills/quality-report/references/visual-report.md),
using the two versions and your comparison notes as its source. Cite the source passage beside
each comparison that matters. Show anything that got worse, and what is still unknown, as clearly
as any improvement. A narrow comparison is fine when its limits are visible.

This story is a report made without the report skill, so follow that skill's [rule for a reader
outside the agreed readers](../../skills/quality-report/SKILL.md#1-find-the-records-and-the-reader) before you
make it, its [rules for every report](../../skills/quality-report/SKILL.md#2-make-the-report) and its [note of
where a saved file came from](../../skills/quality-report/SKILL.md#3-save-and-hand-back), including that it
says a person reviewed it only if one did.

Save the HTML or SVG file where the user agreed, or by default at
`QUALITY_DIR/artefacts/<slug>.html` or `.svg`. Its note on where it came from gives both versions'
exact identities.

## 4. Check it and hand it over

**Goal.** Make sure the finished story claims only what the two versions support.

**Done when.** The file is readable. Any claim that the product got better rests on evidence about
the product itself, and every other change is described as what its evidence shows.

Compare the finished claims and citations with both versions, especially any claim that the product
got better. Render and look at it as the visual report guide describes, including what to tell the
user if you can't, and fix what you find. If a source file changed while you worked, keep a copy of
the version you compared, with its identity. In conversation too, say when a judgment about the plan
is your own view, such as whether a smaller scope fits the time.

When the records have a home, start your closing message with what the later records show is
waiting on the user, as the
[guidance on handing back](../../references/stopping-and-returning.md) describes. Then give the
file's path, the two versions, what the comparison covers and its main limits, and stop.
