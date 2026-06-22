import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TransitionLink as Link } from "./ui/TransitionLink";
import { EVENTS } from "../lib/store";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (min-height: 1200px)", () => {
      // Parallax effect: slide footer contents as we scroll
      gsap.fromTo(
        contentRef.current,
        { yPercent: 15 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, []);

  const eventCountWord =
    [
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
    ][EVENTS.length] || EVENTS.length;

  return (
    <footer
      ref={footerRef}
      className="w-full reveal-footer select-none overflow-hidden bg-background"
    >
      {/* Outer wrapper to containerize the card and apply side margins */}
      <div
        ref={contentRef}
        className="mx-4 mb-4 lg:mx-8 lg:mb-8 pt-12 pb-6 px-6 md:pt-16 md:pb-8 md:px-12 lg:pt-20 lg:pb-12 lg:px-16 flex flex-col justify-between shadow-2xl"
      >
        <div>
          {/* Brand Header */}
          <div className="flex justify-center mb-15">
            <img
              src="/full.png"
              alt="E-Summit '26 Logo"
              className="h-30 md:h-36 lg:h-48 object-contain select-none pointer-events-none"
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 text-left">
            {/* Description Card */}
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-between p-6 md:p-8 rounded-4xl">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    / 01 — Mission
                  </span>
                </div>
                <p className="font-sans text-sm md:text-base text-muted-foreground leading-relaxed">
                  India's flagship mobility-focused entrepreneurship summit.
                  Shifting gears into the future of motion—exploring electric
                  vehicles, autonomous transport, and advanced mobility systems
                  through {eventCountWord} flagship events.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-border/10 flex justify-between items-center">
                <Link
                  to="/events"
                  className="text-primary font-mono text-xs hover:underline flex items-center gap-1"
                >
                  Explore the circuit
                  <span className="font-sans">→</span>
                </Link>
              </div>
            </div>

            {/* Venue Card */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col justify-between p-6 md:p-8 rounded-4xl">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    / 02 — Venue
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-display text-lg font-semibold text-foreground">
                      IIT Dharwad
                    </h4>
                    <p className="font-sans text-sm text-muted-foreground mt-1">
                      Karnataka, India
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border/10">
                    <span className="font-mono text-xs text-muted-foreground block uppercase tracking-wider">
                      Event Dates
                    </span>
                    <span className="font-sans text-sm text-foreground font-medium mt-1 block">
                      March 6–8, 2026
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Link
                  to="/schedule"
                  className="text-primary font-mono text-xs hover:underline flex items-center gap-1 hover:translate-x-1 transition-transform"
                >
                  Event Schedule <span className="font-sans">→</span>
                </Link>
              </div>
            </div>

            {/* Contact Card */}
            <div className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col justify-between p-6 md:p-8 rounded-4xl">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    / 03 — Contact Us
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block">
                      Inquiries
                    </span>
                    <a
                      href="mailto:outreach.iic@iitdh.ac.in"
                      className="font-sans text-sm text-foreground hover:text-primary transition-colors mt-1 block break-all"
                    >
                      outreach.iic@iitdh.ac.in
                    </a>
                  </div>
                  <div className="pt-4 border-t border-border/10">
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block">
                      Hotline
                    </span>
                    <a
                      href="tel:+919876543210"
                      className="font-sans text-sm text-foreground hover:text-primary transition-colors mt-1 block"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-8">
                {[
                  { name: "IG", url: "https://instagram.com" },
                  { name: "X", url: "https://x.com" },
                  { name: "LI", url: "https://linkedin.com" },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 border border-border/30 rounded-full text-center font-mono text-[10px] text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 pt-8 border-t border-border/25 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left font-mono text-xs text-muted-foreground">
          <span>© 2026 IIC, IIT Dharwad. All rights reserved.</span>
          <div className="flex items-center gap-2">
            <span>Built for speed.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
