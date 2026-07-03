# Contributing to E-Summit 2026 Frontend

This project uses a `dev -> feature branch -> PR to dev -> admin merge -> dev to main` workflow.

## Branch Flow

```text
main
  ^
  | admin merges dev into main for release
dev
  ^
  | developers raise PRs into dev
feature/your-change
```

## Starting Work

```bash
git checkout dev
git pull origin dev
git checkout -b feature/your-feature-name
```

Use a clear branch name:

- `feature/pass-card-ui`
- `bugfix/event-detail-not-found`
- `docs/admin-kt`
- `chore/lint-cleanup`

## During Work

Keep your branch updated with `dev` when work spans more than one day:

```bash
git checkout dev
git pull origin dev
git checkout feature/your-feature-name
git merge dev
```

Resolve conflicts locally, then continue working.

## Before Pushing

Run checks:

```bash
npm run lint
npm run build
```

Format if required:

```bash
npm run format
```

Commit with a short meaningful message:

```bash
git add .
git commit -m "feat: add sponsor tier display"
```

## Pushing and PR

```bash
git push -u origin feature/your-feature-name
```

Open a pull request with:

- Base branch: `dev`
- Compare branch: your feature branch

Do not raise normal feature PRs against `main`.

The admin/maintainer reviews the PR and merges it into `dev`. Later, the admin/maintainer merges `dev` into `main` for production deployment.

## PR Description Checklist

Include:

- What changed.
- Why it changed.
- Routes/components affected.
- Screenshots for UI changes.
- Any env/API/data changes.
- Verification commands run.

## Code Style

- Follow existing folder ownership.
- Keep route components in `src/pages`.
- Put reusable UI in `src/components`.
- Put content/fallback/API hooks in `src/lib/store.js` unless an ADR changes the data model.
- Use `TransitionLink` for internal navigation that should animate.
- Use `useDocumentTitle` on route pages.
- Use `@/` imports for src-root imports.
- Prefer existing UI primitives before adding new ones.
- Do not commit `node_modules`, `dist`, `.env`, or local editor files.

## Troubleshooting

Check branch status:

```bash
git status
```

Undo an unpublished commit but keep file changes:

```bash
git reset --soft HEAD~1
```

Temporarily save unfinished work:

```bash
git stash push -m "work in progress"
git stash pop
```

When conflicts happen, open each conflicted file, remove conflict markers, keep the correct code, then:

```bash
git add .
git commit -m "merge: resolve conflicts with dev"
```
