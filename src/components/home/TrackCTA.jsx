import React from "react";
import { TransitionLink as Link } from "../ui/TransitionLink";
import track from "/track.jpg";

export function TrackCTA() {
  return (
    <section className="relative h-[60vh] overflow-hidden flex items-center justify-center border-t border-b border-border/20">
      <img
        src={track}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-15"
      />
      <div className="absolute inset-0 bg-linear-to-b from-background via-transparent to-background" />
      <div className="relative text-center px-6 max-w-2xl">
        <div className="font-mono text-xs uppercase tracking-[0.25em] text-primary mb-6">
          Lights out — go go go
        </div>
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
          Take pole position.
        </h2>
        <Link
          to="/buy"
          className="inline-flex items-center gap-2.5 mt-10 px-10 py-4 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:bg-primary/90 transition-all rounded-full hover:scale-105 shadow-lg shadow-primary/20"
        >
          Get your pass <span className="font-sans text-sm">→</span>
        </Link>
      </div>
    </section>
  );
}
