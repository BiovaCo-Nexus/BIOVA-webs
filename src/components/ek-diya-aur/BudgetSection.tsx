import { Package, Truck, ShieldAlert, Info } from "lucide-react";
import { Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";

interface BudgetSectionProps {
  currentLang: Language;
}

export function BudgetSection({ currentLang }: BudgetSectionProps) {
  const t = translations[currentLang];

  const budgetItems = [
    {
      icon: Package,
      title: t.budget.items.kitsTitle,
      desc: t.budget.items.kitsDesc,
      amount: "₹40,000",
      calc: "20 kits × ₹2,000",
      share: "88.9%",
    },
    {
      icon: Truck,
      title: t.budget.items.transportTitle,
      desc: t.budget.items.transportDesc,
      amount: "₹3,000",
      calc: "Local transport & fuel",
      share: "6.7%",
    },
    {
      icon: ShieldAlert,
      title: t.budget.items.contingencyTitle,
      desc: t.budget.items.contingencyDesc,
      amount: "₹2,000",
      calc: "Packaging & reserve",
      share: "4.4%",
    },
  ];

  return (
    <section id="budget" className="border-t border-border bg-background">
      <div className="container-x py-20 md:py-32">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-amber-800 dark:text-amber-400">
                {t.budget.badge}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] text-foreground font-normal">
              {t.budget.heading}
            </h2>
          </div>

          <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {t.budget.subheading}
          </p>
        </div>

        {/* BiovaCo Signature gap-px Card Grid */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {budgetItems.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col justify-between bg-background p-8 transition-colors hover:bg-[color:var(--section)]"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Icon
                      className="h-6 w-6 text-amber-700 dark:text-amber-400"
                      strokeWidth={1.5}
                    />
                    <span className="text-xs font-mono text-muted-foreground">{b.share}</span>
                  </div>

                  <h3 className="mt-8 font-display text-2xl text-foreground font-normal">
                    {b.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.desc}</p>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="font-display text-3xl text-foreground font-normal">
                    {b.amount}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{b.calc}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Summary Row */}
        <div className="mt-8 rounded-3xl border border-border bg-[color:var(--surface)] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium">
                {t.budget.totalLabel}
              </p>
              <h4 className="mt-1 font-display text-3xl sm:text-4xl text-foreground font-normal">
                ₹45,000{" "}
                <span className="text-sm font-normal text-muted-foreground">
                  for 20 Complete Households
                </span>
              </h4>
            </div>

            <div className="rounded-full bg-background px-5 py-2 text-xs font-medium text-muted-foreground border border-border">
              ₹2,250 covers all items, dry ration, clothing & distribution per family
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
          <Info className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
          <p>{t.budget.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
