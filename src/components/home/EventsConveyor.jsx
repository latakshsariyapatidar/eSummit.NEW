import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { TransitionLink as Link } from "../ui/TransitionLink";
import { EVENTS } from "@/lib/store";

export function EventsConveyor() {
  const numberToWord = (num) => {
    const words = [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
    ];
    return words[num] || num.toString();
  };

  const eventCountWord = numberToWord(EVENTS.length);
  const capitalizedEventCountWord =
    eventCountWord.charAt(0).toUpperCase() + eventCountWord.slice(1);

  return (
    <section className="py-28 md:py-36 border-t border-border/25">
      <div className="mx-auto max-w-400 px-6 lg:px-12">
        <SectionHeader
          tag="/ 03 — The Grid"
          title={
            <>
              {capitalizedEventCountWord} events.
              <br />
              One circuit.
            </>
          }
          layout="split"
        >
          <Link
            to="/events"
            className="hidden md:inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest hover:text-primary transition-colors text-right"
          >
            All events <span className="font-sans">→</span>
          </Link>
        </SectionHeader>
      </div>
      <div className="w-full overflow-hidden relative select-none">
        <div className="event-marquee-container">
          <div className="event-marquee-track">
            {/* Double loop of EVENTS for a seamless infinite loop */}
            {Array.from({ length: 2 }).map((_, loopIdx) => (
              <div key={loopIdx} className="flex gap-6 pr-6">
                {EVENTS.map((e, i) => (
                  <Link
                    key={`${e.slug}-${loopIdx}`}
                    to={`/event/${e.slug}`}
                    className="event-marquee-card group w-70 md:w-87.5 border border-border/20 bg-card/20 backdrop-blur-sm p-8 rounded-2xl hover:bg-card/40 flex flex-col justify-between min-h-80 cursor-pointer text-left"
                  >
                    <div>
                      <div className="flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-12">
                        <span>No. {String(i + 1).padStart(2, "0")}</span>
                        <span className="px-2.5 py-0.5 border border-border/30 rounded-full text-[9px]">
                          {e.day}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl font-semibold group-hover:text-primary transition-colors duration-300">
                        {e.name}
                      </h3>
                      <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                        {e.tagline}
                      </p>
                    </div>
                    <div className="mt-12 pt-4 border-t border-border/10 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest">
                      <span className="text-muted-foreground">{e.time}</span>
                      <span className="text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Explore <span className="font-sans">→</span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
