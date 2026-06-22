import { useState, useEffect } from "react";

export const API_BASE = "http://localhost:3000";

// Fallback/Mock data if backend is offline
export const FALLBACK_PASSES = [
  {
    id: "pit",
    name: "Pit Pass",
    price: 299,
    perks: ["Access to all keynotes", "Expo floor", "Refreshments"],
  },
  {
    id: "grid",
    name: "Grid Pass",
    price: 499,
    perks: ["All Pit perks", "Workshops", "Networking dinner", "Swag kit"],
  },
  {
    id: "podium",
    name: "Podium Pass",
    price: 899,
    perks: [
      "All Grid perks",
      "VIP lounge",
      "Founder meet & greet",
      "Track day ride",
    ],
  },
];

export const FALLBACK_MERCH = [
  { id: "m1", name: "Team Jacket", price: 1299, img: "jacket" },
  { id: "m2", name: "Pit Crew Cap", price: 399, img: "cap" },
  { id: "m3", name: "Racing Tee", price: 599, img: "tee" },
  { id: "m4", name: "Driver Gloves", price: 799, img: "gloves" },
];

export const FALLBACK_EVENTS = [
  {
    slug: "innovex",
    name: "INNOVEX 3.0",
    tagline: "Where Ideas Meet Expertise and Innovation Takes Flight",
    day: "Day 2",
    time: "03:30 PM",
    about:
      "INNOVEX 3.0 is the flagship pitch deck competition conducted under E-Summit, the umbrella entrepreneurship event of IIT Dharwad, organised by the Institution's Innovation Council (IIC), IIT Dharwad and Dharti Foundation.",
    brief:
      "The event brings together innovative minds from colleges across the country, providing them a platform to present their startup ideas, validate their concepts, and receive valuable insights from a panel of industry experts. Whether you are exploring entrepreneurship for the first time or refining an existing idea, INNOVEX 3.0 gives you the opportunity to transform your vision into a structured pitch and showcase your innovation.",
    format: [
      "Startup idea submission & screening",
      "Pitch deck validation & mentorship",
      "Presentation to panel of industry experts",
      "Winners declared & startup support",
    ],
  },
  {
    slug: "find-the-bug",
    name: "Find The Bug 4.0",
    tagline:
      "Identify flaws in existing company strategies and pitch transformative solutions in a fast-paced, problem-solving competition.",
    day: "Day 2",
    time: "11:30 AM",
    about:
      "Find the Bug 4.0 takes you beyond code and into the core of business operations.",
    brief:
      "Participants are presented with real-world scenarios involving inefficient strategies, broken workflows, or crisis points within a company. Your task: analyze the problems, find the bugs, and pitch practical and innovative fixes to outsmart your competitors. It's a test of business intelligence, creativity, and communication. Think fast, think sharp, and show the judges you can turn a failing company around.",
    format: [
      "Scenario briefing & problem selection",
      "Analysis of inefficient workflows & strategy bugs",
      "Solution design & pitch deck preparation",
      "Presentation & Q&A session with judges",
    ],
  },
  {
    slug: "bid-a-biz",
    name: "Bid-A-Biz",
    tagline:
      "A high-stakes battle of strategy, auctions, and adaptability where every bid can build your empire—or become the reason someone else walks away with the prize money.",
    day: "Day 1",
    time: "02:00 PM",
    about:
      "Bid a Biz is a fast-paced strategy competition designed to test your business instincts, decision-making, and ability to adapt under pressure.",
    brief:
      "What begins as a battle of auctions quickly evolves into a high-stakes challenge where market disruptions can turn brilliant strategies into costly mistakes. Participants compete through dynamic auctions, build ventures from strategic assets, and navigate unexpected disruptions that test their ability to think on their feet. Smart decisions can build industry leaders, while a single bad move can become someone else's biggest opportunity. Think you can outsmart the competition, build a thriving enterprise, and stay ahead when the market turns against you? There's only one way to find out.",
    format: [
      "Strategic asset bidding & auctions",
      "Venture building from acquired assets",
      "Market disruption simulation & pivoting",
      "Final valuation & performance scoring",
    ],
  },
  {
    slug: "boardroom-battles",
    name: "Boardroom Battles",
    tagline:
      "A high-stakes showdown where strategy, persuasion, and innovation collide around the decisions that shape tomorrow's businesses.",
    day: "Day 2",
    time: "10:30 AM",
    about:
      "Boardroom Battles is the ultimate arena where strategy and innovation meet ambition and integrity.",
    brief:
      "Participants face a series of challenges that simulate real-world business environments ranging from solo growth pitches to unexpected joint ventures. It's not just about having an idea; it's about defending it, pitching it, and navigating tough competition under pressure. If you're ready to sharpen your business acumen, showcase your leadership, and stand tall in the world of boardroom politics, this is your battlefield.",
    format: [
      "Scenario analysis & growth pitch preparation",
      "Solo pitches & initial defense",
      "Unexpected joint venture & boardroom crisis simulation",
      "Cross-examination & final boardroom verdict",
    ],
  },
  {
    slug: "technostrophe",
    name: "Technostrophe",
    tagline:
      "A two-round quiz event that blends tech, trivia, and tension to test your brainpower and reaction time.",
    day: "Day 1",
    time: "09:30 PM",
    about:
      "Technostrophe is a fast-paced quiz showdown designed to push your mental boundaries.",
    brief:
      "From hardcore technology to offbeat trivia, it covers a broad spectrum and attracts nationwide participation. Whether you're a techie, trivia geek, or adrenaline junkie, this quiz is your stage to shine. Buzz fast, think faster, and don't miss a beat.",
    format: [
      "Round 1: Online/On-site written screening quiz",
      "Shortlisted teams announcement",
      "Round 2: Head-to-head buzzer-driven interactive finale",
      "Final score tally & winners ceremony",
    ],
  },
  {
    slug: "e-mun",
    name: "E-MUN (Corporate Crisis Council)",
    tagline:
      "Collaboration is mandatory. Loyalty is sold separately. Also 'Backstabbing' strictly prohibited. Until incentivized And Physical In Nature. Last but not the least Together we stand. Then I quietly profit.",
    day: "Day 1 & Day 2",
    time: "09:30 AM",
    about:
      "The world doesn't end with a bang. It ends with a logistics failure. Corporate Crisis Council is a fast-paced diplomacy showdown where the world's most powerful companies are locked in one room and handed one impossible task: survive a catastrophe none of them can solve alone.",
    brief:
      "Round one filters for the sharpest minds — the thinkers who see three moves ahead. Round two throws them into a live, two-day corporate war room where alliances are currency, trust is collateral, and every handshake hides a knife. You won't represent a country. You'll command an empire. Forge pacts, broker bailouts, outmaneuver regulators, and decide who survives the collapse and who becomes the cautionary tale. Cooperation is mandatory. Loyalty is optional. The only rule that matters: protect your own. From strategy to back-channel betrayal, this is diplomacy with the gloves off. Negotiate hard, think harder, and remember — in a crisis, the most dangerous person in the room is the one still smiling.",
    format: [
      "Round 1: Crisis screening & strategy testing",
      "Round 2 Day 1: Corporate war room setup & initial alliances",
      "Round 2 Day 2: Market disruptions, bailouts & final negotiations",
      "Crisis resolution & survival/profit assessment",
    ],
  },
];

