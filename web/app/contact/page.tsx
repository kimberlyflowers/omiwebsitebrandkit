import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata = { title: "Contact — OMI" };

export default function Contact() {
  return (
    <>
      <Nav />
      <main>
        {/* Hero (dark) */}
        <section className="relative bg-celestial grain pt-36 pb-16 md:pt-44 md:pb-24">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-indigo-deep" />
          <div className="relative mx-auto max-w-container px-6 md:px-10">
            <div className="eyebrow flex items-center gap-3 mb-5 text-gold-heritage">
              <span className="w-8 h-px bg-gold-heritage" />
              Get in touch
            </div>
            <h1 className="font-display font-black text-white text-5xl md:text-7xl leading-[1.05] tracking-tight max-w-3xl">
              Let&apos;s talk.
            </h1>
            <p className="mt-6 text-lg md:text-xl text-mist/85 leading-relaxed max-w-2xl">
              Questions, partnerships, speaking, ministry inquiries — we&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* Form + sidebar (light) */}
        <section className="relative bg-offwhite text-indigo-deep py-16 md:py-24">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-heritage/60 to-transparent" />
          <div className="mx-auto max-w-container px-6 md:px-10 grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14">
            <ContactForm />

            <aside className="space-y-6">
              <div className="rounded-lg bg-white border border-mist shadow-omi-sm p-6">
                <div className="eyebrow text-gold-heritage mb-3">Direct</div>
                <div className="space-y-3 text-sm text-graphite">
                  <div>
                    <div className="font-display font-semibold text-indigo-deep text-xs uppercase tracking-wider mb-0.5">
                      Email
                    </div>
                    <a href="mailto:hello@outpouringmissions.org" className="hover:text-gold-heritage transition-colors">
                      hello@outpouringmissions.org
                    </a>
                  </div>
                  <div>
                    <div className="font-display font-semibold text-indigo-deep text-xs uppercase tracking-wider mb-0.5">
                      Based in
                    </div>
                    San Antonio, Texas
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-indigo-deep text-white p-6">
                <div className="eyebrow text-gold-heritage mb-3">For specific needs</div>
                <ul className="space-y-3 text-sm text-mist/85">
                  <li><span className="font-display font-semibold text-white">Partnership inquiries</span> — Topic: Partnership</li>
                  <li><span className="font-display font-semibold text-white">Press & media</span> — Topic: Press</li>
                  <li><span className="font-display font-semibold text-white">Speaking requests</span> — Topic: General, with details</li>
                </ul>
              </div>

              <div className="text-xs text-graphite/60 leading-relaxed px-2">
                Response time: within two business days. For conference-specific
                questions, check the <a href="/conference" className="text-gold-heritage hover:underline">conference page</a> first.
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
