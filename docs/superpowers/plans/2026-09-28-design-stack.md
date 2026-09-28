# design-stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a global Claude Code plugin marketplace at `E:\Chamrong\Project\claude-plugins` whose first plugin, `design-stack`, gives Claude canonical screen structure, design-system selection, and a hard gate on interface states.

**Architecture:** A git repo that *is* a marketplace: `.claude-plugin/marketplace.json` at the root lists plugins living under `plugins/`. `design-stack` ships two skills — `design-stack` (the pipeline, with 11 reference files) and `design-evidence` (10 screen playbooks, 8 design-system profiles, 1 chooser) — plus 4 commands. All content is markdown; the only executable code is a structural validator that every task runs as its test.

**Tech Stack:** Markdown, JSON, Python 3 stdlib (validator only), git. No runtime dependencies, no npm, no MCP server.

**Spec:** `docs/superpowers/specs/2026-09-28-design-stack-design.md`

## Global Constraints

Copied verbatim from spec §9 and §2. Every task's requirements include these.

- **Generic.** No project names, no employer-specific conventions, no paths from any one repo. Banned substrings, case-insensitive: `fueni`, `nazounki`, `fueni-api`, `fueni-apps`, `spring modulith`.
- **Stack-agnostic.** Principle first; framework syntax only as illustration, labelled as such. Guidance must hold for Vue, Svelte, SwiftUI, Compose, and plain CSS.
- **Progressive disclosure.** `SKILL.md` bodies stay short and route outward. Hard caps: `design-stack/SKILL.md` body ≤ 150 lines, `design-evidence/SKILL.md` body ≤ 80 lines (body = everything after the closing frontmatter `---`).
- **No aesthetic instructions.** If a sentence is about beauty rather than structure, it belongs to `frontend-design` — cut it and name where it went.
- **Reasoned, not asserted.** Every convention states why it exists.
- **Honest about sources.** Never imply Claude can read a login-walled site (Mobbin, Refero, Page Flows, Dribbble, Awwwards, SaaSFrame).
- **The six states** are fixed and always named in this order: `empty · loading · error · permission · overflow · offline`.
- **Version** `0.1.0` in both manifests. **Licence** MIT. **Marketplace name** `chamrong`. **Author** `Chamrong Thor <thorchamrong.dev@gmail.com>`.
- **Line endings:** repo is `.gitattributes`-pinned to LF for `*.md` and `*.json` so the manifests parse identically on any host.

## Review Focus

Five failure modes the spec implies that no task's happy path exercises, most likely first. Each has a test assigned to the task that owns the code.

1. **Over-triggering.** `"make this button slightly rounder"` loads the skill and burns context on every trivial styling request. → tested in Task 2, Step 6.
2. **Under-triggering on indirect phrasing.** `"users need a way to manage notification preferences"` is a settings screen but never says "design" or "UI". → tested in Task 2, Step 6.
3. **Dangling playbook reference.** `SKILL.md` routes to `patterns/search-filter.md`; the file is absent; Claude proceeds inventing structure and never says it had no evidence. → validator check `refs`, first enforced in Task 2, Step 2.
4. **Contradiction with `frontend-design`.** Both skills load together and issue conflicting instructions on typography or colour. → validator check `aesthetics` (banned aesthetic vocabulary in `design-stack` files), first enforced in Task 4, plus the explicit deferral line asserted in Task 2, Step 4.
5. **Install failure from Windows paths or CRLF.** `marketplace.json` committed as CRLF, or a backslash path in `source`, breaks `/plugin marketplace add`. → validator check `manifests` (forward-slash `source`, LF enforced via `.gitattributes`), Task 1; end-to-end install in Task 11.

---

## File Structure

```
claude-plugins/
├── .gitattributes                       T1
├── .gitignore                           T1
├── .claude-plugin/marketplace.json      T1
├── LICENSE                              T1
├── README.md                            T11
├── scripts/validate.py                  T1 (extended T2, T4, T7)
├── docs/superpowers/{specs,plans}/      done
└── plugins/design-stack/
    ├── .claude-plugin/plugin.json       T1
    ├── README.md                        T11
    ├── commands/
    │   ├── brief.md                     T10
    │   ├── research.md                  T10
    │   ├── review.md                    T10
    │   └── sources.md                   T10
    └── skills/
        ├── design-stack/
        │   ├── SKILL.md                 T2
        │   └── reference/
        │       ├── 01-foundations.md    T3
        │       ├── 02-layout.md         T3
        │       ├── 03-typography.md     T3
        │       ├── 04-components.md     T4
        │       ├── 05-forms.md          T4
        │       ├── 06-dashboard.md      T5
        │       ├── 07-mobile.md         T5
        │       ├── 08-motion.md         T5
        │       ├── 09-accessibility.md  T6
        │       ├── 10-design-review.md  T6
        │       └── sources.md           T6
        └── design-evidence/
            ├── SKILL.md                 T7
            ├── systems/
            │   ├── CHOOSING.md          T7
            │   ├── apple-hig.md         T7
            │   ├── material.md          T7
            │   ├── fluent.md            T7
            │   ├── carbon.md            T7
            │   ├── polaris.md           T7
            │   ├── primer.md            T7
            │   ├── atlassian.md         T7
            │   └── govuk.md             T7
            └── patterns/
                ├── states.md            T8
                ├── settings.md          T8
                ├── data-table.md        T8
                ├── dashboard.md         T8
                ├── navigation.md        T8
                ├── onboarding.md        T9
                ├── auth.md              T9
                ├── search-filter.md     T9
                ├── billing.md           T9
                └── desktop-app.md       T9
```

**Responsibility split:** `scripts/validate.py` owns every structural invariant, so each content task has a real red-green cycle instead of eyeballing markdown. `design-stack/reference/` owns cross-cutting rules that apply to any screen. `design-evidence/patterns/` owns per-screen-type structure. `design-evidence/systems/` owns borrowed conventions. Nothing appears in two places; where a reference file needs a playbook's detail, it links rather than restates.

---

## Task 1: Marketplace skeleton and validator

**Files:**
- Create: `scripts/validate.py`
- Create: `.claude-plugin/marketplace.json`
- Create: `plugins/design-stack/.claude-plugin/plugin.json`
- Create: `LICENSE`
- Create: `.gitattributes`
- Create: `.gitignore`

**Interfaces:**
- Consumes: nothing.
- Produces: `python scripts/validate.py` → exits `0` on success, `1` on failure, printing one `FAIL: <check>: <message>` line per problem and a final `<n> checks passed` / `<n> errors`. Named checks so far: `manifests`. Later tasks add checks `frontmatter`, `refs`, `orphans`, `banned`, `length`, `aesthetics`.

