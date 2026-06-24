# Worker report — QSS skill-content polish via Effective Comms

**Date:** 2026-06-24
**Branch:** `feature/effective-comms-qss-integration`
**Repo:** `/workspace/quality-strategy-skills`

## Objective

Polish the QSS skill contents (`skills/*/SKILL.md`) using Effective Comms as an
actual pass, with the **audience set to the agent about to run each skill mid-task**.
The bar for each file: that running agent can quickly know *when to use* the skill,
*what to do*, *what hard checks / stop gates must pass*, *the output/stop contract*,
and *what not to shortcut* — with as little author/maintainer-facing gunk in the way
as possible. A separate validation run will follow; no full validation suite was run here.

## Method — ECS brief applied to the skill files

- **Objective:** each `SKILL.md` serves the running agent, fast, without burying
  instructions/checks under rationale it does not need.
- **Audience:** a capable agent that has loaded the skill mid-task. It already knows it
  is an agent with tools and general engineering judgment; it does **not** need the skill's
  development history, dogfood provenance, internal run-codes, or maintainer growth process.
  It **does** need triggers, procedure, checks, gates, the stop contract, and pitfalls.
- **Dominant failure modes found (ECS C4/C5/C6):** author/maintainer-facing content mixed
  into runner-facing instructions — development provenance ("an alpha tester said…",
  "in observed runs in June 2026…"), internal run-codes ("the kp3136 check",
  "the phantom-scratch fix"), maintenance-history asides ("the leg previously had no
  backstop for…"), and maintainer-only sections (how the skill grows, dogfood log).
  None of these change what the running agent should *do*; they tax the read.

The QSS skills are mature and battle-tested, and the framework's rigour lives in the
substance of its checks. The pass was therefore deliberately **surgical**: remove
author/maintainer gunk and tighten wording, **without touching any check, gate,
behavioral instruction, integration point, or public-facing safe copy.** Larger
structural moves that would need a product decision are recorded as recommendations
below rather than actioned (per the goal's instruction).

## Files changed (4 of 12)

| File | Before | After | Change |
|---|---|---|---|
| `skills/effective-comms/SKILL.md` | 128 | 109 | −19 lines |
| `skills/quality-strategy/SKILL.md` | 386 | 386 | in-place wording (3 provenance trims) |
| `skills/quality-strategy-review/SKILL.md` | 350 | 350 | in-place wording (2 trims) |
| `skills/test-strategy-review/SKILL.md` | 335 | 335 | in-place wording (1 trim) |

The other 8 skill files (`test-strategy`, `tooling-strategy`, `oracle-adequacy`,
`tooling-adequacy`, `contradiction-check`, `operational-distillation`,
`strategy-variants`, `quality-artefacts`) were reviewed and left unchanged — see
"Reviewed, left as-is" below.

### `effective-comms/SKILL.md` (the gate; −19 lines)

This is the gate every producer skill invokes, and it carried the most maintainer-facing
weight. For the running agent doing a comms pass, the development framing is pure noise.

- **Intro compressed.** Collapsed the "internal-dogfood v0 / living checklist" framing
  into one operational sentence (prepare→review→revise; product-neutral; checks judgment,
  not prose), and kept the QSS-integration sentence so the running agent still knows how
  the skill is wired into the pack.
- **Removed the "The update loop — how this skill grows" section** (maintainer process for
  adding new rubric rows) — replaced with a one-line "to extend, append a new row; don't
  redesign" that preserves the operative instruction.
- **Removed the "Dogfood log"** (a dated record of a fixture run) — zero value to a running
  agent.
- **Compressed "Roadmap — not in v0"** to a single "Not yet in this version" line, keeping
  the not-yet-built claims as plan, not behavior.

Preserved intact: all three phases, the full **C1–C8** rubric (no renumber/merge — other
skills reference "C1–C8"), the path-resolution section, the auditable stop/output contract,
and the QSS-as-gate integration statement.

### `quality-strategy/SKILL.md` (3 provenance trims, no line-count change)

- Replaced the alpha-tester quote (*"feels heavy for vibecoders"*) with the substance:
  the demand can feel heavy to a user who just wants to ship.
- Dropped an internal tracking pointer (*"…tracked as later work — see OPEN-QUESTIONS"*)
  while keeping the rule it sat beside ("this is the central anti-shortcut principle").
- Replaced dated run provenance (*"in the pack's own observed runs — an
  anchored-versus-blind planning comparison in June 2026…"*) with the operative reason the
  running agent needs: anchored analysis plans *around* the defects blind passes find.
- Lightly de-provenanced the presentation-cleanup anti-pattern example (kept the vivid
  "narrating *presentation-cleanup pass… clean*" illustration; dropped the "in testing"
  framing).

### `quality-strategy-review/SKILL.md` (2 trims)

- Check 4a: replaced the internal run-code label ("This is the kp3136 check") with a plain
  description of the failure it catches (a sweep that produced no security dimension on a
  project whose headline risk was forgeable client-writable data). The instructive example
  is kept; only the internal code is gone.
- Check 20: replaced the internal label ("This is the phantom-scratch fix") with the
  operative rule stated plainly — a green check must be backed by a real directory listing.

### `test-strategy-review/SKILL.md` (1 trim)

- Check 15(iv): replaced a maintenance-history aside ("This is the exact leak the
  test-strategy leg previously had no backstop for") with a direct statement of what the
  pattern catches.

## Reviewed, left as-is (with reason)

- **`test-strategy`, `tooling-strategy`** — already lean and operational; their rationale
  (e.g. "building oracles is the highest-value early work", "honest about uncertainty")
  is runner-facing context that helps the agent take the work seriously, not gunk.
- **`oracle-adequacy`, `tooling-adequacy`, `contradiction-check`,
  `operational-distillation`, `strategy-variants`** — clean When-to-use / work-in-order /
  push-back / DONE / Output structure; the "why this skill exists / failure modes" framing
  is load-bearing for the runner. No author-facing gunk worth the edit risk.
- **`quality-artefacts`** — dense, but its many `(instance from review — FAIL: … PASS: …)`
  exemplars are concrete teaching for the running agent (each encodes a real principle
  pass/fail). Trimming them would remove instructional value, not gunk. Left intact.

## Recommendations (left unactioned — need a product/maintenance decision)

1. **Reconcile the bundled `effective-comms` copy with the canonical ECS.** The canonical
   reference (`/workspace/effective-comms-skills/skills/effective-comms/SKILL.md`) is
   tighter and more operational: it merges the rubric to **C1–C7**, adds an explicit
   *non-interactive vs live* rule, makes Phase 3 a **mandatory loop-until-pass with fail
   conditions**, and has a sharper "Boundaries & friction" section. The QSS copy is the
   older 8-check structure. Converging them is high-value but is a real change to the gate's
   semantics **and** to the rubric numbering that QSS review-skill checks reference
   ("C1–C8"); it should be a deliberate, coordinated change, not folded into a copy-edit.
2. **De-duplicate the path-resolution boilerplate.** ~6 near-identical lines appear in all
   12 files. Extracting to a shared reference would cut noise, but that is a packaging/
   architecture change (explicitly out of scope here).
3. **Consolidate the presentation-cleanup explanation in `quality-strategy`.** The concept
   is taught in four places (the dispatch/scratch section, step-boundary item 0b, the full
   "Presentation cleanup at review points" section, and revision-mode inherited-content
   cleanup). Each hooks a distinct trigger point, so consolidation risks dropping a trigger;
   worth a careful pass but not a safe copy-edit.
4. **Frontmatter `description` length** (notably `quality-artefacts`) is long. It is the
   selection trigger an agent reads first; tightening could sharpen when-to-use, but
   descriptions were left untouched to avoid any risk to skill selection/functionality.

## Verification

- `plugin.json` parses — **OK**.
- All 12 `skills/*/SKILL.md` retain valid frontmatter `name` + `description` — **OK** (all 12).
- `/effective-comms` integration preserved — invocation counts in the **consuming** skills
  unchanged from baseline: `quality-strategy` 5, `quality-strategy-review` 1,
  `tooling-strategy` 1, `test-strategy` 2, `test-strategy-review` 2. The only count change
  is `effective-comms` describing itself (8→6, from the removed maintainer sections); **no
  QSS invocation or requirement was weakened, and no overclaim was introduced.**
- Public-surface leak scan (`Qing`, `Tom`, `TOL-`, `/home/qing`, `Hermes`, `Applejack`,
  `Discord`, `Linear` tool, internal repo paths, `mailto`, `[at]`, `[dot]`, internal
  run-codes like `kp###`) — **CLEAN**. (The earlier "linear" hit was the word "single
  linear flow", not the tool; the internal `kp3136` run-code was removed by this pass.)
- `git diff --check` — **OK** (no whitespace errors).

## Summary

A conservative, ECS-driven polish that removes author/maintainer-facing gunk
(development provenance, internal run-codes, maintenance history, and the maintainer
growth/dogfood sections of the gate skill) and tightens wording for the running-agent
audience, while preserving every check, gate, behavioral instruction, the `/effective-comms`
integration, and all public-facing safe copy. Four files changed; `effective-comms` is
19 lines lighter; the other three changes are in-place rewordings. Larger structural moves
that would change gate semantics or packaging are recorded as recommendations for a
product decision rather than actioned.

QSS_ECS_SKILL_POLISH_DONE
Status: PASS
Commit: the polish commit at HEAD of `feature/effective-comms-qss-integration` (this commit; `git log -1`)
Report: /workspace/quality-strategy-skills/WORKER-REPORT-qss-ecs-skill-polish.md
