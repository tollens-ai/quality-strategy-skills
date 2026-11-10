#!/usr/bin/env node
// Keeps one file that says where a quality strategy stands, and names the next step.
//
// The file is QUALITY_DIR/strategy-steps.json. This script is the normal way to write it, and the
// file is plain enough to fix by hand. The saved documents are the strategy; this is bookkeeping.
//
// It knows only what it is told. It cannot tell whether an agent read something, whether a person
// agreed to it, or whether a document was edited without a command being run. And it is made for
// one session at a time: if two sessions work on the same strategy at once, one overwrites the
// other's save.
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const FILE = "strategy-steps.json";
// The pack this script ships in: skills/<name>/ and references/ sit beside each other above it.
const PACK = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const ABOUT = "Where this quality strategy stands. Written by the quality-strategy steps script; plain enough to fix by hand.";

// id, skill, label.
const STEPS = [
  ["setup", "quality-setup", "Setup"],
  ["interview", "quality-interview", "Quality interview"],
  ["pre-read", "pre-read", "Pre-read"],
  ["context", "establish-project-context", "Project context"],
  ["priorities", "prioritise-release-quality", "Release priorities"],
  ["connect", "connect-quality-strategy", "Write the strategy up"],
  ["report", "quality-report", "Report"],
];
// Until 28 October 2026 three steps ran between the priorities and the write-up: measurement,
// assessment and plan. Working a priority further now goes in its section of the strategy
// (priority-deepdive). A file that recorded the old steps is read; they are listed by status as
// older records and refused as commands, and their notes stay as records.
const OLD_STEPS = [["measurement", "Plan the measurement"], ["assessment", "Assessment"], ["plan", "Plan of work"]];
const OLD_STEP_HINT = "was a step of an earlier version; this version has no step for it. Working a priority further goes in its section of the strategy, with the skill priority-deepdive";
// A stakeholder's view is one part, taken by one skill.
const PARTS = [
  ["view", "stakeholder-deepdive", "Their view"],
];
// Before 15 October 2026 a view was three parts, levels, what-matters and goals, in three skills.
// A file that recorded them is not read: the owner accepted, on 15 October 2026, that the few people
// with such a strategy would start the view again rather than have it migrated.
// The old records stay in the file untouched, status says so, and the view is started again.
const OLD_PARTS = ["levels", "what-matters", "goals"];
const OLD_HINT = "an older three-part record, which this version does not read: start their view again";
const BEFORE = ["setup", "interview", "context"], AFTER = ["priorities", "connect"];
// done: the user has seen it and answered. skipped: they do not want it, or did not ask for it.
// drafted: the agent worked it out without the user, who has not seen it yet.
// started: work on it is saved and waits on the user, who has not answered it as a whole.
const STATUSES = ["not started", "started", "done", "skipped", "drafted"];

const USAGE = `Usage: steps.mjs <command> --quality-dir <folder>

  status [--json]                           what is done, which step comes next, and the progress
                                            note as saved; "strategy" in the JSON is false when
                                            nothing beyond the answer on committing is recorded

  asked "<what the user asked for>"
  release "<the release this is for>"       add --rename to correct the name of the same release
  mind "<their words>" | mind --nothing     their answer to "anything on your mind?"
  commits yes|no                            whether the agent has leave to commit the quality
                                            documents, as setup asked; --date YYYY-MM-DD

  step <step> <status>                      steps: ${STEPS.map(([id]) => id).join(", ")}
  part "<stakeholder>" view <status>        one stakeholder's whole view ("all" means the same)
                                            statuses: ${STATUSES.join(", ")}
                                            (an older file that recorded levels, what-matters and goals is not
                                            read: start that stakeholder's view again)
                                            (started: under way, waiting on the user; still the next step)
                                            (drafted: by the agent, without the user, who has not seen it)
                                            (recording a status again takes the date and note given now)
    --note "<why>"   --date YYYY-MM-DD

  stakeholders "<name>" "<name>" ...        who matters, in the order to take them
  stakeholder add "<name>"                  also brings back someone who was retired
  stakeholder rename "<old>" "<new>"
  stakeholder retire "<name>"               no longer matters for this release; their record is kept
  stakeholder nobody-here "<name>"          nobody here speaks for them now: they cannot, or would rather wait for the stakeholder
  stakeholder can-speak "<name>"

  draft --to <step> --request "<words>"     drafting without the user: write the assignment for the next
  draft <step> --request "<words>"          step not yet drafted before <step>, or for one step, or for
  draft --stakeholder "<name>" --request .. one stakeholder's view, to a file under .scratch/assignments/,
                                            and print its path with what the parent does next. Records
                                            nothing. --request holds what the user asked for, in their
                                            words, with any source or place they named; --sources "<...>"
                                            anything else they allowed reading.
                                            Until the project context is done or drafted, it refuses:
                                            ask the user once, then add --anyway on their answer, which
                                            records setup skipped where not started, and the interview
                                            from any saved sitting (started or done), else skipped.
                                            A named step or view comes after the pre-read and the context
                                            when those are missing; once it is drafted the same command
                                            says nothing is left (--again drafts it once more).
`;

class Refusal extends Error {}
const refuse = (message) => { throw new Refusal(message); };
const today = () => new Date().toISOString().slice(0, 10);
const isRecord = (value) => typeof value === "object" && value !== null && !Array.isArray(value);
const same = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

const BARE = ["--json", "--nothing", "--rename", "--anyway", "--again"], VALUED = ["--quality-dir", "--note", "--date", "--to", "--request", "--sources", "--stakeholder"];
const ALLOWED = {status: ["json"], asked: [], release: ["rename"], mind: ["nothing"], commits: ["date"],
  step: ["note", "date"], part: ["note", "date"], stakeholders: [], stakeholder: ["note", "date"],
  draft: ["to", "request", "sources", "stakeholder", "anyway", "again", "date"]};
