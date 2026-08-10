# Team Feature Readme

## Feature

The team feature is the `/team` route. It shows the core committee, functional leads, event directors, past members (alumni/legacy core), and their crew members.

## Entry Point

`src/pages/Team/Team.jsx`

Route in `src/App.jsx`:

```jsx
<Route path="/team" element={<Team />} />
```

## Flow

1. `Team` sets document title.
2. It calls `fetchTeams()` from `@/lib/store` (with fallback data support).
3. It uses `useMemo` to split teams into:
   - `functionalLeads`
   - `eventDirectors`
   - `pastMembers` (with edition/year filtering)
4. If team data is empty, it renders `ComingSoonCard`.
5. It renders `TeamMemberCard` for active and past team groups.
6. Clicking any card opens a details modal with profile bio, social links, year batch badge, and crew list.

## Modules Used

| Module             | Imported from                            | Used for                             |
| ------------------ | ---------------------------------------- | ------------------------------------ |
| `useMemo`          | `react`                                  | Splits team data efficiently.        |
| `PageHeader`       | `@/components/ui/PageHeader`             | Page heading.                        |
| `useDocumentTitle` | `@/hooks/useDocumentTitle`               | Browser title.                       |
| `TeamMemberCard`   | `@/components/Team/TeamMemberCard`       | Lead and crew card UI.               |
| `fetchTeams`       | `@/lib/store`                            | Team data.                           |
| `Modal`            | `@/components/ui/Modal`                  | Detailed profile modal.              |
| `ComingSoonCard`   | `@/components/ComingSoon/ComingSoonCard` | Fallback empty state.                |

## Team Split Logic

- **Past Members**: entries with `isPast: true`, `type === "past"`, `category === "past"`, `lead.isPast === true`, or `lead.team` containing "Past" / "Alumni".
- **Functional Leads**: active entries where `lead.team === "Core Committee"`, role is `Overall Coordinator`, role includes `Head`, or role includes `Lead` without an event.
- **Event Directors**: active entries with `lead.event` or remaining active team leads.

## Card Behavior

`TeamMemberCard.jsx`:

- Shows lead image as background.
- Displays year batch badge for past members (e.g. `2025`, `2024`) with gold accent borders.
- Links lead name to LinkedIn if available, otherwise LinkedIn search.
- Shows email contact link.
- Clicking card opens full member bio modal.

## Data Shape

Team object:

```js
{
  isPast?: boolean,
  year?: string, // e.g. "2025", "2024"
  lead: {
    name,
    role,
    team,
    event,
    email,
    bio,
    image,
    linkedin,
    isPast?: boolean,
    year?: string
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

- Add/update team & past member data: `src/lib/store.js`.
- Change page grouping & year filters: `src/pages/Team/Team.jsx`.
- Change card UI/interaction: `src/components/Team/TeamMemberCard.jsx`.

