<!--
Template: Escalation matrix
Basis: common service-management practice (severity levels, tiered
functional and hierarchical escalation).
Use when: defining who to contact, when, and within what time, when
something goes wrong in a process or service. For technical incident
response steps, link a runbook (dev-docs plugin); this matrix says who,
not how.
Rules: roles and rotations, not personal phone numbers in the document;
time limits per level; escalation triggers are objective.
Remove this comment in the finished document.
-->

# Escalation matrix: <Service, process or team>

| Field | Value |
|---|---|
| Owner | <role> |
| Version | <0.1> |
| Last reviewed | <YYYY-MM-DD> |
| Contact directory | <link to the live on-call rota or directory> |

## Severity levels

| Severity | Definition | Examples | Initial response | Update interval |
|---|---|---|---|---|
| S1 Critical | <Business stopped for all or many customers; data loss; security breach> | <Checkout down> | <15 min> | <30 min> |
| S2 High | <Major function impaired; workaround hard> | <Refunds failing> | <1 hour> | <2 hours> |
| S3 Medium | <Function impaired; workaround exists> | <Report delayed> | <1 working day> | <daily> |
| S4 Low | <Minor; cosmetic; question> | <Typo in email> | <3 working days> | <on change> |

<Response times are targets set by the owner. Do not invent them; mark TBD
if not agreed.>

## Escalation path

| Level | Role | Contact via | Escalate to next level when |
|---|---|---|---|
| L1 | <Support agent on shift> | <queue / channel> | <Not resolved in <time>, or needs access L1 lacks> |
| L2 | <Specialist team on call> | <pager rotation> | <Not resolved in <time>, or S1> |
| L3 | <Engineering / vendor> | <pager / vendor portal> | <Not resolved in <time>> |
| Management | <Head of <area>> | <phone via directory> | <S1 over <time>; customer or legal exposure> |
| Executive | <COO / CTO> | <via Head of <area>> | <S1 over <time>; public or regulatory impact> |

## Escalation by severity

| Severity | Notify immediately | Escalate after | Final authority |
|---|---|---|---|
| S1 | <L2, Head of area> | <30 min at each level> | <Executive> |
| S2 | <L2> | <2 hours> | <Head of area> |
| S3 | <L1 lead> | <1 working day> | <L2 lead> |
| S4 | — | <3 working days> | <L1 lead> |

## Functional escalation (to other teams)

| Situation | Team | How |
|---|---|---|
| <Security suspected> | <Security on call> | <channel; also S1> |
| <Customer data affected> | <Privacy / legal> | <email alias> |
| <Payment provider fault> | <Vendor support> | <portal; contract ref> |

## Rules

- Escalating is not failing. Escalate on the trigger, not on a feeling.
- The person escalating stays involved until the next level confirms.
- Record every escalation in <ticket system> with time and reason.
- Review this matrix after every S1 and at least yearly.
