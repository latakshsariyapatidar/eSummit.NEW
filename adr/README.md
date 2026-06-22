# Architectural Decision Records (ADRs)

An Architectural Decision Record (ADR) captures an important design decision made during development — including its context, alternatives considered, chosen approach, and trade-offs.

---

## ADR Template

Each ADR file should be named `XXXX-short-description.md` (e.g., `0002-component-extraction.md`) and follow this structure:

```markdown
# ADR XXXX: Title

- **Status**: Proposed | Accepted | Rejected | Superseded
- **Date**: YYYY-MM-DD
- **Authors**: Name(s)

## Context
What is the problem? Why is a decision needed?

## Decision
What was decided, and why?

## Consequences
What are the benefits and trade-offs?
```

---

## Catalog of Records

| # | File | Title | Status | Date |
|---|---|---|---|---|
| 0001 | [0001-dry-refactoring-and-shared-ui.md](./0001-dry-refactoring-and-shared-ui.md) | DRY Refactoring & Shared UI Components | Accepted | 2026-06-19 |
| 0002 | [0002-new-pages-and-component-extraction.md](./0002-new-pages-and-component-extraction.md) | New Pages, Component Extraction & Coming Soon Strategy | Accepted | 2026-06-22 |

---

## When to Write an ADR

Write an ADR when you:
- Introduce a **new external dependency**
- Change the **state management or routing approach**
- Add a **new page or major feature area**
- Extract a **significant reusable component**
- Modify the **styling paradigm or design system**
- Make a decision that future contributors would otherwise question
