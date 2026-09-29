# anumat-erp-claude-plugin

Claude Code plugins from the Anumat team, for the whole path from idea to
paying customers: build it (monorepo, design, docs, security), ship it
(infrastructure from $0 upward), and sell it (demos, customer discovery).

## Install everything (two commands)

In Claude Code:

```
/plugin marketplace add Anumat-ERP/anumat-erp-claude-plugin
/plugin install anumat-erp-all@anumat-erp
```

Or from a terminal:

```bash
claude plugin marketplace add Anumat-ERP/anumat-erp-claude-plugin && claude plugin install anumat-erp-all@anumat-erp
```

`anumat-erp-all` is a bundle: it has no content of its own and installs every
plugin below as a dependency. Start a new session (or run `/reload-plugins`) and
the skills and commands are there.

**Just one plugin?** Install it by name instead, for example
`/plugin install dev-docs@anumat-erp`.

**For a whole team:** commit this to the project's `.claude/settings.json`.
Everyone who opens the repo is offered the marketplace, and the listed plugins
are turned on once they install them.

```json
{
  "extraKnownMarketplaces": {
    "anumat-erp": { "source": { "source": "github", "repo": "Anumat-ERP/anumat-erp-claude-plugin" } }
  },
  "enabledPlugins": { "anumat-erp-all@anumat-erp": true }
}
```

**Update:** `/plugin marketplace update anumat-erp`. Third-party marketplaces
don't auto-update unless you switch it on in `/plugin` → Marketplaces.

**Remove:** uninstall `anumat-erp-all`, then `claude plugin prune` removes the
plugins it pulled in.

## Plugins

| Plugin | For | Commands |
|---|---|---|
| **[dev-docs](plugins/dev-docs)** | Software development documents from 37 templates based on recognised standards: PRD, BRD, SRS (ISO/IEC/IEEE 29148), SDD (IEEE 1016), arc42, C4, ADR (Nygard, MADR), design doc, OpenAPI spec, test plan (29119-3), runbook, postmortem, SLO, README, CONTRIBUTING, SECURITY, CHANGELOG and more | `/dev-docs:new` `:setup` `:audit` `:list` |
| **[security-audit](plugins/security-audit)** | Defensive audits of your own software: scope, framework choice (OWASP ASVS, Top 10, API, MASVS, CWE, NIST CSF and SSDF, CIS, SLSA, SOC 2 / ISO 27001 mapping), STRIDE threat model, review checklists, findings with CVSS, fix plan, retest, report | `/security-audit:plan` `:threat-model` `:run` `:fix` `:verify` `:report` |
| **[demo-storytelling](plugins/demo-storytelling)** | Demos and pitches: user stories into a narrative, storytelling frameworks, a T-7 to T-0 prep plan, a timed run-of-show, how to speak, a warm-up for voice, body and tech, Q&A, recovering on stage, retro | `/demo-storytelling:plan` `:story` `:script` `:rehearse` `:warmup` `:qa` `:retro` |
| **[startup-infra](plugins/startup-infra)** | Infrastructure from a $0 hackathon to scale, stage by stage: free-tier stacks, exit triggers, cost guardrails, reliability, migrations between stages | `/startup-infra:assess` `:plan` `:stack` `:cost` `:migrate` `:checklist` |
| **[customer-discovery](plugins/customer-discovery)** | Finding and talking to customers: riskiest assumptions, ICP, outreach, Mom Test and JTBD interviews, synthesis, validation experiments, product-market fit | `/customer-discovery:hypotheses` `:icp` `:find` `:interview` `:synthesize` `:validate` `:pmf` |
| **[design-stack](plugins/design-stack)** | The research and evidence layer for UI work: screen playbooks, design-system selection, a hard gate on interface states | `/design-stack:brief` `:research` `:review` `:sources` |
| **[monorepo-stack](plugins/monorepo-stack)** | Scaffold and maintain a Bun + Turborepo monorepo with apps, modules, shared packages and Storybook | `/monorepo-stack:init` `:add-app` `:add-module` `:add-package` `:add-storybook` `:audit` |
| **[anumat-erp-all](plugins/anumat-erp-all)** | Bundle: installs all of the above | — |

