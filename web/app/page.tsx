import Nav from "@/components/Nav";
import Script from "next/script";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import MinistriesGrid from "@/components/MinistriesGrid";
import EditorialQuote from "@/components/EditorialQuote";
import Upcoming from "@/components/Upcoming";
import ImpactStats from "@/components/ImpactStats";
import CtaBlock from "@/components/CtaBlock";
import Footer from "@/components/Footer";
import { fetchHomePage } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export const revalidate = 60;

type CmsCta = { label?: string; href?: string } | null | undefined;

function cta(c: CmsCta, fallback: { label: string; href: string }) {
  return {
    label: c?.label ?? fallback.label,
    href: c?.href ?? fallback.href,
  };
}

export default async function HomePage() {
  const cms = await fetchHomePage();

  const heroBannerUrl = cms?.heroBanner
    ? urlFor(cms.heroBanner)?.width(2400).height(1200).fit("crop").auto("format").url() ?? undefined
    : undefined;

  return (
    <>
      <Nav />
      <main>
        <Hero
          eyebrow={cms?.heroEyebrow}
          headline={cms?.heroHeadline}
          script={cms?.heroScript}
          lede={cms?.heroLede}
          primaryCta={cta(cms?.heroPrimaryCta, { label: "Join the Next Conference - Bloomie Edit", href: "/conference" })}
          secondaryCta={cta(cms?.heroSecondaryCta, { label: "Our Mission", href: "/about" })}
          bannerOverride={heroBannerUrl}
          videoOverride={cms?.heroVideoUrl}
        />
        <WhatWeDo />
        <MinistriesGrid />
        <EditorialQuote />
        <Upcoming />
        <ImpactStats />
        <CtaBlock />
      </main>
      <Footer />
      <Script
        src="https://widgets.leadconnectorhq.com/loader.js"
        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="69fa26a7e0f3a34ff630537b"
        data-source="WEB_USER"
        strategy="afterInteractive"
      />
    </>
  );
}