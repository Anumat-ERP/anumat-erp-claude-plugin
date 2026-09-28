# Storybooks

*The INVENTORY stage's reference. Part 1 is about this project. Part 2 is about
everyone else's. The order matters.*

---

# Part 1 — The project's own Storybook, checked first

**This outranks every other source in this plugin.** A repo with a Storybook
has already published its component inventory, its real prop surface, and its
usage rules. Reading it costs one directory listing. Skipping it means
importing conventions the team may have already decided against — and an
imported convention that contradicts the house system is worse than no
convention at all, because it makes the product internally inconsistent in a
way no individual screen reveals.

## Detecting one

| Signal | Look for |
|---|---|
| Storybook config | `.storybook/` at the repo or package root |
| Stories | `**/*.stories.{ts,tsx,js,jsx,mdx,svelte,vue}` |
| Script | a `storybook` or `build-storybook` entry in `package.json` |
| Component package | `packages/ui`, `packages/design-system`, `src/components` |
| Tokens | `tokens.json`, `theme.ts`, `tailwind.config.*`, `*.tokens.css` |

No Storybook does not mean no system. A component directory with no stories is
still the inventory; it is just harder to read. Check for a tokens file
independently — plenty of projects have tokens and no component library.

## What to extract, and why each matters

**The component list.** This is the available inventory. Build nothing that
already exists. Rebuilding an existing component is the most common and most
expensive form of this failure, because the duplicate then drifts from the
original and the product has two buttons that behave differently.

**`args`, `argTypes`, and prop types.** This is the real API, and it is
frequently narrower than the docs suggest. A `Button` with three variants has
three variants — proposing a fourth is a change to the design system, not a
detail of your screen, and should be raised as such.

**Docs pages (`*.mdx`, the Docs tab).** These carry usage rules and do/don't
pairs, which encode decisions the team already argued about. "Use a secondary
button, never two primaries in a row" is a settled question; re-opening it in
your screen wastes everyone's time and produces an inconsistent product.

**Story variants.** The stories a team wrote enumerate the states they consider
real. If `EmptyState`, `Loading`, and `Error` stories exist for a component,
those are supported and you should use them. If they do not exist, you have
found a gap — see below.

## The rules

1. **A component that exists gets reused, not rebuilt.**
2. **A gap gets named out loud before it is filled.** Adding to someone's
   design system is a decision, not an implementation detail. Say "this needs a
   component that does not exist yet; here is what it would be and where it
   would live" before writing it.
3. **The house system wins every conflict** with anything in this plugin. If
   `systems/carbon.md` says one thing and the project's Storybook says another,
   the Storybook is correct for this project.
4. **Check the tokens before writing any value.** If the project has a spacing
   scale, use it — see `reference/01-foundations.md`.

---

# Part 2 — Public Storybooks, for studying decomposition

These are **fetchable**. Their value is not the components themselves; it is
the *decomposition*. A Storybook shows how a mature team splits a product into
primitives and composes upward:

```
Button → Field → Form → Modal → Table → Page
```

That structure is invisible in a screenshot and is exactly what gets guessed at
otherwise. Reading one real inventory teaches more about where component
boundaries belong than any amount of reasoning in the abstract — see
`reference/04-components.md` on the composition ladder.

| Storybook | URL | Strongest for |
|---|---|---|
| Storybook Showcase | https://storybook.js.org/showcase | finding more of these |
| Fluent UI | https://react.fluentui.dev | desktop density, command surfaces, overflow behaviour |
| Carbon | https://react.carbondesignsystem.com | data tables, enterprise forms, the most complete table API in public |
| Primer | https://primer.style/components | developer-tool patterns, keyboard-first components |
| Grafana UI | https://developers.grafana.com/ui | dashboard and time-series controls |
| Adobe Spectrum | https://react-spectrum.adobe.com | accessibility depth, collections, drag and drop |
| Chakra UI | https://chakra-ui.com/docs/components | composable primitives, style-prop API design |
| Elastic EUI | https://eui.elastic.co | search, filtering, and query-builder components |

## How to read one efficiently

1. **The sidebar tree first.** It is the inventory and the decomposition, and
   it answers most questions on its own. Read it before opening any story.
2. **The Docs tab** for a component you are copying. Usage rules and do/don't
   pairs live there, not in the rendered example.
3. **The Controls panel** for the real API surface — every prop, its type, and
   its default.
4. **Individual stories last**, and only for the component you actually need.

Do not read a public Storybook front to back. The tree plus two components is
almost always the whole useful yield.

## What not to take

Visual style. These systems have strong identities that belong to Microsoft,
IBM, GitHub, Adobe. Take the structure, the API shape, the state coverage, and
the naming — leave the appearance to the `frontend-design` skill.
