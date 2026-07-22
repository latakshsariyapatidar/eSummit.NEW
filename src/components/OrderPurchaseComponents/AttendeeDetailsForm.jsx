import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";

export function AttendeeDetailsForm({
  attendeeDetails,
  events = [],
  onDetailsChange,
  onSubmit,
  onBack,
  loading,
  total,
}) {
  // Deduplicate event names extracted from database events, excluding default option
  const eventOptions = Array.from(
    new Set(
      events
        .map((e) => (typeof e === "string" ? e : e.name || e.title))
        .filter(Boolean)
    )
  ).filter((name) => name !== "E-Summit 2026");

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto w-full space-y-8">
      <PageHeader tag="Step 2 of 3" title="Attendee Information" />

      {attendeeDetails.map((attendee, index) => (
        <div
          key={index}
          className="p-6 bg-card border border-border/50 rounded-2xl space-y-4 shadow-sm"
        >
          <h3 className="font-display text-lg font-semibold text-primary">
            Ticket #{index + 1} —{" "}
            <span className="text-muted-foreground font-normal">
              {attendee.passType}
            </span>
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Event Name
              </label>
              <select
                required
                className="bg-background border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary"
                value={attendee.eventName || "E-Summit 2026"}
                onChange={(e) =>
                  onDetailsChange(index, "eventName", e.target.value)
                }
              >
                <option value="E-Summit 2026">E-Summit 2026 (Default)</option>
                {eventOptions.map((name, idx) => (
                  <option key={idx} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Full Name
              </label>
              <input
                required
                type="text"
                className="bg-background border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary"
                value={attendee.attendeeName}
                onChange={(e) =>
                  onDetailsChange(index, "attendeeName", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Email Address
              </label>
              <input
                required
                type="email"
                className="bg-background border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary"
                value={attendee.attendeeEmail}
                onChange={(e) =>
                  onDetailsChange(index, "attendeeEmail", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                College Name
              </label>
              <input
                required
                type="text"
                className="bg-background border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary"
                value={attendee.collegeName}
                onChange={(e) =>
                  onDetailsChange(index, "collegeName", e.target.value)
                }
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Gender
              </label>
              <select
                className="bg-background border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:border-primary"
                value={attendee.attendeeGender}
                onChange={(e) =>
                  onDetailsChange(index, "attendeeGender", e.target.value)
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-4 pt-4">
        <Button type="button" variant="secondary" onClick={onBack}>
          ← Back
        </Button>
        <Button
          type="submit"
          variant="primary"
          className="flex-1"
          disabled={loading}
        >
          {loading ? "Processing..." : `Checkout • ₹${total}`}
        </Button>
      </div>
    </form>
  );
}