- [ ] **Step 1: Write the failing test — the validator itself**

Create `scripts/validate.py`:

```python
#!/usr/bin/env python3
"""Structural validator for the chamrong plugin marketplace.

Run from anywhere:  python scripts/validate.py
Exit 0 = all checks pass. Exit 1 = at least one failure.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

ERRORS: list[str] = []
PASSED: list[str] = []


def fail(check: str, message: str) -> None:
    ERRORS.append(f"FAIL: {check}: {message}")


def ok(check: str) -> None:
    PASSED.append(check)


def rel(path: Path) -> str:
    try:
        return str(path.relative_to(ROOT)).replace("\\", "/")
    except ValueError:
        return str(path)


def load_json(path: Path, check: str):
    if not path.exists():
        fail(check, f"missing file {rel(path)}")
        return None
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        fail(check, f"invalid JSON in {rel(path)}: {exc}")
        return None


def check_manifests() -> list[Path]:
    """Validate marketplace.json and every plugin.json it points at.

    Returns the list of plugin directories found, for later checks.
    """
    check = "manifests"
    plugin_dirs: list[Path] = []

    market = load_json(ROOT / ".claude-plugin" / "marketplace.json", check)
    if market is None:
        return plugin_dirs

    for field in ("name", "owner", "plugins"):
        if field not in market:
            fail(check, f"marketplace.json missing required field '{field}'")
    if market.get("name") != "chamrong":
        fail(check, f"marketplace name must be 'chamrong', got {market.get('name')!r}")

    for entry in market.get("plugins", []):
        name = entry.get("name", "<unnamed>")
        source = entry.get("source")
        if not isinstance(source, str):
            fail(check, f"plugin {name}: 'source' must be a relative path string")
            continue
        if "\\" in source:
            fail(check, f"plugin {name}: 'source' must use forward slashes, got {source!r}")
            continue
        if not source.startswith("./"):
            fail(check, f"plugin {name}: 'source' must start with './', got {source!r}")
            continue

        pdir = (ROOT / source[2:]).resolve()
        if not pdir.is_dir():
            fail(check, f"plugin {name}: source dir {source} does not exist")
            continue
        plugin_dirs.append(pdir)

        manifest = load_json(pdir / ".claude-plugin" / "plugin.json", check)
        if manifest is None:
            continue
        if manifest.get("name") != name:
            fail(
                check,
                f"plugin {name}: plugin.json name is {manifest.get('name')!r}, "
                f"must match marketplace entry",
            )
        if manifest.get("version") != entry.get("version"):
            fail(
                check,
                f"plugin {name}: version mismatch — marketplace "
                f"{entry.get('version')!r} vs plugin.json {manifest.get('version')!r}",
            )

    if not any(e.startswith(f"FAIL: {check}") for e in ERRORS):
        ok(check)
    return plugin_dirs


def main() -> int:
    check_manifests()

    for line in ERRORS:
        print(line)
    if ERRORS:
        print(f"\n{len(ERRORS)} error(s)")
        return 1
    print(f"{len(PASSED)} check(s) passed: {', '.join(PASSED)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: exit 1, prints `FAIL: manifests: missing file .claude-plugin/marketplace.json`

- [ ] **Step 3: Write the minimal content to make it pass**

Create `.claude-plugin/marketplace.json`:

```json
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "chamrong",
  "owner": {
    "name": "Chamrong Thor",
    "email": "thorchamrong.dev@gmail.com"
  },
  "metadata": {
    "description": "Personal Claude Code plugins."
  },
  "plugins": [
    {
      "name": "design-stack",
      "description": "Design research and evidence layer for UI work: canonical screen playbooks, design-system selection, and a hard gate on interface states.",
      "source": "./plugins/design-stack",
      "category": "design",
      "version": "0.1.0",
      "author": {
        "name": "Chamrong Thor",
        "email": "thorchamrong.dev@gmail.com"
      },
      "tags": ["design", "ui", "ux", "patterns", "design-systems", "accessibility"]
    }
  ]
}
```

Create `plugins/design-stack/.claude-plugin/plugin.json`:

```json
{
  "name": "design-stack",
  "description": "Design research and evidence layer for UI work: canonical screen playbooks, design-system selection, and a hard gate on interface states.",
  "version": "0.1.0",
  "author": {
    "name": "Chamrong Thor",
    "email": "thorchamrong.dev@gmail.com"
  },
  "skills": "./skills/",
  "commands": "./commands/"
}
```

Create `.gitattributes`:

```
* text=auto eol=lf
*.md   text eol=lf
*.json text eol=lf
*.py   text eol=lf
```

Create `.gitignore`:

```
__pycache__/
*.pyc
.DS_Store
Thumbs.db
```

Create `LICENSE` — the standard MIT text, `Copyright (c) 2026 Chamrong Thor`.

- [ ] **Step 4: Run it to make sure it passes**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: exit 0, prints `1 check(s) passed: manifests`

- [ ] **Step 5: Verify the version-mismatch guard actually fires**

Temporarily change `version` in `plugin.json` to `"0.2.0"`, run the validator.
Expected: exit 1, `FAIL: manifests: plugin design-stack: version mismatch — marketplace '0.1.0' vs plugin.json '0.2.0'`.
Revert to `"0.1.0"` and re-run; expected exit 0.

This proves the check is live rather than vacuously passing.

- [ ] **Step 6: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add .gitattributes LICENSE scripts/validate.py .claude-plugin/marketplace.json plugins/design-stack/.claude-plugin/plugin.json
git commit -m "feat: marketplace skeleton and structural validator"
```

---

## Task 2: `design-stack` SKILL.md and frontmatter/reference validation

**Files:**
- Create: `plugins/design-stack/skills/design-stack/SKILL.md`
- Modify: `scripts/validate.py` — add checks `frontmatter`, `length`, `refs`

**Interfaces:**
- Consumes: `check_manifests()` returns `list[Path]` of plugin dirs.
- Produces: `check_skills(plugin_dirs)`, which parses every `skills/*/SKILL.md`, and the module constant `SKILL_BODY_MAX: dict[str, int]`. Later tasks rely on `refs` failing when a `reference/`, `patterns/`, or `systems/` path named in a skill body has no file on disk.

- [ ] **Step 1: Write the failing test — extend the validator**

Add to `scripts/validate.py`, above `main()`:

