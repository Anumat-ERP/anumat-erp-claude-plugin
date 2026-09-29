# Incident response one-pager

Print it, pin it, link it from every alert. Process detail:
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/reliability.md`.

## Where

| What | Where |
|---|---|
| Incident channel | `<#incidents>` |
| Video call | `<link>` |
| Status page admin | `<link>` |
| Dashboards | `<link>` |
| Error tracker | `<link>` |
| Provider status pages | `<hosting>`, `<database>`, `<auth>`, `<email>` |
| Runbooks | `<link>` |
| Escalation contacts | `<names and phone numbers>` |

## Severity

| Sev | Meaning | Response |
|---|---|---|
| 1 | Core journey down for most users, or data loss or exposure | Page now; all hands; status page within 15 min |
| 2 | Degraded or down for some users | Page on-call; status page within 30 min |
| 3 | Minor; workaround exists | Next working day |

## The steps

1. **Declare.** Post in the channel: "Incident: `<one-line impact>`. Sev `<n>`."
2. **Lead.** One person is incident lead. They decide; others investigate.
3. **Mitigate first.** Options in order: roll back the last deploy → turn off
   the flag → scale up / restart → fail over → block abusive traffic.
4. **Communicate.** Status page update now, then every `<30>` minutes, until
   resolved. Email the affected customers for Sev 1.
5. **Resolve.** Confirm with a real user flow, not just a green dashboard.
6. **Write-up** within `<3>` working days.

Data exposure or a suspected breach: also follow the security incident steps
from the security-audit plugin, and check notification duties under your
contracts and local law.

## Status message templates

- **Investigating:** "We are looking into `<symptom>` affecting `<who>`. Next update by `<time>`."
- **Identified:** "We found the cause and are working on a fix. `<Workaround if any>`. Next update by `<time>`."
- **Resolved:** "`<Service>` has been working normally since `<time>`. We will publish a summary."

## Write-up

| Field | Value |
|---|---|
| Incident | `<ID and title>` |
| Sev | |
| Start / detected / mitigated / resolved | |
| Impact | `<users, duration, data>` |
| How we found out | alert / customer / staff |
| Timeline | |
| Contributing causes | |
| What went well | |
| What was hard | |

| Action | Owner | Due |
|---|---|---|
| | | |

Blameless: describe systems and decisions, not individual fault.
