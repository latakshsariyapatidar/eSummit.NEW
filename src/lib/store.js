import { useState, useEffect } from "react";

export const API_BASE =
  import.meta.env.VITE_API_BASE || "https://iic.iitdh.ac.in/esummit/api/api";

export const PASSES = [];
export const SCHEDULE = [
  {
    day: "Day 1 - 22nd August",
    items: [
      {
        time: "8:30 AM - 10:00 AM",
        title: "Opening Ceremony",
        category: "Ceremony",
        location: "TBD",
      },
      {
        time: "10:00 AM - 1:00 PM",
        title: "Find the Bug",
        category: "Event",
        location: "TBD",
      },
      {
        time: "10:00 AM - 2:00 PM",
        title: "E-Mun",
        category: "Event",
        location: "TBD",
      },
      {
        time: "10:30 AM - 2:00 PM",
        title: "Boardroom Battle",
        category: "Event",
        location: "TBD",
      },
      {
        time: "2:30 PM - 5:30 PM",
        title: "Intersect",
        category: "Event",
        location: "TBD",
      },
      {
        time: "6:00 PM - 8:00 PM",
        title: "Object Hunt",
        category: "Event",
        location: "TBD",
      },
    ],
  },
  {
    day: "Day 2 - 23rd August",
    items: [
      {
        time: "9:00 AM - 1:00 PM",
        title: "E-Mun",
        category: "Event",
        location: "TBD",
      },
      {
        time: "9:00 AM - 1:00 PM",
        title: "Innovex",
        category: "Event",
        location: "TBD",
      },
      {
        time: "10:00 AM - 12:00 PM",
        title: "Boardroom Battle",
        category: "Event",
        location: "TBD",
      },
      {
        time: "1:00 PM - 5:00 PM",
        title: "GD",
        category: "Event",
        location: "TBD",
      },
      {
        time: "1:00 PM - 5:00 PM",
        title: "Auction-Boardroom Battle",
        category: "Event",
        location: "TBD",
      },
      {
        time: "5:00 PM - 11:00 PM",
        title: "Cultural Night",
        category: "Event",
        location: "TBD",
      },
    ],
  },
];
export const TARGET_DATE = new Date("2026-08-22T09:00:00").getTime();

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
  const available = await isContentAvailable("teams");
  if (!available) return [];

  const res = await fetch(`${API_BASE}/content/teams`);
  if (!res.ok) throw new Error("Failed to fetch teams");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
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
