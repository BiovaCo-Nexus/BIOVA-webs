import { Shield, FileText, CheckCircle, HeartHandshake } from "lucide-react";
import { Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";

interface PromiseSectionProps {
  currentLang: Language;
}

export function PromiseSection({ currentLang }: PromiseSectionProps) {
  const t = translations[currentLang];

  const pillars = [
    {
      icon: Shield,
      title: t.promise.pillars.p1Title,
      desc: t.promise.pillars.p1Desc,
    },
    {
      icon: CheckCircle,
      title: t.promise.pillars.p2Title,
      desc: t.promise.pillars.p2Desc,
    },
    {
      icon: FileText,
      title: t.promise.pillars.p3Title,
      desc: t.promise.pillars.p3Desc,
    },
    {
      icon: HeartHandshake,
      title: t.promise.pillars.p4Title,
      desc: t.promise.pillars.p4Desc,
    },
  ];

  return (
    <section id="promise" className="border-t border-border bg-background">
      <div className="container-x py-20 md:py-32">
        {/* Header */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-amber-800 dark:text-amber-400">
              {t.promise.badge}
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] text-foreground font-normal">
            {t.promise.heading}
          </h2>
        </div>

        {/* Central Emotional Copy Container */}
        <div className="mt-12 rounded-3xl border border-border bg-[color:var(--surface)] p-8 sm:p-12 max-w-3xl">
          <div className="space-y-3.5 text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
            <p className="text-foreground">{t.promise.copyP1}</p>
            <p className="font-medium text-foreground">{t.promise.copyP2}</p>
            <p className="text-amber-800 dark:text-amber-300 font-medium">{t.promise.copyP3}</p>
            <p className="text-sm sm:text-base text-muted-foreground pt-1">{t.promise.copyP4}</p>
            <p className="font-display text-lg sm:text-xl font-normal text-foreground pt-3 italic">
              "{t.promise.copyP5}"
            </p>
          </div>
        </div>

        {/* BiovaCo Signature gap-px 4 Pillars Grid */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between bg-background p-8 transition-colors hover:bg-[color:var(--section)]"
              >
                <div>
                  <Icon className="h-6 w-6 text-amber-700 dark:text-amber-400" strokeWidth={1.5} />

                  <h3 className="mt-8 font-display text-xl text-foreground font-normal">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                </div>

                <div className="mt-8">
                  <div className="h-px w-8 bg-amber-600 transition-all group-hover:w-16" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
