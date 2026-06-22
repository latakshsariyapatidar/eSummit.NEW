import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
// import { TeamMemberCard } from "@/components/TeamMemberCard";

/*
const FUNCTIONAL_TEAMS = [
  {
    lead: {
      name: "Aarav Mehta",
      role: "Overall Coordinator",
      team: "Core Committee",
      email: "outreach.iic@iitdh.ac.in",
      bio: "Directing the overall execution and strategic partnerships of E-Summit 2026.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&h=800&q=80",
    },
    crew: [
      {
        name: "Nehal Shah",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Aryan Gupta",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Ishaan Roy",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
      },
    ],
  },
  {
    lead: {
      name: "Lataksh Sariya",
      role: "Web Dev Lead",
      team: "Web Team",
      email: "outreach.iic@iitdh.ac.in",
      bio: "Architecting the digital interfaces, transitions, and user experiences for the summit.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&h=800&q=80",
    },
    crew: [
      {
        name: "Karan Johar",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Priya Sen",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Yash Wardhan",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Karan Johar",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Priya Sen",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Yash Wardhan",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
      },
    ],
  },
  {
    lead: {
      name: "Riya Sharma",
      role: "Marketing Head",
      team: "Marketing Team",
      email: "outreach.iic@iitdh.ac.in",
      bio: "Managing the brand identity, campaign rollouts, and media coverage across channels.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&h=800&q=80",
    },
    crew: [
      {
        name: "Sara Ali",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Varun Dhawan",
        image:
          "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Janhvi Kapoor",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80",
      },
    ],
  },
  {
    lead: {
      name: "Kabir Singh",
      role: "Outreach Head",
      team: "Outreach Team",
      email: "outreach.iic@iitdh.ac.in",
      bio: "Driving institutional partnerships, speaker coordination, and public relations.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&h=800&q=80",
    },
    crew: [
      {
        name: "Siddharth Malhotra",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Kiara Advani",
        image:
          "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Ranbir Kapoor",
        image:
          "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80",
      },
    ],
  },
];

const EVENT_TEAMS = [
  {
    lead: {
      event: "Find The Bug 3.0",
      name: "Devansh Gupta",
      role: "Race Director",
      bio: "Leading execution of the flagship debugging event.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&h=800&q=80",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Alok Verma",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Nikhil Kumar",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
      },
    ],
  },
  {
    lead: {
      event: "Boardroom Battles",
      name: "Ananya Iyer",
      role: "Race Director",
      bio: "Orchestrating the business strategy simulation battle.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&h=800&q=80",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Sneha Patil",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Tanmay Joshi",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&h=100&q=80",
      },
    ],
  },
  {
    lead: {
      event: "InnoveX",
      name: "Siddharth Sen",
      role: "Race Director",
      bio: "Curating the startup pitch deck and venture stage.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&h=800&q=80",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Pooja Hegde",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Vikram Rathore",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
      },
    ],
  },
  {
    lead: {
      event: "Build-a-Biz",
      name: "Meera Nair",
      role: "Race Director",
      bio: "Steering the 36-hour startup building challenge.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&h=800&q=80",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Raj Malhotra",
        image:
          "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Simran Gill",
        image:
          "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=100&h=100&q=80",
      },
    ],
  },
  {
    lead: {
      event: "Technostrophe",
      name: "Rohan Varma",
      role: "Race Director",
      bio: "Hosting the ultimate multi-disciplinary technology quiz.",
      image:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&h=800&q=80",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Aditya Rao",
        image:
          "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Neha Deshmukh",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&h=100&q=80",
      },
    ],
  },
  {
    lead: {
      event: "E-MUN",
      name: "Tanvi Rao",
      role: "Race Director",
      bio: "Facilitating debates on green logistics and EV policy.",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&h=800&q=80",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Sameer Khan",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Kriti Sanon",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
      },
    ],
  },
  {
    lead: {
      event: "Finance For All",
      name: "Aryan Kapoor",
      role: "Race Director",
      bio: "Directing the talk show and finance panel sessions.",
      image:
        "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&h=800&q=80",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Shreya Ghoshal",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Rahul Bose",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80",
      },
    ],
  },
  {
    lead: {
      event: "Trimble",
      name: "Neha Patil",
      role: "Race Director",
      bio: "Managing the real-time paper trading simulator tracks.",
      image:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=600&h=800&q=80",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Amit Roy",
        image:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100&q=80",
      },
      {
        name: "Divya Dutta",
        image:
          "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=100&h=100&q=80",
      },
    ],
  },
];
*/

export function Team() {
  useDocumentTitle("The Crew — E-Summit 2026");

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

      {/* Coming Soon */}
      <div className="mt-16 flex-1 flex items-center justify-center">
        <div className="w-full max-w-3xl bg-card/10 border border-border/30 rounded-3xl p-8 md:p-16 relative overflow-hidden backdrop-blur-md shadow-2xl text-center space-y-6">
          {/* Decorative Corner Grids */}
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-none">
            Team Roster <br className="hidden sm:block" />
            <span className="text-primary">Revealing Soon.</span>
          </h2>

          <p className="text-muted-foreground text-sm md:text-base font-sans max-w-xl mx-auto leading-relaxed">
            We are assembling an extraordinary crew for E-Summit 2026. The
            complete team lineup will be unveiled shortly before the event.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:outreach.iic@iitdh.ac.in?subject=Team%20Inquiry%20-%20ESummit%202026"
              className="w-full sm:w-auto"
            >
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                Get in Touch →
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/*
      ── TEAM GRIDS (uncomment when roster is ready) ────────────────────────────

      <div className="mt-20 space-y-24">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-primary border-b border-border/20 pb-3 mb-8">
            ◉ Functional Leads
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {FUNCTIONAL_TEAMS.map((team) => (
              <TeamMemberCard key={team.lead.name} team={team} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-primary border-b border-border/20 pb-3 mb-8">
            ◉ Event Directors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {EVENT_TEAMS.map((team) => (
              <TeamMemberCard key={team.lead.name} team={team} />
            ))}
          </div>
        </div>
      </div>

      ─────────────────────────────────────────────────────────────────────────── */}
    </div>
  );
}
