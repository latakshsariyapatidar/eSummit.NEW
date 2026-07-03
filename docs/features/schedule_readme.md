# Schedule Feature Readme

## Feature

The schedule feature is the `/schedule` route. It currently has schedule data and a day selector, but the visible schedule list is intentionally replaced by a coming-soon card.

## Entry Point

`src/pages/EventsSchedule/Schedule.jsx`

Route in `src/App.jsx`:

```jsx
<Route path="/schedule" element={<Schedule />} />
```

## Flow

1. `Schedule` sets document title.
2. It loads `schedule` from `useSchedule()`.
3. It loads `events` from `useEvents()` for potential event-link matching.
4. It keeps `activeDay` in local state.
5. It calculates `activeSchedule`, but the actual schedule rendering is currently commented out/replaced.
6. It renders `ComingSoonCard`.

## Modules Used

| Module             | Imported from                            | Used for                                  |
| ------------------ | ---------------------------------------- | ----------------------------------------- |
| `useSchedule`      | `@/lib/store`                            | Schedule fallback/API data.               |
| `useEvents`        | `@/lib/store`                            | Matching schedule titles to event routes. |
| `PageHeader`       | `@/components/ui/PageHeader`             | Page heading.                             |
| `useDocumentTitle` | `@/hooks/useDocumentTitle`               | Browser title.                            |
| `Loader`           | `@/components/Loader/Loader`             | Empty loading state.                      |
| `ComingSoonCard`   | `@/components/ComingSoon/ComingSoonCard` | Current visible state.                    |
| Lucide icons       | `lucide-react`                           | Intended schedule row iconography.        |
| `TransitionLink`   | `@/components/ui/TransitionLink`         | Intended links to event details.          |

## Data Shape

Schedule items in `src/lib/store.js`:

```js
{
  day: "Day 01",
  items: [
    {
      time,
      title,
      category,
      location
    }
  ]
}
```

## Hidden Helper

`getEventLink(title)` tries to match schedule item titles to event names and returns `/event/<slug>` when possible.

## Files to Edit

- Update schedule data: `src/lib/store.js`.
- Enable actual schedule rendering: `src/pages/EventsSchedule/Schedule.jsx`.
- Change empty state: `src/components/ComingSoon/ComingSoonCard.jsx` or page-level props.
