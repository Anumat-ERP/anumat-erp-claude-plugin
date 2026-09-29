<!--
Template: Software Requirements Specification (SRS)
Basis: structure based on the SRS information items described in
ISO/IEC/IEEE 29148:2018. This template does not reproduce the standard. Using
it does not make a document conformant; check against the standard if
conformance is required.
Use when: requirements must be numbered, verifiable, and traced, for a
contract, a regulator, a supplier, or a large system.
Not for: a typical product feature (use a PRD and user stories).
Lives at: docs/requirements/srs-<system>.md
Remove this comment in the finished document.
-->

# Software Requirements Specification: <System name>

| Status | Draft |
|---|---|
| Version | <0.1> |
| Owner | <name> |
| Approvers | <names, roles> |
| Created | <YYYY-MM-DD> |
| Last updated | <YYYY-MM-DD> |
| Related | <BRD, PRD, contract reference> |

## 1. Introduction

### 1.1 Purpose

<What this SRS specifies, and who it is for: developers, testers, customer,
auditor.>

### 1.2 Scope

<The software item by name. What it will do and not do. The benefits and
objectives it serves, traced to business requirements.>

### 1.3 Product overview

#### 1.3.1 Product perspective

<How the system relates to other systems. Include a context diagram.>

```mermaid
flowchart LR
  user[<User role>] --> sys[<System>]
  sys --> ext1[<External system>]
```

<Interfaces at the boundary:>

- **System interfaces:** <other systems it exchanges data with>
- **User interfaces:** <screens, CLI, reports, at a summary level>
- **Hardware interfaces:** <devices, sensors, printers, or N/A>
- **Software interfaces:** <OS, databases, libraries, services, with versions>
- **Communications interfaces:** <protocols, formats>
- **Memory and storage constraints:** <limits, or N/A>
- **Operations:** <modes of operation, backup, recovery>
- **Site adaptation:** <per-site configuration, or N/A>

#### 1.3.2 Product functions

<Summary list of the major functions. Detail goes in section 3.>

#### 1.3.3 User characteristics

| User class | Expertise | Frequency | Notes |
|---|---|---|---|
| <Operator> | <domain expert, low technical skill> | <daily> | |

#### 1.3.4 Limitations

<Regulatory policies, hardware limits, interfaces to other applications,
parallel operation, audit functions, control functions, language, safety
and security considerations.>

### 1.4 Definitions, acronyms, and abbreviations

| Term | Definition |
|---|---|
| <term> | <definition> |

### 1.5 References

| ID | Document | Version |
|---|---|---|
| REF-1 | <document title> | <version / date> |

## 2. References

<Other documents this SRS depends on, if not listed in 1.5.>

## 3. Specific requirements

<Every requirement: unique ID, stated with "shall", one requirement per
statement, verifiable, with a priority and a source. Use the "Requirements
language" rules in the writing-style reference.>

### 3.1 External interfaces

| ID | Requirement | Priority | Source | Verification |
|---|---|---|---|---|
| IF-001 | <The system shall accept orders from the ERP via REST over HTTPS using the schema in REF-2.> | <Essential / Conditional / Optional> | <BR-3> | <Test> |

### 3.2 Functions

<Group by feature, user class, mode, or stimulus. State which.>

#### 3.2.1 <Function group name>

| ID | Requirement | Priority | Source | Verification |
|---|---|---|---|---|
| FR-001 | <The system shall …> | Essential | <BR-1> | <Test / Inspection / Analysis / Demonstration> |

### 3.3 Usability requirements

| ID | Requirement | Measure | Verification |
|---|---|---|---|
| US-001 | <A trained operator shall complete a stock count entry in under 60 seconds.> | <task time, p90> | <Usability test> |

### 3.4 Performance requirements

| ID | Requirement | Verification |
|---|---|---|
| PR-001 | <The system shall return search results within 500 ms at the 95th percentile with 200 concurrent users.> | <Load test> |

### 3.5 Logical database requirements

<Entities, relationships, retention, integrity constraints. Link to the
data model document.>

### 3.6 Design constraints

<Standards compliance, mandated technologies, audit trail requirements.>

### 3.7 Software system attributes

<Reliability, availability, security, maintainability, portability. Link
to the NFR specification if one exists, and list only the IDs here.>

| ID | Attribute | Requirement | Verification |
|---|---|---|---|
| SA-001 | Availability | <The system shall be available 99.9% per calendar month, excluding announced maintenance.> | <Monitoring> |

### 3.8 Supporting information

<Sample inputs and outputs, background, problem description.>

## 4. Verification

<How each requirement will be verified. Summarise by method; the traceability
matrix below gives the detail. Link to the test plan.>

## 5. Appendices

### 5.1 Assumptions and dependencies

| ID | Assumption or dependency | Impact if false |
|---|---|---|
| AS-1 | <description> | <impact> |

### 5.2 Traceability matrix

| Requirement | Source | Design element | Test case |
|---|---|---|---|
| FR-001 | BR-1 | <component> | <TC-012> |

### 5.3 Change history

| Version | Date | Author | Change |
|---|---|---|---|
| 0.1 | <YYYY-MM-DD> | <name> | Initial draft |