You don't have to type the commands: each plugin's skill triggers from plain
requests like "write a PRD for bulk export", "audit this repo's security",
"help me prepare the demo", "what should we host this on for free" or "how do
I find my first customers".

They are designed to meet. `monorepo-stack` creates `packages/ui` and its
Storybook, and `design-stack` reads them. `dev-docs` writes the threat model
and `security-audit` works from it. `customer-discovery` finds the story, and
`demo-storytelling` tells it.

## Adding a plugin

Four steps.

1. Create `plugins/<name>/` with a `.claude-plugin/plugin.json`, and whatever
   `skills/` and `commands/` it needs. Guidance goes in `skills/<name>/reference/`,
   fill-in documents in `skills/<name>/templates/` (flat folders).
2. Append an entry to `.claude-plugin/marketplace.json`. The `source` is a
   repo-relative path with forward slashes: `"./plugins/<name>"`. The `version`
   must match the one in the plugin's own manifest.
3. Add it to `dependencies` in `plugins/anumat-erp-all/.claude-plugin/plugin.json`
   so the bundle installs it.
4. Run the validator. Fix what it reports. Add a row to the table above.

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
node scripts/validate.mjs          # this repo's rules
claude plugin validate --strict .  # Claude Code's own manifest checks
```

The first is Node only, no dependencies. Exit `0` means clean; exit `1` prints one
`FAIL: <check>: <message>` line per problem.

| Check | Catches |
|---|---|
| `manifests` | malformed or missing JSON; a `source` that does not resolve, uses backslashes, or is not repo-relative; a version that disagrees between the two manifests; a bundle dependency that isn't in the marketplace |
| `frontmatter` | a `SKILL.md` with no YAML block, a missing `name` or `description`, a `name` that does not match its directory, or a description too short to trigger reliably |
| `length` | a skill body over its cap: 150 lines by default, 120 for `monorepo-stack`, 80 for `design-evidence`. Detail belongs in reference files, not in the body that is always loaded |
| `refs` | a routed path that does not exist, and any use of the bare ambiguous path form described above. Scans skill bodies, every file in `reference/`, `patterns/`, `systems/` and `templates/`, and every command |
| `aesthetics` | appearance vocabulary anywhere in a plugin's skills or commands, which would contradict the `frontend-design` skill when both are loaded. A term-list tripwire, not a proof |
| `commands` | a command file with no `description` in its frontmatter, or one routing to a file that does not exist |
| `contrast` | the token example in `01-foundations.md` failing the WCAG thresholds this plugin's own review checklist calls blocking. A reference that fails its own audit teaches the wrong thing twice |
| `orphans` | a content file nothing routes to. Unroutable files are invisible at runtime, so the plugin looks like it is working while having no evidence to read |

Run it before every commit that touches a plugin.

### Known limits

The validator is a tripwire, not a proof. It does not catch aesthetic guidance
phrased without a listed term, or a very long single line inside a skill body —
`length` counts lines, not bytes. Content folders are scanned recursively, but
`orphans` matches by file name, so keep content folders flat. `contrast` reads
only `design-stack`'s token file. A bundle plugin (dependencies only, no skills
or commands) is exempt from the skill checks.

## CI

`.github/workflows/ci.yml` runs both validators, a real install of the bundle
into a throwaway config, and the `monorepo-stack` unit tests on every push and
pull request. The full scaffold acceptance test
(`plugins/monorepo-stack/scripts/acceptance.mjs`: generate, install, build,
type-check, lint, test) runs on a manual trigger and weekly, because it
installs from the npm registry.

## History

The design specs and plans in `docs/superpowers/` were written when this was a
personal marketplace called `chamrong`. They are kept as written; the
marketplace is now `anumat-erp`.

## Licence

MIT. See [LICENSE](LICENSE).
