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
```bash
  git checkout dev
  git pull origin dev
  git checkout -b feature/ISSUE-ID-short-description
```
  Example: `git checkout -b feature/42-fix-admin-key`
 
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
````
feat: add new feature (if adding feature)
fix: resolve bug #42 (if fixing bug)
chore: update dependencies (if cleanup)
docs: update README (if documentation)
````
 
## Pull Request Process
 
1. **Push your branch to your fork:**
```bash
   git push origin feature/42-fix-admin-key
```
 
2. **Go to GitHub** → your fork → click "Compare & pull request"
 
3. **Fill in the PR description:**
   - What does this fix/add?
   - Why is it needed?
   - Link the issue: "Closes #42"
 
4. **Wait for review** (maintainer will check your code)
 
5. **Make changes if requested** and re-commit
 
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
