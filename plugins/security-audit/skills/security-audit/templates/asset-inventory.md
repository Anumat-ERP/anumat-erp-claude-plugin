# Asset inventory: <system name>

Date: <YYYY-MM-DD> · Owner: <name>

Data classes: **Public** · **Internal** · **Confidential** (customer data,
business secrets) · **Restricted** (credentials, payment data, health data,
government IDs).

## Applications and services

| ID | Name | Type | Repo | Runtime / host | Internet-facing | Data classes | Owner | ASVS level |
|---|---|---|---|---|---|---|---|---|
| A1 | <web app> | Web (Next.js) | <org/repo> | <Vercel> | Yes | Confidential | | L2 |
| A2 | <api> | API | | | | | | |

## APIs and endpoints

| Service | Spec location | Auth method | Public / partner / internal | Notes |
|---|---|---|---|---|
| | <openapi.yaml / routes dir> | | | |

## Data stores

| ID | Store | Type | Host / provider | Data classes | Encrypted at rest | Backups tested | Access roles |
|---|---|---|---|---|---|---|---|
| D1 | <main db> | Postgres | <Neon> | Confidential | Yes | <date> | <roles> |
| D2 | <files> | Object storage | | | | | |

## Secrets and keys

| Secret | Stored in | Used by | Rotation | Last rotated |
|---|---|---|---|---|
| <DB URL> | <env store> | A1 | <manual/auto> | |

(Never record values here.)

## Third-party services

| Vendor | Purpose | Data shared | Auth to vendor | Security review / SOC 2 report |
|---|---|---|---|---|
| | | | | |

## Build and delivery

| Item | Where | Notes |
|---|---|---|
| Source control | <GitHub org> | Branch protection: <yes/no> |
| CI/CD | <GitHub Actions> | Pinned actions: <yes/no> |
| Registries | <npm, container registry> | Publish method: <token / OIDC> |
| Domains and DNS | <registrar, DNS provider> | |

## People and access

| System | Admins (count, names) | MFA enforced | SSO | Last access review |
|---|---|---|---|---|
| | | | | |
