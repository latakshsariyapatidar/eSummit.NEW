# ADR 0008: Keep Heavy Visuals Isolated

Status: Accepted

## Context

The app includes large custom visuals using Three.js, GSAP, Motion, canvas, audio, and custom cursor logic.

## Decision

Keep heavy visuals in dedicated components under `src/components/CustomPremade` or focused feature component folders.

## Consequences

- Normal pages can import visuals without owning their internal complexity.
- Cleanup logic remains close to event listeners, animation frames, and WebGL resources.
- KT can separate regular React work from advanced visual work.
- Heavy components should be modified carefully and tested visually.

## Notes

Do not mix WebGL/canvas internals directly into route pages.
