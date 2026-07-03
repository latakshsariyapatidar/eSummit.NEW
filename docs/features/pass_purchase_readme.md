# Pass Purchase Feature Readme

## Feature

The pass purchase feature is the `/buy` route. It lets a user select passes, enter attendee details, submit an order, scan a UPI QR, submit UTR/reference number, and see success.

Current note: `PASSES` is empty because `FALLBACK_PASSES` is empty in `src/lib/store.js`, so the page currently shows "No passes available."

## Entry Point

`src/pages/PassBuy/Buy.jsx`

Route in `src/App.jsx`:

```jsx
<Route path="/buy" element={<Buy />} />
```

## State Machine

`Buy.jsx` uses a local `step` state:

- `selection`
- `details`
- `payment`
- `status`

## Flow

1. `selection`: render `PassCard` for each pass in `PASSES`.
2. User increments/decrements quantity.
3. Cart is stored in `localStorage` key `es26_cart` through `useLocalStorage`.
4. Max quantity is controlled by `MAX = 4`.
5. "Enter Details" creates one attendee detail object per selected pass and moves to `details`.
6. `details`: `AttendeeDetailsForm` collects name, email, gender, and college.
7. Submit calls `POST ${BASE_URL}/orders/submit` with `{ cartValue, passes }`.
8. Success response stores `orderData` and moves to `payment`.
9. `payment`: `PaymentGatewayModal` shows `orderData.qrBase64`, a 30-minute timer, and UTR input.
10. UTR submit calls `POST ${BASE_URL}/orders/utr` with `{ orderId, utr }`.
11. Success clears cart and moves to `status`.
12. `status`: `OrderSuccessScreen` confirms the order was created.

## Modules Used

| Module                | Imported from                                              | Used for                            |
| --------------------- | ---------------------------------------------------------- | ----------------------------------- |
| `PageHeader`          | `@/components/ui/PageHeader`                               | Page and form headings.             |
| `useDocumentTitle`    | `@/hooks/useDocumentTitle`                                 | Browser title.                      |
| `Button`              | `@/components/ui/Button`                                   | Actions.                            |
| `PASSES`              | `@/lib/store`                                              | Available pass data.                |
| `PassCard`            | `@/components/Passes/PassCard`                             | Pass display and quantity controls. |
| `useLocalStorage`     | `@/hooks/useLocalStorage`                                  | Cart persistence.                   |
| `ComingSoonCard`      | `@/components/ComingSoon/ComingSoonCard`                   | Empty passes state.                 |
| `AttendeeDetailsForm` | `@/components/OrderPurchaseComponents/AttendeeDetailsForm` | Attendee detail form.               |
| `PaymentGatewayModal` | `@/components/OrderPurchaseComponents/PaymentGatewayModal` | QR and UTR form.                    |
| `OrderSuccessScreen`  | `@/components/OrderPurchaseComponents/OrderSuccessScreen`  | Final state.                        |

## API Endpoints

Base URL in `Buy.jsx`:

```js
const BASE_URL = "https://iic.iitdh.ac.in/esummit/api/api";
```

Endpoints:

- `POST /orders/submit`
- `POST /orders/utr`

## Data Shape

Cart item:

```js
{
  (passId, qty);
}
```

Attendee object:

```js
{
  (passType,
    passPrice,
    attendeeName,
    attendeeEmail,
    attendeeGender,
    collegeName);
}
```

## Files to Edit

- Add passes: `src/lib/store.js`.
- Change card UI: `src/components/Passes/PassCard.jsx`.
- Change attendee fields: `src/components/OrderPurchaseComponents/AttendeeDetailsForm.jsx` and API payload in `Buy.jsx`.
- Change payment timer/UTR behavior: `src/components/OrderPurchaseComponents/PaymentGatewayModal.jsx`.
- Change order API base: `src/pages/PassBuy/Buy.jsx` or introduce env handling with ADR.
