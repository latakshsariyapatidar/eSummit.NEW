import { useState, useEffect } from "react";

export const API_BASE =
  import.meta.env.VITE_API_BASE || "https://iic.iitdh.ac.in/esummit/api/api";

export const PASSES = [];
export const SCHEDULE = [
  {
    day: "Day 1 - 22nd August",
    date: "2026-08-22",
    items: [
      {
        time: "10:00 AM - 11:00 AM",
        title: "Opening Ceremony",
        category: "Ceremony",
        location: "Main Auditorium",
      },
      {
        time: "11:00 AM - 2:00 PM",
        title: "Find the Bug",
        category: "Event",
        location: "Room 111",
      },
      {
        time: "11:00 AM - 3:00 PM",
        title: "E-Mun",
        category: "Event",
        location: "Room 101",
      },
      {
        time: "12:00 PM - 3:00 PM",
        title: "Boardroom Battle",
        category: "Event",
        location: "Room 103",
      },
      {
        time: "4:00 PM - 6:30 PM",
        title: "Intersect",
        category: "Event",
        location: "Main Auditorium",
      },
      {
        time: "7:00 PM - 10:00 PM",
        title: "Fun Events",
        category: "Event",
        location: "Campus Grounds",
      },
    ],
  },
  {
    day: "Day 2 - 23rd August",
    date: "2026-08-23",
    items: [
      {
        time: "8:00 AM - 11:00 AM",
        title: "E-Mun",
        category: "Event",
        location: "Room 101",
      },
      {
        time: "9:00 AM - 12:00 PM",
        title: "Innovex",
        category: "Event",
        location: "Room 109",
      },
      {
        time: "10:00 AM - 12:00 PM",
        title: "Boardroom Battle",
        category: "Event",
        location: "Room 103",
      },
      {
        time: "10:00 AM - 2:00 PM",
        title: "Bid-A-Biz",
        category: "Event",
        location: "Room 107",
      },
      {
        time: "11:00 AM - 3:00 PM",
        title: "The FORUM",
        category: "Event",
        location: "Room 103",
      },
      {
        time: "3:30 PM - 4:00 PM",
        title: "Closing Ceremony",
        category: "Ceremony",
        location: "Main Auditorium",
      },
      {
        time: "4:00 PM - 5:00 PM",
        title: "Standup",
        category: "Event",
        location: "Main Auditorium",
      },
    ],
  },
];
export const TARGET_DATE = new Date("2026-08-22T09:00:00").getTime();

