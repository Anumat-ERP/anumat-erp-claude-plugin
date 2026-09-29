<!--
Template: Spike
Basis: the spike concept from Extreme Programming: a short, time-boxed
investigation to reduce uncertainty.
Use when: a story cannot be estimated or a decision cannot be made without
research or a prototype. The output is knowledge, not production code.
Rules: one question; a fixed time box; a written answer by the end of the
time box even if the answer is "we still do not know, because…".
Remove this comment in the finished document.
-->

# Spike: <Question, e.g. "Can the payment provider issue partial refunds via API?">

| Field | Value |
|---|---|
| Key | <PROJ-150 or TBD> |
| Type | <Spike, or Task with label `spike`> |
| Parent | <epic key> |
| Blocks | <stories waiting on the answer> |
| Time box | <e.g. 2 days; not points> |
| Assignee | <name> |

## Question

<The one question this spike answers.>

## Why it matters

<What decision or estimate depends on the answer.>

## Approach

- <read docs; call sandbox API; build throwaway prototype; ask vendor>

## Answered when

- [ ] <A written answer with evidence, posted to the ticket>
- [ ] <A recommendation: option chosen, or next step>
- [ ] <Blocked stories re-estimated or re-split>

## Findings

<Filled in at the end. Link prototype code, if any; do not merge it.>
