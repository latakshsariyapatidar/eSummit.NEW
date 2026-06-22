import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function Sponsors() {
  useDocumentTitle("Our Partners — E-Summit 2026");

  return (
    <div className="pt-32 pb-24 mx-auto max-w-400 px-6 lg:px-12 text-left min-h-screen flex flex-col">
      <div className="max-w-4xl">
        <PageHeader tag="Pit Crew" title="Our Partners." />
        <p className="mt-6 text-muted-foreground text-sm sm:text-base font-sans leading-relaxed max-w-2xl">
          The engines fueling E-Summit 2026. Met at the intersection of venture,
          engineering, and design, our partners play a crucial role in enabling
          the next generation of builders.
        </p>
      </div>

      {/* Coming Soon Card */}
      <div className="mt-16 flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-card/10 border border-border/30 rounded-3xl p-8 md:p-16 relative overflow-hidden backdrop-blur-md shadow-2xl text-center space-y-6">
          {/* Decorative Corner Grids */}
          <div className="absolute top-0 left-0 w-24 h-24 border-r border-b border-border/10 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-l border-t border-border/10 pointer-events-none" />

          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-none">
            Sponsors Lineup <br className="hidden sm:block" />
            <span className="text-primary">Revealing Soon.</span>
          </h2>

          <p className="text-muted-foreground text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
            We are currently finalizing partnerships. The complete starting grid
            of sponsors will be unveiled trackside shortly.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:outreach.iic@iitdh.ac.in?subject=Sponsorship%20Inquiry%20-%20ESummit%202026"
              className="w-full sm:w-auto"
            >
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Become a Partner →
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
