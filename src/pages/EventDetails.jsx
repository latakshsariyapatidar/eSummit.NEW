import { useParams, useNavigate } from "react-router-dom";
import { EVENTS } from "@/lib/store";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function EventDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const event = EVENTS.find((e) => e.slug === slug);

  useDocumentTitle(
    event ? `${event.name} — E-Summit 2026` : "Event Not Found — E-Summit 2026",
  );

  if (!event) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="font-display text-5xl mb-6">Event not found</h1>
        <TransitionLink
          to="/events"
          className="font-mono text-xs uppercase tracking-widest text-primary hover:underline"
        >
          ← Back to the grid
        </TransitionLink>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 text-left">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <TransitionLink
          to="/events"
          className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-primary"
        >
          ← All events
        </TransitionLink>

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
            <h2 className="font-display text-3xl mb-4">The Brief</h2>
            <p className="text-muted-foreground">
              {event.description}
            </p>
          </div>
          <div>
            <h2 className="font-display text-3xl mb-4">Format</h2>
            <ul className="space-y-3 text-muted-foreground">
              {event.format.map((f, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-primary font-mono">{String(i+1).padStart(2, "0")}</span>
                  {f.step}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <TransitionLink
          to="/buy"
          className="mt-16 inline-block px-10 py-5 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold hover:bg-primary/90 transition-all rounded-none hover:scale-[1.02]"
        >
          Register now →
        </TransitionLink>
      </div>
    </div>
  );
}
