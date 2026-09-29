<!--
Template: Bug report issue form
Basis: GitHub issue forms (YAML files in .github/ISSUE_TEMPLATE/). A
Markdown fallback is included for GitLab or tools without forms.
Use when: setting up a repository so bug reports arrive with what is needed
to reproduce them.
Lives at: .github/ISSUE_TEMPLATE/bug_report.yml (GitHub), or
.gitlab/issue_templates/Bug.md (GitLab).
Also add .github/ISSUE_TEMPLATE/config.yml (below) to route security reports
and questions away from issues.
Remove this comment when copying.
-->

# Bug report form

## GitHub issue form: `.github/ISSUE_TEMPLATE/bug_report.yml`

```yaml
name: Bug report
description: Something is not working as documented.
title: "[Bug]: "
labels: ["bug", "triage"]
body:
  - type: markdown
    attributes:
      value: |
        Thanks for reporting. Please search existing issues first.
        **Security vulnerabilities:** do not use this form. See SECURITY.md.
  - type: textarea
    id: what-happened
    attributes:
      label: What happened?
      description: What you saw, including any error message in full.
    validations:
      required: true
  - type: textarea
    id: expected
    attributes:
      label: What did you expect to happen?
    validations:
      required: true
  - type: textarea
    id: steps
    attributes:
      label: Steps to reproduce
      description: The smallest set of steps that shows the problem.
      placeholder: |
        1. Go to '...'
        2. Click '...'
        3. See error
    validations:
      required: true
  - type: input
    id: version
    attributes:
      label: Version
      description: Release version or commit SHA.
    validations:
      required: true
  - type: dropdown
    id: environment
    attributes:
      label: Environment
      options:
        - Production
        - Staging
        - Local development
        - Other
    validations:
      required: true
  - type: textarea
    id: platform
    attributes:
      label: Platform details
      description: OS, browser and version, device, runtime version, as relevant.
  - type: textarea
    id: logs
    attributes:
      label: Logs or screenshots
      description: Paste logs as text. Remove secrets and personal data.
      render: shell
  - type: dropdown
    id: impact
    attributes:
      label: Impact
      options:
        - Blocks my work, no workaround
        - Serious, but there is a workaround
        - Minor inconvenience
  - type: checkboxes
    id: checks
    attributes:
      label: Checks
      options:
        - label: I searched existing issues and this is not a duplicate.
          required: true
        - label: I removed secrets and personal data from this report.
          required: true
```

## Shared config: `.github/ISSUE_TEMPLATE/config.yml`

```yaml
blank_issues_enabled: false
contact_links:
  - name: Report a security vulnerability
    url: https://github.com/<owner>/<repo>/security/advisories/new
    about: Please report security issues privately.
  - name: Ask a question
    url: https://github.com/<owner>/<repo>/discussions
    about: Questions and help go to Discussions.
```

## Markdown fallback: `Bug.md`

```markdown
## What happened?

## What did you expect to happen?

## Steps to reproduce

1.
2.
3.

## Version

## Environment and platform

## Logs or screenshots

## Impact

- [ ] Blocks my work, no workaround
- [ ] Serious, with a workaround
- [ ] Minor
```
