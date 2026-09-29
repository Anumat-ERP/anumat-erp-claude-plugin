<!--
Template: Standard Operating Procedure (SOP)
Basis: common quality-management practice. The document-control block and
revision history are adapted from the "documented information" idea in
ISO 9001:2015 (clause 7.5). Using this template does not make a process
conformant to or certified against ISO 9001.
Use when: a repeatable business or team process involves several roles,
decision points, or records. For one role doing one task, use the work
instruction template. For operating a system during an incident, use a
runbook (dev-docs plugin).
Rules: one procedure per document; numbered, imperative steps; one action
per step; roles, not names; warnings before the step they apply to.
Remove this comment in the finished document.
-->

# SOP-<NNN>: <Process name, verb + object, e.g. "Approve customer refunds">

## 1. Document control

| Field | Value |
|---|---|
| SOP ID | SOP-<NNN> |
| Version | <0.1> |
| Status | <Draft / In review / Approved / Effective / Retired> |
| Process owner (accountable) | <role> |
| Author | <role or name> |
| Approved by | <role, name> |
| Approval date | <YYYY-MM-DD> |
| Effective date | <YYYY-MM-DD; after training completes> |
| Next review due | <YYYY-MM-DD; e.g. 12 months after effective date> |
| Location of controlled copy | <URL or path; printed copies are uncontrolled> |
| Record retention | <how long records from this SOP are kept, and where> |

## 2. Purpose

<One or two sentences. Why this process exists and what outcome it
protects.>

## 3. Scope

**In scope:** <which cases, products, sites, teams this covers>

**Out of scope:** <what it does not cover, and where those cases are handled>

## 4. Roles and responsibilities

| Role | Responsibility in this SOP |
|---|---|
| <Support agent> | <Logs and checks requests; steps 1 to 3> |
| <Finance approver> | <Approves within limit; steps 4 to 6> |
| <Process owner> | <Owns this SOP; approves changes; reviews yearly> |

<Link the RACI if one exists. Map roles to current people outside this
document.>

## 5. Definitions

| Term | Meaning |
|---|---|
| <Term> | <definition as used in this SOP> |

## 6. Prerequisites

- **Access:** <systems and permission levels>
- **Training:** <what must be completed before performing this SOP>
- **Inputs:** <forms, data, approvals that must exist before step 1>
- **Trigger:** <what starts this process>

## 7. Procedure

> **Warning:** <Put any warning here, directly above the step it applies to.
> Delete this block if none.>

| Step | Role | Action | Output | Notes |
|---|---|---|---|---|
| 1 | <Support agent> | <Log the refund request in the ticketing system.> | <Ticket in "New"> | <Use the Refund form> |
| 2 | <Support agent> | <Check the request against the refund policy.> | <Checked ticket> | <See decision D1> |
| 3 | <Finance approver> | <Approve the refund.> | <Approval recorded> | <See decision D2> |
| 4 | <Finance approver> | <Issue the refund in the billing system.> | <Refund record> | <Work instruction WI-<NNN>> |
| 5 | <Support agent> | <Notify the customer and close the ticket.> | <Closed ticket> | <Use message template> |

## 8. Decision points

| ID | At step | Question | If yes | If no |
|---|---|---|---|---|
| D1 | 2 | <Is the request within policy?> | <Go to step 3> | <Decline with reason; go to step 5> |
| D2 | 3 | <Is the amount over <limit>?> | <Get second approval from <role>, then continue> | <Continue to step 4> |

<Process map: link or embed the Mermaid diagram from the process-map
template.>

## 9. Exceptions

| Situation | What to do | Who authorises |
|---|---|---|
| <Billing system down> | <Record the request; process within 1 working day of recovery> | <Finance manager> |
| <Case not covered by this SOP> | <Escalate to the process owner; log as a deviation> | <Process owner> |

Log every deviation from this procedure in <location>, with the reason.

## 10. Records

| Record | Created at step | Stored in | Retention | Owner |
|---|---|---|---|---|
| <Refund ticket> | <1> | <ticketing system> | <7 years> | <Support lead> |
| <Refund transaction> | <4> | <billing system> | <per finance policy> | <Finance> |

## 11. Related documents

- <Policy: Refund policy, POL-<NNN>>
- <Work instruction: WI-<NNN>>
- <Checklist: CL-<NNN>>
- <RACI: link>

## 12. Revision history

| Version | Date | Author | Change | Approved by |
|---|---|---|---|---|
| 0.1 | <YYYY-MM-DD> | <name> | First draft | — |

## 13. Approval and training sign-off

**Approval**

| Role | Name | Signature / confirmation | Date |
|---|---|---|---|
| Process owner | <name> | | |
| <Quality or compliance, if required> | <name> | | |

**Training.** Everyone who performs this SOP confirms they have read and
understood this version before the effective date. Record it in the
training and acknowledgement log.

| Name | Role | Version | Trained by | Date |
|---|---|---|---|---|
| | | | | |
