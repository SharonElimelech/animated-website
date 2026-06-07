import type { Metadata } from "next";
import { Frank_Ruhl_Libre, Assistant, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

/* Elegant Hebrew serif — all major headings & logo */
const frank = Frank_Ruhl_Libre({
  variable: "--font-frank",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  display: "swap",
});

/* Clean Hebrew sans — body text & navigation */
const assistant = Assistant({
  variable: "--font-assistant",
  subsets: ["hebrew", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

/* Latin serif accent — for any English flourishes */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "הדר אלימלך | עורכת דין חדלות פירעון",
  description:
    "הדר אלימלך — מנהיגות משפטית בחדלות פירעון. הופכים משבר להזדמנות לפתיחה חדשה.",
  metadataBase: new URL("https://hadar-elimelech.co.il"),
  openGraph: {
    title: "הדר אלימלך | מנהיגות משפטית בחדלות פירעון",
    description: "הופכים משבר להזדמנות לפתיחה חדשה.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${frank.variable} ${assistant.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-obsidian text-ink">{children}</body>
    </html>
  );
}
