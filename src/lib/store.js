// Frontend-only mock data + localStorage helpers
export const PASSES = [
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

export const MERCH = [
  { id: "m1", name: "Team Jacket", price: 1299, img: "jacket" },
  { id: "m2", name: "Pit Crew Cap", price: 399, img: "cap" },
  { id: "m3", name: "Racing Tee", price: 599, img: "tee" },
  { id: "m4", name: "Driver Gloves", price: 799, img: "gloves" },
];

export const EVENTS = [
  {
    slug: "find-the-bug",
    name: "Find The Bug 3.0",
    tagline: "Debugging competition",
    day: "Day 2",
    time: "11:30 AM",
  },
  {
    slug: "boardroom-battles",
    name: "Boardroom Battles",
    tagline: "Business strategy simulation",
    day: "Day 2",
    time: "10:30 AM",
  },
  {
    slug: "innovex",
    name: "InnoveX",
    tagline: "Flagship pitch deck event",
    day: "Day 2",
    time: "03:30 PM",
  },
  {
    slug: "build-a-biz",
    name: "Build-a-Biz",
    tagline: "Startup building challenge",
    day: "Day 1",
    time: "02:00 PM",
  },
  {
    slug: "technostrophe",
    name: "Technostrophe",
    tagline: "Quiz competition",
    day: "Day 1",
    time: "09:30 PM",
  },
  {
    slug: "e-mun",
    name: "E-MUN",
    tagline: "Model United Nations",
    day: "Day 1 & Day 2",
    time: "09:30 AM",
  },
  {
    slug: "finance-for-all",
    name: "Finance For All Talk Show 3.0",
    tagline: "Finance talk show",
    day: "Day 1",
    time: "06:30 PM",
  },
  {
    slug: "trimble",
    name: "Trimble",
    tagline: "Paper trading competition",
    day: "TBA",
    time: "TBA",
  },
];

export const SPONSORS = [
  { name: "VELOCITAS", tier: "Title Sponsor", logoType: "engine" },
  { name: "AXLE&CO", tier: "Co-Powered By", logoType: "gear" },
  { name: "KAIROS EV", tier: "EV Tech Partner", logoType: "battery" },
  { name: "OCTANE", tier: "Mobility Partner", logoType: "bolt" },
  { name: "MERIDIAN MOTORS", tier: "Automotive Partner", logoType: "shield" },
  { name: "REDLINE APEX", tier: "Racing Partner", logoType: "apex" },
  { name: "TORQUE LABS", tier: "Innovation Sponsor", logoType: "wing" },
  { name: "APEX FUEL", tier: "Energy Sponsor", logoType: "circle" },
];

export const SCHEDULE = [
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
        time: "02:30 PM",
        title: "Build-a-Biz Phase I",
        category: "Competition",
        location: "111",
      },
      {
        time: "02:30 PM",
        title: "E-MUN Day I",
        category: "Competition",
        location: "101",
      },
      {
        time: "04:30 PM",
        title: "Build-a-Biz Phase II",
        category: "Competition",
        location: "111",
      },
      {
        time: "06:30 PM",
        title: "Finance For All Talk Show 3.0",
        category: "Talk",
        location: "F020",
      },
      {
        time: "09:30 PM",
        title: "Technostrophe Round II",
        category: "Competition",
      },
    ],
  },

  {
    day: "Day 02",
    items: [
      {
        time: "09:30 AM",
        title: "E-MUN Day II",
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
        title: "InnoveX 2.0",
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

export const FAQS = [
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

export const TARGET_DATE = new Date("2026-08-20T09:00:00").getTime();

export const UPI_IDS = [
  "esummit@iitdh",
  "esummit26@okhdfcbank",
  "iitdh.esummit@okaxis",
  "payment.esummit@paytm",
];
