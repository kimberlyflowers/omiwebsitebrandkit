/* ============================================================
   Event catalog — single source of truth for all events.
   Swap sample data for live data (CMS / DB) later.
   ============================================================ */

export type AgendaItem = { time: string; title: string; detail?: string };
export type Speaker = { name: string; role?: string; caption?: string };
export type FAQ = { q: string; a: string };

export type EventDetail = {
  slug: string;
  kind: "Conference" | "Teaching" | "Gathering";
  title: string;
  tagline?: string;
  startDate: string;        // human readable, e.g. "Saturday, May 9, 2026"
  endDate?: string;
  startTime: string;        // e.g. "9:00 AM"
  endTime?: string;
  timezone?: string;        // e.g. "CST"
  location: { name: string; address?: string; city?: string };
  priceTiers: { label: string; price: string; description?: string; soldOut?: boolean }[];
  about: string[];          // paragraphs
  agenda?: AgendaItem[];
  speakers?: Speaker[];
  faq?: FAQ[];
  coverCaption?: string;
  heroImage?: string;       // optional /public path
  registrationUrl?: string; // external (Eventbrite / Zeffy / etc.) or leave blank for in-app
};

export const events: EventDetail[] = [
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
      { label: "Early Bird", price: "$89", description: "Through March 15 · full weekend access" },
      { label: "Standard", price: "$129", description: "Full weekend access · all sessions" },
      { label: "Student / Under 25", price: "$45", description: "With valid ID at check-in" },
      { label: "Live Stream", price: "$29", description: "All plenary sessions streamed live" },
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
      { label: "In-person", price: "$55", description: "All sessions + meals" },
      { label: "Live Stream", price: "$25", description: "All sessions streamed live + recordings" },
    ],
    about: [
      "The Summer Teaching Intensive is a three-day deep-dive designed for those who want to move from listening to leading. Tight curriculum, rigorous discussion, practical application.",
      "Exact curriculum releases in May. Topics rotate each intensive to build toward a full teaching cycle over the year.",
    ],
    coverCaption: "Teaching intensive · classroom photograph",
  },
];

export function getEvent(slug: string): EventDetail | undefined {
  return events.find((e) => e.slug === slug);
}
