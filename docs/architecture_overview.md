# Architecture Overview

## Runtime Shape

The app is a client-side React SPA built with Vite. The browser loads `index.html`, then `src/main.jsx` mounts `src/App.jsx`.

`App.jsx` sets the router basename to `/esummit`, so every internal route is expected to live under that path in production and local preview.

The app shell order is:

1. `PageTransitionOverlay`
2. `SmoothCursor`
3. `Layout`
4. `Suspense`
5. Route component

`Layout` adds the loader, nav, smooth scroll wrapper, route content, and footer.

## Routing

Routes are declared only in `src/App.jsx`. Pages are lazy imported, which keeps the first bundle lighter and lets `Loading` act as the route fallback.

Use `TransitionLink` for internal links because it calls `useTransitionNavigate`, which animates `PageTransitionOverlay` before changing routes.

## Data Flow

`src/lib/store.js` is the content and data access hub.

It contains fallback arrays for events, schedule, FAQs, team, sponsors, passes, and UPI IDs. It also has fetch helpers for live content endpoints and hook wrappers that start from fallback data, then replace it if the API succeeds.

Feature pages should import data through either constants or hooks from `store.js`. The current pattern is:

- Dynamic-ish content pages use hooks: `useEvents`, `useFAQs`, `useSchedule`, `useTeams`.
- Static display helpers sometimes use constants directly: `EVENTS`, `SPONSORS`, `PASSES`.

## State

Local UI state stays inside route or component files using `useState`.

Persistent client state uses:

- `localStorage` through `useLocalStorage` for carts and demo admin orders.
- `sessionStorage` for loader completion and admin session data.

There is no global state manager.

## Styling

The styling system is Tailwind CSS v4 with design tokens declared in `src/styles.css`.

The theme uses CSS variables for background, foreground, card, primary, border, signal, asphalt, and chrome. Components should use Tailwind classes that reference these tokens rather than hardcoded colors unless a custom visual effect requires it.

## Animations and Visuals

The project leans heavily on custom motion:

- GSAP handles hero text animation, route overlay transitions, footer parallax, loader exit, and event menu interactions.
- Three.js and postprocessing power the hero road background through `Hyperspeed`.
- Motion powers ASCII art and the smooth custom cursor.
- CSS keyframes in `styles.css` handle marquee, skeleton pulse, and event conveyor animation.

## Deployment

Vite is configured with:

```js
base: "/esummit/"
```

The GitHub workflow builds on `main` and deploys `dist/*` to `/var/www/iic/esummit` on a self-hosted runner.

This is why links, router basename, and static asset references must all respect the `/esummit/` base path.

## Extension Rules

- Add a new route in `src/App.jsx`.
- Add a new route page in `src/pages/<Feature>/<Feature>.jsx`.
- Add reusable rendering pieces in `src/components/<Feature>/`.
- Add global primitives in `src/components/ui/`.
- Add shared hooks in `src/hooks/`.
- Add feature docs in `docs/features/<feature>_readme.md`.
- Add an ADR when changing a convention that future developers must follow.
