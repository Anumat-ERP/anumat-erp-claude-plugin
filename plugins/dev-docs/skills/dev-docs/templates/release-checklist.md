<!--
Template: QA sign-off and release checklist
Basis: common release-management and QA sign-off practice. No formal standard.
Use when: the go/no-go gate before a release reaches production. Copy it per
release, or keep one living checklist and record each run.
Lives at: docs/testing/release-checklist.md, or in the release PR description.
Remove this comment in the finished document.
-->

# Release checklist: <Product> <version>

| Field | Value |
|---|---|
| Release | <version> |
| Target date | <YYYY-MM-DD HH:MM UTC> |
| Release manager | <name> |
| QA sign-off | <name> |
| Release plan | <link, if one exists> |

Mark each item: `[x]` done, `[-]` N/A with reason, or leave `[ ]` open.
Any open item in sections 1 to 4 means **no-go**.

## 1. Scope

- [ ] Release contents match what was planned. Link: <milestone or query>
- [ ] Every change is merged to the release branch or tag. No pending PRs.
- [ ] CHANGELOG `Unreleased` section moved to `[<version>] - <date>`.
- [ ] Version number follows SemVer and matches the change types.

## 2. Quality

- [ ] CI green on the release commit: build, unit, integration, lint.
- [ ] End-to-end / regression suite passed on staging. Report: <link>
- [ ] Test plan exit criteria met. Report: <link>
- [ ] No open Critical or High defects against this release.
- [ ] Known Medium/Low defects listed in release notes or accepted by: <name>
- [ ] Performance checked against targets. Result: <link or N/A>
- [ ] Accessibility checks passed for changed screens.
- [ ] Product owner accepted the features on staging.

## 3. Security and compliance

- [ ] Dependency and container scans: no unresolved Critical/High findings.
- [ ] Secrets are not in the code, config, or logs.
- [ ] Threat model updated if trust boundaries changed.
- [ ] Privacy review done if personal data handling changed.
- [ ] Licences of new dependencies are allowed.

## 4. Operations readiness

- [ ] Database migrations tested on a copy of production data. Duration: <n min>
- [ ] Migrations are backward compatible with the running version, or downtime is scheduled.
- [ ] Rollback procedure written and tested: <link>
- [ ] Feature flags set to their launch state and documented.
- [ ] Config and secrets present in production.
- [ ] Monitoring, alerts, and dashboards cover new functionality.
- [ ] Runbooks exist for new alerts.
- [ ] On-call knows the release is happening and has the rollback link.
- [ ] Capacity checked for expected load.

## 5. Communication

- [ ] Release notes written and reviewed: <link>
- [ ] Support team briefed; help articles updated.
- [ ] Customers or partners notified of breaking changes, with lead time.
- [ ] Status page maintenance scheduled, if downtime.

## 6. After release

- [ ] Smoke test on production passed.
- [ ] Error rate and latency normal for <30> minutes after release.
- [ ] Release tagged; release notes published.
- [ ] Release announced in <channel>.

## Decision

| Role | Name | Go / No-go | Time (UTC) | Notes |
|---|---|---|---|---|
| Release manager | <name> | | | |
| QA | <name> | | | |
| Engineering lead | <name> | | | |
| Product owner | <name> | | | |

<A no-go names the blocking item and the next check time.>
