# Stages

Five stages, each with the same seven headings: goal, users and traffic,
budget, what to run, what not to build yet, exit triggers, and risks.

**How to place a product.** Score it with
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/stage-scorecard.md`.
Place by the highest stage whose *risk* the product already carries, even if
the spend is lower. A pilot holding payroll data is Stage 2 for backups and
security, whatever the bill says. A product can also be split: Stage 2 for the
database, Stage 1 for analytics. Say so explicitly when it is.

**Moving up is not a reward.** Each stage adds work that must be done every
week afterwards. Move when an exit trigger fires, not before.

---

## Stage 0 · Hackathon ($0)

**Goal.** A working demo in front of judges or first users within days. Prove
the idea, not the infrastructure.

**Users and traffic.** The team, judges, a few dozen people clicking a link.
Traffic is bursty and short-lived.

**Budget.** $0. No card on file anywhere that can bill without a cap.

**What to run.**
- **Local-first.** The whole product runs on a laptop with one command
  (`install && dev`). Every external service has a local fallback (embedded
  or containerised Postgres, a fake sign-in, an outbox instead of email).
  A demo must not depend on venue Wi-Fi.
- One hosted copy on a free tier (a serverless or static host), in **one
  region**, for the judges' link.
- **Seeded demo data**: a script that loads a believable account with a few
  weeks of history. Empty screens lose demos.
- A **backup video** of the demo flow, recorded the night before. When the
  network fails on stage, play the video.
- Git from minute one; secrets in `.env.local`, never committed. A
  `.env.example` with names only.

**What not to build yet.** Staging, IaC, Kubernetes, microservices, queues,
multi-region, custom observability, paid plans, your own auth.

**Exit triggers.**
- Someone outside the team wants to use it again next week.
- You are about to store data that a real person would be upset to lose.
- You buy a domain and tell people about it.

**Risks.**
- A committed secret (rotate it; do not just delete the line).
- A free tier that sleeps or pauses at the worst moment. Warm it up before
  demoing, or demo locally.
- Demo data that leaks a real person's details.

---

## Stage 1 · MVP / pilot ($0–50 a month)

**Goal.** Real users rely on it for real work. Data must survive; outages must
be noticed by you before they are reported to you.

**Users and traffic.** Tens to a few hundred users; one pilot customer or a
small public beta. Usually one time zone.

**Budget.** $0–50 a month, mostly free tiers plus a domain. Know which bill
arrives first (see `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/cost.md`).

**What to run.**
- A **real domain** with DNS on a provider that gives free TLS.
- **Managed auth** (hosted or a maintained library). Do not write password
  storage yourself.
- **Managed Postgres** with point-in-time restore, in the region nearest your
  users.
- **Transactional email** on a verified sending domain (SPF, DKIM, DMARC).
- **Error tracking** wired to a channel someone reads.
- **Backups** you control, in addition to the provider's: a nightly logical
  dump to object storage in another account or provider. One restore tested.
- **CI basics**: type check, lint, tests on every pull request; deploy on
  merge to main; migrations run in the deploy step.
- **Budget alerts** on every account that holds a card.

**What not to build yet.** Staging environment (preview deploys are enough),
on-call rota, IaC for everything, caching layers, SOC 2.

**Exit triggers.**
- The first invoice is paid, or a contract is signed.
- A customer asks "what is your uptime?" or "where is our data stored?".
- A free-tier limit is hit twice in a month.
- A second engineer deploys to production.

**Risks.**
- Free-tier cliffs (see `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/principles.md`).
- The provider's restore window is shorter than you assume.
- One person holds every account. Add a second admin and turn on 2FA.

---

## Stage 2 · First paying customers ($50–500 a month)

**Goal.** Downtime now costs money and trust. Make change safe and failure
visible, without a dedicated ops person.

**Users and traffic.** Hundreds to low thousands of users; several paying
customers; possibly a second time zone.

**Budget.** $50–500 a month. Paid plans on the services you depend on most
(database, hosting, auth), so limits and support are contractual.

**What to run.**
- **Staging** that mirrors production config, with anonymised or seeded data.
- **Preview deploys** per pull request, ideally with a database branch.
- **Uptime monitoring** from outside, on the sign-in and one core flow.
- **Log retention** long enough to investigate last week's issue.
- **Secrets management**: one store, per-environment values, rotation noted.
- **SLOs**: one or two, written down
  (`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/slo.md`).
- **Incident process**: who is paged, where to talk, how to write it up
  (`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/incident-one-pager.md`).
- **Status page**, even a simple hosted one.
- **Cost alerts** at 50/80/100 % of budget, and a spend cap where offered.
- Quarterly restore drill.

**What not to build yet.** Multi-region, Kubernetes, a data warehouse, a
dedicated platform team, chaos engineering.

**Exit triggers.**
- Monthly infra spend above roughly $500, or growing more than 20 % a month.
- More than three engineers shipping to production weekly.
- An enterprise prospect sends a security questionnaire or asks for SOC 2.
- A database or compute limit forces a plan change you did not plan.
- Out-of-hours incidents happen more than once a month.

**Risks.**
- Staging drifts from production and stops catching bugs.
- Alerts go to a channel nobody watches.
- Secrets copied into CI, laptops and chat; no idea what to rotate.

---

## Stage 3 · Growth ($500–5k a month)

**Goal.** Several teams ship daily without stepping on each other. Infra is
reproducible, costs are understood per customer, and the company can pass a
security review.

**Users and traffic.** Thousands to hundreds of thousands of users; traffic
growing monthly; first large customers with contracts that name uptime.

**Budget.** $500–5k a month. Someone owns the bill monthly.

**What to run.**
- **Infrastructure as code** (Terraform/OpenTofu or Pulumi) for everything
  that is not a click in a SaaS dashboard, with plan-on-PR.
- **Read replicas and caching** where measurement shows read load.
- **Queues** for work that should not happen in the request.
- **Feature flags** for risky changes and gradual rollout.
- **On-call rotation** with at least three people, paid or compensated.
- **SOC 2 readiness**: policies, access reviews, evidence collection.
- **Data warehouse basics**: product and billing data copied out of the
  production database for analysis.

Detail: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/scaling.md`.

