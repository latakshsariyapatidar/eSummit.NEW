import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { TeamMemberCard } from "@/components/TeamMemberCard";
import { useTeams } from "@/lib/store";
import { Loader } from "@/components/Loader";
import { ComingSoonCard } from "@/components/ComingSoonCard";

export function Team() {
  useDocumentTitle("The Crew — E-Summit 2026");
  const teams = useTeams();

  if (teams.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const functionalLeads = teams.filter(
    (t) =>
      t.lead?.team === "Core Committee" ||
      t.lead?.role === "Overall Coordinator" ||
      t.lead?.role?.includes("Head") ||
      (t.lead?.role?.includes("Lead") && !t.lead?.event),
  );
  const eventDirectors = teams.filter(
    (t) => t.lead?.event || !functionalLeads.includes(t),
  );

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
                <TeamMemberCard key={team.lead.name} team={team} />
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
                <TeamMemberCard key={team.lead.name} team={team} />
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Coming Soon */}
      {/* <div className="flex-1 flex items-center justify-center py-12">
        <ComingSoonCard
          title={
            <>
              Team Page <br className="hidden sm:block" />
              <span className="text-primary">Coming Soon</span>
            </>
          }
          description="We’re adding more detailed member bios and stories. Stay tuned for updates."
        />
      </div> */}
    </div>
  );
}
