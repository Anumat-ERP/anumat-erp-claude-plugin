<!--
Template: Process map (swimlane)
Basis: cross-functional (swimlane) flowchart practice, drawn as a Mermaid
flowchart with one subgraph per role. Conventions are in
${CLAUDE_PLUGIN_ROOT}/skills/delivery-ops/reference/process-maps.md.
Use when: a process has three or more roles or any decision branch.
Embed in the SOP, or keep alongside it and link.
Remove this comment in the finished document.
-->

# Process map: <Process name>

| Field | Value |
|---|---|
| Related SOP | <SOP-<NNN>> |
| Owner | <role> |
| Version | <matches the SOP version> |

## Map

```mermaid
flowchart LR
  subgraph L1[<Role 1>]
    START([<Trigger>])
    S1[1. <Activity>]
  end
  subgraph L2[<Role 2>]
    S2{2. <Decision question?>}
    S3[3. <Activity>]
    S4[4. <Activity>] --> R1[/<Record produced>/]
  end
  subgraph L3[<Role 3>]
    S5[5. <Activity>]
    END([<End state>])
  end
  START --> S1 --> S2
  S2 -->|Yes| S3 --> S5
  S2 -->|No| S4
  R1 --> END
  S5 --> END
```

## Legend

| Shape | Meaning |
|---|---|
| Rounded | Start or end |
| Rectangle | Activity (numbered to match the SOP step) |
| Diamond | Decision; every exit labelled |
| Parallelogram | Record or document produced |

## Checks

- [ ] Every lane is a role in the SOP's roles section.
- [ ] Every numbered activity matches an SOP step.
- [ ] Every decision exit is labelled.
- [ ] Every path reaches an end.