function parse(argv) {
  const flags = {}, words = [];
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i], cut = arg.startsWith("--") ? arg.indexOf("=") : -1;
    const name = cut === -1 ? arg : arg.slice(0, cut), inline = cut === -1 ? undefined : arg.slice(cut + 1);
    if (BARE.includes(name)) {
      if (inline !== undefined) refuse(`${name} takes no value; leave it out when it does not apply`);
      flags[name.slice(2)] = true;
    } else if (VALUED.includes(name)) {
      const value = inline ?? argv[++i];
      if (value === undefined || (inline === undefined && value.startsWith("--"))) refuse(`${name} needs a value after it`);
      flags[name.slice(2)] = value;
    } else if (arg.startsWith("--")) refuse(`unknown option ${name}`);
    else words.push(arg);
  }
  const extra = Object.keys(flags).find((flag) => flag !== "quality-dir" && words[0] in ALLOWED && !ALLOWED[words[0]].includes(flag));
  if (extra) refuse(`--${extra} does not go with the ${words[0]} command`);
  if (flags.date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(flags.date)) refuse("--date takes YYYY-MM-DD");
  return {flags, words};
}

const empty = () => ({about: ABOUT, release: null, asked_for: null, on_mind: null, commits: null, steps: {}, stakeholders: []});

// Reading never throws. Anything it cannot make sense of comes back as a problem, named.
// A file written by an earlier version may carry fields on its items and stakeholders that this
// version does not read (check, cleared, later, brief, returned, come_back): they are kept as they
// are and never printed.
function load(dir) {
  const file = path.join(dir, FILE);
  if (!fs.existsSync(file)) return {state: empty(), missing: true, problems: []};
  const problems = [];
  let raw;
  try { raw = JSON.parse(fs.readFileSync(file, "utf8")); } catch (error) { problems.push(`it is not readable JSON (${error.message})`); }
  if (raw !== undefined && !isRecord(raw)) problems.push("it is not a JSON object");
  if (problems.length) return {state: empty(), problems, file};
  const item = (name, value) => {
    if (!isRecord(value)) return problems.push(`${name} should be an object`);
    if (value.status !== undefined && !STATUSES.includes(value.status)) problems.push(`${name} has the status "${value.status}", which is not one of: ${STATUSES.join(", ")}`);
  };
  if (raw.steps !== undefined && !isRecord(raw.steps)) problems.push('"steps" should be an object of step names');
  else for (const [id, value] of Object.entries(raw.steps ?? {})) item(`steps.${id}`, value);
  if (raw.release !== undefined && raw.release !== null && typeof raw.release !== "string") problems.push('"release" should be the name of the release');
  if (raw.on_mind !== undefined && raw.on_mind !== null && !isRecord(raw.on_mind)) problems.push('"on_mind" should be an object holding their words');
  if (raw.commits !== undefined && raw.commits !== null && !(isRecord(raw.commits) && ["yes", "no"].includes(raw.commits.answer))) problems.push('"commits" should hold the answer yes or no');
  const names = new Set();
  if (raw.stakeholders !== undefined && !Array.isArray(raw.stakeholders)) problems.push('"stakeholders" should be a list');
  else (raw.stakeholders ?? []).forEach((s, i) => {
    if (!isRecord(s) || typeof s.name !== "string" || !s.name.trim()) return problems.push(`stakeholder ${i + 1} has no name`);
    if (names.has(s.name.toLowerCase())) problems.push(`the stakeholder ${s.name} is listed twice`);
    names.add(s.name.toLowerCase());
    if (s.parts !== undefined && !isRecord(s.parts)) return problems.push(`the parts of ${s.name} should be an object`);
    for (const [part, value] of Object.entries(s.parts ?? {})) item(`${part} for ${s.name}`, value);
  });
  if (problems.length) return {state: empty(), problems, file};
  const state = {...empty(), ...raw};
  for (const s of state.stakeholders) s.parts ??= {};
  return {state, problems: []};
}

// The interview helper keeps each sitting's state in the sitting's own folder, and the interview
// skill records the step here only at the wrap-up. So a sitting the user paused is known only
// there, and this script reads it rather than call the sitting not started. The latest sitting is
// the one created last, by the helper's own record: a folder may carry a name, not a date.
const INTERVIEW_STATE = ".interview-state.json";
function sittings(dir) {
  const folder = path.join(dir, "interviews");
  if (!fs.existsSync(folder)) return [];
  return fs.readdirSync(folder, {withFileTypes: true}).filter((e) => e.isDirectory()).map((e) => {
    const file = path.join(folder, e.name, INTERVIEW_STATE);
    if (!fs.existsSync(file)) return null;
    try {
      const state = JSON.parse(fs.readFileSync(file, "utf8")), created = typeof state.created === "string" ? state.created : "";
      return {id: e.name, created, date: created.slice(0, 10) || e.name, stage: state.stage ?? "unknown"};
    } catch { return {id: e.name, created: "", date: e.name, stage: "unreadable"}; }
  }).filter(Boolean).sort((a, b) => a.created.localeCompare(b.created) || a.id.localeCompare(b.id));
}
// What the user stopped at and the next session needs, which this file cannot hold.
const PROGRESS = ".scratch/strategy-progress.md";

const hasOld = (s) => OLD_PARTS.some((id) => s.parts[id] !== undefined);
const unreadable = (loaded) => `${loaded.file} cannot be used as it is: ${loaded.problems.join("; ")}. Nothing was changed. Repair it by hand (git holds the last committed copy, if there is one), or move it aside to start again.`;

// No copy of the previous state is kept: agents deleted it as litter in run after run, and git keeps the history.
// The folder is not created here: a relative --quality-dir run from the wrong directory made a
// stray quality/quality/ with a steps file of its own. Setup or drafting has made the folder before
// anything is recorded in it.
function save(dir, state) {
  if (!fs.existsSync(dir)) refuse(`the folder ${path.resolve(dir)} does not exist; --quality-dir is taken from the current directory (${process.cwd()}). Nothing was created.`);
  const file = path.join(dir, FILE), temp = `${file}.${process.pid}.tmp`;
  fs.writeFileSync(temp, `${JSON.stringify(state, null, 2)}\n`);
  fs.renameSync(temp, file);
}

