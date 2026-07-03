# Data Content Feature Readme

## Feature

This feature covers the shared content/data source in `src/lib/store.js`.

## Entry Point

`src/lib/store.js`

## Responsibilities

`store.js` currently owns:

- API base URL.
- Fallback pass/event/sponsor/schedule/FAQ/team/UPI/date data.
- Public exported content constants.
- Fetch helper functions.
- React hooks that load API data.
- Cart localStorage helpers.

## Exports

Constants:

- `API_BASE`
- `FALLBACK_PASSES`
- `FALLBACK_EVENTS`
- `FALLBACK_SPONSORS`
- `FALLBACK_SCHEDULE`
- `FALLBACK_FAQS`
- `FALLBACK_TEAMS`
- `FALLBACK_UPI_IDS`
- `FALLBACK_TARGET_DATE`
- `PASSES`
- `EVENTS`
- `SPONSORS`
- `SCHEDULE`
- `FAQS`
- `UPI_IDS`
- `TARGET_DATE`
- `TEAMS`

Fetch helpers:

- `fetchEvents`
- `fetchSponsors`
- `fetchFAQs`
- `fetchSchedule`
- `fetchTeams`

Hooks:

- `useEvents`
- `useSponsors`
- `useFAQs`
- `useSchedule`
- `useTeams`

Cart helpers:

- `getCart`
- `setCart`

## API Flow

Each fetch helper calls:

```js
fetch(`${API_BASE}/content/<resource>`);
```

If `json.status === "success"`, it returns `json.data`; otherwise it returns fallback data.

Each hook:

1. Initializes state with fallback data.
2. Calls the matching fetch helper in `useEffect`.
3. Replaces data on success.
4. Logs errors to console and keeps fallback data on failure.

## Current Content State

| Dataset     | Current state                                                     |
| ----------- | ----------------------------------------------------------------- |
| Passes      | Empty fallback. `/buy` shows no passes.                           |
| Events      | Populated fallback.                                               |
| Sponsors    | Empty fallback. `/sponsors` shows coming soon.                    |
| Schedule    | Populated fallback, but page renders coming soon.                 |
| FAQs        | Populated fallback.                                               |
| Teams       | Populated fallback.                                               |
| UPI IDs     | Populated fallback, not currently central to the active buy flow. |
| Target date | `2026-08-20T09:00:00`.                                            |

## Importers

| Export        | Used by                                                  |
| ------------- | -------------------------------------------------------- |
| `TARGET_DATE` | `src/components/Countdown/Countdown.jsx`                 |
| `useEvents`   | Home about, home events, events catalog/detail, schedule |
| `useFAQs`     | Home FAQ                                                 |
| `useSchedule` | Schedule page                                            |
| `useTeams`    | Team page                                                |
| `SPONSORS`    | Sponsors page                                            |
| `PASSES`      | Buy page, Admin dashboard pass panel                     |
| `EVENTS`      | Footer                                                   |

## Files to Edit

- Add content: `src/lib/store.js`.
- Change API paths: `src/lib/store.js`.
- Move to React Query/global cache: write ADR first, then update imports.
