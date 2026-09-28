# Atlassian Design System

## What it is for

Project and issue tracking, and any product with deeply nested hierarchies that
users must navigate, filter, and cross-link.

## Core conventions

- **Deep hierarchy made navigable.** Portfolio → project → epic → issue →
  subtask, with breadcrumbs, parent links, and consistent wayfinding at every
  level. This is the hardest problem Atlassian solves and the main reason to
  study it.
- **Saved filters and views as first-class objects.** A filter is something a
  user names, saves, shares, and returns to — not a transient UI state. Any
  product where users repeatedly narrow a large set should borrow this; see
  `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/search-filter.md`.
- **Multiple views over one dataset** — list, board, timeline, calendar — with
  filter state preserved across the switch. The view is a lens, not a separate
  page.
- **Inline editing** throughout. Editing a field in place, without a form or a
  page transition, because users make many small edits rather than a few large
  ones.
- **Lozenges and status treatments** for workflow state, with a defined
  vocabulary so status looks the same everywhere.
- **@-mentions, linking, and cross-references** as a designed system rather than
  incidental features — objects refer to each other constantly.
- **Comment and activity threads** attached to objects, with a clear
  distinction between activity history and discussion.

## Where it is opinionated

Hierarchy navigation, filter persistence, inline editing, and workflow status
presentation. Atlassian assumes objects with state that moves through a process,
and that shape is baked into the guidance.

## Where it is silent

Consumer products, marketing, data-dense analysis, and anything without a
workflow. Its patterns assume collaboration and history; a single-user tool
inherits complexity it does not need.

## Pick it when

Building project management, issue tracking, a ticketing or support system, a
CRM pipeline, a workflow or approval tool, or anything where records move
through states and several people touch them.

## Do not pick it when

The product is flat rather than hierarchical, or single-user. Atlassian's
patterns cost complexity that only pays off when there is genuine hierarchy and
collaboration. Also not a fit for analysis-heavy products — use
`${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/carbon.md`.

## Docs

<https://atlassian.design> — fetchable.

Look up: navigation and wayfinding for nested objects, saved filter patterns,
inline edit behaviour, and the lozenge and status vocabulary.