export const DEFAULT_TEAMS = [
  {
    lead: {
      name: "Rohan Sharma",
      role: "Overall Coordinator",
      team: "Core Committee",
      email: "rohan.sharma@iitdh.ac.in",
      bio: "Leading E-Summit 2026 with a vision to build India's premier student-led entrepreneurship summit at IIT Dharwad.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Rohan%20Sharma",
    },
    crew: [
      {
        name: "Aditya Verma",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      },
      {
        name: "Sneha Patel",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      },
    ],
  },
  {
    lead: {
      name: "Priya Nair",
      role: "Head of Web & Tech",
      team: "Core Committee",
      email: "priya.nair@iitdh.ac.in",
      bio: "Spearheading digital experience, full-stack architecture, and interactive portals for E-Summit 2026.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Priya%20Nair",
    },
    crew: [
      {
        name: "Kiran Kumar",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      },
      {
        name: "Divya Singh",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      },
    ],
  },
  {
    lead: {
      name: "Arjun Kulkarni",
      role: "Head of Corporate Relations",
      team: "Core Committee",
      email: "arjun.k@iitdh.ac.in",
      bio: "Connecting startups, venture capitalists, and industry stalwarts with IIT Dharwad's entrepreneurial ecosystem.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Arjun%20Kulkarni",
    },
    crew: [],
  },
  {
    lead: {
      name: "Aarav Gupta",
      role: "Event Director — Pitch Perfect",
      event: "Pitch Perfect",
      email: "aarav.g@iitdh.ac.in",
      bio: "Directing the flagship startup pitching competition connecting high-potential founders with top VC investors.",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Aarav%20Gupta",
    },
    crew: [
      {
        name: "Rahul Deshmukh",
        image:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      },
    ],
  },
  {
    lead: {
      name: "Meera Joshi",
      role: "Event Director — HackInit 2026",
      event: "HackInit 2026",
      email: "meera.j@iitdh.ac.in",
      bio: "Organizing the 36-hour hackathon pushing student innovators to prototype solutions for real-world challenges.",
      image:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Meera%20Joshi",
    },
    crew: [],
  },
  // Past Members
  {
    isPast: true,
    year: "2025",
    lead: {
      name: "Vikramaditya Rao",
      role: "Overall Coordinator",
      team: "E-Summit 2025 Core",
      email: "vikram.rao.alumni@iitdh.ac.in",
      bio: "Spearheaded E-Summit 2025 with 25+ events and 4,000+ delegates across South India. Now Software Engineer at Microsoft.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Vikramaditya%20Rao",
    },
    crew: [
      {
        name: "Siddharth Rao",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      },
      {
        name: "Neha Saxena",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      },
    ],
  },
  {
    isPast: true,
    year: "2025",
    lead: {
      name: "Ananya Iyer",
      role: "Head of Marketing & PR",
      team: "E-Summit 2025 Core",
      email: "ananya.iyer@iitdh.ac.in",
      bio: "Drove 100k+ organic reach and campus ambassador network for E-Summit 2025. Product Marketing Specialist.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Ananya%20Iyer",
    },
    crew: [],
  },
  {
    isPast: true,
    year: "2024",
    lead: {
      name: "Karan Mehta",
      role: "Overall Coordinator",
      team: "E-Summit 2024 Core",
      email: "karan.mehta@iitdh.ac.in",
      bio: "Laid the initial groundwork for IIT Dharwad's modern E-Summit structure and angel investor pitching sessions.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Karan%20Mehta",
    },
    crew: [
      {
        name: "Varun Bhat",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
      },
    ],
  },
  {
    isPast: true,
    year: "2024",
    lead: {
      name: "Tanya Sen",
      role: "Design & Creative Lead",
      team: "E-Summit 2024 Core",
      email: "tanya.sen@iitdh.ac.in",
      bio: "Crafted the brand identity, stage design, and digital assets for E-Summit 2024. UI/UX Designer at Figma.",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      linkedin: "https://www.linkedin.com/search/results/all/?keywords=Tanya%20Sen",
    },
    crew: [],
  },
];

// Helper to check if a content type is available in the database
async function isContentAvailable(type) {
  try {
    const res = await fetch(`${API_BASE}/content/${type}/status`);
    if (!res.ok) return true;
    const json = await res.json();
    return json.status === "success" && json.data === "yes";
  } catch (err) {
    console.error(`Error checking status for ${type}:`, err);
    return true; // fail-safe: default to available
  }
}

// ── API CLIENT FUNCTIONS ───────────────────────────────────────────────────

export async function fetchEvents() {
  const available = await isContentAvailable("events");
  if (!available) return [];

  const res = await fetch(`${API_BASE}/content/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
}

export async function fetchSponsors() {
  const available = await isContentAvailable("sponsors");
  if (!available) return [];

  const res = await fetch(`${API_BASE}/content/sponsors`);
  if (!res.ok) throw new Error("Failed to fetch sponsors");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
}

export async function fetchFAQs() {
  const available = await isContentAvailable("faqs");
  if (!available) return [];

  const res = await fetch(`${API_BASE}/content/faqs`);
  if (!res.ok) throw new Error("Failed to fetch FAQs");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
}

export async function fetchSchedule() {
  const available = await isContentAvailable("schedule");
  if (!available) return [];

  const res = await fetch(`${API_BASE}/content/schedule`);
  if (!res.ok) throw new Error("Failed to fetch schedule");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
}

export async function fetchTeams() {
  try {
    const available = await isContentAvailable("teams");
    if (!available) return DEFAULT_TEAMS;

    const res = await fetch(`${API_BASE}/content/teams`);
    if (!res.ok) return DEFAULT_TEAMS;
    const json = await res.json();
    if (
      json.status === "success" &&
      Array.isArray(json.data) &&
      json.data.length > 0
    ) {
      return json.data;
    }
    return DEFAULT_TEAMS;
  } catch (err) {
    console.error("Error fetching teams, using default teams data:", err);
    return DEFAULT_TEAMS;
  }
}

export async function fetchPasses() {
  const available = await isContentAvailable("passes");
  if (!available) return [];

  const res = await fetch(`${API_BASE}/content/passes`);
  if (!res.ok) throw new Error("Failed to fetch passes");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
}

// ── REACT HOOKS FOR ASYNC DATA LOADING ─────────────────────────────────────

export function useEvents() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchEvents()
      .then(setData)
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  console.log("Fetched the events");
  return data;
}
