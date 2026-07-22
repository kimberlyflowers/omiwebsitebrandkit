import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getEventBySlug } from "@/lib/eventSource";
import { stripe } from "@/lib/stripe";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const ev = await getEventBySlug(params.slug);
  return { title: ev ? `You're registered — ${ev.title}` : "Registration complete" };
}

export default async function Success({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { session_id?: string };
}) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();

  const sessionId = searchParams.session_id;
  let paymentConfirmed = false;

  if (stripe && sessionId?.startsWith("cs_")) {
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      paymentConfirmed =
        session.status === "complete" &&
        (session.payment_status === "paid" || session.payment_status === "no_payment_required") &&
        session.metadata?.eventSlug === event.slug;
    } catch {
      paymentConfirmed = false;
    }
  }

  return (
    <>
      <Nav />
      <main className="bg-offwhite text-indigo-deep min-h-[80vh]">
        <section className="relative bg-celestial grain pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(242,197,74,0.18),transparent_60%)]" />
          <div className="relative mx-auto max-w-2xl px-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold-heritage/15 border border-gold-heritage/40 mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F2C54A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="eyebrow flex items-center justify-center gap-3 mb-5 text-gold-heritage">
              <span className="w-8 h-px bg-gold-heritage" />
              {paymentConfirmed ? "You're in" : "Payment status"}
              <span className="w-8 h-px bg-gold-heritage" />
            </div>
            <h1 className="font-display font-black text-white text-4xl md:text-5xl leading-[1.1] tracking-tight">
              {paymentConfirmed ? "Registration confirmed." : "Payment not confirmed."}
            </h1>
            <p className="mt-6 text-lg text-mist/85 leading-relaxed">
              {paymentConfirmed ? (
                <>
                  Thanks for registering for <span className="text-white font-semibold">{event.title}</span>.
                  Your Stripe payment is confirmed.
                </>
              ) : (
                <>
                  We could not verify a completed Stripe payment for <span className="text-white font-semibold">{event.title}</span>.
                  Please return to the event and try again.
                </>
              )}
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-2xl px-6">
            <div className="rounded-lg bg-white border border-mist shadow-omi-sm p-6 md:p-8">
              <div className="eyebrow text-gold-heritage mb-3">
                {paymentConfirmed ? "What happens next" : "Next step"}
              </div>
              {paymentConfirmed ? (
                <ul className="space-y-4 text-sm md:text-base text-graphite">
                <li className="flex gap-3">
                  <span className="font-display font-black text-gold-heritage shrink-0">01</span>
                  <span>Check your inbox for your Stripe receipt.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-black text-gold-heritage shrink-0">02</span>
                  <span>Add the event to your calendar. {event.startDate}{event.endDate && event.endDate !== event.startDate ? ` — ${event.endDate}` : ""}.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-display font-black text-gold-heritage shrink-0">03</span>
                  <span>Watch for a logistics email two weeks before the event with venue, parking, and schedule details.</span>
                </li>
                </ul>
              ) : (
                <p className="text-sm md:text-base text-graphite">
                  No registration has been confirmed on this page. Return to the event to complete secure checkout.
                </p>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={`/events/${event.slug}`} className="btn btn-primary">
                  Back to event
                </Link>
                <Link
                  href="/"
                  className="btn inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-indigo-deep/20 text-indigo-deep hover:bg-indigo-deep hover:text-white transition-all font-display font-semibold text-sm"
                >
                  Back home
                </Link>
              </div>
              {paymentConfirmed && sessionId && (
                <p className="mt-6 text-[11px] text-graphite/50 font-mono break-all">
                  Session: {sessionId}
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
