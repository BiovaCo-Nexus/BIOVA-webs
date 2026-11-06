import { ShoppingBag, Shirt, Gift, Flame, Sparkles, Shield } from "lucide-react";
import { Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";

interface PurposeSectionProps {
  currentLang: Language;
}

export function PurposeSection({ currentLang }: PurposeSectionProps) {
  const t = translations[currentLang];

  const pillars = [
    {
      icon: ShoppingBag,
      title: t.purpose.items.groceriesTitle,
      desc: t.purpose.items.groceriesDesc,
      highlight: "Atta, Rice, Dal, Oil & Spices",
    },
    {
      icon: Shirt,
      title: t.purpose.items.clothesTitle,
      desc: t.purpose.items.clothesDesc,
      highlight: "Tailored New Festive Attire",
    },
    {
      icon: Gift,
      title: t.purpose.items.sweetsTitle,
      desc: t.purpose.items.sweetsDesc,
      highlight: "Ghee Ladoos, Mithai & Farsan",
    },
    {
      icon: Flame,
      title: t.purpose.items.diyasTitle,
      desc: t.purpose.items.diyasDesc,
      highlight: "Handcrafted Traditional Mitti Diyas",
    },
    {
      icon: Sparkles,
      title: t.purpose.items.childrenTitle,
      desc: t.purpose.items.childrenDesc,
      highlight: "Drawing Kits, Books & Toys",
    },
  ];

  return (
    <section id="purpose" className="border-t border-border bg-background">
      <div className="container-x py-20 md:py-32">
        {/* BiovaCo 2-column header pattern */}
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1.9fr] lg:gap-16 items-start">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-amber-800 dark:text-amber-400">
                {t.purpose.badge}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] text-foreground font-normal leading-tight">
              {t.purpose.heading}
            </h2>

            <p className="mt-5 text-sm sm:text-base leading-relaxed text-muted-foreground">
              {t.purpose.subheading}
            </p>

            {/* Dignity Callout Box */}
            <div className="mt-8 rounded-2xl border border-border bg-[color:var(--surface)] p-6">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" strokeWidth={1.6} />
                <div>
                  <h3 className="font-display text-base font-medium text-foreground">
                    {t.purpose.dignityTitle}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {t.purpose.dignityBody}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BiovaCo Signature gap-px Card Grid */}
          <div>
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.18em] font-medium text-muted-foreground">
                {t.purpose.kitBreakdownTitle}
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {pillars.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="group relative flex flex-col justify-between bg-background p-6 sm:p-7 transition-colors hover:bg-[color:var(--section)]"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <Icon
                          className="h-6 w-6 text-amber-700 dark:text-amber-400"
                          strokeWidth={1.5}
                        />
                        <span className="font-mono text-xs text-muted-foreground">0{idx + 1}</span>
                      </div>

                      <h4 className="mt-8 font-display text-lg text-foreground font-medium">
                        {item.title}
                      </h4>

                      <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6">
                      <div className="h-px w-6 bg-amber-600 transition-all group-hover:w-12" />
                      <span className="block mt-3 text-[11px] font-medium text-amber-800 dark:text-amber-300">
                        {item.highlight}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Complete Kit Summary Card */}
              <div className="group relative flex flex-col justify-between bg-[color:var(--surface)] p-6 sm:p-7 transition-colors hover:bg-[color:var(--section)]">
                <div>
                  <div className="flex items-center justify-between">
                    <Sparkles className="h-6 w-6 text-amber-600" strokeWidth={1.5} />
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                      All-Inclusive
                    </span>
                  </div>

                  <h4 className="mt-8 font-display text-lg text-foreground font-medium">
                    Complete Family Kit
                  </h4>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    One complete celebration box per household — 30 days ration, fresh attire,
                    sweets, handmade diyas and children gifts delivered quietly to doorsteps.
                  </p>
                </div>

                <div className="mt-6">
                  <div className="h-px w-6 bg-amber-600 transition-all group-hover:w-12" />
                  <span className="block mt-3 text-[11px] font-medium text-muted-foreground">
                    100% direct door-to-door delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
