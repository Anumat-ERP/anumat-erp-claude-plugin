# Checklist: authentication, sessions, access control, tenant isolation

Primary sources: ASVS 5.0 authentication, session, authorisation, token, and
OAuth chapters (`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-asvs.md`),
and the OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/

Each item is a question to answer from the code. Record pass, fail (becomes a
finding), or not applicable with a reason.

## Authentication

- [ ] Passwords hashed with a slow, salted algorithm (Argon2id, scrypt, bcrypt)
      with current cost parameters. No MD5/SHA-x alone, no reversible
      encryption. (CWE-916)
- [ ] Minimum length 8 with MFA or 15 without; long passphrases allowed; no
      composition rules that force weak patterns; breached-password check on
      set/change.
- [ ] MFA available, and required for admin and staff accounts. Recovery
      codes are single-use and stored hashed.
- [ ] Login, MFA, and password-reset endpoints are rate-limited per account
      and per IP. (CWE-307)
- [ ] Error messages and timing do not reveal whether an account exists.
- [ ] Password reset tokens are random, single-use, short-lived, and
      invalidated when the password changes. Reset does not log the user in
      on a device that did not request it without re-authentication.
- [ ] Changing email, password, or MFA requires the current credential or a
      fresh re-authentication.
- [ ] Third-party auth (OAuth/OIDC): `state` and PKCE used, `redirect_uri`
      matched exactly, ID token signature, `iss`, `aud`, `exp`, and `nonce`
      validated; accounts not linked on an unverified email.
- [ ] Every sensitive route runs the auth check on the server. A route missing
      middleware is CWE-306.

## Sessions and tokens

- [ ] Session ID regenerated at login and privilege change (fixation).
- [ ] Cookies: `Secure`, `HttpOnly`, `SameSite=Lax` or `Strict`, `__Host-`
      prefix where possible, no domain wider than needed.
- [ ] Idle and absolute timeouts set; logout invalidates the session on the
      server, not only the cookie.
- [ ] Sessions are revocable: password change and "sign out everywhere"
      actually end other sessions.
- [ ] JWTs: algorithm fixed server-side (no `alg: none`, no algorithm taken
      from the token header), signature verified before any claim is read,
      `exp` short, `aud`/`iss` checked, no sensitive data in the payload.
- [ ] Refresh tokens rotate on use; reuse of an old one revokes the family.
- [ ] Tokens never appear in URLs, logs, or analytics.

## Access control

- [ ] Deny by default: a new route without an explicit policy is rejected.
- [ ] Authorisation is checked on the server, in one reusable layer, on every
      request. UI hiding is not a control. (CWE-862, CWE-863)
- [ ] Function-level: admin and internal endpoints check the role, not just
      "is logged in". (API5)
- [ ] Object-level: every handler that takes an ID confirms the caller may
      act on that specific record. (CWE-639, API1)
- [ ] Property-level: responses are built from an allow-list of fields;
      updates accept an allow-list of fields. No spreading of request bodies
      into ORM updates. (API3, mass assignment, CWE-915)
- [ ] Privileged actions (role change, impersonation, export, delete) are
      logged with actor and target.
- [ ] Server actions and RPC endpoints (for example Next.js server actions,
      tRPC procedures) are treated as public endpoints and authorise
      themselves.

## Multi-tenant isolation (IDOR)

The highest-impact class in SaaS. Spend time here.

- [ ] Tenant ID comes from the authenticated session, never from the request
      body, query, or a header the client controls.
- [ ] Every query on tenant-owned data is scoped by tenant. Check raw SQL,
      ORM queries, search indexes, caches, and background jobs, not just the
      main handlers.
- [ ] Where the database supports it (Postgres row-level security), policies
      enforce tenancy as a second layer, and the app does not connect as a
      role that bypasses RLS.
- [ ] Cache keys, file storage paths, and queue messages include the tenant.
- [ ] Unguessable IDs (UUIDs) are used, but not relied on: guessability is
      not authorisation.
- [ ] Exports, reports, webhooks, and emails are scoped to the tenant.
- [ ] A test exists that signs in as tenant A and requests tenant B's record
      by ID, expecting 403 or 404. If it does not exist, writing it is the
      first fix.

## Evidence to collect

For each failure: the route, the handler file and line, the missing check,
and a local or staging reproduction using two test accounts you created.
Never use real customer accounts to demonstrate a cross-tenant read.
