# OWASP ASVS 5.0

Official source: https://owasp.org/www-project-application-security-verification-standard/
Requirement text and IDs: https://github.com/OWASP/ASVS

The Application Security Verification Standard is a list of testable
requirements for web applications and APIs. It is the best default for a code
audit because each requirement is a yes/no check you can point at code for.
Version 5.0 was released in May 2025 and restructured the chapters, so IDs
from 4.0.3 do not carry over. Cite 5.0 IDs in the form `v5.0.0-<chapter>.<section>.<req>`.

This file summarises; it does not reproduce the standard. Open the source
before quoting a requirement.

## Levels

| Level | Meant for | In practice |
|---|---|---|
| L1 | Every application; the floor | The requirements that stop the most common, easily found attacks. A reasonable first target for an MVP or internal tool |
| L2 | Applications holding sensitive or personal data, B2B SaaS, anything with paying customers | The recommended level for most production software. Adds depth on access control, session handling, crypto, logging |
| L3 | High-assurance: payments, health, critical infrastructure, high-value targets | Adds defence in depth and architectural requirements. Expect more design review and less grep |

Levels are cumulative: L2 includes L1, L3 includes both.

## How to pick a level

1. Start at L1 if nothing else applies. It is never wrong to finish L1 first.
2. Move to L2 if **any** of these hold: the app stores personal data
   (PII), money moves, it is multi-tenant, customers will send a security
   questionnaire, or SOC 2 / ISO 27001 is on the roadmap.
3. Use L3 for components where a breach causes serious harm: payment flows,
   health records, authentication services, admin planes of shared
   infrastructure.
4. Levels can differ per component. An L2 app can hold an L3 auth service.
   Record the level per asset in the audit plan.

## Chapters (5.0), in plain words

| Chapter | What it checks | Checklist in this plugin |
|---|---|---|
| Encoding and sanitisation | Output encoding, injection prevention | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-input.md` |
| Validation and business logic | Input validation, business-rule abuse | same |
| Web frontend security | Browser-side controls: CSP, cookies, headers, framing | same |
| API and web service | REST, GraphQL, WebSocket handling | same, plus `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-api-top10.md` |
| File handling | Upload, storage, download, path handling | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-input.md` |
| Authentication | Passwords, MFA, recovery, credential storage | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-identity.md` |
| Session management | Session lifetime, rotation, termination | same |
| Authorisation | Function-, object- and field-level access | same |
| Self-contained tokens | JWT and similar: signing, validation, lifetime | same |
| OAuth and OIDC | Client, authorisation server, resource server | same |
| Cryptography | Algorithms, key management, randomness | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-platform.md` |
| Secure communication | TLS configuration, service-to-service | same |
| Configuration | Build and deploy config, secrets, debug off | same |
| Data protection | Classification, sensitive data at rest and in transit, privacy | same |
| Secure coding and architecture | Dependencies, safe defaults, design | same |
| Security logging and error handling | What is logged, what is not, safe errors | same |
| WebRTC | Only if the app uses it | Review against the source directly |

## Using it in an audit

- Pick the level per asset in `/security-audit:plan`.
- During `/security-audit:run`, walk the chapters in scope. Mark each
  requirement pass, fail, or not applicable (with a reason).
- A failed requirement becomes a finding that cites the 5.0 ID.
- For a compliance audience, map the results with
  `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/compliance-mapping.md`.