```python
import re

SKILL_BODY_MAX = {"design-stack": 150, "design-evidence": 80}

# Matches reference/foo.md, patterns/foo.md, systems/FOO.md in skill bodies,
# whether written bare, in backticks, or as a markdown link target.
REF_PATTERN = re.compile(r"(?:reference|patterns|systems)/[A-Za-z0-9._-]+\.md")


def parse_frontmatter(path: Path, check: str):
    """Return (frontmatter dict, body str). Body excludes the frontmatter block."""
    text = path.read_text(encoding="utf-8")
    match = re.match(r"^---\r?\n(.*?)\r?\n---\r?\n(.*)$", text, re.DOTALL)
    if not match:
        fail(check, f"{rel(path)} has no YAML frontmatter block")
        return None, text
    front: dict[str, str] = {}
    for line in match.group(1).splitlines():
        if line.startswith((" ", "\t")) or ":" not in line:
            continue
        key, value = line.split(":", 1)
        front[key.strip()] = value.strip()
    return front, match.group(2)


def check_skills(plugin_dirs: list[Path]) -> None:
    fm_check, len_check, ref_check = "frontmatter", "length", "refs"
    found_any = False

    for pdir in plugin_dirs:
        skills_root = pdir / "skills"
        if not skills_root.is_dir():
            fail(fm_check, f"{rel(pdir)} has no skills/ directory")
            continue

        for skill_dir in sorted(p for p in skills_root.iterdir() if p.is_dir()):
            found_any = True
            skill_md = skill_dir / "SKILL.md"
            if not skill_md.exists():
                fail(fm_check, f"{rel(skill_dir)} has no SKILL.md")
                continue

            front, body = parse_frontmatter(skill_md, fm_check)
            if front is None:
                continue

            for field in ("name", "description"):
                if not front.get(field):
                    fail(fm_check, f"{rel(skill_md)} frontmatter missing '{field}'")
            if front.get("name") != skill_dir.name:
                fail(
                    fm_check,
                    f"{rel(skill_md)} frontmatter name {front.get('name')!r} "
                    f"must match directory name {skill_dir.name!r}",
                )
            if len(front.get("description", "")) < 40:
                fail(
                    fm_check,
                    f"{rel(skill_md)} description is too short to trigger reliably "
                    f"({len(front.get('description', ''))} chars, need 40+)",
                )

            cap = SKILL_BODY_MAX.get(skill_dir.name)
            body_lines = len(body.strip().splitlines())
            if cap is not None and body_lines > cap:
                fail(
                    len_check,
                    f"{rel(skill_md)} body is {body_lines} lines, cap is {cap} "
                    f"— move detail into a reference file",
                )

            for ref in sorted(set(REF_PATTERN.findall(body))):
                if not (skill_dir / ref).exists():
                    fail(ref_check, f"{rel(skill_md)} routes to {ref}, which does not exist")

    if not found_any:
        fail(fm_check, "no skills found in any plugin")

    for check in (fm_check, len_check, ref_check):
        if not any(e.startswith(f"FAIL: {check}") for e in ERRORS):
            ok(check)
```

Change `main()` to:

