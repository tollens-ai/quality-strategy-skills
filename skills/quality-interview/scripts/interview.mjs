#!/usr/bin/env node
// Saves a quality-interview sitting and keeps its small state machine. Node.js standard library only.
// The agent passes what was said and its judgments, including the number a question was shown under;
// this script assigns IDs, keeps the transcript verbatim and append-only, tracks which numbered questions
// are still open, writes every file atomically, tracks the stage, and says what comes next.
// Run with --help for the commands and their fields.
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

export const STATE_FILE = ".interview-state.json";
export const SUMMARY_FILE = "quality-interview-summary.md";
export const OPENER = "When you think about this project right now, what’s on your mind?";
const CHOICES = ["end", "continue", "unclear"];
const OFFERS = ["checkin", "seam", "exhaustion"];
const SOURCES = ["chosen", "stated_default"];
const PACING_SOURCES = ["agreed", "stated_default", "fallback"];
const ID = /^[a-z0-9][a-z0-9-]*$/u;
// A quotation in single quotes: 'like this' or ‘like this’, but not an apostrophe inside a word.
const SINGLE_QUOTED = /(^|[\s(\[])'[^'\n]{3,}'(?=$|[\s.,;:!?)\]])|\u2018[^\u2019\n]{3,}\u2019/u;

export const HELP = `Usage: node interview.mjs <command> [--input request.json | --json '{...}'] [--session DIR] [--quality-dir DIR]

Every command prints one JSON result. "next" says what to do now, with a plain "hint".
A refusal exits 2 and names the defect and its repair; nothing is written. Repeating a
successful write is a no-op. Write long text into a request file.
--session DIR is the same as the "session" field: the folder start returned. For status, a relative
--session or --quality-dir is read from the current directory. start takes neither option; its
quality_dir is absolute, because it creates folders.

start     Create the sitting once home and audience are settled. Fields:
            quality_dir      folder holding the quality records; the sitting goes in quality_dir/interviews/<date>/
            home_source      "chosen" (the user chose it) or "stated_default" (you described a default or
                             existing arrangement and they left it); neither means access was verified
            audience         {"reason": who the records are for and why, with any access uncertainty,
                              "source": "chosen" or "stated_default"}
            title            optional {"text", "source"}; default "Quality interview summary", stated_default
            pacing           {"words": the guide as you stated it, "min", "max" (whole numbers; omit both for
                              no count-based check-ins), "source": "agreed" (they chose or accepted a range),
                              "stated_default" (they left your guide in place) or "fallback" (only when
                              recovering a lost choice)}
            turns            the setup exchanges in order, copied from what was actually said:
                             [{"speaker": "interviewer" or "user", "text", "topics"?: [...] on a user turn}];
                             [] when a saved arrangement settled set up and the opening message ends with
                             Question 1, which record then saves with the first reply
            id               optional folder name
record    Save one reply. Fields:
            session          the sitting folder
            asked            your turn exactly as delivered (question, check-in, reflection or catch-up)
            question         the number your turn showed, when it asked a numbered question. "Question N" must
                             appear in asked, and a label ("Question N" beginning a line, or "Question N:")
                             needs this field; null says a turn that mentions one is not itself that question
            answered         true or false, needed with question: did the reply answer it? false when they
                             asked what it meant, said something related instead, or answered only part: it
                             stays open under its number. A refusal counts as answered
            also_answered    earlier questions this reply answered, by number, e.g. [9] when they come back to
                             one or answer several at once: those are no longer open
            reply            the user's words, verbatim
            topics           one entry per topic the reply touched:
                             {"id": kebab-case, "label": the user's name for it, "status": "open" or "closed",
                              "interest"?: what showed interest, "next": the next question or why it waits}
            offer            "checkin", "seam" or "exhaustion" when "asked" offered to wrap up
            choice           "end", "continue" or "unclear": needed when a check-in or the reflection is
                             open; "end" also marks the user ending the questions on their own: a stop, or
                             "nothing more" in reply to a question that invited anything else on their mind
                             about the project, when no open topic still has a question their interest
                             supports ("nothing more" to a follow-up about one concern finishes that concern
                             only; with such a question still open they had nothing new to add). It moves
                             the sitting to the reflection. A choice left out can be added by repeating the
                             same record with it: nothing is saved twice, and no state is edited by hand
topic     Save a topic record (topics/<id>.md); a changed record replaces the file, and the transcript
            holds the earlier turns, so no copy of the earlier record is kept.
            session, topic: {"id", "label"?, "status": "open" or "closed", "about": claim,
              "interviewer_read"?: {"interest": how interested they seemed, in your words, "provenance"?, "turns"?, "basis"?},
              "notes": [claim], "questions": [text], "on_hold": reason or null, "merged_into": id or null}
            claim = {"text", "provenance"?: where this comes from, in your words (they said it, you inferred it, ...),
                     "turns"?: [turn ids, which must exist], "basis"?: what establishes it and how strongly, "proxy"?: true}
            An open topic may have no questions and no on_hold: it is simply left for later.
            Put the person's exact words in double quotes; quoted words must appear in the transcript. To quote
            a passage that itself contains "quotation marks", wrap it in curly quotes: “... "..." ...”.
check     Read-only: whether finish would succeed (the summary is saved and its quotes are in the transcript),
            and quoted words found only in interviewer turns. Paraphrase documents and cite the path.
reflect   Save a reflection given as a statement, with no question, because the user had already said
            to stop and not to answer more ("no, just save it"). Fields: session, said: the reflection as
            delivered. The sitting moves to write-up; the summary must say the reflection was not answered.
            If they answer it after all, record their words with record (no asked): that reply is the
            reflection's, and the decline is lifted; choice "continue" reopens the questions as usual.
finish    Mark the sitting complete once the summary is saved. Fields: session, names?: the names choice.
pause     Mark the sitting unfinished. Fields: session, remaining: what is left, in plain words,
            said?: a closing turn of yours not yet saved. The sitting stays unfinished through replies
            saved after it (a closing reply, catch-up answers on return) until a reply carries a
            question number, a choice, an offer or also_answered: that is the interview going on.
status    Read-only. With --session: the sitting's state, open questions, topics and next step. With --quality-dir: every sitting.
`;

// ---------- small helpers ----------

class Refusal extends Error {
  constructor(name, defect) { super(defect); this.refusalName = name; }
}
const refuse = (name, defect) => { throw new Refusal(name, defect); };
const isText = (value) => typeof value === "string" && value.trim() !== "";
const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);
const now = () => new Date().toISOString();
const turnId = (index) => `turn-${String(index + 1).padStart(3, "0")}`;
const turnIndex = (id) => Number(id.slice(5)) - 1;
const stable = (value) => JSON.stringify(value, (key, v) => (isObject(v) ? Object.fromEntries(Object.keys(v).sort().map((k) => [k, v[k]])) : v));

