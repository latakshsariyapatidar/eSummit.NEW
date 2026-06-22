import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionLink as Link } from "../ui/TransitionLink";
import heroCar from "../../assets/hero-car-new.png";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);

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
  );
}