export const FALLBACK_SPONSORS = [
  { name: "VELOCITAS", tier: "Title Sponsor", logoType: "engine" },
  { name: "AXLE&CO", tier: "Co-Powered By", logoType: "gear" },
  { name: "KAIROS EV", tier: "EV Tech Partner", logoType: "battery" },
  { name: "OCTANE", tier: "Mobility Partner", logoType: "bolt" },
  { name: "MERIDIAN MOTORS", tier: "Automotive Partner", logoType: "shield" },
  { name: "REDLINE APEX", tier: "Racing Partner", logoType: "apex" },
  { name: "TORQUE LABS", tier: "Innovation Sponsor", logoType: "wing" },
  { name: "APEX FUEL", tier: "Energy Sponsor", logoType: "circle" },
];

export const FALLBACK_SCHEDULE = [
  {
    day: "Day 01",
    items: [
      {
        time: "09:45 AM",
        title: "Inauguration",
        category: "Ceremony",
        location: "F020",
      },
      {
        time: "09:30 AM",
        title: "Corporate Crisis Council (E-MUN) Day I",
        category: "Competition",
        location: "101",
      },
      {
        time: "02:00 PM",
        title: "Bid-A-Biz Phase I",
        category: "Competition",
        location: "111",
      },
      {
        time: "04:30 PM",
        title: "Bid-A-Biz Phase II",
        category: "Competition",
        location: "111",
      },
      {
        time: "09:30 PM",
        title: "Technostrophe Round II",
        category: "Competition",
        location: "Main Stage",
      },
    ],
  },
  {
    day: "Day 02",
    items: [
      {
        time: "09:30 AM",
        title: "Corporate Crisis Council (E-MUN) Day II",
        category: "Competition",
        location: "101",
      },
      {
        time: "10:30 AM",
        title: "Boardroom Battles I",
        category: "Competition",
        location: "111",
      },
      {
        time: "11:30 AM",
        title: "Find The Bug - Round II",
        category: "Competition",
        location: "120",
      },
      {
        time: "01:30 PM",
        title: "Boardroom Battles II",
        category: "Competition",
        location: "111",
      },
      {
        time: "03:30 PM",
        title: "INNOVEX 3.0",
        category: "Competition",
        location: "103",
      },
      {
        time: "06:30 PM",
        title: "Cultural Night",
        category: "Cultural",
        location: "F020",
      },
    ],
  },
];

