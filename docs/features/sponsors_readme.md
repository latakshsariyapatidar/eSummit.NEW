# Sponsors Feature Readme

## Feature

The sponsors feature is the `/sponsors` route. It displays sponsor cards grouped by tier when sponsor data exists. Current fallback sponsor data is empty, so the route shows a coming-soon card.

## Entry Point

`src/pages/Sponsors/Sponsors.jsx`

Route in `src/App.jsx`:

```jsx
<Route path="/sponsors" element={<Sponsors />} />
```

## Flow

1. `Sponsors` sets document title.
2. It reads `SPONSORS` from `@/lib/store`.
3. It sorts sponsors by known tier order.
4. It calls `groupByTierSize(sortedSponsors)`.
5. If sponsors exist, each group renders through `GridSection`.
6. If no sponsors exist, `ComingSoonCard` is shown.

## Modules Used

| Module | Imported from | Used for |
| --- | --- | --- |
| `PageHeader` | `@/components/ui/PageHeader` | Page heading. |
| `useDocumentTitle` | `@/hooks/useDocumentTitle` | Browser title. |
| `SPONSORS` | `@/lib/store` | Sponsor data. |
| `GridSection` | `@/components/Sponsors/SponsorHelpers` | Renders grouped sponsor section. |
| `groupByTierSize` | `@/components/Sponsors/SponsorHelpers` | Groups sponsors into large/medium/small tiers. |
| `ComingSoonCard` | `@/components/ComingSoon/ComingSoonCard` | Empty sponsor state. |

## Supporting Components

`SponsorHelpers.jsx` defines:

- Tier order.
- Tier visual config.
- `getConfig`.
- `groupByTierSize`.
- `TrackLine`.
- `GridSection`.

`SponsorCard.jsx` defines:

- Hover state.
- Dynamic glow.
- Sponsor image/name/tier display.
- Telemetry reveal on hover.

## Data Shape

Sponsor object:

```js
{
  name,
  tier,
  imgUrl
}
```

Known tier names:

- `Title Sponsor`
- `Co-Powered By`
- `EV Tech Partner`
- `Mobility Partner`
- `Automotive Partner`
- `Racing Partner`
- `Innovation Sponsor`
- `Energy Sponsor`

Unknown tiers still render with fallback config.

## Files to Edit

- Add sponsors: `src/lib/store.js`.
- Change sponsor visual tiers: `src/components/Sponsors/SponsorHelpers.jsx`.
- Change card layout: `src/components/Sponsors/SponsorCard.jsx`.
- Change empty state: `src/pages/Sponsors/Sponsors.jsx`.
