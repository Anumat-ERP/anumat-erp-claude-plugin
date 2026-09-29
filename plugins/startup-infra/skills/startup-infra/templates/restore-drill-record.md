# Backup and restore drill record

Drill ID: `RD-<nnn>` · Date: `<YYYY-MM-DD>` · Run by: `<who>` · Witness: `<who>`

Why and how often: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/reliability.md`.

## Scope

| Item | Value |
|---|---|
| System restored | `<database / bucket / whole environment>` |
| Backup source | `<provider PITR / own nightly dump / snapshot>` |
| Backup location | `<bucket, account, region>` |
| Backup taken at | `<timestamp>` |
| Restore target | `<fresh database / new project / staging>` |
| DR tier claimed | `<4 Rebuild / 3 Restore / 2 Warm standby / 1 Hot>` |
| Target RPO / RTO | `<e.g. 24 h / 24 h>` |

## Steps taken

| # | Step | Command or console action | Start | End | Notes |
|---|---|---|---|---|---|
| 1 | Locate latest backup | | | | |
| 2 | Download / point to backup | | | | |
| 3 | Create restore target | | | | |
| 4 | Restore | | | | |
| 5 | Run migrations if needed | | | | |
| 6 | Point an app copy at the restore | | | | |
| 7 | Verify | | | | |

## Verification

- [ ] Row counts for key tables within expected range of production
- [ ] Most recent record timestamp: `<timestamp>` (data loss window = `<n>`)
- [ ] Sign in and complete one core user flow on the restored copy
- [ ] Files referenced by the database are reachable
- [ ] Restored copy deleted or secured afterwards

## Result

| Measure | Target | Achieved |
|---|---|---|
| RPO (data lost) | | |
| RTO (time to usable) | | |

Outcome: **Pass / Fail**

## Problems found and actions

| Problem | Action | Owner | Due |
|---|---|---|---|
| | | | |

Next drill due: `<date>`
