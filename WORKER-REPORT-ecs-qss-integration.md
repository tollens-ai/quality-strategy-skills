# Worker report — ECS v0 + QSS integration

> **Superseded (2026-06-24, architecture change).** This report describes the original slice in which Effective Comms was *bundled* inside the `quality-strategy` plugin (`skills/effective-comms/`). That is no longer the architecture: Effective Comms is now the standalone public `effective-comms` plugin, declared as a `quality-strategy` dependency and installed automatically from the `tollens` marketplace — there is one canonical ECS copy, in the ECS repo. The "no separate install / ECS is bundled" statements below are kept as a record of the earlier work and no longer reflect the current design. See `WORKER-REPORT-qss-ecs-dependency-migration.md`.

Date: 2026-06-24
Owner/reviewer: Applejack / Qing
Spec: `qings-vault/outputs/claude-handoffs/ecs-qss-integration-2026-06-24.md`
Status: **PASS**

> Environment note: the spec paths are written as `/home/qing/projects/...`. This run executed in the dev-pool environment where that tree is mounted at `/workspace/...` (same files; `/home/qing/projects` and `/workspace` list identically). All paths below are given in the spec's `/home/qing/projects/...` form; substitute `/workspace/...` for the dev-pool checkout.

## 1. Summary — what changed

Built the first internal-dogfood slice of **Effective Comms Skills (ECS)** as a single concrete skill inside the QSS plugin, and hooked it into QSS so user-facing outputs run an Effective Comms pass before they are considered done.

- **New skill `/effective-comms`** (`skills/effective-comms/SKILL.md`): a product-neutral prepare→review→revise pass over an agent-written user-facing output. It writes a communications brief (objective / audience / six-cell knowledge model / evidence+uncertainty / form factor), reviews the draft against an 8-check self-review rubric (C1–C8), and runs an audience-perspective review (fresh subagent standing in for the reader where available, else an explicit separate pass). It is a *living checklist* with an explicit update loop, and carries a dogfood log.
- **Real integration, not dead documentation:** the three producing skills now invoke `/effective-comms` at their finalization step, and the two review skills gained an Effective Comms backstop check.
- **No separate install:** ECS is bundled inside the existing `quality-strategy` plugin tree (`skills/effective-comms/`). QSS does not require any external ECS package on this branch.
- **No version bump / no public release:** changes recorded under an `[Unreleased]` CHANGELOG heading; `.claude-plugin/plugin.json` left at `0.3.6`. Nothing pushed or published.

The three feedback-derived failures the slice targets — numbered references without meaning (TOL-168), hidden scratch-context assumptions (TOL-170), retained rejected ideas (TOL-171) — are each a named rubric check and a regression case. TOL-172 and TOL-173 are **not** addressed and no claim is made that ECS solves them.

## 2. Branch / commits

| Repo | Branch | Commit |
|---|---|---|
| `quality-strategy-skills` (primary) | `feature/effective-comms-qss-integration` (from `main` @ `c6e6e79`) | see "Primary repo commit" in the final marker below (this report is included in that commit) |
| `quality-strategy-skills-internal-testing` (validation) | `main` | `8758208f5e65f2338c34392c40cbffa392712120` |

The primary repo's pre-existing local branch `dealbreaker-recurrence-tolerance` was preserved (untouched); the feature branch was cut fresh from `main`.

## 3. Files changed — grouped by repo

### `quality-strategy-skills` (primary)

- **Added** `skills/effective-comms/SKILL.md` — the ECS v0 skill.
- **Modified** `skills/quality-strategy/SKILL.md` — final step (and the skip-Step-7 closing moves, and the 7.3 sub-step table) now invoke `/effective-comms`.
- **Modified** `skills/test-strategy/SKILL.md` — new "Final step: Effective Comms pass" before Output.
- **Modified** `skills/tooling-strategy/SKILL.md` — new DONE-checklist item requiring the Effective Comms pass.
- **Modified** `skills/quality-strategy-review/SKILL.md` — new mechanical check 23 (Effective Comms backstop: numbered-references / coordinate-before-name / retained-rejected-ideas).
- **Modified** `skills/test-strategy-review/SKILL.md` — new mechanical check 16 (Effective Comms backstop: numbered-references / coordinate-before-name / buried recommendation).
- **Modified** `docs/SKILLS.md` — ECS added to the sub-skills table; count updated to twelve.
- **Modified** `README.md` — `/effective-comms` node added to the skill diagram with dotted gates from the three producers.
- **Modified** `CHANGELOG.md` — `[Unreleased]` internal-dogfood entry.
- **Added** `WORKER-REPORT-ecs-qss-integration.md` — this report.

