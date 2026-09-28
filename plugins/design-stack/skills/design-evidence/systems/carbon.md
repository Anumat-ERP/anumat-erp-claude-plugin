# IBM Carbon

## What it is for

Enterprise software: data-dense applications used by domain experts for long
stretches, where the job is to see and act on a great deal of information.

## Core conventions

- **The data table is the centrepiece.** Carbon's table is the most thoroughly
  specified in any public system — sorting, selection, batch actions, expansion,
  nested rows, sticky headers, density modes, pagination, and every combination
  of them. Read it before building any table; see `patterns/data-table.md`.
- **Multiple density modes as a first-class feature.** Table rows come in
  defined heights and the user can switch. This treats density as a user
  preference rather than a designer's guess, which is correct for tools whose
  audience spans novices and experts.
- **A strict 2x grid** — an 8px base with a 16px column gutter — applied
  consistently, which is what lets dense layouts stay legible.
- **Notifications with defined severity levels** and clear rules about inline vs
  toast vs banner, a question most systems leave vague.
- **Progressive disclosure** as an explicit strategy for managing complexity
  rather than an excuse for hiding things.
- **Accessibility as a floor, not a goal.** Carbon's components ship with
  keyboard and screen-reader support that is genuinely complete, and IBM
  publishes its conformance.
- **AI-specific patterns** in recent versions — how to present generated
  content, confidence, and provenance inside an enterprise tool.

## Where it is opinionated

Grid, density, table behaviour, and notification hierarchy. Carbon is a serious,
restrained system and its guidance assumes you want that; it will resist
attempts to make an interface playful.

## Where it is silent

Consumer patterns, marketing surfaces, mobile-first design, and expressive
brand work.

## Pick it when

Building enterprise software, admin tooling, internal applications, analytics
platforms, or anything where users work through large volumes of records.
Especially when tables are the core of the product.

## Do not pick it when

Building a consumer product or a marketing site — Carbon's restraint reads as
austerity to casual users. Also a poor fit for touch-first mobile, where its
density works against you; see `reference/07-mobile.md`.

## Docs

<https://carbondesignsystem.com> — fetchable.
Storybook: <https://react.carbondesignsystem.com> — see `systems/STORYBOOKS.md`.

Look up: the data table in full, density specifications, notification severity
rules, and the accessibility conformance notes on any component you adopt.
