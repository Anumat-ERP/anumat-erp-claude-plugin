<!--
Template: On-call handover
Basis: common on-call practice. No formal standard.
Use when: at every on-call shift change, so the incoming engineer knows what
is in flight. Takes 10 minutes to write. Send it before the handover call,
or instead of it.
Lives at: the on-call channel, the pager tool's shift notes, or
docs/operations/handovers/<YYYY-MM-DD>.md
Remove this comment in the finished document.
-->

# On-call handover: <team>, <YYYY-MM-DD>

| Field | Value |
|---|---|
| Outgoing | <name> |
| Incoming | <name> |
| Shift covered | <YYYY-MM-DD HH:MM> to <YYYY-MM-DD HH:MM> <time zone> |
| Handover time | <HH:MM UTC> |

## Status in one line

<e.g. "Quiet week; one open incident on search latency, mitigated.">

## Open incidents

| Incident | Severity | State | Next step | Link |
|---|---|---|---|---|
| <INC-123 search latency> | <SEV-3> | <mitigated, monitoring> | <confirm fix after 18:00 deploy> | <link> |

## Alerts this shift

| Alert | Count | Action taken | Noise? |
|---|---|---|---|
| <DiskUsageHigh on db-2> | <3> | <cleaned old WAL files> | <No, needs capacity ticket> |

## Things to watch

<Known risks in the next shift: deploys, migrations, traffic events, partner
maintenance, flaky alerts.>

- <YYYY-MM-DD HH:MM UTC: database maintenance by provider.>

## Changes made during the shift

<Config changes, manual fixes, feature flags toggled, silences added. Include
when any silence or temporary fix expires.>

| Change | Why | Expires / revert by | Link |
|---|---|---|---|
| <Silenced FooAlert> | <known issue INC-120> | <YYYY-MM-DD HH:MM> | <link> |

## Follow-ups created

- <ticket link: description>

## Runbook gaps found

- <runbook: what was missing or wrong>

## Handover confirmed

- [ ] Incoming has read this and has no questions.
- [ ] Pager rotation shows the incoming engineer.
