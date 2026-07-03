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
 *   onClick: Function
 */
function TeamMemberCard({ team, onClick }) {
  const m = team.lead;
  const crew = team.crew || [];
  const teamTitle = m.team || m.event;
  const leadImage = m.image;

  const handleCardClick = (e) => {
    if (e.target.closest("a") || e.target.closest("button")) {
      return;
    }
    if (onClick) {
      onClick(team);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative aspect-4/5 w-full rounded-3xl overflow-hidden border shadow-2xl flex flex-col justify-end text-left select-none transition-all duration-500 cursor-pointer border-border/30 hover:border-primary/50 hover:shadow-primary/5 hover:scale-[1.01]"
    >
      <img
        src={leadImage}
        alt={m.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
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

        <p className="text-white/80 text-xs font-sans leading-relaxed mt-2 line-clamp-3">
          {m.bio}
        </p>

        {crew.length > 0 ? (
          <div className="mt-3 border-t border-white/10 pt-3 flex items-center justify-between w-full">
            <div className="flex items-center -space-x-2">
              {crew.slice(0, 4).map((c, idx) => {
                const crewImage = c.image;
                return (
                  <img
                    key={idx}
                    src={crewImage}
                    decoding="async"
                    alt={c.name}
                    className="w-6 h-6 rounded-full border border-black/80 object-cover shadow-sm bg-card"
                    loading="lazy"
                  />
                );
              })}
              {crew.length > 4 && (
                <div className="w-6 h-6 rounded-full border border-black/80 bg-zinc-800 flex items-center justify-center text-[8px] font-mono font-bold text-white shadow-sm">
                  +{crew.length - 4}
                </div>
              )}
            </div>
            <span className="font-mono text-[9px] text-primary/80 group-hover:text-primary transition-colors flex items-center gap-1 font-semibold">
              Meet Crew ({crew.length}) →
            </span>
          </div>
        ) : (
          <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-3 w-full">
            <span className="font-mono text-[9px] text-white/55">
              Contact Lead
            </span>
            <span className="font-mono text-[9px] text-primary/80 group-hover:text-primary transition-colors flex items-center gap-1 font-semibold">
              Profile →
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(TeamMemberCard);
