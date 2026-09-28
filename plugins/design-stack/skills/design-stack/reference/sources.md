# Sources

*Read this when looking for an external reference to study. This is what
`/design-stack:sources` prints.*

The split below is the whole point of this file. Getting it wrong means either
wasting a fetch on a login wall, or — much worse — citing a site as though you
had read it.

**Before anything here: if the project has its own Storybook, component
library, or token file, that outranks every source on this page.** See
`${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/STORYBOOKS.md`.

---

## Agent-fetchable

Public documentation. Claude can read these directly.

### Design systems

| Source | URL | Good for |
|---|---|---|
| Apple HIG | https://developer.apple.com/design/human-interface-guidelines | native Apple platform conventions |
| Material Design | https://m3.material.io | cross-platform mobile, elevation, theming |
| Microsoft Fluent | https://fluent2.microsoft.design | desktop density, command surfaces |
| IBM Carbon | https://carbondesignsystem.com | enterprise data density, tables |
| Shopify Polaris | https://polaris.shopify.com | merchant admin, resource lists |
| GitHub Primer | https://primer.style | developer tooling, keyboard-first |
| Atlassian | https://atlassian.design | issue tracking, nested hierarchy |
| GOV.UK | https://design-system.service.gov.uk | forms, errors, plain language |

Profiles and a chooser are in `systems/` — read those first; these URLs are for
depth on a specific question.

### Public Storybooks

Component inventories you can inspect directly. A Storybook shows how a mature
team *decomposes* a product, which a screenshot cannot.

| Source | URL |
|---|---|
| Storybook Showcase | https://storybook.js.org/showcase |
| Fluent UI | https://react.fluentui.dev |
| Carbon | https://react.carbondesignsystem.com |
| Primer | https://primer.style/components |
| Grafana UI | https://developers.grafana.com/ui |
| Adobe Spectrum | https://react-spectrum.adobe.com |
| Chakra UI | https://chakra-ui.com/docs/components |
| Elastic EUI | https://eui.elastic.co |

How to read one efficiently: `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/STORYBOOKS.md`.

### Principles and research

| Source | URL | Good for |
|---|---|---|
| Laws of UX | https://lawsofux.com | interaction psychology, named principles |
| Nielsen Norman Group | https://nngroup.com/articles | usability research with evidence |
| Inclusive Components | https://inclusive-components.design | accessible component patterns, in depth |

### Component libraries

| Source | URL | Good for |
|---|---|---|
| shadcn/ui | https://ui.shadcn.com | readable source; a good React baseline |
| Radix Primitives | https://radix-ui.com/primitives | accessible unstyled behaviour |
| React Aria | https://react-spectrum.adobe.com/react-aria | accessible behaviour, hooks |
| Base UI | https://base-ui.com | unstyled primitives |

### Accessibility

| Source | URL | Good for |
|---|---|---|
| WAI-ARIA APG | https://w3.org/WAI/ARIA/apg | keyboard contracts per pattern — the reference |
| WebAIM | https://webaim.org | contrast checker, practical guidance |
| A11Y Project | https://a11yproject.com | checklists |

### Motion

| Source | URL |
|---|---|
| Motion | https://motion.dev |
| Transitions.dev | https://transitions.dev |

### Colour, type, icons

| Source | URL |
|---|---|
| Type Scale | https://typescale.com |
| Realtime Colors | https://realtimecolors.com |
| Coolors | https://coolors.co |
| Lucide | https://lucide.dev |
| Phosphor | https://phosphoricons.com |
| Iconify | https://icon-sets.iconify.design |

---

## Gated — Claude cannot open these

Login-walled or paywalled. A fetch returns a sign-in page, not content.

**Do not cite these as if you had read them.** To use one, ask the user to
browse it and paste screenshots; then design from what the screenshots actually
show, and say that is what you are working from. Recommending one is useful;
claiming to have consulted it is not.

| Source | Good for |
|---|---|
| Mobbin | real mobile and web screens, complete flows, searchable by pattern |
| Refero | real product UI, organised by screen type |
| Page Flows | recorded user flows — signup, onboarding, checkout, cancellation |
| Screenlane | mobile UI patterns |
| SaaSFrame | SaaS product and landing-page examples |
| UX Archive | common flows across apps |

The distilled substance of this category is already in
`${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/` — that is what those
playbooks are made of. Send the user here when you need something current,
something niche, or a specific competitor.

---

## Public, but low-yield to fetch

These **are** reachable — the reason not to fetch them is different, and worth
being precise about. Their value is in the pixels: a gallery page gives you
thumbnails, titles, and outbound links, so fetching one costs tokens and
returns almost none of what makes it useful.

| Source | Good for |
|---|---|
| Awwwards | experimental and creative web |
| Godly | high-quality web design |
| Land-book | landing pages |
| SiteInspire | curated sites |
| Dribbble | visual ideas — often concepts, not shipped products |
| Behance | full case studies, which *do* carry readable text |

Fetch one when the user asks, or when a specific page has written content worth
reading. Otherwise ask for screenshots, which is what you actually need.

Use all of these for visual direction rather than UX truth: a showcase entry is
selected for how it photographs, not for how it performed. Aesthetic direction
is the `frontend-design` skill's call in any case.
