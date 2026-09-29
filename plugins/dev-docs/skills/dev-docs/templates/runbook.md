<!--
Template: Runbook (alert response or operational procedure)
Basis: common SRE runbook / playbook practice. No formal standard.
Use when: documenting how on-call diagnoses and fixes one alert, or how to
carry out one operational procedure (failover, key rotation, restore).
Rule: one runbook per alert or procedure. The alert links straight to it.
Write for someone woken at 3 a.m. who has never seen this service.
Lives at: docs/operations/runbooks/<alert-name>.md, named exactly as the alert.
Remove this comment in the finished document.
-->

# Runbook: <AlertName or procedure name>

| Status | Accepted |
|---|---|
| Service | <service name> |
| Owner | <team> |
| Last tested | <YYYY-MM-DD> |
| Last updated | <YYYY-MM-DD> |
| Related | <dashboard, SLO, architecture, previous postmortems> |

## Summary

<One or two sentences. What this alert means, or what this procedure does.>

## Impact

<What users experience while this is happening. Which SLO it burns.>

**Severity guide:**

| Condition | Severity |
|---|---|
| <Error rate > 5% for 10 min> | <SEV-2> |
| <Checkout completely failing> | <SEV-1: declare an incident> |

## Alert details

| Field | Value |
|---|---|
| Alert source | <Prometheus / Datadog / CloudWatch> |
| Expression | `<query or condition>` |
| Threshold | <value, duration> |
| Dashboard | <link> |
| Logs | <link to saved query> |

## Before you start

- **Access needed:** <roles, VPN, break-glass account>
- **Tools:** <kubectl context, CLI, database client>
- **Safe to act alone?** <Yes / No: page <team> before step X>

## Diagnose

<Numbered checks, most likely cause first. Each step: a command or link,
and what the output means.>

1. **Check <thing>.**

   ```bash
   kubectl -n <namespace> get pods -l app=<service>
   ```

   Expected: all pods `Running`, restarts not increasing.
   If pods are `CrashLoopBackOff`, go to [Fix A](#fix-a-bad-deploy).

2. **Check recent deploys.**

   ```bash
   <command to list recent deploys>
   ```

   If a deploy happened in the last hour, go to [Fix A](#fix-a-bad-deploy).

3. **Check dependencies.** <database, queue, third party status page>

   If <dependency> is degraded, go to [Fix B](#fix-b-dependency-down).

## Fix

### Fix A: bad deploy

1. Roll back:

   ```bash
   <rollback command>
   ```

2. Verify: <what should recover and how fast>.
3. Tell the author of the deploy and open a ticket.

### Fix B: dependency down

1. <mitigation: failover, enable degraded mode, shed load>
2. <verification>

## Verify recovery

- <Metric returns below threshold for 10 minutes.>
- <Smoke test: command or URL.>

## Escalate

| When | Who | How |
|---|---|---|
| <No recovery after 30 min> | <service owner team> | <pager service / channel> |
| <Data loss suspected> | <incident commander; data team> | <declare SEV-1> |
| <Security suspected> | <security on-call> | <channel> |

## After the incident

- Record what happened in the incident channel or ticket.
- If users were affected, a postmortem is required.
- If this runbook was wrong or missing a step, fix it now.

## History

| Date | Incident | What changed in this runbook |
|---|---|---|
| <YYYY-MM-DD> | <link> | <change> |