function need(condition, defect, name = "INVALID_INPUT") { if (!condition) refuse(name, defect); }

function onlyKeys(value, allowed, label) {
  need(isObject(value), `${label} must be an object`);
  for (const key of Object.keys(value)) need(allowed.includes(key), `${label} has unknown field "${key}"; allowed: ${allowed.join(", ")}`);
}

export function atomicWrite(target, text) {
  fs.mkdirSync(path.dirname(target), {recursive: true});
  const temporary = path.join(path.dirname(target), `.${path.basename(target)}.${process.pid}.${Date.now()}.tmp`);
  const fd = fs.openSync(temporary, "w");
  try { fs.writeFileSync(fd, text, "utf8"); fs.fsyncSync(fd); } finally { fs.closeSync(fd); }
  fs.renameSync(temporary, target);
}

function absolute(value, label) {
  need(isText(value) && path.isAbsolute(value), `${label} must be an absolute path`);
  return path.resolve(value);
}

function load(sessionDir) {
  need(isText(sessionDir), "session must name the sitting folder start returned");
  const dir = path.resolve(sessionDir);
  const file = path.join(dir, STATE_FILE);
  if (!fs.existsSync(file)) refuse("NO_SESSION", `no interview sitting at ${dir} (missing ${STATE_FILE}). A folder the helper cannot load cannot be resumed: read its files as a record and start a new sitting.`);
  return {dir, state: JSON.parse(fs.readFileSync(file, "utf8"))};
}

function save(dir, state) {
  state.updated = now();
  atomicWrite(path.join(dir, STATE_FILE), `${JSON.stringify(state, null, 2)}\n`);
  render(dir, state);
}

// ---------- derived facts ----------

// A question number identifies one question. The number is declared by the caller (`question`), never read
// from a turn's text, and a question stays open from a reply that left it unanswered (`answered: false`
// on that reply) until a reply to it answers it. Sittings saved before `answered` existed have none: all
// their questions count as answered.
const askedNumbers = (state) => new Set(state.turns.filter((turn) => turn.question).map((turn) => turn.question));
const questionCount = (state) => askedNumbers(state).size;
const nextNumber = (state) => Math.max(0, ...askedNumbers(state)) + 1;
const hasContent = (state) => state.replies.some((reply) => reply.topics.length > 0);

function openQuestions(state) {
  const open = new Set();
  for (const reply of state.replies) {
    for (const earlier of reply.also_answered ?? []) open.delete(earlier);
    const number = reply.asked ? state.turns[turnIndex(reply.asked)].question : null;
    if (!number) continue;
    if (reply.answered === false) open.add(number);
    else open.delete(number);
  }
  // A stop before anything substantive was said leaves the opener unanswered: a return asks it again.
  if (state.restart_at_opener && !hasContent(state) && askedNumbers(state).has(1)) open.add(1);
  return [...open].sort((a, b) => a - b);
}

