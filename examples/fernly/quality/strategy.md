# Quality Strategy: Fernly

*Last updated: 2026-06-11*

> **⚠️ This is a worked sample, not a template.** Fernly is a *fictional* plant-care app, and everything below is **one project's answers** — its stakeholders, dimensions, bars, and non-goals follow from facts that are not your facts (a two-person studio, a March photo-loss incident, a September paid relaunch, BLE soil sensors). Your dimensions *will* differ; copying these is how you ship someone else's strategy. Run `/quality-strategy` and answer the interview for your own project instead. See [`../README.md`](../README.md) for what this sample is for.

## Operational TL;DR

*A view of the body below — if anything here conflicts with Parts 1–7, the body wins.*

Fernly keeps people's plants alive, and right now it doesn't always do that: missed reminders kill plants, dead plants kill retention, and a 4.2 App Store rating (down from 4.6) is killing acquisition. Everything in this strategy bends toward one event — the Greenhouse paid-tier relaunch in September — and the trust repair that has to land first.

- **What & for whom.** A plant-care companion (iOS/Android + web) for ~4,000 free users and ~250 paying subscribers: watering/feeding schedules with smart reminders, photo plant-ID, a care journal, household sharing, and optional Bluetooth soil sensors. Built by Maya (founder-developer), a part-time designer, and a pool of coding agents.
- **What good looks like.** A reminder that fires every time or tells us when it didn't; a journal photo that can never be silently lost again; a payment that always matches an entitlement; an App Store rating climbing back past 4.4 before the Greenhouse relaunch.
- **Where we are.** Reminder delivery is our #1 churn driver and we have zero telemetry on it — we literally cannot see silent failures. Household sync convergence has never been tested. Plant-ID accuracy is assumed fine on no evidence. Payment-webhook reconciliation does not exist. Schedule math, by contrast, is genuinely solid (property-tested).
- **First moves.** Phase 0 is a single gate: build reminder-delivery telemetry so we stop guessing. Then Trust Repair (Release 1): journal-photo round-trip oracle, backup-restore drill, household-sync simulation. Only then Greenhouse readiness (Release 2): entitlement matrix, webhook reconciliation.
- **Deliberately out.** No community feed (ENFORCE), no custom hardware, no AI care chatbot, no gamification, no web feature parity. The non-goals exist to keep a two-person studio alive; see Part 4 before saying yes to anything.
- **Load-bearing guards.** The schedule-correctness property suite (do not weaken it to ship faster), the photo-upload two-phase commit added after the March incident, and the App Store release checklist. These are the only nets currently under us.

## One-Page Triage Rubric

Walk this in order for any incoming bug, feature request, or agent work item:

1. **Does it touch journal photos or any user-created data?** If yes, treat as a data-integrity issue regardless of apparent severity. After the March photo loss, "probably fine" is not an acceptable answer here. Escalate to Maya same-day.
2. **Could it cause a reminder to not fire, or to fire at the wrong time?** Silent non-delivery is the #1 churn cause. If the failure mode is *silent*, rank it above anything cosmetic, even crashes (a crash gets reported; a missed reminder gets a dead fern and a quiet uninstall).
3. **Does it touch payments, entitlements, or the free/paid boundary?** Charging someone without granting access — or revoking 250 subscribers by accident — is a Greenhouse-relaunch dealbreaker. Check dimension 5 in the risk map before merging anything here.
4. **Who is the affected stakeholder?** A paying Greenhouse subscriber or a 50-plant power user outranks a casual free user for this release cycle (they are the relaunch audience). Check Part 3 dealbreakers.
5. **Is it on the non-goals list (Part 4)?** If yes, decline with the documented rationale, note the trigger-to-revisit, and move on. Do not relitigate in the issue thread.
6. **What is the dimension rating (Part 5)?** High-rated dimension → fix or test this release. Medium → schedule against R2 capacity. None → backlog without guilt.
7. **Is the actual-state confidence `—` or L for the affected dimension?** Then the first action is an oracle, not a fix — we don't patch what we can't see (Part 6 rules).
8. **None of the above?** Backlog it, label it, and let the weekly grooming pass decide. Default answer is "not now".

## Strategy job

