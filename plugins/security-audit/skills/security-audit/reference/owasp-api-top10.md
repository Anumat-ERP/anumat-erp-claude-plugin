# OWASP API Security Top 10 (2023)

Official source: https://owasp.org/API-Security/editions/2023/en/0x11-t10/

APIs fail differently from server-rendered pages: the client is untrusted
code, every object ID is visible, and the whole surface is reachable by
script. Use this list alongside ASVS for any REST, GraphQL, or RPC surface.

| ID | Risk | What to look for |
|---|---|---|
| API1 | Broken Object Level Authorization | Handler loads a record by ID from the request without checking the caller owns it or shares its tenant. The most common serious API finding |
| API2 | Broken Authentication | Weak token validation, missing expiry, credential endpoints with no rate limit, API keys in URLs |
| API3 | Broken Object Property Level Authorization | Response returns fields the caller should not see (over-exposure), or update accepts fields they should not set (mass assignment: `role`, `tenantId`, `isAdmin`) |
| API4 | Unrestricted Resource Consumption | No limits on page size, upload size, query depth/complexity, or requests per client; costly third-party calls triggered freely |
| API5 | Broken Function Level Authorization | Admin or internal endpoints reachable by ordinary users because the check lives only in the UI |
| API6 | Unrestricted Access to Sensitive Business Flows | A legitimate flow abused at scale: bulk sign-ups, coupon farming, stock hoarding. Needs business-level limits, not just auth |
| API7 | Server Side Request Forgery | Webhooks, URL previews, imports that fetch a caller-supplied URL |
| API8 | Security Misconfiguration | Permissive CORS, verbose errors, missing TLS, default credentials, unneeded HTTP methods |
| API9 | Improper Inventory Management | Old API versions still live, undocumented endpoints, staging APIs on the internet with real data |
| API10 | Unsafe Consumption of APIs | Trusting data from third-party APIs without validation; following their redirects blindly |

## Review method

1. Build the endpoint inventory first (routes file, OpenAPI spec, GraphQL
   schema). Record it in
   `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/asset-inventory.md`.
2. For every endpoint that takes an ID, trace: where is the caller's
   identity read, and where is ownership or tenancy checked? No check is API1.
3. For every write endpoint, list the fields accepted. Compare with the
   fields the caller may set. Extra fields are API3.
4. For GraphQL, check depth and complexity limits and whether introspection
   is on in production.

Detailed checks: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-identity.md`
and `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-input.md`.
