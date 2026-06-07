import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrubBackground from "./ScrubBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WhatsappButton from "@/components/ui/WhatsappButton";
import GrainOverlay from "@/components/ui/GrainOverlay";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Persistent fixed video behind everything */}
      <ScrubBackground />

      <ScrollProgress />
      <Navbar />
      <main className="relative z-10 flex-1">{children}</main>
      <Footer />
      <WhatsappButton />

      {/* Cinematic grain over the whole site */}
      <GrainOverlay />
    </div>
  );
}
