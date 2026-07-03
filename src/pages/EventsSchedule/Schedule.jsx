import { useState, useEffect } from "react";
import { fetchSchedule, useEvents } from "@/lib/store";
import { Loader } from "@/components/Loader/Loader";
import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Clock, MapPin, ArrowRight, Flag } from "lucide-react";
import { TransitionLink as Link } from "@/components/ui/TransitionLink";
import { ComingSoonCard } from "@/components/ComingSoon/ComingSoonCard";

// --- Time Parsing Helpers ---
const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (hours === 12) {
    hours = modifier.toUpperCase() === "PM" ? 12 : 0;
  } else if (modifier?.toUpperCase() === "PM") {
    hours += 12;
  }
  return hours * 60 + minutes;
};

export function Schedule() {
  useDocumentTitle("Schedule — E-Summit 2026");
  const [rawSchedule, setRawSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const events = useEvents();
  const [activeDay, setActiveDay] = useState("Day 01");

  const [currentTime, setCurrentTime] = useState(new Date());

  // Fetch schedule on mount
  useEffect(() => {
    fetchSchedule()
      .then((data) => {
        setRawSchedule(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching schedule:", err);
        setLoading(false);
      });
  }, []);

  // Live Telemetry Clock (Updates every minute for accurate real-time status)
  useEffect(() => {
    const updateTime = () => setCurrentTime(new Date());
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const schedule = [...rawSchedule].sort((a, b) => a.day.localeCompare(b.day));

  if (loading) {
    return (
      <div className="pt-40 pb-24 text-center min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (schedule.length === 0) {
    return (
      <div className="relative pt-32 pb-24 min-h-screen flex items-center justify-center px-6">
        <ComingSoonCard
          title={
            <>
              Race Schedule <br className="hidden sm:block" />
              <span className="text-primary">Coming Soon.</span>
            </>
          }
          description="We are currently finalizing the race schedule. The complete starting grid of events will be unveiled trackside shortly."
        />
      </div>
    );
  }

  const activeSchedule =
    schedule.find((s) => s.day === activeDay) || schedule[0];

  const sortedItems = [...activeSchedule.items].sort(
    (a, b) => timeToMinutes(a.time) - timeToMinutes(b.time),
  );

  // --- STRICT REAL-TIME STATUS LOGIC ---
  const getEventStatus = (itemTimeStr) => {
    if (!activeSchedule.date) return "upcoming";

    const eventDate = new Date(activeSchedule.date);
    if (isNaN(eventDate)) return "upcoming";

    const timeMinutes = timeToMinutes(itemTimeStr);
    eventDate.setHours(Math.floor(timeMinutes / 60), timeMinutes % 60, 0, 0);

    const eventEnd = new Date(eventDate);
    eventEnd.setMinutes(eventDate.getMinutes() + 120);
    if (currentTime >= eventEnd) return "past";
    if (currentTime >= eventDate && currentTime < eventEnd) return "ongoing";
    if (currentTime < eventDate && eventDate - currentTime <= 60 * 60 * 1000)
      return "upcoming-soon";

    return "upcoming";
  };

  const getEventLink = (title) => {
    const lowerTitle = title.toLowerCase();
    const matched = events.find((e) => {
      const name = e.name.toLowerCase();
      return (
        lowerTitle.includes(name) ||
        name.includes(lowerTitle) ||
        (name.includes("bug") && lowerTitle.includes("bug")) ||
        (name.includes("e-mun") && lowerTitle.includes("e-mun"))
      );
    });
    return matched ? `/event/${matched.slug}` : null;
  };

  return (
    <div className="pt-32 pb-32 mx-auto max-w-7xl px-4 lg:px-12 text-center min-h-screen relative overflow-hidden font-sans">
      {/* --- HEADER (Animated) --- */}
      <div
        className="flex flex-col items-start gap-6 mb-16 relative z-20"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="mb-20">
          <PageHeader tag="Timeline" title="Race Schedule." className="mb-0" />
          <p className="mt-6 text-muted-foreground text-sm sm:text-base font-sans leading-relaxed max-w-2xl text-left">
            Track the complete lineup of events, keynotes, and competitive
            tracks across all laps of E-Summit 2026.
          </p>
        </div>

        <div className="flex bg-accent-foreground border p-1.5 rounded-full backdrop-blur-xl shadow-2xl mt-2 gap-5">
          {schedule.map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-sans text-sm uppercase tracking-[0.2em] transition-all duration-300 ${
                activeDay === d.day
                  ? "bg-primary text-black font-black shadow-[0_0_20px_rgba(249,115,22,0.4)] scale-[1.02]"
                  : "text-white/50 hover:text-white hover:bg-white/5 font-bold"
              }`}
            >
              <Flag className="w-4 h-4" />
              LAP {d.day.replace("Day ", "")}
            </button>
          ))}
        </div>
      </div>

      {/* --- THE STATIC ZIG-ZAG TRACK ARENA --- */}
      <div className="relative w-full max-w-4xl mx-auto z-10 flex flex-col pt-15">
        {/* --- DYNAMIC EVENT CHICANE --- */}
        {sortedItems.map((item, index) => {
          const eventLink = getEventLink(item.title);
          const isLeft = index % 2 !== 0;
          const isLastEvent = index === sortedItems.length - 1;

          const status = getEventStatus(item.time);

          // console.log(item.title, status);

          let cardOpacity = "opacity-100";
          let borderClass = "border-white/10";
          let pointerClass = "border-white/10";
          let timeTextClass = "text-white/70";

          if (status === "past") {
            cardOpacity =
              "opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all";
            pointerClass = "border-red-500/50";
            timeTextClass = "text-gray-400";
          } else if (status === "ongoing") {
            pointerClass = "border-green-500";
            timeTextClass = "text-white-400";
          } else if (status === "upcoming-soon") {
            pointerClass = "border-yellow-500";
            timeTextClass = "text-white-400";
          }

          return (
            <div
              key={`${activeDay}-${item.time}`}
              className={`relative w-full h-56 md:h-48 transition-all duration-500 ${cardOpacity}`}
            >
              <svg className="hidden md:block absolute top-0 left-0 w-full h-full overflow-visible -z-10 pointer-events-none">
                <circle
                  cx={isLeft ? "25%" : "75%"}
                  cy="0"
                  r="64"
                  fill="#F97316"
                />
                <circle
                  cx={isLeft ? "25%" : "75%"}
                  cy="0"
                  r="56"
                  fill="#0a0a0a"
                />

                {!isLastEvent ? (
                  <>
                    <line
                      x1={isLeft ? "25%" : "75%"}
                      y1="0"
                      x2={isLeft ? "75%" : "25%"}
                      y2="100%"
                      stroke="#F97316"
                      strokeWidth="128"
                      strokeDasharray="30 30"
                    />
                    <line
                      x1={isLeft ? "25%" : "75%"}
                      y1="0"
                      x2={isLeft ? "75%" : "25%"}
                      y2="100%"
                      stroke="#0a0a0a"
                      strokeWidth="112"
                    />
                    <line
                      x1={isLeft ? "25%" : "75%"}
                      y1="0"
                      x2={isLeft ? "75%" : "25%"}
                      y2="100%"
                      stroke="#ffffff"
                      strokeOpacity="0.4"
                      strokeWidth="4"
                      strokeDasharray="15 15"
                    />
                  </>
                ) : (
                  <>
                    <line
                      x1={isLeft ? "25%" : "75%"}
                      y1="0"
                      x2="50%"
                      y2="100%"
                      stroke="#F97316"
                      strokeWidth="128"
                      strokeDasharray="30 30"
                    />
                    <line
                      x1={isLeft ? "25%" : "75%"}
                      y1="0"
                      x2="50%"
                      y2="100%"
                      stroke="#0a0a0a"
                      strokeWidth="112"
                    />
                    <line
                      x1={isLeft ? "25%" : "75%"}
                      y1="0"
                      x2="50%"
                      y2="100%"
                      stroke="#ffffff"
                      strokeOpacity="0.4"
                      strokeWidth="4"
                      strokeDasharray="15 15"
                    />
                  </>
                )}
              </svg>

              <svg className="md:hidden absolute top-0 left-0 w-full h-full overflow-visible -z-10 pointer-events-none">
                <line
                  x1="2.5rem"
                  y1="0"
                  x2="2.5rem"
                  y2="100%"
                  stroke="#F97316"
                  strokeWidth="64"
                />
                <line
                  x1="2.5rem"
                  y1="0"
                  x2="2.5rem"
                  y2="100%"
                  stroke="#0a0a0a"
                  strokeWidth="52"
                />
                <line
                  x1="2.5rem"
                  y1="0"
                  x2="2.5rem"
                  y2="100%"
                  stroke="#ffffff"
                  strokeOpacity="0.4"
                  strokeWidth="2"
                  strokeDasharray="10 10"
                />
              </svg>

              <div
                className={`absolute top-0 transform -translate-y-1/2 -translate-x-1/2
                    w-8 h-8 md:w-10 md:h-10 rounded-full
                    border-[3px] border-[#F97316]
                    bg-[#090909]
                    shadow-[0_0_15px_rgba(249,115,22,0.15)]
                    z-20 flex items-center justify-center
                    left-10 ${isLeft ? "md:left-[25%]" : "md:left-[75%]"}`}
              >
                {status === "past" && (
                  <span className="text-[#F97316] text-lg md:text-xl font-bold">
                    ✓
                  </span>
                )}

                {status === "ongoing" && (
                  <div className="relative flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-[#F97316] animate-pulse" />
                    <div className="absolute w-6 h-6 rounded-full border border-[#F97316]/50 animate-ping" />
                  </div>
                )}

                {(status === "upcoming" || status === "upcoming-soon") && (
                  <div className="w-3 h-3 rounded-full border-2 border-[#F97316]" />
                )}
              </div>

              {/* Event Card Position Wrapper */}
              <div
                className={`absolute top-0 z-30 w-[calc(100%-5rem)] md:w-85 
                left-18 -translate-y-1/2 md:left-[25%] md:-translate-x-1/2 md:translate-y-[-115%]
                ${!isLeft && "md:left-[75%]"}
              `}
              >
                <div className=" w-full">
                  <div
                    className={`bg-[#090909] border-2 ${borderClass} rounded-xl p-4 md:p-5 shadow-2xl relative flex flex-col backdrop-blur-md transition-all duration-300 hover:scale-[1.02]`}
                  >
                    <div
                      className={`hidden md:block absolute -bottom-1.75 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#1A1E23] border-b-2 border-r-2 ${pointerClass}`}
                    />
                    <div
                      className={`md:hidden absolute top-1/2 -translate-y-1/2 -left-1.75 w-3 h-3 rotate-45 bg-[#1A1E23] border-b-2 border-l-2 ${pointerClass}`}
                    />

                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-white/10">
                      <div className="flex items-center gap-1.5">
                        <Clock className={`w-4 h-4 ${timeTextClass}`} />
                        <span
                          className={`text-lg font-medium tracking-tight ${timeTextClass} ${status === "past" ? "line-through decoration-2 decoration-red-400" : ""}`}
                        >
                          {item.time}
                        </span>
                      </div>
                      <span className="text-[10px] md:text-xs font-medium uppercase tracking-[0.18em] px-2.5 py-1 rounded-sm bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20">
                        {item.category}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 text-left">
                      <div className="flex items-start gap-4">
                        <span className="text-[#F97316]/70 text-xs font-medium uppercase tracking-[0.18em] w-12 shrink-0 mt-0.5">
                          Title
                        </span>
                        <h3 className="font-sans text-base md:text-lg font-medium tracking-tight leading-none text-white">
                          {item.title}
                        </h3>
                      </div>
                      <div className="flex items-start gap-4">
                        <span className="text-[#F97316]/60 text-xs font-medium tracking-[0.18em] w-12 uppercase shrink-0 mt-0.5">
                          Loc
                        </span>
                        <div className="flex items-center gap-1.5 text-xs md:text-sm text-white/80 font-mono truncate">
                          <MapPin className="w-3 h-3 text-[#F97316]/70" />
                          <span className="truncate">{item.location}</span>
                        </div>
                      </div>
                    </div>

                    {eventLink && status !== "past" && (
                      <div className="mt-auto flex justify-end">
                        <Link
                          to={eventLink}
                          className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-mono uppercase font-bold tracking-widest rounded-full transition-colors"
                          title="View Details"
                        >
                          View Details
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* --- GLORIOUS FINISH LINE BLOCK --- */}
        <div className="relative w-full h-80 md:h-72 -mt-0.5">
          {/* Desktop Track */}
          <svg className="hidden md:block absolute top-0 left-0 w-full h-full overflow-visible -z-10 pointer-events-none"></svg>

          {/* Mobile Track */}
          <svg className="md:hidden absolute top-0 left-0 w-full h-full overflow-visible -z-10 pointer-events-none">
            <line
              x1="2.5rem"
              y1="0"
              x2="2.5rem"
              y2="10%"
              stroke="var(--color-primary)"
              strokeWidth="64"
            />
            <line
              x1="2.5rem"
              y1="0"
              x2="2.5rem"
              y2="10%"
              stroke="#0a0a0a"
              strokeWidth="52"
            />
            <line
              x1="2.5rem"
              y1="0"
              x2="2.5rem"
              y2="10%"
              stroke="#ffffff"
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeDasharray="10 10"
            />
          </svg>

          {/* Final "Race Complete" Center Card */}
          <div className="absolute top-[50%] md:top-[65%] z-30 w-[calc(100%-3rem)] md:w-105 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <div className="absolute left-1/2 -translate-x-1/2 -top-47 md:-top-49.5 w-full flex justify-center pointer-events-none z-50">
              <svg
                width="270"
                height="200"
                viewBox="0 0 240 160"
                fill="none"
                className="drop-shadow-[0_15px_25px_rgba(249,115,22,0.5)]"
              >
                <defs>
                  <pattern
                    id="giant-checkers"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect width="12" height="12" fill="#ffffff" />
                    <rect x="12" width="12" height="12" fill="#050505" />
                    <rect y="12" width="12" height="12" fill="#050505" />
                    <rect x="12" y="12" width="12" height="12" fill="#ffffff" />
                  </pattern>
                </defs>

                <g transform="translate(120, 140) rotate(-35) translate(0, -100)">
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="120"
                    stroke="#94a3b8"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 10 Q -50 -15 -100 15 Q -115 25 -125 55 Q -70 30 -20 45 Q -10 48 0 10"
                    fill="url(#giant-checkers)"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                  />
                </g>

                <g transform="translate(120, 140) rotate(35) translate(0, -100)">
                  <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="120"
                    stroke="#64748b"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M0 10 Q 50 -15 100 15 Q 115 25 125 55 Q 70 30 20 45 Q 10 48 0 10"
                    fill="url(#giant-checkers)"
                    stroke="var(--color-primary)"
                    strokeWidth="2"
                  />
                </g>
              </svg>
            </div>

            <div
              className=" w-full flex flex-col items-center"
              style={{ animationDelay: `${0.3 + sortedItems.length * 0.15}s` }}
            >
              {/* Title */}
              <h3 className="text-white font-sans font-semibold text-4xl md:text-5xl tracking-tight">
                Race Complete
              </h3>

              {/* Amber Divider */}
              <div className="flex items-center justify-center w-full max-w-md mt-6 mb-6">
                <div className="flex-1 h-0.5 bg-primary rounded-full" />

                <div className="mx-4 w-3 h-3 rotate-45 bg-primary rounded-[2px]" />

                <div className="flex-1 h-0.5 bg-primary rounded-full" />
              </div>

              {/* End of Lap Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary bg-black/30 backdrop-blur-sm">
                <Flag className="w-4 h-4 text-primary" />

                <span className="text-white/80 text-sm font-sans">
                  End of Lap {activeDay.replace("Day ", " ")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
