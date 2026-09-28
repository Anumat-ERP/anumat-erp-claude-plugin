# Search and Filtering

## What this screen is for

Narrowing a large set to the thing the user wants. Success is measured in how
quickly they stop searching, and in how confident they are that what they see
is everything.

## Canonical structure

```
1. Search input           prominent; scope stated
2. Active filter chips    what is currently applied, each removable
3. Result count           "47 of 1,284 results"
4. Sort control
5. Results                → patterns/data-table.md for tabular results
```

**Why this order.** The user needs to know what they searched, what is
narrowing it, and how much came back, before reading a single result. A page
that shows results without a count leaves them unable to tell whether the
filter worked or whether there simply is not much.

**State the scope.** "Search invoices" and "Search everything" produce very
different expectations, and a user who does not know which they are using will
misread an empty result as missing data.

## Instant or submitted

| Approach | Right when |
|---|---|
| **Instant (as-you-type)** | results return in under ~200ms and the set is local or small |
| **Debounced instant** | 200–500ms; debounce at 250–300ms so it does not fire per keystroke |
| **Submitted (Enter)** | slow, expensive, or paginated queries; results change substantially per keystroke |

Above roughly half a second, instant search stops feeling responsive and starts
feeling broken — results lag behind the query and flicker between states. Use
submitted search rather than shipping a laggy instant one.

Always allow `Enter` to submit even in instant mode; users expect it and will
press it.

## Filter placement

| Filters | Placement |
|---|---|
| 1–3 | inline, beside the search input |
| 4–8 | a filter bar above the results |
| 9+ | a sidebar, or a modal on narrow viewports |
| Complex boolean | a query builder — and accept that most users will not use it |

**Always show active filters as removable chips**, regardless of where the
controls live. A filter applied in a collapsed sidebar and not shown anywhere
else produces a user who believes they are looking at everything. This is the
same silent-filtering failure as in `patterns/dashboard.md`, and it is the most
consequential error in this document because it is invisible.

Offer **clear all** whenever more than one filter is active.

## Zero results is a recovery surface

The most-neglected screen in search, and the one where the user most needs
help. It must answer *why* and offer *what next*:

- **Say what was searched and what was filtered.** "No invoices matching
  'northwind' with status *overdue*."
- **Offer to relax the narrowest constraint.** "Remove the status filter — 12
  results."
- **Suggest corrections** if you can detect a likely typo.
- **Offer to widen the scope.** "Search all records instead."
- **Offer the action** if creating the thing is plausible.

Counting results for the relaxed query before offering it is what makes this
genuinely useful rather than a polite dead end.

## URL as state

**Search and filter state belongs in the URL.** This makes results shareable,
bookmarkable, survivable across reload, and correct with the back button.

Back is the specific one products get wrong: a user who filters, opens a
result, and presses back expects their filtered list, not a reset page. Getting
this wrong makes browsing a set of results exhausting.

## Recent and saved

**Recent searches** cost little and help a lot — people search the same things
repeatedly.

**Saved searches** become valuable once filter combinations get complex enough
to be worth naming. Treat a saved search as a real object: named, editable,
shareable, possibly shared team-wide. `systems/atlassian.md` is the reference
here.

## The six states

| State | This screen |
|---|---|
| **empty** | three distinct cases. Nothing searched yet → show recent, saved, or a prompt, not a blank page. No results → the recovery surface above. No data at all in the set → a first-run empty state, not a search failure. |
| **loading** | keep previous results visible and dim them. Blanking on every keystroke makes instant search unusable. Show a subtle indicator in or near the input. |
| **error** | search backends fail. Say so and offer retry — do not render a failure as "no results", which tells the user their data is missing. |
| **permission** | results are usually permission-filtered. If the count excludes records the user cannot see, say so — otherwise two users comparing counts reach wrong conclusions. |
| **overflow** | 10,000 results, a 500-character query, 40 active filters. Cap displayed results, paginate, and say the count is approximate if it is. |
| **offline** | search cached results if you can and mark them as such; otherwise say search is unavailable rather than returning nothing. |

Definitions: `patterns/states.md`.

## Common failures

- **Active filters not shown.** The user believes they see everything.
- **No result count.** Cannot tell whether the filter worked.
- **Zero results as a dead end.** No explanation, no path.
- **Search error rendered as no results.** Tells the user their data is gone.
- **State not in the URL.** No sharing, no bookmarking, broken back.
- **Back button resetting filters.** Makes browsing results exhausting.
- **Blanking results on each keystroke.**
- **Instant search on a slow backend.** Lag and flicker.
- **Scope unstated.** Empty results misread as missing data.
- **No clear-all.** Users remove filters one at a time, or reload the page.

## Reference products

| Product | Look at |
|---|---|
| **Linear** | instant filtering, saved views, keyboard-driven |
| **GitHub** | query syntax alongside UI filters, scope switching |
| **Stripe** | filtering over large record sets with accurate counts |
| **Airbnb** | filters as a modal on mobile, results updating live behind |
| **Jira** | saved filters as shared objects — `systems/atlassian.md` |
