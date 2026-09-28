# Layout

*Read this when choosing a grid, setting breakpoints, or picking the overall
shell a product lives in.*

Layout decisions are expensive to reverse because everything else is built
inside them. Make the shell choice deliberately and early.

## Grid and columns

A 12-column grid survives because 12 divides by 2, 3, 4, and 6 — it expresses
halves, thirds, quarters, and sixths without fractions. Use it when content is
genuinely modular.

Do not force a grid where content is not modular. A settings page is a single
readable column with a navigation rail; expressing that as "3 of 12 plus 9 of
12" adds vocabulary without adding structure. The grid is a tool for aligning
repeated units, not a mandatory substrate.

**Gutters** come from the spacing scale in `${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/01-foundations.md`, and
scale with viewport: tighter on phones where every pixel of content width
matters, wider on desktop where the eye needs help grouping.

## Breakpoints

Set breakpoints from **content**, not from devices. The question is never "what
width is an iPad"; it is "at what width does this table stop being readable".
Device widths change every year; the width at which a three-column card row
becomes cramped does not.

Practically: build the component, narrow the window until it breaks, and put a
breakpoint there. You will usually end up near the conventional values anyway,
but you will know why, and you will have the one unconventional breakpoint your
layout actually needed.

Mobile-first is the better default, because it forces the content priority
question early. Deciding what to show at 375px is deciding what matters; laying
out at 1440px first lets you defer that decision until it is expensive.

## App shell archetypes

Four shells cover nearly every product. Pick by how the user navigates.

| Shell | Structure | Choose when |
|---|---|---|
| **Sidebar** | persistent left nav, content right | many top-level destinations, frequent switching, deep hierarchy |
| **Topbar** | horizontal nav, full-width content | few destinations (≤5), content is the point, marketing-adjacent |
| **Split** | list pane + detail pane | the user works through a queue: mail, issues, messages, records |
| **Canvas** | tools + work surface + inspector | direct manipulation: editors, design tools, timelines, diagrams |

Getting this wrong is the most expensive layout mistake, because the shell
determines the navigation model, which determines what the user believes the
product *is*. A split shell says "work through these"; a canvas shell says
"make something". For canvas products specifically, see
`${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/desktop-app.md` — web layout conventions actively mislead there.

Shells also compose: a sidebar shell whose content area is a split pane is
common and fine. What does not work is switching shell between sections of one
product, which destroys the user's spatial model.

## Content width

Unbounded text columns fail: past roughly 80 characters the eye loses the line
return, and the reader re-reads lines without noticing. Cap prose at 60–75
characters. See `${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/03-typography.md` for the measure in detail.

Different content wants different caps in the same layout:

| Content | Cap |
|---|---|
| Prose, documentation, long descriptions | 60–75 characters |
| Forms | ~480–640px — wider fields do not help and hurt scanning |
| Data tables | full available width; the data sets the width |
| Dashboards | full width, with a max around 1600px before tiles stretch absurdly |

A single `max-width` on the whole app is the lazy version of this and produces
either cramped tables or unreadable prose.

## Whitespace rhythm

Space between sections should be noticeably larger than space within them. This
is the whole of grouping: proximity is the strongest grouping signal available,
stronger than borders, background colour, or headings.

A practical ratio: if elements inside a group are separated by one step of the
scale, separate groups by three. If the difference is only one step, the reader
sees a uniform list rather than two groups.

Vertical rhythm matters more than horizontal because scrolling is vertical —
inconsistent vertical gaps accumulate visibly down a long page, while
inconsistent horizontal gaps are usually seen one at a time.

## Common failures

- **Device-named breakpoints.** `--tablet: 768px` encodes an assumption that
  expires. Name them by what changes: `--nav-collapses`, `--cards-stack`.
- **One max-width for everything.** Forces prose and tables into the same
  measure, which suits neither.
- **Grid applied to non-modular content.** Ceremony without structure.
- **Equal spacing between and within groups.** Destroys grouping; the reader
  sees a flat list of things.
- **Desktop-first.** Defers the content-priority decision until the point where
  changing it is most expensive.
- **Shell switching between sections.** Breaks the user's mental map of where
  things are.
- **Nav that collapses everything at once.** Responsive collapse has an order;
  see `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/navigation.md`.