```python
def main() -> int:
    plugin_dirs = check_manifests()
    check_skills(plugin_dirs)

    for line in ERRORS:
        print(line)
    if ERRORS:
        print(f"\n{len(ERRORS)} error(s)")
        return 1
    print(f"{len(PASSED)} check(s) passed: {', '.join(PASSED)}")
    return 0
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: exit 1, `FAIL: frontmatter: plugins/design-stack has no skills/ directory` and `FAIL: frontmatter: no skills found in any plugin`

- [ ] **Step 3: Write `SKILL.md`**

Create `plugins/design-stack/skills/design-stack/SKILL.md`. Frontmatter:

```yaml
---
name: design-stack
description: Use when designing or building any screen, page, form, dashboard, data table, admin panel, or app flow, and when restructuring existing UI — supplies canonical screen structure from shipped products, selects the right design system for the domain, and requires every interface state to be handled. Not for pure styling tweaks or post-build polish.
---
```

Body — **≤ 150 lines**, in this order:

1. **Title + one-paragraph framing.** Claude's UI output is generic because it *invents* structure instead of recalling it, applies one visual language to every domain, and builds only the happy path. This skill fixes the first and third by supplying evidence and a gate.
2. **Boundary block.** A three-row table stating what this skill does *not* do and who does it: aesthetics → `frontend-design`; craft audit and polish → `impeccable`; chart colour and encoding → the `dataviz` skill. State explicitly: *when `frontend-design` is also loaded, it wins on every question of appearance; this skill only constrains structure, content order, and states.* (Review Focus item 4.)
3. **The pipeline** as a fenced block, verbatim from spec §6, with one line of gloss per stage.
4. **Stage detail, one short paragraph each:**
   - BRIEF — four questions: who, what problem, what is explicitly out of scope, what observable change means success. For anything beyond a single component, run `/design-stack:brief` instead of improvising.
   - EVIDENCE — read `patterns/<screen-type>.md` from the `design-evidence` skill *before* proposing structure. If no playbook matches, say so out loud, name the nearest structural analogue, and use it — never invent silently. (Review Focus item 3.)
   - SYSTEM — pick exactly one from `systems/CHOOSING.md` and state why in one sentence. Borrowing conventions, not visual identity.
   - STATES — the gate. All six named, in order, each answered concretely for this screen. Definitions live in `patterns/states.md`.
   - BUILD — structure from above; appearance from `frontend-design`.
   - REVIEW — `reference/10-design-review.md`, or `/design-stack:review`.
5. **The states gate, called out as its own section.** `empty · loading · error · permission · overflow · offline`. State the rule: *a screen is not designed until all six are answered; "not applicable" is a valid answer only with a stated reason.* Explain why — shipping only the happy path is the single largest gap between generated UI and shipped UI.
6. **Reference index** — a table of the 11 `reference/*.md` files with a one-line "read this when…" trigger for each. Paths written as `reference/01-foundations.md` so the `refs` check sees them.
7. **When not to use this skill** — a styling tweak to an existing component, a copy change, a bug fix that does not alter structure. Naming the negative case is what stops over-triggering. (Review Focus item 1.)

Constraint reminder: no colour values, no font recommendations, no "make it feel premium". Every rule states its reason.

- [ ] **Step 4: Assert the deferral line exists**

Run: `cd "E:/Chamrong/Project/claude-plugins" && grep -c "frontend-design" plugins/design-stack/skills/design-stack/SKILL.md`
Expected: `2` or more — the boundary table row and the BUILD stage both name it. If `0`, the skill will contradict `frontend-design` in a shared context window. (Review Focus item 4.)

- [ ] **Step 5: Run the validator**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: exit 1, with `FAIL: refs:` lines for each of the 11 `reference/*.md` files that do not exist yet. This is the correct failure — it proves the `refs` check works and hands Tasks 3–6 their to-do list. (Review Focus item 3.)

- [ ] **Step 6: Trigger-wording review**

This is a judgement step, not a script. Read the `description` frontmatter back and answer three questions in the commit body:

- Does `"make this button slightly rounder"` match it? It must **not** — the description ends with an explicit exclusion.
- Does `"users need a way to manage notification preferences"` match it? It must — `"app flow"` and `"any screen"` cover indirect phrasing that never says "design".
- Does `"add a page that lists invoices"` match it? It must — `"page"` is named.

If any answer is wrong, revise the description and re-check. (Review Focus items 1 and 2.)

- [ ] **Step 7: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add scripts/validate.py plugins/design-stack/skills/design-stack/SKILL.md
git commit -m "feat: design-stack skill body and frontmatter/refs validation

Validator now fails on the 11 unwritten reference files, which is the
intended red state for tasks 3-6.

Trigger review:
- 'make this button rounder'      -> no match (excluded)
- 'manage notification prefs'     -> match (app flow)
- 'add a page that lists invoices'-> match (page)"
```

---

## Task 3: Reference files — foundations, layout, typography

**Files:**
- Create: `plugins/design-stack/skills/design-stack/reference/01-foundations.md`
- Create: `plugins/design-stack/skills/design-stack/reference/02-layout.md`
- Create: `plugins/design-stack/skills/design-stack/reference/03-typography.md`

**Interfaces:**
- Consumes: the reference index in `SKILL.md` (Task 2) — filenames must match exactly.
- Produces: three files the `refs` check stops complaining about. `01-foundations.md` defines the token vocabulary (`space`, `radius`, `elevation`, `surface`, `density`) that Tasks 4–6 refer to by name rather than redefining.

Every file in this task and Tasks 4–6 follows one shape: `# Title`, a one-line *read this when* trigger, then `## ` sections, then a closing `## Common failures` list. Target 120–200 lines each.

- [ ] **Step 1: Write `01-foundations.md`**

Sections and required content:

- **Spacing** — one geometric scale, why a scale beats ad-hoc values (consistency is perceptible even when the individual value is not), how to choose the base step, when to break the scale.
- **Radius hierarchy** — nested radii must decrease inward; the rule `inner = outer − padding`, and why mismatched radii read as sloppy.
- **Elevation and surface** — depth as a hierarchy of *layers*, not a shadow library. Three levels are usually enough: base, raised, overlay. Why more levels stop communicating.
- **Density** — comfortable vs compact; which domains need which; why density is a mode, not a default.
- **Token vocabulary** — the minimum named set any project needs, with the naming convention (role, not value: `surface-raised`, not `gray-50`). Why value-named tokens defeat theming.
- **Common failures.**

Show one worked token set as an illustration, labelled *"expressed here as CSS custom properties; the same set maps to Tailwind theme keys, SwiftUI constants, or Compose tokens."*

- [ ] **Step 2: Write `02-layout.md`**

Sections: grid and column systems · breakpoint strategy (content-driven, not device-driven, and why) · the four app-shell archetypes (sidebar, topbar, split, canvas) with the condition that selects each · content width limits and why unbounded text columns fail · whitespace rhythm and vertical spacing between sections · `## Common failures`.

- [ ] **Step 3: Write `03-typography.md`**

Sections: constructing a type scale · hierarchy by role, not size alone (weight, colour, and spacing carry hierarchy too) · line length and line height, with the serif/sans difference · numerals — when tabular figures are mandatory (any column of numbers, any changing value) · truncation, wrapping, and overflow · `## Common failures`.

Open the file with an explicit deferral: *typeface selection and typographic personality belong to `frontend-design`; this file covers structure only.*

- [ ] **Step 4: Run the validator**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: exit 1, but the `refs` failures for `01-foundations.md`, `02-layout.md`, and `03-typography.md` are **gone**. Eight `refs` failures remain.

- [ ] **Step 5: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add plugins/design-stack/skills/design-stack/reference/
git commit -m "feat: foundations, layout, and typography reference"
```

---

## Task 4: Reference files — components and forms, plus the aesthetics guard

**Files:**
- Create: `plugins/design-stack/skills/design-stack/reference/04-components.md`
- Create: `plugins/design-stack/skills/design-stack/reference/05-forms.md`
- Modify: `scripts/validate.py` — add check `aesthetics`

**Interfaces:**
- Consumes: the token names from `01-foundations.md`.
- Produces: `check_aesthetics(plugin_dirs)`, which scans `skills/design-stack/**/*.md` for aesthetic vocabulary that belongs to `frontend-design`.

- [ ] **Step 1: Write the failing test — the aesthetics guard**

Add to `scripts/validate.py`:

```python
# Vocabulary that belongs to the frontend-design skill, not this one.
# Substring match, case-insensitive, on the design-stack skill only.
AESTHETIC_TERMS = (
    "premium feel",
    "modern look",
    "beautiful",
    "sleek",
    "eye-catching",
    "visually stunning",
    "gorgeous",
    "aesthetically pleasing",
)


def check_aesthetics(plugin_dirs: list[Path]) -> None:
    check = "aesthetics"
    for pdir in plugin_dirs:
        skill_dir = pdir / "skills" / "design-stack"
        if not skill_dir.is_dir():
            continue
        for md in sorted(skill_dir.rglob("*.md")):
            lowered = md.read_text(encoding="utf-8").lower()
            for term in AESTHETIC_TERMS:
                if term in lowered:
                    fail(
                        check,
                        f"{rel(md)} contains aesthetic term {term!r} — "
                        f"appearance guidance belongs to the frontend-design skill",
                    )
    if not any(e.startswith(f"FAIL: {check}") for e in ERRORS):
        ok(check)
```

Call it from `main()` after `check_skills(plugin_dirs)`.

- [ ] **Step 2: Prove the guard fires**

Append the line `This should look beautiful.` to `reference/01-foundations.md`, then run:
`cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: a `FAIL: aesthetics:` line naming `01-foundations.md` and `'beautiful'`.
Remove the line and re-run; that failure is gone.

- [ ] **Step 3: Write `04-components.md`**

For each of button, input, select, modal, toast, tooltip, tabs, card, badge, menu: **anatomy** (the required parts and their order) and **behaviour** (what it must do on keyboard, what it must announce).

Then one shared section, **Interactive states**, listing the seven every interactive element needs — `default · hover · active · focus-visible · disabled · loading · error` — with why `focus-visible` specifically (not `focus`) and why `loading` is a state of the control, not a replacement for it.

Note that these seven are per-*control* states and are distinct from the six per-*screen* states in `patterns/states.md`. Conflating them is a common error.

`## Common failures`.

- [ ] **Step 4: Write `05-forms.md`**

