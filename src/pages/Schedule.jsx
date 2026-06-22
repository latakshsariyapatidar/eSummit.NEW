import React, { useState } from "react";
import { SCHEDULE, EVENTS } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
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
  const [activeDay, setActiveDay] = useState("Day 01");

  const activeSchedule =
    SCHEDULE.find((s) => s.day === activeDay) || SCHEDULE[0];

  // Helper to match schedule title to event slug
  const getEventLink = (title) => {
    const lowerTitle = title.toLowerCase();
    const matched = EVENTS.find((e) => {
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
        <div className="flex bg-card/40 border border-border/40 p-1.5 rounded-full backdrop-blur-md shrink-0 shadow-lg shadow-black/20 self-start md:self-auto">
          {SCHEDULE.map((d) => (
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

      {/* Timeline track container */}
      <div className="relative border-l border-border/30 ml-4 lg:ml-32 pl-8 lg:pl-12 space-y-12 py-4">
        {/* Starting grid line overlay */}
        <div className="absolute left-0 top-0 w-px h-full bg-border/30" />

        {activeSchedule.items.map((item, index) => {
          const eventLink = getEventLink(item.title);
          const isCompetition = item.category.toLowerCase() === "competition";

          return (
            <div key={item.time} className="relative group">
              {/* Timeline bubble / indicator */}
              <div className="absolute -left-10.25 lg:-left-14.25 top-6 w-6 h-6 rounded-full border-2 border-border/40 bg-background flex items-center justify-center z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-border/40" />
              </div>

              {/* Time display on the left (only visible on large screens and up) */}
              <div className="hidden lg:block absolute -left-36 top-6 w-24 text-right px-10">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block">
                  Time
                </span>
                <span className="font-mono text-sm font-bold text-foreground block tabular-nums mt-0.5">
                  {item.time}
                </span>
              </div>

              {/* Event Card */}
              <div className="border border-border/20 bg-card/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="space-y-4">
                  {/* Category Tag & Time (mobile/tablet only) */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-1 rounded-full border font-semibold ${
                        isCompetition
                          ? "border-primary/20 bg-primary/5 text-primary"
                          : "border-border/40 bg-white/5 text-muted-foreground"
                      }`}
                    >
                      {item.category}
                    </span>
                    <span className="flex items-center gap-1.5 lg:hidden font-mono text-[10px] text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {item.time}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {item.title}
                  </h3>

                  {/* Location badge */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <MapPin className="w-4 h-4 text-muted-foreground/75" />
                    <span className="font-mono tracking-wider uppercase text-[10px]">
                      GRID {item.location}
                    </span>
                  </div>
                </div>

                {/* Explore button if matching event is found */}
                {eventLink ? (
                  <Link
                    to={eventLink}
                    className="inline-flex items-center justify-center gap-2 self-start sm:self-auto px-5 py-3 bg-white/5 text-white font-mono text-[10px] uppercase tracking-widest font-semibold rounded-2xl border border-white/10 transition-all duration-300 shadow-sm shrink-0"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <div className="inline-flex items-center gap-1.5 self-start sm:self-auto px-4 py-2.5 bg-white/5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 rounded-xl border border-white/5 shrink-0 select-none">
                    <Play className="w-3 h-3 text-muted-foreground/40" />
                    Special Event
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
