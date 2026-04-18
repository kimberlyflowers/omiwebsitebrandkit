import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import MinistriesGrid from "@/components/MinistriesGrid";
import EditorialQuote from "@/components/EditorialQuote";
import Upcoming from "@/components/Upcoming";
import ImpactStats from "@/components/ImpactStats";
import CtaBlock from "@/components/CtaBlock";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <WhatWeDo />
        <MinistriesGrid />
        <EditorialQuote />
        <Upcoming />
        <ImpactStats />
        <CtaBlock />
      </main>
      <Footer />
    </>
  );
}
