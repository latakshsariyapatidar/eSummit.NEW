# Route Pages (`src/pages/`)

This directory contains the primary top-level route/page views for the E-Summit 2026 application.
Each page is registered as a route in `App.jsx` and uses `useDocumentTitle` to set the browser tab title.

---

## Current Pages

| Route | File | Status | Description |
|---|---|---|---|
| `/` | `Home.jsx` | ✅ Live | Landing page — hero section, countdown timer, event highlights, FAQ accordion |
| `/events` | `Events.jsx` | ✅ Live | Full listing grid of all summit events |
| `/event/:slug` | `EventDetails.jsx` | ✅ Live | Detailed view of an individual event (schedule, format, prizes) |
| `/schedule` | `Schedule.jsx` | ✅ Live | Interactive day-by-day schedule grid |
| `/buy` | `Buy.jsx` | 🔜 Coming Soon | Pass selection & checkout — full grid commented out, ready to activate |
| `/sponsors` | `Sponsors.jsx` | 🔜 Coming Soon | Sponsors/partners showcase — placeholder shown |
| `/team` | `Team.jsx` | 🔜 Coming Soon | Team roster (Functional Leads + Event Directors) — commented out, ready to activate |
| `/admin` | `AdminAuth.jsx` | ✅ Live | Password-protected admin login |
| `/admin/dashboard` | `AdminDashboard.jsx` | ✅ Live | Admin panel for order management and pass tracking |
| `*` | `NotFound.jsx` | ✅ Live | 404 fallback page |

---

## Coming Soon Pages — Activation Guide

Three pages currently display a "Coming Soon" state. Their full implementations are preserved as comments inside each file for easy activation.

### `Buy.jsx` — Pass Purchase Grid
1. Uncomment the imports (`useState`, `PASSES`, `PassCard`, `CheckoutModal`, `OrderStatusModal`, `useLocalStorage`).
2. Uncomment the cart state and `update()` logic block.
3. Uncomment the `<PassCard>` grid and sticky checkout bar JSX.
4. Uncomment the `<CheckoutModal>` and `<OrderStatusModal>` JSX.

### `Team.jsx` — Team Roster Grid
1. Uncomment the `import { TeamMemberCard }` line.
2. Uncomment the `FUNCTIONAL_TEAMS` and `EVENT_TEAMS` data arrays.
3. Replace placeholder names/images/links with real team data.
4. Uncomment the team grid JSX section at the bottom of the component.

### `Sponsors.jsx` — Sponsors Showcase
1. Replace the "Coming Soon" card with the sponsor logo grid.
2. Use `<SponsorLogo>` component from `src/components/SponsorLogo.jsx` for individual logos.

---

## Adding a New Page

1. Create `src/pages/YourPage.jsx`.
2. Call `useDocumentTitle("Page Title — E-Summit 2026")` at the top of the component.
3. Add a `<Route path="/your-path" element={<YourPage />} />` entry in `App.jsx`.
4. If it should appear in the navigation, add an entry to the `NAV` array in `Nav.jsx`.
5. Document it in this README.
