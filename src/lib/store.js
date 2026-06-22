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
    description: "Sharpen your instincts and dive deep into tangled codebases where every line is a potential suspect. Find The Bug 3.0 challenges participants to hunt down elusive errors across multiple rounds of escalating complexity, testing both speed and precision. If you live for that 'aha!' moment when the bug finally surfaces, this is your arena.",
    format: [
      { step: "Registration & team formation" },
      { step: "Qualifier debugging round" },
      { step: "Advanced multi-language round" },
      { step: "Lightning finale & winners announced" },
    ],
  },
  {
    slug: "boardroom-battles",
    name: "Boardroom Battles",
    tagline: "Business strategy simulation",
    day: "Day 2",
    time: "10:30 AM",
    description: "Step into the high-stakes world of corporate decision-making where every move could make or break your empire. Boardroom Battles is a fast-paced business strategy simulation that challenges teams to outmaneuver rivals through sharp negotiation, resource allocation, and market dominance. Only the most calculated minds will rise to the top of the leaderboard when the dust settles.",
    format: [
      { step: "Market briefing & capital allocation" },
      { step: "Strategic decision-making rounds" },
      { step: "Boardroom negotiations & deal-making" },
      { step: "Final evaluation & winners announced" },
    ],
  },
  {
    slug: "novex",
    name: "NoveX",
    tagline: "Flagship pitch deck event",
    day: "Day 2",
    time: "03:30 PM",
    description: "NoveX is the flagship pitch deck showdown where bold ideas meet sharp minds and sharper judges. Contestants craft and deliver high-stakes startup pitches, battling it out for recognition in front of a panel of seasoned entrepreneurs and industry experts. If you've got a vision worth funding, this is your stage to make it unforgettable.",
    format: [
      { step: "Pitch deck submission & screening" },
      { step: "Live presentation to judges" },
      { step: "Rapid-fire Q&A round" },
      { step: "Scoring & winners announced" },
    ],
  },
  {
    slug: "build-a-biz",
    name: "Build-a-Biz",
    tagline: "Startup building challenge",
    day: "Day 1",
    time: "02:00 PM",
    description: "Build-a-Biz is the ultimate startup gauntlet where raw ideas collide with real-world pressure — teams race to conceptualize, validate, and pitch a business from the ground up in a single afternoon. Think fast, build smart, and convince a panel of seasoned entrepreneurs that your venture is the next big thing.",
    format: [
      { step: "Sector reveal & ideation sprint" },
      { step: "Business model development" },
      { step: "Pitch deck prep & rehearsal" },
      { step: "Live pitch & judges' verdict" },
    ],
  },
  {
    slug: "technostrophe",
    name: "Technostrophe",
    tagline: "Quiz competition",
    day: "Day 1",
    time: "09:30 PM",
    description: "When the clock strikes 9:30, the arena lights up for Technostrophe — a high-voltage tech quiz that separates the truly wired from the merely curious. Brace yourself for rapid-fire rounds spanning cutting-edge technology, startup ecosystems, and digital culture that will push your knowledge to the breaking point. Only the sharpest minds will survive the storm.",
    format: [
      { step: "Registration & orientation" },
      { step: "Preliminary buzzer rounds" },
      { step: "Rapid-fire & visual rounds" },
      { step: "Final showdown & champions crowned" },
    ],
  },
  {
    slug: "e-mun",
    name: "E-MUN",
    tagline: "Model United Nations",
    day: "Day 1 & Day 2",
    time: "09:30 AM",
    description: "Step into the global arena at E-MUN, where diplomacy meets digital innovation in a high-stakes Model United Nations experience. Represent nations, negotiate alliances, and draft resolutions on the world's most pressing tech-policy issues — all under the pressure of the clock. Whether you're a seasoned delegate or a first-time diplomat, E-MUN challenges you to think globally and argue brilliantly.",
    format: [
      { step: "Country assignments & opening ceremony" },
      { step: "Committee sessions & position papers" },
      { step: "Caucuses & resolution drafting" },
      { step: "Final vote & delegate awards" },
    ],
  },
  {
    slug: "finance-for-all",
    name: "Finance For All Talk Show 3.0",
    tagline: "Finance talk show",
    day: "Day 1",
    time: "06:30 PM",
    description: "Finance For All Talk Show 3.0 brings the world of money, markets, and strategy to life in an electrifying panel-style showdown where sharp minds debate real-world financial dilemmas. Expect unfiltered conversations on investment, entrepreneurship, and economic trends that cut through the jargon and speak directly to the next generation of business leaders. Whether you're a finance nerd or a curious newcomer, this talk show will leave you richer in knowledge and perspective.",
    format: [
      { step: "Market headlines & show kickoff" },
      { step: "Expert panel debates" },
      { step: "Live audience Q&A" },
      { step: "Key takeaways & closing challenge" },
    ],
  },
  {
    slug: "trimble",
    name: "Trimble",
    tagline: "Paper trading competition",
    day: "TBA",
    time: "TBA",
    description: "Step into the high-stakes world of financial markets without risking a single rupee — Trimble is a paper trading competition that puts your investment instincts to the ultimate test. Compete against sharp minds as you analyze real-world market data, build portfolios, and chase maximum returns in a simulated trading environment. Whether you're a seasoned stock enthusiast or a curious newcomer, Trimble is where strategy meets opportunity.",
    format: [
      { step: "Virtual capital allocation & market access" },
      { step: "Portfolio building & asset research" },
      { step: "Live leaderboard & strategy refinement" },
      { step: "Final evaluation & top traders rewarded" },
    ],
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
        title: "NoveX 2.0",
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
    a: "August 25, 2026 at IIT Dharwad. Three days, one mission: redefine how the world moves.",
  },
  {
    q: "Who should attend?",
    a: "Founders, engineers, designers, students and investors building the future of mobility, EVs, logistics and autonomous systems.",
  },
  {
    q: "Can I get a refund?",
    a: "Passes are non-refundable but fully transferable up to 7 days before the event.",
  },
  {
    q: "Is accommodation included?",
    a: "Podium Pass holders get 2 nights at the campus guest house. Pit and Grid pass holders receive a curated list of partner stays.",
  },
];

export const TARGET_DATE = new Date("2026-08-25T09:00:00").getTime();
export const UPI_IDS = [
  "esummit@iitdh",
  "esummit26@okhdfcbank",
  "iitdh.esummit@okaxis",
  "payment.esummit@paytm",
];
