# Test Strategy: Fernly

*Last updated: 2026-06-11*

> **⚠️ This is a worked sample, not a template.** Fernly is fictional, and these learning needs follow from *its* risk map, not yours. Run `/test-strategy` against your own `quality/strategy.md`. See [`../README.md`](../README.md).

## Purpose and scope

This is the engineering companion to `strategy.md`. The quality strategy says who matters
and where confidence is missing; this document says what we will *investigate*, in what
order, and who — human or agent — does the work.

Scope: the Phase 0–2 window leading to the Greenhouse relaunch (June–September 2026).
It deliberately ignores the None-rated dimensions (3b plant-ID latency, 9 battery drain,
11 maintainability-as-an-end) and the post-R2 sensor ecosystem.

Organising principle: every Unknown, over-confident, or known-absent actual in the risk
map becomes a learning need below. We do not write new tests for dimensions that already
hold H-confidence (1b schedule correctness, 8 photo privacy) beyond keeping their existing
suites green in CI.

## Learning needs

1. **LN-1: What fraction of materialised reminders actually arrive on-device, per platform — and where in the chain do the rest die?**
   Tied to the 1a Unknown (Conf act: —). This is the Phase 0 gate; every item below
   inherits its answer. Sub-question: OEM battery killers vs our scheduling worker
   dropping jobs (the Part 1 OPEN QUESTION). Answered by strategy action A.
2. **LN-2: Does household sync converge under concurrent edits, offline windows, and watered-event races — and when it doesn't, what exactly is lost or doubled?**
   Tied to the dimension 4 Unknown (never tested, Conf act: —). Answered by the
   two-client simulator (action E). Must reach H confidence before R2 markets
   household sharing.
3. **LN-3: What is plant-ID top-1 accuracy and uncertainty calibration on real user photos, as opposed to shelf photos?**
   Tied to the 3a over-confident actual ("feels fine"; only oracle is unrated complaints).
   Answered by the 500-photo golden dataset (action D). Feeds one decision: does 3a
   improvement work enter R2 scope or not?
4. **LN-4: Can we actually restore last night's backups — and does a photo survive an interrupted sync at every pipeline stage?**
   Tied to dimension 2's known-absent restore story and missing round-trip oracle
   (actions B and C). Pass looks like: byte-identical round-trips verified daily, plus
   one scripted restore completed to a scratch environment and sampled for journal
   integrity.
5. **LN-5: Do our entitlements match RevenueCat/Stripe truth today — and how often do dropped webhooks make them diverge?**
   Tied to the dimension 5 known-absent reconciliation. First answer is a one-off diff
   (cheap; do it early). The durable answer is the nightly reconciliation job plus the
   sandbox entitlement matrix (action G), the hard relaunch gate.
6. **LN-6: What happens to journal entries, queued photos, and reminder firing after 72 hours fully offline?**
   Tied to dimension 6's untested multi-day case (Conf act: M–H, weakest at the
   multi-day end). Bounded investigation — one scripted device run, not a
   rearchitecture (non-goal 9).
