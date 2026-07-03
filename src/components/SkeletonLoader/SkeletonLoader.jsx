import { useLocation } from "react-router-dom";

export function Loading() {
  const location = useLocation();
  const path = location.pathname;

  if (path === "/") {
    return <HomeSkeleton />;
  }
  if (path === "/buy") {
    return <BuySkeleton />;
  }
  if (path === "/schedule") {
    return <ScheduleSkeleton />;
  }
  if (path === "/events") {
    return <EventsSkeleton />;
  }
  if (path === "/sponsors") {
    return <SponsorsSkeleton />;
  }
  if (path === "/team") {
    return <TeamSkeleton />;
  }
  if (path.startsWith("/event/")) {
    return <EventDetailsSkeleton />;
  }

  return <GeneralSkeleton />;
}

function HomeSkeleton() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background pt-32 pb-24 flex flex-col justify-center px-6 lg:px-12 max-w-7xl mx-auto text-center">
      <div className="relative z-10 mt-12 sm:mt-20 flex flex-col items-center">
        {/* Large center title box mockup */}
        <div className="skeleton-pulse h-12 sm:h-20 w-3/4 max-w-xl bg-muted rounded-2xl mx-auto" />
        <div className="skeleton-pulse h-12 sm:h-20 w-1/2 max-w-md bg-muted rounded-2xl mx-auto mt-4" />

        {/* Action buttons */}
        <div className="flex gap-4 justify-center mt-12 w-full max-w-md">
          <div className="skeleton-pulse h-12 flex-1 bg-primary/20 rounded-full" />
          <div className="skeleton-pulse h-12 flex-1 bg-muted rounded-full" />
        </div>

        {/* Countdown Box */}
        <div className="mt-20 w-full max-w-md p-6 sm:p-8 border border-border/40 bg-card/40 rounded-3xl">
          <div className="skeleton-pulse h-4.5 w-24 bg-muted rounded-full mx-auto mb-6" />
          <div className="flex justify-between px-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="skeleton-pulse h-16 w-16 bg-muted/50 rounded-2xl"
              />
            ))}
          </div>
        </div>

        {/* Bottom Marquee outline */}
        <div className="mt-16 h-8 w-full bg-muted/20 rounded skeleton-pulse" />
      </div>
    </div>
  );
}

