# Shopify Polaris

## What it is for

SaaS admin and merchant-facing tools: products where someone runs a business
inside your interface. Competent users, not technical ones.

## Core conventions

- **Resource lists and index tables.** Polaris distinguishes a list of rich
  objects from a table of records and gives each its own pattern, with
  filtering, sorting, bulk actions, and saved views built in. Most products need
  both and conflate them.
- **The page header contract** — title, breadcrumb, primary action, secondary
  actions, status badge — applied consistently, so users always know where they
  are and what the main action is.
- **Cards as the unit of grouping**, with a specified relationship between card,
  section, and page. Simple, and it scales.
- **Settings at scale.** Polaris has real guidance for products with a hundred
  settings, which is where most systems stop helping; see
  `patterns/settings.md`.
- **Content guidelines that are unusually good.** Polaris specifies voice,
  button labelling, error wording, and how to write for a non-technical
  business user. This is the most borrowable part of the system and applies
  regardless of which system you otherwise pick.
- **Banners and toasts with clear rules** about which to use for what severity
  and persistence.

## Where it is opinionated

Page structure, resource list behaviour, content voice, and the card model.
Polaris assumes a merchant-admin shape — a list of things, a detail view, an
action — and fits products of that shape very well.

## Where it is silent

Consumer-facing surfaces, marketing, data visualisation, real-time interfaces,
and desktop-tool patterns like panels, canvases, or command surfaces.

## Pick it when

Building a SaaS admin, a back-office tool, a multi-tenant dashboard, or any
product whose users are operating a business rather than doing engineering. The
fit is strongest when the product is mostly lists, detail views, and settings.

Borrow its **content guidelines even if you pick another system** — they are
the best public writing standards for product UI.

## Do not pick it when

Building a developer tool (`systems/primer.md` fits better), a data-analysis
product (`systems/carbon.md`), or a consumer mobile app
(`systems/material.md`). Polaris also carries visible Shopify character, so
strip the visual identity and take the structure — appearance is the
`frontend-design` skill's call.

## Docs

<https://polaris.shopify.com> — fetchable.

Look up: resource list vs index table, the page header contract, settings
patterns, and the content guidelines section in full.
