import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrubBackground from "./ScrubBackground";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WhatsappButton from "@/components/ui/WhatsappButton";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { LanguageProvider } from "@/lib/i18n";
import { visibleArticles } from "@/lib/articles";

export default function MainLayout({ children }: { children: ReactNode }) {
  // Server-side: the article text never ships to the browser, only this flag.
  const showArticles = visibleArticles().length > 0;
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Persistent fixed video behind everything */}
      <ScrubBackground />

      <LanguageProvider>
        <ScrollProgress />
        <Navbar showArticles={showArticles} />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer showArticles={showArticles} />
        <WhatsappButton />
      </LanguageProvider>

      {/* Cinematic grain over the whole site */}
      <GrainOverlay />
    </div>
  );
}
