# Typography

*Read this when building a type scale, establishing hierarchy, or handling
numbers, truncation, and overflow.*

**Typeface selection and typographic personality belong to the
`frontend-design` skill.** Which families, what character, how much risk — that
is an aesthetic decision and it is made there. This file covers structure: how
sizes relate, how hierarchy is built, how text behaves when the content fights
the container.

## Building a type scale

Pick a base size and a ratio, then round to whole pixels. A base of `16px` with
a ratio near `1.25` gives roughly:

```
12 · 14 · 16 · 18 · 20 · 24 · 30 · 36 · 48
```

Why a ratio rather than chosen values: related sizes look intentional, and
unrelated ones look like a mistake. The reader cannot articulate the ratio but
can see its absence.

Smaller ratios (`1.15`–`1.25`) suit dense interfaces where many levels must
coexist without any becoming huge. Larger ratios (`1.33`–`1.5`) suit editorial
and marketing pages with few levels and strong contrast between them.

Most interfaces need **five or six** sizes. More than that and the levels stop
being distinguishable, which means they stop carrying information.

## Hierarchy is not only size

Size is the loudest hierarchy signal and the one most over-used. Four others
are available, and combining two weak ones usually beats escalating size:

| Signal | Use for |
|---|---|
| **Weight** | distinguishing a label from its value at the same size |
| **Colour** | demoting secondary and supporting text |
| **Space** | separating groups — often stronger than any type change |
| **Case and tracking** | small structural labels, used sparingly |

A practical rule: if two things are one step apart in size *and* differ in
weight *and* differ in colour, you have spent three signals on one distinction.
Spend one, keep the others for the next level down.

Hierarchy should survive being squinted at. If you blur the screen and cannot
tell which element is primary, the hierarchy is carried by content rather than
by form, and the reader has to read everything to find anything.

## Measure and leading

- **Line length:** 60–75 characters for prose. Past ~80 the eye loses the
  return and re-reads lines.
- **Line height:** roughly `1.5` for body text, tightening toward `1.2` as size
  increases. Large text needs proportionally less leading — headings set at
  body leading look unglued.
- **Serif vs sans:** serifs tolerate slightly longer lines and want slightly
  more leading than a sans at the same size.
- **Short strings** — labels, buttons, table cells — do not need body leading.
  `1.2`–`1.3` is right, and `1.5` makes controls unnecessarily tall.

## Numbers

**Use tabular figures wherever numbers are compared or change in place.** In
proportional figures, `1` is narrower than `0`, so a column of numbers is
ragged and a live-updating value shifts its neighbours on every tick.

Mandatory for: any column of numbers, any currency, any timer or counter, any
metric that refreshes.

```css
.numeric { font-variant-numeric: tabular-nums; }
```

Also: **align numeric columns right**, so digits of the same magnitude line up
vertically and the reader can compare lengths at a glance. Left-aligned numeric
columns destroy that.

Format for the reader, not the database. `1,284,392` not `1284392`. Round to
the precision the decision needs — six decimal places on a revenue figure is
noise that costs scanning speed.

## Truncation and overflow

Every string that can come from a user or a database can be longer than you
planned. Decide per element, and decide before it happens in production:

| Strategy | Right when |
|---|---|
| **Wrap** | vertical space is available and the full text matters |
| **Truncate with ellipsis** | the start identifies the item; pair with a tooltip or title |
| **Clamp to N lines** | descriptions in cards, where uniform height matters |
| **Scroll** | code, logs, and other content that must stay verbatim |

Truncate at the **end** for names and titles, where the start identifies. For
file paths and URLs, truncate in the **middle** — the start and end both carry
identity and the middle rarely does.

Never truncate without a way to see the full value. A truncated string with no
tooltip, no expansion, and no detail view is data the product is hiding.

Also plan for the opposite: the empty string, the single character, the name
that is one letter. Layouts tuned to typical-length content often collapse at
both extremes.

## Common failures

- **Proportional figures in tables.** Ragged columns, jittering counters.
- **Left-aligned numeric columns.** Makes magnitudes incomparable.
- **Body leading on headings.** Lines drift apart and the heading loses
  cohesion.
- **Hierarchy by size alone.** Produces either too many sizes or too little
  contrast.
- **Unbounded measure.** Full-width prose on a wide monitor is unreadable.
- **Truncation with no escape hatch.** Hidden data the user cannot reach.
- **Untested extremes.** The 80-character name and the 1-character name both
  break layouts tuned to the 20-character case.
