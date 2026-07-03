# ADR 0004: Use Tailwind v4 With CSS Tokens

Status: Accepted

## Context

The project has a strong motorsport-inspired identity and repeated colors, radii, fonts, and animation utilities.

## Decision

Use Tailwind CSS v4 with app-wide CSS custom properties in `src/styles.css`.

## Consequences

- UI uses utility classes for layout and most styling.
- Theme values are centralized in `:root` and `@theme inline`.
- Complex keyframes and global utilities live in `src/styles.css`.
- Components should prefer token-backed classes over hardcoded colors.

## Notes

Add new global CSS only when it is a token, keyframe, browser reset, or reusable utility.
