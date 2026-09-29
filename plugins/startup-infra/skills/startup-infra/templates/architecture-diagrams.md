# Architecture diagram starters (Mermaid)

One diagram per stage. Copy the one for your stage, rename the boxes to your
providers, and delete what you do not run. Stage detail:
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/stages.md`.

Labels use generic layer names with an example provider in brackets. Replace
the example with your own choice from
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/layers.md`.

## Stage 0 · Hackathon

```mermaid
flowchart LR
  user["Judges / demo users"] --> host["Free host, one region<br/>[Workers / Vercel / Render]"]
  dev["Laptop: install && dev"] -.->|"local fallbacks"| localdb[("Embedded Postgres<br/>seeded demo data")]
  host --> db[("Free managed Postgres<br/>[Neon / Supabase]")]
  dev -.-> video["Backup demo video"]
```

## Stage 1 · MVP / pilot

```mermaid
flowchart LR
  user["Users"] --> dns["DNS + TLS<br/>[Cloudflare]"]
  dns --> app["App, one region<br/>[Workers / Vercel / Fly]"]
  app --> auth["Managed auth<br/>[Clerk / Auth.js / Supabase Auth]"]
  app --> db[("Managed Postgres<br/>[Neon / Supabase]")]
  app --> files[("Object storage, S3 API<br/>[R2 / S3]")]
  app --> email["Transactional email<br/>[Resend / Brevo / Postmark]"]
  app --> errors["Error tracking<br/>[Sentry]"]
  cron["Nightly job"] -->|"pg_dump"| backup[("Backup bucket<br/>separate account")]
  db --> cron
  ci["CI: check, test, migrate, deploy"] --> app
  errors --> chat["Team chat"]
```

## Stage 2 · First paying customers

```mermaid
flowchart LR
  user["Customers"] --> dns["DNS + CDN + WAF"]
  dns --> prod["Prod app"]
  subgraph envs["Environments"]
    preview["Preview per PR<br/>+ DB branch"]
    staging["Staging<br/>seeded data"]
    prod
  end
  prod --> db[("Postgres, paid plan<br/>PITR")]
  prod --> files[("Object storage")]
  prod --> jobs["Cron / jobs"]
  prod --> email["Email"]
  secrets["Secrets store<br/>[Doppler / Infisical / host]"] -.-> prod
  secrets -.-> staging
  prod --> logs["Logs with retention<br/>[Better Stack / Grafana / Axiom]"]
  uptime["External uptime checks"] --> prod
  uptime --> status["Status page<br/>hosted elsewhere"]
  logs --> alerts["Alerts: chat + phone for Sev 1"]
  db --> backup[("Own backups<br/>quarterly restore drill")]
```

## Stage 3 · Growth

```mermaid
flowchart LR
  user["Users"] --> edge["CDN / edge cache"]
  edge --> lb["Load balancer"]
  lb --> api["App instances<br/>stateless"]
  api --> flags["Feature flags"]
  api --> cache[("Cache<br/>[Redis-compatible]")]
  api --> primary[("Postgres primary")]
  primary --> replica[("Read replica")]
  api --> queue["Queue + dead-letter"]
  queue --> workers["Workers"]
  primary -->|"ELT"| wh[("Warehouse")]
  iac["IaC: Terraform / OpenTofu / Pulumi<br/>plan on PR, apply from CI"] -.-> lb
  iac -.-> primary
  api --> otel["OpenTelemetry collector"]
  otel --> obs["Metrics, logs, traces"]
  obs --> oncall["Paging tool<br/>on-call rota"]
```

## Stage 4 · Scale

```mermaid
flowchart TB
  user["Users worldwide"] --> gdns["Global DNS / anycast<br/>geo routing"]
  gdns --> r1
  gdns --> r2
  subgraph r1["Region A (home)"]
    a_app["App"] --> a_db[("Primary")]
    a_app --> a_q["Queue"]
  end
  subgraph r2["Region B"]
    b_app["App"] --> b_db[("Replica or tenant-home primary")]
    b_app --> b_q["Queue"]
  end
  a_db -->|"replication"| b_db
  platform["Platform team<br/>paved roads, IaC modules"] -.-> r1
  platform -.-> r2
  finops["FinOps: tags, cost per unit,<br/>committed use"] -.-> platform
  drills["Chaos and DR drills"] -.-> r1
  drills -.-> r2
```

## Conventions

- Cylinders `[( )]` are stateful: these are what backups and DR tiers cover.
- Dashed lines are control or config paths, not user traffic.
- Keep the diagram in the repo next to the decision records; update it in the
  same PR as the infrastructure change.
