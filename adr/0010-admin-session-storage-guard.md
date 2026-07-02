# ADR 0010: Admin Uses Session Storage Guard

Status: Accepted

## Context

The admin area needs a lightweight guard without introducing a full auth framework.

## Decision

Use `AdminLayout` as a nested route guard and store auth session fields in `sessionStorage`.

## Consequences

- Admin route access is checked before rendering nested admin pages.
- Login stores `auth_token`, `auth_role`, `admin_key`, and `_admin_auth_checked`.
- Logout clears session storage.
- Client-side guard improves UX but does not replace backend authorization.

## Notes

Backend APIs must still validate tokens/roles. Do not treat frontend route guard as security boundary.
