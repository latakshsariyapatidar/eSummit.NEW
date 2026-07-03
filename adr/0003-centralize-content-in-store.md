# ADR 0003: Centralize Content in `src/lib/store.js`

Status: Accepted

## Context

Multiple pages need event, sponsor, schedule, FAQ, team, pass, target date, and cart data. The app also needs fallback data when API calls fail or are not ready.

## Decision

Keep fallback content, API fetch helpers, lightweight data hooks, and cart helpers in `src/lib/store.js`.

## Consequences

- Juniors know where to find and update public content.
- Pages can start with fallback data and hydrate from API later.
- The file is large and mixes content, API, and hooks.
- A future migration to React Query or separate content modules should be deliberate.

## Notes

If this file becomes difficult to maintain, split by resource only after adding an ADR and updating import docs.
