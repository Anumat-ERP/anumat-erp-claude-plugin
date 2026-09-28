---
name: design-evidence
description: Use when designing a specific kind of screen — settings, preferences, onboarding, sign-in, data table, dashboard, navigation, search and filtering, billing, or a desktop tool with a timeline or canvas — including when the request only names the need ("users need a way to manage notifications") rather than the screen. Also for choosing which design system to follow. Supplies the structure shipped products converge on, so screens are recalled rather than invented.
---

# Design Evidence

This skill holds distilled structure from shipped products. Reading the
playbook before proposing a layout is the difference between recalling a screen
and inventing one — and in the output those two look identical, which is why
the habit has to be mechanical rather than discretionary.

## Check the project first

Before any playbook or profile here: if the repo has a Storybook, a component
package, or a token file, **that outranks everything in this skill**. Read
`${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/STORYBOOKS.md` Part 1 for how to detect one and what to extract. An
imported convention that contradicts the house system is worse than none.

## Choosing a playbook

| When the work involves | Read |
|---|---|
| Interface states — anything empty, failing, loading, restricted | `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/states.md` |
| Preferences, account, workspace, team, or org configuration | `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/settings.md` |
| First-run, setup, activation, invites, workspace seeding | `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/onboarding.md` |
| Sign-in, sign-up, password reset, verification, MFA, sessions | `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/auth.md` |
| Lists of records with columns, sorting, selection, bulk actions | `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/data-table.md` |
| Metrics, KPIs, analytics, monitoring | `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/dashboard.md` |
| Menus, sidebars, tabs, breadcrumbs, app shell wayfinding | `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/navigation.md` |
| Search, filtering, faceting, result lists | `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/search-filter.md` |
| Plans, usage, payment methods, invoices, upgrades, cancellation | `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/billing.md` |
| Editors with a timeline, canvas, tool palette, or inspector | `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/desktop-app.md` |

`${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/states.md` is read for **every** screen, not only when states are the
topic. The others are read when their subject is in play.

## When no playbook matches

Do not quietly invent. Three steps, in order:

1. **Say so.** State plainly that no playbook covers this screen type.
2. **Name the nearest structural analogue** and why it is the closest fit — a
   permissions matrix is a data table, an activity feed is a filtered list.
3. **Use it, and flag where it does not fit.** The places the analogue breaks
   down are exactly where the design needs the most scrutiny.

Silent invention produces output indistinguishable from knowledge. That is the
failure this skill exists to prevent, so a missing playbook must be visible.

## Choosing a design system

Read `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/CHOOSING.md` and **pick exactly one**, with one sentence of
justification. Picking one is mandatory — "generally modern conventions" is not
a choice, it is the absence of one, and it is how a healthcare admin panel ends
up shaped like a consumer app.

You are borrowing conventions: interaction patterns, terminology, component
behaviour, density expectations. You are not borrowing visual identity.

## The playbook shape

Every playbook has the same six sections, so you know what you are getting:

1. **What this screen is for** — the user's actual job.
2. **Canonical structure** — the order shipped products converge on, and why.
3. **Variants** — and the condition that selects each.
4. **The six states** — answered concretely for this screen.
5. **Common failures** — what generated versions get wrong.
6. **Reference products** — named as study targets for a human to browse.

## Boundary

Structure, order, and states are this skill's territory. Palette, typeface, and
visual character belong to the `frontend-design` skill; craft polish belongs to
the `impeccable` plugin.