export const FALLBACK_FAQS = [
  {
    q: "When and where is E-Summit 2026?",
    a: "March 6–8, 2026 at IIT Dharwad.",
  },
  {
    q: "Who should attend?",
    a: "Anyone with a passion for innovation, entrepreneurship, and problem-solving. Whether you're a student, creator, aspiring entrepreneur, developer, designer, or simply curious to learn, E-Summit has something for you.",
  },
  {
    q: "Can I get a refund?",
    a: "Passes are non-refundable.",
  },
  {
    q: "Is accommodation available?",
    a: "Yes. Accommodation is provided to eligible attendees based on their participation category. Participants may be accommodated in IIT Dharwad hostels, while invited guests are provided accommodation at the campus guest house. Further details will be communicated after registration.",
  },
];

export const FALLBACK_UPI_IDS = [
  "esummit@iitdh",
  "esummit26@okhdfcbank",
  "iitdh.esummit@okaxis",
  "payment.esummit@paytm",
];

export const FALLBACK_TARGET_DATE = new Date("2026-08-20T09:00:00").getTime();

// Maintain legacy exported constants so no existing files break
export const PASSES = FALLBACK_PASSES;
export const MERCH = FALLBACK_MERCH;
export const EVENTS = FALLBACK_EVENTS;
export const SPONSORS = FALLBACK_SPONSORS;
export const SCHEDULE = FALLBACK_SCHEDULE;
export const FAQS = FALLBACK_FAQS;
export const UPI_IDS = FALLBACK_UPI_IDS;
export const TARGET_DATE = FALLBACK_TARGET_DATE;

// ── API CLIENT FUNCTIONS ───────────────────────────────────────────────────

export async function fetchEvents() {
  const res = await fetch(`${API_BASE}/content/events`);
  if (!res.ok) throw new Error("Failed to fetch events");
  const json = await res.json();
  return json.status === "success" ? json.data : FALLBACK_EVENTS;
}

export async function fetchSponsors() {
  const res = await fetch(`${API_BASE}/content/sponsors`);
  if (!res.ok) throw new Error("Failed to fetch sponsors");
  const json = await res.json();
  return json.status === "success" ? json.data : FALLBACK_SPONSORS;
}

export async function fetchFAQs() {
  const res = await fetch(`${API_BASE}/content/faqs`);
  if (!res.ok) throw new Error("Failed to fetch FAQs");
  const json = await res.json();
  return json.status === "success" ? json.data : FALLBACK_FAQS;
}

export async function fetchSchedule() {
  const res = await fetch(`${API_BASE}/content/schedule`);
  if (!res.ok) throw new Error("Failed to fetch schedule");
  const json = await res.json();
  return json.status === "success" ? json.data : FALLBACK_SCHEDULE;
}

export async function fetchMerch() {
  const res = await fetch(`${API_BASE}/content/merch`);
  if (!res.ok) throw new Error("Failed to fetch merch");
  const json = await res.json();
  return json.status === "success" ? json.data : FALLBACK_MERCH;
}

