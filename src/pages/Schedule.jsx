import { SCHEDULE } from "@/lib/store";
import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export function Schedule() {
  useDocumentTitle("Schedule — E-Summit 2026");

  return (
    <div className="pt-32 pb-24 mx-auto max-w-400 px-6 lg:px-12 text-left">
      <PageHeader
        tag="Race Schedule"
        title={
          <>
            Two days.
            <br />
            One throttle.
          </>
        }
      />
      <div className="mt-20 space-y-20">
        {SCHEDULE.map((d) => (
          <div key={d.day} className="grid md:grid-cols-[280px_1fr] gap-8">
            <div className="font-display text-3xl md:text-4xl text-primary">
              {d.day}
            </div>
            <div className="divide-y divide-border border-t border-b border-border">
              {d.items.map((it) => (
                <div key={it.time} className="py-5 flex gap-8 items-baseline">
                  <span className="font-mono text-sm text-muted-foreground w-16 tabular-nums">
                    {it.time}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-display text-2xl md:text-3xl mb-3">
                      {it.title}
                    </span>
                    <div className="flex gap-2 text-xs text-muted-foreground">
                      <span className="font-mono">{it.category} at</span>
                      <span className="font-mono">{it.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
