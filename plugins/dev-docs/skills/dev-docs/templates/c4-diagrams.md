<!--
Template: C4 model architecture diagrams
Basis: Simon Brown's C4 model (c4model.com): Context, Containers,
Components, Code. Diagrams drawn in Mermaid. The flowchart form below renders
on GitHub, GitLab, and most docs sites. Mermaid also has native C4 syntax
(C4Context, C4Container), still marked experimental; an example is at the end.
Use when: someone asks "draw the architecture", or an arc42 building block
view needs diagrams.
Lives at: docs/architecture/c4-<level>.md, or inside arc42 sections 3 and 5.
Remove this comment in the finished document.
-->

# C4 diagrams: <System name>

| Status | Draft |
|---|---|
| Owner | <name> |
| Last updated | <YYYY-MM-DD> |
| Related | <arc42, ADRs> |

## How to read these diagrams

| Level | Shows | Audience |
|---|---|---|
| 1. System context | The system, its users, and the systems it talks to | Everyone, including non-technical |
| 2. Container | Deployable or runnable units: apps, services, databases, queues | Developers, operations |
| 3. Component | The main parts inside one container | Developers of that container |
| 4. Code | Classes or modules | Rarely drawn by hand; generate from code if needed |

Rules for every diagram:

- A title stating the level and scope.
- Every box has a name, a type in brackets, and a one-line responsibility.
- Every arrow is one direction and labelled with intent and, at level 2 and
  below, the protocol: "Reads orders [SQL/TCP]".
- A key for any shape or line style with meaning.
- Text below each diagram says what it shows in two or three sentences.

Most teams need levels 1 and 2. Draw level 3 only for containers that are
complex or often changed.

## Level 1: System context

<Two or three sentences: what the system does and who uses it.>

```mermaid
flowchart TB
  customer["<b>Customer</b><br/>[Person]<br/>Places and tracks orders"]
  staff["<b>Warehouse staff</b><br/>[Person]<br/>Picks and ships orders"]
  sys["<b>Order System</b><br/>[Software system]<br/>Takes orders and manages fulfilment"]
  erp["<b>ERP</b><br/>[External system]<br/>Finance and invoicing"]
  email["<b>Email provider</b><br/>[External system]<br/>Sends notifications"]

  customer -->|"Places orders using"| sys
  staff -->|"Manages fulfilment using"| sys
  sys -->|"Sends invoices to"| erp
  sys -->|"Sends emails using"| email

  classDef person fill:#08427b,color:#fff,stroke:#052e56
  classDef system fill:#1168bd,color:#fff,stroke:#0b4884
  classDef external fill:#999,color:#fff,stroke:#6b6b6b
  class customer,staff person
  class sys system
  class erp,email external
```

## Level 2: Containers

<Two or three sentences: the main runtime units and how they communicate.>

```mermaid
flowchart TB
  customer["<b>Customer</b><br/>[Person]"]

  subgraph boundary["Order System [Software system]"]
    spa["<b>Web app</b><br/>[Container: React]<br/>Order UI in the browser"]
    api["<b>API</b><br/>[Container: Node.js]<br/>Order and fulfilment logic"]
    worker["<b>Worker</b><br/>[Container: Node.js]<br/>Background jobs"]
    db[("<b>Database</b><br/>[Container: PostgreSQL]<br/>Orders, stock")]
    queue[["<b>Queue</b><br/>[Container: RabbitMQ]<br/>Domain events"]]
  end

  erp["<b>ERP</b><br/>[External system]"]

  customer -->|"Uses [HTTPS]"| spa
  spa -->|"Calls [JSON/HTTPS]"| api
  api -->|"Reads and writes [SQL]"| db
  api -->|"Publishes events [AMQP]"| queue
  queue -->|"Delivers events [AMQP]"| worker
  worker -->|"Posts invoices [JSON/HTTPS]"| erp
```

| Container | Technology | Responsibility | Repo path | Owner |
|---|---|---|---|---|
| <Web app> | <React> | <order UI> | <apps/web> | <team> |

## Level 3: Components of <container>

<Only for containers worth opening.>

```mermaid
flowchart TB
  subgraph api["API [Container]"]
    ctrl["<b>Orders controller</b><br/>[Component]<br/>HTTP endpoints"]
    svc["<b>Order service</b><br/>[Component]<br/>Business rules"]
    repo["<b>Order repository</b><br/>[Component]<br/>Persistence"]
    pub["<b>Event publisher</b><br/>[Component]<br/>Outbox relay"]
  end
  db[("Database")]
  queue[["Queue"]]

  ctrl --> svc
  svc --> repo
  svc --> pub
  repo -->|"SQL"| db
  pub -->|"AMQP"| queue
```

## Supplementary: dynamic diagram

<For one important flow, show the order of interactions.>

```mermaid
sequenceDiagram
  autonumber
  actor C as Customer
  participant W as Web app
  participant A as API
  participant D as Database
  participant Q as Queue
  C->>W: Submit order
  W->>A: POST /orders
  A->>D: Insert order + outbox row (one transaction)
  A-->>W: 201 Created
  A->>Q: Relay OrderPlaced from outbox
```

## Supplementary: deployment

<Where containers run in one environment.>

```mermaid
flowchart TB
  subgraph prod["Production: <cloud, region>"]
    subgraph k8s["Kubernetes cluster"]
      apiPod["API x3"]
      workerPod["Worker x2"]
    end
    rds[("Managed PostgreSQL<br/>primary + replica")]
  end
  cdn["CDN: web app static files"]
  apiPod --> rds
  workerPod --> rds
```

## Mermaid native C4 syntax (optional)

Mermaid's C4 syntax is closer to C4-PlantUML, but layout control is limited
and support varies by renderer. Test it where the docs are read.

```mermaid
C4Context
  title System context for Order System
  Person(customer, "Customer", "Places and tracks orders")
  System(sys, "Order System", "Takes orders and manages fulfilment")
  System_Ext(erp, "ERP", "Finance and invoicing")
  Rel(customer, sys, "Places orders using")
  Rel(sys, erp, "Sends invoices to", "JSON/HTTPS")
```

## Keeping diagrams current

- Diagrams change in the same PR as the architecture change.
- If diagrams drift often, generate them from a model (Structurizr DSL) or
  from code instead of drawing by hand.