7. **LN-7: Which step of SproutSense pairing fails most, on which OS versions — and is each failure recoverable in-app?**
   Tied to dimension 7 (known-poor; diagnosis Gated on hardware we don't have). The
   in-app pairing-funnel telemetry (action H) un-gates this without device-farm spend.
   Target evidence: a failure-mode ranking with counts, not anecdotes.
8. **LN-8: Can Maya diagnose a "reminder didn't fire", "photo missing", or "I paid but…" ticket in under 10 minutes using only internal tools?**
   Tied to dimension 12 (known-poor, Conf act: H that it's poor). Tested empirically:
   timed walkthroughs of the last 5 real tickets of each class against the admin views
   produced by actions A and G.

9. **LN-9: Where does the daily-care flow fight a real user's intention?**
   Tied to the casual-parent Delight bar (Part 3) and the "oracle is a person"
   entry in Part 6. Explicitly *not* answerable by spec checks or the property
   suite — a flow can pass every automated check and still fight its user. The
   oracle is human judgment, exercised through intention-based exploratory
   charters ("repot day", "holiday backlog", "one-handed at the sink") and the
   dogfood friction log (strategy action I). Pass evidence: charters complete
   without workarounds; friction notes trend down across R1.

## Investigation order

1. **LN-1 first, alone, as a gate** (Phase 0, ~1 week). Its answer redirects everything:
   if the worker is dropping jobs, R1 is a backend fix; if OEM doze is the culprit, R1
   is client-side wake strategy plus a user-visible delivery status.
2. **LN-4's restore drill and LN-5's one-off diff immediately after** — each is under a
   day and could reveal survivable-now/fatal-later problems. Cheap insurance runs before
   deep work.
3. **LN-2 and LN-3 in parallel through Phase 1** — both are agent-heavy builds
   (simulator; golden-set scoring) with no shared dependencies.
4. **LN-6 once, mid-Phase 1**, piggybacking on the photo-queue oracle from LN-4's
   durable half.
5. **LN-5's durable half and LN-7 in Phase 2**, aligned with relaunch actions G and H.
6. **LN-8 last**, as the acceptance test of the observability side-effects of everything
   above — run it two weeks before the September submission.
7. **LN-9 runs continuously through Phases 1–2** rather than slotting once: it rides on
   daily dogfood use, costs one session a month, and its friction log is read alongside
   each phase's exit review.

## Human/agent split

- **Agents own:** the delivery-telemetry pipeline (LN-1 instrumentation), the two-client
  sync simulator (LN-2), the golden-set scoring harness and calibration analysis (LN-3),
  the photo round-trip oracle (LN-4), the reconciliation job and entitlement sandbox
  matrix (LN-5), and the pairing-funnel instrumentation (LN-7). All produce executable,
  re-runnable evidence — the agent-leverage dividend Part 7 of the quality strategy
  promises.
- **Maya and Iris jointly own LN-9:** they are both the instrument and the oracle —
  agents only build the friction-note flag and the triage view. Charters are written
  from real intentions, not screens, and rotate monthly.
- **Maya owns:** anything requiring production credentials or real money — the backup
  restore drill, live-store test transactions if the RevenueCat sandbox question
  resolves badly — plus labelling adjudication on the golden set, the churned-user
  interviews (action F), and the LN-8 timed ticket walkthroughs, where she is the oracle.
- **Iris owns:** the guideline-3.1 review of the new annual-first paywall (dimension 10)
  and the recovery-screen designs for whatever failure modes LN-7 ranks first.
- **Review rule:** agents self-merge test and oracle code; anything changing production
  behaviour in dimensions 1a, 2, 4, or 5 requires Maya's review, per the triage rubric.

## Tooling gaps

- **No device receipt signal exists yet.** LN-1 needs a silent client-side ack added to
  both apps before any delivery telemetry means anything. The single biggest gap, and
  why Phase 0 is a build rather than a query.
- **No two-device test rig.** LN-2's simulator substitutes for real devices; accepted
  risk that simulator fidelity differs from real network/BLE timing. Revisit only if
  simulator-clean bugs appear in the field.
- **No labelled plant-photo corpus.** LN-3 requires assembling and paying for labels
  (~$400 budgeted). Without it, 3a stays permanently over-confident.
- **RevenueCat sandbox capability unknown.** The Part 7 OPEN QUESTION; a one-day spike
  decides whether LN-5's matrix runs in sandbox or needs real-money transactions.
- **No staging push credentials.** Reminder end-to-end tests run against production
  APNs/FCM with test accounts — tolerable, but a harness bug could notify real users.
  Mitigation: a test-cohort allowlist enforced in the scheduling worker.
- **No device farm.** Accepted for this cycle on budget grounds; LN-7's in-app funnel
  telemetry is the explicit workaround, per the Gated note on dimension 7.
