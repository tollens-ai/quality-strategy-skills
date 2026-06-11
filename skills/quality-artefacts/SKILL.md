---
name: quality-artefacts
description: Turn a finished quality strategy into a shareable, glanceable visual artefact — a bespoke self-contained SVG or HTML file designed for a stated audience and purpose. Describe the view you want ("a tweetable summary of where quality stands", "a Wrapped-style story of our quality year", "a dashboard of just the payment risks for my standup") and it designs and builds that view from quality/strategy.md, poster-first, then scores itself against seven principles before presenting. Presets — social card, risk heatmap, multi-frame story, interactive dashboard, quality radar — are worked examples, not a menu. Use after /quality-strategy has produced and reviewed quality/strategy.md, when you need the strategy in a form someone can take in at a glance, screenshot, or share.
---

# Quality Artefacts

A finished `quality/strategy.md` is honest, but it's several hundred lines of markdown — built to be *used*, not to be *glanced at* or *shared*. This skill turns it into the missing form: a **single self-contained SVG or HTML file** a person can open, grasp in five seconds, screenshot, tweet, or walk into a standup with. The bar it aims at: the owner should *feel seen* — and be keen to share it.

It is a **generator, not a poster maker**. There is no fixed template being filled in. The user describes the view they want — in their own words, for their own audience — and you *design* an artefact for that request and that strategy: the layout, the emphasis, the visual language, all chosen to fit. Two users asking for "a dashboard" of two different strategies should get two visibly different artefacts, because their strategies, audiences, and risks differ. The named presets further down are worked examples of design moves that have worked — start from one when it genuinely fits, but the headline capability is the freeform path.

Like `/strategy-variants`, this is a **post-processing step**: it runs after the strategy is finished and reviewed, never edits `quality/strategy.md`, and produces derived views with the strategy as the single source of truth. Where `/strategy-variants` re-writes the strategy in prose for a named reader, this skill re-renders it *visually* — and every honesty rule that binds the prose variants binds the pictures too.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). The grounding file this skill reads — `PHILOSOPHY.md` — lives under it, as does the plugin manifest whose version you record per run.
- **PROJECT_DIR** — the absolute path of the project whose strategy you're rendering (normally the current working directory; confirm with the user if it's ambiguous). The strategy docs live under `$PROJECT_DIR/quality/`, and the artefact you produce goes to `$PROJECT_DIR/quality/artefacts/`.

File references below use the `$PLUGIN_ROOT` and `$PROJECT_DIR` placeholders. **Substitute the resolved absolute paths before you act on them.** The Read tool does no variable expansion and resolves relative paths against the current working directory, not this skill's directory — so an unsubstituted placeholder or a bare relative path will fail.

## When to use

- **After `/quality-strategy` (and ideally its review) has finished** — when the user wants the strategy in a glanceable or shareable form: for a tweet, a standup, a stakeholder meeting, a README badge-with-substance, a wall.
- **After a strategy revision** — re-run it and the views update with the strategy. An artefact is a snapshot; the regeneration is what keeps it a *living* view rather than a stale poster.
- **Standalone** — on any existing, reviewed `quality/strategy.md`, whoever wrote it.

If `$PROJECT_DIR/quality/strategy.md` doesn't exist, stop — there is nothing to render; point the user to `/quality-strategy`.

Do **not** run it on an unfinished or unreviewed strategy: a beautiful rendering of a broken strategy is a confident-looking, misleading picture — worse than the document, because pictures are believed faster than prose. If the strategy isn't done, say so and point back to `/quality-strategy` / `/quality-strategy-review`. (If the user knowingly wants a draft visualised anyway, build it, and make the artefact itself say *Draft — strategy not yet reviewed* where no crop can remove it.)

## What you need

