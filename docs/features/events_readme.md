# Events Feature Readme

## Feature

The events feature has two routes:

- `/events`: full event catalog.
- `/event/:slug`: individual event detail.

## Entry Points

`src/pages/Event/Events.jsx`

`src/pages/Event/EventDetails.jsx`

Both are lazy imported in `src/App.jsx`.

## Catalog Flow

1. `Events` sets document title.
2. It calls `useEvents()` from `@/lib/store`.
3. It maps each event into a `FlowingMenu` item.
4. Each item includes event name, link, image path, tagline, day, and time.
5. `FlowingMenu` renders animated rows; clicking a row goes to `/event/<slug>`.

## Detail Flow

1. `EventDetails` reads `slug` from `useParams`.
2. It calls `useEvents()`.
3. It finds the matching event by `event.slug === slug`.
4. If events are empty, it renders `Loader`.
5. If no matching event exists, it renders a not-found message and link back to `/events`.
6. If found, it renders title, day, time, venue, about, brief, format, and register CTA.

## Modules Used

| Module | Imported from | Used for |
| --- | --- | --- |
| `useEvents` | `@/lib/store` | Event list and event detail data. |
| `PageHeader` | `@/components/ui/PageHeader` | Catalog heading. |
| `useDocumentTitle` | `@/hooks/useDocumentTitle` | Browser title. |
| `FlowingMenu` | `@/components/CustomPremade/FlowingMenu` | Animated event catalog. |
| `useParams` | `react-router-dom` | Reads event slug. |
| `TransitionLink` | `@/components/ui/TransitionLink` | Internal animated links. |
| `Loader` | `@/components/Loader/Loader` | Empty loading state in detail page. |

## Data Shape

Events in `src/lib/store.js` use:

```js
{
  slug,
  name,
  tagline,
  day,
  time,
  about,
  brief,
  format
}
```

The slug must match:

- Route URL: `/event/<slug>`
- Event image file: `public/events_assets/<slug>.avif`

## Custom Visual Dependency

`FlowingMenu.jsx` uses:

- GSAP for hover entry/exit and marquee loop.
- `TransitionLink` for navigation.
- Repetition calculation on resize for seamless marquee.

## Files to Edit

- Add or update event data: `src/lib/store.js`.
- Add event image: `public/events_assets/<slug>.avif`.
- Change catalog layout: `src/pages/Event/Events.jsx` or `src/components/CustomPremade/FlowingMenu.jsx`.
- Change detail copy layout: `src/pages/Event/EventDetails.jsx`.
