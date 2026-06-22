import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Countdown } from "@/components/Countdown";
import { TransitionLink as Link } from "../components/ui/TransitionLink";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { EVENTS, FAQS } from "@/lib/store";

import heroCar from "../assets/hero-car-new.png";
import dial from "@/assets/dial.jpg";
import track from "@/assets/track.jpg";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Home() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const [activeFaq, setActiveFaq] = useState(null);

  useDocumentTitle("E-Summit 2026 — Shift Gears | IIT Dharwad");

  useEffect(() => {
    if (!headlineRef.current) return;
    const ctx = gsap.context(() => {
      const split = headlineRef.current.querySelectorAll(".word");
      gsap.from(split, {
        y: 120,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.3,
      });
      gsap.from(".hero-meta", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 1.1,
        stagger: 0.1,
      });
      gsap.to(".hero-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-screen overflow-hidden flex items-end pb-24 isolate"
      >
        <div className="hero-bg absolute inset-0 -z-10">
          <img
            src={heroCar}
            alt=""
            width={1920}
            height={1280}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/70 to-background/30" />
        </div>
        <div className="mx-auto max-w-400 w-full px-6 lg:px-12 text-left">
          <div className="hero-meta font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
            E-Summit 2026 / IIT Dharwad
          </div>
          <h1
            ref={headlineRef}
            className="font-display text-5xl sm:text-7xl lg:text-[6.5rem] leading-[1.05] tracking-tight font-bold max-w-5xl"
          >
            <div>
              <span className="word inline-block mr-3 md:mr-6">Shift</span>
              <span className="word inline-block">Gears.</span>
            </div>
            <div>
              <span className="word inline-block mr-3 md:mr-6 text-primary">
                Redraw
              </span>
              <span className="word inline-block">Motion.</span>
            </div>
          </h1>

          <div className="mt-12 grid md:grid-cols-[1fr_auto] gap-8 items-end">
            <p className="hero-meta max-w-md text-muted-foreground text-sm md:text-base leading-relaxed">
              The flagship entrepreneurship summit where ideas meet opportunity,
              and the next generation of startups begins its journey.
            </p>
            <div className="hero-meta flex flex-col sm:flex-row gap-4">
              <Link
                to="/buy"
                className="px-8 py-4 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:bg-primary/90 transition-all rounded-full shadow-lg shadow-primary/10 hover:scale-[1.02] text-center"
              >
                Reserve your Spot <span className="font-sans">→</span>
              </Link>
              <Link
                to="/schedule"
                className="px-8 py-4 border border-border/80 bg-background/30 backdrop-blur-sm font-mono text-xs uppercase tracking-[0.2em] font-semibold hover:border-primary transition-all rounded-full hover:scale-[1.02] text-center"
              >
                Event Schedule
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER */}
      {/* <section className="mx-auto max-w-200 px-6 lg:px-12 py-12 md:py-16 mb-20">
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
          <img
            src="/full.png"
            alt="E-Summit 2026 Official Banner"
            width={1800}
            height={641}
            loading="eager"
          />
        </div>
      </section> */}

      {/* Marquee */}
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
                  className={
                    j % 2 === 0 ? "text-foreground" : "text-primary/70"
                  }
                >
                  {w}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* COUNTDOWN */}
      <section className="mx-auto max-w-400 px-6 lg:px-12 py-28 md:py-36">
        <SectionHeader
          tag="/ 01 — Lights Out"
          title="Until launch."
          description="The countdown to E-Summit 2026 has already started."
          layout="split"
        />
        <Countdown />
      </section>

      {/* ABOUT split */}
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
            description="THosted at IIT Dharwad, E-Summit is a two-day gathering of students, builders, and changemakers driven by a passion for solving real-world problems. Across eight flagship events, participants challenge conventions, share ideas, and discover new possibilities through innovation and entrepreneurship."
          />
          <div className="grid grid-cols-3 gap-6 border-t border-border/30 pt-8 mt-12 text-left">
            {[
              { n: "2", l: "Days" },
              { n: "8", l: "Flagship Events" },
              { n: "500+", l: "Registrations" },
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

      {/* EVENTS conveyor */}
      <section className="py-28 md:py-36 border-t border-border/25">
        <div className="mx-auto max-w-400 px-6 lg:px-12">
          <SectionHeader
            tag="/ 03 — The Grid"
            title={
              <>
                Five events.
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

      {/* TRACK CTA */}
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

      {/* FAQ */}
      <section className="py-28 md:py-36">
        <div className="mx-auto max-w-400 px-6 lg:px-12 grid lg:grid-cols-[1fr_2fr] gap-16">
          <SectionHeader
            tag="/ 04 — Pit Stop"
            title={
              <>
                Briefing
                <br />
                questions.
              </>
            }
          />
          <div className="divide-y divide-border/20 border-t border-b border-border/20 text-left">
            {FAQS.map((f, i) => {
              const isOpen = activeFaq === i;
              return (
                <div key={i} className="py-6">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : i)}
                    className="flex w-full justify-between items-center cursor-pointer text-left focus:outline-none group"
                  >
                    <span className="font-sans text-lg md:text-xl font-medium tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 pr-6">
                      {f.q}
                    </span>
                    <span
                      className={`font-mono text-xl text-primary transition-transform duration-300 select-none transform ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0 mt-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-muted-foreground/80 leading-relaxed max-w-2xl">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
