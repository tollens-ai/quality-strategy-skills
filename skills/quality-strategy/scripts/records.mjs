#!/usr/bin/env node
// The bookkeeping around a quality strategy's records that needs no reading for meaning: finding
// the quality folder, committing its records when leave was given, and reporting the mechanical
// checks on a strategy document and its priorities table.
//
// where and commit read one field of QUALITY_DIR/strategy-steps.json, "commits", which quality-setup
// records through steps.mjs; nothing here reads prose for what it means. check and table report and
// exit 0: what they find is information for the agent, not a failure. The one refusal (exit 2,
// "Not done: ...") is a command this script cannot carry out, with nothing written.
import fs from "node:fs";
import path from "node:path";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const FILE = "strategy-steps.json";
// Each kind of record and its default place inside the quality folder. A folder kind lists what is in it.
const PLACES = [
  ["strategy.md", "file"], ["project-context.md", "file"], ["pre-read.md", "file"], ["decision-log.md", "file"],
  ["stakeholders/", "files"], ["interviews/", "folders"], ["notes/", "folder"], [".scratch/strategy-progress.md", "file"],
];
// The four parts of a priority's section, in her order, by the start of a heading or a bold lead.
const PARTS = [
  ["what does good look like", /^what does good look like/],
  ["how will we know", /^how (?:[\w/]+ )?we know|^how we will know/],
  ["where it stands now", /^where it stands now/],
  ["what to do about it", /^what to do about it/],
];

const USAGE = `Usage: records.mjs <command> [...]

  where [--quality-dir <folder>] [--json]   the quality folder (given, or the nearest "quality" folder
                                            holding ${FILE} or strategy.md, searching upward
                                            from here), which records exist and where, the default
                                            place for each kind, and whether leave to commit is recorded.
  commit "<step>" --quality-dir <folder>    when ${FILE} records leave to commit ("yes"), stages
                                            the quality folder only and commits it as
                                            "<step>: quality records for <release>"; otherwise says
                                            what was not committed and why. Never pushes.
  check <strategy.md> [--quality-dir <folder>] [--json]
                                            reports: priorities-table rows (other than those rated
                                            None) without a section, and sections without a row;
                                            each section's four parts (what does good look like,
                                            how do/will we know, where it stands now, what to do
                                            about it) missing or out of order;
                                            relative links that do not resolve; the version line;
                                            quoted link text into a transcript that the transcript
                                            does not hold. Fenced code is ignored. With
                                            --quality-dir, also every relative link that does not
                                            resolve in any other Markdown file under that folder
                                            (a summary or topic that links to the strategy, for
                                            one), by file and line. Exit 0 unless the file or
                                            folder is missing.
  table <strategy.md> [--quality-dir <folder>] [--json]
                                            each priorities-table row with what it lacks (a rating,
                                            a bar, a section, counting a heading with nothing under
                                            it as none), and what it may be without and still
                                            be complete ("no reason given": the rating stands as the
                                            owner's); with --quality-dir, each listed stakeholder
                                            whose view is not done, and the profile files saved,
                                            each with its first heading, for you to match, and
                                            each recorded as one nobody here speaks for, which is
                                            noted but does not count as a lack.

A section is a heading whose text matches a row's first cell; a sibling heading in the same run
that matches no row is reported as a section without one, except "The release as a whole", which
the template puts there.
`;

