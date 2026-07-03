# ADR 0009: Checkout Uses UPI QR and UTR Declaration

Status: Accepted

## Context

The buy flow needs a lightweight payment approach suitable for event passes.

## Decision

Use a multi-step checkout:

1. Select pass quantity.
2. Enter attendee details.
3. Submit order to backend.
4. Display backend QR code.
5. Collect UTR/reference number.
6. Submit UTR to backend.

## Consequences

- The frontend does not directly verify payment settlement.
- Backend/admin process is responsible for validation.
- The frontend stores cart locally until UTR submission succeeds.
- Current pass availability depends on `PASSES` data.

## Notes

If a payment gateway SDK is introduced, create a new ADR.
