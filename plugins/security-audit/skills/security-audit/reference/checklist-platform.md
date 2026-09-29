# Checklist: secrets, config, crypto, logging, rate limiting, dependencies

Primary sources: ASVS 5.0 configuration, cryptography, communication, data
protection, and logging chapters
(`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-asvs.md`).

## Secrets and configuration

- [ ] No secrets in source, history, Docker layers, client bundles, or CI
      logs. Run the secret scanners over full history. (CWE-798)
- [ ] Anything prefixed for client exposure (`NEXT_PUBLIC_`, `VITE_`,
      `PUBLIC_`) is genuinely public.
- [ ] Secrets live in a secrets manager or the platform's encrypted env
      store, scoped per environment. Production secrets are not shared with
      preview or dev.
- [ ] `.env*` files are git-ignored; an `.env.example` holds names only.
- [ ] Debug mode, stack traces, source maps with sources, and admin consoles
      are off or protected in production.
- [ ] Error responses are generic; details go to logs with a correlation ID.
- [ ] Default credentials changed; unused services and ports closed.
- [ ] Separate dev, staging, and production; production data is not copied
      to lower environments without masking.

## Cryptography

- [ ] TLS 1.2+ everywhere, including service-to-service and database
      connections; HSTS on web origins.
- [ ] No home-made crypto. Use the platform library (Web Crypto, libsodium,
      Node `crypto`) with authenticated encryption (AES-GCM,
      ChaCha20-Poly1305).
- [ ] Random values for tokens and IDs come from a CSPRNG
      (`crypto.randomUUID`, `crypto.getRandomValues`), never `Math.random`.
      (CWE-338)
- [ ] Keys are not in code; rotation is possible and documented.
- [ ] Secrets compared in constant time (`timingSafeEqual`) for tokens,
      webhook signatures, API keys.
- [ ] Webhook payloads are verified by signature and timestamp (replay
      window).
- [ ] Sensitive fields (tokens, government IDs, health data) encrypted at
      the field level where the threat model calls for it.

## Logging and monitoring

- [ ] Security events are logged: login success and failure, MFA changes,
      password reset, permission changes, admin actions, access denials,
      input validation failures at volume.
- [ ] Each entry has timestamp (UTC), actor, tenant, action, target,
      source IP, and request ID.
- [ ] Logs never contain passwords, tokens, session IDs, full card numbers,
      or unnecessary personal data. Check request-logging middleware and
      error reporters (Sentry breadcrumbs). (CWE-532)
- [ ] Logs are shipped off the host, retained per policy, and not writable
      by the application that produced them.
- [ ] Alerts exist for: spikes in auth failures, access denials, 5xx rates,
      and admin actions outside hours. Someone receives them.

## Rate limiting and resource limits

- [ ] Rate limits on login, sign-up, password reset, OTP, and any endpoint
      that sends email/SMS or costs money (including LLM calls). (CWE-770)
- [ ] Limits keyed by account and by IP, and enforced at a shared store
      (not per instance memory) when running more than one instance.
- [ ] Pagination capped; expensive queries time out; GraphQL depth and
      complexity limited.
- [ ] Background jobs and queues have concurrency and retry caps.

## Dependency hygiene

- [ ] Lockfile committed; CI installs with a frozen lockfile.
- [ ] Dependency scan in CI with a severity gate (see
      `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/tooling.md`).
- [ ] No unmaintained packages in security-critical paths (auth, crypto,
      parsing). Check last release and open advisories.
- [ ] New dependencies reviewed for typosquatting, install scripts, and
      maintainer history before adding.
- [ ] Install scripts disabled or allow-listed where the package manager
      supports it (Bun runs lifecycle scripts only for trusted dependencies).
- [ ] Automated update PRs (Dependabot or Renovate) enabled and actually
      merged.
