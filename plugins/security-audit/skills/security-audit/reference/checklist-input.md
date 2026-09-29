# Checklist: input handling, injection, browser security, SSRF, uploads

Primary sources: ASVS 5.0 encoding, validation, web frontend, API, and file
chapters (`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-asvs.md`),
OWASP Cheat Sheet Series: https://cheatsheetseries.owasp.org/

## Input validation

- [ ] Every external input (body, query, headers, cookies, webhooks, file
      contents, third-party API responses) is validated on the server with a
      schema (Zod, Valibot, JSON Schema) at the boundary.
- [ ] Validation is by allow-list: type, length, range, format, enum.
- [ ] Business rules are enforced server-side: quantities positive, prices
      from the server not the client, state transitions allowed.
- [ ] Request size, array length, and nesting depth are limited.

## Injection

- [ ] SQL: parameterised queries or a query builder everywhere. Search for
      string concatenation or template literals into `query`, `raw`,
      `$queryRawUnsafe`, `sql.unsafe`, and similar. Identifiers (column,
      sort field) come from an allow-list. (CWE-89)
- [ ] NoSQL: operators in user input (`$where`, `$ne`) are stripped or
      rejected.
- [ ] OS commands: no shell with user input. Use argument arrays
      (`execFile`, `spawn` without `shell: true`). (CWE-78)
- [ ] No `eval`, `new Function`, `vm` on user input. (CWE-94)
- [ ] Template engines render user data as data, never as template source.
- [ ] Paths built from input are normalised and confined to a base
      directory. (CWE-22)
- [ ] Deserialisation of untrusted data uses safe formats (JSON) with schema
      validation; no native object deserialisation of user input. (CWE-502)
- [ ] Headers and log lines built from input strip CR/LF.

## XSS and Content Security Policy

- [ ] The framework's automatic escaping is not bypassed:
      `dangerouslySetInnerHTML`, `v-html`, `innerHTML`, `[innerHTML]`,
      `|safe`. Each use is justified and its input sanitised (DOMPurify).
      (CWE-79)
- [ ] URLs from users in `href`/`src` are restricted to `http(s):` (no
      `javascript:`).
- [ ] Markdown and rich text are rendered with a sanitiser, not raw HTML.
- [ ] A CSP is set. Prefer nonce- or hash-based `script-src` with
      `'strict-dynamic'`; no `'unsafe-inline'` for scripts; `object-src
      'none'`; `base-uri 'none'` or `'self'`; `frame-ancestors` set.
- [ ] JSON embedded in HTML (hydration data) is escaped for `</script>`.

## CSRF

- [ ] State-changing requests never use GET.
- [ ] Cookie-authenticated state changes are protected: `SameSite` cookies
      plus a CSRF token or a verified `Origin`/`Sec-Fetch-Site` check.
      Frameworks with built-in protection have it switched on. (CWE-352)
- [ ] CORS does not reflect arbitrary origins with credentials. No
      `Access-Control-Allow-Origin: *` on credentialed endpoints.

## SSRF

- [ ] Any feature that fetches a user-supplied URL (webhooks, previews,
      imports, image fetch, PDF render) is identified. (CWE-918)
- [ ] Destination allow-listed where possible. Otherwise: resolve the host,
      block private, loopback, link-local, and metadata ranges
      (169.254.169.254, fd00::/8, etc.) **after** DNS resolution, and pin the
      connection to the checked IP to avoid DNS rebinding.
- [ ] Redirects are not followed, or each hop is re-checked.
- [ ] Only `http`/`https` schemes. Responses are size- and time-limited and
      not returned raw to the caller.
- [ ] Cloud metadata endpoints require session tokens (for example IMDSv2 on
      AWS).

## File upload

- [ ] Size limit enforced server-side before buffering. (CWE-434)
- [ ] Type checked by content (magic bytes), not only extension or
      `Content-Type`; allow-list of types.
- [ ] Stored outside the web root or in object storage, under a generated
      name. Original filename never used as a path.
- [ ] Served with `Content-Disposition: attachment` or from a separate
      domain; `X-Content-Type-Options: nosniff`. SVG and HTML are not served
      inline from the app origin.
- [ ] Images re-encoded to strip metadata where privacy matters. Archives
      checked for path traversal and decompression bombs.
- [ ] Pre-signed upload URLs are short-lived, scoped to one key, and limit
      size and content type.
- [ ] Download endpoints check authorisation per file (see
      `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-identity.md`).
