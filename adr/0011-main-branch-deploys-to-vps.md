# ADR 0011: Main Branch Deploys to VPS

Status: Accepted

## Context

The project has a self-hosted GitHub Actions runner and a fixed VPS web root.

## Decision

Only pushes to `main` trigger build and deployment to `/var/www/iic/esummit`.

## Consequences

- Developers should raise PRs into `dev`, not `main`.
- Admin/maintainer controls when `dev` is merged into `main`.
- `main` should remain deployable.
- Build environment must have Node/npm available through NVM.

## Notes

Deployment workflow lives at `.github/workflows/deploy.yml`.
