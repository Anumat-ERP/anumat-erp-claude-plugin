<!--
Template: Non-functional requirements (NFR) specification
Basis: organised by the eight product quality characteristics of the ISO/IEC
25010 quality model (2011 edition; the 2023 revision renames some and adds
safety; adjust if you follow 2023). Sub-characteristics are listed as prompts.
This template does not reproduce the standard.
Use when: stating measurable quality targets for a system or major feature.
Lives at: docs/requirements/nfr-<system>.md
Remove this comment in the finished document.
-->

# Non-functional requirements: <System name>

| Status | Draft |
|---|---|
| Owner | <name> |
| Reviewers | <engineering, SRE, security, product> |
| Created | <YYYY-MM-DD> |
| Last updated | <YYYY-MM-DD> |
| Related | <PRD, SRS, SLO, threat model> |

## How to read this

Each requirement has an ID, a measurable target, the conditions under which
it applies, a priority, and how it will be verified. A characteristic that
does not apply is marked `N/A — <reason>`, not deleted.

Priority: **Must** (release blocker), **Should** (fix before GA), **Could**.

## 1. Functional suitability

<Completeness, correctness, appropriateness of functions. Usually covered by
functional requirements; list only cross-cutting targets here.>

| ID | Requirement | Target | Conditions | Priority | Verification |
|---|---|---|---|---|---|
| NFR-FS-1 | <Monetary calculations are correct to the currency's minor unit> | <0 rounding errors across the reference dataset> | <all currencies in scope> | Must | <Automated test against dataset> |

## 2. Performance efficiency

<Time behaviour, resource utilisation, capacity.>

| ID | Requirement | Target | Conditions | Priority | Verification |
|---|---|---|---|---|---|
| NFR-PE-1 | <API response time for GET /orders> | <p95 < 300 ms, p99 < 800 ms> | <at 500 rps, 1M orders in DB> | Must | <Load test in staging> |
| NFR-PE-2 | <Peak capacity> | <2,000 rps sustained for 15 min> | <Black Friday profile> | Should | <Load test> |
| NFR-PE-3 | <Memory per instance> | <under 512 MB RSS at peak> | | Should | <Load test metrics> |

## 3. Compatibility

<Co-existence, interoperability.>

| ID | Requirement | Target | Conditions | Priority | Verification |
|---|---|---|---|---|---|
| NFR-CO-1 | <Browser support> | <last 2 versions of Chrome, Firefox, Safari, Edge> | | Must | <Cross-browser test run> |

## 4. Interaction capability (usability)

<Recognisability, learnability, operability, user error protection,
engagement, inclusivity, accessibility. Called "usability" in the 2011 edition.>

| ID | Requirement | Target | Conditions | Priority | Verification |
|---|---|---|---|---|---|
| NFR-US-1 | <Accessibility> | <WCAG 2.2 level AA> | <all user-facing screens> | Must | <Automated scan + manual audit> |
| NFR-US-2 | <Destructive actions are confirmable and undoable> | <undo within 10 s, or confirmation> | | Must | <Review> |

## 5. Reliability

<Faultlessness (maturity), availability, fault tolerance, recoverability.>

| ID | Requirement | Target | Conditions | Priority | Verification |
|---|---|---|---|---|---|
| NFR-RE-1 | <Availability> | <99.9% monthly> | <excl. announced maintenance> | Must | <SLO monitoring; see SLO doc> |
| NFR-RE-2 | <Recovery point objective (RPO)> | <≤ 5 min data loss> | <region failure> | Must | <Restore drill> |
| NFR-RE-3 | <Recovery time objective (RTO)> | <≤ 1 h> | <region failure> | Must | <DR drill, twice a year> |

## 6. Security

<Confidentiality, integrity, non-repudiation, accountability, authenticity,
resistance. Link to the threat model.>

| ID | Requirement | Target | Conditions | Priority | Verification |
|---|---|---|---|---|---|
| NFR-SE-1 | <Data in transit encrypted> | <TLS 1.2+ only> | <all external endpoints> | Must | <Config scan> |
| NFR-SE-2 | <Audit logging of privileged actions> | <who, what, when, from where; retained 1 year> | | Must | <Review + test> |
| NFR-SE-3 | <Authentication> | <MFA for admin roles> | | Must | <Test> |

## 7. Maintainability

<Modularity, reusability, analysability, modifiability, testability.>

| ID | Requirement | Target | Conditions | Priority | Verification |
|---|---|---|---|---|---|
| NFR-MA-1 | <Automated test coverage of domain logic> | <≥ 80% line coverage in the domain package> | | Should | <CI report> |
| NFR-MA-2 | <Deploy lead time> | <commit to production < 1 day> | | Should | <Pipeline metrics> |

## 8. Flexibility (portability)

<Adaptability, scalability, installability, replaceability. Called
"portability" in the 2011 edition.>

| ID | Requirement | Target | Conditions | Priority | Verification |
|---|---|---|---|---|---|
| NFR-FL-1 | <Horizontal scaling> | <stateless app tier; scale to 10 instances without code change> | | Must | <Load test> |
| NFR-FL-2 | <Supported deployment targets> | <container on Linux x86_64 and arm64> | | Should | <CI build matrix> |

## 9. Safety

<Added in the 2023 revision. Operational constraint, risk identification,
fail safe, hazard warning, safe integration. Often N/A for business software.>

## 10. Cross-cutting constraints

| ID | Area | Requirement |
|---|---|---|
| NFR-X-1 | Privacy / compliance | <e.g. personal data stored in EU regions only (GDPR)> |
| NFR-X-2 | Observability | <structured logs, request tracing, metrics per endpoint> |
| NFR-X-3 | Localisation | <languages, currencies, time zones, formats> |

## Open questions

| Question | Owner | Due |
|---|---|---|
| <question> | <name> | <YYYY-MM-DD> |