This is a durable production quality strategy for Fernly, not a one-off launch checklist. It should outlive the next three releases and be re-read whenever priorities feel fuzzy. Its standing job is to convert "quality" from a mood into decisions: which stakeholder bar applies, which dimension is implicated, what confidence we actually have, and what gets built or tested next.

Its job *right now* is narrower: prioritise everything around the Greenhouse paid-tier relaunch planned for September 2026. The relaunch is the studio's main revenue bet — moving from 250 to a targeted 700 paying subscribers — and it cannot land on top of broken trust. Users who lost photos in March, or whose calathea died because a reminder never fired, will not pay us $39.90/year. So the strategy front-loads Trust Repair (Release 1) ahead of any monetisation work, and it gates the relaunch on specific, named evidence rather than vibes.

The document also serves the coding agents who do most implementation. Agents inherit this strategy as standing context: the triage rubric tells them how to rank work, Part 4 tells them what to refuse, and Part 6 tells them which "Actual" claims they may rely on versus which are Unknown and must not be assumed.

## Part 1: Context

### What we're building and why

Fernly is a plant-care companion app for iOS, Android, and the web. Core loop: you add your plants (by photo identification or search), Fernly builds watering and feeding schedules tuned to species, pot size, light, and season, and it reminds you at the right moments. Around that loop sit a care journal with photos ("here's my monstera in January vs June"), household sharing so a partner can water the plants and mark it done, and optional integration with off-the-shelf Bluetooth soil-moisture sensors (currently the SproutSense BLE probe) that adjust the schedule to reality instead of theory.

The business is freemium: free users get 10 plants; the paid "Greenhouse" tier ($3.99/month or $39.90/year) gets unlimited plants, sensor integration, and household sharing. Today: ~4,000 monthly-active free users, ~250 Greenhouse subscribers, ~$960 MRR. The September relaunch repositions Greenhouse with annual-first pricing, a refreshed onboarding, and sensor support out of beta.

The quality story that matters most: **exit surveys say 38% of churned users left after a plant died, and the most common written reason is a reminder that never arrived.** Second: plant-ID complaints ("it called my pothos a philodendron — again") are 1-in-5 of one-star reviews. Third: in March 2026 a journal-photo sync bug deleted local photos before confirming upload, permanently losing photos for roughly 40 users; several were photos of plants that have since died. The App Store rating slid from 4.6 to 4.2 across these three stories. Fourth: sensor pairing generates 31% of support inbound for a feature 6% of users have.

### The team

- **Maya** — founder, sole full-time developer, also does support, App Store ops, and payments. Realistically ~50 hours/week, of which support eats 8–10.
- **Iris** — designer, 2 days/week, owns onboarding flows, the visual system, and App Store screenshots.
- **Coding agents** — a pool of agents that do most implementation and test-writing. Maya reviews everything that touches data, payments, or reminders; agents self-merge UI polish behind the release checklist.

There is no QA function. The strategy and the oracles in Part 6 *are* the QA function.

### Current workflows

Monorepo: React Native app (iOS/Android), React web companion, Node/TypeScript API on Fly.io, Postgres, object storage for photos. Push via APNs/FCM through a scheduling worker that materialises reminders nightly. Plant-ID runs an on-device model with a cloud fallback for low-confidence shots. Payments: App Store / Play Billing via RevenueCat, plus Stripe for web subscriptions.

CI runs typecheck, lint, unit tests, and the schedule-correctness property suite (~400 generated cases per run) on every PR. There is no end-to-end suite, no device farm, and no staging environment with real push credentials.

### Release workflow

Weekly web deploys; app releases roughly fortnightly through TestFlight and a Play internal track, then phased rollout (10% → 50% → 100% over 5 days). A markdown release checklist covers screenshots, release notes, entitlement smoke-check on Maya's two test phones (one iPhone 14, one Pixel 7), and a manual reminder dry-run. App review has rejected us twice in 18 months (both metadata issues), so the checklist also carries App Store guideline checks.

### Budget and constraints

- Infrastructure budget ~$310/month; any new tooling (device farm, error tracking upgrade) competes with that.
- Maya's review bandwidth is the binding constraint, not agent capacity. Anything that lets agents verify their own work (oracles, simulations, golden datasets) is leverage.
- The September relaunch date is soft by ±3 weeks but cannot slip into the holiday review freeze.
- **OPEN QUESTION:** Are missed reminders mostly Android OEM battery killers (aggressive doze on Samsung/Xiaomi) or our own scheduling worker dropping jobs? Support tickets are consistent with either, and until Phase 0 telemetry lands, nobody can tell — and the fix differs completely between the two.