### `quality-strategy-skills-internal-testing` (validation)

- **Modified** `regression/effective-comms.md` — EC-1/EC-2/EC-3 wired to `/effective-comms` rubric checks C1–C4, plus implementation-status note and run pointer.
- **Added** `runs/2026-06-24-ecs-qss-dogfood/fixture/before-after.md` — the before/after dogfood fixture.
- **Added** `runs/2026-06-24-ecs-qss-dogfood/RESULTS.md` — the dogfood run record (PASS/FAIL per case).

## 4. QSS integration points — exactly where QSS now calls/uses ECS

The integration contract from the spec ("before finalizing a user-facing report/strategy/review output, run the Effective Comms pass… if a check fails, revise before finalizing") is realized at these five points:

1. `skills/quality-strategy/SKILL.md` → **"Final step: distill, then review"**, new closing move 3: *invoke `/effective-comms` on the produced doc; the strategy is not done until it and the review pass.* Mirrored in the skip-Step-7 path and the 7.3 sub-step table so both routes hit it.
2. `skills/test-strategy/SKILL.md` → **"Final step: Effective Comms pass"** (new section before `## Output`).
3. `skills/tooling-strategy/SKILL.md` → **"This skill is DONE when"** checklist gains an Effective Comms item.
4. `skills/quality-strategy-review/SKILL.md` → **subagent A mechanical check 23** (Effective Comms backstop).
5. `skills/test-strategy-review/SKILL.md` → **subagent B mechanical check 16** (Effective Comms backstop).

