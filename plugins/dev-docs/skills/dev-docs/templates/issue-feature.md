<!--
Template: Feature request issue form
Basis: GitHub issue forms (YAML files in .github/ISSUE_TEMPLATE/). A
Markdown fallback is included.
Use when: setting up a repository so feature requests start from the
problem, not a solution.
Lives at: .github/ISSUE_TEMPLATE/feature_request.yml (GitHub), or
.gitlab/issue_templates/Feature.md (GitLab).
Remove this comment when copying.
-->

# Feature request form

## GitHub issue form: `.github/ISSUE_TEMPLATE/feature_request.yml`

```yaml
name: Feature request
description: Suggest a new capability or an improvement.
title: "[Feature]: "
labels: ["enhancement", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        Describe the problem first. A clear problem gets a better solution
        than a detailed solution to an unclear problem.
  - type: textarea
    id: problem
    attributes:
      label: Problem
      description: What are you trying to do, and what gets in the way today?
      placeholder: "When I ..., I can't ..., so I have to ..."
    validations:
      required: true
  - type: textarea
    id: who
    attributes:
      label: Who is affected
      description: Which users or roles, and how often.
    validations:
      required: true
  - type: textarea
    id: proposal
    attributes:
      label: Proposed solution
      description: Optional. What you would like to happen.
  - type: textarea
    id: alternatives
    attributes:
      label: Alternatives and workarounds
      description: What you have tried or considered.
  - type: textarea
    id: success
    attributes:
      label: How would we know it works?
      description: An observable result, e.g. "I can export 10,000 rows in one step."
  - type: dropdown
    id: importance
    attributes:
      label: How important is this to you?
      options:
        - Blocking
        - Important
        - Nice to have
  - type: checkboxes
    id: checks
    attributes:
      label: Checks
      options:
        - label: I searched existing issues and this is not a duplicate.
          required: true
```

## Markdown fallback: `Feature.md`

```markdown
## Problem

When I ..., I can't ..., so I have to ...

## Who is affected

## Proposed solution (optional)

## Alternatives and workarounds

## How would we know it works?

## Importance

- [ ] Blocking
- [ ] Important
- [ ] Nice to have
```
