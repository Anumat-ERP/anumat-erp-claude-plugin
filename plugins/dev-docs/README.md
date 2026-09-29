# dev-docs

A development document fails for one of three reasons. It is the **wrong
type**, so it answers questions nobody asked. It is **incomplete**: the
sections people skip (scope, alternatives, rollback, owner) are the ones that
matter later. Or it **rots**: nobody knows its status, where it lives, or
whether it still holds.

This plugin handles all three. It picks the document type from a decision
table, fills a complete template, and gives the document a status, an owner,
and a place in the repo.

## What you can ask

- "Write a PRD for bulk invoice export."
- "We need an ADR for moving to PostgreSQL."
- "Write the postmortem for yesterday's checkout outage."
- "Set up docs for this repo."
- "Audit our docs."
- "Which document do I need for this?"

## The pipeline

```
CLASSIFY  → which document does this situation need? One, not three.
LOCATE    → where does it live in the repo, and does one already exist?
GATHER    → read the code, issues, and existing docs before asking anything
FILL      → copy the template; every section answered or marked N/A with a reason
STATUS    → set status, owner, date; link related docs
REVIEW    → run the review checklist before calling it done
```

## Commands

| Command | Does |
|---|---|
| `/dev-docs:new <type> <subject>` | Create one document from a template |
| `/dev-docs:setup [minimal\|full]` | Lay out `docs/` and the root community files for a repo. Never overwrites |
| `/dev-docs:audit [path]` | Check a repo's docs against the review checklist: missing, blocking, minor |
| `/dev-docs:list [group]` | Show the template catalogue |

## Templates

37 templates, each starting with a header comment that names its basis and
when to use it.

| Group | Templates | Main bases |
|---|---|---|
| Product | PRD, BRD, user stories, one-pager | Common practice; BABOK concepts; INVEST; Given/When/Then (BDD) |
| Requirements | SRS, non-functional requirements | ISO/IEC/IEEE 29148 structure; ISO/IEC 25010 quality characteristics |
| Design | SDD, arc42, C4 diagrams, ADR (Nygard), ADR (MADR), design doc / RFC, API spec, data model, threat model | IEEE 1016 viewpoints; arc42; C4 model; Nygard; MADR 4; Google-style design doc; OpenAPI 3.1; STRIDE |
| Quality | Test plan, test case, release checklist | ISO/IEC/IEEE 29119-3 structure |
| Operations | Runbook, postmortem, on-call handover, SLO, release plan | Google SRE book and workbook practice |
| Repo | README, CONTRIBUTING, SECURITY.md, CODE_OF_CONDUCT pointer, CHANGELOG, release notes, PR template, bug and feature issue forms | GitHub community files; coordinated disclosure; Contributor Covenant (linked, not copied); Keep a Changelog; SemVer |
| Project | Project charter, meeting notes, decision log, retro, handover / onboarding | PMBOK charter concept; common agile practice |

### On standards

Templates say "based on" or "adapted from". They follow the section structure
of the named source in paraphrase. They do not reproduce standard text, and
filling one in does not make a document conformant to, or certified against,
any standard. If a project must conform, check the document against the
standard itself.

## Reference files

| File | Covers |
|---|---|
| `choosing.md` | Decision table: situation → document; common confusions; size guide |
| `catalogue.md` | Every template, its basis, and when to use it |
| `lifecycle.md` | Where each document lives in a repo; naming; status values Draft → In review → Accepted → Superseded |
| `diataxis.md` | Tutorials, how-to guides, reference, explanation for user-facing docs |
| `writing-style.md` | Plain language, requirements wording (shall / should / may), blameless language |
| `review-checklist.md` | Blocking and quality checks, plus a row per document type |
| `docs-as-code.md` | Markdown, Mermaid, markdownlint, Vale, link checking, CI, CODEOWNERS |

## What ships

**1 skill, 7 reference files, 37 templates, 4 commands.**

The skill body is a router under the 150-line cap. Detail lives in the
reference and template files, loaded only when needed.

## Out of scope

Code comments, docstrings, and commit messages. Generated API reference
(use the generator; this plugin covers the OpenAPI source and the prose
around it). Document formats other than Markdown.
