<!--
Template: Business Requirements Document (BRD)
Basis: adapted from business-analysis practice, using concepts from the IIBA
BABOK Guide (business need, stakeholders, solution scope, transition
requirements). Not a reproduction of BABOK.
Use when: a sponsor must approve money, headcount, or scope, and needs the
case in business terms.
Not for: product behaviour detail (use a PRD).
Lives at: docs/product/brd-<slug>.md
Remove this comment in the finished document.
-->

# BRD: <Initiative name>

| Status | Draft |
|---|---|
| Owner | <business analyst or product owner> |
| Sponsor | <name, role> |
| Approvers | <names, roles> |
| Created | <YYYY-MM-DD> |
| Last updated | <YYYY-MM-DD> |
| Related | <one-pager, PRD, project charter> |

## 1. Executive summary

<One paragraph: the business need, the proposed response, the expected
benefit, and the cost. Write it last.>

## 2. Business need

### 2.1 Current state

<How the business works today in this area. Name the process, the systems,
the people involved, and the volumes.>

### 2.2 Problem or opportunity

<What is costing money, losing revenue, creating risk, or blocking growth.
Quantify it: hours per month, error rate, lost deals, fines at risk.>

### 2.3 Desired future state

<What the business looks like once this is done, described as outcomes, not
features.>

## 3. Business objectives

| ID | Objective | Measure | Target | By when |
|---|---|---|---|---|
| BO-1 | <e.g. Reduce invoice processing cost> | <cost per invoice> | <from $4.10 to $1.50> | <YYYY-QN> |

Objectives should be specific, measurable, achievable, relevant, and
time-bound.

## 4. Stakeholders

| Stakeholder | Role | Interest | Influence | How involved |
|---|---|---|---|---|
| <Finance team> | <user> | <fewer manual entries> | <High> | <UAT, sign-off> |

## 5. Scope

### 5.1 In scope

- <Process, department, region, or capability>

### 5.2 Out of scope

- <Explicit exclusions>

## 6. Business requirements

<What the business needs, not how the system does it. Each requirement
traces to an objective.>

| ID | Requirement | Objective | Priority (MoSCoW) | Source |
|---|---|---|---|---|
| BR-1 | <The business needs to approve invoices under $500 without manual review> | BO-1 | Must | <workshop, YYYY-MM-DD> |

## 7. Stakeholder requirements

<Needs of particular groups that the solution must meet.>

| ID | Stakeholder | Requirement | Traces to |
|---|---|---|---|
| SR-1 | <Auditors> | <Full audit trail of approvals, retained 7 years> | BR-1 |

## 8. Transition requirements

<What is needed to move from current to future state: data migration,
training, parallel running, cut-over, decommissioning.>

## 9. Constraints

<Budget, deadlines, regulation, technology mandates, contracts.>

## 10. Assumptions and dependencies

| Type | Description | Owner |
|---|---|---|
| Assumption | <description> | <name> |
| Dependency | <description> | <name> |

## 11. Risks

| Risk | Likelihood | Impact | Mitigation | Owner |
|---|---|---|---|---|
| <description> | <H/M/L> | <H/M/L> | <mitigation> | <name> |

## 12. Cost and benefit

| Item | One-off | Recurring (per year) | Notes |
|---|---|---|---|
| Build | <amount> | | |
| Run | | <amount> | |
| Benefit | | <amount> | <how calculated> |

<Payback period, or why the benefit is not financial.>

## 13. Options considered

| Option | Summary | Cost | Benefit | Why chosen / rejected |
|---|---|---|---|---|
| Do nothing | <what happens if we do not act> | | | |
| <Option A> | | | | |

## 14. Approval

| Name | Role | Decision | Date |
|---|---|---|---|
| <name> | Sponsor | <Approved / Rejected / Deferred> | <YYYY-MM-DD> |

## Glossary

| Term | Meaning |
|---|---|
| <term> | <definition> |
