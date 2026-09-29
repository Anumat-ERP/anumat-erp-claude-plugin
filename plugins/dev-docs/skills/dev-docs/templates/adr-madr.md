<!--
Template: Architecture Decision Record, MADR format
Basis: adapted from MADR (Markdown Architectural Decision Records) version
4.x, adr.github.io/madr, licensed under MIT / CC0. Optional sections are
marked; delete them if they add nothing.
Use when: one decision where two or more options were seriously weighed, and
the comparison should be kept.
Lives at: docs/adr/NNNN-<short-title-in-kebab-case>.md
Rules: one decision per ADR. Numbers are never reused. Once accepted, write a
new ADR to change the decision.
Remove this comment in the finished document, so the YAML front matter is
the first thing in the file.
-->

---
status: <proposed | rejected | accepted | deprecated | superseded by NNNN>
date: <YYYY-MM-DD, when the status last changed>
decision-makers: <everyone who decided>
consulted: <optional: people whose opinion was sought, two-way>
informed: <optional: people kept up to date, one-way>
---

# <Short title of the problem and the chosen solution>

## Context and problem statement

<Two or three sentences describing the context and the problem. Can be a
question: "How should the order service publish events reliably?" Link to
the issue or design doc.>

## Decision drivers

<Optional.>

- <driver 1, e.g. a force, a quality goal, a constraint>
- <driver 2>

## Considered options

- <option 1 title>
- <option 2 title>
- <option 3 title>

## Decision outcome

Chosen option: "<option title>", because <justification: it is the only one
that meets driver X, or it resolves force Y, or it scores best on the
comparison below>.

### Consequences

- Good, because <positive consequence>.
- Bad, because <negative consequence>.

### Confirmation

<Optional. How compliance with this decision will be checked: a code review
rule, an architecture test, a lint rule, a review at a set date.>

## Pros and cons of the options

<Optional but recommended.>

### <Option 1 title>

<Description or link.>

- Good, because <argument>.
- Neutral, because <argument>.
- Bad, because <argument>.

### <Option 2 title>

- Good, because <argument>.
- Bad, because <argument>.

### <Option 3 title>

- Good, because <argument>.
- Bad, because <argument>.

## More information

<Optional. Evidence, team agreement, links to related decisions, when to
revisit this decision.>