Sections: field grouping and order (related fields adjacent; the order the user thinks in, not the order the database stores) · label placement, and why placeholder-as-label fails · marking required vs optional, and choosing whichever is rarer · validation timing (on blur for format, on submit for cross-field, never on every keystroke) · inline errors next to the field *and* a summary at the top for long forms, with why both · destructive confirmation — what makes a confirmation meaningful rather than reflexive · multi-step forms, progress, and back-navigation · autosave vs explicit save, and how each must signal state.

Cite GOV.UK as the source for the label and error patterns, with its docs URL, noting it is fetchable for depth.

`## Common failures`.

- [ ] **Step 5: Run the validator**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: exit 1; `aesthetics` passes; six `refs` failures remain (`06`–`10` and `sources.md`).

- [ ] **Step 6: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add scripts/validate.py plugins/design-stack/skills/design-stack/reference/
git commit -m "feat: components and forms reference, plus aesthetics guard"
```

---

## Task 5: Reference files — dashboard, mobile, motion

**Files:**
- Create: `plugins/design-stack/skills/design-stack/reference/06-dashboard.md`
- Create: `plugins/design-stack/skills/design-stack/reference/07-mobile.md`
- Create: `plugins/design-stack/skills/design-stack/reference/08-motion.md`

**Interfaces:**
- Consumes: token vocabulary from `01-foundations.md`; the seven control states from `04-components.md`.
- Produces: nothing later tasks depend on structurally; `06-dashboard.md` must defer chart encoding to the `dataviz` skill by name.

- [ ] **Step 1: Write `06-dashboard.md`**

Sections: metric hierarchy — one primary number, supporting context, then detail; why a wall of equal-weight tiles communicates nothing · KPI tile anatomy (value, label, comparison, trend, timeframe) and which parts are optional · the chart-vs-table decision, stated as a rule · filter and date-range placement and persistence · drill-down paths · refresh, staleness, and showing *when* the data is from · `## Common failures`.

Open with the deferral: *chart type selection, colour encoding, and axis treatment belong to the `dataviz` skill; this file covers dashboard structure only.*

- [ ] **Step 2: Write `07-mobile.md`**

Sections: touch target minimums and the reason (finger contact area, not pixel precision) · thumb zones and what belongs where · navigation patterns — tab bar vs drawer vs stack, and the condition selecting each · gestures and the discoverability problem, with the rule that a gesture must always have a visible equivalent · safe areas and notches · where iOS and Android genuinely diverge, and where treating them the same is fine · `## Common failures`.

- [ ] **Step 3: Write `08-motion.md`**

Sections: duration and easing scales, with why fast-out/slow-in matches physical expectation · what earns motion — showing what changed, where something came from, that work is in progress — and what does not · enter/exit and shared-element transitions · loading choreography, and why a skeleton that mismatches the loaded layout is worse than none · `prefers-reduced-motion` as a requirement, with what "reduced" means concretely (cross-fade, not zero) · `## Common failures`.

- [ ] **Step 4: Run the validator**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: exit 1; three `refs` failures remain (`09`, `10`, `sources.md`).

- [ ] **Step 5: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add plugins/design-stack/skills/design-stack/reference/
git commit -m "feat: dashboard, mobile, and motion reference"
```

---

## Task 6: Reference files — accessibility, review checklist, sources

**Files:**
- Create: `plugins/design-stack/skills/design-stack/reference/09-accessibility.md`
- Create: `plugins/design-stack/skills/design-stack/reference/10-design-review.md`
- Create: `plugins/design-stack/skills/design-stack/reference/sources.md`

**Interfaces:**
- Consumes: everything in `01`–`08`; `10-design-review.md` audits against those rules and cites them by filename.
- Produces: `10-design-review.md` is the contract `/design-stack:review` executes in Task 10 — its section order defines the command's output order. `sources.md` backs `/design-stack:sources`.

- [ ] **Step 1: Write `09-accessibility.md`**

Sections: semantic structure first, and why a `div` with a click handler fails in ways CSS cannot fix · the keyboard path — tab order, focus traps in modals, skip links · `focus-visible` styling that survives a design review · contrast thresholds for text, large text, and non-text UI · ARIA only where semantics fall short, with the first rule of ARIA stated plainly · announcing async change (live regions, and which politeness level) · form labelling and error association · a concrete testing checklist someone can run in ten minutes · `## Common failures`.

Cite WAI-ARIA Authoring Practices with its URL, noting it is fetchable.

- [ ] **Step 2: Write `10-design-review.md`**

This file is a *procedure*, not prose. Ordered sections, each with concrete checks and the reference file it enforces:

1. **States coverage** — all six, per screen. Blocking.
2. **Keyboard path** — every action reachable, focus visible, no traps. Blocking.
3. **Contrast** — text and non-text. Blocking.
4. **Responsive behaviour** — smallest supported width, no horizontal scroll, no clipped content.
5. **System consistency** — does it follow the design system that was chosen, and was one chosen at all?
6. **Structure** — section order against the relevant playbook.
7. **Copy** — labels, errors, and empty-state text; whether an error says what to do next.

Specify the output format: findings ordered by severity, each naming file, line, the rule, and the reference file it comes from. Blocking findings listed first and labelled as blocking.

- [ ] **Step 3: Write `sources.md`**

Two top-level sections, and the split is the point of the file.

**Agent-fetchable** — Claude may read these directly. Grouped: design systems (Apple HIG, Material, Fluent, Carbon, Polaris, Primer, Atlassian, GOV.UK) · principles (Laws of UX, Nielsen Norman) · components (shadcn/ui, Radix, React Aria, Base UI) · accessibility (WAI-ARIA APG, WebAIM, A11Y Project) · motion (Motion, Transitions.dev) · colour, type, icons (Type Scale, Realtime Colors, Coolors, Lucide, Phosphor, Iconify).

**Human-only — Claude cannot open these.** Mobbin, Refero, Page Flows, Screenlane, UX Archive, SaaSFrame, Dribbble, Behance, Awwwards, Godly, Land-book, SiteInspire. Each with one line on what it is good for.

Head that second section with the instruction: *do not cite these as if you had read them. To use them, ask the user to browse and paste screenshots; then design from what they actually show.* That sentence is the honesty constraint from Global Constraints made operational.

- [ ] **Step 4: Run the validator**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: **exit 0** — `manifests`, `frontmatter`, `length`, `refs`, `aesthetics` all pass. First fully green run.

- [ ] **Step 5: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add plugins/design-stack/skills/design-stack/reference/
git commit -m "feat: accessibility, review checklist, and source stack