function BuySkeleton() {
  return (
    <div className="pt-32 pb-24 max-w-400 mx-auto px-6 lg:px-12 text-left min-h-screen flex flex-col">
      {/* Header Tag and Title */}
      <div className="mb-12">
        <div className="skeleton-pulse h-5 w-20 bg-primary/10 border border-primary/20 rounded-full mb-3" />
        <div className="skeleton-pulse h-10 w-48 bg-muted rounded-xl mb-3" />
        <div className="skeleton-pulse h-10 w-36 bg-muted rounded-xl" />
      </div>

      {/* Grid of Pass Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 mt-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="border border-border/50 bg-card/40 rounded-3xl p-6 relative flex flex-col justify-between"
            style={{ minHeight: "560px" }}
          >
            <div>
              {/* Card Top Row */}
              <div className="flex justify-between items-center mb-4">
                <div className="skeleton-pulse h-3.5 w-24 bg-muted/40 rounded-full" />
                <div className="skeleton-pulse h-5.5 w-16 bg-muted/60 rounded-full" />
              </div>
              {/* Card Title */}
              <div className="skeleton-pulse h-8 w-3/4 bg-muted rounded-lg mt-8" />
              {/* Card Price */}
              <div className="skeleton-pulse h-12 w-28 bg-primary/15 rounded-xl mt-6" />
            </div>

            <div className="flex-1 flex flex-col justify-end">
              {/* Card Perks */}
              <div className="space-y-3 mb-8">
                <div className="skeleton-pulse h-3 w-full bg-muted/30 rounded-full" />
                <div className="skeleton-pulse h-3 w-11/12 bg-muted/30 rounded-full" />
                <div className="skeleton-pulse h-3 w-5/6 bg-muted/30 rounded-full" />
                <div className="skeleton-pulse h-3 w-2/3 bg-muted/30 rounded-full" />
              </div>

              {/* Stay Provision Block */}
              <div className="skeleton-pulse h-12 bg-muted/20 rounded-xl mb-6" />

              {/* Card Qty Selector */}
              <div className="flex justify-between items-center pt-4 border-t border-border/30">
                <div className="skeleton-pulse h-3.5 w-8 bg-muted/40 rounded-full" />
                <div className="skeleton-pulse h-9 w-24 bg-muted/50 rounded-xl" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScheduleSkeleton() {
  return (
    <div className="pt-32 pb-32 max-w-7xl mx-auto px-4 lg:px-12 text-center min-h-screen relative flex flex-col">
      {/* Header */}
      <div className="flex flex-col items-start gap-4 mb-16 relative z-20 text-left">
        <div className="skeleton-pulse h-5 w-20 bg-primary/10 border border-primary/20 rounded-full" />
        <div className="skeleton-pulse h-10 w-56 bg-muted rounded-xl mt-2" />
        <div className="skeleton-pulse h-4 w-3/4 max-w-xl bg-muted/40 rounded-full mt-4" />
        {/* Lap tabs */}
        <div className="flex bg-muted/20 border border-border/50 p-1.5 rounded-full mt-8 gap-4 w-fit px-4 py-2.5">
          <div className="skeleton-pulse h-9 w-28 bg-primary/15 rounded-full" />
          <div className="skeleton-pulse h-9 w-28 bg-muted/30 rounded-full" />
        </div>
      </div>

      {/* Timeline arena */}
      <div className="relative w-full max-w-4xl mx-auto flex flex-col pt-10">
        {[1, 2, 3, 4].map((i) => {
          const isLeft = i % 2 !== 0;
          return (
            <div key={i} className="relative w-full h-48">
              {/* Timeline Center Node */}
              <div className="absolute left-10 md:left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-primary/30 bg-background z-20 flex items-center justify-center">
                <div className="skeleton-pulse w-3 h-3 rounded-full bg-primary/30" />
              </div>

              {/* Event Card Wrapper */}
              <div
                className={`absolute top-0 z-30 w-[calc(100%-5rem)] md:w-85 
                left-18 -translate-y-1/2 md:left-[25%] md:-translate-x-1/2 md:translate-y-[-115%]
                ${!isLeft ? "md:left-[75%]" : ""}
              `}
              >
                <div className="w-full border border-border bg-card/40 rounded-xl p-5 flex flex-col text-left space-y-4">
                  {/* Card top details */}
                  <div className="flex justify-between items-center border-b border-border/30 pb-3">
                    <div className="skeleton-pulse h-4 w-20 bg-muted/40 rounded-full" />
                    <div className="skeleton-pulse h-5 w-16 bg-primary/10 border border-primary/20 rounded-sm" />
                  </div>
                  {/* Card main text */}
                  <div className="skeleton-pulse h-6 w-3/4 bg-muted rounded-md" />
                  <div className="skeleton-pulse h-3.5 w-1/2 bg-muted/40 rounded-full" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function EventsSkeleton() {
  return (
    <div className="pt-32 pb-24 max-w-400 mx-auto px-6 lg:px-12 text-left min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Info & Stats */}
        <div className="lg:col-span-4 space-y-10">
          <div>
            <div className="skeleton-pulse h-5 w-20 bg-primary/10 border border-primary/20 rounded-full mb-3" />
            <div className="skeleton-pulse h-10 w-44 bg-muted rounded-xl" />
            <div className="skeleton-pulse h-3.5 w-full bg-muted/40 rounded-full mt-6" />
            <div className="skeleton-pulse h-3.5 w-5/6 bg-muted/40 rounded-full mt-2" />
            <div className="skeleton-pulse h-3.5 w-2/3 bg-muted/40 rounded-full mt-2" />
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 gap-6 border-t border-border pt-8 mt-8">
            <div className="space-y-3">
              <div className="skeleton-pulse h-3 w-16 bg-muted/40 rounded-full" />
              <div className="skeleton-pulse h-6 w-24 bg-primary/15 rounded-lg" />
            </div>
            <div className="space-y-3">
              <div className="skeleton-pulse h-3 w-20 bg-muted/40 rounded-full" />
              <div className="skeleton-pulse h-6 w-16 bg-muted/60 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Right Column: Flowing Menu */}
        <div className="lg:col-span-8 space-y-4 border-y border-border py-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-20 bg-card/40 border border-border/30 rounded-xl flex items-center justify-between px-6 skeleton-pulse"
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="h-4 w-8 bg-muted/30 rounded-full shrink-0" />
                <div className="h-6 w-48 bg-muted rounded-lg" />
              </div>
              <div className="flex items-center gap-8 font-mono shrink-0">
                <div className="h-3.5 w-32 bg-muted/40 rounded-full hidden md:block" />
                <div className="h-6.5 w-28 bg-primary/10 border border-primary/20 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SponsorsSkeleton() {
  return (
    <div className="pt-32 pb-24 max-w-400 mx-auto px-6 lg:px-12 min-h-screen flex flex-col text-left">
      <div className="max-w-4xl">
        {/* Header Tag and Title */}
        <div className="skeleton-pulse h-5 w-20 bg-primary/10 border border-primary/20 rounded-full mb-3" />
        <div className="skeleton-pulse h-10 w-48 bg-muted rounded-xl mb-4" />
        <div className="skeleton-pulse h-4 w-3/4 max-w-2xl bg-muted/40 rounded-full mt-6" />
        <div className="skeleton-pulse h-4 w-1/2 max-w-xl bg-muted/40 rounded-full mt-2" />
      </div>

      {/* High Tier Section */}
      <div className="mt-16">
        <div className="flex items-center gap-4 mb-8">
          <div className="skeleton-pulse h-7 w-36 bg-primary/10 border border-primary/20 rounded-full" />
          <div className="h-px flex-1 bg-muted/20" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="h-44 border border-border/50 bg-card/40 rounded-2xl p-6 flex flex-col justify-center items-center space-y-3 skeleton-pulse"
            >
              <div className="h-14 w-32 bg-muted/40 rounded-xl" />
              <div className="h-4.5 w-28 bg-muted/80 rounded-md" />
              <div className="h-3 w-20 bg-muted/30 rounded-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Mid Tier Section */}
      <div className="mt-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="skeleton-pulse h-7 w-32 bg-orange-400/10 border border-orange-400/20 rounded-full" />
          <div className="h-px flex-1 bg-muted/20" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-32 border border-border/50 bg-card/40 rounded-2xl p-4 flex flex-col justify-center items-center space-y-2.5 skeleton-pulse"
            >
              <div className="h-10 w-24 bg-muted/40 rounded-lg" />
              <div className="h-4 w-20 bg-muted/80 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TeamSkeleton() {
  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12 text-left min-h-screen flex flex-col">
      <div className="max-w-4xl">
        {/* Header Tag and Title */}
        <div className="skeleton-pulse h-5 w-20 bg-primary/10 border border-primary/20 rounded-full mb-3" />
        <div className="skeleton-pulse h-10 w-44 bg-muted rounded-xl mb-4" />
        <div className="skeleton-pulse h-4.5 w-3/4 max-w-xl bg-muted/40 rounded-full mt-6" />
      </div>

      <div className="mt-20">
        {/* Section title */}
        <div className="skeleton-pulse h-5 w-56 bg-primary/10 border border-primary/20 rounded mb-8" />

        {/* Grid of Crew Member Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="border border-border/50 bg-card/40 rounded-2xl p-5 flex flex-col items-center space-y-4 skeleton-pulse"
            >
              <div className="h-56 w-full bg-muted/30 rounded-xl" />
              <div className="h-5 w-32 bg-muted rounded-md" />
              <div className="h-3.5 w-20 bg-muted/60 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function EventDetailsSkeleton() {
  return (
    <div className="pt-32 pb-24 text-left max-w-400 mx-auto px-6 lg:px-12 min-h-screen">
      {/* Back button */}
      <div className="skeleton-pulse h-4.5 w-24 bg-muted/40 rounded-full mb-8" />

      {/* Main Details Header */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-12 items-end mb-16">
        <div className="space-y-4">
          <div className="skeleton-pulse h-5 w-36 bg-primary/10 border border-primary/20 rounded" />
          <div className="skeleton-pulse h-16 w-3/4 bg-muted rounded-2xl" />
          <div className="skeleton-pulse h-4 w-full max-w-xl bg-muted/40 rounded-full" />
        </div>
        <div className="border-l-2 border-primary/30 pl-6 space-y-2">
          <div className="skeleton-pulse h-3 w-12 bg-muted/40 rounded-full" />
          <div className="skeleton-pulse h-6 w-48 bg-muted rounded-md" />
        </div>
      </div>

      {/* Body Columns */}
      <div className="grid md:grid-cols-2 gap-12 mt-12 border-t border-border/30 pt-12">
        <div className="space-y-8">
          <div>
            <div className="skeleton-pulse h-7 w-32 bg-muted rounded-lg mb-4" />
            <div className="space-y-3">
              <div className="skeleton-pulse h-3.5 w-full bg-muted/30 rounded-full" />
              <div className="skeleton-pulse h-3.5 w-11/12 bg-muted/30 rounded-full" />
              <div className="skeleton-pulse h-3.5 w-5/6 bg-muted/30 rounded-full" />
            </div>
          </div>
          <div>
            <div className="skeleton-pulse h-7 w-24 bg-muted rounded-lg mb-4" />
            <div className="space-y-3">
              <div className="skeleton-pulse h-3.5 w-full bg-muted/30 rounded-full" />
              <div className="skeleton-pulse h-3.5 w-4/5 bg-muted/30 rounded-full" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="skeleton-pulse h-7 w-32 bg-muted rounded-lg mb-4" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="skeleton-pulse h-5 w-6 bg-primary/25 rounded" />
                <div className="skeleton-pulse h-5 w-5/6 bg-muted/30 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneralSkeleton() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground pt-32 pb-24">
      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 sm:px-10">
        <div className="mb-16">
          <div className="space-y-4 rounded-2xl border border-border/50 bg-card/40 p-8">
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
        <div className="mb-4 flex items-center justify-between">
          <div className="skeleton-pulse h-3 w-32 rounded-full bg-muted" />
          <div className="skeleton-pulse h-3 w-16 rounded-full bg-primary/20" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="space-y-4 rounded-2xl border border-border/50 bg-card/40 p-5"
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