const statusOf = (item) => item?.status ?? "not started";
const settled = (item) => !["not started", "started"].includes(statusOf(item));
const active = (state) => state.stakeholders.filter((s) => !s.retired);
const labelFor = (place) => place.stakeholder ? `${PARTS.find(([id]) => id === place.id)[2]} for ${place.stakeholder}` : STEPS.find(([id]) => id === place.id)[2];
const itemAt = (state, place) => place.stakeholder ? state.stakeholders.find((s) => same(s.name, place.stakeholder))?.parts[place.id] : state.steps[place.id];
// Every step and every part of every stakeholder.
const everything = (state) => [...STEPS.map(([id]) => ({id})), ...state.stakeholders.flatMap((s) => PARTS.map(([id]) => ({id, stakeholder: s.name})))];

// Every step and part in the order they are taken.
function order(state) {
  const step = (id) => { const [, skill, label] = STEPS.find(([known]) => known === id); return {id, skill, label, item: state.steps[id]}; };
  const parts = active(state).filter((s) => !s.nobody_here)
    .flatMap((s) => PARTS.map(([id, skill, label]) => ({id, skill, label, item: s.parts[id], stakeholder: s.name})));
  return [...BEFORE.map(step), ...parts, ...AFTER.map(step)];
}

// A step under way that waits on the user is still the next step. Until it is finished, the user
// may go on to the step after it, or connect the strategy as it stands, with the gap said. The
// connect offer is dropped once connect is done, because the strategy is already connected.
const waiting = (state, step, item, after) => ({kind: "step", ...step, waiting: true, reason: `started${item.note ? `, ${item.note}` : ", waiting on the user"}`,
  offer_connect: !settled(state.steps.connect) && step.step !== "connect",
  ...(after ? {then: {step: after.id, skill: after.skill, label: after.label, ...(after.stakeholder ? {stakeholder: after.stakeholder} : {}), ...(statusOf(after.item) === "drafted" ? {review: true} : {})}} : {})});

// The one place the order of the steps is decided.
export function next(state) {
  const context = state.steps.context;
  // Drafts the agent made without the user do not hold up the steps the user asked to go on to.
  // Once no step is left to start, each is put to the user in its turn.
  const ordered = order(state), reviewing = ordered.every(({id, item}) => settled(item) || (id === "interview" && settled(context)));
  const at = ordered.findIndex(({id}) => id === "context"), preRead = {id: "pre-read", skill: "pre-read", label: "Pre-read", item: state.steps["pre-read"]};
  const sequence = [...ordered.slice(0, at), preRead, ...ordered.slice(at)];
  for (const [i, {id, skill, label, item, stakeholder}] of sequence.entries()) {
    const step = {step: id, skill, label, ...(stakeholder ? {stakeholder} : {})};
    // What they may go on to while this waits: the next step not settled.
    const after = () => sequence.slice(i + 1).find((place) => place.id !== "interview" && !settled(place.item));
    const firstDraft = () => sequence.slice(i + 1).find((place) => place.id !== "interview" && statusOf(place.item) === "drafted");
    if (id === "interview") {
      // An interview is offered before the project context, and only when something is on their mind.
      // A sitting the user paused is still theirs to finish while the context is only a draft; what
      // they may go on to instead is the first draft to review, because the drafts were made in their
      // absence and rest on what the sitting holds.
      if (settled(item) || ["done", "skipped"].includes(statusOf(context))) continue;
      if (statusOf(item) === "started") return waiting(state, step, item, firstDraft() ?? after());
      if (state.on_mind === null) return {kind: "ask", question: "anything on your mind about this project's quality before we start?"};
      if (state.on_mind.words) return {kind: "step", ...step, reason: "something is on their mind"};
      continue;
    }
    if (id === "priorities" && settled(context) && active(state).length === 0)
      return {kind: "fix", message: `The project context is ${statusOf(context)} but no stakeholders are listed. Record them with the stakeholders command.`};
    if (id === "pre-read") {
      if (statusOf(item) === "started") return waiting(state, step, item, after());
      if (reviewing && statusOf(item) === "drafted") return {kind: "review", ...step};
      continue;
    }
    if (!settled(item)) return statusOf(item) === "started" ? waiting(state, step, item, after()) : {kind: "step", ...step};
    if (reviewing && statusOf(item) === "drafted") return {kind: "review", ...step};
  }
  if (!state.release) return {kind: "fix", message: "Every step is done but the release this strategy is for is not recorded. Record it with the release command."};
  // A stakeholder nobody here can speak for is left out of the order, but a draft made for them
  // still comes back, and a review of it saved part way is still waiting.
  for (const s of active(state).filter((s) => s.nobody_here)) for (const [id, skill, label] of PARTS) {
    if (statusOf(s.parts[id]) === "drafted") return {kind: "review", step: id, skill, label, stakeholder: s.name};
    if (statusOf(s.parts[id]) === "started") return waiting(state, {step: id, skill, label, stakeholder: s.name}, s.parts[id]);
  }
  // The picture to share is offered, not taken in order; a draft of it, or one the user is still
  // reading, still comes back.
  const report = state.steps.report, reportStep = {step: "report", skill: "quality-report", label: STEPS.find(([id]) => id === "report")[2]};
  if (statusOf(report) === "drafted") return {kind: "review", ...reportStep};
  if (statusOf(report) === "started") return waiting(state, reportStep, report);
  return {kind: "complete", offer: settled(report) ? null : "quality-report"};
}

// Documents from before this file was kept. Until what they show is recorded, a step saved here
// would look like the whole of the strategy.
const older = (dir) => ["project-context.md", "strategy.md", "stakeholders"].some((name) => fs.existsSync(path.join(dir, name)));
// Older documents wait to be recorded until setup is settled or a stakeholder is listed.
const importPending = (state, dir) => !settled(state.steps.setup) && state.stakeholders.length === 0 && older(dir);
// Whether this file holds a strategy's bookkeeping. Setup records only the answer on committing, and
// setup is opened for an interview on its own too, so that answer alone does not make a strategy.
const isStrategy = (state) => Boolean(state.release || state.asked_for || state.on_mind !== null
  || Object.keys(state.steps).length || state.stakeholders.length);
