import MainLayout from "@/components/layout/MainLayout";
import MasterHero from "@/components/sections/MasterHero";
import Hero from "@/components/sections/Hero";
import DebtCalculator from "@/components/sections/DebtCalculator";
import About from "@/components/sections/About";
import VideoFeature from "@/components/sections/VideoFeature";
import Process from "@/components/sections/Process";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <MainLayout>
      <MasterHero />
      <Hero />
      <DebtCalculator />
      <About />
      <VideoFeature />
      <Process />
      <Faq />
      <Contact />
    </MainLayout>
  );
}
