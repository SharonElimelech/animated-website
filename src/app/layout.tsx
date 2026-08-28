import type { Metadata, Viewport } from "next";
import {
  Frank_Ruhl_Libre,
  Assistant,
  Cormorant_Garamond,
  Heebo,
} from "next/font/google";
import "./globals.css";

/* Heavy display sans — massive block-letter hero headline */
const heebo = Heebo({
  variable: "--font-heebo",
  subsets: ["hebrew", "latin"],
  weight: ["800", "900"],
  display: "swap",
});

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

const TITLE = "הדר אלימלך - משרד עורכי דין | חדלות פירעון ושיקום כלכלי";
const DESCRIPTION =
  "אסטרטגיה אישית וממוקדת תוצאות להחזרת השליטה הפיננסית שלך. מנהיגות משפטית בחדלות פירעון, הסדרי חובות מורכבים ופירוק חברות.";
const SITE_URL = "https://hadar-elimelech-law.co.il";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "הדר אלימלך — משרד עורכי דין",
  keywords: [
    "הדר אלימלך",
    "עורך דין חדלות פירעון",
    "שיקום כלכלי",
    "הסדרי חובות",
    "מחיקת חובות",
    "ביטול עיקולים",
    "פירוק והבראת חברות",
    "הוצאה לפועל",
    "הפטר",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "הדר אלימלך — משרד עורכי דין",
    locale: "he_IL",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "הדר אלימלך — משרד עורכי דין",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
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
      className={`${frank.variable} ${assistant.variable} ${cormorant.variable} ${heebo.variable} antialiased`}
    >
      <body className="min-h-screen bg-obsidian text-ink">{children}</body>
    </html>
  );
}