const OLDER_HELP = "Read them, tell the user which steps they show as finished, and once the user agrees record them: step setup done, then the release, the stakeholders and each finished step and part.";

// The progress note is read only when it is to be printed. A note that cannot be read is said,
// not thrown: the bookkeeping is already saved by the time the report is written, and an
// error here would make a successful save look like a failed command.
function progressNote(progress) {
  if (!fs.existsSync(progress)) return {text: null};
  try { return {text: fs.readFileSync(progress, "utf8").trim()}; }
  catch (error) { return {text: null, unreadable: error.message}; }
}
// The head points at the return rule rather than stating it, because what to do with the note's
// question depends on who has come back, which the reference settles; the reference
// is kept short enough to be read whole.
const NOTE_HEAD = "Progress note, as saved. Read it before going on. If it says to ask something on return, open the pack's reference on coming back, references/stopping-and-coming-back.md, because it says whose question that is and how it is put:";
const noteLines = (note, progress) => note.unreadable ? ["", `The progress note at ${progress} could not be read (${note.unreadable}). Open it yourself before going on; it may hold a question to ask on return.`] : note.text !== null ? ["", NOTE_HEAD, "", note.text] : [];

// withNote: the status command prints the progress note itself after the steps, because a
// returning agent must read it before the work it came for; a save's report does not repeat it.
function report(loaded, dir, withNote = false) {
  const {state} = loaded;
  const progress = path.join(dir, PROGRESS);
  const note = withNote ? progressNote(progress) : null;
  const withNoteJson = (json) => withNote ? {...json, progress_note: {path: progress, ...note}} : json;
  if (loaded.problems.length)
    return {text: [`${unreadable(loaded)}\n\nNext: repair that file. Until then, read the saved documents to see where the strategy stands.`, ...(withNote ? noteLines(note, progress) : [])].join("\n"), json: withNoteJson({problems: loaded.problems, next: {kind: "repair", file: loaded.file}})};
  const following = next(state), lines = [];
  const show = (label, item) => `${label}: ${statusOf(item)}${item?.date ? ` (${item.date})` : ""}${item?.note ? `, ${item.note}` : ""}`;
  const strategy = isStrategy(state), pending = importPending(state, dir);
  if (!strategy) lines.push(`No strategy is recorded in ${dir} yet${pending ? `, though it holds strategy documents. ${OLDER_HELP}` : state.commits ? ": the answer on committing alone, which setup saves for any work here, is not one." : "."}`);
  else if (pending) lines.push(`${dir} holds strategy documents, and which of their steps are done is not recorded yet. ${OLDER_HELP}`);
  lines.push(`Asked for: ${state.asked_for ?? "not recorded"}`, `Release: ${state.release ?? "not recorded"}`);
  lines.push(`Commits: ${state.commits ? `${state.commits.answer} (${state.commits.date})` : "not recorded"}`);
  lines.push(`On their mind: ${state.on_mind === null ? "not asked" : state.on_mind.words ? `"${state.on_mind.words}"` : "nothing"}`);
  lines.push(`Progress note: ${progress} (${fs.existsSync(progress) ? `last written ${fs.statSync(progress).mtime.toISOString().slice(0, 10)}` : "none yet"})`, "", "Steps:");
  const sitting = state.steps.interview === undefined ? sittings(dir).at(-1) : null;
  for (const [id, , label] of STEPS.slice(0, 4))
    lines.push(`  ${show(label, state.steps[id])}${id === "interview" && sitting ? `; a sitting (${sitting.id}) is saved under interviews/, ${sitting.stage === "complete" ? "complete: record it done" : "unfinished: the user can pick it up with quality-interview"}` : ""}`);
  lines.push("  Stakeholders, in order:");
  if (active(state).length === 0) lines.push("    none listed");
  for (const s of active(state))
    lines.push(s.nobody_here
      ? `    ${s.name}: nobody here speaks for them now (${s.nobody_here.date})${s.nobody_here.note ? `, ${s.nobody_here.note}` : ""}${PARTS.filter(([id]) => s.parts[id]?.status).map(([id, , label]) => `; ${show(label, s.parts[id])}`).join("")}`
      : `    ${s.name}: ${PARTS.map(([id, , label]) => show(label, s.parts[id])).join("; ")}${hasOld(s) && s.parts.view === undefined ? ` (${OLD_HINT})` : ""}`);
  for (const [id, , label] of STEPS.slice(4)) lines.push(`  ${show(label, state.steps[id])}`);
  const olderSteps = OLD_STEPS.filter(([id]) => state.steps[id] !== undefined);
  if (olderSteps.length) lines.push(`  Older steps recorded, which this version does not read (their notes stay as records; the work now goes in the strategy's sections): ${olderSteps.map(([id, label]) => show(label, state.steps[id])).join("; ")}`);
  const drafts = everything(state).map((place) => ({...place, item: itemAt(state, place)})).filter((place) => statusOf(place.item) === "drafted");
  if (drafts.length) lines.push("", "Drafted by the agent without the user, who has not seen them yet:", ...drafts.map((d) => `  ${labelFor(d)}${d.item.note ? `: ${d.item.note}` : ""}`));
  lines.push("");
  const who = following.stakeholder ? ` for ${following.stakeholder}` : "";
  if (following.kind === "ask") lines.push(`Next: ask the user "${following.question}" Record the answer with the mind command.`);
  else if (following.kind === "fix") lines.push(`Next: ${following.message}`);
  else if (following.kind === "review") lines.push(`Next: put the agent's draft of ${following.label}${who} to the user, with the skill ${following.skill}: show it, say what it rests on, and ask. Once they have seen it and answered, record it done.`);
  else if (following.kind === "complete") lines.push(`Next: no step is left. ${statusOf(state.steps.connect) === "done"
    ? "The open questions and next actions are in the strategy's sections; the skill priority-deepdive works one priority further."
    : "The strategy stops at the priorities: the skill connect-quality-strategy writes it up with a section per priority when the user wants that."}${following.offer ? ` Offer the skill ${following.offer}.` : ""}`);
  else {
    const may = [];
    if (following.then) may.push(`go on to ${following.then.review ? "the agent's draft of " : ""}${following.then.label}${following.then.stakeholder ? ` for ${following.then.stakeholder}` : ""}, the skill ${following.then.skill}`);
    if (following.offer_connect) may.push("connect the strategy as it stands, saying at the top of the strategy what is still missing");
    lines.push(`Next: ${following.label}${who}, the skill ${following.skill}${following.reason ? ` (${following.reason})` : ""}.${following.waiting && may.length ? ` Until it is finished, the user may ${may.join(", or ")}: offer that too.` : ""}`);
  }
  if (withNote) lines.push(...noteLines(note, progress));
  const brief = (place) => ({step: place.id, ...(place.stakeholder ? {stakeholder: place.stakeholder} : {})});
  return {text: lines.join("\n"), json: withNoteJson({...state, strategy, older_documents: pending, next: following, drafts: drafts.map(brief)})};
}

