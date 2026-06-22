import { useParams } from "react-router-dom";
import { useTransitionNavigate } from "../hooks/useTransitionNavigate";
import { TransitionLink as Link } from "../components/ui/TransitionLink";
import { EVENTS } from "@/lib/store";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function EventDetails() {
  const { slug } = useParams();
  const navigate = useTransitionNavigate();
  const event = EVENTS.find((e) => e.slug === slug);

  useDocumentTitle(
    event ? `${event.name} — E-Summit 2026` : "Event Not Found — E-Summit 2026",
  );

  if (!event) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="font-display text-5xl mb-6">Event not found</h1>
        <Link
          to="/events"
          className="font-mono text-xs uppercase tracking-widest text-primary hover:underline"
        >
          ← Back to the grid
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 text-left">
      <div className="mx-auto max-w-400 px-6 lg:px-12">
        <Link
          to="/events"
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          ← All events
        </Link>

        <div className="mt-8 grid lg:grid-cols-[2fr_1fr] gap-12 items-end">
          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-primary mb-4">
              {event.day} · {event.time}
            </div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-9xl leading-[0.85]">
              {event.name}
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-2xl">
              {event.tagline}
            </p>
          </div>
          <div className="border-l-2 border-primary pl-6">
            <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Venue
            </div>
            <div className="font-display text-2xl mt-1">
              IIT Dharwad — Main Arena
            </div>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl mb-4">About the Event</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {event.about}
            </p>
            <h2 className="font-display text-3xl mb-4">The Brief</h2>
            <p className="text-muted-foreground leading-relaxed">
              {event.brief}
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl mb-4">Event Format</h2>
            <ul className="space-y-3 text-muted-foreground">
              {event.format &&
                event.format.map((step, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="text-primary font-mono">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <Link
          to="/buy"
          className="mt-16 inline-block px-10 py-5 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold hover:bg-primary/90 transition-all rounded-xl hover:scale-[1.02]"
        >
          Register now →
        </Link>
      </div>
    </div>
  );
}
