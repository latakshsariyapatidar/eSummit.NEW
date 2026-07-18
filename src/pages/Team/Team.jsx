import { useMemo, useState, useEffect, useCallback } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import TeamMemberCard from "@/components/Team/TeamMemberCard";
import { fetchTeams } from "@/lib/store";

import { ComingSoonCard } from "@/components/ComingSoon/ComingSoonCard";
import { Modal } from "@/components/ui/Modal";
import { Linkedin, Mail } from "lucide-react";

export function Team() {
  useDocumentTitle("The Crew — E-Summit 2026");
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    fetchTeams()
      .then((data) => {
        setTeams(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching teams:", err);
        setLoading(false);
      });
  }, []);

  const handleOpenModal = useCallback((team) => {
    setSelectedTeam(team);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedTeam(null);
  }, []);

  const { functionalLeads, eventDirectors } = useMemo(() => {
    const functional = teams.filter(
      (t) =>
        t.lead?.team === "Core Committee" ||
        t.lead?.role === "Overall Coordinator" ||
        t.lead?.role?.includes("Head") ||
        (t.lead?.role?.includes("Lead") && !t.lead?.event),
    );

    const events = teams.filter(
      (t) => t.lead?.event || !functional.includes(t),
    );

    return {
      functionalLeads: functional,
      eventDirectors: events,
    };
  }, [teams]);

  if (loading) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen flex items-center justify-center">

      </div>
    );
  }

  if (teams.length === 0) {
    return (
      <div className="pt-40 pb-24 min-h-screen flex items-center justify-center px-6">
        <ComingSoonCard
          title={
            <>
              Team Page <br className="hidden sm:block" />
              <span className="text-primary">Coming Soon</span>
            </>
          }
          description="We’re adding more detailed member bios and stories. Stay tuned for updates."
        />
      </div>
    );
  }

  const selectedCrew = selectedTeam?.crew || [];
  const lead = selectedTeam?.lead;
  const selectedTeamTitle = lead?.team || lead?.event;

  return (
    <div className="pt-32 pb-24 mx-auto max-w-7xl px-6 lg:px-12 text-left min-h-screen flex flex-col">
      <div className="max-w-4xl">
        <PageHeader tag="The Crew" title="Meet the Team." />
        <p className="mt-6 text-muted-foreground text-sm sm:text-base font-sans leading-relaxed max-w-2xl">
          The builders, coordinators, and directors behind E-Summit 2026. Met at
          the intersection of venture, engineering, and design, our crew keeps
          the gears shifting.
        </p>
      </div>

      <div className="mt-20 space-y-24">
        {functionalLeads.length > 0 && (
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-primary border-b border-border/20 pb-3 mb-8">
              Functional Leads / Core Committee
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {functionalLeads.map((team) => (
                <TeamMemberCard
                  key={team.lead.name}
                  team={team}
                  onClick={handleOpenModal}
                />
              ))}
            </div>
          </div>
        )}

        {eventDirectors.length > 0 && (
          <div>
            <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-primary border-b border-border/20 pb-3 mb-8">
              Event Directors & Crew
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {eventDirectors.map((team) => (
                <TeamMemberCard
                  key={team.lead.name}
                  team={team}
                  onClick={handleOpenModal}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedTeam && (
        <Modal
          onClose={handleCloseModal}
          maxWidthClass={selectedCrew.length > 0 ? "max-w-4xl" : "max-w-xl"}
        >
          {selectedCrew.length > 0 ? (
            <div className="flex flex-col md:flex-row gap-8 py-4">
              {/* Lead Column */}
              <div className="w-full md:w-2/5 flex flex-col items-center md:items-start text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-8">
                <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                  <img
                    src={lead.image}
                    alt={lead.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80 font-semibold mt-4">
                  {selectedTeamTitle}
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  {lead.name}
                </h3>
                <p className="font-mono text-xs uppercase tracking-wider text-primary font-semibold mt-1">
                  {lead.role}
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed mt-4 max-w-sm">
                  {lead.bio}
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <a
                    href={
                      lead.linkedin ||
                      `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(lead.name)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/5 hover:bg-primary/20 text-white hover:text-primary rounded-xl border border-white/10 transition-all duration-300"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${lead.email}?subject=ESummit%202026%20-%20Inquiry%20to%20${lead.name}`}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-primary text-white hover:text-primary-foreground font-mono text-[10px] uppercase tracking-widest font-semibold rounded-xl border border-white/10 hover:border-transparent transition-all duration-300 shadow-sm"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Contact Lead
                  </a>
                </div>
              </div>

              {/* Crew Column */}
              <div className="w-full md:w-3/5 flex flex-col h-[50vh] md:h-auto">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-primary mb-6">
                  Sub-Team Crew ({selectedCrew.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto pr-1 custom-scrollbar max-h-[45vh] md:max-h-[55vh]">
                  {selectedCrew.map((c, idx) => {
                    const crewLinkedin =
                      c.linkedin ||
                      `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(c.name)}`;
                    return (
                      <div
                        key={idx}
                        className="group/crew bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/30 rounded-2xl p-4 flex flex-col items-center text-center gap-3 transition-all duration-300 shadow-md"
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-white/10 group-hover/crew:border-primary/50 transition-colors duration-500 shadow-inner">
                          <img
                            src={c.image}
                            alt={c.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover/crew:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col items-center gap-1.5 w-full">
                          <span className="text-xs sm:text-sm font-semibold text-white/90 line-clamp-1 w-full px-1">
                            {c.name}
                          </span>
                          <a
                            href={crewLinkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-white/5 hover:bg-primary/20 text-white/60 hover:text-primary rounded-lg border border-white/10 transition-all duration-300 mt-1"
                            title="LinkedIn Profile"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* Centered Single Lead details */
            <div className="flex flex-col items-center text-center py-6 px-4">
              <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={lead.image}
                  alt={lead.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80 font-semibold mt-5">
                {selectedTeamTitle}
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-1">
                {lead.name}
              </h3>
              <p className="font-mono text-xs uppercase tracking-wider text-primary font-semibold mt-1">
                {lead.role}
              </p>
              <p className="text-muted-foreground text-xs sm:text-sm font-sans leading-relaxed mt-4 max-w-md">
                {lead.bio}
              </p>
              <div className="flex items-center gap-3 mt-6">
                <a
                  href={
                    lead.linkedin ||
                    `https://www.linkedin.com/search/results/all/?keywords=${encodeURIComponent(lead.name)}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-primary/20 text-white hover:text-primary rounded-xl border border-white/10 transition-all duration-300"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${lead.email}?subject=ESummit%202026%20-%20Inquiry%20to%20${lead.name}`}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-primary text-white hover:text-primary-foreground font-mono text-[10px] uppercase tracking-widest font-semibold rounded-xl border border-white/10 hover:border-transparent transition-all duration-300 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Contact Lead
                </a>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