Validator green: all 11 reference files present and routed."
```

---

## Task 7: `design-evidence` skill and design-system profiles

**Files:**
- Create: `plugins/design-stack/skills/design-evidence/SKILL.md`
- Create: `plugins/design-stack/skills/design-evidence/systems/CHOOSING.md`
- Create: `plugins/design-stack/skills/design-evidence/systems/{apple-hig,material,fluent,carbon,polaris,primer,atlassian,govuk}.md`
- Modify: `scripts/validate.py` — add check `orphans`

**Interfaces:**
- Consumes: `SKILL_BODY_MAX["design-evidence"] = 80`, already defined in Task 2.
- Produces: `check_orphans(plugin_dirs)` — every `.md` under a skill's `reference/`, `patterns/`, or `systems/` directory must be referenced by that skill's `SKILL.md` or by a sibling in the same directory. Catches files written but never routed to, which are invisible at runtime.

- [ ] **Step 1: Write the failing test — the orphan guard**

Add to `scripts/validate.py`:

```python
CONTENT_DIRS = ("reference", "patterns", "systems")


def check_orphans(plugin_dirs: list[Path]) -> None:
    check = "orphans"
    for pdir in plugin_dirs:
        skills_root = pdir / "skills"
        if not skills_root.is_dir():
            continue
        for skill_dir in sorted(p for p in skills_root.iterdir() if p.is_dir()):
            skill_md = skill_dir / "SKILL.md"
            if not skill_md.exists():
                continue

            # Everything the skill body and its content files mention.
            mentioned: set[str] = set()
            corpus = [skill_md]
            for sub in CONTENT_DIRS:
                corpus.extend(sorted((skill_dir / sub).glob("*.md")))
            for md in corpus:
                mentioned.update(REF_PATTERN.findall(md.read_text(encoding="utf-8")))

            for sub in CONTENT_DIRS:
                for md in sorted((skill_dir / sub).glob("*.md")):
                    key = f"{sub}/{md.name}"
                    if key not in mentioned:
                        fail(
                            check,
                            f"{rel(md)} is never referenced by {skill_dir.name} — "
                            f"unroutable files are invisible at runtime",
                        )

    if not any(e.startswith(f"FAIL: {check}") for e in ERRORS):
        ok(check)
