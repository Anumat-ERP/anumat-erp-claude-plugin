# docs-stack — Design Spec

**Date:** 2026-09-28
**Status:** Awaiting review
**Repo:** `E:\Chamrong\Project\claude-plugins` (marketplace `chamrong`), plugin #5
**Branch:** `docs/stack-plugin-specs` from `b6a7592`
**Sibling spec:** `2026-09-28-api-stack-design.md` — designed together, built separately

---

## 1. Purpose

Scaffold and maintain a governed documentation repository: a fixed taxonomy, a
template per document type, mechanical identifier allocation, and an audit that
catches the decay a human reliably misses.

A docs repo has no compiler. Nothing fails when an ADR link rots after a
rename, when two branches both claim `adr-031`, when a document's filename and
its `H1` disagree, or when a decision is superseded in fact but still reads
`✅ Accepted`. Every one of those is silent, and every one destroys the thing
the repo exists for — being trustworthy enough to read instead of asking
someone. This plugin gives the repo the missing compiler.

Two halves, both required:

- **Generation** — the taxonomy, the templates, and `new` placing a correctly
  numbered document in the right area with its metadata filled in.
- **Conventions** — reference files explaining what each area is for and what
  belongs in each document type, so the taxonomy stays meaningful rather than
  becoming eleven folders people guess between.

### Success criteria

1. `/docs-stack:init` produces a repo whose own `audit` passes clean.
2. `/docs-stack:new adr "<title>"` allocates the next free number, places the
   file, and fills the metadata table — with no number collision when run twice
   in a row.
3. `/docs-stack:audit` finds every planted violation in the fixture repo, and
   reports real findings against an existing docs repo without modifying it.
4. `/docs-stack:index` regenerates area indexes so that re-running it is a
   no-op — idempotent, and therefore safe in a pre-commit hook.

Criterion 3 against a real, existing docs repo is the acceptance test.

---

## 2. Non-goals

- **Not a static site generator.** No MkDocs, Docusaurus, build step, or deploy.
  This is a Git-and-Markdown repo read in the editor and on the forge. Adding a
  site is a separate decision with separate hosting consequences.
- **Not a YAML frontmatter migration.** Documents carry **metadata tables**,
  matching the existing corpus, so `audit` runs against a real repo today
  instead of demanding a rewrite first. Frontmatter would be tidier to parse
  and would invalidate every existing document.
- **Not an issue tracker.** `delivery/` holds specs and epics as documents. It
  does not sync with Jira, and `audit` never calls an API.
- **Not a writing assistant.** It places and validates documents. What goes in
  the Context section is the author's judgement; templates prompt for it with
  italic guidance and nothing more.
- **Not a link checker for the whole web.** Relative links only. External URLs
  are not fetched — audit must work offline and finish in seconds.
- **No project-specific content.** Generic. Banned substrings, case-insensitive:
  `fueni`, `nazounki`. Region folders, vendor folders, and module names are
  parameters or created on demand, never shipped as content.

---

## 3. The taxonomy

Eleven areas. Area names are parameters with these defaults:

| Area | Holds |
|---|---|
| `architectures/decisions/{adrs,idrs}` | Numbered, immutable-once-accepted decisions |
| `architectures/{principles,options,finalized}` | Standing rules · evaluations in flight · settled designs |
| `compliances/<region>` | Regulatory obligations, one folder per jurisdiction, created on demand |
| `development/{designs,diagrams,test-plans}` | Per-feature design work |
| `discovery` | Research predating a decision |
| `governance` | Policies: security, privacy, retention, threat model |
| `delivery/{epics,specs,sprints,backlog,roadmap}` | Delivery artefacts |
| `operations/deployment` | Runbooks, post-mortems, environment setup |
| `prd/{modules,portals}` | Product requirements |
| `procedures/checklists` | Repeatable how-to |
| `references/<vendor>` | Third-party notes, one folder per vendor, created on demand |
| `templates/{engineering,jira,operations,team}` | The document contracts |

**`delivery/` is a rename.** The reference repo calls this `jira/`. Naming an
area after a vendor's tool ages badly and is wrong the moment the tool changes,
so the default is `delivery/` and the name is a parameter for anyone who wants
the old one. This is the single deliberate departure from the reference
taxonomy. *Flagged at design review and unanswered; proceeding with the
rename.*

### Document types

Eighteen templates, grouped as the reference repo groups them: `engineering/`
(`sdd`, `srs`, `spike`, `test-plan`, `changelog`, `release-notes`), `jira/`
(`epic`, `story`, `task`, `bug`), `operations/` (`runbook`, `post-mortem`,
`service-setup-guide`), `team/` (`handover`, `meeting-notes`,
`status-report`), plus `adr` and `idr`.

Every template opens with a metadata table or bold metadata line carrying
**Date, Author, Status** and a **Related** line of cross-links, then a
one-sentence italic summary. `audit` depends on that shape, so it is a contract,
not a style preference.

---

## 4. Identifier allocation

The part that must be exactly right.

`new adr "<title>"` scans `architectures/decisions/adrs/` for `adr-(\d+)-`,
takes `max + 1`, zero-pads to the corpus's existing width, slugifies the title
to kebab-case, and writes `adr-NNN-<slug>.md`. The same applies to `idr`.

Three failure modes it handles:

