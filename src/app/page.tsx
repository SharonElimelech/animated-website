import MainLayout from "@/components/layout/MainLayout";
import HeroVideoScrub from "@/components/sections/HeroVideoScrub";
import Vision from "@/components/sections/Vision";

export default function Home() {
  return (
    <MainLayout>
      <HeroVideoScrub />
      <Vision />
      {/* Next sections: PracticeAreas (stagger), EditorialPortrait, Contact */}
    </MainLayout>
  );
}