export async function fetchTeams() {
  const res = await fetch(`${API_BASE}/content/teams`);
  if (!res.ok) throw new Error("Failed to fetch teams");
  const json = await res.json();
  return json.status === "success" ? json.data : [];
}

export async function fetchConfig(key) {
  const res = await fetch(`${API_BASE}/content/config/${key}`);
  if (!res.ok) throw new Error(`Failed to fetch config key ${key}`);
  const json = await res.json();
  return json.status === "success" ? json.data : null;
}

// Order management
export async function submitOrder(orderData) {
  const res = await fetch(`${API_BASE}/order/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return res.json();
}

export async function getOrderStatus(phone) {
  const res = await fetch(
    `${API_BASE}/order/status?phone=${encodeURIComponent(phone)}`,
  );
  return res.json();
}

// Attendance Check-in
export async function verifyQR(qrContent) {
  const res = await fetch(`${API_BASE}/attendance/verify-qr`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qr_content: qrContent }),
  });
  return res.json();
}

export async function markAttendance(qrContent) {
  const res = await fetch(`${API_BASE}/attendance/mark`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qr_content: qrContent }),
  });
  return res.json();
}

// Admin Panel operations
export async function verifyAdminKey(adminKey) {
  const res = await fetch(`${API_BASE}/admin/verify-key`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ admin_key: adminKey }),
  });
  return res.json();
}

export async function getAdminDbState(adminKey) {
  const res = await fetch(`${API_BASE}/admin/db-state`, {
    headers: { "X-Admin-Key": adminKey },
  });
  return res.json();
}

export async function verifyAdminOrder(
  adminKey,
  orderId,
  status,
  rejectionReason = "",
) {
  const res = await fetch(`${API_BASE}/admin/order/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Admin-Key": adminKey,
    },
    body: JSON.stringify({
      order_id: orderId,
      status,
      rejection_reason: rejectionReason,
    }),
  });
  return res.json();
}

export async function getAdminPasses(adminKey) {
  const res = await fetch(`${API_BASE}/admin/passes`, {
    headers: { "X-Admin-Key": adminKey },
  });
  return res.json();
}

// ── REACT HOOKS FOR ASYNC DATA LOADING ─────────────────────────────────────

export function useEvents() {
  const [data, setData] = useState(FALLBACK_EVENTS);
  useEffect(() => {
    fetchEvents()
      .then(setData)
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  console.log("Fetched the events");
  return data;
}

export function useSponsors() {
  const [data, setData] = useState(FALLBACK_SPONSORS);
  useEffect(() => {
    fetchSponsors()
      .then(setData)
      .catch((err) => console.error("Error fetching sponsors:", err));
  }, []);

  console.log("Fetched the sponsors");

  return data;
}

export function useFAQs() {
  const [data, setData] = useState(FALLBACK_FAQS);
  useEffect(() => {
    fetchFAQs()
      .then(setData)
      .catch((err) => console.error("Error fetching FAQs:", err));
  }, []);

  console.log("Fetched the faqs");

  return data;
}

export function useSchedule() {
  const [data, setData] = useState(FALLBACK_SCHEDULE);
  useEffect(() => {
    fetchSchedule()
      .then(setData)
      .catch((err) => console.error("Error fetching schedule:", err));
  }, []);

  console.log("Fetched the schedule");

  return data;
}

export function useMerch() {
  const [data, setData] = useState(FALLBACK_MERCH);
  useEffect(() => {
    fetchMerch()
      .then(setData)
      .catch((err) => console.error("Error fetching merch:", err));
  }, []);

  console.log("Fetched the merch");

  return data;
}

export function useTeams() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchTeams()
      .then(setData)
      .catch((err) => console.error("Error fetching teams:", err));
  }, []);

  console.log("Fetched the teams");
  return data;
}

export function useConfigValue(key, fallbackValue) {
  const [val, setVal] = useState(fallbackValue);
  useEffect(() => {
    fetchConfig(key)
      .then((data) => {
        if (data !== null) setVal(data);
      })
      .catch((err) => console.error(`Error fetching config ${key}:`, err));
  }, [key]);

  console.log("Fetched the config", key);
  return val;
}

// Cart helpers
const CART_KEY = "es26_cart";
export const getCart = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};
export const setCart = (c) => localStorage.setItem(CART_KEY, JSON.stringify(c));