| Failure | Handling |
|---|---|
| Two documents created in one session | Allocation re-scans disk each call; it holds no cached counter |
| The file already exists | Refuses and reports. It never overwrites, and there is no `--force` |
| A gap in the sequence | `max + 1`, never gap-filling. A gap means a number was deliberately retired or lives on another branch; reusing it collides on merge |

**Cross-branch collision is not solvable here and the plugin says so.** Two
branches both allocating `adr-031` is a merge-time conflict, and `audit`'s
duplicate check is what catches it. `reference/03-identifiers.md` states this
plainly rather than implying a guarantee the plugin cannot make.

---

## 5. Commands

| Command | Does | Existing repo |
|---|---|---|
| `/docs-stack:init <dir>` | Taxonomy, 18 templates, area READMEs, root index | no — refuses a non-empty directory |
| `/docs-stack:new <type> <title>` | Allocates the identifier, places the file from its template, fills Date/Author/Status | yes |
| `/docs-stack:audit` | The report in §6. Read-only | yes |
| `/docs-stack:index` | Regenerates area READMEs and index tables from disk. Idempotent | yes |

`index` is separate from `audit` on purpose: one reports, one writes, and a
command that silently does both cannot be trusted in a hook.

---

## 6. What audit checks

| Check | Catches |
|---|---|
| Relative link integrity | Dense cross-linking rotting after a rename or move |
| Number gaps and collisions | Two branches claiming one ADR number |
| Filename ↔ `H1` agreement | `adr-007-foo.md` whose title reads `ADR-008 — Bar` |
| Required sections per type | An ADR with no Consequences; a missing Status/Date line |
| Status hygiene | Drafts stale past a threshold; a document superseded by a later one but still `✅ Accepted` |
| Orphans | Files that no index or document links to |
| Naming | kebab-case, correct numeric prefix ordering within an area |
| Area placement | An ADR sitting outside `architectures/decisions/adrs/` |

Every check reports **file, line, what is wrong, and what to do**. Findings are
grouped by severity: a broken link is an error, a stale draft is a warning.
Exit code is non-zero on errors only, so the command is usable in CI without
failing a build over a warning.

Audit is read-only, offline, and finishes in seconds on a repo of ~1,700 files.
That size is the design target, taken from the reference repo.

---

## 7. The skill

`skills/docs-stack/SKILL.md` carries the taxonomy table, the "which area does
this belong in" test, the command table, the boundary statement, and a "when not
to use this skill" section — writing the prose inside a document is ordinary
work and needs none of this.

### Reference files

| Read this when | File |
|---|---|
| Setting up the repo, or renaming an area | `01-taxonomy.md` |
| Choosing where a document belongs | `02-placement.md` |
| Allocating a number; understanding the cross-branch limit | `03-identifiers.md` |
| Writing an ADR or IDR — and when a decision needs one | `04-decisions.md` |
| Filling in any other template | `05-document-types.md` |
| Cross-linking, and keeping links alive through a rename | `06-linking.md` |
| Interpreting or extending an audit finding | `07-audit.md` |
| Adopting any of this in a docs repo that already exists | `08-brownfield.md` |

---

## 8. Boundary

`docs-stack` owns the **central documentation repository**. `api-stack` owns
**module-local `docs/architecture.md` and its diagram**, which live beside the
code they describe and move with it.

The two do not call each other. A module architecture doc may link to an ADR by
relative path across repos; `audit` treats a link that leaves the repo as
out of scope rather than broken, because it cannot see the other repo and must
not guess.

`design-stack` owns screen behaviour and `monorepo-stack` the frontend
workspace. Neither overlaps here.

---

## 9. Content rules

- Node `.mjs` scripts, `scripts/lib/` shared, no external dependencies,
  `scripts/test.mjs` driving `*.test.mjs`. Same pattern as the other plugins.
- Markdown parsing is deliberately shallow: regex over headings, links, and the
  metadata block. No Markdown AST dependency — the shape is a contract from §3,
  and a full parser is cost without benefit here.
- Templates are real files with `__TITLE__`-style tokens.
- Offline always. No API calls, no external URL fetching.
- Banned substrings enforced by a test over the whole plugin directory:
  `fueni`, `nazounki`, case-insensitive.

---

## 10. Verification

| # | Check | How |
|---|---|---|
| 1 | Number allocation, including twice in a row and with a gap present | Unit tests |
| 2 | Slugification: accents, punctuation, casing, length | Unit tests |
| 3 | Every audit check | Fixture repo with one planted violation per check |
| 4 | `index` idempotency | Run twice, assert no diff |
| 5 | `init` output passes its own `audit` clean | Integration test |
| 6 | Banned substrings | Directory scan |
| 7 | **Audit against a real existing docs repo** | Run manually, review findings for false positives |

Check 7 is the acceptance test. A docs auditor that cries wolf gets muted and
then ignored, so false-positive rate is the quality bar — every finding on a
real corpus is reviewed before the plugin is called done.

---

## 11. Open questions

1. **`delivery/` vs `jira/`.** Proceeding with `delivery/` as the default, name
   parameterised. Reversible by changing one default.
2. **Stale-draft threshold.** Proposed: 90 days, configurable. Arbitrary until
   run against a real corpus; check 7 will inform it.
3. **Orphan detection strictness.** Some documents are legitimately unlinked
   (templates, region stubs). Proposed: warning only, with an ignore list, never
   an error.
