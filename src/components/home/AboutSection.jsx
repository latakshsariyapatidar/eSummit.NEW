import React from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { useEvents } from "@/lib/store";
import logo from "/logo.png";
import { AsciiArt } from "../CustomPremade/ascii-art";

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
      <div className="relative hidden lg:block overflow-hidden rounded-2xl">
        <AsciiArt
          src={logo}
          resolution={100}
          color="var(--color-primary)"
          animationStyle="fade"
          animationDuration={0.5}
          animateOnView={false}
          className="mx-auto aspect-square w-full max-w-lg bg-neutral-950"
          objectFit="contain"
        />
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