## Part 2: Release Roadmap

### Release 1: Trust Repair

Target: late July 2026. Theme: nothing new, everything reliable. Scope: reminder-delivery telemetry and the fixes it reveals; journal-photo integrity hardening (round-trip verification, backup-restore drill, a visible "synced ✓" state per photo); household-sync convergence testing and fixes. Exit criteria: measured reminder delivery ≥ 99% on instrumented cohort; zero photo-loss bugs open; sync convergence proven under the concurrency simulation. This release ships before any Greenhouse marketing because the relaunch audience is precisely the users we burned.

### Release 2: Greenhouse Relaunch

Target: September 2026. Theme: make the paid tier worth $39.90 and impossible to mischarge. Scope: annual-first paywall, refreshed onboarding, sensor support out of beta, household sharing polish, payment/entitlement hardening (webhook reconciliation, entitlement matrix tests across App Store/Play/Stripe). The "R2 bar" tags in Parts 3–6 mean: this must hold by Release 2, not necessarily today. Exit criteria: entitlement matrix green, reconciliation job running daily with zero unexplained mismatches for 14 days, App Store rating ≥ 4.4.

### Release 3: Sensor Ecosystem

Target: Q1 2027, sketch only. Broaden beyond the SproutSense probe to 2–3 sensor models, auto-adjusting schedules from moisture trends, maybe a "sensor health" view. Deliberately under-planned: everything here is contingent on R2 proving that sensor users retain better (current weak signal: they do, n=140, not significant).

## Part 3: Who Matters

Stakeholders, roughly in order of strategic weight this cycle: paying Greenhouse subscribers, power users ("the 50-plant people") as the relaunch conversion target, households sharing care, casual plant parents (the funnel), Maya herself as operator, the coding agents as the dev workforce, and App Store review as the gatekeeper to all of it.

### Three-lens analysis

#### Casual plant parents

- **Delight:** Snap a photo, get the right plant, get a schedule that just works — first watering reminder lands the next morning and the plant visibly perks up.
- **Good enough:** Reminders arrive reliably for up to 10 plants; plant-ID is right or honestly unsure; the app never asks them to think about sync, accounts, or settings.
- **Dealbreaker:** A dead fern because a reminder silently failed. They will not file a bug; they will uninstall, leave a one-star review mentioning the fern by name, and tell their group chat.

#### Power users — "the 50-plant people" (R2 bar)

- **Delight:** Bulk operations (reschedule a whole shelf after repotting), species-level care notes, a journal that doubles as a propagation log, CSV export that actually round-trips.
- **Good enough:** The app stays fast and correct at 50–120 plants; schedules respect per-plant overrides; the 10-plant limit upsell is graceful, not hostage-taking.
- **Dealbreaker:** Hitting the paywall and finding the paid tier flaky — they are the ones who will stress household sync and sensors hardest, and a sync conflict that duplicates or merges two plants' histories ends the relationship.

#### Households sharing care

- **Delight:** Partner waters the plants, taps done, and the reminder vanishes from both phones within seconds — care feels genuinely shared, including a combined journal.
- **Good enough:** Both members see the same plant list and schedule state within a minute; "who watered last" is never wrong by more than one event during brief offline periods.
- **Dealbreaker:** Double-watering a succulent to death because the "done" never synced, or one partner's edit silently overwriting the other's. Sync that lies is worse than no sync.

#### Paying Greenhouse subscribers (R2 bar)

- **Delight:** The subscription feels obviously worth it — sensors quietly correcting schedules, unlimited plants, a yearly "your plants, this year" photo recap.
- **Good enough:** Entitlements activate within a minute of payment on every platform; cancellation and refunds behave exactly as the store promised; no feature they paid for ever flickers off.
- **Dealbreaker:** Being charged while locked out — even for an hour — or losing access mid-cycle because a webhook was dropped. Money errors are reviewed-and-refunded-and-churned errors.

#### Maya — founder-operator