**What not to build yet.** Active-active multi-region, your own data centre,
a service mesh, a custom deploy platform.

**Exit triggers.**
- Material users on another continent with latency complaints.
- Monthly spend above roughly $5k, where committed-use discounts pay off.
- A contract that requires regional data residency or a DR RTO under an hour.
- Infra work takes more than one engineer full-time.

**Risks.**
- IaC and console changes diverge ("click-ops drift").
- Cache invalidation bugs that look like data loss.
- On-call burnout; the same two people take every page.

---

## Stage 4 · Scale ($5k+ a month)

**Goal.** Serve users worldwide within latency and residency limits, at a
unit cost that improves with volume, with failures rehearsed rather than
discovered.

**Users and traffic.** Hundreds of thousands and up; several regions;
enterprise contracts with SLAs and audits.

**Budget.** $5k+ a month. Finance and engineering review it together.

**What to run.**
- **Multi-region**: start with a warm standby, move to active-active only
  where the data model allows it.
- A dedicated **infra or platform team** that treats internal developers as
  customers.
- **Reserved capacity / committed-use discounts** on the steady baseline.
- **Chaos and DR drills** on a schedule, with written results.
- **FinOps**: cost per team, per feature, per customer; tagging enforced.

**What not to build yet.** Anything without a named owner and a measured
problem. At this stage the risk is building platforms nobody asked for.

**Exit triggers.** None upward. Revisit the stage choice per component each
year: some pieces can move back to simpler, managed options.

**Risks.**
- Regional failover that has never actually run.
- Commitments bought for load that then moves or shrinks.
- Platform complexity that slows every product team.

---

## Diagrams and roadmap

- One Mermaid diagram per stage:
  `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/architecture-diagrams.md`.
- The whole path with triggers:
  `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/infra-roadmap.md`.
- Moving between stages:
  `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/migrations.md`.
