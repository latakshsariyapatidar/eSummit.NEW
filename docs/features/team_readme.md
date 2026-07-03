# Team Feature Readme

## Feature

The team feature is the `/team` route. It shows the core committee, functional leads, event directors, and their crews.

## Entry Point

`src/pages/Team/Team.jsx`

Route in `src/App.jsx`:

```jsx
<Route path="/team" element={<Team />} />
```

## Flow

1. `Team` sets document title.
2. It calls `useTeams()` from `@/lib/store`.
3. It uses `useMemo` to split teams into:
   - `functionalLeads`
   - `eventDirectors`
4. If team data is empty, it renders `Loader`.
5. It renders `TeamMemberCard` for each team group.

## Modules Used

| Module | Imported from | Used for |
| --- | --- | --- |
| `useMemo` | `react` | Splits team data efficiently. |
| `PageHeader` | `@/components/ui/PageHeader` | Page heading. |
| `useDocumentTitle` | `@/hooks/useDocumentTitle` | Browser title. |
| `TeamMemberCard` | `@/components/Team/TeamMemberCard` | Lead and crew card UI. |
| `useTeams` | `@/lib/store` | Team data. |
| `Loader` | `@/components/Loader/Loader` | Empty loading state. |
| `ComingSoonCard` | `@/components/ComingSoon/ComingSoonCard` | Present but currently commented out. |

## Team Split Logic

Functional leads include entries where:

- `lead.team === "Core Committee"`
- role is `Overall Coordinator`
- role includes `Head`
- role includes `Lead` and has no `event`

Event directors are entries with `lead.event` or anything not already classified as functional.

## Card Behavior

`TeamMemberCard.jsx`:

- Shows lead image as background.
- Links lead name to LinkedIn if available, otherwise LinkedIn search.
- Shows email contact link.
- If crew exists, hovering/clicking expands crew names and avatars.
- Uses `data-lenis-prevent` inside the crew list so internal scroll does not fight smooth scrolling.

## Data Shape

Team object:

```js
{
  lead: {
    name,
    role,
    team,
    event,
    email,
    bio,
    image,
    linkedin
  },
  crew: [
    {
      name,
      image,
      linkedin
    }
  ]
}
```

## Files to Edit

- Add/update team data: `src/lib/store.js`.
- Change page grouping: `src/pages/Team/Team.jsx`.
- Change card UI/interaction: `src/components/Team/TeamMemberCard.jsx`.
