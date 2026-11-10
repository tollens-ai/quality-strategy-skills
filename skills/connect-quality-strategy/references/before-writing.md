# Before writing

Step 1 of [write the strategy up](../SKILL.md#1-read-the-records).

Find the quality folder with `node "$PLUGIN_ROOT/skills/quality-strategy/scripts/records.mjs"
where`, and run `status` with `steps.mjs`, from the same scripts folder. Read [what every document
shares](../../../references/templates/every-document.md), because the strategy follows its rules,
such as how to quote a reply given by number. Then read the progress note, the project context,
each stakeholder's profile, the pre-read, the interview's summary and topics, any notes, and the
strategy as it is now. Records written by older versions of the pack, such as a strategy with an
Open section, notes files beside the strategy, or notes on priorities that were worked further, are
read for what they mean rather than by their layout, as [older
records](../../../references/quality-model.md#older-records) says.

If the release priorities were never set, there is nothing to write up yet, because the strategy
starts from them. Tell the user what there is, such as the project context and the profiles with
the questions they hold, name `prioritise-release-quality` as the step that starts the strategy,
and stop.

The write-up rewrites the strategy in the same file, so first commit the strategy as it is with
`records.mjs commit`, because the owner's own edits may be in it. The script commits only where the
user has given leave to commit. Where they have not, the earlier version is not kept, and the
hand-back tells the user so. An older strategy can be the only record of something, such as a
stakeholder's view or an agent's interpretation. Carry anything in it that is still true into the
new strategy, as [older records](../../../references/quality-model.md#older-records) says, or into
`notes/`, because the rewrite replaces the old text.

If the records say the owner let a proposal of the agent's stand but do not contain the proposal
itself, write it in the strategy as missing, as [describe unfinished knowledge
honestly](../../../references/templates/every-document.md#open-stays-open) says, because the
write-up works from the records and was not in the conversation. Recovering it is a next action
only where the part it belongs to needs it.

If a record you read still calls something open that a later answer has settled, update that record
as you go, as [what is true now](../../../references/templates/every-document.md#what-is-true-now)
says, and mention the change in the write-up's entry in the decision log.
