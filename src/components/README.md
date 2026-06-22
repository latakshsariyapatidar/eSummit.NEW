# Shared Components (`src/components/`)

This directory houses high-level layout components, shared cards, modals, and animated elements reused across E-Summit 2026 pages.

---

## Layout & Infrastructure

| File | Description |
|---|---|
| `Layout.jsx` | Root layout wrapper — renders `<Nav>`, `<SmoothScroll>`, page transition overlay, and `{children}` |
| `Nav.jsx` | Responsive navigation bar — desktop link strip + mobile full-screen drawer; uses `<TransitionLink>` |
| `Footer.jsx` | Site footer with venue info, quick links, and contact details |
| `SmoothScroll.jsx` | Lenis smooth-scroll wrapper — wraps the entire page to enable momentum scrolling |

---

## Feature Components

| File | Description |
|---|---|
| `Countdown.jsx` | Live countdown timer to summit date — displays weeks, days, hours, minutes |
| `SponsorLogo.jsx` | SVG sponsor/partner logo renderer (used in `Sponsors.jsx`) |
| `CheckoutModal.jsx` | Full pass purchase modal with UPI payment flow and form validation |
| `OrderStatusModal.jsx` | Order lookup modal — users enter phone/email to retrieve order status |

---

## Card Components

| File | Description |
|---|---|
| `PassCard.jsx` | **Reusable pass tier card.** Accepts `pass`, `qty`, `totalQty`, `maxQty`, `onIncrement`, `onDecrement` props. Renders the pass name, price, perks list, and quantity stepper. Used by `Buy.jsx`. |
| `TeamMemberCard.jsx` | **Reusable team member card.** Accepts a `team` prop `{ lead, crew[] }`. Renders the lead's portrait, title, name (LinkedIn link), role, and bio. **Idle**: shows stacked crew avatar POFs. **Hover**: expands to show crew names with LinkedIn links and individual portrait photos. Uses `data-lenis-prevent` on inner crew scroll to prevent global scroll hijack. |

---

## UI Primitives

Atomic, theme-consistent building blocks live in the `ui/` subdirectory. See [`ui/README.md`](./ui/README.md) for the full list.

---

## Adding a New Component

1. Create the file in this directory (or `ui/` if it is a primitive).
2. Export a named function, not a default export.
3. Document it in this README under the appropriate section.
4. If it introduces a new pattern or dependency, write an ADR in `adr/`.
