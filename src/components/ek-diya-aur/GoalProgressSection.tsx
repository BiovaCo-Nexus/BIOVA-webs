import { CheckCircle2, Calendar } from "lucide-react";
import { CampaignStats, Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";
import { CampaignCountdown } from "./CampaignCountdown";

interface GoalProgressSectionProps {
  currentLang: Language;
  stats: CampaignStats;
}

export function GoalProgressSection({ currentLang, stats }: GoalProgressSectionProps) {
  const t = translations[currentLang];

  const percentRaised = Math.min(
    100,
    Math.round((stats.totalCollected / stats.targetAmount) * 100),
  );

  const remainingAmount = Math.max(0, stats.targetAmount - stats.totalCollected);

  const kpis = [
    {
      label: t.goal.raisedSoFar,
      value: `₹${stats.totalCollected.toLocaleString("en-IN")}`,
      sub:
        currentLang === "hi"
          ? `₹45,000 लक्ष्य का ${percentRaised}%`
          : currentLang === "mr"
            ? `₹45,000 उद्दिष्टाचे ${percentRaised}%`
            : `${percentRaised}% of ₹45,000 target`,
      highlight: true,
    },
    {
      label:
        currentLang === "hi"
          ? "अभियान लक्ष्य"
          : currentLang === "mr"
            ? "मोहीम उद्दिष्ट"
            : "Campaign Target",
      value: `₹${stats.targetAmount.toLocaleString("en-IN")}`,
      sub:
        currentLang === "hi"
          ? "20 चिन्हित परिवार"
          : currentLang === "mr"
            ? "20 निवडलेली कुटुंबे"
            : "20 Identified Families",
      highlight: false,
    },
    {
      label: t.goal.familiesFunded,
      value: `${stats.familiesSupported} / ${stats.targetFamilies}`,
      sub:
        currentLang === "hi"
          ? `${Math.max(0, stats.targetFamilies - stats.familiesSupported)} परिवार शेष`
          : currentLang === "mr"
            ? `${Math.max(0, stats.targetFamilies - stats.familiesSupported)} कुटुंबे शिल्लक`
            : `${Math.max(0, stats.targetFamilies - stats.familiesSupported)} families remaining`,
      highlight: false,
    },
    {
      label: t.goal.supportersCount,
      value: `${stats.totalSupporters}`,
      sub:
        currentLang === "hi"
          ? "सत्यापित दानदाता"
          : currentLang === "mr"
            ? "सत्यापित देणगीदार"
            : "Verified supporters",
      highlight: false,
    },
  ];

  return (
    <section id="goal" className="border-t border-border bg-[color:var(--surface)]">
      <div className="container-x py-20 md:py-32">
        {/* Top Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-amber-800 dark:text-amber-400">
                {t.goal.badge}
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl tracking-[-0.03em] text-foreground font-normal">
              {t.goal.heading}
            </h2>
          </div>

          <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-muted-foreground">
            {t.goal.subheading}
          </p>
        </div>

        {/* BiovaCo Signature gap-px KPI Grid */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between bg-background p-6 sm:p-8 transition-colors hover:bg-[color:var(--section)] ${
                kpi.highlight ? "bg-amber-500/5 dark:bg-amber-950/10" : ""
              }`}
            >
              <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground leading-tight">
                {kpi.label}
              </div>

              <div className="mt-6 font-display text-3xl sm:text-4xl lg:text-5xl text-foreground font-normal">
                {kpi.value}
              </div>

              <div className="mt-3 text-xs text-muted-foreground">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Live Progress Bar Card */}
        <div className="mt-8 rounded-3xl border border-border bg-background p-6 sm:p-8">
          <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-3">
            <span className="text-foreground">
              {currentLang === "hi"
                ? `सत्यापित प्रगति: ${percentRaised}%`
                : currentLang === "mr"
                  ? `सत्यापित प्रगती: ${percentRaised}%`
                  : `Verified Progress: ${percentRaised}%`}
            </span>
            <span>
              {remainingAmount > 0
                ? currentLang === "hi"
                  ? `लक्ष्य हेतु ₹${remainingAmount.toLocaleString("en-IN")} शेष`
                  : currentLang === "mr"
                    ? `उद्दिष्टासाठी ₹${remainingAmount.toLocaleString("en-IN")} शिल्लक`
                    : `₹${remainingAmount.toLocaleString("en-IN")} to goal`
                : currentLang === "hi"
                  ? "लक्ष्य पूर्ण!"
                  : currentLang === "mr"
                    ? "उद्दिष्ट पूर्ण!"
                    : "Target Achieved!"}
            </span>
          </div>

          <div className="h-2.5 w-full rounded-full bg-[color:var(--section)] overflow-hidden border border-border/50">
            <div
              className="h-full rounded-full bg-[color:var(--navy)] dark:bg-[color:var(--green)] transition-all duration-1000 ease-out"
              style={{ width: `${Math.max(percentRaised, 1.5)}%` }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
            <span>₹0 Initial</span>
            <span>₹22,500 Halfway</span>
            <span className="font-medium text-foreground">₹45,000 Complete Target</span>
          </div>

          {/* Real-time status line */}
          <div className="mt-6 pt-5 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[color:var(--green-deep)] dark:text-[color:var(--green)] shrink-0" />
              <span>{t.goal.verifiedNote}</span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs text-foreground font-medium">
                <Calendar className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                <span>{t.goal.daysNotice}</span>
              </div>
              <CampaignCountdown currentLang={currentLang} variant="compact" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
