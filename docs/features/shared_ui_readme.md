# Shared UI Feature Readme

## Feature

Shared UI covers reusable primitives and generic visual components used across pages.

## UI Primitives

| Component               | File                                          | Purpose                                 |
| ----------------------- | --------------------------------------------- | --------------------------------------- |
| `Button`                | `src/components/ui/Button.jsx`                | Themed button variants and sizes.       |
| `Input`                 | `src/components/ui/Input.jsx`                 | Themed input.                           |
| `Select`                | `src/components/ui/Select.jsx`                | Themed select.                          |
| `Field`                 | `src/components/ui/Field.jsx`                 | Label plus field wrapper.               |
| `Modal`                 | `src/components/ui/Modal.jsx`                 | Modal shell with escape handling.       |
| `PageHeader`            | `src/components/ui/PageHeader.jsx`            | Page-level heading.                     |
| `SectionHeader`         | `src/components/ui/SectionHeader.jsx`         | Section-level heading.                  |
| `TransitionLink`        | `src/components/ui/TransitionLink.jsx`        | Internal link with animated navigation. |
| `PageTransitionOverlay` | `src/components/ui/PageTransitionOverlay.jsx` | Full-screen transition overlay.         |

## Generic Components

| Component        | File                                               | Purpose                         |
| ---------------- | -------------------------------------------------- | ------------------------------- |
| `ComingSoonCard` | `src/components/ComingSoon/ComingSoonCard.jsx`     | Empty state and coming-soon UI. |
| `Loading`        | `src/components/SkeletonLoader/SkeletonLoader.jsx` | Route suspense fallback.        |
| `Loader`         | `src/components/Loader/Loader.jsx`                 | First-visit app loader.         |
| `Countdown`      | `src/components/Countdown/Countdown.jsx`           | Countdown to target date.       |

## Helper

`src/lib/utils.js` exports:

```js
cn(...inputs);
```

It combines `clsx` and `tailwind-merge`, so component classes can be merged safely.

## Import Pattern

Use `@/` alias for src-root imports:

```js
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
```

Relative imports are still used inside close component folders, but new shared imports should prefer `@/`.

## When to Add a New UI Component

Add a component under `src/components/ui/` when:

- It is generic.
- It is likely to be used by more than one feature.
- It has no feature-specific data dependency.

Add a component under `src/components/<Feature>/` when:

- It only makes sense for one feature.
- It expects feature-specific props or data shape.

## Files to Edit

- Button/input/select behavior: `src/components/ui/*`.
- Global style tokens: `src/styles.css`.
- Reusable empty state: `src/components/ComingSoon/ComingSoonCard.jsx`.
- Skeleton loading: `src/components/SkeletonLoader/SkeletonLoader.jsx`.
