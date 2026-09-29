# Observability

What to see, per stage, and who gets told.

## Per stage

| Stage | Errors | Logs | Metrics | Traces | Uptime | Alerts go to |
|---|---|---|---|---|---|---|
| 0 | Console | Terminal / host logs | none | none | none | nobody |
| 1 | Error tracker (Sentry or similar), release tagged | Host logs, short retention | Host dashboard | none | One external check on the home page | Team chat |
| 2 | Error tracker with alert rules and rate limits | Shipped to a log store with retention long enough to look back a couple of weeks | Request rate, error rate, latency (RED) per route | Optional | External checks on sign-in and the core flow; status page | Chat + phone for Sev 1 |
| 3 | Grouped by owner team | Structured JSON, request IDs, PII scrubbed | SLO dashboards, DB and queue metrics | OpenTelemetry traces across services and jobs | Multi-location checks | On-call rota via a paging tool |
| 4 | Per region | Per region, with residency rules | Per region, per tenant for the largest | Sampled, tail-based | Per region | Follow-the-sun or regional rotas |

## Rules

- **Instrument with OpenTelemetry** where the platform allows it. The
  collector or SDK stays; the backend can change.
- **Structured logs** from Stage 2: JSON with a request ID, user or
  workspace ID (not email), route, duration, outcome.
- **Never log secrets or personal data.** Scrub tokens, passwords, and
  message bodies. Check error-tracker "send default PII" settings.
- **Every alert has an owner and an action.** An alert nobody would act on is
  noise; delete it.
- **Alert on symptoms, not causes**: "sign-in success rate below SLO", not
  "CPU at 80 %". Cause metrics go on dashboards.
- **Rate-limit the error tracker.** A loop that throws on every request can
  use a month's free allowance in an hour. Set sampling and per-issue caps.
- **Watch the cost of observability itself.** Log ingest and metric
  cardinality are common surprise bills (see
  `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/cost.md`).

## Minimum dashboards (Stage 2)

1. **Service health**: requests, error rate, p50/p95 latency, per key route.
2. **Database**: connections, slow queries, storage used against plan limit.
3. **Jobs**: queued, failed, age of oldest job.
4. **Spend**: this month to date against budget.
5. **Free-tier and plan limits**: current usage as a percentage, per service.

Providers per layer:
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/layers.md`.
SLOs and incident flow:
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/reliability.md`.