class Refusal extends Error {}
const refuse = (message) => { throw new Refusal(message); };
const same = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();
const isRecord = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
const plain = (text) => text.replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/[*_`~]+/g, "").trim();
const slug = (text) => plain(text).toLowerCase().replace(/[^\p{L}\p{N} -]/gu, "").replace(/ /g, "-");
const fileSlug = (name) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
// The pack fixes no filename for a profile: the deep dive chooses the slug, and the roster keeps
// only the stakeholder's name. Matching files to names by heuristic misattributed profiles twice
// in rc4 (script reviews 1 and 2), so the script claims nothing about whose a profile is: it lists
// each file in stakeholders/ with its first heading, as it is, and the agent, who reads every
// profile at the priorities close anyway, matches them to the names.
function profilesIn(dir) {
  const folder = path.join(dir, "stakeholders");
  if (!fs.existsSync(folder) || !fs.statSync(folder).isDirectory()) return [];
  // Regular files only: a folder named like a profile (a stray `x.md/`) is not one, and reading it
  // as one would abort the whole report (script review rc4, pass 3).
  return fs.readdirSync(folder).filter((f) => f.endsWith(".md") && fs.statSync(path.join(folder, f)).isFile()).sort().map((file) => {
    const heading = fs.readFileSync(path.join(folder, file), "utf8").split(/\r?\n/).find((l) => /^#\s/.test(l))?.replace(/^#\s+/, "").trim() ?? "";
    return {file: path.join("stakeholders", file), heading};
  });
}
const squash = (text) => text.replace(/\s+/g, " ").trim();

const BARE = ["--json"], VALUED = ["--quality-dir"];
const ALLOWED = {where: ["json", "quality-dir"], commit: ["quality-dir"], check: ["json", "quality-dir"], table: ["json", "quality-dir"]};
function parse(argv) {
  const flags = {}, words = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i], cut = arg.startsWith("--") ? arg.indexOf("=") : -1;
    const name = cut === -1 ? arg : arg.slice(0, cut), inline = cut === -1 ? undefined : arg.slice(cut + 1);
    if (BARE.includes(name)) {
      if (inline !== undefined) refuse(`${name} takes no value`);
      flags[name.slice(2)] = true;
    } else if (VALUED.includes(name)) {
      const value = inline ?? argv[++i];
      if (value === undefined || (inline === undefined && value.startsWith("--"))) refuse(`${name} needs a value after it`);
      flags[name.slice(2)] = value;
    } else if (arg.startsWith("--")) refuse(`unknown option ${name}`);
    else words.push(arg);
  }
  const extra = Object.keys(flags).find((flag) => words[0] in ALLOWED && !ALLOWED[words[0]].includes(flag));
  if (extra) refuse(`--${extra} does not go with the ${words[0]} command`);
  return {flags, words};
}

// The steps file, read for its top-level fields only. Unreadable counts as nothing recorded.
function steps(dir) {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(dir, FILE), "utf8"));
    return isRecord(raw) ? raw : {};
  } catch { return {}; }
}
function commitsOf(state) {
  const c = state.commits;
  if (!isRecord(c) || !["yes", "no"].includes(c.answer)) return null;
  return {answer: c.answer, date: typeof c.date === "string" ? c.date : null};
}
const commitsLine = (c) => c ? `${c.answer}${c.date ? ` (${c.date})` : ""}` : "not recorded";

// ---- where ----
const holdsRecords = (dir) => fs.existsSync(path.join(dir, FILE)) || fs.existsSync(path.join(dir, "strategy.md"));
function findQualityDir(from) {
  let dir = path.resolve(from);
  for (;;) {
    for (const candidate of [path.basename(dir) === "quality" ? dir : null, path.join(dir, "quality")]) {
      if (candidate && fs.existsSync(candidate) && fs.statSync(candidate).isDirectory() && holdsRecords(candidate)) return candidate;
    }
    const up = path.dirname(dir);
    if (up === dir) return null;
    dir = up;
  }
}
const list = (dir, keep) => fs.existsSync(dir) ? fs.readdirSync(dir, {withFileTypes: true}).filter(keep).map((e) => e.name).sort() : [];
function where(flags) {
  const dir = flags["quality-dir"] ? path.resolve(flags["quality-dir"]) : findQualityDir(process.cwd());
  if (!dir || !fs.existsSync(dir)) {
    const fallback = path.join(process.cwd(), "quality");
    const text = `no quality folder found; the default place is ${fallback}`;
    return {text, json: {folder: null, default: fallback, documents: [], commits: null}};
  }
  const documents = [];
  for (const [kind, shape] of PLACES) {
    const place = path.join(dir, kind);
    if (shape === "file" || shape === "folder") documents.push({kind, path: place, exists: fs.existsSync(place)});
    else {
      const found = shape === "files" ? list(place, (e) => e.isFile() && e.name.endsWith(".md")) : list(place, (e) => e.isDirectory());
      documents.push({kind, path: place, exists: fs.existsSync(place), items: found.map((name) => path.join(place, name))});
    }
  }
  const commits = commitsOf(steps(dir));
  const lines = [`Quality folder: ${dir}`, "", "Records:"];
  for (const d of documents) {
    if (d.items) {
      lines.push(`  ${d.kind}: ${d.items.length ? "" : "none yet; "}default place ${d.path}`);
      for (const item of d.items) lines.push(`    ${path.relative(dir, item)}: ${item}`);
    } else lines.push(`  ${d.kind}: ${d.exists ? d.path : `not there; default place ${d.path}`}`);
  }
  lines.push("", `Commits: ${commitsLine(commits)}`);
  return {text: lines.join("\n"), json: {folder: dir, documents, commits}};
}

// ---- commit ----
function git(dir, ...args) {
  const r = spawnSync("git", ["-C", dir, ...args], {encoding: "utf8"});
  return {ok: r.status === 0, out: (r.stdout ?? "").trim(), err: (r.stderr ?? "").trim().split("\n")[0] || `git ${args[0]} failed`};
}
function commit(step, flags) {
  const dir = path.resolve(flags["quality-dir"] ?? refuse("--quality-dir <folder> is needed: the folder the quality documents live in"));
  if (!fs.existsSync(dir)) refuse(`the folder ${dir} does not exist`);
  const state = steps(dir), commits = commitsOf(state);
  if (commits?.answer !== "yes") return `Not committed: leave to commit is ${commits ? "no" : "not recorded"}; quality-setup records it`;
  const inside = git(dir, "rev-parse", "--is-inside-work-tree");
  if (!inside.ok || inside.out !== "true") return "Not committed: not in a git repository";
  const added = git(dir, "add", "-A", "--", dir);
  if (!added.ok) return `Not committed: ${added.err}`;
  const staged = spawnSync("git", ["-C", dir, "diff", "--cached", "--quiet", "--", dir]);
  if (staged.status === 0) return "Nothing to commit";
  const release = typeof state.release === "string" && state.release.trim() ? state.release.trim() : "the strategy";
  const made = git(dir, "commit", "-q", "-m", `${step}: quality records for ${release}`, "--", dir);
  if (!made.ok) return `Not committed: ${made.err}`;
  const hash = git(dir, "rev-parse", "--short", "HEAD").out;
  const files = git(dir, "show", "--name-only", "--format=", "HEAD").out.split("\n").filter(Boolean);
  return [`Committed ${hash}: ${step}: quality records for ${release}`, ...files.map((f) => `  ${f}`)].join("\n");
}

// ---- reading a strategy document ----
// Lines inside ``` fences are blanked so nothing below sees them; line numbers stay.
function readDoc(file) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  let fenced = false;
  return lines.map((line) => {
    if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; return ""; }
    return fenced ? "" : line;
  });
}
const headingOf = (line) => { const m = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line); return m ? {level: m[1].length, text: plain(m[2])} : null; };
const cells = (line) => line.trim().replace(/^\|/, "").replace(/\|$/, "").split(/(?<!\\)\|/).map((c) => plain(c));
// The first table whose header's first cell is "Priority": {header, rows: [{cells, line}]}.
function prioritiesTable(lines) {
  for (let i = 0; i + 1 < lines.length; i++) {
    if (!/^\s*\|/.test(lines[i]) || !/^\s*\|?\s*:?-{3,}/.test(lines[i + 1])) continue;
    const header = cells(lines[i]);
    if (!same(header[0] ?? "", "priority")) continue;
    const rows = [];
    for (let j = i + 2; j < lines.length && /^\s*\|/.test(lines[j]); j++) rows.push({cells: cells(lines[j]), line: j + 1});
    return {header, rows: rows.filter((r) => r.cells[0])};
  }
  return null;
}
function headings(lines) {
  const out = [];
  lines.forEach((line, i) => { const h = headingOf(line); if (h) out.push({...h, line: i}); });
  return out;
}
// A row rated None gets no section (the template puts it under "What this release will not do").
const isNone = (row) => same(row.cells[1] ?? "", "none");
const isPlaceholder = (cell) => /^(not( yet)? set\b.*|to be (set|decided|agreed)\b.*|tbd|none yet|unknown|open|\?)$/i.test(cell.trim().replace(/[.!]+$/, ""));
// The one sibling heading the template puts among the sections that is not a priority.
const WHOLE = "the release as a whole";
// Rows matched to headings, rows without one, and sibling headings in the same run without a row.
function sections(lines, table) {
  const all = headings(lines);
  const rows = (table?.rows ?? []).map((r) => r.cells[0]);
  const matched = [], unmatchedRows = [];
  for (const r of table?.rows ?? []) {
    const h = all.find((x) => same(x.text, r.cells[0]));
    if (h) matched.push({row: r.cells[0], ...h}); else if (!isNone(r)) unmatchedRows.push(r.cells[0]);
  }
  const orphans = [];
  if (matched.length) {
    const level = matched[0].level, start = Math.min(...matched.map((m) => m.line));
    for (const h of all) {
      if (h.line < start) continue;
      if (h.level < level) break;
      if (h.level === level && !same(h.text, WHOLE) && !rows.some((row) => same(row, h.text))) orphans.push(h.text);
    }
  }
  return {all, matched, unmatchedRows, orphans};
}
// Which of the four parts a section holds, by first appearance, and whether they come in her order.
function partsOf(lines, section, all) {
  const end = all.find((h) => h.line > section.line && h.level <= section.level)?.line ?? lines.length;
  const seen = [];
  for (let i = section.line + 1; i < end; i++) {
    const h = headingOf(lines[i]), b = /^\s*\*\*(.+?)\*\*/.exec(lines[i]);
    const lead = h ? h.text : b ? plain(b[1]) : null;
    if (lead === null) continue;
    const index = PARTS.findIndex(([, re]) => re.test(lead.toLowerCase()));
    if (index !== -1 && !seen.includes(index)) seen.push(index);
  }
  const missing = PARTS.map(([name], i) => seen.includes(i) ? null : name).filter(Boolean);
  const order = seen.every((v, i) => i === 0 || v > seen[i - 1]) ? "ok" : "out of order";
  return {section: section.text, missing, order};
}
function links(lines) {
  const out = [], re = /(!?)\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
  lines.forEach((line, i) => {
    for (const m of line.matchAll(re)) {
      if (m[1] || /^[a-z][a-z0-9+.-]*:/i.test(m[3])) continue;
      const [target, anchor] = m[3].split("#");
      out.push({text: m[2], target, anchor: anchor ?? null, line: i + 1});
    }
  });
  return out;
}
function check(file, flags) {
  if (!fs.existsSync(file)) refuse(`${path.resolve(file)} does not exist`);
  const lines = readDoc(file), dir = path.dirname(path.resolve(file));
  const table = prioritiesTable(lines);
  const {all, matched, unmatchedRows, orphans} = sections(lines, table);
  const parts = matched.map((s) => partsOf(lines, s, all));
  const slugs = new Set(all.map((h) => slug(h.text)));
  const broken = [], quotes = [];
  for (const link of links(lines)) {
    const shown = `[${link.text}](${link.target}${link.anchor !== null ? `#${link.anchor}` : ""}) at line ${link.line}`;
    if (!link.target) { if (link.anchor && !slugs.has(link.anchor.toLowerCase())) broken.push(shown); continue; }
    const resolved = path.resolve(dir, decodeURIComponent(link.target));
    if (!fs.existsSync(resolved)) { broken.push(shown); if (isTranscript(link.target)) quotes.push(`${shown}: the transcript is missing`); continue; }
    const quoted = /^["“](.+)["”]$/s.exec(link.text.trim());
    if (isTranscript(link.target) && quoted && !squash(fs.readFileSync(resolved, "utf8")).includes(squash(quoted[1]))) quotes.push(`${shown}: not found in ${link.target}`);
  }
  const version = lines.some((l) => /written with the quality-strategy pack/i.test(l)) ? "present" : "missing";
  const folderLinks = flags["quality-dir"] ? folderBrokenLinks(path.resolve(flags["quality-dir"]), path.resolve(file)) : [];
  const json = {table: table ? "found" : "not found", rows: unmatchedRows, sections: orphans, parts, links: broken, version, quotes, folderLinks};
  const out = [];
  if (!table) out.push("Priorities table: none found (a table whose first header cell is Priority)");
  if (unmatchedRows.length) out.push("Rows with no section:", ...unmatchedRows.map((r) => `  ${r}`));
  if (orphans.length) out.push("Sections with no row:", ...orphans.map((s) => `  ${s}`));
  const partLines = parts.filter((p) => p.missing.length || p.order !== "ok")
    .map((p) => `  ${p.section}: ${[p.missing.length ? `missing ${p.missing.join(", ")}` : "", p.order !== "ok" ? "out of order" : ""].filter(Boolean).join("; ")}`);
  if (partLines.length) out.push("Sections whose four parts are not all there in order:", ...partLines);
  if (broken.length) out.push("Links that do not resolve:", ...broken.map((l) => `  ${l}`));
  if (version === "missing") out.push("Version line: missing (no line says \"Written with the quality-strategy pack\")");
  if (quotes.length) out.push("Quotes not found in their transcript:", ...quotes.map((q) => `  ${q}`));
  if (folderLinks.length) out.push("Links in other records that do not resolve:", ...folderLinks.map((l) => `  ${l}`));
  return {text: out.length ? out.join("\n") : "check: nothing to report", json};
}
// Every relative link in every other Markdown file under the quality folder, because the write-up
// edits records besides the strategy (round rc1: an interview summary linked the strategy one
// folder too high, and check over strategy.md alone reported nothing).
function folderBrokenLinks(dir, strategyFile) {
  if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) refuse(`the folder ${dir} does not exist or is not a folder`);
  const out = [];
  const walk = (d) => {
    for (const e of fs.readdirSync(d, {withFileTypes: true}).sort((a, b) => a.name.localeCompare(b.name))) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) { if (e.name !== ".git") walk(f); continue; }
      if (!e.name.endsWith(".md") || f === strategyFile) continue;
      const lines = readDoc(f), slugs = new Set(headings(lines).map((h) => slug(h.text)));
      for (const link of links(lines)) {
        // The same two tests as the strategy's own links: a same-document anchor against this
        // file's headings, a relative target against the files (script review rc1: anchors were skipped).
        const broken = link.target ? !fs.existsSync(path.resolve(path.dirname(f), decodeURIComponent(link.target)))
          : link.anchor !== null && !slugs.has(link.anchor.toLowerCase());
        if (broken) out.push(`${path.relative(dir, f)}: [${link.text}](${link.target}${link.anchor !== null ? `#${link.anchor}` : ""}) at line ${link.line}`);
      }
    }
  };
  walk(dir);
  return out;
}
const isTranscript = (target) => /(^|\/)interviews\/.*transcript\.md$/.test(target);

