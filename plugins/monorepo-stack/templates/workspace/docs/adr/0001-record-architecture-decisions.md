# 1. Record architecture decisions

Date: __TODAY__

## Status

Accepted

## Context

Decisions made early — monorepo layout, module boundaries, which framework,
what a module may depend on — are the ones that are most expensive to reverse
and least visible six months later. Without a record, the reasoning is lost
and the decision gets re-litigated by whoever joins next, usually with less
context than the person who made it.

## Decision

Every architecturally significant decision gets a short ADR in `docs/adr/`,
numbered sequentially. "Significant" means: hard to reverse, or constrains
what others can do.

Each one records the context, the decision, and — most importantly — the
alternatives that were rejected and why. A decision without its rejected
alternatives is an assertion; nobody can tell later whether the tradeoff still
holds.

## Consequences

Writing one costs a few minutes. Not writing one costs an argument, usually at
the point where reversing is most expensive.

ADRs are immutable: superseding one means writing a new ADR that references
it, not editing the original. The record of what we used to believe is part of
the value.
