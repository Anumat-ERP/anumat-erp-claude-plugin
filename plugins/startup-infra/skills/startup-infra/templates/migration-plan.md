# Migration plan · `<from>` → `<to>`

ID: `MIG-<nnn>` · Owner: `<who>` · Go/no-go owner: `<who>` · Target date: `<YYYY-MM-DD>`

Method: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/migrations.md`.

## 1. Why now

| Trigger | Current value | Threshold | Source |
|---|---|---|---|
| | | | |

What happens if we do not migrate: `<consequence and by when>`.

## 2. Inventory

| Component | Moves? | Depends on it | Data volume | Owner |
|---|---|---|---|---|
| | yes / no | | | |

Secrets, DNS records, webhooks, cron jobs and allow-lists that reference the
old provider: `<list>`.

## 3. Target

| Field | Value |
|---|---|
| Provider / plan | |
| Region | |
| Decision record | `SDR-<nnn>` |
| Exit plan from the target | |
| New monthly cost (expected / 3×) | |

## 4. Parallel run

- How the new path runs alongside the old: `<replication / dual write / mirror / shadow traffic>`
- How we compare: `<row counts, checksums, error rates, latency>`
- Duration: `<days>`
- Rehearsed on staging with production-sized data on: `<date>`

## 5. Cutover

| # | Step | Owner | Expected duration | Done |
|---|---|---|---|---|
| 0 | Lower DNS TTL (a day before) | | | ☐ |
| 1 | Announce on status page | | | ☐ |
| 2 | Freeze schema / writes if needed | | | ☐ |
| 3 | Final sync | | | ☐ |
| 4 | Switch `<connection string / DNS / endpoint>` | | | ☐ |
| 5 | Smoke test core flows | | | ☐ |
| 6 | Go / no-go decision | | | ☐ |
| 7 | Unfreeze; announce complete | | | ☐ |

Planned downtime: `<none / n minutes>` at `<time, time zone>`, chosen because `<low traffic>`.

## 6. Rollback

- Decide by: `<time after cutover>`
- Rollback steps: `<list>`
- Data written to the new side during the window is handled by: `<method>`
- Rollback rehearsed on: `<date>`

## 7. Clean up

- [ ] Old path kept read-only until `<date>`
- [ ] Old resources deleted
- [ ] Old credentials revoked
- [ ] Old billing stopped; budget alerts moved
- [ ] Docs, runbooks, diagrams and decision records updated

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| | | | |