// The number of a "Question N" label in one line of a turn: the line begins with it, or it is followed by a
// colon after other words ("Back to **Question 9**: ..."). "As you said in Question 3" is a mention, not a label.
export function questionNumber(line) {
  const match = /^[\s*_#>]*question\s+(\d+)\b/iu.exec(line) ?? /\bquestion\s+(\d+)[*_]*\s*:/iu.exec(line);
  return match ? Number(match[1]) : null;
}

// Latest delta per topic id, plus the turns each topic was discussed in.
function topicView(state) {
  const topics = new Map();
  for (const reply of state.replies) {
    for (const delta of reply.topics) {
      const entry = topics.get(delta.id) ?? {id: delta.id, turns: [], interest: []};
      Object.assign(entry, {label: delta.label, status: delta.status, next: delta.next ?? null, last_turn: reply.reply, merged_into: null});
      if (delta.interest) entry.interest.push(`${reply.reply}: ${delta.interest}`);
      entry.turns.push(...[reply.asked, reply.reply].filter(Boolean));
      topics.set(delta.id, entry);
    }
  }
  for (const [id, versions] of Object.entries(state.topic_records)) {
    if (!topics.has(id)) topics.set(id, {id, turns: [], last_turn: null, ...pick(versions.at(-1).record)});
  }
  return [...topics.values()].map((topic) => {
    const versions = state.topic_records[topic.id];
    const through = versions?.at(-1).through ?? null;
    const current = Boolean(versions) && (topic.last_turn === null || (through !== null && turnIndex(through) >= turnIndex(topic.last_turn)));
    // Once a current topic record exists, its status is the one to show, and a record written up under
    // another topic says so, because the progress table is where what was raised is read at a glance.
    const status = current ? versions.at(-1).record.status : topic.status;
    // A join shows only while its record is current: a later reply that reopens the topic means it
    // is a topic of its own again until the write-up says otherwise.
    const merged_into = current ? versions.at(-1).record.merged_into ?? null : null;
    return {...topic, status, merged_into, record: versions ? (current ? "current" : "behind") : "none"};
  });
}
const pick = (record) => ({label: record.label, status: record.status, interest: [], next: null, merged_into: record.merged_into ?? null});
const pendingTopics = (state) => topicView(state).filter((topic) => topic.record !== "current").map((topic) => topic.id);

// A count-based check-in is suggested at the range's lower number, then at its upper number, and no more.
function checkinDue(state) {
  const {min, max} = state.config.pacing;
  if (min == null || state.open_offer) return false;
  // Not while the latest reply to a numbered question left it open: that question comes first.
  const latest = state.replies.findLast((reply) => reply.asked && state.turns[turnIndex(reply.asked)].question);
  if (latest?.answered === false) return false;
  const points = [...new Set([min, max])];
  const made = state.checkins ?? 0;
  return made < points.length && questionCount(state) >= points[made];
}

function pacingWords(state) {
  return `you are at about the length you mentioned at the start (${JSON.stringify(state.config.pacing.words)}); ask whether to wrap up or keep going`;
}

// A question left unanswered keeps its number; only a new question takes the next one.
function openHint(open, number) {
  const one = open.length === 1;
  const names = one ? `Question ${open[0]} is` : `Questions ${open.slice(0, -1).join(", ")} and ${open.at(-1)} are`;
  return `${names} still open: return to ${one ? "it" : "one"} under its number when it fits. A new question is Question ${number}.`;
}

export function next(state, stage = state.stage) {
  const count = questionCount(state);
  const number = nextNumber(state);
  const open = openQuestions(state);
  const openField = open.length ? {open} : {};
  if (stage === "complete") return {do: "done", hint: "The sitting is complete. Close with where the summary is and what stays open."};
  if (stage === "unfinished") {
    const then = next(state, state.resume_stage);
    const hint = state.resume_stage === "reflection"
      ? `Unfinished: ${state.remaining} The reflection is still owed: fold any catch-up into its one question (see returning to a pending reflection).`
      : `Unfinished: ${state.remaining} Catch up with the user, then: ${then.hint}`;
    return {do: "resume", stage: state.resume_stage, remaining: state.remaining, then, hint};
  }
  if (stage === "writeup") {
    const pending = pendingTopics(state);
    return {do: "write-up", pending_topics: pending,
      hint: pending.length ? `Bring these topic records up to date: ${pending.join(", ")}. Then write the summary, check, and finish.` : "Write the summary, then check and finish."};
  }
  if (stage === "reflection") {
    return state.reflection
      ? {do: "clarify", about: "reflection", hint: "The reflection is still open: answer or clarify, and record their reply with a choice."}
      : {do: "reflect", hint: "Read back what you heard, ask once what they would change or add, and record the reply with a choice."};
  }
  if (state.open_offer) return {do: "clarify", about: state.open_offer.kind, hint: "Your check-in is still waiting for an answer: answer or clarify, and record their reply with a choice."};
  if (checkinDue(state)) return {do: "checkin", question_count: count, ...openField, hint: `Offer a check-in: ${pacingWords(state)}.`};
  // The opener is Question 1 whenever it is due: not yet asked, or asked and still open.
  if (count === 0 || open.includes(1)) return {do: "ask", question: 1, opener: true, ...openField, hint: "Ask Question 1, the interview's first question, word for word."};
  return {do: "ask", question: number, opener: false, ...openField, hint: open.length ? openHint(open, number) : `Ask Question ${number}.`};
}

// ---------- validation ----------

function validateDeltas(topics, label) {
  need(Array.isArray(topics), `${label} must be a list`);
  const seen = new Set();
  for (const [i, topic] of topics.entries()) {
    const at = `${label}[${i}]`;
    onlyKeys(topic, ["id", "label", "status", "interest", "next"], at);
    need(isText(topic.id) && ID.test(topic.id), `${at}.id must be kebab-case, such as "release-timing"`);
    need(!seen.has(topic.id), `${label} lists ${topic.id} twice; merge them into one entry`);
    seen.add(topic.id);
    need(isText(topic.label), `${at}.label must be the user's name for the topic`);
    need(["open", "closed"].includes(topic.status), `${at}.status must be "open" or "closed"`);
    need(topic.interest == null || typeof topic.interest === "string", `${at}.interest must be text`);
    need(topic.next == null || typeof topic.next === "string", `${at}.next must be text`);
    need(topic.status === "closed" || isText(topic.next), `${at} is open, so give "next": the next question, or why it waits`);
  }
  return topics.map((topic) => Object.fromEntries(Object.entries(topic).filter(([, v]) => v != null)));
}

// A claim's provenance is free text or absent; only the turns it cites are checked, against the transcript.
function claimDefect(claim, at, turns, {read = false} = {}) {
  onlyKeys(claim, read ? ["interest", "provenance", "turns", "basis"] : ["text", "provenance", "turns", "basis", "proxy"], at);
  need(isText(read ? claim.interest : claim.text), `${at}.${read ? "interest" : "text"} must be non-empty`);
  need(claim.provenance == null || isText(claim.provenance), `${at}.provenance must be text`);
  const cited = claim.turns ?? [];
  need(Array.isArray(cited) && cited.every(isText), `${at}.turns must be a list of turn ids`);
  for (const id of cited) need(turns.has(id), `${at} cites ${id}, which is not in the transcript`);
  need(claim.basis == null || isText(claim.basis), `${at}.basis must be text`);
  if (claim.proxy != null) need(claim.proxy === true || claim.proxy === false, `${at}.proxy must be true or false`);
}

function validateTopicRecord(topic, state) {
  onlyKeys(topic, ["id", "label", "status", "about", "interviewer_read", "notes", "questions", "on_hold", "merged_into"], "topic");
  need(isText(topic.id) && ID.test(topic.id), "topic.id must be kebab-case");
  const turns = new Set(state.turns.map((turn) => turn.id));
  const latestLabel = topicView(state).find((t) => t.id === topic.id)?.label;
  const record = {
    id: topic.id, label: topic.label ?? latestLabel, status: topic.status, about: topic.about,
    interviewer_read: topic.interviewer_read ?? null, notes: topic.notes ?? [], questions: topic.questions ?? [],
    on_hold: topic.on_hold ?? null, merged_into: topic.merged_into ?? null,
  };
  need(isText(record.label), "topic.label is needed: no saved reply names this topic");
  need(["open", "closed"].includes(record.status), 'topic.status must be "open" or "closed"');
  claimDefect(record.about, "topic.about", turns);
  if (record.interviewer_read !== null) claimDefect(record.interviewer_read, "topic.interviewer_read", turns, {read: true});
  need(Array.isArray(record.notes), "topic.notes must be a list");
  record.notes.forEach((note, i) => claimDefect(note, `topic.notes[${i}]`, turns));
  need(Array.isArray(record.questions) && record.questions.every(isText), "topic.questions must be a list of question texts");
  need(record.on_hold === null || isText(record.on_hold), "topic.on_hold must be text or null");
  if (record.merged_into !== null) {
    need(isText(record.merged_into) && ID.test(record.merged_into) && record.merged_into !== record.id, "topic.merged_into must name another topic id");
    need(record.status === "closed", "a merged topic is closed");
  }
  // An open topic may carry questions to pick up or an on_hold reason, or neither: left for later with
  // what the person said is unknown, and no question invented to satisfy the record.
  if (record.status === "closed") need(record.on_hold === null, "a closed topic has on_hold null");
  const missing = quotesMissing([record.about.text, ...record.notes.map((note) => note.text)].join("\n\n"), state.turns);
  need(missing.length === 0, `quoted words not found in the transcript: ${missing.map((q) => JSON.stringify(q)).join("; ")}. Quote only words said in the conversation, or drop the quotation marks; paraphrase a document and cite its path.`, "QUOTE_NOT_IN_TRANSCRIPT");
  return record;
}

// ---------- quotation check ----------

// Backticks are dropped on both sides, so a quotation keeps a file name the user said in code.
function normalise(text) {
  return text.replace(/[‘’ʼ]/gu, "'").replace(/[“”]/gu, '"').replace(/`/gu, "").replace(/\s+/gu, " ").trim().toLowerCase();
}

// Double-quoted phrases outside code. An ellipsis or [bracketed insertion] splits a quotation into parts
// that must appear in order in one turn. A straight quote may wrap lines but not cross a blank line.
// An inline code span keeps its words, because `site.yaml` inside a quotation is part of what was
// said; only a span that itself holds a double quote, straight or curly, is blanked, so it cannot
// open or close one.
export function quotations(text) {
  const prose = text.replace(/```[\s\S]*?```/gu, " ").replace(/`([^`\n]*)`/gu, (_, inner) => (/["“”]/u.test(inner) ? " " : inner));
  const found = [];
  for (const match of prose.matchAll(/“([^”]+)”|"((?:[^"\n]|\n(?![ \t]*\n))+)"/gu)) {
    const quote = (match[1] ?? match[2]).replace(/\s+/gu, " ").trim();
    const parts = quote.split(/\.\.\.|…|\[[^\]]*\]/u).map((part) => normalise(part).replace(/^[\s,;:]+|[\s.,;:!?]+$/gu, "")).filter(Boolean);
    if (parts.length) found.push({quote, parts});
  }
  return found;
}

function turnHas(turn, parts) {
  const said = normalise(turn.text);
  let from = 0;
  for (const part of parts) {
    const at = said.indexOf(part, from);
    if (at < 0) return false;
    from = at + part.length;
  }
  return true;
}

export function checkQuotes(text, turns) {
  const missing = [];
  const interviewerWords = [];
  const quotes = quotations(text);
  for (const {quote, parts} of quotes) {
    if (turns.some((turn) => turn.speaker === "user" && turnHas(turn, parts))) continue;
    const other = turns.find((turn) => turn.speaker !== "user" && turnHas(turn, parts));
    if (other) interviewerWords.push({quote, turn: other.id});
    else missing.push(quote);
  }
  return {quotes: quotes.length, missing, interviewerWords};
}
const quotesMissing = (text, turns) => checkQuotes(text, turns).missing;

// ---------- rendering (Markdown for people and later skills) ----------

const sourceWords = (source) => source.replace("_", " ");

function render(dir, state) {
  const transcript = [`# Interview transcript`, "",
    `Sitting ${state.id}. Verbatim and append-only; written by the interview helper.`, "",
    // Each heading carries the turn's date, so a quote cited by turn can be dated from the transcript
    // alone, even in a sitting resumed on another day. Turns saved before dates were kept have none.
    ...state.turns.flatMap((turn) => [`## ${turn.id} · ${turn.speaker}${turn.at ? ` · ${turn.at.slice(0, 10)}` : ""}`, "", turn.text, ""])];
  atomicWrite(path.join(dir, "transcript.md"), transcript.join("\n"));

  const {config} = state;
  const pacing = config.pacing.min == null ? "no count-based check-ins" : `${config.pacing.min}–${config.pacing.max} questions`;
  atomicWrite(path.join(dir, "session-config.md"), [`# Interview arrangement`, "",
    `- Home: ${dir} (${sourceWords(config.home_source)})`,
    `- Audience: ${config.audience.reason} (${sourceWords(config.audience.source)})`,
    `- Summary title: ${config.title.text} (${sourceWords(config.title.source)})`,
    `- Pacing: ${config.pacing.words} — ${pacing} (${sourceWords(config.pacing.source)})`, ""].join("\n"));

  const topics = topicView(state);
  const stage = state.stage === "unfinished" ? `unfinished (was ${state.resume_stage})` : state.stage;
  const reflection = state.reflection?.reply ? `given at ${state.reflection.turn}; reply ${state.reflection.reply}`
    : state.reflection?.declined ? `given at ${state.reflection.turn} as a statement; the user had declined to answer more at ${state.reflection.declined}`
    : state.reflection ? `given at ${state.reflection.turn}; awaiting reply` : "not yet given";
  const open = openQuestions(state);
  const lines = [`# Interview progress`, "",
    `- Sitting: ${state.id}`,
    `- Stage: ${stage}`,
    ...(state.remaining ? [`- Remaining: ${state.remaining}`] : []),
    `- Next: ${next(state).hint}`,
    `- Questions asked: ${questionCount(state)}; guide ${config.pacing.words} (${sourceWords(config.pacing.source)})`,
    ...(open.length ? [`- Open questions: ${open.map((number) => `Question ${number}`).join(", ")}`] : []),
    ...(state.stop_turn ? [`- Questioning ended at ${state.stop_turn}`] : []),
    `- Reflection: ${reflection}`,
    `- Summary: ${state.stage === "complete" ? SUMMARY_FILE : "not yet final"}`,
    ...(state.names ? [`- Names: ${state.names}`] : []),
    `- Updated: ${state.updated}`, "",
    `## Topics`, "",
    ...(topics.length ? ["| Topic | User's label | Status | Last discussed | Record |", "|---|---|---|---|---|",
      ...topics.map((t) => `| ${t.id} | ${(state.topic_records[t.id]?.at(-1).record.label ?? t.label).replace(/\|/gu, "\\|")} | ${t.merged_into ? `written up under ${t.merged_into}` : t.status} | ${t.last_turn ?? "-"} | ${t.record} |`)] : ["None yet."]), ""];
  atomicWrite(path.join(dir, "progress.md"), lines.join("\n"));
}

// How the labels of older records read; a free-text provenance is shown as written.
const PLAIN_LABELS = {"user-agreed": "agreed", "user-said": "said", "agent-inferred": "agent's reading",
  "agent-guess": "agent's guess", "agent-observed": "agent checked", "repo-derived": "from the project's files"};

function claimLine(claim) {
  const parts = [claim.provenance ? PLAIN_LABELS[claim.provenance] ?? claim.provenance : null, claim.proxy ? "for someone else" : null, claim.turns?.length ? claim.turns.join(", ") : null].filter(Boolean);
  const basis = claim.basis ? ` — ${claim.basis}` : "";
  return parts.length || basis ? ` (${parts.join("; ")}${basis})` : "";
}

export function renderTopic(record, sourceTurns) {
  const state = record.merged_into ? `closed, merged into ${record.merged_into}` : record.status === "closed" ? "closed" : "open, left for later";
  const read = record.interviewer_read;
  return [`# ${record.label}`, "",
    `Topic \`${record.id}\` · ${state}`, "",
    `**About:** ${record.about.text}${claimLine(record.about)}`, "",
    ...(read ? [`**Interviewer's read of their interest:** ${read.interest}${claimLine(read)}`, ""] : []),
    ...(record.notes.length ? ["## Notes", "", ...record.notes.map((note) => `- ${note.text}${claimLine(note)}`), ""] : []),
    ...(record.questions.length ? ["## Questions to pick up", "", ...record.questions.map((q) => `- ${q}`), ""] : []),
    ...(record.on_hold ? [`**On hold because:** ${record.on_hold}`, ""] : []),
    `Source turns: ${sourceTurns.join(", ")}`, ""].join("\n");
}

// ---------- commands ----------

// A turn is saved as delivered. Only `record` numbers one, with the number its caller declared.
function newTurn(state, speaker, text, question) {
  const turn = {id: turnId(state.turns.length), speaker, text, at: now()};
  if (question !== undefined) turn.question = question;
  state.turns.push(turn);
  return turn.id;
}

// The number a turn showed is declared with `question`, never read from its text. Returns it, or
// undefined for an unnumbered turn. A turn that shows a label must declare it; question: null says a
// turn that mentions "Question N:" is not itself a numbered question.
function declaredQuestion({asked, question, answered}) {
  need(answered === undefined || typeof answered === "boolean", "answered must be true or false");
  if (question === undefined || question === null) {
    const label = question === null ? undefined : (asked ?? "").split(/\r?\n/u).map(questionNumber).find((number) => number !== null);
    if (label !== undefined) refuse("NEEDS_QUESTION", `asked shows the label "Question ${label}": pass question: ${label} if this turn asks it, or question: null if it only mentions it`);
    need(answered === undefined, "answered goes with question: pass the number your turn showed");
    return undefined;
  }
  need(Number.isInteger(question) && question > 0, "question must be the number your turn showed, a whole number from 1");
  need(asked !== undefined, "question needs asked: your turn exactly as delivered, which shows the number");
  need(new RegExp(`\\bquestion\\s+${question}(?!\\d)`, "iu").test(asked), `asked does not show "Question ${question}"; pass the number the turn shows, or show it in the turn`);
  if (answered === undefined) refuse("NEEDS_ANSWERED", `say whether the reply answered Question ${question}: answered: true, or false if they asked what it meant, said something related instead, or answered only part`);
  return question;
}

// A numbered turn keeps the number the user saw: a new question takes the next number and a question still
// open keeps its own. Any other number is saved as shown, with a warning.
function numberWarning(state, number) {
  const expected = nextNumber(state);
  if (number === expected || openQuestions(state).includes(number)) return null;
  if (askedNumbers(state).has(number)) return `saved as shown, but Question ${number} was already answered; the next new question is Question ${expected}`;
  return `saved as shown, but this turn is headed Question ${number} where Question ${expected} was next; numbering continues from ${Math.max(number, expected - 1) + 1}`;
}

function start(request) {
  onlyKeys(request, ["quality_dir", "home_source", "audience", "title", "pacing", "turns", "id"], "request");
  const qualityDir = absolute(request.quality_dir, "quality_dir");
  need(SOURCES.includes(request.home_source), 'home_source must be "chosen" or "stated_default"');
  onlyKeys(request.audience, ["reason", "source"], "audience");
  need(isText(request.audience.reason), "audience.reason must say who the records are for and why");
  need(SOURCES.includes(request.audience.source), 'audience.source must be "chosen" or "stated_default"');
  const title = request.title ?? {text: "Quality interview summary", source: "stated_default"};
  onlyKeys(title, ["text", "source"], "title");
  need(isText(title.text) && SOURCES.includes(title.source), 'title needs text and a source of "chosen" or "stated_default"');
  onlyKeys(request.pacing, ["words", "min", "max", "source"], "pacing");
  const pacing = {words: request.pacing.words, min: request.pacing.min ?? request.pacing.max ?? null, max: request.pacing.max ?? request.pacing.min ?? null, source: request.pacing.source};
  need(isText(pacing.words), "pacing.words must give the guide as you stated it");
  need(PACING_SOURCES.includes(pacing.source), `pacing.source must be one of ${PACING_SOURCES.join(", ")}`);
  need(pacing.min === null || (Number.isInteger(pacing.min) && Number.isInteger(pacing.max) && pacing.min > 0 && pacing.min <= pacing.max), "pacing.min and max must be whole numbers with min <= max, or both omitted");
  need(Array.isArray(request.turns), "turns must list the setup exchanges, or be [] when a saved arrangement settled set up");
  request.turns.forEach((turn, i) => {
    onlyKeys(turn, ["speaker", "text", "topics"], `turns[${i}]`);
    need(["interviewer", "user"].includes(turn.speaker), `turns[${i}].speaker must be "interviewer" or "user"`);
    need(isText(turn.text), `turns[${i}].text must be the words actually said`);
    if (turn.topics !== undefined) need(turn.speaker === "user", `turns[${i}]: only a user turn carries topics`);
  });
  need(request.turns.length === 0 || request.turns.at(-1).speaker === "user", "turns must end with the user's reply that settled the setup");
  if (request.id !== undefined) need(isText(request.id) && ID.test(request.id), "id must be kebab-case");

  const key = stable({...request, id: undefined});
  const interviews = path.join(qualityDir, "interviews");
  for (const existing of listSittings(qualityDir)) {
    const untouched = existing.state.turns.length === request.turns.length;
    if (existing.state.start_key === key && untouched) return {status: "no-op", session: existing.dir, next: next(existing.state)};
  }
  const base = request.id ?? new Date().toISOString().slice(0, 10);
  if (request.id !== undefined) need(!fs.existsSync(path.join(interviews, base)), `a sitting named ${base} already exists; choose another id`, "ALREADY_EXISTS");
  let id = base;
  for (let n = 2; fs.existsSync(path.join(interviews, id)); n++) id = `${base}-${n}`;
  const dir = path.join(interviews, id);

  const state = {version: 1, id, quality_dir: qualityDir, created: now(), updated: null, start_key: key,
    config: {home_source: request.home_source, audience: request.audience, title, pacing},
    turns: [], replies: [], stage: "questioning", resume_stage: null, remaining: null,
    open_offer: null, checkins: 0, restart_at_opener: false, stop_turn: null,
    reflection: null, topic_records: {}, names: null, completed: null};
  let lastInterviewer = null;
  for (const turn of request.turns) {
    const id = newTurn(state, turn.speaker, turn.text);
    if (turn.speaker === "interviewer") { lastInterviewer = id; continue; }
    state.replies.push({asked: lastInterviewer, reply: id, topics: validateDeltas(turn.topics ?? [], "topics")});
    lastInterviewer = null;
  }
  fs.mkdirSync(path.join(dir, "topics"), {recursive: true});
  save(dir, state);
  // The standing arrangement in QUALITY_DIR/.scratch/session-config.md is written by /quality-setup,
  // not here: start writes only the sitting's own files.
  return {status: "written", session: dir, next: next(state)};
}

function record(request) {
  onlyKeys(request, ["session", "asked", "question", "answered", "also_answered", "reply", "topics", "offer", "choice"], "request");
  const {dir, state} = load(request.session);
  need(state.stage !== "complete", "this sitting is complete; start a new one for a new interview", "COMPLETE");
  need(request.asked === undefined || isText(request.asked), "asked must be your turn as delivered");
  need(isText(request.reply), "reply must be the user's words, verbatim");
  const topics = validateDeltas(request.topics ?? [], "topics");
  need(request.offer === undefined || OFFERS.includes(request.offer), `offer must be one of ${OFFERS.join(", ")}`);
  need(request.choice === undefined || CHOICES.includes(request.choice), `choice must be one of ${CHOICES.join(", ")}`);
  const question = declaredQuestion(request);
  const unanswered = request.answered === false;
  const alsoAnswered = request.also_answered ?? [];
  need(Array.isArray(alsoAnswered) && alsoAnswered.every((number) => askedNumbers(state).has(number)),
    "also_answered must list the numbers of questions already asked, e.g. [9]");

  // A turn already saved as the last interviewer turn (a pause's `said`, or a reflection given as a
  // statement) is not saved again when the same words come back as `asked`.
  const lastTurn = state.turns.at(-1);
  const askedText = lastTurn?.speaker === "interviewer" && lastTurn.text === request.asked ? undefined : request.asked;

  // An identical retry of the last saved reply is a no-op. A retry that only adds an offer or choice left
  // out the first time applies it; any other difference under the same words is refused.
  const stage = state.stage === "unfinished" ? state.resume_stage : state.stage;
  const last = state.replies.at(-1);
  if (last) {
    const lastAsked = last.asked ? state.turns[turnIndex(last.asked)] : undefined;
    const lastReply = state.turns[turnIndex(last.reply)].text;
    // A reply saved without its own interviewer turn (after a pause's `said` or a reflection as a
    // statement) matches a retry that again omits `asked`, or that passes that earlier turn as `asked`.
    const before = state.turns[turnIndex(last.reply) - 1];
    const spoken = before?.speaker === "interviewer" ? before.text : undefined;
    // The retry names the same interviewer words the last reply answered. A reply to a later
    // interviewer turn (a second pause's `said`) is a new reply, however alike its words; so a
    // retry without `asked` only matches while the last saved turn is still that reply.
    const sameAsked = lastAsked ? lastAsked.text === request.asked
      : request.asked === undefined ? lastTurn?.speaker === "user" : spoken === request.asked;
    if (sameAsked && lastReply === request.reply) {
      const fits = (saved, sent) => saved === sent || (saved === undefined && sent !== undefined);
      need(stable(last.topics) === stable(topics) && fits(last.offer, request.offer) && fits(last.choice, request.choice)
        && lastAsked?.question === question && (last.answered ?? null) === (request.answered ?? null)
        && stable(last.also_answered ?? []) === stable(alsoAnswered),
        "this exchange is already saved with different topics, number, offer, choice or answer; it cannot be changed. Record any correction with the next reply.", "ALREADY_SAVED");
      const adds = {offer: last.offer ? undefined : request.offer, choice: last.choice ? undefined : request.choice};
      if (!adds.offer && !adds.choice) return {status: "no-op", turns: [last.asked, last.reply].filter(Boolean), question_count: questionCount(state), next: next(state)};
      needChoice(state, stage, {offer: request.offer, choice: request.choice});
      Object.assign(state, {stage, resume_stage: null, remaining: null});
      if (adds.offer) last.offer = adds.offer;
      if (adds.choice) last.choice = adds.choice;
      applyReply(state, stage, last, adds);
      save(dir, state);
      return {status: "written", turns: [last.asked, last.reply].filter(Boolean), question_count: questionCount(state), next: next(state)};
    }
  }

  // A paused sitting stays paused until the interview itself goes on: a reply to a numbered question,
  // a check-in or the reflection. A closing reply after the pause, or a catch-up answer on return, is
  // saved with what it says and leaves the resume point as it was, because neither is the user
  // choosing to carry on, and a pause undone by a farewell has to be found and made again.
  const resumes = question !== undefined || request.choice !== undefined || request.offer !== undefined || alsoAnswered.length > 0;
  if (state.stage === "unfinished" && !resumes) {
    const asked = askedText !== undefined ? newTurn(state, "interviewer", askedText) : null;
    const reply = newTurn(state, "user", request.reply);
    state.replies.push({asked, reply, topics});
    save(dir, state);
    return {status: "written", turns: [asked, reply].filter(Boolean), question_count: questionCount(state), next: next(state)};
  }

  needChoice(state, stage, request);
  if (stage === "reflection" && !state.reflection) need(askedText !== undefined, "pass the reflection you gave as asked");

  Object.assign(state, {stage, resume_stage: null, remaining: null});
  const warnings = [];
  if (question !== undefined) {
    const warning = numberWarning(state, question);
    if (warning) warnings.push(warning);
  }
  const asked = askedText !== undefined ? newTurn(state, "interviewer", askedText, question) : null;
  const reply = newTurn(state, "user", request.reply);
  const entry = {asked, reply, topics};
  if (question !== undefined) entry.answered = request.answered;
  if (alsoAnswered.length) entry.also_answered = alsoAnswered;
  if (request.offer) entry.offer = request.offer;
  if (request.choice) entry.choice = request.choice;
  state.replies.push(entry);
  if (stage === "reflection" && !state.reflection) state.reflection = {turn: asked, reply: null};
  // A reply that comes after a reflection given as a statement is that reflection's reply: the
  // person chose to answer it after all, and the decline no longer describes the record.
  if (stage === "writeup" && state.reflection?.declined && !state.reflection.reply && asked === null) {
    state.reflection.reply = reply;
    delete state.reflection.declined;
  }
  if (hasContent(state) || (question === 1 && !unanswered)) state.restart_at_opener = false;
  applyReply(state, stage, entry, request);
  save(dir, state);
  return {status: "written", turns: [asked, reply].filter(Boolean), question_count: questionCount(state), next: next(state),
    ...(warnings.length ? {warnings} : {})};
}

function needChoice(state, stage, {offer, choice}) {
  if ((state.open_offer || offer || stage === "reflection") && choice === undefined) {
    refuse("NEEDS_CHOICE", `${stage === "reflection" ? "the reflection" : "a check-in"} is open, so pass choice: "end" (wrap up / no more talk), "continue" (keep talking) or "unclear" (they asked something, did not decide, or had to leave)`);
  }
}

// The stage change made by a saved reply's offer and choice.
function applyReply(state, stage, entry, {offer, choice}) {
  if (offer) {
    state.open_offer = {kind: offer, turn: entry.asked ?? entry.reply};
    if (offer === "checkin") state.checkins = (state.checkins ?? 0) + 1;
  }
  if (choice === "continue") {
    state.open_offer = null;
    if (stage !== "questioning") { state.stage = "questioning"; state.reflection = null; }
  } else if (choice === "end") {
    state.open_offer = null;
    if (stage === "questioning") {
      state.stop_turn = entry.reply;
      if (hasContent(state)) state.stage = "reflection";
      else Object.assign(state, {stage: "unfinished", resume_stage: "questioning", restart_at_opener: true,
        remaining: "Nothing of substance was said yet; a return starts again at the first question."});
    } else if (stage === "reflection") {
      state.reflection.reply = entry.reply;
      state.stage = "writeup";
    }
  }
}

function topic(request) {
  onlyKeys(request, ["session", "topic"], "request");
  const {dir, state} = load(request.session);
  need(state.stage !== "complete", "this sitting is complete; its records are final", "COMPLETE");
  const record = validateTopicRecord(request.topic, state);
  const view = topicView(state).find((t) => t.id === record.id);
  const through = view?.last_turn ?? null;
  const cited = [record.about, record.interviewer_read, ...record.notes].flatMap((claim) => claim?.turns ?? []);
  const sourceTurns = [...new Set([...(view?.turns ?? []), ...cited])].sort();
  need(sourceTurns.length > 0, "a topic record must rest on at least one turn: cite one, or record the reply that raised it first");
  const versions = state.topic_records[record.id] ?? [];
  const latest = versions.at(-1);
  if (latest && stable(latest.record) === stable(record) && latest.through === through) {
    return {status: "no-op", file: path.join(dir, "topics", `${record.id}.md`), pending_topics: pendingTopics(state), next: next(state)};
  }
  const file = path.join(dir, "topics", `${record.id}.md`);
  // The record holds the current account only; the earlier versions stay in the helper's state and the
  // transcript holds the turns they rested on. No dated copy is written.
  versions.push({record, through, source_turns: sourceTurns, at: now()});
  state.topic_records[record.id] = versions;
  atomicWrite(file, renderTopic(record, sourceTurns));
  save(dir, state);
  const singleQuoted = [record.about, ...record.notes].filter((claim) => !claim.text.includes('"') && !/[\u201c\u201d]/u.test(claim.text) && SINGLE_QUOTED.test(claim.text));
  return {status: "written", file, pending_topics: pendingTopics(state), next: next(state),
    ...(singleQuoted.length ? {warnings: ["Some text looks quoted in single quotes, which the quote check does not read. Put the person's exact words in double quotes."]} : {})};
}

// Finishing needs the sitting at write-up and the summary saved with its quotes in the transcript.
// Topic records are not compared against it: they are the agent's notes, and the summary stands on its own.
function readiness(dir, state) {
  const problems = [];
  const stage = state.stage === "unfinished" ? state.resume_stage : state.stage;
  if (stage !== "writeup" && stage !== "complete") problems.push(`the stage is ${stage}: the reflection has not had its reply with choice "end"`);
  const summary = path.join(dir, SUMMARY_FILE);
  let quotes = {quotes: 0, missing: [], interviewerWords: []};
  if (!fs.existsSync(summary)) problems.push(`the summary is not saved at ${summary}`);
  else {
    quotes = checkQuotes(fs.readFileSync(summary, "utf8"), state.turns);
    if (quotes.missing.length) problems.push(`quoted words in the summary are not in the transcript: ${quotes.missing.map((q) => JSON.stringify(q)).join("; ")}. Quote only words said in the conversation, or drop the quotation marks; paraphrase a document and cite its path.`);
  }
  return {problems, quotes: quotes.quotes, interviewer_words: quotes.interviewerWords};
}

function check(request) {
  onlyKeys(request, ["session"], "request");
  const {dir, state} = load(request.session);
  const result = readiness(dir, state);
  return {status: "checked", ready: result.problems.length === 0, ...result,
    hint: result.interviewer_words.length ? "Make sure each phrase in interviewer_words is credited to the interviewer, not the user." : undefined};
}

function finish(request) {
  onlyKeys(request, ["session", "names"], "request");
  const {dir, state} = load(request.session);
  if (state.stage === "complete") return {status: "no-op", summary: path.join(dir, SUMMARY_FILE), next: next(state)};
  need(request.names === undefined || isText(request.names), "names must describe the names choice");
  const result = readiness(dir, state);
  need(result.problems.length === 0, result.problems.join(" | "), "NOT_READY");
  Object.assign(state, {stage: "complete", resume_stage: null, remaining: null, names: request.names ?? null, completed: now()});
  save(dir, state);
  return {status: "written", summary: path.join(dir, SUMMARY_FILE), interviewer_words: result.interviewer_words, next: next(state)};
}

// The user stopped and said not to ask more. The reflection is still owed to them as a statement,
// so that the summary rests on what they heard, but no reply is invented for it: the transcript
// holds their stop, then the statement, and nothing after.
function reflect(request) {
  onlyKeys(request, ["session", "said"], "request");
  const {dir, state} = load(request.session);
  need(state.stage !== "complete", "this sitting is complete", "COMPLETE");
  need(isText(request.said), "said must be the reflection as delivered");
  if (state.reflection?.declined && state.turns.at(-1).text === request.said) return {status: "no-op", next: next(state)};
  const stage = state.stage === "unfinished" ? state.resume_stage : state.stage;
  need(stage === "reflection", `the stage is ${stage}: a reflection as a statement comes only after the user has stopped (a reply with choice "end")`, "WRONG_STAGE");
  need(!state.reflection, "the reflection was already given with a question: record their reply instead", "ALREADY_ASKED");
  const turn = newTurn(state, "interviewer", request.said);
  state.reflection = {turn, reply: null, declined: state.stop_turn};
  Object.assign(state, {stage: "writeup", resume_stage: null, remaining: null});
  save(dir, state);
  return {status: "written", turns: [turn], next: next(state)};
}

function pause(request) {
  onlyKeys(request, ["session", "remaining", "said"], "request");
  const {dir, state} = load(request.session);
  need(state.stage !== "complete", "this sitting is complete", "COMPLETE");
  need(isText(request.remaining), "remaining must say what is left, in plain words");
  need(request.said === undefined || isText(request.said), "said must be your closing turn as delivered");
  const lastText = state.turns.at(-1).text;
  if (state.stage === "unfinished" && state.remaining === request.remaining && (request.said === undefined || request.said === lastText)) {
    return {status: "no-op", next: next(state)};
  }
  if (request.said !== undefined && request.said !== lastText) newTurn(state, "interviewer", request.said);
  if (state.stage !== "unfinished") state.resume_stage = state.stage;
  state.stage = "unfinished";
  state.remaining = request.remaining;
  save(dir, state);
  return {status: "written", next: next(state)};
}

function listSittings(qualityDir) {
  const interviews = path.join(qualityDir, "interviews");
  if (!fs.existsSync(interviews)) return [];
  return fs.readdirSync(interviews).sort().map((name) => path.join(interviews, name))
    .filter((dir) => fs.existsSync(path.join(dir, STATE_FILE)))
    .map((dir) => ({dir, state: JSON.parse(fs.readFileSync(path.join(dir, STATE_FILE), "utf8"))}));
}

function status(request) {
  onlyKeys(request, ["session", "quality_dir"], "request");
  if (request.quality_dir !== undefined) {
    need(isText(request.quality_dir), "quality_dir must name the folder holding the quality records");
    const qualityDir = path.resolve(request.quality_dir);
    const sittings = listSittings(qualityDir).map(({dir, state}) => ({session: dir, stage: state.stage,
      remaining: state.remaining, questions: questionCount(state), open_questions: openQuestions(state), updated: state.updated, next: next(state).hint}));
    const legacy = fs.existsSync(path.join(qualityDir, "interviews")) ? fs.readdirSync(path.join(qualityDir, "interviews"))
      .filter((name) => !fs.existsSync(path.join(qualityDir, "interviews", name, STATE_FILE))) : [];
    return {status: "ok", sittings, ...(legacy.length ? {not_resumable: legacy} : {})};
  }
  const {dir, state} = load(request.session);
  return {status: "ok", session: dir, stage: state.stage, question_count: questionCount(state), open_questions: openQuestions(state),
    pacing: state.config.pacing, reflection: state.reflection, topics: topicView(state), next: next(state)};
}

const COMMANDS = {start, record, topic, check, finish, pause, reflect, status};

export function run(command, request) {
  try {
    need(Object.hasOwn(COMMANDS, command), `unknown command "${command}"; see --help`, "UNKNOWN_COMMAND");
    need(isObject(request), "the request must be a JSON object");
    return COMMANDS[command](request);
  } catch (error) {
    if (error instanceof Refusal) return {status: "refused", refusal: {name: error.refusalName, defect: error.message}};
    throw error;
  }
}

function parseArgs(argv) {
  const [command, ...rest] = argv;
  let request = {};
  for (let i = 0; i < rest.length; i += 2) {
    const [flag, value] = [rest[i], rest[i + 1]];
    if (value === undefined) throw new Refusal("INVALID_INPUT", `${flag} needs a value`);
    if (flag === "--input") request = {...request, ...JSON.parse(fs.readFileSync(value, "utf8"))};
    else if (flag === "--json") request = {...request, ...JSON.parse(value)};
    else if (flag === "--session") request.session = value;
    else if (flag === "--quality-dir") request.quality_dir = value;
    else throw new Refusal("INVALID_INPUT", `unknown option ${flag}; see --help`);
  }
  return {command, request};
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const argv = process.argv.slice(2);
  if (argv.length === 0 || argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(HELP);
  } else {
    let result;
    try {
      const {command, request} = parseArgs(argv);
      result = run(command, request);
    } catch (error) {
      const name = error instanceof Refusal ? error.refusalName : "INVALID_INPUT";
      result = {status: "refused", refusal: {name, defect: error.message}};
    }
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exitCode = result.status === "refused" ? 2 : 0;
  }
}
