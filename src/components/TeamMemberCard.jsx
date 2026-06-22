import React from "react";

/**
 * TeamMemberCard
 *
 * Props:
 *   team: {
 *     lead: {
 *       name: string,
 *       role: string,
 *       bio: string,
 *       image: string,
 *       email: string,
 *       linkedin?: string,
 *       team?: string,   // for functional leads
 *       event?: string,  // for event directors
 *     },
 *     crew: Array<{
 *       name: string,
 *       image: string,
 *       linkedin?: string,
 *     }>
 *   }
 */
export function TeamMemberCard({ team }) {
  const m = team.lead;
  const crew = team.crew || [];
  const teamTitle = m.team || m.event;

  const leadImage = `https://robohash.org/${encodeURIComponent(m.name)}`;

  return (
    <div className="group relative aspect-4/5 w-full rounded-3xl overflow-hidden border border-border/30 shadow-2xl flex flex-col justify-end text-left select-none transition-all duration-500 hover:border-primary/50 hover:shadow-primary/5">
      <img
        src={leadImage}
        alt={m.name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent opacity-95 transition-opacity duration-300" />

      <div className="relative p-6 z-10 flex flex-col justify-end h-full w-full">
        {teamTitle && (
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
            {teamTitle}
          </span>
        )}

        <div className="flex items-center gap-2">
          <h3 className="font-display text-xl font-bold text-white tracking-tight leading-none">
            <a
              href={
                m.linkedin ||
                `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(m.name)}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors hover:underline"
            >
              {m.name}
            </a>
          </h3>
        </div>

        <p className="font-mono text-xs uppercase tracking-wider text-primary font-semibold mt-2">
          {m.role}
        </p>

        <p
          className={`text-white/80 text-xs font-sans leading-relaxed mt-2 line-clamp-3 transition-all duration-300 ${
            crew.length > 0 ? "group-hover:line-clamp-1" : ""
          }`}
        >
          {m.bio}
        </p>

        {crew.length > 0 && (
          <div className="mt-3 border-t border-white/10 pt-3 flex flex-col gap-2">
            {/* Idle State: Stacked Avatars */}
            <div className="flex items-center justify-between transition-all duration-300 ease-in-out max-h-8 opacity-100 group-hover:max-h-0 group-hover:opacity-0 overflow-hidden">
              <div className="flex items-center -space-x-2">
                {crew.map((c, idx) => {
                  const crewImage = `https://robohash.org/${encodeURIComponent(c.name)}`;
                  return (
                    <img
                      key={idx}
                      src={crewImage}
                      alt={c.name}
                      className="w-6 h-6 rounded-full border border-black/80 object-cover shadow-sm bg-card"
                      loading="lazy"
                    />
                  );
                })}
              </div>
              <span className="font-mono text-[9px] text-white/55">
                +{crew.length} Crew
              </span>
            </div>

            {/* Hover State: Crew List with Names & POFs */}
            <div className="transition-all duration-500 ease-in-out max-h-0 opacity-0 overflow-hidden group-hover:max-h-36 group-hover:opacity-100">
              <p className="font-mono text-[8px] uppercase tracking-widest text-primary/80 mb-1.5">
                Sub-Team Crew
              </p>
              <div
                data-lenis-prevent
                className="grid grid-cols-1 gap-1.5 max-h-24 overflow-y-auto pr-1 overscroll-contain custom-scrollbar"
              >
                {crew.map((c, idx) => {
                  const crewImage = `https://robohash.org/${encodeURIComponent(c.name)}`;
                  return (
                    <div key={idx} className="flex items-center gap-2">
                      <img
                        src={crewImage}
                        alt={c.name}
                        className="w-5 h-5 rounded-full object-cover border border-white/15 bg-card"
                        loading="lazy"
                      />
                      <a
                        href={
                          c.linkedin ||
                          `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(c.name)}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-white/95 hover:text-primary hover:underline font-sans truncate transition-colors"
                      >
                        {c.name}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-3 w-full">
          <span className="font-mono text-[9px] text-white/55">
            Contact Lead
          </span>
          <a
            href={`mailto:${m.email}?subject=ESummit%202026%20-%20Inquiry%20to%20${m.name}`}
            className="inline-flex items-center justify-center px-3 py-1 bg-white/10 hover:bg-primary text-white hover:text-primary-foreground font-mono text-[9px] uppercase tracking-widest font-semibold rounded-lg border border-white/10 hover:border-transparent transition-all duration-300 select-none shadow-sm"
          >
            Contact +
          </a>
        </div>
      </div>
    </div>
  );
}
