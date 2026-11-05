import MainLayout from "@/components/layout/MainLayout";
import MasterHero from "@/components/sections/MasterHero";
import About from "@/components/sections/About";
import DebtCalculator from "@/components/sections/DebtCalculator";
import VideoFeature from "@/components/sections/VideoFeature";
import Process from "@/components/sections/Process";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import { FAQ } from "@/lib/faq";

/* FAQ answers only mount when a question is opened, so crawlers and AI
   assistants never see them in the HTML. This JSON-LD gives them every answer. */
const FAQ_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.qHe,
    acceptedAnswer: { "@type": "Answer", text: f.aHe },
  })),
};

export default function Home() {
  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_LD).replace(/</g, "\\u003c"),
        }}
      />
      <MasterHero />
      <About />
      <DebtCalculator />
      <VideoFeature />
      <Process />
      <Faq />
      <Contact />
    </MainLayout>
  );
}
