# Architecture

## Layers

```
apps/       deployable applications. Compose modules; own routing and layout.
modules/    business capabilities. Own their domain rules, permissions, data.
packages/   technical capability. No business knowledge.
```

**Dependencies point one way: `apps → modules → packages`.**

A package that knows what an invoice is has become a module. A module that
imports from an app has inverted the dependency and can no longer be reused.
Nothing imports upward.

## Modules

A module is a business capability, not a folder of related files. It declares
its dependencies, the permissions it defines, and the navigation it
contributes, in `module.config.ts` — which is what lets an app compose modules
rather than importing into their internals.

Cross-module imports go through the module's `index.ts` and must be declared
in `depends`. A deep import freezes the other module's internals; an
undeclared dependency is how cycles appear.

## Where decisions live

`docs/adr/` — see ADR 0001. If a decision constrains what others can do, it
gets an ADR.
