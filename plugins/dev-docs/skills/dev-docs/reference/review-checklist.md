# Review checklist

Run this before moving a document to `In review`, and again when reviewing
someone else's. Sections 1 to 3 are **blocking**: a failure there means the
document is not ready. Sections 4 to 7 are quality.

Report findings as:

```
BLOCKING  <file>:<line or section> — <rule>
          <what is wrong, and what a reader would get wrong because of it>

MINOR     <file>:<line or section> — <rule>
          <what is wrong, and the fix>
```

State the consequence. "Missing rollback" invites a shrug. "If the migration
fails halfway, on-call has no documented way back and will improvise in
production" does not.

## 1. Right document, right place (blocking)

- [ ] The type fits the situation, per
      `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/choosing.md`.
- [ ] It lives at the path and name given in
      `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/lifecycle.md`,
      or the repo's documented convention.
- [ ] No existing document already covers this. If one does, it was updated
      or superseded instead.

## 2. Complete (blocking)

- [ ] Every template section is filled, or marked `N/A — <reason>` or
      `TBD — <owner>, <date>`. No empty headings, no leftover placeholders
      (search for `<`, `TODO`, `lorem`).
- [ ] Status block present: status, owner, date, related links.
- [ ] Scope and **out of scope** are both stated.
- [ ] Design and decision documents list **alternatives considered**, with
      why each was rejected.
- [ ] Anything that changes production states how to **roll back**.
- [ ] Every open question has an owner.

## 3. Correct and verifiable (blocking)

- [ ] Facts match the code, config, and issue tracker. Commands were run.
      Paths exist. Version numbers are current.
- [ ] Requirements are testable: numbers and behaviours, not "fast" or
      "easy". See the requirements language in
      `${CLAUDE_PLUGIN_ROOT}/skills/dev-docs/reference/writing-style.md`.
- [ ] No invented numbers, dates, names, or SLO targets. Unknowns are `TBD`.
- [ ] No secrets, credentials, internal hostnames that should not be public,
      or personal data.
- [ ] Standards are cited honestly: "based on", never "compliant with",
      unless compliance was actually checked.

## 4. Readable

- [ ] The first paragraph says what the document is for and what it
      concludes or asks for.
- [ ] Short sentences, active voice, plain words.
- [ ] Terms are defined once and used consistently.
- [ ] Acronyms spelled out on first use.
- [ ] No marketing tone.

## 5. Linked

- [ ] Links to its parent and children along the chain PRD → FS (SRS if formal) → design doc/SDD → TS → test plan, plus ADRs and runbooks,
      and back.
- [ ] Relative links inside the repo resolve.
- [ ] `docs/README.md` lists it, if it is a new kind of document.

## 6. Diagrams and formatting

- [ ] Diagrams are Mermaid or another text format checked into the repo,
      not only an image exported from a tool.
- [ ] Each diagram has a title and labelled arrows, and the text says what
      it shows.
- [ ] Images have alt text. Colour is not the only carrier of meaning.
- [ ] Passes markdownlint and, if configured, Vale.

## 7. Maintainable

- [ ] One owner is named, as a person or team that still exists.
- [ ] It will change in the same PR as the code it describes. If not, say
      how it stays current.
- [ ] It is as short as it can be while complete. Material that belongs in
      another document is linked, not copied.

## Type-specific checks

| Type | Also check |
|---|---|
| PRD | Problem stated before solution; success metrics measurable; non-goals listed |
| User stories | Each passes INVEST; each has Given/When/Then criteria including one failure case |
| Functional spec | Every function has trigger, main and exception flows, a field validation table with error messages, permissions by role, and Given/When/Then criteria; traceability matrix has no blank cells |
| Technical spec | Every module touched has an owner reviewer; migrations state online or windowed; each rollout step has a rollback; effort breakdown tasks are ticket-sized |
| SRS / NFR | Each requirement has an ID, a priority, and a verification method |
| ADR | One decision only; status set; consequences include the negative ones |
| Design doc | Alternatives section is real, not a straw man; rollout and rollback present |
| API spec | Every endpoint has error responses, auth, and an example; OpenAPI validates |
| Threat model | Every STRIDE category considered per trust boundary; each threat has a mitigation or an accepted-risk owner |
| Test plan | Entry and exit criteria are measurable; risks map to tests |
| Runbook | Every step is a command or a click, with expected output; escalation path present |
| Postmortem | Blameless; timeline in UTC; every action item has an owner, a ticket, and a date |
| SLO | SLI defined precisely (good events / valid events); error budget policy agreed by named people |
| README | A new person can go from clone to running in the documented steps, on a clean machine |
| CHANGELOG | Unreleased section present; entries grouped by change type; versions follow SemVer |
| SECURITY.md | Private reporting channel works; response times stated; supported versions listed |
