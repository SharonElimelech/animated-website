import type { Metadata } from "next";
import {
  Frank_Ruhl_Libre,
  Assistant,
  Cormorant_Garamond,
  Heebo,
} from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";

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
const SITE_URL = SITE.url;

/* Structured data: tells Google + AI assistants who Hadar is, what she does, where. */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LegalService", "LocalBusiness"],
      "@id": `${SITE_URL}/#office`,
      name: "הדר אלימלך — משרד עורכי דין",
      alternateName: "Hadar Elimelech Law Office",
      url: SITE_URL,
      image: `${SITE_URL}/og.png`,
      logo: `${SITE_URL}/logo.png`,
      description: DESCRIPTION,
      telephone: `+${SITE.phoneIntl}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "האורגים 11",
        addressLocality: "אשדוד",
        addressCountry: "IL",
      },
      areaServed: { "@type": "Country", name: "Israel" },
      availableLanguage: ["he"],
      knowsAbout: [
        "חדלות פירעון",
        "צו הפטר",
        "מחיקת חובות",
        "ביטול עיקולים",
        "הוצאה לפועל",
        "הסדרי חובות מול בנקים",
        "שיקום כלכלי",
      ],
      founder: { "@id": `${SITE_URL}/#hadar` },
      sameAs: Object.values(SITE.social).filter((u) => u !== "#"),
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#hadar`,
      name: "הדר אלימלך",
      alternateName: "Hadar Elimelech",
      jobTitle: "עורכת דין",
      image: `${SITE_URL}/hadar-portrait.jpg`,
      worksFor: { "@id": `${SITE_URL}/#office` },
      knowsAbout: ["חדלות פירעון", "מחיקת חובות", "ביטול עיקולים", "הוצאה לפועל"],
    },
  ],
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
      className={`${frank.variable} ${assistant.variable} ${cormorant.variable} ${heebo.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-obsidian text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(JSON_LD).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
