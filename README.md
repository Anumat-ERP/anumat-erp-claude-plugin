# chamrong

A personal Claude Code plugin marketplace. One repo, many plugins.

## Install

```
/plugin marketplace add <path to this repo>
/plugin install design-stack@chamrong
```

Installing the marketplace once makes every plugin in it available; install
each plugin you want by name.

## Plugins

| Plugin | What it does | Install |
|---|---|---|
| **design-stack** | The research and evidence layer for UI work: canonical screen playbooks, design-system selection, and a hard gate on interface states. | `/plugin install design-stack@chamrong` |
| **monorepo-stack** | Scaffolds and maintains a Bun + Turborepo monorepo: apps, business capability modules, shared packages, and Storybook as a first-class layer. | `/plugin install monorepo-stack@chamrong` |

The two are designed to meet: `monorepo-stack` creates `packages/ui` and its
Storybook; `design-stack` reads them to learn what components already exist
before designing anything new.

## Adding a plugin

Three steps.

1. Create `plugins/<name>/` with a `.claude-plugin/plugin.json`, and whatever
   `skills/` and `commands/` it needs.
2. Append an entry to `.claude-plugin/marketplace.json`. The `source` is a
   repo-relative path with forward slashes: `"./plugins/<name>"`. The `version`
   must match the one in the plugin's own manifest.
3. Run the validator. Fix what it reports. Add a row to the table above.

No other file moves.

## Path convention

Every route between files inside a plugin is written anchored:

```
${CLAUDE_PLUGIN_ROOT}/skills/<skill>/<dir>/<file>.md
```

Nothing shorter resolves reliably. A command runs with the working directory
set to the *user's* project, not the plugin, so a bare `skills/…` path points
at nothing. And inside a nested content file, `patterns/states.md` is relative
to a directory the reader has to guess. The anchored form resolves identically
from a SKILL.md, a reference file, and a command. The `refs` check rejects the
bare form outright, because a bare path looks correct while resolving to
nothing.

## Validator

```
node scripts/validate.mjs
```

Node only, no dependencies. Exit `0` means clean; exit `1` prints one
`FAIL: <check>: <message>` line per problem.

| Check | Catches |
|---|---|
| `manifests` | malformed or missing JSON; a `source` that does not resolve, uses backslashes, or is not repo-relative; a version that disagrees between the two manifests |
| `frontmatter` | a `SKILL.md` with no YAML block, a missing `name` or `description`, a `name` that does not match its directory, or a description too short to trigger reliably |
| `length` | a skill body over its cap — 150 lines for `design-stack`, 80 for `design-evidence`. Detail belongs in reference files, not in the body that is always loaded |
| `refs` | a routed path that does not exist, and any use of the bare ambiguous path form described above. Scans skill bodies, every content file, and every command |
| `aesthetics` | appearance vocabulary anywhere in a plugin's skills or commands, which would contradict the `frontend-design` skill when both are loaded. A term-list tripwire, not a proof |
| `commands` | a command file with no `description` in its frontmatter, or one routing to a file that does not exist |
| `contrast` | the token example in `01-foundations.md` failing the WCAG thresholds this plugin's own review checklist calls blocking. A reference that fails its own audit teaches the wrong thing twice |
| `orphans` | a content file nothing routes to. Unroutable files are invisible at runtime, so the plugin looks like it is working while having no evidence to read |

Run it before every commit that touches a plugin.

### Known limits

The validator is a tripwire, not a proof. It does not catch aesthetic guidance
phrased without a listed term, content files in nested subdirectories
(`mdFiles` is not recursive), or a very long single line inside a skill body —
`length` counts lines, not bytes. Two checks are keyed to this plugin by name:
`length` caps only the two known skills, and `contrast` reads only
`design-stack`'s token file. A second plugin in this marketplace gets the other
six.

## Licence

MIT. See [LICENSE](LICENSE).
