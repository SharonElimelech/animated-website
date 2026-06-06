import { Scale } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-obsidian px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="h-px w-full rule-gold opacity-40" />

        <div className="mt-12 flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <Scale className="h-5 w-5 text-gold" strokeWidth={1.4} />
            <span className="font-serif text-lg text-ink">הדר אלימלך</span>
          </div>

          <p className="max-w-sm text-sm font-light leading-relaxed text-muted">
            משרד עורכי דין המתמחה בחדלות פירעון, שיקום כלכלי והסדרי חוב —
            ליווי דיסקרטי ומקצועי לאורך כל הדרך.
          </p>

          <div className="text-sm font-light text-muted">
            <a
              href="tel:+972000000000"
              className="block transition-colors hover:text-gold"
            >
              03-000-0000
            </a>
            <a
              href="mailto:office@hadar-elimelech.co.il"
              className="block transition-colors hover:text-gold"
            >
              office@hadar-elimelech.co.il
            </a>
          </div>
        </div>

        <p className="mt-12 text-xs font-light tracking-wide text-muted/60">
          © {new Date().getFullYear()} הדר אלימלך. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
