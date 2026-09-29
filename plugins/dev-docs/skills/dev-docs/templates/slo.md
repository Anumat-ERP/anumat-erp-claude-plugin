<!--
Template: Service Level Objective (SLO) document
Basis: adapted from the example SLO document and error budget policy in
Google's "The Site Reliability Workbook" (O'Reilly, 2018). Paraphrased.
Use when: agreeing reliability targets for a service with the people who
depend on it, and what happens when the targets are missed.
Rule: targets are chosen by the product owner and engineering together,
from user needs and historical data. Do not invent numbers.
Lives at: docs/operations/slo/<service>.md
Remove this comment in the finished document.
-->

# SLO: <Service name>

| Status | Draft |
|---|---|
| Service owner | <team> |
| Product owner | <name> |
| Approvers | <names who agree to the error budget policy> |
| Created | <YYYY-MM-DD> |
| Review cadence | <quarterly> |
| Next review | <YYYY-MM-DD> |
| Related | <dashboards, runbooks, NFR spec> |

## 1. Service overview

<What the service does, who its users are, and which user journeys matter
most.>

## 2. Terms

- **SLI (service level indicator):** a measurement of one aspect of service,
  as the ratio of good events to valid events.
- **SLO (service level objective):** a target for an SLI over a window.
- **Error budget:** `1 - SLO`. The amount of unreliability allowed in the
  window.
- **SLA (service level agreement):** a contract with consequences. Not
  defined here. If one exists, the SLO must be stricter than the SLA.

## 3. SLIs and SLOs

<For each user journey, pick the SLI types that matter: availability,
latency, freshness, correctness, throughput. Define exactly where it is
measured and which events count.>

| Journey | SLI type | SLI specification | Measured at | SLO | Window |
|---|---|---|---|---|---|
| <Place order> | Availability | <Proportion of POST /orders requests that return non-5xx> | <load balancer logs> | <99.9%> | <28 days rolling> |
| <Place order> | Latency | <Proportion of POST /orders requests served in < 800 ms> | <load balancer logs> | <99%> | <28 days rolling> |
| <Order status> | Freshness | <Proportion of status reads where data is < 60 s old> | <synthetic probe> | <99.5%> | <28 days rolling> |

**Valid events exclude:** <health checks, requests from internal load tests,
4xx caused by bad client input.>

### Error budget

| SLO | Window | Budget |
|---|---|---|
| <99.9% availability> | <28 days> | <0.1% of requests, about 40 minutes of full outage> |

## 4. Rationale

<Why these targets. Historical performance, user expectations, dependencies'
own SLOs, cost of higher reliability. A target the service has never met
needs a plan, not just a number.>

## 5. Error budget policy

<What the team does as the budget is consumed. Agreed in advance by the
approvers above.>

| Budget remaining (window) | Action |
|---|---|
| > 50% | <Normal. Ship features.> |
| 25–50% | <Reliability work prioritised in next sprint planning.> |
| < 25% | <Risky launches need approval from <name>.> |
| Exhausted | <Feature freeze except reliability and security fixes until back within SLO. Postmortem for the largest contributors.> |

**Single-incident rule:** <Any incident consuming > 20% of the budget gets a
postmortem with a P1 action item.>

**Exceptions:** <Budget burned by a dependency outside the team's control,
or by a declared company-wide incident, may be excluded by agreement of
<name>.>

**Escalation:** <If the team and product owner disagree about applying the
policy, <name> decides.>

## 6. Alerting

<Alert on error budget burn rate, not on raw thresholds. Multi-window,
multi-burn-rate is a common approach.>

| Alert | Burn rate | Long window | Short window | Action |
|---|---|---|---|---|
| <Fast burn> | <14.4×> | <1 h> | <5 min> | Page |
| <Slow burn> | <6×> | <6 h> | <30 min> | Page |
| <Gradual> | <1×> | <3 days> | <6 h> | Ticket |

Runbook: <link>

## 7. Reporting

<Where the SLO dashboard lives, who sees the monthly report, and where
decisions from budget reviews are recorded.>

## Change log

| Date | Change | Approved by |
|---|---|---|
| <YYYY-MM-DD> | Initial SLOs | <names> |
