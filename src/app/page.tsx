import MainLayout from "@/components/layout/MainLayout";
import HeroVideoScrub from "@/components/sections/HeroVideoScrub";
import Vision from "@/components/sections/Vision";
import PracticeAreas from "@/components/sections/PracticeAreas";

export default function Home() {
  return (
    <MainLayout>
      <HeroVideoScrub />
      <Vision />
      <PracticeAreas />
      {/* Next sections: EditorialPortrait, Contact */}
    </MainLayout>
  );
}
