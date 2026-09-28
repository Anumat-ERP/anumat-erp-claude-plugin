# chamrong

A personal Claude Code plugin marketplace. One repo, many plugins.

## Install

```
/plugin marketplace add E:\Chamrong\Project\claude-plugins
/plugin install design-stack@chamrong
```

Installing the marketplace once makes every plugin in it available; install
each plugin you want by name.

## Plugins

| Plugin | What it does | Install |
|---|---|---|
| **design-stack** | The research and evidence layer for UI work: canonical screen playbooks, design-system selection, and a hard gate on interface states. | `/plugin install design-stack@chamrong` |

## Adding a plugin

Three steps.

1. Create `plugins/<name>/` with a `.claude-plugin/plugin.json`, and whatever
   `skills/` and `commands/` it needs.
2. Append an entry to `.claude-plugin/marketplace.json`. The `source` is a
   repo-relative path with forward slashes: `"./plugins/<name>"`. The `version`
   must match the one in the plugin's own manifest.
3. Run the validator. Fix what it reports. Add a row to the table above.

No other file moves.

## Validator

```
node scripts/validate.mjs
```

Node only, no dependencies. Exit `0` means clean; exit `1` prints one
`FAIL: <check>: <message>` line per problem.

Six checks:

| Check | Catches |
|---|---|
| `manifests` | malformed or missing JSON; a `source` that does not resolve, uses backslashes, or is not repo-relative; a version that disagrees between the two manifests |
| `frontmatter` | a `SKILL.md` with no YAML block, a missing `name` or `description`, a `name` that does not match its directory, or a description too short to trigger reliably |
| `length` | a skill body over its cap — 150 lines for `design-stack`, 80 for `design-evidence`. Detail belongs in reference files, not in the body that is always loaded |
| `refs` | a `reference/`, `patterns/`, or `systems/` path mentioned in any skill or content file that exists in no skill of that plugin. Resolves across skills in the same plugin, because cross-skill routing is deliberate |
| `aesthetics` | appearance vocabulary in the `design-stack` skill, which would contradict the `frontend-design` skill when both are loaded |
| `orphans` | a content file nothing routes to. Unroutable files are invisible at runtime, so the plugin looks like it is working while having no evidence to read |

Run it before every commit that touches a plugin.

## Licence

MIT. See [LICENSE](LICENSE).
