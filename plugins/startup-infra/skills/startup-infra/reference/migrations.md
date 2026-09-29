# Migrations between stages and providers

A migration is planned **before** its trigger fires, so that when it fires you
execute a known plan instead of improvising under load. Write it with
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/migration-plan.md`.

## The shape of every migration

```
1. Why now      → the trigger that fired, with the number
2. Inventory    → what moves, what depends on it, what stays
3. Target       → provider/plan, region, and its own exit plan
4. Parallel run → new path running alongside the old, with real or mirrored traffic
5. Cutover      → a short, rehearsed switch with a named go/no-go owner
6. Rollback     → the way back, tested, with a time limit for deciding
7. Clean up     → old resources removed, credentials revoked, bills stopped
```

**Rules**
- **One layer at a time.** Moving hosting and database in the same weekend
  doubles the unknowns.
- **Rehearse on staging** with production-sized data.
- **Lower DNS TTLs** a day before any DNS-based cutover.
- **Freeze schema changes** during a database move.
- **Keep the old path for a set time** (for example two weeks) after cutover,
  read-only if needed, before deleting it.
- **Tell customers** ahead of any planned downtime, on the status page.

## Common stage transitions

| From → to | Typical moves | Watch for |
|---|---|---|
| 0 → 1 | Demo host to a real domain; local DB to managed Postgres; fake auth to managed auth; add error tracking and own backups | Hobby-plan terms forbid commercial use; demo data mixed with real data |
| 1 → 2 | Free plans to paid on DB, hosting, auth; add staging; secrets into one store; uptime checks; SLOs | Plan upgrade that changes connection strings or regions |
| 2 → 3 | Click-ops into IaC (import, not recreate); add replicas, cache, queues; on-call; SOC 2 readiness | Drift between console and code; cache consistency |
| 3 → 4 | Second region; tenant home regions; committed-use discounts; platform team | Failover never tested; commitments on moving load |

## Common provider moves

| Move | Method | Downtime |
|---|---|---|
| Postgres A → Postgres B | Logical replication (or `pg_dump`/`pg_restore` for small DBs), then switch the connection string | Seconds to minutes with replication; longer with dump/restore |
| Object storage A → B (S3 API) | Bulk copy (rclone or provider migration tool), then dual-read or incremental sync, then switch endpoint | None if reads fall back to old store during sync |
| Hosting A → B | Deploy to B, test on a temporary hostname, switch DNS or the proxy | Near zero with low TTL |
| Auth A → B | Export users; import with password hashes if supported, otherwise force reset or magic-link sign-in; run both during transition | Users may need to sign in again |
| Email A → B | Verify domain on B (SPF/DKIM), switch sending key; watch deliverability | None; warm up volume if large |
| Serverless → containers | Build an OCI image with a Node adapter; run behind the same domain | Near zero |
| Managed → self-hosted | Only when "it hurts" (see `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/principles.md`); plan backups, upgrades, on-call first | Depends |

## Deciding whether to migrate at all

Before moving, write the decision in
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/stack-decision-record.md`
and compare candidates in
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/vendor-evaluation.md`.
Common reasons not to move: the saving is smaller than a month of an
engineer's time; the limit can be raised with a plan change; the problem is
a query, not the provider.
