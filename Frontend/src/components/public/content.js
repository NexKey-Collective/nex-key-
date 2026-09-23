const BRAND = "NextKey Collective";
const HERO = {
  eyebrow: "Trusted by 5,000+ investors",
  title: "Premium Real Estate Investment Opportunities",
  subtitle:
    "Access exclusive off-market deals, creative financing solutions, and data-driven insights. Build lasting wealth through strategic real estate investments.",
  primaryCta: "Browse Deals",
  secondaryCta: "Learn More",
};
const STATS = [
  { value: "$125M+", label: "Transaction Volume" },
  { value: "850+", label: "Properties Closed" },
  { value: "14.2%", label: "Avg. Annual ROI" },
  { value: "5,000+", label: "Active Investors" },
];
const PROPERTIES = [
  {
    id: "p1",
    name: "Modern Downtown Condo",
    address: "123 Main St, New York, NY 10001",
    price: "$425,000",
    was: "$525,000",
    belowMarket: "19% Below Market",
    strategy: "Wholesale",
    beds: 2,
    baths: 2,
    sqft: "1,200 sqft",
    image:
      "https://images.unsplash.com/photo-1638454668466-e8dbd5462f20?w=1080&h=720&fit=crop&auto=format",
  },
  {
    id: "p2",
    name: "Suburban Family Home",
    address: "456 Oak Avenue, Brooklyn, NY 11201",
    price: "$612,000",
    was: "$705,000",
    belowMarket: "13% Below Market",
    strategy: "Fix & Flip",
    beds: 4,
    baths: 3,
    sqft: "2,400 sqft",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1080&h=720&fit=crop&auto=format",
  },
  {
    id: "p3",
    name: "Luxury Waterfront Villa",
    address: "78 Harbor View, Miami, FL 33101",
    price: "$1,850,000",
    was: "$2,200,000",
    belowMarket: "16% Below Market",
    strategy: "Buy & Hold",
    beds: 5,
    baths: 5,
    sqft: "4,800 sqft",
    image:
      "https://images.unsplash.com/photo-1670589953882-b94c9cb380f5?w=1080&h=720&fit=crop&auto=format",
  },
];
const FEATURES = [
  {
    title: "Off-Market Access",
    body: "Exclusive deals you won't find on the MLS, sourced through our nationwide acquisition network.",
  },
  {
    title: "Creative Financing",
    body: "Seller financing, subject-to, and partnership structures tailored to your investment goals.",
  },
  {
    title: "Data-Driven Insights",
    body: "Underwriting, comps, and ROI projections on every deal so you invest with confidence.",
  },
];
const AUDIENCES = [
  {
    title: "Investors",
    body: "Build a passive portfolio with vetted, cash-flowing properties and full underwriting support.",
    points: ["Curated deal flow", "Hands-off management", "Quarterly returns"],
  },
  {
    title: "Wholesalers",
    body: "Move contracts faster with a buyer network of 5,000+ active, pre-qualified investors.",
    points: ["Instant buyer match", "Escrow handling", "Marketing tools"],
  },
  {
    title: "Agents",
    body: "Bring investment clients deals that close, and earn on every transaction in the network.",
    points: ["Referral splits", "Co-branded deals", "Priority listings"],
  },
];
const STEPS = [
  {
    n: "01",
    title: "Set Your Buy Box",
    body: "Tell us your markets, budget, and strategy. We tailor deal flow to your exact criteria.",
  },
  {
    n: "02",
    title: "Review Vetted Deals",
    body: "Get underwritten opportunities with comps, projections, and inspection reports.",
  },
  {
    n: "03",
    title: "Close With Confidence",
    body: "Our team handles financing, escrow, and closing so you can scale your portfolio.",
  },
];
const AFFILIATES = [
  {
    id: "a1",
    name: "Marcus Rodriguez",
    role: "Portfolio Investor \xB7 Austin, TX",
    quote:
      "NextKey's off-market pipeline let me close four cash-flowing rentals in a single quarter. The underwriting is airtight.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format",
  },
  {
    id: "a2",
    name: "Sarah Chen",
    role: "Wholesaler \xB7 Seattle, WA",
    quote:
      "I assigned three contracts in my first month. The buyer network is the real deal \u2014 serious investors, fast closes.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format",
  },
  {
    id: "a3",
    name: "David Thompson",
    role: "Broker \xB7 Denver, CO",
    quote:
      "My investment clients finally have deals worth their time. The co-branded listings have grown my business 3x.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format",
  },
];
const PARTNER_STATS = [
  { value: "150+", label: "Markets Covered" },
  { value: "$2.3M+", label: "Avg. Deal Size" },
  { value: "98%", label: "Close Rate" },
  { value: "12 Days", label: "Avg. Time to Close" },
];
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1748063578185-3d68121b11ff?w=1280&h=960&fit=crop&auto=format";
const SECONDARY_IMAGE =
  "https://images.unsplash.com/photo-1768483185476-ce69ae5f43da?w=1080&h=1280&fit=crop&auto=format";