- **Grounding.** Read `$PLUGIN_ROOT/PHILOSOPHY.md` — in particular *quality is value to someone who matters* (an artefact is pitched at a specific someone), *make confidence visible*, and *don't use spurious precision*. The artefact is the strategy's public face; if it launders away the uncertainty, it betrays the document it renders.
- **The skill version.** Read the `version` field from `$PLUGIN_ROOT/.claude-plugin/plugin.json` and note it — every run records the version it executed against (see step 5).
- **The strategy.** Read `$PROJECT_DIR/quality/strategy.md` end-to-end — not just the TL;DR. The detail is where the honest qualifiers live ("M for the upload path, L for restore"), and those qualifiers are exactly what a lazy rendering flattens away.
- **The companions, if they exist.** `quality/test-strategy.md`, `quality/tooling-strategy.md`, and any `quality/strategy-one-pager.md` / `quality/strategy-client.md` variants. They are optional enrichment: a request like "show what we're building next" draws on the tooling strategy's build plan; a client-facing artefact should follow the client-safe variant's framing where one exists.
- **The request.** The user's own words for what they want to see or share. This is the design brief — treat it as load-bearing input, not as a routing key to a preset.

## The seven principles

Everything this skill knows about a good artefact reduces to seven principles. They are the design brief during step 2 and the scorecard in step 4 — score each 0 (fails), 1 (partial), or 2 (holds), on the **rendered** output. Three are **HARD GATES**: an artefact is not presented until each gate scores 2; fix and re-render instead. One law stands above all seven: **honesty beats shareability** — when a principle's pursuit would shade the truth, the truth wins.

### 1. Feel seen — the mirror

