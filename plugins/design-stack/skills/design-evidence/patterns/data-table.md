# Data Table

## What this screen is for

Finding specific records among many, comparing them, and acting on one or
several. Scanning is the dominant activity, so everything that slows scanning
is expensive and everything that speeds it is worth space.

## Canonical structure

```
1. Title + total count          "Orders · 1,284"
2. Bulk action bar              appears on selection, replaces or overlays (3)
3. Filters + search             → patterns/search-filter.md
4. The table
5. Pagination                   page size, position, total
```

**Column order** follows how people read a row:

```
[select] identifier · scan attributes · status · [actions]
```

The identifier comes first because it is what the user is looking for. Status
sits near the end because it is checked after the row is found, not used to
find it. Actions are last and right-aligned, out of the scanning path — a
destructive action in the middle of a row is a mis-click waiting to happen.

**The count in the title matters** more than it looks. "1,284 orders" tells the
user whether their filter worked, whether the page is the whole story, and
whether to filter further, all before they read a single row.

## Variants

| Variant | Choose when |
|---|---|
| **Index table** | rows are records with uniform attributes; scanning columns |
| **Resource list** | rows are rich objects with images, multiple lines, varied content |
| **Grouped** | rows fall into meaningful buckets — by date, status, owner |
| **Tree table** | rows genuinely nest; cap the depth |

The index-table vs resource-list distinction is Polaris's, and it is a real
one: a list of people with avatars and three lines of detail is not a table and
forcing it into columns makes it worse. See `systems/polaris.md`.

## Behaviour

**Sorting.** Show the current sort and its direction in the header. Pick a
sensible default — usually most-recent-first — and say what it is. An unsorted
table of 1,284 rows is a pile.

**Column sizing.** One column absorbs the slack; the rest are sized to content.
Usually the name or description column. Distributing slack evenly gives you a
date column 300px wide holding ten characters.

**Selection and bulk actions.** The bar must show *how many* are selected and
offer select-all-matching-the-filter as distinct from select-all-on-this-page —
users routinely believe they selected 1,284 records when they selected 50.
Destructive bulk actions confirm with the count: "Delete 47 orders?"

**Row actions.** Up to two inline; beyond that an overflow menu. Every row
having six visible buttons turns the scanning column into noise. Never put a
destructive action inline without confirmation.

**Row click.** Decide and be consistent: the whole row navigates to detail, or
nothing does. A row where some regions navigate and others do not is
infuriating. If the row navigates, the actions column must stop propagation.

**Sticky header**, and sticky first column when scrolling horizontally — losing
which column you are reading is the main cost of a wide table.

## Responsive

Three real answers. Pick deliberately; do not let it default to horizontal
scroll.

| Answer | Right when |
|---|---|
| **Horizontal scroll** | all columns matter and users are comparing; pair with a sticky first column |
| **Column priority** | some columns are secondary; hide them by width, offer a column picker |
| **Card fallback** | under ~600px, each row becomes a stacked card |

The card fallback is usually right for consumer products and usually wrong for
professional tools, where users came specifically to compare columns.

## The six states

| State | This screen |
|---|---|
| **empty** | all three sub-cases occur here and are constantly conflated. No records ever → explain and offer to create. Filter matched nothing → say which filter, offer to clear. All deleted → acknowledge, offer undo. |
| **loading** | skeleton rows matching the real row height, so nothing jumps. On sort or filter, keep the old rows visible and dim them — blanking loses the user's place. |
| **error** | total: the table area shows the error with a retry. Partial: a single row failing to load shows in place, not as a missing row. |
| **permission** | some users see fewer columns, fewer rows, or fewer actions. If rows are filtered by permission, say so — an incomplete table that looks complete produces wrong conclusions. |
| **overflow** | the 200-character name, the 1,284-page pagination, the 40-column table. Truncate with tooltips; virtualise beyond a few hundred rows. |
| **offline** | cached rows stay readable and marked stale; actions disable with a reason. |

Definitions: `patterns/states.md`.

## Common failures

- **One empty message for all three empty cases.** The top failure here.
- **Blanking the table on sort or filter.** Loses position and feels slow.
- **Select-all ambiguity.** Users think they have 1,284 selected; they have 50.
- **No total count.** The user cannot tell whether the filter worked.
- **Evenly distributed column widths.** Wastes space on dates, cramps names.
- **Destructive action inline with no confirmation.** Mis-clicks delete data.
- **Six buttons per row.** The scanning column becomes noise.
- **Proportional figures in numeric columns.** Ragged and incomparable; see
  `reference/03-typography.md`.
- **Horizontal scroll by accident** rather than by decision.
- **No sticky header.** Column identity lost after one screen of scrolling.
- **Inconsistent row-click behaviour.**

## Reference products

| Product | Look at |
|---|---|
| **Linear** | keyboard navigation, grouping, density, speed |
| **Stripe Dashboard** | filtering, the balance of columns, pagination at scale |
| **Carbon data table** | the most complete public table spec — `systems/carbon.md` |
| **Polaris resource list** | the index-table vs resource-list distinction |
| **Airtable** | column sizing, inline editing, view switching |
