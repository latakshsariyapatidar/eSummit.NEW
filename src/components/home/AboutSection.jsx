import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { useEvents } from "@/lib/store";
import dial from "/dial.avif";

export function AboutSection() {
  const events = useEvents();

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

  const eventCountWord = numberToWord(events.length);

  return (
    <section className="mx-auto max-w-400 px-6 lg:px-12 py-28 md:py-36 grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-border/30 shadow-2xl group">
        <img
          src={dial}
          alt="Speedometer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.2em] text-chrome bg-background/90 backdrop-blur-sm border border-border/40 px-4 py-2 rounded-full">
          RPM ▲ 6900
        </div>
      </div>
      <div className="space-y-8">
        <SectionHeader
          tag="/ 02 — The Brief"
          title={
            <>
              Built for innovation. <br className="hidden md:inline" />
              Powered by <span className="text-primary">ambition.</span>
            </>
          }
          description={`Hosted at IIT Dharwad, E-Summit is a two-day gathering of students, builders, and changemakers driven by a passion for solving real-world problems. Across ${eventCountWord} flagship events, participants challenge conventions, share ideas, and discover new possibilities through innovation and entrepreneurship.`}
        />
        <div className="grid grid-cols-3 gap-6 border-t border-border/30 pt-8 mt-12 text-left">
          {[
            { n: "2", l: "Days" },
            { n: `${events.length}`, l: "Flagship Events" },
            { n: "300+", l: "Registrations" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col">
              <div className="font-display text-3xl md:text-4xl font-semibold tracking-tight">
                {s.n}
              </div>
              <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