- **Delight:** A support inbox she can clear in 30 minutes because every ticket comes with enough diagnostic context to answer without an investigation.
- **Good enough:** Any "my reminder didn't fire" or "my photo is gone" ticket is diagnosable from logs/telemetry in under 10 minutes; releases never require more than the checklist; agents' PRs are verifiable without reverse-engineering them.
- **Dealbreaker:** Another March: a data-loss incident she discovers from user emails rather than from her own systems. A second one likely ends the company's reputation regardless of the fix.

#### Coding agents (dev pool)

- **Delight:** Executable oracles for every High dimension — property suites, simulations, golden datasets — so an agent can prove a change safe without Maya in the loop.
- **Good enough:** A typed codebase with stable module boundaries, CI that fails informatively, and this strategy kept current enough to trust the triage rubric and non-goals at face value.
- **Dealbreaker:** Load-bearing behaviour that exists only in Maya's head or in production. An agent cannot respect an invariant nobody wrote down — undocumented invariants plus agent throughput equals incidents.

#### App Store review gatekeepers

- **Delight:** Nothing. There is no delighting App Review; there is only not being noticed.
- **Good enough:** Clean metadata, working demo account, no guideline 3.1 surprises in the paywall, crash-free rate above their informal radar (~99.5%), screenshots that match the shipped UI.
- **Dealbreaker:** A rejection inside the September window. A two-week review stall pushes the relaunch into the holiday freeze and costs the quarter.

## Part 4: Non-goals

1. **No community/social feed (ENFORCE)** — the moderation burden would sink a two-person studio; the share-sheet must keep exports one-to-one (a journal entry shared to a friend, never to a feed). Agents must decline any PR that adds public or many-to-many content surfaces. *Trigger to revisit: a full-time community hire exists, which is not on any current plan.*
2. **No custom sensor hardware** — we integrate off-the-shelf probes; we do not design, manufacture, or warranty devices. *Trigger to revisit: a hardware partner offers a white-label deal with them holding inventory and support.*
3. **No AI care chatbot** — freeform plant advice carries can't-win liability (someone will fertilise a sick plant on our say-so) and unbounded support surface. Structured care notes only. *Trigger to revisit: plant-ID accuracy (3a) is measured ≥ 95% and there's budget for a horticulturist to review advice templates.*
4. **No gamification** — streaks and badges punish exactly the lapsed users we need to win back; a guilt mechanic on top of a dead plant is salt in the wound. *Trigger to revisit: retention data showing day-30 drop-off concentrated among users with zero emotional investment, which gamification could plausibly fix.*
5. **No web feature parity** — web stays a read-mostly companion (view plants, journal, manage subscription). Reminders and sensors are native-only. *Trigger to revisit: web MAU exceeds 20% of total, currently 7%.*
6. **No localisation beyond English this cycle** — species databases, care content, and support in a second language is a project, not a toggle. *Trigger to revisit: any single non-English locale exceeds 15% of installs (German is at 9%).*
7. **No marketplace or commerce** — no pot/fertiliser affiliate links, no plant shop. It pollutes the trust relationship the whole app depends on. *Trigger to revisit: Greenhouse hits 1,500 subscribers and revenue diversification becomes a board-level (i.e., Maya-level) question.*
8. **No B2B/nursery edition** — plant shops keep asking; inventory features would fork the product. *Trigger to revisit: three or more nurseries offer to pre-pay annual contracts in the same quarter.*
9. **No offline-first rearchitecture** — we harden specific offline behaviours (dimension 6) but do not rebuild around CRDTs this year. *Trigger to revisit: household-sync fixes from R1 prove unachievable on the current last-write-wins-with-vector-checks model.*
10. **No tablet-optimised layouts** — iPad/Android tablet usage is 3% and the relaunch doesn't depend on it. *Trigger to revisit: Apple features us (featuring requires decent iPad support) or tablet usage passes 8%.*

### Good enough on purpose (non-priorities, not non-goals)

Different from the table above: these we *do* ship, knowingly rough. Each is a tradeoff made with open eyes, with the trigger that would reopen it written down — so nobody "discovers" them as defects, and nobody quietly gold-plates them either.

