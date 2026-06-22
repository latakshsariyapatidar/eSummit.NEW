import React from "react";

export function Marquee() {
  return (
    <section className="border-y border-border/20 bg-asphalt/50 backdrop-blur-sm py-4 overflow-hidden">
      <div className="marquee-track whitespace-nowrap font-mono text-xs md:text-sm tracking-[0.25em] font-medium text-muted-foreground/80">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex gap-16 items-center pr-16">
            {[
              "AUTOMOBILES",
              "✦",
              "TRANSPORT",
              "✦",
              "ELECTRIC",
              "✦",
              "LOGISTICS",
              "✦",
              "MOBILITY",
              "✦",
              "INFRASTRUCTURE",
              "✦",
            ].map((w, j) => (
              <span
                key={j}
                className={j % 2 === 0 ? "text-foreground" : "text-primary/70"}
              >
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
