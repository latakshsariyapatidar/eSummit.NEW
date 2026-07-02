# Layout Navigation Feature Readme

## Feature

This feature covers the app shell, nav, footer, smooth scroll, page transition overlay, loader, and custom cursor.

## Entry Points

- `src/App.jsx`
- `src/components/Shared/Layout.jsx`
- `src/components/Shared/Nav.jsx`
- `src/components/Shared/Footer.jsx`
- `src/components/Shared/SmoothScroll.jsx`
- `src/components/ui/TransitionLink.jsx`
- `src/hooks/useTransitionNavigate.js`

## App Shell Flow

1. `App` renders `PageTransitionOverlay`.
2. `App` renders `SmoothCursor`.
3. `App` renders `Layout`.
4. `Layout` renders `Loader`, `Nav`, `SmoothScroll`, route content, and `Footer`.
5. `SmoothScroll` initializes Locomotive Scroll and resizes on content changes.

## Navigation Flow

`Nav.jsx`:

- Maintains mobile menu state.
- Tracks scroll position to compact/hide the header.
- Locks body scroll when mobile menu is open.
- Uses `TransitionLink` for internal navigation.
- Has routes for Home, Schedule, Events, Sponsors, Team, and Get Pass.

`TransitionLink.jsx`:

- Computes an href through `useHref`.
- Prevents default anchor navigation.
- Calls optional `onClick`.
- Calls `useTransitionNavigate`.
- Supports function-style className for active state.

`useTransitionNavigate.js`:

- Prevents duplicate navigation.
- Clears admin auth check flag when leaving admin.
- Moves `#page-transition-overlay` in from a random direction.
- Navigates with `replace: true`.
- Scrolls to top.
- Moves overlay out in another direction.

## Loader Flow

`Loader.jsx`:

- Reads `sessionStorage["loader-done"]`.
- If done, renders nothing.
- Otherwise shows loading GIF, fake progress, and "Get Started" button.
- On click, plays `/car_start.mp3`, swaps GIF after 2 seconds, then slides out with GSAP.
- Stores `loader-done=true`.

## Footer Flow

`Footer.jsx`:

- Uses GSAP ScrollTrigger for parallax on tall desktop layouts.
- Uses `EVENTS.length` to describe event count.
- Uses `TransitionLink` for internal links.
- Uses external links for social and contact.

## Modules Used

| Module | Imported from | Used for |
| --- | --- | --- |
| `Loader` | `../Loader/Loader` | First-visit overlay. |
| `Nav` | `./Nav` | Global navigation. |
| `Footer` | `./Footer` | Global footer. |
| `SmoothScroll` | `./SmoothScroll` | Smooth page scrolling. |
| `LocomotiveScroll` | `locomotive-scroll` | Scroll implementation. |
| `TransitionLink` | `../ui/TransitionLink` | Animated internal links. |
| `useTransitionNavigate` | `../../hooks/useTransitionNavigate` | Programmatic transition navigation. |
| `PageTransitionOverlay` | `@/components/ui/PageTransitionOverlay` | Animated route overlay. |
| `SmoothCursor` | `@/components/CustomPremade/smooth-cursor` | Desktop custom cursor. |

## Files to Edit

- Add nav link: `src/components/Shared/Nav.jsx`.
- Change route animation: `src/hooks/useTransitionNavigate.js` and `src/components/ui/PageTransitionOverlay.jsx`.
- Change loader behavior: `src/components/Loader/Loader.jsx`.
- Change footer content: `src/components/Shared/Footer.jsx`.
- Change smooth scrolling behavior: `src/components/Shared/SmoothScroll.jsx`.
