<!--
Template: Jira import CSV
Basis: Jira's CSV importer conventions. Column names, required fields and
parent linking differ by Jira version (Cloud vs Data Center), project type
(company-managed vs team-managed) and import mapper. Details in
${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/tool-jira.md.
Use when: bulk-creating a breakdown in Jira.
Rules: parents before children; Issue Type values match existing types
exactly; run a two-row test import first.
Remove this comment in the finished document.
-->

# Jira import: <Project key, source>

| Field | Value |
|---|---|
| Target project | <KEY> |
| Jira | <Cloud / Data Center, version> |
| Project type | <company-managed / team-managed> |
| Parent linking | <Parent Id (newer) / Epic Link + Epic Name (older)> |
| Story points field | <Story Points / Story point estimate> |

**Check before importing.** Column names depend on your Jira version and the
import mapper. Open the importer, map each column on the mapping screen, and
run a test with two rows (one epic, one story) first. Save the mapping for
reuse.

## CSV (newer Jira Cloud, Parent field)

```csv
Issue Id,Parent Id,Issue Type,Summary,Description,Priority,Labels,Labels,Story Points,Assignee
1,,Epic,"Bulk invoice export","Outcome: finance users export invoices without support. Requirements: FR-012..FR-015.",High,req-FR-012,,,
2,1,Story,"Export this month's invoices as CSV","As a finance user I want to export this month's invoices as CSV so that I can reconcile them.

Given I have the Finance role
When I select Export for this month
Then a CSV with one row per invoice downloads",High,req-FR-012,export,3,
3,1,Story,"Choose a custom date range for export","As a finance user I want to pick a date range so that I can export any period.",Medium,req-FR-013,export,5,
4,1,Task,"Spike: provider API supports partial refunds?","Time box: 2 days. Answer in the ticket.",Medium,spike,,,
5,2,Sub-task,"Add CSV serializer for invoice rows","",Medium,,,,
```

Notes:

- `Issue Id` and `Parent Id` are temporary numbers that only link rows in
  this file. Map `Issue Id` to "Issue Id" and `Parent Id` to "Parent Id".
- Repeat the `Labels` column once per label.
- Leave `Assignee` empty unless you know the value your instance expects
  (username, email or account ID).
- Multi-line descriptions must be inside double quotes. Double any quote
  inside a value (`""`).

## CSV (older Jira, Epic Link)

```csv
Issue Type,Summary,Epic Name,Epic Link,Description,Priority,Labels,Story Points
Epic,"Bulk invoice export","Bulk invoice export",,"Outcome: ...",High,req-FR-012,
Story,"Export this month's invoices as CSV",,"Bulk invoice export","As a finance user ...",High,req-FR-012,3
Story,"Choose a custom date range for export",,"Bulk invoice export","As a finance user ...",Medium,req-FR-013,5
```

Here `Epic Link` refers to the epic by its Epic Name (or an existing key).
Sub-tasks in this form need `Issue Id` / `Parent Id` columns as above.

## After import

- [ ] Count created issues against the breakdown table.
- [ ] Open one story and check parent, points, labels and description.
- [ ] Add "blocks" links for dependencies (the CSV importer's link support
      varies; adding them by hand or by bulk edit is often simpler).
