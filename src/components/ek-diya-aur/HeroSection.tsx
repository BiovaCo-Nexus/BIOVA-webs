import { ArrowRight, ArrowUpRight, Heart, ShieldCheck } from "lucide-react";
import { DiyaVisual } from "./DiyaVisual";
import { DiwaliLightSeries } from "./DiwaliLightSeries";
import { DiwaliFireworksCanvas } from "./DiwaliFireworksCanvas";
import { CampaignCountdown } from "./CampaignCountdown";
import { Language } from "@/lib/ek-diya-aur/types";
import { translations } from "@/lib/ek-diya-aur/translations";

interface HeroSectionProps {
  currentLang: Language;
  onContributeClick: () => void;
  onExploreClick: () => void;
}

export function HeroSection({ currentLang, onContributeClick, onExploreClick }: HeroSectionProps) {
  const t = translations[currentLang];

  return (
    <section className="relative overflow-hidden pt-36 pb-16 sm:pt-40 md:pt-44 md:pb-24 border-b border-border bg-background">
      {/* Festive Diwali Hanging Light Series (Corner Ladi Garland) */}
      <DiwaliLightSeries />

      {/* Natural Multi-Directional Diwali Skyshot Fireworks Canvas */}
      <DiwaliFireworksCanvas />

      {/* BiovaCo subtle ambient festive lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-rose-500/5 to-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-x relative z-10 max-w-5xl mx-auto">
        <div className="flex flex-col items-center text-center">
          {/* BiovaCo Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-amber-800 dark:text-amber-400">
              {t.hero.initiativeBadge}
            </span>
          </div>

          {/* Central Diya Visual */}
          <div className="mb-6">
            <DiyaVisual size="lg" />
          </div>

          {/* Campaign Title & Primary Tagline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.04em] text-balance text-foreground leading-[1.05]">
            {t.hero.campaignName}
          </h1>

          <p className="mt-4 font-display text-xl sm:text-2xl md:text-3xl text-amber-700 dark:text-amber-400 max-w-2xl text-balance font-normal tracking-[-0.02em]">
            "{t.hero.tagline}"
          </p>

          {/* Emotional Story Narrative */}
          <div className="mt-8 max-w-2xl space-y-3 text-base sm:text-lg leading-relaxed text-muted-foreground font-sans">
            <p className="font-medium text-foreground/90">{t.hero.bodyP1}</p>
            <p>{t.hero.bodyP2}</p>
            <p>{t.hero.bodyP3}</p>
            <p>{t.hero.bodyP4}</p>
            <p className="font-medium text-amber-800 dark:text-amber-300 pt-2 text-lg sm:text-xl italic">
              {t.hero.bodyP5}
            </p>
          </div>

          {/* BiovaCo Styled CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <button
              onClick={onContributeClick}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--navy)] px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-[color:var(--navy-deep)] dark:bg-[color:var(--green)] dark:text-[color:var(--navy-deep)] dark:hover:bg-white cursor-pointer shadow-sm"
            >
              <Heart className="h-4 w-4 fill-current text-amber-300" />
              <span>{t.hero.primaryCta}</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onExploreClick}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-medium text-foreground transition-all hover:border-[color:var(--navy)] hover:bg-[color:var(--section)] cursor-pointer"
            >
              <span>{t.hero.secondaryCta}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-muted-foreground" />
            </button>
          </div>

          {/* Official Campaign Live Window & Real-time Countdown Timer */}
          <div className="mt-12 w-full">
            <CampaignCountdown currentLang={currentLang} variant="hero" />
          </div>

          {/* BiovaCo Signature Metrics Row */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-border max-w-2xl mx-auto w-full text-center">
            <div>
              <div className="font-display text-2xl sm:text-3xl text-foreground font-normal">
                {currentLang === "hi" ? "प्रत्यक्ष पहल" : currentLang === "mr" ? "थेट उपक्रम" : "Direct Field"}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {t.hero.metaLocation}
              </div>
            </div>

            <div>
              <div className="font-display text-2xl sm:text-3xl text-foreground font-normal">
                {currentLang === "hi" ? "20 परिवार" : currentLang === "mr" ? "20 कुटुंबे" : "20 Families"}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {t.hero.metaTarget}
              </div>
            </div>

            <div>
              <div className="font-display text-2xl sm:text-3xl text-foreground font-normal text-amber-700 dark:text-amber-400">
                ₹45,000
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {t.hero.metaGoal}
              </div>
            </div>
          </div>

          {/* Verification guarantee */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground text-center px-4">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[color:var(--green-deep)] dark:text-[color:var(--green)]" />
            <span>
              {currentLang === "hi"
                ? "100% प्रत्यक्ष सहयोग · शून्य प्रशासनिक कटौती · प्रमाणित रसीदें व सार्वजनिक ऑडिट"
                : currentLang === "mr"
                  ? "100% थेट सहकार्य · शून्य प्रशासकीय कपात · प्रमाणित पावत्या व पारदर्शक हिशोब"
                  : "100% Direct Pass-Through · Zero Administrative Cuts · Audited Invoices"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
