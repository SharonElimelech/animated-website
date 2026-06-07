import MainLayout from "@/components/layout/MainLayout";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import VideoFeature from "@/components/sections/VideoFeature";
import Process from "@/components/sections/Process";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <VideoFeature />
      <Process />
      <Faq />
      <Contact />
    </MainLayout>
  );
}
