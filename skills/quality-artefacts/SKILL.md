---
name: quality-artefacts
description: Turn a finished quality strategy into a shareable, glanceable visual artefact — a bespoke self-contained SVG or HTML file designed for a stated audience and purpose. Describe the view you want ("a tweetable summary of where quality stands", "a dashboard of just the payment risks for my standup") and it designs and builds that view from quality/strategy.md. Presets — quality radar, risk heatmap, social card, interactive dashboard — are worked examples, not a menu. Use after /quality-strategy has produced and reviewed quality/strategy.md, when you need the strategy in a form someone can take in at a glance, screenshot, or share.
---

# Quality Artefacts

A finished `quality/strategy.md` is honest, but it's several hundred lines of markdown — built to be *used*, not to be *glanced at* or *shared*. This skill turns it into the missing form: a **single self-contained SVG or HTML file** a person can open, grasp in five seconds, screenshot, tweet, or walk into a standup with.

It is a **generator, not a poster maker**. There is no fixed template being filled in. The user describes the view they want — in their own words, for their own audience — and you *design* an artefact for that request and that strategy: the layout, the emphasis, the visual language, all chosen to fit. Two users asking for "a dashboard" of two different strategies should get two visibly different artefacts, because their strategies, audiences, and risks differ. The named presets further down are worked examples of design moves that have worked — start from one when it genuinely fits, but the headline capability is the freeform path.

Like `/strategy-variants`, this is a **post-processing step**: it runs after the strategy is finished and reviewed, never edits `quality/strategy.md`, and produces derived views with the strategy as the single source of truth. Where `/strategy-variants` re-writes the strategy in prose for a named reader, this skill re-renders it *visually* — and every honesty rule that binds the prose variants binds the pictures too.

## Resolving file paths — do this first

This skill is part of the `quality-strategy` plugin. Before anything else, resolve two absolute paths and use them throughout:

- **PLUGIN_ROOT** — the plugin's install directory: `${CLAUDE_PLUGIN_ROOT}` (Claude Code expands this to an absolute path when it loads this file; read it off and note it down). The grounding file this skill reads — `PHILOSOPHY.md` — lives under it.
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
- **The strategy.** Read `$PROJECT_DIR/quality/strategy.md` end-to-end — not just the TL;DR. The detail is where the honest qualifiers live ("M for the upload path, L for restore"), and those qualifiers are exactly what a lazy rendering flattens away.
- **The companions, if they exist.** `quality/test-strategy.md`, `quality/tooling-strategy.md`, and any `quality/strategy-one-pager.md` / `quality/strategy-client.md` variants. They are optional enrichment: a request like "show what we're building next" draws on the tooling strategy's build plan; a client-facing artefact should follow the client-safe variant's framing where one exists.
- **The request.** The user's own words for what they want to see or share. This is the design brief — treat it as load-bearing input, not as a routing key to a preset.

## The work, in order

### 1. Pin down the brief — one clarifying exchange, then build

From the user's request, you need three things before you can design:

- **Audience** — who will look at this? (Their own team? Twitter? A skeptical client? A wall in the office?) The audience sets the candor level and the visual register, exactly as it does for `/strategy-variants`.
- **Message** — what should a viewer take away in the first five seconds? ("We know where we stand and here's the shape of it." "These three risks are the relaunch.") A strategy contains fifty true statements; an artefact carries about three.
- **Form** — static image to screenshot (SVG), or something to open and explore (HTML)? Any size/shape constraint (a tweet-sized card, a slide, a phone screen)?

Pre-read the request and the strategy, form your best hypothesis for all three, and — **if any of them is genuinely ambiguous — ask once**: a single message presenting your read and the open choices, e.g. *"I'll build a tweet-sized SVG card leading with the three relaunch risks — or did you want the full dimension picture rather than the risk story?"* Then build. Don't interrogate in rounds, and don't silently guess on audience when the request could be internal or external — that choice changes what honesty requires (step 4). If the user is present and answers, follow the answer; if they've said "just build something good", or you asked and got no reply, proceed on your stated hypothesis and record the choices as assumptions in your summary.

### 2. Design the artefact for *this* strategy and *this* request

Before writing any markup, decide — deliberately, as a designer would:

