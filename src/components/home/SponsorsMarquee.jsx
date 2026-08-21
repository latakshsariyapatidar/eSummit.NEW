import { useState, useEffect } from "react";
import { SectionHeader } from "../ui/SectionHeader";
import { TransitionLink as Link } from "../ui/TransitionLink";
import { fetchSponsors } from "@/lib/store";

const DEFAULT_SPONSORS = [
  {
    name: "BEACON",
    imgUrl:
      "https://res.cloudinary.com/db69ffwwa/image/upload/v1787207037/3_u2wbpn.png",
    tier: "Title Sponsor",
    websiteUrl: "",
  },
  {
    name: "ENTRA",
    imgUrl:
      "https://res.cloudinary.com/db69ffwwa/image/upload/v1787207036/image002_mnnolj.png",
    tier: "Co-Powered By",
    websiteUrl: "",
  },
  {
    name: "FLUKE",
    imgUrl:
      "https://res.cloudinary.com/db69ffwwa/image/upload/v1787207036/download_dlsbaz.png",
    tier: "Innovation Sponsor",
    websiteUrl: "",
  },
  {
    name: "Unstop",
    imgUrl:
      "https://res.cloudinary.com/db69ffwwa/image/upload/v1787207036/unstop_m3b1k3.png",
    tier: "Platform Partner",
    websiteUrl: "",
  },
  {
    name: "ARTS",
    imgUrl:
      "https://res.cloudinary.com/db69ffwwa/image/upload/v1787207036/1630626865604_dy0mpo.jpg",
    tier: "Ecosystem Partner",
    websiteUrl: "",
  },
];

export function SponsorsMarquee() {
  const [sponsors, setSponsors] = useState(DEFAULT_SPONSORS);

  useEffect(() => {
    fetchSponsors()
      .then((data) => {
        if (data && data.length > 0) {
          // Merge API data with default websiteUrls if missing
          const merged = data.map((item) => {
            const fallback = DEFAULT_SPONSORS.find(
              (d) => d.name.toLowerCase() === item.name?.toLowerCase(),
            );
            return {
              ...item,
              websiteUrl:
                item.websiteUrl ||
                item.website ||
                item.href ||
                fallback?.websiteUrl ||
                "https://iitdh.ac.in/",
            };
          });
          setSponsors(merged);
        }
      })
      .catch((err) => {
        console.error("Error fetching sponsors for marquee:", err);
      });
  }, []);

  return (
    <section className="py-24 md:py-32 border-t border-border/20">
      <div className="mx-auto max-w-400 px-6 lg:px-12">
        <SectionHeader
          tag="/ PARTNERS"
          title={
            <>
              Powered by <br className="hidden md:inline" />
              <span className="text-primary">Industry Leaders.</span>
            </>
          }
          layout="split"
        >
          <Link
            to="/sponsors"
            className="md:inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-tightest hover:text-primary transition-colors text-right"
          >
            All partners <span className="font-sans">→</span>
          </Link>
        </SectionHeader>
      </div>

      <div className="w-full overflow-hidden relative select-none mt-6">
        {/* Gradient edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="sponsor-marquee-container">
          <div className="sponsor-marquee-track">
            {/* Double loop of sponsors for a seamless infinite scroll */}
            {Array.from({ length: 2 }).map((_, loopIdx) => (
              <div key={loopIdx} className="flex gap-6 pr-6 items-center">
                {sponsors.map((sponsor, i) => {
                  const href =
                    sponsor.websiteUrl ||
                    sponsor.website ||
                    sponsor.href ||
                    sponsor.link ||
                    "#";

                  return (
                    <a
                      key={`${sponsor.name || i}-${loopIdx}`}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex flex-col items-center justify-between w-64 md:w-72 p-6 rounded-2xl border border-border/20 bg-card/20 backdrop-blur-sm hover:bg-card/50 hover:border-primary/40 transition-all duration-300 cursor-pointer text-center"
                    >
                      {/* Logo Frame */}
                      <div className="h-20 w-full rounded-xl bg-white/[0.03] border border-white/[0.04] p-3 flex items-center justify-center overflow-hidden mb-4 group-hover:bg-white/[0.06] transition-colors">
                        <img
                          src={sponsor.imgUrl || sponsor.logoUrl}
                          alt={sponsor.name}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Name & Tier */}
                      <div className="w-full">
                        <h4 className="font-display text-base font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                          {sponsor.name}
                        </h4>
                        {sponsor.tier && (
                          <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                            {sponsor.tier}
                          </p>
                        )}
                      </div>

                      {/* Link Telemetry */}
                      <div className="mt-4 pt-3 w-full border-t border-border/10 flex items-center justify-center gap-1 font-mono text-[9px] uppercase tracking-widest text-primary/80 group-hover:text-primary transition-colors">
                        <span>Visit Website</span>
                        <span className="font-sans text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                          ↗
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