// ---- table ----
function table(file, flags) {
  if (!fs.existsSync(file)) refuse(`${path.resolve(file)} does not exist`);
  const lines = readDoc(file);
  const found = prioritiesTable(lines);
  const {all, matched, unmatchedRows} = sections(lines, found);
  // A heading with nothing under it before the next heading at its level or above is not a
  // section: a writer made empty headings to satisfy this command, saw "complete", and removed
  // them, leaving links to nowhere (rc1 reruns, Opus priorities).
  const empty = new Set(matched.filter((m) => {
    const end = all.find((h) => h.line > m.line && h.level <= m.level)?.line ?? lines.length;
    return !lines.slice(m.line + 1, end).some((l) => l.trim());
  }).map((m) => m.row));
  // "lacks" is a cell or section the strategy needs and does not have. "notes" is a state the
  // template allows and a writer must not repair: a rating with no reason stands as the owner's
  // with nothing invented, and a stakeholder nobody here speaks for says so (round ss3: a writer
  // filled four Why cells because this command called them lacking).
  const rows = (found?.rows ?? []).map((r) => {
    const lacks = [], notes = [];
    if (!r.cells[1]) lacks.push("a rating");
    // A cell that only says the bar is not there ("Not set", "TBD", "?") is no bar (rc3b: a writer
    // carried "Not set." from an older strategy and this command called the row complete).
    if ((!r.cells[2] || isPlaceholder(r.cells[2])) && !isNone(r)) lacks.push("a bar");
    if (!r.cells[4]) notes.push("no reason given");
    if (unmatchedRows.includes(r.cells[0]) && !isNone(r)) lacks.push("a section");
    else if (empty.has(r.cells[0]) && !isNone(r)) lacks.push("a section (the heading has nothing under it)");
    return {priority: r.cells[0], lacks, notes};
  });
  const stakeholders = [];
  if (flags["quality-dir"]) {
    const dir = path.resolve(flags["quality-dir"]);
    // A stakeholder steps.mjs has retired is left out, as `status` leaves them out (rc3, O71).
    const listed = (Array.isArray(steps(dir).stakeholders) ? steps(dir).stakeholders : []).filter((s) => isRecord(s) && typeof s.name === "string" && !s.retired);
    for (const s of listed) {
      const lacks = [], notes = [], status = s.parts?.view?.status ?? "not started";
      if (isRecord(s.nobody_here)) notes.push(`nobody here speaks for them${s.nobody_here.date ? ` (${s.nobody_here.date})` : ""}`);
      else {
        if (status !== "done") lacks.push(`a view done (${status})`);
      }
      stakeholders.push({name: s.name, lacks, notes});
    }
  }
  const line = (name, lacks, notes, complete) => `  ${name}: ${[lacks.length ? `lacks ${lacks.join(", ")}` : "", ...notes].filter(Boolean).join("; ") || complete}`;
  const out = [];
  if (!found) out.push("Priorities table: none found (a table whose first header cell is Priority)");
  else if (!rows.length) out.push("Priorities table: no rows");
  else out.push("Priorities:", ...rows.map((r) => line(r.priority, r.lacks, r.notes, "complete")));
  const profiles = flags["quality-dir"] ? profilesIn(path.resolve(flags["quality-dir"])) : [];
  if (stakeholders.length) out.push("Stakeholders:", ...stakeholders.map((s) => line(s.name, s.lacks, s.notes, "view done")));
  if (flags["quality-dir"]) out.push(profiles.length
    ? `Profiles saved in stakeholders/ (match them to the names above yourself; the script does not compare names): ${profiles.map((p) => `${path.basename(p.file)}${p.heading ? ` "${p.heading}"` : " (no heading)"}`).join(", ")}`
    : "Profiles saved in stakeholders/: none");
  return {text: out.join("\n"), json: {rows, stakeholders, profiles}};
}

function main(argv) {
  const {flags, words} = parse(argv);
  const [command, ...rest] = words;
  if (!command || command === "help") return USAGE;
  if (!(command in ALLOWED)) refuse(`unknown command ${command}; the commands are ${Object.keys(ALLOWED).join(", ")}`);
  if (command === "where") { const r = where(flags); return flags.json ? JSON.stringify(r.json, null, 2) : r.text; }
  if (command === "commit") return commit(rest[0] ?? refuse('the step is needed: commit "<step>" --quality-dir <folder>'), flags);
  const file = rest[0] ?? refuse(`the strategy document is needed: ${command} <strategy.md>`);
  const r = command === "check" ? check(file, flags) : table(file, flags);
  return flags.json ? JSON.stringify(r.json, null, 2) : r.text;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try { console.log(main(process.argv.slice(2))); }
  catch (error) {
    if (!(error instanceof Refusal)) throw error;
    console.error(`Not done: ${error.message}`);
    process.exit(2);
  }
}
