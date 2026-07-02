# ADR 0001: Use Vite and React SPA Architecture

Status: Accepted

## Context

The project is a highly visual frontend for E-Summit 2026. It needs fast local iteration, route-based pages, static asset handling, and browser-only animation libraries.

## Decision

Use Vite with React as a client-side single page application.

## Consequences

- `src/main.jsx` is the single app entry point.
- `src/App.jsx` owns all route declarations.
- The app can use browser APIs directly inside effects.
- Production output is static files in `dist/`.
- SEO is limited compared to server-rendered frameworks, but the app remains simple to host.

## Notes

Do not introduce a second routing or rendering framework without a new ADR.
