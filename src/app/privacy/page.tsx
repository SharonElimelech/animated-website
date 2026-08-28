import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "מדיניות פרטיות | הדר אלימלך משרד עורכי דין",
  description:
    "מדיניות הפרטיות של אתר משרד עורכי הדין הדר אלימלך — איזה מידע נאסף, כיצד נעשה בו שימוש וזכויותיך על פי חוק הגנת הפרטיות.",
  alternates: { canonical: "/privacy" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: { he: "המידע שאנו אוספים", en: "Information we collect" },
    body: [
      {
        he: "כאשר את/ה פונה אלינו דרך מחשבון החובות או טופס יצירת הקשר באתר, אנו אוספים את הפרטים שמסרת מרצונך: שם מלא, מספר טלפון, כתובת דוא״ל, סכום החוב המשוער, סוגי הגופים הנושים והאם קיימים עיקולים או הגבלות.",
        en: "When you contact us through the debt calculator or the site's contact form, we collect the details you voluntarily provide: full name, phone number, email address, estimated debt amount, types of creditors, and whether foreclosures or restrictions exist.",
      },
      {
        he: "מעבר לכך, האתר אינו אוסף מידע אישי. העדפת השפה שלך נשמרת מקומית בדפדפן בלבד (localStorage) ואינה מועברת אלינו.",
        en: "Beyond that, the site does not collect personal information. Your language preference is stored locally in your browser only (localStorage) and is not sent to us.",
      },
    ],
  },
  {
    heading: { he: "כיצד אנו משתמשים במידע", en: "How we use the information" },
    body: [
      {
        he: "המידע שמסרת משמש אך ורק כדי ליצור עמך קשר בנוגע לפנייתך, להעריך את מצבך ולהציע ליווי משפטי מתאים. איננו מוכרים, משכירים או מעבירים את המידע לצדדים שלישיים לצורכי שיווק.",
        en: "The information you provide is used solely to contact you regarding your inquiry, assess your situation and offer suitable legal guidance. We do not sell, rent or transfer your information to third parties for marketing purposes.",
      },
    ],
  },
  {
    heading: { he: "ספקי שירות", en: "Service providers" },
    body: [
      {
        he: "לצורך תפעול האתר ומשלוח פניות אנו נעזרים בספקי תשתית מהימנים (אירוח האתר ומשלוח דוא״ל). ספקים אלה מעבדים את המידע עבורנו בלבד ובכפוף למדיניות הפרטיות שלהם.",
        en: "To operate the site and deliver inquiries we rely on trusted infrastructure providers (site hosting and email delivery). These providers process the information only on our behalf and subject to their own privacy policies.",
      },
    ],
  },
  {
    heading: { he: "שמירת המידע ואבטחתו", en: "Data retention and security" },
    body: [
      {
        he: "אנו שומרים את המידע למשך הזמן הדרוש לטיפול בפנייתך ולעמידה בחובותינו המקצועיות והחוקיות, ונוקטים אמצעים סבירים לשמירתו מפני גישה או שימוש בלתי מורשים.",
        en: "We retain the information for as long as needed to handle your inquiry and to meet our professional and legal obligations, and we take reasonable measures to protect it against unauthorized access or use.",
      },
    ],
  },
  {
    heading: { he: "זכויותיך", en: "Your rights" },
    body: [
      {
        he: "בהתאם לחוק הגנת הפרטיות, התשמ״א-1981, את/ה זכאי/ת לעיין במידע שנאסף אודותיך, לבקש לתקנו או למחקו. לכל בקשה או שאלה בנושא פרטיות ניתן לפנות אלינו בטלפון או בוואטסאפ.",
        en: "Under the Israeli Protection of Privacy Law, 1981, you are entitled to review the information collected about you and to request its correction or deletion. For any privacy request or question you may contact us by phone or WhatsApp.",
      },
    ],
  },
  {
    heading: { he: "יצירת קשר", en: "Contact" },
    body: [
      {
        he: `משרד עורכי דין הדר אלימלך, ${SITE.address}. טלפון: ${SITE.phone}.`,
        en: `Hadar Elimelech Law Office, ${SITE.address}. Phone: ${SITE.phone}.`,
      },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <MainLayout>
      <LegalPage
        kicker={{ he: "מדיניות", en: "Policy" }}
        title={{ he: "מדיניות פרטיות", en: "Privacy Policy" }}
        updated={{ he: "עודכן לאחרונה: אוגוסט 2026", en: "Last updated: August 2026" }}
        intro={{
          he: "משרד עורכי דין הדר אלימלך מכבד את פרטיותך. מסמך זה מסביר איזה מידע נאסף באמצעות האתר, כיצד אנו עושים בו שימוש ומהן זכויותיך.",
          en: "Hadar Elimelech Law Office respects your privacy. This document explains what information is collected through the site, how we use it and what your rights are.",
        }}
        sections={SECTIONS}
      />
    </MainLayout>
  );
}
