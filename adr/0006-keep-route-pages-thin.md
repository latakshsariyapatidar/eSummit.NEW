# ADR 0006: Keep Route Pages Thin

Status: Accepted

## Context

The app has route pages and many feature sections. Without boundaries, route files can become hard to teach and maintain.

## Decision

Keep route files in `src/pages` as orchestration layers. Move reusable or section-level UI into `src/components`.

## Consequences

- Route pages own document title, data selection, and page-level state.
- Feature components own rendering details.
- Shared primitives live in `src/components/ui`.
- Feature-specific components live in named component folders.

## Notes

When a route file grows too large, extract a component before adding more page-level JSX.