Could no other project mistake this artefact for theirs? The project's own voice, its own visual identity (a plant app earns botanical warmth; a payments tool, ledger austerity), the strategy's own sharpest sentences quoted back at the owner (*"salt in the wound"*, *"the users we burned"* — mine the doc before writing new lines). Choose a deliberate palette (3–5 colours) and one or two typefaces. Anti-patterns: a template with the nouns swapped; assistant-prose tics; the generic-AI look — evenly-spaced gradient boxes, the same purple-on-white, emoji as decoration — redesign rather than polish it. The banned-tics list — *honest/honestly* as filler, *actually*, *simply*, *crucially*, *essentially*, *delve*, *deep dive*, *journey*, *game-changer*, *it's worth noting*, *let's be clear* — is grepped at scoring time; a hit survives only where it does real work (a legend's *"honest confidence"* names a property of the data; a kicker reading *"MEASURED HONESTLY"* does not).

One boundary the other way: the anti-hyperbole rules (principle 3 and the world-claim check) bound *claims*, never *register* — do not let them flatten the voice. Evidence-backed savagery is a feature: *"The best-tested code doesn't run"*, *"2/2 apparent instruments turned out to be decoys"* land as a roast with receipts, and owners share that register because it signals command of their own codebase. Hyperbole means asserting beyond the evidence; a burn fully covered by the doc is just the truth, well-lit — so sharpen the tone to exactly the limit the evidence allows, and no further.

### 2. The graphic carries it — HARD GATE

Cover every word on the rendered frame: the point must still land from the shape alone. A dramatic void says "we can't see here" better than a sentence; the chart IS the quote. Text tells the story — the *so-what* — and never describes the graphic; every legend term maps to exactly one visual treatment on its frame (instance from review: two hatched elements with different meanings on one frame made the legend meaningless — one void treatment per frame). If the text carries the meaning, the design fails this gate.

### 3. Claims wear their evidence — HARD GATE

Every factual claim carries its evidence at the strength the source doc gives it — measured, surveyed, believed, unknown — and compressing a hedged claim into a bald fact is the honesty law broken. The evidence is usually the better line anyway: *"of the one-star reviews that say anything, dead plants dominate — most-named cause, a reminder that never arrived"* beats *"the #1 reason its users quit"*. Operationally: an Unknown or Gated dimension (unjudgeable until an oracle — something that can judge the output — exists) is never painted on the good-to-bad colour ramp (hatching, holes, `?`, an off-ramp hue — and boldly, not as a timid side note); over-confident actuals render at their evidence, not their vibe; confidence appears in the doc's own coarse vocabulary, never percentages it doesn't contain; nothing is asserted the body doesn't support, and a scoped view's title says its scope. For client- or public-facing artefacts, `/strategy-variants`' omit-never-lie rule applies on top — and where keeping client-affecting honesty and dropping internal candor pull against each other visually, surface the tension to the user rather than quietly choosing.

### 4. Stranger-ready — HARD GATE

One plain sentence says what the project is and what the picture shows, before anything else asks to be understood — in a multi-frame story it opens frame 1's caption, and every other frame carries a short project tag (e.g. in its corner provenance line) so a lone screenshot still names the project. Every visible sentence survives zero project context and zero framework vocabulary: *"nobody can measure this yet"* beats *"no oracle exists"*; plain dimension names, never bare ids or release tags. The text budget enforces the rest: titles ≤8 words, one caption of ≤2 sentences per share surface, everything else axis-label length, paragraphs banned (explanation lives a layer down).

### 5. Pride, not confession

Gaps are unmissable AND framed as self-knowledge with a first move attached — the owner shares it *because* of the honesty. Fails at both poles: inflation (gap painted fine) and confession (failed-audit vibes). A first-move frame passes the plain test: *what we'll do* + *why a user would notice* (instance from review — FAIL: *"build the delivery ledger"*, an internal artifact name; PASS: *"First: count every reminder we send — so a silent miss shows up in our data, not as your dead fern."*).

### 6. Every frame is a story

Hero lines carry content tied to the user's stated goals or a stakeholder's delight/disappointment story — never contentless drama (instance from review — FAIL: *"The thing that kills us is invisible."*; PASS: *"We back up. We never rehearse."* — the disappointment is *in* the line). The paste-test: a title that would survive on another project's artefact has no content. The model frame ties its fact to a named someone's lived moment — *"a dead fern, a one-star review naming the fern, a quiet uninstall"* is a frame; "reliability: low" is a row. Walk the strategy's three-lens entries (delight / good-enough / dealbreaker) for the lived stories before reaching for abstractions. There should be one synthesized line the owner would quote out loud — the **revelation**. Revelations come in two tiers. Good: the *half-knew* truth — something the doc states but the owner never saw said this starkly. Above it sits the **never-realised-you-cared** truth — something the owner's own goals imply but they never articulated; the find the strategy work delivered back to them as a moment. When the source doc contains one of those, it is hero material: lead the artefact with it, don't bury it among the stated facts.

### 7. Screenshot-worthy, three-second hierarchy

The headline frame stands alone as a phone screenshot; one takeaway lands in three seconds, with layers that reward attention without competing — not a wall of equal-weight cards. The poster is the unit of design: one striking graphic, one hero stat (every strategy contains one staggering true number — find it, set it in poster type; jaw-dropping-but-true is the house move), one ≤8-word title. More than one chart's worth of message → more than one frame, Wrapped-style: each frame a self-contained poster, never sharing its viewport with another frame's message, the sequence telling the arc. Colour is part of craft: a committed palette, summary grids with state-tinted tiles (instance from review: never white cards with coloured words), the radar done *well* — colourful, plain names on the axes, unmeasurable axes as dramatic voids. Weight this principle by declared purpose: a tweet card must nail it; a working dashboard may trade some for depth.

## The self-review is the product's quality gate

Shipping skills instead of code means there is no hosted layer between this skill's output and the user — no server to sanitise output, no release pipeline to catch a bad render. Output quality must hold *however* the user runs the skill, on whatever machine, so the self-review here is not hygiene: it is the product's quality gate. Four checks join the principle scoring, each added after a real shipped bug:

- **Render integrity** *(scores under principle 2's gate)*. Declare the encoding in every form the artefact ships: HTML carries `<meta charset="utf-8">`; a raw SVG opens with an explicit XML declaration (`<?xml version="1.0" encoding="UTF-8"?>`) — a browser loading an `.svg` directly cannot be relied on to assume UTF-8. At review, open the artefact every way a user plausibly would — from `file://`, served, the `.svg` loaded directly — and look for mojibake or glyph breakage. *Shipped bug: em-dashes and apostrophes rendered as "â€™ / â€”" because an SVG shipped without a charset declaration.*
- **Layout quality** *(scores under principle 7)*. The rendered-screenshot review includes an explicit aesthetic judgment — spacing, alignment, balance, overflow: **would a designer wince?** — distinct from defect-detection. *Shipped bug: a rule card with visibly funky spacing that no defect-check had reason to flag.* Looking good is a check, not a hope.
- **Depiction fidelity** *(scores under principle 3's gate)*. If the artefact depicts the product — a mock screenshot, a UI vignette — the depiction is itself a set of claims: it must be internally coherent and faithful to the point it illustrates, every depicted detail checked against the claim it serves. *Shipped bug: a frame illustrating one-second sync between two partners' phones and a home-screen widget showed a different shopping list on each surface — the mirror test failing in pixels. An inaccurate render of the user's own product will really bother them.*
- **World-claim evidence** *(scores under principle 3's gate)*. Claims about the market, rivals, or the world require evidence in the source doc, or they don't ship; the doc's own competitive notes are the ceiling, and unsupported uniqueness or superlatives are hyperbole even when they sound plausible. *Shipped bug: "nesting plus live sync — every rival picks one." How do we know there's not another app doing both? We don't — so we don't say it.*

## The work, in order

### 1. Pin down the brief — one clarifying exchange, then build

From the user's request, you need three things before you can design:

- **Audience** — who will look at this? (Their own team? Twitter? A skeptical client? A wall in the office?) The audience sets the candor level and the visual register, exactly as it does for `/strategy-variants`.
- **Message** — what should a viewer take away in the first five seconds? A strategy contains fifty true statements; an artefact carries about three.
- **Form** — static image to screenshot (SVG), or something to open and explore (HTML)? Any size/shape constraint (a tweet-sized card, a slide, a phone screen)?

Pre-read the request and the strategy, form your best hypothesis for all three, and — **if any of them is genuinely ambiguous — ask once**: a single message presenting your read and the open choices. Then build. Don't interrogate in rounds, and don't silently guess on audience when the request could be internal or external — that choice changes what principle 3 requires. If the user is present and answers, follow the answer; if they've said "just build something good", or you asked and got no reply, proceed on your stated hypothesis and record the choices as assumptions.

### 2. Design poster-first, against the principles

Design the phone-screenshot frame before anything else: the graphic that carries the message (principle 2), the hero stat and story line (principles 6 and 7), the project's visual identity (principle 1), how the uncertainty will be drawn — decided now, not as an afterthought (principle 3). Whatever interactivity or detail the request needs wraps *around* that frame, a layer down. Decide one-frame-or-several (principle 7), and what data carries the message: usually some slice of the risk map (Part 6) with its confidence ratings, the Dealbreakers (the must-never-fail bars), the headline from the TL;DR, the non-goals when the audience might mistake them for gaps. Resist completeness — the artefact that shows everything shows nothing. (If a frontend-design skill is available in the session, use it; the bar stands either way.)

### 3. Build one self-contained file

- **One file per run**, written to `$PROJECT_DIR/quality/artefacts/<descriptive-slug>.html` or `.svg`. Create the directory if needed. The slug names the view: `relaunch-risks-card.svg`, not `output1.svg`. A re-run of the same view after a strategy revision rewrites the same slug in place from the current strategy — that refresh, not accumulation, is how the views stay living. **Archive before overwrite:** when the slug already exists, first move the old file to `quality/artefacts/archive/`, renamed with the version and date stamped in its own data island (e.g. `relaunch-risks-card--v0.3.0--2026-06-11.svg`) — the stamps make every archived artefact self-identifying. Never silently overwrite: the archive is what lets a user lay two strategy revisions side by side and see the gaps close. A multi-frame story is still one artefact and one file. If the user asked for several views, that's several runs of steps 1–5, each with its own design pass.
- **Declare the encoding in every form** (render integrity): `<meta charset="utf-8">` in HTML; `<?xml version="1.0" encoding="UTF-8"?>` as the first line of a raw SVG.
- **Self-contained means zero external requests.** No CDN scripts, no remote fonts or images, no analytics. The file must render fully from `file://` with the network cable pulled. Fonts: good system stacks, or an embedded data-URI subset only if the design truly demands it.
- **SVG for the static and croppable** (cards, posters, heatmaps; fixed canvas sized to destination — a social card is 1200×675; text as real `<text>` elements). **HTML for the interactive and multi-frame** (inline CSS and vanilla inline JS only, no frameworks; for a story, full-viewport frames with CSS scroll-snap screenshot clean on their own; interactivity serves the reading, never decorates it).
- **Dual legibility — the artefact serves agents too.** Every encoded value is also present as readable text (names, levels, confidence letters), and the underlying data is embedded machine-readably — a `<script type="application/json">` data island in HTML, a `<metadata>` block in SVG — so an agent can re-derive what the artefact shows without parsing pixels.
- **Provenance caption, on the artefact itself**, visibly but unobtrusively: the project name, *derived from quality/strategy.md, <YYYY-MM-DD>*, and — where confidence appears — a one-line key in everyday words. The caption is what keeps a screenshot honest after it leaves home.
- **Pack watermark**, alongside the provenance: *made with quality-strategy-skills (tollens-ai) · v<version>* — the version you noted from the manifest. Style it as a quiet footer chip in the artefact's own visual identity: provenance and shareable attribution, never a banner ad. The watermark plus version means a shared artefact carries its own origin story — and a stale version is visible in the wild.

### 4. Score yourself — render first, then the scorecard

Review the **rendered artefact, not the source**. If a headless browser is available (Chromium via `--headless --screenshot=<png> --window-size=<WxH>` is common), render and read the screenshot yourself — every frame of a story; overflow, collisions, and a wrong first impression are visible in a render and invisible in markup. Open the artefact every way a user plausibly would — from `file://`, served, the `.svg` loaded directly — watching for mojibake or glyph breakage (render integrity). And judge the render aesthetically — spacing, alignment, balance, overflow: would a designer wince? (layout quality). Where the artefact depicts the product, check every depicted detail against the claim it serves (depiction fidelity); where it makes claims about rivals or the world, trace them to the doc or cut them (world-claim evidence). Verify mechanics as you go: no external references (`http://`, `https://`, protocol-relative `//` in `src`/`href`/`url()`/`@import`/`xlink:href`), well-formed markup (`xmllint --noout`, or `python3 -c "import xml.dom.minidom,sys; xml.dom.minidom.parse(sys.argv[1])" <file>`), the inline JS re-read.

Then walk the seven principles and score each 0/1/2 with a one-line justification. Read every visible sentence twice on the way — once as the owner (principles 1, 5, 6: does it get us? would I share it? would I quote it?), once as a total stranger (principles 2, 4, 7: cover the text; pretend you've never heard of the project or the framework). Principle 3's score comes from the mechanical provenance walk: every factual claim traced to the doc and checked for evidence strength. Run the other sweeps where their principles name them: the tics grep (principle 1), the legend-uniqueness check per frame (principle 2). If no renderer exists in the environment, score against the source with that limitation named — record "not rendered" in the run notes and the one-line self-score, and ask the user to glance at the artefact before sharing it.

**The three hard gates — principles 2 (graphic carries it), 3 (claims wear evidence), and 4 (stranger-ready) — must each score 2 before the artefact is presented.** Anything less: fix, re-render, re-score. Don't ship on the first draft's first render. Non-gate principles below 2 are a judgment call — fix them or name the shortfall to the user.

### 5. Deliver, with the scorecard on record

- **Record the run** in `$PROJECT_DIR/quality/artefacts/.run-notes.md` (append-only — create if absent, never rewrite past runs): date, the user's request, the artefact path, **the plugin version executed against** (from `$PLUGIN_ROOT/.claude-plugin/plugin.json`), the seven scores with their one-line justifications, and the assumptions made. Also stamp them into the artefact's machine-readable block (the JSON data island in HTML, the `<metadata>` block in SVG): `"skillVersion"`, and `"selfScore"` carrying the seven 0–2 scores plus the total — invisible on the surface.
- Tell the user: **where it landed**, **how to open it** (it works offline), **how to share it** (screenshot SVG at full zoom; send HTML as-is), **where the previous version was archived** when this run refreshed an existing view (a before/after comparison is then one open away), and **a one-line self-score** — e.g. *"Self-score 13/14 — gates all 2/2; principle 7 at 1: the appendix frame trades hierarchy for completeness."* Name the design choices and assumptions so a re-run with a sharper brief is cheap.
- Process notes about *the skill itself* (an awkward instruction, a misfire) go to `$PROJECT_DIR/.skill-feedback.md`, never into the artefact or the strategy.

## Worked examples, not a menu

Five shapes that have worked. Each names the design move so you can adapt it — none is a template to fill in, and a freeform request that fits none of them is the skill working as intended.

- **Social / tweet card** — fixed 1200×675 SVG: a hero stat or the strategy's own sharpest line in poster type, one supporting graphic, the plain what-this-is caption, the provenance line. One idea, big type, no chart junk. Fits: "something I can post."
- **Multi-frame story** — a Wrapped-style HTML slideshow: full-viewport scroll-snap frames, each a self-contained poster, the sequence telling the strategy's arc — hero stat → the holes → what's proven → the first move — with the detail layer as a final appendix frame. Fits: "tell our quality story", a strategy with more than one chart's worth to say.
- **Risk heatmap** — risk-map rows × what-the-glance-needs columns (gap severity, confidence), colour as heat with Unknown as its own non-heat treatment. Compact and brutal; the highest-information-per-pixel view. Fits: a skeptical audience, a prioritisation argument.
- **Interactive dashboard** — the strategy as a navigable single-page HTML: a poster-grade first viewport (the message lands before any scrolling or clicking), then collapsible dimensions, a sortable risk map with confidence badges, non-goals where they'll be seen. Fits: a team working session, a standup anchor.
- **Quality radar / spider — done well.** Dimensions as spokes, required vs actual as overlaid shapes — it earns its place when done well: colourful, plain dimension *names* on the axes, and the unmeasurable axes as **dramatic voids** the actual line breaks around. Done lazily it's the most template-shaped form there is, so principle 1 applies double here. Fits: "where do we stand overall?"

Also derivable: per-stakeholder cards ("what does *good* mean for the agents?"), a before/after gap tracker across two strategy revisions, a one-dimension deep-dive for a decision meeting.

## Push back when

- **The user wants the picture friendlier than the doc.** *"I can choose what the artefact emphasises, but I can't show an Unknown as a score or a gap as closed — a picture that flatters the strategy is the false confidence this whole pack exists to prevent. We can instead make the headline 'here's our plan' rather than 'here's our state'."*
- **The strategy is unfinished or unreviewed** and the user wants a shareable anyway. Offer the visibly-watermarked draft route (see When to use) — never an unmarked one.
- **The request needs data the strategy doesn't contain** ("show our test coverage trend"). *"The artefact renders what the strategy knows. If that matters, it belongs in the strategy first — or in the tooling strategy as a build item."* Don't fabricate panels from data you don't have.
- **The user asks for anything hosted, served, or live-updating.** The pack emits files, full stop — no daemon, no service, no embed snippet phoning home. A re-run after each strategy revision is the refresh mechanism, and it's deliberate.

## This skill is DONE when

- [ ] `quality/strategy.md` (and existing companions) read end-to-end, not skimmed; the plugin version noted.
- [ ] Audience, message, and form pinned down — asked once if ambiguous, assumptions recorded if not asked.
- [ ] Exactly one self-contained `.html` or `.svg` was written under `quality/artefacts/` (new, or the same view refreshed in place — with the old version moved to `archive/` first, never silently overwritten), named for its view; it renders offline from `file://` with zero external requests.
- [ ] Every encoded value is also readable as text, and the underlying data is embedded machine-readably.
- [ ] The artefact carries its provenance caption (project, derived-from line with date, confidence key in everyday words where used) and the pack watermark with version, as a quiet footer chip.
- [ ] The seven principles were scored on the RENDERED output (every frame), with the mechanical sweeps run — and **all three hard gates scored 2/2 before presenting**.
- [ ] The four shipped-bug checks ran: encoding declared in every form and verified mojibake-free in every plausible opening; the designer-wince judgment made; any product depiction checked detail-by-detail; any world-claim traced to the doc or cut.
- [ ] The run is recorded in `quality/artefacts/.run-notes.md` (request, version, scorecard, assumptions) and the data island carries `skillVersion` and `selfScore`.
- [ ] The user got the path, how to open and share it, the one-line self-score, and the assumptions.
- [ ] `quality/strategy.md` untouched.

## Output

- `quality/artefacts/<descriptive-slug>.html` or `.svg` — one bespoke, self-contained artefact per run.
- `quality/artefacts/archive/<slug>--v<version>--<date>.*` — the prior version, when the run refreshed an existing view.
- `quality/artefacts/.run-notes.md` — the appended run record (request, skill version, scorecard, assumptions).
- `quality/strategy.md` and companions are **not modified** by this skill.