const HOME_SECTIONS = [
  { id: "about", label: "About" },
  { id: "why", label: "Why Choose NexKey" },
  { id: "serve", label: "Who We Serve" },
  { id: "how", label: "How Partnership Works" },
  { id: "partner", label: "Partner With NexKey" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];
const ABOUT = {
  eyebrow: "About NexKey",
  title: "A smarter way to invest in real estate",
  body: "NexKey connects serious investors with vetted, off-market opportunities and creative financing \u2014 all backed by transparent underwriting. We've replaced the guesswork of real estate investing with data, structure, and a nationwide network you can trust.",
  points: [
    "Every deal underwritten before it reaches you",
    "Creative financing structures built around your goals",
    "A dedicated specialist from first look to closing",
  ],
  image:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1080&h=1200&fit=crop&auto=format",
};
const PARTNER_BENEFITS = [
  {
    title: "Deal Flow That Fits",
    body: "Set your Buy Box once and receive matched, underwritten opportunities automatically \u2014 no more sifting through listings.",
  },
  {
    title: "Aligned Incentives",
    body: "We only succeed when you close. Our specialists guide financing, diligence, and negotiation end to end.",
  },
  {
    title: "A Network at Scale",
    body: "Tap a nationwide acquisition network of 5,000+ investors, wholesalers, and agents moving real inventory.",
  },
  {
    title: "Transparent by Default",
    body: "Comps, projections, and inspection reports on every deal. Invest with full visibility, never a black box.",
  },
];
const FAQS = [
  {
    q: "What is a Buy Box and why do I need one?",
    a: "A Buy Box is your investment profile \u2014 your target markets, budget, property types, and strategy. Once set, NexKey automatically matches you with off-market deals that fit your exact criteria.",
  },
  {
    q: "Do I need an account to browse deals?",
    a: "No. You can freely browse, search, and filter available deals, and view basic property information. A free account unlocks match scores, saving deals, creating Buy Boxes, AI recommendations, and connecting with sellers.",
  },
  {
    q: "What kinds of financing do you support?",
    a: "We specialize in creative financing including seller finance, subject-to, hybrid structures, and traditional cash purchases \u2014 tailored to your investment goals.",
  },
  {
    q: "How are deals vetted?",
    a: "Every opportunity is underwritten before it reaches you, with comps, ROI projections, and inspection reports so you can invest with confidence.",
  },
  {
    q: "Is NexKey available in my market?",
    a: "We currently source deals across 150+ markets nationwide, and our coverage grows every month. Create a free account to get matched in your target areas.",
  },
];
const CONTACT = {
  eyebrow: "Contact",
  title: "Let's find your next deal",
  body: "Questions about a property, financing, or getting started? Our investment specialists are ready to help.",
  email: "Info@nexkeycollective.com",
  phone: "(917) 775-0286",
  phoneLabel: "Call Nexus AI",
  hours: "Mon\u2013Fri \xB7 8am\u20137pm CT",
};
export {
  ABOUT,
  AFFILIATES,
  AUDIENCES,
  BRAND,
  CONTACT,
  FAQS,
  FEATURES,
  HERO,
  HERO_IMAGE,
  HOME_SECTIONS,
  PARTNER_BENEFITS,
  PARTNER_STATS,
  PROPERTIES,
  SECONDARY_IMAGE,
  STATS,
  STEPS,
};
