<!--
Template: Handover / onboarding document
Basis: common knowledge-transfer practice. No formal standard.
Use when: a system moves to a new owner or team, a team member leaves, or a
new engineer joins and needs a map of a system.
Rule: it points to other documents rather than repeating them. Its value is
the things written down nowhere else: history, quirks, contacts, and what is
half-finished.
Lives at: docs/onboarding/<system-or-role>.md
Remove this comment in the finished document.
-->

# Handover: <System or role>

| Status | Draft |
|---|---|
| From | <name / team> |
| To | <name / team> |
| Handover date | <YYYY-MM-DD> |
| Shadowing period | <YYYY-MM-DD> to <YYYY-MM-DD> |
| Last updated | <YYYY-MM-DD> |

## 1. What this system does

<Two or three sentences in plain language. Who uses it and what breaks for
them if it stops.>

## 2. Map

| What | Where |
|---|---|
| Code | <repo links and paths> |
| Architecture | <arc42, C4 diagrams> |
| Decisions | <ADR index> |
| API specs | <links> |
| Runbooks | <folder link> |
| Dashboards | <links> |
| Logs | <saved queries> |
| Alerts and paging | <pager service, rotation> |
| CI/CD | <pipeline links> |
| Environments | <URLs for dev, staging, production> |
| Issue tracker | <board, labels> |
| Chat channels | <names and purpose> |

## 3. Access checklist

- [ ] Repository write access
- [ ] Cloud account / role: <name>
- [ ] Production access (break-glass procedure: <link>)
- [ ] Secrets manager path: <path>
- [ ] Pager rotation
- [ ] Vendor consoles: <list>
- [ ] Mailing lists and channels

## 4. How to

| Task | How / link |
|---|---|
| Run it locally | <README link> |
| Deploy | <link or command> |
| Roll back | <link> |
| Rotate credentials | <runbook> |
| Restore from backup | <runbook; when last tested> |

## 5. People

| Person / team | Relationship | Contact for |
|---|---|---|
| <name> | <upstream service owner> | <API changes> |
| <vendor account manager> | <vendor> | <licence, outages> |
| <main internal customer> | <user> | <priorities, feedback> |

## 6. Known issues and quirks

<What surprises new people. Flaky tests, manual steps, odd config,
workarounds and why they exist.>

- <quirk: what, why, link>

## 7. Work in progress

| Item | State | Next step | Link |
|---|---|---|---|
| <migration to new queue> | <50% of consumers moved> | <move billing consumer> | <ticket> |

## 8. Recurring duties

| Duty | Frequency | How |
|---|---|---|
| <Certificate renewal> | <yearly, next YYYY-MM-DD> | <runbook> |
| <Dependency updates> | <weekly> | <process> |

## 9. History worth knowing

<Past incidents, big decisions, and things that were tried and dropped. Link
postmortems and ADRs.>

## 10. Risks and technical debt

| Item | Risk | Suggested action |
|---|---|---|
| <description> | <H/M/L> | <action> |

## 11. First weeks plan

| When | Goal |
|---|---|
| Week 1 | <access working; local run; read architecture and last 3 postmortems> |
| Week 2 | <ship a small change; shadow on-call> |
| Week 3–4 | <deploy alone; lead on-call with backup> |

## 12. Sign-off

- [ ] Receiver has walked through sections 2 to 7 with the giver.
- [ ] Receiver has deployed and rolled back once.
- [ ] Ownership updated in CODEOWNERS, service catalogue, and pager.
