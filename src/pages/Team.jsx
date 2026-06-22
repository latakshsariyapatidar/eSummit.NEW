import React from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { TeamMemberCard } from "@/components/TeamMemberCard";

const FUNCTIONAL_TEAMS = [
  {
    lead: {
      name: "Rajat Gupta",
      role: "Overall Coordinator",
      team: "Core Committee",
      email: "outreach.iic@iitdh.ac.in",
      bio: "Directing the overall execution and strategic partnerships of E-Summit 2026.",
      image:
        "https://ui-avatars.com/api/?name=Rajat+Gupta&background=0D0D0C&color=fff",
    },
    crew: [],
  },
  {
    lead: {
      name: "Anant Tripathi",
      role: "Operations Head",
      team: "Core Committee",
      email: "outreach.iic@iitdh.ac.in",
      bio: "Managing overall ground operations, logistics, and resource planning for E-Summit 2026.",
      image:
        "https://ui-avatars.com/api/?name=Anant+Tripathi&background=0D0D0C&color=fff",
    },
    crew: [],
  },
  {
    lead: {
      name: "L Shreya",
      role: "Outreach Head",
      team: "Core Committee",
      email: "outreach.iic@iitdh.ac.in",
      bio: "Driving institutional partnerships, external relations, and marketing campaigns.",
      image:
        "https://ui-avatars.com/api/?name=L+Shreya&background=0D0D0C&color=fff",
    },
    crew: [],
  },
  {
    lead: {
      name: "Soumya Basuli",
      role: "Design Lead",
      team: "Core Committee",
      email: "outreach.iic@iitdh.ac.in",
      bio: "Curating E-Summit 2026's visual identity, graphic design assets, and event style guide.",
      image:
        "https://ui-avatars.com/api/?name=Soumya+Basuli&background=0D0D0C&color=fff",
    },
    crew: [],
  },
  {
    lead: {
      name: "Nirav Mittal",
      role: "Events Coordinator",
      team: "Core Committee",
      email: "outreach.iic@iitdh.ac.in",
      bio: "Managing event timelines, judging rubrics, and scheduling across all competition grids.",
      image:
        "https://ui-avatars.com/api/?name=Nirav+Mittal&background=0D0D0C&color=fff",
    },
    crew: [],
  },
  {
    lead: {
      name: "Mayank Mishra",
      role: "PR Lead",
      team: "Core Committee",
      email: "outreach.iic@iitdh.ac.in",
      bio: "Handling public relations, media reach, speaker coordination, and press releases.",
      image:
        "https://ui-avatars.com/api/?name=Mayank+Mishra&background=0D0D0C&color=fff",
    },
    crew: [],
  },
  {
    lead: {
      name: "Lataksh Sariya",
      role: "Web Team Lead",
      team: "Core Committee",
      email: "outreach.iic@iitdh.ac.in",
      bio: "Architecting the digital interfaces, transitions, and user experiences for E-Summit 2026.",
      image:
        "https://ui-avatars.com/api/?name=Lataksh+Sariya&background=0D0D0C&color=fff",
    },
    crew: [],
  },
];

