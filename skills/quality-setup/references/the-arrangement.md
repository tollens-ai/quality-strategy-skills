# The arrangement

[Quality setup](../SKILL.md) saves the arrangement in `.scratch/session-config.md` inside the
quality folder, laid out like this:

```markdown
# Standing quality-records arrangement

- Home: <the quality folder> (<how the agent knows>)
- Audience: <who the documents are for> (<how the agent knows>)
- Commits: <commit the records after each step, or don't, or no repository, or git ignores the folder> (<how the agent knows>)
```

Each pair of brackets says how the agent knows what its line says, because later sessions read it
to tell the user's choice from a default. Write what is so at the moment the file is saved:

- "they chose it: <their words>", when the user said it;
- "the agent's default", when the agent supplied it. Say only that, because the user often first
  hears a default in the message that follows the save, and their silence about one is not a
  choice;
- "the agent checked: <how>", when the line states a fact about the place and not a choice, such
  as that there is no repository or that git ignores the folder.

If the user accepts that nobody knows who has access to the place, say so on the Audience line.

If the folder is anywhere but a `quality` folder in the project, add to the Home line that a new
session does not find it by itself, so the user names it when they come back. The message that
says what was saved takes its words from the arrangement, and that is how they learn what to say.

## A folder git is to ignore

When the user chose a folder for git to ignore, make git ignore it before you save anything in it,
because until then one `git add` would put the records among the files to be committed. Put the
rule where it is not itself shared: a line for the folder in this clone's own exclude file, whose
path `git rev-parse --git-path info/exclude` prints, changes no tracked file and tells no reader
of the repository that the folder exists. If the project's own rules already ignore the folder,
add nothing. Either way, check that git ignores the folder, and tell the user that nothing in it
is committed or pushed only once that check has passed. Give `git check-ignore` the path of a file
inside the folder, because a rule for a folder does not match the folder's own name until the
folder exists.

Where you added the rule, say on the Commits line which file it is in, after how you checked. The
user then hears what was done to their repository, and whoever takes the rule out later, when they
want git to keep the records, knows where it is.

## The answer on committing

Record the answer on committing, when there is one, with `node
"$PLUGIN_ROOT/skills/quality-strategy/scripts/steps.mjs" commits yes --quality-dir <the folder>`,
or `commits no`, as well as on the Commits line, because the commit script reads only this and
never the arrangement's prose.
