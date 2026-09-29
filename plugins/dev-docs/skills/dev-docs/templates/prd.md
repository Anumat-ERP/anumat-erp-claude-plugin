<!--
Template: Product Requirements Document (PRD)
Basis: common product-management practice. There is no formal standard for PRDs.
Use when: the team has agreed to build something and needs to define what it
must do, for whom, and how success is measured, before design starts.
Not for: implementation detail (use a design doc) or a funding case (use a BRD).
Lives at: docs/product/prd-<slug>.md
Remove this comment in the finished document.
-->

# PRD: <Feature or product name>

| Status | Draft |
|---|---|
| Owner | <product owner> |
| Reviewers | <engineering lead, design lead, other stakeholders> |
| Created | <YYYY-MM-DD> |
| Last updated | <YYYY-MM-DD> |
| Target release | <version, quarter, or date> |
| Related | <one-pager, BRD, design doc, epic or issue links> |

## 1. Summary

<Two or three sentences. What we are building, for whom, and the outcome it
should change. Someone who reads only this section should know what the
document asks for.>

## 2. Problem

<What is broken or missing today, and for whom. Describe the problem, not the
feature. Include evidence: support tickets, usage data, interviews, sales
feedback. Quote numbers with their source.>

### Why now

<What makes this the right time: a deadline, a customer commitment, a
dependency, a cost that is rising.>

## 3. Users

| Persona / segment | Context | Need | Frequency |
|---|---|---|---|
| <e.g. Warehouse manager> | <device, environment, expertise> | <what they are trying to get done> | <daily, monthly> |

## 4. Goals and success metrics

| Goal | Metric | Baseline | Target | Measured by |
|---|---|---|---|---|
| <e.g. Reduce time to reconcile stock> | <median minutes per reconciliation> | <42 min> | <under 15 min> | <event analytics, dashboard link> |

<Include at least one guardrail metric: something that must not get worse,
such as error rate or support volume.>

## 5. Non-goals

<What this work will not do, stated explicitly. Each one prevents a scope
argument later.>

- <Non-goal 1>
- <Non-goal 2>

## 6. User stories and requirements

<High-level stories here. Detailed stories and acceptance criteria can live
in a separate user stories document or the issue tracker; link to them.>

| ID | As a… | I want to… | So that… | Priority |
|---|---|---|---|---|
| US-1 | <persona> | <capability> | <benefit> | <Must / Should / Could> |

### Functional requirements

| ID | Requirement | Priority | Notes |
|---|---|---|---|
| FR-1 | <The system must …, stated as observable behaviour> | Must | |

### Non-functional requirements

<Performance, availability, security, privacy, accessibility, localisation,
compliance. State numbers. Link to a full NFR spec if one exists.>

| ID | Requirement | Target |
|---|---|---|
| NFR-1 | <e.g. Search results response time> | <p95 under 500 ms at 50 rps> |

## 7. User experience

<Main flows, step by step. Link to designs or prototypes. Name the states each
screen must handle: empty, loading, error, no permission, large data, offline.>

## 8. Scope and phasing

| Phase | Includes | Target |
|---|---|---|
| MVP | <smallest slice that tests the main hypothesis> | <date> |
| Later | <deferred items> | <TBD> |

## 9. Dependencies

<Other teams, services, vendors, data, legal or security approvals.>

## 10. Risks and assumptions

| Type | Description | Impact | Mitigation / how we will validate |
|---|---|---|---|
| Assumption | <e.g. Managers reconcile on desktop> | <High> | <check analytics before design> |
| Risk | <description> | <High / Medium / Low> | <mitigation> |

## 11. Launch plan

<Rollout approach (feature flag, beta, percentage), documentation, support
training, announcement. Link to the release plan if one exists.>

## 12. Open questions

| Question | Owner | Due |
|---|---|---|
| <question> | <name> | <YYYY-MM-DD> |

## Change log

| Date | Author | Change |
|---|---|---|
| <YYYY-MM-DD> | <name> | Created |
