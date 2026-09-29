<!--
Template: Bug report
Basis: common defect-report practice.
Use when: behaviour differs from what was specified or reasonably expected.
A missing feature is a story, not a bug. A production incident needs a
runbook and possibly a postmortem (dev-docs plugin); the bug tracks the fix.
Rules: reproducible steps; expected vs actual; severity (impact) separate
from priority (order of work).
Remove this comment in the finished document.
-->

# <What is wrong, where, e.g. "Invoice export omits invoices dated on the last day of the month">

| Field | Value |
|---|---|
| Key | <PROJ-140 or TBD> |
| Type | Bug |
| Severity | <S1 Critical / S2 High / S3 Medium / S4 Low> |
| Priority | <Highest / High / Medium / Low> |
| Environment | <production / staging; version; browser, OS, device> |
| Found by | <role; how: customer report, test, monitoring> |
| Related | <story or requirement the behaviour came from; incident link> |
| Frequency | <always / intermittent (N of M tries) / once> |

## Steps to reproduce

1. <Log in as a user with the Finance role.>
2. <Open Invoices, set range 2026-08-01 to 2026-08-31.>
3. <Select Export.>

## Expected

<What should happen, with the source: AC, spec, or reasonable expectation.>

## Actual

<What happens instead. Exact error text.>

## Evidence

<Screenshots, logs, request IDs, sample data. Remove personal data.>

## Impact

<Who is affected, how many, any workaround.>

## Fix done when

- [ ] Root cause stated in the ticket.
- [ ] Fix verified in <environment> using the steps above.
- [ ] Regression test added.
