<!--
Template: Deployment / release plan
Basis: common release-management practice. No formal standard.
Use when: a deployment needs more than "merge and deploy": database
migrations, several services in order, a data backfill, downtime, a
partner cut-over, or external communication.
Lives at: docs/operations/releases/<version>.md
Pair with the release checklist for the go/no-go gate.
Remove this comment in the finished document.
-->

# Release plan: <Product> <version>

| Status | Draft |
|---|---|
| Release manager | <name> |
| Approvers | <engineering lead, product owner, SRE> |
| Planned window | <YYYY-MM-DD HH:MM> to <HH:MM> UTC |
| Downtime expected | <None / N minutes> |
| Related | <release checklist, design doc, CHANGELOG, release notes> |

## 1. Summary

<What is being released and why this needs a plan: e.g. "Moves order storage
to the new schema; requires a backfill of 2M rows and a two-step deploy.">

## 2. Scope

| Component | From version | To version | Change |
|---|---|---|---|
| <orders-api> | <1.8.2> | <1.9.0> | <new schema, dual-write> |
| <database> | <migration 041> | <migration 044> | <add columns, backfill> |

## 3. Pre-conditions

- [ ] Release checklist sections 1 to 4 complete: <link>
- [ ] Backups taken and restore verified within <24 h>.
- [ ] Rollback rehearsed on staging on <date>.
- [ ] Change approved (CAB or equivalent) if required: <ticket>
- [ ] Stakeholders notified: <who, when>

## 4. Roles

| Role | Name | Contact |
|---|---|---|
| Release manager (decides go, pause, rollback) | <name> | <handle> |
| Deployer | <name> | <handle> |
| Verifier (QA / product) | <name> | <handle> |
| On-call during and after | <name> | <handle> |
| Communications | <name> | <handle> |

## 5. Timeline and steps

All times UTC. Each step has a verification and a rollback.

| # | Time | Step | Owner | Verify | Rollback |
|---|---|---|---|---|---|
| 1 | <T-24h> | <Announce maintenance window> | <comms> | <status page updated> | <N/A> |
| 2 | <T-0> | <Run migrations 042–044 (additive only)> | <deployer> | <migration log; schema diff> | <run down migrations> |
| 3 | <T+10m> | <Deploy orders-api 1.9.0 to 10% (canary)> | <deployer> | <error rate, latency vs baseline for 15 min> | <route 100% to 1.8.2> |
| 4 | <T+30m> | <Deploy to 100%> | <deployer> | <dashboards; smoke tests> | <redeploy 1.8.2> |
| 5 | <T+1h> | <Start backfill job> | <deployer> | <rows processed; error count 0> | <stop job; data remains readable by old code> |
| 6 | <T+1d> | <Enable feature flag for all users> | <product> | <feature metrics> | <disable flag> |

## 6. Go / no-go criteria at each checkpoint

<Numbers that decide whether to continue. E.g. "5xx rate < 0.5% and p95 < 400
ms for 15 minutes after canary.">

## 7. Rollback plan

**Point of no return:** <the step after which rollback means forward-fix only,
and why; or "none">

**Rollback trigger:** <conditions; who decides>

**Rollback steps:**

1. <step>
2. <step>

**Data considerations:** <data written by the new version that the old
version must still read; how it is handled.>

## 8. Communication

| When | Audience | Channel | Message owner |
|---|---|---|---|
| <T-3 days> | <customers> | <email / status page> | <name> |
| <Start> | <internal> | <#releases> | <release manager> |
| <Complete or rolled back> | <internal + customers> | <status page> | <name> |

## 9. Post-release

- [ ] Monitor for <24 h>; on-call briefed.
- [ ] Remove old code paths and flags by <date>: <ticket>
- [ ] Release notes published.
- [ ] Short review of how the release went, in the retro or a postmortem if it went wrong.
