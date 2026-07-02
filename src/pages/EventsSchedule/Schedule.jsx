import React, { useState } from "react";
import { useSchedule, useEvents } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Loader } from "@/components/Loader/Loader";
import { ComingSoonCard } from "@/components/ComingSoon/ComingSoonCard";
import {
  Clock,
  MapPin,
  Calendar,
  ArrowRight,
  Trophy,
  Play,
} from "lucide-react";
import { TransitionLink as Link } from "@/components/ui/TransitionLink";

export function Schedule() {
  useDocumentTitle("Schedule — E-Summit 2026");
  const schedule = useSchedule();
  const events = useEvents();
  const [activeDay, setActiveDay] = useState("Day 01");

  if (schedule.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const activeSchedule =
    schedule.find((s) => s.day === activeDay) || schedule[0];

  // Helper to match schedule title to event slug
  const getEventLink = (title) => {
    const lowerTitle = title.toLowerCase();
    const matched = events.find((e) => {
      const name = e.name.toLowerCase();
      // check if event name is in schedule title, or vice-versa
      return (
        lowerTitle.includes(name) ||
        name.includes(lowerTitle) ||
        (name.includes("bug") && lowerTitle.includes("bug")) ||
        (name.includes("boardroom") && lowerTitle.includes("boardroom")) ||
        (name.includes("e-mun") && lowerTitle.includes("e-mun")) ||
        (name.includes("bid-a-biz") && lowerTitle.includes("bid-a-biz"))
      );
    });
    return matched ? `/event/${matched.slug}` : null;
  };

  return (
    <div className="pt-32 pb-24 mx-auto max-w-5xl px-6 lg:px-12 text-left min-h-screen">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <PageHeader
          tag="Race Schedule"
          title={
            <>
              Two Days.
              <br />
              One Throttle.
            </>
          }
          className="mb-0"
        />

        {/* Day Selector Buttons */}
        <div className="flex bg-card/40 border border-border/40 p-1.5 rounded-full backdrop-blur-md shrink-0 shadow-lg shadow-black/20 self-start md:self-auto gap-5">
          {schedule.map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
                activeDay === d.day
                  ? "bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20 scale-[1.02]"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              {d.day}
            </button>
          ))}
        </div>
      </div>

      {/* Schedule commented out */}

      <div className="flex-1 flex items-center justify-center py-12">
        <ComingSoonCard
          title={
            <>
              Schedule <br className="hidden sm:block" />
              <span className="text-primary">Coming Soon</span>
            </>
          }
          description="We’re working on the schedule for the event. Stay tuned for updates."
        />
      </div>
    </div>
  );
}
