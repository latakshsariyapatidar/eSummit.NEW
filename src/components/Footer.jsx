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

  const socialLinks = [
    {
      name: "IG",
      url: "https://instagram.com",
      icon: (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      ),
    },
    {
      name: "X",
      url: "https://x.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: "LI",
      url: "https://linkedin.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      ref={footerRef}
      className="w-full reveal-footer select-none overflow-hidden bg-background md:min-h-screen"
    >
      <div
        ref={contentRef}
        className="flex flex-col justify-start h-full px-4 sm:px-8 md:px-16 lg:px-30 pt-8 md:pt-16 lg:pt-24 pb-6"
      >
        {/* ===== DESKTOP LAYOUT (md+) ===== */}
        <div className="hidden md:block">
          {/* Brand Header */}
          <div className="flex justify-center mb-16 lg:mb-24">
            {" "}
            <img
              src="/esummit_text.svg"
              alt="E-Summit '26 Logo"
              className="md:h-28 lg:h-40 object-contain select-none pointer-events-none"
            />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-12 gap-6 text-left">
            {/* Description Card */}
            <div className="col-span-12 lg:col-span-6 flex flex-col justify-start p-6 md:p-8 rounded-4xl">
              <div>
                <div className="flex items-center justify-start mb-8">
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
              <div className="mt-8 pt-6 border-t border-border/10 flex justify-start items-center">
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
            <div className="col-span-6 lg:col-span-3 flex flex-col justify-start p-6 md:p-8 rounded-4xl">
              <div>
                <div className="flex items-center justify-start mb-8">
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
            <div className="col-span-6 lg:col-span-3 flex flex-col justify-start p-6 md:p-8 rounded-4xl">
              <div>
                <div className="flex items-center justify-start mb-8">
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
                      href="tel:+918910189085"
                      className="font-sans text-sm text-foreground hover:text-primary transition-colors mt-1 block"
                    >
                      +91 89101 89085
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-8 justify-around">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit px-2 py-2 border border-border/30 rounded-full flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary hover:bg-primary/5 transition-all duration-300"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ===== MOBILE LAYOUT (below md) ===== */}
        <div className="md:hidden flex flex-col flex-1 justify-end h-fit">
          {/* Row: Logo (left) + Venue/Contact stacked (right) */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="shrink-0 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="E-Summit '26 Logo"
                className="h-16 w-16 object-contain select-none pointer-events-none"
              />
            </div>

            {/* Venue + Contact stacked */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Venue */}
              <div className="px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary block mb-1">
                  Venue
                </span>
                <span className="font-display text-sm font-semibold text-foreground block">
                  IIT Dharwad
                </span>
                <span className="font-sans text-xs text-muted-foreground">
                  Karnataka · March 6–8, 2026
                </span>
              </div>

              {/* Contact */}
              <div className="px-4 py-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-primary block mb-1">
                  Contact
                </span>
                <a
                  href="mailto:outreach.iic@iitdh.ac.in"
                  className="font-sans text-xs text-foreground block break-all"
                >
                  outreach.iic@iitdh.ac.in
                </a>
                <a
                  href="tel:+918910189085"
                  className="font-sans text-xs text-muted-foreground mt-0.5 block"
                >
                  +91 89101 89085
                </a>
              </div>
            </div>
          </div>

          {/* Social Media Links — full width */}
          <div className="flex gap-2 mt-4 justify-around">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit px-2.5 border rounded-full py-2.5 flex items-center justify-center text-muted-foreground"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-4 md:mt-6 mb-0 md:mb-6 pt-4 md:pt-8 border-t border-border/25 flex flex-row justify-start items-center gap-4 text-center sm:text-left font-mono text-xs text-muted-foreground">
          <span>© 2026 IIC, IIT Dharwad.</span>
        </div>
      </div>
    </footer>
  );
}
