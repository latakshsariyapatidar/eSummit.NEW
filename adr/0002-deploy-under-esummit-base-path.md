# ADR 0002: Deploy Under `/esummit/` Base Path

Status: Accepted

## Context

The frontend is deployed to `/var/www/iic/esummit` and served under the `/esummit/` URL path.

## Decision

Configure Vite with `base: "/esummit/"` and React Router with `basename="/esummit"`.

## Consequences

- Local dev route should be opened as `http://localhost:5173/esummit/`.
- Internal app links should use React Router paths like `/events`; the basename handles the prefix.
- Static assets referenced through Vite public paths must work under the base path.
- Direct hardcoded absolute URLs must be reviewed carefully.

## Notes

If deployment path changes, update `vite.config.js`, `src/App.jsx`, docs, and deployment workflow together.