const findStakeholder = (state, name) => state.stakeholders.find((s) => same(s.name, name))
  ?? refuse(`no stakeholder named "${name}"; listed: ${state.stakeholders.map((s) => s.name).join(", ") || "none"}`);
// A step by its id, or by the label status shows.
const stepId = (id) => STEPS.find(([step, , label]) => step === id || same(label, id))?.[0]
  ?? (OLD_STEPS.some(([step, label]) => step === id || same(label, id)) ? refuse(`"${id}" ${OLD_STEP_HINT}`) : refuse(`"${id}" is not a step; steps: ${STEPS.map(([step]) => step).join(", ")}`));
const partIds = (part) => {
  if (part === "all") return PARTS.map(([id]) => id);
  if (PARTS.some(([known]) => known === part)) return [part];
  if (OLD_PARTS.includes(part)) refuse(`"${part}" was one of three parts that are now one, and older records of it are not read: record the stakeholder's whole view with "view"`);
  refuse(`"${part}" is not a part; use view, or all, which means the same`);
};

// Every recording is the answer given now: it takes the date given or today's, and only the note
// given now, because a note explains the answer it was given with. Fields an earlier version wrote
// on the item are kept as they are.
function record(state, place, status, flags) {
  if (!STATUSES.includes(status)) refuse(`"${status}" is not a status; use one of: ${STATUSES.join(", ")}`);
  const holder = place.stakeholder ? findStakeholder(state, place.stakeholder).parts : state.steps;
  const item = {...holder[place.id], status};
  delete item.date; delete item.note;
  if (status !== "not started") item.date = flags.date ?? today();
  if (flags.note) item.note = flags.note;
  holder[place.id] = item;
}

function apply(state, dir, command, rest, flags) {
  const imports = ["asked", "release", "mind", "commits", "stakeholders"].includes(command) || (command === "step" && rest[0] === "setup");
  if (importPending(state, dir) && !imports)
    refuse(`this folder holds strategy documents, and which of their steps are done has not been recorded yet. ${OLDER_HELP} Then run this command again.`);
  const one = (what) => (rest.length === 1 && rest[0].trim()) ? rest[0].trim() : refuse(`${command} takes one value in quotes: ${what}`);
  if (command === "asked") state.asked_for = one("what the user asked for");
  else if (command === "release") {
    const title = one("the release this strategy is for");
    if (state.release && state.release !== title && !flags.rename)
      refuse(`this strategy is for "${state.release}". To correct that name, add --rename. A different release needs a strategy of its own, in its own folder.`);
    state.release = title;
  } else if (command === "mind") state.on_mind = {words: flags.nothing && rest.length === 0 ? null : one("their words, or --nothing")};
  else if (command === "commits") {
    const answer = one("yes or no");
    if (!["yes", "no"].includes(answer)) refuse("commits takes yes or no: whether the agent has leave to commit the quality documents");
    state.commits = {answer, date: flags.date ?? today()};
  } else if (command === "step") {
    if (rest.length !== 2) refuse("step takes a step and a status");
    record(state, {id: stepId(rest[0])}, rest[1], flags);
  } else if (command === "part") {
    if (rest.length !== 3) refuse("part takes a stakeholder in quotes, a part and a status");
    const name = findStakeholder(state, rest[0]).name;
    for (const id of partIds(rest[1])) record(state, {id, stakeholder: name}, rest[2], flags);
  } else if (command === "stakeholders") {
    const names = rest.map((name) => name.trim());
    if (names.length === 0 || names.some((name) => !name)) refuse("stakeholders takes one or more names in quotes, in the order to take them");
    if (names.some((name, i) => names.findIndex((other) => same(other, name)) !== i)) refuse("a stakeholder is listed twice");
    const missing = active(state).filter((s) => !names.some((name) => same(name, s.name)));
    if (missing.length) refuse(`this list leaves out ${missing.map((s) => s.name).join(", ")}. Include them, or if they no longer matter for this release use: stakeholder retire "<name>"`);
    const listed = names.map((name) => state.stakeholders.find((s) => same(s.name, name)) ?? {name, parts: {}});
    for (const s of listed) delete s.retired;
    state.stakeholders = [...listed, ...state.stakeholders.filter((s) => !listed.includes(s))];
  } else if (command === "stakeholder") {
    const [action, name, other] = rest;
    if (action === "add" && rest.length === 2 && name.trim()) {
      const known = state.stakeholders.find((s) => same(s.name, name));
      if (known && !known.retired) refuse(`"${name}" is already listed`);
      if (known) delete known.retired; else state.stakeholders.push({name: name.trim(), parts: {}});
    } else if (action === "rename" && rest.length === 3 && other.trim()) {
      const s = findStakeholder(state, name);
      if (!same(s.name, other) && state.stakeholders.some((entry) => same(entry.name, other))) refuse(`"${other}" is already listed`);
      s.name = other.trim();
    } else if (["retire", "nobody-here", "can-speak"].includes(action) && rest.length === 2) {
      const s = findStakeholder(state, name);
      if (action === "retire") s.retired = true;
      if (action === "nobody-here") s.nobody_here ??= {date: flags.date ?? today(), ...(flags.note ? {note: flags.note} : {})};
      if (action === "can-speak") delete s.nobody_here;
    } else refuse('stakeholder takes: add, retire, nobody-here or can-speak with a "<name>", or rename "<old>" "<new>"');
  } else refuse(`unknown command "${command}"\n\n${USAGE}`);
}

