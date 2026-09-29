<!--
Template: Test plan
Basis: structure based on the test plan contents described in
ISO/IEC/IEEE 29119-3:2021 (context, risk register, test strategy, activities,
staffing, schedule). This template does not reproduce the standard or make a
document conformant to it.
Use when: planning the testing of a release, a project, or a significant
feature. For a small feature, a "Testing" section in the design doc or PR is
enough.
Lives at: docs/testing/test-plan-<release-or-feature>.md
Remove this comment in the finished document.
-->

# Test plan: <Release or feature>

| Status | Draft |
|---|---|
| Owner | <test lead> |
| Approvers | <engineering lead, product owner> |
| Created | <YYYY-MM-DD> |
| Last updated | <YYYY-MM-DD> |
| Related | <PRD, SRS, design doc, release plan> |

## 1. Context

### 1.1 Scope

<What is being tested: product, version, features, and interfaces.>

**In scope:**

- <feature or component>

**Out of scope:**

- <what will not be tested, and why>

### 1.2 Test basis

<The documents and artefacts tests are derived from.>

| Source | Version / link |
|---|---|
| <PRD / user stories> | <link> |
| <API spec> | <link> |

### 1.3 Assumptions and constraints

<Environment availability, data, time, tools, people.>

### 1.4 Stakeholders

| Name | Role | Interest |
|---|---|---|
| <name> | <product owner> | <acceptance> |

## 2. Risk register

<Product risks (what could be wrong with the product) and project risks
(what could stop testing). Testing effort follows product risk.>

| ID | Risk | Type | Likelihood | Impact | Test response |
|---|---|---|---|---|---|
| R-1 | <Tax miscalculated for cross-border orders> | Product | <M> | <H> | <boundary tests on every tax region; review by finance> |
| R-2 | <Staging environment unavailable> | Project | <M> | <M> | <book environment; fallback to ephemeral env> |

## 3. Test strategy

### 3.1 Test levels

| Level | Purpose | Who | Tools | Where it runs |
|---|---|---|---|---|
| Unit | <logic in isolation> | <developers> | <Vitest / JUnit> | <CI on every PR> |
| Integration | <service with its database and neighbours> | <developers> | <Testcontainers> | <CI> |
| System / end-to-end | <user flows across the stack> | <QA> | <Playwright> | <staging> |
| Acceptance | <meets the user's need> | <product owner, users> | <manual, UAT> | <staging> |

### 3.2 Test types

| Type | Applies? | Approach |
|---|---|---|
| Functional | Yes | <derived from acceptance criteria> |
| Regression | Yes | <automated suite; what triggers it> |
| Performance / load | <Yes / No> | <tool, profile, targets from NFR spec> |
| Security | <Yes / No> | <SAST, dependency scan, DAST, pen test> |
| Accessibility | <Yes / No> | <axe automated scan + manual keyboard and screen reader check> |
| Compatibility | <Yes / No> | <browsers, devices, OS versions> |
| Migration / upgrade | <Yes / No> | <rehearse on a copy of production data> |
| Exploratory | Yes | <time-boxed charters per risk area> |

### 3.3 Test design techniques

<E.g. equivalence partitioning, boundary value analysis, decision tables,
state transition testing, pairwise. Name which apply to which risk.>

### 3.4 Test data

<Where data comes from, how personal data is masked, how it is reset.>

### 3.5 Test environments

| Environment | Purpose | Config | Owner |
|---|---|---|---|
| <staging> | <system and acceptance> | <prod-like, masked data> | <team> |

### 3.6 Entry criteria

- <Build deployed to staging and smoke test passes.>
- <All stories in scope are code-complete and unit-tested.>

### 3.7 Exit criteria

<Measurable. Agreed before testing starts.>

- <100% of planned Must test cases executed.>
- <No open Critical or High defects; Medium defects have an agreed plan.>
- <Performance targets from NFR-PE-1 met.>
- <Regression suite green.>

### 3.8 Suspension and resumption criteria

<When to stop testing (e.g. smoke test fails, blocker defect) and what is
needed to resume.>

### 3.9 Defect management

<Where defects are logged, severity definitions, triage cadence, who decides.>

| Severity | Definition |
|---|---|
| Critical | <data loss, security breach, no workaround, core flow blocked> |
| High | <major function broken, workaround exists> |
| Medium | <minor function broken> |
| Low | <cosmetic> |

## 4. Deliverables

<Test cases, automated suites, test reports, the completion report, and
the release checklist sign-off.>

## 5. Staffing and responsibilities

| Person | Role | Responsibilities |
|---|---|---|
| <name> | <test lead> | <plan, report, sign-off recommendation> |

<Training needs, if any.>

## 6. Schedule

| Activity | Start | End | Depends on |
|---|---|---|---|
| <Test design> | <date> | <date> | <stories ready> |
| <System test> | <date> | <date> | <staging build> |
| <UAT> | <date> | <date> | <system test exit> |

## 7. Traceability

| Requirement / story | Risk | Test cases |
|---|---|---|
| <US-1> | <R-1> | <TC-001, TC-002> |

## 8. Approval

| Name | Role | Date |
|---|---|---|
| <name> | <role> | <YYYY-MM-DD> |
