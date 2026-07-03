# Home Feature Readme

## Feature

The home feature is the landing route at `/`. It introduces the summit, shows visual identity, event count, highlighted events, CTA, and FAQs.

## Entry Point

`src/pages/Home/Home.jsx`

Imported lazily in `src/App.jsx`:

```js
const Home = lazy(() =>
  import("./pages/Home/Home").then((module) => ({ default: module.Home })),
);
```

Route:

```jsx
<Route path="/" element={<Home />} />
```

## Flow

1. `Home` sets the page title with `useDocumentTitle`.
2. It renders `Hero` and `Marquee` immediately.
3. It lazy-loads below-the-fold sections with `LazySection`.
4. `LazySection` waits until the section is close to viewport, then renders it inside `Suspense`.
5. Data-driven sections call hooks from `src/lib/store.js`.

## Modules Used

| Module             | Imported from                     | Used for                             |
| ------------------ | --------------------------------- | ------------------------------------ |
| `useDocumentTitle` | `@/hooks/useDocumentTitle`        | Sets browser title.                  |
| `Hero`             | `@/components/home/Hero`          | Top full-screen visual hero.         |
| `Marquee`          | `@/components/home/Marquee`       | Topic strip under hero.              |
| `LazySection`      | `@/components/Shared/LazySection` | Delays heavy section rendering.      |
| `AboutSection`     | `@/components/home/AboutSection`  | About text, ASCII logo, event count. |
| `EventsConveyor`   | `@/components/home/EventsMarquee` | Horizontal event cards.              |
| `TrackCTA`         | `@/components/home/CTA`           | Pass purchase CTA.                   |
| `FAQSection`       | `@/components/home/FAQSection`    | FAQ accordion.                       |

## Component Details

### `Hero.jsx`

Uses:

- `gsap` and `ScrollTrigger` for intro animation.
- `TransitionLink` for animated links to `/buy` and `/events`.
- `Countdown` for event countdown.
- `Hyperspeed` for the Three.js road background.
- `/HeroImage.svg` for the hero title artwork.

### `AboutSection.jsx`

Uses:

- `useEvents` from `@/lib/store` to count events.
- `SectionHeader` for heading layout.
- `AsciiArt` from `../CustomPremade/ascii-art`.
- `/logo.png` as ASCII art input.

### `EventsMarquee.jsx`

Uses:

- `useEvents` from `@/lib/store`.
- `TransitionLink` to link each event to `/event/:slug`.
- CSS classes from `src/styles.css`: `event-marquee-container`, `event-marquee-track`, and `event-marquee-card`.

### `CTA.jsx`

Uses:

- `/track.avif` as background.
- `TransitionLink` to route to `/buy`.

### `FAQSection.jsx`

Uses:

- `useFAQs` from `@/lib/store`.
- Local `activeFaq` state to open/close one FAQ at a time.

## Data Dependencies

From `src/lib/store.js`:

- `TARGET_DATE` through `Countdown`.
- `useEvents` in `AboutSection` and `EventsMarquee`.
- `useFAQs` in `FAQSection`.

## Files to Edit

- Change hero copy or CTAs: `src/components/home/Hero.jsx`.
- Change event highlight behavior: `src/components/home/EventsMarquee.jsx`.
- Change FAQ content source: `src/lib/store.js`.
- Change section order: `src/pages/Home/Home.jsx`.
- Change global animations: `src/styles.css`.