// Drafting without the user. The parent runs this before each step and hands what it prints to a
// fresh worker as the whole assignment, so the step's real files, the records and the request are in
// front of whoever drafts at the moment they draft, computed rather than remembered. It prints
// paths, names and status; the rules stay in the files it names. Every "Done when" in the step's
// skill is quoted so the parent can read the draft against it without opening the skill.
const DRAFTABLE = ["pre-read", "context", "priorities", "connect"];
const DIFFERENCES = "skills/draft-strategy-steps/references/when-the-user-is-not-there.md";
// Where each assignment is written: working material in `.scratch/`, not a record.
// A file, because a printout handed on by hand was cut short (`head`) or pasted unexpanded.
const ASSIGNMENTS = "assignments";
const DONE_WHEN = /Done when/;
// The first "Done when" is quoted with the whole section it closes, because it says "reads as above"
// of the account of a good result that precedes it; later ones with their own heading.
function doneWhen(text) {
  const lines = text.split("\n"), out = [];
  let section = -1, heading = -1;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^#+ /.test(line) && !DONE_WHEN.test(line)) { if (/^## /.test(line)) section = i; heading = i; continue; }
    if (!DONE_WHEN.test(line)) continue;
    let end = i;
    for (let j = i + 1; j < lines.length; j++) {
      const next = lines[j];
      if (/^#+ /.test(next)) break;
      if (next.trim() === "" && !/^(\s*[-*]|\s*\d+\.)/.test(lines[j + 1] ?? "")) { if (end > i || !/^#+ /.test(line)) break; else continue; }
      end = j;
    }
    const from = out.length === 0 && section !== -1 ? section : heading;
    out.push(lines.slice(from === -1 ? i : from, end + 1).join("\n").trim());
    i = end;
  }
  return out;
}
const sh = (value) => `'${String(value).replace(/'/g, "'\\''")}'`;
const listRecords = (dir) => {
  const found = [];
  const walk = (folder, depth) => {
    for (const entry of fs.readdirSync(folder, {withFileTypes: true}).sort((a, b) => a.name.localeCompare(b.name))) {
      const full = path.join(folder, entry.name), rel = path.relative(dir, full);
      if (rel === path.join(".scratch", ASSIGNMENTS)) continue;
      if (entry.isDirectory()) { if (depth < 2) walk(full, depth + 1); else found.push(`${rel}/ (${fs.readdirSync(full).length} entries)`); }
      else if (entry.name.endsWith(".md") || entry.name.endsWith(".json")) found.push(rel);
    }
  };
  if (fs.existsSync(dir)) walk(dir, 0);
  return found;
};
function draft(loaded, dir, rest, flags) {
  const {state} = loaded;
  if (importPending(state, dir))
    refuse(`this folder holds strategy documents, and which of their steps are done has not been recorded yet. ${OLDER_HELP} Then run this command again.`);
  const request = flags.request?.trim() || refuse('draft needs --request "<what the user asked for, in their words, with any source or place they named>", because the worker has nothing else to tell it what was asked and what was allowed');
  const forms = [rest.length === 1, Boolean(flags.to), Boolean(flags.stakeholder)].filter(Boolean).length;
  if (forms !== 1 || rest.length > 1) refuse('draft takes one of: --to <step>, a step, or --stakeholder "<name>"');
  // The project context is asked about once before anything is drafted, pre-read included.
  const context = state.steps.context, needsContext = !["done", "drafted"].includes(statusOf(context));
  let changed = false;
  if (needsContext) {
    if (!flags.anyway) refuse("the project context is not done or drafted. Before anything is drafted, ask the user once whether to do the project context together first or have it drafted anyway, say that a context drafted without them is likely to be wrong with every later draft resting on it, and end the message there. On their answer to draft it, run this again with --anyway; if they choose to do it together, open quality-strategy instead.");
    const skipped = () => ({status: "skipped", date: flags.date ?? today(), note: "the user chose to have the strategy drafted without them"});
    if (statusOf(state.steps.setup) === "not started") { state.steps.setup = skipped(); changed = true; }
    // A sitting the user paused is theirs to finish, not a choice to go without; a complete one is done.
    if (statusOf(state.steps.interview) === "not started") {
      const sitting = sittings(dir).at(-1);
      state.steps.interview = !sitting ? skipped()
        : sitting.stage === "complete" ? {status: "done", date: sitting.date, note: `the sitting ${sitting.id} is complete`}
          : {status: "started", date: sitting.date, note: `the sitting ${sitting.id} is unfinished; left for the user to pick up`};
      changed = true;
    }
  }
  // A context recorded without stakeholders leaves no view to draft, and --to would walk straight to
  // the priorities. The names are in the drafted context; recording them is the parent's one step.
  const named = rest.length === 1 ? stepId(rest[0]) : null;
  if (["done", "drafted"].includes(statusOf(context)) && active(state).length === 0 && !["pre-read", "context"].includes(named))
    refuse(`the project context is ${statusOf(context)} but no stakeholders are recorded, so no view can be drafted and the priorities would be drafted on none. Read the context's list of who matters and record them in its order: stakeholders "<name>" "<name>" ... (a drafted context's names are its guesses, and the draft says so). Then run this command again.`);
  // Which place to draft. --to walks the usual order up to, not including, the step named, because
  // "skip to the write-up" asks for the steps between, and the write-up itself is done with the user.
  const sequence = () => {
    const ordered = order(state).filter(({id}) => !["setup", "interview"].includes(id));
    const at = ordered.findIndex(({id}) => id === "context");
    return [...ordered.slice(0, at), {id: "pre-read", skill: "pre-read", label: "Pre-read", item: state.steps["pre-read"]}, ...ordered.slice(at)];
  };
  const toDo = ({id, item}) => id === "context" ? needsContext : !settled(item);
  // A pre-read saved before this request may lack the three readings; step 9 decides, and this is the
  // command to run first if it does. Said once, with the first assignment of the day's loop (nothing
  // else drafted today), and again when nothing is left, so that it is not lost under the stakeholder
  // drafts that were meant to rest on those readings. Not said once today's assignments hold a
  // pre-read one: the addition is recorded nowhere, and its assignment file is the one sign it was run.
  const script = fileURLToPath(import.meta.url);
  const folder = path.join(dir, ".scratch", ASSIGNMENTS), date = flags.date ?? today();
  const assignedToday = (slug) => fs.existsSync(folder) && fs.readdirSync(folder).some((name) => name.startsWith(`${date}-`) && name.endsWith(`-${slug}.md`));
  const addition = () => {
    const preRead = state.steps["pre-read"];
    if (!["done", "drafted"].includes(statusOf(preRead)) || preRead.date === date || assignedToday("pre-read")) return null;
    return `The pre-read is recorded ${statusOf(preRead)} (${preRead.date}). If it was made by an older version without the three readings, or lacks the code, run this first, once, and hand on the assignment file it writes: node ${sh(script)} draft pre-read --again --request ${sh(request)}${flags.sources?.trim() ? ` --sources ${sh(flags.sources.trim())}` : ""} --quality-dir ${sh(dir)}`;
  };
  const firstToday = () => !sequence().some(({id, item}) => id !== "pre-read" && statusOf(item) === "drafted" && item.date === (flags.date ?? today()));
  // Before a named step or view come the pre-read and the context, if they are not there, because
  // the drafts rest on them; after it is drafted, the same command says nothing is left.
  // A settled pre-read (done or drafted) is added to, not drafted: --again prints that one
  // assignment, and the parent runs it once, because the script cannot tell what was added.
  const before = (named) => {
    const seq = sequence(), at = seq.findIndex((place) => place.id === named.id && place.stakeholder === named.stakeholder);
    const first = seq.slice(0, at).filter(({id}) => ["pre-read", "context"].includes(id)).find(toDo);
    if (first) return {...first, then: named};
    const status = statusOf(named.item);
    if (named.id === "pre-read" && ["done", "drafted"].includes(status) && !flags.again)
      return {text: `The pre-read is ${status} (${named.item.date}). Nothing is left for this request: hand back now, as the hand-back in drafting-and-hand-back.md says. If it lacks the three readings or the code, add --again: that prints one assignment for adding what it lacks, run once; the loop ends when its report is accepted.`};
    if (status === "drafted" && !flags.again) return {text: `${labelFor(named)} is drafted already${named.item.note ? ` (${named.item.note})` : ""}. Nothing is left for this request: hand back now, as the hand-back in drafting-and-hand-back.md says. To draft it again, add --again.`};
    return named;
  };
  let place;
  if (flags.to) {
    const target = stepId(flags.to);
    if (!DRAFTABLE.includes(target)) refuse(`--to takes a step after the project context: ${DRAFTABLE.slice(1).join(", ")}`);
    const seq = sequence(), end = seq.findIndex(({id}) => id === target);
    if (end === -1) refuse(`${target} is not on the way: --to takes ${DRAFTABLE.slice(1).join(", ")}`);
    place = seq.slice(0, end).find(toDo);
    if (!place) {
      const label = STEPS.find(([id]) => id === target)[2];
      const lines = [`Nothing is left to draft before ${label}: every step before it is done, skipped or drafted.`,
        `${label} itself is done with the user, so it is not drafted unless they also said not to ask them. If they did, run: draft ${target}. The hand-back then says it is a draft for them to answer.`,
        "Then hand back as the hand-back in drafting-and-hand-back.md says."];
      if (addition()) lines.push(addition());
      return {text: lines.join("\n"), changed};
    }
  } else if (flags.stakeholder) {
    const s = findStakeholder(state, flags.stakeholder);
    if (s.retired) refuse(`${s.name} is retired from this release`);
    if (s.nobody_here) refuse(`nobody here speaks for ${s.name} (${s.nobody_here.date}): the user chose to wait for them, so no view is drafted. Mention them in the hand-back instead.`);
    place = before({id: "view", skill: "stakeholder-deepdive", label: "Their view", item: s.parts.view, stakeholder: s.name});
  } else {
    const id = stepId(rest[0]);
    if (!DRAFTABLE.includes(id)) refuse(`${id} is not drafted without the user; draft takes ${DRAFTABLE.join(", ")}`);
    const [, skill, label] = STEPS.find(([known]) => known === id);
    place = before({id, skill, label, item: state.steps[id]});
  }
  if (place.text) return {text: place.text, changed};
  const status = statusOf(place.item);
  // The write-up is the one finished step drafted again, because it is run again as the sections
  // move: with --again, on the user's request, the new version is a draft over the reviewed one.
  const redrafting = place.id === "connect" && status === "done" && flags.again;
  if (status === "done" && place.id !== "pre-read" && !redrafting)
    refuse(`${labelFor(place)} is done (${place.item.date}): the user has seen and answered it, and a draft is not for a finished step.${place.id === "connect" ? " To draft the write-up again at their request, add --again: the new version is recorded drafted; the version they reviewed is committed first where leave to commit stands, no dated copy is kept, and the decision log says it was drafted again." : " To change it, put the change to the user and record it done again."}`);
  const skillDir = path.join(PACK, "skills", place.skill), skillFile = path.join(skillDir, "SKILL.md"), refsDir = path.join(skillDir, "references");
  if (!fs.existsSync(skillFile)) refuse(`the skill ${place.skill} is not where this script expects it (${skillFile}); the pack is not installed as a whole`);
  const refs = fs.existsSync(refsDir) ? fs.readdirSync(refsDir).filter((name) => name.endsWith(".md")).sort().map((name) => path.join(refsDir, name)) : [];
  const adding = place.id === "pre-read" && ["done", "drafted"].includes(status);
  // The folder is given in full, because the worker may run it from another directory.
  const recordCommand = place.stakeholder
    ? `node ${sh(script)} part ${sh(place.stakeholder)} view drafted --note 'in <file>' --quality-dir ${sh(path.resolve(dir))}`
    : `node ${sh(script)} step ${place.id} drafted --note 'in <file>' --quality-dir ${sh(path.resolve(dir))}`;
  const lines = [
    `Draft ${labelFor(place)}, with the skill ${place.skill}, without the user.`,
    "",
    `The user asked for: ${request}`,
    `Beyond the checkout, what is installed, the records below and anything that request names, ${flags.sources?.trim() ? `they also allowed: ${flags.sources.trim()}` : "they allowed nothing else: read nothing else."}`,
    "",
    `Read first: ${path.join(PACK, DIFFERENCES)}`,
    "Then the step's skill, opening each file it names when the step reaches that part; the skill says which apply:",
    `  ${skillFile}`,
    ...refs.map((file) => `  ${file}`),
  ];
  if (adding) lines.push("", `A pre-read is recorded ${status} (${place.item.date}). Add what it lacks under a dated heading marked as the agent's; redo nothing that is there. This is one assignment: when its report is accepted, do not run draft pre-read again; go on to the next draft command.`);
  if (status === "drafted" && !adding) lines.push("", `A draft exists already${place.item.note ? ` (${place.item.note})` : ""}: draft it again only if the user asked for that.`);
  if (redrafting) lines.push("", `The write-up is recorded done (${place.item.date}): the user reviewed that version. Before writing, where leave to commit stands and the file has uncommitted changes, commit it first, so the repository holds the reviewed version. Keep no dated copy. Then say in the hand-back what is true of the reviewed version: that the repository holds it, where a commit (earlier or now) does; or that it is not kept and the decision log is the only trail, where there is no repository, or it was never committed and leave is declined or the commit fails (a failed commit is said, not hidden). Write the new version from the records as they now stand, say at its top that the agent drafted it on this date without the user and that they have not yet reviewed it, and add a line to the decision log saying the write-up was drafted again on this date at their request. Record it drafted: it stays a draft until they have seen it and it is recorded done.`);
  if (status === "started") lines.push("", `This step is started with the user${place.item.note ? ` (${place.item.note})` : ""}: what is saved is theirs; add the draft under it and keep their answers labelled as theirs.`);
  if (place.stakeholder) {
    const s = findStakeholder(state, place.stakeholder);
    lines.push("", `Stakeholder: ${s.name}.${hasOld(s) ? " An older three-part record exists for them: read it as a dated source and never convert it." : ""} Find any existing profile among the records printed below; assume no filename.`);
  }
  if (place.id === "connect") lines.push("", "The write-up runs its checks and the strategy review as its skill says. Without the user there, put what they would have been asked into the draft, beside the part the question is about.");
  lines.push("", `Where the strategy stands, from ${path.join(dir, FILE)}:`, ...report({state, problems: []}, dir).text.split("\n").map((line) => `  ${line}`));
  const records = listRecords(dir);
  lines.push("", `Files in ${dir} now (use the step's template for a new document):`, ...(records.length ? records.map((rel) => `  ${rel}`) : ["  none yet"]));
  if (adding) lines.push("", `When the addition is saved, record nothing: the pre-read keeps its status${status === "done" ? ", because the user's review of the rest of it stands" : ""}. Label the addition as the agent's with the date, and name it in the hand-back.`);
  else lines.push("", "When the draft is saved, record it:", `  ${recordCommand}`);
  lines.push(
    "Report back: the files opened and the parts done, where the draft is, and what could not be done and why. Tell the user nothing, close nothing, and name no next step.");
  const criteria = doneWhen(fs.readFileSync(skillFile, "utf8"));
  lines.push("", `For the parent's check of the draft, every "Done when" in ${path.basename(skillDir)}/SKILL.md, read with the drafting differences (seen and answered means drafted and labelled):`,
    ...(criteria.length ? criteria.flatMap((c) => c.split("\n").map((line) => `  ${line}`)) : ["  none found"]));
  // The assignment goes to a file; stdout carries only what the parent itself does with it.
  if (!fs.existsSync(dir)) refuse(`the folder ${path.resolve(dir)} does not exist; --quality-dir is taken from the current directory (${process.cwd()}). Nothing was created.`);
  fs.mkdirSync(folder, {recursive: true});
  const count = fs.readdirSync(folder).filter((name) => name.startsWith(`${date}-`)).length + 1;
  const slug = (place.stakeholder ? `view-${place.stakeholder}` : place.id).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const file = path.join(folder, `${date}-${String(count).padStart(2, "0")}-${slug}.md`);
  fs.writeFileSync(file, lines.join("\n") + "\n");
  const out = [
    ...(place.id !== "pre-read" && firstToday() && addition() ? [addition(), ""] : []),
    `Assignment for ${labelFor(place)} written to ${file}`,
    "Hand that file to a fresh subagent as its whole assignment: have it read the file first and follow it. Add nothing from this conversation.",
    `The file ends with every "Done when" of the step, for the check of the draft before the next draft command.`,
  ];
  if (place.then) out.push("", `This comes first because ${labelFor(place.then)} rests on it. When it is drafted and recorded, run the same draft command again for ${labelFor(place.then)}.`);
  return {text: out.join("\n"), changed};
}

function main(argv) {
  const {flags, words} = parse(argv);
  const [command, ...rest] = words;
  if (!command || command === "help") return USAGE;
  const dir = flags["quality-dir"] ?? refuse("--quality-dir <folder> is needed: the folder the quality documents live in");
  const loaded = load(dir);
  if (command === "status") {
    const result = report(loaded, dir, true);
    return flags.json ? JSON.stringify(result.json, null, 2) : result.text;
  }
  if (loaded.problems.length) refuse(unreadable(loaded));
  if (command === "draft") {
    const result = draft(loaded, dir, rest, flags);
    if (result.changed) save(dir, loaded.state);
    return result.text;
  }
  apply(loaded.state, dir, command, rest, flags);
  save(dir, loaded.state);
  return `Saved.\n\n${report({state: loaded.state, problems: []}, dir).text}`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  try { console.log(main(process.argv.slice(2))); }
  catch (error) {
    if (!(error instanceof Refusal)) throw error;
    console.error(`Not saved: ${error.message}`);
    process.exit(2);
  }
}
