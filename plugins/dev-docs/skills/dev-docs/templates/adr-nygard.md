<!--
Template: Architecture Decision Record, Nygard format
Basis: Michael Nygard, "Documenting Architecture Decisions" (2011): Title,
Status, Context, Decision, Consequences.
Use when: recording one architecture decision, where the context matters more
than a detailed option comparison. For a weighed choice between options, use
the MADR template.
Lives at: docs/adr/NNNN-<short-title-in-kebab-case>.md
Rules: one decision per ADR. Numbers are never reused. Once Accepted, do not
edit the content; write a new ADR that supersedes it.
The first ADR in a repo is usually "0001: Record architecture decisions".
Remove this comment in the finished document.
-->

# <NNNN>. <Short title, stated as the decision: "Use PostgreSQL for order storage">

Date: <YYYY-MM-DD>

## Status

<Proposed | Accepted | Rejected | Deprecated | Superseded by [NNNN](NNNN-title.md)>

<If this supersedes another: "Supersedes [NNNN](NNNN-title.md)".>

## Context

<The forces at play: technical, business, team, and time constraints. What
problem needs a decision, and why now. Write it neutrally, as facts. A reader
in two years with none of today's context should understand why this
mattered.>

## Decision

<The decision, in active voice, starting "We will …". Be specific enough
that someone can tell whether code follows it.>

## Consequences

<What becomes easier and what becomes harder because of this decision. List
the negative consequences as honestly as the positive ones. Include follow-up
work this creates.>

- <Positive: …>
- <Negative: …>
- <Neutral / follow-up: …>
