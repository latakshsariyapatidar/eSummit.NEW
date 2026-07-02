# ADR 0007: Use Browser Storage for Lightweight Client State

Status: Accepted

## Context

The app currently needs simple persistence for cart state, first-load loader completion, and admin demo state.

## Decision

Use `localStorage` for persisted local data and `sessionStorage` for session-scoped flags/auth.

## Consequences

- No global state dependency is needed.
- Cart persists across refreshes.
- Loader is skipped after first completion per session.
- Admin auth is session-scoped.
- Sensitive or authoritative data must not rely only on browser storage.

## Notes

Use `useLocalStorage` for React state synchronized to localStorage.
