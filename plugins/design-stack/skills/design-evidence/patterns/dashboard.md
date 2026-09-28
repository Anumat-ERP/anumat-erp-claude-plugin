# Dashboard

## What this screen is for

Answering a question fast enough that the user does not open a spreadsheet.
Usually one of three: *is anything wrong?*, *how are we doing?*, or *what
changed?*

Cross-cutting rules — metric hierarchy, KPI tile anatomy, chart-vs-table,
baselines, staleness — are in `${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/06-dashboard.md`. This file covers the
screen's composition. Chart encoding belongs to the `dataviz` skill.

## Canonical structure

```
1. Timeframe + filters        above everything they affect
2. Primary metric row         one dominant number, 2-4 supporting
3. Trend section              how the primary metric moved
4. Breakdown                  by segment, source, category
5. Detail table               the rows behind the numbers  → ${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/data-table.md
```

**Why this order.** It matches the sequence of questions a user actually asks:
*what period am I looking at* → *what is the headline* → *is it going up or
down* → *what is driving it* → *show me the records*. A dashboard laid out in
any other order forces the user to hunt for each answer in turn.

The detail table at the bottom is not optional decoration. It is what stops
users exporting to a spreadsheet, and its absence is why they stop trusting
dashboards.

## Variants

| Variant | Refresh | Density | Optimised for |
|---|---|---|---|
| **Monitoring** | live or near-live | high | noticing a problem now — alerts, thresholds, current state |
| **Analytics** | on demand | medium | exploring — flexible filters, comparisons, drill-down |
| **Executive summary** | periodic | low | conveying a conclusion — few numbers, large, with context |

These are genuinely different products and mixing them serves nobody. A
monitoring dashboard with a date-range picker invites the wrong use; an
executive summary with forty tiles defeats its own purpose.

Choose by asking **who opens this and what they do next**. Somebody who will
page an engineer needs monitoring. Somebody preparing a board slide needs a
summary.

## Above the fold

The primary metric and its comparison must be visible without scrolling, at the
smallest supported width. Everything else can be below.

If you cannot fit the headline above the fold, there are too many things
competing to be the headline — which means the hierarchy decision has not been
made. See `${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/06-dashboard.md`.

## Comparison baselines

Every number needs one, and the dashboard should say which is in use:

| Baseline | Answers |
|---|---|
| Previous period | are we improving? |
| Same period last year | improving, seasonality removed? |
| Target or budget | are we on track? |
| Cohort or peer | are we normal? |

Mixing baselines across tiles without labelling each is how dashboards mislead
confidently. If one tile compares to last month and its neighbour compares to
target, both must say so.

## Drill-down

Every aggregate has a path to its rows, and that path **carries the filter
context**. Clicking "47 failed payments" lands on payments filtered to failed,
in the same timeframe — not on the unfiltered payments table. Losing context on
drill-down is the difference between a dashboard and a set of links.

## The six states

| State | This screen |
|---|---|
| **empty** | new account with no data yet → explain what will appear and how to get it flowing. Filtered to nothing → say which filter and offer to widen. These are different messages. |
| **loading** | per-widget skeletons matching each tile's shape, so the grid does not reflow as tiles arrive. Never blank the whole dashboard on a filter change. |
| **error** | **per widget.** One dead data source shows an error and retry in its tile; the rest of the dashboard still works. **A failed widget must never render as zero** — that is the most dangerous bug a dashboard can have. |
| **permission** | some users see fewer widgets or filtered data. If figures are scoped by permission, say so on the page — two people quoting different numbers from "the same dashboard" is a real and expensive failure. |
| **overflow** | very large numbers, very long segment names in a breakdown, a legend with 40 series, a table with 10,000 rows. |
| **offline** | show cached values clearly marked with their age. A stale number presented as current is worse than no number. |

Definitions: `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/states.md`.

## Common failures

- **No primary metric.** Twelve equal tiles and a search problem every visit.
- **Failure rendering as zero.** Silent, confident, and wrong.
- **No timestamp.** Stale and live data look identical.
- **Filter scope ambiguous.** Every number on the page becomes untrustworthy.
- **Filter state not in the URL.** Views cannot be shared or restored.
- **Drill-down losing filter context.** Lands on an unfiltered table.
- **Unlabelled mixed baselines.** Confident misreading.
- **Monitoring and analytics conflated.** Serves neither user.
- **No detail table.** Users export and stop trusting the dashboard.
- **Whole dashboard blanking on filter change.** Feels broken.

## Reference products

| Product | Look at |
|---|---|
| **Stripe Dashboard** | metric hierarchy, drill-down that keeps context, staleness handling |
| **Grafana** | monitoring density, per-panel error states, time-range controls |
| **Vercel Analytics** | restraint — few numbers, clear baselines |
| **Google Analytics** | the cautionary case: capability at the cost of legibility |
| **Linear Insights** | analytics inside a tool rather than as a separate product |
