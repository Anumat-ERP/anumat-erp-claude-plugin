# Checklist: LLM and AI features

Source: OWASP Top 10 for LLM Applications (2025): https://genai.owasp.org/llm-top-10/

Treat the model as an untrusted component. Any text it reads (user input,
retrieved documents, web pages, emails, tool results) can contain
instructions, and the model may follow them. Design so that a fully
manipulated model still cannot do damage.

## The OWASP LLM Top 10 (2025), in plain words

| ID | Risk | Short meaning |
|---|---|---|
| LLM01 | Prompt injection | Input (direct or hidden in content) changes the model's behaviour |
| LLM02 | Sensitive information disclosure | The model reveals data it was given or trained on |
| LLM03 | Supply chain | Compromised models, datasets, plugins |
| LLM04 | Data and model poisoning | Training or retrieval data manipulated |
| LLM05 | Improper output handling | Model output used unsafely downstream (XSS, SQL, shell) |
| LLM06 | Excessive agency | The model can take actions with too much permission or autonomy |
| LLM07 | System prompt leakage | Secrets or security logic placed in the system prompt |
| LLM08 | Vector and embedding weaknesses | Retrieval leaks across users or tenants, or is poisoned |
| LLM09 | Misinformation | Confident wrong output relied on without checks |
| LLM10 | Unbounded consumption | Cost or resource exhaustion through the model |

## Review checklist

Prompt injection (LLM01, LLM07)
- [ ] No secrets, keys, or authorisation rules live only in the system
      prompt. Assume the prompt will leak.
- [ ] Authorisation is decided by code, never by the model.
- [ ] Untrusted content is clearly separated from instructions, and the
      design does not depend on that separation holding.

Output handling (LLM05)
- [ ] Model output rendered in a browser is escaped or sanitised like any
      user input (see `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-input.md`).
- [ ] Output never reaches SQL, shell, `eval`, file paths, or URLs fetched by
      the server without the same validation as user input.
- [ ] Structured output is parsed against a schema; failures are rejected.
- [ ] Markdown images and links in output cannot leak data to external hosts
      (image URLs with data in the query string).

Agency and tools (LLM06)
- [ ] Each tool the model can call runs with the permissions of the end user,
      not a service account, and is scoped to their tenant.
- [ ] Destructive or external actions (send email, pay, delete, post) require
      explicit user confirmation.
- [ ] Tool allow-list is minimal; tool arguments validated server-side.

Data and retrieval (LLM02, LLM08)
- [ ] Retrieval filters by tenant and permission **before** results reach the
      model.
- [ ] Personal data sent to a model provider is covered by the privacy
      policy and the provider's data terms (retention, training use).
- [ ] Conversation logs are treated as sensitive data.

Consumption (LLM10)
- [ ] Per-user and per-tenant rate limits and token budgets; max output
      tokens set; spend alerts at the provider.

Supply chain (LLM03, LLM04)
- [ ] Models and datasets come from known sources, pinned by version or hash.
- [ ] Third-party plugins and MCP servers reviewed like any dependency.

Reliance (LLM09)
- [ ] Output that drives decisions (financial, legal, medical, security) is
      reviewed by a person or checked by code before use.

## Testing

Test with your own crafted inputs in a local or staging environment:
instructions hidden in an uploaded document, a retrieved page, or a tool
result, and confirm the defences above hold. Record the input and the
observed behaviour as evidence. Do not target third-party AI services.
Add these threats to the STRIDE model
(`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/stride.md`).