1. **Schedule propagation is capped by the nightly worker.** Reminders are materialised nightly (Part 1), so an edit made late in the day can take until next morning to reach the widget's upcoming list — the in-app schedule view recomputes live; the widget does not. An event-driven pipeline would lift the cap, and is knowingly deferred: at ~4,000 users nobody has filed a ticket about it, plants do not operate on minutes, and a pipeline Maya can debug at 7am beats one that is real-time and opaque. *Revisit trigger: more than a handful of "widget shows yesterday's schedule" tickets in a month, or sensor-driven same-day rescheduling (R3) becoming routine.*
2. **Plant search is a plain substring match.** No typo tolerance, no synonyms ("swiss cheese plant" finds nothing; "monstera" works). Good enough: photo-ID is the primary add path, search is the fallback, and the species DB is ~2,000 rows. *Revisit trigger: support tickets citing "couldn't find my plant", or search-then-abandon showing up once funnel telemetry exists.*

## Part 5: Quality Dimensions

### Final inventory

| id | dimension | note |
|----|-----------|------|
| 1a | Reminder delivery reliability | The push/notification actually arrives on the device |
| 1b | Reminder schedule correctness | The *right* reminder at the *right* time per species/season/overrides |
| 2 | Journal/photo data integrity | No user photo or entry is ever silently lost |
| 3a | Plant-ID accuracy | Correct species, or honest uncertainty |
| 3b | Plant-ID latency | Time from shutter to answer |
| 4 | Household sync correctness | Two phones converge to the same truth |
| 5 | Payment/entitlement correctness | Paid means access; not-paid means graceful limits |
| 6 | Offline behavior | Sane capture, queueing, and recovery without connectivity |
| 7 | Sensor pairing reliability | SproutSense BLE pairing succeeds without a support ticket |
| 8 | Privacy of home photos | Journal photos of people's homes stay private |
| 9 | Battery drain | BLE polling and background work stay invisible |
| 10 | App-store-facing polish | Crash rate, metadata, paywall compliance, screenshots |
| 11 | Maintainability/agent-friendliness | Agents can verify their own work safely |
| 12 | Support observability | Maya can diagnose any ticket in minutes, not hours |

### Dimension ratings

#### High (Dealbreaker for ≥1 stakeholder)

- **1a Reminder delivery reliability** — the dead-fern dealbreaker for casual users and the #1 measured churn driver; silent failure is the defining risk of the product. R1.
- **1b Reminder schedule correctness** — a reminder that fires at the wrong time kills plants as surely as one that doesn't fire; power users' overrides make this combinatorial. R1.
- **2 Journal/photo data integrity** — a lost journal photo of a plant that has since died is unrecoverable and unforgivable; the March incident makes this existential, and Maya's own dealbreaker. R1.
- **4 Household sync correctness** — sync that lies causes double-watering deaths and overwritten histories; dealbreaker for households and a paid-tier feature. R1 testing, R2 bar.
- **5 Payment/entitlement correctness** — charged-but-locked-out is the Greenhouse subscriber dealbreaker and a refund/review machine. R2 bar.
- **8 Privacy of home photos** — journal photos show people's homes, children in backgrounds, addresses on parcels; any leak (public bucket, cross-account access) is a dealbreaker for everyone at once.

#### Medium (Good Enough / Delight bar, no Dealbreaker)

