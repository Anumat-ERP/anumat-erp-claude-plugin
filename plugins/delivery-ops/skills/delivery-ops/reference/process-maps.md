# Process maps in Mermaid

Mermaid has no native swimlane diagram. The common workaround is a
`flowchart` with one `subgraph` per role. It renders on GitHub, GitLab and
most docs sites.

## Conventions

| Shape | Mermaid | Meaning |
|---|---|---|
| Rounded | `A([Start])` | Start or end event |
| Rectangle | `B[Check invoice]` | Activity: verb + object |
| Diamond | `C{Over 500?}` | Decision: a yes/no question |
| Parallelogram | `D[/Refund record/]` | Document or record produced |
| Cylinder | `E[(Billing DB)]` | System of record |

- Label every edge out of a decision (`-->|Yes|`, `-->|No|`).
- Number activities to match the SOP steps (`S3[3. Approve refund]`) so the
  map and the table stay in sync.
- Keep a map to about 15 nodes. Past that, split into sub-processes and
  link them.
- Flow left to right (`LR`) for swimlanes, top to bottom (`TB`) for simple
  flows.

## Swimlane pattern

```mermaid
flowchart LR
  subgraph CUS[Customer]
    S0([Requests refund])
  end
  subgraph SUP[Support agent]
    S1[1. Log request] --> S2{2. Within policy?}
    S2 -->|No| S3[3. Decline with reason]
    S3 --> E1([End])
  end
  subgraph FIN[Finance approver]
    S4{4. Amount over 500?}
    S5[5. Approve]
    S6[6. Issue refund] --> R1[/Refund record/]
    R1 --> E2([End])
  end
  subgraph MGR[Finance manager]
    S7[7. Second approval]
  end
  S0 --> S1
  S2 -->|Yes| S4
  S4 -->|No| S5
  S4 -->|Yes| S7
  S7 --> S5
  S5 --> S6
```

Declare the nodes inside the subgraph for the role that performs them, and
draw cross-lane edges after all subgraphs. Mermaid places a node in the
first subgraph that mentions it.

## Simple flowchart pattern

```mermaid
flowchart TB
  A([Start]) --> B[Receive request]
  B --> C{Complete?}
  C -->|No| D[Return to requester] --> B
  C -->|Yes| E[Process]
  E --> F([End])
```

## Sequence pattern (hand-offs between systems and people)

Use a `sequenceDiagram` when the order of messages matters more than the
decisions:

```mermaid
sequenceDiagram
  actor Agent as Support agent
  participant Billing as Billing system
  actor Approver as Finance approver
  Agent->>Billing: Create refund request
  Billing->>Approver: Notify for approval
  Approver->>Billing: Approve
  Billing-->>Agent: Refund issued
```

## Checks

- Every decision has all its exits labelled.
- Every path reaches an end event.
- Every lane is a role that appears in the SOP's roles section.
- Every numbered activity matches a step in the SOP table.
