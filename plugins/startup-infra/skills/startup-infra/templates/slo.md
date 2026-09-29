# SLO · `<journey name>`

Service: `<name>` · Owner: `<who>` · Status: Draft | Active · Date: `<YYYY-MM-DD>`

Guide: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/reliability.md`.

## User journey

What the user is trying to do, in one sentence. Example: "A member signs in
and sees their dashboard."

## Indicator (SLI)

| Field | Value |
|---|---|
| Type | availability / latency / freshness |
| Good event | `<e.g. HTTP 2xx/3xx/4xx except 429 on POST /api/requests>` |
| Valid event | `<e.g. all requests to that route, excluding health checks>` |
| Latency threshold (if latency) | `<e.g. p95 under 800 ms>` |
| Measured at | load balancer / edge / app logs / synthetic check |
| Data source | `<dashboard or query link>` |

## Objective

- Target: `<e.g. 99.5 %>` of valid events are good
- Window: rolling 30 days
- Error budget: `<100 % − target>` = about `<minutes/hours>` per 30 days

## Alerting

| Alert | Condition | Goes to |
|---|---|---|
| Fast burn (page) | Budget would be used up within `<hours>` at current rate | On-call / phone |
| Slow burn (ticket) | Budget would be used up within `<days>` | Team channel |

## Error budget policy

When the budget for the window is spent:
- Feature releases to this service pause, except fixes and reliability work.
- The next planning session includes the top cause.
- Exceptions need sign-off from `<role>`.

## Dependencies

| Dependency | Provider SLA (from their site) | Notes |
|---|---|---|
| | | |

Your SLO cannot be tighter than the combined availability of hard
dependencies without redundancy.

## Review

| Date | Achieved | Budget left | Changes |
|---|---|---|---|
| | | | |
