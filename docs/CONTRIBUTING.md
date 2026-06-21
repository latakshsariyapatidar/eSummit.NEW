# Contributing to E-Summit 2026

Thanks for your interest! Here's how to contribute.

## Getting Started

1. **Fork the repo** (click "Fork" at top right of GitHub)
2. **Clone your fork locally:**

```bash
   git clone https://github.com/YOUR-USERNAME/eSummit.NEW.git
   cd eSummit.NEW
```

3. **Create an environment file:**

```bash
   cp .env.example .env.local
```

4. **Install dependencies:**

```bash
   npm install
```

5. **Start the dev server:**

```bash
   npm run dev
```

## Workflow

- **Pick an issue** from the [Issues tab](https://github.com/latakshsariyapatidar/eSummit.NEW/issues)
- **Label it "in progress"** (comment: "I'll work on this")
- **Create a feature branch** from `dev`:
  Checkout a branch from the `dev` branch, name it as your feature branch (or whatever descriptive branch name you choose), and make your changes in that branch.

```bash
  # Ensure you are on dev and up to date
  git checkout dev
  git pull origin dev

  # Create your feature branch (name it whatever you like)
  git checkout -b your-feature-branch-name
```

## Before You Commit

```bash
# Run linter
npm run lint

# Auto-format code
npm run format

# Verify no breaking changes
npm run build
```

## Commit Message Format

Keep it clean:

```
feat: add new feature (if adding feature)
fix: resolve bug #42 (if fixing bug)
chore: update dependencies (if cleanup)
docs: update README (if documentation)
```

## Pull Request Process

1. **Push your branch to the remote repository:**

```bash
   git push origin your-feature-branch-name
```

2. **Raise a Pull Request (PR) against the `dev` branch:**
   Go to GitHub and open a pull request. Make sure the base branch is **`dev`** (NOT `main`).

3. **Make the PR descriptive:**
   Provide a clear, detailed, and descriptive explanation of the changes you've made. Fill in details such as:
   - What changes were made and what features/fixes are introduced?
   - Why are these changes needed?
   - Any relevant issue numbers (e.g., "Closes #42").

4. **Review and Merge:**
   The repository owner/maintainer will review your PR. Once reviewed and approved, it will be merged into the `dev` branch and eventually merged into the `main` branch.

5. **Make changes if requested** and re-commit.

6. **Celebrate** when it's merged! 🎉

## Code Style

- Follow the existing code structure (see `adr/` for decisions)
- Use TypeScript for type safety where possible
- Add JSDoc comments for complex functions
- Use Tailwind for styling (no inline styles)
- Never duplicate code (see ADR 0001)

## Questions?

- Read `docs/README.md` for Git help
- Check `adr/` for architecture decisions
- Open a discussion in Issues if unsure
