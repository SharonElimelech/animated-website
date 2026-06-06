import { Reveal } from "@/components/ui/Reveal";

export default function Vision() {
  return (
    <section
      id="about"
      className="relative mx-auto max-w-5xl px-6 py-40 lg:py-56"
    >
      <Reveal className="mb-10 flex items-center gap-4" amount={0.6}>
        <span className="h-px w-12 bg-gold" />
        <span className="text-xs font-light tracking-[0.4em] text-gold/85">
          החזון
        </span>
      </Reveal>

      <Reveal amount={0.4}>
        <h2 className="text-balance text-4xl font-light leading-[1.25] text-ink sm:text-6xl lg:text-7xl">
          הופכים{" "}
          <span className="text-gradient-gold">משבר</span> להזדמנות
          <br className="hidden sm:block" /> של פתיחה חדשה.
        </h2>
      </Reveal>

      <Reveal delay={0.15} amount={0.5}>
        <p className="balance mt-12 max-w-2xl text-lg font-light leading-relaxed text-muted">
          חדלות פירעון אינה סוף הדרך — היא נקודת מפנה. בעזרת אסטרטגיה משפטית
          מדויקת, ניסיון עשיר וראייה אנושית, אנו מובילים יחידים וחברות אל מעבר
          למשבר, בחזרה לאיתנות כלכלית ולשקט נפשי.
        </p>
      </Reveal>
    </section>
  );
}
