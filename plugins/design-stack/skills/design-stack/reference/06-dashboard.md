# Dashboards

*Read this when laying out metrics, KPIs, or analytics.*

**Chart type selection, colour encoding, and axis treatment belong to the
`dataviz` skill.** This file covers the structure around the charts: what goes
where, in what order, and how the numbers are framed. For the canonical screen
composition of a dashboard, see `patterns/dashboard.md`.

A dashboard's job is to answer a question fast enough that the user does not
open a spreadsheet. Everything below follows from that.

## Metric hierarchy

**One primary number.** The dashboard should have a single most important
figure, and it should be unmistakable — larger, first, alone. If you cannot
choose one, the dashboard is serving two audiences and should be two
dashboards.

Then supporting context, then detail. Three tiers is enough.

A wall of equal-weight tiles communicates nothing. It looks comprehensive and
functions as a search problem: the user has to read all twelve numbers to find
the one they came for, every single time. Equal weight is a refusal to decide
what matters, and the user pays for that refusal on every visit.

## KPI tile anatomy

| Part | Required | Notes |
|---|---|---|
| Value | yes | tabular figures — see `reference/03-typography.md` |
| Label | yes | says what it measures, unambiguously |
| Timeframe | yes | "last 30 days" — a number without a period is meaningless |
| Comparison | usually | vs previous period, target, or cohort |
| Trend | optional | direction and magnitude; a sparkline if the shape matters |
| Drill-down | optional | but if the tile invites a question, answer it |

**A number without a baseline is noise.** "1,284 signups" is unreadable —
good or bad depends on last month, on the target, on the trend. Always pair the
value with something to compare it against, and say which comparison you used.

Direction is not always good. A rising error rate and a rising revenue figure
both go up; colour and arrow must encode *good or bad*, not *up or down*, or
they actively mislead.

## Chart or table

The rule: **a chart shows shape, a table shows values.**

| Use a chart when | Use a table when |
|---|---|
| the question is about trend, distribution, or comparison of shape | the user needs exact figures |
| there are too many points to read individually | the user will copy, export, or reconcile the numbers |
| an outlier or inflection is the finding | rows have many attributes, not one measure |

When the user needs both — common — show the chart and put the table under it.
Do not try to make one artifact do both jobs; a chart with every value labelled
is a bad table, and a table with inline bars is usually a bad chart.

## Filters and timeframe

Put the timeframe control **top-left or top-right, above everything it
affects**, and make it obvious which elements it governs. A filter whose scope
is ambiguous makes every number on the page untrustworthy.

Persist filter state in the URL so a view can be shared and survives reload.
A dashboard state a user cannot send to a colleague is half a product.

Show active filters explicitly, with a clear-all. A filtered dashboard that
looks identical to an unfiltered one produces confident wrong conclusions —
this is the most consequential failure on the list, because it is silent.

## Drill-down

Every aggregate should have a path to its constituents. A user who distrusts a
number will go looking for the rows behind it; if the product does not provide
that path, they will export to a spreadsheet and stop trusting the dashboard.

Drill-down should carry context: clicking a bar in "failed payments, last 7
days" lands on that filtered list, not on the unfiltered table.

## Refresh and staleness

**Always show when the data is from.** Live, five minutes ago, and end of
yesterday are three different products, and the user cannot tell them apart by
looking.

For live data: show the last update time and whether the connection is
healthy. For periodic data: show the period and the next refresh. For
manually-refreshed data: show the age prominently enough that nobody presents
last week's number in a meeting.

Handle **partial failure**. One widget's data source being down should degrade
that widget, with a visible error and a retry, not blank the page and not — far
worse — silently render zero. A zero that means "no data" and a zero that means
"the value is zero" must never look the same. See `patterns/states.md`.

## Common failures

- **No primary metric.** Twelve equal tiles; the user searches every visit.
- **Numbers without baselines.** Unreadable without comparison.
- **Colour encoding up/down instead of good/bad.** Actively misleading on
  inverted metrics like error rate or churn.
- **Ambiguous filter scope.** Makes every number on the page suspect.
- **Filter state not in the URL.** Views cannot be shared or restored.
- **Silent filtering.** A filtered view indistinguishable from the full one.
- **No timestamp.** The user cannot tell stale data from live.
- **Failure rendered as zero.** The most dangerous bug on a dashboard.
- **No drill-down.** Users export to spreadsheets and stop trusting you.
- **Charts where tables belong.** Pretty, and useless for reconciliation.
