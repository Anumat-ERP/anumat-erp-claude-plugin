---
description: Audit a repository's documentation against the dev-docs review checklist and report gaps.
argument-hint: [path or document to audit; defaults to the whole repo]
---

Audit documentation in: **$ARGUMENTS** — or, if no argument was given, the
whole repository.

Read `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/review-checklist.md`
now and apply it. Do not work from memory of it. Use
`${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/lifecycle.md` for the
expected layout and statuses and
`${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/choosing.md` for the
expected set of documents.

## Scope

Read the actual files. Check claims against the repo: run the README's
setup commands mentally against the package manifest, confirm paths and
links resolve, compare documented versions with tags. A finding you cannot
point at a file and line for is not a finding.

## Order

**Part 1: repository coverage.** Which expected documents are missing?
Root files (README, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, CHANGELOG,
LICENSE), `.github` templates, `docs/README.md` index, ADR folder. For each
missing one, name the template from
`${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/catalogue.md`.

Also look for gaps implied by the code: services without runbooks, alerts
without runbooks, public APIs without a spec, a database without a data
model document, an auth or payment flow without a threat model.

**Part 2: per-document review.** For each document, checklist sections 1 to
3 (blocking) then 4 to 7, plus its type-specific row.

**Part 3: health.**
- Documents in `Draft` or `In review` for more than 30 days.
- Accepted documents not updated in 12 months whose subject changed since
  (compare with git history of the code they describe).
- Superseded ADRs without a link to their replacement.
- Broken relative links.
- No docs linting in CI.

## Output

```
BLOCKING  <file>:<line or section> — <rule>
          <what is wrong, and what a reader would get wrong because of it>

MINOR     <file>:<line or section> — <rule>
          <what is wrong, and the fix>

MISSING   <expected document> — <why it is expected here>
          Template: <anchored template path>
```

Blocking first, then missing, then minor. State the consequence of each
finding, not only the rule. If a section passes, say so in one line;
silence reads as "not checked".

End with the three changes that would help most, in order. Offer to make
them with `/dev-docs:new` or `/dev-docs:setup`. Do not change files during
the audit.
