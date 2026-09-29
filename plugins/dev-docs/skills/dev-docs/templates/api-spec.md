<!--
Template: API specification (prose plus OpenAPI 3.1 skeleton)
Basis: the OpenAPI Specification 3.1 (spec.openapis.org), plus common API
documentation practice. Error format follows RFC 9457 Problem Details.
Use when: defining a new HTTP API before building it, or documenting an
existing one.
Lives at: docs/api/<api-name>.md for the prose, and docs/api/openapi.yaml (or
the service's own folder) for the machine-readable spec. The OpenAPI file is
the source of truth for endpoints; the prose explains what OpenAPI cannot.
Validate with Spectral or Redocly CLI in CI.
Remove this comment in the finished document.
-->

# API: <API name>

| Status | Draft |
|---|---|
| Owner | <team> |
| Version | <v1> |
| Base URL | <https://api.example.com/v1> |
| Spec | <link to openapi.yaml> |
| Last updated | <YYYY-MM-DD> |
| Related | <design doc, data model, ADRs> |

## 1. Overview

<What the API is for, who calls it (internal services, partners, public),
and the main resources.>

## 2. Authentication and authorisation

<Scheme (OAuth 2.0 client credentials, bearer JWT, API key), how to get
credentials, scopes or roles per operation, and what happens without them
(401 vs 403).>

## 3. Conventions

| Topic | Convention |
|---|---|
| Format | <JSON, UTF-8; `Content-Type: application/json`> |
| Naming | <camelCase fields; plural nouns for collections> |
| IDs | <UUIDv7 strings> |
| Dates | <RFC 3339 in UTC, e.g. `2026-09-28T14:05:00Z`> |
| Money | <integer minor units plus ISO 4217 currency code> |
| Pagination | <cursor-based: `?cursor=&limit=`; response has `nextCursor`> |
| Filtering and sorting | <`?status=open&sort=-createdAt`> |
| Idempotency | <`Idempotency-Key` header on POST; kept 24 h> |
| Concurrency | <`ETag` and `If-Match` on updates; 412 on mismatch> |
| Rate limits | <limits per client; `RateLimit-*` headers; 429 with `Retry-After`> |

## 4. Errors

Errors use Problem Details (RFC 9457), `Content-Type: application/problem+json`.

```json
{
  "type": "https://api.example.com/problems/insufficient-stock",
  "title": "Insufficient stock",
  "status": 409,
  "detail": "Only 3 units of SKU-123 are available.",
  "instance": "/orders/0192f3c4-...",
  "errors": [{ "pointer": "/lines/0/quantity", "detail": "Exceeds available stock" }]
}
```

| Status | When |
|---|---|
| 400 | <malformed request> |
| 401 | <missing or invalid credentials> |
| 403 | <authenticated but not allowed> |
| 404 | <resource does not exist or is not visible to caller> |
| 409 | <state conflict> |
| 412 | <ETag mismatch> |
| 422 | <well-formed but fails validation> |
| 429 | <rate limited> |
| 5xx | <server fault; safe to retry idempotent requests with backoff> |

## 5. Resources and operations

<One subsection per resource: purpose, lifecycle, and notes that OpenAPI
cannot express (business rules, side effects, ordering, eventual
consistency). Do not repeat the field list; the spec has it.>

### 5.1 <Orders>

| Method | Path | Summary | Scope |
|---|---|---|---|
| GET | /orders | List orders | orders:read |
| POST | /orders | Create an order | orders:write |
| GET | /orders/{orderId} | Get one order | orders:read |

<Business rules, side effects (emails sent, events published), and
examples.>

## 6. Events and webhooks

<If the API emits events or calls webhooks: names, payloads, delivery
guarantees, retries, signature verification. Or N/A.>

## 7. Versioning and deprecation

<How versions are expressed (URL, header), what counts as a breaking
change, how long an old version is supported, and how deprecation is
announced (`Deprecation` and `Sunset` headers, CHANGELOG, email).>

## 8. Non-functional

<Latency targets, availability, payload size limits, timeouts. Link to SLO.>

## 9. Changelog

| Date | Version | Change |
|---|---|---|
| <YYYY-MM-DD> | <v1.0> | Initial |

## Appendix: OpenAPI skeleton

Save as `openapi.yaml`. Fill every operation with at least one success
response, the error responses it can return, and an example.

```yaml
openapi: 3.1.0
info:
  title: <API name>
  version: 1.0.0
  description: <one paragraph>
  contact:
    name: <team>
    email: <team email>
servers:
  - url: https://api.example.com/v1
    description: Production
  - url: https://api.staging.example.com/v1
    description: Staging
security:
  - oauth2: []
tags:
  - name: Orders
    description: Create and track orders
paths:
  /orders:
    get:
      tags: [Orders]
      operationId: listOrders
      summary: List orders
      security:
        - oauth2: [orders:read]
      parameters:
        - $ref: '#/components/parameters/Cursor'
        - $ref: '#/components/parameters/Limit'
        - name: status
          in: query
          schema:
            $ref: '#/components/schemas/OrderStatus'
      responses:
        '200':
          description: A page of orders
          content:
            application/json:
              schema:
                type: object
                required: [data]
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/Order'
                  nextCursor:
                    type: [string, 'null']
        '401':
          $ref: '#/components/responses/Unauthorized'
    post:
      tags: [Orders]
      operationId: createOrder
      summary: Create an order
      security:
        - oauth2: [orders:write]
      parameters:
        - name: Idempotency-Key
          in: header
          required: true
          schema:
            type: string
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/NewOrder'
            example:
              customerId: 0192f3c4-7a1e-7c3b-9d2e-5f6a7b8c9d0e
              lines:
                - sku: SKU-123
                  quantity: 2
      responses:
        '201':
          description: Created
          headers:
            Location:
              schema:
                type: string
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
        '401':
          $ref: '#/components/responses/Unauthorized'
        '409':
          $ref: '#/components/responses/Conflict'
        '422':
          $ref: '#/components/responses/ValidationError'
  /orders/{orderId}:
    get:
      tags: [Orders]
      operationId: getOrder
      summary: Get one order
      security:
        - oauth2: [orders:read]
      parameters:
        - name: orderId
          in: path
          required: true
          schema:
            type: string
            format: uuid
      responses:
        '200':
          description: The order
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Order'
        '404':
          $ref: '#/components/responses/NotFound'
components:
  securitySchemes:
    oauth2:
      type: oauth2
      flows:
        clientCredentials:
          tokenUrl: https://auth.example.com/oauth/token
          scopes:
            orders:read: Read orders
            orders:write: Create and change orders
  parameters:
    Cursor:
      name: cursor
      in: query
      schema:
        type: string
    Limit:
      name: limit
      in: query
      schema:
        type: integer
        minimum: 1
        maximum: 100
        default: 20
  schemas:
    OrderStatus:
      type: string
      enum: [draft, submitted, fulfilled, cancelled]
    NewOrder:
      type: object
      required: [customerId, lines]
      properties:
        customerId:
          type: string
          format: uuid
        lines:
          type: array
          minItems: 1
          items:
            $ref: '#/components/schemas/OrderLine'
    OrderLine:
      type: object
      required: [sku, quantity]
      properties:
        sku:
          type: string
        quantity:
          type: integer
          minimum: 1
    Order:
      allOf:
        - $ref: '#/components/schemas/NewOrder'
        - type: object
          required: [id, status, createdAt]
          properties:
            id:
              type: string
              format: uuid
            status:
              $ref: '#/components/schemas/OrderStatus'
            createdAt:
              type: string
              format: date-time
    Problem:
      type: object
      properties:
        type:
          type: string
          format: uri
        title:
          type: string
        status:
          type: integer
        detail:
          type: string
        instance:
          type: string
  responses:
    Unauthorized:
      description: Missing or invalid credentials
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/Problem'
    NotFound:
      description: Not found
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/Problem'
    Conflict:
      description: State conflict
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/Problem'
    ValidationError:
      description: Validation failed
      content:
        application/problem+json:
          schema:
            $ref: '#/components/schemas/Problem'
```
