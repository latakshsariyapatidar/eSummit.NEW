# ADR 0005: Use `TransitionLink` for Internal Navigation

Status: Accepted

## Context

The app uses a custom GSAP page transition overlay. Plain anchors or raw router links bypass that experience.

## Decision

Use `src/components/ui/TransitionLink.jsx` for internal links that should animate.

## Consequences

- Internal navigation gets consistent overlay motion.
- `useTransitionNavigate` centralizes duplicate-click prevention, scroll-to-top behavior, and admin auth-check cleanup.
- Links still render as anchors with real hrefs.
- Programmatic navigation should use `useTransitionNavigate` when visual continuity matters.

## Notes

External links should remain normal `<a>` tags.
