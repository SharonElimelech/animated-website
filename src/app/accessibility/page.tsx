import type { Metadata } from "next";
import MainLayout from "@/components/layout/MainLayout";
import LegalPage, { type LegalSection } from "@/components/legal/LegalPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "הצהרת נגישות | הדר אלימלך משרד עורכי דין",
  description:
    "הצהרת הנגישות של אתר משרד עורכי הדין הדר אלימלך — המחויבות שלנו לנגישות, רמת ההתאמה לתקן ופרטי רכז הנגישות.",
  alternates: { canonical: "/accessibility" },
};

const SECTIONS: LegalSection[] = [
  {
    heading: { he: "המחויבות שלנו", en: "Our commitment" },
    body: [
      {
        he: "משרד עורכי דין הדר אלימלך רואה חשיבות רבה במתן שירות שוויוני ונגיש לכלל הלקוחות, לרבות אנשים עם מוגבלות. אנו פועלים להנגשת האתר ולשיפורו המתמיד כדי לאפשר חוויית גלישה נוחה לכל אדם.",
        en: "Hadar Elimelech Law Office places great importance on providing equal, accessible service to all clients, including people with disabilities. We work to make the site accessible and to continuously improve it so every person can browse comfortably.",
      },
    ],
  },
  {
    heading: { he: "רמת הנגישות באתר", en: "Level of accessibility" },
    body: [
      {
        he: "האתר נבנה בהשתדלות לעמוד בהוראות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג-2013, ובהתאם להנחיות התקן הישראלי ת״י 5568 המבוסס על הנחיות WCAG 2.1 ברמת AA.",
        en: "The site was built striving to meet the Israeli Equal Rights for Persons with Disabilities Regulations (Service Accessibility Adjustments), 2013, and the Israeli Standard IS 5568, based on the WCAG 2.1 guidelines at level AA.",
      },
    ],
  },
  {
    heading: { he: "מה הונגש באתר", en: "What has been made accessible" },
    body: [
      {
        he: "האתר תומך בניווט באמצעות מקלדת, בנוי במבנה סמנטי תקין, כולל טקסט חלופי לתמונות וניגודיות צבעים נאותה בין הטקסט לרקע.",
        en: "The site supports keyboard navigation, is built with valid semantic structure, includes alternative text for images and adequate color contrast between text and background.",
      },
      {
        he: "האתר מכבד את העדפת המשתמש להפחתת אנימציות (prefers-reduced-motion), מותאם לצפייה במגוון גדלי מסך ומכשירים ומאפשר הגדלת התצוגה. כמו כן ניתן לעבור בין עברית לאנגלית ובין כיווניות RTL ל־LTR.",
        en: "The site respects the user's reduced-motion preference (prefers-reduced-motion), adapts to a range of screen sizes and devices and allows zooming. You can also switch between Hebrew and English and between RTL and LTR direction.",
      },
    ],
  },
  {
    heading: { he: "מגבלות ידועות", en: "Known limitations" },
    body: [
      {
        he: "האתר כולל תוכן חזותי ואנימציות עשירות. ייתכן שחלקים מסוימים טרם הונגשו במלואם. אנו ממשיכים לפעול לשיפור הנגישות באופן שוטף, ונשמח לקבל כל פנייה שתסייע לנו להשתפר.",
        en: "The site includes rich visual content and animations. Certain parts may not yet be fully accessible. We continue to work on improving accessibility on an ongoing basis and welcome any feedback that helps us improve.",
      },
    ],
  },
  {
    heading: { he: "רכז הנגישות", en: "Accessibility coordinator" },
    body: [
      {
        he: `אם נתקלת בבעיית נגישות באתר, נשמח שתעדכן/י אותנו. רכזת הנגישות של המשרד: הדר אלימלך. טלפון: ${SITE.phone}. ניתן לפנות גם בהודעת וואטסאפ. נעשה כמיטב יכולתנו לתת מענה בהקדם.`,
        en: `If you encounter an accessibility issue on the site, please let us know. The firm's accessibility coordinator: Hadar Elimelech. Phone: ${SITE.phone}. You may also reach out via WhatsApp. We will do our best to respond promptly.`,
      },
    ],
  },
];

export default function AccessibilityPage() {
  return (
    <MainLayout>
      <LegalPage
        kicker={{ he: "נגישות", en: "Accessibility" }}
        title={{ he: "הצהרת נגישות", en: "Accessibility Statement" }}
        updated={{ he: "עודכן לאחרונה: אוגוסט 2026", en: "Last updated: August 2026" }}
        intro={{
          he: "אנו מאמינים שהאינטרנט צריך להיות זמין ונגיש לכל אדם. להלן הצהרת הנגישות של אתר משרד עורכי דין הדר אלימלך.",
          en: "We believe the internet should be available and accessible to every person. Below is the accessibility statement for the Hadar Elimelech Law Office website.",
        }}
        sections={SECTIONS}
      />
    </MainLayout>
  );
}
