import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionLink as Link } from "../ui/TransitionLink";
import { Countdown } from "../Countdown";
import Hyperspeed from "../Hyperspeed";
import HeroImage from "/HeroImage.svg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    const ctx = gsap.context(() => {
      const split = headlineRef.current.querySelectorAll(".word");

      gsap.from(split, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.3,
      });

      gsap.from(".hero-meta", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        delay: 0.9,
        stagger: 0.1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative isolate min-h-screen overflow-hidden"
    >
      {/* ================= Background ================= */}

      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0">
          <Hyperspeed
            effectOptions={{
              distortion: "turbulentDistortion",
              length: 400,
              roadWidth: 9,
              islandWidth: 2,
              lanesPerRoad: 3,

              fov: 90,
              fovSpeedUp: 150,
              speedUp: 2.8,

              carLightsFade: 0.55,

              totalSideLightSticks: 70,
              lightPairsPerRoadWay: 70,

              shoulderLinesWidthPercentage: 0.05,
              brokenLinesWidthPercentage: 0.1,
              brokenLinesLengthPercentage: 0.5,

              lightStickWidth: [0.12, 0.5],
              lightStickHeight: [1.3, 1.7],
              movingAwaySpeed: [80, 110],
              movingCloserSpeed: [-170, -220],

              carLightsLength: [35, 80],
              carLightsRadius: [0.05, 0.14],

              carWidthPercentage: [0.3, 0.5],
              carShiftX: [-0.2, 0.2],
              carFloorSeparation: [0.05, 1],

              colors: {
                roadColor: 0x181715,
                islandColor: 0x25231f,
                background: 0x141311,
                shoulderLines: 0x403d38,
                brokenLines: 0x55504a,

                leftCars: [0xffb347, 0xffa726, 0xffc107],
                rightCars: [0xe53935, 0xd32f2f, 0xb71c1c],

                sticks: 0xd8d3c9,
              },

              onSpeedUp: () => {},
              onSlowDown: () => {},
            }}
          />
        </div>

        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* ================= Hero ================= */}

      <div className="relative z-30 mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center px-6 self-center justify-center ">
        {/* Hero */}

        <div className="mt-36 lg:mt-44 flex flex-col items-center text-center">
          <h1
            ref={headlineRef}
            className="font-display font-bold leading-[0.9] tracking-tight"
          >
            <div className="overflow-hidden">
              <span className="word block text-5xl sm:text-6xl lg:text-[5rem]">
                <img
                  src={HeroImage}
                  alt="E-Summit 2026"
                  className="mx-auto w-70 sm:w-90 md:w-125 lg:w-162.5 xl:w-190 h-auto object-contain select-none pointer-events-none"
                />
              </span>
            </div>
          </h1>
          <div className="hero-meta flex flex-col gap-3 sm:flex-row">
            <Link
              to="/buy"
              className="rounded-full bg-primary px-7 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-primary-foreground"
            >
              Get Pass
              <span className="ml-2 font-sans">→</span>
            </Link>

            <Link
              to="/events"
              className="rounded-full border border-border/60 bg-background/15 px-7 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.22em] backdrop-blur-md "
            >
              Explore Events
            </Link>
          </div>
        </div>

        {/* Countdown */}

        <div className="hero-meta mt-20 mb-10 flex w-full justify-center pointer-events-none">
          <div className="w-full max-w-md">
            <div className="mb-4 text-center">
              <span className="font-mono text-[14px] uppercase tracking-[0.4em] text-foreground">
                Starts In
              </span>
            </div>

            <Countdown />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