- **What data carries the message.** Pull the load-bearing content from the strategy: usually some slice of the risk map (Part 6) with its confidence ratings, the Dealbreakers (the must-never-fail bars), the headline from the TL;DR, the non-goals when the audience might mistake them for gaps. Use the doc's own dimension names, shortened only if the doc itself shortens them. Resist completeness — the artefact that shows everything shows nothing.
- **The visual form that fits the data.** A gap between required and actual wants overlaid shapes (radar, paired bars). A grid of severity × confidence wants a heatmap. A narrative for outsiders wants a card with a verdict and a few named risks. A working session wants navigation and sortability. Pick the form for the message; don't default to whatever you built last time.
- **A visual identity drawn from the project's character.** A plant-care app can earn botanical warmth; a payments tool can earn ledger austerity; an infrastructure CLI can earn terminal aesthetics. Choose a deliberate palette (3–5 colours), one or two typefaces (see the self-containment rules for how), and one distinctive idea that makes the artefact *this project's* rather than anyone's. The test the design must pass: **would someone actually post this?** If it looks like a default dashboard theme or a generic AI-generated card — evenly-spaced gradient boxes, the same purple-on-white, emoji as decoration — redesign it. (If a frontend-design skill is available in the session, use it; the bar stands either way.)
- **How the uncertainty will be drawn.** Decide this *at design time*, not as an afterthought — see step 4. A treatment that works: Unknowns get a visibly different rendering (hatching, a broken line, a `?` marker, a hue that is on nobody's good-to-bad ramp), never a mid-scale value.

### 3. Build one self-contained file

- **One file per run**, written to `$PROJECT_DIR/quality/artefacts/<descriptive-slug>.html` or `.svg`. Create the directory if needed. The slug names the view, not the mechanism: `relaunch-risks-card.svg`, `standup-dashboard.html`, not `output1.svg`. A re-run of the same view after a strategy revision rewrites the same slug in place from the current strategy — that refresh, not accumulation, is how the views stay living. If the user asked for several views, that's several runs of steps 1–5 — each artefact gets its own design pass, not a batch discount.
- **Self-contained means zero external requests.** No CDN scripts, no Google Fonts, no remote images, no analytics. The file must render fully when opened from `file://` with the network cable pulled. Fonts: use good system font stacks (e.g. a serif stack for display, a mono stack for data), or embed a subset as a data-URI only if the design truly demands it and the file stays reasonably sized.
- **SVG for the static and croppable** — cards, radars, heatmaps. Fixed canvas sized to its destination (a social card is 1200×675; a slide is 16:9). Text as real `<text>` elements, not paths, so it stays selectable and machine-readable.
- **HTML for the interactive** — dashboards, explorable views. Inline CSS and vanilla inline JS only; no frameworks, no build step. Interactivity should serve the reading (collapse/expand, sort, filter, hover detail), not decorate it.
- **Dual legibility — the artefact serves agents too.** Two requirements, from the pack's names-before-coordinates discipline: (i) every value the visualisation encodes is also present as readable text — dimension *names* (not bare ids), levels, confidence letters, in labels or a legend; a viewer should never need to decode geometry to know what's said; (ii) embed the underlying data machine-readably — a `<script type="application/json">` data island in HTML, a `<metadata>` block in SVG — so an agent encountering the artefact can re-derive what it shows without parsing pixels.
- **Provenance caption, on the artefact itself.** Every artefact carries, visibly but unobtrusively: the project name, *derived from quality/strategy.md, <YYYY-MM-DD>*, and — where confidence appears — a one-line key to the H/M/L (High/Medium/Low) vocabulary. The caption is what keeps a screenshot honest after it leaves home.

### 4. The honesty pass — pictures don't get to lie

This is the pack's anti-false-confidence line, applied to graphics. A chart asserts harder than a sentence: a viewer who'd notice "Conf: —" in prose will read a green cell as *fine*. So before calling the artefact done, walk these checks against the body:

- **Never paint an Unknown green — or any colour on the good-to-bad ramp.** A dimension whose actual state is Unknown or Gated (unjudgeable until an oracle — something that can judge the output — exists) is rendered as *visibly unknown*: hatched, broken, `?`-marked, in its own off-ramp hue. It does not get a midpoint score "to keep the chart tidy". On a radar, the actual line *breaks* at an Unknown axis; on a heatmap, the cell reads as uncharted, not as amber.
- **Confidence is part of the picture, not a footnote.** Where the artefact shows levels (required vs actual), it shows the strategy's confidence in them — H/M/L badges, opacity, annotation — using the doc's own coarse vocabulary. Never percentages the doc doesn't contain; no spurious precision.
- **Over-confident actuals render at their evidence, not their vibe.** If the doc says accuracy "feels fine" at confidence L, the artefact shows a low-confidence claim, not a solid good score.
- **No upgrades, no inventions.** Every value, ranking, and verdict in the artefact must be traceable to a statement in the strategy. Scoping down is fine — a "payment risks only" view omits the rest by design — but within its declared scope the artefact never hides a Dealbreaker-at-risk its audience would need, and its title says what the scope is ("Payment & entitlement risks", not "Quality status").
- **External audiences get the variant discipline.** For a client- or public-facing artefact, apply `/strategy-variants`' omit-never-lie rule: internal candor may come out, client-affecting risk may not, and the artefact never asserts quality the body doesn't support. If a client-safe variant document exists, follow its framing; if the tension can't be resolved visually, surface it to the user rather than quietly choosing.

Then re-read the finished artefact as a hostile stranger would — the five-second glance, no caption-reading — and ask: *does the impression match the document?* If the glance says "healthy" and the doc says "mostly Unknown", the design is wrong no matter how correct the details are. Fix the impression, not just the labels.

### 5. Deliver

- Verify the file mechanically, not by assertion: scan it for external references (`http://`, `https://`, and protocol-relative `//` inside `src`, `href`, `url()`, `@import`, `xlink:href`) — there should be none — and confirm the markup is well-formed (e.g. `xmllint --noout` for SVG, or a careful tag-balance read for HTML). For HTML, re-read the inline JS for the interactions you built.
- Tell the user: **where it landed** (the full path), **how to open it** (double-click / `open` / drag into a browser — it works offline), and **how to share it** (screenshot the SVG at full zoom for crisp social images; send the HTML file as-is — it's one file and self-contained).
- Name the design choices and assumptions you made (audience, message, what you scoped out), so the user can correct them cheaply — a re-run with a sharper brief is the intended loop.
- Process notes about *the skill itself* (an awkward instruction, a misfire) go to `$PROJECT_DIR/.skill-feedback.md`, never into the artefact or the strategy.

## Worked examples, not a menu

Four shapes that have worked. Each names the design move so you can adapt it — none is a template to fill in, and a freeform request that fits none of them is the skill working as intended.

- **Quality radar** — dimensions as spokes; the *required* bar as one closed shape, the *actual* state as another; the gap between them is the picture. The move that matters: Unknown axes break the actual line and get hatched wedges with a `?` — the radar shows where the map itself has holes, which is often the real headline. Fits: "where do we stand overall?"
- **Risk heatmap** — risk-map rows × what-the-glance-needs columns (gap severity, confidence), colour as heat with Unknown as its own non-heat treatment. Compact and brutal; the highest-information-per-pixel view. Fits: a skeptical audience, a prioritisation argument.
- **Social / tweet card** — fixed 1200×675 SVG: project name, the one-line quality verdict in the strategy's own voice, the two or three headline risks or commitments, the provenance caption. One idea, big type, no chart junk. Fits: "something I can post."
- **Interactive dashboard** — the strategy as a navigable single-page HTML: the TL;DR up top, collapsible dimensions, a sortable risk map with confidence badges, non-goals where they'll be seen. The strategy as a *living map* rather than a document. Fits: a team working session, a standup anchor.

Derivable from the same moves when asked: per-stakeholder cards ("what does *good* mean for the agents?"), a before/after gap tracker across two strategy revisions, a one-dimension deep-dive for a decision meeting.

## Push back when

- **The user wants the picture friendlier than the doc.** *"I can choose what the artefact emphasises, but I can't show an Unknown as a score or a gap as closed — a picture that flatters the strategy is the false confidence this whole pack exists to prevent. We can instead make the headline 'here's our plan' rather than 'here's our state'."*
- **The strategy is unfinished or unreviewed** and the user wants a shareable anyway. Offer the visibly-watermarked draft route (see When to use) — never an unmarked one.
- **The request needs data the strategy doesn't contain** ("show our test coverage trend"). *"The artefact renders what the strategy knows. If that matters, it belongs in the strategy first — or in the tooling strategy as a build item."* Don't fabricate panels from data you don't have.
- **The user asks for anything hosted, served, or live-updating.** The pack emits files, full stop — no daemon, no service, no embed snippet phoning home. A re-run after each strategy revision is the refresh mechanism, and it's deliberate.

## This skill is DONE when

- [ ] `quality/strategy.md` (and existing companions) read end-to-end, not skimmed.
- [ ] Audience, message, and form pinned down — asked once if ambiguous, assumptions recorded if not asked.
- [ ] Exactly one self-contained `.html` or `.svg` was written under `quality/artefacts/` (new, or the same view refreshed in place), named for its view; it renders offline from `file://` with zero external requests.
- [ ] Every encoded value is also readable as text, and the underlying data is embedded machine-readably.
- [ ] The honesty pass ran: no Unknown/Gated rendered on the good-to-bad ramp; confidence visible in the doc's own vocabulary; nothing asserted the body doesn't support; the five-second impression matches the document.
- [ ] The artefact carries its provenance caption (project, derived-from line with date, confidence key where used).
- [ ] The user was told the path, how to open it, how to share it, and which design choices were assumptions.
- [ ] `quality/strategy.md` untouched.

## Output

- `quality/artefacts/<descriptive-slug>.html` or `.svg` — one bespoke, self-contained artefact per run.
- `quality/strategy.md` and companions are **not modified** by this skill.
