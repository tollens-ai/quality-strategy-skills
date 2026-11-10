# The assessment notes

This is what the assessment's record holds, and where the evidence behind a finding is kept.

The assessment notes hold a finding for each row in scope, because the plan of work and the
release call rest on them. Each finding holds:

- its question, with the row's number beside it as the pointer;
- what it was judged against: the full bar, what the release waits for, an earlier bar, or no bar;
- what was tried and seen, with the source, date, version and conditions, who looked, whether it
  was read or seen running, and whether a person has used it;
- the judgment, Above bar, At bar, Below bar or Unknown, with a confidence and what it rests on,
  or why it is unknown;
- what that puts at stake, and for whom, in words;
- the most useful next observation, with who could make it and what it needs, or that none is
  known;
- any ideas about what to do, as ideas with whose they are;
- `not yet seen` or `seen and answered`, with the date.

A row whose parts stand differently has a finding for each part, such as a warning that meets what
the release waits for and misses its full bar.

Beside the findings, the notes hold three things the strategy is written from, because the strategy
states nothing its notes don't support:

- the pattern: where risk gathers, and what one piece of finding out would settle together, with
  no work and no order;
- the bottom line as it was put to the user;
- what else was noticed about the product, each as a line with what was seen and no judgment, or
  "is this intended?" where it is a question for the user, because the next look starts from it. A
  line that becomes a question goes to the Open notes like the assessment's other questions.

Say once at the top what the whole pass rests on, such as what was read, what could not run, and
that no person has used the product, as the [rule on shared
marks](../../../references/saving-records.md#in-all-the-notes) says. Quote the user's reply
once for the set. That reply also shows whether the bottom line is theirs or the agent's reading
they have seen, so it needs no mark of its own.

A finding that rests on something the agent ran keeps what it would take to run it again, and what
it showed, in `QUALITY_DIR/notes/evidence/<slug>/`, linked once from the finding: the cases and
scripts, the commands, and the captured output. A finding on its own keeps the same in a folder
beside its file, named after it and linked once from it: `findings/migrate-keeps-yaml-evidence/`
for `findings/migrate-keeps-yaml.md`. Downloads, build trees and caches stay in the scratch folder,
because they can be fetched or built again. The quality folder is the agreed home for records, so
saving there is not a change to the user's checkout. Other long evidence can go in a file beside
the notes, linked once.

A finding that rests on a run made when the pre-read's issues were told links that run's folder in
the same way, because the run is already kept there.