```

Call it from `main()` after `check_aesthetics(plugin_dirs)`.

- [ ] **Step 2: Run it to confirm the existing tree is clean**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: exit 0, `orphans` now in the passed list. If any `reference/*.md` is reported orphaned, Task 2's reference index table is incomplete — fix `SKILL.md`, not the guard.

- [ ] **Step 3: Write `design-evidence/SKILL.md`**

```yaml
---
name: design-evidence
description: Use when designing a specific kind of screen — settings, onboarding, sign-in, data table, dashboard, navigation, search and filtering, billing, or a desktop tool with a timeline or canvas — or when choosing which design system's conventions to follow. Supplies the structure shipped products converge on, so screens are recalled rather than invented.
---
```

Body — **≤ 80 lines**. It is a router, not a reference:

1. One paragraph: this skill holds distilled structure from shipped products. Reading the playbook before proposing a layout is the difference between recalling and inventing.
2. **Choosing a playbook** — a table mapping request phrasing to `patterns/<file>.md`, all ten rows.
3. **When no playbook matches** — the fallback procedure, stated as three steps: say out loud that no playbook covers this; name the nearest structural analogue and why; use it, flagging where it does not fit. Never invent silently. (Review Focus item 3.)
4. **Choosing a design system** — point at `systems/CHOOSING.md`; state that picking one is mandatory and the choice gets one sentence of justification.
5. **The playbook shape** — the six fixed sections, so a reader knows what they are getting.
6. **Boundary** — appearance is `frontend-design`; this skill is structure.

- [ ] **Step 4: Write `systems/CHOOSING.md`**

The domain→system table from spec §7, then for each row one paragraph on *why* that pairing holds, then a **Tie-breakers** section: what to do when two apply (pick the one matching the primary user's daily environment), when the project already has a system (use it; these profiles then serve as a cross-check), and when the product spans platforms (choose per surface, keep terminology shared).

Link all eight profiles as `systems/<name>.md` so `refs` and `orphans` see them.

- [ ] **Step 5: Write the eight profiles**

Each 60–100 lines, identical section order:

1. **What it is for** — the product shape it was designed around.
2. **Core conventions** — the 5–8 decisions that make it recognisable and are worth borrowing.
3. **Where it is opinionated** — where it will fight you if you deviate.
4. **Where it is silent** — what you must decide yourself.
5. **Pick it when / do not pick it when.**
6. **Docs** — canonical URL, marked fetchable, with what to look up there.

Per-system emphasis: **apple-hig** platform conventions and native feel · **material** cross-platform consistency and elevation · **fluent** desktop density, command surfaces, window chrome · **carbon** data density, enterprise tables, long-session ergonomics · **polaris** merchant admin, resource lists, bulk actions · **primer** developer tooling, code surfaces, keyboard-first · **atlassian** issue and project tracking, nested hierarchy · **govuk** forms, error handling, plain language, accessibility as a floor.

- [ ] **Step 6: Run the validator**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: exit 1, with `FAIL: refs:` for the ten `patterns/*.md` files named in `SKILL.md` but not yet written. Correct red state for Tasks 8–9.

- [ ] **Step 7: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add scripts/validate.py plugins/design-stack/skills/design-evidence/
git commit -m "feat: design-evidence skill, system profiles, and orphan guard"
```

---

## Task 8: Screen playbooks — states, settings, data table, dashboard, navigation

**Files:**
- Create: `plugins/design-stack/skills/design-evidence/patterns/{states,settings,data-table,dashboard,navigation}.md`

**Interfaces:**
- Consumes: the playbook shape from `design-evidence/SKILL.md`; system profiles for the *Reference products* section.
- Produces: `patterns/states.md` is the canonical definition of the six states. Task 9's playbooks and `reference/10-design-review.md` both point at it; it must not be restated anywhere else.

Every playbook uses the six fixed sections from spec §7: **What this screen is for · Canonical structure · Variants · The six states · Common failures · Reference products**. Target 100–180 lines.

- [ ] **Step 1: Write `states.md` first**

This one is the exception to the six-section shape — it *defines* the states rather than applying them. Sections:

- **Why this list exists** — the happy-path failure, stated once, properly.
- One section per state, in fixed order, each covering: what it means, its sub-cases, what the user needs from it, and what a bad version looks like.
  - **empty** — first-run (never had data) vs filtered (query matched nothing) vs cleared (user removed everything). Three different messages and three different actions; using one for all three is the most common single mistake.
  - **loading** — initial vs refresh vs pagination vs optimistic. When a skeleton helps and when it misleads.
  - **error** — partial vs total; retryable vs terminal; user-caused vs system-caused. Every error says what happened and what to do next.
  - **permission** — not-signed-in vs signed-in-but-unauthorised vs plan-gated. Hiding vs disabling vs explaining, and when each is right.
  - **overflow** — long strings, many items, deep nesting, small viewports. Truncate, wrap, scroll, or paginate — and the condition selecting each.
  - **offline** — detectable vs silent failure; read-only degradation; queued writes and how to signal them.
- **Using this as a gate** — the six-row matrix to fill per screen, with the rule that "not applicable" needs a stated reason.

- [ ] **Step 2: Write `settings.md`**

Canonical structure: account/profile → preferences → notifications → security and sessions → integrations → billing → danger zone, last and visually separated. The ordering reason: frequency of use descending, destructiveness last.

Variants: single-page-scroll vs sidebar-sections vs tabbed, and the item-count thresholds that select each. Personal vs team/org settings, and why mixing the two scopes on one page confuses ownership.

Cover: save model (autosave vs explicit, and settings where explicit is mandatory), search within settings once the count is large, and destructive actions in the danger zone.

Reference products: Linear, Stripe, Notion, GitHub — with what specifically to look at in each. Note these are study targets for the human.

- [ ] **Step 3: Write `data-table.md`**

Canonical structure: title and count → bulk-action bar (appears on selection) → filters and search → the table → pagination. Column order: identifier, then the attributes the user scans by, then status, then actions last.

Cover: sorting affordances and the default sort · column sizing, and which column absorbs slack · row selection and what the bulk bar must show · row actions — inline vs overflow menu, and the threshold · sticky header and first column · the responsive problem, with the three real answers (horizontal scroll, column priority, card fallback) and when each is right · density modes · empty vs filtered-empty, pointing at `patterns/states.md`.

Reference products: Linear, Stripe Dashboard, Carbon's data table, Polaris resource list.

- [ ] **Step 4: Write `dashboard.md`**

Distinct from `reference/06-dashboard.md`: that file holds cross-cutting rules, this one holds the screen's canonical composition. Cross-link rather than restate.

Canonical structure: timeframe and filter bar → primary metric row → trend section → breakdown → detail table. Why that order matches the question sequence a user actually asks.

Variants: monitoring (real-time, alert-driven) vs analytics (retrospective, exploratory) vs executive summary. Different refresh models, different densities.

Cover: what belongs above the fold · comparison baselines (period-over-period, target, cohort) and why a number without a baseline is noise · drill-down · the partial-failure state where one widget's data source is down.

- [ ] **Step 5: Write `navigation.md`**

Canonical structure by shell type, cross-referencing the four archetypes in `reference/02-layout.md`.

Cover: primary vs secondary vs utility navigation and what belongs in each · depth limits and why three levels is the practical ceiling · current-location indication, and why breadcrumbs and active states solve different problems · search as navigation once the item count is large · responsive collapse order — what gets hidden first and what never does · the account/user menu and its conventional contents.

- [ ] **Step 6: Run the validator**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: exit 1; five `refs` failures remain (`onboarding`, `auth`, `search-filter`, `billing`, `desktop-app`).

- [ ] **Step 7: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add plugins/design-stack/skills/design-evidence/patterns/
git commit -m "feat: states, settings, data-table, dashboard, navigation playbooks"
```

---

## Task 9: Screen playbooks — onboarding, auth, search, billing, desktop app

**Files:**
- Create: `plugins/design-stack/skills/design-evidence/patterns/{onboarding,auth,search-filter,billing,desktop-app}.md`

**Interfaces:**
- Consumes: the six-section shape; `patterns/states.md` for state definitions — link, never restate.
- Produces: completes the ten playbooks routed from `design-evidence/SKILL.md`, making `refs` green.

- [ ] **Step 1: Write `onboarding.md`**

Canonical structure: value confirmation → the minimum needed to start → first meaningful action → progressive disclosure of the rest. The ordering reason: every step before the user's first success is a place to lose them.

Variants: self-serve vs sales-assisted; individual vs team invite flow; empty-workspace seeding (templates, samples, import).

Cover: what may be deferred and what genuinely cannot · progress indication and whether to allow skipping · the checklist pattern and when it condescends · re-entry after abandonment.

- [ ] **Step 2: Write `auth.md`**

Canonical structure per flow: sign-in, sign-up, forgot-password, verify-email, MFA challenge, session-expired.

Cover: field order and autocomplete attributes that actually work with password managers · error messaging that helps the user without helping an attacker enumerate accounts · social and SSO button placement and labelling · the redirect-after-auth contract (return where you came from) · session expiry handled mid-task without losing the user's work · rate-limit and lockout messaging.

- [ ] **Step 3: Write `search-filter.md`**

Canonical structure: search input → active filter chips → result count → sort → results.

Cover: search scope, and stating it so results are not surprising · instant vs submitted search, and the latency threshold that decides · filter placement (inline, sidebar, or modal) by filter count · showing active filters and offering clear-all · zero results as a *recovery* surface — what to relax, what to suggest · URL as state, so results are shareable and survive reload · recent and saved searches.

- [ ] **Step 4: Write `billing.md`**

Canonical structure: current plan → usage against limits → payment method → invoice history → plan change → cancellation.

Cover: showing what the user is actually paying and when it next charges · usage approaching a limit, and warning before the wall not at it · proration explained in plain language at the moment of change · failed-payment recovery and dunning states · cancellation that is honest — what happens to data, when access ends · invoices downloadable and addressed correctly.

Note the deferral: payment *integration* is a Stripe question, not a design one. This playbook covers the screen.

- [ ] **Step 5: Write `desktop-app.md`**

The one playbook web component defaults actively mislead on — timeline, canvas, and inspector tool UIs.

Canonical structure: menu or command bar → tool palette → the work surface (canvas or timeline) → inspector or properties panel → transport or status bar.

Cover: the three-region model (tools left, work centre, properties right) and why it is near-universal in editors · the timeline specifically — tracks, playhead, zoom, snapping, selection · direct manipulation, and why the canvas must not feel like a web page (no text-selection cursors, no page scroll, no hover-card noise) · dense controls and why web-scale touch targets are wrong here · keyboard shortcuts as the primary interface, with discoverability · panel docking, resizing, and persistence across sessions · undo/redo as a first-class, always-available surface · performance as a design constraint — a dropped frame on a drag is a design failure, not just a technical one.

Reference products: Figma, DaVinci Resolve, Premiere, CapCut, Ableton, Blender — named as study targets for the human. Cross-reference `systems/fluent.md` for desktop conventions.

- [ ] **Step 6: Run the validator**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: **exit 0** — all six checks green.

- [ ] **Step 7: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add plugins/design-stack/skills/design-evidence/patterns/
git commit -m "feat: onboarding, auth, search, billing, desktop-app playbooks

All 10 playbooks present. Validator green on all six checks."
```

---

## Task 10: Commands

**Files:**
- Create: `plugins/design-stack/commands/{brief,research,review,sources}.md`

**Interfaces:**
- Consumes: `reference/10-design-review.md` defines `/design-stack:review`'s output order; `reference/sources.md` backs `/design-stack:sources`; `design-evidence`'s playbooks back `/design-stack:research`.
- Produces: four slash commands under the `design-stack:` namespace.

Each command file is frontmatter (`description`, and `argument-hint` where it takes an argument) plus a body written as instructions to Claude.

- [ ] **Step 1: Write `brief.md`**

`description: Run strategy and UX architecture for a screen or feature before any UI is built.`

Body: produce a written brief with fixed sections — problem · user and their context · explicitly out of scope · observable success measure · information architecture · task flow covering both the success path and the error path · the six-state matrix. End by asking the user to confirm before any building starts. State that this command does not write code.

- [ ] **Step 2: Write `research.md`**

`description: Load the canonical structure and design-system conventions for a given screen type.`
`argument-hint: <screen type, e.g. settings, data table, onboarding>`

Body: map the argument to a playbook (or run `design-evidence`'s no-match fallback and say so); read it; select a design system from `systems/CHOOSING.md` with one sentence of justification; report canonical structure, the variants in play, the six states for this screen, and the known failure modes. Read-only — it proposes, it does not build.

- [ ] **Step 3: Write `review.md`**

`description: Audit existing UI against the design-stack review checklist.`

Body: execute `reference/10-design-review.md` in its section order against the UI code in scope. Output findings ordered by severity, each naming file, line, the rule, and the reference file it comes from. Blocking findings first, labelled blocking. If a design system was never chosen, that is itself a finding.

- [ ] **Step 4: Write `sources.md`**

`description: Print the curated design source stack, split by what Claude can fetch and what only a human can browse.`

Body: read `reference/sources.md` and present both sections, keeping the fetchable/human-only split explicit. Do not offer to fetch anything in the human-only section.

- [ ] **Step 5: Verify the commands are discovered**

Run: `cd "E:/Chamrong/Project/claude-plugins" && ls plugins/design-stack/commands/ && head -5 plugins/design-stack/commands/*.md`
Expected: four files, each opening with a `---` frontmatter block containing `description:`.

Then run the validator: `python scripts/validate.py` — expected exit 0, still six checks green.

- [ ] **Step 6: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add plugins/design-stack/commands/
git commit -m "feat: brief, research, review, and sources commands"
```

---

## Task 11: READMEs, install, and behavioural verification

**Files:**
- Create: `README.md` (marketplace root)
- Create: `plugins/design-stack/README.md`

**Interfaces:**
- Consumes: the finished plugin.
- Produces: an installed, verified plugin. This task is the acceptance gate for spec §1 and §10.

- [ ] **Step 1: Write the marketplace `README.md`**

Sections: what this repo is (a personal Claude Code marketplace) · install instructions, both commands, copy-pasteable · a plugin index table with one row per plugin (name, what it does, install command) · how to add a plugin (create `plugins/<name>/`, append one `marketplace.json` entry, run `python scripts/validate.py`) · how to run the validator and what its six checks mean · licence.

- [ ] **Step 2: Write `plugins/design-stack/README.md`**

Sections: the problem it solves, in three sentences · the three-plugin division of labour table from spec §3 · the pipeline · what ships (2 skills, 21 reference/playbook/profile files, 4 commands) · the four commands with example invocations · the six states, listed · the honest note on login-walled sources · how to extend it (add a playbook, add a system profile, and that both must be routed from the owning `SKILL.md` or `orphans` will fail).

- [ ] **Step 3: Run the full validator one last time**

Run: `cd "E:/Chamrong/Project/claude-plugins" && python scripts/validate.py`
Expected: exit 0, `6 check(s) passed: manifests, frontmatter, length, refs, aesthetics, orphans`

- [ ] **Step 4: Check the banned-term constraint by hand**

Run:
```bash
cd "E:/Chamrong/Project/claude-plugins"
grep -rniE "fueni|nazounki|spring modulith" --include="*.md" --include="*.json" plugins/ README.md
```
Expected: no matches in `plugins/` or `README.md`. Matches inside `docs/superpowers/specs/` are expected and fine — the spec discusses the constraint. If anything in `plugins/` matches, the Global Constraints "Generic" rule is violated; fix before proceeding.

- [ ] **Step 5: Install the marketplace**

In an interactive Claude Code session:
```
/plugin marketplace add E:\Chamrong\Project\claude-plugins
/plugin install design-stack@chamrong
```
Expected: both succeed; `/plugin` lists `design-stack@chamrong` at user scope. A JSON parse error here means `marketplace.json` was committed as CRLF — check `.gitattributes` took effect. (Review Focus item 5.)

- [ ] **Step 6: Run the three behavioural probes**

In a fresh session with the plugin installed, in a scratch directory, run each prompt and record the result against the spec §1 criteria:

| Probe | Must load skill | Must read playbook | Must name a system | Must list six states |
|---|---|---|---|---|
| `"build a settings page for a team workspace"` | yes | `patterns/settings.md` | yes | yes |
| `"build an admin table of customer orders"` | yes | `patterns/data-table.md` | yes | yes |
| `"build a timeline panel for a video editor"` | yes | `patterns/desktop-app.md` | yes | yes |

Probe 3 specifically confirms `desktop-app.md` is reached rather than a web-SaaS playbook being misapplied. If any probe reads the wrong playbook, fix the routing table in `design-evidence/SKILL.md` — not the playbook.

- [ ] **Step 7: Run the two trigger probes**

| Probe | Expected |
|---|---|
| `"make this button slightly rounder"` | Skill must **not** load. If it does, tighten the exclusion clause in `design-stack`'s `description`. (Review Focus item 1.) |
| `"users need a way to manage their notification preferences"` | Skill **must** load and reach `patterns/settings.md`. If it does not, broaden the description to cover indirect phrasing. (Review Focus item 2.) |

- [ ] **Step 8: Commit**

```bash
cd "E:/Chamrong/Project/claude-plugins"
git add README.md plugins/design-stack/README.md
git commit -m "docs: marketplace and plugin READMEs

Verified: validator green on 6 checks, no banned terms in plugins/,
marketplace installs, 3 behavioural probes and 2 trigger probes pass."
```

---

## Done when

- `python scripts/validate.py` exits 0 with all six checks passing.
- No banned term appears anywhere under `plugins/`.
- `/plugin marketplace add` and `/plugin install design-stack@chamrong` both succeed.
- All three behavioural probes hit the right playbook, name a design system, and enumerate the six states.
- The over-trigger probe does not load the skill; the indirect-phrasing probe does.
- 11 commits, each leaving the repo in a coherent state.