Points 1–3 are *active invocations* (the producer runs the pass); points 4–5 are *audit backstops* (the reviewer flags the reader-facing failure modes the existing process-note-leak scans — check 21 / check 15 — don't reach). ECS is not over-plumbed into every sub-step: the final visible artifacts are the protected surface.

## 5. Install / dependency check

| Check | Command | Result |
|---|---|---|
| Plugin manifest is valid JSON | `python3 -c "import json; json.load(open('.claude-plugin/plugin.json'))"` | **PASS** — `name=quality-strategy version=0.3.6` |
| Every skill dir has a SKILL.md with `name`+`description` frontmatter | awk scan over `skills/*/SKILL.md` | **PASS** — all 12 skills incl. `effective-comms` |
| Skill description within Claude Code limit | length scan | **PASS** — `effective-comms` 556 chars (others 252–788) |
| ECS needs no external install | `grep` for external-install language; directory check | **PASS** — ECS lives at `skills/effective-comms/` inside the same plugin; no separate package |
| Integration is live (not dead docs) | `grep -rln "/effective-comms" skills/` | **PASS** — referenced in 5 skill files (the 5 integration points above) |

**Limitation:** Claude Code's actual plugin *installer* (`claude plugin install`) was not run — there is no plugin registry/installer available in this environment, and the repo ships no build/test/lint script (confirmed: no `Makefile`, `package.json`, `*.sh`, or test runner). The closest concrete checks (manifest validity, frontmatter validity for all skills, description-length limit, bundled-not-external dependency, live cross-references) were run and pass. Because ECS is a plain skill directory inside an already-installable plugin, it loads by the same mechanism as the existing eleven skills; no new install machinery is introduced.

## 6. Validation / dogfood results

**Method:** spec dogfood option 3 — a narrow before/after fixture with the ECS review logic run over it — strengthened by exercising ECS's own Phase-3 audience-perspective mechanism: a **fresh sealed subagent** stood in for the target reader (a design partner with no scratchpad access and no knowledge of the internal numbering) and applied rubric checks C1–C4 to all six snippets. The judge was **not** shown the fixture's answer key and reasoned independently.

**Inputs:** `runs/2026-06-24-ecs-qss-dogfood/fixture/before-after.md` (three before/after pairs). **Record:** `runs/2026-06-24-ecs-qss-dogfood/RESULTS.md`.

| Case | Maps to | TOL | BEFORE correctly flagged | AFTER correctly clean | Verdict |
|---|---|---|---|---|---|
| EC-1 numbered references carry meaning | rubric C1+C4 | TOL-168 | Yes (bare "Oracle 2 / Dimension 3 / Part 7") | Yes (coordinates named in plain English) | **PASS** |
| EC-2 no hidden scratch context | rubric C2 | TOL-170 | Yes ("as decided in scratch") | Yes (decision+reason at reader's level; assumption flagged) | **PASS** |
| EC-3 omit rejected ideas | rubric C3 | TOL-171 | Yes (struck-through rejected options retained in current plan) | Yes (rejected options removed; named Part 4 pointer for provenance) | **PASS** |

All three PASS. The judge found no residual problem in any AFTER snippet.

**On the "user-feedback → regression" mechanism (spec §QSS regression tests):** the established mechanism is the internal-testing **delight-regression suite** (`regression/`, whose README states *"every feedback-driven behaviour change leaves a permanent test case here"*) plus the `feedback/` folder — cases recorded in words with `judge`/`mechanical`/`simulated-user` check kinds, added by hand in the same change, run on Qing's cadence. There is **no automated "generate tests on the fly" mechanism**. The Effective Comms suite (`regression/effective-comms.md`) already existed (commit `299fdd7`) with EC-1/EC-2/EC-3 mapped to TOL-168/170/171; this run **used and refined** that suite — wiring each case to a concrete `/effective-comms` rubric check so a regression run has something executable to judge against — rather than inventing a parallel mechanism.

## 7. Known limitations / not done

- **Public packaging not done** (intentional): no standalone ECS repo/zip, no `metadata.yaml` / `depends:` declaration, no `*-with-deps` bundle, no version bump, nothing pushed or published. ECS is bundled-in for this slice.
- **Multiple-audience staged passes** not implemented — stated as roadmap in the skill, CHANGELOG, and README only.
- **Artifact-specific ECS leaves** (`write-handoff`, `polish-technical-report`, …) not built — deferred until dogfooding justifies them.
- **Dogfood is fixture-level (option 3), not a full live `/quality-strategy` run (option 1).** A full simulated-user end-to-end run with ECS in the loop is a multi-hour job (see `regression/harness.md` HA-next) and was out of scope. Snippets are representative hand-built excerpts, not captured fresh generation; single judge, single pass.
- **No live plugin-installer run** — see §5 limitation.
- `/quality-artefacts` and `/strategy-variants` (the other user-facing producers) were **not** wired to ECS in this slice — kept to the minimum-useful surface (the three strategy producers + two reviews). Noted as a follow-up.

## 8. Verification commands for Applejack

From the primary repo (`/home/qing/projects/quality-strategy-skills`, branch `feature/effective-comms-qss-integration`):

```bash
# The new skill exists and is well-formed
cat skills/effective-comms/SKILL.md | head -5
python3 -c "import json,sys; d=json.load(open('.claude-plugin/plugin.json')); print('plugin', d['name'], d['version'])"

# Integration is live (5 hits) — ECS is invoked, not dead docs
grep -rln "/effective-comms" skills/

# Every skill still has valid name+description frontmatter (12 skills)
for f in skills/*/SKILL.md; do awk 'NR==1&&/^---/{f=1} f&&/^name:/{print FILENAME": "$0; exit}' "$f"; done

# See exactly what changed vs main
git diff --stat main
git log --oneline -1

# Read the integration points
sed -n '/## Final step: distill, then review/,/Once it passes/p' skills/quality-strategy/SKILL.md
grep -n "Effective Comms" skills/test-strategy/SKILL.md skills/tooling-strategy/SKILL.md \
     skills/quality-strategy-review/SKILL.md skills/test-strategy-review/SKILL.md
```

From the validation repo (`/home/qing/projects/quality-strategy-skills-internal-testing`, branch `main`):

```bash
git show --stat 8758208
cat runs/2026-06-24-ecs-qss-dogfood/RESULTS.md
sed -n '1,12p' regression/effective-comms.md
```

To re-run the dogfood judgment: dispatch a fresh subagent over `runs/2026-06-24-ecs-qss-dogfood/fixture/before-after.md` (EC-1/EC-2/EC-3 snippets only, skipping the answer key) applying rubric checks C1–C4 from `skills/effective-comms/SKILL.md`.

## 9. Risks / follow-ups

- **Skill-name stability is not yet a public contract** — `effective-comms` / its rubric check ids (C1–C8) may change before any public ECS split; do not pin externally yet.
- **Wire `/quality-artefacts` and `/strategy-variants` to ECS** in a later slice (they also emit user-facing output).
- **Promote a real live-run dogfood** (option 1) once the simulated-user harness budget allows; fold any misses into new rubric rows via the skill's update loop.
- **Public packaging decision** (own repo vs split-from-`qings-skills`, install-time dependency resolution) remains open for Qing — see the spec's roadmap and the ECS design notes.
- The two new review checks (qsr 23, tsr 16) renumber the reviewers' check lists; keep them in sync with the producing-skill dispatch sets, as the existing check-20 sync note already warns.
