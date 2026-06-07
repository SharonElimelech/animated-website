import MainLayout from "@/components/layout/MainLayout";
import MasterHero from "@/components/sections/MasterHero";
import About from "@/components/sections/About";
import DebtCalculator from "@/components/sections/DebtCalculator";
import VideoFeature from "@/components/sections/VideoFeature";
import Process from "@/components/sections/Process";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <MainLayout>
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
