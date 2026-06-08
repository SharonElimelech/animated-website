import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrubBackground from "./ScrubBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WhatsappButton from "@/components/ui/WhatsappButton";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { LanguageProvider } from "@/lib/i18n";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative flex min-h-screen flex-col">
        {/* Persistent fixed video behind everything */}
        <ScrubBackground />

        <LanguageProvider>
          <ScrollProgress />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
          <WhatsappButton />
        </LanguageProvider>

        {/* Cinematic grain over the whole site */}
        <GrainOverlay />
      </div>
    </MotionConfig>
  );
}
