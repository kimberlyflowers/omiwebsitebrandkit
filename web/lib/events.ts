/* ============================================================
   Event catalog — single source of truth for all events.
   Price is authoritative in priceCents (integer, USD cents).
   The `price` field is a display string only.
   ============================================================ */

export type AgendaItem = { time: string; title: string; detail?: string };
export type Speaker = { name: string; role?: string; caption?: string };
export type FAQ = { q: string; a: string };

export type PriceTier = {
  label: string;
  price: string;       // display string e.g. "$89"
  priceCents: number;  // authoritative integer, USD cents — 8900 for $89
  description?: string;
  soldOut?: boolean;
};

export type EventDetail = {
  slug: string;
  kind: "Conference" | "Teaching" | "Gathering";
  title: string;
  tagline?: string;
  startDate: string;
  endDate?: string;
  startTime: string;
  endTime?: string;
  timezone?: string;
  location: { name: string; address?: string; city?: string };
  priceTiers: PriceTier[];
  about: string[];
  agenda?: AgendaItem[];
  speakers?: Speaker[];
  faq?: FAQ[];
  coverCaption?: string;
  heroImage?: string;
};

const eventCatalog: EventDetail[] = [
  {
    slug: "2026-annual-conference",
    kind: "Conference",
    title: "OMI Annual Conference 2026",
    tagline: "Transforming Lives. Igniting Futures.",
    startDate: "Friday, May 15, 2026",
    endDate: "Sunday, May 17, 2026",
    startTime: "6:30 PM",
    endTime: "1:00 PM",
    timezone: "CST",
    location: {
      name: "Venue TBA",
      address: "Location details coming soon",
      city: "San Antonio, TX",
    },
    priceTiers: [
      { label: "Early Bird", price: "$89", priceCents: 8900, description: "Through March 15 · full weekend access" },
      { label: "Standard", price: "$129", priceCents: 12900, description: "Full weekend access · all sessions" },
      { label: "Student / Under 25", price: "$45", priceCents: 4500, description: "With valid ID at check-in" },
      { label: "Live Stream", price: "$29", priceCents: 2900, description: "All plenary sessions streamed live" },
    ],
    about: [
      "The Outpouring Annual Conference is our flagship weekend — three days of worship, teaching, and commissioning held every year on the weekend after Mother's Day. This is where the whole movement gathers.",
      "Friday night opens with a plenary worship and teaching session. Saturday moves through keynotes, breakouts, and an afternoon intensive. Sunday morning closes with a commissioning service — leaving attendees equipped, sent, and connected to the broader OMI family.",
      "Whether you're a longtime partner or new to the Outpouring, this weekend is built to form you, challenge you, and send you.",
    ],
    agenda: [
      { time: "Fri · 6:30 PM", title: "Doors open · Hospitality lounge" },
      { time: "Fri · 7:30 PM", title: "Opening session · Worship & keynote" },
      { time: "Sat · 9:00 AM", title: "Morning plenary" },
      { time: "Sat · 10:30 AM", title: "Breakout session 1", detail: "Choose from 4 tracks" },
      { time: "Sat · 12:00 PM", title: "Lunch (included)" },
      { time: "Sat · 1:30 PM", title: "Breakout session 2", detail: "Choose from 4 tracks" },
      { time: "Sat · 4:00 PM", title: "Afternoon intensive" },
      { time: "Sat · 7:00 PM", title: "Evening gathering · Worship & prophetic ministry" },
      { time: "Sun · 10:00 AM", title: "Commissioning service" },
    ],
    speakers: [
      { name: "Speaker Placeholder 1", role: "OMI Leadership", caption: "Headshot 1" },
      { name: "Speaker Placeholder 2", role: "Guest Teacher", caption: "Headshot 2" },
      { name: "Speaker Placeholder 3", role: "Worship Leader", caption: "Headshot 3" },
      { name: "Speaker Placeholder 4", role: "Guest Teacher", caption: "Headshot 4" },
    ],
    faq: [
      { q: "Is lunch included?", a: "Saturday lunch is included with Early Bird and Standard tickets. Coffee and light refreshments are available throughout the weekend." },
      { q: "Is there childcare?", a: "Limited childcare is available by pre-registration. Details go out with your confirmation email." },
      { q: "What's the refund policy?", a: "Full refund up to 30 days before the event. 50% refund 15-29 days out. Within 14 days, tickets can be transferred but not refunded." },
      { q: "Is the event accessible?", a: "Yes. The venue is fully ADA-compliant. If you have specific accessibility needs, reach out and we'll accommodate." },
    ],
    coverCaption: "Conference hero photograph · past gathering",
    heroImage: "/conference-hero.jpg",
  },
  {
    slug: "summer-2026-teaching-intensive",
    kind: "Teaching",
    title: "Summer Teaching Intensive · 2026",
    tagline: "Deep teaching for serious practitioners.",
    startDate: "Thursday, July 9, 2026",
    endDate: "Saturday, July 11, 2026",
    startTime: "7:00 PM",
    endTime: "3:00 PM",
    timezone: "CST",
    location: {
      name: "Hybrid · In-person + Live Stream",
      address: "Location TBA",
      city: "San Antonio, TX",
    },
    priceTiers: [
      { label: "In-person", price: "$55", priceCents: 5500, description: "All sessions + meals" },
      { label: "Live Stream", price: "$25", priceCents: 2500, description: "All sessions streamed live + recordings" },
    ],
    about: [
      "The Summer Teaching Intensive is a three-day deep-dive designed for those who want to move from listening to leading. Tight curriculum, rigorous discussion, practical application.",
      "Exact curriculum releases in May. Topics rotate each intensive to build toward a full teaching cycle over the year.",
    ],
    agenda: [
      { time: "Thu · 6:30 PM", title: "Check-in · Opening dinner" },
      { time: "Thu · 7:30 PM", title: "Session 1 · Foundations", detail: "Framing the intensive" },
      { time: "Fri · 9:00 AM", title: "Session 2 · Scripture deep-dive" },
      { time: "Fri · 11:00 AM", title: "Discussion groups", detail: "Small-group application" },
      { time: "Fri · 1:00 PM", title: "Lunch + one-on-one mentoring windows" },
      { time: "Fri · 2:30 PM", title: "Session 3 · Cultural moment" },
      { time: "Fri · 7:00 PM", title: "Evening gathering · Worship & prayer" },
      { time: "Sat · 9:00 AM", title: "Session 4 · Formation" },
      { time: "Sat · 11:00 AM", title: "Session 5 · Sending", detail: "Practical next steps" },
      { time: "Sat · 1:00 PM", title: "Closing lunch · Commissioning" },
    ],
    speakers: [
      { name: "Speaker Placeholder 1", role: "Lead Teacher", caption: "Headshot 1" },
      { name: "Speaker Placeholder 2", role: "OMI Leadership", caption: "Headshot 2" },
      { name: "Speaker Placeholder 3", role: "Guest Teacher", caption: "Headshot 3" },
    ],
    faq: [
      { q: "Do I need to attend all three days?", a: "The curriculum builds cumulatively — we strongly recommend attending all sessions. Live Stream tickets include session recordings so you can catch up on anything you miss." },
      { q: "Are meals included?", a: "In-person tickets include Thursday dinner, Friday lunch, and Saturday closing lunch." },
      { q: "What's the refund policy?", a: "Full refund up to 14 days before the intensive. 50% refund 7-13 days out. Within 7 days, tickets can be transferred but not refunded." },
      { q: "How is the Live Stream delivered?", a: "Live via Zoom webinar. Recordings are posted within 24 hours and remain available for 6 months." },
    ],
    coverCaption: "Teaching intensive · classroom photograph",
  },

  /* ------------------------------------------------------------
     Additional seasonal teachings
     ------------------------------------------------------------ */

  {
    slug: "winter-2026-intensive",
    kind: "Teaching",
    title: "Winter Teaching Intensive · 2026",
    tagline: "Foundations of Christian formation in the public square.",
    startDate: "Friday, January 23, 2026",
    endDate: "Sunday, January 25, 2026",
    startTime: "6:30 PM",
    endTime: "1:00 PM",
    timezone: "CST",
    location: { name: "Hybrid · In-person + Live Stream", address: "Location TBA", city: "San Antonio, TX" },
    priceTiers: [
      { label: "In-person", price: "$55", priceCents: 5500, description: "All sessions + meals" },
      { label: "Live Stream", price: "$25", priceCents: 2500, description: "All sessions + recordings" },
    ],
    about: [
      "The year opens here. Winter Intensive sets the theological frame for the rest of the teaching cycle — foundations of Christian formation in a noisy public moment.",
      "Designed for leaders already doing the work who want deeper footing. Discussion-heavy. Application-focused.",
    ],
    agenda: [
      { time: "Fri · 6:30 PM", title: "Check-in · Opening dinner" },
      { time: "Fri · 7:30 PM", title: "Session 1 · The posture of formation" },
      { time: "Sat · 9:00 AM", title: "Session 2 · Scripture & the public square" },
      { time: "Sat · 11:00 AM", title: "Small-group discussion" },
      { time: "Sat · 1:00 PM", title: "Lunch + mentoring windows" },
      { time: "Sat · 2:30 PM", title: "Session 3 · Culture, credibility, conviction" },
      { time: "Sat · 7:00 PM", title: "Evening gathering · Worship & prayer" },
      { time: "Sun · 9:00 AM", title: "Session 4 · Sending & commissioning" },
    ],
    speakers: [
      { name: "Speaker Placeholder 1", role: "Lead Teacher", caption: "Headshot 1" },
      { name: "Speaker Placeholder 2", role: "OMI Leadership", caption: "Headshot 2" },
      { name: "Speaker Placeholder 3", role: "Guest Teacher", caption: "Headshot 3" },
    ],
    faq: [
      { q: "Do I need to attend all sessions?", a: "Curriculum builds cumulatively — we strongly recommend attending all. Live Stream tickets include recordings." },
      { q: "Are meals included?", a: "In-person tickets include Friday dinner, Saturday lunch, and Sunday breakfast." },
      { q: "What's the refund policy?", a: "Full refund up to 14 days before. 50% refund 7–13 days out. Inside 7 days, transferable but not refundable." },
    ],
    coverCaption: "Winter intensive · classroom photograph",
  },

  {
    slug: "spring-2026-intensive",
    kind: "Teaching",
    title: "Spring Teaching Intensive · 2026",
    tagline: "Scripture, culture, and the question of authority.",
    startDate: "Friday, March 20, 2026",
    endDate: "Sunday, March 22, 2026",
    startTime: "6:30 PM",
    endTime: "1:00 PM",
    timezone: "CST",
    location: { name: "Hybrid · In-person + Live Stream", address: "Location TBA", city: "San Antonio, TX" },
    priceTiers: [
      { label: "In-person", price: "$55", priceCents: 5500, description: "All sessions + meals" },
      { label: "Live Stream", price: "$25", priceCents: 2500, description: "All sessions + recordings" },
    ],
    about: [
      "Spring Intensive goes after the question under most modern discipleship questions: where does authority come from, and how do we live under it faithfully?",
      "Heavy on exegesis. Practical on implications. Built for people who teach others.",
    ],
    agenda: [
      { time: "Fri · 6:30 PM", title: "Check-in · Opening dinner" },
      { time: "Fri · 7:30 PM", title: "Session 1 · The authority question" },
      { time: "Sat · 9:00 AM", title: "Session 2 · Scripture as witness" },
      { time: "Sat · 11:00 AM", title: "Discussion groups" },
      { time: "Sat · 1:00 PM", title: "Lunch + mentoring" },
      { time: "Sat · 2:30 PM", title: "Session 3 · Authority in practice" },
      { time: "Sat · 7:00 PM", title: "Evening gathering" },
      { time: "Sun · 9:00 AM", title: "Session 4 · Sending" },
    ],
    speakers: [
      { name: "Speaker Placeholder 1", role: "Lead Teacher", caption: "Headshot 1" },
      { name: "Speaker Placeholder 2", role: "OMI Leadership", caption: "Headshot 2" },
    ],
    faq: [
      { q: "Is this for ministry leaders only?", a: "No — open to anyone serious about the material. Ministry leaders and lay leaders both get value." },
      { q: "Refund policy?", a: "Full refund up to 14 days before. 50% refund 7–13 days out. Inside 7 days, transferable but not refundable." },
    ],
    coverCaption: "Spring intensive · classroom photograph",
  },

  {
    slug: "pre-conference-primer-2026",
    kind: "Teaching",
    title: "Pre-Conference Primer · April 2026",
    tagline: "One-day primer · open to all conference registrants.",
    startDate: "Saturday, April 18, 2026",
    startTime: "9:00 AM",
    endTime: "4:00 PM",
    timezone: "CST",
    location: { name: "Venue TBA", city: "San Antonio, TX" },
    priceTiers: [
      { label: "Primer only", price: "$25", priceCents: 2500, description: "Includes lunch" },
      { label: "Free with Conference ticket", price: "$0", priceCents: 0, description: "Forward your conference confirmation at checkout" },
    ],
    about: [
      "A one-day primer held four weeks before the annual conference. Sets the context for the weekend ahead — historical, theological, practical.",
      "Not required for conference attendance but strongly recommended for first-timers.",
    ],
    agenda: [
      { time: "9:00 AM", title: "Welcome · Coffee" },
      { time: "9:30 AM", title: "Session 1 · The Outpouring story" },
      { time: "11:00 AM", title: "Session 2 · What to expect at the conference" },
      { time: "12:30 PM", title: "Lunch" },
      { time: "1:30 PM", title: "Session 3 · Reading list & preparation" },
      { time: "3:00 PM", title: "Q&A · Small groups" },
      { time: "4:00 PM", title: "Close" },
    ],
    speakers: [
      { name: "Speaker Placeholder 1", role: "OMI Leadership", caption: "Headshot 1" },
      { name: "Speaker Placeholder 2", role: "Conference Host", caption: "Headshot 2" },
    ],
    faq: [
      { q: "Do I have to attend to register for the conference?", a: "No. The primer is optional context. Conference registration is separate." },
      { q: "Is lunch included?", a: "Yes, for both ticket tiers." },
    ],
    coverCaption: "Primer session · classroom photograph",
  },

  {
    slug: "fall-2026-intensive",
    kind: "Teaching",
    title: "Fall Teaching Intensive · 2026",
    tagline: "Curriculum releasing in summer — watch this space.",
    startDate: "Friday, September 25, 2026",
    endDate: "Sunday, September 27, 2026",
    startTime: "6:30 PM",
    endTime: "1:00 PM",
    timezone: "CST",
    location: { name: "Hybrid · In-person + Live Stream", city: "San Antonio, TX" },
    priceTiers: [
      { label: "In-person", price: "$55", priceCents: 5500, description: "All sessions + meals" },
      { label: "Live Stream", price: "$25", priceCents: 2500, description: "All sessions + recordings" },
    ],
    about: [
      "Fall Intensive — full curriculum releasing in summer 2026. The pattern is consistent: three days, tight teaching, rigorous discussion, real application.",
      "Early registration opens when curriculum is announced. Placeholder copy below will be replaced with topic-specific content.",
    ],
    agenda: [
      { time: "Fri · 6:30 PM", title: "Check-in · Opening dinner" },
      { time: "Fri · 7:30 PM", title: "Session 1" },
      { time: "Sat · 9:00 AM", title: "Session 2" },
      { time: "Sat · 11:00 AM", title: "Small-group discussion" },
      { time: "Sat · 1:00 PM", title: "Lunch + mentoring" },
      { time: "Sat · 2:30 PM", title: "Session 3" },
      { time: "Sat · 7:00 PM", title: "Evening gathering" },
      { time: "Sun · 9:00 AM", title: "Session 4 · Sending" },
    ],
    speakers: [
      { name: "TBA", role: "Lead Teacher", caption: "Headshot — TBA" },
      { name: "TBA", role: "OMI Leadership", caption: "Headshot — TBA" },
    ],
    faq: [
      { q: "When does curriculum release?", a: "Summer 2026. Registration opens alongside announcement." },
      { q: "Refund policy?", a: "Full refund up to 14 days before. 50% refund 7–13 days out. Inside 7 days, transferable but not refundable." },
    ],
    coverCaption: "Fall intensive · classroom photograph",
  },

  {
    slug: "late-year-2026-intensive",
    kind: "Teaching",
    title: "Late-Year Teaching Intensive · November 2026",
    tagline: "Year-end gathering · reflection, re-commissioning, looking forward.",
    startDate: "Friday, November 13, 2026",
    endDate: "Sunday, November 15, 2026",
    startTime: "6:30 PM",
    endTime: "1:00 PM",
    timezone: "CST",
    location: { name: "Hybrid · In-person + Live Stream", city: "San Antonio, TX" },
    priceTiers: [
      { label: "In-person", price: "$55", priceCents: 5500, description: "All sessions + meals" },
      { label: "Live Stream", price: "$25", priceCents: 2500, description: "All sessions + recordings" },
    ],
    about: [
      "A year-end gathering for everyone who's walked the teaching cycle through the year. Less new material, more reflection, re-commissioning, and planning forward.",
      "Open to first-timers but designed with returning attendees in mind.",
    ],
    agenda: [
      { time: "Fri · 6:30 PM", title: "Opening dinner · Fellowship" },
      { time: "Fri · 7:30 PM", title: "Session 1 · A year in review" },
      { time: "Sat · 9:00 AM", title: "Session 2 · Formation through the seasons" },
      { time: "Sat · 11:00 AM", title: "Small-group reflection" },
      { time: "Sat · 1:00 PM", title: "Lunch + one-on-one conversations" },
      { time: "Sat · 2:30 PM", title: "Session 3 · Looking forward" },
      { time: "Sat · 7:00 PM", title: "Evening worship · Testimony" },
      { time: "Sun · 9:00 AM", title: "Session 4 · Re-commissioning service" },
    ],
    speakers: [
      { name: "Speaker Placeholder 1", role: "OMI Leadership", caption: "Headshot 1" },
      { name: "Speaker Placeholder 2", role: "Guest Teacher", caption: "Headshot 2" },
      { name: "Speaker Placeholder 3", role: "Worship Leader", caption: "Headshot 3" },
    ],
    faq: [
      { q: "Is this for returning attendees only?", a: "No — open to everyone, but designed with the full-year cohort in mind." },
      { q: "Refund policy?", a: "Full refund up to 14 days before. 50% refund 7–13 days out. Inside 7 days, transferable but not refundable." },
    ],
    coverCaption: "Year-end gathering · group photograph",
  },
];

// Only the Annual Conference is a confirmed public event. The remaining
// catalog entries are retained as internal drafting references, not listings.
export const events: EventDetail[] = eventCatalog.filter(
  (event) => event.slug === "2026-annual-conference",
);

export function getEvent(slug: string): EventDetail | undefined {
  return events.find((e) => e.slug === slug);
}
