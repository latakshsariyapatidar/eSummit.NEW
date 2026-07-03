import { useState, useEffect } from "react";
import { fetchEvents } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import FlowingMenu from "@/components/CustomPremade/FlowingMenu";
import { Loader } from "@/components/Loader/Loader";
import { ComingSoonCard } from "@/components/ComingSoon/ComingSoonCard";

export function Events() {
  useDocumentTitle("Events — E-Summit 2026");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents()
      .then((data) => {
        setEvents(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="pt-40 pb-24 min-h-screen flex items-center justify-center px-6">
        <ComingSoonCard
          title={
            <>
              Events Grid <br className="hidden sm:block" />
              <span className="text-primary">Coming Soon</span>
            </>
          }
          description="We are currently finalizing the competitive events grid. The complete lineup of strategy, tech, and design challenges will be unveiled trackside shortly."
        />
      </div>
    );
  }

  const menuItems = events.map((e) => ({
    text: e.name,
    link: `/event/${e.slug}`,
    image: `./events_assets/${e.slug}.avif`,
    tagline: e.tagline,
    day: e.day,
    time: e.time,
  }));

  return (
    <div className="pt-32 pb-24 mx-auto max-w-400 px-6 lg:px-12 text-left min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column: Info & Stats */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-12">
          <div>
            <PageHeader tag="The Grid" title="All Events." />
            <p className="mt-6 text-muted-foreground text-sm font-sans leading-relaxed max-w-md">
              Welcome to the core of E-Summit 2026. Explore our lineup of
              competitive challenges, strategy hackathons, and high-impact talk
              shows designed for the next generation of builders.
            </p>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-2 gap-6 border-t border-border pt-8 font-mono">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">
                Prize Pool
              </span>
              <span className="text-2xl font-bold text-primary font-display">
                ₹1,00,000+
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest block">
                Days of Action
              </span>
              <span className="text-2xl font-bold text-foreground">
                02 Days
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Flowing Menu */}
        <div className="lg:col-span-8 h-auto lg:h-[75vh] border-t border-b border-border">
          <FlowingMenu items={menuItems} />
        </div>
      </div>
    </div>
  );
}