- **3a Plant-ID accuracy** — 1-in-5 one-star reviews, so it drags the rating, but a wrong ID is correctable and no stakeholder names it a dealbreaker; honesty-about-uncertainty matters more than raw accuracy.
- **6 Offline behavior** — watering happens in gardens and basements; entries captured offline must survive, but brief staleness is tolerated (households' good-enough bar). R1 touches the photo-queue part.
- **7 Sensor pairing reliability** — 31% of support load for 6% of users; a delight feature whose failure mode is tickets, not dead plants. R2 bar for the relaunch pitch.
- **10 App-store-facing polish** — App Review's good-enough bar gates the September window; crash-free ≥ 99.5% and clean metadata are table stakes, not differentiators.
- **12 Support observability** — Maya's good-enough bar (10-minute diagnosis); it multiplies every other dimension's cost when absent but doesn't itself face users.

#### None (no stakeholder bar references it)

- **3b Plant-ID latency** — current p90 is ~3.5s including cloud fallback; nobody has ever complained; a plant is not in a hurry.
- **9 Battery drain** — BLE polling is duty-cycled and no review or ticket mentions battery; watch it, don't work it.
- **11 Maintainability/agent-friendliness** — load-bearing as a *means* (the agents' good-enough bar is handled by oracle-building in Part 7) but no end-user bar references it directly this cycle.

## Part 6: Risk Map

### Confidence vocabulary

- **H (High)** — backed by an executable oracle, production telemetry, or a deliberate drill; an agent may rely on it.
- **M (Medium)** — backed by partial evidence: manual checks, indirect signals, or coverage of the common path only.
- **L (Low)** — anecdote, gut feel, or "no complaints"; treat as a hypothesis, not a fact.
- **—** — no basis at all; the honest label for the actual state is **Unknown**.
- Ranges like **M–H** mean evidence quality differs across sub-areas of the dimension; the entry says which part is which.

### Required + actual levels

#### 1a Reminder delivery reliability (H)

- **Required:** ≥ 99% of materialised reminders arrive on-device within 15 minutes of schedule, and every non-delivery is visible to us within a day. **Conf (req): H.**
- **Actual:** Unknown. We have no delivery telemetry whatsoever — the worker logs "sent to FCM/APNs" and nothing confirms device arrival, so silent failure is structurally invisible. The 38%-churn-from-dead-plants figure is the only signal, and it arrives months late. **Conf (act): —.**
- **Resolve:** Phase 0, action A. This is the gate on everything else.

#### 1b Reminder schedule correctness (H)

- **Required:** Schedule math (species defaults, pot/light modifiers, seasonal shifts, per-plant overrides, timezone and DST handling) provably correct across the combination space. **Conf (req): H.**
- **Actual:** Known-good. The property suite generates ~400 schedule scenarios per CI run including DST transitions and override stacking; it has caught 11 regressions since January and the two schedule bugs reported in production this year were both in code paths added before the suite existed. **Conf (act): H.**

#### 2 Journal/photo data integrity (H)

- **Required:** No photo or entry is ever lost without explicit user deletion; every photo's sync state is visible; loss-class bugs are detected by us before users. Restore from backup must be a practiced operation, not a theory. **Conf (act) target: H. Conf (req): H.**
- **Actual:** Known-absent in the part that matters. The post-March two-phase commit (never delete local before verified upload) is solid and code-reviewed, but there is no round-trip verification oracle, and **no backup-restore drill has ever been run** — Postgres and object-storage backups exist but restoring them is untested. We are one bad migration from finding out live. **Conf (act): M for the upload path, L for restore — call it M–L.**
- **To strengthen:** Phase 1, actions B and C.

#### 3a Plant-ID accuracy (M)

- **Required:** ≥ 90% top-1 on a representative golden set of real user photos (bad light, mixed pots, partial leaves), and the model says "not sure" instead of guessing below threshold. **Conf (req): M** — the right bar may move once measured.
- **Actual:** Over-confident. Internally it "feels fine" because the demo plants on Maya's shelf identify perfectly, but the only oracle is unrated user complaints — a biased trickle that catches neither base rates nor honest-uncertainty failures. The true accuracy on real-world photos is unverified and the 1-in-5 one-star share suggests the felt number is wrong. **Conf (act): L.**
- **Resolve:** Phase 1, action D builds the golden dataset and scores the model.

#### 4 Household sync correctness (H, R2)

- **Required:** Two devices editing the same household converge to identical state; "watered" events are never lost or doubled; concurrent edits resolve deterministically and visibly. **Conf (req): H.**
- **Actual:** Unknown. Convergence has never been tested — not once, not manually. The last-write-wins-with-vector-checks model was reasoned about at design time (late 2025) and shipped; the three "my partner's changes vanished" tickets since then were closed unreproduced. There is no simulation, no conflict-injection test, no two-device CI rig. **Conf (act): —.**
- **Resolve:** Phase 1, action E. R2 bar: must be H-confidence before the relaunch markets household sharing.

#### 5 Payment/entitlement correctness (H, R2)

- **Required:** Every paid state in RevenueCat/Stripe matches the entitlement the app enforces, on all three platforms, through purchase, renewal, cancellation, refund, and plan-change; mismatches surface to us within 24h. **Conf (req): H.**
- **Actual:** Known-absent. There is no payment-webhook reconciliation — if a Stripe or RevenueCat webhook is dropped (and Stripe's dashboard shows 4 delivery failures in the last 90 days), the entitlement silently diverges until the user complains. The happy path is manually smoke-checked per release; renewal/refund/plan-change paths have never been exercised end-to-end. **Conf (act): L on edge paths, M on initial purchase.**
- **Resolve:** Phase 2, action G. Hard gate on the relaunch.

#### 6 Offline behavior (M)

- **Required:** Journal entries and photos captured offline queue durably and sync on reconnect; reminders fire from local schedule without connectivity; 72h offline causes staleness, never loss. **Conf (req): M.**
- **Actual:** Mixed. The photo queue is exercised by the post-March work and survives airplane-mode testing on both test phones; reminder local-firing is believed to work but is entangled with the 1a unknown; multi-day offline has never been tested. **Conf (act): M–H** — H for the photo queue, M elsewhere.

#### 7 Sensor pairing reliability (M, R2)

- **Required:** First-attempt pairing success ≥ 90% across supported phones/OS versions, with failures producing an actionable in-app message instead of a support ticket. **Conf (req): M.**
- **Actual:** Known-poor, partially Gated. Support data is unambiguous — 31% of inbound is pairing — so we know it's bad; what we *can't* know yet is the failure-mode breakdown, because reproducing requires physical SproutSense probes across a device matrix and we have two phones and three probes. Broader measurement is **Gated** on either a device-farm budget decision or a beta-cohort instrumentation build. **Conf (act): H that it's poor, L on why — call it L for planning purposes.**
- **To strengthen:** Phase 2, action H instruments pairing attempts in-app, which un-gates diagnosis without hardware spend.

#### 8 Privacy of home photos (H)

- **Required:** Journal photos are private by default, served only via per-user signed URLs, never used for model training without explicit opt-in, and cross-account access is impossible. **Conf (req): H.**
- **Actual:** Known-good. Bucket is private, URLs are signed with 15-minute expiry, an agent-written authorisation test suite covers cross-account access paths and runs in CI, and the February external pen-test (a $2k spot-check) found no photo-access issues. Opt-in training flag defaults off and is respected in the ID pipeline. **Conf (act): H.**

#### 10 App-store-facing polish (M)

- **Required:** Crash-free sessions ≥ 99.5%, metadata and paywall compliant with current guidelines, screenshots matching shipped UI, demo account working — all verified before each submission, hard-verified before the September submission. **Conf (req): H** for the September window specifically.
- **Actual:** Mostly known-good. Crash-free is 99.62% per the crash tracker; the release checklist covers metadata and demo account and has caught both historical rejection causes. Paywall compliance for the *new* annual-first design is unreviewed against guideline 3.1. **Conf (act): M–H.**
- **To strengthen:** Iris + Maya guideline review of the new paywall, scheduled in Phase 2.

#### 12 Support observability (M)

- **Required:** Maya can diagnose any "reminder didn't fire", "photo missing", or "I paid but…" ticket in under 10 minutes from internal tools, without grepping raw logs. **Conf (req): M.**
- **Actual:** Known-poor. Today a reminder ticket means an hour across Fly logs, FCM console, and guesswork; photo tickets are better post-March (per-photo sync state exists in the DB but no admin view exposes it); payment tickets mean logging into three dashboards. We know exactly how bad it is because Maya lives it weekly. **Conf (act): H** — high confidence in a poor state.
- **To strengthen:** The Phase 0/1 telemetry work is designed to double as support tooling (see action A's admin-view requirement).

#### The daily-care flow — where the oracle is a person (M)

- **Required:** the everyday loop — open the app, see what needs water today, tick it, maybe snap a journal photo — feels built by someone who waters plants: it anticipates real intentions (one-handed at the sink, repot day, back from a holiday to nine days of backlog) instead of fighting them. This is the casual-parent Delight bar (Part 3) made concrete, and it is deliberately a bar on *experience*, not on screens. **Conf (req): M** — bars on feel are judged, not specified.
- **Actual:** good by our own daily use, never examined deliberately. The spec-level checks pass — every screen renders, every control does what its test asserts — and that evidence is **insufficient by design here**: a flow can pass every check and still fight the user's intention. **Conf (act): M (lived-in, unexamined).**
- **Planned measurement — exploratory testing as the oracle, on purpose:** Action I. Charters derived from real intentions ("water everything in the kitchen before the school run", "repot day", "the holiday backlog"), walked monthly by Maya and Iris on their own plants; plus dogfood observability — a dogfood-build-only one-tap "this felt wrong" friction note, triaged monthly. Pass looks like: each charter completes without dropping to a workaround, and the friction log trends down across R1. No automated check replaces this; automation guards the floor (1b, 2), a person judges the delight.

## Part 7: Plan of Work

### Phase 0: Settle the reminder-delivery telemetry question (gate)

Nothing else proceeds to "fixed" status until we can see delivery. One action, one week, one gate.

- **A. Reminder delivery telemetry end-to-end** (oracle-build) — instrument the full chain: worker materialisation → push handoff → device receipt (silent ack from the app) → user-visible display. Ship a per-user delivery ledger queryable from an admin view (this is also the 12-support-observability down-payment). Exit: 7 days of data answering the Part 1 OPEN QUESTION (OEM battery killers vs our worker), with a measured delivery rate per platform. Resolves the 1a Unknown.

### Phase 1: Trust Repair evidence

The Release 1 workstream: convert the data-integrity and sync Unknowns into measured states, and fix what the measurements reveal.

- **B. Photo round-trip oracle** (oracle-build) — automated daily job: synthetic account uploads, force-syncs, corrupts/interrupts at each pipeline stage, and verifies byte-identical round-trip; alerts on any divergence. Closes the verification gap in dimension 2.
- **C. Backup-restore drill** (testing) — actually restore last night's Postgres + object-storage backups to a scratch environment and verify a sampled account's journal is intact; script it; calendar it monthly. Converts dimension 2's restore story from L to H or surfaces that backups are broken while that's still survivable.
- **D. Plant-ID golden dataset and score** (oracle-build) — assemble 500 real user photos (opt-in flagged set), have them labelled (Maya + a hired horticulture student, ~$400), score top-1 accuracy and uncertainty calibration. Replaces the over-confident 3a "feels fine" with a number; informs whether 3a work enters R2 scope.
- **E. Household sync convergence simulation** (testing) — agent-built two-client simulator driving randomised concurrent edits, offline windows, and watered-event races against a test backend; assert convergence and no lost/doubled events. Resolves the dimension 4 Unknown. Fixes it reveals are R1 scope.
- **I. Daily-care exploratory dogfood loop** (testing) — the charters and friction-note instrumentation from Part 6's daily-care entry: monthly intention-based exploration by Maya and Iris, a dogfood-only "this felt wrong" tap, monthly triage. The one Phase 1 item whose oracle is deliberately a person — it buys the delight evidence the automated oracles (A, B, D, E) cannot.
- **F. Churned-user interviews** (stakeholder) — Maya emails 30 users who churned after a dead-plant exit survey, offers a year of Greenhouse for 20 minutes; validates that 1a fixes target the actual failure stories and recruits a win-back cohort for the relaunch.

### Phase 2: Greenhouse relaunch readiness

- **G. Payment-webhook reconciliation + entitlement matrix** (oracle-build) — nightly job diffing RevenueCat/Stripe subscription state against our entitlement table, alerting on any mismatch; plus an automated entitlement test matrix covering purchase/renewal/cancel/refund/plan-change on all three platforms in sandbox. Closes the dimension 5 known-absent. Hard relaunch gate: 14 mismatch-free days.
- **H. Sensor pairing instrumentation and fix pass** (fixing) — in-app pairing-attempt telemetry (step-by-step funnel, failure codes), which un-gates the dimension 7 diagnosis without device-farm spend; then fix the top two failure modes and replace dead-end errors with actionable recovery screens. Target: pairing tickets below 15% of inbound by relaunch.

OPEN QUESTION: Can RevenueCat's sandbox actually simulate the refund and plan-change webhooks we need for action G, or do we need a small set of real-money test transactions on live stores? Maya to answer with a spike before Phase 2 is scheduled — it changes G's estimate by a factor of two.

### Aware, not investing this release

- **3b Plant-ID latency and 9 battery drain** — both rated None with quiet telemetry/reviews; we keep the existing dashboards and do nothing unless a threshold trips (p90 ID > 6s, or battery mentions appear in reviews).
- **11 Maintainability/agent-friendliness** — served indirectly: every oracle in this plan (A, B, D, E, G) is also agent-verifiable infrastructure; no standalone refactoring workstream this cycle.
- **Offline multi-day behavior (6)** — the 72h-offline scenario stays untested until after R2; the photo-queue half (the loss-risk half) is already covered by B.
