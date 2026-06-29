import React from "react";

export function Loading() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      <div className="relative z-10 mx-auto mt-20 max-w-6xl px-6 py-8 sm:px-10">
        {/* Hero Skeleton */}
        <div className="mb-16">
          <div className="space-y-4 rounded-2xl border border-border bg-card/40 p-8">
            <div className="skeleton-pulse h-3 w-24 rounded-full bg-primary/20" />

            <div className="skeleton-pulse h-7 w-3/4 rounded-lg bg-muted" />
            <div className="skeleton-pulse h-7 w-1/2 rounded-lg bg-muted" />

            <div className="mt-2 space-y-2">
              <div className="skeleton-pulse h-3 w-full rounded-full bg-muted/40" />
              <div className="skeleton-pulse h-3 w-11/12 rounded-full bg-muted/40" />
              <div className="skeleton-pulse h-3 w-2/3 rounded-full bg-muted/40" />
            </div>

            <div className="mt-6 flex gap-3">
              <div className="skeleton-pulse h-9 w-28 rounded-xl bg-primary/25" />
              <div className="skeleton-pulse h-9 w-24 rounded-xl bg-secondary" />
            </div>
          </div>
        </div>

        {/* Section Header Skeleton */}
        <div className="mb-4 flex items-center justify-between">
          <div className="skeleton-pulse h-3 w-32 rounded-full bg-muted" />
          <div className="skeleton-pulse h-3 w-16 rounded-full bg-primary/20" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="space-y-4 rounded-2xl border border-border bg-card/40 p-5"
            >
              <div className="flex items-center gap-3">
                <div
                  className="skeleton-pulse h-9 w-9 rounded-xl bg-primary/20"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />

                <div className="flex-1 space-y-2">
                  <div className="skeleton-pulse h-2.5 w-3/4 rounded-full bg-muted" />
                  <div className="skeleton-pulse h-2 w-1/2 rounded-full bg-muted/40" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="skeleton-pulse h-2.5 w-full rounded-full bg-muted/40" />
                <div className="skeleton-pulse h-2.5 w-5/6 rounded-full bg-muted/40" />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="skeleton-pulse h-2 w-14 rounded-full bg-muted/40" />
                <div className="skeleton-pulse h-6 w-6 rounded-full bg-primary/20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