const EVENT_TEAMS = [
  {
    lead: {
      event: "Innovex",
      name: "Navajeevan K S",
      role: "Event Lead",
      bio: "Leading execution of the flagship Innovex startup pitch stage.",
      image:
        "https://ui-avatars.com/api/?name=Navajeevan+K+S&background=0D0D0C&color=fff",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Tejas Sharma",
        image:
          "https://ui-avatars.com/api/?name=Tejas+Sharma&background=0D0D0C&color=fff",
      },
      {
        name: "Saikat Ghosh",
        image:
          "https://ui-avatars.com/api/?name=Saikat+Ghosh&background=0D0D0C&color=fff",
      },
      {
        name: "Jayesh",
        image:
          "https://ui-avatars.com/api/?name=Jayesh&background=0D0D0C&color=fff",
      },
    ],
  },
  {
    lead: {
      event: "Find The Bug",
      name: "SAI RAM",
      role: "Event Lead",
      bio: "Orchestrating the code debugging and code reviews tracking challenge.",
      image:
        "https://ui-avatars.com/api/?name=SAI+RAM&background=0D0D0C&color=fff",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Hithesh V R",
        image:
          "https://ui-avatars.com/api/?name=Hithesh+V+R&background=0D0D0C&color=fff",
      },
      {
        name: "Aditya Jain",
        image:
          "https://ui-avatars.com/api/?name=Aditya+Jain&background=0D0D0C&color=fff",
      },
      {
        name: "Chaitanya Handore",
        image:
          "https://ui-avatars.com/api/?name=Chaitanya+Handore&background=0D0D0C&color=fff",
      },
      {
        name: "Aaditya Kumar",
        image:
          "https://ui-avatars.com/api/?name=Aaditya+Kumar&background=0D0D0C&color=fff",
      },
    ],
  },
  {
    lead: {
      event: "Bid-A-Biz",
      name: "Pranav S Newton",
      role: "Event Lead",
      bio: "Leading the business strategy bid and auction simulation.",
      image:
        "https://ui-avatars.com/api/?name=Pranav+S+Newton&background=0D0D0C&color=fff",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Rahul Ahirwar",
        image:
          "https://ui-avatars.com/api/?name=Rahul+Ahirwar&background=0D0D0C&color=fff",
      },
      {
        name: "Shivam Srivastava",
        image:
          "https://ui-avatars.com/api/?name=Shivam+Srivastava&background=0D0D0C&color=fff",
      },
      {
        name: "Aadhi",
        image:
          "https://ui-avatars.com/api/?name=Aadhi&background=0D0D0C&color=fff",
      },
      {
        name: "Sameer Patel",
        image:
          "https://ui-avatars.com/api/?name=Sameer+Patel&background=0D0D0C&color=fff",
      },
    ],
  },
  {
    lead: {
      event: "Technostrophe",
      name: "Pranav",
      role: "Event Lead",
      bio: "Running the technology quiz event and adrenaline-filled buzzer finals.",
      image:
        "https://ui-avatars.com/api/?name=Pranav&background=0D0D0C&color=fff",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Achinthya",
        image:
          "https://ui-avatars.com/api/?name=Achinthya&background=0D0D0C&color=fff",
      },
      {
        name: "Shubhra Kishor Nikam",
        image:
          "https://ui-avatars.com/api/?name=Shubhra+Kishor+Nikam&background=0D0D0C&color=fff",
      },
      {
        name: "Lakshya Kumar",
        image:
          "https://ui-avatars.com/api/?name=Lakshya+Kumar&background=0D0D0C&color=fff",
      },
    ],
  },
  {
    lead: {
      event: "Boardroom Battles",
      name: "Anushaa B",
      role: "Event Lead",
      bio: "Leading the business strategy pitches and boardroom simulation battles.",
      image:
        "https://ui-avatars.com/api/?name=Anushaa+B&background=0D0D0C&color=fff",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Priyanshu Nimbalkar",
        image:
          "https://ui-avatars.com/api/?name=Priyanshu+Nimbalkar&background=0D0D0C&color=fff",
      },
      {
        name: "Gourav Sherikar",
        image:
          "https://ui-avatars.com/api/?name=Gourav+Sherikar&background=0D0D0C&color=fff",
      },
      {
        name: "Saisha Nimbalkar",
        image:
          "https://ui-avatars.com/api/?name=Saisha+Nimbalkar&background=0D0D0C&color=fff",
      },
      {
        name: "Lakshman Naidu Bandela",
        image:
          "https://ui-avatars.com/api/?name=Lakshman+Naidu+Bandela&background=0D0D0C&color=fff",
      },
    ],
  },
  {
    lead: {
      event: "E-MUN + GD",
      name: "Sudhakar",
      role: "Event Lead",
      bio: "Orchestrating the corporate diplomacy council crisis model.",
      image:
        "https://ui-avatars.com/api/?name=Sudhakar&background=0D0D0C&color=fff",
      email: "outreach.iic@iitdh.ac.in",
    },
    crew: [
      {
        name: "Anjali Kumari",
        image:
          "https://ui-avatars.com/api/?name=Anjali+Kumari&background=0D0D0C&color=fff",
      },
      {
        name: "Aditi Upadhye",
        image:
          "https://ui-avatars.com/api/?name=Aditi+Upadhye&background=0D0D0C&color=fff",
      },
      {
        name: "Tangirala Dhanunjaya Rao",
        image:
          "https://ui-avatars.com/api/?name=Tangirala+Dhanunjaya+Rao&background=0D0D0C&color=fff",
      },
    ],
  },
];

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

      <div className="mt-20 space-y-24">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-primary border-b border-border/20 pb-3 mb-8">
            ◉ Functional Leads / Core Committee
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {FUNCTIONAL_TEAMS.map((team) => (
              <TeamMemberCard key={team.lead.name} team={team} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.25em] text-primary border-b border-border/20 pb-3 mb-8">
            ◉ Event Directors & Crew
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {EVENT_TEAMS.map((team) => (
              <TeamMemberCard key={team.lead.name} team={team} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
