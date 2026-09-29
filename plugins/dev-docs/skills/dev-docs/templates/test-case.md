<!--
Template: Test case specification
Basis: fields based on the test case specification described in
ISO/IEC/IEEE 29119-3:2021 (identifier, objective, priority, traceability,
preconditions, inputs, expected results). Not a reproduction of the standard.
Use when: someone other than the author will run a test by hand, or a test
must be traceable for audit. Automated tests usually need only a clear name
and a link to the requirement.
Lives at: docs/testing/tc-<area>.md, one file per area with several cases,
or in a test management tool.
Remove this comment in the finished document.
-->

# Test cases: <Area or feature>

| Status | Draft |
|---|---|
| Owner | <name> |
| Test plan | <link> |
| Last updated | <YYYY-MM-DD> |

---

## TC-<nnn>: <Title stating what is verified>

| Field | Value |
|---|---|
| Objective | <What this test shows, in one sentence.> |
| Priority | <High / Medium / Low> |
| Traces to | <requirement or story ID, risk ID> |
| Type | <Functional / Regression / Negative / Boundary / Accessibility> |
| Automated | <No / Yes: link to test> |
| Environment | <staging, browser, device> |

**Preconditions**

- <State the system must be in: user exists with role X, feature flag on.>

**Test data**

- <Exact values: account, SKU, amounts. Or a link to a data set.>

**Steps**

| # | Action | Expected result |
|---|---|---|
| 1 | <Open /orders/new as user "buyer@example.test"> | <Empty order form shown; Submit disabled> |
| 2 | <Add SKU-123 with quantity 0> | <Inline error "Quantity must be at least 1"; Submit disabled> |
| 3 | <Change quantity to 2 and submit> | <Confirmation shown with order number; order appears in list with status "Submitted"> |

**Postconditions**

- <State after the test; how to clean up.>

**Execution record**

| Date | Build | Tester | Result | Defect |
|---|---|---|---|---|
| <YYYY-MM-DD> | <version> | <name> | <Pass / Fail / Blocked> | <link> |

---

<Repeat for each case. Write each step so a tester new to the product can
follow it without asking. Each expected result must be observable.>
